const { code } = require("../build/lib");
const { tl, head } = require("./h");

// ───── genealogy graph
const N = {
  plank: ["Plankalkül", 1945, 60, 1], short: ["Short Code", 1949, 150, 1], fortran: ["Fortran I", 1957, 240, 1], algol58: ["ALGOL 58", 1958, 340, 1], lisp: ["LISP", 1959, 640, 1],
  algol60: ["ALGOL 60", 1960, 420, 2], cobol: ["COBOL", 1960, 60, 2], apl: ["APL", 1962, 560, 2], basic: ["BASIC", 1964, 150, 2], snobol: ["SNOBOL", 1964, 480, 2], pli: ["PL/I", 1965, 60, 2], simula: ["SIMULA 67", 1967, 360, 2], algol68: ["ALGOL 68", 1968, 250, 2],
  pascal: ["Pascal", 1971, 420, 3], c: ["C", 1972, 250, 3], prolog: ["Prolog", 1972, 640, 3], scheme: ["Scheme", 1975, 560, 3], smalltalk: ["Smalltalk", 1980, 360, 3], ada: ["Ada", 1983, 450, 3], clisp: ["Common LISP", 1984, 640, 3], cpp: ["C++", 1985, 250, 3], perl: ["Perl", 1987, 150, 3],
  python: ["Python", 1991, 560, 4], vb: ["Visual Basic", 1991, 60, 4], java: ["Java", 1995, 300, 4], js: ["JavaScript", 1995, 190, 4], php: ["PHP", 1995, 100, 4], ruby: ["Ruby", 1995, 470, 4], csharp: ["C#", 2000, 300, 4],
};
const E = [["fortran", "algol58"], ["algol58", "algol60"], ["fortran", "basic"], ["fortran", "pli"], ["cobol", "pli"], ["algol60", "pli"], ["algol60", "algol68"], ["algol60", "simula"], ["algol60", "pascal"], ["algol68", "c"],
  ["simula", "smalltalk"], ["simula", "cpp"], ["c", "cpp"], ["pascal", "ada"], ["lisp", "scheme"], ["lisp", "clisp"], ["scheme", "clisp"], ["c", "perl"], ["snobol", "perl"], ["basic", "vb"], ["cpp", "java"], ["java", "csharp"], ["cpp", "csharp"],
  ["smalltalk", "ruby"], ["perl", "ruby"], ["perl", "php"], ["java", "js"], ["short", "fortran"], ["apl", "python"], ["lisp", "python"]];
