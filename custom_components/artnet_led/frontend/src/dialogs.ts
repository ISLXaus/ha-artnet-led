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
`;

/** Add/edit one fixture. Fires 'save-device' {device, original} or 'delete-device' {device}. */
@customElement('artnet-device-dialog')
export class ArtnetDeviceDialog extends LitElement {
  /** Device being edited, or a template for a new one. */
  @property({ attribute: false }) device!: PatchDevice;
  @property({ type: Boolean }) isNew = false;
  @property() errorText = '';

  @state() private _working!: PatchDevice;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('device')) {
      this._working = { ...this.device };
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
    this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true, composed: true }));
  }

  private _save() {
    if (!this._working.name?.trim()) {
      this.errorText = 'Name is required';
      return;
    }
    this.dispatchEvent(
      new CustomEvent('save-device', {
        detail: { device: this._working, original: this.device },
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

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('node')) {
      this._working = { ...this.node };
    }
  }

  private _set<K extends keyof PatchNode>(key: K, value: PatchNode[K]) {
    this._working = { ...this._working, [key]: value };
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
    this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true, composed: true }));
  }

  private _save() {
    if (!this._working.host?.trim()) {
      this.errorText = 'Host is required';
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
    universes: { '0': { send_partial_universe: true, output_correction: 'linear', devices: [] } },
  };
}
