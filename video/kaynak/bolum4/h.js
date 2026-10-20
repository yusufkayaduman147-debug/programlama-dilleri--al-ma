// Chapter 4 helpers: step-revealed trace tables.
const { esc, nt, tree, grammar } = require("../ch3/h");

// rows: [[cells...], step]; cols: [{h, w, color, align}]
function trace(cols, rows, { fs = 26, hotLast = true } = {}) {
  const head = `<tr>${cols.map((c) => `<th style="text-align:${c.align || "left"};padding:8px 16px;color:var(--faint);font-weight:500;font-size:${fs - 4}px;width:${c.w || "auto"}">${c.h}</th>`).join("")}</tr>`;
  const body = rows.map(([cells, s], i) => {
    const next = rows[i + 1] ? rows[i + 1][1] : s + 30;
    const hot = hotLast ? Array.from({ length: Math.max(0, next - s) }, (_, k) => s + k).join(",") : "";
    return `<tr class="r rl tr" data-s="${s}" ${hot ? `data-hot="${hot}"` : ""}>${cells.map((c, j) => `<td class="mono" style="padding:7px 16px;text-align:${cols[j].align || "left"};color:var(--${cols[j].color || "text"});font-size:${fs}px;white-space:pre">${c}</td>`).join("")}</tr>`;
  }).join("");
  return `<table style="width:100%;border-collapse:collapse"><style>.tr td{transition:background .35s ease}.tr.hot td{background:rgba(255,181,71,.16)}.tr.hot td:first-child{box-shadow:inset 4px 0 0 var(--amber)}</style>${head}${body}</table>`;
}

module.exports = { esc, nt, tree, grammar, trace };
