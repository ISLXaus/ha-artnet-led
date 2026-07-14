"""SacnNode subclass with configurable E1.31 priority and universe discovery.

pyartnet 2.0 hardcodes priority 100 in SacnNode._send_universe (overridden here as a
verbatim copy with the priority byte parameterized — safe because the manifest pins
pyartnet==2.0) and does not implement E1.31-2016 Universe Discovery at all, which is
what tools like sACNView use to list sources.
"""
from __future__ import annotations

import asyncio
import logging
from contextlib import suppress
from logging import DEBUG as LVL_DEBUG

import pyartnet.impl_sacn.universe
from pyartnet.impl_sacn import SacnNode
from pyartnet.impl_sacn.node import (
    VECTOR_DMP_SET_PROPERTY,
    VECTOR_E131_DATA_PACKET,
    VECTOR_ROOT_E131_DATA,
    _dst_str,
)

log = logging.getLogger(__name__)

DEFAULT_SACN_PRIORITY = 100

# E1.31-2016 section 8: Universe Discovery
VECTOR_ROOT_E131_EXTENDED = b'\x00\x00\x00\x08'
VECTOR_E131_EXTENDED_DISCOVERY = b'\x00\x00\x00\x02'
VECTOR_UNIVERSE_DISCOVERY_UNIVERSE_LIST = b'\x00\x00\x00\x01'
DISCOVERY_DST = ('239.255.250.214', 5568)
E131_UNIVERSE_DISCOVERY_INTERVAL = 10  # seconds


class PrioritySacnNode(SacnNode):
    def __init__(self, network, *, priority: int = DEFAULT_SACN_PRIORITY, **kwargs) -> None:
        super().__init__(network, **kwargs)
        if not 0 <= int(priority) <= 200:
            raise ValueError('sACN priority must be between 0 and 200')
        self._priority = int(priority)
        self._discovery_task: asyncio.Task | None = None

    @property
    def priority(self) -> int:
        return self._priority

    async def __aenter__(self):
        await super().__aenter__()
        if self._discovery_task is None:
            self._discovery_task = asyncio.get_running_loop().create_task(
                self._discovery_loop(), name=f'sACN discovery {self._name}'
            )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self._discovery_task is not None:
            self._discovery_task.cancel()
            with suppress(asyncio.CancelledError):
                await self._discovery_task
            self._discovery_task = None
        return await super().__aexit__(exc_type, exc_val, exc_tb)

    async def _discovery_loop(self) -> None:
        while True:
            try:
                self.send_discovery()
            except Exception:
                log.exception('Failed to send sACN universe discovery')
            await asyncio.sleep(E131_UNIVERSE_DISCOVERY_INTERVAL)

    def send_discovery(self) -> None:
        """Announce our universe list on 239.255.250.214 (E1.31 Universe Discovery)."""
        universes = sorted(self._universe_map.keys())

        packet = bytearray()

        # E1.31 Framing Layer (Universe Discovery)
        framing_length = 74 + 8 + 2 * len(universes)
        packet.extend((framing_length | 0x7000).to_bytes(2, 'big'))     # |  2 | Flags and Length
        packet.extend(VECTOR_E131_EXTENDED_DISCOVERY)                   # |  4 | Vector
        packet.extend(self._source_name_byte)                           # | 64 | Source Name
        packet.extend(b'\x00\x00\x00\x00')                              # |  4 | Reserved

        # Universe Discovery Layer
        discovery_length = 8 + 2 * len(universes)
        packet.extend((discovery_length | 0x7000).to_bytes(2, 'big'))   # |  2 | Flags and Length
        packet.extend(VECTOR_UNIVERSE_DISCOVERY_UNIVERSE_LIST)          # |  4 | Vector
        packet.append(0)                                                # |  1 | Page
        packet.append(0)                                                # |  1 | Last Page
        for universe in universes:                                      # | 2N | List of Universes
            packet.extend(int(universe).to_bytes(2, 'big'))

        # Update length and package type for base packet (root layer)
        base_packet = self._packet_base
        base_packet[16:18] = ((22 + len(packet)) | 0x7000).to_bytes(2, 'big')
        base_packet[18:22] = VECTOR_ROOT_E131_EXTENDED

        self._send_data(packet, DISCOVERY_DST)

        if log.isEnabledFor(LVL_DEBUG):
            log.debug(f'Sent sACN universe discovery for universes {universes}')

    # noinspection PyProtectedMember
    def _send_universe(self, id: int, byte_size: int, values: bytearray,
                       universe: pyartnet.impl_sacn.universe.SacnUniverse) -> None:
        packet = bytearray()

        # DMX Start Code is not included in the byte size from the universe
        prop_count = byte_size + 1

        # Framing layer Part 1
        packet.extend(((87 + prop_count) | 0x7000).to_bytes(2, 'big'))          # |  2 | Flags and Length
        packet.extend(VECTOR_E131_DATA_PACKET)                                  # |  4 | Vector
        packet.extend(self._source_name_byte)                                   # | 64 | Source Name
        packet.append(self._priority)                                           # |  1 | Priority
        packet.extend(int(self._sync_address).to_bytes(2, 'big'))               # |  2 | Synchronization universe

        # Framing layer Part 2
        packet.append(universe._sequence_ctr.value)             # | 1 | Sequence,
        packet.append(0x00)                                     # | 1 | Options
        packet.extend(id.to_bytes(2, byteorder='big'))          # | 2 | BaseUniverse Number

        # DMP Layer
        dmp_length = ((10 + prop_count) | 0x7000).to_bytes(2, 'big')
        packet.extend(dmp_length)               # | 2 | Flags and length
        packet.append(VECTOR_DMP_SET_PROPERTY)  # | 1 | Vector
        packet.append(0xA1)                     # | 1 | Address Type & Data Type
        packet.extend(b'\x00\x00')              # | 2 | First Property Address
        packet.extend(b'\x00\x01')              # | 2 | Address Increment

        packet.extend(prop_count.to_bytes(2, 'big'))    # |     2 | Property Value Count
        packet.append(0x00)                             # |     1 | Property Values - DMX Start Code
        packet.extend(values)                           # | 0-512 | Property Values - DMX Data

        # Update length and package type for base packet
        base_packet = self._packet_base
        base_packet[16:18] = ((109 + prop_count) | 0x7000).to_bytes(2, 'big')   # |  2 | Flags, Length
        base_packet[18:22] = VECTOR_ROOT_E131_DATA                              # |  4 | Vector

        self._send_data(packet, universe._dst)

        if log.isEnabledFor(LVL_DEBUG):
            log.debug(f'Sending sACN frame to {_dst_str(universe._dst)}: {(base_packet + packet).hex()}')
