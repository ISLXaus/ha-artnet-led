import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  PatchDoc,
  PatchDevice,
  PatchNode,
  PatchError,
  PatchUniverse,
  YamlNodeSnapshot,
  CORRECTIONS,
  footprint,
  nodeKey,
  uuid,
} from './model';
import { getPatch, savePatch } from './ws';
import { newDevice, newNode } from './dialogs';
import './universe-grid';
import './dialogs';

type DialogState =
  | { kind: 'none' }
  | { kind: 'device'; device: PatchDevice; isNew: boolean; universeNr: string }
  | { kind: 'node'; node: PatchNode; isNew: boolean };

@customElement('artnet-patch-panel')
export class ArtnetPatchPanel extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;

  @state() private _patch: PatchDoc = { nodes: [] };
  @state() private _yamlNodes: YamlNodeSnapshot[] = [];
  @state() private _loaded = false;
  @state() private _dirty = false;
  @state() private _saving = false;
  @state() private _errors: PatchError[] = [];
  @state() private _toast = '';
  /** Selected node: 'ui:<idx>' or 'yaml:<idx>'. */
  @state() private _selected = '';
  @state() private _selectedUniverse = '';
  @state() private _dialog: DialogState = { kind: 'none' };

  private _toastTimer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this._load();
    window.addEventListener('beforeunload', this._beforeUnload);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('beforeunload', this._beforeUnload);
  }

  private _beforeUnload = (e: BeforeUnloadEvent) => {
    if (this._dirty) e.preventDefault();
  };

  private async _load() {
    try {
      const result = await getPatch(this.hass);
      this._patch = result.patch ?? { nodes: [] };
      this._yamlNodes = result.yaml_nodes ?? [];
      this._loaded = true;
      this._autoSelect();
    } catch (err) {
      this._showToast(`Failed to load patch: ${err}`);
    }
  }

  private _autoSelect() {
    if (this._selected) return;
    if (this._patch.nodes.length) this._selectNode('ui:0');
    else if (this._yamlNodes.length) this._selectNode('yaml:0');
  }

  private _selectNode(id: string) {
    this._selected = id;
    const universes = this._currentUniverses();
    const keys = Object.keys(universes ?? {}).sort((a, b) => Number(a) - Number(b));
    this._selectedUniverse = keys[0] ?? '';
  }

  private _currentNode(): PatchNode | YamlNodeSnapshot | undefined {
    const [kind, idxStr] = this._selected.split(':');
    const idx = Number(idxStr);
    if (kind === 'ui') return this._patch.nodes[idx];
    if (kind === 'yaml') return this._yamlNodes[idx];
    return undefined;
  }

  private _isYamlSelected(): boolean {
    return this._selected.startsWith('yaml:');
  }

  private _currentUniverses(): Record<string, PatchUniverse> | undefined {
    return this._currentNode()?.universes as Record<string, PatchUniverse> | undefined;
  }

  private _markDirty() {
    this._dirty = true;
    this._patch = { ...this._patch, nodes: [...this._patch.nodes] };
  }

  /**
   * Immutable update of the selected UI node. Replaces the node object (and the
   * patch document) so Lit change detection re-renders the grid immediately.
   */
  private _updateSelectedNode(updater: (node: PatchNode) => PatchNode) {
    const [kind, idxStr] = this._selected.split(':');
    if (kind !== 'ui') return;
    const idx = Number(idxStr);
    const nodes = [...this._patch.nodes];
    nodes[idx] = updater(nodes[idx]);
    this._patch = { ...this._patch, nodes };
    this._dirty = true;
  }

  private _updateUniverse(
    universeNr: string,
    updater: (universe: PatchUniverse) => PatchUniverse
  ) {
    this._updateSelectedNode((node) => {
      const universe = node.universes[universeNr];
      if (!universe) return node;
      return {
        ...node,
        universes: { ...node.universes, [universeNr]: updater(universe) },
      };
    });
  }

  private async _save() {
    this._saving = true;
    this._errors = [];
    try {
      const result = await savePatch(this.hass, this._patch);
      if (result.success) {
        this._dirty = false;
        this._showToast('Patch saved — changes applied live');
      } else {
        this._errors = result.errors;
        this._showToast('Patch has errors; nothing was saved');
      }
    } catch (err) {
      this._showToast(`Save failed: ${err}`);
    } finally {
      this._saving = false;
    }
  }

  private _showToast(message: string) {
    this._toast = message;
    clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => (this._toast = ''), 4000);
  }

  // ---- node CRUD ----------------------------------------------------------

  private _addNode() {
    this._dialog = { kind: 'node', node: newNode(), isNew: true };
  }

  private _editNode() {
    const node = this._currentNode();
    if (!node || this._isYamlSelected()) return;
    this._dialog = { kind: 'node', node: node as PatchNode, isNew: false };
  }

  private _onSaveNode(e: CustomEvent) {
    const { node, original } = e.detail as { node: PatchNode; original: PatchNode };
    const nodes = this._patch.nodes;
    const idx = nodes.findIndex((n) => n.id === original.id);
    if (idx >= 0) nodes[idx] = node;
    else {
      nodes.push(node);
      this._selectNode(`ui:${nodes.length - 1}`);
    }
    this._dialog = { kind: 'none' };
    this._markDirty();
  }

  private _onDeleteNode(e: CustomEvent) {
    const { node } = e.detail as { node: PatchNode };
    this._patch.nodes = this._patch.nodes.filter((n) => n.id !== node.id);
    this._dialog = { kind: 'none' };
    this._selected = '';
    this._autoSelect();
    this._markDirty();
  }

  // ---- universe CRUD ------------------------------------------------------

  private _addUniverse() {
    if (this._isYamlSelected()) return;
    const node = this._currentNode() as PatchNode | undefined;
    if (!node) return;
    const input = prompt('Universe number (0-1024):', '0');
    if (input === null) return;
    const nr = String(Number(input));
    if (Number.isNaN(Number(input)) || Number(nr) < 0 || Number(nr) > 1024) {
      this._showToast('Universe must be a number between 0 and 1024');
      return;
    }
    if (node.universes[nr]) {
      this._showToast(`Universe ${nr} already exists`);
      return;
    }
    this._updateSelectedNode((n) => ({
      ...n,
      universes: {
        ...n.universes,
        [nr]: { send_partial_universe: true, output_correction: 'linear', devices: [] },
      },
    }));
    this._selectedUniverse = nr;
  }

  private _removeUniverse() {
    if (this._isYamlSelected()) return;
    const node = this._currentNode() as PatchNode | undefined;
    if (!node || !this._selectedUniverse) return;
    const devices = node.universes[this._selectedUniverse]?.devices ?? [];
    if (devices.length && !confirm(`Delete universe ${this._selectedUniverse} and its ${devices.length} fixture(s)?`)) {
      return;
    }
    const universes = { ...node.universes };
    delete universes[this._selectedUniverse];
    this._updateSelectedNode((n) => ({ ...n, universes }));
    const keys = Object.keys(universes).sort((a, b) => Number(a) - Number(b));
    this._selectedUniverse = keys[0] ?? '';
  }

  private _setUniverseOption(key: 'output_correction' | 'send_partial_universe', value: unknown) {
    if (this._isYamlSelected()) return;
    this._updateUniverse(this._selectedUniverse, (u) => ({ ...u, [key]: value }));
  }

  // ---- device CRUD --------------------------------------------------------

  private _onAddDevice(e: CustomEvent) {
    if (this._isYamlSelected()) return;
    this._dialog = {
      kind: 'device',
      device: newDevice(e.detail.channel),
      isNew: true,
      universeNr: this._selectedUniverse,
    };
  }

  private _onEditDevice(e: CustomEvent) {
    if (this._isYamlSelected()) return;
    this._dialog = {
      kind: 'device',
      device: e.detail.device,
      isNew: false,
      universeNr: this._selectedUniverse,
    };
  }

  private _onSaveDevice(e: CustomEvent) {
    const { device, original, count } = e.detail as {
      device: PatchDevice;
      original: PatchDevice;
      count: number;
    };
    if (this._dialog.kind !== 'device') return;
    const universeNr = this._dialog.universeNr;

    let truncated = 0;
    this._updateUniverse(universeNr, (universe) => {
      const devices = [...universe.devices];
      const idx = devices.findIndex((d) => d.id === original.id);
      if (idx >= 0) {
        devices[idx] = device;
      } else if (count > 1) {
        // Bulk add: enumerate names and place fixtures back-to-back by footprint.
        let channel = device.channel;
        for (let i = 1; i <= count; i++) {
          const fixture = { ...device, id: uuid(), name: `${device.name}_${i}`, channel };
          const [first, last] = footprint(fixture);
          if (last > 512) {
            truncated = count - i + 1;
            break;
          }
          devices.push(fixture);
          channel = last + 1;
        }
      } else {
        devices.push(device);
      }
      return { ...universe, devices };
    });

    if (truncated) {
      this._showToast(`Stopped after channel 512 — ${truncated} fixture(s) not added`);
    }
    this._dialog = { kind: 'none' };
  }

  private _onDeleteDevice(e: CustomEvent) {
    const { device } = e.detail as { device: PatchDevice };
    if (this._dialog.kind !== 'device') return;
    this._updateUniverse(this._dialog.universeNr, (universe) => ({
      ...universe,
      devices: universe.devices.filter((d) => d.id !== device.id),
    }));
    this._dialog = { kind: 'none' };
  }

  private _onMoveDevice(e: CustomEvent) {
    const { deviceId, channel } = e.detail as { deviceId: string; channel: number };
    this._updateUniverse(this._selectedUniverse, (universe) => ({
      ...universe,
      devices: universe.devices.map((d) => (d.id === deviceId ? { ...d, channel } : d)),
    }));
  }

  // ---- render -------------------------------------------------------------

  render() {
    if (!this._loaded) {
      return html`<div class="loading">Loading DMX patch…</div>`;
    }

    const node = this._currentNode();
    const isYaml = this._isYamlSelected();
    const universes = this._currentUniverses() ?? {};
    const universeKeys = Object.keys(universes).sort((a, b) => Number(a) - Number(b));
    const universe = universes[this._selectedUniverse];

    return html`
      <div class="header">
        <h1>DMX Patch</h1>
        ${this._dirty ? html`<span class="dirty">unsaved changes</span>` : nothing}
        <span class="spacer"></span>
        <button
          class="primary"
          ?disabled=${!this._dirty || this._saving}
          @click=${this._save}
        >
          ${this._saving ? 'Saving…' : 'Save & Apply'}
        </button>
      </div>

      <div class="layout ${this.narrow ? 'narrow' : ''}">
        <nav class="rail">
          <div class="rail-section">Patch nodes</div>
          ${this._patch.nodes.map(
            (n, i) => html`
              <button
                class="rail-item ${this._selected === `ui:${i}` ? 'active' : ''}"
                @click=${() => this._selectNode(`ui:${i}`)}
              >
                <span class="rail-title">${n.host || '(new node)'}</span>
                <span class="rail-sub">${n.node_type}</span>
              </button>
            `
          )}
          <button class="rail-add" @click=${this._addNode}>+ Add node</button>

          ${this._yamlNodes.length
            ? html`
                <div class="rail-section">YAML nodes 🔒</div>
                ${this._yamlNodes.map(
                  (n, i) => html`
                    <button
                      class="rail-item ${this._selected === `yaml:${i}` ? 'active' : ''}"
                      @click=${() => this._selectNode(`yaml:${i}`)}
                    >
                      <span class="rail-title">${n.host}</span>
                      <span class="rail-sub">${n.node_type} · read-only</span>
                    </button>
                  `
                )}
              `
            : nothing}
        </nav>

        <main class="main">
          ${!node
            ? html`<div class="empty">
                No nodes yet. Add a node to start patching, or configure one in YAML.
              </div>`
            : html`
                <div class="node-bar">
                  <h2>${node.host} <small>(${node.node_type})</small></h2>
                  ${!isYaml
                    ? html`<button @click=${this._editNode}>Node settings</button>`
                    : nothing}
                </div>

                <div class="universe-bar">
                  ${universeKeys.map(
                    (key) => html`
                      <button
                        class="tab ${this._selectedUniverse === key ? 'active' : ''}"
                        @click=${() => (this._selectedUniverse = key)}
                      >
                        Universe ${key}
                      </button>
                    `
                  )}
                  ${!isYaml
                    ? html`
                        <button class="tab add" @click=${this._addUniverse}>+</button>
                        ${this._selectedUniverse
                          ? html`<button class="tab remove" @click=${this._removeUniverse}>
                              Remove universe
                            </button>`
                          : nothing}
                      `
                    : nothing}
                </div>

                ${universe
                  ? html`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            ?disabled=${isYaml}
                            @change=${(e: Event) =>
                              this._setUniverseOption(
                                'output_correction',
                                (e.target as HTMLSelectElement).value
                              )}
                          >
                            ${CORRECTIONS.map(
                              (c) =>
                                html`<option
                                  value=${c}
                                  ?selected=${(universe.output_correction ?? 'linear') === c}
                                >
                                  ${c}
                                </option>`
                            )}
                          </select>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            ?disabled=${isYaml}
                            .checked=${universe.send_partial_universe ?? true}
                            @change=${(e: Event) =>
                              this._setUniverseOption(
                                'send_partial_universe',
                                (e.target as HTMLInputElement).checked
                              )}
                          />
                          Send partial universe
                        </label>
                      </div>

                      <artnet-universe-grid
                        .hass=${this.hass}
                        .universe=${universe}
                        .universeNr=${Number(this._selectedUniverse)}
                        .nodeKey=${nodeKey(node as PatchNode)}
                        ?readonly=${isYaml}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @move-device=${this._onMoveDevice}
                        @grid-error=${(e: CustomEvent) => this._showToast(e.detail)}
                      ></artnet-universe-grid>
                    `
                  : html`<div class="empty">No universes. Add one to start placing fixtures.</div>`}
              `}

          ${this._errors.length
            ? html`
                <div class="errors">
                  <strong>Validation errors</strong>
                  <ul>
                    ${this._errors.map(
                      (err) => html`<li><code>${err.path}</code>: ${err.message}</li>`
                    )}
                  </ul>
                </div>
              `
            : nothing}
        </main>
      </div>

      ${this._dialog.kind === 'device'
        ? html`
            <artnet-device-dialog
              .device=${this._dialog.device}
              ?isNew=${this._dialog.isNew}
              @dialog-closed=${() => (this._dialog = { kind: 'none' })}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></artnet-device-dialog>
          `
        : nothing}
      ${this._dialog.kind === 'node'
        ? html`
            <artnet-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @dialog-closed=${() => (this._dialog = { kind: 'none' })}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></artnet-node-dialog>
          `
        : nothing}
      ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .loading,
    .empty {
      padding: 32px;
      color: var(--secondary-text-color);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, #fff);
    }
    .header h1 {
      font-size: 1.25rem;
      font-weight: 400;
      margin: 0;
    }
    .dirty {
      font-size: 0.8rem;
      opacity: 0.85;
      font-style: italic;
    }
    .spacer {
      flex: 1;
    }
    button {
      font: inherit;
      padding: 8px 14px;
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
    button.primary:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .layout {
      display: flex;
      height: calc(100% - 56px);
    }
    .layout.narrow {
      flex-direction: column;
    }
    .rail {
      width: 220px;
      flex-shrink: 0;
      border-right: 1px solid var(--divider-color, #e0e0e0);
      padding: 12px 8px;
      box-sizing: border-box;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .narrow .rail {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-direction: row;
      flex-wrap: wrap;
    }
    .rail-section {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin: 8px 8px 4px;
    }
    .rail-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      background: none;
      border-radius: 8px;
      padding: 8px 10px;
    }
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .rail-title {
      font-weight: 500;
    }
    .rail-sub {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    .rail-add {
      background: none;
      color: var(--primary-color);
      text-align: left;
      padding: 8px 10px;
    }
    .main {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
      box-sizing: border-box;
    }
    .node-bar {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
    }
    .node-bar h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 500;
    }
    .node-bar small {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .universe-bar {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .tab {
      border-radius: 16px;
      padding: 6px 14px;
    }
    .tab.active {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .tab.add {
      font-weight: 700;
    }
    .tab.remove {
      color: var(--error-color, #db4437);
      background: none;
    }
    .universe-options {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 12px;
      font-size: 0.9rem;
    }
    .universe-options label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .universe-options select {
      font: inherit;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
      color: var(--primary-text-color);
    }
    .errors {
      margin-top: 16px;
      padding: 12px 16px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
      border: 1px solid var(--error-color, #db4437);
      font-size: 0.9rem;
    }
    .errors ul {
      margin: 8px 0 0;
      padding-left: 20px;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary-text-color);
      color: var(--primary-background-color);
      padding: 10px 20px;
      border-radius: 24px;
      font-size: 0.9rem;
      z-index: 20;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }
  `;
}
