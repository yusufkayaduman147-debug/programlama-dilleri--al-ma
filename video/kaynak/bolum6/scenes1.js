const { code } = require("../build/lib");

const roadmap = ["Giriş: bellek ve veri tipi", "İlkel tipler: sayı, mantıksal, karakter", "Karakter dizgileri (string)", "Sıralı tipler: enum ve altalan", "Diziler ve belleğe yerleşim", "İlişkili diziler, demet, liste, kayıt", "Bileşim (union) ve küme", "İşaretçiler, kuvvetli tipleme, dönüşüm"];

// bit row: bits string, colors per range [[from,to,color]]
const bits = (str, ranges, { w = 52, s = 0, fs = 28 } = {}) => `<div class="r" data-s="${s}" style="display:flex;gap:5px">${[...str].map((b, i) => {
  const c = (ranges.find(([a, z]) => i >= a && i <= z) || [0, 0, "muted"])[2];
  return `<div class="mono" style="width:${w}px;height:${w + 10}px;display:flex;align-items:center;justify-content:center;border-radius:10px;font-size:${fs}px;font-weight:700;color:var(--${c});background:rgba(255,255,255,.04);border:2px solid var(--${c})">${b}</div>`;
}).join("")}</div>`;

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:22px;margin-bottom:56px;align-items:center">
      ${[["int", "teal"], ["float", "teal"], ["char", "violet"], ["bool", "violet"], ["int[ ]", "amber"], ["struct", "amber"], ["union", "coral"], ["int *", "coral"]].map(([b, c], i) => `<div class="card r rp" data-s="1" style="padding:16px 26px;transition-delay:${i * 0.08}s"><div class="mono" style="font-size:34px;color:var(--${c})">${b}</div></div>`).join("")}
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:120px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 6: Veri Tipleri</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin altıncı bölümüne hoş geldiniz. Bu bölümün konusu veri tipleri.",
    "Tam sayılardan kayan noktalı sayılara, karakterlerden dizgilere, dizilerden kayıtlara, bileşimlerden işaretçilere kadar bir dilin sunduğu tipleri; bunların bellekte nasıl tutulduğunu ve hangi tasarım sorularını doğurduğunu inceleyeceğiz.",
  ],
},
{
  id: "roadmap", ch: "Giriş", chip: "Yol haritası",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bu bölümde <em>neler var?</em></h2>
    <div class="grid2" style="gap:22px 60px;margin-top:10px">
      ${roadmap.map((t, i) => `<div class="r rl" data-s="${i < 4 ? 1 : 2}" style="display:flex;align-items:center;gap:26px;transition-delay:${(i % 4) * 0.15}s;grid-row:${(i % 4) + 1};grid-column:${i < 4 ? 1 : 2}">
          <span class="mono" style="font-size:30px;font-weight:700;color:var(--amber);background:rgba(255,181,71,.12);border-radius:16px;width:80px;height:66px;display:flex;align-items:center;justify-content:center">${i + 1}</span>
          <span style="font-size:34px;font-weight:600">${t}</span></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Yol haritamıza bakalım.",
    "Önce bellek düzenini ve veri tipi kavramını hatırlayacağız. Sonra ilkel tiplere, yani sayısal, mantıksal ve karakter tiplerine; ardından karakter dizgilerine ve kullanıcı tanımlı sıralı tiplere geçeceğiz.",
    "İkinci yarıda yapısal tipler var: diziler ve belleğe yerleşimleri, ilişkili diziler, demetler, listeler, kayıtlar, bileşimler ve kümeler. Son olarak işaretçileri, kuvvetli tiplemeyi ve tip dönüşümlerini konuşacağız.",
  ],
},
// ───────── 6.1
{
  id: "memory", ch: "6.1 Giriş", chip: "<b>6.1</b> Giriş: bellek düzeni",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Çalışan bir programın <em>bellek düzeni</em></h2>
    <div class="row" style="flex:1;gap:60px">
      <div class="col" style="width:520px;gap:0;align-items:stretch">
        <div class="mono r" data-s="1" style="font-size:22px;color:var(--faint);margin-bottom:6px">adres 0</div>
        <div class="box r" data-s="1" data-hot="1" style="height:110px;border-color:var(--teal)">Metin<span style="font-size:20px;color:var(--muted);font-weight:400">kod + sabit veri</span></div>
        <div class="box r" data-s="2" data-hot="2" style="height:110px;border-color:var(--violet);margin-top:8px">Veri<span style="font-size:20px;color:var(--muted);font-weight:400">global ve statik değişkenler</span></div>
        <div class="box r" data-s="3" data-hot="3" style="height:110px;border-color:var(--amber);margin-top:8px">Heap ↓<span style="font-size:20px;color:var(--muted);font-weight:400">dinamik bellek</span></div>
        <div class="box r" data-s="3" style="height:120px;border-style:dashed;margin-top:8px;color:var(--faint);font-weight:400">boş alan</div>
        <div class="box r" data-s="3" data-hot="3" style="height:110px;border-color:var(--coral);margin-top:8px">Stack ↑<span style="font-size:20px;color:var(--muted);font-weight:400">yerel değişkenler, çağrı bilgisi</span></div>
        <div class="mono r" data-s="1" style="font-size:22px;color:var(--faint);margin-top:6px">adres xxxxxxxx</div>
      </div>
      <div class="col f1" style="justify-content:center">
        <div class="card r" data-s="0" style="padding:24px 30px"><h3 style="font-size:30px">von Neumann mimarisi</h3><p style="font-size:26px">CPU ile bellek ayrıdır. Bellekte komutlar, adresler ve veriler <b>karışık</b> durur; erişim tamamen <b>adrese göre</b>dir ve her şey <b>ikili</b> sayılara dönüştürülmek zorundadır.</p></div>
        <div class="card r" data-s="4" style="padding:24px 30px"><h3 style="font-size:30px">Veri tipi nedir?</h3><p style="font-size:26px">Bir <b>değerler kümesi</b> ve bu değerler üzerinde tanımlı <b>işlemler</b>. Dilin ifade gücünü ve güvenilirliğini doğrudan etkiler.</p></div>
        <div class="row r" data-s="5" style="gap:22px">
          <div class="card tint-t f1" style="padding:20px 26px"><h3 class="tl" style="font-size:28px">İlkel</h3><p style="font-size:24px">Başka tiplerden oluşmaz: int, float, char, bool</p></div>
          <div class="card tint-a f1" style="padding:20px 26px"><h3 class="hl" style="font-size:28px">Yapısal</h3><p style="font-size:24px">İlkel tiplerden kurulur: dizi, kayıt, işaretçi</p></div></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.1: Giriş. von Neumann makinesinde CPU ile bellek birbirinden ayrıdır. Bellekte komutlar, adresler ve işlenecek veriler bir arada durur; belleğe erişim tamamen adrese göre yapılır ve tüm bilgi ikili sayılara dönüştürülmek zorundadır.",
    "Çalışan bir programın belleği genellikle dört bölgeye ayrılır. En başta, sıfır adresinden başlayan düşük adreslerde metin bölgesi vardır: programın kodu ve sabit veriler burada durur.",
    "Onun ardından veri bölgesi yer alır. Global ve statik değişkenler, başlangıç değeri verilmiş olsun ya da olmasın, burada saklanır.",
    "Ardından iki dinamik bölge gelir. Heap, programın çalışırken istediği dinamik bellektir ve bir yöne doğru büyür. Stack ise yerel değişkenleri ve alt program çağrı bilgilerini tutar ve ters yönden büyür. İkisinin arasındaki boş alanı paylaşırlar.",
    "Peki veri tipi nedir? Bir veri tipi, bir değerler kümesini ve bu değerler üzerinde tanımlı işlemleri belirler. Bir dilin tipleri, programların ifade gücünü ve güvenilirliğini doğrudan etkilediği için, dili değerlendirirken önemli bir ölçüttür.",
    "Tipleri iki gruba ayırırız. İlkel tipler başka tiplerden oluşmaz; tam sayı, kayan noktalı sayı, karakter ve mantıksal tip gibi. Yapısal tipler ise ilkel tiplerden kurulur; diziler, kayıtlar ve işaretçiler gibi.",
  ],
},
// ───────── 6.2 primitive
{
  id: "integer", ch: "6.2 İlkel tipler", chip: "<b>6.2.1</b> Sayısal tipler: tam sayı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Tam sayı: <em>işaret biti + değer</em></h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:880px;gap:22px">
        <div class="r" data-s="1" style="display:flex;gap:5px;font-size:22px;color:var(--faint)"><div style="width:52px;text-align:center">işaret</div><div style="flex:1;text-align:center;border-bottom:2px solid var(--line);padding-bottom:4px">değer (word_size − 1 bit)</div></div>
        <div class="row" style="gap:24px;align-items:center">${bits("00000101", [[0, 0, "coral"], [1, 7, "teal"]], { s: 1 })}<span class="mono r" data-s="1" style="font-size:32px">= +5</span></div>
        <div class="row" style="gap:24px;align-items:center">${bits("10000101", [[0, 0, "coral"], [1, 7, "teal"]], { s: 2 })}<span class="mono r" data-s="2" style="font-size:32px">= −5 <span style="font-size:22px;color:var(--faint)">işaret-büyüklük</span></span></div>
        <div class="row" style="gap:24px;align-items:center">${bits("11111011", [[0, 0, "coral"], [1, 7, "violet"]], { s: 3 })}<span class="mono r" data-s="3" style="font-size:32px">= −5 <span style="font-size:22px;color:var(--faint)">ikiye tümleyen</span></span></div>
        <div class="note r" data-s="3" style="font-size:24px">Günümüz makineleri negatifleri çoğunlukla <b>ikiye tümleyen</b> ile saklar: bitleri ters çevir, 1 ekle. Böylece toplama devresi tek tip kalır.</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:24px 30px"><h3 style="font-size:28px">Farklı boyutlar</h3>
          <div class="mono" style="font-size:24px;line-height:1.9"><span class="tl">short</span>  2 bayt  ±32 767<br><span class="tl">int</span>    4 bayt  ±2,1 milyar<br><span class="tl">long</span>   8 bayt  ±9,2·10¹⁸</div>
          <p style="font-size:22px;margin-top:8px">Ada, C, Java: üç ayrı boy</p></div>
        <div class="card r" data-s="5" style="padding:24px 30px"><h3 style="font-size:28px">İşaretsiz</h3><div class="mono" style="font-size:24px"><span class="hl">unsigned int</span>  0 … 4,29 milyar</div><p style="font-size:22px;margin-top:8px">C, C++, C#: işaret biti de değere katılır</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.2: İlkel veri tipleri. İlkel tipler, başka tipler aracılığıyla tanımlanmayan tiplerdir. Eski dillerde yalnızca sayısal ilkel tipler varken, bugün karakter, mantıksal ve dizgi tipleri de çoğu dilde ilkel olarak bulunur. İlkel sayısal tipler tam sayı, kayan noktalı ve onlu tiplerdir. İlk olarak en bilinen tip olan tam sayıyla başlayalım.",
    "Bir tam sayı bellekte bir dizi bit olarak tutulur ve en soldaki bit işaret bitidir. Örneğin sekiz bitlik artı beş: işaret biti sıfır, geri kalan yedi bit beşin ikili karşılığı.",
    "En basit gösterimde eksi beş için sadece işaret bitini bir yaparız. Buna işaret ve büyüklük gösterimi denir.",
    "Ama günümüz makinelerinin çoğu negatif sayıları ikiye tümleyen biçiminde saklar: bitleri tersine çevirir ve bir eklersiniz. Eksi beş, bir bir bir bir bir sıfır bir bir olur. Bu gösterimin avantajı, toplama ve çıkarma için aynı devrenin kullanılabilmesidir.",
    "Ada, C ve Java gibi diller farklı boylarda tam sayı tipleri sunar: short iki bayt, int dört bayt, long sekiz bayt. Boy büyüdükçe gösterilebilen aralık da büyür.",
    "Ayrıca C, C++ ve C#'ta işaretsiz tam sayı tipi vardır. İşaret biti de değerin parçası olduğu için, dört baytlık işaretsiz bir sayı sıfırdan yaklaşık dört virgül iki dokuz milyara kadar değer alabilir.",
  ],
},
{
  id: "float", ch: "6.2 İlkel tipler", chip: "<b>6.2.1</b> Kayan noktalı sayılar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kayan nokta: <em>işaret · üs · kesir</em></h2>
    <div class="col" style="gap:26px">
      <div class="r" data-s="1">
        <div style="font-size:26px;color:var(--muted);margin-bottom:10px"><b style="color:var(--text)">float</b> — tek duyarlılık, 32 bit (IEEE 754)</div>
        <div style="display:flex;height:84px;font-family:JBM;font-size:26px;font-weight:700">
          <div style="width:52px;background:rgba(255,122,122,.2);border:2px solid var(--coral);border-radius:12px 0 0 12px;display:flex;align-items:center;justify-content:center;color:var(--coral)">1</div>
          <div style="width:340px;background:rgba(164,147,255,.18);border:2px solid var(--violet);border-left:0;display:flex;align-items:center;justify-content:center;color:var(--violet)">üs · 8 bit</div>
          <div style="flex:1;background:rgba(53,208,192,.14);border:2px solid var(--teal);border-left:0;border-radius:0 12px 12px 0;display:flex;align-items:center;justify-content:center;color:var(--teal)">kesir · 23 bit</div></div></div>
      <div class="r" data-s="2">
        <div style="font-size:26px;color:var(--muted);margin-bottom:10px"><b style="color:var(--text)">double</b> — çift duyarlılık, 64 bit</div>
        <div style="display:flex;height:84px;font-family:JBM;font-size:26px;font-weight:700">
          <div style="width:52px;background:rgba(255,122,122,.2);border:2px solid var(--coral);border-radius:12px 0 0 12px;display:flex;align-items:center;justify-content:center;color:var(--coral)">1</div>
          <div style="width:440px;background:rgba(164,147,255,.18);border:2px solid var(--violet);border-left:0;display:flex;align-items:center;justify-content:center;color:var(--violet)">üs · 11 bit</div>
          <div style="flex:1;background:rgba(53,208,192,.14);border:2px solid var(--teal);border-left:0;border-radius:0 12px 12px 0;display:flex;align-items:center;justify-content:center;color:var(--teal)">kesir · 52 bit</div></div></div>
      <div class="grid3" style="gap:26px;margin-top:8px">
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:28px">Duyarlılık ve alan</h3><p style="font-size:23px"><b>Duyarlılık</b> (precision): kesir kısmının tamlığı. <b>Alan</b> (range): kesir ve üsün birlikte belirlediği aralık.</p></div>
        <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:28px">Yaklaşık değerler</h3><div class="mono" style="font-size:24px;color:var(--amber)">0.1 + 0.2</div><div class="mono" style="font-size:24px">= 0.30000000000000004</div><p style="font-size:22px;margin-top:6px">0,1 ikili sistemde tam yazılamaz.</p></div>
        <div class="card r" data-s="5" style="padding:22px 28px"><h3 style="font-size:28px">Özel değerler</h3><div class="mono" style="font-size:24px;line-height:1.7"><span class="cl">NaN</span>  not a number (0.0/0.0)<br><span class="vl">±∞</span>   1.0/0.0</div></div>
      </div>
    </div>
  </div>`,
  n: [
    "Kayan noktalı tipler gerçel sayıları modeller. Bir kayan noktalı sayı, bilimsel gösterimdeki gibi iki bölümde tutulur: bir kesir ve bir üs. Bugün neredeyse tüm donanımlar bunun için IEEE 754 standardını kullanır.",
    "Tek duyarlıklı float otuz iki bittir: bir işaret biti, sekiz bitlik üs ve yirmi üç bitlik kesir.",
    "Çift duyarlıklı double ise altmış dört bittir: bir işaret biti, on bir bitlik üs ve elli iki bitlik kesir. Daha fazla bit, hem daha geniş aralık hem de daha fazla basamak demektir.",
    "Kayan noktalı tipler iki ölçüyle tanımlanır. Duyarlılık, değerin kesir kısmının ne kadar tam olduğudur. Alan ise kesir ve üsün birlikte belirlediği, gösterilebilen değer aralığıdır.",
    "Önemli bir uyarı: kayan noktalı değerler çoğu zaman yaklaşıktır. Örneğin sıfır virgül bir ikili sistemde tam olarak yazılamaz; bu yüzden sıfır virgül bir artı sıfır virgül iki, tam olarak sıfır virgül üç çıkmaz. Para hesaplarında bu yüzden dikkatli olmak gerekir.",
    "Standart ayrıca özel değerler tanımlar: sıfırı sıfıra bölmek gibi tanımsız işlemler NaN, yani sayı değil sonucunu verir; sıfır olmayan bir sayıyı sıfıra bölmek ise artı ya da eksi sonsuz üretir.",
  ],
},
{
  id: "decimal-complex", ch: "6.2 İlkel tipler", chip: "<b>6.2.1</b> Onlu ve karmaşık sayılar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Onlu (decimal) ve <em>karmaşık</em> tipler</h2>
    <div class="grid2" style="gap:40px">
      <div class="card tint-a r" data-s="1" style="padding:30px 36px">
        <h3 class="hl">Decimal (onlu)</h3>
        <p style="font-size:25px">Sabit sayıda <b>onlu basamak</b>, ondalık nokta sabit bir yerde. Değerleri <b>tam olarak</b> saklar → para hesapları.</p>
        <div class="r" data-s="2" style="display:flex;gap:8px;margin:22px 0 10px">${["1", "2", "3", "4", ",", "5", "6"].map((d) => d === "," ? `<div class="mono" style="font-size:40px;color:var(--amber);align-self:flex-end">,</div>` : `<div class="mono" style="width:62px;height:72px;border:2px solid var(--amber);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700">${d}</div>`).join("")}</div>
        <p class="r" data-s="2" style="font-size:22px">her basamak ≈ 1 bayt (BCD ile yarım bayt)</p>
        <div class="pills r" data-s="3" style="margin-top:14px;display:flex;gap:10px"><span class="pill a">COBOL</span><span class="pill a">PL/I</span><span class="pill a">C# decimal</span></div>
        <p class="r" data-s="3" style="font-size:23px;margin-top:14px"><b>Dezavantaj:</b> üs olmadığı için alan sınırlı; bellek israfı.</p>
      </div>
      <div class="card tint-v r" data-s="4" style="padding:30px 36px">
        <h3 class="vl">Karmaşık sayılar</h3>
        <p style="font-size:25px">Her değer iki parça: <b>reel</b> ve <b>imajiner</b>. C99, Fortran ve Python destekler.</p>
        ${code("python", ["z = (7 + 3j)", "z.real   # 7.0", "z.imag   # 3.0", "abs(3 + 4j)   # 5.0"], { lang: "python", cls: "sm" }).replace('class="code sm"', 'class="code sm" style="margin-top:22px"')}
      </div>
    </div>
  </div>`,
  n: [
    "Bir diğer sayısal tip onlu, yani decimal tiptir.",
    "Decimal tipte sabit sayıda onlu basamak tutulur ve ondalık noktanın yeri sabittir. Kayan noktalı sayıların aksine, onlu değerleri tam olarak saklar; bu yüzden para gibi ticari hesaplamalarda tercih edilir. Her basamak için yaklaşık bir bayt, ikili kodlu onluk gösterimle yarım bayt harcanır.",
    "Bu tip COBOL kökenlidir; PL/I ve C# da decimal tipi sunar. Dezavantajı ise üs olmadığı için gösterilebilen aralığın sınırlı olması ve belleği verimli kullanmamasıdır.",
    "Bazı diller karmaşık sayıları da ilkel tip olarak destekler.",
    "Örneğin C99, Fortran ve Python. Her karmaşık değer iki parçadan oluşur: reel kısım ve imajiner kısım. Python'da yedi artı üç j yazdığınızda yedi reel kısım, üç ise imajiner kısımdır.",
  ],
},
{
  id: "bool-char", ch: "6.2 İlkel tipler", chip: "<b>6.2.2–6.2.3</b> Mantıksal ve karakter tipleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Mantıksal ve <em>karakter</em> tipleri</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="1" style="padding:26px 32px"><h3 style="font-size:32px">Boolean</h3>
          <div class="row" style="gap:16px;margin:4px 0 14px"><span class="pill t">true</span><span class="pill c">false</span></div>
          <p style="font-size:24px">En basit tip, ilk kez <b>ALGOL 60</b>'ta. Tek bit yeter ama tek bite erişim zor olduğundan genelde <b>1 bayt</b> kullanılır. Avantajı: okunabilirlik.</p></div>
        <div class="card r" data-s="2" style="padding:26px 32px"><h3 style="font-size:32px">C'de Boolean yok <span style="font-size:22px;color:var(--faint);font-weight:500">(C99'a kadar)</span></h3>
          ${code("bool.c", ["int b = (5 > 3);   // b = 1", "if (0)  ...         // yanlış", "if (42) ...         // doğru"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:26px 32px"><h3 style="font-size:32px">Karakter kodlamaları</h3>
          <div class="mono" style="font-size:24px;line-height:1.9"><span class="hl">ASCII</span>        7–8 bit · 128 karakter<br><span class="hl">ISO 8859-1</span>   8 bit · 256 karakter<br><span class="hl">Unicode</span>      UTF-8: 1–4 bayt<br><span style="color:var(--faint)">             UCS-2 16 bit · UCS-4 32 bit</span></div>
          <p style="font-size:22px;margin-top:6px">Java, JavaScript ve C# Unicode kullanır.</p></div>
        <div class="card r" data-s="4" style="padding:26px 32px"><h3 style="font-size:32px">C'de char = küçük tam sayı</h3>
          ${code("char.c", ["char c = 'A';     // 65", "c = c + 2;        // 'C'", "int i = 'a' - 'A'; // 32"], { lang: "c", cls: "xs" })}</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.2.2 ve 6.2.3: Mantıksal ve karakter tipleri.",
    "Mantıksal, yani Boolean tip, en basit tiptir: yalnızca doğru ve yanlış olmak üzere iki değer alır. İlk kez ALGOL 60 ile tanıtıldı ve sonra çoğu dile girdi. Bir değer tek bitle gösterilebilir ama çoğu bilgisayarda tek bir bite erişmek zor olduğu için genellikle bir bayt kullanılır. En büyük avantajı okunabilirliktir. İlişkisel işlemciler mantıksal değer döndürdüğü ve if gibi seçim deyimleri mantıksal ifadeler üzerinde çalıştığı için bu tipin dilde yer alması önemlidir.",
    "Ancak C, uzun süre ayrı bir mantıksal tipe sahip olmayan dillerin en bilinenidir. C'de ilişkisel işlemciler doğru için bir, yanlış için sıfır döndürür. if deyimi sıfırı yanlış, sıfır dışındaki her değeri doğru kabul eder.",
    "Karakter tipi tek bir karakteri sayısal bir kod olarak saklar. En yaygın kodlama ASCII'dir ve sıfırdan yüz yirmi yediye kadar sayılarla yüz yirmi sekiz karakter gösterir. ISO 8859 bir, iki yüz elli altı karakterlik bir genişletmedir. Dünyadaki tüm alfabeleri kapsamak için Unicode geliştirildi; UTF sekiz kodlamasında bir karakter bir ile dört bayt arasında yer kaplar ve ASCII bu gösterimin içinde tek bayt olarak yer alır. Java, JavaScript ve C# Unicode kullanır.",
    "C'de karakter tipi aslında küçük bir tam sayıdır ve int ile birbirinin yerine kullanılabilir. Büyük A harfinin kodu altmış beştir; ona iki eklerseniz büyük C harfini elde edersiniz.",
  ],
},
// ───────── 6.2.4 strings
{
  id: "strings", ch: "6.2.4 Karakter dizgileri", chip: "<b>6.2.4</b> Karakter dizgileri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dizgi: <em>ilkel tip mi, karakter dizisi mi?</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px">
        <div class="card r" data-s="1" style="padding:24px 30px"><h3 style="font-size:28px">Tasarım sorusu</h3>
          <p style="font-size:24px"><b class="tl">İlkel tip:</b> FORTRAN 77/90, BASIC, Ada<br><b class="hl">Karakter dizisi:</b> Pascal, C, C++</p></div>
        <div class="card r" data-s="2" style="padding:24px 30px"><h3 style="font-size:28px">Temel işlemler</h3>
          <div class="pills" style="display:flex;flex-wrap:wrap;gap:10px"><span class="pill">atama</span><span class="pill">karşılaştırma</span><span class="pill">birleştirme</span><span class="pill">alt dizgi</span><span class="pill a">örüntü eşleme</span></div></div>
        <div class="card r" data-s="5" style="padding:24px 30px"><h3 style="font-size:28px">Örüntü eşleme</h3>
          <div class="mono" style="font-size:26px;color:var(--amber)">/[A-Za-z][A-Za-z\\d]+/</div><p style="font-size:22px;margin-top:6px">Perl, JavaScript, Java, C#: düzenli ifadeler. SNOBOL4 ise dizgi işleme için tasarlandı.</p></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="3">${code("ada", ["N := N1 & N2;   -- birleştirme", "N(2..4)          -- alt dizgi"], { lang: "ada", cls: "xs" })}</div>
        <div class="r" data-s="3">${code("c", ["char str[] = \"merhaba\";", "strcpy(dst, src);  strlen(str);", "strcmp(a, b);      strcat(a, b);"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="4">${code("java", ["String s = \"ab\";   // değiştirilemez", "s = s + \"c\";       // yeni nesne!", "StringBuffer b = new StringBuffer(\"ab\");", "b.append(\"c\");    // yerinde değişir"], { lang: "java", cls: "xs" })}</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.2.4: Karakter dizgileri. Bir dizgi, bir karakterler dizisidir.",
    "İlk tasarım sorusu şudur: dizgi ilkel bir tip mi olmalı, yoksa özel bir karakter dizisi mi? FORTRAN 77, FORTRAN 90, BASIC ve Ada'da dizgiler ilkel tiptir ve dil, atama ve karşılaştırma gibi işlemler için işlemciler sağlar. Pascal, C ve C++'ta ise dizgi tek karakterlerden oluşan bir dizi olarak saklanır.",
    "Dizgiler üzerindeki temel işlemler atama, karşılaştırma, birleştirme, alt dizgiye erişim ve örüntü eşlemedir.",
    "Örneğin Ada'da ve işareti iki dizgiyi birleştirir; N parantez iki nokta nokta dört ise ikinci ile dördüncü karakterler arasındaki alt dizgiyi verir. C'de dizgi temel bir tip değildir; karakter dizileri ve strcpy, strcmp gibi kütüphane fonksiyonları kullanılır. C++'ta ise string sınıfını kullanmak daha güvenlidir, çünkü sınır kontrolü yapar.",
    "Java'da String sınıfının nesneleri değiştirilemez; bir dizgiye ekleme yaptığınızda aslında yeni bir nesne oluşur. Değiştirilebilir dizgiler için StringBuffer sınıfı vardır.",
    "Perl, JavaScript, Java ve C# gibi dillerde örüntüler düzenli ifadelerle tanımlanır; bu çok güçlü bir özelliktir. Ekrandaki ifade, bir harfle başlayıp harf ya da rakamlarla devam eden kelimeleri eşler. SNOBOL4 ise baştan dizgi işleme için tasarlanmış ve ayrıntılı örüntü eşleme sunan bir dildir.",
  ],
},
{
  id: "string-length", ch: "6.2.4 Karakter dizgileri", chip: "<b>6.2.4</b> Dizgi uzunluğu ve tanımlayıcılar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dizginin uzunluğu: <em>üç seçenek</em></h2>
    <div class="grid3" style="gap:30px">
      <div class="card r" data-s="1" data-hot="1" style="padding:26px 30px"><h3 class="tl" style="font-size:30px">1. Statik uzunluk</h3><p style="font-size:23px">Uzunluk tanımda sabitlenir. FORTRAN, COBOL, Pascal, Ada, Java String.</p><div class="mono" style="font-size:21px;margin-top:10px;color:var(--amber)">CHARACTER (LEN = 15) NAME</div></div>
      <div class="card r" data-s="2" data-hot="2" style="padding:26px 30px"><h3 class="vl" style="font-size:30px">2. Sınırlı dinamik</h3><p style="font-size:23px">Bir üst sınıra kadar değişebilir. PL/I (VARYING), C ve C++.</p><div class="mono" style="font-size:21px;margin-top:10px;color:var(--amber)">char s[10] = "abc";</div></div>
      <div class="card r" data-s="4" data-hot="4" style="padding:26px 30px"><h3 class="cl" style="font-size:30px">3. Dinamik</h3><p style="font-size:23px">Üst sınır yok. Esnek ama dinamik bellek yönetimi gerekir. Perl, JavaScript.</p></div>
    </div>
    <div class="row" style="gap:40px;margin-top:34px;align-items:flex-start">
      <div class="r" data-s="3" style="flex:none">
        <div style="font-size:22px;color:var(--muted);margin-bottom:8px">C'de <b style="color:var(--text)">"abc"</b>, 10 baytlık dizide:</div>
        <div style="display:flex;gap:4px">${["a", "b", "c", "\\0", "", "", "", "", "", ""].map((c, i) => `<div class="mono" style="width:56px;height:64px;border:2px solid var(--${i < 3 ? "teal" : i === 3 ? "coral" : "line"});border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;color:var(--${i === 3 ? "coral" : "text"})">${c}</div>`).join("")}</div>
        <div style="font-size:21px;color:var(--faint);margin-top:6px">sıfır (null) karakteri dizginin sonunu işaretler</div></div>
      <div class="row f1 r" data-s="5" style="gap:24px;justify-content:flex-end">
        <div style="text-align:center"><div style="border:2px solid var(--teal);border-radius:14px;overflow:hidden;width:270px;font-size:23px">${["Statik string", "Uzunluk", "Adres"].map((t, i) => `<div style="padding:9px;${i ? "border-top:1px solid var(--line)" : "background:rgba(53,208,192,.15);font-weight:700"}">${t}</div>`).join("")}</div><div style="font-size:19px;color:var(--faint);margin-top:6px">derleme zamanı tanımlayıcısı</div></div>
        <div style="text-align:center"><div style="border:2px solid var(--violet);border-radius:14px;overflow:hidden;width:300px;font-size:23px">${["Sınırlı dinamik string", "Maksimum uzunluk", "Gerçek uzunluk", "Adres"].map((t, i) => `<div style="padding:9px;${i ? "border-top:1px solid var(--line)" : "background:rgba(164,147,255,.16);font-weight:700"}">${t}</div>`).join("")}</div><div style="font-size:19px;color:var(--faint);margin-top:6px">çalışma zamanı tanımlayıcısı</div></div>
      </div>
    </div>
  </div>`,
  n: [
    "Dizgilerle ilgili ikinci tasarım sorusu uzunluktur: uzunluk sabit mi olmalı, değişebilmeli mi?",
    "Birinci seçenek statik uzunluktur. FORTRAN, COBOL, Pascal ve Ada'da uzunluk tanımda belirtilir ve değişmez. Örneğin FORTRAN 90'da NAME on beş karakterlik bir dizgi olarak tanımlanabilir.",
    "İkinci seçenek sınırlı dinamik uzunluktur. PL/I, C ve C++'ta dizgi, tanımlanan bir üst sınıra kadar farklı uzunluklarda değer alabilir. PL/I'da bu, VARYING eki ile belirtilir.",
    "C bunu nasıl yapar? Dizginin sonuna sıfır değerli özel bir karakter, yani null karakteri koyar. On baytlık bir dizide abc saklarsanız, üç harften sonra gelen sıfır, dizginin bittiğini gösterir. Böylece üst sınırdan daha kısa değerler saklanabilir.",
    "Üçüncü seçenek, üst sınırı olmayan dinamik uzunluktur. En esnek yaklaşım budur, ancak dizgi büyüdükçe yer ayırmak gerektiği için dinamik bellek yönetimi ister. Perl ve JavaScript bu yaklaşımı kullanır.",
    "Peki derleyici bu dizgileri nasıl izler? Bir tanımlayıcı, yani descriptor kullanır. Statik bir dizgi için derleme zamanında uzunluk ve adresi tutmak yeterlidir. Sınırlı dinamik bir dizgi için ise çalışma zamanında hem en fazla uzunluk, hem o anki gerçek uzunluk, hem de adres tutulmalıdır.",
  ],
},
// ───────── 6.2.5 ordinal
{
  id: "enum", ch: "6.2.5 Sıralı tipler", chip: "<b>6.2.5</b> Sayılama (enumeration) tipleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Sayılama: <em>isimlendirilmiş sabitler</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px">
        <p class="lead r" data-s="0" style="font-size:27px;margin:0">Sıralı (ordinal) tip: değerleri <b>pozitif tam sayılarla</b> eşlenebilen tip. Kullanıcı iki tür tanımlayabilir: <b>sayılama</b> ve <b>altalan</b>.</p>
        <div class="r" data-s="1">${code("days.c", ["enum days {mon, tue, wed, thu, fri, sat, sun};", "enum days d = wed;", "if (d < sat) printf(\"hafta içi\");"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="1" style="display:flex;gap:8px">${["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((d, i) => `<div style="flex:1;text-align:center;border:2px solid var(--${i === 2 ? "amber" : "line"});border-radius:12px;padding:8px 0"><div class="mono" style="font-size:24px">${d}</div><div class="mono" style="font-size:20px;color:var(--faint)">${i}</div></div>`).join("")}</div>
        <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:27px">Neden kullanalım?</h3><p style="font-size:23px"><b>Okunabilirlik:</b> renk için sayı kodu gerekmez. <b>Güvenilirlik:</b> derleyici renk toplamayı ve aralık dışı atamayı engelleyebilir.</p></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:27px">Dillere göre</h3>
          <p style="font-size:22px;line-height:1.55"><b>Pascal:</b> sabit iki tipte kullanılamaz; dizi indisi, case seçicisi olur; girdi/çıktı olamaz.<br><b>Ada:</b> sabitler tekrar kullanılabilir (overloaded literals), bağlamdan ayırt edilir.<br><b>C, C++:</b> tam sayıya zorlanır, girdi/çıktı olabilir.<br><b>C#, Java 5.0:</b> tam sayıya <b>zorlanmaz</b>.</p></div>
        <div class="note r" data-s="3" style="font-size:22px"><b>Tasarım soruları:</b> Bir sabit birden çok tipte yer alabilir mi? Değerler tam sayıya zorlanır mı? Başka bir tip sayılama tipine zorlanır mı?</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.2.5: Kullanıcı tanımlı sıralı tipler. Sıralı tip, olası değerleri pozitif tam sayılarla eşlenebilen tiptir. Kullanıcılar iki tür sıralı tip tanımlayabilir: sayılama ve altalan. Amaç, programcıya gerçek dünyadaki nesnelere karşılık gelen yeni tipler oluşturma olanağı vermektir.",
    "Sayılama tipi, parantez içinde yazılmış isimlerden oluşur. Örneğin C'de haftanın günlerini mon'dan sun'a kadar bir enum olarak tanımlayabiliriz. Derleyici bu isimleri sırayla sıfır, bir, iki diye tam sayılarla eşler. Bu yüzden sayılama değerleri dizi indisi ya da döngü değişkeni olarak kullanılabilir ve tanımdaki sıralarına göre karşılaştırılabilir.",
    "Diller burada farklı davranır. Pascal'da bir sabit iki farklı sayılama tipinde kullanılamaz; değerler dizi indisi ve case seçicisi olabilir ama doğrudan okunup yazdırılamaz. Ada'da aynı sabit farklı tiplerde tekrar kullanılabilir ve hangisinin kastedildiği bağlamdan anlaşılır. C ve C++'ta değerler tam sayıya zorlanır. C# ve Java ise sayılama değerlerini tam sayıya zorlamaz, bu yüzden daha güvenlidir.",
    "Bu da tasarım sorularını özetler: bir sembolik sabit birden çok tip tanımında yer alabilir mi, sayılama değerleri tam sayıya zorlanır mı ve başka bir tip sayılama tipine zorlanabilir mi?",
    "Sayılama tipleri hem okunabilirliği hem de güvenilirliği artırır. Bir rengi sayı koduyla göstermeniz gerekmez; derleyici de iki rengin toplanması ya da tanım dışı bir değerin atanması gibi anlamsız işlemleri yakalayabilir.",
  ],
},
{
  id: "subrange", ch: "6.2.5 Sıralı tipler", chip: "<b>6.2.5</b> Altalan (subrange) tipleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Altalan: <em>sıralı bir tipin dilimi</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:880px">
        <div class="r" data-s="1">${code("gunler.ada", ["type Days is (mon, tue, wed, thu, fri, sat, sun);", { t: "subtype Weekdays is Days range mon..fri;", hot: "1,2" }, { t: "subtype Index is Integer range 1..100;", s: 3, hot: "3" }, "", "Day1 : Days;", "Day2 : Weekdays;", { t: "Day2 := Day1;   -- Day1 = sat ise HATA", s: 2, hot: "2" }], { lang: "ada", cls: "xs" })}</div>
        <div class="r" data-s="1" style="display:flex;gap:8px">${["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((d, i) => `<div style="flex:1;text-align:center;border:2px solid var(--${i < 5 ? "teal" : "line"});background:${i < 5 ? "rgba(53,208,192,.1)" : "transparent"};border-radius:12px;padding:10px 0" class="mono"><span style="font-size:24px;color:var(--${i < 5 ? "text" : "faint"})">${d}</span></div>`).join("")}</div>
        <div class="r" data-s="1" style="font-size:22px;color:var(--teal);margin-top:-14px">◀ Weekdays = mon..fri ▶</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="1" style="padding:24px 30px"><p style="font-size:24px">Ana tipin <b>tüm işlemleri</b> altalana da uygulanır. İlk kez <b>Pascal</b>'da; Ada'da yeni tip değil, <b>sınırlandırılmış</b> mevcut tiptir.</p></div>
        <div class="card tint-t r" data-s="4" style="padding:24px 30px"><h3 class="tl" style="font-size:28px">Okunabilirlik</h3><p style="font-size:23px">Okuyucu değişkenin hangi aralıkta kalacağını hemen görür.</p></div>
        <div class="card tint-a r" data-s="4" style="padding:24px 30px"><h3 class="hl" style="font-size:28px">Güvenilirlik</h3><p style="font-size:23px">Aralık dışı atama hata olarak yakalanır.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "İkinci sıralı tip altalandır.",
    "Altalan tipi, bir sıralı tipin ardışık bir alt kümesidir. Ada örneğinde önce haftanın günlerini Days olarak tanımlıyoruz; sonra Weekdays'i, Days'in mon'dan fri'ye kadar olan dilimi olarak tanımlıyoruz. Altalan ana tipe bağlı kaldığı için, ana tipe uygulanabilen bütün işlemciler altalana da uygulanabilir. Altalanlar ilk kez Pascal'da tanıtıldı; Ada'da ise yeni bir tip değil, sınırlandırılmış mevcut bir tiptir.",
    "Peki Weekdays tipindeki Day2'ye, Days tipindeki Day1'i atarsak ne olur? Derleme zamanında bu atamaya izin verilir; ancak çalışma zamanında Day1'in değeri sat ya da sun ise, değer aralığın dışında kaldığı için hata oluşur.",
    "Altalanlar tam sayılarla da tanımlanabilir: örneğin Index, birden yüze kadar olan tam sayılardır ve dizi indisleri için idealdir.",
    "Değerlendirelim: altalanlar okunabilirliği artırır, çünkü okuyucu değişkenin alabileceği değerleri hemen görür. Güvenilirliği de artırır, çünkü belirlenen aralığın dışında bir değer atamak hata olarak algılanır.",
  ],
},
];
