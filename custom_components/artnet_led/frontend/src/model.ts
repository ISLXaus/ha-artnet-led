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
  channel_setup?: string | number[] | null;
  min_temp?: string;
  max_temp?: string;
}

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
  universes: Record<string, PatchUniverse>;
}

export interface PatchDoc {
  nodes: PatchNode[];
}

export interface YamlNodeSnapshot {
  key: string;
  owner: string;
  node_type: string;
  host: string;
  port: number | null;
  universes: Record<string, PatchUniverse>;
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

export const NODE_TYPES = ['artnet-direct', 'artnet-controller', 'sacn', 'kinet'];
export const CHANNEL_SIZES = ['8bit', '16bit', '24bit', '32bit'];
export const CORRECTIONS = ['linear', 'quadratic', 'cubic', 'quadruple'];

/** Mirrors DEFAULT_CHANNEL_SETUP in validation.py. */
const DEFAULT_SETUP: Record<string, string | number[] | null> = {
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

export function channelWidth(device: PatchDevice): number {
  if (device.type === 'binary' || device.type === 'dimmer') return 1;
  const setup =
    (device.channel_setup && (device.channel_setup as string | number[]).length
      ? device.channel_setup
      : null) ?? DEFAULT_SETUP[device.type];
  return setup ? setup.length : 1;
}

/** Inclusive [first, last] DMX channels occupied by a device. */
export function footprint(device: PatchDevice): [number, number] {
  const width = channelWidth(device);
  const byteSize = BYTE_SIZE[device.channel_size ?? '8bit'] ?? 1;
  const first = device.channel;
  return [first, first + width * byteSize - 1];
}

/** Lowest allowed universe number. Mirrors validation.py: E1.31 forbids universe 0. */
export function minUniverse(nodeType: string): number {
  return nodeType === 'sacn' ? 1 : 0;
}

/** Mirrors node_key() in runtime.py. */
export function nodeKey(node: { node_type: string; host: string; port?: number | null }): string {
  if (node.node_type === 'artnet-controller') return 'artnet-controller';
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
