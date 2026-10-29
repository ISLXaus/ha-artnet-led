"""Runs effect presets on fixtures, frame by frame.

Frames are driven by the nodes themselves: while effects run, the engine is a job in
each driven node's pyartnet send loop, so every frame a node sends (at its max_fps)
is freshly computed. Each frame computes the effects (effects.py), turns them into
channel values through the fixture's own channel layout (so dimmers, RGB/RGBW, custom
layouts and dummy channels all work) and writes them to the pyartnet channels.

Layers: a fixture has an intensity layer and a colour layer, like attributes on a
console. Intensity effects (chase, wave, ...) drive the intensity layer and colour
effects (rainbow, colour steps, ...) drive the colour layer, so one of each can run on
the same fixture at once: e.g. a chase over a rainbow.

Each layer is a stack, "latest takes precedence" (LTP) like a console:
- Starting an effect puts it on top of its layer on its fixtures, crossfading from
  whatever was showing over the new effect's fade-in time.
- Stopping an effect fades it out to whatever is underneath: the next effect still
  running on that layer, or (for intensity) the colour effect's level, or the
  fixture's normal state (what its light entity says).
- Any manual change to a fixture (turn on/off, colour, ...) releases it from all effects.
"""
from __future__ import annotations

import asyncio
import logging
import time
from dataclasses import dataclass, field
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

# Housekeeping rate when no node is driving the frames (e.g. an effect whose fixtures
# have all been taken over), so fades still finish.
EFFECT_FPS = 30
# Several nodes call tick() in the same frame; skip repeats closer together than this.
MIN_TICK_INTERVAL = 0.002


class _NodeJob:
    """Looks like a pyartnet fade job, so the node's send loop computes effect frames."""

    def __init__(self, engine: "EffectEngine", node) -> None:
        self.engine = engine
        self.node = node
        self.is_done = False

    def process(self) -> None:
        if not self.engine.running:
            self.is_done = True  # the node loop removes the job and calls fade_complete
            return
        self.engine.tick_from_node()

    def fade_complete(self) -> None:
        if self.engine._node_jobs.get(id(self.node)) is self:
            del self.engine._node_jobs[id(self.node)]

    def cancel(self) -> None:  # pyartnet API compatibility
        self.is_done = True

# Effect targets that are Home Assistant groups: "group:light.stage_wash".
GROUP_PREFIX = "group:"

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
    fade_in: float = 0.0
    # Fixtures this effect has taken (or been refused by manual control / another
    # effect); ones appearing later - e.g. a group helper loading after the effect
    # was restored, or a light added to the group - are taken when they show up.
    claimed: set = field(default_factory=set)

    def stop_weight(self, now: float) -> float:
        """1 while running, falling to 0 over the fade-out."""
        if not self.stopping:
            return 1.0
        if not self.fade_out:
            return 0.0
        return max(0.0, 1.0 - (now - self.stop_start) / self.fade_out)


