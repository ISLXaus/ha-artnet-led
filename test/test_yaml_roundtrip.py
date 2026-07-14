"""YAML export/import of the patch document over the WebSocket API."""
import pytest
from homeassistant.setup import async_setup_component

from custom_components.artnet_led.const import DOMAIN

pytestmark = pytest.mark.usefixtures("socket_enabled")

PATCH = {
    "nodes": [
        {
            "id": "node-1", "node_type": "sacn", "host": "10.0.0.162", "port": None,
            "max_fps": 25, "refresh_every": 0, "priority": 150, "multicast": True,
            "universes": {
                "101": {
                    "send_partial_universe": True, "output_correction": "linear",
                    "devices": [
                        {"id": "dev-1", "channel": 1, "name": "bar_1", "type": "rgb"},
                    ],
                }
            },
        }
    ]
}


async def test_export_import_roundtrip(hass, hass_ws_client):
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "artnet_led/patch/export", "patch": PATCH})
    response = await client.receive_json()
    assert response["success"]
    yaml_text = response["result"]["yaml"]
    assert "10.0.0.162" in yaml_text
    assert "id:" not in yaml_text  # internal ids stripped for clean YAML

    await client.send_json({"id": 2, "type": "artnet_led/patch/import", "content": yaml_text})
    response = await client.receive_json()
    assert response["success"]
    result = response["result"]
    assert result["valid"], result["errors"]

    node = result["patch"]["nodes"][0]
    assert node["host"] == "10.0.0.162"
    assert node["priority"] == 150
    assert node["multicast"] is True
    assert node["id"]  # ids regenerated on import
    device = node["universes"]["101"]["devices"][0]
    assert device["name"] == "bar_1"
    assert device["id"]


async def test_import_accepts_bare_node_list_and_flags_errors(hass, hass_ws_client):
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    content = """
- node_type: sacn
  host: 10.0.0.5
  universes:
    "0":
      devices:
        - channel: 1
          name: bad_universe_light
          type: dimmer
"""
    await client.send_json({"id": 1, "type": "artnet_led/patch/import", "content": content})
    response = await client.receive_json()
    assert response["success"]
    result = response["result"]
    assert result["valid"] is False
    assert any(e["code"] == "invalid_universe" for e in result["errors"])
    # The patch still loads into the editor so the user can fix it there.
    assert result["patch"]["nodes"][0]["host"] == "10.0.0.5"


async def test_import_rejects_garbage(hass, hass_ws_client):
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    await client.send_json(
        {"id": 1, "type": "artnet_led/patch/import", "content": "just a string"}
    )
    response = await client.receive_json()
    assert not response["success"]
    assert response["error"]["code"] == "invalid_structure"

    await client.send_json(
        {"id": 2, "type": "artnet_led/patch/import", "content": "a: [unclosed"}
    )
    response = await client.receive_json()
    assert not response["success"]
    assert response["error"]["code"] == "invalid_yaml"
