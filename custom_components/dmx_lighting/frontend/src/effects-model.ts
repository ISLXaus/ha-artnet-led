/**
 * Effect presets and maths for the Effects tab.
 * Mirrors effects.py (keep the two in sync) so the on-screen preview matches what the
 * engine sends. Only sparkle differs: its random pattern is similar, not identical.
 */

export type EffectType =
  | 'sine' | 'ramp_up' | 'ramp_down' | 'triangle' | 'square' | 'chase' | 'sparkle'
  | 'rainbow' | 'color_chase' | 'color_wave';

export type Direction = 'forward' | 'reverse' | 'bounce';

export interface EffectParams {
  speed?: number;
  size?: number;
  base?: number;
  spread?: number;
  groups?: number;
  blocks?: number;
  wings?: number;
  duty?: number | null;
  crossfade?: number;
  fade_in?: number;
  fade_out?: number;
  seed?: number;
  direction?: Direction;
  shuffle?: boolean;
  colors?: number[][];
}

export interface EffectPreset {
  id: string;
  name: string;
  type: EffectType;
  /** Fixture names, in the order the effect flows. */
  fixtures: string[];
  params: EffectParams;
}

export interface EffectTypeInfo {
  type: EffectType;
  label: string;
  description: string;
  kind: 'intensity' | 'color';
}

export const EFFECT_TYPES: EffectTypeInfo[] = [
  { type: 'chase', label: 'Chase', kind: 'intensity', description: 'One fixture after another' },
  { type: 'sine', label: 'Wave', kind: 'intensity', description: 'Smooth rise and fall' },
  { type: 'ramp_up', label: 'Ramp up', kind: 'intensity', description: 'Fade up, then snap off' },
  { type: 'ramp_down', label: 'Ramp down', kind: 'intensity', description: 'Snap on, then fade down' },
  { type: 'triangle', label: 'Triangle', kind: 'intensity', description: 'Linear up and down' },
  { type: 'square', label: 'Pulse', kind: 'intensity', description: 'On / off blocks' },
  { type: 'sparkle', label: 'Sparkle', kind: 'intensity', description: 'Random flashes' },
  { type: 'rainbow', label: 'Rainbow', kind: 'color', description: 'Hue rotates through the spectrum' },
  { type: 'color_chase', label: 'Colour steps', kind: 'color', description: 'Steps through 2+ colours you pick' },
  { type: 'color_wave', label: 'Colour fade', kind: 'color', description: 'Fades smoothly through your colours' },
];

export const isColorType = (type: EffectType) =>
  EFFECT_TYPES.find((t) => t.type === type)?.kind === 'color';

/** Mirrors EFFECT_PARAMS in effects.py. */
export const PARAM_SPEC: Record<string, { default: number | null; min: number; max: number }> = {
  speed: { default: 30, min: 0.1, max: 600 },
  size: { default: 100, min: 0, max: 100 },
  base: { default: 0, min: 0, max: 100 },
  spread: { default: 360, min: 0, max: 3600 },
  groups: { default: 1, min: 1, max: 512 },
  blocks: { default: 1, min: 1, max: 512 },
  wings: { default: 1, min: 1, max: 512 },
  duty: { default: null, min: 1, max: 100 },
  crossfade: { default: 0, min: 0, max: 100 },
  fade_in: { default: 1, min: 0, max: 600 },
  fade_out: { default: 1, min: 0, max: 600 },
  seed: { default: 0, min: 0, max: 2 ** 31 - 1 },
};

export const DEFAULT_COLORS = [[255, 0, 0], [0, 255, 0], [0, 0, 255]];

/** Quick colour palettes for colour steps / colour fade. */
export const PALETTES: { name: string; colors: number[][] }[] = [
  { name: 'RGB', colors: [[255, 0, 0], [0, 255, 0], [0, 0, 255]] },
  { name: 'Warm', colors: [[255, 60, 0], [255, 150, 20], [255, 210, 120]] },
  { name: 'Ocean', colors: [[0, 40, 255], [0, 200, 255], [0, 255, 170]] },
  { name: 'Sunset', colors: [[255, 40, 90], [255, 120, 0], [150, 0, 255]] },
  { name: 'Party', colors: [[255, 0, 160], [0, 255, 255], [255, 230, 0], [120, 0, 255]] },
  { name: 'Police', colors: [[255, 0, 0], [0, 0, 255]] },
];

/** Which fixture layer an effect drives (mirrors effect_layer() in effect_engine.py). */
export const effectLayer = (type: EffectType): 'intensity' | 'color' =>
  isColorType(type) ? 'color' : 'intensity';

export function p(params: EffectParams, key: keyof EffectParams): number {
  const v = params[key] as number | null | undefined;
  return v == null ? (PARAM_SPEC[key as string]?.default as number) : v;
}

/** Mirrors effect_entity_slug() in validation.py: effects become light.fx_<slug>. */
export function effectEntityId(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return `light.fx_${slug}`;
}

// ---- ordering and positions (fixture_slots / order_fixtures) ------------------------

export interface Slot {
  position: number;
  count: number;
  index: number;
}

/** Mulberry32: small seeded PRNG for the preview's shuffle and sparkle. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Flow order: as selected, shuffled, then reversed. The shuffle order on screen can
 * differ from the engine's (different random generators); it is still a shuffle.
 */
export function orderFixtures(names: string[], params: EffectParams): string[] {
  const ordered = [...names];
  if (params.shuffle) {
    const r = rng(p(params, 'seed') + 1);
    for (let i = ordered.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
    }
  }
  if (params.direction === 'reverse') ordered.reverse();
  return ordered;
}

