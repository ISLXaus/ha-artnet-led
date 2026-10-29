from __future__ import annotations

import asyncio
import logging
import time

import homeassistant.helpers.config_validation as cv
import homeassistant.util.color as color_util
from homeassistant.util import slugify
import pyartnet
import voluptuous as vol
from homeassistant.components.light import (
    ATTR_BRIGHTNESS,
    ATTR_RGB_COLOR,
    ATTR_RGBW_COLOR,
    ATTR_RGBWW_COLOR,
    ATTR_XY_COLOR,
    ATTR_TRANSITION,
    LightEntity, ATTR_WHITE, ATTR_COLOR_TEMP_KELVIN, ATTR_FLASH,
    FLASH_SHORT, FLASH_LONG, ATTR_HS_COLOR, LightEntityFeature, ColorMode)
from homeassistant.const import CONF_DEVICES, STATE_OFF, STATE_ON
from homeassistant.const import CONF_FRIENDLY_NAME as CONF_DEVICE_FRIENDLY_NAME
from homeassistant.const import CONF_NAME as CONF_DEVICE_NAME
from homeassistant.const import CONF_TYPE as CONF_DEVICE_TYPE
from homeassistant.core import HomeAssistant
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.util.color import color_rgb_to_rgbw
from pyartnet import Channel

from custom_components.dmx_lighting.const import (
    DATA_ENTRY_NODES,
    DOMAIN,
    AVAILABLE_CORRECTIONS,
    CHANNEL_SIZE,
    CONF_BYTE_ORDER,
    CONF_CHANNEL_SETUP,
    CONF_CHANNEL_SIZE,
    CONF_DEVICE_CHANNEL,
    CONF_DEVICE_MAX_TEMP,
    CONF_DEVICE_MIN_TEMP,
    CONF_OUTPUT_CORRECTION,
    CONF_SEND_PARTIAL_UNIVERSE,
)
from custom_components.dmx_lighting.entity_factory import create_light_entities
from custom_components.dmx_lighting.channel_switch import (
    is_fixed_value,
    off_values,
    to_values,
    validate,
)

CONF_DEVICE_TRANSITION = ATTR_TRANSITION

log = logging.getLogger(__name__)

async def async_setup_entry(hass: HomeAssistant, entry, async_add_entities):
    """Set up lights for the UI-defined patch (config entry)."""
    entry_nodes = hass.data[DOMAIN][DATA_ENTRY_NODES].get(entry.entry_id, [])

    from homeassistant.helpers import entity_platform

    from custom_components.dmx_lighting.const import DATA_ENGINES
    from custom_components.dmx_lighting.effect_entities import DmxEffectLight

    entities = []
    used_unique_ids = []
    for handle, universes_cfg in entry_nodes:
        entities.extend(
            create_light_entities(hass, handle.node, handle.host, universes_cfg, used_unique_ids)
        )
        handle.record_universes(universes_cfg)

    engine = hass.data[DOMAIN].get(DATA_ENGINES, {}).get(entry.entry_id)
    if engine is None:
        async_add_entities(entities)
        return
    engine.register_fixtures(entities)

    # Fixtures first, and wait for them (incl. restoring their state), so effects
    # restored as "on" take over fixtures that are already settled.
    platform = entity_platform.async_get_current_platform()
    await platform.async_add_entities(entities)
    await platform.async_add_entities(
        [DmxEffectLight(engine, key, preset) for key, preset in engine.presets.items()]
    )


def convert_to_kelvin(kelvin_string) -> int:
    return int(kelvin_string[:-1])


