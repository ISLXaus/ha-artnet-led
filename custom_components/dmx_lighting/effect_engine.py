"""Runs effect presets on fixtures, frame by frame.

One loop drives every running effect at EFFECT_FPS. Each frame it computes the effects
(effects.py), turns them into channel values through the fixture's own channel layout
(so dimmers, RGB/RGBW, custom layouts and dummy channels all work) and writes them
straight to the pyartnet channel; pyartnet sends them at the node's own frame rate.

Layers: a fixture has an intensity layer and a colour layer, like attributes on a
console. Intensity effects (chase, wave, ...) drive the intensity layer and colour
effects (rainbow, colour steps, ...) drive the colour layer, so one of each can run on
the same fixture at once: e.g. a chase over a rainbow.

Ownership per layer is "latest takes precedence" (LTP):
- Starting an effect takes over its layer on its fixtures from any other effect,
  crossfading from that effect over the new one's fade-in time.
- Any manual change to a fixture (turn on/off, colour, ...) releases it from all effects.
- Stopping an effect fades its layer back to the fixture's normal state (what its
  light entity says) and releases it.
"""
from __future__ import annotations

import asyncio
import logging
import time
from dataclasses import dataclass
from typing import TYPE_CHECKING, Callable

from homeassistant.core import HomeAssistant, callback

from custom_components.dmx_lighting.effects import (
    COLOR_TYPES,
    FixtureFrame,
    compute_frame,
    order_fixtures,
    param,
)

if TYPE_CHECKING:
    from custom_components.dmx_lighting.light import DmxBaseLight

log = logging.getLogger(__name__)

EFFECT_FPS = 30

INTENSITY = "intensity"
COLOR = "color"
LAYERS = (INTENSITY, COLOR)


def effect_layer(preset: dict) -> str:
    """Which fixture layer an effect drives."""
    return COLOR if preset.get("type") in COLOR_TYPES else INTENSITY


@dataclass
class RunningEffect:
    key: str
    preset: dict
    level: float  # master level 0..1 (the effect light's brightness)
    phase: float = 0.0
    last_tick: float | None = None
    stopping: bool = False
    stop_start: float = 0.0
    fade_out: float = 0.0

    def stop_weight(self, now: float) -> float:
        """1 while running, falling to 0 over the fade-out."""
        if not self.stopping:
            return 1.0
        if not self.fade_out:
            return 0.0
        return max(0.0, 1.0 - (now - self.stop_start) / self.fade_out)


@dataclass
class Layer:
    """One effect driving one layer of one fixture."""

    key: str
    since: float
    fade: float
    # The effect this one took over from, crossfaded from until the fade-in is done.
    prev: str | None = None

    def fade_weight(self, now: float) -> float:
        if not self.fade:
            return 1.0
        return min(1.0, max(0.0, (now - self.since) / self.fade))


def _lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def _blend(a: list[float], b: list[float], t: float) -> list[float]:
    t = min(1.0, max(0.0, t))
    return [x + (y - x) * t for x, y in zip(a, b)]


