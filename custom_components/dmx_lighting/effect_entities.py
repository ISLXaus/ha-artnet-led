"""Home Assistant entities for effect presets.

Each preset gets a device with:
- a light (light.fx_<name>): on/off starts/stops the effect with its fade in/out,
  brightness is the effect's master level. A transition in the service call overrides
  the preset's fade time.
- number entities for the live parameters (speed, size, spread, fade in/out). Changing
  one takes effect immediately and is saved into the preset in the patch.
"""
from __future__ import annotations

import logging

from homeassistant.components.light import (
    ATTR_BRIGHTNESS,
    ATTR_TRANSITION,
    ColorMode,
    LightEntity,
    LightEntityFeature,
)
from homeassistant.components.number import NumberEntity, NumberMode
from homeassistant.const import STATE_ON, EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.restore_state import RestoreEntity

from custom_components.dmx_lighting.const import DATA_STORE, DOMAIN
from custom_components.dmx_lighting.effect_engine import EffectEngine
from custom_components.dmx_lighting.effects import EFFECT_PARAMS, param

log = logging.getLogger(__name__)

ATTR_LEVEL = "level"


def effect_device_info(key: str, preset: dict) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, f"fx:{key}")},
        name=preset["name"],
        manufacturer="DMX Lighting",
        model=f"Effect: {preset['type'].replace('_', ' ')}",
    )


class DmxEffectLight(LightEntity, RestoreEntity):
    """Runs an effect preset: on/off with fades, brightness = master level."""

    _attr_has_entity_name = True
    _attr_name = None  # the device name (the preset name)
    _attr_should_poll = False
    _attr_color_mode = ColorMode.BRIGHTNESS
    _attr_supported_color_modes = {ColorMode.BRIGHTNESS}
    _attr_supported_features = LightEntityFeature.TRANSITION
    _attr_icon = "mdi:auto-fix"

    def __init__(self, engine: EffectEngine, key: str, preset: dict) -> None:
        self._engine = engine
        self._key = key
        self._preset = preset
        self._level = 1.0
        self._attr_unique_id = f"dmx_fx:{key}"
        self.entity_id = f"light.{key}"
        self._attr_device_info = effect_device_info(key, preset)
        self._unsub = None

    @property
    def is_on(self) -> bool:
        return self._engine.is_running(self._key)

    @property
    def brightness(self) -> int:
        return round(self._level * 255)

    @property
    def extra_state_attributes(self) -> dict:
        return {
            "effect_type": self._preset["type"],
            "fixtures": list(self._preset.get("fixtures") or []),
            "driving": self._engine.owned_fixtures(self._key),
            ATTR_LEVEL: round(self._level * 100),
        }

    async def async_turn_on(self, **kwargs) -> None:
        if ATTR_BRIGHTNESS in kwargs:
            self._level = kwargs[ATTR_BRIGHTNESS] / 255
        if self._engine.is_running(self._key):
            self._engine.set_level(self._key, self._level)
        else:
            self._engine.start(self._key, self._level, fade_in=kwargs.get(ATTR_TRANSITION))
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs) -> None:
        self._engine.stop(self._key, fade_out=kwargs.get(ATTR_TRANSITION))
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        self._unsub = self._engine.add_listener(self._key, self.async_write_ha_state)
        last = await self.async_get_last_state()
        if last is not None:
            if (brightness := last.attributes.get(ATTR_BRIGHTNESS)) is not None:
                self._level = brightness / 255
            elif (level := last.attributes.get(ATTR_LEVEL)) is not None:
                self._level = level / 100
            if last.state == STATE_ON:
                self._engine.start(self._key, self._level)
        self.async_write_ha_state()

    async def async_will_remove_from_hass(self) -> None:
        if self._unsub is not None:
            self._unsub()
            self._unsub = None


# (parameter, display name, unit, step, mode, icon)
NUMBER_PARAMS = [
    ("speed", "Speed", "BPM", 0.1, NumberMode.BOX, "mdi:speedometer"),
    ("size", "Size", "%", 1, NumberMode.SLIDER, "mdi:arrow-expand-vertical"),
    ("spread", "Spread", "°", 1, NumberMode.BOX, "mdi:arrow-expand-horizontal"),
    ("fade_in", "Fade in", "s", 0.1, NumberMode.BOX, "mdi:transition"),
    ("fade_out", "Fade out", "s", 0.1, NumberMode.BOX, "mdi:transition"),
]


async def async_save_effect_param(hass: HomeAssistant, name: str, key: str, value) -> None:
    """Write one parameter of the effect named `name` into the stored patch (no reload)."""
    store = hass.data[DOMAIN][DATA_STORE]
    patch = await store.async_load()
    for effect in patch.get("effects") or []:
        if isinstance(effect, dict) and effect.get("name") == name:
            effect.setdefault("params", {})[key] = value
            await store.async_save(patch)
            return
    log.warning("Effect '%s' is no longer in the patch; %s not saved", name, key)


class DmxEffectNumber(NumberEntity):
    """One live parameter of an effect preset."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, hass: HomeAssistant, engine: EffectEngine, key: str, preset: dict,
                 param_key: str, label: str, unit: str, step: float, mode: NumberMode,
                 icon: str) -> None:
        self._engine = engine
        self._key = key
        self._preset = preset
        self._param = param_key
        spec = EFFECT_PARAMS[param_key]
        self._attr_name = label
        self._attr_unique_id = f"dmx_fx:{key}:{param_key}"
        self.entity_id = f"number.{key}_{param_key}"
        self._attr_native_unit_of_measurement = unit
        self._attr_native_min_value = spec["min"]
        self._attr_native_max_value = min(spec["max"], 600 if param_key != "spread" else 3600)
        self._attr_native_step = step
        self._attr_mode = mode
        self._attr_icon = icon
        self._attr_device_info = effect_device_info(key, preset)

    @property
    def native_value(self) -> float:
        return float(param(self._preset.get("params") or {}, self._param))

    async def async_set_native_value(self, value: float) -> None:
        # The engine reads params live from this dict, so this applies on the next frame.
        self._preset.setdefault("params", {})[self._param] = value
        self.async_write_ha_state()
        await async_save_effect_param(self.hass, self._preset["name"], self._param, value)
