const { code } = require("../build/lib");
const { nt, tree } = require("./h");

const step = (txt, s, color = "text", extra = "") => `<div class="r rl mono" data-s="${s}" style="font-size:32px;padding:10px 18px;border-radius:12px;background:var(--panel);color:var(--${color});${extra}">${txt}</div>`;
const quiz = [
  ["Sentaks ile semantik arasındaki fark nedir?", "Sentaks programın biçimi, semantik ise anlamıdır."],
  ["Bir gramer ne zaman belirsizdir?", "Bir cümle için iki ya da daha fazla farklı ayrıştırma ağacı üretebiliyorsa."],
  ["EBNF'te süslü parantez { } ne anlama gelir?", "Sıfır ya da daha fazla kez yineleme."],
  ["a = b + 1 {a > 1} için en zayıf önkoşul nedir?", "{b > 0}"],
  ["Programın anlamını matematiksel fonksiyonlarla tanımlayan semantik hangisidir?", "Denotasyonel semantik"],
];

module.exports = [
// ───────── 3.5 Semantics
{
  id: "semantics", ch: "3.5 Dinamik semantik", chip: "<b>3.5</b> Programların anlamını tanımlamak",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Anlamı tanımlamak <em>neden zor?</em></h2>
    <div class="row" style="gap:30px;margin-bottom:30px">
      <div class="card r" data-s="0" style="flex:1"><p>Sözdizimi BNF ile kolayca tanımlanır; ama semantik için <b>yaygın kabul görmüş tek bir gösterim yok</b>.</p></div>
      <div class="card r" data-s="1" style="flex:1"><p>Doğal dille (ör. Türkçe) açıklama: anlaşılır ama <b>belirsiz ve eksik</b> olabilir.</p></div>
    </div>
    <div class="grid3" style="flex:1">
      ${[["⚙️", "t", "İşlemsel", "Programı (sanal) bir makinede çalıştırınca durum nasıl değişir?"], ["⚖️", "a", "Aksiyomatik", "Program çalıştıktan sonra hangi mantıksal iddialar doğrudur?"], ["🧮", "v", "Denotasyonel", "Program hangi matematiksel fonksiyona karşılık gelir?"]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="2" style="transition-delay:${i * 0.2}s;text-align:center"><div class="emo" style="font-size:64px">${e}</div><h3 style="font-size:38px;color:var(--${["teal", "amber", "violet"][i]})">${h}</h3><p>${p}</p></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Bölüm 3.5: Programların anlamını açıklamak, yani dinamik semantik. Sözdizimi BNF ile kolayca tanımlanabilir; ama semantiği tanımlamak için yaygın kabul görmüş tek bir gösterim yoktur.",
    "En yaygın yol, dil yapılarını Türkçe ya da İngilizce gibi doğal bir dille açıklamaktır. Bu anlaşılırdır, ama belirsiz ve eksik olabilir. Bu yüzden biçimsel yöntemlere ihtiyaç vardır.",
    "Üç temel yaklaşım var. İşlemsel semantik, programı bir makinede çalıştırınca durumun nasıl değiştiğine bakar. Aksiyomatik semantik, program çalıştıktan sonra hangi mantıksal iddiaların doğru olduğunu söyler. Denotasyonel semantik ise programı matematiksel bir fonksiyona eşler. Şimdi hepsini sırayla görelim.",
  ],
},
{
  id: "operational", ch: "3.5 Dinamik semantik", chip: "<b>3.5a</b> İşlemsel semantik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="tl">İşlemsel</span> semantik: <em>çalıştır ve izle</em></h2>
    <div class="row" style="flex:1;gap:30px;align-items:center">
      <div class="f1 r" data-s="1">${code("C", ["for (expr1; expr2; expr3) {", "    ...", "}"], { lang: "c", cls: "sm" })}</div>
      <div class="r" data-s="1" style="display:flex;flex-direction:column;align-items:center;gap:8px"><div class="box" style="width:180px;height:80px;border-color:var(--teal)">Çevirici</div><span style="font-size:50px;color:var(--teal)">→</span></div>
      <div class="f1 r" data-s="2">${code("basit ara dil", ["      expr1;", { t: "loop: if expr2 == 0 goto out", hot: "3" }, "      ...", { t: "      expr3;", hot: "3" }, { t: "      goto loop", hot: "3" }, "out:  ..."], { lang: "plain", cls: "sm" })}</div>
    </div>
    <div class="grid2" style="gap:26px;margin-top:20px">
      <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:28px">Fikir</h3><p style="font-size:24px">Anlamı, makinenin <b>durum değişiklikleri</b> (bellek, yazmaçlar) tanımlar. Gerçek donanım yerine <b>idealleştirilmiş bir sanal makine</b> kullanılır.</p></div>
      <div class="card r" data-s="5" style="padding:22px 28px"><h3 style="font-size:28px">Değerlendirme</h3><p style="font-size:24px">Gayriresmî kullanımda harika (dil kılavuzları). Biçimsel kullanımda çok karmaşık: VDL, PL/I'ı tanımlamak için kullanıldı.</p></div>
    </div>
  </div>`,
  n: [
    "İşlemsel semantik, bir programın anlamını, onu bir makinede çalıştırarak açıklar. Anlamı, makinenin durumundaki değişiklikler, yani bellek ve yazmaçlardaki değişimler tanımlar.",
    "Gerçek bir makine kullanmak tanımı makineye bağımlı hale getirir. Bu yüzden önce bir çevirici, kaynak kodu idealleştirilmiş bir makinenin basit diline çevirir. Örneğin C'deki for döngüsünü ele alalım.",
    "Bu döngü, her yapısının anlamı açık olan basit bir ara dile şöyle çevrilir: önce expr1 çalışır. loop etiketinde expr2 sıfırsa out'a atlanır; değilse gövde çalışır, expr3 çalışır ve loop'a geri dönülür.",
    "Böylece for döngüsünün ne yaptığını, yalnızca atama, koşullu atlama ve etiketlerden oluşan çok basit yapılarla tarif etmiş olduk.",
    "Fikir şu: programın anlamını, sanal makinenin durum değişiklikleri tanımlar.",
    "Değerlendirelim: işlemsel semantik gayriresmî kullanımda, örneğin dil kılavuzlarında çok faydalıdır. Ama tamamen biçimsel yapıldığında aşırı karmaşıklaşır; örneğin PL/I'ın semantiğini tanımlamak için kullanılan VDL dili son derece karmaşıktı.",
  ],
},
{
  id: "axiomatic", ch: "3.5 Dinamik semantik", chip: "<b>3.5b</b> Aksiyomatik semantik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="hl">Aksiyomatik</span> semantik: <em>mantıkla kanıtla</em></h2>
    <p class="lead r" data-s="0" style="font-size:28px">Temeli <b>yüklem mantığı</b>; asıl amaç <b>program doğrulama</b>. Mantıksal ifadelere <b>iddia</b> (assertion) denir.</p>
    <div class="r" data-s="1" style="display:flex;align-items:center;justify-content:center;gap:24px;margin:16px 0 30px">
      <div class="box" style="width:300px;height:110px;font-size:40px;border-color:var(--teal)">{P}<span style="font-size:20px;color:var(--muted);font-weight:400">önkoşul</span></div>
      <div class="box" style="width:300px;height:110px;font-size:40px">ifade</div>
      <div class="box" style="width:300px;height:110px;font-size:40px;border-color:var(--amber)">{Q}<span style="font-size:20px;color:var(--muted);font-weight:400">sonkoşul</span></div>
    </div>
    <div class="row" style="flex:1;gap:30px">
      <div class="card r" data-s="2" style="flex:1"><h3>Örnek</h3><div class="mono" style="font-size:40px;margin:14px 0">a = b + 1 &nbsp;<span class="hl">{a &gt; 1}</span></div>
        <div class="col" style="gap:12px;font-size:28px"><div class="r" data-s="3">Olası önkoşul: <span class="mono tl">{b &gt; 10}</span> ✓</div><div class="r" data-s="4">Olası önkoşul: <span class="mono tl">{b &gt; 5}</span> ✓</div><div class="r" data-s="5"><b>En zayıf önkoşul:</b> <span class="mono" style="color:var(--teal);font-size:34px;font-weight:700">{b &gt; 0}</span></div></div></div>
      <div class="card tint-a r" data-s="5" style="flex:1"><h3 class="hl">En zayıf önkoşul</h3><p>Sonkoşulu <b>garanti eden</b> en az kısıtlayıcı önkoşul.</p><p style="margin-top:14px">b &gt; 0 ise b ≥ 1, o halde a = b + 1 ≥ 2 &gt; 1 ✓<br>b = 0 olsaydı a = 1 → {a &gt; 1} sağlanmaz ✕</p></div>
    </div>
  </div>`,
  n: [
    "Aksiyomatik semantik, biçimsel mantığa, yani yüklem mantığına dayanır. Asıl amacı programların doğruluğunu kanıtlamaktır. Programdaki mantıksal ifadelere iddia denir.",
    "Temel gösterim şudur: P, ifade, Q. P önkoşuldur; ifade çalışmadan önce değişkenler arasında doğru olan ilişkiyi söyler. Q sonkoşuldur; ifade çalıştıktan sonra doğru olacak ilişkiyi söyler.",
    "Bir örnek: a eşittir b artı bir ifadesinden sonra a'nın 1'den büyük olmasını istiyoruz. Önkoşul ne olmalı?",
    "b 10'dan büyükse elbette çalışır.",
    "b 5'ten büyükse de çalışır.",
    "Ama bizi ilgilendiren en zayıf önkoşuldur: sonkoşulu garanti eden, en az kısıtlayıcı koşul. Burada en zayıf önkoşul b büyüktür sıfırdır. b pozitif bir tam sayıysa en az 1'dir, a da en az 2 olur. b sıfır olsaydı a 1 olurdu ve koşul sağlanmazdı.",
  ],
},
{
  id: "axiom-assign", ch: "3.5 Dinamik semantik", chip: "<b>3.5b</b> Atama aksiyomu",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Atama aksiyomu: <em>yerine koy</em></h2>
    <div class="card tint-a r" data-s="0" style="text-align:center;margin-bottom:26px"><div class="mono" style="font-size:44px">{Q<sub>x→E</sub>} &nbsp;x = E&nbsp; {Q}</div><p style="margin-top:10px">Önkoşulu bulmak için: sonkoşulda geçen her <b>x</b> yerine <b>E</b> yaz.</p></div>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="col" style="gap:12px">
        ${step("x = 2*y - 3 &nbsp;<span class='hl'>{x &gt; 25}</span>", 1)}
        ${step("2*y - 3 &gt; 25 &nbsp;<span style='font-size:22px;color:var(--muted)'>← x yerine 2*y-3</span>", 2)}
        ${step("2*y &gt; 28", 3)}
        ${step("<b>{y &gt; 14}</b> &nbsp;en zayıf önkoşul", 4, "teal")}
      </div>
      <div class="col" style="gap:12px">
        ${step("<span class='tl'>{x &gt; 5}</span> x = x - 3 <span class='hl'>{x &gt; 0}</span>", 5)}
        ${step("x - 3 &gt; 0 &nbsp;→&nbsp; <b>{x &gt; 3}</b>", 6, "teal")}
        ${step("x &gt; 5 &nbsp;⟹&nbsp; x &gt; 3 &nbsp;✓", 7, "amber")}
        <div class="note r" data-s="7" style="font-size:25px"><b>Sonuç kuralı:</b> daha güçlü bir önkoşul (x &gt; 5), en zayıf önkoşulu (x &gt; 3) gerektiriyorsa ifade doğrudur.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Atama ifadeleri için aksiyom çok basittir: x eşittir E ataması ve Q sonkoşulu verildiğinde, önkoşulu bulmak için Q'daki her x yerine E yazarız.",
    "Örnek: x eşittir 2 çarpı y eksi 3 ataması, ve sonkoşul x büyüktür 25.",
    "Sonkoşuldaki x yerine 2 çarpı y eksi 3 yazıyoruz: 2y eksi 3 büyüktür 25.",
    "Her iki tarafa 3 ekleyince 2y büyüktür 28.",
    "Yani en zayıf önkoşul y büyüktür 14'tür.",
    "İkinci örnek bir kanıt: x büyüktür 5 önkoşuluyla x eşittir x eksi 3 çalışırsa, x büyüktür 0 olur mu?",
    "Önce en zayıf önkoşulu bulalım: x eksi 3 büyüktür 0, yani x büyüktür 3.",
    "Verilen önkoşul x büyüktür 5, x büyüktür 3'ü gerektirir. Buna sonuç kuralı denir: daha güçlü bir önkoşul en zayıf önkoşulu gerektiriyorsa, ifade doğrudur. Kanıt tamam.",
  ],
},
{
  id: "axiom-seq-if", ch: "3.5 Dinamik semantik", chip: "<b>3.5b</b> Sıralar ve seçim",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Sıralar ve seçim: <em>geriye doğru çalış</em></h2>
    <div class="grid2" style="flex:1;gap:36px">
      <div class="col" style="gap:12px">
        <h3 class="r" data-s="0" style="font-size:32px;margin:0">Sıra: S1; S2</h3>
        ${step("y = 3*x + 1;", 0, "muted")}
        ${step("x = y + 3; &nbsp;<span class='hl'>{x &lt; 10}</span>", 0, "muted")}
        ${step("2. ifade: y + 3 &lt; 10 → <b>{y &lt; 7}</b>", 1, "teal")}
        ${step("1. ifade: 3x + 1 &lt; 7 → <b>{x &lt; 2}</b>", 2, "teal")}
        <div class="note r" data-s="2" style="font-size:24px">Sondan başa: her ifadenin önkoşulu, bir öncekinin sonkoşulu olur.</div>
      </div>
      <div class="col" style="gap:12px">
        <h3 class="r" data-s="3" style="font-size:32px;margin:0">Seçim: if B then S1 else S2</h3>
        ${step("if (x &gt; 0) y = y - 1 else y = y + 1 &nbsp;<span class='hl'>{y &gt; 0}</span>", 3, "muted", "font-size:26px")}
        ${step("then: y - 1 &gt; 0 → {y &gt; 1}", 4, "teal")}
        ${step("else: y + 1 &gt; 0 → {y &gt; -1}", 5, "teal")}
        ${step("ortak: <b>{y &gt; 1}</b> &nbsp;(y&gt;1 ⟹ y&gt;-1)", 6, "amber")}
      </div>
    </div>
  </div>`,
  n: [
    "Birden çok ifadeden oluşan sıralarda geriye doğru çalışırız. Örnek: y eşittir 3x artı 1, sonra x eşittir y artı 3, ve sonkoşul x küçüktür 10.",
    "Önce ikinci ifadeye atama aksiyomunu uygularız: y artı 3 küçüktür 10, yani y küçüktür 7. Bu, ikinci ifadenin önkoşulu ve aynı zamanda birinci ifadenin sonkoşuludur.",
    "Sonra birinci ifade: 3x artı 1 küçüktür 7, yani x küçüktür 2. Programın tamamının önkoşulu x küçüktür 2.",
    "Seçim ifadelerinde ise iki kolun ikisi için de geçerli bir önkoşul gerekir. Örnek: x pozitifse y'yi azalt, değilse artır; sonkoşul y büyüktür 0.",
    "Then kolu için: y eksi 1 büyüktür 0, yani y büyüktür 1.",
    "Else kolu için: y artı 1 büyüktür 0, yani y büyüktür eksi 1.",
    "İki kol için ortak önkoşul y büyüktür 1'dir; çünkü y büyüktür 1 olduğunda, y büyüktür eksi 1 de otomatik olarak sağlanır.",
  ],
},
{
  id: "axiom-loop", ch: "3.5 Dinamik semantik", chip: "<b>3.5b</b> Döngüler ve döngü değişmezi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Döngüler: <em>döngü değişmezi</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:760px;gap:12px">
        ${step("while y &lt;&gt; x do y = y + 1 end <span class='hl'>{y = x}</span>", 0, "text", "font-size:28px")}
        ${step("0 tur: {y = x}", 1, "muted")}
        ${step("1 tur: {y + 1 = x} → {y = x - 1}", 2, "muted")}
        ${step("2 tur: {y = x - 2}", 3, "muted")}
        ${step("3 tur: {y = x - 3} …", 3, "muted")}
        ${step("hepsi: <b>{y ≤ x}</b>", 4, "teal")}
        <p class="r" data-s="4" style="font-size:25px;color:var(--muted)">Tur sayısı bilinmediği için önkoşul doğrudan hesaplanamaz → <b>değişmez (invariant) I</b> gerekir.</p>
      </div>
      <div class="card r" data-s="5" style="flex:1"><h3>Döngü değişmezi I'nın şartları</h3>
        <ol style="margin:12px 0 0;padding-left:30px;font-size:25px;line-height:1.7;color:var(--muted)">
          <li><span class="mono tl">P ⟹ I</span> &nbsp;başta doğru</li><li><span class="mono tl">{I} B {I}</span> &nbsp;koşulu hesaplamak bozmaz</li><li><span class="mono tl">{I and B} S {I}</span> &nbsp;gövde bozmaz</li><li><span class="mono tl">(I and not B) ⟹ Q</span></li><li>Döngü <b>sonlanır</b> (kanıtı zor olabilir)</li></ol>
        <p style="margin-top:16px;font-size:24px">I, başta sağlanacak kadar <b>zayıf</b>, çıkışta Q'yu zorlayacak kadar <b>güçlü</b> olmalı.</p></div>
    </div>
  </div>`,
  n: [
    "Döngüler en zor kısımdır. Şu döngüye bakalım: y, x'e eşit olmadığı sürece y'yi bir artır. Sonkoşul: y eşittir x.",
    "Döngü hiç dönmezse önkoşul y eşittir x olmalıdır.",
    "Bir kez dönerse, y artı 1 eşittir x, yani y eşittir x eksi 1.",
    "İki kez dönerse y eşittir x eksi 2; üç kez dönerse y eşittir x eksi 3, ve böyle devam eder.",
    "Bunların hepsini birleştirirsek önkoşul y küçük eşit x olur. Ama genel olarak tur sayısı bilinmediği için bu yöntem işe yaramaz. Bunun yerine döngü değişmezi adı verilen bir I iddiası bulmamız gerekir.",
    "Döngü değişmezi şu şartları sağlamalıdır: önkoşul I'yı gerektirmeli; döngü koşulunu hesaplamak I'yı bozmamalı; I ve koşul doğruyken gövde çalışınca I yine doğru kalmalı; I doğru ve koşul yanlışsa, yani döngü bittiğinde, sonkoşul sağlanmalı; ve döngü sonlanmalıdır. Kısacası I, başta sağlanacak kadar zayıf, çıkışta sonkoşulu zorlayacak kadar güçlü olmalıdır.",
  ],
},
{
  id: "axiom-proof", ch: "3.5 Dinamik semantik", chip: "<b>3.5b</b> Program kanıtı: değiş tokuş",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kanıt: değiş tokuş <em>gerçekten</em> çalışıyor mu?</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px;gap:10px">
        ${step("<span class='tl'>{x = a and y = b}</span>", 0, "text")}
        ${step("t = x", 0, "muted")}${step("x = y", 0, "muted")}${step("y = t", 0, "muted")}
        ${step("<span class='hl'>{x = b and y = a}</span>", 0, "text")}
      </div>
      <div class="col f1" style="gap:14px">
        ${step("y = t &nbsp;&nbsp;⟸ {x = b and <b>t</b> = a}", 1, "teal", "font-size:30px")}
        ${step("x = y &nbsp;&nbsp;⟸ {<b>y</b> = b and t = a}", 2, "teal", "font-size:30px")}
        ${step("t = x &nbsp;&nbsp;⟸ {y = b and <b>x</b> = a}", 3, "teal", "font-size:30px")}
        <div class="card tint-t r" data-s="4" style="text-align:center"><h3 class="tl">Bulunan önkoşul = verilen önkoşul ✓</h3><p>Program doğru: sondan başa çalıştık, ilk ifadenin önkoşulu şartnameyle aynı çıktı.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Şimdi küçük bir programın doğruluğunu kanıtlayalım: iki değişkeni değiş tokuş eden üç satır. Başta x a'ya, y b'ye eşit. Sonunda x'in b'ye, y'nin a'ya eşit olmasını istiyoruz.",
    "Sondan başlıyoruz. y eşittir t ataması için, sonkoşuldaki y yerine t yazarız: x eşittir b ve t eşittir a.",
    "x eşittir y için, bu iddiadaki x yerine y yazarız: y eşittir b ve t eşittir a.",
    "t eşittir x için, t yerine x yazarız: y eşittir b ve x eşittir a.",
    "Bulduğumuz önkoşul, programın başında verilen önkoşulla tamamen aynı. Demek ki program doğrudur. Aksiyomatik semantikte program kanıtı tam olarak böyle yapılır: istenen sonuçtan geriye doğru çalışılır ve ilk ifadenin önkoşulu şartnameyle karşılaştırılır.",
  ],
},
{
  id: "axiom-eval", ch: "3.5 Dinamik semantik", chip: "<b>3.5b</b> Aksiyomatik semantiğin değerlendirmesi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aksiyomatik semantik: <em>artı ve eksi</em></h2>
    <div class="grid2" style="flex:1">
      <div class="card tint-t r" data-s="1"><h3 class="tl">✓ Güçlü yanları</h3><ul class="b t" style="margin-top:10px"><li>Program doğruluğunu <b>kanıtlamak</b> için iyi bir araç</li><li>Programlama mantığı için mükemmel bir çatı</li><li>Döngü değişmezleri gibi kavramlar, iyi program yazmayı öğretir</li></ul></div>
      <div class="card tint-c r" data-s="2"><h3 class="cl">✕ Zayıf yanları</h3><ul class="b" style="margin-top:10px"><li>Bir dilin <b>tüm</b> ifadeleri için aksiyom ve çıkarım kuralı yazmak çok zor</li><li>Dil kullanıcıları ve derleyici yazarları için pek kullanışlı değil</li></ul></div>
    </div>
  </div>`,
  n: [
    "Aksiyomatik semantiği değerlendirelim.",
    "Güçlü yanları: program doğruluğunu kanıtlamak için çok iyi bir araçtır ve programlama mantığı için mükemmel bir çatı sunar. Döngü değişmezleri gibi kavramları anlamak, daha doğru programlar yazmanıza da yardım eder.",
    "Zayıf yanları: bir dilin bütün ifadeleri için aksiyom ve çıkarım kuralları geliştirmek çok zordur. Bu yüzden dil kullanıcıları ve derleyici yazarları için pek kullanışlı değildir.",
  ],
},
{
  id: "denotational", ch: "3.5 Dinamik semantik", chip: "<b>3.5c</b> Denotasyonel semantik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="vl">Denotasyonel</span> semantik: <em>anlam = matematik</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:760px">
        <p class="lead r" data-s="0" style="font-size:27px">Scott ve Strachey (1970). Özyinelemeli fonksiyon teorisine dayanır. Her dil varlığı → bir <b>matematiksel nesne</b>.</p>
        <div class="r" data-s="1">${code("ikili sayılar", ["<bin_num> → '0' | '1'", "          | <bin_num> '0'", "          | <bin_num> '1'"], { lang: "plain", cls: "xs" })}</div>
        <div class="r" data-s="2">${code("anlam fonksiyonu M_bin", ["M_bin('0') = 0", "M_bin('1') = 1", { t: "M_bin(<bin_num> '0') = 2 * M_bin(<bin_num>)", hot: "5" }, { t: "M_bin(<bin_num> '1') = 2 * M_bin(<bin_num>) + 1", hot: "4" }], { lang: "plain", cls: "xs" })}</div>
      </div>
      <div class="col f1" style="align-items:center">
        <div class="mono r" data-s="3" style="font-size:40px">'110' = ?</div>
        <div class="r" data-s="3" style="width:100%;height:520px">${tree({ t: "<bin_num>", v: "6", vs: 5, c: [{ t: "<bin_num>", v: "3", vs: 4, c: [{ t: "<bin_num>", v: "1", vs: 3, c: ["'1'"] }, "'1'"] }, "'0'"] }, { s: 3, dx: 150, dy: 140, fs: 28, maxH: 520 })}</div>
      </div>
    </div>
  </div>`,
  n: [
    "Denotasyonel semantik, Dana Scott ve Christopher Strachey tarafından 1970'te geliştirildi. Özyinelemeli fonksiyon teorisine dayanır. Fikir şu: dildeki her varlık için bir matematiksel nesne ve varlıkları bu nesnelere eşleyen bir fonksiyon tanımlanır. Anlam, bu matematiksel nesnedir.",
    "Basit bir örnek: ikili sayılar. Gramere göre bir ikili sayı 0 ya da 1'dir, ya da bir ikili sayının sonuna 0 veya 1 eklenmiş halidir.",
    "Anlam fonksiyonu M_bin, her ikili sayıyı negatif olmayan bir tam sayıya eşler. Sıfır karakteri 0'a, bir karakteri 1'e eşlenir. Bir sayının sonuna 0 eklemek değeri ikiyle çarpar; 1 eklemek ise ikiyle çarpıp bir ekler.",
    "Şimdi 110 dizisinin anlamını ağaç üzerinde hesaplayalım. En alttaki 1'in anlamı 1.",
    "Onun sonuna 1 eklenince: 2 çarpı 1 artı 1, yani 3.",
    "Sonuna 0 eklenince: 2 çarpı 3, yani 6. Böylece 110 ikili dizisinin anlamı, matematiksel olarak 6 sayısıdır.",
  ],
},
{
  id: "denotational2", ch: "3.5 Dinamik semantik", chip: "<b>3.5c</b> Durum, ifadeler ve döngüler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Programın durumu ve <em>anlam fonksiyonları</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:720px">
        <div class="card r" data-s="0" style="padding:22px 28px"><h3 style="font-size:29px">Durum (state)</h3><div class="mono" style="font-size:26px;margin-top:8px">s = {&lt;i<sub>1</sub>,v<sub>1</sub>&gt;, …, &lt;i<sub>n</sub>,v<sub>n</sub>&gt;}</div><p style="font-size:24px;margin-top:8px"><span class="mono hl">VARMAP(i, s)</span> → değişkenin o anki değeri</p></div>
        <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:29px">Atama</h3><p style="font-size:24px"><span class="mono">M<sub>a</sub>(x := E, s)</span>: E hesaplanır; x'in değeri değişmiş <b>yeni bir durum</b> döner (hata varsa error).</p></div>
        <div class="note r" data-s="3" style="font-size:25px"><b>İşlemselden farkı:</b> durum değişimleri algoritmalarla değil, <b>matematiksel fonksiyonlarla</b> tanımlanır.</div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("while döngüsünün anlamı", ["M_l(while B do L, s) =", "  if M_b(B, s) == undef then error", "  else if M_b(B, s) == false then s", "  else if M_sl(L, s) == error then error", { t: "  else M_l(while B do L, M_sl(L, s))", hot: "2" }], { lang: "plain", cls: "xs" })}</div>
        <p class="lead r" data-s="2" style="font-size:25px">Döngü <b>özyinelemeye</b> dönüştü: koşul yanlışsa durum aynen döner; doğruysa gövdenin ürettiği yeni durumla döngü tekrar uygulanır.</p>
        <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:28px">Değerlendirme</h3><p style="font-size:24px">Doğruluk kanıtı ve dil tasarımı için titiz bir araç; derleyici üretme sistemlerinde kullanıldı. Karmaşıklığı yüzünden dil kullanıcıları pek kullanmaz.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Gerçek programlar için önce programın durumunu tanımlarız: durum, tüm değişkenlerin isim ve değer çiftleridir. VARMAP fonksiyonu, bir değişkenin adını ve durumu alıp o değişkenin o anki değerini döndürür.",
    "Atama ifadesinin anlam fonksiyonu bir durumu alır, ifadeyi hesaplar ve atanan değişkenin değeri değişmiş yeni bir durum döndürür. Bir hata varsa sonuç error olur.",
    "while döngüsünün anlamı ise özyinelemeyle tanımlanır: koşul yanlışsa durum aynen döner. Doğruysa, gövdenin ürettiği yeni durum üzerinde aynı döngünün anlamı tekrar uygulanır. Yani yineleme, matematiksel olarak açıklaması daha kolay olan özyinelemeye dönüştürülmüştür.",
    "İşlemsel semantikten farkına dikkat edin: orada durum değişiklikleri kodlanmış algoritmalarla tanımlanır; denotasyonel semantikte ise kesin matematiksel fonksiyonlarla.",
    "Denotasyonel semantik, programların doğruluğunu kanıtlamak ve programlar hakkında titizlikle düşünmek için güçlü bir araçtır; dil tasarımına yardımcı olur ve derleyici üretme sistemlerinde kullanılmıştır. Ama karmaşıklığı yüzünden dil kullanıcıları tarafından pek kullanılmaz.",
  ],
},
{
  id: "compare-fact", ch: "3.5 Dinamik semantik", chip: "<b>3.5</b> Üç yaklaşım, bir program",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aynı programa <em>üç bakış</em>: fact(3)</h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="col" style="width:560px">
        <div class="r" data-s="0">${code("fact.c", ["int fact(int x) {", "  int z = 1, y = x;", "  while (y > 0) {", "    z = z * y;", "    y = y - 1;", "  }", "  return z;", "}"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col f1" style="gap:18px">
        <div class="card tint-t r" data-s="1" style="padding:18px 24px"><h3 class="tl" style="font-size:28px">İşlemsel: durumları izle</h3>
          <div class="mono" style="font-size:22px;line-height:1.6;margin-top:6px">[z→1,y→3] → [z→3,y→2] → [z→6,y→1] → [z→6,y→0] ⇒ <b class="tl">6</b></div></div>
        <div class="card tint-a r" data-s="2" style="padding:18px 24px"><h3 class="hl" style="font-size:28px">Aksiyomatik: değişmezi kanıtla</h3>
          <div class="mono" style="font-size:22px;line-height:1.6;margin-top:6px">{x = n} … değişmez: z = n! / y! … {z = n!}</div></div>
        <div class="card tint-v r" data-s="3" style="padding:18px 24px"><h3 class="vl" style="font-size:28px">Denotasyonel: fonksiyon olarak gör</h3>
          <div class="mono" style="font-size:24px;line-height:1.6;margin-top:6px">f = λx. if x = 0 then 1 else x * f(x - 1)</div></div>
        <div class="note r" data-s="4" style="font-size:24px">İşlemsel: gerçekleştirmesi kolay · Aksiyomatik: kanıt için iyi · Denotasyonel: muhakemeyi kolaylaştırır</div>
      </div>
    </div>
  </div>`,
  n: [
    "Üç yaklaşımı aynı program üzerinde karşılaştıralım: x'in faktöriyelini hesaplayan bir C fonksiyonu, ve x eşittir 3 için çalışması.",
    "İşlemsel bakış durumları adım adım izler: z bir ve y üç ile başlar; z üç, y iki olur; z altı, y bir olur; sonra y sıfır olur ve döngü biter. Sonuç 6.",
    "Aksiyomatik bakış ise bir değişmez kullanarak kanıt yapar: döngü boyunca z eşittir n faktöriyel bölü y faktöriyel doğru kalır. Döngü bittiğinde y sıfır olduğundan, z eşittir n faktöriyel sonkoşulu kanıtlanmış olur.",
    "Denotasyonel bakış ise programı bir matematiksel fonksiyon olarak görür: f, x sıfırsa 1, değilse x çarpı f x eksi bir olan fonksiyondur.",
    "Özetle: işlemsel semantiği gerçekleştirmek kolaydır ama muhakeme zordur; aksiyomatik semantik teorem kanıtlamak için iyidir ama uygulamadan biraz uzaktır; denotasyonel semantik ise muhakemeyi kolaylaştırır, ama uygun matematiksel alanları bulmak her zaman kolay değildir.",
  ],
},
{
  id: "standards", ch: "Özet ve mini test", chip: "Son not: standartlaştırma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Neden <em>standart</em> gerekir?</h2>
    <div class="row" style="flex:1;gap:36px;align-items:center">
      <div class="col" style="width:820px">
        <p class="lead r" data-s="0" style="font-size:30px">Bir dil yaygınlaşınca, farklı donanımlarda <b>uyumlu</b> gerçekleştirimler için sözdizimi ve anlam <b>tam ve açık</b> tanımlanmalıdır.</p>
        <p class="lead r" data-s="1" style="font-size:30px">Standardı dil tasarımcısı, destekleyen kuruluş ya da bir standart kuruluşu belirler.</p>
      </div>
      <div class="col f1">
        <div class="card r rp" data-s="1" style="text-align:center"><div class="big" style="font-size:72px;color:var(--teal)">ANSI</div><p>American National Standards Institute</p></div>
        <div class="card r rp" data-s="1" style="text-align:center;transition-delay:.2s"><div class="big" style="font-size:72px;color:var(--amber)">ISO</div><p>International Organization for Standardization</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Son bir not: programlama dillerinin standartlaştırılması. Bir dil yaygın olarak kullanılmaya başlandığında, farklı donanımlarda birbiriyle uyumlu gerçekleştirimler yapılabilmesi için dilin sözdizimi ve anlamı tam ve açık biçimde tanımlanmalıdır. Bu bölümde gördüğümüz biçimsel yöntemler, işte bu yüzden önemlidir.",
    "Bir dil standardını, dilin tasarımcısı, dili destekleyen kuruluş ya da Amerika'da ANSI, uluslararası alanda ISO gibi standart kuruluşları belirleyebilir.",
  ],
},
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="flex:1">
      ${[["📐", "t", "Sentaks", "BNF ve içerikten bağımsız gramerler eşdeğer metadillerdir; sentaksı tanımlamak için idealdir."], ["🌳", "a", "Ağaçlar", "Türetme ↔ ayrıştırma ağacı. Belirsizlik, öncelik ve birleşirlik gramerle çözülür."],
         ["🏷️", "v", "Özellik gramerleri", "Gramere özellik, fonksiyon ve koşul ekleyerek statik semantiği tanımlar."], ["🧠", "c", "Dinamik semantik", "İşlemsel, aksiyomatik ve denotasyonel yaklaşımlar."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "BNF ve içerikten bağımsız gramerler eşdeğer metadillerdir ve programlama dillerinin sentaksını tanımlamak için çok uygundur.",
    "Türetmeler ve ayrıştırma ağaçları birbirinin karşılığıdır. Belirsizlik, operatör önceliği ve birleşirlik gramerin yapısıyla çözülür.",
    "Özellik gramerleri, gramere özellikler, fonksiyonlar ve koşullar ekleyerek dilin statik semantiğini tanımlar.",
    "Dinamik semantiği, yani programların anlamını tanımlamanın üç temel yolu ise işlemsel, aksiyomatik ve denotasyonel semantiktir.",
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
          <div style="font-size:50px;font-weight:600;line-height:1.35">${q.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div></div>
        <div class="r" data-s="${1 + i * 2}" data-h="${2 + i * 2}" style="font-size:32px;color:var(--muted);display:flex;align-items:center;gap:26px">
          <svg viewBox="0 0 100 100" style="width:110px;height:110px"><circle cx="50" cy="50" r="42" fill="none" stroke="#2a3160" stroke-width="9"/><circle class="cd" cx="50" cy="50" r="42" fill="none" stroke="#ffb547" stroke-width="9" stroke-linecap="round" stroke-dasharray="264" transform="rotate(-90 50 50)"/></svg>
          <span><span class="emo">⏸️</span> Videoyu durdurup düşünebilirsin…</span></div>
        <div class="card tint-t r rp" data-s="${2 + i * 2}" style="padding:34px 50px;border-color:rgba(53,208,192,.5)"><div style="font-size:42px;font-weight:700;color:var(--teal);line-height:1.35">✓ ${a.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div></div>
      </div>`).join("")}
    </div>
    <style>.cd{stroke-dashoffset:0}.r.on .cd{animation:cd 4s linear 1.2s both}@keyframes cd{from{stroke-dashoffset:0}to{stroke-dashoffset:264}}</style>
  </div>`,
  n: [
    "Şimdi kısa bir mini test yapalım. Her sorudan sonra birkaç saniye düşünme süreniz var.",
    { t: "Soru 1. Sentaks ile semantik arasındaki fark nedir?", pause: 3.5 }, "Cevap: Sentaks programın biçimi, semantik ise anlamıdır.",
    { t: "Soru 2. Bir gramer ne zaman belirsizdir?", pause: 3.5 }, "Cevap: Bir cümle için iki ya da daha fazla farklı ayrıştırma ağacı üretebiliyorsa.",
    { t: "Soru 3. EBNF'te süslü parantez ne anlama gelir?", pause: 3.5 }, "Cevap: Sıfır ya da daha fazla kez yineleme.",
    { t: "Soru 4. a eşittir b artı 1 ifadesi ve a büyüktür 1 sonkoşulu için en zayıf önkoşul nedir?", pause: 3.5 }, "Cevap: b büyüktür sıfır.",
    { t: "Soru 5. Programın anlamını matematiksel fonksiyonlarla tanımlayan semantik hangisidir?", pause: 3.5 }, "Cevap: Denotasyonel semantik.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 3 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Sıradaki: <b style="color:var(--text)">Bölüm 4 — Sözcüksel ve sentaks analiz</b></div>
    <div class="r" data-s="1" style="font-size:24px;color:var(--faint);margin-top:60px;text-align:center;line-height:1.6;max-width:1500px">Ödev önerileri: Java'nın BNF yapısını araştırın · a = a * (b + (c * a)) için sola dayalı türetme ve ayrıştırma ağacı çizin<br>Kaynaklar: Sebesta · Watt · Scott · Z. Orhan · M. Şahin · E. Tanyıldızı · Ahmet Yesevi Üniversitesi</div>
  </div>`,
  n: [
    "Bölüm 3'ü tamamladık! Bir sonraki bölümde, bu gramerleri kullanarak bir derleyicinin kaynak kodu nasıl token'lara ayırdığını ve nasıl ayrıştırdığını, yani sözcüksel ve sentaks analizi göreceğiz.",
    "Pratik için şunu deneyin: a eşittir a çarpı parantez b artı parantez c çarpı a ifadesi için bir gramer yazın, sola dayalı türetmesini yapın ve ayrıştırma ağacını çizin. İzlediğiniz için teşekkürler, görüşmek üzere!",
  ],
},
];
