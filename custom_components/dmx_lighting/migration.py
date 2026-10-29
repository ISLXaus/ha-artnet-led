"""One-time move of an existing install from the old `artnet_led` domain.

Before v0.3.0 this integration was called `artnet_led`. On first setup of the
`dmx_lighting` entry this:

1. copies the patch from `.storage/artnet_led.patch` (if this entry has none yet),
2. moves every light registered under the old domain to this entry, keeping its
   entity_id, so history, dashboards and automations keep working,
3. removes the old config entry.

Each step is a no-op when there is nothing to move, so running it again is safe.
"""
from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.storage import Store

from custom_components.dmx_lighting.const import (
    DATA_STORE,
    DOMAIN,
    LEGACY_DOMAIN,
    LEGACY_STORAGE_KEY,
    STORAGE_VERSION,
)

log = logging.getLogger(__name__)


async def async_migrate_legacy_install(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await _async_migrate_patch(hass)

    legacy_entries = hass.config_entries.async_entries(LEGACY_DOMAIN)

    # Entities can only change platform while they aren't loaded, so stop the
    # old integration first in case its files are still installed.
    for legacy_entry in legacy_entries:
        if legacy_entry.state is ConfigEntryState.LOADED:
            await hass.config_entries.async_unload(legacy_entry.entry_id)

    _migrate_entities(hass, entry)

    for legacy_entry in legacy_entries:
        log.info("Removing the old %s config entry '%s'", LEGACY_DOMAIN, legacy_entry.title)
        await hass.config_entries.async_remove(legacy_entry.entry_id)


async def _async_migrate_patch(hass: HomeAssistant) -> None:
    legacy_store = Store(hass, STORAGE_VERSION, LEGACY_STORAGE_KEY)
    legacy_patch = await legacy_store.async_load()
    if not legacy_patch:
        return

    store = hass.data[DOMAIN][DATA_STORE]
    current = await store.async_load()
    if current.get("nodes"):
        log.warning(
            "Found an old patch in .storage/%s but the DMX Lighting patch is not empty; "
            "leaving the old file alone. Import it with the panel's YAML button if needed.",
            LEGACY_STORAGE_KEY,
        )
        return

    legacy_patch.setdefault("nodes", [])
    await store.async_save(legacy_patch)
    await legacy_store.async_remove()
    log.info("Moved the DMX patch from .storage/%s (%d node(s))",
             LEGACY_STORAGE_KEY, len(legacy_patch["nodes"]))


def _migrate_entities(hass: HomeAssistant, entry: ConfigEntry) -> None:
    registry = er.async_get(hass)
    legacy = [e for e in registry.entities.values() if e.platform == LEGACY_DOMAIN]

    moved = 0
    for reg_entry in legacy:
        entity_id = reg_entry.entity_id

        if registry.async_get_entity_id(reg_entry.domain, DOMAIN, reg_entry.unique_id):
            log.warning("Not moving %s: a DMX Lighting entity with unique_id '%s' already "
                        "exists", entity_id, reg_entry.unique_id)
            continue

        state = hass.states.get(entity_id)
        if state is not None:
            if not state.attributes.get("restored"):
                log.warning("Not moving %s: it is still provided by %s",
                            entity_id, LEGACY_DOMAIN)
                continue
            # HA's placeholder "unavailable" state for an entity nobody provides.
            hass.states.async_remove(entity_id)

        registry.async_update_entity_platform(
            entity_id, DOMAIN, new_config_entry_id=entry.entry_id
        )
        moved += 1

    if moved:
        log.info("Moved %d entit%s from %s to %s",
                 moved, "y" if moved == 1 else "ies", LEGACY_DOMAIN, DOMAIN)