@dataclass
class Layer:
    """One effect in one layer's stack on one fixture."""

    key: str
    since: float
    fade: float

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
        # fixture -> layer -> stack of effects on that layer, top (most recent) first
        self.layers: dict[str, dict[str, list[Layer]]] = {}
        # fixture -> (level 0..1, rgb or None) actually being output, for the panel
        self.output: dict[str, tuple[float, tuple[int, int, int] | None]] = {}
        self.autorun = True                      # tests drive tick() by hand
        self._task: asyncio.Task | None = None
        self._listeners: dict[str, list[Callable[[], None]]] = {}
        # Temporary presets (panel previews) dropped once they have faded out.
        self._remove_when_done: set[str] = set()
        self._node_jobs: dict[int, _NodeJob] = {}  # id(node) -> job in its send loop
        self._last_tick: float | None = None

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
        """Effects on top of a fixture's layers (what it shows), intensity first."""
        stacks = self.layers.get(name, {})
        keys = [stacks[layer][0].key for layer in LAYERS if stacks.get(layer)]
        return list(dict.fromkeys(keys))

    @property
    def owner(self) -> dict[str, str]:
        """fixture -> effect(s) it shows, for display ("a, b" when layered)."""
        return {name: ", ".join(keys) for name in self.layers
                if (keys := self.fixture_effects(name))}

    def owned_fixtures(self, key: str) -> list[str]:
        """Fixtures where `key` is on top of a layer (i.e. what they show)."""
        return [name for name in self.layers if key in self.fixture_effects(name)]

    def _fixtures_with(self, key: str) -> list[str]:
        """Fixtures with `key` anywhere in a layer stack."""
        return [name for name, stacks in self.layers.items()
                if any(layer.key == key for stack in stacks.values() for layer in stack)]

    def expand_targets(self, entries: list) -> list[str]:
        """Fixture names for a preset's targets, groups expanded, in order, no repeats.

        Entries are fixture names or "group:<entity_id>" for a Home Assistant group
        (a light group helper or an old-style group). Groups expand to their members
        that are fixtures of this integration, recursively, in the group's order.
        """
        by_entity = {f.entity_id: name for name, f in self.fixtures.items() if f.entity_id}
        names: list[str] = []

        def add(name: str) -> None:
            fixture = self.fixtures.get(name)
            if fixture is not None and fixture._type != "fixed" and name not in names:
                names.append(name)

        def add_entity(entity_id: str, depth: int) -> None:
            if entity_id in by_entity:
                add(by_entity[entity_id])
                return
            state = self._hass.states.get(entity_id)
            members = state.attributes.get("entity_id") if state is not None else None
            if depth < 5 and isinstance(members, (list, tuple)):
                for member in members:
                    if isinstance(member, str):
                        add_entity(member, depth + 1)

        for entry in entries or []:
            if isinstance(entry, str) and entry.startswith(GROUP_PREFIX):
                add_entity(entry[len(GROUP_PREFIX):], 0)
            elif isinstance(entry, str):
                add(entry)
        return names

    def _targets(self, preset: dict) -> list[str]:
        """The preset's fixtures that exist and can be driven, in flow order."""
        names = self.expand_targets(preset.get("fixtures") or [])
        return order_fixtures(names, preset.get("params") or {})

    # ---- control ------------------------------------------------------------

    def _take(self, name: str, layer_name: str, key: str, now: float, fade: float) -> None:
        """Put `key` on top of a fixture's layer, crossfading from what was showing."""
        stack = self.layers.setdefault(name, {}).setdefault(layer_name, [])
        if stack and stack[0].key == key:
            return
        previous = stack[0].key if stack else None
        stack[:] = [layer for layer in stack if layer.key != key]
        stack.insert(0, Layer(key=key, since=now, fade=fade))
        fixture = self.fixtures[name]
        fixture.cancel_fade()
        self._notify(previous)
        fixture.async_write_ha_state_if_added()

    def _drop(self, name: str, layer_name: str, key: str) -> None:
        """Take `key` out of a fixture's layer stack; whatever is beneath shows again.

        A fixture left with no effects at all goes back to its normal state.
        """
        stacks = self.layers.get(name)
        if not stacks or layer_name not in stacks:
            return
        stack = stacks[layer_name]
        was_top = bool(stack) and stack[0].key == key
        stack[:] = [layer for layer in stack if layer.key != key]
        if not stack:
            del stacks[layer_name]
        elif was_top:
            self._notify(stack[0].key)
        fixture = self.fixtures.get(name)
        if not stacks:
            del self.layers[name]
            self.output.pop(name, None)
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
        targets = self._targets(preset)
        self.running[key] = RunningEffect(
            key=key, preset=preset, level=level,
            phase=existing.phase if existing else 0.0, last_tick=now,
            fade_in=fade, claimed=set(targets),
        )
        layer_name = effect_layer(preset)
        for name in targets:
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
        for name in self._fixtures_with(key):
            for lname in list(self.layers.get(name, {})):
                if name not in wanted or lname != layer_name:
                    self._drop(name, lname, key)
        for name in self._targets(preset):
            self._take(name, layer_name, key, now, 0.3)
            effect.claimed.add(name)
        self._notify(key)
        self.tick(now)
        self._ensure_loop()

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
        stacks = self.layers.pop(name, None)
        self.output.pop(name, None)
        if not stacks:
            return
        for key in {layer.key for stack in stacks.values() for layer in stack}:
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
        for job in list(self._node_jobs.values()):
            job.is_done = True
            if job in job.node._process_jobs:
                job.node._process_jobs.remove(job)
        self._node_jobs.clear()
        self.running.clear()
        self.layers.clear()
        self.output.clear()

    # ---- frames -------------------------------------------------------------

    @callback
    def tick(self, now: float | None = None) -> None:
        """Advance every running effect to `now` and write the fixtures they drive."""
        now = time.monotonic() if now is None else now
        self._last_tick = now

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
            if not effect.stopping:
                new = [n for n in order if n not in effect.claimed]
                if new:
                    layer_name = effect_layer(effect.preset)
                    for name in new:
                        effect.claimed.add(name)
                        self._take(name, layer_name, key, now, max(effect.fade_in, 0.3))
                    self._notify(key)
                    self._ensure_loop()

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

    def _write_fixture(self, name: str, frames, now: float) -> None:
        """Combine a fixture's layer stacks into channel values and write them."""
        fixture = self.fixtures.get(name)
        stacks = self.layers.get(name, {})
        if fixture is None:
            self.layers.pop(name, None)
            return

        # Effects that have gone, or no longer include this fixture, drop out.
        for lname in list(stacks):
            stacks[lname] = [layer for layer in stacks[lname]
                             if layer.key in self.running and name in frames.get(layer.key, {})]
            if not stacks[lname]:
                del stacks[lname]
        if not stacks:
            self.layers.pop(name, None)
            self.output.pop(name, None)
            fixture.write_effect_values(fixture.normal_values())
            fixture.async_write_ha_state_if_added()
            return

        base_level = fixture.normal_level()
        istack = stacks.get(INTENSITY, [])
        cstack = stacks.get(COLOR, [])

        def weight(layer: Layer) -> float:
            """How much of this effect shows over what is beneath it."""
            return layer.fade_weight(now) * self.running[layer.key].stop_weight(now)

        # Each effect is blended over everything beneath it in its stack, so fading
        # one out (or in) reveals (or covers) the next one down.
        def color_level(i: int) -> float:
            # Without an intensity effect, a colour effect shows at its master level.
            if i >= len(cstack):
                return base_level
            layer = cstack[i]
            return _lerp(color_level(i + 1), self.running[layer.key].level, weight(layer))

        def intensity(i: int) -> float:
            if i >= len(istack):
                return color_level(0)
            layer = istack[i]
            target = frames[layer.key][name].level * self.running[layer.key].level
            return _lerp(intensity(i + 1), target, weight(layer))

        level = intensity(0)

        def values_at(i: int) -> list[float]:
            if i >= len(cstack):
                return fixture.effect_values(level, None)  # the fixture's own colour
            layer = cstack[i]
            colored = fixture.effect_values(level, frames[layer.key][name].rgb)
            return _blend(values_at(i + 1), colored, weight(layer))

        fixture.write_effect_values(values_at(0))

        # What it looks like, for the panel's live view.
        def rgb_at(i: int):
            if i >= len(cstack):
                return fixture.display_rgb()
            layer = cstack[i]
            below = rgb_at(i + 1) or (255, 255, 255)
            top = frames[layer.key][name].rgb
            w = weight(layer)
            return tuple(round(below[k] + (top[k] - below[k]) * w) for k in range(3))

        self.output[name] = (level, rgb_at(0))

    def _finish(self, key: str) -> None:
        self.running.pop(key, None)
        if key in self._remove_when_done:
            self._remove_when_done.discard(key)
            self.presets.pop(key, None)
        for name in self._fixtures_with(key):
            for lname in list(self.layers.get(name, {})):
                self._drop(name, lname, key)
        self._notify(key)

    def tick_from_node(self) -> None:
        """Called from a node's send loop, once per frame it sends."""
        now = time.monotonic()
        if self._last_tick is not None and now - self._last_tick < MIN_TICK_INTERVAL:
            return
        try:
            self.tick(now)
        except Exception:  # never let one bad frame break the node's send loop
            log.exception("Error computing effect frame")

    def _ensure_loop(self) -> None:
        if not self.autorun:
            return
        # Hook into the send loop of every node with a driven fixture.
        for name in self.layers:
            fixture = self.fixtures.get(name)
            node = getattr(getattr(fixture, "channel", None), "_parent_node", None)
            if node is None or id(node) in self._node_jobs:
                continue
            job = _NodeJob(self, node)
            self._node_jobs[id(node)] = job
            node._process_jobs.append(job)
            node._process_task.start()
        if self._task is None or self._task.done():
            self._task = self._create_task(self._run(), "dmx_lighting effects")

    async def _run(self) -> None:
        """Housekeeping: drives frames only while no node is doing so."""
        interval = 1.0 / EFFECT_FPS
        try:
            while self.running:
                if not self._node_jobs:
                    try:
                        self.tick()
                    except Exception:
                        log.exception("Error computing effect frame")
                await asyncio.sleep(interval)
        finally:
            self._task = None
