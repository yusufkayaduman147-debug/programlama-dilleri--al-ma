const { code } = require("../build/lib");
const { nt, tree, grammar, trace } = require("./h");

const quiz = [
  ["Sözcüksel ve sentaks analizini ayırmanın üç nedeni nedir?", "Basitlik, verimlilik ve taşınabilirlik."],
  ["Özyinelemeli iniş ayrıştırıcıda her terminal olmayan neye karşılık gelir?", "Kendi alt programına (fonksiyonuna)."],
  ["A → A + B gibi bir kural neden yukarıdan aşağıya ayrıştırıcıda sorun çıkarır?", "Sol özyineleme: A'nın fonksiyonu kendini sonsuza kadar çağırır."],
  ["Shift-reduce ayrıştırıcının iki temel hareketi nedir?", "Shift: sonraki token'ı yığına at. Reduce: yığının tepesindeki tutamağı kuralın sol tarafıyla değiştir."],
  ["LR ayrıştırma tablosunun iki bileşeni nedir?", "ACTION tablosu ve GOTO tablosu."],
];

module.exports = [
// ───────── 4.4 recursive descent
{
  id: "rd-idea", ch: "4.4 Özyinelemeli iniş ayrıştırma", chip: "<b>4.4</b> Özyinelemeli iniş ayrıştırma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Her terminal olmayana <em>bir fonksiyon</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="r" data-s="0">${grammar([["<expr>", "<term> {(+ | -) <term>}"], ["<term>", "<factor> {(* | /) <factor>}"], ["<factor>", "id | ( <expr> )"]], 28)}</div>
        <ul class="b r" data-s="1"><li style="font-size:27px">Gramerdeki her terminal olmayan için o yapıyı ayrıştıran <b>bir alt program</b></li><li style="font-size:27px"><b>EBNF</b> idealdir: terminal olmayan sayısını en aza indirir</li></ul>
        <div class="card r" data-s="2" style="padding:20px 26px"><h3 style="font-size:28px">Kodlama kuralı</h3><p style="font-size:24px">Sağ taraftaki her <b class="tl">terminal</b> → sonraki token'la karşılaştır; eşleşirse <span class="mono">lex()</span>, değilse hata.<br>Her <b class="vl">terminal olmayan</b> → onun fonksiyonunu çağır.</p></div>
      </div>
      <div class="col f1 r" data-s="1" style="justify-content:center;gap:20px">
        ${[["<expr>", "expr()"], ["<term>", "term()"], ["<factor>", "factor()"]].map(([a, b]) => `<div style="display:flex;align-items:center;gap:20px;font-size:32px"><span class="mono" style="color:var(--violet);width:200px">${a.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span><span class="arrow">⟶</span><span class="mono" style="color:var(--teal)">void ${b}</span></div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 4.4: Özyinelemeli iniş ayrıştırma. En yaygın yukarıdan aşağıya ayrıştırma yöntemidir. Bu basit ifade gramerini kullanacağız: ifade, terimlerin artı ya da eksiyle birleşmesi; terim, faktörlerin çarpı ya da bölüyle birleşmesi; faktör ise bir tanıtıcı ya da parantez içinde bir ifade.",
    "Fikir çok basit: gramerdeki her terminal olmayan için, o yapıyı ayrıştıran bir alt program yazılır: expr, term ve factor fonksiyonları. EBNF bu yöntem için idealdir, çünkü terminal olmayan sayısını en aza indirir.",
    "Kodlama kuralı da basit: sağ taraftaki her terminal için, onu sonraki token'la karşılaştır; eşleşirse lex'i çağırıp ilerle, eşleşmezse hata ver. Her terminal olmayan için ise onun fonksiyonunu çağır. Bir kural daha: her ayrıştırma fonksiyonu, bir sonraki token'ı nextToken değişkeninde bırakır.",
  ],
},
{
  id: "rd-code", ch: "4.4 Özyinelemeli iniş ayrıştırma", chip: "<b>4.4</b> expr() ve factor()",
  html: `
  <div class="wrap">
    <div class="grid2" style="flex:1;gap:36px">
      <div class="col r" data-s="0">
        ${code("expr.c — <expr> → <term> {(+ | -) <term>}", ["void expr() {", { t: "  term();", hot: "0" }, { t: "  while (nextToken == PLUS_CODE ||", hot: "1" }, { t: "         nextToken == MINUS_CODE) {", hot: "1" }, { t: "    lex();", hot: "1" }, { t: "    term();", hot: "1" }, "  }", "}"], { lang: "c", cls: "sm" })}
        <p class="lead" style="font-size:25px">EBNF'teki <span class="mono hl">{ }</span> → bir <b>while</b> döngüsü.</p>
      </div>
      <div class="col r" data-s="2">
        ${code("factor.c — <factor> → id | ( <expr> )", ["void factor() {", { t: "  if (nextToken == ID_CODE)", hot: "3" }, { t: "    lex();", hot: "3" }, { t: "  else if (nextToken == LEFT_PAREN_CODE) {", hot: "4" }, { t: "    lex();", hot: "4" }, { t: "    expr();", hot: "4" }, { t: "    if (nextToken == RIGHT_PAREN_CODE) lex();", hot: "4" }, { t: "    else error();", hot: "4" }, { t: "  } else error();", hot: "5" }, "}"], { lang: "c", cls: "sm" })}
        <p class="lead" style="font-size:25px">Birden çok sağ taraf → <b>sonraki token</b>'a bakarak seç.</p>
      </div>
    </div>
  </div>`,
  n: [
    "İşte expr fonksiyonu. Kural, bir terimle başla diyor; o yüzden önce term çağrılıyor.",
    "Sonra, EBNF'teki süslü parantez bir while döngüsüne dönüşüyor: sonraki token artı ya da eksi olduğu sürece, lex ile o işleci geç ve bir terim daha ayrıştır.",
    "factor fonksiyonu daha ilginç, çünkü kuralın iki sağ tarafı var. Hangisinin seçileceğine sonraki token'a bakarak karar veriliyor.",
    "Token bir tanıtıcıysa, lex ile geçip bitiriyoruz.",
    "Token sol parantezse, onu geçiyor, içerideki ifadeyi ayrıştırmak için expr'i çağırıyor ve ardından sağ parantez bekliyoruz. Gelmezse hata. Dikkat edin: factor, expr'i çağırıyor; işte özyineleme buradan geliyor.",
    "Token hiçbir sağ tarafın başlangıcıyla eşleşmiyorsa bu bir sentaks hatasıdır.",
  ],
},
{
  id: "rd-trace", ch: "4.4 Özyinelemeli iniş ayrıştırma", chip: "<b>4.4</b> Çağrı izi: a + b * c",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Çağrı izi: <span class="mono hl">a + b * c</span></h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="f1 r" data-s="0">${tree({ t: "expr()", s: 0, c: [{ t: "term()", s: 1, c: [{ t: "factor()", s: 1, c: [{ t: "a", s: 1 }] }] }, { t: "+", s: 2 }, { t: "term()", s: 3, c: [{ t: "factor()", s: 3, c: [{ t: "b", s: 3 }] }, { t: "*", s: 4 }, { t: "factor()", s: 4, c: [{ t: "c", s: 4 }] }] }] }, { dx: 130, dy: 120, fs: 28, maxH: 620 })}</div>
      <div class="col" style="width:560px;gap:12px">
        ${[["expr() başlar → term()", 0], ["term() → factor() → a ✓, lex()", 1], ["nextToken = + → döngü: lex(), term()", 2], ["term() → factor() → b ✓", 3], ["nextToken = * → factor() → c ✓", 4], ["nextToken = EOF → hepsi döner ✓", 5]]
          .map(([t, s]) => `<div class="card r rl" data-s="${s}" style="padding:14px 20px;font-family:JBM;font-size:22px">${t}</div>`).join("")}
        <div class="note r" data-s="5" style="font-size:24px">Çağrı ağacı = <b>ayrıştırma ağacı</b>. Çarpma, ayrı bir term() çağrısında kaldığı için önceliği kendiliğinden doğru.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Şimdi a artı b çarpı c girdisini ayrıştırırken fonksiyonların nasıl çağrıldığını izleyelim. Her şey expr ile başlıyor; expr önce term'i çağırıyor.",
    "term, factor'ı çağırıyor; factor a tanıtıcısını görüyor, lex ile geçiyor ve dönüyor.",
    "expr'e geri döndüğümüzde sonraki token artı. Döngü çalışıyor: artıyı geçiyor ve yeni bir term çağırıyoruz.",
    "Bu term, factor üzerinden b'yi ayrıştırıyor.",
    "term'in kendi döngüsü çarpıyı görüyor, onu geçiyor ve bir factor daha çağırıyor: c.",
    "Girdi bitti; bütün fonksiyonlar sırayla dönüyor ve ayrıştırma başarılı. Dikkat ederseniz fonksiyon çağrılarının oluşturduğu ağaç, ayrıştırma ağacının ta kendisi. Çarpma, ayrı bir term çağrısının içinde kaldığı için işlem önceliği de kendiliğinden doğru çıkıyor.",
  ],
},
{
  id: "ll-problems", ch: "4.4 Özyinelemeli iniş ayrıştırma", chip: "<b>4.4</b> LL gramerlerinin iki şartı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Yukarıdan aşağıya ayrıştırmanın <em>iki düşmanı</em></h2>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card tint-c r" data-s="1" style="display:flex;flex-direction:column"><h3 class="cl">1. Sol özyineleme</h3>
        <div class="mono" style="font-size:30px;margin:10px 0">A → A + B</div>
        <p style="font-size:25px"><span class="mono">A()</span> ilk iş olarak yine <span class="mono">A()</span>'yı çağırır → <b>sonsuz özyineleme</b>.</p>
        <div class="r" data-s="2" style="margin-top:auto">
          <p style="font-size:24px;margin-bottom:10px">Çözüm: dönüştür</p>
          ${code("sol özyineleme kaldırma", ["A  → A x | y", "        ⇓", "A  → y A'", "A' → x A' | ε"], { lang: "plain", cls: "xs" })}</div></div>
      <div class="card tint-v r" data-s="3" style="display:flex;flex-direction:column"><h3 class="vl">2. Çiftli ayrıklık</h3>
        <p style="font-size:25px">Tek token'a bakarak sağ tarafı seçebilmek için: <span class="mono">FIRST(αᵢ) ∩ FIRST(αⱼ) = ∅</span></p>
        <div class="col" style="gap:8px;margin-top:12px;font-family:JBM;font-size:27px"><span>A → a | bB | cAb <span class="tl">✓</span></span><span>A → a | aB <span class="cl">✕ ikisi de a ile başlar</span></span></div>
        <div class="r" data-s="4" style="margin-top:auto">
          <p style="font-size:24px;margin-bottom:10px">Çözüm: sol çarpanlara ayırma (left factoring)</p>
          ${code("left factoring", ["<var> → id | id [ <expr> ]", "        ⇓", "<var> → id [ [ <expr> ] ]"], { lang: "plain", cls: "xs" })}</div></div>
    </div>
  </div>`,
  n: [
    "Her gramer yukarıdan aşağıya ayrıştırmaya uygun değildir. Uygun olanlara LL gramerleri denir ve iki önemli şartları vardır.",
    "Birincisi: sol özyineleme olmamalı. A ok A artı B gibi bir kural düşünün. A fonksiyonu ilk iş olarak yine A'yı çağırır, o da yine A'yı... Hiç token tüketmeden sonsuz bir özyinelemeye girer.",
    "Neyse ki sol özyineleme kaldırılabilir. A ok A x ya da y kuralı, A ok y A üssü ve A üssü ok x A üssü ya da boş kurallarına dönüştürülür. Aynı dili üretir, ama artık sağa özyinelemelidir.",
    "İkincisi: çiftli ayrıklık. Ayrıştırıcı tek bir token'a bakarak hangi sağ tarafı seçeceğine karar verebilmelidir. Bunun için bir terminal olmayanın sağ taraflarının FIRST kümeleri, yani üretebilecekleri ilk terminaller, kesişmemelidir. a, bB, cAb uygundur; ama a ve aB ikisi de a ile başladığı için uygun değildir.",
    "Bu sorun sol çarpanlara ayırma ile çözülebilir. Değişken ya bir tanıtıcı ya da tanıtıcı ve köşeli parantez içinde bir ifadedir kuralını, tanıtıcı ve ardından isteğe bağlı bir köşeli parantez kısmı olarak yeniden yazarız. Artık ortak başlangıç tek bir yerde.",
  ],
},
{
  id: "first-follow", ch: "4.4 Özyinelemeli iniş ayrıştırma", chip: "<b>4.4</b> FIRST ve FOLLOW kümeleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Tablo güdümlü LL(1): <em>FIRST ve FOLLOW</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:640px">
        <div class="r" data-s="0">${code("gramer", ["exp    → term exp'", "exp'   → addop term exp' | ε", "addop  → + | -", "term   → factor term'", "term'  → mulop factor term' | ε", "mulop  → *", "factor → ( exp ) | num"], { lang: "plain", cls: "xs" })}</div>
        <div class="card r" data-s="1" style="padding:16px 22px"><p style="font-size:23px"><b class="tl">FIRST(X)</b>: X'ten türetilebilen cümlelerin <b>ilk terminalleri</b></p></div>
        <div class="card r" data-s="2" style="padding:16px 22px"><p style="font-size:23px"><b class="hl">FOLLOW(A)</b>: bir cümlesel biçimde A'nın <b>hemen ardından</b> gelebilecek terminaller ($ = girdi sonu)</p></div>
      </div>
      <div class="f1">${trace([{ h: "", color: "violet" }, { h: "FIRST", color: "teal" }, { h: "FOLLOW", color: "amber" }],
        [[["exp", "( num", "$ )"], 1], [["exp'", "+ - ε", "$ )"], 1], [["addop", "+ -", "( num"], 1], [["term", "( num", "+ - ) $"], 1], [["term'", "* ε", "+ - ) $"], 1], [["mulop", "*", "( num"], 1], [["factor", "( num", "* + - ) $"], 1]], { fs: 28, hotLast: false })}
        <style>#ff td:nth-child(3){}</style>
        <p class="r" data-s="3" style="font-size:24px;color:var(--muted);margin-top:16px">Bir kural ε üretebiliyorsa, karar <b style="color:var(--amber)">FOLLOW</b> kümesine bakılarak verilir.</p></div>
    </div>
  </div>`,
  n: [
    "Özyinelemeli iniş, ayrıştırıcıyı kod olarak yazar. Aynı fikir bir tabloyla da gerçekleştirilebilir: tablo güdümlü LL(1) ayrıştırıcı. Soldaki gramer, sol özyinelemesi kaldırılmış ifade grameri. Tabloyu kurmak için iki kümeye ihtiyacımız var.",
    "FIRST kümesi: bir sembolden türetilebilecek cümlelerin ilk terminalleri. Örneğin bir faktör ya sol parantezle ya da bir sayıyla başlar; terim ve ifade de faktörle başladığı için onların FIRST kümesi de aynıdır.",
    "FOLLOW kümesi ise bir terminal olmayanın hemen ardından gelebilecek terminallerdir; dolar işareti girdinin sonunu gösterir. Örneğin bir ifadeden sonra ya girdi biter ya da bir sağ parantez gelir.",
    "Bir kural boş dizi, yani epsilon üretebiliyorsa, o kuralın ne zaman seçileceğine FOLLOW kümesine bakılarak karar verilir. Örneğin exp üssü, sonraki token dolar ya da sağ parantezse boşa iner.",
  ],
},
{
  id: "ll1-trace", ch: "4.4 Özyinelemeli iniş ayrıştırma", chip: "<b>4.4</b> LL(1) ayrıştırma: n + n",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">LL(1) ayrıştırma: <span class="mono hl">n + n</span></h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="f1">${trace([{ h: "Yığın (tepe solda)", color: "violet" }, { h: "Girdi", color: "teal", align: "right" }, { h: "Hareket", color: "amber" }], [
        [["exp $", "n + n $", "exp → term exp'"], 1], [["term exp' $", "n + n $", "term → factor term'"], 1], [["factor term' exp' $", "n + n $", "factor → num"], 1], [["n term' exp' $", "n + n $", "eşleş ✓"], 2],
        [["term' exp' $", "+ n $", "term' → ε"], 2], [["exp' $", "+ n $", "exp' → addop term exp'"], 3], [["addop term exp' $", "+ n $", "addop → +"], 3], [["+ term exp' $", "+ n $", "eşleş ✓"], 3],
        [["term exp' $", "n $", "term → factor term'"], 4], [["factor term' exp' $", "n $", "factor → num"], 4], [["n term' exp' $", "n $", "eşleş ✓"], 4], [["term' exp' $", "$", "term' → ε"], 5], [["exp' $", "$", "exp' → ε"], 5], [["$", "$", "KABUL ✓"], 5]], { fs: 23 })}</div>
      <div class="col" style="width:420px">
        <div class="card r" data-s="0" style="padding:18px 22px"><h3 style="font-size:26px">Algoritma</h3><p style="font-size:21px;line-height:1.5">Tepede <b>terminal</b> ve girdiyle aynıysa → pop, ilerle<br>Tepede <b>terminal olmayan A</b> ise → tablodan M[A, token] kuralını al, A'yı pop et, sağ tarafı push et<br><span class="mono">$ / $</span> → kabul</p></div>
        <div class="note r" data-s="5" style="font-size:22px"><b>LL(1) gramer:</b> tablonun her hücresinde en fazla <b>bir</b> kural olmalı.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Tablo güdümlü bir LL(1) ayrıştırıcının n artı n girdisini nasıl ayrıştırdığını izleyelim. Algoritma şöyle: yığının tepesinde bir terminal varsa ve girdideki token'la aynıysa, ikisini de atarız. Tepede bir terminal olmayan varsa, tablodan o terminal olmayan ve sonraki token için kuralı alır, terminal olmayanı yığından çıkarıp kuralın sağ tarafını yığına koyarız.",
    "Başlangıçta yığında exp var, girdi n. Tablo exp için term exp üssü diyor; sonra term faktöre, faktör de num kuralına açılıyor.",
    "Yığının tepesinde artık n var ve girdide de n var: eşleştir, ikisini de at. Sonraki token artı; term üssü için tablo epsilon diyor, çünkü artı term üssünün FOLLOW kümesinde.",
    "exp üssü için ise artı geldiğinde addop term exp üssü kuralı seçiliyor; addop da artıya iniyor ve artı eşleşiyor.",
    "Kalan term yine faktör ve num üzerinden ikinci n ile eşleşiyor.",
    "Girdi bitti, sonraki token dolar. term üssü ve exp üssü epsilona iniyor; yığında da sadece dolar kalıyor. Dolar dolarla eşleşti: girdi kabul edildi. Bu yöntemin çalışması için gramerin LL(1) olması gerekir: tablonun her hücresinde en fazla bir kural bulunmalıdır.",
  ],
},
// ───────── 4.5 bottom-up
{
  id: "bottom-up", ch: "4.5 Aşağıdan yukarıya ayrıştırma", chip: "<b>4.5</b> Aşağıdan yukarıya ayrıştırma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aşağıdan yukarıya: <em>shift</em> ve <em>reduce</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:760px">
        <ul class="b r" data-s="0"><li style="font-size:27px">Sağa dayalı türetmeyi <b>soldan sağa, tersten</b> taklit eder → <b>LR</b> ayrıştırma</li><li style="font-size:27px">Açık bir <b>yığın</b> kullanır</li><li style="font-size:27px">Yukarıdan aşağıya ayrıştırmadan <b>daha güçlü</b>; sol özyineleme sorun değil</li></ul>
        <div class="card r" data-s="1" style="padding:20px 26px"><h3 style="font-size:28px">Gösterim</h3><p style="font-size:24px">Dizi <b class="hl">|</b> işaretiyle ikiye ayrılır: solu = yığın (terminal + terminal olmayan), sağı = henüz okunmamış girdi.</p><div class="mono" style="font-size:30px;margin-top:10px">ABC <span class="hl">|</span> xyz</div></div>
      </div>
      <div class="col f1">
        <div class="card tint-t r" data-s="2"><h3 class="tl">Shift</h3><p style="font-size:25px">| işaretini bir sağa kaydır: sonraki token yığına girer.</p><div class="mono" style="font-size:28px;margin-top:10px">ABC<span class="hl">|</span>xyz ⟹ ABCx<span class="hl">|</span>yz</div></div>
        <div class="card tint-v r" data-s="3"><h3 class="vl">Reduce</h3><p style="font-size:25px">Yığının tepesi bir kuralın sağ tarafıysa, onu sol tarafla değiştir. <span class="mono">A → xy</span> ise:</p><div class="mono" style="font-size:28px;margin-top:10px">Cbxy<span class="hl">|</span>ijk ⟹ CbA<span class="hl">|</span>ijk</div></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 4.5: Aşağıdan yukarıya ayrıştırma. Bu ayrıştırıcılar sağa dayalı türetmeyi, girdiyi soldan sağa okuyarak tersten taklit eder. Soldan sağa okuma ve sağa dayalı türetme kelimelerinin baş harfleri ona adını verir: LR. Açık bir yığın kullanırlar, yukarıdan aşağıya ayrıştırıcılardan daha güçlüdürler ve sol özyineleme onlar için sorun değildir.",
    "Gösterim şöyle: diziyi dikey bir çizgiyle ikiye ayırırız. Solu yığındır ve terminaller ile terminal olmayanlar içerir; sağı ise henüz okunmamış girdidir.",
    "Ayrıştırıcının yalnızca iki hareketi vardır. Shift, çizgiyi bir sağa kaydırır; yani sonraki token yığına alınır.",
    "Reduce ise yığının tepesindeki dizi bir kuralın sağ tarafıyla eşleşiyorsa, onu kuralın sol tarafıyla değiştirir. Örneğin A ok x y kuralı varsa, yığının tepesindeki x y, A olur.",
  ],
},
{
  id: "sr-trace", ch: "4.5 Aşağıdan yukarıya ayrıştırma", chip: "<b>4.5</b> Shift-reduce örneği",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Shift-reduce: <span class="mono hl">int * int + int</span></h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="col" style="width:440px">
        <div class="r" data-s="0">${code("gramer", ["E → T + E | T", "T → int * T | int | ( E )"], { lang: "plain", cls: "sm" })}</div>
        <div class="note r" data-s="5" style="font-size:24px">Her reduce, ayrıştırma ağacında <b>bir iç düğüm</b> oluşturur; en son kök E kalır.</div>
      </div>
      <div class="f1">${trace([{ h: "Yığın", color: "violet", align: "right" }, { h: "", color: "amber" }, { h: "Girdi", color: "teal" }, { h: "Hareket", color: "text" }], [
        [["", "|", "int * int + int", "shift"], 1], [["int", "|", "* int + int", "shift"], 1], [["int *", "|", "int + int", "shift"], 1], [["int * int", "|", "+ int", "reduce T → int"], 2], [["int * T", "|", "+ int", "reduce T → int * T"], 2],
        [["T", "|", "+ int", "shift"], 3], [["T +", "|", "int", "shift"], 3], [["T + int", "|", "", "reduce T → int"], 4], [["T + T", "|", "", "reduce E → T"], 4], [["T + E", "|", "", "reduce E → T + E"], 4], [["E", "|", "", "KABUL ✓"], 5]], { fs: 26 })}</div>
    </div>
  </div>`,
  n: [
    "Bir örnekle görelim. Gramer: E, T artı E ya da T; T ise int çarpı T, int ya da parantez içinde E. Girdi: int çarpı int artı int.",
    "Başta yığın boş. int'i shift ediyoruz; çarpıyı da, ikinci int'i de shift ediyoruz.",
    "Şimdi yığının tepesinde int var ve sonraki token artı. int'i T'ye indirgiyoruz; ardından int çarpı T de bir kuralın sağ tarafı, onu da T'ye indirgiyoruz.",
    "Artıyı ve son int'i shift ediyoruz.",
    "Girdi bitti. Son int'i T'ye, o T'yi E'ye, ve T artı E'yi de E'ye indirgiyoruz.",
    "Yığında yalnızca başlangıç sembolü E kaldı ve girdi bitti: kabul. Her reduce hareketi ayrıştırma ağacında bir iç düğüm oluşturdu; ağaç yapraklardan köke doğru kuruldu.",
  ],
},
{
  id: "handles-conflicts", ch: "4.5 Aşağıdan yukarıya ayrıştırma", chip: "<b>4.5</b> Tutamaçlar ve çatışmalar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Asıl soru: <em>neyi</em> indirgemeli?</h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="col" style="width:640px">
        <div class="card tint-a r" data-s="0" style="padding:22px 28px"><h3 class="hl" style="font-size:30px">Tutamaç (handle)</h3><p style="font-size:23px">Sağa dayalı türetmenin bir önceki adımına dönmek için indirgenmesi gereken alt dizi. Ayrıştırma = <b>tutamaç budama</b> (handle pruning).</p></div>
        <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:30px">Shift-reduce çatışması</h3><p style="font-size:23px">Hem shift hem reduce mümkün. Klasik örnek: <b>askıda else</b></p>
          ${code("hangi if'e ait?", ["if (a == 1)", "  if (b == 4)", "    x = 2;", "  else ...   // ?"], { lang: "c", cls: "xs" })}
          <p style="font-size:22px;margin-top:8px">Çoğu LR üreteci varsayılan olarak <b>shift</b> yapar → else en yakın if'e bağlanır.</p></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="2"><h3>Öncelik bildirimi</h3><p style="font-size:25px"><span class="mono">E → E + E | E * E | int</span> belirsiz. <span class="mono">x * y + z</span>'de + gelince <span class="mono">E * E</span> reduce edilmeli. Üreteçlere <b>“* , +'dan önceliklidir”</b> denir.</p></div>
        <div class="card tint-c r" data-s="3"><h3 class="cl">Reduce-reduce çatışması</h3><p style="font-size:25px">İki farklı indirgeme mümkün: <span class="mono">S → ε | id | id S</span> ile tek bir <span class="mono">id</span> iki şekilde ayrıştırılır. Ciddi belirsizlik → grameri düzelt: <span class="mono">S → ε | id S</span></p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Aşağıdan yukarıya ayrıştırmanın asıl sorusu şudur: yığının tepesindeki hangi alt diziyi indirgemeliyim? İndirgenmesi gereken doğru alt diziye tutamaç, İngilizcesiyle handle denir. Bu açıdan ayrıştırma, adım adım tutamaçları budamak gibi düşünülebilir.",
    "Bazen ayrıştırıcı hem shift hem reduce yapabileceği bir durumla karşılaşır: buna shift-reduce çatışması denir. Klasik örnek askıda else problemidir. İç içe iki if ve tek bir else varsa, else hangi if'e aittir? Çoğu LR ayrıştırıcı üreteci bu durumda varsayılan olarak shift yapar; böylece else en yakın if'e bağlanır, ki C ve Java'nın kuralı da budur.",
    "Belirsiz bir ifade gramerinde de benzer bir çatışma çıkar: x çarpı y artı z'de artı geldiğinde, E çarpı E indirgenmeli mi yoksa artı shift mi edilmeli? Çarpma daha öncelikli olduğu için indirgenmeli. Ayrıştırıcı üreteçlerine bu yüzden öncelik bildirimleri verilir.",
    "Daha ciddi olanı reduce-reduce çatışmasıdır: iki farklı kuralla indirgeme mümkündür. Örneğin S boş, id ya da id S kuralıyla tek bir id iki farklı şekilde ayrıştırılabilir. Bu genellikle gramerde ciddi bir belirsizliktir ve gramer düzeltilmelidir; burada S boş ya da id S yazmak yeterli.",
  ],
},
{
  id: "lr-structure", ch: "4.5 Aşağıdan yukarıya ayrıştırma", chip: "<b>4.5</b> LR ayrıştırıcının yapısı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">LR ayrıştırıcı: <em>yığın + tablo</em></h2>
    <div class="row" style="flex:1;gap:40px;align-items:center">
      <div class="col" style="width:820px;align-items:center;gap:18px">
        <div class="r" data-s="0" style="display:flex;gap:8px;font-family:JBM;font-size:30px">${["a₁", "a₂", "…", "aᵢ", "…", "aₙ", "$"].map((t) => `<span class="pill">${t}</span>`).join("")}</div>
        <div class="r" data-s="0" style="font-size:26px;color:var(--muted)">↓ girdi token'ları</div>
        <div class="row r" data-s="1" style="gap:30px;align-items:center">
          <div class="col" style="gap:6px;font-family:JBM;font-size:26px">${["Xₘ sₘ", "Xₘ₋₁ sₘ₋₁", "…", "X₀ s₀"].map((t, i) => `<div class="box" style="width:220px;height:62px;font-size:24px;${i === 0 ? "border-color:var(--amber)" : ""}">${t}</div>`).join("")}<div style="text-align:center;font-size:22px;color:var(--muted)">yığın</div></div>
          <div class="box" style="width:280px;height:160px;font-size:34px;border-color:var(--violet)">LR sürücü</div>
          <div class="col" style="gap:10px"><div class="box" data-hot="2" style="width:200px;height:80px;border-color:var(--teal)">ACTION</div><div class="box" data-hot="3" style="width:200px;height:80px;border-color:var(--amber)">GOTO</div></div>
        </div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="1" style="padding:20px 24px"><h3 style="font-size:27px">Knuth'un fikri (1965)</h3><p style="font-size:23px">Ayrıştırmanın <b>tüm geçmişi</b> karar için kullanılabilir; ama sonlu sayıda durum yeter → geçmiş, yığındaki <b>durum</b>larla saklanır.</p></div>
        <div class="card tint-t r" data-s="2" style="padding:20px 24px"><h3 class="tl" style="font-size:27px">ACTION[durum, token]</h3><p style="font-size:23px">shift · reduce · accept · error</p></div>
        <div class="card tint-a r" data-s="3" style="padding:20px 24px"><h3 class="hl" style="font-size:27px">GOTO[durum, terminal olmayan]</h3><p style="font-size:23px">Reduce'tan sonra yığına konacak yeni durum</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Peki LR ayrıştırıcı hangi tutamacı indirgeyeceğini nasıl bilir? Girdi, token'lar halinde soldan sağa okunur.",
    "Donald Knuth'un 1965'teki fikri şuydu: bir aşağıdan yukarıya ayrıştırıcı, kararlarını verirken ayrıştırmanın o ana kadarki bütün geçmişini kullanabilir. Üstelik bu geçmişin sonlu ve nispeten az sayıda farklı durumu vardır. Bu yüzden yığında her sembolün yanında bir durum numarası saklanır.",
    "Ayrıştırıcı tablo güdümlüdür ve tablonun iki parçası vardır. ACTION tablosu, mevcut durum ve sonraki token için ne yapılacağını söyler: shift, reduce, kabul ya da hata. Satırlar durumlar, sütunlar terminallerdir.",
    "GOTO tablosu ise bir reduce hareketinden sonra yığına hangi durumun konacağını söyler. Satırlar durumlar, sütunlar terminal olmayanlardır.",
  ],
},
{
  id: "lr-trace", ch: "4.5 Aşağıdan yukarıya ayrıştırma", chip: "<b>4.5</b> LR ayrıştırma örneği",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">LR ayrıştırma: <span class="mono hl">num + num * num</span></h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="col" style="width:420px">
        <div class="r" data-s="0">${code("gramer", ["E → E + T | T", "T → T * F | F", "F → ( E ) | num"], { lang: "plain", cls: "sm" })}</div>
        <div class="note r" data-s="3" style="font-size:23px"><b>Dikkat:</b> E+T varken * gelince reduce değil <b>shift</b> → önce çarpma tamamlanır. Öncelik, tablonun içine gömülü.</div>
      </div>
      <div class="f1">${trace([{ h: "Yığın", color: "violet" }, { h: "Girdi", color: "teal", align: "right" }, { h: "Hareket", color: "text" }], [
        [["$", "num + num * num $", "shift"], 1], [["$ num", "+ num * num $", "reduce F → num"], 1], [["$ F", "+ num * num $", "reduce T → F"], 1], [["$ T", "+ num * num $", "reduce E → T"], 1],
        [["$ E", "+ num * num $", "shift"], 2], [["$ E +", "num * num $", "shift"], 2], [["$ E + num", "* num $", "reduce F → num"], 2], [["$ E + F", "* num $", "reduce T → F"], 2],
        [["$ E + T", "* num $", "shift"], 3], [["$ E + T *", "num $", "shift"], 3], [["$ E + T * num", "$", "reduce F → num"], 4], [["$ E + T * F", "$", "reduce T → T * F"], 4], [["$ E + T", "$", "reduce E → E + T"], 4], [["$ E", "$", "KABUL ✓"], 5]], { fs: 23 })}</div>
    </div>
  </div>`,
  n: [
    "Bir LR ayrıştırıcının num artı num çarpı num girdisini nasıl işlediğine bakalım. Gramer, öncelik seviyeleri içeren klasik ifade grameri: E, E artı T ya da T; T, T çarpı F ya da F; F ise parantezli ifade ya da num.",
    "İlk num shift ediliyor ve hemen F'ye, T'ye, E'ye indirgeniyor.",
    "Artı ve ikinci num shift ediliyor; num önce F'ye, sonra T'ye indirgeniyor.",
    "Şimdi kritik an: yığında E artı T var ve sonraki token çarpı. Ayrıştırıcı E artı T'yi indirgemiyor, çarpıyı shift ediyor! Çünkü çarpma daha öncelikli. Bu bilgi, gramerden üretilen tablonun içine gömülü. Ardından son num da shift ediliyor.",
    "Girdi bitti: num F'ye indirgeniyor, T çarpı F, T'ye; E artı T de E'ye indirgeniyor.",
    "Yığında yalnızca E kaldı: kabul. Her adımda kararı ACTION tablosu verdi; her reduce'tan sonra da GOTO tablosu yeni durumu belirledi.",
  ],
},
{
  id: "lr-family", ch: "4.5 Aşağıdan yukarıya ayrıştırma", chip: "<b>4.5</b> LR ailesi ve araçlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">LR ailesi ve <em>araçlar</em></h2>
    <div class="row r" data-s="0" style="gap:16px;align-items:center;justify-content:center;margin-bottom:34px">
      ${[["LR(0)", "en basit"], ["SLR(1)", "FOLLOW ile"], ["LALR(1)", "pratik denge"], ["LR(1)", "en güçlü"]].map(([a, b], i) => `${i ? '<span class="arrow">→</span>' : ""}<div class="box" style="width:240px;height:110px;font-size:32px;${i === 2 ? "border-color:var(--amber)" : ""}">${a}<span style="font-size:20px;color:var(--muted);font-weight:400">${b}</span></div>`).join("")}
    </div>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card tint-t r" data-s="1"><h3 class="tl">LR'nin avantajları</h3><ul class="b t" style="margin-top:8px"><li style="font-size:26px">Programlama dillerinin <b>neredeyse tüm</b> gramerleri için çalışır</li><li style="font-size:26px">Diğer aşağıdan yukarıya yöntemler kadar <b>verimli</b></li><li style="font-size:26px">Sentaks hatalarını <b>mümkün olan en erken</b> anda bulur</li><li style="font-size:26px">LR gramerleri, LL gramerlerinin <b>üst kümesidir</b></li></ul></div>
      <div class="card r" data-s="2"><div class="ic a">🛠️</div><h3>Elle değil, araçla</h3><p>LR tabloları elle kurulamayacak kadar büyüktür. Gramerden tabloyu bir <b>ayrıştırıcı üreteci</b> çıkarır:</p><div class="pills"><span class="pill a" style="font-size:28px">yacc</span><span class="pill a" style="font-size:28px">bison</span><span class="pill" style="font-size:28px">ANTLR (LL)</span></div></div>
    </div>
  </div>`,
  n: [
    "LR bir ailedir: en basitinden en güçlüsüne LR(0), SLR(1), LALR(1) ve LR(1). Aralarındaki fark, durumların ve ileri bakış bilgisinin ne kadar ayrıntılı tutulduğudur. LALR(1), güç ve tablo boyutu arasında pratik bir denge sunduğu için en yaygın kullanılanıdır.",
    "LR ayrıştırıcıların avantajları büyüktür: programlama dillerini tanımlayan gramerlerin neredeyse tamamı için çalışırlar; diğer aşağıdan yukarıya yöntemler kadar verimlidirler; sentaks hatalarını mümkün olan en erken anda bulurlar. Ayrıca LR ile ayrıştırılabilen gramerler, LL ile ayrıştırılabilenlerin üst kümesidir.",
    "Tek dezavantajı, tabloların elle kurulamayacak kadar büyük olmasıdır. Bu yüzden gramerden tabloyu bir ayrıştırıcı üreteci çıkarır: yacc ve onun GNU sürümü bison en bilinenleridir. LL tarafında ise ANTLR gibi araçlar vardır.",
  ],
},
// ───────── summary / quiz / outro
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="flex:1">
      ${[["🔤", "t", "Sözcüksel analiz", "Karakterleri token'lara ayıran bir desen eşleştirici; durum diyagramıyla tasarlanır."], ["🎯", "a", "Ayrıştırıcının işi", "Sentaks hatalarını bulmak ve ayrıştırma ağacını üretmek."],
         ["⬇", "v", "Yukarıdan aşağıya", "Özyinelemeli iniş = elle yazılmış LL ayrıştırıcı. Sol özyineleme ve ayrık olmayan FIRST kümeleri yasak."], ["⬆", "c", "Aşağıdan yukarıya", "Shift-reduce; tutamacı bul ve indirge. LR ailesi en yaygın yaklaşım."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "Sözcüksel analizci, programın küçük ölçekli parçalarını ayıran bir desen eşleştiricidir ve bir durum diyagramıyla kolayca tasarlanır.",
    "Ayrıştırıcının iki işi vardır: sentaks hatalarını bulmak ve ayrıştırma ağacını üretmek.",
    "Özyinelemeli iniş ayrıştırıcı, elle yazılmış bir LL ayrıştırıcıdır ve EBNF ile çok uyumludur. Gramerinde sol özyineleme olmamalı ve sağ tarafların FIRST kümeleri ayrık olmalıdır.",
    "Aşağıdan yukarıya ayrıştırıcıların problemi ise mevcut cümlesel biçimde indirgenecek tutamacı bulmaktır. Shift-reduce yaklaşımını kullanan LR ailesi, en yaygın aşağıdan yukarıya ayrıştırma yöntemidir.",
  ],
},
{
  id: "quiz", ch: "Özet ve mini test", chip: "Mini test",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kendini <em>test et</em> <span class="emo">🧠</span></h2>
    <div class="stack" style="flex:1">
      ${quiz.map(([q, a], i) => `
      <div class="col r" data-s="${1 + i * 2}" data-h="${3 + i * 2}" style="gap:34px">
        <div class="card" style="padding:44px 50px"><div class="mono" style="color:var(--amber);font-size:28px;margin-bottom:16px">SORU ${i + 1} / ${quiz.length}</div>
          <div style="font-size:50px;font-weight:600;line-height:1.35">${q}</div></div>
        <div class="r" data-s="${1 + i * 2}" data-h="${2 + i * 2}" style="font-size:32px;color:var(--muted);display:flex;align-items:center;gap:26px">
          <svg viewBox="0 0 100 100" style="width:110px;height:110px"><circle cx="50" cy="50" r="42" fill="none" stroke="#2a3160" stroke-width="9"/><circle class="cd" cx="50" cy="50" r="42" fill="none" stroke="#ffb547" stroke-width="9" stroke-linecap="round" stroke-dasharray="264" transform="rotate(-90 50 50)"/></svg>
          <span><span class="emo">⏸️</span> Videoyu durdurup düşünebilirsin…</span></div>
        <div class="card tint-t r rp" data-s="${2 + i * 2}" style="padding:34px 50px;border-color:rgba(53,208,192,.5)"><div style="font-size:40px;font-weight:700;color:var(--teal);line-height:1.35">✓ ${a}</div></div>
      </div>`).join("")}
    </div>
    <style>.cd{stroke-dashoffset:0}.r.on .cd{animation:cd 4s linear 1.2s both}@keyframes cd{from{stroke-dashoffset:0}to{stroke-dashoffset:264}}</style>
  </div>`,
  n: [
    "Şimdi kısa bir mini test yapalım. Her sorudan sonra birkaç saniye düşünme süreniz var.",
    { t: "Soru 1. Sözcüksel ve sentaks analizini ayırmanın üç nedeni nedir?", pause: 3.5 }, "Cevap: Basitlik, verimlilik ve taşınabilirlik.",
    { t: "Soru 2. Özyinelemeli iniş ayrıştırıcıda her terminal olmayan neye karşılık gelir?", pause: 3.5 }, "Cevap: Kendi alt programına, yani kendi fonksiyonuna.",
    { t: "Soru 3. A ok A artı B gibi bir kural neden yukarıdan aşağıya ayrıştırıcıda sorun çıkarır?", pause: 3.5 }, "Cevap: Çünkü sol özyinelemelidir; A'nın fonksiyonu hiç token tüketmeden kendini sonsuza kadar çağırır.",
    { t: "Soru 4. Shift-reduce ayrıştırıcının iki temel hareketi nedir?", pause: 3.5 }, "Cevap: Shift, sonraki token'ı yığına atar. Reduce, yığının tepesindeki tutamacı kuralın sol tarafıyla değiştirir.",
    { t: "Soru 5. LR ayrıştırma tablosunun iki bileşeni nedir?", pause: 3.5 }, "Cevap: ACTION tablosu ve GOTO tablosu.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 4 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px;text-align:center">Dört bölümü bitirdiniz: <b style="color:var(--text)">giriş → tarihçe → sentaks/semantik → analiz</b></div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Deneyin: ericbn.github.io/js-abstract-descent-parser · yacc / bison<br>Kaynaklar: Sebesta · Watt · Scott · Z. Orhan · M. Şahin · T. Yılmaz · Ahmet Yesevi Üniversitesi</div>
  </div>`,
  n: [
    "Bölüm 4'ü de tamamladık! Böylece dört bölümü bitirmiş olduk: programlama dillerine giriş, dillerin tarihsel gelişimi, sentaks ve semantiğin tanımlanması ve son olarak sözcüksel ve sentaks analiz.",
    "Pratik için, kendi küçük ifade dilinizin lex fonksiyonunu ve özyinelemeli iniş ayrıştırıcısını yazmayı deneyin; ya da yacc veya bison ile bir gramerden ayrıştırıcı üretin. İzlediğiniz için teşekkürler, başarılar!",
  ],
},
];
