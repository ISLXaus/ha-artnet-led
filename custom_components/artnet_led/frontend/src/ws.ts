import type { HomeAssistant, PatchDoc, PatchError, YamlNodeSnapshot } from './model';

export interface PatchGetResult {
  schema_version: number;
  patch: PatchDoc;
  yaml_nodes: YamlNodeSnapshot[];
  entry_exists: boolean;
  /** Validation problems in the stored patch, if any. */
  errors?: PatchError[];
}

export interface SaveResult {
  success: boolean;
  errors: PatchError[];
}

export interface DmxFrame {
  node_key: string;
  universe: number;
  seq: number;
  values: number[];
}

export const getPatch = (hass: HomeAssistant) =>
  hass.callWS<PatchGetResult>({ type: 'artnet_led/patch/get' });

export const validatePatch = (hass: HomeAssistant, patch: PatchDoc) =>
  hass.callWS<{ valid: boolean; errors: PatchError[] }>({
    type: 'artnet_led/patch/validate',
    patch,
  });

export const savePatch = (hass: HomeAssistant, patch: PatchDoc) =>
  hass.callWS<SaveResult>({ type: 'artnet_led/patch/save', patch });

export const exportPatchYaml = (hass: HomeAssistant, patch: PatchDoc) =>
  hass.callWS<{ yaml: string }>({ type: 'artnet_led/patch/export', patch });

export const importPatchYaml = (hass: HomeAssistant, content: string) =>
  hass.callWS<{ patch: PatchDoc; valid: boolean; errors: PatchError[] }>({
    type: 'artnet_led/patch/import',
    content,
  });

export const getStatus = (hass: HomeAssistant) =>
  hass.callWS<{ nodes: unknown[]; discovered: unknown[] }>({
    type: 'artnet_led/status/get',
  });

export const getEntityMap = (hass: HomeAssistant) =>
  hass.callWS<{ entities: Record<string, string> }>({
    type: 'artnet_led/entity_map/get',
  });

export const subscribeDmx = (
  hass: HomeAssistant,
  nodeKey: string,
  universe: number,
  callback: (frame: DmxFrame) => void
) =>
  hass.connection.subscribeMessage<DmxFrame>(callback, {
    type: 'artnet_led/dmx/subscribe',
    node_key: nodeKey,
    universe,
  });
