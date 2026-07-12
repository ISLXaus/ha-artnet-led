"""SacnNode subclass with configurable E1.31 priority.

pyartnet 2.0 hardcodes priority 100 in SacnNode._send_universe; this override is a
verbatim copy of that method with the priority byte parameterized. Safe because the
manifest pins pyartnet==2.0.
"""
from __future__ import annotations

import logging
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


class PrioritySacnNode(SacnNode):
    def __init__(self, network, *, priority: int = DEFAULT_SACN_PRIORITY, **kwargs) -> None:
        super().__init__(network, **kwargs)
        if not 0 <= int(priority) <= 200:
            raise ValueError('sACN priority must be between 0 and 200')
        self._priority = int(priority)

    @property
    def priority(self) -> int:
        return self._priority

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
