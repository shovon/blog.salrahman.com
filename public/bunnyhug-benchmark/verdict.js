// Charts for the second appendix of "Which codebase would an LLM rather maintain?": checking the judges.
// Each <figure class="bb-chart" data-draw="v-..."> in the post is filled from verdict.json. Needs d3, loaded before this file.
// Kept in validity/report/blog_export.py in the benchmark folder, adapted from the verdict page's drawing code; edit there, not here.
(function () {
  const HERE = document.currentScript.src;
  let D = null;
  const COLOR = (s) => 'var(--bb-' + s + ')';
  const FMT = {int: d3.format(',.0f'), d1: d3.format('.1f'), d2: d3.format('.2f'), usd3: (v) => '$' + d3.format('.3f')(v), usd2: (v) => '$' + d3.format('.2f')(v), pct: (v) => d3.format('.0f')(v) + '%'};
  const TICK = {int: d3.format(',.0f'), usd3: (v) => '$' + String(+v.toPrecision(2)), usd2: (v) => '$' + String(+v.toPrecision(2)), pct: (v) => v + '%'};
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  function makeTip(host) {
    const tip = el('div', 'bb-tip'); tip.hidden = true; host.appendChild(tip);
    return {show(ev, title, lines) {
      tip.replaceChildren(el('div', 'bb-tip-title', title), ...lines.map((l) => el('div', 'bb-tip-line', l))); tip.hidden = false;
      const b = host.getBoundingClientRect();
      tip.style.left = Math.max(0, Math.min(ev.clientX - b.left + 14, b.width - tip.offsetWidth - 2)) + 'px';
      tip.style.top = (ev.clientY - b.top + 18) + 'px';
    }, hide() { tip.hidden = true; }};
  }
  function textW(svg, str, cls) { const t = svg.append('text').attr('class', cls || null).text(str); const w = t.node().getComputedTextLength() || String(str).length * 6.8; t.remove(); return w; }

  // one row per style, one dot per repository
  function strip(host) {
    const key = host.dataset.key, fmt = FMT[host.dataset.fmt], tick = TICK[host.dataset.fmt];
    const groups = D.styles.map((s) => ({s: s, v: (D[host.dataset.src || 'repos'] || []).filter((r) => r.style === s && r[key] != null).map((r) => r[key])})).filter((g) => g.v.length);
    if (!groups.length) return host.appendChild(el('p', 'bb-wait', 'Not measured.'));
    const tip = makeTip(host), W = host.clientWidth || 600;
    const svg = d3.select(host).append('svg').attr('class', 'bb-svg').attr('role', 'img').attr('aria-label', host.dataset.label + ', by the style that built the repository');
    const val = (g) => 'mean ' + fmt(d3.mean(g.v));
    const labW = d3.max(groups, (g) => textW(svg, D.names[g.s])), valW = d3.max(groups, (g) => textW(svg, val(g)));
    const m = {t: 8, l: Math.ceil(labW) + 14, r: Math.ceil(valW) + 16, b: 24}, rh = 30, H = m.t + groups.length * rh + m.b;
    svg.attr('viewBox', '0 0 ' + W + ' ' + H);
    const x = d3.scaleLinear().domain([0, +host.dataset.max || d3.max(groups, (g) => d3.max(g.v))]).range([m.l, Math.max(m.l + 40, W - m.r)]);
    if (!host.dataset.max) x.nice(4);
    const ticks = x.ticks(Math.max(2, Math.min(5, Math.floor((W - m.l - m.r) / 64))));
    const gr = svg.append('g');
    gr.selectAll('line').data(ticks).join('line').attr('class', (t) => t === 0 ? 'bb-axis' : 'bb-grid').attr('x1', (t) => x(t)).attr('x2', (t) => x(t)).attr('y1', m.t - 2).attr('y2', H - m.b + 2);
    gr.selectAll('text').data(ticks).join('text').attr('class', 'bb-tick').attr('text-anchor', 'middle').attr('x', (t) => x(t)).attr('y', H - m.b + 17).text((t) => tick(t));
    const row = svg.append('g').selectAll('g').data(groups).join('g').attr('transform', (g, i) => 'translate(0,' + (m.t + i * rh) + ')');
    row.append('text').attr('x', 0).attr('y', rh / 2 + 4).text((g) => D.names[g.s]);
    row.each(function (g) {
      const s = d3.select(this);
      s.append('line').attr('x1', x(d3.min(g.v))).attr('x2', x(d3.max(g.v))).attr('y1', rh / 2).attr('y2', rh / 2).style('stroke', COLOR(g.s)).style('stroke-width', 2).style('opacity', 0.45);
      s.selectAll('circle').data(g.v).join('circle').attr('cx', (v) => x(v)).attr('cy', rh / 2).attr('r', 4.5).style('fill', COLOR(g.s)).style('stroke', 'var(--bb-surface)').style('stroke-width', 1.5);
      s.append('line').attr('x1', x(d3.mean(g.v))).attr('x2', x(d3.mean(g.v))).attr('y1', 3).attr('y2', rh - 3).style('stroke', 'currentColor').style('stroke-width', 2);
      s.append('text').attr('x', W - m.r + 10).attr('y', rh / 2 + 4).text(val(g));
      s.append('rect').attr('class', 'bb-hit').attr('width', W).attr('height', rh)
        .on('pointerenter pointermove', (ev) => tip.show(ev, D.names[g.s], [host.dataset.label, g.v.length + ' repositories, mean ' + fmt(d3.mean(g.v)), 'lowest ' + fmt(d3.min(g.v)) + ', highest ' + fmt(d3.max(g.v))]))
        .on('pointerleave', () => tip.hide());
    });
  }

  // how each judge ranked each style's build: a stacked bar of ranks per style, a facet per judge
  const OP = [1, 0.62, 0.36, 0.16];
  function ranks(host) {
    const wrap = el('div', 'bb-facets'); host.appendChild(wrap);
    const tip = makeTip(host), full = host.clientWidth || 600, gap = 28, cols = full >= 2 * 320 + gap ? 2 : 1, W = Math.floor((full - gap * (cols - 1)) / cols);
    wrap.style.gridTemplateColumns = 'repeat(' + cols + ', minmax(0, 1fr))';
    [['claude-sonnet-5-5', 'Sonnet 5.5'], ['claude-opus-5-5', 'Opus 5.5']].forEach(([key, title]) => {
      const j = D.judges[key]; if (!j) return;
      const svg = d3.select(wrap).append('svg').attr('class', 'bb-svg').attr('role', 'img').attr('aria-label', 'Ranks given by ' + title + ' to each style');
      const val = (s) => 'first in ' + j.styles[s].first + ' of ' + j.asks;
      const labW = d3.max(D.styles, (s) => textW(svg, D.names[s])), valW = d3.max(D.styles, (s) => textW(svg, val(s)));
      const m = {t: 28, l: Math.ceil(labW) + 14, r: Math.ceil(valW) + 16, b: 6}, rh = 30, H = m.t + D.styles.length * rh + m.b;
      svg.attr('viewBox', '0 0 ' + W + ' ' + H);
      const x = d3.scaleLinear().domain([0, j.asks]).range([m.l, Math.max(m.l + 40, W - m.r)]);
      svg.append('text').attr('class', 'bb-facet').attr('x', 0).attr('y', 14).text(title + ', ' + j.asks + ' asks');
      const row = svg.append('g').selectAll('g').data(D.styles).join('g').attr('transform', (s, i) => 'translate(0,' + (m.t + i * rh) + ')');
      row.append('text').attr('x', 0).attr('y', rh / 2 + 4).text((s) => D.names[s]);
      row.each(function (s) {
        const g = d3.select(this), c = j.styles[s].ranks; let at = 0;
        c.forEach((n, k) => { if (n) { const x0 = x(at) + (at ? 2 : 0), x1 = x(at + n); g.append('rect').attr('x', x0).attr('y', rh / 2 - 7).attr('width', Math.max(1, x1 - x0)).attr('height', 14).attr('rx', 2).style('fill', COLOR(s)).style('opacity', OP[k]); } at += n; });
        g.append('text').attr('x', W - m.r + 10).attr('y', rh / 2 + 4).text(val(s));
        g.append('rect').attr('class', 'bb-hit').attr('width', W).attr('height', rh)
          .on('pointerenter pointermove', (ev) => tip.show(ev, D.names[s] + ', ' + title, ['first ' + c[0] + ', second ' + c[1] + ', third ' + c[2] + ', last ' + c[3], 'mean rank ' + FMT.d2(j.styles[s].mean_rank)]))
          .on('pointerleave', () => tip.hide());
      });
    });
  }

  // criterion against measurement: one row per pair, signed so that right means the score follows the measure
  function lol(host) {
    const list = el('div', 'bbv-lol'); host.appendChild(list);
    const head = el('div', 'bbv-lol-row bbv-lol-head'); head.append(el('div', 'bbv-lol-name', 'Score, and the measurement it is compared with'), el('div', '', 'opposite  ←  0  →  follows'), el('div', 'bbv-lol-val', 'all / same style'));
    list.appendChild(head);
    const tip = makeTip(host);
    D.validity.forEach((v) => {
      const sign = v.expected_sign || 1, a = v.across == null ? null : v.across * sign, w = v.within == null ? null : v.within * sign;
      const row = el('div', 'bbv-lol-row'), name = el('div', 'bbv-lol-name');
      name.append(el('b', '', v.criterion), el('span', '', 'against ' + v.label));
      const W = 250, H = 26, x = d3.scaleLinear().domain([-1, 1]).range([8, W - 8]);
      const svg = d3.create('svg').attr('class', 'bb-svg').attr('viewBox', '0 0 ' + W + ' ' + H).attr('role', 'img')
        .attr('aria-label', v.criterion + ' against ' + v.label + ': ' + (a == null ? 'not measured' : 'correlation ' + FMT.d2(a) + ' across all builds, ' + (w == null ? 'not available' : FMT.d2(w)) + ' among builds of the same style'));
      if (v.n >= 8) { const band = 1.96 / Math.sqrt(v.n - 1); svg.append('rect').attr('x', x(-band)).attr('width', x(band) - x(-band)).attr('y', 3).attr('height', H - 6).attr('rx', 3).style('fill', 'var(--bb-grid)').style('opacity', 0.55); }
      svg.append('line').attr('class', 'bb-grid').attr('x1', x(-1)).attr('x2', x(1)).attr('y1', H / 2).attr('y2', H / 2);
      svg.append('line').attr('class', 'bb-axis').attr('x1', x(0)).attr('x2', x(0)).attr('y1', 1).attr('y2', H - 1);
      if (w != null) svg.append('circle').attr('cx', x(w)).attr('cy', H / 2).attr('r', 5).style('fill', 'var(--bb-surface)').style('stroke', 'currentColor').style('stroke-width', 2);
      if (a != null) svg.append('circle').attr('cx', x(a)).attr('cy', H / 2).attr('r', 5.5).style('fill', 'currentColor').style('stroke', 'var(--bb-surface)').style('stroke-width', 1.5);
      const val = el('div', 'bbv-lol-val');
      if (a == null) val.append(el('span', 'bbv-lol-dim', 'not measured')); else val.append(el('b', '', FMT.d2(a)), el('span', 'bbv-lol-dim', ' / ' + (w == null ? '–' : FMT.d2(w))));
      const track = el('div'); track.appendChild(svg.node());
      row.append(name, track, val); list.appendChild(row);
      row.addEventListener('pointermove', (ev) => tip.show(ev, v.criterion + ' against ' + v.label, a == null ? ['Not measured'] : [
        'Across all ' + v.n + ' builds: ' + FMT.d2(a), 'Among builds of the same style: ' + (w == null ? 'not available' : FMT.d2(w)),
        'Chance alone stays within ±' + FMT.d2(1.96 / Math.sqrt(v.n - 1)) + ' for ' + v.n + ' builds']));
      row.addEventListener('pointerleave', () => tip.hide());
    });
  }

  // keys above the charts whose marks are not labelled one by one
  const sq = {borderRadius: '2px'};
  const KEYS = {
    'v-ranks': [['ranked first', {background: 'currentColor', ...sq}], ['second', {background: 'currentColor', opacity: OP[1], ...sq}], ['third', {background: 'currentColor', opacity: OP[2], ...sq}], ['last', {background: 'currentColor', opacity: OP[3], ...sq}]],
    'v-lol': [['across all 80 builds', {background: 'currentColor'}], ['among builds of the same style', {background: 'var(--bb-surface)', boxShadow: 'inset 0 0 0 2px currentColor'}], ['what chance alone gives', {background: 'var(--bb-grid)', ...sq}]],
  };
  function key(items) {
    const ul = el('ul', 'bb-keys');
    items.forEach(([label, style]) => { const li = el('li', 'bb-key'), sw = el('i', 'bb-sw'); Object.assign(sw.style, style); li.append(sw, label); ul.appendChild(li); });
    return ul;
  }
  const DRAW = {'v-strip': strip, 'v-ranks': ranks, 'v-lol': lol};
  function run() {
    document.querySelectorAll('.bb-chart[data-draw^="v-"]').forEach((host) => {
      const plot = el('div', 'bb-plot');
      Object.keys(host.dataset).forEach((k) => { plot.dataset[k] = host.dataset[k]; });
      host.replaceChildren(...(KEYS[host.dataset.draw] ? [key(KEYS[host.dataset.draw])] : []), plot);
      DRAW[host.dataset.draw](plot);
    });
  }
  let width = 0;
  window.addEventListener('resize', () => {     // a phone fires this on every scroll; only a new width needs a redraw
    if (document.documentElement.clientWidth === width) return;
    width = document.documentElement.clientWidth;
    run();
  });
  // labels are measured to lay a chart out, so wait for the page's fonts as well as the numbers
  Promise.all([fetch(new URL('verdict.json', HERE)).then((r) => r.json()), document.fonts ? document.fonts.ready : null])
    .then(([d]) => { D = d; width = document.documentElement.clientWidth; run(); }, () => {});
})();
