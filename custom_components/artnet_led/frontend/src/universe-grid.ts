import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  PatchDevice,
  PatchUniverse,
  HomeAssistant,
  footprint,
  deviceColor,
} from './model';
import { subscribeDmx, DmxFrame } from './ws';

/** 512-channel grid for one universe. Fires 'add-device' / 'edit-device' events. */
@customElement('artnet-universe-grid')
export class ArtnetUniverseGrid extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) universe!: PatchUniverse;
  @property() nodeKey = '';
  @property({ type: Number }) universeNr = 0;
  @property({ type: Boolean }) readonly = false;

  @state() private _live = false;
  @state() private _values: number[] = [];
  /** Prospective placement while dragging a fixture: [first, last] + validity. */
  @state() private _dropTarget: { first: number; last: number; valid: boolean } | null = null;

  private _unsub?: () => Promise<void>;
  private _dragInfo?: { device: PatchDevice; offset: number };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopLive();
  }

  private async _toggleLive() {
    if (this._live) {
      this._stopLive();
      this._live = false;
      return;
    }
    this._live = true;
    try {
      this._unsub = await subscribeDmx(
        this.hass,
        this.nodeKey,
        this.universeNr,
        (frame: DmxFrame) => {
          this._values = frame.values;
        }
      );
    } catch (err) {
      this._live = false;
      this.dispatchEvent(
        new CustomEvent('grid-error', {
          detail: `Live monitoring unavailable: ${err}`,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _stopLive() {
    this._unsub?.();
    this._unsub = undefined;
    this._values = [];
  }

  /** channel (1-based) → device + its index, for occupied cells. */
  private _channelMap(): Map<number, { device: PatchDevice; index: number; first: boolean }> {
    const map = new Map();
    (this.universe?.devices ?? []).forEach((device, index) => {
      const [first, last] = footprint(device);
      for (let ch = first; ch <= Math.min(last, 512); ch++) {
        const existing = map.get(ch);
        map.set(ch, { device, index, first: ch === first, overlap: !!existing });
      }
    });
    return map;
  }

  render() {
    const map = this._channelMap();
    const cells = [];
    for (let ch = 1; ch <= 512; ch++) {
      const entry = map.get(ch) as
        | { device: PatchDevice; index: number; first: boolean; overlap?: boolean }
        | undefined;
      const value = this._values[ch - 1];
      const heat = this._live && value !== undefined ? value / 255 : 0;
      const drop = this._dropTarget;
      const inDropRange = drop && ch >= drop.first && ch <= drop.last;
      cells.push(html`
        <div
          class="cell ${entry ? 'occupied' : ''} ${entry?.overlap ? 'overlap' : ''}
            ${inDropRange ? (drop.valid ? 'drop-ok' : 'drop-bad') : ''}"
          style=${entry
            ? `--device-color: ${deviceColor(entry.index)}`
            : nothing}
          title=${entry
            ? `${entry.device.name} (${entry.device.type}) — channel ${ch}${this.readonly ? '' : ' — drag to move'}`
            : `Channel ${ch}`}
          draggable=${entry && !this.readonly ? 'true' : 'false'}
          @click=${() => this._cellClick(ch, entry?.device)}
          @dragstart=${entry ? (e: DragEvent) => this._dragStart(e, ch, entry.device) : nothing}
          @dragover=${(e: DragEvent) => this._dragOver(e, ch)}
          @drop=${(e: DragEvent) => this._drop(e)}
          @dragend=${() => this._dragEnd()}
        >
          ${this._live
            ? html`<span class="heat" style="opacity: ${heat}"></span>`
            : nothing}
          <span class="ch">${ch}</span>
          ${entry?.first
            ? html`<span class="name">${entry.device.name}</span>`
            : nothing}
          ${this._live && value !== undefined
            ? html`<span class="val">${value}</span>`
            : nothing}
        </div>
      `);
    }

    return html`
      <div class="toolbar">
        <label class="live-toggle">
          <input
            type="checkbox"
            .checked=${this._live}
            @change=${this._toggleLive}
          />
          Live DMX values
        </label>
        ${this.readonly
          ? html`<span class="readonly-hint">YAML-configured (read-only)</span>`
          : nothing}
      </div>
      <div class="grid">${cells}</div>
    `;
  }

  // ---- drag to re-address ---------------------------------------------------

  private _dragStart(e: DragEvent, channel: number, device: PatchDevice) {
    if (this.readonly) return;
    const [first] = footprint(device);
    this._dragInfo = { device, offset: channel - first };
    e.dataTransfer!.effectAllowed = 'move';
    // Firefox requires data to be set for the drag to start.
    e.dataTransfer!.setData('text/plain', device.id);
  }

  private _dragOver(e: DragEvent, channel: number) {
    const info = this._dragInfo;
    if (!info) return;
    const [f, l] = footprint(info.device);
    const width = l - f + 1;
    const first = channel - info.offset;
    const last = first + width - 1;
    const valid = first >= 1 && last <= 512 && !this._collides(info.device.id, first, last);
    if (
      this._dropTarget?.first !== first ||
      this._dropTarget?.last !== last ||
      this._dropTarget?.valid !== valid
    ) {
      this._dropTarget = { first, last, valid };
    }
    if (valid) {
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'move';
    }
  }

  private _collides(excludeId: string, first: number, last: number): boolean {
    return (this.universe?.devices ?? []).some((d) => {
      if (d.id === excludeId) return false;
      const [f, l] = footprint(d);
      return first <= l && last >= f;
    });
  }

  private _drop(e: DragEvent) {
    e.preventDefault();
    const info = this._dragInfo;
    const target = this._dropTarget;
    this._dragInfo = undefined;
    this._dropTarget = null;
    if (!info || !target?.valid) return;
    if (footprint(info.device)[0] === target.first) return; // dropped in place
    this.dispatchEvent(
      new CustomEvent('move-device', {
        detail: { deviceId: info.device.id, channel: target.first },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _dragEnd() {
    this._dragInfo = undefined;
    this._dropTarget = null;
  }

  private _cellClick(channel: number, device?: PatchDevice) {
    if (this.readonly) return;
    if (device) {
      this.dispatchEvent(
        new CustomEvent('edit-device', { detail: { device }, bubbles: true, composed: true })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent('add-device', { detail: { channel }, bubbles: true, composed: true })
      );
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    }
    .live-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .readonly-hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
      gap: 2px;
    }
    .cell {
      position: relative;
      aspect-ratio: 1;
      min-width: 0;
      border-radius: 4px;
      background: var(--secondary-background-color, #f0f0f0);
      cursor: pointer;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 4px;
      box-sizing: border-box;
      border: 1px solid transparent;
    }
    .cell:hover {
      border-color: var(--primary-color);
    }
    .cell.occupied {
      background: var(--device-color);
      color: #fff;
    }
    .cell.overlap {
      outline: 2px solid var(--error-color, #db4437);
      outline-offset: -2px;
    }
    .cell.drop-ok {
      outline: 2px dashed var(--primary-color, #03a9f4);
      outline-offset: -2px;
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 25%, transparent);
    }
    .cell.drop-bad {
      outline: 2px dashed var(--error-color, #db4437);
      outline-offset: -2px;
      cursor: not-allowed;
    }
    .heat {
      position: absolute;
      inset: 0;
      background: var(--primary-color, #03a9f4);
      pointer-events: none;
    }
    .cell.occupied .heat {
      background: #fff;
      mix-blend-mode: overlay;
    }
    .ch {
      position: relative;
      font-size: 0.6rem;
      opacity: 0.7;
      line-height: 1;
    }
    .name {
      position: relative;
      font-size: 0.62rem;
      font-weight: 600;
      line-height: 1.1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .val {
      position: relative;
      font-size: 0.65rem;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
  `;
}
