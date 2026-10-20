// Chapter 2 helpers: year timeline motif and language header.
const Y0 = 1940, Y1 = 2005;
const X = (y) => ((y - Y0) / (Y1 - Y0)) * 100;

// thin timeline at the bottom of the stage; `y` = highlighted year (or [from, to])
function tl(y, color = "amber") {
  const ys = Array.isArray(y) ? y : [y];
  const ticks = [1940, 1950, 1960, 1970, 1980, 1990, 2000].map((d) => `
    <div style="position:absolute;left:${X(d)}%;top:12px;width:2px;height:12px;background:#2a3160"></div>
    <div class="mono" style="position:absolute;left:${X(d)}%;top:30px;transform:translateX(-50%);font-size:18px;color:#6b7399">${d}</div>`).join("");
  const span = ys.length > 1 ? `<div style="position:absolute;left:${X(ys[0])}%;width:${X(ys[1]) - X(ys[0])}%;top:14px;height:8px;border-radius:4px;background:var(--${color});opacity:.55"></div>` : "";
  return `<style>.wrap{bottom:130px !important}</style><div class="r" data-s="0" style="position:absolute;left:0;right:0;bottom:-112px;height:56px">
    <div style="position:absolute;left:0;right:0;top:17px;height:2px;background:#2a3160"></div>${ticks}${span}
    <div style="position:absolute;left:${X(ys[0])}%;top:6px;width:24px;height:24px;margin-left:-12px;border-radius:50%;background:var(--${color});box-shadow:0 0 18px var(--${color})"></div>
    <div class="mono" style="position:absolute;left:${X(ys[0])}%;top:-26px;transform:translateX(-50%);font-size:22px;font-weight:700;color:var(--${color})">${ys.length > 1 ? ys[0] + "–" + ys[1] : ys[0]}</div></div>`;
}

// big title row: language name + meta (who, where)
function head(name, meta, color = "amber", s = 0) {
  return `<div class="r" data-s="${s}" style="display:flex;align-items:baseline;gap:30px;margin-bottom:30px">
    <h2 class="t" style="margin:0;color:var(--${color})">${name}</h2>
    <span style="font-size:30px;color:var(--muted)">${meta}</span></div>`;
}

module.exports = { tl, head };
