// Chapter 3 helpers: auto-laid-out parse trees, nonterminal spans, derivation lists.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// <expr> styled as nonterminal (HTML)
const nt = (n) => `<span class="mono" style="color:var(--violet)">&lt;${n}&gt;</span>`;

// node: string leaf ("a") or { t, s, c: [...], v, vs, hot }
// opts: { dx, dy, w, h, s (default step), fs }
function tree(root, o = {}) {
  const dx = o.dx || 110, dy = o.dy || 100, fs = o.fs || 26, S = o.s || 0;
  const norm = (n, s) => (typeof n === "string" ? { t: n, s } : { ...n, s: n.s ?? s, c: (n.c || []).map((k) => norm(k, n.s ?? s)) });
  const r = norm(root, S);
  let leaf = 0, maxD = 0;
  const place = (n, d) => {
    n.d = d; maxD = Math.max(maxD, d);
    if (!n.c || !n.c.length) { n.x = leaf++ * dx; return; }
    n.c.forEach((k) => place(k, d + 1));
    n.x = (n.c[0].x + n.c[n.c.length - 1].x) / 2;
  };
  place(r, 0);
  const W = Math.max(1, leaf - 1) * dx + 280, H = maxD * dy + 100;
  const out = [], nodes = [];
  const walk = (n) => {
    const x = n.x + 130, y = n.d * dy + 46;
    (n.c || []).forEach((k) => {
      out.push(`<line class="r rf" data-s="${k.s}" x1="${x}" y1="${y + 22}" x2="${k.x + 130}" y2="${k.d * dy + 46 - 22}" stroke="#3a4278" stroke-width="2.5"/>`);
      walk(k);
    });
    const isNT = /^<.*>$/.test(n.t) || (n.c && n.c.length);
    const w = Math.max(48, esc(n.t).replace(/&\w+;/g, "x").length * fs * 0.62 + 26);
    const col = isNT ? "#a493ff" : "#35d0c0";
    nodes.push(`<g class="r rp anim tn" data-s="${n.s}" ${n.hot !== undefined ? `data-hot="${n.hot}"` : ""} style="transform-box:fill-box;transform-origin:center">
      <rect x="${x - w / 2}" y="${y - 22}" width="${w}" height="44" rx="${isNT ? 10 : 22}" fill="#151a31" stroke="${col}" stroke-width="2.5"/>
      <text x="${x}" y="${y + fs * 0.34}" fill="#eef0fa" font-size="${fs}" text-anchor="middle" font-family="JBM">${esc(n.t)}</text></g>`);
    if (n.v !== undefined) nodes.push(`<g class="r rp" data-s="${n.vs ?? n.s}" style="transform-box:fill-box;transform-origin:center"><circle cx="${x + w / 2 + 6}" cy="${y - 24}" r="22" fill="#ffb547"/><text x="${x + w / 2 + 6}" y="${y - 16}" fill="#0c0f1e" font-size="22" font-weight="800" text-anchor="middle">${esc(n.v)}</text></g>`);
  };
  walk(r);
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:100%;max-height:${o.maxH || 640}px"><style>.tn.hot rect{stroke:#ffb547;stroke-width:5;fill:#2a2f55}</style>${out.join("")}${nodes.join("")}</svg>`;
}

// derivation lines: [[text, step], ...]; text may contain <x> (escaped), first line no arrow
function deriv(lines, fs = 30) {
  return `<div class="code" style="padding:20px 30px"><pre style="padding:0;font-size:${fs}px;line-height:1.55">${lines.map(([t, s, hot], i) =>
    `<span class="ln r rl" data-s="${s}" ${hot !== undefined ? `data-hot="${hot}"` : ""}>${i ? '<span class="op">⇒ </span>' : "  "}${esc(t).replace(/&lt;(\w+)&gt;/g, '<span style="color:#a493ff">&lt;$1&gt;</span>')}</span>`).join("")}</pre></div>`;
}

// grammar rules block: [[lhs, rhs], ...]
function grammar(rules, fs = 28, s = 0) {
  return `<div class="code" style="padding:20px 30px"><pre style="padding:0;font-size:${fs}px;line-height:1.6">${rules.map(([l, r, rs]) =>
    `<span class="ln ${rs !== undefined ? "r rl" : ""}" ${rs !== undefined ? `data-s="${rs}"` : ""}>${esc(l).replace(/&lt;(\w+)&gt;/g, '<span style="color:#a493ff">&lt;$1&gt;</span>')} <span class="op">→</span> ${esc(r).replace(/&lt;(\w+)&gt;/g, '<span style="color:#a493ff">&lt;$1&gt;</span>')}</span>`).join("")}</pre></div>`;
}

module.exports = { esc, nt, tree, deriv, grammar };
