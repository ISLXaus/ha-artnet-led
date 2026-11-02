"""Home Assistant light group helpers, managed from the DMX Patch panel.

These are ordinary light group helpers (Settings -> Devices & services -> Helpers ->
Group -> Light group), owned by Home Assistant's own `group` integration. The panel
creates and edits them through that integration's config and options flows - the
same steps the Helpers UI goes through - so they work everywhere a light group
does: effects, dashboards, automations, voice.

Only light groups are touched.
"""
from __future__ import annotations

import logging

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

log = logging.getLogger(__name__)

GROUP_DOMAIN = "group"


class GroupError(Exception):
    """A group operation failed; the message is shown to the user."""


def _light_group_entries(hass: HomeAssistant) -> list[ConfigEntry]:
    return [
        entry for entry in hass.config_entries.async_entries(GROUP_DOMAIN)
        if entry.options.get("group_type") == "light"
    ]


def _entry(hass: HomeAssistant, entry_id: str) -> ConfigEntry:
    entry = hass.config_entries.async_get_entry(entry_id)
    if entry is None or entry.domain != GROUP_DOMAIN or entry.options.get("group_type") != "light":
        raise GroupError("That light group no longer exists")
    return entry


def _entity_id(hass: HomeAssistant, entry: ConfigEntry) -> str | None:
    registry = er.async_get(hass)
    for reg in er.async_entries_for_config_entry(registry, entry.entry_id):
        if reg.domain == "light":
            return reg.entity_id
    return None


def describe(hass: HomeAssistant, entry: ConfigEntry) -> dict:
    return {
        "entry_id": entry.entry_id,
        "name": entry.options.get("name") or entry.title,
        "entity_id": _entity_id(hass, entry),
        "entities": list(entry.options.get("entities") or []),
        "hide_members": bool(entry.options.get("hide_members", False)),
    }


def list_groups(hass: HomeAssistant) -> list[dict]:
    groups = [describe(hass, entry) for entry in _light_group_entries(hass)]
    return sorted(groups, key=lambda g: g["name"].lower())


def _schema_keys(result: dict) -> list[str]:
    """Field names of a flow form step (so we only send what it accepts)."""
    schema = result.get("data_schema")
    if schema is None:
        return []
    return [str(key) for key in getattr(schema, "schema", {})]


def _check_entities(entities) -> list[str]:
    if not isinstance(entities, list) or not entities:
        raise GroupError("Pick at least one light for the group")
    if not all(isinstance(e, str) and e.startswith("light.") for e in entities):
        raise GroupError("A light group can only contain lights")
    return list(dict.fromkeys(entities))


async def create_group(hass: HomeAssistant, name: str, entities: list[str]) -> dict:
    """Create a light group helper, exactly as Helpers -> Group -> Light group does."""
    name = (name or "").strip()
    if not name:
        raise GroupError("Give the group a name")
    entities = _check_entities(entities)

    flow = hass.config_entries.flow
    result = await flow.async_init(GROUP_DOMAIN, context={"source": "user"})
    if result.get("type") == "menu":
        result = await flow.async_configure(result["flow_id"], {"next_step_id": "light"})
    if result.get("type") != "form" or result.get("step_id") != "light":
        if "flow_id" in result:
            flow.async_abort(result["flow_id"])
        raise GroupError("Home Assistant's group helper didn't offer a light group")

    keys = _schema_keys(result)
    data = {"name": name, "entities": entities}
    if "hide_members" in keys:
        data["hide_members"] = False
    if "all" in keys:
        data["all"] = False
    result = await flow.async_configure(result["flow_id"], data)
    if result.get("type") != "create_entry":
        raise GroupError(f"Couldn't create the group: {result.get('errors') or result.get('reason')}")
    entry: ConfigEntry = result["result"]
    await hass.async_block_till_done()
    return describe(hass, entry)


async def update_group(hass: HomeAssistant, entry_id: str, *, name: str | None = None,
                       entities: list[str] | None = None) -> dict:
    """Change a light group's members (via its options flow) and/or its name."""
    entry = _entry(hass, entry_id)

    if entities is not None:
        entities = _check_entities(entities)
        options = hass.config_entries.options
        result = await options.async_init(entry_id)
        if result.get("type") != "form":
            raise GroupError("Home Assistant's group helper can't be edited right now")
        keys = _schema_keys(result)
        # Send back the current values of every field, with the new members.
        data = {key: entry.options[key] for key in keys if key in entry.options}
        data["entities"] = entities
        result = await options.async_configure(result["flow_id"], data)
        if result.get("type") != "create_entry":
            raise GroupError(f"Couldn't update the group: {result.get('errors') or result.get('reason')}")
        entry = _entry(hass, entry_id)

    if name is not None and (name := name.strip()) and name != entry.options.get("name"):
        # The group light is named after the entry (title / "name" option). The group
        # integration only reloads after its own options flow, so reload it here so the
        # light picks up the new name. Its entity_id stays.
        hass.config_entries.async_update_entry(
            entry, title=name, options={**entry.options, "name": name})
        await hass.config_entries.async_reload(entry_id)

    await hass.async_block_till_done()
    return describe(hass, _entry(hass, entry_id))


async def delete_group(hass: HomeAssistant, entry_id: str) -> None:
    _entry(hass, entry_id)
    await hass.config_entries.async_remove(entry_id)


# ---- WebSocket API ------------------------------------------------------------------


def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_groups_list)
    websocket_api.async_register_command(hass, ws_groups_create)
    websocket_api.async_register_command(hass, ws_groups_update)
    websocket_api.async_register_command(hass, ws_groups_delete)


@websocket_api.websocket_command({vol.Required("type"): "dmx_lighting/groups/list"})
@websocket_api.async_response
async def ws_groups_list(hass: HomeAssistant, connection, msg) -> None:
    connection.send_result(msg["id"], {"groups": list_groups(hass)})


def _ws(handler):
    """Run a group operation and turn GroupError into a readable WS error."""
    async def run(hass: HomeAssistant, connection, msg) -> None:
        try:
            result = await handler(hass, msg)
        except GroupError as err:
            connection.send_error(msg["id"], "group_error", str(err))
            return
        connection.send_result(msg["id"], result)
    return run


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/groups/create",
        vol.Required("name"): str,
        vol.Required("entities"): [str],
    }
)
@websocket_api.async_response
@_ws
async def ws_groups_create(hass: HomeAssistant, msg) -> dict:
    return await create_group(hass, msg["name"], msg["entities"])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/groups/update",
        vol.Required("entry_id"): str,
        vol.Optional("name"): str,
        vol.Optional("entities"): [str],
    }
)
@websocket_api.async_response
@_ws
async def ws_groups_update(hass: HomeAssistant, msg) -> dict:
    return await update_group(hass, msg["entry_id"], name=msg.get("name"),
                              entities=msg.get("entities"))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dmx_lighting/groups/delete",
        vol.Required("entry_id"): str,
    }
)
@websocket_api.async_response
@_ws
async def ws_groups_delete(hass: HomeAssistant, msg) -> dict:
    await delete_group(hass, msg["entry_id"])
    return {}
