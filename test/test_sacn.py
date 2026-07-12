"""sACN specifics: universe 0 is invalid, priority is configurable."""
import pytest
from pyartnet.base.network import UnicastNetworkTarget

from custom_components.artnet_led.bridge.sacn_node import PrioritySacnNode
from custom_components.artnet_led.runtime import ArtNetRuntime
from custom_components.artnet_led.validation import validate_patch

pytestmark = pytest.mark.usefixtures("socket_enabled")


def _sacn_patch(universe: str) -> dict:
    return {
        "nodes": [
            {
                "id": "n", "node_type": "sacn", "host": "10.0.0.162",
                "universes": {
                    universe: {"devices": [{"id": "d", "channel": 1, "name": "x", "type": "dimmer"}]}
                },
            }
        ]
    }


async def test_validate_rejects_sacn_universe_0(hass):
    """Regression: sACN universe 0 crashed light platform setup (E1.31 requires >= 1)."""
    runtime = ArtNetRuntime.get(hass)
    errors = validate_patch(hass, _sacn_patch("0"), runtime)
    assert any(e["code"] == "invalid_universe" for e in errors)

    assert validate_patch(hass, _sacn_patch("1"), runtime) == []


def test_priority_in_sacn_packet():
    node = PrioritySacnNode(
        UnicastNetworkTarget.create("127.0.0.1", 5568), priority=55, source_name="test"
    )
    universe = node.add_universe(1)

    sent = []
    node._send_data = lambda data, dst=None: sent.append(bytes(data))
    universe.send_data()

    assert len(sent) == 1
    # Framing layer: 2 (flags/len) + 4 (vector) + 64 (source name) -> priority at offset 70
    assert sent[0][70] == 55


def test_priority_range_enforced():
    with pytest.raises(ValueError):
        PrioritySacnNode(UnicastNetworkTarget.create("127.0.0.1", 5568), priority=201)
