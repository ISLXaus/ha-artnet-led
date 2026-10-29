/** Shared types + patch math. Mirrors validation.py — keep the two in sync. */

export interface PatchDevice {
  id: string;
  channel: number;
  name: string;
  friendly_name?: string;
  type: string;
  transition?: number;
  channel_size?: string;
  byte_order?: string;
  output_correction?: string | null;
  /**
   * Channel layout: function letters ("rgbw") or a list mixing letters and
   * dummy channels — whole numbers 0-255 that are always output as-is.
   */
  channel_setup?: string | ChannelEntry[] | null;
  /** Panel-only labels aligned with channel_setup (e.g. "Mode" for a dummy channel). */
  channel_labels?: (string | null)[] | null;
  min_temp?: string;
  max_temp?: string;
}

/** One channel_setup entry: a function letter, or a fixed value for a dummy channel. */
export type ChannelEntry = string | number;

export interface PatchUniverse {
  send_partial_universe?: boolean;
  output_correction?: string;
  devices: PatchDevice[];
}

export interface PatchNode {
  id: string;
  node_type: string;
  host: string;
  port?: number | null;
  host_override?: string;
  port_override?: number | null;
  max_fps?: number;
  refresh_every?: number;
  /** sACN E1.31 priority (0-200, default 100). Only used by sacn nodes. */
  priority?: number;
  /** sACN: send each universe to its 239.255.x.x multicast group instead of unicast. */
  multicast?: boolean;
  universes: Record<string, PatchUniverse>;
}

export interface PatchDoc {
  nodes: PatchNode[];
}

export interface PatchError {
  path: string;
  code: string;
  message: string;
}

export interface HomeAssistant {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(
      callback: (result: T) => void,
      msg: Record<string, unknown>
    ): Promise<() => Promise<void>>;
  };
}

export const DEVICE_TYPES = [
  'dimmer',
  'rgb',
  'rgbw',
  'rgbww',
  'color_temp',
  'xy',
  'binary',
  'fixed',
];

export const NODE_TYPES = ['artnet-direct', 'sacn', 'kinet'];
export const CHANNEL_SIZES = ['8bit', '16bit', '24bit', '32bit'];
export const CORRECTIONS = ['linear', 'quadratic', 'cubic', 'quadruple'];

/** Mirrors DEFAULT_CHANNEL_SETUP in validation.py. */
const DEFAULT_SETUP: Record<string, string | ChannelEntry[] | null> = {
  fixed: [255],
  binary: null,
  dimmer: null,
  color_temp: 'ch',
  rgb: 'rgb',
  rgbw: 'rgbw',
  rgbww: 'rgbch',
  xy: 'dxy',
};

const BYTE_SIZE: Record<string, number> = {
  '8bit': 1,
  '16bit': 2,
  '24bit': 3,
  '32bit': 4,
};

/** Mirrors allowed_chars_per_type in util/channel_switch.py. */
export const ALLOWED_FUNCTIONS: Record<string, string> = {
  fixed: '',
  binary: '',
  dimmer: 'd',
  color_temp: 'dcChHtT',
  rgb: 'drRgGbBuUwW',
  rgbw: 'drRgGbBuUwW',
  rgbww: 'dcChHtTrRgGbBuU',
  xy: 'dxy',
};

/** Human names for channel_setup letters (see README "channel_setup"). */
export const FUNCTION_NAMES: Record<string, string> = {
  d: 'Dimmer',
  r: 'Red',
  R: 'Red (unscaled)',
  g: 'Green',
  G: 'Green (unscaled)',
  b: 'Blue',
  B: 'Blue (unscaled)',
  w: 'White',
  W: 'White (unscaled)',
  c: 'Cool white',
  C: 'Cool white (unscaled)',
  h: 'Warm white',
  H: 'Warm white (unscaled)',
  t: 'Color temp (0 = warm)',
  T: 'Color temp (0 = cold)',
  u: 'Hue',
  U: 'Saturation',
  x: 'X (CIE)',
  y: 'Y (CIE)',
};

/** Mirrors MAX_LABEL_LENGTH in validation.py. */
export const MAX_LABEL_LENGTH = 32;

export function isFixedValue(entry: ChannelEntry): entry is number {
  return typeof entry === 'number';
}

/** True if the device has its own channel layout rather than the type default. */
export function hasCustomSetup(device: PatchDevice): boolean {
  return !!device.channel_setup && device.channel_setup.length > 0;
}

/** The effective channel layout: the custom one, or the type default. */
export function setupEntries(device: PatchDevice): ChannelEntry[] {
  if (device.type === 'binary') return ['d'];
  const setup = hasCustomSetup(device) ? device.channel_setup : DEFAULT_SETUP[device.type];
  return setup ? Array.from(setup as string | ChannelEntry[]) : ['d'];
}

/** Display info for the logical channel at `index` (0-based) of a device. */
export function channelRole(
  device: PatchDevice,
  index: number
): { text: string; dummy: boolean; value?: number } {
  const entry = setupEntries(device)[index];
  const label = device.channel_labels?.[index] || '';
  if (entry === undefined) return { text: '', dummy: false };
  if (isFixedValue(entry)) return { text: label || 'Fixed', dummy: true, value: entry };
  return { text: label || FUNCTION_NAMES[entry] || entry, dummy: false };
}

/** Mirrors compute_channel_width() in validation.py. */
export function channelWidth(device: PatchDevice): number {
  if (device.type === 'binary') return 1;
  const setup = hasCustomSetup(device) ? device.channel_setup : DEFAULT_SETUP[device.type];
  return setup ? setup.length : 1;
}

export function byteSize(device: PatchDevice): number {
  return BYTE_SIZE[device.channel_size ?? '8bit'] ?? 1;
}

/** Inclusive [first, last] DMX channels occupied by a device. */
export function footprint(device: PatchDevice): [number, number] {
  const width = channelWidth(device);
  const first = device.channel;
  return [first, first + width * byteSize(device) - 1];
}

/** Lowest allowed universe number. Mirrors validation.py: E1.31 forbids universe 0. */
export function minUniverse(nodeType: string): number {
  return nodeType === 'sacn' ? 1 : 0;
}

/** Mirrors node_key() in runtime.py. */
export function nodeKey(node: { node_type: string; host: string; port?: number | null }): string {
  return `${node.node_type}:${node.host}:${node.port ?? 'default'}`;
}

export function uuid(): string {
  return crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2);
}

/** Stable per-device accent color, spread around the hue wheel. */
export function deviceColor(index: number): string {
  const hue = (index * 137.5) % 360;
  return `hsl(${hue}, 45%, 45%)`;
}

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