const gx = (y) => 70 + ((y - 1945) / (2001 - 1945)) * 1500;
const nodeW = (t) => t.length * 13 + 34;
function genealogy(stepOf = (era) => era, extra = "") {
  const edges = E.map(([a, b]) => {
    const [, ya, la] = N[a], [, yb, lb, eb] = N[b];
    const x1 = gx(ya) + nodeW(N[a][0]) / 2, y1 = la, x2 = gx(yb) - nodeW(N[b][0]) / 2, y2 = lb, mx = (x1 + x2) / 2;
    return `<path class="r rf" data-s="${stepOf(eb)}" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" stroke="#3a4278" stroke-width="2.5" fill="none"/>`;
  }).join("");
  const nodes = Object.entries(N).map(([k, [t, y, l, e]]) => {
    const w = nodeW(t), c = ["", "teal", "amber", "violet", "coral"][e];
    return `<g class="r rp" data-s="${stepOf(e)}" style="transform-box:fill-box;transform-origin:center"><rect x="${gx(y) - w / 2}" y="${l - 21}" width="${w}" height="42" rx="21" fill="#151a31" stroke="var(--${c})" stroke-width="2.5"/>
      <text x="${gx(y)}" y="${l + 7}" fill="#eef0fa" font-size="21" font-weight="600" text-anchor="middle">${t}</text></g>`;
  }).join("");
  const decades = [1950, 1960, 1970, 1980, 1990, 2000].map((d) => `<line x1="${gx(d)}" y1="20" x2="${gx(d)}" y2="690" stroke="#1d2242" stroke-width="2"/><text x="${gx(d)}" y="712" fill="#6b7399" font-size="20" text-anchor="middle" font-family="JBM">${d}</text>`).join("");
  return `<svg viewBox="0 0 1680 720" style="width:100%;height:100%">${decades}${edges}${nodes}${extra}</svg>`;
}

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:18px;margin-bottom:56px;flex-wrap:wrap;justify-content:center;max-width:1400px">
      ${["Plankalkül", "Fortran", "LISP", "ALGOL", "COBOL", "BASIC", "Pascal", "C", "Prolog", "Ada", "Smalltalk", "C++", "Java", "Python", "C#"].map((t, i) => `<span class="pill ${["t", "a", "v", "c"][i % 4]}" style="font-size:28px">${t}</span>`).join("")}
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:120px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 2: Önemli Dillerin<br>Gelişimi</div>
    <div class="r" data-s="2" style="font-size:32px;color:var(--muted)">1940'lardan 2000'lere programlama dillerinin hikâyesi</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin ikinci bölümüne hoş geldiniz.",
    "Bu bölümde, Plankalkül'den C#'a kadar önemli programlama dillerinin nasıl ortaya çıktığını inceleyeceğiz.",
    "Her dil için üç soru soracağız: Hangi ihtiyaçtan doğdu, ne yenilik getirdi ve sonraki dilleri nasıl etkiledi? Ezber yerine bu bağlantıları kavramaya çalışın; bir sonraki bölümler bu temelin üzerine kurulacak.",
  ],
},
{
  id: "genealogy", ch: "Giriş", chip: "Dillerin soyağacı",
  html: `
  <div class="wrap" style="top:120px;bottom:40px">
    <div class="f1 r" data-s="0">${genealogy()}</div>
  </div>`,
  n: [
    "Önce büyük resme bakalım. Bu, yaygın dillerin basitleştirilmiş soyağacı. Yatay eksen zamanı gösteriyor; oklar ise hangi dilin hangisinden etkilendiğini.",
    "Kırklı ve ellili yıllar: Zuse'nin Plankalkül'ü, sözde kodlar, ilk derlenen yüksek seviyeli dil Fortran, ALGOL 58 ve yapay zekâ dili LISP.",
    "Altmışlı yıllar: ALGOL 60, iş dünyası için COBOL, öğrenciler için BASIC, her şeyi bir arada isteyen PL/I, dinamik diller APL ve SNOBOL, ilk sınıf kavramını getiren SIMULA 67 ve ALGOL 68.",
    "Yetmişler ve seksenler: ALGOL'un torunları Pascal ve C, mantıksal programlama dili Prolog, nesne yönelimli Smalltalk, dev bir tasarım projesi olan Ada ve C++.",
    "Doksanlar ve sonrası: web ve betik dilleri, yani Perl, Python, JavaScript, PHP ve Ruby, ayrıca Java ve C#. Dikkat edin: neredeyse her modern dilin kökü Fortran, ALGOL veya LISP'e dayanıyor.",
  ],
},
// ───────────────── 2.1 Plankalkül
{
  id: "plankalkul", ch: "2.1 Zuse'nin Plankalkül'ü", chip: "<b>2.1</b> Zuse'nin Plankalkül'ü",
  html: `
  <div class="wrap">
    ${head("Plankalkül", "Konrad Zuse · Almanya · 1945")}
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="0"><div class="ic t">🖥️</div><h3>Arka plan</h3><p>ENIAC gibi ilk bilgisayarlar doğrudan makine düzeyinde programlanıyordu. Zuse, Z4 bilgisayarı için çok daha üst düzey bir dil tasarladı.</p></div>
        <div class="card r" data-s="1"><h3>Öncü özellikler</h3>
          <ul class="b t" style="margin-top:8px"><li style="font-size:28px">İlk <b>yüksek seviyeli</b> dil (donanımdan bağımsız)</li><li style="font-size:28px">Kayan nokta, <b>diziler</b>, <b>kayıtlar</b></li><li style="font-size:28px">Değişmezler (invariants)</li></ul></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="2"><h3>Sözdizimi: <span class="mono hl">A[5] = A[4] + 1</span></h3>
          <pre class="mono" style="font-size:34px;line-height:1.6;margin:18px 0 0;color:var(--text)">  |  A + 1  =>  A
<span class="tl">V</span> |  4           5    <span class="cm" style="font-size:24px">← indisler</span>
<span class="vl">S</span> |  1.n         1.n  <span class="cm" style="font-size:24px">← veri tipleri</span></pre>
          <p style="margin-top:14px">Çok satırlı, alışılmadık gösterim.</p></div>
        <div class="note r" data-s="3">1945'te yazıldı ama <b>1972'ye kadar yayımlanmadı</b>; ilk derleyicisi ancak <b>1998</b>'de yapıldı. Adı: “planlama için biçimsel sistem”.</div>
      </div>
    </div>
    ${tl(1945)}
  </div>`,
  n: [
    "Bölüm 2.1: Zuse'nin Plankalkül'ü. Kırklı yıllarda ENIAC gibi ilk bilgisayarlar doğrudan makine düzeyinde programlanıyordu. Alman mühendis Konrad Zuse ise Z4 bilgisayarı için çok daha üst düzey bir dil tasarladı: Plankalkül.",
    "Plankalkül, donanımın ayrıntılarına bağlı olmayan ilk yüksek seviyeli programlama dilidir. Kayan noktalı sayılar, diziler ve kayıtlar gibi o dönem için çok ileri veri yapıları içeriyordu; hatta programın doğruluğu için değişmezler tanımlanabiliyordu.",
    "Sözdizimi ise oldukça alışılmadıktı. A dizisinin dördüncü elemanına bir ekleyip sonucu beşinci elemana atayan ifade, üç satırda yazılıyordu: ilk satır ifadenin kendisi, V satırı indisler, S satırı ise veri tipleri.",
    "Ne yazık ki Plankalkül 1945'te tamamlanmasına rağmen 1972'ye kadar yayımlanmadı ve hiç gerçekleştirilmedi. İlk derleyicisi ancak 1998'de yazıldı. Bu yüzden sonraki dillere etkisi sınırlı kaldı.",
  ],
},
// ───────────────── 2.2 Pseudocodes
{
  id: "pseudocode", ch: "2.2 Sözde kodlar", chip: "<b>2.2</b> Minimum donanım programlama: sözde kodlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Makine kodu neden <em>kötüydü?</em></h2>
    <div class="grid4 r" data-s="0" style="margin-bottom:34px">
      ${[["👓", "Az okunabilir"], ["✏️", "Zor değiştirilir"], ["😩", "İfade yazmak usandırıcı"], ["🧮", "İndeksleme ve kayan nokta yok"]].map(([e, t]) => `<div class="card" style="padding:24px;display:flex;gap:18px;align-items:center"><span class="emo" style="font-size:40px">${e}</span><span style="font-size:27px;font-weight:600">${t}</span></div>`).join("")}
    </div>
    <div class="row" style="flex:1;gap:36px">
      <div class="card r" data-s="1" style="flex:1.3"><h3>Short Code <span style="font-size:24px;color:var(--muted);font-weight:400">· Mauchly · BINAC · 1949</span></h3>
        <p>İfadeler sayı kodlarına çevrilip <b>yorumlanıyordu</b>:</p>
        <div class="mono" style="font-size:32px;margin-top:20px">X0 = SQRT(ABS(Y0))</div>
        <div class="r" data-s="2" style="display:flex;gap:12px;margin-top:20px;font-family:JBM;font-size:32px">
          ${[["00", "boşluk"], ["X0", ""], ["03", "="], ["20", "√"], ["06", "abs"], ["Y0", ""]].map(([a, b]) => `<div style="text-align:center"><div style="padding:8px 14px;border-radius:12px;background:var(--panel2);border:2px solid var(--teal)">${a}</div><div style="font-size:20px;color:var(--muted);margin-top:6px;height:24px">${b}</div></div>`).join("")}
        </div></div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:24px 30px"><h3 style="font-size:30px">Speedcoding <span style="font-size:22px;color:var(--muted);font-weight:400">· Backus · IBM 701 · 1954</span></h3><p style="font-size:25px">Kayan nokta için sözde komutlar, otomatik artan yazmaçlar. Ama yavaş: kullanıcıya sadece <b>700 kelime</b> bellek kalıyordu.</p></div>
        <div class="card r" data-s="4" style="padding:24px 30px"><h3 style="font-size:30px">UNIVAC derleme sistemi</h3><p style="font-size:25px"><b>Grace Hopper</b>'ın ekibi: sözde kodu <b>makine koduna genişletti</b> — derleyicinin atası. Wheeler (Cambridge): yeniden yerleştirilebilir adres blokları.</p></div>
      </div>
    </div>
    ${tl([1949, 1954])}
  </div>`,
  n: [
    "Bölüm 2.2: Sözde kodlar. Kırklı yılların sonunda programlar makine koduyla yazılıyordu ve bu çok zahmetliydi. Makine kodu okunması zor, değiştirilmesi zor bir koddu; aritmetik ifadeleri yazmak usandırıcıydı. Üstelik makinelerde indeksleme ve kayan nokta desteği yoktu.",
    "İlk çözüm Short Code oldu. John Mauchly tarafından 1949'da BINAC bilgisayarı için geliştirildi. İfadeler sayısal kodlara çevriliyor ve bir yorumlayıcı tarafından çalıştırılıyordu.",
    "Örneğin X0 eşittir karekök mutlak değer Y0 ifadesi, şu kod dizisine dönüşüyordu: 00 boşluk, X0, 03 eşittir, 20 karekök, 06 mutlak değer ve Y0. Makine kodundan iyiydi, ama yorumlama yüzünden çok yavaştı.",
    "1954'te John Backus, IBM 701 için Speedcoding'i geliştirdi. Kayan noktalı işlemler için sözde komutlar ve dizi erişiminde otomatik artan yazmaçlar sunuyordu. Ama o da yavaştı ve yorumlayıcı belleği o kadar dolduruyordu ki kullanıcı programına sadece 700 kelime kalıyordu.",
    "Aynı yıllarda Grace Hopper'ın ekibi UNIVAC için sözde kodu makine koduna genişleten sistemler geliştirdi; bunlar derleyicilerin atasıdır. Cambridge'den David Wheeler ise mutlak adresleme sorununu çözmek için yeniden yerleştirilebilir adres blokları kullandı.",
  ],
},
// ───────────────── 2.3 Fortran
{
  id: "fortran1", ch: "2.3 IBM 704 ve Fortran", chip: "<b>2.3</b> IBM 704 ve Fortran",
  html: `
  <div class="wrap">
    ${head("Fortran", "John Backus · IBM · 1957", "teal")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px">
        <div class="card r" data-s="1"><div class="ic t">⚡</div><h3>IBM 704 her şeyi değiştirdi</h3><p>Donanımda <b>indeks yazmaçları</b> ve <b>kayan nokta</b> vardı → yorumlamanın maliyetini gizleyecek yer kalmadı → <b>derlenen</b> diller fikri doğdu.</p></div>
        <div class="card r" data-s="2"><h3>Geliştirme ortamı</h3><ul class="b t" style="margin-top:6px"><li style="font-size:27px">Bilgisayarlar küçük ve güvenilmez</li><li style="font-size:27px">Uygulamalar bilimsel</li><li style="font-size:27px">Yöntem ve araç yok; asıl dert <b>makine verimliliği</b></li></ul></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3"><h3>Fortran I (1957)</h3>
          <ul class="b" style="margin-top:6px"><li style="font-size:26px">İsimler en fazla <b>6 karakter</b></li><li style="font-size:26px">Sonda testli sayma döngüsü (<span class="mono">DO</span>)</li><li style="font-size:26px">Biçimli G/Ç, kullanıcı alt programları</li><li style="font-size:26px">Üç yollu <b>aritmetik IF</b></li><li style="font-size:26px">Veri tipi bildirimi yok</li></ul></div>
        <div class="note r" data-s="4">Derleyici <b>18 iş-yılı</b> sonra, Nisan 1957'de çıktı. Kod çok hızlıydı → kısa sürede yaygınlaştı.</div>
      </div>
    </div>
    ${tl(1957, "teal")}
  </div>`,
  n: [
    "Bölüm 2.3: IBM 704 ve Fortran. Fortran, yaygın kabul görmüş ilk derlenen yüksek seviyeli dildir. IBM'de John Backus liderliğinde geliştirildi.",
    "Fortran'ı mümkün kılan IBM 704 bilgisayarıydı. Bu makinenin donanımında indeks yazmaçları ve kayan nokta komutları vardı. Önceki sistemlerde yorumlamanın yavaşlığı, yazılımla yapılan kayan nokta işlemlerinin yavaşlığı içinde gizleniyordu. Artık gizlenecek yer kalmamıştı; bu da derleme fikrini doğurdu.",
    "Dönemin koşullarına bakın: bilgisayarlar küçük ve güvenilmezdi, uygulamalar bilimseldi, programlama yöntemleri ve araçları yoktu. En önemli dert makine verimliliğiydi. Bu yüzden Fortran I'de dinamik belleğe gerek görülmedi; iyi dizi işleme ve sayma döngüleri yeterliydi.",
    "Fortran I'de isimler en fazla altı karakter olabiliyordu. Sonda testli bir sayma döngüsü, yani DO, biçimlendirilmiş girdi çıktı, kullanıcı tanımlı alt programlar ve üç yollu aritmetik IF vardı. Veri tipi bildirimi ise yoktu; tip, değişkenin baş harfinden anlaşılıyordu.",
    "Derleyici, on sekiz iş-yılı süren bir çabanın ardından Nisan 1957'de çıktı. Ürettiği kod o kadar hızlıydı ki Fortran kısa sürede yaygınlaştı.",
  ],
},
{
  id: "fortran-evo", ch: "2.3 IBM 704 ve Fortran", chip: "<b>2.3</b> Fortran'ın evrimi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Fortran'ın <em>evrimi</em></h2>
    <div class="grid5" style="flex:1;align-items:start">
      ${[["Fortran II", "1958", "Bağımsız derleme, hata düzeltmeleri", 1], ["Fortran IV", "1960–62", "Açık tip bildirimi, mantıksal IF, alt program parametreleri · ANSI 1966", 1],
         ["Fortran 77", "1978", "Karakter dizisi işleme, mantıksal döngü, IF-THEN-ELSE", 2], ["Fortran 90", "1990", "Modüller, dinamik diziler, işaretçiler, özyineleme, CASE, parametre tip kontrolü", 2],
         ["95 · 2003 · 2008", "", "Küçük eklemeler; 2003'te nesne yönelimli destek", 3]].map(([n, y, p, s], i) => `
        <div class="card r rp" data-s="${s}" style="padding:28px 24px;min-height:${300 + i * 40}px"><div class="mono" style="color:var(--teal);font-size:26px">${y}</div><h3 style="font-size:32px;margin:8px 0 14px">${n}</h3><p style="font-size:24px">${p}</p></div>`).join("")}
    </div>
    <div class="note r" data-s="4" style="margin-top:24px"><b>Değerlendirme:</b> çok iyi optimize eden derleyiciler; tüm değişkenlerin tipi ve belleği çalışmadan önce belli. Fortran, bilgisayar dünyasının <b>“lingua franca”</b>sı oldu.</div>
    ${tl([1958, 2003], "teal")}
  </div>`,
  n: [
    "Fortran yıllar içinde sürekli gelişti.",
    "1958'deki Fortran II, alt programların ayrı ayrı derlenmesine izin verdi. 1960 ile 62 arasında geliştirilen Fortran IV ise açık tip bildirimleri, mantıksal IF ifadesi ve alt program isimlerinin parametre olarak geçirilmesini getirdi. 1966'da ANSI standardı oldu.",
    "Fortran 77 karakter dizisi işleme, mantıksal döngü kontrolü ve IF-THEN-ELSE ifadesini ekledi. Fortran 90 ise büyük bir sıçramaydı: modüller, dinamik diziler, işaretçiler, özyineleme, CASE ifadesi ve parametre tip kontrolü.",
    "Fortran 95, 2003 ve 2008 daha küçük eklemeler yaptı; 2003 sürümüyle nesne yönelimli programlama desteği geldi.",
    "Değerlendirelim: Fortran derleyicileri çok iyi optimizasyon yapıyordu, çünkü doksan öncesi sürümlerde tüm değişkenlerin tipi ve belleği çalışmadan önce sabitti. Fortran bilgisayarların kullanılma biçimini kökten değiştirdi ve bilgisayar dünyasının ortak dili, yani lingua franca'sı olarak anıldı.",
  ],
},
// ───────────────── 2.4 LISP
{
  id: "lisp", ch: "2.4 Fonksiyonel programlama: LISP", chip: "<b>2.4</b> Fonksiyonel programlama: LISP",
  html: `
  <div class="wrap">
    ${head("LISP", "John McCarthy · MIT · 1959", "violet")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="1"><div class="ic v">🧠</div><h3>Yapay zekânın ihtiyaçları</h3><ul class="b v" style="margin-top:6px"><li style="font-size:27px">Veriyi <b>liste</b> olarak işlemek (dizi yerine)</li><li style="font-size:27px"><b>Sembolik</b> hesaplama (sayısal yerine)</li></ul></div>
        <div class="card r" data-s="2"><h3>Sadece iki veri tipi</h3><div class="row" style="gap:20px;margin-top:10px"><span class="pill v" style="font-size:30px">atom</span><span class="pill v" style="font-size:30px">liste</span></div><p style="margin-top:14px">Sözdizimi <b>lambda hesabına</b> dayanır.</p></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="text-align:center"><h3>Kod = Veri</h3>
          <div class="mono big" style="font-size:72px;margin:20px 0">(A B C D)</div>
          <div class="grid2" style="gap:20px">
            <div class="r" data-s="3" style="padding:18px;border-radius:16px;background:rgba(53,208,192,.1)"><b class="tl" style="font-size:28px">Veri olarak</b><p style="font-size:24px">A, B, C, D'den oluşan bir liste</p></div>
            <div class="r" data-s="4" style="padding:18px;border-radius:16px;background:rgba(164,147,255,.12)"><b class="vl" style="font-size:28px">Kod olarak</b><p style="font-size:24px">A fonksiyonunu B, C, D'ye uygula</p></div>
          </div></div>
      </div>
    </div>
    ${tl(1959, "violet")}
  </div>`,
  n: [
    "Bölüm 2.4: Fonksiyonel programlama ve LISP. LISP, yani liste işleme dili, John McCarthy tarafından MIT'de IBM 704 için tasarlandı.",
    "Yapay zekâ araştırmaları Fortran'ın sunamadığı şeylere ihtiyaç duyuyordu: veriyi diziler yerine listeler halinde işlemek ve sayısal hesaplama yerine sembolik hesaplama yapmak.",
    "LISP'te yalnızca iki veri tipi vardır: atomlar ve listeler. Sözdizimi ise Alonzo Church'ün lambda hesabına dayanır.",
    "LISP'in en şaşırtıcı özelliği, kodun ve verinin aynı biçimde olmasıdır. Parantez içindeki A B C D ifadesi, veri olarak düşünülürse A, B, C ve D'den oluşan dört elemanlı bir listedir.",
    "Ama kod olarak yorumlanırsa, A fonksiyonunun B, C ve D parametrelerine uygulanması anlamına gelir. Programların kendini veri gibi işleyebilmesi, LISP'i yapay zekâda uzun yıllar rakipsiz yaptı.",
  ],
},
{
  id: "lisp-lists", ch: "2.4 Fonksiyonel programlama: LISP", chip: "<b>2.4</b> LISP listelerinin iç yapısı",
  html: (() => {
    const cell = (x, y, label, last, s) => `<g class="r rp" data-s="${s}" style="transform-box:fill-box;transform-origin:center"><rect x="${x}" y="${y}" width="56" height="48" fill="#151a31" stroke="#a493ff" stroke-width="2.5"/><rect x="${x + 56}" y="${y}" width="56" height="48" fill="#151a31" stroke="#a493ff" stroke-width="2.5"/>
      ${last ? `<line x1="${x + 60}" y1="${y + 44}" x2="${x + 108}" y2="${y + 4}" stroke="#a493ff" stroke-width="2.5"/>` : `<circle cx="${x + 84}" cy="${y + 24}" r="5" fill="#a493ff"/><line x1="${x + 84}" y1="${y + 24}" x2="${x + 150}" y2="${y + 24}" stroke="#a493ff" stroke-width="2.5" marker-end="url(#la)"/>`}
      <circle cx="${x + 28}" cy="${y + 24}" r="5" fill="#ffb547"/>${label ? `<line x1="${x + 28}" y1="${y + 24}" x2="${x + 28}" y2="${y + 82}" stroke="#ffb547" stroke-width="2.5" marker-end="url(#lb)"/><text x="${x + 28}" y="${y + 116}" fill="#eef0fa" font-size="30" text-anchor="middle" font-family="JBM">${label}</text>` : ""}</g>`;
    const row = (x, y, labels, s) => labels.map((l, i) => cell(x + i * 160, y, l, i === labels.length - 1, s)).join("");
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Listeler <em>bağlı hücrelerdir</em></h2>
    <svg viewBox="0 0 1680 640" style="width:100%;height:690px">
      <defs><marker id="la" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a493ff"/></marker><marker id="lb" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ffb547"/></marker></defs>
      <text class="r" data-s="0" x="0" y="34" fill="#35d0c0" font-size="34" font-family="JBM">(A B C D)</text>
      ${row(0, 56, ["A", "B", "C", "D"], 0)}
      <text class="r" data-s="1" x="0" y="236" fill="#35d0c0" font-size="34" font-family="JBM">(A (B C) D (E (F G)))</text>
      ${row(0, 258, ["A", "", "D", ""], 1)}
      ${row(160, 378, ["B", "C"], 2)}
      ${row(480, 378, ["E", ""], 2)}
      ${row(640, 498, ["F", "G"], 3)}
      <g class="r" data-s="2"><line x1="188" y1="282" x2="188" y2="372" stroke="#ffb547" stroke-width="2.5" marker-end="url(#lb)"/><line x1="508" y1="282" x2="508" y2="372" stroke="#ffb547" stroke-width="2.5" marker-end="url(#lb)"/></g>
      <g class="r" data-s="3"><line x1="668" y1="402" x2="668" y2="492" stroke="#ffb547" stroke-width="2.5" marker-end="url(#lb)"/></g>
      <g class="r" data-s="1"><text x="1080" y="300" fill="#a2a9d2" font-size="26">● sol yarı: elemana işaretçi (CAR)</text><text x="1080" y="340" fill="#a2a9d2" font-size="26">● sağ yarı: sonraki hücre (CDR)</text><text x="1080" y="380" fill="#a2a9d2" font-size="26">╱ çapraz çizgi: liste sonu (NIL)</text></g>
    </svg>
    ${tl(1959, "violet")}
  </div>`;
  })(),
  n: [
    "LISP listeleri bellekte bağlı hücreler olarak tutulur. Her hücrenin iki yarısı vardır: sol yarı listenin elemanını, sağ yarı ise bir sonraki hücreyi gösterir. A B C D listesi, böylece dört hücreden oluşan bir zincirdir.",
    "Peki iç içe listeler? A, parantez içinde B C, D ve parantez içinde E, F G listesine bakalım. Ana zincirde yine dört hücre var; ama ikinci ve dördüncü hücreler bir atomu değil, başka bir listeyi gösteriyor.",
    "İkinci eleman, B ve C'den oluşan alt listeyi; dördüncü eleman ise E ile başlayan alt listeyi gösterir.",
    "O alt listenin ikinci elemanı da F G listesidir. Listeler istenildiği kadar iç içe geçebilir. Ağaç gibi karmaşık yapıları bu kadar basit bir yapıyla ifade edebilmek, LISP'in gücünün kaynağıdır.",
  ],
},
{
  id: "lisp-eval", ch: "2.4 Fonksiyonel programlama: LISP", chip: "<b>2.4</b> LISP'in değerlendirmesi",
  html: `
  <div class="wrap">
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <h2 class="t r" data-s="0" style="font-size:54px;margin-bottom:6px">Değerlendirme</h2>
        <ul class="b v r" data-s="0"><li>Fonksiyonel programlamanın <b>öncüsü</b></li><li>Değişkene ya da atamaya gerek yok</li><li>Kontrol: <b>özyineleme</b> ve koşullu ifadeler</li><li>Yıllarca yapay zekânın baskın dili</li></ul>
        <div class="row r" data-s="2" style="gap:20px;margin-top:20px">
          <div class="card f1" style="padding:24px"><h3 style="font-size:30px">Scheme</h3><p style="font-size:24px">MIT, 1970'ler. Küçük, statik kapsam, birinci sınıf fonksiyonlar → eğitim için ideal.</p></div>
          <div class="card f1" style="padding:24px"><h3 style="font-size:30px">Common LISP</h3><p style="font-size:24px">Lehçeleri tek dilde toplama çabası. Büyük ve karmaşık; ANSI standardı.</p></div>
        </div>
      </div>
      <div class="col f1">
        <div class="r" data-s="1">${code("esit_listeler.lisp", ["(DEFUN equal_lists (list1 list2)", "  (COND", "    ((ATOM list1) (EQ list1 list2))", "    ((ATOM list2) NIL)", "    ((equal_lists (CAR list1) (CAR list2))", "     (equal_lists (CDR list1) (CDR list2)))", "    (T NIL)))"], { lang: "scheme", cls: "xs" })}</div>
        <p class="lead r" data-s="1" style="font-size:26px">İki liste eşit mi? <b>CAR</b>: ilk eleman, <b>CDR</b>: geri kalanı. Döngü yok — sadece özyineleme.</p>
        <div class="pills r" data-s="3"><span class="pill v">ML</span><span class="pill v">Miranda</span><span class="pill v">Haskell</span><span style="font-size:26px;color:var(--muted);align-self:center">· akraba diller</span></div>
      </div>
    </div>
    ${tl(1959, "violet")}
  </div>`,
  n: [
    "LISP'i değerlendirelim. LISP fonksiyonel programlamanın öncüsüdür. Değişkenlere ya da atamaya ihtiyaç duymaz; kontrol, özyineleme ve koşullu ifadelerle sağlanır. Uzun yıllar yapay zekânın baskın dili oldu.",
    "İşte iki listenin eşit olup olmadığını kontrol eden bir LISP fonksiyonu. CAR listenin ilk elemanını, CDR ise geri kalanını verir. Fonksiyon önce ilk elemanları, sonra geri kalanları özyinelemeli olarak karşılaştırıyor. Hiç döngü yok.",
    "Bugün LISP'in iki önemli lehçesi var. Scheme, yetmişlerde MIT'de geliştirildi; küçük, statik kapsamlı ve fonksiyonları birinci sınıf varlık olarak gören bir dil. Bu yüzden eğitim için idealdir. Common LISP ise lehçelerin özelliklerini tek dilde toplama çabasıdır; büyük ve karmaşıktır.",
    "ML, Miranda ve Haskell gibi modern fonksiyonel diller de LISP ile akrabadır.",
  ],
},
// ───────────────── 2.5 ALGOL
{
  id: "algol58", ch: "2.5 İlk adım: ALGOL 60", chip: "<b>2.5</b> Sofistikeliğe ilk adım: ALGOL",
  html: `
  <div class="wrap">
    ${head("ALGOL 58", "ACM + GAMM · Zürih · 1958", "amber")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:720px">
        <div class="card r" data-s="0"><div class="ic a">🌍</div><h3>Sorun</h3><p>Her dil belirli bir makineye bağlıydı. Fortran sadece IBM içindi. Algoritmaları paylaşacak <b>evrensel</b> bir dil yoktu.</p></div>
        <div class="card r" data-s="1"><h3>Zürih, 27 Mayıs – 1 Haziran 1958</h3><p>Amerikan ACM ve Alman GAMM ortak komitesi. Amaçlar:</p>
          <ul class="b" style="margin-top:10px"><li style="font-size:26px">Matematiksel gösterime yakın</li><li style="font-size:26px">Algoritmaları tanımlamaya uygun</li><li style="font-size:26px">Makine koduna çevrilebilir</li></ul></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="2"><h3>ALGOL 58'in getirdikleri</h3>
          <ul class="b t" style="margin-top:8px"><li style="font-size:26px"><b>Tip</b> kavramı resmîleşti</li><li style="font-size:26px">İsimler <b>istenen uzunlukta</b></li><li style="font-size:26px">Bileşik ifadeler: <span class="mono hl">begin … end</span></li><li style="font-size:26px">Atama işleci: <span class="mono hl">:=</span></li><li style="font-size:26px">Noktalı virgül ayırıcı; <span class="mono">if</span> ile else-if</li><li style="font-size:26px">G/Ç yok — “makineye bağımlı olurdu”</li></ul></div>
        <div class="note r" data-s="3">IBM önce istekliydi, ama <b>1959 ortasında desteği çekti</b>.</div>
      </div>
    </div>
    ${tl(1958)}
  </div>`,
  n: [
    "Bölüm 2.5: Sofistikeliğe doğru ilk adım, ALGOL. Ellilerin sonunda her dil belirli bir makineye bağlıydı. Fortran yalnızca IBM makinelerinde çalışıyordu. Bilim insanlarının algoritmaları birbirleriyle paylaşabileceği evrensel bir dil yoktu.",
    "1958'de Amerikan ACM ve Alman GAMM, Zürih'te dört gün süren bir toplantı yaptı. Hedef, matematiksel gösterime yakın, algoritmaları tanımlamaya uygun ve makine koduna çevrilebilen bir dildi.",
    "Ortaya çıkan ALGOL 58, tip kavramını resmîleştirdi. İsimler istenen uzunlukta olabiliyordu. begin ve end ile bileşik ifadeler, iki nokta eşittir atama işleci ve noktalı virgül ayırıcı ilk kez bu dilde görüldü. Girdi çıktı ise bilerek dışarıda bırakıldı, çünkü dili makineye bağımlı yapacağı düşünüldü.",
    "IBM başlangıçta ALGOL'u desteklemeye istekliydi, ama 1959 ortasında tüm desteğini geri çekti. Bu, ALGOL'un kaderini etkileyecekti.",
  ],
},
{
  id: "algol60", ch: "2.5 İlk adım: ALGOL 60", chip: "<b>2.5</b> ALGOL 60",
  html: `
  <div class="wrap">
    ${head("ALGOL 60", "Paris · 6 günlük toplantı · 1960", "amber")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:720px">
        <div class="card r" data-s="0"><h3>Yeni özellikler</h3>
          <ul class="b" style="margin-top:8px"><li style="font-size:27px"><b>Blok yapısı</b> → yerel kapsam</li><li style="font-size:27px">İki parametre geçirme: <b>değer</b> ve <b>isim</b> ile</li><li style="font-size:27px">Alt program <b>özyinelemesi</b></li><li style="font-size:27px">Yığın-dinamik diziler</li><li style="font-size:27px">Hâlâ G/Ç ve karakter dizisi yok</li></ul></div>
        <div class="note r" data-s="2" style="background:rgba(53,208,192,.08);border-color:rgba(53,208,192,.3)"><b style="color:var(--teal)">BNF:</b> sözdizimi biçimsel olarak tanımlanan <b>ilk</b> dil (Backus–Naur Formu).</div>
      </div>
      <div class="col f1">
        <div class="r" data-s="1">${code("ortalama.alg", ["begin", "  integer N;", "  Read Int(N);", "  begin", "    real array Data[1:N];", "    real sum, avg;", "    integer i; sum := 0;", "    for i := 1 step 1 until N do", "      sum := sum + Data[i];", "    avg := sum / N;", "    Print Real(avg)", "  end", "end"], { lang: "pascal", cls: "xs" })}</div>
      </div>
    </div>
    ${tl(1960)}
  </div>`,
  n: [
    "1960'ta Paris'te altı gün süren bir toplantıda ALGOL 58 elden geçirildi ve ALGOL 60 doğdu. Yeni özellikler şunlardı: blok yapısı, yani değişkenlerin sadece tanımlandıkları blokta geçerli olduğu yerel kapsam; değer ile ve isim ile olmak üzere iki parametre geçirme yöntemi; alt programların özyinelemeli çağrılabilmesi ve boyutu çalışma zamanında belirlenen yığın-dinamik diziler.",
    "Sağdaki örnek program N sayısını okuyor ve tam N elemanlı bir dizi oluşturuyor. Dizinin boyutu ancak program çalışırken belli oluyor; bu, Fortran'da mümkün değildi. Ayrıca iç içe begin end blokları ve for döngüsü dikkat çekiyor.",
    "ALGOL 60'ın bir başka önemli yeniliği, sözdiziminin biçimsel olarak tanımlanmasıydı. Backus'un önerdiği ve Naur'un düzenlediği bu gösterime Backus-Naur Formu, kısaca BNF denir. Bir sonraki bölümde BNF'i ayrıntılı göreceğiz.",
  ],
},
{
  id: "algol60-eval", ch: "2.5 İlk adım: ALGOL 60", chip: "<b>2.5</b> ALGOL 60'ın değerlendirmesi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">ALGOL 60: başarı mı, <em>başarısızlık mı?</em></h2>
    <div class="grid2" style="flex:1">
      <div class="card tint-t r" data-s="1"><h3 class="tl">✓ Başarıları</h3><ul class="b t" style="margin-top:10px">
        <li style="font-size:27px">20 yıldan fazla, algoritma yayımlamanın <b>standart</b> yolu</li><li style="font-size:27px">Sonraki tüm imperatif dillerin <b>temeli</b></li><li style="font-size:27px">İlk <b>makineden bağımsız</b> dil</li><li style="font-size:27px">Sözdizimi biçimsel tanımlanan ilk dil (BNF)</li><li style="font-size:27px">Bilgisayar mimarisini bile etkiledi: donanım yığını</li></ul></div>
      <div class="card tint-c r" data-s="2"><h3 class="cl">✕ Neden yaygınlaşmadı?</h3><ul class="b" style="margin-top:10px">
        <li style="font-size:27px">G/Ç yoktu → programlar <b>taşınamıyordu</b></li><li style="font-size:27px">Aşırı esnek → anlaşılması ve gerçekleştirilmesi zor</li><li style="font-size:27px">Fortran zaten yerleşmişti</li><li style="font-size:27px">BNF o gün tuhaf ve karmaşık görünüyordu</li><li style="font-size:27px">Pazarın ~%80'ine sahip <b>IBM desteklemedi</b></li></ul></div>
    </div>
    ${tl(1960)}
  </div>`,
  n: [
    "ALGOL 60'ı değerlendirelim. Bu dilin hikâyesi, başarı ile başarısızlığın ilginç bir karışımıdır.",
    "Başarıları büyüktür. Yirmi yıldan fazla bir süre, bilimsel yayınlarda algoritmalar ALGOL ile yazıldı. Sonraki bütün imperatif diller ona dayanır. İlk makineden bağımsız dil ve sözdizimi biçimsel tanımlanan ilk dildir. Hatta özyinelemeyi ve blok yapısını desteklemek için donanıma yığın eklenmesine yol açarak bilgisayar mimarisini bile etkiledi.",
    "Ama özellikle Amerika'da hiçbir zaman yaygın kullanılmadı. Nedenleri şunlardı: Girdi çıktı tanımlı olmadığı için programlar taşınamıyordu. Dil aşırı esnekti; anlaşılması ve verimli gerçekleştirilmesi zordu. Fortran zaten yerleşmişti. BNF o günün programcılarına tuhaf görünüyordu. Ve en önemlisi, pazarın yüzde seksenine sahip IBM, Fortran'ı desteklemeyi sürdürdü.",
  ],
},
];