export function fixtureSlots(count: number, params: EffectParams): Slot[] {
  if (count <= 0) return [];
  const blocks = Math.max(1, Math.floor(p(params, 'blocks')));
  const groups = Math.max(1, Math.floor(p(params, 'groups')));
  const wings = Math.max(1, Math.floor(p(params, 'wings')));
  const steps = Math.ceil(count / blocks);
  const perGroup = Math.ceil(steps / groups);
  const perWing = Math.ceil(perGroup / wings);
  const slots: Slot[] = [];
  for (let i = 0; i < count; i++) {
    const step = Math.floor(i / blocks);
    const inGroup = step % perGroup;
    const wing = Math.floor(inGroup / perWing);
    let inWing = inGroup % perWing;
    if (wing % 2 === 1) inWing = perWing - 1 - inWing;
    slots.push({ position: inWing / perWing, count: perWing, index: inWing });
  }
  return slots;
}

const mod1 = (x: number) => ((x % 1) + 1) % 1;

export function fixturePhase(phase: number, slot: Slot, params: EffectParams): number {
  let position = slot.position;
  if (params.direction === 'bounce' && Math.floor(phase) % 2 === 1) {
    position = (slot.count - 1 - slot.index) / slot.count;
  }
  return mod1(phase - (position * p(params, 'spread')) / 360);
}

// ---- waveforms and colours ------------------------------------------------------------

function softSquare(x: number, duty: number, crossfade: number): number {
  if (x >= duty) return 0;
  const edge = (duty * crossfade) / 2;
  if (edge <= 0) return 1;
  if (x < edge) return x / edge;
  if (x > duty - edge) return (duty - x) / edge;
  return 1;
}

function hash01(...parts: number[]): number {
  let h = 2166136261;
  for (const part of parts) {
    h ^= Math.floor(part) + 0x9e3779b9;
    h = Math.imul(h, 16777619);
  }
  return rng(h)();
}

export function waveform(type: EffectType, x: number, params: EffectParams, slot: Slot, phase: number): number {
  const duty = params.duty;
  const crossfade = p(params, 'crossfade') / 100;
  switch (type) {
    case 'sine':
      return 0.5 - 0.5 * Math.cos(2 * Math.PI * x);
    case 'ramp_up':
      return x;
    case 'ramp_down':
      return 1 - x;
    case 'triangle':
      return 1 - Math.abs(2 * x - 1);
    case 'square':
      return softSquare(x, (duty ?? 50) / 100, crossfade);
    case 'chase':
      return softSquare(x, duty != null ? duty / 100 : 1 / Math.max(1, slot.count), crossfade);
    case 'sparkle': {
      const density = (duty ?? 30) / 100;
      const seed = p(params, 'seed');
      const shifted = phase + hash01(1, slot.index, seed);
      const cycle = Math.floor(shifted);
      if (hash01(2, slot.index, cycle, seed) >= density) return 0;
      const frac = shifted - cycle;
      return frac < 0.25 ? 1 - frac / 0.25 : 0;
    }
    default:
      return 0;
  }
}

function hsvToRgb(h: number): [number, number, number] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const q = 1 - f;
  const [r, g, b] = [
    [1, f, 0], [q, 1, 0], [0, 1, f], [0, q, 1], [f, 0, 1], [1, 0, q],
  ][((i % 6) + 6) % 6];
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const lerp = (a: number[], b: number[], t: number) =>
  [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t)) as [number, number, number];

export function colorAt(type: EffectType, x: number, params: EffectParams): [number, number, number] {
  const colors = params.colors?.length ? params.colors : DEFAULT_COLORS;
  if (type === 'rainbow') return hsvToRgb(mod1(x));
  if (type === 'color_chase') {
    const k = colors.length;
    const scaled = x * k;
    const index = Math.floor(scaled) % k;
    const frac = scaled - Math.floor(scaled);
    const cf = p(params, 'crossfade') / 100;
    if (cf > 0 && frac > 1 - cf) return lerp(colors[index], colors[(index + 1) % k], (frac - (1 - cf)) / cf);
    return colors[index] as [number, number, number];
  }
  // color_wave: smoothly through every colour in turn and back to the first.
  const list = colors.length < 2 ? [colors[0], [0, 0, 0]] : colors;
  const k = list.length;
  const scaled = x * k;
  const index = Math.floor(scaled) % k;
  const frac = scaled - Math.floor(scaled);
  return lerp(list[index], list[(index + 1) % k], 0.5 - 0.5 * Math.cos(Math.PI * frac));
}

export interface Frame {
  level: number;
  rgb: [number, number, number] | null;
}

/** One frame for `count` fixtures in flow order (mirrors compute_frame). */
export function computeFrame(type: EffectType, params: EffectParams, count: number, phase: number): Frame[] {
  const size = p(params, 'size') / 100;
  const base = p(params, 'base') / 100;
  return fixtureSlots(count, params).map((slot) => {
    const x = fixturePhase(phase, slot, params);
    if (isColorType(type)) return { level: 1, rgb: colorAt(type, x, params) };
    const v = base + size * waveform(type, x, params, slot, phase);
    return { level: Math.min(1, Math.max(0, v)), rgb: null };
  });
}

export function newEffect(name: string): EffectPreset {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2),
    name,
    type: 'chase',
    fixtures: [],
    params: { speed: 60, fade_in: 1, fade_out: 1 },
  };
}
