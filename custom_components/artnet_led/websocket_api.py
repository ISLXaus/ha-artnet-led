"""WebSocket API backing the DMX patch panel."""
from __future__ import annotations

import logging

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er

from custom_components.artnet_led.const import (
    DATA_MONITOR,
    DATA_STORE,
    DOMAIN,
    NODE_TYPE_ARTNET_CONTROLLER,
    OWNER_YAML,
    STORAGE_VERSION,
)
from custom_components.artnet_led.runtime import ArtNetRuntime

log = logging.getLogger(__name__)


def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_patch_get)
    websocket_api.async_register_command(hass, ws_patch_validate)
    websocket_api.async_register_command(hass, ws_patch_save)
    websocket_api.async_register_command(hass, ws_status_get)
    websocket_api.async_register_command(hass, ws_entity_map_get)
    websocket_api.async_register_command(hass, ws_dmx_subscribe)


def _store(hass: HomeAssistant):
    return hass.data[DOMAIN][DATA_STORE]


def _entry(hass: HomeAssistant):
    entries = hass.config_entries.async_entries(DOMAIN)
    return entries[0] if entries else None


@websocket_api.websocket_command({vol.Required("type"): "artnet_led/patch/get"})
@websocket_api.async_response
async def ws_patch_get(hass: HomeAssistant, connection, msg) -> None:
    from custom_components.artnet_led.validation import validate_patch

    runtime = ArtNetRuntime.get(hass)
    patch = await _store(hass).async_load()
    connection.send_result(
        msg["id"],
        {
            "schema_version": STORAGE_VERSION,
            "patch": patch,
            "yaml_nodes": runtime.snapshot(owner=OWNER_YAML),
            "entry_exists": _entry(hass) is not None,
            # Problems in the *stored* patch (e.g. after an upgrade tightened the
            # rules), so the panel can point at them immediately.
            "errors": validate_patch(hass, patch, runtime),
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "artnet_led/patch/validate",
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_patch_validate(hass: HomeAssistant, connection, msg) -> None:
    from custom_components.artnet_led.validation import validate_patch

    runtime = ArtNetRuntime.get(hass)
    errors = validate_patch(hass, msg["patch"], runtime)
    connection.send_result(msg["id"], {"valid": not errors, "errors": errors})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "artnet_led/patch/save",
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_patch_save(hass: HomeAssistant, connection, msg) -> None:
    from custom_components.artnet_led.validation import validate_patch

    runtime = ArtNetRuntime.get(hass)
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


@websocket_api.websocket_command({vol.Required("type"): "artnet_led/status/get"})
@websocket_api.async_response
async def ws_status_get(hass: HomeAssistant, connection, msg) -> None:
    from socket import inet_ntoa

    runtime = ArtNetRuntime.get(hass)

    discovered = []
    for handle in runtime.handles():
        if handle.node_type != NODE_TYPE_ARTNET_CONTROLLER:
            continue
        server = handle.node.server
        for (ip, bind_index), node in server.nodes_by_ip.items():
            discovered.append(
                {
                    "ip": inet_ntoa(ip),
                    "bind_index": bind_index,
                    "net": node.net_switch,
                    "sub_net": node.sub_switch,
                    "port_addresses": [str(a) for a in sorted(node.get_addresses())],
                    "last_seen": node.last_seen.isoformat(),
                }
            )

    connection.send_result(
        msg["id"],
        {"nodes": runtime.snapshot(), "discovered": discovered},
    )


@websocket_api.websocket_command({vol.Required("type"): "artnet_led/entity_map/get"})
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
        vol.Required("type"): "artnet_led/dmx/subscribe",
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