class DmxBaseLight(LightEntity, RestoreEntity):
    def __init__(self, name, unique_id: str, **kwargs):
        self._name = name
        self._channel: Channel = kwargs[CONF_DEVICE_CHANNEL]

        self._unique_id = unique_id

        self.entity_id = f"light.{slugify(name)}"
        self._attr_brightness = 255
        self._fade_time = kwargs[CONF_DEVICE_TRANSITION]
        self._state = False
        self._channel_size = CHANNEL_SIZE[kwargs[CONF_CHANNEL_SIZE]]
        self._color_mode = kwargs[CONF_DEVICE_TYPE]
        self._vals = []
        self._features = LightEntityFeature(0)
        self._supported_color_modes = set()
        self._channel_last_update = 0
        self._channel_width = 0
        self._type = None
        # Set by the effect engine; see effect_engine.py.
        self.effect_engine = None
        self._restoring = False

        self._channel: pyartnet.base.Channel

    def set_channel(self, channel: pyartnet.base.Channel):
        """Set the channel"""
        self._channel = channel
        self._channel.callback_fade_finished = self._channel_fade_finish

        # Dummy channels (fixed values in channel_setup) output their value from the
        # start, even while the light itself is still off.
        if self._has_fixed_values():
            channel.set_values(self._off_values())

    def _has_fixed_values(self) -> bool:
        setup = getattr(self, "_channel_setup", None)
        return bool(setup) and not isinstance(setup, str) and any(
            is_fixed_value(c) for c in setup)

    def _off_values(self) -> list[int]:
        """DMX values when off: 0, except dummy channels which keep their fixed value."""
        return off_values(getattr(self, "_channel_setup", None), self._channel_size[1],
                          self._channel._width)

    def set_type(self, type):
        self._type = type

    # ---- effects (effect_engine.py) -------------------------------------------

    def _take_manual_control(self) -> None:
        """A manual change (service call) releases the fixture from any running effect."""
        if self.effect_engine is not None and not self._restoring:
            self.effect_engine.release_fixture(self.name)

    @property
    def effect_owner(self) -> str | None:
        """Key of the effect currently driving this fixture, if any."""
        if self.effect_engine is None:
            return None
        return ", ".join(self.effect_engine.fixture_effects(self.name)) or None

    def cancel_fade(self) -> None:
        fade = getattr(self._channel, "_current_fade", None)
        if fade is not None:
            fade.cancel()
            self._channel._current_fade = None

    def _apply_effect_color(self, rgb: tuple[int, int, int]) -> None:
        """Set the light's colour values from an effect colour (no-op without colour)."""

    def effect_values(self, level: float, rgb: tuple[int, int, int] | None) -> list[float]:
        """Channel values for an effect frame: intensity 0..1 and, optionally, a colour.

        Goes through the fixture's own get_target_values(), so its channel layout,
        16-bit channels and dummy channels apply. Without a colour the fixture keeps
        its current one (intensity effects).
        """
        saved = (self._state, self._attr_brightness, self._vals)
        try:
            self._state = True
            self._attr_brightness = round(255 * min(1.0, max(0.0, level)))
            if rgb is not None:
                self._vals = list(self._vals) if isinstance(self._vals, (list, tuple)) else self._vals
                self._apply_effect_color(rgb)
            return list(self.get_target_values())
        finally:
            self._state, self._attr_brightness, self._vals = saved

    def display_rgb(self) -> tuple[int, int, int] | None:
        """The light's own colour as Home Assistant shows it (None: no colour / white)."""
        if self.hass is None or not self.entity_id:
            return None
        state = self.hass.states.get(self.entity_id)
        rgb = state.attributes.get("rgb_color") if state is not None else None
        return tuple(int(v) for v in rgb[:3]) if rgb else None

    def normal_level(self) -> float:
        """Intensity 0..1 without an effect: the light entity's brightness, 0 when off."""
        if not self.is_on:
            return 0.0
        return min(1.0, max(0.0, (self._attr_brightness or 0) / 255))

    def normal_values(self) -> list[float]:
        """What the fixture outputs without an effect: its light entity's state."""
        return list(self.get_target_values()) if self.is_on else self._off_values()

    def write_effect_values(self, values) -> None:
        top = self._channel._value_max
        self._channel.set_values([min(top, max(0, round(v))) for v in values])

    def async_write_ha_state_if_added(self) -> None:
        if self.hass is not None and self.entity_id and self._platform_state is not None:
            try:
                self.async_write_ha_state()
            except Exception:  # not added yet / being removed
                pass

    @property
    def name(self):
        """Return the display name of this light."""
        return self._name

    @property
    def unique_id(self):
        """Return unique ID for light."""
        return self._unique_id

    @property
    def color_mode(self) -> str | None:
        """Return the color mode of the light."""
        return self._color_mode

    @property
    def supported_features(self):
        """Flag supported features."""
        return self._features

    @property
    def extra_state_attributes(self):
        # TODO extra_state_attributes really shouldn't have lots of changing values like this, it pollutes the DB
        data = {"type": self._type,
                "dmx_channels": [
                    k for k in range(
                        self._channel._start, self._channel._start + self._channel._width, 1
                    )
                ],
                "dmx_values": self._channel.get_values(),
                "values": self._vals,
                "dmx_effect": self.effect_owner,
                "bright": self._attr_brightness
                }
        self._channel_last_update = time.time()
        return data

    @property
    def is_on(self):
        """Return true if light is on."""
        return self._state

    @property
    def should_poll(self):
        return False

    @property
    def supported_color_modes(self) -> set | None:
        """Flag supported color modes."""
        return self._supported_color_modes

    @property
    def fade_time(self):
        return self._fade_time

    @fade_time.setter
    def fade_time(self, value):
        self._fade_time = value

    def _channel_value_change(self):
        """Schedule update while fade is running"""
        if time.time() - self._channel_last_update > 1.1:
            self._channel_last_update = time.time()
        self.async_schedule_update_ha_state()

    def _channel_fade_finish(self, channel):
        """Fade is finished -> schedule update"""
        self._channel_last_update = time.time()
        self.async_schedule_update_ha_state()

    @staticmethod
    def _default_calculation_function(channel_value):
        return channel_value if isinstance(channel_value, int) else 0

    def get_target_values(self) -> list:
        """Return the Target DMX Values"""
        raise NotImplementedError()

    async def flash(self, old_values, old_brightness, **kwargs):
        self._take_manual_control()
        transition = kwargs.get(ATTR_TRANSITION, self._fade_time)
        if transition == 0:
            transition = 1

        old_state = self._state
        self._state = True

        flash_time = kwargs.get(ATTR_FLASH)

        if old_state and old_values == self._vals and old_brightness == self._attr_brightness:
            if self._attr_brightness < 128:
                self._attr_brightness = 255
            else:
                self._attr_brightness = 0

        if flash_time == FLASH_SHORT:
            self._channel.set_values(self.get_target_values())
            await self._channel
        elif flash_time == FLASH_LONG:
            self._channel.set_fade(self.get_target_values(), transition * 1000)
            await self._channel
        else:
            log.error(f"{flash_time} is not a valid value for attribute {ATTR_FLASH}")
            return

        self._state = old_state
        self._attr_brightness = old_brightness
        self._vals = old_values

        self._channel.set_fade(self.get_target_values(), transition * 1000)

    async def async_create_fade(self, **kwargs):
        """Instruct the light to turn on"""
        self._take_manual_control()
        self._state = True

        transition = kwargs.get(ATTR_TRANSITION, self._fade_time)

        self._channel.set_fade(
            self.get_target_values(), transition * 1000
        )

        self.async_schedule_update_ha_state()

    async def async_turn_off(self, **kwargs):
        """
        Instruct the light to turn off. If a transition time has been specified in seconds
        the controller will fade.
        """
        self._take_manual_control()
        transition = kwargs.get(ATTR_TRANSITION, self._fade_time)

        self._channel.set_fade(self._off_values(), transition * 1000)

        self._state = False
        self.async_schedule_update_ha_state()

    async def async_added_to_hass(self) -> None:
        """Handle entity which will be added."""
        await super().async_added_to_hass()
        old_state = await self.async_get_last_state()
        if old_state:
            old_type = old_state.attributes.get('type')
            if old_type != self._type:
                log.debug("Channel type changed. Unable to restore state.")
                old_state = None

        if old_state is not None:
            # Restoring isn't a manual change: don't release an effect that has
            # already taken this fixture over.
            self._restoring = True
            try:
                await self.restore_state(old_state)
            finally:
                self._restoring = False

    async def restore_state(self, old_state):
        log.error("Derived class should implement this. Report this to the repository author.")

    @property
    def channel_width(self):
        return self._channel_width

    @property
    def channel_size(self):
        return self._channel_size

    @property
    def channel(self):
        return self._channel


