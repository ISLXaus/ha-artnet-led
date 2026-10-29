"""Effect maths: waveforms, fixture positions (spread, groups, blocks, wings) and colours.

Pure functions, no Home Assistant or DMX: the engine (effect_engine.py) feeds in the
effect's phase and parameters and gets back an intensity and/or colour per fixture.

Terms, as on lighting consoles:
- phase:  how far the effect has run, in cycles (1.0 = one full cycle). Speed is in
          cycles per minute (BPM), so changing speed never makes the effect jump.
- spread: how much of a cycle the effect is offset across the fixtures, in degrees.
          0 = all together; 360 = one full wave across the selection.
- blocks: N fixtures in a row share the same step.
- groups: the selection is split into N parts and each part runs the full pattern.
- wings:  each part is split into N wings and every other wing is mirrored.
"""
from __future__ import annotations

import colorsys
import math
import random
import zlib
from dataclasses import dataclass

INTENSITY_TYPES = ("sine", "ramp_up", "ramp_down", "triangle", "square", "chase", "sparkle")
COLOR_TYPES = ("rainbow", "color_chase", "color_wave")
EFFECT_TYPES = INTENSITY_TYPES + COLOR_TYPES

DIRECTIONS = ("forward", "reverse", "bounce")

DEFAULT_COLORS = [[255, 0, 0], [0, 255, 0], [0, 0, 255]]

# Parameter defaults and limits. Mirrored by the panel (frontend/src/model.ts) in phase 2.
EFFECT_PARAMS: dict[str, dict] = {
    # cycles per minute
    "speed": {"default": 30.0, "min": 0.1, "max": 600.0},
    # % of full intensity the effect moves through, and the level it moves up from
    "size": {"default": 100.0, "min": 0.0, "max": 100.0},
    "base": {"default": 0.0, "min": 0.0, "max": 100.0},
    # degrees of phase offset across the fixtures
    "spread": {"default": 360.0, "min": 0.0, "max": 3600.0},
    "groups": {"default": 1, "min": 1, "max": 512, "int": True},
    "blocks": {"default": 1, "min": 1, "max": 512, "int": True},
    "wings": {"default": 1, "min": 1, "max": 512, "int": True},
    # % of each cycle a square/chase step is on (chase: one fixture's share by default),
    # or how likely each fixture is to sparkle per cycle
    "duty": {"default": None, "min": 1.0, "max": 100.0},
    # % of each step spent fading rather than snapping (square, chase, colour chase)
    "crossfade": {"default": 0.0, "min": 0.0, "max": 100.0},
    # seconds to fade the effect in when it starts and out when it stops
    "fade_in": {"default": 1.0, "min": 0.0, "max": 600.0},
    "fade_out": {"default": 1.0, "min": 0.0, "max": 600.0},
    "seed": {"default": 0, "min": 0, "max": 2**31 - 1, "int": True},
}


def param(params: dict, key: str):
    """A parameter value, or its default."""
    value = params.get(key)
    return EFFECT_PARAMS[key]["default"] if value is None else value


@dataclass(frozen=True)
class Slot:
    """Where a fixture sits in the effect: its position (0..1) and how many positions there are."""

    position: float
    count: int
    index: int


def order_fixtures(names: list[str], params: dict) -> list[str]:
    """Fixture order the effect flows in: as selected, optionally shuffled, then reversed."""
    ordered = list(names)
    if params.get("shuffle"):
        random.Random(int(param(params, "seed"))).shuffle(ordered)
    if params.get("direction") == "reverse":
        ordered.reverse()
    return ordered


def fixture_slots(count: int, params: dict) -> list[Slot]:
    """Position of each fixture (in flow order) after blocks, groups and wings."""
    if count <= 0:
        return []
    blocks = max(1, int(param(params, "blocks")))
    groups = max(1, int(param(params, "groups")))
    wings = max(1, int(param(params, "wings")))

    steps = math.ceil(count / blocks)          # distinct steps after blocking
    per_group = math.ceil(steps / groups)      # steps in each repeated group
    per_wing = math.ceil(per_group / wings)    # steps in each wing

    slots = []
    for i in range(count):
        step = i // blocks
        in_group = step % per_group
        wing, in_wing = divmod(in_group, per_wing)
        if wing % 2 == 1:
            in_wing = per_wing - 1 - in_wing
        slots.append(Slot(position=in_wing / per_wing, count=per_wing, index=in_wing))
    return slots


def fixture_phase(phase: float, slot: Slot, params: dict) -> float:
    """Where in its cycle (0..1) a fixture is, including spread and direction."""
    position = slot.position
    if params.get("direction") == "bounce" and int(math.floor(phase)) % 2 == 1:
        # Every other cycle the pattern travels back the other way.
        position = (slot.count - 1 - slot.index) / slot.count
    offset = position * float(param(params, "spread")) / 360.0
    return (phase - offset) % 1.0


