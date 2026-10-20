const { code } = require("../build/lib");
const { nt, tree, grammar } = require("./h");

const E = (c, v, s) => ({ t: "<expr>", c, v, vs: s });
module.exports = [
{
  id: "ambiguity", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Gramerlerde belirsizlik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Belirsiz gramer: <em>iki ağaç, iki anlam</em></h2>
    <div class="row" style="gap:40px;align-items:center;margin-bottom:10px">
      <div class="r" data-s="0" style="width:640px">${grammar([["<expr>", "<expr> <op> <expr> | const"], ["<op>", "/ | -"]], 27)}</div>
      <div class="r" data-s="1" style="flex:1;font-size:30px;color:var(--muted)">Cümle: <span class="mono" style="color:var(--text)">const - const / const</span> → sayılarla: <span class="mono hl" style="font-size:40px">8 - 4 / 2</span></div>
    </div>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card r" data-s="2" style="padding:16px;display:flex;flex-direction:column"><div style="font-size:26px;color:var(--muted);text-align:center">Ağaç 1: <span class="mono">(8 - 4) / 2</span></div>
        <div class="f1">${tree(E([E([E(["8"]), { t: "<op>", c: ["-"] }, E(["4"])], "4", 4), { t: "<op>", c: ["/"] }, E(["2"])], "2", 4), { s: 2, dx: 135, dy: 90, fs: 22, maxH: 470 })}</div></div>
      <div class="card r" data-s="3" style="padding:16px;display:flex;flex-direction:column"><div style="font-size:26px;color:var(--muted);text-align:center">Ağaç 2: <span class="mono">8 - (4 / 2)</span></div>
        <div class="f1">${tree(E([E(["8"]), { t: "<op>", c: ["-"] }, E([E(["4"]), { t: "<op>", c: ["/"] }, E(["2"])], "2", 4)], "6", 4), { s: 3, dx: 135, dy: 90, fs: 22, maxH: 470 })}</div></div>
    </div>
  </div>`,
  n: [
    "Bir gramer, iki ya da daha fazla farklı ayrıştırma ağacına sahip bir cümle üretebiliyorsa belirsizdir. Bu gramere bakalım: bir ifade, ifade işlemci ifade ya da bir sabittir; işlemci ise bölü ya da eksidir.",
    "const eksi const bölü const cümlesini düşünelim. Somut olsun diye sabitler yerine 8, 4 ve 2 yazalım: 8 eksi 4 bölü 2.",
    "Birinci ağaçta eksi işlemi ağacın daha derininde; yani önce 8 eksi 4 hesaplanır, sonra sonuç 2'ye bölünür.",
    "İkinci ağaçta ise bölme derinde: önce 4 bölü 2, sonra 8'den çıkarılır.",
    "Değerlere bakın: birinci ağaç 2, ikinci ağaç 6 sonucunu veriyor. Aynı cümle, iki farklı anlam! Bir derleyici sentaksa bakarak anlamı belirlediği için, programlama dillerinin gramerleri belirsiz olmamalıdır.",
  ],
},
{
  id: "precedence", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Operatör önceliği",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Öncelik gramere <em>gömülürse</em> belirsizlik biter</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:720px">
        <div class="r" data-s="0">${grammar([["<expr>", "<expr> - <term> | <term>"], ["<term>", "<term> / const | const"]], 28)}</div>
        <ul class="b r" data-s="1"><li style="font-size:27px">Her öncelik seviyesi için <b>ayrı bir terminal olmayan</b></li><li style="font-size:27px">Yüksek öncelikli işlem (<span class="mono">/</span>) ağaçta <b>daha derinde</b> → önce hesaplanır</li></ul>
        <div class="r" data-s="2">${code("türetme", ["<expr> ⇒ <expr> - <term>", "       ⇒ <term> - <term>", "       ⇒ const - <term>", "       ⇒ const - <term> / const", "       ⇒ const - const / const"], { lang: "plain", cls: "xs" })}</div>
      </div>
      <div class="f1 r" data-s="2">${tree({ t: "<expr>", v: "6", vs: 3, c: [{ t: "<expr>", c: [{ t: "<term>", c: ["8"] }] }, "-", { t: "<term>", v: "2", vs: 3, c: [{ t: "<term>", c: ["4"] }, "/", "2"] }] }, { s: 2, dx: 120, dy: 110, fs: 26, maxH: 620 })}</div>
    </div>
  </div>`,
  n: [
    "Çözüm, operatörlerin öncelik seviyelerini gramerin içine gömmektir. Bu yeni gramerde ifade, ifade eksi terim ya da tek bir terimdir; terim ise terim bölü sabit ya da tek bir sabittir.",
    "Fikir şu: her öncelik seviyesi için ayrı bir terminal olmayan kullanıyoruz. Bölme term seviyesinde tanımlandığı için ağaçta her zaman eksiden daha derinde kalır ve önce hesaplanır.",
    "Aynı cümleyi bu gramerle türettiğimizde artık tek bir ağaç elde ediliyor.",
    "Önce 4 bölü 2, yani 2 hesaplanır; sonra 8'den çıkarılır ve sonuç 6 olur. Matematikteki işlem önceliğiyle tam uyumlu, tek bir anlam.",
  ],
},
{
  id: "associativity", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Operatör birleşirliği",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aynı öncelik: <em>birleşirlik</em> kararı verir</h2>
    <p class="lead r" data-s="0" style="font-size:30px"><span class="mono hl" style="font-size:38px">10 - 4 - 3</span> &nbsp; soldan mı, sağdan mı?</p>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card tint-t r" data-s="1" style="display:flex;flex-direction:column;padding:20px 26px">
        ${grammar([["<expr>", "<expr> - const | const"]], 25)}
        <div style="font-size:26px;margin:10px 0 0;color:var(--teal)">Sol özyineleme → <b>sola birleşimli</b>: (10 - 4) - 3 = <b>3</b> ✓</div>
        <div class="f1">${tree({ t: "<expr>", v: "3", vs: 1, c: [{ t: "<expr>", v: "6", vs: 1, c: [{ t: "<expr>", c: ["10"] }, "-", "4"] }, "-", "3"] }, { s: 1, dx: 100, dy: 86, fs: 24, maxH: 400 })}</div></div>
      <div class="card tint-c r" data-s="2" style="display:flex;flex-direction:column;padding:20px 26px">
        ${grammar([["<expr>", "const - <expr> | const"]], 25)}
        <div style="font-size:26px;margin:10px 0 0;color:var(--coral)">Sağ özyineleme → <b>sağa birleşimli</b>: 10 - (4 - 3) = <b>9</b> ✕</div>
        <div class="f1">${tree({ t: "<expr>", v: "9", vs: 2, c: ["10", "-", { t: "<expr>", v: "1", vs: 2, c: ["4", "-", { t: "<expr>", c: ["3"] }] }] }, { s: 2, dx: 100, dy: 86, fs: 24, maxH: 400 })}</div></div>
    </div>
    <div class="note r" data-s="3" style="margin-top:20px;font-size:27px"><b>Kural:</b> sol özyineleme → sola birleşim; sağ özyineleme → sağa birleşim (ör. üs alma <span class="mono">2**3**2</span>).</div>
  </div>`,
  n: [
    "Peki aynı öncelikteki operatörler yan yana gelirse? 10 eksi 4 eksi 3 ifadesi soldan mı hesaplanmalı, sağdan mı? Buna operatör birleşirliği denir ve o da gramerle gösterilebilir.",
    "Bu gramerde kural sola özyinelemeli: ifade, ifade eksi sabit. Ağaç sola doğru büyüyor ve önce 10 eksi 4, yani 6, sonra 6 eksi 3, yani 3 hesaplanıyor. Doğru cevap.",
    "Kuralı sağa özyinelemeli yazarsak, yani ifade, sabit eksi ifade, ağaç sağa doğru büyür: önce 4 eksi 3, yani 1, sonra 10 eksi 1, yani 9. Yanlış cevap!",
    "Genel kural şu: sol özyineleme sola birleşimi, sağ özyineleme sağa birleşimi ifade eder. Üs alma gibi sağa birleşimli operatörler için ise sağ özyineleme tam da istediğimiz şeydir.",
  ],
},
{
  id: "ebnf", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Genişletilmiş BNF (EBNF)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">EBNF: <em>daha kısa, daha okunur</em></h2>
    <div class="grid3" style="gap:26px;margin-bottom:28px">
      <div class="card r" data-s="1" style="padding:24px"><div class="mono big" style="font-size:54px;color:var(--teal)">[ ]</div><h3 style="font-size:30px">Seçimlik</h3><p style="font-size:24px">Hiç ya da bir kez</p><div class="mono" style="font-size:21px;margin-top:12px;line-height:1.5">${nt("if_stmt")} → if ( ${nt("expr")} ) ${nt("stmt")} <span class="tl">[else ${nt("stmt")}]</span></div></div>
      <div class="card r" data-s="2" style="padding:24px"><div class="mono big" style="font-size:54px;color:var(--amber)">{ }</div><h3 style="font-size:30px">Yineleme</h3><p style="font-size:24px">Sıfır ya da daha fazla kez</p><div class="mono" style="font-size:21px;margin-top:12px;line-height:1.5">${nt("ident_list")} → ident <span class="hl">{, ident}</span></div></div>
      <div class="card r" data-s="3" style="padding:24px"><div class="mono big" style="font-size:54px;color:var(--violet)">( | )</div><h3 style="font-size:30px">Değiştirme</h3><p style="font-size:24px">Gruptan biri seçilir</p><div class="mono" style="font-size:21px;margin-top:12px;line-height:1.5">${nt("for")} → for ${nt("var")} := ${nt("expr")} <span class="vl">(to | downto)</span> ${nt("expr")} do ${nt("stmt")}</div></div>
    </div>
    <div class="row r" data-s="4" style="gap:30px;align-items:center">
      <div class="f1">${code("BNF", ["<expr> → <expr> + <term>", "       | <expr> - <term>", "       | <term>", "<term> → <term> * <factor>", "       | <term> / <factor>", "       | <factor>"], { lang: "plain", cls: "xs" })}</div>
      <span style="font-size:50px;color:var(--amber)">⇒</span>
      <div class="f1">${code("EBNF", ["<expr> → <term> {(+ | -) <term>}", "<term> → <factor> {(* | /) <factor>}"], { lang: "plain", cls: "xs" })}</div>
    </div>
  </div>`,
  n: [
    "BNF'in okunabilirliğini ve yazılabilirliğini artırmak için birkaç ekleme yapıldı; bu sürüme genişletilmiş BNF, kısaca EBNF denir. Üç yeni gösterim var.",
    "Birincisi köşeli parantez: seçimlik kısmı gösterir; içindeki bölüm hiç olmayabilir ya da bir kez olabilir. if deyiminin else kısmı buna güzel bir örnek. BNF'te bunun için iki ayrı kural gerekirdi.",
    "İkincisi süslü parantez: yinelemeyi gösterir; içindeki bölüm sıfır ya da daha fazla kez tekrar edebilir. Tanıtıcı listesi artık özyineleme olmadan, tek kuralla yazılıyor: bir tanıtıcı, ardından istenen sayıda virgül ve tanıtıcı.",
    "Üçüncüsü parantez içinde dikey çizgi: bir gruptan tek bir elemanın seçileceğini gösterir. Pascal'ın for deyiminde to ya da downto'dan biri seçilir.",
    "Farkı yan yana görelim: BNF'te altı satır tutan ifade ve terim tanımı, EBNF'te iki satıra iniyor. Bu yeni semboller dilin parçası değildir; gösterimi kısaltan metasembollerdir.",
  ],
},
{
  id: "syntax-graph", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Sözdizim grafikleri",
  html: (() => {
    const T = (x, y, t, s) => `<g class="r rp" data-s="${s}" style="transform-box:fill-box;transform-origin:center"><rect x="${x}" y="${y - 30}" width="${t.length * 22 + 50}" height="60" rx="30" fill="#151a31" stroke="#35d0c0" stroke-width="3"/><text x="${x + (t.length * 22 + 50) / 2}" y="${y + 10}" fill="#eef0fa" font-size="30" text-anchor="middle" font-family="JBM">${t}</text></g>`;
    const N = (x, y, t, s) => `<g class="r rp" data-s="${s}" style="transform-box:fill-box;transform-origin:center"><rect x="${x}" y="${y - 30}" width="${t.length * 20 + 50}" height="60" rx="6" fill="#151a31" stroke="#a493ff" stroke-width="3"/><text x="${x + (t.length * 20 + 50) / 2}" y="${y + 10}" fill="#eef0fa" font-size="28" text-anchor="middle" font-family="JBM">${t}</text></g>`;
    const L = (d, s) => `<path class="r rf" data-s="${s}" d="${d}" stroke="#a2a9d2" stroke-width="3" fill="none" marker-end="url(#sg)"/>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Sözdizim grafikleri: <em>kuralın haritası</em></h2>
    <p class="lead r" data-s="0" style="font-size:28px">İlk kez Pascal'ın grameri için kullanıldı. <span class="tl">Oval</span> = terminal, <span class="vl">dikdörtgen</span> = terminal olmayan. Olası yollar = olası sembol dizileri.</p>
    <svg viewBox="0 0 1680 560" style="width:100%;flex:1">
      <defs><marker id="sg" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a2a9d2"/></marker></defs>
      <text class="r" data-s="1" x="0" y="60" fill="#ffb547" font-size="30" font-family="JBM">&lt;ident&gt; → letter {letter | digit}</text>
      ${L("M0,170 L60,170", 1)}${N(70, 170, "letter", 1)}${L("M270,170 L1000,170", 1)}
      ${L("M600,170 C600,240 640,250 680,250", 2)}${N(690, 250, "letter", 2)}${L("M890,250 C930,250 960,240 960,180", 2)}
      ${L("M600,170 C600,330 640,340 680,340", 2)}${N(690, 340, "digit", 2)}${L("M870,340 C940,340 960,330 960,180", 2)}
      <path class="r rf" data-s="2" d="M960,170 C1000,110 560,110 600,165" stroke="#ffb547" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
      <text class="r" data-s="2" x="780" y="105" fill="#ffb547" font-size="22" text-anchor="middle">tekrar</text>
      <text class="r" data-s="3" x="0" y="440" fill="#ffb547" font-size="30" font-family="JBM">&lt;if_stmt&gt;</text>
      ${L("M0,500 L40,500", 3)}${T(50, 500, "if", 3)}${L("M146,500 L180,500", 3)}${T(190, 500, "(", 3)}${L("M262,500 L296,500", 3)}${N(306, 500, "expr", 3)}${L("M486,500 L520,500", 3)}${T(530, 500, ")", 3)}${L("M602,500 L636,500", 3)}${N(646, 500, "stmt", 3)}${L("M826,500 L1500,500", 3)}
      ${L("M880,500 C880,430 900,420 940,420", 4)}${T(950, 420, "else", 4)}${L("M1092,420 L1130,420", 4)}${N(1140, 420, "stmt", 4)}${L("M1320,420 C1380,420 1400,430 1400,490", 4)}
    </svg>
  </div>`;
  })(),
  n: [
    "BNF ve EBNF kuralları, sözdizim grafikleriyle de gösterilebilir. İlk kez Pascal'ın gramerini açıklamak için kullanıldılar. Ovaller terminal sembolleri, dikdörtgenler terminal olmayanları gösterir. Grafikte izlenebilecek her yol, geçerli bir sembol dizisidir.",
    "Tanıtıcı kuralına bakalım: bir tanıtıcı bir harfle başlar.",
    "Sonra istenen sayıda harf ya da rakam gelebilir. Yukarıdaki kesikli geri dönüş yolu, EBNF'teki süslü parantezin, yani yinelemenin karşılığıdır.",
    "İkinci örnek C'deki if deyimi: if, açma parantezi, bir ifade, kapama parantezi ve bir deyim.",
    "Yukarıdaki yan yol ise isteğe bağlı else kısmı; EBNF'teki köşeli parantezin karşılığı. Bu grafikler, özellikle dil kılavuzlarında kuralları bir bakışta anlamayı kolaylaştırır.",
  ],
},
// ───────── 3.4 Attribute grammars
{
  id: "ag-why", ch: "3.4 Özellik gramerleri", chip: "<b>3.4</b> Özellik (attribute) gramerleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Gramerin <em>yetmediği yer</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <p class="lead r" data-s="0" style="font-size:29px">İçerikten bağımsız gramerler bazı kuralları <b>ifade edemez</b> (ya da ağaç aşırı büyür):</p>
        <div class="card r" data-s="1" style="padding:24px 30px"><h3 style="font-size:30px">Tip uyumluluğu</h3><p style="font-size:25px">Java'da <span class="mono">float</span> bir değer <span class="mono">int</span> değişkene atanamaz.</p></div>
        <div class="card r" data-s="1" style="padding:24px 30px;transition-delay:.2s"><h3 style="font-size:30px">Önce tanımla, sonra kullan</h3><p style="font-size:25px">Değişken kullanılmadan önce bildirilmiş olmalı.</p></div>
        <div class="note r" data-s="2" style="font-size:26px">Bunlar <b>statik semantik</b>: derleme zamanında kontrol edilebilen, ama gramere sığmayan kurallar. Çözüm: <b>özellik gramerleri</b> (Knuth, 1968).</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3"><h3>Örnek: Ada prosedürü</h3><div class="mono" style="font-size:22px;line-height:1.6;margin-top:8px;color:var(--muted)">${nt("proc_def")} → procedure ${nt("proc_name")}[1]<br>&nbsp;&nbsp;${nt("proc_body")} end ${nt("proc_name")}[2];</div>
          <div class="mono" style="font-size:22px;margin-top:12px;color:var(--amber)">Koşul: ${nt("proc_name")}[1].string<br>&nbsp;&nbsp;== ${nt("proc_name")}[2].string</div></div>
        <div class="grid2 r" data-s="4" style="gap:16px">${code("geçerli ✓", ["procedure Hesapla is", "begin ... end Hesapla;"], { lang: "plain", cls: "xs" })}${code("hatalı ✕", ["procedure Hesapla is", "begin ... end Topla;"], { lang: "plain", cls: "xs" })}</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 3.4: Özellik gramerleri. İçerikten bağımsız gramerler güçlüdür, ama bir programlama dilinin bütün kurallarını ifade edemezler.",
    "Örneğin tip uyumluluğu: Java'da bir float değer, bir int değişkene atanamaz. Ya da önce tanımla sonra kullan kuralı: bir değişken kullanılmadan önce bildirilmiş olmalıdır. Bunları gramerle ifade etmek ya imkânsızdır ya da gramer ve ağaç aşırı büyür.",
    "Bu tür kurallara statik semantik denir: derleme zamanında kontrol edilebilirler, ama gramere sığmazlar. Çözüm, Donald Knuth'un 1968'de önerdiği özellik gramerleridir.",
    "Bir örnek: Ada'da bir prosedürün sonundaki end kelimesinden sonra gelen isim, prosedürün adıyla aynı olmalıdır. Sentaks kuralı iki proc_name içerir; özellik grameri bunlara bir koşul ekler: birinci ismin metni ile ikinci ismin metni eşit olmalı.",
    "Böylece procedure Hesapla ile başlayıp end Hesapla ile biten program geçerli olur; end Topla ile biten program ise sentaks olarak doğru olsa da bu koşul yüzünden reddedilir.",
  ],
},
{
  id: "ag-def", ch: "3.4 Özellik gramerleri", chip: "<b>3.4</b> Özellik gramerinin parçaları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Özellik grameri = <em>gramer + değerler + kurallar</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:700px">
        <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:29px">Özellikler (attributes)</h3><p style="font-size:24px">Her gramer sembolüne bağlı değerler: ör. <span class="mono">actual_type</span></p></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:29px">Semantik fonksiyonlar</h3>
          <p style="font-size:24px"><b class="tl">Sentezlenen</b> özellik: değer <b>çocuklardan</b> hesaplanır ⬆</p><p style="font-size:24px"><b class="vl">Miras alınan</b> özellik: değer <b>ebeveyn/kardeşlerden</b> gelir ⬇</p></div>
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:29px">Koşullar (predicates)</h3><p style="font-size:24px">Özellik tutarlılığını kontrol eden mantıksal ifadeler. Yanlışsa → <b class="cl">hata</b>.</p></div>
      </div>
      <div class="f1 r" data-s="4">${code("tip kontrolü için özellik grameri", [
        "1. <assign> → <var> = <expr>", "   <expr>.expected_type ← <var>.actual_type", "",
        "2. <expr> → <var>[2] + <var>[3]", "   <expr>.actual_type ←", "     if <var>[2].actual_type = int and", "        <var>[3].actual_type = int", "     then int else real",
        "   koşul: <expr>.actual_type", "          = <expr>.expected_type", "",
        "3. <var> → A | B | C", "   <var>.actual_type ← lookup(<var>.string)"], { lang: "plain", cls: "xs" })}</div>
    </div>
  </div>`,
  n: [
    "Bir özellik grameri, içerikten bağımsız bir gramere üç şey ekler.",
    "Birincisi özellikler: her gramer sembolüne bağlı değerler. Örneğin bir değişkenin gerçek tipi, actual_type.",
    "İkincisi semantik fonksiyonlar: özelliklerin nasıl hesaplanacağını söyler. Değeri ağaçta çocuklardan yukarı doğru hesaplanan özelliklere sentezlenen özellik; değeri ebeveynden ya da kardeşlerden aşağı doğru gelen özelliklere miras alınan özellik denir.",
    "Üçüncüsü koşullar: özelliklerin tutarlı olup olmadığını kontrol eden mantıksal ifadeler. Bir koşul yanlışsa, program statik semantik hatası içerir.",
    "Sağdaki örnek, basit atamalarda tip kontrolü yapıyor. Atamada, ifadenin beklenen tipi sol taraftaki değişkenin gerçek tipinden miras alınır. Toplamada, iki taraf da int ise sonuç int, değilse real olur; ve bu gerçek tip beklenen tiple aynı olmalıdır. Değişkenin gerçek tipi ise sembol tablosundan bakılarak bulunur.",
  ],
},
{
  id: "ag-eval", ch: "3.4 Özellik gramerleri", chip: "<b>3.4</b> Özelliklerin hesaplanması",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="mono" style="font-size:60px">A = A + B</span> &nbsp;<span style="font-size:36px;color:var(--muted)">A: int, B: real</span></h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="f1 r" data-s="0">${tree({ t: "<assign>", c: [{ t: "<var>", hot: 1, v: "int", vs: 1, c: ["A"] }, "=", { t: "<expr>", hot: "2,4,5", v: "real", vs: 4, c: [{ t: "<var>[2]", hot: 3, v: "int", vs: 3, c: ["A"] }, "+", { t: "<var>[3]", hot: 3, v: "real", vs: 3, c: ["B"] }] }] }, { dx: 150, dy: 120, fs: 26, maxH: 640 })}</div>
      <div class="col" style="width:640px;gap:14px">
        ${[["1", "⬆", "teal", "&lt;var&gt;.actual_type ← lookup(A) = <b>int</b>"], ["2", "⬇", "violet", "&lt;expr&gt;.expected_type ← <b>int</b> (miras)"], ["3", "⬆", "teal", "&lt;var&gt;[2] = <b>int</b>, &lt;var&gt;[3] = <b>real</b>"], ["4", "⬆", "teal", "&lt;expr&gt;.actual_type ← <b>real</b> (ikisi de int değil)"], ["5", "?", "coral", "expected (int) = actual (real) ? → <b class='cl'>YANLIŞ</b>"]]
          .map(([n, a, c, t], i) => `<div class="card r rl" data-s="${i + 1}" style="padding:16px 22px;display:flex;gap:16px;align-items:center"><span class="mono" style="font-size:30px;color:var(--${c});width:30px">${a}</span><span style="font-size:23px;font-family:JBM">${t}</span></div>`).join("")}
        <div class="note r" data-s="5" style="font-size:25px">Koşul sağlanmadı → <b>tip hatası</b>: real bir değer int değişkene atanamaz.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Şimdi bu gramerin A eşittir A artı B deyimi üzerinde nasıl çalıştığını görelim. A'nın tipi int, B'nin tipi real olsun.",
    "Birinci adım: sol taraftaki var düğümünün gerçek tipi, sembol tablosundan bakılarak bulunur: int. Bu sentezlenen bir özelliktir; yapraktan yukarı çıkar.",
    "İkinci adım: expr düğümünün beklenen tipi, kardeşi olan var'dan miras alınır: int. Bilgi bu kez ağaçta aşağı doğru akıyor.",
    "Üçüncü adım: sağ taraftaki iki değişkenin gerçek tipleri sembol tablosundan bulunur: A için int, B için real.",
    "Dördüncü adım: expr'in gerçek tipi hesaplanır. İki işlenen de int olmadığı için sonuç real olur.",
    "Beşinci adım: koşul kontrol edilir. Beklenen tip int, gerçek tip real. Eşit değiller; koşul yanlış. Derleyici bir tip hatası bildirir. Gördüğünüz gibi, özellik değerleri ağaçta hem yukarı hem aşağı akarak hesaplandı.",
  ],
},
];
