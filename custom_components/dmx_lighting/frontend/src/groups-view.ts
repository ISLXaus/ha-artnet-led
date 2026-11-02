import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, openMoreInfo } from './model';
import type { FixtureInfo } from './effects-view';
import { LightGroup, createGroup, deleteGroup, listGroups, updateGroup } from './ws';

interface Draft {
  name: string;
  /** Member entity ids, in order. */
  entities: string[];
}

/**
 * The Groups tab: view, create, edit and delete Home Assistant light group helpers
 * made of DMX fixtures. Changes are saved straight to Home Assistant.
 */
@customElement('dmx-groups-view')
export class DmxGroupsView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) fixtures: FixtureInfo[] = [];
  /** Members for a new group, e.g. fixtures selected in the list view (token re-triggers). */
  @property({ attribute: false }) prefill: { entities: string[]; token: number } | null = null;

  @state() private _groups: LightGroup[] = [];
  @state() private _loaded = false;
  @state() private _selected = ''; // entry_id, or 'new'
  @state() private _draft: Draft | null = null;
  @state() private _saving = false;
  @state() private _error = '';
  @state() private _filter = '';

  connectedCallback(): void {
    super.connectedCallback();
    this._load();
  }

  willUpdate(changed: PropertyValues) {
    if (changed.has('prefill') && this.prefill) {
      this._startNew(this.prefill.entities);
    }
  }

  private async _load(selectEntry?: string) {
    try {
      this._groups = (await listGroups(this.hass)).groups;
      this._error = '';
    } catch (err) {
      this._error = (err as { message?: string })?.message ?? String(err);
    }
    this._loaded = true;
    if (selectEntry) this._select(selectEntry);
    else if (!this._selected && this._groups.length) this._select(this._groups[0].entry_id);
  }

  private _current(): LightGroup | undefined {
    return this._groups.find((g) => g.entry_id === this._selected);
  }

  private _select(entryId: string) {
    const group = this._groups.find((g) => g.entry_id === entryId);
    this._selected = entryId;
    this._error = '';
    this._draft = group ? { name: group.name, entities: [...group.entities] } : null;
  }

  private _startNew(entities: string[] = []) {
    this._selected = 'new';
    this._error = '';
    this._draft = { name: '', entities: [...entities] };
    this.updateComplete.then(() =>
      (this.renderRoot.querySelector('input.name') as HTMLInputElement | null)?.focus()
    );
  }

  private _dirty(): boolean {
    if (!this._draft) return false;
    if (this._selected === 'new') return true;
    const g = this._current();
    return !!g && (g.name !== this._draft.name || g.entities.join() !== this._draft.entities.join());
  }

  // ---- members ----------------------------------------------------------------------

  private _byEntity() {
    return new Map(this.fixtures.map((f) => [f.entityId ?? '', f]));
  }

  private _setMembers(entities: string[]) {
    if (this._draft) this._draft = { ...this._draft, entities };
  }

  private _toggle(entityId: string, on: boolean) {
    const list = (this._draft?.entities ?? []).filter((e) => e !== entityId);
    if (on) list.push(entityId);
    this._setMembers(list);
  }

  private _setAll(ids: string[], on: boolean) {
    const current = this._draft?.entities ?? [];
    this._setMembers(on ? [...current, ...ids.filter((e) => !current.includes(e))]
      : current.filter((e) => !ids.includes(e)));
  }

  private _move(from: number, to: number) {
    const list = [...(this._draft?.entities ?? [])];
    if (to < 0 || to >= list.length) return;
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    this._setMembers(list);
  }

  // ---- save / delete ------------------------------------------------------------------

  private async _save() {
    const draft = this._draft;
    if (!draft) return;
    if (!draft.name.trim()) {
      this._error = 'Give the group a name';
      return;
    }
    if (!draft.entities.length) {
      this._error = 'Pick at least one fixture';
      return;
    }
    this._saving = true;
    this._error = '';
    try {
      if (this._selected === 'new') {
        const created = await createGroup(this.hass, draft.name, draft.entities);
        this._toast(`Created ${created.name}${created.entity_id ? ` (${created.entity_id})` : ''}`);
        await this._load(created.entry_id);
      } else {
        const g = this._current()!;
        const changes: { name?: string; entities?: string[] } = {};
        if (g.name !== draft.name) changes.name = draft.name;
        if (g.entities.join() !== draft.entities.join()) changes.entities = draft.entities;
        await updateGroup(this.hass, g.entry_id, changes);
        this._toast(`Saved ${draft.name}`);
        await this._load(g.entry_id);
      }
    } catch (err) {
      this._error = (err as { message?: string })?.message ?? String(err);
    } finally {
      this._saving = false;
    }
  }

  private async _delete() {
    const g = this._current();
    if (!g || !confirm(`Delete the light group "${g.name}"? Effects using it will skip it.`)) return;
    this._saving = true;
    try {
      await deleteGroup(this.hass, g.entry_id);
      this._toast(`Deleted ${g.name}`);
      this._selected = '';
      this._draft = null;
      await this._load();
    } catch (err) {
      this._error = (err as { message?: string })?.message ?? String(err);
    } finally {
      this._saving = false;
    }
  }

  private _toast(message: string) {
    this.dispatchEvent(new CustomEvent('panel-toast', { detail: message, bubbles: true, composed: true }));
  }

  // ---- rendering ----------------------------------------------------------------------

  render() {
    const byEntity = this._byEntity();
    return html`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Light groups</div>
          ${this._groups.map((g) => {
            const dmx = g.entities.filter((e) => byEntity.has(e)).length;
            const st = g.entity_id ? this.hass.states?.[g.entity_id]?.state : undefined;
            return html`<button
              class="rail-item ${g.entry_id === this._selected ? 'active' : ''}"
              @click=${() => this._select(g.entry_id)}
            >
              <span class="dot ${st ?? ''}"></span>
              <span class="rail-text">
                <span class="rail-title">${g.name}</span>
                <span class="rail-sub">${dmx} fixture${dmx === 1 ? '' : 's'}${
                  g.entities.length > dmx ? ` · ${g.entities.length - dmx} other` : ''}</span>
              </span>
            </button>`;
          })}
          ${this._selected === 'new'
            ? html`<div class="rail-item active new"><span class="rail-title">New group</span></div>`
            : nothing}
          <button class="rail-add" @click=${() => this._startNew()}>+ New group</button>
        </nav>
        <main class="main">
          ${this._draft ? this._renderEditor() : this._renderEmpty()}
        </main>
      </div>
    `;
  }

  private _renderEmpty() {
    return html`<div class="empty">
      ${this._loaded
        ? html`<p>Light groups gather fixtures under one light entity — for dashboards,
            automations and effects.</p>
            <p class="hint">Tip: in the Patch tab's list view, tick fixtures and use
            <b>Create group</b>.</p>
            <button class="primary" @click=${() => this._startNew()}>+ New group</button>`
        : 'Loading…'}
      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
    </div>`;
  }

  private _renderEditor() {
    const draft = this._draft!;
    const group = this._current();
    const isNew = this._selected === 'new';
    const byEntity = this._byEntity();
    const q = this._filter.trim().toLowerCase();
    const sections = new Map<string, FixtureInfo[]>();
    let unsaved = 0;
    for (const f of this.fixtures) {
      // Only fixtures that already have a light entity can join a group.
      if (!f.entityId || !this.hass.states?.[f.entityId]) {
        unsaved++;
        continue;
      }
      if (q && !`${f.name} ${f.type}`.toLowerCase().includes(q)) continue;
      const key = `${f.host} · universe ${f.universe}`;
      sections.set(key, [...(sections.get(key) ?? []), f]);
    }
    const st = group?.entity_id ? this.hass.states?.[group.entity_id] : undefined;
    return html`
      <div class="editor-head">
        <input
          class="name"
          placeholder="Group name, e.g. Front wash"
          aria-label="Group name"
          .value=${draft.name}
          @input=${(e: Event) => (this._draft = { ...draft, name: (e.target as HTMLInputElement).value })}
        />
        ${group?.entity_id
          ? html`<button class="link" title="Open the group's light entity"
              @click=${() => openMoreInfo(this, group.entity_id!)}>
              <span class="dot ${st?.state ?? ''}"></span><code>${group.entity_id}</code>
            </button>`
          : html`<span class="hint">${isNew ? 'Becomes a light entity when you create it' : ''}</span>`}
        <span class="spacer"></span>
        ${!isNew ? html`<button class="danger" ?disabled=${this._saving} @click=${this._delete}>Delete</button>` : nothing}
        ${this._dirty() && !isNew
          ? html`<button ?disabled=${this._saving} @click=${() => this._select(this._selected)}>Discard</button>`
          : nothing}
        <button class="primary" ?disabled=${this._saving || !this._dirty()} @click=${this._save}>
          ${this._saving ? 'Saving…' : isNew ? 'Create group' : 'Save'}
        </button>
      </div>
      <div class="hint note">
        This is a Home Assistant light group helper (also under Settings → Helpers). Changes are
        saved straight away — no Save &amp; Apply needed. The order of members is the order effects
        flow through them.
      </div>
      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}

      <section>
        <h3>Members</h3>
        <div class="members">
          <div class="pick">
            <input class="filter" type="search" placeholder="Filter fixtures" .value=${this._filter}
              @input=${(e: Event) => (this._filter = (e.target as HTMLInputElement).value)} />
            <div class="pick-list">
              ${this.fixtures.length
                ? [...sections.entries()].map(([label, list]) => {
                    const ids = list.map((f) => f.entityId!);
                    const all = ids.every((id) => draft.entities.includes(id));
                    return html`<div class="pick-group">
                      <label class="pick-head">
                        <input type="checkbox" .checked=${all}
                          @change=${(e: Event) => this._setAll(ids, (e.target as HTMLInputElement).checked)} />
                        ${label}
                      </label>
                      ${list.map((f) => html`<label class="pick-item">
                        <input type="checkbox" .checked=${draft.entities.includes(f.entityId!)}
                          @change=${(e: Event) => this._toggle(f.entityId!, (e.target as HTMLInputElement).checked)} />
                        <span class="pick-name">${f.name}</span>
                        <span class="pick-sub">${f.type} · ${f.channel}</span>
                      </label>`)}
                    </div>`;
                  })
                : html`<div class="hint">No fixtures in the patch yet.</div>`}
              ${unsaved
                ? html`<div class="hint">${unsaved} new fixture${unsaved === 1 ? '' : 's'} not listed:
                    Save &amp; Apply the patch first to create their lights.</div>`
                : nothing}
            </div>
          </div>
          <div class="order">
            <div class="order-head">In this group (${draft.entities.length})</div>
            ${draft.entities.length
              ? html`<ol class="order-list">
                  ${draft.entities.map((id, i) => {
                    const f = byEntity.get(id);
                    const label = f?.name ??
                      ((this.hass.states?.[id]?.attributes?.friendly_name as string) || id);
                    return html`<li class=${f ? '' : 'other'}>
                      <span class="order-nr">${i + 1}</span>
                      <span class="order-name">${label}${f ? '' : html` <small>not a DMX fixture</small>`}</span>
                      <button class="icon" title="Move up" ?disabled=${i === 0} @click=${() => this._move(i, i - 1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${i === draft.entities.length - 1}
                        @click=${() => this._move(i, i + 1)}>↓</button>
                      <button class="icon" title="Remove from group" @click=${() => this._toggle(id, false)}>✕</button>
                    </li>`;
                  })}
                </ol>`
              : html`<div class="hint">Tick fixtures on the left to add them.</div>`}
          </div>
        </div>
      </section>
    `;
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
      text-align: left;
      border-radius: 8px;
      padding: 8px 10px;
      background: none;
    }
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .rail-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
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
    .main {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px 40px;
      box-sizing: border-box;
      max-width: 980px;
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
    button.link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      color: var(--primary-color);
      padding: 4px 6px;
    }
    .dot {
      flex: none;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--disabled-text-color, #9e9e9e);
    }
    .dot.on {
      background: var(--state-light-active-color, #ffc107);
    }
    .empty {
      padding: 48px 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .editor-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
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
    .spacer {
      flex: 1;
    }
    .hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .note {
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
    section {
      margin-top: 16px;
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
    .members {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
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
      max-height: 420px;
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
    .pick-name {
      flex: 1;
    }
    .pick-sub {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    .order-head {
      font-size: 0.85rem;
      font-weight: 600;
    }
    .order-list {
      list-style: none;
      margin: 8px 0 0;
      padding: 0;
      max-height: 440px;
      overflow-y: auto;
    }
    .order-list li {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 6px;
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      margin-bottom: 4px;
    }
    .order-list li.other {
      opacity: 0.75;
    }
    .order-nr {
      width: 1.6em;
      text-align: right;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    .order-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .order-name small {
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
      .members {
        grid-template-columns: 1fr;
      }
    }
  `;
}
