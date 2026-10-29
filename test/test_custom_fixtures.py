"""Custom fixtures: channel layouts with dummy (fixed-value) channels and labels."""
import asyncio
import copy

import pytest
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dmx_lighting.const import DOMAIN, STORAGE_KEY
from custom_components.dmx_lighting.runtime import DmxRuntime
from custom_components.dmx_lighting.channel_switch import from_values, off_values
from custom_components.dmx_lighting.validation import (
    compute_dmx_footprint,
    patch_node_to_setup_config,
    validate_patch,
)

# The tests drive real pyartnet nodes, which bind UDP sockets.
pytestmark = pytest.mark.usefixtures("socket_enabled")

# A moving-head style fixture: dimmer, RGB, then Mode and Strobe dummy channels.
CUSTOM_RGB = {
    "id": "dev-1",
    "channel": 1,
    "name": "wash_1",
    "type": "rgb",
    "channel_setup": ["d", "r", "g", "b", 42, 200],
    "channel_labels": [None, None, None, None, "Mode", "Strobe"],
}
# A dimmer pack channel with a trailing "curve" dummy channel.
CUSTOM_DIMMER = {
    "id": "dev-2",
    "channel": 20,
    "name": "par_1",
    "type": "dimmer",
    "channel_setup": ["d", 17],
    "channel_labels": [None, "Curve"],
}


def _patch(*devices) -> dict:
    return {
        "nodes": [
            {
                "id": "node-1",
                "node_type": "artnet-direct",
                "host": "127.0.0.1",
                "port": 6454,
                "max_fps": 25,
                "refresh_every": 0,
                "universes": {
                    "1": {
                        "send_partial_universe": True,
                        "output_correction": "linear",
                        "devices": [copy.deepcopy(d) for d in devices],
                    }
                },
            }
        ]
    }


def _errors(hass, *devices) -> list[dict]:
    return validate_patch(hass, _patch(*devices), DmxRuntime.get(hass))


# ---- validation ---------------------------------------------------------------


async def test_valid_custom_fixture(hass):
    assert _errors(hass, CUSTOM_RGB, CUSTOM_DIMMER) == []


async def test_footprint_includes_dummy_channels():
    assert compute_dmx_footprint(CUSTOM_RGB) == (1, 6)
    # Dimmers used to be fixed at one channel; dummy channels now widen them.
    assert compute_dmx_footprint(CUSTOM_DIMMER) == (20, 21)
    assert compute_dmx_footprint({**CUSTOM_DIMMER, "channel_size": "16bit"}) == (20, 23)


async def test_overlap_with_dummy_channel_is_rejected(hass):
    # Channel 6 is wash_1's Strobe dummy channel.
    other = {"id": "x", "channel": 6, "name": "other", "type": "dimmer"}
    errors = _errors(hass, CUSTOM_RGB, other)
    assert [e["code"] for e in errors] == ["channel_overlap"]
    assert errors[0]["path"] == "nodes/0/universes/1/devices/1/channel"


async def test_dummy_channel_beyond_512_is_rejected(hass):
    errors = _errors(hass, {**CUSTOM_RGB, "channel": 508})
    assert [e["code"] for e in errors] == ["exceeds_universe"]


@pytest.mark.parametrize(
    ("changes", "code", "path"),
    [
        ({"channel_setup": ["d", 256]}, "invalid_channel_value", "channel_setup/1"),
        ({"channel_setup": ["d", -1]}, "invalid_channel_value", "channel_setup/1"),
        ({"channel_setup": ["d", "q"]}, "invalid_channel_setup", "channel_setup/1"),
        ({"channel_setup": ["d", 1.5]}, "invalid_channel_setup", "channel_setup/1"),
        ({"channel_setup": ["d", True]}, "invalid_channel_setup", "channel_setup/1"),
        ({"channel_setup": ["d", "rg"]}, "invalid_channel_setup", "channel_setup/1"),
        ({"channel_setup": []}, "invalid_channel_setup", "channel_setup"),
        ({"channel_labels": [None, 5]}, "invalid_channel_label", "channel_labels/1"),
        ({"channel_labels": [None, "x" * 33]}, "invalid_channel_label", "channel_labels/1"),
        ({"channel_labels": [None, "a", "b"]}, "invalid_channel_label", "channel_labels"),
        ({"channel_labels": "Mode"}, "invalid_channel_label", "channel_labels"),
    ],
)
async def test_invalid_channel_layouts(hass, changes, code, path):
    errors = _errors(hass, {**CUSTOM_DIMMER, **changes})
    assert any(
        e["code"] == code and e["path"] == f"nodes/0/universes/1/devices/0/{path}" for e in errors
    ), errors