class DmxFixed(DmxBaseLight):
    CONF_TYPE = "fixed"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._color_mode = ColorMode.ONOFF
        self._supported_color_modes.add(ColorMode.ONOFF)
        self._channel_setup = kwargs.get(CONF_CHANNEL_SETUP) or [255]
        self._channel_width = len(self._channel_setup)

    def get_target_values(self):
        return to_values(self._channel_setup, self._channel_size[1], self.is_on, self._attr_brightness)

    def set_channel(self, channel: pyartnet.base.Channel):
        super().set_channel(channel)
        channel.set_values(self.get_target_values())

    async def async_turn_on(self, **kwargs):
        pass  # do nothing, fixed is constant value

    async def async_turn_off(self, **kwargs):
        pass  # do nothing, fixed is constant value

    async def restore_state(self, old_state):
        log.debug("Added fixed to hass. Do nothing to restore state. Fixed is constant value")
        await super().async_create_fade()


class DmxBinary(DmxBaseLight):
    CONF_TYPE = "binary"

    def effect_values(self, level, rgb):
        # On/off only: on from half level up.
        return super().effect_values(1.0 if level >= 0.5 else 0.0, None)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._channel_width = 1
        self._features = LightEntityFeature.FLASH
        self._color_mode = ColorMode.ONOFF
        self._supported_color_modes.add(ColorMode.ONOFF)

    def get_target_values(self):
        return [self.brightness * self._channel_size[1]]

    async def async_turn_on(self, **kwargs):
        self._take_manual_control()
        if ATTR_FLASH in kwargs:
            flash_time = kwargs[ATTR_FLASH]
            if flash_time == FLASH_SHORT:
                duration = 0.5
            else:
                duration = 2.0

            await self.flash_binary(duration)
            return

        self._state = True
        self._attr_brightness = 255
        self._channel.set_fade(
            self.get_target_values(), 0
        )
        self.async_schedule_update_ha_state()

    async def flash_binary(self, duration: float):
        self._state = not self._state
        self._attr_brightness = 255 if self._state else 0
        self._channel.set_fade(
            self.get_target_values(), 0
        )
        await asyncio.sleep(duration)
        self._state = not self._state
        self._attr_brightness = 255 if self._state else 0
        self._channel.set_fade(
            self.get_target_values(), 0
        )

    async def async_turn_off(self, **kwargs):
        self._take_manual_control()
        self._state = False
        self._attr_brightness = 0
        self._channel.set_fade(
            self.get_target_values(), 0
        )
        self.async_schedule_update_ha_state()

    async def restore_state(self, old_state):
        log.debug("Added binary light to hass. Try restoring state.")
        self._state = old_state.state
        self._attr_brightness = old_state.attributes.get('bright')

        if old_state.state == STATE_ON:
            await self.async_turn_on()
        else:
            await self.async_turn_off()


