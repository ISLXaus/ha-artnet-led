"""Persistence for the UI-edited DMX patch (.storage/artnet_led.patch)."""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from custom_components.artnet_led.const import STORAGE_KEY, STORAGE_VERSION

EMPTY_PATCH: dict[str, Any] = {"nodes": []}


class _PatchStorage(Store):
    async def _async_migrate_func(self, old_major_version, old_minor_version, old_data):
        # Schema v1; seam for future migrations (e.g. fixture-library model).
        return old_data


class PatchStore:
    def __init__(self, hass: HomeAssistant) -> None:
        self._store = _PatchStorage(hass, STORAGE_VERSION, STORAGE_KEY)

    async def async_load(self) -> dict:
        data = await self._store.async_load()
        if not data:
            return {"nodes": []}
        data.setdefault("nodes", [])
        return data

    async def async_save(self, patch: dict) -> None:
        await self._store.async_save(patch)
