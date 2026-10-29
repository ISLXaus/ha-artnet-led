"""Effects engine: maths, preset validation, entities and DMX output."""
import copy

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dmx_lighting.const import DATA_ENGINES, DOMAIN, STORAGE_KEY
from custom_components.dmx_lighting.effects import (
    color_at,
    compute_frame,
    fixture_slots,
    order_fixtures,
)
from custom_components.dmx_lighting.runtime import DmxRuntime
from custom_components.dmx_lighting.validation import validate_patch

pytestmark = pytest.mark.usefixtures("socket_enabled")


# ---- maths ---------------------------------------------------------------------


def _positions(count, **params):
    return [round(s.position, 3) for s in fixture_slots(count, params)]


def test_positions_blocks_groups_wings():
    assert _positions(4) == [0, 0.25, 0.5, 0.75]
    # blocks: pairs share a step
    assert _positions(6, blocks=2) == [0, 0, 0.333, 0.333, 0.667, 0.667]
    # groups: the pattern repeats in each half
    assert _positions(6, groups=2) == [0, 0.333, 0.667, 0, 0.333, 0.667]
    # wings: the second half mirrors the first
    assert _positions(6, wings=2) == [0, 0.333, 0.667, 0.667, 0.333, 0]


def test_order_reverse_and_shuffle():
    names = ["a", "b", "c", "d", "e"]
    assert order_fixtures(names, {"direction": "reverse"}) == ["e", "d", "c", "b", "a"]
    shuffled = order_fixtures(names, {"shuffle": True, "seed": 7})
    assert sorted(shuffled) == names and shuffled != names
    assert order_fixtures(names, {"shuffle": True, "seed": 7}) == shuffled  # repeatable
    assert order_fixtures(names, {"shuffle": True, "seed": 8}) != shuffled  # reshuffle


def _levels(effect_type, count, phase, **params):
    return [round(f.level, 3) for f in compute_frame(effect_type, params, count, phase)]


def test_chase_moves_one_fixture_at_a_time():
    assert _levels("chase", 4, 0.1) == [1, 0, 0, 0]
    assert _levels("chase", 4, 0.3) == [0, 1, 0, 0]
    assert _levels("chase", 4, 0.8) == [0, 0, 0, 1]
    # reverse direction via fixture order is covered above; bounce mirrors odd cycles
    assert _levels("chase", 4, 1.1, direction="bounce") == [0, 0, 0, 1]
    assert _levels("chase", 4, 2.1, direction="bounce") == [1, 0, 0, 0]


def test_spread_zero_moves_everything_together():
    levels = _levels("sine", 5, 0.5, spread=0)
    assert levels == [1, 1, 1, 1, 1]


def test_size_and_base():
    # sine peak at x=0.5: base 20% + size 50% = 70%
    assert _levels("sine", 1, 0.5, size=50, base=20) == [0.7]
    assert _levels("sine", 1, 0.0, size=50, base=20) == [0.2]


def test_square_duty_and_crossfade():
    assert _levels("square", 1, 0.4) == [1]
    assert _levels("square", 1, 0.6) == [0]
    assert _levels("square", 1, 0.6, duty=75) == [1]
    # 50% crossfade: first quarter of the on-time is a fade up
    assert _levels("square", 1, 0.0625, crossfade=50) == [0.5]


def test_sparkle_is_repeatable():
    first = _levels("sparkle", 20, 3.1, seed=1)
    assert first == _levels("sparkle", 20, 3.1, seed=1)
    assert any(level > 0 for level in first) or any(
        level > 0 for p in range(10) for level in _levels("sparkle", 20, p + 0.05, seed=1))