class EffectEngine:
    """Effect presets, which of them run, and which effect drives which fixture layer."""

    def __init__(self, hass: HomeAssistant,
                 create_task: Callable | None = None) -> None:
        self._hass = hass
        self._create_task = create_task or hass.async_create_background_task
        self.fixtures: dict[str, DmxBaseLight] = {}
        self.presets: dict[str, dict] = {}       # effect key -> preset (live dict)
        self.running: dict[str, RunningEffect] = {}
        self.layers: dict[str, dict[str, Layer]] = {}  # fixture -> layer -> Layer
        self.autorun = True                      # tests drive tick() by hand
        self._task: asyncio.Task | None = None
        self._listeners: dict[str, list[Callable[[], None]]] = {}
        # Temporary presets (panel previews) dropped once they have faded out.
        self._remove_when_done: set[str] = set()

    # ---- setup --------------------------------------------------------------

    def set_presets(self, presets: dict[str, dict]) -> None:
        self.presets = presets

    def register_fixtures(self, fixtures: list[DmxBaseLight]) -> None:
        for fixture in fixtures:
            self.fixtures[fixture.name] = fixture
            fixture.effect_engine = self

    def add_listener(self, key: str, listener: Callable[[], None]) -> Callable[[], None]:
        """Call `listener` when effect `key` starts, stops or changes level."""
        self._listeners.setdefault(key, []).append(listener)
        return lambda: self._listeners.get(key, []).remove(listener)

    def _notify(self, key: str | None) -> None:
        if key is None:
            return
        for listener in list(self._listeners.get(key, [])):
            listener()

    # ---- queries ------------------------------------------------------------

    def is_running(self, key: str) -> bool:
        effect = self.running.get(key)
        return effect is not None and not effect.stopping

    def fixture_effects(self, name: str) -> list[str]:
        """Effects driving a fixture, intensity layer first."""
        layers = self.layers.get(name, {})
        keys = [layers[layer].key for layer in LAYERS if layer in layers]
        return list(dict.fromkeys(keys))

    @property
    def owner(self) -> dict[str, str]:
        """fixture -> driving effect(s), for display ("a, b" when layered)."""
        return {name: ", ".join(self.fixture_effects(name))
                for name in self.layers if self.layers[name]}

    def owned_fixtures(self, key: str) -> list[str]:
        return [name for name, layers in self.layers.items()
                if any(layer.key == key for layer in layers.values())]

    def _targets(self, preset: dict) -> list[str]:
        """The preset's fixtures that exist and can be driven, in flow order."""
        names = [n for n in preset.get("fixtures") or [] if n in self.fixtures]
        return order_fixtures(names, preset.get("params") or {})

    # ---- control ------------------------------------------------------------

    def _take(self, name: str, layer_name: str, key: str, now: float, fade: float) -> None:
        """Give `key` the layer of a fixture, crossfading from whoever had it."""
        layers = self.layers.setdefault(name, {})
        current = layers.get(layer_name)
        if current is not None and current.key == key:
            return
        prev = current.key if current is not None else None
        layers[layer_name] = Layer(key=key, since=now, fade=fade, prev=prev)
        fixture = self.fixtures[name]
        fixture.cancel_fade()
        self._notify(prev)
        fixture.async_write_ha_state_if_added()

    def _drop(self, name: str, layer_name: str) -> None:
        """Remove a layer; a fixture without layers goes back to its normal state."""
        layers = self.layers.get(name)
        if not layers or layer_name not in layers:
            return
        del layers[layer_name]
        fixture = self.fixtures.get(name)
        if not layers:
            del self.layers[name]
            if fixture is not None:
                fixture.write_effect_values(fixture.normal_values())
        if fixture is not None:
            fixture.async_write_ha_state_if_added()

    @callback
    def start(self, key: str, level: float = 1.0, fade_in: float | None = None,
              now: float | None = None) -> None:
        """Start (or restart, if it is fading out) an effect and take over its layer."""
        preset = self.presets[key]
        now = time.monotonic() if now is None else now
        params = preset.get("params") or {}
        fade = float(param(params, "fade_in")) if fade_in is None else fade_in

        existing = self.running.get(key)
        self.running[key] = RunningEffect(
            key=key, preset=preset, level=level,
            phase=existing.phase if existing else 0.0, last_tick=now,
        )
        layer_name = effect_layer(preset)
        for name in self._targets(preset):
            self._take(name, layer_name, key, now, fade)
        self._notify(key)
        self.tick(now)
        self._ensure_loop()

    @callback
    def stop(self, key: str, fade_out: float | None = None, now: float | None = None) -> None:
        """Fade an effect out; its fixtures return to their normal state."""
        effect = self.running.get(key)
        if effect is None or effect.stopping:
            return
        now = time.monotonic() if now is None else now
        params = effect.preset.get("params") or {}
        effect.stopping = True
        effect.stop_start = now
        effect.fade_out = float(param(params, "fade_out")) if fade_out is None else fade_out
        self._notify(key)
        self.tick(now)

    @callback
    def update_preset(self, key: str, preset: dict, now: float | None = None) -> None:
        """Swap a running effect's preset (panel live preview) without restarting it.

        Fixtures no longer in the preset are released; new ones are taken over with a
        short fade. A change of type that moves the effect to the other layer moves
        its fixtures with it.
        """
        self.presets[key] = preset
        effect = self.running.get(key)
        if effect is None or effect.stopping:
            return
        now = time.monotonic() if now is None else now
        effect.preset = preset
        layer_name = effect_layer(preset)
        wanted = set(self._targets(preset))
        for name in self.owned_fixtures(key):
            for lname, layer in list(self.layers.get(name, {}).items()):
                if layer.key == key and (name not in wanted or lname != layer_name):
                    self._drop(name, lname)
        for name in self._targets(preset):
            self._take(name, layer_name, key, now, 0.3)
        self._notify(key)
        self.tick(now)

    @callback
    def stop_and_remove(self, key: str, fade_out: float | None = None) -> None:
        """Stop a temporary preset and forget it once it has faded out."""
        self._remove_when_done.add(key)
        if key in self.running:
            self.stop(key, fade_out=fade_out)
        else:
            self._remove_when_done.discard(key)
            self.presets.pop(key, None)

    @callback
    def set_level(self, key: str, level: float) -> None:
        effect = self.running.get(key)
        if effect is not None:
            effect.level = min(1.0, max(0.0, level))
            self._notify(key)

    @callback
    def release_fixture(self, name: str) -> None:
        """Manual control of a fixture: it leaves every effect driving it."""
        layers = self.layers.pop(name, None)
        if not layers:
            return
        for key in {layer.key for layer in layers.values()}:
            self._notify(key)
        fixture = self.fixtures.get(name)
        if fixture is not None:
            fixture.async_write_ha_state_if_added()

    @callback
    def shutdown(self) -> None:
        """Stop everything immediately (entry unload)."""
        if self._task is not None:
            self._task.cancel()
            self._task = None
        self.running.clear()
        self.layers.clear()

    # ---- frames -------------------------------------------------------------

    @callback
    def tick(self, now: float | None = None) -> None:
        """Advance every running effect to `now` and write the fixtures they drive."""
        now = time.monotonic() if now is None else now

        # 1. Each running effect's frame for all of its fixtures (also ones another
        #    effect has taken over, so a crossfade from it has a value to start from).
        frames: dict[str, dict[str, FixtureFrame]] = {}
        for key, effect in self.running.items():
            params = effect.preset.get("params") or {}
            if effect.last_tick is not None:
                effect.phase += (now - effect.last_tick) * float(param(params, "speed")) / 60.0
            effect.last_tick = now
            order = self._targets(effect.preset)
            frame = compute_frame(effect.preset["type"], params, len(order), effect.phase)
            frames[key] = dict(zip(order, frame))

        # 2. Combine the layers of every driven fixture and write it.
        for name in list(self.layers):
            try:
                self._write_fixture(name, frames, now)
            except Exception:
                log.exception("Error writing effect output for %s", name)

        # 3. Effects that have faded out are done.
        for key, effect in list(self.running.items()):
            if effect.stopping and effect.stop_weight(now) <= 0.0:
                self._finish(key)

    def _layer_value(self, layer: Layer | None, name: str,
                     frames: dict[str, dict[str, FixtureFrame]], now: float):
        """(frame, master level, stop weight) of the effect behind a layer, or None."""
        if layer is None:
            return None
        effect = self.running.get(layer.key)
        frame = frames.get(layer.key, {}).get(name)
        if effect is None or frame is None:
            return None
        return frame, effect.level, effect.stop_weight(now)

    def _write_fixture(self, name: str, frames, now: float) -> None:
        fixture = self.fixtures.get(name)
        layers = self.layers.get(name, {})
        if fixture is None:
            self.layers.pop(name, None)
            return

        base_level = fixture.normal_level()

        def prev_value(layer: Layer):
            if layer.prev is None or layer.fade_weight(now) >= 1.0:
                layer.prev = None
                return None
            return self._layer_value(Layer(layer.prev, 0, 0), name, frames, now)

        # Intensity: from the intensity layer, else the colour effect's master level.
        level = base_level
        i_layer = layers.get(INTENSITY)
        i_val = self._layer_value(i_layer, name, frames, now)
        c_layer = layers.get(COLOR)
        c_val = self._layer_value(c_layer, name, frames, now)
        # A layer whose effect has gone (stopped elsewhere) just disappears.
        if i_layer is not None and i_val is None:
            layers.pop(INTENSITY, None)
        if c_layer is not None and c_val is None:
            layers.pop(COLOR, None)

        if i_val is not None:
            frame, master, stop_w = i_val
            target = frame.level * master
            prev = prev_value(i_layer)
            start = prev[0].level * prev[1] * prev[2] + base_level * (1 - prev[2]) \
                if prev is not None else base_level
            level = _lerp(base_level, _lerp(start, target, i_layer.fade_weight(now)), stop_w)
        elif c_val is not None:
            _, master, stop_w = c_val
            level = _lerp(base_level, _lerp(base_level, master, c_layer.fade_weight(now)), stop_w)

        # Colour: blend the fixture's own colour (or the effect it took over from)
        # into the colour layer's colour.
        values = fixture.effect_values(level, None)
        if c_val is not None:
            frame, _, stop_w = c_val
            prev = prev_value(c_layer)
            if prev is not None and prev[0].rgb is not None:
                start_values = _blend(values, fixture.effect_values(level, prev[0].rgb), prev[2])
            else:
                start_values = values
            colored = fixture.effect_values(level, frame.rgb)
            values = _blend(values, _blend(start_values, colored, c_layer.fade_weight(now)), stop_w)

        if i_val is None and c_val is None:
            # Every effect behind this fixture has gone; back to normal.
            self.layers.pop(name, None)
            fixture.write_effect_values(fixture.normal_values())
            fixture.async_write_ha_state_if_added()
            return
        fixture.write_effect_values(values)

    def _finish(self, key: str) -> None:
        self.running.pop(key, None)
        if key in self._remove_when_done:
            self._remove_when_done.discard(key)
            self.presets.pop(key, None)
        for name in list(self.layers):
            for lname, layer in list(self.layers.get(name, {}).items()):
                if layer.prev == key:
                    layer.prev = None
                if layer.key == key:
                    self._drop(name, lname)
        self._notify(key)

    def _ensure_loop(self) -> None:
        if not self.autorun or (self._task is not None and not self._task.done()):
            return
        self._task = self._create_task(self._run(), "dmx_lighting effects")

    async def _run(self) -> None:
        interval = 1.0 / EFFECT_FPS
        try:
            while self.running:
                started = time.monotonic()
                try:
                    self.tick(started)
                except Exception:  # never let one bad frame kill the loop
                    log.exception("Error computing effect frame")
                await asyncio.sleep(max(0.0, interval - (time.monotonic() - started)))
        finally:
            self._task = None
