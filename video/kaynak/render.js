// node render.js preview [ids...]  -> preview/<id>-<k>.jpg (final state of each step)
// node render.js video  [ids...]   -> clips/<id>.mp4 + timeline/<id>.json (needs audio/durations.json)
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");
const scenes = require(path.join(process.env.CHDIR || __dirname, "scenes.js"));

const FPS = 30, LEAD = 0.3, TAIL = 0.55;
const ROOT = process.env.CHDIR || __dirname;
const BRAND = process.env.BRAND || "Programlama Dilleri · Bölüm 1";
const [mode, ...only] = process.argv.slice(2);
const todo = scenes.filter((s) => !only.length || only.includes(s.id));

function pageHtml(s) {
  const hdr = s.chip === "" ? "" : `<div class="chip">${s.chip}</div><div class="brand">${BRAND}</div>`;
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><link rel="stylesheet" href="file://${path.join(__dirname, "style.css")}"></head>
<body><div id="stage">${hdr}${s.html}</div>
<script>
window.applyStep = (k) => {
  const q = (a) => document.querySelectorAll(a);
  q('[data-s]').forEach(e => e.classList.toggle('on', k >= +e.dataset.s));
  q('[data-h]').forEach(e => e.classList.toggle('gone', k >= +e.dataset.h));
  q('[data-hot]').forEach(e => e.classList.toggle('hot', String(e.dataset.hot).split(',').map(Number).includes(k)));
  q('[data-dim]').forEach(e => e.classList.toggle('dim', k >= +e.dataset.dim));
};
window.go = (k) => {
  const st = document.getElementById('stage');
  if (k === 'out') st.classList.add('out'); else { st.classList.add('in'); applyStep(k); }
  document.body.offsetHeight;
  const as = document.getAnimations(); as.forEach(a => a.pause()); window.__as = as;
  let m = 0; for (const a of as) { const t = a.effect.getComputedTiming().endTime; if (isFinite(t)) m = Math.max(m, t); }
  return Math.min(m, 4000);
};
window.seek = (t) => window.__as.forEach(a => { a.currentTime = t; });
window.fin = () => window.__as.forEach(a => { try { a.finish(); } catch (e) { a.cancel(); } });
</script></body></html>`;
}

async function open(browser, s) {
  fs.mkdirSync(path.join(ROOT, "pages"), { recursive: true });
  const file = path.join(ROOT, "pages", `${s.id}.html`);
  fs.writeFileSync(file, pageHtml(s));
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto("file://" + file);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => applyStep(-1));
  await page.waitForTimeout(50);
  return page;
}

async function preview(browser, s) {
  const page = await open(browser, s);
  fs.mkdirSync(path.join(ROOT, "preview"), { recursive: true });
  for (let k = 0; k < s.n.length; k++) {
    await page.evaluate((k) => go(k), k);
    await page.evaluate(() => fin());
    await page.screenshot({ path: path.join(ROOT, "preview", `${s.id}-${k}.jpg`), type: "jpeg", quality: 80 });
  }
  await page.close();
}

async function video(browser, s, durs) {
  const page = await open(browser, s);
  const fdir = path.join(ROOT, "frames", s.id);
  fs.rmSync(fdir, { recursive: true, force: true });
  fs.mkdirSync(fdir, { recursive: true });
  const list = []; // [file, frames]
  let idx = 0;
  const shot = async (frames) => {
    const f = `f${String(idx++).padStart(5, "0")}.jpg`;
    for (let t = 0; ; t++) {
      try { await page.screenshot({ path: path.join(fdir, f), type: "jpeg", quality: 92, timeout: 120000 }); break; }
      catch (e) { if (t >= 3) throw e; console.error("retry screenshot", s.id, f); }
    }
    list.push([f, frames]);
  };
  const steps = [];
  const runStep = async (k, minFrames) => {
    const end = await page.evaluate((k) => go(k), k);
    const n = Math.ceil(end / (1000 / FPS));
    for (let i = 0; i < n; i++) { await page.evaluate((t) => seek(t), (i * 1000) / FPS); await shot(1); }
    await page.evaluate(() => fin());
    const total = Math.max(n + 8, minFrames);
    await shot(total - n);
    return total;
  };
  for (let k = 0; k < s.n.length; k++) {
    const audio = durs[s.id][k];
    const total = await runStep(k, Math.round((LEAD + audio + TAIL) * FPS));
    steps.push({ frames: total, lead: Math.round(LEAD * FPS) });
  }
  // fade out
  const end = await page.evaluate(() => go("out"));
  const n = Math.max(1, Math.ceil(end / (1000 / FPS)));
  for (let i = 0; i < n; i++) { await page.evaluate((t) => seek(t), (i * 1000) / FPS); await shot(1); }
  steps.push({ frames: n, lead: 0, out: true });
  await page.close();

  // ffconcat: durations in exact frame multiples
  let txt = "ffconcat version 1.0\n";
  for (const [f, fr] of list) txt += `file '${f}'\nduration ${(fr / FPS).toFixed(6)}\n`;
  txt += `file '${list[list.length - 1][0]}'\n`;
  fs.writeFileSync(path.join(fdir, "list.txt"), txt);
  fs.mkdirSync(path.join(ROOT, "clips"), { recursive: true });
  const totalFrames = list.reduce((a, [, fr]) => a + fr, 0);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", path.join(fdir, "list.txt"),
    "-vf", `fps=${FPS},format=yuv420p`, "-frames:v", String(totalFrames), "-c:v", "libx264", "-preset", "medium", "-crf", "23",
    "-tune", "animation", "-g", "120", path.join(ROOT, "clips", `${s.id}.mp4`)]);
  fs.mkdirSync(path.join(ROOT, "timeline"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "timeline", `${s.id}.json`), JSON.stringify({ id: s.id, totalFrames, steps }));
  fs.rmSync(fdir, { recursive: true, force: true });
  console.log(s.id, (totalFrames / FPS).toFixed(1) + "s");
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const durs = mode === "video" ? JSON.parse(fs.readFileSync(path.join(ROOT, "audio", "durations.json"))) : null;
  const conc = 4;
  const queue = [...todo];
  await Promise.all(Array.from({ length: conc }, async () => {
    while (queue.length) {
      const s = queue.shift();
      if (mode === "preview") await preview(browser, s);
      else await video(browser, s, durs);
    }
  }));
  await browser.close();
})();
