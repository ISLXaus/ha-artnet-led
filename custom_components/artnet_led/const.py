"""Shared constants for the Art-Net LED integration."""
from __future__ import annotations

import pyartnet

DOMAIN = "artnet_led"

# Historical unique_id prefix; light.py used to call this DOMAIN ("dmx").
# It is baked into every existing entity's unique_id, so it must never change.
UNIQUE_ID_PREFIX = "dmx"

DATA_RUNTIME = "runtime"
DATA_STORE = "store"
DATA_ENTRY_NODES = "entry_nodes"
DATA_MONITOR = "monitor"
DATA_STOP_LISTENER = "stop_listener"

STORAGE_KEY = "artnet_led.patch"
STORAGE_VERSION = 1

OWNER_YAML = "yaml"

ARTNET_DEFAULT_PORT = 6454
SACN_DEFAULT_PORT = 5568
KINET_DEFAULT_PORT = 6038

NODE_TYPE_ARTNET_DIRECT = "artnet-direct"
NODE_TYPE_ARTNET_CONTROLLER = "artnet-controller"
NODE_TYPE_SACN = "sacn"
NODE_TYPE_KINET = "kinet"

NODE_TYPES = [
    NODE_TYPE_ARTNET_DIRECT,
    NODE_TYPE_ARTNET_CONTROLLER,
    NODE_TYPE_SACN,
    NODE_TYPE_KINET,
]

CONF_NODE_TYPE = "node_type"
CONF_NODE_MAX_FPS = "max_fps"
CONF_NODE_REFRESH = "refresh_every"
CONF_NODE_UNIVERSES = "universes"
CONF_NODE_HOST_OVERRIDE = "host_override"
CONF_NODE_PORT_OVERRIDE = "port_override"
CONF_NODE_PRIORITY = "priority"  # sACN E1.31 priority, 0-200, default 100

CONF_SEND_PARTIAL_UNIVERSE = "send_partial_universe"

CONF_DEVICE_CHANNEL = "channel"
CONF_OUTPUT_CORRECTION = "output_correction"
CONF_CHANNEL_SIZE = "channel_size"
CONF_BYTE_ORDER = "byte_order"
CONF_DEVICE_MIN_TEMP = "min_temp"
CONF_DEVICE_MAX_TEMP = "max_temp"
CONF_CHANNEL_SETUP = "channel_setup"

AVAILABLE_CORRECTIONS = {
    "linear": pyartnet.output_correction.linear,
    "quadratic": pyartnet.output_correction.quadratic,
    "cubic": pyartnet.output_correction.cubic,
    "quadruple": pyartnet.output_correction.quadruple,
}

type LogicalChannelSize = int
type LogicalChannelNumBytes = int
type ChannelSize = tuple[LogicalChannelSize, LogicalChannelNumBytes]

CHANNEL_SIZE: dict[str, ChannelSize] = {
    "8bit": (1, 1),
    "16bit": (2, 256),
    "24bit": (3, 256 ** 2),
    "32bit": (4, 256 ** 3),
}

PANEL_URL_PATH = "dmx-patch"
PANEL_TITLE = "DMX Patch"
PANEL_ICON = "mdi:spotlight-beam"
PANEL_WEBCOMPONENT_NAME = "artnet-patch-panel"
FRONTEND_STATIC_PATH = "/artnet_led_panel"
