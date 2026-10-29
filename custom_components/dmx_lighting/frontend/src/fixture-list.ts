import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  PatchDevice,
  PatchError,
  PatchNode,
  channelRole,
  channelWidth,
  EntityMap,
  deviceColor,
  existingEntityId,
  footprint,
  openMoreInfo,
  hasCustomSetup,
  slugifyName,
} from './model';

type SortKey = 'address' | 'name' | 'type';

interface Row {
  device: PatchDevice;
  universe: string;
  /** Index within its universe; matches the grid's color and error paths. */
  index: number;
  first: number;
  last: number;
  overlap: boolean;
  errors: PatchError[];
}

/**
 * Table of every fixture on a node, across all its universes.
 * Fires 'edit-device' {device, universe} and 'add-device' {universe}.
 */
@customElement('dmx-fixture-list')
export class DmxFixtureList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) node!: PatchNode;
  /** Position of the node in the patch, for matching validation error paths. */
  @property({ type: Number }) nodeIndex = 0;
  @property({ attribute: false }) errors: PatchError[] = [];
  /** Universe new fixtures go into (the selected universe tab). */
  @property() addUniverse = '';
  @property({ attribute: false }) entityMap: EntityMap = {};

  @state() private _filter = '';
  @state() private _sort: SortKey = 'address';
  @state() private _desc = false;

  private _rows(): Row[] {
    const rows: Row[] = [];
    const universes = this.node?.universes ?? {};
    for (const [universe, u] of Object.entries(universes)) {
      const devices = u.devices ?? [];
      const spans = devices.map((d) => footprint(d));
      devices.forEach((device, index) => {
        const [first, last] = spans[index];
        const overlap = spans.some(
          ([f, l], j) => j !== index && first <= l && last >= f
        );
        const prefix = `nodes/${this.nodeIndex}/universes/${universe}/devices/${index}`;
        const errors = this.errors.filter(
          (e) => e.path === prefix || e.path.startsWith(`${prefix}/`)
        );
        rows.push({ device, universe, index, first, last, overlap, errors });
      });
    }
    return rows;
  }

  private _visibleRows(): Row[] {
    const q = this._filter.trim().toLowerCase();
    const rows = this._rows().filter((r) => {
      if (!q) return true;
      const d = r.device;
      const labels = (d.channel_labels ?? []).filter(Boolean).join(' ');
      return [d.name, d.friendly_name ?? '', d.type, `light.${slugifyName(d.name)}`, labels]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
    const byAddress = (a: Row, b: Row) =>
      Number(a.universe) - Number(b.universe) || a.first - b.first;
    const cmp: Record<SortKey, (a: Row, b: Row) => number> = {
      address: byAddress,
      name: (a, b) => a.device.name.localeCompare(b.device.name) || byAddress(a, b),
      type: (a, b) => a.device.type.localeCompare(b.device.type) || byAddress(a, b),
    };
    rows.sort(cmp[this._sort]);
    if (this._desc) rows.reverse();
    return rows;
  }

  private _setSort(key: SortKey) {
    if (this._sort === key) this._desc = !this._desc;
    else {
      this._sort = key;
      this._desc = false;
    }
  }

  private _header(key: SortKey, label: string) {
    const active = this._sort === key;
    return html`<th
      class="sortable ${active ? 'active' : ''}"
      aria-sort=${active ? (this._desc ? 'descending' : 'ascending') : 'none'}
      @click=${() => this._setSort(key)}
    >
      ${label}<span class="arrow">${active ? (this._desc ? '▼' : '▲') : ''}</span>
    </th>`;
  }

  /** Compact channel layout: "Dimmer · Red · Green · Blue · Mode 42". */
  private _layout(device: PatchDevice) {
    const width = channelWidth(device);
    const parts = [];
    for (let i = 0; i < width; i++) {
      const role = channelRole(device, i);
      parts.push(
        role.dummy
          ? html`<span class="part dummy" title="Dummy channel, fixed value ${role.value}"
              >${role.text} <b>${role.value}</b></span
            >`
          : html`<span class="part">${role.text}</span>`
      );
    }
    return html`${parts}${hasCustomSetup(device)
      ? nothing
      : html`<span class="default">default</span>`}`;
  }

  private _state(entityId: string | undefined) {
    const st = entityId ? this.hass?.states?.[entityId]?.state : undefined;
    if (!st) return html`<span class="state none" title="Not created yet — Save & Apply">–</span>`;
    return html`<span class="state ${st}" title=${st}></span>`;
  }

  render() {
    const all = this._rows();
    const rows = this._visibleRows();
    const universes = Object.keys(this.node?.universes ?? {});
    const totalChannels = all.reduce((sum, r) => sum + (r.last - r.first + 1), 0);

    return html`
      <div class="toolbar">
        <input
          class="filter"
          type="search"
          placeholder="Filter by name, type, entity or label"
          .value=${this._filter}
          @input=${(e: Event) => (this._filter = (e.target as HTMLInputElement).value)}
        />
        <span class="summary">
          ${all.length} fixture${all.length === 1 ? '' : 's'} · ${totalChannels} channels ·
          ${universes.length} universe${universes.length === 1 ? '' : 's'}
        </span>
        <button
          class="add"
          ?disabled=${!this.addUniverse}
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent('add-device', { detail: {}, bubbles: true, composed: true })
            )}
        >
          + Add fixture${this.addUniverse ? ` to universe ${this.addUniverse}` : ''}
        </button>
      </div>

      ${rows.length
        ? html`
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th class="swatch-col"></th>
                    ${this._header('name', 'Name')}
                    ${this._header('type', 'Type')}
                    ${this._header('address', 'Address')}
                    <th>Channels</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.map((r) => {
                    const d = r.device;
                    const existing = existingEntityId(
                      this.hass, this.entityMap, this.node.host, r.universe, d);
                    const entityId = existing ?? `light.${slugifyName(d.name)}`;
                    const problem = r.errors.length
                      ? r.errors.map((e) => e.message).join('\n')
                      : r.overlap
                        ? 'Overlaps another fixture'
                        : '';
                    return html`
                      <tr
                        class=${problem ? 'invalid' : ''}
                        tabindex="0"
                        title=${problem || `Edit ${d.name}`}
                        @click=${() => this._edit(r)}
                        @keydown=${(e: KeyboardEvent) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this._edit(r);
                          }
                        }}
                      >
                        <td class="swatch-col">
                          <span class="swatch" style="background: ${deviceColor(r.index)}"></span>
                        </td>
                        <td>
                          <div class="name">${d.name}</div>
                          ${d.friendly_name
                            ? html`<div class="sub">${d.friendly_name}</div>`
                            : nothing}
                          <div class="entity">
                            ${this._state(existing)}${existing
                              ? html`<button
                                  class="entity-link"
                                  title="Open ${existing}"
                                  @click=${(e: Event) => {
                                    e.stopPropagation();
                                    openMoreInfo(this, existing);
                                  }}
                                  @keydown=${(e: KeyboardEvent) => e.stopPropagation()}
                                >
                                  <code>${existing}</code>
                                </button>`
                              : html`<code>${entityId}</code>`}
                          </div>
                          ${problem ? html`<div class="problem">⚠ ${problem}</div>` : nothing}
                        </td>
                        <td>
                          ${d.type}
                          ${d.channel_size && d.channel_size !== '8bit'
                            ? html`<div class="sub">${d.channel_size}</div>`
                            : nothing}
                        </td>
                        <td class="address">
                          <span class="uni">U${r.universe}</span>
                          ${r.first === r.last ? r.first : `${r.first}–${r.last}`}
                        </td>
                        <td class="layout">${this._layout(d)}</td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            </div>
          `
        : html`<div class="empty">
            ${all.length ? 'No fixtures match the filter.' : 'No fixtures on this node yet.'}
          </div>`}
    `;
  }

  private _edit(row: Row) {
    this.dispatchEvent(
      new CustomEvent('edit-device', {
        detail: { device: row.device, universe: row.universe },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    :host {
      display: block;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
      margin-bottom: 10px;
    }
    .filter {
      flex: 1 1 220px;
      min-width: 0;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
      color: var(--primary-text-color);
      font: inherit;
    }
    .summary {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    button.add {
      font: inherit;
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.add:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th,
    td {
      text-align: left;
      padding: 8px 10px;
      vertical-align: top;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    tbody tr:last-child td {
      border-bottom: none;
    }
    th {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--secondary-text-color);
      white-space: nowrap;
      background: var(--secondary-background-color, #f5f5f5);
    }
    th.sortable {
      cursor: pointer;
      user-select: none;
    }
    th.sortable:hover,
    th.active {
      color: var(--primary-text-color);
    }
    .arrow {
      display: inline-block;
      width: 1em;
      margin-left: 2px;
      font-size: 0.65rem;
    }
    tbody tr {
      cursor: pointer;
    }
    tbody tr:hover,
    tbody tr:focus-visible {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
      outline: none;
    }
    tr.invalid td {
      background: color-mix(in srgb, var(--error-color, #db4437) 10%, transparent);
    }
    .swatch-col {
      width: 10px;
      padding-right: 0;
    }
    .swatch {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-top: 4px;
      border-radius: 3px;
    }
    .name {
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    td:nth-child(2) {
      min-width: 9em;
    }
    .entity {
      margin-top: 2px;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }
    .sub {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
    .problem {
      margin-top: 2px;
      font-size: 0.78rem;
      color: var(--error-color, #db4437);
      white-space: pre-line;
    }
    .address {
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .uni {
      display: inline-block;
      margin-right: 6px;
      padding: 0 6px;
      border-radius: 10px;
      font-size: 0.75rem;
      background: var(--secondary-background-color, #f0f0f0);
      color: var(--secondary-text-color);
    }
    .layout {
      line-height: 1.9;
    }
    .part {
      display: inline-block;
      margin: 0 4px 2px 0;
      padding: 0 6px;
      border-radius: 4px;
      font-size: 0.75rem;
      line-height: 1.6;
      background: var(--secondary-background-color, #f0f0f0);
      white-space: nowrap;
    }
    .part.dummy {
      background: repeating-linear-gradient(
          -45deg,
          rgba(127, 127, 127, 0.18) 0 4px,
          transparent 4px 8px
        ),
        var(--secondary-background-color, #f0f0f0);
      outline: 1px dashed var(--divider-color, #bbb);
    }
    .part b {
      font-variant-numeric: tabular-nums;
    }
    .default {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      font-style: italic;
    }
    .entity code {
      font-size: 0.75rem;
    }
    .entity-link {
      padding: 0;
      border: none;
      background: none;
      color: var(--primary-color, #03a9f4);
      cursor: pointer;
      font: inherit;
    }
    .entity-link:hover code {
      text-decoration: underline;
    }
    .state {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 6px;
      border-radius: 50%;
      background: var(--disabled-text-color, #9e9e9e);
      vertical-align: middle;
    }
    .state.on {
      background: var(--state-light-active-color, #ffc107);
    }
    .state.unavailable {
      background: var(--error-color, #db4437);
    }
    .state.none {
      width: auto;
      height: auto;
      background: none;
      color: var(--secondary-text-color);
    }
    /* Phones: each fixture becomes a card instead of a squeezed table row. */
    @media (max-width: 600px) {
      .table-wrap {
        overflow: visible;
      }
      thead {
        display: none;
      }
      table,
      tbody {
        display: block;
      }
      tbody tr {
        display: grid;
        grid-template-columns: 14px 1fr auto;
        column-gap: 8px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      tbody tr:last-child {
        border-bottom: none;
      }
      tr.invalid {
        background: color-mix(in srgb, var(--error-color, #db4437) 10%, transparent);
      }
      td {
        padding: 0;
        border: none;
        background: none !important;
      }
      td:nth-child(2) {
        min-width: 0;
      }
      td:nth-child(3) {
        grid-column: 3;
        grid-row: 1;
        text-align: right;
        color: var(--secondary-text-color);
        font-size: 0.8rem;
      }
      td.address {
        grid-column: 2 / -1;
        margin-top: 4px;
      }
      td.layout {
        grid-column: 2 / -1;
        margin-top: 2px;
      }
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
  `;
}