def test_colour_effects():
    assert color_at("rainbow", 0.0, {}) == (255, 0, 0)
    colors = [[255, 0, 0], [0, 0, 255]]
    assert color_at("color_chase", 0.25, {"colors": colors}) == (255, 0, 0)
    assert color_at("color_chase", 0.75, {"colors": colors}) == (0, 0, 255)
    # crossfade 50%: halfway through the fade at the end of the red step
    assert color_at("color_chase", 0.375, {"colors": colors, "crossfade": 50}) == (128, 0, 128)
    assert color_at("color_wave", 0.0, {"colors": colors}) == (255, 0, 0)
    assert color_at("color_wave", 0.5, {"colors": colors}) == (0, 0, 255)
    frame = compute_frame("rainbow", {}, 3, 0.0)
    assert [f.rgb for f in frame][0] == (255, 0, 0) and all(f.level == 1 for f in frame)


# ---- presets -------------------------------------------------------------------

DIMMERS = [
    {"id": f"d{i}", "channel": i, "name": f"chase_{i}", "type": "dimmer"} for i in range(1, 5)
]
WASH = {"id": "w", "channel": 10, "name": "wash", "type": "rgb",
        "channel_setup": ["d", "r", "g", "b", 42]}
SMOKE = {"id": "s", "channel": 30, "name": "smoke", "type": "fixed", "channel_setup": [0]}

CHASE = {
    "id": "e1", "name": "Chase", "type": "chase",
    "fixtures": ["chase_1", "chase_2", "chase_3", "chase_4"],
    "params": {"speed": 60, "fade_in": 0, "fade_out": 0},
}
RAINBOW = {
    "id": "e2", "name": "Rainbow", "type": "rainbow", "fixtures": ["wash"],
    "params": {"speed": 60, "fade_in": 0, "fade_out": 0},
}


def _patch(*effects, devices=None) -> dict:
    return {
        "nodes": [{
            "id": "n", "node_type": "artnet-direct", "host": "127.0.0.1", "port": 6454,
            "refresh_every": 0,
            "universes": {"1": {"devices": copy.deepcopy(
                devices if devices is not None else DIMMERS + [WASH, SMOKE])}},
        }],
        "effects": [copy.deepcopy(e) for e in effects],
    }


def _errors(hass, *effects):
    return [(e["path"], e["code"])
            for e in validate_patch(hass, _patch(*effects), DmxRuntime.get(hass))]


async def test_valid_presets(hass):
    assert _errors(hass, CHASE, RAINBOW) == []
    full = {**CHASE, "params": {
        "speed": 120, "size": 50, "base": 10, "spread": 180, "groups": 2, "blocks": 1,
        "wings": 2, "duty": 25, "crossfade": 30, "fade_in": 2, "fade_out": 3, "seed": 4,
        "direction": "bounce", "shuffle": True, "colors": [[255, 0, 0], [0, 0, 255]]}}
    assert _errors(hass, full) == []


@pytest.mark.parametrize(("change", "expected"), [
    ({"name": ""}, ("effects/0/name", "missing_name")),
    ({"type": "strobe"}, ("effects/0/type", "invalid_effect_type")),
    ({"fixtures": []}, ("effects/0/fixtures", "no_fixtures")),
    ({"fixtures": ["nope"]}, ("effects/0/fixtures/0", "unknown_fixture")),
    ({"fixtures": ["smoke"]}, ("effects/0/fixtures/0", "invalid_target")),
    ({"fixtures": ["wash", "wash"]}, ("effects/0/fixtures/1", "duplicate_fixture")),
    ({"params": {"speed": 0}}, ("effects/0/params/speed", "out_of_range")),
    ({"params": {"groups": 1.5}}, ("effects/0/params/groups", "invalid_param")),
    ({"params": {"size": True}}, ("effects/0/params/size", "invalid_param")),
    ({"params": {"direction": "up"}}, ("effects/0/params/direction", "invalid_param")),
    ({"params": {"colors": [[300, 0, 0]]}}, ("effects/0/params/colors", "invalid_param")),
    ({"params": {"wobble": 1}}, ("effects/0/params/wobble", "unknown_param")),
])
async def test_invalid_presets(hass, change, expected):
    assert expected in _errors(hass, {**CHASE, **change})


