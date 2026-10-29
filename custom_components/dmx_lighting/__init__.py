"""DMX Lighting: Art-Net, sACN (E1.31) and KiNet output, edited in the DMX Patch panel."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from custom_components.dmx_lighting.const import (
    DATA_ENGINES,
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
from custom_components.dmx_lighting.runtime import DmxRuntime, NodeConflictError
from custom_components.dmx_lighting.store import PatchStore

log = logging.getLogger(__name__)

PLATFORMS = ["light", "number"]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Shared setup that runs once, before the config entry."""
    data = hass.data.setdefault(DOMAIN, {})

    DmxRuntime.get(hass)
    data.setdefault(DATA_ENTRY_NODES, {})
    if DATA_STORE not in data:
        data[DATA_STORE] = PatchStore(hass)

    if DATA_MONITOR not in data:
        from custom_components.dmx_lighting.monitor import DmxMonitor

        data[DATA_MONITOR] = DmxMonitor(hass)

    if not data.get("ws_registered"):
        from custom_components.dmx_lighting.websocket_api import async_register_commands

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

    # Cache-bust with the bundle's content, not the integration version: browsers (and
    # HA's service worker) otherwise keep running an old panel after an update that
    # didn't bump the version.
    import hashlib

    bundle = await hass.async_add_executor_job((dist_path / "panel.js").read_bytes)
    bundle_hash = hashlib.sha256(bundle).hexdigest()[:12]

    await async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_WEBCOMPONENT_NAME,
        module_url=f"{FRONTEND_STATIC_PATH}/panel.js?v={bundle_hash}",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        require_admin=True,
    )


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the UI-defined patch from storage."""
    from custom_components.dmx_lighting.validation import (
        patch_node_to_setup_config,
        validate_patch,
    )

    from custom_components.dmx_lighting.migration import async_migrate_legacy_install

    # async_setup always runs first, but be defensive about ordering.
    await async_setup(hass, {})

    # Must run before the patch is loaded and before entities are created.
    await async_migrate_legacy_install(hass, entry)

    runtime = DmxRuntime.get(hass)
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

    # Effect presets: the light platform registers the fixtures and adds an effect
    # light per preset; the number platform adds their live parameters.
    from custom_components.dmx_lighting.effect_engine import EffectEngine
    from custom_components.dmx_lighting.validation import effect_entity_slug

    bad_effects = {
        int(e["path"].split("/")[1])
        for e in errors
        if e["path"].startswith("effects/") and e["path"].split("/")[1].isdigit()
    }
    presets = {}
    for i, effect in enumerate(patch.get("effects") or []):
        if i in bad_effects:
            log.warning("Skipping effect %d (%s) due to validation errors", i,
                        effect.get("name") if isinstance(effect, dict) else effect)
            continue
        presets[effect_entity_slug(effect["name"])] = effect
    engine = EffectEngine(
        hass,
        create_task=lambda coro, name: entry.async_create_background_task(hass, coro, name),
    )
    engine.set_presets(presets)
    hass.data[DOMAIN].setdefault(DATA_ENGINES, {})[entry.entry_id] = engine

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Tear down the entry's entities and nodes so a reload can rebuild them."""
    engine = hass.data[DOMAIN].get(DATA_ENGINES, {}).pop(entry.entry_id, None)
    if engine is not None:
        engine.shutdown()
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)

    runtime = DmxRuntime.get(hass)
    await runtime.release_owner(entry.entry_id)
    hass.data[DOMAIN][DATA_ENTRY_NODES].pop(entry.entry_id, None)

    return unload_ok