class DmxDimmer(DmxBaseLight):
    CONF_TYPE = "dimmer"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._channel_width = 1
        self._features = LightEntityFeature.TRANSITION | LightEntityFeature.FLASH
        self._color_mode = ColorMode.BRIGHTNESS
        self._supported_color_modes.add(ColorMode.BRIGHTNESS)
        self._channel_setup = kwargs.get(CONF_CHANNEL_SETUP) or "d"
        validate(self._channel_setup, self.CONF_TYPE)
        # A dimmer can carry extra dummy channels, e.g. [d, 0] for dimmer + mode.
        self._channel_width = len(self._channel_setup)

    def get_target_values(self):
        return to_values(self._channel_setup, self._channel_size[1], self.is_on, self._attr_brightness)

    async def async_turn_on(self, **kwargs):

        # Update state from service call
        if ATTR_BRIGHTNESS in kwargs:
            self._attr_brightness = kwargs[ATTR_BRIGHTNESS]

        await super().async_create_fade(**kwargs)

    async def restore_state(self, old_state):
        log.debug("Added dimmer to hass. Try restoring state.")

        if old_state:
            prev_brightness = old_state.attributes.get('bright')
            self._attr_brightness = prev_brightness

        if old_state.state != STATE_OFF:
            await super().async_create_fade(brightness=self._attr_brightness, transition=0)