async def test_effect_names_must_be_unique(hass):
    assert ("effects/1/name", "duplicate_name") in _errors(hass, CHASE, {**RAINBOW, "name": "chase"})
    # light.fx_wash would already be... a fixture called fx_wash
    patch = _patch({**RAINBOW, "name": "Wash"},
                   devices=[{**WASH, "name": "fx_wash"}])
    patch["effects"][0]["fixtures"] = ["fx_wash"]
    errors = validate_patch(hass, patch, DmxRuntime.get(hass))
    assert any(e["code"] == "duplicate_name" for e in errors), errors


async def test_import_keeps_effects(hass, hass_ws_client):
    from homeassistant.setup import async_setup_component
    assert await async_setup_component(hass, DOMAIN, {})
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "dmx_lighting/patch/export", "patch": _patch(CHASE)})
    yaml_text = (await client.receive_json())["result"]["yaml"]
    assert "Chase" in yaml_text
    await client.send_json({"id": 2, "type": "dmx_lighting/patch/import", "content": yaml_text})
    result = (await client.receive_json())["result"]
    assert result["valid"], result["errors"]
    assert result["patch"]["effects"][0]["fixtures"] == CHASE["fixtures"]


# ---- running effects -----------------------------------------------------------


@pytest.fixture
async def running(hass, hass_storage):
    """Set up the entry with a patch; returns (engine, channel-values reader)."""

    async def setup(*effects):
        hass_storage[STORAGE_KEY] = {"version": 1, "data": _patch(*effects)}
        entry = MockConfigEntry(domain=DOMAIN, title="DMX Lighting", data={})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        engine = hass.data[DOMAIN][DATA_ENGINES][entry.entry_id]
        engine.autorun = False  # frames are driven by hand below

        def values(name):
            return list(engine.fixtures[name].channel.get_values())

        return entry, engine, values

    return setup


async def _turn(hass, service, entity_id, **data):
    await hass.services.async_call("light", service, {"entity_id": entity_id, **data},
                                   blocking=True)


async def test_entities_created(hass, running):
    await running(CHASE, RAINBOW)
    assert hass.states.get("light.fx_chase").state == "off"
    assert hass.states.get("light.fx_rainbow") is not None
    assert hass.states.get("number.fx_chase_speed").state == "60.0"
    assert hass.states.get("number.fx_rainbow_fade_in").state == "0.0"


async def test_chase_runs_on_dimmers(hass, running):
    _, engine, values = await running(CHASE)
    await _turn(hass, "turn_on", "light.fx_chase")
    assert hass.states.get("light.fx_chase").state == "on"
    t0 = engine.running["fx_chase"].last_tick

    engine.tick(t0 + 0.1)  # 60 BPM: 0.1 cycles -> first fixture
    assert [values(f"chase_{i}") for i in range(1, 5)] == [[255], [0], [0], [0]]
    engine.tick(t0 + 0.3)
    assert [values(f"chase_{i}") for i in range(1, 5)] == [[0], [255], [0], [0]]
    assert hass.states.get("light.chase_2").attributes["dmx_effect"] == "fx_chase"

    # Master level = the effect light's brightness
    await _turn(hass, "turn_on", "light.fx_chase", brightness=128)
    engine.tick(t0 + 0.3)
    assert values("chase_2") == [128]

    # Stop: fixtures go back to their own (off) state
    await _turn(hass, "turn_off", "light.fx_chase")
    assert [values(f"chase_{i}") for i in range(1, 5)] == [[0]] * 4
    assert hass.states.get("light.fx_chase").state == "off"
    assert engine.owner == {}


async def test_speed_change_is_live_and_saved(hass, running, hass_storage):
    _, engine, values = await running(CHASE)
    await _turn(hass, "turn_on", "light.fx_chase")
    t0 = engine.running["fx_chase"].last_tick
    await hass.services.async_call("number", "set_value",
                                   {"entity_id": "number.fx_chase_speed", "value": 120},
                                   blocking=True)
    engine.tick(t0 + 0.15)  # 120 BPM: 0.3 cycles -> second fixture
    assert values("chase_2") == [255]
    await hass.async_block_till_done()
    stored = hass_storage[STORAGE_KEY]["data"]["effects"][0]
    assert stored["params"]["speed"] == 120


