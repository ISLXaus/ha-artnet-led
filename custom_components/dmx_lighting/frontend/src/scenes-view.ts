import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, openMoreInfo } from './model';
import type { FixtureInfo } from './effects-view';
import { callService } from './ws';

/** What a scene stores for one entity (Home Assistant scene config). */
interface EntityState {
  state: 'on' | 'off';
  brightness?: number;
  rgb_color?: [number, number, number];
  color_temp_kelvin?: number;
  [key: string]: unknown;
}

interface SceneDraft {
  id: string;
  name: string;
  icon?: string;
  entities: Record<string, EntityState>;
}

/** A light the scene editor can set, and which controls it gets. */
interface Target {
  entityId: string;
  label: string;
  kind: 'fixture' | 'group' | 'effect';
  /** 'rgb' colour picker, 'ct' colour temperature, 'dim' brightness only, 'onoff'. */
  control: 'rgb' | 'ct' | 'dim' | 'onoff';
  section: string;
}

type HassStates = Record<string, { state: string; attributes: Record<string, unknown> }>;

const toHex = (c: number[]) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const fromHex = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];

const FIXTURE_CONTROL: Record<string, Target['control']> = {
  rgb: 'rgb',
  rgbw: 'rgb',
  rgbww: 'rgb',
  xy: 'rgb',
  color_temp: 'ct',
  dimmer: 'dim',
  binary: 'onoff',
};

/**
 * The Scenes tab: Home Assistant scenes (the same ones as Settings → Automations &
 * Scenes → Scenes) for DMX fixtures, light groups and effects, edited in one place.
 */
