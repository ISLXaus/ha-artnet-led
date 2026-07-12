"""Config entry lifecycle: setup from stored patch, live reload, teardown."""
import pytest
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

# The tests drive real pyartnet nodes, which bind UDP sockets.
pytestmark = pytest.mark.usefixtures("socket_enabled")

from custom_components.artnet_led.const import (
    DATA_STORE,
    DOMAIN,
    STORAGE_KEY,
)

PATCH_DOC = {
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
                    "devices": [
                        {
                            "id": "dev-1",
                            "channel": 1,
                            "name": "ui_test_dimmer",
                            "type": "dimmer",
                        },
                        {
                            "id": "dev-2",
                            "channel": 10,
                            "name": "ui_test_rgb",
                            "type": "rgb",
                        },
                    ],
                }
            },
        }
    ]
}


@pytest.fixture
def stored_patch(hass_storage):
    hass_storage[STORAGE_KEY] = {"version": 1, "data": PATCH_DOC}
    return hass_storage


async def test_entry_creates_entities_and_unloads(hass, stored_patch):
    entry = MockConfigEntry(domain=DOMAIN, title="DMX Patch", data={})
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    state = hass.states.get("light.ui_test_dimmer")
    assert state is not None
    assert hass.states.get("light.ui_test_rgb") is not None

    from homeassistant.helpers import entity_registry as er

    registry = er.async_get(hass)
    reg_entry = registry.async_get("light.ui_test_dimmer")
    assert reg_entry is not None
    assert reg_entry.unique_id == "dmx:127.0.0.1/1/1"

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    assert hass.states.get("light.ui_test_dimmer").state == "unavailable"


async def test_entry_reload_preserves_unique_id(hass, stored_patch):
    entry = MockConfigEntry(domain=DOMAIN, title="DMX Patch", data={})
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()

    from homeassistant.helpers import entity_registry as er

    registry = er.async_get(hass)
    reg_entry = registry.async_get("light.ui_test_dimmer")
    assert reg_entry is not None
    assert reg_entry.unique_id == "dmx:127.0.0.1/1/1"
    assert hass.states.get("light.ui_test_dimmer").state != "unavailable"


async def test_ws_patch_save_triggers_reload(hass, stored_patch, hass_ws_client):
    assert await async_setup_component(hass, DOMAIN, {})
    entry = MockConfigEntry(domain=DOMAIN, title="DMX Patch", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)

    # Add a new fixture and save; its entity should appear without a restart.
    import copy

    new_patch = copy.deepcopy(PATCH_DOC)
    new_patch["nodes"][0]["universes"]["1"]["devices"].append(
        {"id": "dev-new", "channel": 20, "name": "ui_test_added_live", "type": "dimmer"}
    )

    await client.send_json(
        {"id": 1, "type": "artnet_led/patch/save", "patch": new_patch}
    )
    response = await client.receive_json()
    assert response["success"], response
    assert response["result"]["success"] is True

    await hass.async_block_till_done()

    assert hass.states.get("light.ui_test_added_live") is not None
    # Pre-existing entities survived the live reload.
    assert hass.states.get("light.ui_test_dimmer").state != "unavailable"


async def test_ws_validate_rejects_overlap(hass, hass_ws_client):
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)

    import copy

    bad_patch = copy.deepcopy(PATCH_DOC)
    # rgb at channel 10 occupies 10-12; place another device at 11.
    bad_patch["nodes"][0]["universes"]["1"]["devices"].append(
        {"id": "dev-3", "channel": 11, "name": "ui_overlapping", "type": "dimmer"}
    )

    await client.send_json(
        {"id": 1, "type": "artnet_led/patch/validate", "patch": bad_patch}
    )
    response = await client.receive_json()
    assert response["success"]
    assert response["result"]["valid"] is False
    codes = {e["code"] for e in response["result"]["errors"]}
    assert "channel_overlap" in codes
