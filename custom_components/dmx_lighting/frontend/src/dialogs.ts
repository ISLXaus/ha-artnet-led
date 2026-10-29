import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  PatchDevice,
  PatchNode,
  DEVICE_TYPES,
  NODE_TYPES,
  CHANNEL_SIZES,
  CORRECTIONS,
  ALLOWED_FUNCTIONS,
  FUNCTION_NAMES,
  MAX_LABEL_LENGTH,
  ChannelEntry,
  byteSize,
  footprint,
  hasCustomSetup,
  isFixedValue,
  minUniverse,
  setupEntries,
  uuid,
} from './model';

/** One row of the custom channel editor. fn is a function letter, or FIXED for a dummy channel. */
interface ChannelRow {
  fn: string;
  value: number;
  label: string;
}

const FIXED = '#fixed';

function rowsFromDevice(device: PatchDevice): ChannelRow[] {
  return setupEntries(device).map((entry, i) => ({
    fn: isFixedValue(entry) ? FIXED : entry,
    value: isFixedValue(entry) ? entry : 0,
    label: device.channel_labels?.[i] ?? '',
  }));
}

/** Problem with a row for the given type, or '' if it is fine. Mirrors channel_setup_errors(). */
function rowProblem(row: ChannelRow, type: string): string {
  if (row.fn === FIXED) {
    if (!Number.isInteger(row.value) || row.value < 0 || row.value > 255) return 'Value must be 0–255';
    return '';
  }
  if (!ALLOWED_FUNCTIONS[type]?.includes(row.fn)) return `Not available for ${type}`;
  return '';
}

/**
 * channel_setup + channel_labels for a set of rows. Uses the compact string form
 * ("drgb") when there are no dummy channels or labels, so plain layouts stay
 * YAML-compatible and readable.
 */
function rowsToSetup(rows: ChannelRow[]): Pick<PatchDevice, 'channel_setup' | 'channel_labels'> {
  if (!rows.length) return { channel_setup: null, channel_labels: null };
  const setup: ChannelEntry[] = rows.map((r) => (r.fn === FIXED ? r.value : r.fn));
  const labels: (string | null)[] = rows.map((r) => (r.fn === FIXED && r.label.trim() ? r.label.trim() : null));
  while (labels.length && labels[labels.length - 1] === null) labels.pop();
  const hasFixed = setup.some((e) => isFixedValue(e));
  return {
    channel_setup: hasFixed ? setup : (setup as string[]).join(''),
    channel_labels: labels.length ? labels : null,
  };
}

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
@customElement('dmx-device-dialog')
export class DmxDeviceDialog extends LitElement {
  /** Device being edited, or a template for a new one. */
  @property({ attribute: false }) device!: PatchDevice;
  @property({ type: Boolean }) isNew = false;
  @property() errorText = '';

