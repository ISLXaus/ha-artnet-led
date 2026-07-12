"""Unit tests for patch validation and footprint math."""
from custom_components.artnet_led.runtime import ArtNetRuntime
from custom_components.artnet_led.validation import (
    compute_channel_width,
    compute_dmx_footprint,
    validate_patch,
)


def test_channel_widths():
    assert compute_channel_width("dimmer", None) == 1
    assert compute_channel_width("binary", None) == 1
    assert compute_channel_width("rgb", None) == 3
    assert compute_channel_width("rgbw", None) == 4
    assert compute_channel_width("rgbww", None) == 5
    assert compute_channel_width("color_temp", None) == 2
    assert compute_channel_width("xy", None) == 3
    assert compute_channel_width("fixed", None) == 1
    assert compute_channel_width("color_temp", "dCH") == 3
    assert compute_channel_width("fixed", [255, 0, 128]) == 3


def test_footprint_16bit():
    device = {"channel": 10, "type": "rgb", "channel_size": "16bit"}
    assert compute_dmx_footprint(device) == (10, 15)


async def test_validate_rejects_footprint_past_512(hass):
    runtime = ArtNetRuntime.get(hass)
    patch = {
        "nodes": [
            {
                "id": "n", "node_type": "artnet-direct", "host": "1.2.3.4",
                "universes": {
                    "0": {"devices": [{"id": "d", "channel": 511, "name": "x", "type": "rgb"}]}
                },
            }
        ]
    }
    errors = validate_patch(hass, patch, runtime)
    assert any(e["code"] == "exceeds_universe" for e in errors)


async def test_validate_duplicate_names(hass):
    runtime = ArtNetRuntime.get(hass)
    patch = {
        "nodes": [
            {
                "id": "n", "node_type": "artnet-direct", "host": "1.2.3.4",
                "universes": {
                    "0": {
                        "devices": [
                            {"id": "a", "channel": 1, "name": "Same Name", "type": "dimmer"},
                            {"id": "b", "channel": 5, "name": "same_name", "type": "dimmer"},
                        ]
                    }
                },
            }
        ]
    }
    errors = validate_patch(hass, patch, runtime)
    assert any(e["code"] == "duplicate_name" for e in errors)


async def test_validate_ok_patch(hass):
    runtime = ArtNetRuntime.get(hass)
    patch = {
        "nodes": [
            {
                "id": "n", "node_type": "sacn", "host": "1.2.3.4", "port": None,
                "max_fps": 30, "refresh_every": 0,
                "universes": {
                    "1": {
                        "output_correction": "quadratic",
                        "devices": [
                            {"id": "a", "channel": 1, "name": "spot_a", "type": "rgbw",
                             "channel_size": "16bit"},
                            {"id": "b", "channel": 9, "name": "spot_b", "type": "dimmer"},
                        ],
                    }
                },
            }
        ]
    }
    assert validate_patch(hass, patch, runtime) == []
