"""WebSocket API backing the DMX patch panel."""
from __future__ import annotations

import logging

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er

from custom_components.dmx_lighting.const import (
    DATA_MONITOR,
    DATA_STORE,
    DOMAIN,
    STORAGE_VERSION,
)
from custom_components.dmx_lighting.runtime import DmxRuntime

log = logging.getLogger(__name__)


def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_patch_get)
    websocket_api.async_register_command(hass, ws_patch_validate)
    websocket_api.async_register_command(hass, ws_patch_save)
    websocket_api.async_register_command(hass, ws_patch_export)
    websocket_api.async_register_command(hass, ws_patch_import)
    websocket_api.async_register_command(hass, ws_status_get)
    websocket_api.async_register_command(hass, ws_entity_map_get)
    websocket_api.async_register_command(hass, ws_dmx_subscribe)
    websocket_api.async_register_command(hass, ws_effect_preview)
    websocket_api.async_register_command(hass, ws_effect_preview_update)


def _store(hass: HomeAssistant):
    return hass.data[DOMAIN][DATA_STORE]


def _entry(hass: HomeAssistant):
    entries = hass.config_entries.async_entries(DOMAIN)
    return entries[0] if entries else None


@websocket_api.websocket_command({vol.Required("type"): "dmx_lighting/patch/get"})
@websocket_api.async_response
async def ws_patch_get(hass: HomeAssistant, connection, msg) -> None:
    from custom_components.dmx_lighting.validation import validate_patch

    runtime = DmxRuntime.get(hass)
    patch = await _store(hass).async_load()
    connection.send_result(
        msg["id"],
        {
            "schema_version": STORAGE_VERSION,
            "patch": patch,
            "entry_exists": _entry(hass) is not None,
            # Problems in the *stored* patch (e.g. after an upgrade tightened the
            # rules), so the panel can point at them immediately.
            "errors": validate_patch(hass, patch, runtime),
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/patch/validate",
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_patch_validate(hass: HomeAssistant, connection, msg) -> None:
    from custom_components.dmx_lighting.validation import validate_patch

    runtime = DmxRuntime.get(hass)
    errors = validate_patch(hass, msg["patch"], runtime)
    connection.send_result(msg["id"], {"valid": not errors, "errors": errors})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/patch/save",
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_patch_save(hass: HomeAssistant, connection, msg) -> None:
    from custom_components.dmx_lighting.validation import validate_patch

    runtime = DmxRuntime.get(hass)
    patch = msg["patch"]

    errors = validate_patch(hass, patch, runtime)
    if errors:
        connection.send_result(msg["id"], {"success": False, "errors": errors})
        return

    await _store(hass).async_save(patch)

    entry = _entry(hass)
    if entry is not None:
        hass.config_entries.async_schedule_reload(entry.entry_id)
    else:
        # First save: create the config entry, which triggers setup.
        await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": "import"}, data={}
        )

    connection.send_result(msg["id"], {"success": True, "errors": []})


def _strip_ids(value):
    """Remove panel-internal 'id' fields for clean, shareable YAML."""
    if isinstance(value, dict):
        return {k: _strip_ids(v) for k, v in value.items() if k != "id"}
    if isinstance(value, list):
        return [_strip_ids(v) for v in value]
    return value


def _ensure_ids(patch: dict) -> dict:
    """(Re)generate the panel-internal ids after an import."""
    from uuid import uuid4

    for node in patch.get("nodes", []):
        if isinstance(node, dict):
            node["id"] = str(uuid4())
            for universe in (node.get("universes") or {}).values():
                if isinstance(universe, dict):
                    for device in universe.get("devices") or []:
                        if isinstance(device, dict):
                            device["id"] = str(uuid4())
    for effect in patch.get("effects") or []:
        if isinstance(effect, dict):
            effect["id"] = str(uuid4())
    return patch


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/patch/export",
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_patch_export(hass: HomeAssistant, connection, msg) -> None:
    """Serialize a patch document (usually the panel's working copy) to YAML."""
    import yaml

    class _Dumper(yaml.SafeDumper):
        """Short lists of plain values (channel_setup, channel_labels) stay on one line."""

        def represent_list(self, data):
            flow = bool(data) and all(
                isinstance(v, (str, int, float, bool)) or v is None for v in data)
            return self.represent_sequence("tag:yaml.org,2002:seq", data, flow_style=flow)

    _Dumper.add_representer(list, _Dumper.represent_list)

    text = yaml.dump(
        _strip_ids(msg["patch"]), Dumper=_Dumper, sort_keys=False,
        default_flow_style=False, indent=2, allow_unicode=True,
    )
    connection.send_result(msg["id"], {"yaml": text})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/patch/import",
        vol.Required("content"): str,
    }
)
@websocket_api.async_response
async def ws_patch_import(hass: HomeAssistant, connection, msg) -> None:
    """Parse YAML (or JSON) into a patch document and validate it.

    The result is NOT saved; the panel loads it into the editor as unsaved
    changes so the user can review and Save & Apply.
    """
    import yaml

    from custom_components.dmx_lighting.validation import validate_patch

    try:
        data = yaml.safe_load(msg["content"])
    except yaml.YAMLError as e:
        connection.send_error(msg["id"], "invalid_yaml", f"Could not parse YAML: {e}")
        return

    if isinstance(data, list):
        data = {"nodes": data}
    if not isinstance(data, dict) or not isinstance(data.get("nodes"), list):
        connection.send_error(
            msg["id"], "invalid_structure",
            "Expected a document with a 'nodes:' list (or a bare list of nodes)",
        )
        return

    imported = {"nodes": data["nodes"]}
    if "effects" in data:
        imported["effects"] = data["effects"]
    patch = _ensure_ids(imported)
    errors = validate_patch(hass, patch, DmxRuntime.get(hass))
    connection.send_result(msg["id"], {"patch": patch, "valid": not errors, "errors": errors})