class DmxWhite(DmxBaseLight):
    CONF_TYPE = "color_temp"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self._features = LightEntityFeature.TRANSITION | LightEntityFeature.FLASH

        self._color_mode = ColorMode.COLOR_TEMP
        self._supported_color_modes.add(ColorMode.COLOR_TEMP)
        # Intentionally switching min and max here; it's inverted in the conversion.

        self._min_kelvin = convert_to_kelvin(kwargs[CONF_DEVICE_MIN_TEMP])
        self._max_kelvin = convert_to_kelvin(kwargs[CONF_DEVICE_MAX_TEMP])
        self._vals = int((self._max_kelvin + self._min_kelvin) / 2)

        self._channel_setup = kwargs.get(CONF_CHANNEL_SETUP) or "ch"
        validate(self._channel_setup, self.CONF_TYPE)

        self._channel_width = len(self._channel_setup)

    @property
    def color_temp_kelvin(self) -> int | None:
        return self._vals

    @property
    def min_color_temp_kelvin(self) -> int:
        """Return the warmest color_temp_kelvin that this light supports."""
        return self._min_kelvin

    @property
    def max_color_temp_kelvin(self) -> int:
        """Return the coldest color_temp_kelvin that this light supports."""
        return self._max_kelvin

    def get_target_values(self):
        return to_values(self._channel_setup, self._channel_size[1], self.is_on, self._attr_brightness,
                         color_temp_kelvin=self.color_temp_kelvin,
                         min_kelvin=self.min_color_temp_kelvin,
                         max_kelvin=self.max_color_temp_kelvin)

    async def async_turn_on(self, **kwargs):
        """
        Instruct the light to turn on.
        """

        old_values = self._vals
        old_brightness = self._attr_brightness

        if ATTR_COLOR_TEMP_KELVIN in kwargs:
            self._vals = kwargs[ATTR_COLOR_TEMP_KELVIN]

        elif ATTR_WHITE in kwargs:
            self._vals = (self._max_kelvin + self._min_kelvin) / 2
            self._attr_brightness = kwargs[ATTR_WHITE]

        if ATTR_BRIGHTNESS in kwargs:
            self._attr_brightness = kwargs[ATTR_BRIGHTNESS]

        if ATTR_FLASH in kwargs:
            await super().flash(old_values, old_brightness, **kwargs)
        else:
            await super().async_create_fade(**kwargs)

        return None

    async def restore_state(self, old_state):
        log.debug("Added color_temp to hass. Try restoring state.")

        if old_state:
            prev_vals = old_state.attributes.get('values')
            self._vals = prev_vals
            prev_brightness = old_state.attributes.get('bright')
            self._attr_brightness = prev_brightness

        if old_state.state != STATE_OFF:
            await super().async_create_fade(brightness=self._attr_brightness, rgb_color=self._vals, transition=0)


class DmxRGB(DmxBaseLight):
    CONF_TYPE = "rgb"

    def _apply_effect_color(self, rgb):
        self._vals = tuple(rgb)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._features = LightEntityFeature.TRANSITION | LightEntityFeature.FLASH
        self._color_mode = ColorMode.RGB
        self._supported_color_modes.add(ColorMode.RGB)
        self._supported_color_modes.add(ColorMode.HS)
        self._vals = (255, 255, 255)

        self._channel_setup = kwargs.get(CONF_CHANNEL_SETUP) or "rgb"
        validate(self._channel_setup, self.CONF_TYPE)

        self._channel_width = len(self._channel_setup)

        self._auto_scale_white = "w" in self._channel_setup or "W" in self._channel_setup

    @property
    def rgb_color(self) -> tuple:
        """Return the rgb color value."""
        return self._vals

    def get_target_values(self):
        red = self._vals[0]
        green = self._vals[1]
        blue = self._vals[2]

        if self._auto_scale_white:
            red, green, blue, white = color_rgb_to_rgbw(red, green, blue)
        else:
            white = -1

        return to_values(self._channel_setup, self._channel_size[1], self.is_on, self._attr_brightness, red, green,
                         blue,
                         white)

    async def async_turn_on(self, **kwargs):
        """
        Instruct the light to turn on.
        """

        old_values = self._vals
        old_brightness = self._attr_brightness

        # RGB already contains brightness information
        if ATTR_RGB_COLOR in kwargs:
            self._vals = kwargs[ATTR_RGB_COLOR]

        if ATTR_HS_COLOR in kwargs:
            hue, sat = kwargs[ATTR_HS_COLOR]
            self._vals = color_util.color_hs_to_RGB(hue, sat)

        if ATTR_BRIGHTNESS in kwargs:
            self._attr_brightness = kwargs[ATTR_BRIGHTNESS]

        if ATTR_FLASH in kwargs:
            await super().flash(old_values, old_brightness, **kwargs)
        else:
            await super().async_create_fade(**kwargs)

        return None

    async def restore_state(self, old_state):
        log.debug("Added rgb to hass. Try restoring state.")

        if old_state:
            prev_vals = old_state.attributes.get('values')
            self._vals = prev_vals
            prev_brightness = old_state.attributes.get('bright')
            self._attr_brightness = prev_brightness

        if old_state.state != STATE_OFF:
            await super().async_create_fade(brightness=self._attr_brightness, rgb_color=self._vals, transition=0)


