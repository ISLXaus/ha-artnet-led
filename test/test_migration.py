"""Moving an existing install from the old artnet_led domain to dmx_lighting."""
import pytest
from homeassistant import config_entries
from homeassistant.const import STATE_UNAVAILABLE
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dmx_lighting.const import (
    DOMAIN,
    LEGACY_DOMAIN,
    LEGACY_STORAGE_KEY,
    STORAGE_KEY,
)

# The tests drive real pyartnet nodes, which bind UDP sockets.
pytestmark = pytest.mark.usefixtures("socket_enabled")


def _patch(name="kitchen", channel=1):
    return {
        "nodes": [
            {
                "id": "node-1",
                "node_type": "artnet-direct",
                "host": "127.0.0.1",
                "port": 6454,
                "refresh_every": 0,
                "universes": {
                    "1": {
                        "devices": [
                            {"id": "dev-1", "channel": channel, "name": name, "type": "dimmer"},
                        ],
                    }
                },
            }
        ]
    }


def _legacy_install(hass, hass_storage, *, renamed_entity_id="light.kitchen_ceiling"):
    """An artnet_led install whose folder is gone: entry, registry row, placeholder state."""
    hass_storage[LEGACY_STORAGE_KEY] = {"version": 1, "data": _patch()}

    legacy_entry = MockConfigEntry(domain=LEGACY_DOMAIN, title="DMX Patch", data={})
    legacy_entry.add_to_hass(hass)

    registry = er.async_get(hass)
    reg_entry = registry.async_get_or_create(
        "light", LEGACY_DOMAIN, "dmx:127.0.0.1/1/1",
        config_entry=legacy_entry, suggested_object_id="kitchen",
    )
    # The user had renamed the entity; the migration must keep their entity_id.
    registry.async_update_entity(reg_entry.entity_id, new_entity_id=renamed_entity_id)
    hass.states.async_set(renamed_entity_id, STATE_UNAVAILABLE, {"restored": True})
    return legacy_entry


async def _add_integration(hass):
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    await hass.async_block_till_done()
    return hass.config_entries.async_get_entry(result["result"].entry_id)


async def test_legacy_install_is_moved(hass, hass_storage):
    legacy_entry = _legacy_install(hass, hass_storage)

    entry = await _add_integration(hass)

    # The patch moved to the new storage key and the old file is gone.
    assert hass_storage[STORAGE_KEY]["data"]["nodes"][0]["host"] == "127.0.0.1"
    assert LEGACY_STORAGE_KEY not in hass_storage

    # Same entity_id, now owned by the new domain and entry, and running again.
    reg_entry = er.async_get(hass).async_get("light.kitchen_ceiling")
    assert reg_entry.platform == DOMAIN
    assert reg_entry.config_entry_id == entry.entry_id
    assert hass.states.get("light.kitchen_ceiling").state != STATE_UNAVAILABLE
    assert hass.states.get("light.kitchen") is None  # no duplicate entity

    # The old entry is removed.
    assert hass.config_entries.async_get_entry(legacy_entry.entry_id) is None
    assert not hass.config_entries.async_entries(LEGACY_DOMAIN)


async def test_existing_patch_is_not_overwritten(hass, hass_storage):
    _legacy_install(hass, hass_storage)
    hass_storage[STORAGE_KEY] = {"version": 1, "data": _patch(name="new_patch", channel=5)}

    await _add_integration(hass)

    assert hass_storage[STORAGE_KEY]["data"]["nodes"][0]["universes"]["1"]["devices"][0][
        "name"] == "new_patch"
    # The old file is kept so the user can still import it by hand.
    assert LEGACY_STORAGE_KEY in hass_storage


async def test_fresh_install_needs_no_migration(hass, hass_storage):
    entry = await _add_integration(hass)

    assert entry.state is config_entries.ConfigEntryState.LOADED
    assert not er.async_entries_for_config_entry(er.async_get(hass), entry.entry_id)


async def test_migration_runs_once(hass, hass_storage):
    _legacy_install(hass, hass_storage)
    entry = await _add_integration(hass)

    # A reload (e.g. Save & Apply) finds nothing left to move and keeps the entity.
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()

    reg_entry = er.async_get(hass).async_get("light.kitchen_ceiling")
    assert reg_entry.platform == DOMAIN
    assert hass.states.get("light.kitchen_ceiling").state != STATE_UNAVAILABLE