async def test_manual_control_releases_fixture(hass, running):
    _, engine, values = await running(CHASE)
    await _turn(hass, "turn_on", "light.fx_chase")
    t0 = engine.running["fx_chase"].last_tick
    await _turn(hass, "turn_on", "light.chase_1", brightness=50, transition=0)
    assert "chase_1" not in engine.owner
    await engine.fixtures["chase_1"].channel  # its (0 s) fade runs on the node's next frame
    engine.tick(t0 + 0.1)  # the chase would light chase_1 now, but it was released
    assert values("chase_1") == [50]
    assert engine.owner.get("chase_2") == "fx_chase"


async def test_stopping_returns_fixtures_to_their_state(hass, running):
    _, engine, values = await running(CHASE)
    await _turn(hass, "turn_on", "light.chase_3", brightness=77, transition=0)
    await hass.async_block_till_done()
    await _turn(hass, "turn_on", "light.fx_chase")
    t0 = engine.running["fx_chase"].last_tick
    engine.tick(t0 + 0.6)  # chase_3 lit by the chase
    assert values("chase_3") == [255]
    await _turn(hass, "turn_off", "light.fx_chase")
    assert values("chase_3") == [77]
    assert hass.states.get("light.chase_3").state == "on"


async def test_fades_in_and_out(hass, running):
    effect = {**CHASE, "type": "sine", "params": {"speed": 60, "spread": 0,
                                                  "fade_in": 2, "fade_out": 2}}
    _, engine, values = await running(effect)
    await _turn(hass, "turn_on", "light.fx_chase")
    t0 = engine.running["fx_chase"].last_tick
    engine.tick(t0 + 0.5)  # sine peak (255), 1/4 of the way into a 2 s fade from 0
    assert values("chase_1") == [64]
    engine.tick(t0 + 2.5)  # fully in
    assert values("chase_1") == [255]

    engine.stop("fx_chase", now=t0 + 2.5)
    engine.tick(t0 + 3.5)  # sine at 3.5 cycles = peak, halfway out to off
    assert values("chase_1") == [128]
    assert hass.states.get("light.fx_chase").state == "off"  # off as soon as it's stopping
    engine.tick(t0 + 4.6)
    assert "fx_chase" not in engine.running
    assert values("chase_1") == [0]


async def test_transition_overrides_preset_fade(hass, running):
    effect = {**CHASE, "params": {"speed": 60, "fade_in": 5}}
    _, engine, _ = await running(effect)
    await _turn(hass, "turn_on", "light.fx_chase", transition=0)
    assert engine.layers["chase_1"]["intensity"].fade == 0


async def test_last_started_effect_wins(hass, running):
    second = {**CHASE, "id": "e3", "name": "Wave", "type": "sine",
              "fixtures": ["chase_3", "chase_4"], "params": {"speed": 60, "spread": 0,
                                                             "fade_in": 0, "fade_out": 0}}
    _, engine, values = await running(CHASE, second)
    await _turn(hass, "turn_on", "light.fx_chase")
    await _turn(hass, "turn_on", "light.fx_wave")
    assert engine.owner == {"chase_1": "fx_chase", "chase_2": "fx_chase",
                            "chase_3": "fx_wave", "chase_4": "fx_wave"}
    assert hass.states.get("light.fx_chase").attributes["driving"] == ["chase_1", "chase_2"]
    # Stopping the wave hands its fixtures back to their own state, not to the chase.
    await _turn(hass, "turn_off", "light.fx_wave")
    assert "chase_3" not in engine.owner and engine.owner["chase_1"] == "fx_chase"


