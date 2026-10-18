// Shared helpers for scene markup.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const KW = {
  c: "int|float|char|double|void|return|while|if|else|for|static|struct|printf|include|define|goto",
  java: "class|int|float|double|void|return|while|if|else|for|new|try|catch|public|static|String|System|true|false",
  scheme: "define|lambda|cond|else",
  prolog: "is",
  fortran: "INDEX|INTEGER|DIMENSION",
  pascal: "function|var|integer|string|begin|end|for|to|do|if|then|Exit|Length|Copy",
  asm: "A|AR|ADDL|MOV|ADD",
  text: "",
};
const CM = { c: /\/\/.*|\/\*.*?\*\//, java: /\/\/.*/, scheme: /;.*/, prolog: /%.*/, fortran: /!.*/, pascal: /\{.*?\}/, asm: /;.*/, text: /(?!)/ };

function hi(line, lang) {
  if (lang === "plain") return esc(line);
  const kw = KW[lang] ? new RegExp(`^(?:${KW[lang]})$`) : null;
  const re = new RegExp(`(${CM[lang].source})|("[^"]*"|'[^']*')|(\\b\\d+(?:\\.\\d+)?\\b)|(#\\w+|[A-Za-zÇĞİÖŞÜçğıöşü_][\\wÇĞİÖŞÜçğıöşü]*)|([^\\w\\s])`, "g");
  let out = "", last = 0, m;
  while ((m = re.exec(line))) {
    out += esc(line.slice(last, m.index));
    const [tok, cm, str, num, word, op] = m;
    if (cm) out += `<span class="cm">${esc(tok)}</span>`;
    else if (str) out += `<span class="s">${esc(tok)}</span>`;
    else if (num) out += `<span class="n">${tok}</span>`;
    else if (word) {
      const next = line.slice(m.index + tok.length);
      if (tok.startsWith("#") || (kw && kw.test(tok))) out += `<span class="k">${esc(tok)}</span>`;
      else if (/^\s*\(/.test(next)) out += `<span class="fn">${esc(tok)}</span>`;
      else out += esc(tok);
    } else if (op) out += `<span class="op">${esc(tok)}</span>`;
    last = m.index + tok.length;
  }
  return out + esc(line.slice(last));
}

// lines: array of strings or {t, s, h, hot}; s = step it appears, hot = "2,3"
function code(file, lines, { lang = "c", cls = "", attrs = "" } = {}) {
  const body = lines.map((l) => {
    const o = typeof l === "string" ? { t: l } : l;
    const a = [];
    let c = "ln";
    if (o.s !== undefined) { a.push(`data-s="${o.s}"`); c += " r rl"; }
    if (o.h !== undefined) a.push(`data-h="${o.h}"`);
    if (o.hot !== undefined) a.push(`data-hot="${o.hot}"`);
    return `<span class="${c}" ${a.join(" ")}>${hi(o.t, o.lang || lang) || " "}</span>`;
  }).join("");
  return `<div class="code ${cls}" ${attrs}><div class="bar"><i></i><i></i><i></i><span>${esc(file)}</span></div><pre>${body}</pre></div>`;
}

module.exports = { esc, code, hi };
