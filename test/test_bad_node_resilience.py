"""One broken node in the stored patch must not take down the whole entry."""
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.artnet_led.const import DOMAIN, STORAGE_KEY
from custom_components.artnet_led.runtime import ArtNetRuntime
from custom_components.artnet_led.validation import validate_patch

pytestmark = pytest.mark.usefixtures("socket_enabled")

GOOD_NODE = {
    "id": "good", "node_type": "artnet-direct", "host": "127.0.0.1", "port": 6454,
    "max_fps": 25, "refresh_every": 0,
    "universes": {
        "1": {"devices": [{"id": "g1", "channel": 1, "name": "good_dimmer", "type": "dimmer"}]}
    },
}

# Regression: a port like this crashed async_setup_entry entirely
# (ValueError: port must be between 1 and 65535), so even GOOD_NODE's
# entities never appeared.
BAD_PORT_NODE = {
    "id": "bad", "node_type": "sacn", "host": "10.0.0.162", "port": 999999,
    "universes": {
        "1": {"devices": [{"id": "b1", "channel": 1, "name": "bad_bar", "type": "rgb"}]}
    },
}


async def test_validate_flags_bad_port(hass):
    runtime = ArtNetRuntime.get(hass)
    errors = validate_patch(hass, {"nodes": [BAD_PORT_NODE]}, runtime)
    assert any(e["code"] == "invalid_port" and e["path"] == "nodes/0/port" for e in errors)


async def test_entry_survives_bad_port_node(hass, hass_storage):
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "data": {"nodes": [GOOD_NODE, BAD_PORT_NODE]},
    }

    entry = MockConfigEntry(domain=DOMAIN, title="DMX Patch", data={})
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    # The good node's entity is up; the bad node was skipped, not fatal.
    assert hass.states.get("light.good_dimmer") is not None
    assert hass.states.get("light.bad_bar") is None
