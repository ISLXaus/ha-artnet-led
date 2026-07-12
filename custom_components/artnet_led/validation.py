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

from custom_components.artnet_led.const import (
    CHANNEL_SIZE,
    CONF_CHANNEL_SETUP,
    CONF_CHANNEL_SIZE,
    CONF_DEVICE_CHANNEL,
    CONF_NODE_HOST_OVERRIDE,
    CONF_NODE_MAX_FPS,
    CONF_NODE_PORT_OVERRIDE,
    CONF_NODE_PRIORITY,
    CONF_NODE_REFRESH,
    CONF_NODE_TYPE,
    CONF_NODE_UNIVERSES,
    CONF_OUTPUT_CORRECTION,
    CONF_SEND_PARTIAL_UNIVERSE,
    NODE_TYPE_SACN,
    NODE_TYPES,
    OWNER_YAML,
)
from custom_components.artnet_led.runtime import ArtNetRuntime, node_key

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


def compute_channel_width(device_type: str, channel_setup) -> int:
    """Logical channel count of a device, matching the entity class constructors."""
    if device_type in ("binary", "dimmer"):
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


def patch_node_to_setup_config(node: dict) -> dict:
    """Convert a stored patch node into the config dict the runtime/factory expects.

    Devices are run through DEVICE_SCHEMA so defaults are filled exactly like YAML.
    """
    from custom_components.artnet_led.light import DEVICE_SCHEMA, UNIVERSE_SCHEMA

    universes: dict[int, dict] = {}
    for universe_nr, universe in (node.get("universes") or {}).items():
        universes[int(universe_nr)] = UNIVERSE_SCHEMA(
            {
                CONF_SEND_PARTIAL_UNIVERSE: universe.get(CONF_SEND_PARTIAL_UNIVERSE, True),
                CONF_OUTPUT_CORRECTION: universe.get(CONF_OUTPUT_CORRECTION) or "linear",
                CONF_DEVICES: [
                    # Strip panel-only keys (id) before schema validation.
                    DEVICE_SCHEMA({k: v for k, v in device.items()
                                   if k != "id" and v is not None})
                    for device in universe.get("devices", [])
                ],
            }
        )

    return {
        CONF_NODE_TYPE: node.get(CONF_NODE_TYPE, "artnet-direct"),
        CONF_NODE_HOST: node.get("host"),
        CONF_NODE_PORT: node.get("port"),
        CONF_NODE_HOST_OVERRIDE: node.get(CONF_NODE_HOST_OVERRIDE) or "",
        CONF_NODE_PORT_OVERRIDE: node.get(CONF_NODE_PORT_OVERRIDE),
        CONF_NODE_MAX_FPS: node.get(CONF_NODE_MAX_FPS) or 25,
        CONF_NODE_REFRESH: node.get(CONF_NODE_REFRESH, 120),
        CONF_NODE_PRIORITY: node.get(CONF_NODE_PRIORITY) or 100,
        CONF_NODE_UNIVERSES: universes,
    }


def validate_patch(hass: HomeAssistant, patch: dict, runtime: ArtNetRuntime) -> list[dict]:
    """Validate a patch document. Returns a list of {path, code, message} errors."""
    from custom_components.artnet_led.light import DEVICE_SCHEMA

    errors: list[dict] = []

    def error(path: str, code: str, message: str) -> None:
        errors.append({"path": path, "code": code, "message": message})

    nodes = patch.get("nodes")
    if not isinstance(nodes, list):
        error("nodes", "invalid_structure", "'nodes' must be a list")
        return errors

    yaml_handles = runtime.handles(OWNER_YAML)
    yaml_keys = {h.key for h in yaml_handles}
    yaml_names = {
        slugify(device[CONF_DEVICE_NAME])
        for handle in yaml_handles
        for universe in handle.universes_cfg.values()
        for device in universe.get(CONF_DEVICES, [])
    }

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

        if key in yaml_keys:
            error(f"{node_path}/host", "yaml_conflict",
                  f"Node '{key}' is already configured in YAML; remove it there first "
                  "or use a different host/port")

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

                try:
                    validated = DEVICE_SCHEMA(
                        {k: v for k, v in device.items() if k != "id" and v is not None}
                    )
                except vol.Invalid as e:
                    field = "/".join(str(p) for p in e.path) if e.path else ""
                    error(f"{device_path}/{field}" if field else device_path,
                          "invalid_device", str(e))
                    continue

                name = validated[CONF_DEVICE_NAME]
                slug = slugify(name)
                if slug in seen_names:
                    error(f"{device_path}/name", "duplicate_name",
                          f"Name '{name}' collides with '{seen_names[slug]}' "
                          f"(both become entity light.{slug})")
                elif slug in yaml_names:
                    error(f"{device_path}/name", "duplicate_name",
                          f"Name '{name}' collides with a YAML-configured light "
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
