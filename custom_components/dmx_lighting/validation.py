"""Validation of the UI-edited patch document, and conversion to setup config."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.const import CONF_DEVICES
from homeassistant.const import CONF_HOST as CONF_NODE_HOST
from homeassistant.const import CONF_NAME as CONF_DEVICE_NAME
from homeassistant.const import CONF_PORT as CONF_NODE_PORT
from homeassistant.const import CONF_TYPE as CONF_DEVICE_TYPE
from homeassistant.core import HomeAssistant
from homeassistant.util import slugify

from custom_components.dmx_lighting.const import (
    CHANNEL_SIZE,
    CONF_CHANNEL_SETUP,
    CONF_CHANNEL_SIZE,
    CONF_DEVICE_CHANNEL,
    CONF_NODE_HOST_OVERRIDE,
    CONF_NODE_MAX_FPS,
    CONF_NODE_MULTICAST,
    CONF_NODE_PORT_OVERRIDE,
    CONF_NODE_PRIORITY,
    CONF_NODE_REFRESH,
    CONF_NODE_TYPE,
    CONF_NODE_UNIVERSES,
    CONF_OUTPUT_CORRECTION,
    CONF_SEND_PARTIAL_UNIVERSE,
    NODE_TYPE_SACN,
    NODE_TYPES,
)
from custom_components.dmx_lighting.runtime import DmxRuntime, node_key
from custom_components.dmx_lighting.channel_switch import allowed_chars_per_type, is_fixed_value

log = logging.getLogger(__name__)

# Default channel_setup per device type, mirrored from the entity class constructors
# in light.py (DmxFixed, DmxWhite, DmxRGB, ...). Determines the logical channel width.
DEFAULT_CHANNEL_SETUP: dict[str, Any] = {
    "fixed": [255],
    "binary": None,
    "dimmer": None,
    "color_temp": "ch",
    "rgb": "rgb",
    "rgbw": "rgbw",
    "rgbww": "rgbch",
    "xy": "dxy",
}


# Keys stored with a patch device that only the panel uses; stripped before the
# device is handed to DEVICE_SCHEMA / the entity classes.
#   id:             panel-internal identity
#   channel_labels: per-channel labels (list aligned with channel_setup, entries
#                   str or null), e.g. "Mode" / "Strobe" for dummy channels
CONF_CHANNEL_LABELS = "channel_labels"
PANEL_ONLY_KEYS = frozenset({"id", CONF_CHANNEL_LABELS})

MAX_LABEL_LENGTH = 32


def device_schema_input(device: dict) -> dict:
    """A stored patch device minus panel-only keys and unset (None) values."""
    return {k: v for k, v in device.items() if k not in PANEL_ONLY_KEYS and v is not None}


def compute_channel_width(device_type: str, channel_setup) -> int:
    """Logical channel count of a device, matching the entity class constructors."""
    if device_type == "binary":
        return 1
    setup = channel_setup or DEFAULT_CHANNEL_SETUP.get(device_type)
    return len(setup) if setup else 1


def compute_dmx_footprint(device: dict) -> tuple[int, int]:
    """(first, last) DMX channel occupied by a device, inclusive."""
    start = int(device[CONF_DEVICE_CHANNEL])
    width = compute_channel_width(device.get(CONF_DEVICE_TYPE, "dimmer"),
                                  device.get(CONF_CHANNEL_SETUP))
    byte_size = CHANNEL_SIZE.get(device.get(CONF_CHANNEL_SIZE) or "8bit", (1, 1))[0]
    return start, start + width * byte_size - 1


def _coerce_port(value) -> int | None:
    """Best-effort int port; anything unusable becomes None (= protocol default)."""
    try:
        port = int(value)
    except (TypeError, ValueError):
        return None
    return port if 1 <= port <= 65535 else None


def patch_node_to_setup_config(node: dict) -> dict:
    """Convert a stored patch node into the config dict the runtime/factory expects.

    Devices are run through DEVICE_SCHEMA so their defaults are filled in.
    """
    from custom_components.dmx_lighting.light import DEVICE_SCHEMA, UNIVERSE_SCHEMA

    universes: dict[int, dict] = {}
    for universe_nr, universe in (node.get("universes") or {}).items():
        universes[int(universe_nr)] = UNIVERSE_SCHEMA(
            {
                CONF_SEND_PARTIAL_UNIVERSE: universe.get(CONF_SEND_PARTIAL_UNIVERSE, True),
                CONF_OUTPUT_CORRECTION: universe.get(CONF_OUTPUT_CORRECTION) or "linear",
                CONF_DEVICES: [
                    # Strip panel-only keys (id) before schema validation.
                    DEVICE_SCHEMA(device_schema_input(device))
                    for device in universe.get("devices", [])
                ],
            }
        )

    return {
        CONF_NODE_TYPE: node.get(CONF_NODE_TYPE, "artnet-direct"),
        CONF_NODE_HOST: node.get("host"),
        CONF_NODE_PORT: _coerce_port(node.get("port")),
        CONF_NODE_HOST_OVERRIDE: node.get(CONF_NODE_HOST_OVERRIDE) or "",
        CONF_NODE_PORT_OVERRIDE: _coerce_port(node.get(CONF_NODE_PORT_OVERRIDE)),
        CONF_NODE_MAX_FPS: node.get(CONF_NODE_MAX_FPS) or 25,
        CONF_NODE_REFRESH: node.get(CONF_NODE_REFRESH, 120),
        CONF_NODE_PRIORITY: node.get(CONF_NODE_PRIORITY) or 100,
        CONF_NODE_MULTICAST: bool(node.get(CONF_NODE_MULTICAST)),
        CONF_NODE_UNIVERSES: universes,
    }


def channel_setup_errors(device_type: str, channel_setup, channel_labels) -> list[tuple[str, str, str]]:
    """Check a device's channel layout. Returns (field, code, message) tuples.

    channel_setup is a string of function letters ("rgbw") or a list mixing
    letters and dummy channels (whole numbers 0-255 that are output as-is).
    """
    errors: list[tuple[str, str, str]] = []
    allowed = allowed_chars_per_type.get(device_type, "")

    if channel_setup is None:
        entries: list = []
    elif isinstance(channel_setup, (str, list)):
        entries = list(channel_setup)
        if not entries:
            errors.append((CONF_CHANNEL_SETUP, "invalid_channel_setup",
                           "Channel setup must not be empty (leave it unset for the type default)"))
    else:
        errors.append((CONF_CHANNEL_SETUP, "invalid_channel_setup",
                       "Channel setup must be a string of letters or a list"))
        entries = []

    if entries and device_type == "binary":
        errors.append((CONF_CHANNEL_SETUP, "invalid_channel_setup",
                       "Binary fixtures do not support a channel setup"))
        entries = []

    for index, entry in enumerate(entries):
        position = f"Channel {index + 1}"
        if is_fixed_value(entry):
            if not 0 <= entry <= 255:
                errors.append((f"{CONF_CHANNEL_SETUP}/{index}", "invalid_channel_value",
                               f"{position}: fixed value must be between 0 and 255"))
        elif isinstance(entry, str) and len(entry) == 1 and entry in allowed:
            continue
        elif isinstance(entry, str) and len(entry) == 1:
            hint = f"allowed: {allowed}" if allowed else "only fixed values (0-255) are allowed"
            errors.append((f"{CONF_CHANNEL_SETUP}/{index}", "invalid_channel_setup",
                           f"{position}: '{entry}' is not valid for type {device_type} ({hint})"))
        else:
            errors.append((f"{CONF_CHANNEL_SETUP}/{index}", "invalid_channel_setup",
                           f"{position}: must be a single letter or a whole number 0-255"))

    if channel_labels is not None:
        if not isinstance(channel_labels, list):
            errors.append((CONF_CHANNEL_LABELS, "invalid_channel_label",
                           "Channel labels must be a list"))
        else:
            if len(channel_labels) > len(entries):
                errors.append((CONF_CHANNEL_LABELS, "invalid_channel_label",
                               f"{len(channel_labels)} labels given for {len(entries)} "
                               "custom channel(s)"))
            for index, label in enumerate(channel_labels):
                if label is None:
                    continue
                if not isinstance(label, str):
                    errors.append((f"{CONF_CHANNEL_LABELS}/{index}", "invalid_channel_label",
                                   f"Channel {index + 1}: label must be text"))
                elif len(label) > MAX_LABEL_LENGTH:
                    errors.append((f"{CONF_CHANNEL_LABELS}/{index}", "invalid_channel_label",
                                   f"Channel {index + 1}: label is longer than "
                                   f"{MAX_LABEL_LENGTH} characters"))

    return errors


def validate_patch(hass: HomeAssistant, patch: dict, runtime: DmxRuntime) -> list[dict]:
    """Validate a patch document. Returns a list of {path, code, message} errors."""
    from custom_components.dmx_lighting.light import DEVICE_SCHEMA

    errors: list[dict] = []

    def error(path: str, code: str, message: str) -> None:
        errors.append({"path": path, "code": code, "message": message})

    nodes = patch.get("nodes")
    if not isinstance(nodes, list):
        error("nodes", "invalid_structure", "'nodes' must be a list")
        return errors

    seen_node_keys: set[str] = set()
    seen_names: dict[str, str] = {}

    for i, node in enumerate(nodes):
        node_path = f"nodes/{i}"

        node_type = node.get(CONF_NODE_TYPE)
        if node_type not in NODE_TYPES:
            error(f"{node_path}/node_type", "invalid_node_type",
                  f"Node type must be one of {NODE_TYPES}")
            continue

        host = node.get("host")
        if not host or not isinstance(host, str):
            error(f"{node_path}/host", "missing_host", "Host is required")
            continue

        for port_field in ("port", CONF_NODE_PORT_OVERRIDE):
            value = node.get(port_field)
            if value is not None and (
                isinstance(value, bool)
                or not isinstance(value, int)
                or not (1 <= value <= 65535)
            ):
                error(f"{node_path}/{port_field}", "invalid_port",
                      "Port must be a whole number between 1 and 65535 "
                      "(leave blank for the protocol default)")

        max_fps = node.get(CONF_NODE_MAX_FPS) or 25
        if not (1 <= int(max_fps) <= 50):
            error(f"{node_path}/max_fps", "out_of_range", "max_fps must be between 1 and 50")

        refresh = node.get(CONF_NODE_REFRESH, 120)
        if not (0 <= float(refresh) <= 9999):
            error(f"{node_path}/refresh_every", "out_of_range",
                  "refresh_every must be between 0 and 9999")

        priority = node.get(CONF_NODE_PRIORITY)
        if priority is not None and not (0 <= int(priority) <= 200):
            error(f"{node_path}/priority", "out_of_range",
                  "sACN priority must be between 0 and 200")

        # E1.31 (sACN) does not allow universe 0.
        min_universe = 1 if node_type == NODE_TYPE_SACN else 0

        key = node_key(node_type, host, node.get("port"))
        if key in seen_node_keys:
            error(f"{node_path}/host", "duplicate_node",
                  f"Node '{key}' is defined more than once in the patch")
        seen_node_keys.add(key)

        for universe_nr, universe in (node.get("universes") or {}).items():
            universe_path = f"{node_path}/universes/{universe_nr}"
            try:
                nr = int(universe_nr)
            except (TypeError, ValueError):
                error(universe_path, "invalid_universe", "Universe must be a number")
                continue
            if not (min_universe <= nr <= 1024):
                error(universe_path, "invalid_universe",
                      f"Universe must be between {min_universe} and 1024 for {node_type}")

            occupied: list[tuple[int, int, str]] = []
            for j, device in enumerate(universe.get("devices", [])):
                device_path = f"{universe_path}/devices/{j}"

                if not isinstance(device, dict):
                    error(device_path, "invalid_device", "Device must be a mapping")
                    continue

                try:
                    validated = DEVICE_SCHEMA(device_schema_input(device))
                except vol.Invalid as e:
                    field = "/".join(str(p) for p in e.path) if e.path else ""
                    error(f"{device_path}/{field}" if field else device_path,
                          "invalid_device", str(e))
                    continue

                setup_errors = channel_setup_errors(
                    validated[CONF_DEVICE_TYPE], device.get(CONF_CHANNEL_SETUP),
                    device.get(CONF_CHANNEL_LABELS))
                for field, code, message in setup_errors:
                    error(f"{device_path}/{field}", code, message)
                if setup_errors:
                    continue

                name = validated[CONF_DEVICE_NAME]
                slug = slugify(name)
                if slug in seen_names:
                    error(f"{device_path}/name", "duplicate_name",
                          f"Name '{name}' collides with '{seen_names[slug]}' "
                          f"(both become entity light.{slug})")
                seen_names[slug] = name

                first, last = compute_dmx_footprint(validated)
                if last > 512:
                    error(f"{device_path}/channel", "exceeds_universe",
                          f"Device occupies channels {first}-{last}, beyond 512")
                for (o_first, o_last, o_name) in occupied:
                    if first <= o_last and last >= o_first:
                        error(f"{device_path}/channel", "channel_overlap",
                              f"Channels {first}-{last} of '{name}' overlap with "
                              f"'{o_name}' ({o_first}-{o_last})")
                        break
                occupied.append((first, last, name))

    return errors
