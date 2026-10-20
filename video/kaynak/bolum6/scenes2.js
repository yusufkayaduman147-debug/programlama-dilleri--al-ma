const { code } = require("../build/lib");

const cell = (t, c = "line", { w = 64, h = 60, fs = 24, bg = "transparent", col = "text", extra = "" } = {}) =>
  `<div class="mono" style="width:${w}px;height:${h}px;border:2px solid var(--${c});background:${bg};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:${fs}px;color:var(--${col});flex:none;${extra}">${t}</div>`;

const M = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]];

module.exports = [
// ───────── 6.3 arrays
{
  id: "arrays", ch: "6.3 Diziler", chip: "<b>6.3.1</b> Diziler ve indisler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dizi: <em>homojen</em> elemanlar, konuma göre erişim</h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:820px">
        <div class="r" data-s="1">
          <div style="display:flex;gap:6px">${[12, 7, 33, 5, 18].map((v, i) => cell(v, i === 2 ? "amber" : "teal", { w: 110, h: 76, fs: 30 })).join("")}</div>
          <div style="display:flex;gap:6px;margin-top:6px">${[0, 1, 2, 3, 4].map((i) => `<div class="mono" style="width:110px;text-align:center;font-size:22px;color:var(--${i === 2 ? "amber" : "faint"})">[${i}]</div>`).join("")}</div>
          <div class="mono" style="font-size:26px;margin-top:12px">a[2] <span style="color:var(--faint)">→</span> <span class="hl">33</span></div></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:27px">İndis sözdizimi</h3>
          <div class="mono" style="font-size:24px;line-height:1.8"><span class="hl">A(i)</span>   FORTRAN, PL/I, Ada <span style="color:var(--faint);font-family:Inter;font-size:21px">— fonksiyon çağrısına benzer</span><br><span class="tl">A[i]</span>   diğer dillerin çoğu</div></div>
        <div class="r" data-s="4">${code("c", ["int aa[4][3][7];", "sum += aa[i][j][k];   // dizilerin dizisi"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:27px">İndis tipleri</h3><p style="font-size:22px;line-height:1.6"><b>FORTRAN, C, C#, Java:</b> yalnız tam sayı<br><b>Pascal:</b> her sıralı tip (integer, boolean, char, enum)<br><b>Ada:</b> tam sayı veya enum</p></div>
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:27px">Alt sınır</h3><p style="font-size:22px;line-height:1.6"><b>C, C++, Java:</b> her zaman <span class="hl">0</span><br><b>FORTRAN:</b> varsayılan <span class="hl">1</span><br><b>Pascal, Ada:</b> tanımda belirtilir</p></div>
        <div class="note r" data-s="4" style="font-size:22px">Boyut sayısı bugün sınırsız; ama 3'ten fazla boyut nadiren gerekir. C'de dizinin tek indisi vardır; çok boyut = <b>elemanları dizi olan dizi</b>.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3: Yapısal veri tipleri. Yapısal tipler ilkel tiplerden oluşur ve bellekte bir dizi yerleşimde saklanır. İlk yapısal tipimiz dizi.",
    "Dizi, homojen, yani aynı tipten elemanların bir kümesidir ve her eleman, birinci elemana göre konumuyla tanımlanır. İndis, bu konumu belirtir: a köşeli parantez iki, dizinin üçüncü elemanı olan otuz üçü verir.",
    "İndis sözdizimi dillere göre değişir. FORTRAN, PL/I ve Ada normal parantez kullanır; bu da dizi erişiminin fonksiyon çağrısına benzemesine yol açar. Diğer dillerin çoğu köşeli parantez kullanır.",
    "İndis tipi de bir tasarım kararıdır. FORTRAN, C, C# ve Java yalnızca tam sayı indise izin verir; Pascal her sıralı tipe; Ada ise tam sayı ve sayılama tiplerine izin verir. İndisin alt sınırı C, C++ ve Java'da her zaman sıfırdır, FORTRAN'da varsayılan olarak birdir; Pascal ve Ada'da ise tanımda belirtilir.",
    "Günümüz dillerinde boyut sayısı sınırlanmaz, ama pratikte üçten fazla boyuta nadiren ihtiyaç duyulur. C'de ise bir dizinin teknik olarak tek indisi vardır; çok boyutlu diziler, elemanları da dizi olan diziler olarak kurulur. Bu yüzden her boyut için ayrı köşeli parantez yazılır.",
  ],
},
{
  id: "array-cats", ch: "6.3 Diziler", chip: "<b>6.3.1.4</b> İndis bağlama ve dizi kategorileri",
  html: (() => {
    const rows = [
      ["Statik", "statik", "statik (yükleme öncesi)", "C static, FORTRAN 77", "hız", "t"],
      ["Sabit yığıt-dinamik", "statik", "tanım çalışınca (stack)", "C, Java yerel dizi", "bellek verimi", "v"],
      ["Yığıt-dinamik", "dinamik, sonra sabit", "tanım çalışınca (stack)", "Ada declare bloğu", "esneklik", "v"],
      ["Sabit heap-dinamik", "dinamik, sonra sabit", "istekle (heap)", "malloc, new, Java dizileri", "esneklik", "a"],
      ["Heap-dinamik", "dinamik, değişebilir", "dinamik, değişebilir", "Perl, JavaScript, C# ArrayList", "en esnek", "c"],
    ];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Beş dizi kategorisi</h2>
    <table style="width:100%;border-collapse:separate;border-spacing:0 10px;font-size:24px">
      <tr class="r" data-s="0" style="color:var(--faint);font-size:21px"><td style="padding:0 18px">Kategori</td><td>İndis sınırları</td><td>Bellek bağlama</td><td>Örnek</td><td>Avantaj</td></tr>
      ${rows.map(([a, b, c, d, e, col], i) => `<tr class="r rl" data-s="${i + 1}" data-hot="${i + 1}" style="background:var(--panel)"><td style="padding:16px 18px;border-radius:14px 0 0 14px;border-left:5px solid var(--${col === "t" ? "teal" : col === "v" ? "violet" : col === "a" ? "amber" : "coral"});font-weight:700;font-size:26px">${i + 1}. ${a}</td><td style="color:var(--muted)">${b}</td><td style="color:var(--muted)">${c}</td><td class="mono" style="font-size:21px">${d}</td><td style="border-radius:0 14px 14px 0;color:var(--${col === "t" ? "teal" : col === "v" ? "violet" : col === "a" ? "amber" : "coral"})">${e}</td></tr>`).join("")}
    </table>
    <div class="row" style="gap:26px;margin-top:16px">
      <div class="r f1" data-s="3">${code("ada", ["declare", "   STUFF : array (1..N) of Float;", "begin ... end;"], { lang: "ada", cls: "xs" })}</div>
      <div class="r f1" data-s="5">${code("perl", ["@list = (1, 3, 7, 10);", "push(@list, 13, 17);  # büyür", "@list = ();            # boşalır"], { lang: "python", cls: "xs" })}</div>
    </div>
    <style>tr.r.hot td{background:rgba(255,181,71,.12)}</style>
  </div>`;
  })(),
  n: [
    "Diziler, indis sınırlarının ve belleğin ne zaman bağlandığına göre beş kategoriye ayrılır.",
    "Birincisi statik dizidir. İndis sınırları da bellek ayırma da program çalışmadan önce yapılır. C'deki static diziler ve FORTRAN 77 dizileri buna örnektir. Avantajı hızdır: çalışırken yer alma ya da geri verme işlemi yoktur.",
    "İkincisi sabit yığıt-dinamik dizidir. İndis sınırları statik olarak bağlanır ama bellek, tanım deyimi çalıştığında yığıttan ayrılır. C ve Java'daki static olmayan yerel diziler böyledir. Avantajı bellek verimidir, çünkü alan yalnızca gerektiğinde kullanılır.",
    "Üçüncüsü yığıt-dinamik dizidir. Hem indis sınırları hem bellek dinamik olarak bağlanır, ama bağlandıktan sonra değişkenin ömrü boyunca sabit kalır. Ada'nın declare bloğunda N'nin değeri çalışma zamanında belirlenir. Avantajı esnekliktir: dizinin boyutunu kullanmadan önce bilmeniz gerekmez.",
    "Dördüncüsü sabit heap-dinamik dizidir. Sınırlar ve bellek, programcı istediğinde heap'ten ayrılır ama bir kez ayrıldıktan sonra boyut değişmez. C'deki malloc ve free, C++'taki new ve delete, FORTRAN 90'daki ALLOCATE buna örnektir. Java'daki bütün diziler de bu kategoridedir.",
    "Beşincisi heap-dinamik dizidir. Hem indis aralığı hem bellek dinamiktir ve istenildiği zaman değiştirilebilir; dizi çalışırken büyüyüp küçülebilir. Perl ve JavaScript dizileri ve C#'taki ArrayList böyledir. Perl örneğinde push ile diziye eleman ekleniyor, boş liste atanınca da bellek geri veriliyor.",
  ],
},
{
  id: "array-init", ch: "6.3 Diziler", chip: "<b>6.3.1.5–6.3.1.7</b> Başlatma, heterojen diziler, işlemler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dizi başlatma ve <em>dizi işlemleri</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:860px;gap:18px">
        <div class="r" data-s="1">${code("c / java", ["int list[] = {4, 5, 7, 83};", "char name[] = \"freddie\";", "char *names[] = {\"Bob\", \"Jake\", \"Joe\"};", "String[] names = {\"Bob\", \"Jake\", \"Joe\"};   // Java"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="2">${code("ada", ["List : array (1..5) of Integer := (1, 3, 5, 7, 9);", "Bunch : array (1..5) of Integer := (1 => 17, others => 0);"], { lang: "ada", cls: "xs" })}</div>
        <div class="r" data-s="2" style="font-size:22px;color:var(--muted)"><b style="color:var(--text)">Fortran:</b> <span class="mono">(/0, 5, 5/)</span> · <b style="color:var(--text)">Pascal:</b> başlatmaya izin vermez</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:27px">Heterojen dizi</h3><p style="font-size:22px">Elemanları farklı tipte olabilir: Perl, Python, JavaScript, Ruby.</p><div class="mono" style="font-size:24px;margin-top:8px;color:var(--amber)">[3, 5.8, "elma", True]</div></div>
        <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:27px">Dizi işlemleri</h3><p style="font-size:22px;line-height:1.55"><b>APL:</b> en güçlü; vektör ve matris işlemleri, ters çevirme…<br><b>Ada, Ruby:</b> atama, birleştirme, karşılaştırma<br><b>Fortran 90:</b> eleman eleman işlemler</p>
          <div class="mono" style="font-size:22px;margin-top:8px">C = A + B  <span class="cm">! her eleman toplanır</span></div></div>
      </div>
    </div>
  </div>`,
  n: [
    "Dizi başlatma, dizi elemanlarına bellekte saklandıkları sırayla ilk değerlerin verilmesidir.",
    "C, C++, Java ve C# küme parantezleriyle başlatmaya izin verir. Boyut verilmezse, derleyici eleman sayısından boyutu çıkarır. C'de bir karakter dizisi doğrudan bir dizgiyle, işaretçi dizisi de dizgi listesiyle başlatılabilir.",
    "Ada'da değerler sırayla verilebileceği gibi, ok işaretiyle konumları da belirtilebilir; others ise geri kalan bütün elemanlara değer verir. Fortran eğik çizgili parantez kullanır; Pascal ise dizi başlatmaya hiç izin vermez.",
    "Heterojen dizilerde elemanların aynı tipte olması gerekmez. Perl, Python, JavaScript ve Ruby bunu destekler. Diğer dillerde bunun yerine kayıtlar kullanılır, ama kayıtlar heterojen dizilerin yerini tam olarak tutmaz.",
    "Dizi işlemleri, diziyi bir bütün olarak işleyen işlemlerdir. APL bu konuda en güçlü dildir; vektör ve matrisler üzerinde, örneğin sütunları ters çevirmek gibi pek çok işlem sunar. Ada ve Ruby atama, birleştirme ve karşılaştırmaya izin verir. Fortran 90 ise eleman eleman işlemleri destekler: iki diziyi artı işaretiyle topladığınızda karşılıklı elemanlar toplanır.",
  ],
},
{
  id: "jagged", ch: "6.3 Diziler", chip: "<b>6.3.1.8</b> Dikdörtgen ve tırtıklı diziler",
  html: (() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const sq = (ch, on, c) => `<div style="width:40px;height:44px;border:1px solid ${on ? `var(--${c})` : "rgba(255,255,255,.08)"};background:${on ? "rgba(255,255,255,.03)" : "transparent"};display:flex;align-items:center;justify-content:center;font-family:JBM;font-size:24px">${ch}</div>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dikdörtgen mi, <em>tırtıklı</em> mı?</h2>
    <div class="row" style="flex:1;gap:60px">
      <div class="col r" data-s="1" style="gap:6px;width:600px">
        <h3 style="font-size:30px;margin:0 0 6px" class="tl">Dikdörtgen (rectangular)</h3>
        ${days.map((d) => `<div style="display:flex">${[...d.padEnd(10)].map((c, k) => sq(c.trim(), k < d.length + 1, "teal")).join("")}</div>`).join("")}
        <div style="font-size:22px;color:var(--muted);margin-top:8px">7 × 10 = <b style="color:var(--text)">70 bayt</b> · her satır eşit · Fortran, Ada, C#</div>
      </div>
      <div class="col f1 r" data-s="2" style="gap:6px">
        <h3 style="font-size:30px;margin:0 0 6px" class="hl">Tırtıklı (jagged) — satır işaretçileri</h3>
        ${days.map((d, i) => `<div style="display:flex;align-items:center;gap:10px"><span class="mono" style="font-size:19px;color:var(--faint);width:84px">day[${i}]</span><span style="color:var(--amber);font-size:22px">→</span><div style="display:flex">${[...(d + " ")].map((c) => sq(c.trim() || "\\0", true, "amber")).join("")}</div></div>`).join("")}
        <div style="font-size:22px;color:var(--muted);margin-top:8px">57 bayt veri + 28 bayt işaretçi = <b style="color:var(--text)">85 bayt</b> · C, C++, Java (C# ikisini de)</div>
      </div>
    </div>
    <div class="note r" data-s="3" style="font-size:23px">Tırtıklı dizide satır uzunlukları farklı olabilir; boşluk israfı yok, ama işaretçiler için ek yer ve bir dolaylı erişim gerekir. Hangisinin küçük olacağı veriye bağlı.</div>
  </div>`;
  })(),
  n: [
    "Çok boyutlu diziler iki biçimde olabilir: dikdörtgen ve tırtıklı.",
    "Dikdörtgen dizide bütün satırlar aynı sayıda elemana, bütün sütunlar da aynı sayıda elemana sahiptir. Haftanın gün adlarını yedi satır, on sütunluk bir karakter matrisinde saklarsak, kısa isimlerin sonunda boş yerler kalır ve toplam yetmiş bayt kullanılır. Fortran, Ada ve C# dikdörtgen dizileri destekler.",
    "Tırtıklı dizide ise her satırın eleman sayısı farklı olabilir. C'de bunu bir işaretçi dizisiyle yaparız: day dizisinin her elemanı, tam gerektiği kadar uzun bir dizgiyi gösterir. Burada veriler elli yedi bayt, yedi işaretçi de yirmi sekiz bayt tutar; toplam seksen beş bayt. C, C++ ve Java tırtıklı dizileri destekler; C# ise ikisini de destekler.",
    "Tırtıklı dizide boşluk israfı olmaz ama işaretçiler için ek yer ve her erişimde bir dolaylı adımlama gerekir. Bu örnekte dikdörtgen dizi daha küçük çıktı; satır uzunlukları birbirinden çok farklı olsaydı tırtıklı dizi kazanırdı.",
  ],
},
{
  id: "slices", ch: "6.3 Diziler", chip: "<b>6.3.1.9</b> Kesitler (slices)",
  html: (() => {
    const v = [2, 4, 6, 8, 10, 12, 14, 16];
    const row = (sel, s, h) => `<div class="r" data-s="${s}" ${h ? `data-h="${h}"` : ""} style="display:flex;gap:6px">${v.map((x, i) => cell(x, sel.includes(i) ? "amber" : "line", { w: 92, h: 70, fs: 28, bg: sel.includes(i) ? "rgba(255,181,71,.15)" : "transparent", col: sel.includes(i) ? "amber" : "muted" })).join("")}</div>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kesit: dizinin <em>bir alt yapısı</em></h2>
    <div class="row" style="flex:1;gap:46px">
      <div class="col" style="width:860px;gap:16px">
        <div class="mono r" data-s="1" style="font-size:28px">vector = [2, 4, 6, 8, 10, 12, 14, 16]</div>
        <div style="display:flex;gap:6px" class="r" data-s="1">${v.map((x, i) => `<div class="mono" style="width:92px;text-align:center;font-size:20px;color:var(--faint)">${i}</div>`).join("")}</div>
        <div class="stack">${row([], 1, 2)}${row([3, 4, 5], 2, 3)}${row([0, 2, 4, 6], 3, 4)}${row([], 4)}</div>
        <div class="stack mono" style="font-size:30px">
          <div class="r" data-s="2" data-h="3"><span class="hl">vector[3:6]</span>  → [8, 10, 12]</div>
          <div class="r" data-s="3" data-h="4"><span class="hl">vector[0:7:2]</span> → [2, 6, 10, 14]</div>
          <div class="r" data-s="4"><span class="hl">mat[0][0:2]</span>   → [1, 2]   <span class="cm" style="font-size:22px"># mat = [[1,2,3],[4,5,6],[7,8,9]]</span></div></div>
        <div class="note r" data-s="2" style="font-size:22px">Python'da <b>başlangıç dahil, bitiş hariç</b>: [3:6] → indis 3, 4, 5.</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="0" style="padding:22px 28px"><p style="font-size:23px">Kesit yeni bir veri tipi değil, dizinin bir bölümüne <b>başvurma mekanizması</b>dır. Dizi işlemleri olan dillerde kullanışlıdır.</p></div>
        <div class="r" data-s="5">${code("fortran 90", ["MAT = CUBE(:, :, 2)", "! küpün 2. düzlemi"], { lang: "fortran", cls: "xs" })}</div>
        <div class="r" data-s="5">${code("ruby", ["list.slice(2, 2)", "# 2. indisten 2 eleman"], { lang: "python", cls: "xs" })}</div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 6.3.1.9: Kesitler. Kesit, bir dizinin bir alt yapısıdır. Yeni bir veri tipi değil, dizinin bir bölümüne başvurmayı sağlayan bir mekanizmadır ve özellikle dizi işlemleri olan dillerde kullanışlıdır.",
    "Python'da sekiz elemanlı bir vector dizisi tanımlayalım.",
    "vector köşeli parantez üç iki nokta altı, üç numaralı indisten başlar ve altıncı indisten hemen önce durur. Yani başlangıç dahil, bitiş hariçtir ve sonuç sekiz, on ve on iki olur.",
    "Üçüncü bir sayı adım değerini verir: sıfırdan yediye ikişer atlayarak iki, altı, on ve on dört elemanlarını seçeriz.",
    "İki boyutlu bir matriste de kesit alabiliriz: mat sıfır, ilk satırı verir; onun sıfırdan ikiye kadar olan kesiti ise bir ve iki değerleridir.",
    "Diğer dillerde de benzer yapılar vardır. Fortran 90'da iki nokta üst üste bir boyutun tamamını seçer; CUBE parantez iki nokta, iki nokta, iki, üç boyutlu bir dizinin ikinci düzlemini verir. Ruby'de ise slice metodu kesit almak için kullanılır.",
  ],
},
{
  id: "row-major", ch: "6.3 Diziler", chip: "<b>6.3.1.3</b> Dizilerin belleğe eşleştirilmesi",
  html: (() => {
    const order = (rm) => (rm ? [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => [i, j])) : [0, 1, 2].flatMap((j) => [0, 1, 2].map((i) => [i, j])));
    const strip = (rm, s, color) => `<div class="r" data-s="${s}" style="display:flex;gap:6px">${order(rm).map(([i, j], k) => `<div class="r rp" data-s="${s}" style="transition-delay:${k * 0.12}s">${cell(M[i][j], color, { w: 76, h: 68, fs: 28 })}<div class="mono" style="font-size:18px;color:var(--faint);text-align:center;margin-top:4px">${i},${j}</div></div>`).join("")}</div>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Matris → <em>tek boyutlu bellek</em></h2>
    <div class="row" style="flex:1;gap:70px">
      <div class="col r" data-s="0" style="width:330px;align-items:center;gap:10px">
        <div style="display:grid;grid-template-columns:repeat(3,90px);gap:8px">${M.flat().map((x) => cell(x, "violet", { w: 90, h: 84, fs: 34 })).join("")}</div>
        <div style="font-size:22px;color:var(--muted)">3 × 3 matris</div>
      </div>
      <div class="col f1" style="gap:30px">
        <p class="lead r" data-s="0" style="font-size:26px;margin:0">Bellek doğrusal bir bayt dizisidir; çok boyutlu dizi <b>tek boyuta</b> açılmalıdır.</p>
        <div><div class="r" data-s="1" style="font-size:28px;font-weight:700;margin-bottom:10px" ><span class="tl">Satır tabanlı</span> <span style="font-size:22px;color:var(--faint);font-weight:400">(row-major) — C, C++, Java, Pascal, çoğu dil</span></div>${strip(true, 1, "teal")}</div>
        <div><div class="r" data-s="2" style="font-size:28px;font-weight:700;margin-bottom:10px"><span class="hl">Sütun tabanlı</span> <span style="font-size:22px;color:var(--faint);font-weight:400">(column-major) — Fortran</span></div>${strip(false, 2, "amber")}</div>
        <div class="note r" data-s="3" style="font-size:23px">Neden önemli? Bellekte ardışık elemanlar önbelleğe birlikte gelir. C'de iç döngüyü <b>sütun</b> indisi (j) üzerinde kurmak çok daha hızlıdır.</div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 6.3.1.3: Dizilerin belleğe eşleştirilmesi. Bellek donanımı doğrusal bir bayt dizisidir. Bu yüzden iki ya da daha fazla boyutlu bir dizi, tek boyutlu belleğe açılmak zorundadır. Bunun iki yolu vardır.",
    "Satır tabanlı sırada matris satır satır saklanır: önce birinci satırın elemanları a, b, c; sonra ikinci satır d, e, f; en sonda üçüncü satır. C, C++, Java ve Pascal dahil çoğu dil bu sırayı kullanır.",
    "Sütun tabanlı sırada ise matris sütun sütun saklanır: önce birinci sütun a, d, g; sonra ikinci sütun b, e, h; en son üçüncü sütun. Bu sırayı kullanan en bilinen dil Fortran'dır.",
    "Bu fark performansı etkiler. Bellekte yan yana duran elemanlar önbelleğe birlikte getirilir. C'de iki boyutlu bir diziyi dolaşırken iç döngüyü sütun indisi üzerinde kurarsanız, elemanlara bellekteki sırayla erişirsiniz ve program belirgin biçimde hızlanır.",
  ],
},
{
  id: "access-fn", ch: "6.3 Diziler", chip: "<b>6.3.1.12</b> Erişim fonksiyonu",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bir elemanın adresi <em>nasıl hesaplanır?</em></h2>
    <div class="col" style="gap:24px">
      <div class="card r" data-s="1" style="padding:22px 30px"><div style="font-size:22px;color:var(--faint);margin-bottom:6px">Tek boyut</div>
        <div class="mono" style="font-size:30px">adres(list[k]) = adres(list[<span class="tl">alt</span>]) + (k − <span class="tl">alt</span>) × <span class="hl">eleman_boyu</span></div></div>
      <div class="card r" data-s="2" style="padding:22px 30px"><div style="font-size:22px;color:var(--faint);margin-bottom:6px">İki boyut, satır tabanlı (n = bir satırdaki eleman sayısı)</div>
        <div class="mono" style="font-size:30px">adres(a[i,j]) = adres(a[0,0]) + (<span class="vl">i × n</span> + j) × <span class="hl">eleman_boyu</span></div>
        <div class="mono" style="font-size:22px;color:var(--faint);margin-top:6px">sütun tabanlı: adres(a[0,0]) + (j × m + i) × eleman_boyu</div></div>
      <div class="row" style="gap:30px;align-items:stretch">
        <div class="card tint-a r f1" data-s="3" style="padding:22px 30px"><h3 class="hl" style="font-size:28px">Örnek</h3>
          <div class="mono" style="font-size:25px;line-height:1.75">int a[3][4];  taban = 1000, int = 4 bayt<br>adres(a[2][1])<br>  = 1000 + (<span class="vl">2 × 4</span> + 1) × 4<br>  = 1000 + 9 × 4 = <span class="hl" style="font-weight:700">1036</span></div></div>
        <div class="card r f1" data-s="4" style="padding:22px 30px"><h3 style="font-size:28px">Ne zaman hesaplanır?</h3><p style="font-size:23px"><b class="tl">Derleme zamanı:</b> taban adres ve sabit kısımlar.<br><b class="hl">Çalışma zamanı:</b> indise bağlı kısım.<br>Gerekli bilgiler derleme zamanı <b>tanımlayıcısında</b> tutulur: eleman tipi, indis tipi, boyut sayısı, sınırlar, adres.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3.1.12: Erişim fonksiyonu. Bir dizinin erişim fonksiyonu, dizinin taban adresini ve indis değerlerini bir bellek adresine eşler.",
    "Tek boyutlu dizide formül basittir: k'ıncı elemanın adresi, ilk elemanın adresine, k eksi alt sınır çarpı eleman boyunun eklenmesiyle bulunur.",
    "İki boyutlu ve satır tabanlı bir dizide, i'nci satıra ulaşmak için önce i tane tam satırı, yani i çarpı n elemanı atlamamız gerekir; sonra o satırda j eleman ilerleriz. Bu toplam, eleman boyuyla çarpılıp taban adrese eklenir. Sütun tabanlı sırada ise rolleri değişir: j çarpı m artı i. Formül, her boyut için bir toplama ve bir çarpma eklenerek daha fazla boyuta genelleştirilebilir.",
    "Bir örnek yapalım. Üç satır, dört sütunluk bir int dizisinin taban adresi bin olsun ve her int dört bayt tutsun. a iki bir elemanının adresi: bin artı, iki çarpı dört artı bir, yani dokuz, çarpı dört. Sonuç bin otuz altı.",
    "Bu hesabın bir kısmı, örneğin taban adres ve sabit çarpanlar, dizi tanımlanır tanımlanmaz derleme zamanında hesaplanabilir; indise bağlı kısım ise çalışma zamanında hesaplanmalıdır. Derleyici bunun için gerekli bilgileri, yani eleman tipini, indis tipini, boyut sayısını, indis sınırlarını ve adresi, derleme zamanı tanımlayıcısında tutar.",
  ],
},
{
  id: "assoc", ch: "6.3 İlişkili diziler", chip: "<b>6.3.1.14</b> İlişkili diziler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İlişkili dizi: <em>anahtar → değer</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px">
        <p class="lead r" data-s="0" style="font-size:26px;margin:0">Elemanlara sıra numarasıyla değil, <b>anahtarla</b> erişilir. Değerin yeri, anahtardan bir <b>özüt (hash) fonksiyonu</b> ile bulunur.</p>
        <div class="row r" data-s="1" style="gap:20px;align-items:center;margin-top:10px">
          <div class="col" style="gap:10px">${["\"Pazartesi\"", "\"Salı\"", "\"Çarşamba\""].map((k) => `<div class="box mono" style="font-size:22px;padding:10px 16px;border-color:var(--teal)">${k}</div>`).join("")}</div>
          <div class="arrow">→</div>
          <div class="box" style="border-color:var(--violet);padding:20px 22px;font-size:24px">hash( )</div>
          <div class="arrow">→</div>
          <div class="col" style="gap:6px">${["", "49", "", "45", "", "83"].map((v, i) => `<div style="display:flex;gap:8px;align-items:center"><span class="mono" style="font-size:18px;color:var(--faint);width:26px">${i}</span>${cell(v, v ? "amber" : "line", { w: 90, h: 46, fs: 24 })}</div>`).join("")}</div>
        </div>
        <div class="r" data-s="2">${code("sicaklik.pl", ["%sicak = (\"Pzt\" => 45, \"Sal\" => 49);", "$sicak{\"Car\"} = 83;      # ekle", "delete $sicak{\"Sal\"};    # sil", "%sicak = ();              # boşalt"], { lang: "python", cls: "xs" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:27px">Diller</h3><p style="font-size:22px;line-height:1.6"><b>Perl:</b> hash, <span class="mono">%</span> ile başlar<br><b>Python:</b> dict  ·  <b>Ruby:</b> Hash<br><b>PHP:</b> diziler hem normal hem ilişkili<br><b>Java, C#:</b> HashMap, Dictionary</p></div>
        <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:27px">Ne zaman?</h3><p style="font-size:22px"><b class="tl">Arama</b> yapılacaksa ilişkili dizi çok verimli.<br><b class="hl">Sıralı erişim</b> için normal dizi daha iyi.</p></div>
        <div class="note r" data-s="4" style="font-size:21px"><b>Tasarım:</b> elemanlara başvurunun şekli ne? Boyut statik mi, dinamik mi?</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3.1.14: İlişkili diziler. İlişkili dizi, elemanlarına sıra numarasıyla değil, anahtar denilen değerlerle erişilen bir veri topluluğudur.",
    "Her anahtar bir özüt, yani hash fonksiyonundan geçirilir ve bu fonksiyon, değerin saklandığı yeri hesaplar. Örneğin Pazartesi anahtarı bir kovaya, Salı başka bir kovaya düşer. Böylece arama, diziyi baştan sona taramadan yapılabilir.",
    "Perl'de ilişkili diziler hash olarak adlandırılır ve yüzde işaretiyle başlar. Değerler ok işaretiyle anahtarlara bağlanır; tek bir elemana dolar işareti ve küme parantezleriyle erişilir; delete ile eleman silinir; boş liste atanarak da tüm dizi boşaltılır.",
    "Bu yapı bugün çok yaygındır: Python'da dict, Ruby'de Hash, Java'da HashMap, C#'ta Dictionary. PHP'de ise her dizi aynı anda hem normal hem ilişkili dizi gibi kullanılabilir.",
    "Ne zaman tercih etmeli? Elemanlar arasında arama yapılacaksa ilişkili diziler çok verimlidir; elemanların hepsini sırayla işleyecekseniz normal dizi daha uygundur. Tasarım soruları ise şunlardır: elemanlara başvurunun biçimi ne olacak ve boyut statik mi, dinamik mi olacak?",
  ],
},
{
  id: "tuples-lists", ch: "6.3 Demet ve liste", chip: "<b>6.3.1.10–11</b> Demetler ve listeler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Demetler ve <em>listeler</em></h2>
    <div class="grid2" style="gap:36px">
      <div class="col">
        <div class="card tint-v r" data-s="1" style="padding:22px 28px"><h3 class="vl" style="font-size:30px">Demet (tuple)</h3><p style="font-size:22px">Kayda benzer ama alanların adı yok. <b>Değiştirilemez</b>. Fonksiyonlardan birden fazla değer döndürmek için. Python, ML, F#, C#.</p></div>
        <div class="r" data-s="1">${code("python", ["t = (3, 5.8, 'elma')", "t[0]        # 3", "t[0] = 7    # HATA: değiştirilemez"], { lang: "python", cls: "xs" })}</div>
        <div class="r" data-s="2">${code("ml / f#", ["val t = (3, 5.8, \"elma\");   #1(t) → 3", "let a, b, c = (3, 5, 7)      // parçala"], { lang: "text", cls: "xs" })}</div>
      </div>
      <div class="col">
        <div class="card tint-t r" data-s="3" style="padding:22px 28px"><h3 class="tl" style="font-size:30px">Liste</h3><p style="font-size:22px">LISP'te veri ve kod aynı biçimde: <span class="mono">(A B C)</span>. Veri olduğunu belirtmek için başına <span class="mono">'</span> konur.</p></div>
        <div class="r" data-s="3">${code("scheme", ["(CAR '(A B C))        ; A", "(CDR '(A B C))        ; (B C)", "(CONS 'A '(B C))      ; (A B C)"], { lang: "scheme", cls: "xs" })}</div>
        <div class="r" data-s="4">${code("ml / python / haskell", ["3 :: [5, 7, 9]        (* [3,5,7,9]; hd, tl *)", "[x*x for x in range(6) if x % 3 == 0]  # [0, 9]", "[n * n | n <- [1..10]]"], { lang: "text", cls: "xs" })}</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3.1.10 ve 11: Demetler ve listeler.",
    "Demet, kayıt tipine benzeyen ama alanlarının adı olmayan bir veri tipidir. Python, ML, F# ve C#'ta bulunur ve fonksiyonlardan birden fazla değer döndürmek için çok kullanışlıdır. Python'da demetler listelere çok benzer ama değiştirilemez: bir elemana yeni değer atamaya çalışırsanız hata alırsınız.",
    "ML'de bir demetin elemanlarına diyez bir, diyez iki gibi yazımlarla erişilir. F#'ta ise bir demet, tek satırda a, b ve c değişkenlerine parçalanabilir.",
    "Listeler ilk kez LISP ile ortaya çıktı. LISP'te listeler parantez içinde, virgülsüz yazılır ve veri ile kod aynı biçimdedir. Yorumlayıcının bir listeyi fonksiyon çağrısı değil veri olarak görmesi için başına tırnak işareti konur. CAR listenin ilk elemanını, CDR ilk eleman çıkarıldıktan sonra kalanı verir; CONS ise bir elemanı listenin başına ekler.",
    "ML'de CONS işlemi iki tane iki nokta üst üste ile yazılır; CAR ve CDR'nin karşılıkları hd ve tl'dir ve listenin bütün elemanları aynı tipte olmalıdır. Python listeleri ise farklı tipte elemanlar içerebilir ve liste anlamları denilen, küme gösterimine benzeyen bir yazımı destekler: altıdan küçük ve üçe tam bölünen sayıların kareleri sıfır ve dokuzdur. Haskell'de de aynı fikir dikey çizgiyle yazılır.",
  ],
},
];