async def test_colour_effect_keeps_dummy_channels(hass, running):
    _, engine, values = await running(RAINBOW)
    await _turn(hass, "turn_on", "light.fx_rainbow", brightness=255)
    t0 = engine.running["fx_rainbow"].last_tick
    engine.tick(t0)  # hue 0 = red; d, r, g, b, then the dummy channel at 42
    assert values("wash") == [255, 255, 0, 0, 42]
    engine.tick(t0 + 1 / 3)  # a third of the way round = green
    assert values("wash") == [255, 0, 255, 0, 42]
    await _turn(hass, "turn_off", "light.fx_rainbow")
    assert values("wash") == [0, 0, 0, 0, 42]


async def test_effect_state_survives_reload(hass, running):
    entry, engine, _ = await running(CHASE)
    await _turn(hass, "turn_on", "light.fx_chase", brightness=100)
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    new_engine = hass.data[DOMAIN][DATA_ENGINES][entry.entry_id]
    new_engine.autorun = False
    assert new_engine.is_running("fx_chase")
    state = hass.states.get("light.fx_chase")
    assert state.state == "on" and state.attributes["brightness"] == 100
    new_engine.shutdown()


async def test_real_loop_runs_and_stops(hass, running):
    import asyncio

    effect = {**CHASE, "params": {"speed": 600, "fade_in": 0, "fade_out": 0}}
    entry, engine, values = await running(effect)
    engine.autorun = True
    await _turn(hass, "turn_on", "light.fx_chase")
    assert engine._task is not None
    seen = set()
    for _ in range(20):  # 600 BPM = 10 cycles/s: the lit fixture keeps moving
        await asyncio.sleep(0.02)
        seen.add(tuple(values(f"chase_{i}")[0] for i in range(1, 5)))
    assert len(seen) > 1
    await _turn(hass, "turn_off", "light.fx_chase")
    await asyncio.sleep(0.1)
    assert engine._task is None and not engine.running

    # Unloading mid-effect stops the loop cleanly.
    await _turn(hass, "turn_on", "light.fx_chase")
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert engine._task is None and not engine.running


# ---- live preview (panel Effects tab) --------------------------------------------------


async def test_preview_runs_updates_and_stops(hass, running, hass_ws_client):
    _, engine, values = await running()
    client = await hass_ws_client(hass)
    preset = {"name": "", "type": "sine", "fixtures": ["chase_1", "chase_2"],
              "params": {"speed": 60, "spread": 0}}
    await client.send_json({"id": 1, "type": "dmx_lighting/effect/preview",
                            "preview_id": "p1", "preset": preset})
    response = await client.receive_json()
    assert response["success"], response
    assert engine.owner == {"chase_1": "preview:p1", "chase_2": "preview:p1"}

    # Edit while running: swap fixtures and parameters without restarting.
    preset2 = {**preset, "fixtures": ["chase_2", "chase_3"], "params": {"speed": 120, "spread": 0}}
    await client.send_json({"id": 2, "type": "dmx_lighting/effect/preview/update",
                            "preview_id": "p1", "preset": preset2})
    assert (await client.receive_json())["success"]
    assert engine.owner == {"chase_2": "preview:p1", "chase_3": "preview:p1"}
    assert engine.presets["preview:p1"]["params"]["speed"] == 120
    assert values("chase_1") == [0]  # released back to its own (off) state

    # An invalid edit is refused and the last good version keeps running.
    await client.send_json({"id": 3, "type": "dmx_lighting/effect/preview/update",
                            "preview_id": "p1", "preset": {**preset, "type": "nope"}})
    response = await client.receive_json()
    assert not response["success"] and response["error"]["code"] == "invalid_effect"
    assert engine.presets["preview:p1"]["type"] == "sine"

    # Unsubscribing fades it out and forgets the temporary preset.
    await client.send_json({"id": 4, "type": "unsubscribe_events", "subscription": 1})
    assert (await client.receive_json())["success"]
    effect = engine.running["preview:p1"]
    assert effect.stopping
    engine.tick(effect.stop_start + 1)
    assert "preview:p1" not in engine.running and "preview:p1" not in engine.presets
    assert engine.owner == {}


