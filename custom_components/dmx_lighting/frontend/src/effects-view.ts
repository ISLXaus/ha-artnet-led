import { LitElement, html, css, nothing, svg, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, PatchError } from './model';
import {
  EFFECT_TYPES,
  EffectParams,
  EffectPreset,
  EffectType,
  Direction,
  DEFAULT_COLORS,
  PARAM_SPEC,
  computeFrame,
  effectEntityId,
  isColorType,
  newEffect,
  orderFixtures,
  p,
  waveform,
  colorAt,
} from './effects-model';
import { callService, startEffectPreview, updateEffectPreview } from './ws';

/** A fixture that effects can use, as listed in the patch. */
export interface FixtureInfo {
  name: string;
  type: string;
  host: string;
  universe: string;
  channel: number;
}

const toHex = (c: number[]) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
const fromHex = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/**
 * The Effects tab: a list of effect presets and an editor with an animated preview.
 * Fires 'effects-changed' {effects} whenever the presets change.
 */
@customElement('dmx-effects-view')
export class DmxEffectsView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) effects: EffectPreset[] = [];
  @property({ attribute: false }) fixtures: FixtureInfo[] = [];
  /** Validation errors for the whole patch; effect ones have paths "effects/<i>/...". */
  @property({ attribute: false }) errors: PatchError[] = [];
  /** Names of effects as last saved (their light entities exist). */
  @property({ attribute: false }) savedNames: string[] = [];

  @state() private _selectedId = '';
  @state() private _filter = '';
  @state() private _live = false;
  @state() private _liveError = '';
  @state() private _phase = 0;
  @state() private _paused = false;

  private _raf = 0;
  private _lastFrame = 0;
  private _previewStop?: () => Promise<void>;
  private _previewId = '';
  private _previewTimer?: number;
  private _dragIndex: number | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._raf = requestAnimationFrame(this._animate);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    cancelAnimationFrame(this._raf);
    this._stopLive();
  }

  willUpdate(changed: PropertyValues) {
    if (changed.has('effects') && !this.effects.find((e) => e.id === this._selectedId)) {
      this._selectedId = this.effects[0]?.id ?? '';
    }
    // Save & Apply reloads the integration, which ends any live preview.
    if (changed.has('savedNames') && changed.get('savedNames') !== undefined) this._stopLive();
  }

  updated(changed: PropertyValues) {
    // A different effect starts at the top of the editor.
    if (changed.has('_selectedId')) this.renderRoot.querySelector('.main')?.scrollTo(0, 0);
  }

  // ---- animation (on-screen preview) ----------------------------------------------

  private _animate = (t: number) => {
    const effect = this._current();
    if (effect && !this._paused) {
      const dt = this._lastFrame ? (t - this._lastFrame) / 1000 : 0;
      this._phase += (dt * p(effect.params, 'speed')) / 60;
    }
    this._lastFrame = t;
    this._raf = requestAnimationFrame(this._animate);
  };

  // ---- editing --------------------------------------------------------------------

  private _current(): EffectPreset | undefined {
    return this.effects.find((e) => e.id === this._selectedId);
  }

  private _emit(effects: EffectPreset[]) {
    this.dispatchEvent(
      new CustomEvent('effects-changed', { detail: { effects }, bubbles: true, composed: true })
    );
  }

  private _update(patch: Partial<EffectPreset>) {
    const current = this._current();
    if (!current) return;
    const updated = { ...current, ...patch };
    this._emit(this.effects.map((e) => (e.id === current.id ? updated : e)));
    this._schedulePreviewUpdate(updated);
  }

  private _setParam<K extends keyof EffectParams>(key: K, value: EffectParams[K]) {
    const current = this._current();
    if (!current) return;
    const params = { ...current.params, [key]: value };
    if (value === undefined || value === null) delete params[key];
    this._update({ params });
  }

  private _add() {
    const names = new Set(this.effects.map((e) => e.name.toLowerCase()));
    let n = this.effects.length + 1;
    while (names.has(`effect ${n}`)) n++;
    const effect = newEffect(`Effect ${n}`);
    this._emit([...this.effects, effect]);
    this._select(effect.id);
  }

  private _duplicate() {
    const current = this._current();
    if (!current) return;
    const copy: EffectPreset = {
      ...structuredClone(current),
      id: newEffect('').id,
      name: `${current.name} copy`,
    };
    this._emit([...this.effects, copy]);
    this._select(copy.id);
  }

  private _delete() {
    const current = this._current();
    if (!current || !confirm(`Delete the effect "${current.name}"?`)) return;
    this._stopLive();
    this._emit(this.effects.filter((e) => e.id !== current.id));
  }

  private _select(id: string) {
    if (id === this._selectedId) return;
    this._stopLive();
    this._selectedId = id;
    this._phase = 0;
  }

  // ---- fixtures ---------------------------------------------------------------------

  private _usable() {
    return this.fixtures.filter((f) => f.type !== 'fixed');
  }

  private _toggleFixture(name: string, on: boolean) {
    const current = this._current();
    if (!current) return;
    const list = current.fixtures.filter((n) => n !== name);
    if (on) list.push(name);
    this._update({ fixtures: list });
  }

  private _setAll(names: string[], on: boolean) {
    const current = this._current();
    if (!current) return;
    if (on) {
      const add = names.filter((n) => !current.fixtures.includes(n));
      this._update({ fixtures: [...current.fixtures, ...add] });
    } else {
      this._update({ fixtures: current.fixtures.filter((n) => !names.includes(n)) });
    }
  }

  private _sortByAddress() {
    const current = this._current();
    if (!current) return;
    const key = (name: string) => {
      const f = this.fixtures.find((x) => x.name === name);
      return f ? [f.host, Number(f.universe), f.channel] : ['', 0, 0];
    };
    const sorted = [...current.fixtures].sort((a, b) => {
      const [ha, ua, ca] = key(a) as [string, number, number];
      const [hb, ub, cb] = key(b) as [string, number, number];
      return ha.localeCompare(hb) || ua - ub || ca - cb;
    });
    this._update({ fixtures: sorted });
  }

  private _move(from: number, to: number) {
    const current = this._current();
    if (!current || to < 0 || to >= current.fixtures.length || from === to) return;
    const list = [...current.fixtures];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    this._update({ fixtures: list });
  }

  // ---- live preview on the real fixtures ---------------------------------------------

  private async _toggleLive(on: boolean) {
    if (!on) {
      this._stopLive();
      return;
    }
    const current = this._current();
    if (!current) return;
    this._liveError = '';
    this._previewId = `${current.id}-${Date.now()}`;
    this._live = true;
    try {
      this._previewStop = await startEffectPreview(this.hass, this._previewId, this._payload(current));
    } catch (err) {
      this._live = false;
      this._previewStop = undefined;
      this._liveError = (err as { message?: string })?.message ?? String(err);
    }
  }

  private _stopLive() {
    window.clearTimeout(this._previewTimer);
    const stop = this._previewStop;
    this._previewStop = undefined;
    this._live = false;
    stop?.().catch(() => undefined);
  }

  private _payload(effect: EffectPreset) {
    // The id is panel-only; the name doesn't matter for a preview.
    const { id: _id, ...rest } = effect;
    return rest;
  }

  private _schedulePreviewUpdate(effect: EffectPreset) {
    if (!this._live || !this._previewStop) return;
    window.clearTimeout(this._previewTimer);
    this._previewTimer = window.setTimeout(async () => {
      try {
        await updateEffectPreview(this.hass, this._previewId, this._payload(effect));
        this._liveError = '';
      } catch (err) {
        this._liveError = (err as { message?: string })?.message ?? String(err);
      }
    }, 120);
  }

  // ---- saved effect control ------------------------------------------------------------

  private _entityState(effect: EffectPreset) {
    if (!this.savedNames.includes(effect.name)) return undefined;
    return (this.hass as unknown as { states?: Record<string, { state: string }> }).states?.[
      effectEntityId(effect.name)
    ];
  }

  private _runSaved(effect: EffectPreset, on: boolean, e: Event) {
    e.stopPropagation();
    callService(this.hass, 'light', on ? 'turn_on' : 'turn_off', {
      entity_id: effectEntityId(effect.name),
    });
  }

  // ---- rendering ----------------------------------------------------------------------

  private _errorsFor(index: number) {
    const prefix = `effects/${index}`;
    return this.errors.filter((e) => e.path === prefix || e.path.startsWith(`${prefix}/`));
  }

  render() {
    const current = this._current();
    return html`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Effects</div>
          ${this.effects.map((effect, i) => {
            const st = this._entityState(effect);
            const running = st?.state === 'on';
            const info = EFFECT_TYPES.find((t) => t.type === effect.type);
            return html`
              <div
                class="rail-item ${effect.id === this._selectedId ? 'active' : ''}
                  ${this._errorsFor(i).length ? 'invalid' : ''}"
                role="button"
                tabindex="0"
                @click=${() => this._select(effect.id)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._select(effect.id)}
              >
                <span class="rail-text">
                  <span class="rail-title">${effect.name || '(unnamed)'}</span>
                  <span class="rail-sub">
                    ${info?.label ?? effect.type} · ${effect.fixtures.length} fixture${effect.fixtures.length === 1 ? '' : 's'}
                    ${st ? nothing : html` · <em>not saved</em>`}
                  </span>
                </span>
                ${st
                  ? html`<button
                      class="run ${running ? 'on' : ''}"
                      title=${running ? 'Stop (fades out)' : 'Run (fades in)'}
                      aria-label=${running ? `Stop ${effect.name}` : `Run ${effect.name}`}
                      @click=${(e: Event) => this._runSaved(effect, !running, e)}
                    >${running ? '■' : '▶'}</button>`
                  : nothing}
              </div>
            `;
          })}
          <button class="rail-add" @click=${this._add}>+ New effect</button>
        </nav>
        <main class="main">
          ${current ? this._renderEditor(current) : this._renderEmpty()}
        </main>
      </div>
    `;
  }

  private _renderEmpty() {
    return html`<div class="empty">
      <p>Effects run patterns across your fixtures: chases, waves, rainbows and more.</p>
      <button class="primary" @click=${this._add}>+ New effect</button>
    </div>`;
  }

  private _renderEditor(effect: EffectPreset) {
    const index = this.effects.findIndex((e) => e.id === effect.id);
    const errors = this._errorsFor(index);
    const color = isColorType(effect.type);
    return html`
      <div class="editor-head">
        <input
          class="name"
          aria-label="Effect name"
          .value=${effect.name}
          @input=${(e: Event) => this._update({ name: (e.target as HTMLInputElement).value })}
        />
        <span class="entity">${effectEntityId(effect.name || 'effect')}</span>
        <span class="spacer"></span>
        <button @click=${this._duplicate}>Duplicate</button>
        <button class="danger" @click=${this._delete}>Delete</button>
      </div>

      ${errors.length
        ? html`<div class="errors">${errors.map((e) => html`<div>⚠ ${e.message}</div>`)}</div>`
        : nothing}

      ${this._renderPreview(effect)}

      <section>
        <h3>Effect</h3>
        <div class="types">
          ${EFFECT_TYPES.map(
            (t) => html`
              <button
                class="type ${effect.type === t.type ? 'active' : ''}"
                aria-pressed=${effect.type === t.type}
                @click=${() => this._update({ type: t.type })}
              >
                ${this._typeGlyph(t.type, effect.params)}
                <span class="type-label">${t.label}</span>
                <span class="type-desc">${t.description}</span>
              </button>
            `
          )}
        </div>
      </section>

      ${this._renderFixtures(effect)}

      <section>
        <h3>Timing</h3>
        ${this._slider('Speed', 'speed', effect, { min: 1, max: 240, step: 1, unit: 'BPM',
          hint: 'Cycles per minute' })}
        <div class="row2">
          ${this._number('Fade in', 'fade_in', effect, 's', 0.1)}
          ${this._number('Fade out', 'fade_out', effect, 's', 0.1)}
        </div>
      </section>

      ${color ? this._renderColors(effect) : this._renderShape(effect)}

      ${this._renderFlow(effect)}
    `;
  }

  private _renderPreview(effect: EffectPreset) {
    const order = orderFixtures(effect.fixtures, effect.params);
    const frames = computeFrame(effect.type, effect.params, order.length, this._phase);
    return html`
      <section class="preview">
        <div class="preview-head">
          <h3>Preview</h3>
          <button class="small" @click=${() => (this._paused = !this._paused)}>
            ${this._paused ? '▶ Play' : '❚❚ Pause'}
          </button>
          <span class="spacer"></span>
          <label class="switch" title="Run this effect on the real fixtures while you edit">
            <input
              type="checkbox"
              .checked=${this._live}
              ?disabled=${!effect.fixtures.length}
              @change=${(e: Event) => this._toggleLive((e.target as HTMLInputElement).checked)}
            />
            Live on fixtures
          </label>
        </div>
        ${this._liveError ? html`<div class="live-error">${this._liveError}</div>` : nothing}
        ${order.length
          ? html`<div class="strip">
              ${order.map((name, i) => {
                const f = frames[i];
                const rgb = f.rgb ?? [255, 214, 150];
                const c = rgb.map((v) => Math.round(v * f.level));
                return html`<div class="cell" title=${`${name}: ${Math.round(f.level * 100)}%`}>
                  <div class="lamp" style="background: rgb(${c.join(',')}); box-shadow: 0 0 ${
                    Math.round(14 * f.level)}px rgba(${rgb.join(',')}, ${(0.8 * f.level).toFixed(2)})"></div>
                  <div class="cell-name">${name}</div>
                </div>`;
              })}
            </div>`
          : html`<div class="hint">Pick some fixtures below to see the effect.</div>`}
      </section>
    `;
  }

  private _typeGlyph(type: EffectType, params: EffectParams) {
    const w = 64;
    const h = 22;
    if (isColorType(type)) {
      const stops = Array.from({ length: 12 }, (_, i) => {
        const c = colorAt(type, i / 11, params);
        return svg`<stop offset=${i / 11} stop-color=${`rgb(${c.join(',')})`} />`;
      });
      return html`<svg class="glyph" viewBox="0 0 ${w} ${h}" aria-hidden="true">
        <defs><linearGradient id="g-${type}">${stops}</linearGradient></defs>
        <rect x="2" y="5" width=${w - 4} height=${h - 10} rx="4" fill="url(#g-${type})" />
      </svg>`;
    }
    const slot = { position: 0, count: 4, index: 0 };
    const pts = Array.from({ length: 65 }, (_, i) => {
      const x = (i / 64) * 2; // two cycles
      const v = waveform(type, x % 1, { ...params, seed: 3 }, slot, x);
      return `${2 + (i / 64) * (w - 4)},${h - 3 - v * (h - 6)}`;
    }).join(' ');
    return html`<svg class="glyph" viewBox="0 0 ${w} ${h}" aria-hidden="true">
      <polyline points=${pts} fill="none" stroke="currentColor" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round" />
    </svg>`;
  }

  private _renderFixtures(effect: EffectPreset) {
    const q = this._filter.trim().toLowerCase();
    const usable = this._usable();
    const groups = new Map<string, FixtureInfo[]>();
    for (const f of usable) {
      if (q && !`${f.name} ${f.type}`.toLowerCase().includes(q)) continue;
      const key = `${f.host} · universe ${f.universe}`;
      groups.set(key, [...(groups.get(key) ?? []), f]);
    }
    const missing = effect.fixtures.filter((n) => !usable.some((f) => f.name === n));
    return html`
      <section>
        <h3>Fixtures</h3>
        <div class="fixtures">
          <div class="pick">
            <input
              class="filter"
              type="search"
              placeholder="Filter fixtures"
              .value=${this._filter}
              @input=${(e: Event) => (this._filter = (e.target as HTMLInputElement).value)}
            />
            <div class="pick-list">
              ${usable.length
                ? [...groups.entries()].map(([group, list]) => {
                    const names = list.map((f) => f.name);
                    const all = names.every((n) => effect.fixtures.includes(n));
                    return html`
                      <div class="pick-group">
                        <label class="pick-head">
                          <input type="checkbox" .checked=${all}
                            @change=${(e: Event) => this._setAll(names, (e.target as HTMLInputElement).checked)} />
                          ${group}
                        </label>
                        ${list.map(
                          (f) => html`<label class="pick-item">
                            <input type="checkbox" .checked=${effect.fixtures.includes(f.name)}
                              @change=${(e: Event) => this._toggleFixture(f.name, (e.target as HTMLInputElement).checked)} />
                            <span class="pick-name">${f.name}</span>
                            <span class="pick-sub">${f.type} · ${f.channel}</span>
                          </label>`
                        )}
                      </div>`;
                  })
                : html`<div class="hint">No fixtures in the patch yet.</div>`}
            </div>
          </div>
          <div class="order">
            <div class="order-head">
              <span>Order (${effect.fixtures.length})</span>
              <span class="spacer"></span>
              <button class="small" ?disabled=${effect.fixtures.length < 2} @click=${this._sortByAddress}>By address</button>
              <button class="small" ?disabled=${effect.fixtures.length < 2}
                @click=${() => this._update({ fixtures: [...effect.fixtures].reverse() })}>Reverse</button>
              <button class="small" ?disabled=${!effect.fixtures.length}
                @click=${() => this._update({ fixtures: [] })}>Clear</button>
            </div>
            ${effect.fixtures.length
              ? html`<ol class="order-list">
                  ${effect.fixtures.map(
                    (name, i) => html`<li
                      class=${missing.includes(name) ? 'missing' : ''}
                      draggable="true"
                      @dragstart=${(e: DragEvent) => {
                        this._dragIndex = i;
                        e.dataTransfer!.effectAllowed = 'move';
                        e.dataTransfer!.setData('text/plain', name);
                      }}
                      @dragover=${(e: DragEvent) => e.preventDefault()}
                      @drop=${(e: DragEvent) => {
                        e.preventDefault();
                        if (this._dragIndex !== null) this._move(this._dragIndex, i);
                        this._dragIndex = null;
                      }}
                    >
                      <span class="grip" aria-hidden="true">⋮⋮</span>
                      <span class="order-nr">${i + 1}</span>
                      <span class="order-name">${name}${missing.includes(name) ? ' (not in patch)' : ''}</span>
                      <button class="icon" title="Move up" ?disabled=${i === 0} @click=${() => this._move(i, i - 1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${i === effect.fixtures.length - 1}
                        @click=${() => this._move(i, i + 1)}>↓</button>
                      <button class="icon" title="Remove" @click=${() => this._toggleFixture(name, false)}>✕</button>
                    </li>`
                  )}
                </ol>`
              : html`<div class="hint">Tick fixtures on the left. The effect flows through them in this order — drag to rearrange.</div>`}
          </div>
        </div>
      </section>
    `;
  }

  private _renderShape(effect: EffectPreset) {
    const t = effect.type;
    const hasDuty = t === 'square' || t === 'chase' || t === 'sparkle';
    const hasCrossfade = t === 'square' || t === 'chase';
    const autoDuty = effect.params.duty == null;
    return html`
      <section>
        <h3>Shape</h3>
        ${this._slider('Size', 'size', effect, { min: 0, max: 100, step: 1, unit: '%',
          hint: 'How far the intensity moves' })}
        ${this._slider('Base', 'base', effect, { min: 0, max: 100, step: 1, unit: '%',
          hint: 'Lowest intensity' })}
        ${hasDuty
          ? html`
              ${t === 'chase' || t === 'sparkle'
                ? html`<label class="check">
                    <input type="checkbox" .checked=${autoDuty}
                      @change=${(e: Event) => this._setParam('duty',
                        (e.target as HTMLInputElement).checked ? null : t === 'sparkle' ? 30 : 25)} />
                    ${t === 'chase' ? 'One fixture at a time' : 'Default sparkle amount'}
                  </label>`
                : nothing}
              ${!autoDuty || t === 'square'
                ? this._slider(t === 'sparkle' ? 'Amount' : 'On time', 'duty', effect,
                    { min: 1, max: 100, step: 1, unit: '%', fallback: 50,
                      hint: t === 'sparkle' ? 'How often fixtures flash' : 'Share of each cycle that is on' })
                : nothing}
            `
          : nothing}
        ${hasCrossfade
          ? this._slider('Crossfade', 'crossfade', effect, { min: 0, max: 100, step: 1, unit: '%',
              hint: 'Fade instead of snap' })
          : nothing}
      </section>
    `;
  }

  private _renderColors(effect: EffectPreset) {
    if (effect.type === 'rainbow') {
      return html`<section><h3>Colours</h3>
        <div class="hint">The rainbow runs through every hue. Use Spread to set how many colours show at once.</div>
      </section>`;
    }
    const colors = effect.params.colors?.length ? effect.params.colors : DEFAULT_COLORS;
    const set = (list: number[][]) => this._setParam('colors', list);
    return html`
      <section>
        <h3>Colours</h3>
        <div class="colors">
          ${colors.map(
            (c, i) => html`<div class="color">
              <input type="color" aria-label="Colour ${i + 1}" .value=${toHex(c)}
                @input=${(e: Event) => set(colors.map((x, j) => (j === i ? fromHex((e.target as HTMLInputElement).value) : x)))} />
              ${colors.length > (effect.type === 'color_wave' ? 2 : 1)
                ? html`<button class="icon" title="Remove colour"
                    @click=${() => set(colors.filter((_, j) => j !== i))}>✕</button>`
                : nothing}
            </div>`
          )}
          ${effect.type === 'color_chase' || colors.length < 2
            ? html`<button class="small" @click=${() => set([...colors, [255, 255, 255]])}>+ Colour</button>`
            : nothing}
        </div>
        ${effect.type === 'color_chase'
          ? this._slider('Crossfade', 'crossfade', effect, { min: 0, max: 100, step: 1, unit: '%',
              hint: 'Blend into the next colour' })
          : nothing}
      </section>
    `;
  }

  private _renderFlow(effect: EffectPreset) {
    const dir = effect.params.direction ?? 'forward';
    const dirs: [Direction, string][] = [['forward', 'Forward'], ['reverse', 'Reverse'], ['bounce', 'Bounce']];
    return html`
      <section>
        <h3>Flow across fixtures</h3>
        ${this._slider('Spread', 'spread', effect, { min: 0, max: 720, step: 15, unit: '°',
          hint: '0° = all together, 360° = one wave across them all' })}
        <div class="field">
          <span class="field-label">Direction</span>
          <div class="segmented" role="group" aria-label="Direction">
            ${dirs.map(([d, label]) => html`<button class=${dir === d ? 'active' : ''} aria-pressed=${dir === d}
              @click=${() => this._setParam('direction', d === 'forward' ? undefined : d)}>${label}</button>`)}
          </div>
        </div>
        <div class="field">
          <span class="field-label">Shuffle</span>
          <label class="check inline">
            <input type="checkbox" .checked=${!!effect.params.shuffle}
              @change=${(e: Event) => this._setParam('shuffle', (e.target as HTMLInputElement).checked || undefined)} />
            Random order
          </label>
          ${effect.params.shuffle
            ? html`<button class="small" @click=${() => this._setParam('seed', (effect.params.seed ?? 0) + 1)}>Reshuffle</button>`
            : nothing}
        </div>
        <div class="row3">
          ${this._stepper('Groups', 'groups', effect, 'Repeat the pattern in N parts')}
          ${this._stepper('Blocks', 'blocks', effect, 'N fixtures move together')}
          ${this._stepper('Wings', 'wings', effect, 'Mirror every other part')}
        </div>
      </section>
    `;
  }

  // ---- controls ---------------------------------------------------------------------

  private _slider(label: string, key: keyof EffectParams, effect: EffectPreset,
    o: { min: number; max: number; step: number; unit: string; hint?: string; fallback?: number }) {
    const raw = effect.params[key] as number | null | undefined;
    const value = raw ?? (PARAM_SPEC[key as string]?.default as number | null) ?? o.fallback ?? o.min;
    const spec = PARAM_SPEC[key as string];
    return html`<div class="field">
      <span class="field-label">${label}</span>
      <input type="range" min=${o.min} max=${o.max} step=${o.step} .value=${String(Math.min(o.max, value))}
        aria-label=${label}
        @input=${(e: Event) => this._setParam(key, Number((e.target as HTMLInputElement).value) as never)} />
      <span class="num">
        <input type="number" min=${spec?.min ?? o.min} max=${spec?.max ?? o.max} step=${o.step === 15 ? 1 : o.step}
          .value=${String(value)} aria-label="${label} value"
          @change=${(e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            if (!Number.isNaN(v)) this._setParam(key, v as never);
          }} />
        <span class="unit">${o.unit}</span>
      </span>
      ${o.hint ? html`<span class="field-hint">${o.hint}</span>` : nothing}
    </div>`;
  }

  private _number(label: string, key: keyof EffectParams, effect: EffectPreset, unit: string, step: number) {
    return html`<label class="field compact">
      <span class="field-label">${label}</span>
      <span class="num">
        <input type="number" min="0" max="600" step=${step} .value=${String(p(effect.params, key))}
          @change=${(e: Event) => this._setParam(key, Number((e.target as HTMLInputElement).value) as never)} />
        <span class="unit">${unit}</span>
      </span>
    </label>`;
  }

  private _stepper(label: string, key: keyof EffectParams, effect: EffectPreset, hint: string) {
    const value = p(effect.params, key);
    const set = (v: number) => this._setParam(key, (Math.max(1, Math.min(512, v)) === 1 ? undefined : Math.max(1, Math.min(512, v))) as never);
    return html`<div class="stepper" title=${hint}>
      <span class="field-label">${label}</span>
      <div class="stepper-ctl">
        <button class="icon" aria-label="Fewer ${label.toLowerCase()}" ?disabled=${value <= 1} @click=${() => set(value - 1)}>−</button>
        <span class="stepper-val">${value}</span>
        <button class="icon" aria-label="More ${label.toLowerCase()}" @click=${() => set(value + 1)}>+</button>
      </div>
      <span class="field-hint">${hint}</span>
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
    .rail-item:hover {
      background: color-mix(in srgb, var(--secondary-background-color, #f0f0f0) 60%, transparent);
    }
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .rail-item.invalid .rail-title {
      color: var(--error-color, #db4437);
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
    button.run.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
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
    button.small {
      padding: 4px 10px;
      font-size: 0.8rem;
    }
    button.icon {
      padding: 2px 8px;
      background: none;
    }
    input,
    select {
      font: inherit;
      color: var(--primary-text-color);
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
      font-size: 1.3rem;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      min-width: 0;
      flex: 0 1 320px;
    }
    .entity {
      font-family: var(--code-font-family, monospace);
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }
    .spacer {
      flex: 1;
    }
    .errors,
    .live-error {
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
    .hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .preview-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .preview-head h3 {
      margin: 0;
    }
    .switch {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .strip {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 8px;
      padding: 14px 10px;
      border-radius: 10px;
      background: #111;
    }
    .cell {
      width: 44px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .lamp {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid #333;
    }
    .cell-name {
      font-size: 0.6rem;
      color: #aaa;
      max-width: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .types {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
      gap: 8px;
    }
    button.type {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      padding: 10px;
      text-align: left;
      border: 2px solid transparent;
      color: var(--primary-text-color);
    }
    button.type.active {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 12%, var(--card-background-color, #fff));
    }
    .glyph {
      width: 64px;
      height: 22px;
      color: var(--primary-color);
      margin-bottom: 4px;
    }
    .type-label {
      font-weight: 600;
      font-size: 0.9rem;
    }
    .type-desc {
      font-size: 0.72rem;
      color: var(--secondary-text-color);
    }
    .fixtures {
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
    }
    .pick-list {
      margin-top: 8px;
      max-height: 280px;
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
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .order-list {
      list-style: none;
      margin: 8px 0 0;
      padding: 0;
      max-height: 300px;
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
      cursor: grab;
    }
    .order-list li.missing .order-name {
      color: var(--error-color, #db4437);
    }
    .grip {
      color: var(--secondary-text-color);
      font-size: 0.8rem;
      letter-spacing: -2px;
    }
    .order-nr {
      width: 1.6em;
      text-align: right;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .order-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .field {
      display: grid;
      grid-template-columns: 110px 1fr auto;
      align-items: center;
      gap: 2px 12px;
      margin: 10px 0;
    }
    .field.compact {
      grid-template-columns: 110px auto;
    }
    .field-label {
      font-size: 0.9rem;
    }
    .field-hint {
      grid-column: 2 / -1;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    input[type='range'] {
      width: 100%;
      accent-color: var(--primary-color);
    }
    .num {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .num input {
      width: 72px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
    }
    .unit {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      min-width: 2.2em;
    }
    .row2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 16px;
    }
    .row3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 8px;
    }
    .stepper {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .stepper .field-hint {
      grid-column: auto;
    }
    .stepper-ctl {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      width: fit-content;
    }
    .stepper-val {
      min-width: 2em;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }
    .segmented {
      display: inline-flex;
      grid-column: 2 / -1;
      width: fit-content;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    .segmented button {
      border-radius: 0;
      background: none;
      padding: 6px 14px;
    }
    .segmented button.active {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      margin: 6px 0;
    }
    .check.inline {
      margin: 0;
    }
    .colors {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .color {
      display: inline-flex;
      align-items: center;
    }
    input[type='color'] {
      width: 44px;
      height: 32px;
      padding: 0;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: none;
      cursor: pointer;
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
        align-items: center;
      }
      .rail-section {
        width: 100%;
      }
      .main {
        padding: 12px;
      }
      .fixtures,
      .row2 {
        grid-template-columns: 1fr;
      }
      .row3 {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 6px;
      }
      .field {
        grid-template-columns: 1fr auto;
      }
      .field input[type='range'] {
        grid-column: 1 / -1;
        grid-row: 2;
      }
      .field-hint {
        grid-column: 1 / -1;
      }
      .segmented {
        grid-column: 1 / -1;
      }
    }
  `;
}
