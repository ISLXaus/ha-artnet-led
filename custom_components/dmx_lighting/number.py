"""Number entities: live parameters of effect presets (see effect_entities.py)."""
from __future__ import annotations

from homeassistant.core import HomeAssistant

from custom_components.dmx_lighting.const import DATA_ENGINES, DOMAIN
from custom_components.dmx_lighting.effect_entities import NUMBER_PARAMS, DmxEffectNumber


async def async_setup_entry(hass: HomeAssistant, entry, async_add_entities) -> None:
    engine = hass.data[DOMAIN].get(DATA_ENGINES, {}).get(entry.entry_id)
    if engine is None:
        return
    async_add_entities(
        DmxEffectNumber(hass, engine, key, preset, *spec)
        for key, preset in engine.presets.items()
        for spec in NUMBER_PARAMS
    )
