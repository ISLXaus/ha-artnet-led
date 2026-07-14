import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  PatchDevice,
  PatchNode,
  DEVICE_TYPES,
  NODE_TYPES,
  CHANNEL_SIZES,
  CORRECTIONS,
  footprint,
  minUniverse,
  uuid,
} from './model';

const sharedDialogStyles = css`
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .dialog {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    border-radius: 12px;
    padding: 20px 24px;
    width: min(440px, calc(100vw - 32px));
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
  h3 {
    margin: 0 0 16px;
    font-size: 1.15rem;
  }
  label {
    display: block;
    font-size: 0.8rem;
    color: var(--secondary-text-color, #727272);
    margin: 12px 0 4px;
  }
  input,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--secondary-background-color, #fafafa);
    color: var(--primary-text-color, #212121);
    font: inherit;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 20px;
  }
  .actions .spacer {
    flex: 1;
  }
  button {
    font: inherit;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: var(--secondary-background-color, #f0f0f0);
    color: var(--primary-text-color, #212121);
  }
  button.primary {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }
  button.danger {
    background: var(--error-color, #db4437);
    color: #fff;
  }
  .error {
    color: var(--error-color, #db4437);
    font-size: 0.85rem;
    margin-top: 8px;
  }
  .hint {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    margin-top: 4px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 14px;
    background: var(--secondary-background-color, #f0f0f0);
    font-size: 0.85rem;
  }
  .chip.invalid {
    background: color-mix(in srgb, var(--error-color, #db4437) 20%, transparent);
    outline: 1px solid var(--error-color, #db4437);
  }
  .chip small {
    color: var(--secondary-text-color, #727272);
  }
  .chip-x {
    padding: 0 2px;
    background: none;
    border: none;
    font-size: 0.95rem;
    line-height: 1;
    cursor: pointer;
    color: var(--secondary-text-color, #727272);
  }
  .chip-x:hover {
    color: var(--error-color, #db4437);
  }
`;

/** Add/edit one fixture. Fires 'save-device' {device, original} or 'delete-device' {device}. */
@customElement('artnet-device-dialog')
export class ArtnetDeviceDialog extends LitElement {
  /** Device being edited, or a template for a new one. */
  @property({ attribute: false }) device!: PatchDevice;
  @property({ type: Boolean }) isNew = false;
  @property() errorText = '';