  @state() private _working!: PatchDevice;
  @state() private _count = 1;
  /** Custom channel layout being edited, or null for the type's default layout. */
  @state() private _rows: ChannelRow[] | null = null;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('device')) {
      this._working = { ...this.device };
      this._count = 1;
      this._rows = hasCustomSetup(this.device) ? rowsFromDevice(this.device) : null;
    }
  }

  private _set<K extends keyof PatchDevice>(key: K, value: PatchDevice[K]) {
    this._working = { ...this._working, [key]: value };
  }

  private _setRows(rows: ChannelRow[] | null) {
    this._rows = rows;
    this._working = {
      ...this._working,
      ...(rows ? rowsToSetup(rows) : { channel_setup: null, channel_labels: null }),
    };
  }

  private _setType(type: string) {
    this._set('type', type);
    // Binary fixtures are a single on/off channel; they have no channel layout.
    if (type === 'binary' && this._rows) this._setRows(null);
  }

  private _toggleCustom(on: boolean) {
    if (!on) {
      this._setRows(null);
      return;
    }
    // Start from the type's default layout so the user only adds what differs.
    const base = rowsFromDevice({ ...this._working, channel_setup: null, channel_labels: null });
    this._setRows(base);
  }

  private _updateRow(index: number, patch: Partial<ChannelRow>) {
    const rows = [...(this._rows ?? [])];
    rows[index] = { ...rows[index], ...patch };
    this._setRows(rows);
  }

  private _addRow(fixed: boolean) {
    const allowed = ALLOWED_FUNCTIONS[this._working.type] ?? '';
    const row: ChannelRow =
      fixed || !allowed
        ? { fn: FIXED, value: 0, label: '' }
        : { fn: allowed[0], value: 0, label: '' };
    this._setRows([...(this._rows ?? []), row]);
  }

  private _moveRow(index: number, delta: number) {
    const rows = [...(this._rows ?? [])];
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    [rows[index], rows[target]] = [rows[target], rows[index]];
    this._setRows(rows);
  }

  private _removeRow(index: number) {
    const rows = (this._rows ?? []).filter((_, i) => i !== index);
    this._setRows(rows);
  }

  private _renderChannels() {
    const d = this._working;
    if (d.type === 'binary') return nothing;
    const rows = this._rows;
    const allowed = ALLOWED_FUNCTIONS[d.type] ?? '';
    return html`
      <label class="check">
        <input
          type="checkbox"
          .checked=${!!rows}
          @change=${(e: Event) => this._toggleCustom((e.target as HTMLInputElement).checked)}
        />
        Custom channel layout
      </label>
      <div class="hint">
        ${rows
          ? 'Light channels follow the entity; dummy channels always send their fixed value (use them for mode, strobe or macro channels).'
          : `Uses the ${d.type} default. Turn on to reorder channels or add dummy channels such as Mode or Strobe.`}
      </div>
      ${rows
        ? html`
            <div class="channels">
              ${rows.map((row, i) => {
                const problem = rowProblem(row, d.type);
                const dummy = row.fn === FIXED;
                return html`
                  <div class="ch-row ${problem ? 'invalid' : ''}" title=${problem}>
                    <span class="ch-nr">${d.channel + i * byteSize(d)}</span>
                    <select
                      aria-label="Channel ${i + 1} function"
                      @change=${(e: Event) =>
                        this._updateRow(i, { fn: (e.target as HTMLSelectElement).value })}
                    >
                      ${[...allowed].map(
                        (fn) =>
                          html`<option value=${fn} ?selected=${row.fn === fn}>
                            ${FUNCTION_NAMES[fn] ?? fn}
                          </option>`
                      )}
                      ${!dummy && !allowed.includes(row.fn)
                        ? html`<option value=${row.fn} selected>${FUNCTION_NAMES[row.fn] ?? row.fn}</option>`
                        : nothing}
                      <option value=${FIXED} ?selected=${dummy}>Dummy (fixed value)</option>
                    </select>
                    ${dummy
                      ? html`
                          <input
                            class="ch-label"
                            placeholder="Label, e.g. Mode"
                            maxlength=${MAX_LABEL_LENGTH}
                            aria-label="Channel ${i + 1} label"
                            .value=${row.label}
                            @input=${(e: Event) =>
                              this._updateRow(i, { label: (e.target as HTMLInputElement).value })}
                          />
                          <input
                            class="ch-value"
                            type="number"
                            min="0"
                            max="255"
                            step="1"
                            aria-label="Channel ${i + 1} value"
                            .value=${String(row.value)}
                            @input=${(e: Event) =>
                              this._updateRow(i, {
                                value: Number((e.target as HTMLInputElement).value),
                              })}
                          />
                        `
                      : html`<span class="ch-fill">follows light</span>`}
                    <span class="ch-tools">
                      <button class="icon" title="Move up" ?disabled=${i === 0}
                        @click=${() => this._moveRow(i, -1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${i === rows.length - 1}
                        @click=${() => this._moveRow(i, 1)}>↓</button>
                      <button class="icon" title="Remove channel" ?disabled=${rows.length === 1}
                        @click=${() => this._removeRow(i)}>✕</button>
                    </span>
                    ${problem ? html`<span class="ch-problem">${problem}</span>` : nothing}
                  </div>
                `;
              })}
            </div>
            <div class="ch-add">
              ${allowed
                ? html`<button @click=${() => this._addRow(false)}>+ Light channel</button>`
                : nothing}
              <button @click=${() => this._addRow(true)}>+ Dummy channel</button>
            </div>
          `
        : nothing}
    `;
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
                @change=${(e: Event) => this._setType((e.target as HTMLSelectElement).value)}
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

          ${this._renderChannels()}

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
    const bad = (this._rows ?? []).findIndex((r) => rowProblem(r, this._working.type));
    if (bad >= 0) {
      this.errorText = `Channel ${bad + 1}: ${rowProblem(this._rows![bad], this._working.type)}`;
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

  static styles = [
    sharedDialogStyles,
    css`
      .dialog {
        width: min(540px, calc(100vw - 32px));
      }
      label.check {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
        font-size: 0.9rem;
        color: var(--primary-text-color, #212121);
        cursor: pointer;
      }
      label.check input {
        width: auto;
      }
      .channels {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 10px;
      }
      .ch-row {
        display: grid;
        grid-template-columns: 2.5em minmax(0, 1.3fr) minmax(0, 1fr) 4.5em auto;
        align-items: center;
        gap: 6px;
      }
      .ch-row.invalid select {
        border-color: var(--error-color, #db4437);
      }
      .ch-row select,
      .ch-row input {
        padding: 6px 8px;
      }
      .ch-nr {
        font-size: 0.8rem;
        font-variant-numeric: tabular-nums;
        color: var(--secondary-text-color, #727272);
        text-align: right;
      }
      .ch-fill {
        grid-column: span 2;
        font-size: 0.8rem;
        color: var(--secondary-text-color, #727272);
      }
      .ch-tools {
        display: flex;
        gap: 2px;
      }
      .ch-problem {
        grid-column: 2 / -1;
        color: var(--error-color, #db4437);
        font-size: 0.75rem;
      }
      button.icon {
        padding: 4px 8px;
        border-radius: 6px;
      }
      button.icon:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .ch-add {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }
      @media (max-width: 480px) {
        .ch-row {
          grid-template-columns: 2em minmax(0, 1fr) 4em;
        }
        .ch-row select {
          grid-column: 2 / -1;
        }
        .ch-row .ch-label {
          grid-column: 2;
        }
        .ch-fill {
          grid-column: 2 / -1;
        }
        .ch-tools {
          grid-column: 2 / -1;
        }
      }
    `,
  ];
}

/** Add/edit a node. Fires 'save-node' {node, original} or 'delete-node' {node}. */
@customElement('dmx-node-dialog')
export class DmxNodeDialog extends LitElement {
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
@customElement('dmx-universe-dialog')
export class DmxUniverseDialog extends LitElement {
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

/**
 * Export/import the patch as YAML for backup or external editing.
 * Fires 'import-patch' {content} — the panel round-trips it through the backend
 * parser/validator and loads the result as unsaved changes.
 */
@customElement('dmx-yaml-dialog')
export class DmxYamlDialog extends LitElement {
  /** YAML of the current working patch, provided by the panel. */
  @property() yamlText = '';
  @property() errorText = '';

  @state() private _text = '';
  @state() private _copied = false;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('yamlText')) {
      this._text = this.yamlText;
    }
  }

  render() {
    return html`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog wide" @click=${(e: Event) => e.stopPropagation()}>
          <h3>Patch as YAML</h3>
          <div class="hint">
            Backup: copy or download this. Restore/edit: paste (or load a file), then
            "Load into editor" — nothing is applied until you Save &amp; Apply.
          </div>

          <textarea
            spellcheck="false"
            .value=${this._text}
            @input=${(e: Event) => (this._text = (e.target as HTMLTextAreaElement).value)}
          ></textarea>

          ${this.errorText ? html`<div class="error">${this.errorText}</div>` : nothing}

          <div class="actions">
            <button @click=${this._copy}>${this._copied ? 'Copied ✓' : 'Copy'}</button>
            <button @click=${this._download}>Download</button>
            <button @click=${this._pickFile}>Load file…</button>
            <span class="spacer"></span>
            <button @click=${this._cancel}>Close</button>
            <button class="primary" @click=${this._import}>Load into editor</button>
          </div>
        </div>
      </div>
    `;
  }

  private async _copy() {
    try {
      await navigator.clipboard.writeText(this._text);
      this._copied = true;
      setTimeout(() => (this._copied = false), 1500);
    } catch {
      this.errorText = 'Clipboard unavailable — select the text and copy manually';
    }
  }

  private _download() {
    const blob = new Blob([this._text], { type: 'application/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dmx_patch.yaml';
    a.click();
    URL.revokeObjectURL(url);
  }

  private _pickFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.yaml,.yml,.json,.txt';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        this._text = await file.text();
        this.errorText = '';
      }
    };
    input.click();
  }

  private _import() {
    this.dispatchEvent(
      new CustomEvent('import-patch', {
        detail: { content: this._text },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _cancel() {
    this.dispatchEvent(new CustomEvent('panel-dialog-closed', { bubbles: true, composed: true }));
  }

  static styles = [
    sharedDialogStyles,
    css`
      .dialog.wide {
        width: min(680px, calc(100vw - 32px));
      }
      textarea {
        width: 100%;
        box-sizing: border-box;
        min-height: 320px;
        margin-top: 12px;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #e0e0e0);
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color, #212121);
        font-family: var(--code-font-family, 'SFMono-Regular', Menlo, Consolas, monospace);
        font-size: 0.8rem;
        line-height: 1.45;
        white-space: pre;
      }
    `,
  ];
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
    channel_labels: null,
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