class DmxRGBW(DmxBaseLight):
    CONF_TYPE = "rgbw"

    def _apply_effect_color(self, rgb):
        # Use the white channel for the white part of the colour.
        self._vals = list(color_rgb_to_rgbw(*rgb))

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._features = LightEntityFeature.TRANSITION | LightEntityFeature.FLASH
        self._color_mode = ColorMode.RGBW
        self._supported_color_modes.add(ColorMode.RGBW)
        self._supported_color_modes.add(ColorMode.HS)
        self._vals = [255, 255, 255, 255]

        self._channel_setup = kwargs.get(CONF_CHANNEL_SETUP) or "rgbw"
        validate(self._channel_setup, self.CONF_TYPE)

        self._channel_width = len(self._channel_setup)

    @property
    def rgbw_color(self) -> tuple:
        """Return the rgbw color value."""
        return tuple(self._vals)

    def get_target_values(self):
        red = self._vals[0]
        green = self._vals[1]
        blue = self._vals[2]
        white = self._vals[3]

        return to_values(self._channel_setup, self._channel_size[1], self.is_on, self._attr_brightness, red, green,
                         blue,
                         white)

    async def async_turn_on(self, **kwargs):
        """
        Instruct the light to turn on.
        """

        old_values = list(self._vals)
        old_brightness = self._attr_brightness

        # RGB already contains brightness information
        if ATTR_RGBW_COLOR in kwargs:
            self._vals = list(kwargs[ATTR_RGBW_COLOR])

        if ATTR_HS_COLOR in kwargs:
            hue, sat = kwargs[ATTR_HS_COLOR]
            self._vals[0:3] = list(color_util.color_hs_to_RGB(hue, sat))

        if ATTR_BRIGHTNESS in kwargs:
            self._attr_brightness = kwargs[ATTR_BRIGHTNESS]

        if ATTR_FLASH in kwargs:
            await super().flash(old_values, old_brightness, **kwargs)
        else:
            await super().async_create_fade(**kwargs)

        return None

    async def restore_state(self, old_state):
        log.debug("Added rgbw to hass. Try restoring state.")

        if old_state:
            prev_vals = old_state.attributes.get('values')
            self._vals = prev_vals

            prev_brightness = old_state.attributes.get('bright')
            self._attr_brightness = prev_brightness

        if old_state.state != STATE_OFF:
            await super().async_create_fade(brightness=self._attr_brightness, rgbw_color=self._vals, transition=0)