def _soft_square(x: float, duty: float, crossfade: float) -> float:
    """On for the first `duty` of the cycle; `crossfade` of the on-time is spent fading."""
    if x >= duty:
        return 0.0
    edge = duty * crossfade / 2
    if edge <= 0:
        return 1.0
    if x < edge:
        return x / edge
    if x > duty - edge:
        return (duty - x) / edge
    return 1.0


def _hash01(*parts) -> float:
    """Deterministic pseudo-random number in [0, 1) for sparkle."""
    # crc32, not hash(): str hashes change between Python runs.
    return random.Random(zlib.crc32(repr(parts).encode())).random()


def waveform(effect_type: str, x: float, params: dict, slot: Slot, phase: float = 0.0) -> float:
    """Intensity (0..1) of an intensity effect at cycle position x."""
    duty_pct = params.get("duty")
    crossfade = float(param(params, "crossfade")) / 100.0
    if effect_type == "sine":
        return 0.5 - 0.5 * math.cos(2 * math.pi * x)
    if effect_type == "ramp_up":
        return x
    if effect_type == "ramp_down":
        return 1.0 - x
    if effect_type == "triangle":
        return 1.0 - abs(2 * x - 1)
    if effect_type == "square":
        duty = (duty_pct if duty_pct is not None else 50.0) / 100.0
        return _soft_square(x, duty, crossfade)
    if effect_type == "chase":
        # Default: each fixture is on for its own share of the cycle, one after another.
        duty = (duty_pct / 100.0) if duty_pct is not None else 1.0 / max(1, slot.count)
        return _soft_square(x, duty, crossfade)
    if effect_type == "sparkle":
        # Each fixture flashes at a random moment in some cycles, then decays.
        density = (duty_pct if duty_pct is not None else 30.0) / 100.0
        offset = _hash01("offset", slot.index, int(param(params, "seed")))
        shifted = phase + offset
        cycle = math.floor(shifted)
        if _hash01("on", slot.index, cycle, int(param(params, "seed"))) >= density:
            return 0.0
        frac = shifted - cycle
        flash = 0.25
        return 1.0 - frac / flash if frac < flash else 0.0
    raise ValueError(f"Not an intensity effect: {effect_type}")


def _lerp_color(a, b, t: float) -> tuple[int, int, int]:
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def color_at(effect_type: str, x: float, params: dict) -> tuple[int, int, int]:
    """Colour (RGB 0-255) of a colour effect at cycle position x."""
    colors = params.get("colors") or DEFAULT_COLORS
    if effect_type == "rainbow":
        r, g, b = colorsys.hsv_to_rgb(x % 1.0, 1.0, 1.0)
        return round(r * 255), round(g * 255), round(b * 255)
    if effect_type == "color_chase":
        k = len(colors)
        scaled = x * k
        index = int(scaled) % k
        frac = scaled - math.floor(scaled)
        crossfade = float(param(params, "crossfade")) / 100.0
        if crossfade > 0 and frac > 1 - crossfade:
            t = (frac - (1 - crossfade)) / crossfade
            return _lerp_color(colors[index], colors[(index + 1) % k], t)
        return tuple(int(c) for c in colors[index])
    if effect_type == "color_wave":
        # Smoothly through every colour in turn and back to the first.
        if len(colors) < 2:
            colors = [colors[0], [0, 0, 0]]
        k = len(colors)
        scaled = x * k
        index = int(scaled) % k
        frac = scaled - math.floor(scaled)
        eased = 0.5 - 0.5 * math.cos(math.pi * frac)
        return _lerp_color(colors[index], colors[(index + 1) % k], eased)
    raise ValueError(f"Not a colour effect: {effect_type}")


@dataclass(frozen=True)
class FixtureFrame:
    """What the effect wants from one fixture: intensity 0..1 and optionally a colour."""

    level: float
    rgb: tuple[int, int, int] | None = None


def compute_frame(effect_type: str, params: dict, count: int, phase: float) -> list[FixtureFrame]:
    """One frame of the effect for `count` fixtures in flow order (before the master level)."""
    frames = []
    size = float(param(params, "size")) / 100.0
    base = float(param(params, "base")) / 100.0
    for slot in fixture_slots(count, params):
        x = fixture_phase(phase, slot, params)
        if effect_type in COLOR_TYPES:
            frames.append(FixtureFrame(level=1.0, rgb=color_at(effect_type, x, params)))
        else:
            value = base + size * waveform(effect_type, x, params, slot, phase)
            frames.append(FixtureFrame(level=min(1.0, max(0.0, value))))
    return frames