async def test_labels_are_optional(hass):
    device = {**CUSTOM_RGB}
    device.pop("channel_labels")
    assert _errors(hass, device) == []
    assert _errors(hass, {**CUSTOM_RGB, "channel_labels": None}) == []
    assert _errors(hass, {**CUSTOM_RGB, "channel_labels": ["", None, None, None, "Mode"]}) == []


async def test_type_specific_rules(hass):
    # Fixed fixtures are made only of dummy channels.
    assert _errors(hass, {"id": "f", "channel": 1, "name": "f", "type": "fixed",
                          "channel_setup": [255, 0, 128]}) == []
    errors = _errors(hass, {"id": "f", "channel": 1, "name": "f", "type": "fixed",
                            "channel_setup": [255, "d"]})
    assert [e["code"] for e in errors] == ["invalid_channel_setup"]
    # Binary fixtures have no layout at all.
    errors = _errors(hass, {"id": "b", "channel": 1, "name": "b", "type": "binary",
                            "channel_setup": ["d", 0]})
    assert [e["code"] for e in errors] == ["invalid_channel_setup"]
    # Letters must fit the type (no red on a dimmer).
    errors = _errors(hass, {**CUSTOM_DIMMER, "channel_setup": "dr"})
    assert [e["code"] for e in errors] == ["invalid_channel_setup"]


async def test_setup_config_strips_labels():
    config = patch_node_to_setup_config(_patch(CUSTOM_RGB)["nodes"][0])
    device = config["universes"][1]["devices"][0]
    assert device["channel_setup"] == ["d", "r", "g", "b", 42, 200]
    assert "channel_labels" not in device
    assert "id" not in device


def test_channel_switch_ignores_dummy_channels():
    # from_values used to crash on int entries ("'in <string>' requires string").
    is_on, brightness, red, green, blue, *_ = from_values(
        ["d", 42, "R", "G", "B", 200], 1, [255, 42, 10, 20, 30, 200])
    assert (is_on, brightness, red, green, blue) == (True, 255, 10, 20, 30)
    assert off_values(["d", 42, "r", 200], 256, 4) == [0, 42 * 256, 0, 200 * 256]
    assert off_values("rgb", 1, 3) == [0, 0, 0]


# ---- storage + YAML round trip -------------------------------------------------


async def test_save_stores_layout_and_labels(hass, hass_ws_client, hass_storage):
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "dmx_lighting/patch/save",
                            "patch": _patch(CUSTOM_RGB, CUSTOM_DIMMER)})
    response = await client.receive_json()
    assert response["success"] and response["result"]["success"], response
    await hass.async_block_till_done()

    stored = hass_storage[STORAGE_KEY]["data"]["nodes"][0]["universes"]["1"]["devices"]
    assert stored[0]["channel_setup"] == ["d", "r", "g", "b", 42, 200]
    assert stored[0]["channel_labels"] == [None, None, None, None, "Mode", "Strobe"]
    assert stored[1]["channel_labels"] == [None, "Curve"]

    # Invalid dummy values are refused and not stored.
    await client.send_json({"id": 2, "type": "dmx_lighting/patch/save",
                            "patch": _patch({**CUSTOM_DIMMER, "channel_setup": ["d", 999]})})
    response = await client.receive_json()
    assert response["result"]["success"] is False
    assert response["result"]["errors"][0]["code"] == "invalid_channel_value"
    stored = hass_storage[STORAGE_KEY]["data"]["nodes"][0]["universes"]["1"]["devices"]
    assert stored[1]["channel_setup"] == ["d", 17]


async def test_yaml_roundtrip_keeps_dummy_channels(hass, hass_ws_client):
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "dmx_lighting/patch/export",
                            "patch": _patch(CUSTOM_RGB, CUSTOM_DIMMER)})
    response = await client.receive_json()
    yaml_text = response["result"]["yaml"]
    # Channel layouts export on one line, as you would write them by hand.
    assert "channel_setup: [d, r, g, b, 42, 200]" in yaml_text
    assert "channel_labels: [null, null, null, null, Mode, Strobe]" in yaml_text

    await client.send_json({"id": 2, "type": "dmx_lighting/patch/import", "content": yaml_text})
    response = await client.receive_json()
    result = response["result"]
    assert result["valid"], result["errors"]

    devices = result["patch"]["nodes"][0]["universes"]["1"]["devices"]
    for original, imported in zip((CUSTOM_RGB, CUSTOM_DIMMER), devices):
        assert imported["channel_setup"] == original["channel_setup"]
        assert imported["channel_labels"] == original["channel_labels"]