class DmxRGBWW(DmxBaseLight):
    CONF_TYPE = "rgbww"

    def _apply_effect_color(self, rgb):
        vals = list(self._vals)
        vals[0:5] = [rgb[0], rgb[1], rgb[2], 0, 0]
        self._vals = vals

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self._features = LightEntityFeature.TRANSITION | LightEntityFeature.FLASH
        self._color_mode = ColorMode.RGBWW
        self._supported_color_modes.add(ColorMode.RGBWW)
        self._supported_color_modes.add(ColorMode.COLOR_TEMP)
        self._supported_color_modes.add(ColorMode.HS)

        # Intentionally switching min and max here; it's inverted in the conversion.
        self._min_kelvin = convert_to_kelvin(kwargs[CONF_DEVICE_MIN_TEMP])
        self._max_kelvin = convert_to_kelvin(kwargs[CONF_DEVICE_MAX_TEMP])
        self._vals = [255, 255, 255, 255, 255, (self._max_kelvin - self._min_kelvin) / 2]

        self._channel_setup = kwargs.get(CONF_CHANNEL_SETUP) or "rgbch"
        validate(self._channel_setup, self.CONF_TYPE)

        self._channel_width = len(self._channel_setup)

    @property
    def rgbww_color(self) -> tuple:
        """Return the rgbww color value."""
        return tuple(self._vals[0:5])

    @property
    def min_color_temp_kelvin(self) -> int:
        """Return the warmest color_temp_kelvin that this light supports."""
        return self._min_kelvin

    @property
    def max_color_temp_kelvin(self) -> int:
        """Return the coldest color_temp_kelvin that this light supports."""
        return self._max_kelvin

    @property
    def color_temp_kelvin(self) -> int | None:
        return self._vals[5]

    def get_target_values(self):
        red = self._vals[0]
        green = self._vals[1]
        blue = self._vals[2]
        cold_white = self._vals[3]
        warm_white = self._vals[4]
        color_temperature_kelvin = self._vals[5]

        return to_values(self._channel_setup, self._channel_size[1], self.is_on, self._attr_brightness,
                         red, green, blue, cold_white, warm_white,
                         color_temp_kelvin=color_temperature_kelvin,
                         min_kelvin=self.min_color_temp_kelvin,
                         max_kelvin=self.max_color_temp_kelvin)

    async def async_turn_on(self, **kwargs):
        """
        Instruct the light to turn on.
        """
        old_values = list(self._vals)
        old_brightness = self._attr_brightness

        # RGB already contains brightness information
        if ATTR_RGBWW_COLOR in kwargs:
            self._vals[0:5] = kwargs[ATTR_RGBWW_COLOR]

            if self._vals[3] != old_values[3] or self._vals[4] != old_values[4]:
                self._vals[5], _ = color_util.rgbww_to_color_temperature(
                    (self._vals[0], self._vals[1], self._vals[2], self._vals[3], self._vals[4]),
                    self.min_color_temp_kelvin, self.max_color_temp_kelvin
                )
                self._channel_value_change()

        if ATTR_HS_COLOR in kwargs:
            hue, sat = kwargs[ATTR_HS_COLOR]
            self._vals[0:3] = list(color_util.color_hs_to_RGB(hue, sat))

        if ATTR_BRIGHTNESS in kwargs:
            self._attr_brightness = kwargs[ATTR_BRIGHTNESS]

        if ATTR_COLOR_TEMP_KELVIN in kwargs:
            self._vals[5] = kwargs[ATTR_COLOR_TEMP_KELVIN]
            _, _, _, self._vals[3], self._vals[4] = color_util.color_temperature_to_rgbww(
                self._vals[5], self._attr_brightness, self.min_color_temp_kelvin, self.max_color_temp_kelvin)
            self._channel_value_change()

        if ATTR_FLASH in kwargs:
            await super().flash(old_values, old_brightness, **kwargs)
        else:
            await super().async_create_fade(**kwargs)

        return None

    async def restore_state(self, old_state):
        log.debug("Added rgbww to hass. Try restoring state.")

        if old_state:
            prev_vals = old_state.attributes.get('values')
            if len(prev_vals) == 6:
                self._vals = prev_vals

            prev_brightness = old_state.attributes.get('bright')
            self._attr_brightness = prev_brightness

        if old_state.state != STATE_OFF:
            await super().async_create_fade(brightness=self._attr_brightness, rgbww_color=self._vals, transition=0)