@customElement('dmx-scenes-view')
export class DmxScenesView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) fixtures: FixtureInfo[] = [];
  /** Saved effects' light entities (light.fx_...). */
  @property({ attribute: false }) effectEntities: { entityId: string; name: string }[] = [];

  @state() private _selected = ''; // scene id, or 'new'
  @state() private _draft: SceneDraft | null = null;
  @state() private _original = '';
  @state() private _saving = false;
  @state() private _error = '';
  @state() private _filter = '';
  @state() private _live = false;

  private _liveTimer?: number;

  // ---- data -------------------------------------------------------------------------

  private _states(): HassStates {
    return ((this.hass as unknown as { states?: HassStates }).states ?? {}) as HassStates;
  }

  /** Editable Home Assistant scenes (those with a config id). */
  private _scenes() {
    return Object.entries(this._states())
      .filter(([e, s]) => e.startsWith('scene.') && s.attributes.id != null)
      .map(([entityId, s]) => ({
        entityId,
        id: String(s.attributes.id),
        name: (s.attributes.friendly_name as string) || entityId,
        members: (s.attributes.entity_id as string[] | undefined) ?? [],
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _targets(): Target[] {
    const states = this._states();
    const targets: Target[] = [];
    const fixtureIds = new Set<string>();
    for (const f of this.fixtures) {
      if (!f.entityId || !states[f.entityId] || f.type === 'fixed') continue;
      fixtureIds.add(f.entityId);
      targets.push({
        entityId: f.entityId,
        label: f.name,
        kind: 'fixture',
        control: FIXTURE_CONTROL[f.type] ?? 'dim',
        section: `Fixtures · ${f.host} · universe ${f.universe}`,
      });
    }
    for (const [entityId, st] of Object.entries(states)) {
      const members = st.attributes.entity_id;
      if (!entityId.startsWith('light.') || !Array.isArray(members)) continue;
      if (!(members as string[]).some((m) => fixtureIds.has(m))) continue;
      const modes = (st.attributes.supported_color_modes as string[] | undefined) ?? [];
      targets.push({
        entityId,
        label: (st.attributes.friendly_name as string) || entityId,
        kind: 'group',
        control: modes.some((m) => ['rgb', 'rgbw', 'rgbww', 'hs', 'xy'].includes(m)) ? 'rgb'
          : modes.includes('color_temp') ? 'ct' : modes.includes('onoff') && modes.length === 1 ? 'onoff' : 'dim',
        section: 'Light groups',
      });
    }
    for (const fx of this.effectEntities) {
      if (!states[fx.entityId]) continue;
      targets.push({ entityId: fx.entityId, label: fx.name, kind: 'effect', control: 'dim', section: 'Effects' });
    }
    return targets;
  }

  // ---- selection ----------------------------------------------------------------------

  willUpdate(changed: PropertyValues) {
    if (changed.has('hass') && !this._selected) {
      const first = this._scenes()[0];
      if (first) this._select(first.id);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._liveTimer);
  }

  private async _select(id: string) {
    this._live = false;
    this._error = '';
    this._selected = id;
    this._draft = null;
    try {
      const config = await this.hass.callApi!<SceneDraft>('GET', `config/scene/config/${id}`);
      this._draft = { id, name: config.name ?? '', icon: config.icon, entities: config.entities ?? {} };
      this._original = JSON.stringify(this._draft);
    } catch (err) {
      this._error = `Couldn't load this scene: ${(err as { message?: string })?.message ?? err}`;
    }
  }

  private _startNew() {
    this._live = false;
    this._error = '';
    this._selected = 'new';
    this._draft = { id: String(Date.now()), name: '', entities: {} };
    this._original = '';
    this.updateComplete.then(() =>
      (this.renderRoot.querySelector('input.name') as HTMLInputElement | null)?.focus());
  }

  private _dirty(): boolean {
    return !!this._draft && JSON.stringify(this._draft) !== this._original;
  }

  // ---- editing -------------------------------------------------------------------------

  private _setEntities(entities: Record<string, EntityState>) {
    if (!this._draft) return;
    this._draft = { ...this._draft, entities };
    this._scheduleLive();
  }

  /** The entity's current state, as a scene entry (used when adding and for Capture). */
  private _capture(t: Target): EntityState {
    const st = this._states()[t.entityId];
    if (!st || st.state !== 'on') return { state: 'off' };
    const a = st.attributes;
    const entry: EntityState = { state: 'on' };
    if (t.control !== 'onoff' && typeof a.brightness === 'number') entry.brightness = a.brightness;
    if (t.control === 'rgb' && Array.isArray(a.rgb_color)) entry.rgb_color = a.rgb_color.slice(0, 3) as [number, number, number];
    if (t.control === 'ct' && typeof a.color_temp_kelvin === 'number') entry.color_temp_kelvin = a.color_temp_kelvin;
    return entry;
  }

  private _toggleTarget(t: Target, on: boolean) {
    const entities = { ...(this._draft?.entities ?? {}) };
    if (on) {
      const captured = this._capture(t);
      // Something visible by default: lights that are off now join at full.
      entities[t.entityId] = captured.state === 'on' ? captured
        : { state: 'on', ...(t.control === 'onoff' ? {} : { brightness: 255 }) };
    } else {
      delete entities[t.entityId];
    }
    this._setEntities(entities);
  }

  private _setAll(targets: Target[], on: boolean) {
    const entities = { ...(this._draft?.entities ?? {}) };
    for (const t of targets) {
      if (on && !entities[t.entityId]) entities[t.entityId] = { state: 'on', ...(t.control === 'onoff' ? {} : { brightness: 255 }) };
      if (!on) delete entities[t.entityId];
    }
    this._setEntities(entities);
  }

  private _update(entityId: string, patch: Partial<EntityState>) {
    const entities = { ...(this._draft?.entities ?? {}) };
    const next: EntityState = { ...entities[entityId], ...patch } as EntityState;
    for (const [k, v] of Object.entries(patch)) if (v === undefined) delete next[k];
    entities[entityId] = next;
    this._setEntities(entities);
  }

  private _captureAll() {
    const byId = new Map(this._targets().map((t) => [t.entityId, t]));
    const entities: Record<string, EntityState> = {};
    for (const [id, entry] of Object.entries(this._draft?.entities ?? {})) {
      const t = byId.get(id);
      entities[id] = t ? this._capture(t) : entry; // keep entities we don't manage as they are
    }
    this._setEntities(entities);
  }

  // ---- live preview / activate / save --------------------------------------------------

  private _scheduleLive() {
    if (!this._live) return;
    window.clearTimeout(this._liveTimer);
    this._liveTimer = window.setTimeout(() => this._applyDraft(), 150);
  }

  private async _applyDraft() {
    const entities = this._draft?.entities ?? {};
    if (!Object.keys(entities).length) return;
    try {
      await callService(this.hass, 'scene', 'apply', { entities, transition: 0 });
      this._error = '';
    } catch (err) {
      this._error = `Couldn't preview: ${(err as { message?: string })?.message ?? err}`;
    }
  }

  private _toggleLive(on: boolean) {
    this._live = on;
    if (on) this._applyDraft();
  }

  private _activate() {
    const scene = this._scenes().find((s) => s.id === this._selected);
    if (scene && !this._dirty()) {
      callService(this.hass, 'scene', 'turn_on', { entity_id: scene.entityId });
    } else {
      this._applyDraft(); // unsaved changes: show them as they are now
    }
  }

  private async _save() {
    const draft = this._draft;
    if (!draft) return;
    if (!draft.name.trim()) {
      this._error = 'Give the scene a name';
      return;
    }
    if (!Object.keys(draft.entities).length) {
      this._error = 'Add at least one light';
      return;
    }
    this._saving = true;
    this._error = '';
    try {
      const body: Record<string, unknown> = { name: draft.name.trim(), entities: draft.entities };
      if (draft.icon) body.icon = draft.icon;
      await this.hass.callApi!('POST', `config/scene/config/${draft.id}`, body);
      this._original = JSON.stringify(draft);
      this._selected = draft.id;
      this._toast(`Saved ${draft.name.trim()}`);
    } catch (err) {
      const message = (err as { body?: { message?: string }; message?: string });
      this._error = `Couldn't save: ${message?.body?.message ?? message?.message ?? err}. ` +
        'Scenes made in the UI need "scene: !include scenes.yaml" in configuration.yaml (the default).';
    } finally {
      this._saving = false;
    }
  }

  private async _delete() {
    const draft = this._draft;
    if (!draft || !confirm(`Delete the scene "${draft.name}"?`)) return;
    try {
      await this.hass.callApi!('DELETE', `config/scene/config/${draft.id}`);
      this._toast(`Deleted ${draft.name}`);
      this._selected = '';
      this._draft = null;
    } catch (err) {
      this._error = `Couldn't delete: ${(err as { message?: string })?.message ?? err}`;
    }
  }

  private _toast(message: string) {
    this.dispatchEvent(new CustomEvent('panel-toast', { detail: message, bubbles: true, composed: true }));
  }

  // ---- rendering -------------------------------------------------------------------------

  render() {
    const scenes = this._scenes();
    return html`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Scenes</div>
          ${scenes.map(
            (s) => html`<div
              class="rail-item ${s.id === this._selected ? 'active' : ''}"
              role="button"
              tabindex="0"
              @click=${() => this._select(s.id)}
              @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._select(s.id)}
            >
              <span class="rail-text">
                <span class="rail-title">${s.name}</span>
                <span class="rail-sub">${s.members.length} light${s.members.length === 1 ? '' : 's'}</span>
              </span>
              <button class="run" title="Activate ${s.name}" aria-label="Activate ${s.name}"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  callService(this.hass, 'scene', 'turn_on', { entity_id: s.entityId });
                }}>▶</button>
            </div>`
          )}
          ${this._selected === 'new'
            ? html`<div class="rail-item active"><span class="rail-title">New scene</span></div>`
            : nothing}
          <button class="rail-add" @click=${this._startNew}>+ New scene</button>
        </nav>
        <main class="main">
          ${this._draft ? this._renderEditor() : this._renderEmpty(scenes.length)}
        </main>
      </div>
    `;
  }

  private _renderEmpty(count: number) {
    return html`<div class="empty">
      ${count && this._selected
        ? 'Loading…'
        : html`<p>Scenes store how your fixtures, groups and effects look, and bring them back
            in one go.</p>
            <button class="primary" @click=${this._startNew}>+ New scene</button>`}
      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
    </div>`;
  }

  private _renderEditor() {
    const draft = this._draft!;
    const isNew = this._selected === 'new';
    const scene = this._scenes().find((s) => s.id === this._selected);
    const targets = this._targets();
    const byId = new Map(targets.map((t) => [t.entityId, t]));
    const q = this._filter.trim().toLowerCase();
    const sections = new Map<string, Target[]>();
    for (const t of targets) {
      if (q && !`${t.label} ${t.entityId}`.toLowerCase().includes(q)) continue;
      sections.set(t.section, [...(sections.get(t.section) ?? []), t]);
    }
    const included = Object.keys(draft.entities);
    return html`
      <div class="editor-head">
        <input class="name" placeholder="Scene name, e.g. Evening" aria-label="Scene name"
          .value=${draft.name}
          @input=${(e: Event) => (this._draft = { ...draft, name: (e.target as HTMLInputElement).value })} />
        ${scene
          ? html`<button class="link" @click=${() => openMoreInfo(this, scene.entityId)}><code>${scene.entityId}</code></button>`
          : nothing}
        <span class="spacer"></span>
        ${!isNew ? html`<button class="danger" @click=${this._delete}>Delete</button>` : nothing}
        ${this._dirty() && !isNew ? html`<button @click=${() => this._select(this._selected)}>Discard</button>` : nothing}
        <button class="primary" ?disabled=${this._saving || !this._dirty()} @click=${this._save}>
          ${this._saving ? 'Saving…' : isNew ? 'Create scene' : 'Save'}
        </button>
      </div>
      <div class="toolbar">
        <button @click=${this._activate} ?disabled=${!included.length}
          title=${this._dirty() ? 'Show the scene as edited (not saved yet)' : 'Activate the scene'}>▶ Activate</button>
        <button @click=${this._captureAll} ?disabled=${!included.length}
          title="Set every light in the scene to how it looks right now">⟳ Capture current</button>
        <label class="switch" title="Apply every change to the lights as you make it">
          <input type="checkbox" .checked=${this._live} ?disabled=${!included.length}
            @change=${(e: Event) => this._toggleLive((e.target as HTMLInputElement).checked)} />
          Live edit
        </label>
      </div>
      <div class="hint">A Home Assistant scene (also under Settings → Automations &amp; Scenes →
        Scenes). Saved straight to Home Assistant — no Save &amp; Apply needed.</div>
      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}

      <div class="columns">
        <section class="pick">
          <h3>Add lights</h3>
          <input class="filter" type="search" placeholder="Filter" .value=${this._filter}
            @input=${(e: Event) => (this._filter = (e.target as HTMLInputElement).value)} />
          <div class="pick-list">
            ${[...sections.entries()].map(([label, list]) => {
              const all = list.every((t) => draft.entities[t.entityId]);
              return html`<div class="pick-group">
                <label class="pick-head">
                  <input type="checkbox" .checked=${all}
                    @change=${(e: Event) => this._setAll(list, (e.target as HTMLInputElement).checked)} />
                  ${label}
                </label>
                ${list.map((t) => html`<label class="pick-item">
                  <input type="checkbox" .checked=${!!draft.entities[t.entityId]}
                    @change=${(e: Event) => this._toggleTarget(t, (e.target as HTMLInputElement).checked)} />
                  <span class="pick-name">${t.kind === 'group' ? '⧉ ' : t.kind === 'effect' ? '✦ ' : ''}${t.label}</span>
                </label>`)}
              </div>`;
            })}
            ${targets.length ? nothing : html`<div class="hint">No fixtures with light entities yet —
              Save &amp; Apply the patch first.</div>`}
          </div>
        </section>
        <section class="settings">
          <h3>In this scene (${included.length})</h3>
          ${included.length
            ? included.map((id) => this._renderRow(id, draft.entities[id], byId.get(id)))
            : html`<div class="hint">Tick fixtures, groups or effects on the left.</div>`}
        </section>
      </div>
    `;
  }

  private _renderRow(entityId: string, entry: EntityState, t?: Target) {
    const on = entry.state === 'on';
    const label = t?.label ?? ((this._states()[entityId]?.attributes?.friendly_name as string) || entityId);
    const swatch = on
      ? entry.rgb_color ? `rgb(${entry.rgb_color.join(',')})`
        : t?.control === 'ct' ? '#ffd9a0' : '#fff6e0'
      : 'transparent';
    const level = Math.round(((entry.brightness ?? 255) / 255) * 100);
    return html`<div class="row ${on ? '' : 'off'}">
      <div class="row-head">
        <span class="swatch" style="background: ${swatch}; opacity: ${on ? Math.max(0.25, level / 100) : 1}"></span>
        <span class="row-name">${t?.kind === 'group' ? '⧉ ' : t?.kind === 'effect' ? '✦ ' : ''}${label}</span>
        ${t ? nothing : html`<small class="muted">kept as is</small>`}
        <span class="spacer"></span>
        <label class="onoff">
          <input type="checkbox" .checked=${on} ?disabled=${!t}
            @change=${(e: Event) => {
              const checked = (e.target as HTMLInputElement).checked;
              if (checked) this._update(entityId, { state: 'on', brightness: entry.brightness ?? (t?.control === 'onoff' ? undefined : 255) });
              else this._update(entityId, { state: 'off', brightness: undefined, rgb_color: undefined, color_temp_kelvin: undefined });
            }} />
          ${on ? 'On' : 'Off'}
        </label>
        <button class="icon" title="Remove from scene" @click=${() => {
          const entities = { ...(this._draft?.entities ?? {}) };
          delete entities[entityId];
          this._setEntities(entities);
        }}>✕</button>
      </div>
      ${on && t && t.control !== 'onoff'
        ? html`<div class="row-controls">
            <label class="ctl">
              <span>${t.kind === 'effect' ? 'Level' : 'Brightness'}</span>
              <input type="range" min="1" max="255" .value=${String(entry.brightness ?? 255)}
                @input=${(e: Event) => this._update(entityId, { brightness: Number((e.target as HTMLInputElement).value) })} />
              <span class="num">${level}%</span>
            </label>
            ${t.control === 'rgb'
              ? html`<label class="ctl">
                  <span>Colour</span>
                  <input type="color" .value=${toHex(entry.rgb_color ?? [255, 255, 255])}
                    @input=${(e: Event) => this._update(entityId, { rgb_color: fromHex((e.target as HTMLInputElement).value) })} />
                  ${entry.rgb_color
                    ? html`<button class="small" title="Keep the light's own colour"
                        @click=${() => this._update(entityId, { rgb_color: undefined })}>clear</button>`
                    : html`<span class="muted">unchanged</span>`}
                </label>`
              : nothing}
            ${t.control === 'ct'
              ? html`<label class="ctl">
                  <span>Colour temp</span>
                  <input type="range" min="2000" max="6500" step="50"
                    .value=${String(entry.color_temp_kelvin ?? 4000)}
                    @input=${(e: Event) => this._update(entityId, { color_temp_kelvin: Number((e.target as HTMLInputElement).value) })} />
                  <span class="num">${entry.color_temp_kelvin ? `${entry.color_temp_kelvin} K` : 'unchanged'}</span>
                </label>`
              : nothing}
          </div>`
        : nothing}
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .layout {
      display: flex;
      height: 100%;
    }
    .rail {
      width: 240px;
      flex-shrink: 0;
      border-right: 1px solid var(--divider-color, #e0e0e0);
      padding: 12px 8px;
      box-sizing: border-box;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2px;
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
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      padding: 8px 10px;
      cursor: pointer;
    }
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .rail-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .rail-title {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    button.run {
      flex: none;
      width: 30px;
      height: 30px;
      padding: 0;
      border-radius: 50%;
      font-size: 0.75rem;
    }
    .main {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px 40px;
      box-sizing: border-box;
      max-width: 1100px;
    }
    button {
      font: inherit;
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: var(--secondary-background-color, #f0f0f0);
      color: var(--primary-text-color);
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    button.danger {
      background: none;
      color: var(--error-color, #db4437);
    }
    button.icon {
      padding: 2px 8px;
      background: none;
    }
    button.small {
      padding: 2px 8px;
      font-size: 0.8rem;
    }
    button.link {
      background: none;
      color: var(--primary-color);
      padding: 4px 6px;
    }
    .empty {
      padding: 48px 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .editor-head,
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
    }
    .toolbar {
      margin-top: 10px;
    }
    input.name {
      font: inherit;
      font-size: 1.3rem;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      min-width: 0;
      flex: 0 1 320px;
    }
    .switch {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .spacer {
      flex: 1;
    }
    .hint,
    .muted {
      font-size: 0.82rem;
      color: var(--secondary-text-color);
    }
    .hint {
      margin-top: 8px;
    }
    .error {
      margin-top: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
      color: var(--error-color, #db4437);
      font-size: 0.85rem;
    }
    .columns {
      display: grid;
      grid-template-columns: minmax(200px, 1fr) minmax(0, 2fr);
      gap: 16px;
      margin-top: 16px;
      align-items: start;
    }
    section {
      min-width: 0;
      padding: 14px 16px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    h3 {
      margin: 0 0 10px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .filter {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
      color: var(--primary-text-color);
      font: inherit;
    }
    .pick-list {
      margin-top: 8px;
      max-height: 60vh;
      overflow-y: auto;
    }
    .pick-group + .pick-group {
      margin-top: 8px;
    }
    .pick-head {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      padding: 4px 0;
    }
    .pick-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 4px 4px 18px;
      border-radius: 6px;
      cursor: pointer;
    }
    .pick-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .row {
      padding: 8px 10px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      margin-bottom: 6px;
    }
    .row.off {
      opacity: 0.75;
    }
    .row-head {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .swatch {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      flex: none;
    }
    .row-name {
      font-weight: 500;
    }
    .onoff {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.85rem;
    }
    .row-controls {
      display: grid;
      gap: 4px;
      margin: 6px 0 0 24px;
    }
    .ctl {
      display: grid;
      grid-template-columns: 90px 1fr auto;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
    }
    .ctl input[type='range'] {
      width: 100%;
      accent-color: var(--primary-color);
    }
    .ctl input[type='color'] {
      width: 48px;
      height: 28px;
      padding: 0;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: none;
      cursor: pointer;
    }
    .num {
      min-width: 4.5em;
      text-align: right;
      font-variant-numeric: tabular-nums;
      color: var(--secondary-text-color);
    }
    @media (max-width: 760px) {
      .layout {
        flex-direction: column;
        height: auto;
      }
      .rail {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        flex-direction: row;
        flex-wrap: wrap;
      }
      .rail-section {
        width: 100%;
      }
      .main {
        padding: 12px;
      }
      .columns {
        grid-template-columns: 1fr;
      }
      .ctl {
        grid-template-columns: 76px 1fr auto;
      }
    }
  `;
}
