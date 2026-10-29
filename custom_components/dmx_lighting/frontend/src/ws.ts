import type { HomeAssistant, PatchDoc, PatchError } from './model';

export interface PatchGetResult {
  schema_version: number;
  patch: PatchDoc;
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
  hass.callWS<PatchGetResult>({ type: 'dmx_lighting/patch/get' });

export const validatePatch = (hass: HomeAssistant, patch: PatchDoc) =>
  hass.callWS<{ valid: boolean; errors: PatchError[] }>({
    type: 'dmx_lighting/patch/validate',
    patch,
  });

export const savePatch = (hass: HomeAssistant, patch: PatchDoc) =>
  hass.callWS<SaveResult>({ type: 'dmx_lighting/patch/save', patch });

export const exportPatchYaml = (hass: HomeAssistant, patch: PatchDoc) =>
  hass.callWS<{ yaml: string }>({ type: 'dmx_lighting/patch/export', patch });

export const importPatchYaml = (hass: HomeAssistant, content: string) =>
  hass.callWS<{ patch: PatchDoc; valid: boolean; errors: PatchError[] }>({
    type: 'dmx_lighting/patch/import',
    content,
  });

export const getStatus = (hass: HomeAssistant) =>
  hass.callWS<{ nodes: unknown[] }>({
    type: 'dmx_lighting/status/get',
  });

export const getEntityMap = (hass: HomeAssistant) =>
  hass.callWS<{ entities: Record<string, string> }>({
    type: 'dmx_lighting/entity_map/get',
  });

export const subscribeDmx = (
  hass: HomeAssistant,
  nodeKey: string,
  universe: number,
  callback: (frame: DmxFrame) => void
) =>
  hass.connection.subscribeMessage<DmxFrame>(callback, {
    type: 'dmx_lighting/dmx/subscribe',
    node_key: nodeKey,
    universe,
  });

/** Run an (unsaved) effect preset on the real fixtures; resolves to an unsubscribe that stops it. */
export const startEffectPreview = (
  hass: HomeAssistant,
  previewId: string,
  preset: unknown,
  level = 1
) =>
  hass.connection.subscribeMessage<unknown>(() => undefined, {
    type: 'dmx_lighting/effect/preview',
    preview_id: previewId,
    preset,
    level,
  });

export const updateEffectPreview = (
  hass: HomeAssistant,
  previewId: string,
  preset: unknown,
  level?: number
) =>
  hass.callWS<null>({
    type: 'dmx_lighting/effect/preview/update',
    preview_id: previewId,
    preset,
    ...(level === undefined ? {} : { level }),
  });

export const callService = (
  hass: HomeAssistant,
  domain: string,
  service: string,
  serviceData: Record<string, unknown>
) =>
  hass.callWS<unknown>({ type: 'call_service', domain, service, service_data: serviceData });