class DmxXY(DmxBaseLight):
    CONF_TYPE = "xy"

    def _apply_effect_color(self, rgb):
        if any(rgb):
            self._vals = list(color_util.color_RGB_to_xy(*rgb))

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self._features = LightEntityFeature.TRANSITION | LightEntityFeature.FLASH
        self._color_mode = ColorMode.XY
        self._supported_color_modes.add(ColorMode.XY)

        self._vals = [0.0, 0.0]

        self._channel_setup = kwargs.get(CONF_CHANNEL_SETUP) or "dxy"
        validate(self._channel_setup, self.CONF_TYPE)

        self._channel_width: LogicalChannelSize = len(self._channel_setup)

    @property
    def xy_color(self) -> tuple:
        """Return the xy color value."""
        return tuple(self._vals[0:2])

    def get_target_values(self):
        x = self._vals[0]
        y = self._vals[1]

        log.debug("get_target_values: x=%s, y=%s, brightness=%s, channel_size=%s", x, y, self._attr_brightness, self._channel_size[1])

        return to_values(self._channel_setup, self._channel_size[1], self.is_on, self._attr_brightness,
                         x=x, y=y)

    async def async_turn_on(self, **kwargs):
        """
        Instruct the light to turn on.
        """
        old_values = list(self._vals)
        old_brightness = self._attr_brightness

        if ATTR_XY_COLOR in kwargs:
            log.debug(kwargs)
            
            self._vals = kwargs[ATTR_XY_COLOR]

            if self._vals[0] != old_values[0] or self._vals[1] != old_values[1]:
                self._channel_value_change()

        if ATTR_BRIGHTNESS in kwargs:
            self._attr_brightness = kwargs[ATTR_BRIGHTNESS]

        if ATTR_FLASH in kwargs:
            await super().flash(old_values, old_brightness, **kwargs)
        else:
            await super().async_create_fade(**kwargs)

        return None

    async def restore_state(self, old_state):
        log.debug("Added xy to hass. Try restoring state.")

        if old_state:
            prev_vals = old_state.attributes.get('values')
            if len(prev_vals) == 2:
                self._vals = prev_vals

            prev_brightness = old_state.attributes.get('bright')
            self._attr_brightness = prev_brightness

        if old_state.state != STATE_OFF:
            await super().async_create_fade(brightness=self._attr_brightness, xy_color=self._vals, transition=0)


# ------------------------------------------------------------------------------
# conf
# ------------------------------------------------------------------------------

__CLASS_LIST = [DmxDimmer, DmxRGB, DmxWhite, DmxRGBW, DmxRGBWW, DmxBinary, DmxFixed, DmxXY]
__CLASS_TYPE = {k.CONF_TYPE: k for k in __CLASS_LIST}

# Public aliases, used by the entity factory and the UI patch validation.
CLASS_LIST = __CLASS_LIST
CLASS_TYPE = __CLASS_TYPE

DEVICE_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_DEVICE_CHANNEL): vol.All(
            vol.Coerce(int), vol.Range(min=1, max=512)
        ),
        vol.Required(CONF_DEVICE_NAME): cv.string,
        vol.Optional(CONF_DEVICE_FRIENDLY_NAME): cv.string,
        vol.Optional(CONF_DEVICE_TYPE, default='dimmer'): vol.In(
            [k.CONF_TYPE for k in __CLASS_LIST]
        ),
        vol.Optional(CONF_DEVICE_TRANSITION, default=0): vol.All(
            vol.Coerce(float), vol.Range(min=0, max=999)
        ),
        vol.Optional(CONF_OUTPUT_CORRECTION, default=None): vol.Any(
            None, vol.In(AVAILABLE_CORRECTIONS)
        ),
        vol.Optional(CONF_CHANNEL_SIZE, default='8bit'): vol.Any(
            None, vol.In(CHANNEL_SIZE)
        ),
        vol.Optional(CONF_BYTE_ORDER, default='big'): vol.Any(
            None, vol.In(['little', 'big'])
        ),
        vol.Optional(CONF_DEVICE_MIN_TEMP, default='2700K'): vol.Match(
            "\\d+(k|K)"
        ),
        vol.Optional(CONF_DEVICE_MAX_TEMP, default='6500K'): vol.Match(
            "\\d+(k|K)"
        ),
        vol.Optional(CONF_CHANNEL_SETUP, default=None): vol.Any(
            None, cv.string, cv.ensure_list
        ),
    }
)

UNIVERSE_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_SEND_PARTIAL_UNIVERSE, default=True): cv.boolean,
        vol.Optional(CONF_OUTPUT_CORRECTION, default='linear'): vol.Any(
            None, vol.In(AVAILABLE_CORRECTIONS)
        ),
        vol.Required(CONF_DEVICES): vol.All(cv.ensure_list, [DEVICE_SCHEMA]),
    }
)
