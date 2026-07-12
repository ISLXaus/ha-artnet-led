"""Builds pyartnet universes/channels and HA light entities from a parsed universes config.

Shared by the YAML platform path and the config-entry (UI patch) path so both
produce identical entities with identical unique_ids.
"""
from __future__ import annotations

import logging

from homeassistant.const import CONF_DEVICES
from homeassistant.const import CONF_NAME as CONF_DEVICE_NAME
from homeassistant.const import CONF_TYPE as CONF_DEVICE_TYPE
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_registry import async_get
from homeassistant.util import slugify
from pyartnet import BaseUniverse
from pyartnet.errors import InvalidUniverseAddressError, UniverseNotFoundError

from custom_components.artnet_led.const import (
    AVAILABLE_CORRECTIONS,
    CHANNEL_SIZE,
    CONF_BYTE_ORDER,
    CONF_CHANNEL_SIZE,
    CONF_DEVICE_CHANNEL,
    CONF_OUTPUT_CORRECTION,
    CONF_SEND_PARTIAL_UNIVERSE,
    UNIQUE_ID_PREFIX,
)

log = logging.getLogger(__name__)


def create_light_entities(
    hass: HomeAssistant,
    node,
    host: str,
    universes_cfg: dict[int, dict],
    used_unique_ids: list[str] | None = None,
) -> list:
    """Create (or reuse) universes/channels on ``node`` and return the light entities."""
    # Imported late: light.py imports this module during setup, so a top-level
    # import here would be circular.
    from custom_components.artnet_led.light import CLASS_TYPE

    entity_registry = async_get(hass)

    device_list = []
    if used_unique_ids is None:
        used_unique_ids = []

    for universe_nr, universe_cfg in universes_cfg.items():
        try:
            try:
                universe = node.get_universe(universe_nr)
            except UniverseNotFoundError:
                universe: BaseUniverse = node.add_universe(universe_nr)
                universe.set_output_correction(AVAILABLE_CORRECTIONS.get(
                    universe_cfg[CONF_OUTPUT_CORRECTION]
                ))
        except InvalidUniverseAddressError:
            # e.g. universe 0 on sACN (E1.31 requires 1-63999). Skip this universe
            # instead of failing the whole platform.
            log.error(
                "Universe %s is not valid for this node type; skipping its %d fixture(s)",
                universe_nr, len(universe_cfg.get(CONF_DEVICES, [])),
            )
            continue

        for device in universe_cfg[CONF_DEVICES]:  # type: dict
            device = device.copy()
            cls = CLASS_TYPE[device[CONF_DEVICE_TYPE]]

            channel = device[CONF_DEVICE_CHANNEL]
            unique_id = f"{UNIQUE_ID_PREFIX}:{host}/{universe_nr}/{channel}"

            name: str = device[CONF_DEVICE_NAME]
            byte_size = CHANNEL_SIZE[device[CONF_CHANNEL_SIZE]][0]
            byte_order = device[CONF_BYTE_ORDER]

            entity_id = f"light.{slugify(name)}"

            # If the entity has another unique ID, use that until it's migrated properly
            entity = entity_registry.async_get(entity_id)
            if entity:
                log.info(f"Found existing entity for name {entity_id}, using unique id {unique_id}")
                if entity.unique_id is not None and entity.unique_id not in used_unique_ids:
                    unique_id = entity.unique_id
            used_unique_ids.append(unique_id)

            # create device
            device["unique_id"] = unique_id
            d = cls(**device)
            d.set_type(device[CONF_DEVICE_TYPE])

            d.set_channel(
                universe.add_channel(
                    start=channel,
                    width=d.channel_width,
                    channel_name=d.name,
                    byte_size=byte_size,
                    byte_order=byte_order,
                )
            )

            d.channel.set_output_correction(AVAILABLE_CORRECTIONS.get(
                device[CONF_OUTPUT_CORRECTION]
            ))

            device_list.append(d)

            send_partial_universe = universe_cfg[CONF_SEND_PARTIAL_UNIVERSE]
            if not send_partial_universe:
                universe._resize_universe(512)

    return device_list
