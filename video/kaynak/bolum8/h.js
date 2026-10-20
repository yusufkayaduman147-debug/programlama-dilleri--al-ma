// Chapter 8 helpers: stack frames and memory cells.
const { trace } = require("../ch4/h");

const C = { t: "teal", a: "amber", v: "violet", c: "coral", g: "green", m: "line" };

// frame(title, [[name, value, opts]], {c, s, h, w}) — opts: {s, h, hot, col}
function frame(title, rows, { c = "v", s, h, w = 300, fs = 26, extra = "" } = {}) {
  const at = (o) => `${o.s !== undefined ? `data-s="${o.s}"` : ""} ${o.h !== undefined ? `data-h="${o.h}"` : ""} ${o.hot ? `data-hot="${o.hot}"` : ""}`;
  const body = rows.map(([n, v, o = {}]) => `<div class="${o.s !== undefined || o.h !== undefined ? "r " : ""}fr" ${at(o)} style="display:flex;justify-content:space-between;align-items:center;padding:7px 16px;border-top:1px solid var(--line);font-family:JBM;font-size:${fs}px"><span style="color:var(--muted)">${n}</span><span style="color:var(--${o.col || "text"});font-weight:700">${v}</span></div>`).join("");
  return `<div class="${s !== undefined || h !== undefined ? "r " : ""}" ${at({ s, h })} style="width:${w}px;border:2px solid var(--${C[c] || c});border-radius:14px;overflow:hidden;background:var(--panel);${extra}"><div style="padding:8px 16px;font-size:${fs - 4}px;font-weight:700;color:var(--${C[c] || c});background:rgba(255,255,255,.03)">${title}</div>${body}</div>`;
}

// value that changes over steps: vals = [[text, s, h]]
const sw = (vals, col = "text") => `<span class="stack" style="display:inline-grid">${vals.map(([t, s, h]) => `<span class="r" data-s="${s}" ${h !== undefined ? `data-h="${h}"` : ""} style="color:var(--${col})">${t}</span>`).join("")}</span>`;

const FRCSS = `<style>.fr{transition:background .35s ease}.fr.hot{background:rgba(255,181,71,.16)}</style>`;

module.exports = { trace, frame, sw, FRCSS };