async def test_yaml_roundtrip_tricky_labels(hass, hass_ws_client):
    """Labels that look like YAML booleans/numbers or contain commas stay strings."""
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    device = {**CUSTOM_DIMMER, "channel_setup": ["d", 0, 1, 2],
              "channel_labels": [None, "On", "12", "Mode, slow"]}
    await client.send_json({"id": 1, "type": "dmx_lighting/patch/export", "patch": _patch(device)})
    yaml_text = (await client.receive_json())["result"]["yaml"]
    await client.send_json({"id": 2, "type": "dmx_lighting/patch/import", "content": yaml_text})
    result = (await client.receive_json())["result"]
    assert result["valid"], result["errors"]
    imported = result["patch"]["nodes"][0]["universes"]["1"]["devices"][0]
    assert imported["channel_labels"] == [None, "On", "12", "Mode, slow"]
    assert imported["channel_setup"] == ["d", 0, 1, 2]


async def test_hand_written_yaml_import(hass, hass_ws_client):
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    content = """
nodes:
  - node_type: artnet-direct
    host: 10.0.0.9
    universes:
      "1":
        devices:
          - channel: 1
            name: spot
            type: rgbw
            channel_setup: [d, r, g, b, w, 0, 300]
            channel_labels: [null, null, null, null, null, Mode, Macro]
"""
    await client.send_json({"id": 1, "type": "dmx_lighting/patch/import", "content": content})
    result = (await client.receive_json())["result"]
    assert result["valid"] is False
    assert [e["path"] for e in result["errors"]] == [
        "nodes/0/universes/1/devices/0/channel_setup/6"]


# ---- DMX output ------------------------------------------------------------------


async def _values(hass, name: str) -> list[int]:
    handle = next(h for h in DmxRuntime.get(hass).handles() if h.host == "127.0.0.1")
    channel = handle.node.get_universe(1).get_channel(name)
    # Let any running fade finish.
    for _ in range(50):
        if channel._current_fade is None:
            break
        await asyncio.sleep(0.02)
    return list(channel.get_values())


async def test_dummy_values_are_output_and_held(hass, hass_storage):
    hass_storage[STORAGE_KEY] = {"version": 1, "data": _patch(CUSTOM_RGB, CUSTOM_DIMMER)}
    entry = MockConfigEntry(domain=DOMAIN, title="DMX Patch", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    # Dummy values are sent from the start, while the lights are still off.
    assert hass.states.get("light.wash_1").state == "off"
    assert await _values(hass, "wash_1") == [0, 0, 0, 0, 42, 200]
    assert await _values(hass, "par_1") == [0, 17]

    await hass.services.async_call(
        "light", "turn_on",
        {"entity_id": "light.wash_1", "rgb_color": [255, 0, 0], "brightness": 128},
        blocking=True,
    )
    await hass.services.async_call(
        "light", "turn_on", {"entity_id": "light.par_1", "brightness": 99}, blocking=True)
    await hass.async_block_till_done()
    assert await _values(hass, "wash_1") == [128, 128, 0, 0, 42, 200]
    assert await _values(hass, "par_1") == [99, 17]

    await hass.services.async_call(
        "light", "turn_off", {"entity_id": ["light.wash_1", "light.par_1"]}, blocking=True)
    await hass.async_block_till_done()
    assert await _values(hass, "wash_1") == [0, 0, 0, 0, 42, 200]
    assert await _values(hass, "par_1") == [0, 17]

    # The entity still reports a sensible state (dummy channels carry no light state).
    state = hass.states.get("light.wash_1")
    assert state.attributes["dmx_channels"] == [1, 2, 3, 4, 5, 6]

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_dummy_values_with_16bit_channels(hass, hass_storage):
    device = {**CUSTOM_DIMMER, "channel_size": "16bit"}
    hass_storage[STORAGE_KEY] = {"version": 1, "data": _patch(device)}
    entry = MockConfigEntry(domain=DOMAIN, title="DMX Patch", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    # 16-bit: the fixed value is the coarse byte (17 * 256), like other letters.
    assert await _values(hass, "par_1") == [0, 17 * 256]

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
