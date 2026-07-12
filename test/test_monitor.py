"""DmxMonitor: change-only coalesced pushes, cleanup on last unsubscribe."""
import asyncio

import pytest

from custom_components.artnet_led.const import DOMAIN
from custom_components.artnet_led.monitor import DmxMonitor
from custom_components.artnet_led.runtime import ArtNetRuntime, NodeHandle


class _FakeUniverse:
    def __init__(self):
        self._data = bytearray([0, 0, 0, 0])


class _FakeNode:
    def __init__(self, universe):
        self._universe = universe

    def get_universe(self, nr):
        return self._universe


@pytest.fixture
def fake_universe(hass):
    runtime = ArtNetRuntime.get(hass)
    universe = _FakeUniverse()
    handle = NodeHandle(
        key="fake:1", node=_FakeNode(universe), owner="test",
        node_type="artnet-direct", host="fake", port=None,
    )
    runtime._handles["fake:1"] = handle
    return universe


async def test_monitor_pushes_on_change_only(hass, fake_universe):
    monitor = DmxMonitor(hass)
    frames = []

    unsub = monitor.subscribe("fake:1", 1, frames.append)

    await asyncio.sleep(0.25)
    assert len(frames) == 1  # initial snapshot, then silence while unchanged
    assert frames[0]["values"] == [0, 0, 0, 0]

    fake_universe._data[0] = 200
    await asyncio.sleep(0.25)
    assert len(frames) == 2
    assert frames[1]["values"][0] == 200
    assert frames[1]["seq"] > frames[0]["seq"]

    await asyncio.sleep(0.25)
    assert len(frames) == 2  # still no change, still no push

    unsub()
    fake_universe._data[0] = 10
    await asyncio.sleep(0.25)
    assert len(frames) == 2  # unsubscribed: no more pushes
    assert not monitor._tasks  # poll task cleaned up
