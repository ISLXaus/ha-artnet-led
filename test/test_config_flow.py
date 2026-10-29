"""Adding the integration from the UI creates the patch entry (and the sidebar panel) in one click."""
from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResultType

from custom_components.artnet_led.const import DOMAIN, PANEL_URL_PATH


async def test_user_flow_creates_entry_and_panel(hass):
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "DMX Patch"
    await hass.async_block_till_done()

    assert PANEL_URL_PATH in hass.data["frontend_panels"]


async def test_second_add_is_blocked(hass):
    await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"
