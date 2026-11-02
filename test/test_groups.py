"""Light group helpers made from DMX fixtures, managed over the panel's WebSocket API."""
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dmx_lighting.const import DOMAIN, STORAGE_KEY

pytestmark = pytest.mark.usefixtures("socket_enabled")

PATCH = {
    "nodes": [{
        "id": "n", "node_type": "artnet-direct", "host": "127.0.0.1", "port": 6454,
        "refresh_every": 0,
        "universes": {"1": {"devices": [
            {"id": f"d{i}", "channel": i, "name": f"par_{i}", "type": "dimmer"} for i in range(1, 4)
        ]}},
    }],
}


@pytest.fixture
async def client(hass, hass_storage, hass_ws_client):
    hass_storage[STORAGE_KEY] = {"version": 1, "data": PATCH}
    entry = MockConfigEntry(domain=DOMAIN, title="DMX Lighting", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return await hass_ws_client(hass)


async def _call(client, msg_id, **msg):
    await client.send_json({"id": msg_id, **msg})
    return await client.receive_json()


async def test_create_edit_rename_delete(hass, client):
    # Create from selected fixtures.
    res = await _call(client, 1, type="dmx_lighting/groups/create", name="Front",
                      entities=["light.par_1", "light.par_2"])
    assert res["success"], res
    group = res["result"]
    assert group["name"] == "Front" and group["entities"] == ["light.par_1", "light.par_2"]
    entity_id = group["entity_id"]
    assert entity_id == "light.front"
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).attributes["entity_id"] == ["light.par_1", "light.par_2"]
    # It is a normal light group helper.
    entry = hass.config_entries.async_get_entry(group["entry_id"])
    assert entry.domain == "group" and entry.options["group_type"] == "light"

    # Listed.
    res = await _call(client, 2, type="dmx_lighting/groups/list")
    assert [g["name"] for g in res["result"]["groups"]] == ["Front"]

    # Edit members (order matters: effects flow in this order).
    res = await _call(client, 3, type="dmx_lighting/groups/update", entry_id=group["entry_id"],
                      entities=["light.par_3", "light.par_1"])
    assert res["success"], res
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).attributes["entity_id"] == ["light.par_3", "light.par_1"]

    # Rename: the light's name changes, its entity_id stays.
    res = await _call(client, 4, type="dmx_lighting/groups/update", entry_id=group["entry_id"],
                      name="Front wash")
    assert res["success"], res
    await hass.async_block_till_done()
    state = hass.states.get(entity_id)
    assert state.attributes["friendly_name"] == "Front wash"
    assert state.attributes["entity_id"] == ["light.par_3", "light.par_1"]
    assert res["result"]["name"] == "Front wash"

    # Delete.
    res = await _call(client, 5, type="dmx_lighting/groups/delete", entry_id=group["entry_id"])
    assert res["success"], res
    await hass.async_block_till_done()
    assert hass.config_entries.async_get_entry(group["entry_id"]) is None
    res = await _call(client, 6, type="dmx_lighting/groups/list")
    assert res["result"]["groups"] == []


@pytest.mark.parametrize(("msg", "message"), [
    ({"name": "", "entities": ["light.par_1"]}, "name"),
    ({"name": "X", "entities": []}, "at least one light"),
    ({"name": "X", "entities": ["switch.pump"]}, "only contain lights"),
])
async def test_create_rejects_bad_input(client, msg, message):
    res = await _call(client, 1, type="dmx_lighting/groups/create", **msg)
    assert not res["success"]
    assert res["error"]["code"] == "group_error" and message in res["error"]["message"]


async def test_other_groups_are_left_alone(hass, client):
    """Only light groups are listed or edited; unknown entries give a clear error."""
    switch_group = MockConfigEntry(domain="group", title="Pumps",
                                   options={"group_type": "switch", "name": "Pumps",
                                            "entities": ["switch.a"], "hide_members": False})
    switch_group.add_to_hass(hass)
    res = await _call(client, 1, type="dmx_lighting/groups/list")
    assert res["result"]["groups"] == []
    res = await _call(client, 2, type="dmx_lighting/groups/delete", entry_id=switch_group.entry_id)
    assert not res["success"] and "no longer exists" in res["error"]["message"]
    assert hass.config_entries.async_get_entry(switch_group.entry_id) is not None
