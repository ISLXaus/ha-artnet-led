"""Live DMX monitoring: pushes universe buffer snapshots to panel subscribers.

Polls each watched universe's outbound buffer at 10 Hz and pushes only when it
changed. Costs nothing while nobody is subscribed. Inbound DMX (controller mode)
lands in the same buffer via the channel bridges, so it is picked up too.
"""
from __future__ import annotations

import asyncio
import logging
from typing import Callable

from homeassistant.core import HomeAssistant

log = logging.getLogger(__name__)

POLL_INTERVAL = 0.1  # 10 Hz


class DmxMonitor:
    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._subscribers: dict[tuple[str, int], set[Callable[[dict], None]]] = {}
        self._tasks: dict[tuple[str, int], asyncio.Task] = {}
        self._last_data: dict[tuple[str, int], bytes] = {}
        self._seq: dict[tuple[str, int], int] = {}

    def subscribe(
        self, node_key: str, universe_nr: int, callback_: Callable[[dict], None]
    ) -> Callable[[], None]:
        key = (node_key, universe_nr)
        self._subscribers.setdefault(key, set()).add(callback_)

        if key not in self._tasks:
            self._tasks[key] = self._hass.async_create_background_task(
                self._poll_loop(key), f"DMX monitor {node_key}/{universe_nr}"
            )

        def unsubscribe() -> None:
            subscribers = self._subscribers.get(key)
            if subscribers is not None:
                subscribers.discard(callback_)
                if not subscribers:
                    self._subscribers.pop(key, None)
                    task = self._tasks.pop(key, None)
                    if task:
                        task.cancel()
                    self._last_data.pop(key, None)
                    self._seq.pop(key, None)

        return unsubscribe

    async def _poll_loop(self, key: tuple[str, int]) -> None:
        while True:
            try:
                self._tick(key)
            except Exception:
                log.exception("DMX monitor tick failed for %s", key)
            await asyncio.sleep(POLL_INTERVAL)

    def _tick(self, key: tuple[str, int]) -> None:
        from custom_components.artnet_led.runtime import ArtNetRuntime

        node_key, universe_nr = key

        handle = ArtNetRuntime.get(self._hass).get_handle(node_key)
        if handle is None:
            return

        try:
            universe = handle.node.get_universe(universe_nr)
        except Exception:
            return

        data = bytes(universe._data)
        if data == self._last_data.get(key):
            return
        self._last_data[key] = data

        seq = self._seq.get(key, 0) + 1
        self._seq[key] = seq

        payload = {
            "node_key": node_key,
            "universe": universe_nr,
            "seq": seq,
            "values": list(data),
        }
        for subscriber in list(self._subscribers.get(key, ())):
            subscriber(payload)
