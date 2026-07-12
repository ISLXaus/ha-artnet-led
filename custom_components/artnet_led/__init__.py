"""ARTNET LED"""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from custom_components.artnet_led.const import (
    DATA_ENTRY_NODES,
    DATA_MONITOR,
    DATA_STORE,
    DOMAIN,
    FRONTEND_STATIC_PATH,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    PANEL_WEBCOMPONENT_NAME,
)
from custom_components.artnet_led.runtime import ArtNetRuntime, NodeConflictError
from custom_components.artnet_led.store import PatchStore

log = logging.getLogger(__name__)

PLATFORMS = ["light"]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Shared setup: runs for YAML-only installs and before any config entry."""
    data = hass.data.setdefault(DOMAIN, {})

    ArtNetRuntime.get(hass)
    data.setdefault(DATA_ENTRY_NODES, {})
    if DATA_STORE not in data:
        data[DATA_STORE] = PatchStore(hass)

    if DATA_MONITOR not in data:
        from custom_components.artnet_led.monitor import DmxMonitor

        data[DATA_MONITOR] = DmxMonitor(hass)

    if not data.get("ws_registered"):
        from custom_components.artnet_led.websocket_api import async_register_commands

        async_register_commands(hass)
        data["ws_registered"] = True

    if not data.get("panel_registered"):
        await _async_register_panel(hass)
        data["panel_registered"] = True

    return True


async def _async_register_panel(hass: HomeAssistant) -> None:
    from homeassistant.components.panel_custom import async_register_panel

    dist_path = Path(__file__).parent / "frontend" / "dist"
    if not (dist_path / "panel.js").exists():
        log.warning("Panel frontend bundle missing (%s); DMX Patch panel not registered",
                    dist_path / "panel.js")
        return

    await hass.http.async_register_static_paths(
        [StaticPathConfig(FRONTEND_STATIC_PATH, str(dist_path), cache_headers=False)]
    )

    from homeassistant.loader import async_get_integration

    integration = await async_get_integration(hass, DOMAIN)

    await async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_WEBCOMPONENT_NAME,
        module_url=f"{FRONTEND_STATIC_PATH}/panel.js?v={integration.version}",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        require_admin=True,
    )


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the UI-defined patch from storage."""
    from custom_components.artnet_led.validation import (
        patch_node_to_setup_config,
        validate_patch,
    )

    # async_setup always runs first, but be defensive about ordering.
    await async_setup(hass, {})

    runtime = ArtNetRuntime.get(hass)
    store: PatchStore = hass.data[DOMAIN][DATA_STORE]
    patch = await store.async_load()

    errors = validate_patch(hass, patch, runtime)
    if errors:
        log.error("Stored DMX patch has %d validation error(s); "
                  "invalid nodes will be skipped: %s", len(errors), errors)

    error_node_indices = {
        int(e["path"].split("/")[1])
        for e in errors
        if e["path"].startswith("nodes/") and e["path"].split("/")[1].isdigit()
    }

    entry_nodes = []
    for i, node in enumerate(patch.get("nodes", [])):
        if i in error_node_indices:
            log.warning("Skipping patch node %d (%s) due to validation errors",
                        i, node.get("host"))
            continue
        try:
            cfg = patch_node_to_setup_config(node)
            handle = await runtime.acquire_node(cfg, owner=entry.entry_id)
        except NodeConflictError as e:
            log.error("Skipping patch node %d: %s", i, e)
            continue
        except Exception:
            # Never let one broken node take down the whole entry (and with it
            # every other node's entities).
            log.exception("Failed to start patch node %d (%s); skipping it",
                          i, node.get("host"))
            continue
        entry_nodes.append((handle, cfg["universes"]))

    hass.data[DOMAIN][DATA_ENTRY_NODES][entry.entry_id] = entry_nodes

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Tear down the entry's entities and nodes so a reload can rebuild them."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)

    runtime = ArtNetRuntime.get(hass)
    await runtime.release_owner(entry.entry_id)
    hass.data[DOMAIN][DATA_ENTRY_NODES].pop(entry.entry_id, None)

    return unload_ok
