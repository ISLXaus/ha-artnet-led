"""Runs effect presets on fixtures, frame by frame.

One loop drives every running effect at EFFECT_FPS. Each frame it computes the effect
(effects.py), turns it into channel values through the fixture's own channel layout
(so dimmers, RGB/RGBW, custom layouts and dummy channels all work) and writes them
straight to the pyartnet channel; pyartnet sends them at the node's own frame rate.

Ownership is "last takes precedence" (LTP), as on a console:
- Starting an effect takes over its fixtures from any other running effect.
- Any manual change to a fixture (turn on/off, colour, ...) releases it from its effect.
- Stopping an effect fades its fixtures back to their normal state (what their light
  entity says) and releases them.
"""
from __future__ import annotations

import asyncio
import logging
import time
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Callable

from homeassistant.core import HomeAssistant, callback

from custom_components.dmx_lighting.effects import (
    compute_frame,
    order_fixtures,
    param,
)

if TYPE_CHECKING:
    from custom_components.dmx_lighting.light import DmxBaseLight

log = logging.getLogger(__name__)

EFFECT_FPS = 30


@dataclass
class RunningEffect:
    key: str
    preset: dict
    level: float  # master level 0..1 (the effect light's brightness)
    phase: float = 0.0
    last_tick: float | None = None
    # Fading in: blend from the values the fixtures had when the effect started.
    fade_start: float = 0.0
    fade_in: float = 0.0
    start_values: dict[str, list[float]] = field(default_factory=dict)
    # Fading out: blend from the effect to each fixture's normal state.
    stopping: bool = False
    stop_start: float = 0.0
    fade_out: float = 0.0


def _blend(a: list[float], b: list[float], t: float) -> list[float]:
    t = min(1.0, max(0.0, t))
    return [x + (y - x) * t for x, y in zip(a, b)]


class EffectEngine:
    """Effect presets, which of them run, and which effect owns which fixture."""

    def __init__(self, hass: HomeAssistant,
                 create_task: Callable | None = None) -> None:
        self._hass = hass
        self._create_task = create_task or hass.async_create_background_task
        self.fixtures: dict[str, DmxBaseLight] = {}
        self.presets: dict[str, dict] = {}       # effect key -> preset (live dict)
        self.running: dict[str, RunningEffect] = {}
        self.owner: dict[str, str] = {}          # fixture name -> effect key
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

    def _notify(self, key: str) -> None:
        for listener in list(self._listeners.get(key, [])):
            listener()

    # ---- control ------------------------------------------------------------

    def is_running(self, key: str) -> bool:
        effect = self.running.get(key)
        return effect is not None and not effect.stopping

    def owned_fixtures(self, key: str) -> list[str]:
        return [name for name, owner in self.owner.items() if owner == key]

    def _targets(self, preset: dict) -> list[str]:
        """The preset's fixtures that exist and can be driven, in flow order."""
        names = [n for n in preset.get("fixtures") or [] if n in self.fixtures]
        return order_fixtures(names, preset.get("params") or {})

    @callback
    def start(self, key: str, level: float = 1.0, fade_in: float | None = None,
              now: float | None = None) -> None:
        """Start (or restart, if it is fading out) an effect and take over its fixtures."""
        preset = self.presets[key]
        now = time.monotonic() if now is None else now
        params = preset.get("params") or {}
        fade = float(param(params, "fade_in")) if fade_in is None else fade_in

        existing = self.running.get(key)
        effect = RunningEffect(
            key=key, preset=preset, level=level,
            phase=existing.phase if existing else 0.0,
            last_tick=now, fade_start=now, fade_in=fade,
        )
        for name in self._targets(preset):
            fixture = self.fixtures[name]
            effect.start_values[name] = list(fixture.channel.get_values())
            previous = self.owner.get(name)
            self.owner[name] = key
            fixture.cancel_fade()
            if previous and previous != key:
                self._notify(previous)
            fixture.async_write_ha_state_if_added()
        self.running[key] = effect
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

        Fixtures no longer in the preset go back to their normal state; new ones are
        taken over with a short fade.
        """
        self.presets[key] = preset
        effect = self.running.get(key)
        if effect is None or effect.stopping:
            return
        now = time.monotonic() if now is None else now
        effect.preset = preset
        wanted = set(self._targets(preset))
        for name in self.owned_fixtures(key):
            if name not in wanted:
                del self.owner[name]
                fixture = self.fixtures[name]
                fixture.write_effect_values(fixture.normal_values())
                fixture.async_write_ha_state_if_added()
        new = [n for n in self._targets(preset) if self.owner.get(n) != key]
        if new:
            effect.fade_start, effect.fade_in = now, 0.3
            for name in new:
                fixture = self.fixtures[name]
                effect.start_values[name] = list(fixture.channel.get_values())
                previous = self.owner.get(name)
                self.owner[name] = key
                fixture.cancel_fade()
                if previous:
                    self._notify(previous)
                fixture.async_write_ha_state_if_added()
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
        """Manual control of a fixture: it leaves whatever effect is driving it."""
        key = self.owner.pop(name, None)
        if key is not None:
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
        self.owner.clear()

    # ---- frames -------------------------------------------------------------

    @callback
    def tick(self, now: float | None = None) -> None:
        """Advance every running effect to `now` and write its fixtures' values."""
        now = time.monotonic() if now is None else now
        for key, effect in list(self.running.items()):
            params = effect.preset.get("params") or {}
            if effect.last_tick is not None:
                effect.phase += (now - effect.last_tick) * float(param(params, "speed")) / 60.0
            effect.last_tick = now

            # Fixtures in flow order; frames are computed for all of them so the
            # pattern keeps its shape even when another effect took some over.
            order = self._targets(effect.preset)
            frames = compute_frame(effect.preset["type"], params, len(order), effect.phase)

            if effect.stopping:
                t_out = (now - effect.stop_start) / effect.fade_out if effect.fade_out else 1.0
            else:
                t_out = 0.0
            t_in = (now - effect.fade_start) / effect.fade_in if effect.fade_in else 1.0

            for name, frame in zip(order, frames):
                if self.owner.get(name) != key:
                    continue
                fixture = self.fixtures[name]
                values = fixture.effect_values(frame.level * effect.level, frame.rgb)
                if t_in < 1.0 and name in effect.start_values:
                    values = _blend(effect.start_values[name], values, t_in)
                if effect.stopping:
                    values = _blend(values, fixture.normal_values(), t_out)
                fixture.write_effect_values(values)

            if effect.stopping and t_out >= 1.0:
                self._finish(key)

    def _finish(self, key: str) -> None:
        self.running.pop(key, None)
        if key in self._remove_when_done:
            self._remove_when_done.discard(key)
            self.presets.pop(key, None)
        for name in self.owned_fixtures(key):
            del self.owner[name]
            fixture = self.fixtures.get(name)
            if fixture is not None:
                fixture.write_effect_values(fixture.normal_values())
                fixture.async_write_ha_state_if_added()
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
