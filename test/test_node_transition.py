"""Node-level default transition: fixtures without their own transition inherit it."""
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dmx_lighting.const import DOMAIN, STORAGE_KEY
from custom_components.dmx_lighting.runtime import DmxRuntime
from custom_components.dmx_lighting.validation import patch_node_to_setup_config, validate_patch

pytestmark = pytest.mark.usefixtures("socket_enabled")


def _node(transition, *devices) -> dict:
    node = {
        "id": "node-1",
        "node_type": "artnet-direct",
        "host": "127.0.0.1",
        "port": 6454,
        "refresh_every": 0,
        "universes": {"1": {"devices": list(devices)}},
    }
    if transition is not ...:
        node["transition"] = transition
    return node


INHERITS = {"id": "a", "channel": 1, "name": "inherits", "type": "dimmer"}
INHERITS_NULL = {"id": "b", "channel": 2, "name": "inherits_null", "type": "dimmer",
                 "transition": None}
OWN_ZERO = {"id": "c", "channel": 3, "name": "own_zero", "type": "dimmer", "transition": 0}
OWN_FIVE = {"id": "d", "channel": 4, "name": "own_five", "type": "dimmer", "transition": 5}


def _transitions(node: dict) -> dict[str, float]:
    devices = patch_node_to_setup_config(node)["universes"][1]["devices"]
    return {d["name"]: d["transition"] for d in devices}


def test_fixture_transition_overrides_node_default_even_zero():
    node = _node(2.5, INHERITS, INHERITS_NULL, OWN_ZERO, OWN_FIVE)
    assert _transitions(node) == {
        "inherits": 2.5,
        "inherits_null": 2.5,
        "own_zero": 0,
        "own_five": 5,
    }


@pytest.mark.parametrize("transition", [..., None])
def test_without_node_default_fixtures_fall_back_to_zero(transition):
    node = _node(transition, INHERITS, OWN_FIVE)
    assert _transitions(node) == {"inherits": 0, "own_five": 5}


@pytest.mark.parametrize("transition", [0, 1.5, 999, None])
async def test_valid_node_transition(hass, transition):
    patch = {"nodes": [_node(transition, INHERITS)]}
    assert validate_patch(hass, patch, DmxRuntime.get(hass)) == []


@pytest.mark.parametrize("transition", [-1, 1000, "2", True])
async def test_invalid_node_transition(hass, transition):
    patch = {"nodes": [_node(transition, INHERITS)]}
    errors = validate_patch(hass, patch, DmxRuntime.get(hass))
    assert [(e["path"], e["code"]) for e in errors] == [("nodes/0/transition", "out_of_range")]


async def test_entities_use_inherited_fade_time(hass, hass_storage):
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "data": {"nodes": [_node(3, INHERITS, OWN_ZERO, OWN_FIVE)]},
    }
    entry = MockConfigEntry(domain=DOMAIN, title="DMX Lighting", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    lights = hass.data["entity_components"]["light"]
    assert lights.get_entity("light.inherits").fade_time == 3
    assert lights.get_entity("light.own_zero").fade_time == 0
    assert lights.get_entity("light.own_five").fade_time == 5

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