async def test_preview_rejects_bad_presets(hass, running, hass_ws_client):
    await running()
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "dmx_lighting/effect/preview", "preview_id": "x",
                            "preset": {"type": "chase", "fixtures": ["smoke"]}})
    response = await client.receive_json()
    assert not response["success"]
    assert "fixed fixture" in response["error"]["message"]



# ---- layering and colours ------------------------------------------------------------

LEVEL_50 = {"id": "l1", "name": "Half", "type": "sine", "fixtures": ["wash"],
            "params": {"base": 50, "size": 0, "fade_in": 0, "fade_out": 0}}
LEVEL_20 = {**LEVEL_50, "id": "l2", "name": "Low", "params": {"base": 20, "size": 0,
                                                              "fade_in": 2, "fade_out": 0}}


def test_colour_fade_runs_through_every_colour():
    colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]]
    assert color_at("color_wave", 0.0, {"colors": colors}) == (255, 0, 0)
    assert color_at("color_wave", 1 / 3, {"colors": colors}) == (0, 255, 0)
    assert color_at("color_wave", 2 / 3, {"colors": colors}) == (0, 0, 255)
    halfway = color_at("color_wave", 1 / 6, {"colors": colors})
    assert all(abs(a - b) <= 1 for a, b in zip(halfway, (128, 128, 0)))
    assert color_at("color_chase", 0.5, {"colors": colors}) == (0, 255, 0)


async def test_colour_effects_need_two_colours(hass):
    one = {**RAINBOW, "type": "color_chase", "params": {"colors": [[255, 0, 0]]}}
    assert ("effects/0/params/colors", "too_few_colors") in _errors(hass, one)
    two = {**one, "params": {"colors": [[255, 0, 0], [0, 0, 255]]}}
    assert _errors(hass, two) == []


async def test_intensity_and_colour_layer_on_one_fixture(hass, running):
    _, engine, values = await running(LEVEL_50, RAINBOW)
    await _turn(hass, "turn_on", "light.fx_rainbow")
    await _turn(hass, "turn_on", "light.fx_half")
    assert engine.fixture_effects("wash") == ["fx_half", "fx_rainbow"]
    assert hass.states.get("light.wash").attributes["dmx_effect"] == "fx_half, fx_rainbow"
    t0 = engine.running["fx_rainbow"].last_tick

    engine.tick(t0 + 1 / 3)  # rainbow is green; intensity is 50% from the other effect
    assert values("wash") == [128, 0, 128, 0, 42]

    # Stopping the intensity effect leaves the colour running at the colour master level.
    await _turn(hass, "turn_off", "light.fx_half")
    engine.tick(t0 + 1 / 3)
    assert values("wash") == [255, 0, 255, 0, 42]
    assert engine.fixture_effects("wash") == ["fx_rainbow"]

    # And the other way round: colour stops, intensity keeps the fixture's own colour.
    await _turn(hass, "turn_on", "light.fx_half")
    await _turn(hass, "turn_off", "light.fx_rainbow")
    engine.tick(t0 + 1 / 3)
    assert values("wash") == [128, 128, 128, 128, 42]  # its own colour: white

    # Manual control releases both layers.
    await _turn(hass, "turn_on", "light.fx_rainbow")
    await _turn(hass, "turn_on", "light.wash", rgb_color=[0, 0, 255], transition=0)
    assert engine.fixture_effects("wash") == []


async def test_takeover_crossfades_from_the_previous_effect(hass, running):
    _, engine, values = await running(LEVEL_50, LEVEL_20)
    await _turn(hass, "turn_on", "light.fx_half")
    await _turn(hass, "turn_on", "light.fx_low")  # 2 s fade from 50% to 20%
    t0 = engine.layers["wash"]["intensity"].since
    engine.tick(t0 + 1)
    assert values("wash")[0] == 89  # 35% = halfway between 50% and 20%
    engine.tick(t0 + 2.5)
    assert values("wash")[0] == 51  # 20%
    assert engine.layers["wash"]["intensity"].prev is None
