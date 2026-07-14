"""sACN specifics: universe 0 is invalid, priority is configurable, wire output."""
import asyncio

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


class _UdpCollector(asyncio.DatagramProtocol):
    def __init__(self):
        self.packets: list[bytes] = []

    def datagram_received(self, data, addr):
        self.packets.append(data)


async def test_sacn_unicast_packets_on_the_wire():
    """End-to-end: changing channel values emits real E1.31 UDP packets."""
    import pyartnet.base.background_task as background_task

    background_task.CREATE_TASK = asyncio.create_task

    loop = asyncio.get_running_loop()
    transport, collector = await loop.create_datagram_endpoint(
        _UdpCollector, local_addr=("127.0.0.1", 0)
    )
    port = transport.get_extra_info("sockname")[1]

    node = PrioritySacnNode(
        UnicastNetworkTarget.create("127.0.0.1", port),
        priority=42, source_name="wire-test", refresh_every=0,
    )
    async with node:
        await node.stop_refresh()
        universe = node.add_universe(101)
        channel = universe.add_channel(start=1, width=3)
        channel.set_values([255, 128, 1])
        await asyncio.sleep(0.3)

    transport.close()

    assert collector.packets, "no sACN packets received"
    packet = collector.packets[0]
    # Root layer is 38 bytes; framing layer: flags(2) + vector(4) + source(64),
    # so priority sits at offset 38 + 70 = 108 and universe at 113-114.
    assert packet[108] == 42
    assert int.from_bytes(packet[113:115], "big") == 101
    # DMX start code 0x00 followed by our values.
    assert packet[125] == 0
    assert list(packet[126:129]) == [255, 128, 1]


async def test_sacn_multicast_universe_destination():
    """Multicast mode must target the per-universe 239.255.x.x group."""
    from pyartnet.base.network import MulticastNetworkTarget

    node = PrioritySacnNode(
        MulticastNetworkTarget.create("127.0.0.1"), source_name="mc-test"
    )
    # The universe destination lookup needs the node's socket.
    async with node:
        assert node.add_universe(1)._dst == ("239.255.0.1", 5568)
        assert node.add_universe(101)._dst == ("239.255.0.101", 5568)
        assert node.add_universe(256)._dst == ("239.255.1.1", 5568)


def test_universe_discovery_packet_format():
    """E1.31-2016 Universe Discovery: what sACNView uses to list sources."""
    node = PrioritySacnNode(
        UnicastNetworkTarget.create("127.0.0.1", 5568), source_name="disco"
    )
    sent = []
    node._send_data = lambda data, dst=None: sent.append(
        (bytes(node._packet_base), bytes(data), dst)
    )
    node.add_universe(1)
    node.add_universe(101)

    node.send_discovery()

    base, framing, dst = sent[0]
    assert dst == ("239.255.250.214", 5568)
    assert base[18:22] == b"\x00\x00\x00\x08"      # VECTOR_ROOT_E131_EXTENDED
    assert framing[2:6] == b"\x00\x00\x00\x02"     # VECTOR_E131_EXTENDED_DISCOVERY
    assert framing[6:11] == b"disco"               # source name
    assert framing[76:80] == b"\x00\x00\x00\x01"   # UNIVERSE_DISCOVERY_UNIVERSE_LIST
    assert framing[80] == 0 and framing[81] == 0   # page / last page
    assert framing[82:84] == (1).to_bytes(2, "big")
    assert framing[84:86] == (101).to_bytes(2, "big")
    assert len(framing) == 86


async def test_discovery_task_lifecycle():
    """Discovery announcements start with the node and stop with it."""
    node = PrioritySacnNode(
        UnicastNetworkTarget.create("127.0.0.1", 5568),
        source_name="lifecycle", refresh_every=0,
    )
    destinations = []
    node._send_data = lambda data, dst=None: destinations.append(dst)

    async with node:
        await asyncio.sleep(0.05)
        assert node._discovery_task is not None
        assert ("239.255.250.214", 5568) in destinations

    assert node._discovery_task is None


async def test_runtime_creates_multicast_sacn_node(hass):
    from unittest.mock import patch

    from pyartnet.base.network import MulticastNetworkTarget

    from custom_components.artnet_led.validation import patch_node_to_setup_config

    cfg = patch_node_to_setup_config(
        {
            "id": "n", "node_type": "sacn", "host": "10.0.0.162",
            "multicast": True, "priority": 150, "refresh_every": 0,
            "universes": {},
        }
    )
    runtime = ArtNetRuntime.get(hass)
    with patch(
        "custom_components.artnet_led.client.net_utils.get_private_ip",
        return_value="127.0.0.1",
    ):
        handle = await runtime.acquire_node(cfg, owner="test")
    try:
        assert isinstance(handle.node._network, MulticastNetworkTarget)
        assert handle.node.priority == 150
    finally:
        await runtime.release_owner("test")
