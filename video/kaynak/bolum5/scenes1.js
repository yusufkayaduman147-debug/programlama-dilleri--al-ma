const { code } = require("../build/lib");
const { trace } = require("../ch4/h");

const roadmap = ["Giriş: von Neumann ve atama", "Değişkenler ve isimler", "Sabitler ve veri tipleri", "İşlemciler", "İfadeler ve deyimler", "Bağlama: tip ve bellek", "İsim kapsamları: statik ve dinamik", "Tip kontrolü ve uyumluluk"];

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:26px;margin-bottom:56px;align-items:center">
      ${[["İsim", "counter", "teal"], ["Tip", "int", "violet"], ["Değer", "100", "amber"], ["Adres", "0x23FF01", "coral"]].map(([a, b, c]) => `<div class="card" style="padding:18px 30px;text-align:center"><div style="font-size:22px;color:var(--muted)">${a}</div><div class="mono" style="font-size:34px;color:var(--${c})">${b}</div></div>`).join("")}
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:108px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 5: Adlar, Bağlama,<br>Tip Kontrolü ve Kapsamlar</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin beşinci bölümüne hoş geldiniz.",
    "Bu bölümde programların temel yapı taşlarını inceleyeceğiz: değişkenler ve isimleri, tipleri, değerleri ve adresleri; işlemciler ve ifadeler; bu özelliklerin değişkenlere ne zaman bağlandığı; ve bir ismin programın hangi bölümünde geçerli olduğu, yani kapsam.",
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
    "Önce von Neumann mimarisi ve atama ile başlayıp değişkenlere, isimlere, sabitlere, veri tiplerine ve işlemcilere geçeceğiz.",
    "Sonra ifadeler ve deyimleri, ardından bölümün kalbi olan bağlama kavramını, isim kapsamlarını ve son olarak tip kontrolünü göreceğiz.",
  ],
},
{
  id: "vn-assign", ch: "5.1 Giriş", chip: "<b>5.1</b> Giriş: bellek ve atama",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İmperatif programlama = <em>belleği değiştirmek</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <ul class="b r" data-s="0"><li style="font-size:28px">von Neumann: veri ve komutlar <b>aynı bellekte</b></li><li style="font-size:28px">Her hücrenin özgün bir <b>adresi</b> var; içeriği kodlanmış bir değer</li><li style="font-size:28px">En temel işlem: <b>atama</b> — sağdaki değer, soldaki değişkene</li></ul>
        <div class="row r" data-s="1" style="gap:20px;margin-top:20px">
          <div class="card f1" style="padding:20px 24px"><div class="mono" style="font-size:36px;color:var(--teal)">a = 10;</div><p style="font-size:22px;margin-top:8px">C, C++, Java, C#, Fortran, BASIC</p></div>
          <div class="card f1" style="padding:20px 24px"><div class="mono" style="font-size:36px;color:var(--amber)">a := 10;</div><p style="font-size:22px;margin-top:8px">Pascal, ALGOL, Ada</p></div></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="2" style="padding:20px 26px"><h3 style="font-size:28px">Daha karmaşık atamalar</h3>
          <div class="mono" style="font-size:24px;line-height:1.8;margin-top:6px">A, B = 10 <span class="cm">  // PL/I: çok hedefli</span><br>(first==1) ? total : subtotal = 0<br>sum += next; <span class="cm">  // birleşik</span><br>a++; <span class="cm">  // tekli</span><br>a = b * (c = d * 2 + 1) + 1</div></div>
        <div class="note r" data-s="3" style="font-size:25px"><b>Tehlike:</b> <span class="mono">if (x = y)</span> ile <span class="mono">if (x == y)</span> çok farklı! Java ve C#, if içinde atamaya izin vermez.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.1: Giriş. Hatırlayın, von Neumann mimarisinde veri ve komutlar aynı bellekte durur ve her bellek hücresinin özgün bir adresi vardır. İmperatif programlama, işlem deyimleriyle bellekteki bu değerleri değiştirmeye dayanır. Bu yüzden en temel işlem atamadır: sağdaki değer, soldaki değişkene aktarılır.",
    "Atama sembolü dillere göre değişir. C, C++, Java ve Fortran eşittir işaretini; Pascal, ALGOL ve Ada ise iki nokta eşittiri kullanır. Ama anlam her yerde aynıdır.",
    "Bazı diller daha karmaşık atamalara izin verir: PL/I'da aynı değeri birden çok hedefe atayabilirsiniz; C tabanlı dillerde koşullu hedefler, artı eşittir gibi birleşik atamalar ve artı artı gibi tekli atamalar vardır. Hatta C'de atamanın kendisi bir değer döndürür, bu yüzden bir ifadenin içinde kullanılabilir.",
    "Bunun bir tehlikesi var: if parantez x eşittir y ile if parantez x eşittir eşittir y çok farklı şeylerdir. Birincisi y'yi x'e atar ve sonucu koşul olarak kullanır. Bu klasik yazım hatasını önlemek için Java ve C#, if koşulunda atamaya izin vermez.",
  ],
},
// ───────── 5.2 Variables
{
  id: "variable", ch: "5.2 Değişkenler", chip: "<b>5.2</b> Değişkenin altı özelliği",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bir değişken = <em>bellek hücresinin soyutlaması</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:620px;align-items:center;justify-content:center">
        <div class="mono r" data-s="0" style="font-size:44px;margin-bottom:30px">int counter = 100;</div>
        <div class="r" data-s="1" style="display:flex;gap:8px;align-items:center">
          <div class="col" style="gap:6px;font-family:JBM;font-size:22px;color:var(--faint);text-align:right"><span>0x23FF00</span><span style="color:var(--coral);font-weight:700">0x23FF01</span><span>0x23FF02</span></div>
          <div class="col" style="gap:6px">${["…", "100", "…"].map((v, i) => `<div class="box" style="width:220px;height:62px;font-family:JBM;${i === 1 ? "border-color:var(--amber);color:var(--amber);font-size:34px" : "color:var(--faint)"}">${v}</div>`).join("")}</div>
        </div>
        <div class="r" data-s="1" style="font-size:24px;color:var(--muted);margin-top:14px">bellek</div>
      </div>
      <div class="f1 grid2" style="gap:18px;align-content:center">
        ${[["İsim", "counter", "Değişkene başvurmak için", "teal", 2], ["Adres (l-value)", "0x23FF01", "Bellekteki yeri", "coral", 2], ["Değer (r-value)", "100", "Hücrenin içeriği", "amber", 3], ["Tip", "int", "Alabileceği değerler ve işlemler", "violet", 3], ["Yaşam süresi", "", "Adrese bağlı kaldığı süre", "green", 4], ["Kapsam", "", "İsminin geçerli olduğu deyimler", "blue", 4]]
          .map(([h, v, p, c, s]) => `<div class="card r rp" data-s="${s}" style="padding:20px 24px"><h3 style="font-size:28px;color:var(--${c});margin-bottom:6px">${h}</h3>${v ? `<div class="mono" style="font-size:28px">${v}</div>` : ""}<p style="font-size:22px">${p}</p></div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.2: Değişkenler. Bir değişken, bir ya da daha fazla bellek hücresinin soyutlamasıdır. int counter eşittir 100 tanımına bakalım.",
    "Bu değişken bellekte bir hücreye karşılık gelir ve onu altı özellikle tanımlarız.",
    "İsmi counter: programın diğer deyimleri ona bu isimle başvurur. Adresi, yani l-value'su, bellekteki yeridir. Aynı isim programın farklı yerlerinde farklı adreslere karşılık gelebilir; örneğin iki ayrı alt programdaki toplam adlı yerel değişkenler aslında iki ayrı değişkendir.",
    "Değeri, yani r-value'su, o adreste kodlanmış olarak saklanan içeriktir: 100. Tipi ise değişkenin alabileceği değerleri ve ona uygulanabilecek işlemleri belirler: int.",
    "Son iki özellik biraz daha soyuttur. Yaşam süresi, değişkenin bir bellek adresine bağlı kaldığı süredir. Kapsam ise değişkenin isminin tanımlı olduğu program deyimleridir. Bu ikisini bölümün sonlarında ayrıntılı göreceğiz.",
  ],
},
{
  id: "alias", ch: "5.2 Değişkenler", chip: "<b>5.2</b> Takma adlar (aliases)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aynı adrese iki isim: <em>takma ad</em></h2>
    <div class="row" style="flex:1;gap:40px;align-items:center">
      <div class="col" style="width:760px">
        <div class="r" data-s="0">${code("alias.cpp", ["int x = 5;", "int &r = x;      // referans", "int *p = &x;     // işaretçi", { t: "r = 8;", hot: "1" }, { t: "cout << *p;      // 8 !", hot: "1" }], { lang: "c" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="1"><h3>Neden sorun?</h3><p>Okuyucu, aynı hücreye ulaşan <b>bütün isimleri</b> akılda tutmak zorundadır → okunabilirlik ve güvenilirlik düşer.</p></div>
        <div class="card r" data-s="2"><h3>Nasıl oluşur?</h3><div class="pills"><span class="pill c">işaretçiler</span><span class="pill c">referanslar</span><span class="pill c">C/C++ union</span><span class="pill c">parametre geçirme</span></div><p style="margin-top:12px;font-size:24px">Fortran'da belleği yeniden kullanmak için yapılırdı; bugün yerini <b>dinamik bellek</b> aldı.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Adresle ilgili önemli bir kavram takma addır. İki farklı isim aynı bellek hücresine erişmek için kullanılabiliyorsa, bunlara takma ad, yani alias denir. Burada x'e hem r referansı hem de p işaretçisi üzerinden ulaşılabiliyor.",
    "r üzerinden değeri 8 yaptığımızda, p'nin gösterdiği değer de 8 olur. Okuyucu aynı hücreye ulaşan bütün isimleri akılda tutmak zorunda kalır; bu yüzden takma adlar okunabilirliğe ve güvenilirliğe zarar verir.",
    "Takma adlar işaretçiler, referans değişkenleri, C ve C++'taki union'lar ve parametre geçirme yoluyla oluşur. Eski Fortran'da belleği yeniden kullanmak için bilerek yapılırdı; bugün bu ihtiyacı dinamik bellek karşılıyor.",
  ],
},
{
  id: "names", ch: "5.2 Değişkenler", chip: "<b>5.2.1</b> İsimler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İsim tasarımının <em>üç sorusu</em></h2>
    <div class="grid3" style="gap:28px;zoom:1.3">
      <div class="card r" data-s="1"><h3>1. En fazla uzunluk</h3>
        <table style="width:100%;font-size:24px;margin-top:10px;border-collapse:collapse">${[["FORTRAN I", "6"], ["COBOL", "30"], ["Fortran 90, ANSI C", "31"], ["Ada, Java, C#", "sınırsız"], ["C++", "sınırsız*"]].map(([a, b]) => `<tr><td style="padding:6px 0;color:var(--muted)">${a}</td><td class="mono" style="text-align:right;color:var(--teal)">${b}</td></tr>`).join("")}</table>
        <p style="font-size:22px;margin-top:10px">Çok kısa → anlaşılmaz. Bugün: makul sınır + <span class="mono">alt_cizgi</span>.</p></div>
      <div class="card r" data-s="2"><h3>2. Büyük-küçük harf</h3>
        <div class="col" style="gap:8px;margin:14px 0;font-family:JBM;font-size:32px"><span class="tl">TOPLAM</span><span class="hl">toplam</span><span class="vl">ToPlaM</span></div>
        <p style="font-size:23px">C, C++, Java'da <b>üç farklı</b> değişken! Benzer görünen isimler farklı → okunabilirlik riski.</p></div>
      <div class="card r" data-s="3"><h3>3. Özel kelimeler</h3>
        <p style="font-size:23px"><b class="tl">Anahtar kelime:</b> sadece belli bağlamda özel. Fortran'da:</p>
        <div class="mono" style="font-size:24px;margin:8px 0;line-height:1.6">REAL ELMA<br>REAL = 87.6 <span class="cl">?!</span></div>
        <p style="font-size:23px"><b class="hl">Ayrılmış kelime:</b> isim olarak <b>hiç</b> kullanılamaz (Pascal: for, begin, end).</p></div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.2.1: İsimler. İsimler sadece değişkenler için değil; etiketler, alt programlar ve parametreler için de kullanılır. İsim tasarımında üç soru vardır.",
    "Birincisi, en fazla uzunluk. FORTRAN I'de bir isim en fazla 6 karakter olabiliyordu, COBOL'da 30, ANSI C'de 31. Ada, Java ve C#'ta sınır yoktur. Çok kısa isimler anlaşılmaz; bugünkü yaklaşım makul bir sınır koymak ve çok kelimeli isimler için alt çizgi kullanmaktır.",
    "İkincisi, büyük-küçük harf duyarlılığı. C, C++ ve Java'da TOPLAM, toplam ve karışık yazılmış ToPlaM üç ayrı değişkendir. Benzer görünen isimlerin farklı olması okunabilirliği zorlaştırır.",
    "Üçüncüsü, özel kelimeler. Anahtar kelime, yalnızca belli bağlamlarda özel anlam taşır. Fortran'da REAL ELMA bir tanımlamadır; ama REAL eşittir 87.6 yazarsanız REAL bir değişken adı olur. Bu okunabilirliği çok azaltır. Ayrılmış kelime ise hiçbir zaman isim olarak kullanılamaz; Pascal'daki for, begin ve end gibi.",
  ],
},
{
  id: "types-consts", ch: "5.3 Sabitler ve tipler", chip: "<b>5.2.2–5.3</b> Veri tipleri ve sabitler",
  html: `
  <div class="wrap">
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:880px">
        <h2 class="t r" data-s="0" style="font-size:52px;margin-bottom:6px">Veri tipi</h2>
        <p class="lead r" data-s="0" style="font-size:27px">Aynı işlemlerin tanımlı olduğu <b>değerler kümesi</b>. <b class="tl">İlkel</b> tipler başka tiplerden oluşmaz; <b class="vl">yapısal</b> tipler bileşenlerden oluşur.</p>
        <div class="r" data-s="1">${trace([{ h: "C++ tipi", color: "teal" }, { h: "aralık", color: "text" }, { h: "byte", color: "amber", align: "right" }],
          [[["char", "-128 … 127", "1"], 1], [["short", "-32 768 … 32 767", "2"], 1], [["int", "±2.1 milyar", "4"], 1], [["float", "±3.4×10³⁸ · 7 basamak", "4"], 1], [["double", "±1.7×10³⁰⁸ · 15 basamak", "8"], 1]], { fs: 25, hotLast: false })}</div>
      </div>
      <div class="col f1">
        <h2 class="t r" data-s="2" style="font-size:52px;margin-bottom:6px">Sabitler</h2>
        <div class="card r" data-s="2" style="padding:20px 26px"><p style="font-size:24px"><span class="mono tl">568</span> bir tam sayı sabitidir. <b>İsimlendirilmiş sabit</b>: değeri bir kez bağlanır, sonra değişmez.</p></div>
        <div class="r" data-s="3">${code("sabit.c", ["#define PI 3.14159", "const int N = 50;", "", "int dizi[N];", "for (i = 0; i < N; i++) …"], { lang: "c", cls: "xs" })}</div>
        <div class="note r" data-s="3" style="font-size:24px">50 yerine <b>N</b>: okunabilirlik ↑, tek yerden değiştirilebilir → güvenilirlik ↑</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.2.2: Veri tipi kavramı. Bir veri tipi, üzerinde aynı işlemlerin tanımlı olduğu değerler kümesidir. İlkel tipler başka tiplerden oluşmaz; tam sayı, karakter, mantıksal ve kayan noktalı tipler gibi. Yapısal tipler ise bileşenlerden oluşur; diziler ve kayıtlar gibi.",
    "C++'ın temel tiplerine bakın: char 1 byte, short 2 byte, int 4 byte, float 4 byte ve yaklaşık 7 basamak hassasiyet, double ise 8 byte ve 15 basamak. Tip, değişkenin alabileceği değerlerin aralığını belirler.",
    "Bölüm 5.3: Sabitler. 568 gibi bir değer bir sabittir. Bir değişken bir değere bağlandıktan sonra bu değer bir daha değiştirilemiyorsa, ona isimlendirilmiş sabit denir. Pascal ve C#'ta const ile, C'de ise define ile tanımlanır.",
    "İsimlendirilmiş sabitler çok faydalıdır. 3.14159 yerine PI yazmak okunabilirliği artırır. 50 elemanlı bir diziyi işleyen bir programda 50 sayısını her yerde tekrar etmek yerine N sabitini kullanırsanız, boyutu değiştirmek tek bir satırı değiştirmek kadar kolaylaşır; program daha güvenilir olur.",
  ],
},
// ───────── 5.4 Operators
{
  id: "operators", ch: "5.4 İşlemciler", chip: "<b>5.4</b> İşlemcilerin genel özellikleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İşlemcilerin <em>genel özellikleri</em></h2>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card r" data-s="1"><h3>İşlenen sayısı (arity)</h3>
        <div class="mono" style="font-size:25px;line-height:1.8;margin-top:8px"><span class="tl">tekli</span> &nbsp; i = -5; &nbsp; p = &amp;a; &nbsp; i++;<br><span class="hl">ikili</span> &nbsp; i = i + j;<br><span class="vl">üçlü</span> &nbsp; s = (n % 2 == 1) ? "tek" : "çift";<br><span class="cl">çoklu</span> &nbsp; (plus i j 5) <span class="cm">; LISP</span></div></div>
      <div class="card r" data-s="2"><h3>İşlemcinin yeri</h3>
        <div class="row" style="gap:20px;margin-top:14px;justify-content:space-around">${[["önek (prefix)", "-5  ++b"], ["araek (infix)", "A + B"], ["sonek (postfix)", "a++"]].map(([a, b]) => `<div style="text-align:center"><div class="mono" style="font-size:38px">${b}</div><div style="font-size:22px;color:var(--muted);margin-top:6px">${a}</div></div>`).join("")}</div></div>
      <div class="card r" data-s="3"><h3>Öncelik</h3><p><span class="mono hl" style="font-size:30px">a + b * c</span> → <span class="mono">a + (b * c)</span></p><p style="font-size:23px;margin-top:10px">Parantez → tekli → ** → * / → + − → ilişkisel → mantıksal</p></div>
      <div class="card r" data-s="4"><h3>Birleşmelilik</h3><p><span class="mono" style="font-size:28px">a - b - c</span> → <span class="mono">(a - b) - c</span> <span class="tl">sola</span></p><p style="margin-top:8px"><span class="mono" style="font-size:28px">2 ** 3 ** 2</span> → <span class="mono">2 ** 9</span> <span class="hl">sağa</span></p><p style="font-size:22px;margin-top:8px">APL: hepsi eşit öncelikli, sağdan sola!</p></div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.4: İşlemciler. İşlemcileri önce genel özelliklerine göre inceleyelim.",
    "Birincisi işlenen sayısı. Eksi beş ya da i artı artı gibi tekli; i artı j gibi ikili; soru işareti ve iki noktalı koşul işlemcisi gibi üçlü; ve LISP'teki plus gibi istenen sayıda işlenen alan çoklu işlemciler vardır.",
    "İkincisi işlemcinin yeri: işlenenlerden önce, yani önek; araya, yani araek; ya da sonra, yani sonek olarak yazılabilir.",
    "Üçüncüsü öncelik. a artı b çarpı c ifadesinde çarpma daha öncelikli olduğu için önce b çarpı c hesaplanır. Klasik sıra şöyledir: parantezler, tekli işlemciler, üs alma, çarpma ve bölme, toplama ve çıkarma; ardından ilişkisel ve en son mantıksal işlemciler.",
    "Dördüncüsü birleşmelilik: aynı öncelikteki işlemciler yan yana gelince hangisi önce yapılır? Aritmetik işlemciler genelde sola birleşimlidir: a eksi b eksi c, a eksi b'den c çıkarmaktır. Üs alma ise sağa birleşimlidir: 2 üssü 3 üssü 2, 2 üssü 9'dur. APL ise sıra dışıdır: bütün işlemciler eşit öncelikli ve sağdan sola birleşimlidir. Öncelik ve birleşmelilik her zaman parantezle değiştirilebilir.",
  ],
},
{
  id: "operator-kinds", ch: "5.4 İşlemciler", chip: "<b>5.4.2–5.4.3</b> İşlemci türleri ve yükleme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Sayısal, ilişkisel, mantıksal — ve <em>yükleme</em></h2>
    <div class="grid3" style="gap:24px;margin-bottom:26px">
      <div class="card r" data-s="1" style="padding:22px 26px"><h3 class="tl" style="font-size:30px">Sayısal</h3><div class="mono" style="font-size:28px">* / % + −</div><p style="font-size:22px;margin-top:8px">13 % 6 = 1</p></div>
      <div class="card r" data-s="1" style="padding:22px 26px;transition-delay:.15s"><h3 class="hl" style="font-size:30px">İlişkisel</h3><div class="mono" style="font-size:24px">C++: == != &lt;= <br>Pascal: = &lt;&gt; &lt;=</div><p style="font-size:22px;margin-top:8px">Sonuç Boolean</p></div>
      <div class="card r" data-s="1" style="padding:22px 26px;transition-delay:.3s"><h3 class="vl" style="font-size:30px">Mantıksal</h3><div class="mono" style="font-size:28px">&amp;&amp; || !</div><p style="font-size:22px;margin-top:8px">Öncelik: NOT → AND → OR</p></div>
    </div>
    <div class="row" style="flex:1;gap:30px">
      <div class="card r" data-s="2" style="flex:1"><h3>Öncelik zinciri</h3><div class="mono" style="font-size:34px;margin:14px 0"><span class="tl">X + 20</span> &lt;= <span class="tl">k * 2</span></div><p>Önce sayısal, sonra ilişkisel. (Pascal istisna: mantıksal işlemciler ilişkisellerden <b>önce</b>.)</p></div>
      <div class="card tint-c r" data-s="3" style="flex:1.2"><h3 class="cl">İşlemci yükleme riskleri</h3><p style="font-size:24px"><span class="mono">+</span> : tam sayı, reel ve metin birleştirme. <span class="mono">-</span> : hem eksi işareti hem çıkarma.<br>C/C++'ta <span class="mono">*</span> hem çarpma hem işaretçi! <span class="mono">a*b</span> yerine <span class="mono">*b</span> yazılırsa derleyici fark etmez.</p><p style="font-size:24px;margin-top:10px">C++, C#, F#: kullanıcı tanımlı işlemciler → anlamlı kullanılırsa okunurluk ↑, anlamsızsa ↓</p></div>
    </div>
  </div>`,
  n: [
    "İşlemcileri işlenenlerinin niteliğine göre de üçe ayırırız.",
    "Sayısal işlemciler toplama, çıkarma, çarpma, bölme ve modüldür; örneğin 13 mod 6 eşittir 1. İlişkisel işlemciler iki değeri karşılaştırır ve mantıksal bir sonuç üretir; C++'ta eşitlik iki eşittir, Pascal'da tek eşittir; eşit değil ise C++'ta ünlem eşittir, Pascal'da küçüktür büyüktür ile yazılır. Mantıksal işlemciler ise yalnızca mantıksal işlenen alır; C'de ve, veya, değil işlemcileridir ve öncelik sırası genellikle değil, ve, veya şeklindedir.",
    "Bu üç grup arasında da öncelik vardır: ilişkisel işlemcilerin önceliği her zaman sayısal işlemcilerden düşüktür. X artı 20 küçük eşit k çarpı 2 ifadesinde önce iki taraf hesaplanır, sonra karşılaştırılır. Pascal ise bir istisnadır: orada mantıksal işlemciler ilişkisel işlemcilerden daha önceliklidir.",
    "Bir işlemcinin anlamının işlenenlerin sayısına ve tipine göre belirlenmesine işlemci yükleme denir. Artı işareti tam sayılar, reel sayılar ve bazı dillerde metin birleştirme için kullanılır. Bazı yüklemeler sorunludur: C ve C++'ta yıldız işareti hem çarpma hem işaretçi işlemcisidir; a çarpı b yerine yanlışlıkla yıldız b yazarsanız derleyici bunu hata olarak görmez. C++, C# ve F# kullanıcı tanımlı işlemcilere de izin verir; anlamlı kullanılırsa okunabilirliği artırır, anlamsız kullanılırsa azaltır.",
  ],
},
];
