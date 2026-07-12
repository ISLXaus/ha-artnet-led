"""Owns the lifecycle of pyartnet nodes so they can be created, shared and torn down cleanly."""
from __future__ import annotations

import asyncio
import logging
from dataclasses import dataclass, field
from typing import Any

import pyartnet
import pyartnet.base.background_task
from homeassistant.const import EVENT_HOMEASSISTANT_STOP
from homeassistant.core import HomeAssistant

from custom_components.artnet_led.bridge.artnet_controller import ArtNetController
from custom_components.artnet_led.const import (
    ARTNET_DEFAULT_PORT,
    CONF_NODE_HOST_OVERRIDE,
    CONF_NODE_MAX_FPS,
    CONF_NODE_PORT_OVERRIDE,
    CONF_NODE_REFRESH,
    CONF_NODE_TYPE,
    DATA_RUNTIME,
    DOMAIN,
    KINET_DEFAULT_PORT,
    NODE_TYPE_ARTNET_CONTROLLER,
    NODE_TYPE_ARTNET_DIRECT,
    NODE_TYPE_KINET,
    NODE_TYPE_SACN,
    SACN_DEFAULT_PORT,
)
from homeassistant.const import CONF_HOST as CONF_NODE_HOST
from homeassistant.const import CONF_PORT as CONF_NODE_PORT

log = logging.getLogger(__name__)


class NodeConflictError(Exception):
    """Raised when a node is already owned by a different config source."""


def node_key(node_type: str, host: str | None, port: int | None) -> str:
    """Unique runtime key for a node. The controller binds UDP 6454 so it is a singleton.

    Must stay in sync with nodeKey() in the panel frontend (frontend/src/model.ts).
    """
    if node_type == NODE_TYPE_ARTNET_CONTROLLER:
        return NODE_TYPE_ARTNET_CONTROLLER
    return f"{node_type}:{host}:{port if port is not None else 'default'}"


@dataclass
class NodeHandle:
    """A running pyartnet node plus the bookkeeping needed to display and tear it down."""

    key: str
    node: Any  # pyartnet.base.BaseNode or ArtNetController
    owner: str  # OWNER_YAML or a config entry_id
    node_type: str
    host: str
    port: int | None
    # Universe configs as fed to the entity factory, kept for the panel's read-only view.
    universes_cfg: dict[int, dict] = field(default_factory=dict)

    def record_universes(self, universes_cfg: dict[int, dict]) -> None:
        for nr, cfg in universes_cfg.items():
            self.universes_cfg[int(nr)] = cfg


class ArtNetRuntime:
    """Registry of running nodes, stored in hass.data. Replaces the old module-level NODES dict."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._handles: dict[str, NodeHandle] = {}

    @staticmethod
    def get(hass: HomeAssistant) -> "ArtNetRuntime":
        data = hass.data.setdefault(DOMAIN, {})
        runtime = data.get(DATA_RUNTIME)
        if runtime is None:
            runtime = ArtNetRuntime(hass)
            data[DATA_RUNTIME] = runtime

            async def _on_hass_stop(_event) -> None:
                await runtime.release_all()

            hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, _on_hass_stop)
        return runtime

    def handles(self, owner: str | None = None) -> list[NodeHandle]:
        if owner is None:
            return list(self._handles.values())
        return [h for h in self._handles.values() if h.owner == owner]

    def get_handle(self, key: str) -> NodeHandle | None:
        return self._handles.get(key)

    async def acquire_node(self, node_cfg: dict, owner: str) -> NodeHandle:
        """Return a running node for this config, creating it if needed.

        The same owner may acquire the same node multiple times (e.g. multiple YAML
        platform entries pointing at one gateway); different owners may not.
        """
        # pyartnet expects the created asyncio task to be the task running its wrapper.
        # Home Assistant's task factory can wrap tasks, which breaks pyartnet's assertions.
        pyartnet.base.background_task.CREATE_TASK = asyncio.create_task

        node_type = node_cfg.get(CONF_NODE_TYPE)
        max_fps = node_cfg.get(CONF_NODE_MAX_FPS)
        refresh_interval = node_cfg.get(CONF_NODE_REFRESH)

        host = node_cfg.get(CONF_NODE_HOST)
        port = node_cfg.get(CONF_NODE_PORT)

        real_host = node_cfg.get(CONF_NODE_HOST_OVERRIDE) or host
        real_port = node_cfg.get(CONF_NODE_PORT_OVERRIDE)
        if real_port is None:
            real_port = port

        key = node_key(node_type, host, port)

        existing = self._handles.get(key)
        if existing is not None:
            if existing.owner != owner:
                raise NodeConflictError(
                    f"Node '{key}' is already configured by "
                    f"{'YAML' if existing.owner == 'yaml' else 'the UI patch'};"
                    f" it cannot be configured twice."
                )
            return existing

        if node_type == NODE_TYPE_ARTNET_DIRECT:
            node = await self._create_stock_node(
                pyartnet.ArtNetNode, real_host, real_port or ARTNET_DEFAULT_PORT,
                max_fps, refresh_interval,
            )
        elif node_type == NODE_TYPE_SACN:
            node = await self._create_stock_node(
                pyartnet.SacnNode, real_host, real_port or SACN_DEFAULT_PORT,
                max_fps, refresh_interval, source_name="ha-artnet-led",
            )
        elif node_type == NODE_TYPE_KINET:
            node = await self._create_stock_node(
                pyartnet.KiNetNode, real_host, real_port or KINET_DEFAULT_PORT,
                max_fps, refresh_interval,
            )
        elif node_type == NODE_TYPE_ARTNET_CONTROLLER:
            node = ArtNetController(self._hass, max_fps=max_fps, refresh_every=refresh_interval)
            node.start()
        else:
            raise NotImplementedError(f"Unknown client type '{node_type}'")

        handle = NodeHandle(
            key=key, node=node, owner=owner, node_type=node_type, host=host, port=port,
        )
        self._handles[key] = handle
        log.info("Started %s node '%s' (owner: %s)", node_type, key, owner)
        return handle

    @staticmethod
    async def _create_stock_node(cls, real_host, real_port, max_fps, refresh_interval, **kwargs):
        from pyartnet.base.network import UnicastNetworkTarget

        node = cls(
            UnicastNetworkTarget.create(real_host, real_port),
            max_fps=max_fps,
            refresh_every=refresh_interval,
            **kwargs,
        )
        await node.__aenter__()
        if not refresh_interval:
            await node.stop_refresh()
        return node

    async def release_owner(self, owner: str) -> None:
        for handle in self.handles(owner):
            await self._stop_handle(handle)

    async def release_all(self) -> None:
        for handle in list(self._handles.values()):
            await self._stop_handle(handle)

    async def _stop_handle(self, handle: NodeHandle) -> None:
        self._handles.pop(handle.key, None)
        try:
            if isinstance(handle.node, ArtNetController):
                await handle.node.stop()
            else:
                await handle.node.stop_refresh()
                await handle.node.__aexit__(None, None, None)
        except Exception:
            log.exception("Error while stopping node '%s'", handle.key)
        else:
            log.info("Stopped node '%s'", handle.key)

    def snapshot(self, owner: str | None = None) -> list[dict]:
        """JSON-serializable view of running nodes, for the panel."""
        result = []
        for handle in self.handles(owner):
            result.append(
                {
                    "key": handle.key,
                    "owner": handle.owner,
                    "node_type": handle.node_type,
                    "host": handle.host,
                    "port": handle.port,
                    "universes": {
                        str(nr): cfg for nr, cfg in sorted(handle.universes_cfg.items())
                    },
                }
            )
        return result
