const s = require("./scenes");
console.log(JSON.stringify(s.map((x) => ({ id: x.id, ch: x.ch, steps: x.n.map((n) => (typeof n === "string" ? { t: n, pause: 0 } : { t: n.t, pause: n.pause || 0 })) }))));