  @state() private _working!: PatchDevice;
  @state() private _count = 1;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('device')) {
      this._working = { ...this.device };
      this._count = 1;
    }
  }

  private _set<K extends keyof PatchDevice>(key: K, value: PatchDevice[K]) {
    this._working = { ...this._working, [key]: value };
  }

  render() {
    const d = this._working;
    const [first, last] = footprint(d);
    const showTemp = d.type === 'color_temp' || d.type === 'rgbww';

    return html`
      <div class="backdrop" @click=${this._backdropClick}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${this.isNew ? 'Add fixture' : `Edit ${this.device.name}`}</h3>

          <label>Name (entity id becomes light.&lt;slug&gt;)</label>
          <input
            .value=${d.name ?? ''}
            @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value)}
          />

          ${this.isNew
            ? html`
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="512"
                  .value=${String(this._count)}
                  @input=${(e: Event) =>
                    (this._count = Math.max(1, Number((e.target as HTMLInputElement).value) || 1))}
                />
                ${this._count > 1
                  ? html`<div class="hint">
                      Adds ${this._count} fixtures back-to-back, named
                      ${d.name || 'name'}_1 … ${d.name || 'name'}_${this._count}
                    </div>`
                  : nothing}
              `
            : nothing}

          <label>Friendly name (optional)</label>
          <input
            .value=${d.friendly_name ?? ''}
            @input=${(e: Event) =>
              this._set('friendly_name', (e.target as HTMLInputElement).value || undefined)}
          />

          <div class="row">
            <div>
              <label>Type</label>
              <select
                .value=${d.type}
                @change=${(e: Event) => this._set('type', (e.target as HTMLSelectElement).value)}
              >
                ${DEVICE_TYPES.map((t) => html`<option value=${t} ?selected=${d.type === t}>${t}</option>`)}
              </select>
            </div>
            <div>
              <label>DMX channel (1-512)</label>
              <input
                type="number"
                min="1"
                max="512"
                .value=${String(d.channel)}
                @input=${(e: Event) =>
                  this._set('channel', Number((e.target as HTMLInputElement).value))}
              />
            </div>
          </div>
          <div class="hint">Occupies channels ${first}–${last}</div>

          <div class="row">
            <div>
              <label>Channel size</label>
              <select
                .value=${d.channel_size ?? '8bit'}
                @change=${(e: Event) =>
                  this._set('channel_size', (e.target as HTMLSelectElement).value)}
              >
                ${CHANNEL_SIZES.map(
                  (s) => html`<option value=${s} ?selected=${(d.channel_size ?? '8bit') === s}>${s}</option>`
                )}
              </select>
            </div>
            <div>
              <label>Byte order</label>
              <select
                .value=${d.byte_order ?? 'big'}
                @change=${(e: Event) =>
                  this._set('byte_order', (e.target as HTMLSelectElement).value)}
              >
                <option value="big" ?selected=${(d.byte_order ?? 'big') === 'big'}>big</option>
                <option value="little" ?selected=${d.byte_order === 'little'}>little</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div>
              <label>Transition (s)</label>
              <input
                type="number"
                min="0"
                max="999"
                step="0.1"
                .value=${String(d.transition ?? 0)}
                @input=${(e: Event) =>
                  this._set('transition', Number((e.target as HTMLInputElement).value))}
              />
            </div>
            <div>
              <label>Output correction</label>
              <select
                @change=${(e: Event) => {
                  const v = (e.target as HTMLSelectElement).value;
                  this._set('output_correction', v === '' ? null : v);
                }}
              >
                <option value="" ?selected=${!d.output_correction}>universe default</option>
                ${CORRECTIONS.map(
                  (c) =>
                    html`<option value=${c} ?selected=${d.output_correction === c}>${c}</option>`
                )}
              </select>
            </div>
          </div>

          <label>Channel setup (optional, e.g. rgbw / dCH)</label>
          <input
            .value=${typeof d.channel_setup === 'string' ? d.channel_setup : ''}
            placeholder="type default"
            @input=${(e: Event) =>
              this._set('channel_setup', (e.target as HTMLInputElement).value || null)}
          />

          ${showTemp
            ? html`
                <div class="row">
                  <div>
                    <label>Min temp</label>
                    <input
                      .value=${d.min_temp ?? '2700K'}
                      @input=${(e: Event) =>
                        this._set('min_temp', (e.target as HTMLInputElement).value)}
                    />
                  </div>
                  <div>
                    <label>Max temp</label>
                    <input
                      .value=${d.max_temp ?? '6500K'}
                      @input=${(e: Event) =>
                        this._set('max_temp', (e.target as HTMLInputElement).value)}
                    />
                  </div>
                </div>
              `
            : nothing}

          ${this.errorText ? html`<div class="error">${this.errorText}</div>` : nothing}

          <div class="actions">
            ${!this.isNew
              ? html`<button class="danger" @click=${this._delete}>Delete</button>`
              : nothing}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew ? 'Add' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _backdropClick() {
    this._cancel();
  }

  private _cancel() {
    this.dispatchEvent(new CustomEvent('panel-dialog-closed', { bubbles: true, composed: true }));
  }

  private _save() {
    if (!this._working.name?.trim()) {
      this.errorText = 'Name is required';
      return;
    }
    this.dispatchEvent(
      new CustomEvent('save-device', {
        detail: {
          device: this._working,
          original: this.device,
          count: this.isNew ? this._count : 1,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _delete() {
    this.dispatchEvent(
      new CustomEvent('delete-device', {
        detail: { device: this.device },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = sharedDialogStyles;
}

/** Add/edit a node. Fires 'save-node' {node, original} or 'delete-node' {node}. */
@customElement('artnet-node-dialog')
export class ArtnetNodeDialog extends LitElement {
  @property({ attribute: false }) node!: PatchNode;
  @property({ type: Boolean }) isNew = false;
  @property() errorText = '';

  @state() private _working!: PatchNode;
  @state() private _newUniverse = '';

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('node')) {
      this._working = { ...this.node, universes: { ...this.node.universes } };
      this._newUniverse = '';
    }
  }

  private _set<K extends keyof PatchNode>(key: K, value: PatchNode[K]) {
    this._working = { ...this._working, [key]: value };
  }

  private _addUniverse() {
    const nr = Number(this._newUniverse);
    const min = minUniverse(this._working.node_type);
    if (this._newUniverse === '' || !Number.isInteger(nr) || nr < min || nr > 1024) {
      this.errorText = `Universe must be a whole number between ${min} and 1024`;
      return;
    }
    if (this._working.universes[String(nr)]) {
      this.errorText = `Universe ${nr} already exists`;
      return;
    }
    this.errorText = '';
    this._working = {
      ...this._working,
      universes: {
        ...this._working.universes,
        [String(nr)]: { send_partial_universe: true, output_correction: 'linear', devices: [] },
      },
    };
    this._newUniverse = '';
  }

  private _removeUniverse(nr: string) {
    if (this._working.universes[nr]?.devices?.length) return; // only empty ones here
    const universes = { ...this._working.universes };
    delete universes[nr];
    this._working = { ...this._working, universes };
  }

  render() {
    const n = this._working;
    return html`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${this.isNew ? 'Add node' : `Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${(e: Event) => this._set('node_type', (e.target as HTMLSelectElement).value)}
          >
            ${NODE_TYPES.map(
              (t) => html`<option value=${t} ?selected=${n.node_type === t}>${t}</option>`
            )}
          </select>
          ${n.node_type === 'artnet-controller'
            ? html`<div class="hint">
                Controller mode discovers nodes and accepts DMX input. Only one controller can
                exist (it binds UDP 6454).
              </div>`
            : nothing}

          <label>Host (IP of the Art-Net node)</label>
          <input
            .value=${n.host ?? ''}
            @input=${(e: Event) => this._set('host', (e.target as HTMLInputElement).value)}
          />

          <div class="row">
            <div>
              <label>Port (blank = protocol default)</label>
              <input
                type="number"
                min="1"
                max="65535"
                .value=${n.port != null ? String(n.port) : ''}
                @input=${(e: Event) => {
                  const v = (e.target as HTMLInputElement).value;
                  this._set('port', v === '' ? null : Number(v));
                }}
              />
            </div>
            <div>
              <label>Max FPS (1-50)</label>
              <input
                type="number"
                min="1"
                max="50"
                .value=${String(n.max_fps ?? 25)}
                @input=${(e: Event) =>
                  this._set('max_fps', Number((e.target as HTMLInputElement).value))}
              />
            </div>
          </div>

          <div class="row">
            <div>
              <label>Refresh every (s, 0 = off)</label>
              <input
                type="number"
                min="0"
                max="9999"
                .value=${String(n.refresh_every ?? 120)}
                @input=${(e: Event) =>
                  this._set('refresh_every', Number((e.target as HTMLInputElement).value))}
              />
            </div>
            <div>
              <label>Host override (optional)</label>
              <input
                .value=${n.host_override ?? ''}
                @input=${(e: Event) =>
                  this._set('host_override', (e.target as HTMLInputElement).value || undefined)}
              />
            </div>
          </div>

          ${n.node_type === 'sacn'
            ? html`
                <label>sACN priority (0-200, default 100)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  .value=${String(n.priority ?? 100)}
                  @input=${(e: Event) =>
                    this._set('priority', Number((e.target as HTMLInputElement).value))}
                />
                <div class="hint">
                  Receivers merge sources by priority; higher wins. Note: sACN universes
                  start at 1, not 0.
                </div>

                <label style="display:flex;align-items:center;gap:8px;font-size:0.9rem;color:var(--primary-text-color)">
                  <input
                    type="checkbox"
                    style="width:auto"
                    .checked=${n.multicast ?? false}
                    @change=${(e: Event) =>
                      this._set('multicast', (e.target as HTMLInputElement).checked)}
                  />
                  Multicast (standard sACN)
                </label>
                <div class="hint">
                  Sends each universe to its 239.255.x.x multicast group, which is what
                  most receivers and sACN viewer apps listen to. When enabled, Host is
                  only a display name and Port is ignored. Unchecked = unicast directly
                  to the host.
                </div>
              `
            : nothing}

          <label>Universes</label>
          <div class="chips">
            ${Object.keys(n.universes)
              .sort((a, b) => Number(a) - Number(b))
              .map((nr) => {
                const count = n.universes[nr]?.devices?.length ?? 0;
                const invalid = Number(nr) < minUniverse(n.node_type);
                return html`
                  <span class="chip ${invalid ? 'invalid' : ''}"
                    title=${invalid
                      ? `Universe ${nr} is not allowed for ${n.node_type} — renumber it from the universe bar`
                      : count
                        ? `${count} fixture(s) — remove them first to delete this universe`
                        : `Universe ${nr}`}
                  >
                    ${nr}${count ? html` <small>(${count})</small>` : nothing}
                    ${!count
                      ? html`<button class="chip-x" @click=${() => this._removeUniverse(nr)}>
                          ×
                        </button>`
                      : nothing}
                  </span>
                `;
              })}
          </div>
          <div class="row">
            <input
              type="number"
              min=${minUniverse(n.node_type)}
              max="1024"
              placeholder="Universe number (${minUniverse(n.node_type)}-1024)"
              .value=${this._newUniverse}
              @input=${(e: Event) => (this._newUniverse = (e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._addUniverse()}
            />
            <button @click=${this._addUniverse}>Add universe</button>
          </div>

          ${this.errorText ? html`<div class="error">${this.errorText}</div>` : nothing}

          <div class="actions">
            ${!this.isNew
              ? html`<button class="danger" @click=${this._delete}>Delete node</button>`
              : nothing}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew ? 'Add' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _cancel() {
    this.dispatchEvent(new CustomEvent('panel-dialog-closed', { bubbles: true, composed: true }));
  }

  private _save() {
    if (!this._working.host?.trim()) {
      this.errorText = 'Host is required';
      return;
    }
    const port = this._working.port;
    if (port != null && (!Number.isInteger(port) || port < 1 || port > 65535)) {
      this.errorText =
        'Port must be a whole number between 1 and 65535 — leave it blank to use the protocol default';
      return;
    }
    const min = minUniverse(this._working.node_type);
    const bad = Object.keys(this._working.universes).filter((nr) => Number(nr) < min);
    if (bad.length) {
      this.errorText =
        `Universe ${bad.join(', ')} is not allowed for ${this._working.node_type} ` +
        `(minimum is ${min}). Renumber it from the universe bar or remove it.`;
      return;
    }
    this.dispatchEvent(
      new CustomEvent('save-node', {
        detail: { node: this._working, original: this.node },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _delete() {
    this.dispatchEvent(
      new CustomEvent('delete-node', {
        detail: { node: this.node },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = sharedDialogStyles;
}

/**
 * Add or renumber a universe. Fires 'save-universe' {nr} (validated here against
 * the node's allowed range and existing universes).
 */
@customElement('artnet-universe-dialog')
export class ArtnetUniverseDialog extends LitElement {
  @property() mode: 'add' | 'renumber' = 'add';
  @property({ type: Number }) minUniverse = 0;
  /** Universe being renumbered (renumber mode). */
  @property() current = '';
  /** Universe numbers already present on the node. */
  @property({ attribute: false }) existing: string[] = [];

  @state() private _value = '';
  @state() private _error = '';

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('current') || changed.has('mode')) {
      this._value = this.mode === 'renumber' ? this.current : String(this.minUniverse);
      this._error = '';
    }
  }

  render() {
    return html`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <h3>
            ${this.mode === 'add' ? 'Add universe' : `Renumber universe ${this.current}`}
          </h3>

          <label>Universe number (${this.minUniverse}-1024)</label>
          <input
            type="number"
            min=${this.minUniverse}
            max="1024"
            .value=${this._value}
            @input=${(e: Event) => (this._value = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._save()}
          />

          ${this._error ? html`<div class="error">${this._error}</div>` : nothing}

          <div class="actions">
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.mode === 'add' ? 'Add' : 'Renumber'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _cancel() {
    this.dispatchEvent(new CustomEvent('panel-dialog-closed', { bubbles: true, composed: true }));
  }

  private _save() {
    const nr = Number(this._value);
    if (!Number.isInteger(nr) || nr < this.minUniverse || nr > 1024) {
      this._error = `Universe must be a whole number between ${this.minUniverse} and 1024`;
      return;
    }
    const key = String(nr);
    if (key !== this.current && this.existing.includes(key)) {
      this._error = `Universe ${key} already exists on this node`;
      return;
    }
    this.dispatchEvent(
      new CustomEvent('save-universe', { detail: { nr: key }, bubbles: true, composed: true })
    );
  }

  static styles = sharedDialogStyles;
}

export function newDevice(channel: number): PatchDevice {
  return {
    id: uuid(),
    channel,
    name: '',
    type: 'dimmer',
    transition: 0,
    channel_size: '8bit',
    byte_order: 'big',
    output_correction: null,
    channel_setup: null,
  };
}

export function newNode(): PatchNode {
  return {
    id: uuid(),
    node_type: 'artnet-direct',
    host: '',
    port: null,
    max_fps: 25,
    refresh_every: 120,
    priority: 100,
    // Universe 1 is valid for every protocol (sACN forbids universe 0).
    universes: { '1': { send_partial_universe: true, output_correction: 'linear', devices: [] } },
  };
}
