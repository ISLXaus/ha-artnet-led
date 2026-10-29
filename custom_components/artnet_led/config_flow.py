"""Config flow: a single 'DMX Patch' entry that anchors the UI-defined configuration."""
from __future__ import annotations

from homeassistant import config_entries

from custom_components.artnet_led.const import DOMAIN


class ArtnetLedConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        """One click: adding the integration creates the patch and the sidebar panel."""
        return await self._async_create_patch_entry()

    async def async_step_import(self, import_data=None):
        """Created programmatically when the panel saves its first patch."""
        return await self._async_create_patch_entry()

    async def _async_create_patch_entry(self):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(title="DMX Patch", data={})
