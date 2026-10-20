const { code } = require("../build/lib");
const { tl, head } = require("./h");

const quiz = [
  ["IBM 704'teki hangi donanım özellikleri derlenen dillerin (Fortran) doğmasına yol açtı?", "İndeks yazmaçları ve kayan nokta donanımı — yorumlamanın maliyeti artık gizlenemiyordu."],
  ["LISP'te (A B C D) ifadesinin iki farklı anlamı nedir?", "Veri olarak dört elemanlı bir liste; kod olarak A fonksiyonunun B, C, D'ye uygulanması."],
  ["Sözdizimi BNF ile biçimsel olarak tanımlanan ilk dil hangisidir?", "ALGOL 60"],
  ["Sınıf (class) kavramını ilk kez hangi dil getirdi?", "SIMULA 67"],
  ["Java, C++'tan hangi özellikleri çıkararak daha güvenli hale geldi?", "İşaretçi aritmetiği, struct/union/enum, çoklu kalıtım ve operatör aşırı yükleme"],
];

module.exports = [
// ───────────────── 2.15 Smalltalk
{
  id: "smalltalk", ch: "2.15 Nesne yönelimli: Smalltalk", chip: "<b>2.15</b> Nesne yönelimli programlama: Smalltalk",
  html: `
  <div class="wrap">
    ${head("Smalltalk", "Alan Kay · Adele Goldberg · Xerox PARC · 1980", "coral")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px">
        <div class="card r" data-s="0"><div class="ic c">💡</div><h3>İlk tam nesne yönelimli dil</h3><p>Nesne yönelimin üç temel özelliğinin hepsi:</p>
          <div class="pills"><span class="pill c" style="font-size:27px">veri soyutlama</span><span class="pill c" style="font-size:27px">kalıtım</span><span class="pill c" style="font-size:27px">dinamik bağlama</span></div></div>
        <div class="card r" data-s="1"><h3>Her şey bir nesne, her işlem bir mesaj</h3>
          <div class="mono" style="font-size:32px;margin-top:14px;line-height:1.6"><span class="tl">3</span> + <span class="tl">4</span> <span class="cm" style="font-size:24px">"3 nesnesine +4 mesajı"</span><br>pencere <span class="fn">kapat</span>.</div></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="2" style="flex:1;display:flex;flex-direction:column"><div class="ic a">🖱️</div><h3>Grafik arayüzün öncüsü</h3><p>Pencereler, menüler, fare… Sadece bir dil değil, tam bir <b>geliştirme ortamı</b>: tarayıcı, editör, hata ayıklayıcı.</p>
          <p style="margin-top:auto;padding-top:14px;color:var(--coral)">Nesne yönelimli programlamayı yaygınlaştırdı.</p></div>
      </div>
    </div>
    ${tl(1980, "coral")}
  </div>`,
  n: [
    "Bölüm 2.15: Nesne yönelimli programlama, Smalltalk. Smalltalk, Xerox PARC'ta önce Alan Kay, sonra Adele Goldberg tarafından geliştirildi. Nesne yönelimli bir dilin ilk eksiksiz uygulamasıdır: veri soyutlama, kalıtım ve dinamik bağlama özelliklerinin üçü de vardır.",
    "Smalltalk'ta her şey bir nesnedir ve her işlem bir mesajdır. Üç artı dört yazdığınızda, aslında 3 nesnesine artı dört mesajını göndermiş olursunuz.",
    "Smalltalk aynı zamanda grafik kullanıcı arayüzünün öncüsüdür. Pencereler, menüler ve fare ile çalışma fikri büyük ölçüde buradan yayıldı. Sadece bir dil değil, tarayıcısı, editörü ve hata ayıklayıcısıyla tam bir geliştirme ortamıydı ve nesne yönelimli programlamayı yaygınlaştırdı.",
  ],
},
// ───────────────── 2.16 C++
{
  id: "cpp", ch: "2.16 İmperatif + nesne: C++", chip: "<b>2.16</b> İmperatif ve nesne yönelimli özellikleri birleştirmek: C++",
  html: `
  <div class="wrap">
    ${head("C++", "Bjarne Stroustrup · Bell Labs · 1980'ler", "teal")}
    <div class="r" data-s="0" style="display:flex;align-items:center;gap:20px;justify-content:center;margin-bottom:30px">
      <span class="pill" style="font-size:34px">C</span><span style="font-size:40px;color:var(--faint)">+</span><span class="pill v" style="font-size:34px">SIMULA 67</span><span style="font-size:40px;color:var(--faint)">=</span><span class="pill t" style="font-size:40px;font-weight:700">C++</span>
    </div>
    <div class="row" style="flex:1;gap:30px">
      <div class="card r" data-s="1" style="flex:1.2"><h3>Özellikleri</h3><ul class="b t" style="margin-top:6px"><li style="font-size:26px">Hem prosedürel hem nesne yönelimli</li><li style="font-size:26px"><b>Çoklu kalıtım</b>, operatör aşırı yükleme</li><li style="font-size:26px"><b>Şablonlar</b> (template), istisna yönetimi</li><li style="font-size:26px">C'nin özelliklerinin çoğu korundu</li></ul>
        <p style="margin-top:12px;color:var(--coral)">PL/I gibi büyük ve karmaşık; Ada ve Java'dan daha az güvenli. Standart: 1998.</p></div>
      <div class="col" style="flex:1">
        <div class="card r" data-s="2" style="padding:24px 28px"><h3 style="font-size:30px">Eiffel <span style="font-size:22px;color:var(--muted);font-weight:400">· Bertrand Meyer</span></h3><p style="font-size:24px">C++'tan küçük ve basit; sözleşmeler (assertions) ile çağıran–alt program iletişimi.</p></div>
        <div class="card r" data-s="3" style="padding:24px 28px"><h3 style="font-size:30px">Delphi <span style="font-size:22px;color:var(--muted);font-weight:400">· Borland</span></h3><p style="font-size:24px">Pascal + OOP. C++'tan daha zarif ve güvenli; güçlü görsel arayüz geliştirme.</p></div>
      </div>
    </div>
    ${tl(1985, "teal")}
  </div>`,
  n: [
    "Bölüm 2.16: İmperatif ve nesne yönelimli özellikleri birleştirmek, C++. Seksenlerin başında Bell Laboratuvarları'nda Bjarne Stroustrup, C'ye SIMULA 67'nin sınıf kavramını ekledi. Önce Sınıflı C adını taşıyan bu dil, daha sonra C++ oldu.",
    "C++ hem prosedürel hem de nesne yönelimli programlamayı destekler. Çoklu kalıtım, operatör aşırı yükleme, şablonlar ve istisna yönetimi sunar; C'nin özelliklerinin çoğunu da korur. Nesne yönelimli programlamanın yükselişiyle popülerliği hızla arttı. Ama PL/I gibi büyük ve karmaşıktır, Ada ve Java'dan daha az güvenlidir. 1998'de standartlaştı.",
    "Aynı dönemde başka hibrit diller de çıktı. Bertrand Meyer'in Eiffel'i, C++'tan küçük ve basit olmasına rağmen neredeyse aynı ifade gücüne sahipti; çağıran ile alt program arasındaki iletişim için sözleşmeler kullanıyordu.",
    "Borland'ın Delphi'si ise Pascal'a nesne yönelimli özellikler ekledi. Pascal kökenli olduğu için dizi sınırları, işaretçiler ve tip dönüşümlerinde C ve C++'tan daha güvenliydi ve güçlü bir görsel arayüz geliştirme ortamı sunuyordu.",
  ],
},
// ───────────────── 2.17 Java
{
  id: "java", ch: "2.17 Java", chip: "<b>2.17</b> İmperatif temelli nesne yönelimli dil: Java",
  html: `
  <div class="wrap">
    ${head("Java", "Sun Microsystems · 1995", "amber")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="0"><div class="ic a">📺</div><h3>Doğuşu</h3><p>90'ların başı: gömülü elektronik cihazlar için C ve C++ yeterince güvenilir değildi. Çözüm: C++ temelli ama <b>sadeleştirilmiş</b> bir dil.</p></div>
        <div class="card r" data-s="1"><h3>C++'tan çıkarılanlar</h3><div class="pills">${["işaretçi aritmetiği", "struct", "union", "enum", "çoklu kalıtım", "operatör aşırı yükleme", "önişlemci"].map((t) => `<span class="pill c" style="text-decoration:line-through;text-decoration-thickness:2px">${t}</span>`).join("")}</div>
          <p style="margin-top:14px">İşaretçi yerine <b>referanslar</b>; otomatik <b>çöp toplama</b>; sadece OOP.</p></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("Merhaba.java", ["class Merhaba {", "    public static void main(String[] a) {", "        System.out.println(\"Merhaba Dünya!\");", "    }", "}"], { lang: "java", cls: "xs" })}</div>
        <div class="r" data-s="2" style="display:flex;align-items:center;gap:12px;justify-content:center;font-size:24px">
          <span class="pill">.java</span><span class="arrow" style="font-size:30px">→</span><span class="pill a">bayt kodu</span><span class="arrow" style="font-size:30px">→</span><span class="pill t">JVM (her platform)</span></div>
        <div class="note r" data-s="3" style="font-size:26px"><b>Değerlendirme:</b> C++'ın güvensiz özellikleri yok; eşzamanlılık, zengin kütüphaneler, JVM ve JIT ile <b>taşınabilirlik</b>. Web ile hızla yayıldı.</div>
      </div>
    </div>
    ${tl(1995)}
  </div>`,
  n: [
    "Bölüm 2.17: Java. Doksanların başında Sun Microsystems, gömülü elektronik cihazlar için bir dil arıyordu. C ve C++ bu iş için yeterince güvenilir değildi. Çözüm, C++ temelli ama önemli ölçüde sadeleştirilmiş bir dil oldu: Java.",
    "Java, C++'tan işaretçi aritmetiğini, struct, union ve enum yapılarını, çoklu kalıtımı, operatör aşırı yüklemeyi ve önişlemciyi çıkardı. İşaretçiler yerine referanslar kullanır, belleği otomatik çöp toplama ile yönetir ve yalnızca nesne yönelimli programlamayı destekler; her şey bir sınıfın içindedir.",
    "Java programı bayt koduna derlenir ve bu bayt kodu, Java Sanal Makinesi olan her platformda çalışır. İlk bölümde gördüğümüz hibrit implementasyonun en bilinen örneği budur.",
    "Değerlendirelim: Java, C++'ın güvensiz özelliklerini elemiştir; eşzamanlılık, grafik arayüz ve veritabanı için zengin kütüphaneler sunar ve JVM ile JIT derleyiciler sayesinde taşınabilirdir. Web'in yükselişiyle birlikte çok hızlı yayıldı.",
  ],
},
// ───────────────── 2.18 Scripting
{
  id: "scripting", ch: "2.18 Betik diller", chip: "<b>2.18</b> Web için betik diller",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Betik diller: <em>web'in dilleri</em></h2>
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="1"><h3>Perl <span style="font-size:22px;color:var(--muted);font-weight:400">· Larry Wall · 1987</span></h3>
        <p style="font-size:25px">sh ve awk'un mirasçısı. Değişken türü, adının <b>ilk karakteriyle</b> belirtilir:</p>
        <div class="mono" style="font-size:28px;margin-top:14px;line-height:1.6"><span class="hl">$</span>sayi <span class="hl">@</span>liste <span class="hl">%</span>tablo</div>
        <p style="font-size:25px;margin-top:12px">Güçlü ama tehlikeli. CGI ve UNIX yönetiminde yaygın.</p></div>
      <div class="card r" data-s="2"><h3>JavaScript <span style="font-size:22px;color:var(--muted);font-weight:400">· Netscape + Sun · 1995</span></h3>
        <p style="font-size:25px">İlk adı <b>LiveScript</b>. Tarayıcıda (<b>istemci tarafı</b>) çalışır, HTML belgelerini dinamik yapar. Tamamen yorumlanır, dinamik tiplidir.</p>
        <p style="font-size:25px;margin-top:12px;color:var(--amber)">Java ile ilişkisi sadece sözdizimi benzerliği!</p></div>
      <div class="card r" data-s="3"><h3>PHP <span style="font-size:22px;color:var(--muted);font-weight:400">· Rasmus Lerdorf · 1994</span></h3>
        <p style="font-size:25px">HTML içine gömülür ve <b>sunucu tarafında</b> yorumlanır; çıktısı HTML'dir. Form işleme ve veritabanı erişimi kolaydır.</p></div>
    </div>
    <div class="r" data-s="3" style="display:flex;align-items:center;justify-content:center;gap:24px;margin-top:26px;font-size:28px">
      <div class="box" style="width:260px;height:100px;border-color:var(--amber)">🌐 Tarayıcı<span style="font-size:20px;color:var(--muted);font-weight:400">JavaScript</span></div>
      <span class="arrow">⇄ HTTP ⇄</span>
      <div class="box" style="width:260px;height:100px;border-color:var(--violet)">🖥️ Sunucu<span style="font-size:20px;color:var(--muted);font-weight:400">PHP</span></div>
    </div>
    ${tl([1987, 1995])}
  </div>`,
  n: [
    "Bölüm 2.18: Web için betik diller. Betik dil, çalıştırılacak komutların bir dosyada toplandığı, genellikle yorumlanan dillerdir. Kökleri UNIX kabuğuna, sh ve awk gibi araçlara dayanır.",
    "Perl, 1987'de Larry Wall tarafından geliştirildi. İlginç bir özelliği, değişkenin türünün adının ilk karakteriyle belirtilmesidir: dolar işareti tek bir değeri, et işareti bir diziyi, yüzde işareti ise bir sözlüğü gösterir. Güçlü ama tehlikeli bir dildir. Web'de CGI programlama ve UNIX sistem yönetiminde çok yaygınlaştı.",
    "JavaScript, 1995'te Netscape ve Sun ortaklığıyla ortaya çıktı; ilk adı LiveScript'ti. Tarayıcıda, yani istemci tarafında çalışır ve HTML belgelerini dinamik hale getirir. Tamamen yorumlanır ve dinamik tiplidir. Adına rağmen Java ile ilişkisi sadece sözdizimi benzerliğidir.",
    "PHP ise 1994'te Rasmus Lerdorf tarafından tasarlandı. HTML içine gömülür ve sunucu tarafında yorumlanır; çıktısı HTML'dir. Form işleme ve veritabanı erişimi için çok kullanışlıdır. Yani kabaca: JavaScript tarayıcıda, PHP sunucuda çalışır.",
  ],
},
{
  id: "scripting2", ch: "2.18 Betik diller", chip: "<b>2.18</b> Python, Lua ve Ruby",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Yeni nesil <em>betik diller</em></h2>
    <div class="grid3" style="flex:1">
      ${[["🐍", "t", "Python", "Guido van Rossum · 1991", "Nesne yönelimli, yorumlanan. <b>Dinamik tipli ama tip kontrollü</b>. Listeler, demetler ve sözlükler.", ["oranlar = {\"a\": 1}", "for k in oranlar:", "    print(k)"]],
         ["🌙", "v", "Lua", "Ierusalimschy · Brezilya · 1993", "Küçük ve kolay genişletilebilir. Tek veri yapısı: <b>tablo</b> — dizi, sözlük, nesne hepsi tablo.", ["t = {1, 2, x = 5}", "print(t.x)"]],
         ["💎", "c", "Ruby", "Yukihiro “Matz” Matsumoto · Japonya · 1995", "Perl ve Python'a alternatif. <b>Saf nesne yönelimli:</b> tüm veriler nesne; operatörler bile yeniden tanımlanabilen metotlar.", ["3.times { puts \"Merhaba\" }"]]]
        .map(([e, c, n, who, p, lines], i) => `<div class="card r rp" data-s="${i + 1}" style="display:flex;flex-direction:column"><div class="ic ${c}">${e}</div><h3>${n}</h3><div style="font-size:22px;color:var(--muted);margin:-6px 0 12px">${who}</div><p style="font-size:25px">${p}</p>
          <div style="margin-top:auto;padding-top:18px">${code(n.toLowerCase(), lines, { lang: "plain", cls: "xs" })}</div></div>`).join("")}
    </div>
    ${tl([1991, 1995], "violet")}
  </div>`,
  n: [
    "Doksanlarda yeni nesil betik diller de ortaya çıktı.",
    "Python, 1991'de Guido van Rossum tarafından yayımlandı. Nesne yönelimli ve yorumlanan bir dildir. Dinamik tiplidir ama tipler kontrol edilir; yani bir sayıyla bir metni toplamaya çalışırsanız hata alırsınız. Listeler, demetler ve sözlükler gibi güçlü yerleşik veri yapıları vardır.",
    "Lua, Brezilya'da geliştirildi. Küçük ve kolayca genişletilebilir bir dildir. Tek veri yapısı tablodur: diziler, sözlükler, hatta nesneler bile tablolarla temsil edilir. Bu yüzden oyunlarda gömülü betik dili olarak çok kullanılır.",
    "Ruby ise 1995'te Japonya'da Yukihiro Matsumoto, nam-ı diğer Matz tarafından, Perl ve Python'a alternatif olarak tasarlandı. Saf nesne yönelimlidir: bütün veriler nesnedir ve operatörlerin çoğu bile kullanıcının yeniden tanımlayabileceği metotlardır. Örnekte 3 sayısına times mesajı gönderiyoruz.",
  ],
},
// ───────────────── 2.19 C#
{
  id: "csharp", ch: "2.19 C#", chip: "<b>2.19</b> Yeni milenyum için C temelli bir dil: C#",
  html: `
  <div class="wrap">
    ${head("C#", "Microsoft · .NET · 2000", "violet")}
    <div class="r" data-s="0" style="display:flex;align-items:center;gap:20px;justify-content:center;margin-bottom:30px">
      <span class="pill t" style="font-size:32px">C++</span><span style="font-size:36px;color:var(--faint)">+</span><span class="pill a" style="font-size:32px">Java</span><span style="font-size:36px;color:var(--faint)">+</span><span class="pill c" style="font-size:32px">Delphi</span><span style="font-size:36px;color:var(--faint)">→</span><span class="pill v" style="font-size:38px;font-weight:700">C#</span>
    </div>
    <div class="row" style="flex:1;gap:30px">
      <div class="card r" data-s="1" style="flex:1"><h3>Bileşen tabanlı yazılım</h3><p>C ailesinin ilk <b>bileşen yönelimli</b> dili. Modern, nesne yönelimli, <b>tür güvenli</b>.</p></div>
      <div class="card r" data-s="2" style="flex:1.2"><h3>.NET platformu</h3>
        <div class="col" style="gap:10px;margin-top:10px">
          <div class="pills" style="margin:0">${["C#", "VB.NET", "Managed C++", "J#", "JScript.NET"].map((t) => `<span class="pill v">${t}</span>`).join("")}</div>
          <div style="text-align:center;font-size:30px;color:var(--faint)">↓</div>
          <div class="box" style="height:70px;font-size:24px;border-color:var(--violet)">Ortak Tip Sistemi (CTS) + ortak sınıf kütüphanesi</div>
          <div class="box" style="height:70px;font-size:24px;border-color:var(--teal)">CLR: JIT derleme, çöp toplama, güvenlik</div></div></div>
      <div class="card r" data-s="3" style="flex:1"><h3>Her şey bir nesne</h3><p><b>Kutulama</b> (boxing) ile değer türleri de nesne gibi kullanılabilir.</p><div class="mono" style="font-size:24px;margin-top:14px;line-height:1.6">int x = 5;<br>object o = x; <span class="cm">// kutula</span></div></div>
    </div>
    ${tl(2000, "violet")}
  </div>`,
  n: [
    "Bölüm 2.19: Yeni milenyum için C temelli bir dil, C#. Microsoft, 2000 yılında .NET platformuyla birlikte C#'ı tanıttı. C#, C++, Java ve Delphi'den etkilenmiştir.",
    "C ailesinin ilk bileşen yönelimli dilidir: modern, nesne yönelimli ve tür güvenlidir.",
    "C#'ın gücü .NET platformundan gelir. C#, Visual Basic .NET, Managed C++ gibi bütün .NET dilleri ortak bir tip sistemi ve ortak bir sınıf kütüphanesi kullanır. Ortak dil çalışma zamanı, yani CLR, JIT derleme, çöp toplama ve güvenlik hizmetleri sağlar. Böylece farklı dillerde yazılmış bileşenler birlikte çalışabilir.",
    "C#'ta her şey bir nesnedir. Kutulama sayesinde int gibi değer türleri bile gerektiğinde nesne olarak kullanılabilir; böylece değer türleri ile referans türleri arasındaki açık kapanır.",
  ],
},
// ───────────────── 2.20 Markup hybrids
{
  id: "markup", ch: "2.20 İşaretleme/programlama hibrit diller", chip: "<b>2.20</b> İşaretleme / programlama hibrit dilleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İşaretleme + programlama = <em>hibrit</em></h2>
    <div class="grid2" style="flex:1">
      <div class="col r" data-s="1">
        <div class="card"><h3>XSLT</h3><p><b>XML</b> bir meta-işaretleme dilidir. <b>XSLT</b>, XML belgelerini görüntülenebilir biçime dönüştürür ve <b>döngü</b> gibi programlama yapıları içerir.</p></div>
        ${code("liste.xsl", ["<xsl:for-each select=\"ogrenci\">", "  <li><xsl:value-of select=\"ad\"/></li>", "</xsl:for-each>"], { lang: "plain", cls: "xs" })}
      </div>
      <div class="col r" data-s="2">
        <div class="card"><h3>JSP</h3><p><b>Java Server Pages:</b> dinamik web belgeleri için teknolojiler. <b>Servlet</b>, web sunucusunda çalışan bir Java programıdır; çıktısı tarayıcıda görüntülenir.</p></div>
        ${code("liste.jsp", ["<c:forEach var=\"o\" items=\"${ogrenciler}\">", "  <li>${o.ad}</li>", "</c:forEach>"], { lang: "plain", cls: "xs" })}
      </div>
    </div>
    ${tl(1999)}
  </div>`,
  n: [
    "Bölüm 2.20: İşaretleme ve programlama hibrit dilleri. İşaretleme dilleri tek başına programlama dili değildir; ama bazılarına programlama yetenekleri eklenmiştir.",
    "XML, başka işaretleme dilleri tanımlamaya yarayan bir meta-işaretleme dilidir. XSLT ise XML belgelerini görüntülenebilir biçime dönüştürür ve döngü gibi programlama yapıları içerir. Örnekte, her öğrenci için bir liste elemanı üretiliyor.",
    "JSP, yani Java Server Pages, dinamik web belgelerini destekleyen teknolojiler topluluğudur. Servlet, web sunucusunda çalışan bir Java programıdır ve çıktısı tarayıcıda görüntülenir. JSP etiket kütüphanesiyle de benzer döngüler yazılabilir.",
  ],
},
// ───────────────── summary
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım: <em>üç büyük kök</em></h2>
    <div class="grid3" style="flex:1">
      ${[["teal", "Fortran", "Derlenen bilimsel diller", "Fortran → BASIC, PL/I…"], ["amber", "ALGOL", "Bütün imperatif dillerin atası", "Pascal, C, Ada, C++, Java, C#…"], ["violet", "LISP", "Fonksiyonel programlama", "Scheme, Common LISP, ML, Haskell…"]]
        .map(([c, n, a, b], i) => `<div class="card r rp" data-s="${i + 1}" style="text-align:center;display:flex;flex-direction:column;justify-content:center"><div class="big" style="font-size:80px;color:var(--${c})">${n}</div><h3 style="margin-top:10px">${a}</h3><p>${b}</p></div>`).join("")}
    </div>
    <div class="note r" data-s="4" style="margin-top:26px">Her dil bir <b>ihtiyaçtan</b> doğdu: makine verimliliği, iş verisi, eğitim, simülasyon, güvenlik, web… Yeni bir dil öğrenirken “hangi sorunu çözmek için yapıldı?” diye sorun.</div>
  </div>`,
  n: [
    "Toparlayalım. Bu bölümde gördüğümüz dillerin neredeyse tamamı üç büyük kökten türedi.",
    "Fortran, derlenen bilimsel dillerin atasıdır; BASIC ve PL/I gibi diller onun izinden gitti.",
    "ALGOL, bütün imperatif dillerin atasıdır: Pascal, C, Ada, C++, Java ve C# onun torunlarıdır.",
    "LISP ise fonksiyonel programlamanın kaynağıdır; Scheme, Common LISP, ML ve Haskell bu ailedendir.",
    "Unutmayın: her dil bir ihtiyaçtan doğdu. Makine verimliliği, iş verisi, eğitim, simülasyon, güvenlik ya da web. Yeni bir dil öğrenirken ilk sorunuz şu olsun: bu dil hangi sorunu çözmek için tasarlandı?",
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
    ...quiz.flatMap(([q, a], i) => [{ t: `Soru ${i + 1}. ${q.replace(/\s*\(.*?\)/g, "")}`, pause: 3.5 }, `Cevap: ${a.replace(/[—]/g, ",").replace(/\//g, ", ")}`]),
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 2 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Sıradaki: <b style="color:var(--text)">Bölüm 3 — Sentaks ve semantiği tanımlama</b></div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta, <i>Concepts of Programming Languages</i> · Watt · Scott<br>Ders notları: Z. Orhan, M. Şahin, Ahmet Yesevi Üniversitesi</div>
  </div>`,
  n: [
    "Bölüm 2'yi tamamladık! Bir sonraki bölümde, ALGOL 60 ile tanıştığımız BNF'i ve bir dilin sözdizimi ile anlamının nasıl biçimsel olarak tanımlandığını inceleyeceğiz.",
    "İzlediğiniz için teşekkürler. Soyağacını bir kez de kendiniz çizmeyi deneyin; dilleri birbirine bağlayan oklar, bu bölümün özüdür. Görüşmek üzere!",
  ],
},
];
