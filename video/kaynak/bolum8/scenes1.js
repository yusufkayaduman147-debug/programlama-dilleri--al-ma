const { code } = require("../build/lib");
const { trace, frame, sw, FRCSS } = require("./h");

const roadmap = ["Neden altprogram?", "Temel kavramlar ve tasarım soruları", "Yerel değişkenler: statik mi, yığıt mı?", "Yordam, fonksiyon ve parametre eşleme", "Parametre aktarım yöntemleri", "Altprogramlar parametre olarak", "Aşırı yükleme, jenerikler, kapatmalar", "Etkinlik kaydı, özyineleme, eşyordamlar"];

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:26px;margin-bottom:56px;align-items:center">
      <div class="card r rp" data-s="1" style="padding:18px 30px;text-align:center"><div style="font-size:22px;color:var(--muted)">çağıran</div><div class="mono" style="font-size:34px;color:var(--teal)">main()</div></div>
      <div class="arrow r" data-s="1" style="font-size:44px;color:var(--amber)">⇄</div>
      <div class="card r rp" data-s="1" style="padding:18px 30px;text-align:center;transition-delay:.15s"><div style="font-size:22px;color:var(--muted)">altprogram</div><div class="mono" style="font-size:34px;color:var(--violet)">ortalama(a, b)</div></div>
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:120px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 8: Altprogramlar</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin sekizinci bölümüne hoş geldiniz. Bu bölümün konusu altprogramlar, yani yordamlar ve fonksiyonlar.",
    "Bir programın başka bir program parçasını nasıl çağırdığını, bilgiyi ona nasıl aktardığını ve sonucu nasıl geri aldığını inceleyeceğiz. Ekranda göreceğiniz kod örnekleri yalnızca kavramları somutlaştırmak için var; kod yazmayı bilmeniz gerekmiyor. Her örneği adım adım, kutular ve tablolarla birlikte izleyeceğiz.",
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
    "Önce altprogramların neden var olduğunu ve temel kavramlarını göreceğiz: başlık, parametre, protokol gibi. Sonra yerel değişkenlerin bellekte nasıl tutulduğuna, yordam ile fonksiyon farkına ve parametrelerin nasıl eşleştirildiğine bakacağız.",
    "Bölümün kalbi parametre aktarım yöntemleri: değer, sonuç, değer-sonuç, başvuru ve isim ile çağırma. Ardından altprogramların parametre olarak geçirilmesini, aşırı yüklemeyi, jenerikleri, kapatmaları ve son olarak etkinlik kayıtlarını, özyinelemeyi ve eşyordamları inceleyeceğiz.",
  ],
},
// ───────── 8.1
{
  id: "why", ch: "8.1 Neden altprogram?", chip: "<b>8.1</b> Yazılım mühendisliği açısından altprogramlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Altprogram = bir dizi deyime <em>bir isim</em> vermek</h2>
    <p class="lead r" data-s="0" style="font-size:28px">Tek bir isim, bir dizi deyimi temsil eder: <b>işlev soyutlaması</b> (process abstraction). Veri soyutlaması ise sonraki bölümlerin konusu.</p>
    <div class="grid5" style="gap:20px;zoom:1.2">
      ${[["💾", "t", "Kaynak tasarrufu", "Tekrarlanan kod bir kez yazılır: bellek ve zaman kazancı."], ["🎭", "v", "Soyutlama", "Kullanan yalnızca parametreleri bilir; iç algoritma değişebilir."], ["🧩", "a", "Modülerlik", "İş alt işlere bölünür; aynı anda birden çok kişi çalışabilir."], ["🔍", "c", "Anlaşılabilirlik", "Küçük parçalar daha kolay okunur ve sınanır."], ["📚", "g", "Kütüphaneler", "Altprogramlar birçok uygulama arasında paylaşılır."]]
        .map(([e, c, h, p], i) => `<div class="card r rp" data-s="${i + 1}" style="padding:24px 22px;text-align:center"><div class="ic ${c}" style="margin:0 auto 14px">${e}</div><h3 style="font-size:27px">${h}</h3><p style="font-size:21px">${p}</p></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Bölüm 8.1: Yazılım mühendisliği açısından altprogramlar. Bir programda birçok kez kullanılacak bir dizi deyimi tek bir isim altında toplarsak bir altprogram elde ederiz. Böylece tek bir isim, bir dizi deyimi temsil eder; buna işlev soyutlaması denir. Dillerin bir de veri soyutlaması vardır, ama o sonraki bölümlerin konusu. Altprogramların yazılım geliştirmeye beş önemli katkısı vardır.",
    "Birincisi kaynak tasarrufu: sık kullanılan bir işlemi her seferinde yeniden yazmak yerine bir kez yazıp çağırırız; bu bellek ve zaman kazandırır.",
    "İkincisi soyutlama: altprogramı kullanan kod onunla yalnızca parametreler aracılığıyla konuşur. Örneğin bir sıralama altprogramının algoritmasını değiştirdiğinizde, onu çağıran kodlar hiç etkilenmez.",
    "Üçüncüsü modüler geliştirme: büyük bir iş alt işlere bölünür ve böylece aynı yazılım üzerinde birden çok kişi aynı anda çalışabilir.",
    "Dördüncüsü anlaşılabilirlik: küçük parçalara bölünmüş bir program daha kolay okunur ve daha kolay sınanır.",
    "Beşincisi kütüphaneler: altprogramlar birçok uygulama arasında paylaşılabilir; bugün kullandığımız hazır kütüphanelerin hepsi bu fikre dayanır.",
  ],
},
{
  id: "terms", ch: "8.1 Neden altprogram?", chip: "<b>8.2</b> Temel tanımlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Altprogramın <em>sözlüğü</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:860px;gap:26px">
        <div class="card r" data-s="1" style="padding:24px 30px">
          <div style="font-size:22px;color:var(--faint);margin-bottom:10px">tanım (başlık + gövde)</div>
          <div class="mono" style="font-size:36px"><span class="hl r" data-s="2" data-hot="2" style="border-radius:8px;padding:0 4px">float ortalama(int c, int d)</span> {<br>&nbsp;&nbsp;&nbsp;&nbsp;return (c + d) / 2.0;<br>}</div>
          <div class="row" style="gap:30px;margin-top:12px;font-size:22px"><span class="r" data-s="2" style="color:var(--amber)">↑ başlık</span><span class="r" data-s="3" style="color:var(--teal)">c, d: resmi (formal) parametreler</span></div></div>
        <div class="card r" data-s="4" style="padding:24px 30px">
          <div style="font-size:22px;color:var(--faint);margin-bottom:10px">çağrı</div>
          <div class="mono" style="font-size:36px">x = ortalama(<span class="vl">a</span>, <span class="vl">b</span>);</div>
          <div style="font-size:22px;margin-top:12px;color:var(--violet)">a, b: gerçek (actual) parametreler</div></div>
      </div>
      <div class="col f1" style="gap:16px">
        ${[["Parametre profili", "parametrelerin sayısı, sırası, tipi", 3], ["Protokol", "profil + dönüş tipi", 3], ["Bildirim", "protokol var, gövde yok (C prototipi)", 3], ["Genel özellikler", "tek giriş noktası · çağıran bekler · denetim çağırana döner", 5]].map(([h, p, s]) => `<div class="card r" data-s="${s}" style="padding:18px 24px"><h3 style="font-size:26px;margin-bottom:6px">${h}</h3><p style="font-size:21px">${p}</p></div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Altprogramlarla ilgili temel kavramları tek bir örnek üzerinden tanıyalım.",
    "Bu, ortalama adlı bir altprogramın tanımıdır. Tanım, altprogram soyutlamasının betimlenmesidir ve bir başlık ile bir gövdeden oluşur.",
    "İlk satır başlıktır: altprogramın adını, parametrelerini ve fonksiyonsa döndürdüğü değerin tipini söyler; yani altprogramın dış dünyaya açılan arayüzüdür.",
    "Başlıkta yazan c ve d'ye resmi parametre denir. Parametrelerin sayısı, sırası ve tipleri parametre profilini oluşturur. Profile dönüş tipini de eklersek protokolü elde ederiz. Yalnızca protokolü veren, gövdesi olmayan tanıma ise bildirim denir; C'deki fonksiyon prototipleri buna örnektir.",
    "Altprogramın çalıştırılmasını istemeye çağrı denir. Çağrıda yazılan a ve b'ye gerçek parametre denir: bunlar altprograma gerçekten gönderilen değerler ya da adreslerdir.",
    "Bu bölümde incelediğimiz altprogramların üç genel özelliği vardır: her altprogramın tek bir giriş noktası vardır; altprogram çalışırken onu çağıran birim bekler; ve altprogram bitince denetim her zaman çağırana geri döner.",
  ],
},
{
  id: "design", ch: "8.1 Neden altprogram?", chip: "Altprogramlarda tasarım soruları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dil tasarımcısının <em>yedi sorusu</em></h2>
    <div class="col" style="gap:14px">
      ${[["Hangi parametre aktarım yöntemleri olacak?", "8.2.4"], ["Parametrelerin tipleri kontrol edilecek mi?", "8.9"], ["Yerel değişkenler statik mi, dinamik mi?", "8.2"], ["Altprogram tanımları iç içe olabilir mi?", "Pascal ✓ · C ✕"], ["Parametre olarak geçen altprogramın referans çevresi ne?", "derin / yüzeysel bağlama"], ["Aynı isimde birden çok altprogram olabilir mi (aşırı yükleme)?", "8.3"], ["Farklı tiplerle çalışan jenerik altprogramlar olabilir mi?", "8.4"]].map(([q, t], i) => `<div class="card r rl" data-s="${i < 3 ? 1 : i < 5 ? 2 : 3}" style="padding:16px 26px;display:flex;align-items:center;gap:22px;transition-delay:${(i % 3) * 0.12}s"><span class="mono hl" style="font-size:28px;font-weight:700;width:34px">${i + 1}</span><span style="font-size:27px;flex:1">${q}</span><span class="pill" style="font-size:20px">${t}</span></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Bir dil tasarımcısı altprogramlar konusunda yedi önemli soruyu cevaplamak zorundadır.",
    "Hangi parametre aktarım yöntemleri sunulacak? Parametrelerin tipleri kontrol edilecek mi? Yerel değişkenler statik mi olacak, yoksa her çağrıda yeniden mi oluşturulacak?",
    "Altprogram tanımları başka altprogramların içinde yer alabilecek mi; örneğin Pascal buna izin verir, C vermez. Ve eğer altprogramlar hem iç içe tanımlanabiliyor hem de parametre olarak geçirilebiliyorsa, parametre olarak geçen altprogramın referans çevresi, yani görebildiği isimler ne olacak?",
    "Son olarak, aynı isimde birden çok altprogram, yani aşırı yüklenmiş altprogramlar olabilecek mi? Ve farklı çağrılarda farklı veri tipleriyle çalışabilen jenerik altprogramlara izin verilecek mi? Bölüm boyunca bu soruların cevaplarını göreceğiz.",
  ],
},
{
  id: "locals", ch: "8.2 Yerel değişkenler", chip: "Yerel referans çevresi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Yerel değişkenler: <em>yığıt mı, statik mi?</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:560px;gap:18px">
        <div class="r" data-s="1">${code("test.c", ["int count;               // global", "main() {", "   int i;", "   for (i = 0; i <= 10; i++)", "      test();", "}", "test() {", "   int i;", { t: "   static int count = 0;", hot: "2" }, { t: "   count = count + 1;", hot: "2" }, "}"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col f1" style="gap:18px">
        <div class="r" data-s="2">${trace([{ h: "değişken", color: "text" }, { h: "tip bağlama", color: "muted", align: "center" }, { h: "bellek bağlama", color: "amber", align: "center" }], [[["count (global)", "statik", "statik"], 2], [["main::i", "statik", "yığıt-dinamik"], 2], [["test::i", "statik", "yığıt-dinamik"], 2], [["test::count", "statik", "statik"], 2]], { fs: 23, hotLast: false })}</div>
        <div class="row" style="gap:18px">
          <div class="card tint-t r f1" data-s="3" style="padding:18px 22px"><h3 class="tl" style="font-size:25px">Yığıt-dinamik</h3><p style="font-size:20px">✓ özyineleme mümkün<br>✓ yer altprogramlar arasında paylaşılır<br>✕ ayırma/geri verme zamanı<br>✕ dolaylı adresleme<br>✕ geçmişi unutur</p></div>
          <div class="card tint-a r f1" data-s="4" style="padding:18px 22px"><h3 class="hl" style="font-size:25px">Statik</h3><p style="font-size:20px">Avantaj ve dezavantajlar <b>yer değiştirir</b>: hızlı, doğrudan adres, değeri hatırlar; ama özyineleme yok.</p></div>
        </div>
        <div class="note r" data-s="5" style="font-size:21px"><b>FORTRAN:</b> statik (özyineleme için <span class="mono">recursive</span>) · <b>C:</b> ikisi de (<span class="mono">static</span>) · <b>Pascal, Java, Ada:</b> yalnızca dinamik</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bir altprogramın yerel değişkenleri bellekte nasıl tutulur? İki seçenek var: yığıt-dinamik ya da statik.",
    "Bu C örneğinde main, test fonksiyonunu on bir kez çağırıyor. test'in içinde bir i ve static olarak tanımlanmış bir count var.",
    "Tabloya bakalım. Bütün değişkenlerin tipi derleme zamanında, yani statik olarak bağlanır. Ama bellek bağlaması farklıdır: global count ve test içindeki static count program başında bir kez yer alır ve program boyunca yaşar. main'in ve test'in i değişkenleri ise her çağrıda yığıtta oluşturulur ve çağrı bitince silinir. Bu yüzden test'teki static count çağrılar arasında değerini korur ve döngü bittiğinde on bir olur.",
    "Yığıt-dinamik yerel değişkenlerin avantajları: özyinelemeyi mümkün kılarlar ve ayrılan alan farklı altprogramlar tarafından sırayla paylaşılabilir. Dezavantajları: her çağrıda yer ayırma ve geri verme zaman alır, erişim dolaylıdır ve altprogram geçmişini hatırlamaz; bitince bütün yerel değerler unutulur.",
    "Statik yerel değişkenlerde avantajlar ve dezavantajlar yer değiştirir: erişim hızlı ve doğrudandır, değer çağrılar arasında hatırlanır; ama özyineleme desteklenemez.",
    "Dillere bakalım: FORTRAN'da yerel değişkenler varsayılan olarak statiktir, özyineleme için recursive anahtar kelimesi gerekir. C ikisini de sunar: varsayılan yığıt-dinamik, static ile statik. Pascal, Java ve Ada'da ise yerel değişkenler yalnızca dinamiktir.",
  ],
},
{
  id: "proc-func", ch: "8.2 Yordam ve fonksiyon", chip: "<b>8.2.2</b> Yordamlar ve fonksiyonlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Yordam mı, <em>fonksiyon</em> mu?</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px;gap:22px">
        <div class="row" style="gap:20px">
          <div class="card tint-v r f1" data-s="1" style="padding:22px 26px"><h3 class="vl" style="font-size:29px">Yordam (procedure)</h3><p style="font-size:22px">Değer döndürmez; dilin <b>deyimlerine</b> benzer. Etkisini parametreler ya da global değişkenler üzerinden yapar.</p><div class="mono" style="font-size:23px;margin-top:10px">yazdir(liste);</div></div>
          <div class="card tint-t r f1" data-s="2" style="padding:22px 26px"><h3 class="tl" style="font-size:29px">Fonksiyon</h3><p style="font-size:22px">Bir <b>değer döndürmek zorunda</b>; dilin <b>işlemcilerine</b> benzer. Çağrı, bir ifadenin içinde yer alır.</p><div class="mono" style="font-size:23px;margin-top:10px">x = 2 * kare(5);</div></div>
        </div>
        <div class="card r" data-s="3" style="padding:20px 26px"><p style="font-size:22px;line-height:1.6"><b>Pascal, Ada:</b> <span class="mono">procedure</span> ve <span class="mono">function</span> · <b>FORTRAN:</b> <span class="mono">SUBROUTINE</span> · <b>C, C++:</b> yalnızca fonksiyon; yordam yerine <span class="mono">void</span> fonksiyon. C'de özel bir çağrı deyimi yok: <span class="mono">yordam1(a, b, c);</span></p></div>
      </div>
      <div class="col f1 r" data-s="4" style="gap:10px;align-items:center">
        <div style="font-size:24px;color:var(--muted);margin-bottom:6px">Bir çağrının yolculuğu</div>
        ${[["main çalışıyor", "teal", 4], ["kare(5) çağrıldı → main bekler", "amber", 4], ["kare'nin gövdesi çalışır", "violet", 4], ["25 döner, çağrının yerini alır", "amber", 5], ["main kaldığı yerden devam: x = 50", "teal", 5]].map(([t, c, s], i) => `${i ? `<div class="r" data-s="${s}" style="color:var(--faint);font-size:28px">↓</div>` : ""}<div class="box r" data-s="${s}" style="width:500px;border-color:var(--${c});font-size:23px;padding:12px;transition-delay:${(i % 3) * 0.2}s">${t}</div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.2.2: Yordamlar ve fonksiyonlar. Bir altprogram ya bir yordam ya da bir fonksiyondur.",
    "Yordam bir değer döndürmez. Dilin hazır deyimlerine benzer: yeni bir deyim tanımlamak gibidir. Etkisini parametreleri ya da görebildiği global değişkenleri değiştirerek gösterir.",
    "Fonksiyon ise çağıran birime mutlaka bir sonuç değeri döndürmek zorundadır. Dilin hazır işlemcilerine, örneğin toplama işlemcisine benzer; bu yüzden fonksiyon çağrısı bir ifadenin içinde yer alır.",
    "Dillere bakalım: Pascal ve Ada'da yordamlar procedure, fonksiyonlar function kelimesiyle tanımlanır. FORTRAN'da yordamlara SUBROUTINE denir. C ve C++'ta yalnızca fonksiyon vardır, ama void tipli bir fonksiyon değer döndürmediği için yordam gibi davranır. C'de özel bir çağrı deyimi de yoktur; adı ve parametreleri yazmak yeterlidir.",
    "Bir fonksiyon çağrısının yolculuğunu izleyelim. main çalışırken kare beş çağrılır. Bu anda main durur ve bekler; denetim kare'ye geçer ve onun gövdesi çalışır.",
    "kare yirmi beş değerini üretir ve bu değer, ifadede çağrının yerini alır. Denetim main'e döner ve main kaldığı yerden devam eder: x elli olur.",
  ],
},
{
  id: "matching", ch: "8.2 Yordam ve fonksiyon", chip: "<b>8.2.3</b> Gerçek ve resmi parametrelerin eşleşmesi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Hangi gerçek parametre, <em>hangi resmi parametreye?</em></h2>
    <div class="grid2" style="gap:28px">
      <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:28px">1. Konumsal (positional)</h3>
        <div class="row" style="gap:16px;align-items:center;margin:10px 0;font-family:JBM;font-size:26px"><span>ortalama(<span class="vl">a</span>, <span class="tl">b</span>)</span><span class="arrow">→</span><span>(int <span class="vl">c</span>, int <span class="tl">d</span>)</span></div>
        <p style="font-size:21px">Sıraya göre: a→c, b→d. Az parametrede pratik; çok parametrede <b>karıştırılabilir</b>.</p></div>
      <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:28px">2. Anahtar kelime</h3>
        <div class="mono" style="font-size:24px;margin:10px 0">SORT(LIST =&gt; A, LENGTH =&gt; N);</div>
        <p style="font-size:21px">Sıra önemsiz ✓ · ama kullanıcı resmi parametre <b>adlarını bilmeli</b> ✕. Ada, Fortran 90, Python.</p></div>
      <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:28px">Varsayılan değerler</h3>
        <div class="mono" style="font-size:22px;margin:10px 0;line-height:1.5">procedure SORT(LIST : LIST_TYPE;<br>               LENGTH : INTEGER := 100);<br>SORT(LIST =&gt; A);   -- LENGTH = 100</div>
        <p style="font-size:21px">C++, Fortran 95, Ada, PHP, Python.</p></div>
      <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:28px">Değişken sayıda parametre</h3>
        <div class="mono" style="font-size:22px;margin:10px 0;line-height:1.5">void DisplayList(params int[] list)<br>DisplayList(2, 4, 6, 8);   // C#</div>
        <p style="font-size:21px">Python, Ruby de destekler. C, C++, Java, Perl: eşleşme kontrolü bazen <b>programcıya</b> kalır (ör. printf).</p></div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.2.3: Gerçek ve resmi parametrelerin eşleşmesi. Bir çağrıda yazdığımız gerçek parametreler, başlıktaki hangi resmi parametrelere bağlanacak? İki temel yöntem var.",
    "Birincisi konumsal parametrelerdir: eşleşme sıraya göre yapılır. ortalama a, b çağrısında birinci gerçek parametre a birinci resmi parametre c'ye, ikinci b de ikinci d'ye bağlanır. Neredeyse bütün diller bunu kullanır. Parametre sayısı azken çok pratiktir, ama sayı arttıkça hangi değerin hangi sırada yazılacağı karıştırılabilir.",
    "İkincisi anahtar kelime parametreleridir: çağrıda resmi parametrenin adı da yazılır. Ada örneğinde LIST ok A ve LENGTH ok N yazıyoruz. Avantajı sıranın önemli olmamasıdır; dezavantajı ise kullanıcının resmi parametrelerin adlarını bilmek zorunda olmasıdır. Ada ve Fortran 90 iki yöntemi birlikte kullanmaya izin verir.",
    "Bazı dillerde resmi parametrelerin varsayılan değeri olabilir. Bu örnekte LENGTH için yüz varsayılan değeri verilmiş; çağrıda LENGTH yazılmazsa yüz kabul edilir. C++, Fortran 95, Ada ve PHP bunu destekler.",
    "Son olarak bazı diller değişken sayıda parametreye izin verir. C#'ta params ile tanımlanan bir dizi, çağrıda istenen sayıda değer alabilir; Python ve Ruby de benzer özelliklere sahiptir. C, C++, Java ve Perl'de ise bazı durumlarda gerçek ve resmi parametrelerin uyuşmasını kontrol etmek programcının sorumluluğundadır; C'deki printf fonksiyonu buna örnektir.",
  ],
},
{
  id: "models", ch: "8.2.4 Parametre aktarımı", chip: "<b>8.2.4</b> Parametre aktarım yöntemleri: veri akışı modelleri",
  html: (() => {
    const row = (y, a, x, label, c, dir, s) => `
      <g class="r" data-s="${s}">
        <rect x="60" y="${y - 32}" width="120" height="64" rx="12" fill="#151a31" stroke="#35d0c0" stroke-width="2.5"/><text x="120" y="${y + 10}" fill="#eef0fa" font-size="28" text-anchor="middle" font-family="JBM">${a}</text>
        <rect x="620" y="${y - 32}" width="120" height="64" rx="12" fill="#151a31" stroke="#a493ff" stroke-width="2.5"/><text x="680" y="${y + 10}" fill="#eef0fa" font-size="28" text-anchor="middle" font-family="JBM">${x}</text>
        ${dir.includes("in") ? `<path d="M190,${y - 10} L606,${y - 10}" stroke="${c}" stroke-width="4" marker-end="url(#m${c.slice(1)})"/><text x="400" y="${y - 20}" fill="${c}" font-size="20" text-anchor="middle">çağrıda</text>` : ""}
        ${dir.includes("out") ? `<path d="M610,${y + 12} L194,${y + 12}" stroke="${c}" stroke-width="4" marker-end="url(#m${c.slice(1)})"/><text x="400" y="${y + 40}" fill="${c}" font-size="20" text-anchor="middle">dönüşte</text>` : ""}
        <text x="770" y="${y + 9}" fill="${c}" font-size="26" font-weight="700">${label}</text>
      </g>`;
    const mk = (c) => `<marker id="m${c.slice(1)}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="${c}"/></marker>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Veri hangi yöne <em>akıyor?</em></h2>
    <div class="row" style="flex:1;gap:30px">
      <svg viewBox="0 0 1060 470" style="width:1060px;height:470px" font-family="Inter">
        <defs>${mk("#35d0c0")}${mk("#ffb547")}${mk("#ff7a7a")}</defs>
        <text class="r" data-s="0" x="120" y="40" fill="#a2a9d2" font-size="22" text-anchor="middle">çağıran: sub(a, b, c)</text>
        <text class="r" data-s="0" x="680" y="40" fill="#a2a9d2" font-size="22" text-anchor="middle">altprogram: sub(x, y, z)</text>
        ${row(130, "a", "x", "İçeri (in)", "#35d0c0", "in", 1)}
        ${row(270, "b", "y", "Dışarı (out)", "#ffb547", "out", 2)}
        ${row(410, "c", "z", "İçeri-dışarı (inout)", "#ff7a7a", "in out", 3)}
      </svg>
      <div class="col f1" style="justify-content:center">
        <div class="card r" data-s="4" style="padding:20px 24px"><p style="font-size:22px"><b>Kopyalayanlar:</b> değer, sonuç, değer-sonuç ile çağırma: veri <b>fiziksel olarak kopyalanır</b>.</p></div>
        <div class="card r" data-s="4" style="padding:20px 24px"><p style="font-size:22px"><b>Yol verenler:</b> başvuru ile çağırma: verinin <b>adresi</b> aktarılır.</p></div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 8.2.4: Parametre aktarım yöntemleri. Bu, bölümün en önemli konusu. Önce verinin hangi yönde aktığını düşünelim; buna veri akışı modeli diyoruz. Gerçek parametreler değişken, sabit ya da ifade olabilir; resmi parametreler ise değerleri tutacak bellek yerleri olduğu için değişkendir.",
    "İçeri modelinde veri yalnızca çağırandan altprograma gider: a'nın değeri çağrı anında x'e verilir.",
    "Dışarı modelinde veri yalnızca altprogramdan çağırana gider: altprogram bitince y'nin değeri b'ye yazılır.",
    "İçeri-dışarı modelinde ise veri iki yönde de akar: c'nin değeri z'ye gider, altprogram onu değiştirir ve sonuç c'ye geri döner.",
    "Bu modelleri gerçekleştirmenin iki yolu vardır. Değer, sonuç ve değer-sonuç ile çağırmada veri fiziksel olarak kopyalanır. Başvuru ile çağırmada ise verinin kendisi değil, ona giden yol, yani adresi aktarılır. Şimdi bunları tek tek, örneklerle görelim.",
  ],
},
];