@websocket_api.websocket_command({vol.Required("type"): "dmx_lighting/status/get"})
@websocket_api.async_response
async def ws_status_get(hass: HomeAssistant, connection, msg) -> None:
    connection.send_result(msg["id"], {"nodes": DmxRuntime.get(hass).snapshot()})


@websocket_api.websocket_command({vol.Required("type"): "dmx_lighting/entity_map/get"})
@websocket_api.async_response
async def ws_entity_map_get(hass: HomeAssistant, connection, msg) -> None:
    registry = er.async_get(hass)
    entity_map = {
        entry.unique_id: entry.entity_id
        for entry in registry.entities.values()
        if entry.platform == DOMAIN
    }
    connection.send_result(msg["id"], {"entities": entity_map})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/dmx/subscribe",
        vol.Required("node_key"): str,
        vol.Required("universe"): int,
    }
)
@websocket_api.async_response
async def ws_dmx_subscribe(hass: HomeAssistant, connection, msg) -> None:
    monitor = hass.data[DOMAIN].get(DATA_MONITOR)
    if monitor is None:
        connection.send_error(msg["id"], "not_available", "DMX monitor not initialized")
        return

    msg_id = msg["id"]

    @callback
    def forward(payload: dict) -> None:
        connection.send_event(msg_id, payload)

    unsub = monitor.subscribe(msg["node_key"], msg["universe"], forward)
    connection.subscriptions[msg_id] = unsub
    connection.send_result(msg_id)


# ---- effect live preview -------------------------------------------------------
#
# The Effects tab runs the effect being edited on the real fixtures before it is
# saved. A preview is a subscription: it stops (fading out) when the panel
# unsubscribes or the connection drops, and "update" swaps in edited parameters.

DATA_PREVIEWS = "effect_previews"  # (connection id, preview id) -> engine key


def _engine(hass: HomeAssistant):
    from custom_components.dmx_lighting.const import DATA_ENGINES

    engines = hass.data[DOMAIN].get(DATA_ENGINES) or {}
    return next(iter(engines.values()), None)


def _preview_errors(engine, preset: dict) -> list[str]:
    from custom_components.dmx_lighting.validation import effect_errors

    fixture_types = {name: f._type for name, f in engine.fixtures.items()}
    checked = {**preset, "name": preset.get("name") or "Preview"}
    return [message for _, _, message in effect_errors([checked], fixture_types, {})]


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/effect/preview",
        vol.Required("preview_id"): str,
        vol.Required("preset"): dict,
        vol.Optional("level", default=1.0): vol.All(vol.Coerce(float), vol.Range(0, 1)),
    }
)
@callback
def ws_effect_preview(hass: HomeAssistant, connection, msg) -> None:
    engine = _engine(hass)
    if engine is None:
        connection.send_error(msg["id"], "not_available",
                              "Save & Apply the patch first so the fixtures exist")
        return
    if errors := _preview_errors(engine, msg["preset"]):
        connection.send_error(msg["id"], "invalid_effect", "; ".join(errors))
        return

    key = f"preview:{msg['preview_id']}"
    engine.presets[key] = msg["preset"]
    engine.start(key, msg["level"], fade_in=0.3)
    previews = hass.data[DOMAIN].setdefault(DATA_PREVIEWS, {})
    previews[(id(connection), msg["preview_id"])] = key

    @callback
    def stop() -> None:
        previews.pop((id(connection), msg["preview_id"]), None)
        engine.stop_and_remove(key, fade_out=0.5)

    connection.subscriptions[msg["id"]] = stop
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/effect/preview/update",
        vol.Required("preview_id"): str,
        vol.Required("preset"): dict,
        vol.Optional("level"): vol.All(vol.Coerce(float), vol.Range(0, 1)),
    }
)
@callback
def ws_effect_preview_update(hass: HomeAssistant, connection, msg) -> None:
    engine = _engine(hass)
    key = (hass.data[DOMAIN].get(DATA_PREVIEWS) or {}).get(
        (id(connection), msg["preview_id"]))
    if engine is None or key is None:
        connection.send_error(msg["id"], "not_found", "No preview running")
        return
    if errors := _preview_errors(engine, msg["preset"]):
        # Keep showing the last valid version; the panel shows the problem.
        connection.send_error(msg["id"], "invalid_effect", "; ".join(errors))
        return
    engine.update_preset(key, msg["preset"])
    if "level" in msg:
        engine.set_level(key, msg["level"])
    connection.send_result(msg["id"])
