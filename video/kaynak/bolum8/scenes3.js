const { code } = require("../build/lib");
const { trace, frame, sw, FRCSS } = require("./h");

module.exports = [
{
  id: "array-params", ch: "8.2.5 Dillerde parametre aktarımı", chip: "<b>8.2.5</b> C'de parametreler ve çok boyutlu diziler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">C ve çok boyutlu <em>dizi parametreleri</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px;gap:18px">
        <div class="card r" data-s="1" style="padding:20px 26px"><p style="font-size:22px">C'de <b>yalnızca değer ile çağırma</b> var. Çağıranın değişkenini değiştirmek için <b>adresini</b> (işaretçi) göndeririz. Fonksiyonlar iç içe tanımlanamaz; kapsam ya fonksiyon içi ya da global.</p></div>
        <div class="r" data-s="2">${code("dizi.c", [{ t: "fun(int a[][][])     { ... }   // HATA", hot: "2" }, { t: "fun(int a[][][25])   { ... }   // HATA", hot: "2" }, { t: "fun(int a[][20][25]) { ... }   // ✓", hot: "3" }, "", "int a[10][20][25];  fun(a);"], { lang: "c", cls: "xs" })}</div>
        <div class="note r" data-s="3" style="font-size:22px">Derleyici <span class="mono">a[3][4][5]</span>'in adresini hesaplamak için ilk boyut dışındaki <b>tüm boyutları</b> bilmeli: erişim fonksiyonunu hatırlayın.</div>
      </div>
      <div class="col f1" style="gap:16px">
        <div class="card r" data-s="4" style="padding:18px 24px"><h3 style="font-size:25px">Esnek çözüm (C)</h3><div class="mono" style="font-size:20px;line-height:1.6">fun(int *a, int satir, int sutun)<br>a[i][j] ≡ *(a + i*sutun + j)</div></div>
        <div class="card r" data-s="5" style="padding:18px 24px"><p style="font-size:21px;line-height:1.55"><b>Pascal:</b> boyut tipin parçası, sorun yok.<br><b>Ada, Java, C#:</b> boyutlar dizi <b>nesnesinin parçası</b>: <span class="mono">list.length</span><br><b>Fortran (90 öncesi):</b> boyutlar da parametre olarak geçilir.</p></div>
        <div class="card r" data-s="6" style="padding:18px 24px"><p style="font-size:21px"><b>Pascal'da iç içe yordamlar:</b> Bir'de tanımlı değişken içteki bütün yordamlarda görünür; içte tanımlanan dışarıdan görünmez (statik kapsam).</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.2.5: C'de parametre aktarımı. Önce C'nin yapısını hatırlayalım: bir C programı fonksiyonlardan, tiplerden ve değişkenlerden oluşur; bir fonksiyon başka bir fonksiyonun içinde tanımlanamaz.",
    "C'de fonksiyonlara yalnızca değer ile çağırma uygulanır. Çağıranın bir değişkenini değiştirmek istiyorsak, onun adresini, yani işaretçisini değerle göndeririz; swap örneğinde gördüğümüz gibi. Böylece başvuru ile çağırma taklit edilmiş olur.",
    "Çok boyutlu dizileri parametre olarak geçirirken ilginç bir kısıt var. Üç boyutlu bir diziyi alan fonksiyonda boyutların hiçbirini ya da yalnızca sonuncusunu yazarsak derleyici hata verir.",
    "Ancak ilk boyut dışındaki bütün boyutları yazdığımızda kabul eder. Nedeni, önceki bölümde gördüğümüz erişim fonksiyonudur: derleyicinin a üç dört beş elemanının adresini hesaplayabilmesi için her satırın ve her düzlemin kaç eleman içerdiğini bilmesi gerekir.",
    "Bunun esnek bir çözümü, diziyi bir işaretçi olarak ve boyutlarını ayrı parametreler olarak göndermek, adresi de elle hesaplamaktır.",
    "Diğer diller bu sorunu farklı çözer. Pascal'da dizinin boyutu tipin parçasıdır, bu yüzden sorun yoktur. Ada, Java ve C#'ta boyutlar dizi nesnesinin parçasıdır; örneğin Java'da length ile sorulabilir. 1990 öncesi Fortran'da ise boyutlar da ayrı parametreler olarak geçirilir.",
    "Pascal'da ise C'den farklı olarak yordamlar iç içe tanımlanabilir. Dıştaki programda tanımlı bir değişken içteki bütün yordamlarda görünür; içte tanımlanan bir değişken ise dışarıdan görünmez. Bu, beşinci bölümde gördüğümüz statik kapsamdır.",
  ],
},
{
  id: "subprog-params", ch: "8.2.7 Altprogram parametreleri", chip: "Parametre olarak altprogramlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Fonksiyonu <em>parametre</em> olarak geçirmek</h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:640px;gap:16px">
        <div class="r" data-s="1">${code("fp.c", ["int Plus(int n)   { return n + n; }", "int Square(int n) { return n * n; }", "int Execute(int seed, int (*pF)(int)) {", "   return pF(seed);", "}", { t: "Execute(3, Plus);     // 6", hot: "1" }, { t: "Execute(3, Square);   // 9", hot: "1" }], { lang: "c", cls: "xs" })}</div>
        <div class="card r" data-s="2" style="padding:16px 22px"><p style="font-size:20px;line-height:1.55"><b>Tip kontrolü?</b> Erken Pascal, FORTRAN 77: yok · sonraki Pascal, FORTRAN 90: var · C, C++: fonksiyon işaretçisi, kontrollü · Ada, Java: altprogram/metot parametre olamaz</p></div>
      </div>
      <div class="col f1" style="gap:14px">
        <div class="r" data-s="3">${code("ref.js", ["function sub1() {", "  var x;", "  function sub2() { alert(x); }", "  function sub3() { var x = 3; sub4(sub2); }", "  function sub4(subx) { var x = 4; subx(); }", "  x = 1;  sub3();", "}"], { lang: "java", cls: "xs" })}</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${[["Yüzeysel bağlama (shallow)", "çağrıyı yapan sub4'ün çevresi", "4", "c", 4], ["Derin bağlama (deep)", "sub2'nin tanımlandığı sub1'in çevresi", "1", "t", 5], ["Özel (ad hoc) bağlama", "sub2'yi parametre yapan sub3'ün çevresi", "3", "v", 6]].map(([h, p, v, c, s]) => `<div class="card r rl" data-s="${s}" style="padding:12px 20px;display:flex;align-items:center;gap:18px"><div style="flex:1"><div style="font-size:22px;font-weight:700">${h}</div><div style="font-size:19px;color:var(--muted)">${p}</div></div><div class="mono" style="font-size:36px;font-weight:700;color:var(--${{ c: "coral", t: "teal", v: "violet" }[c]})">x = ${v}</div></div>`).join("")}
        </div>
      </div>
    </div>
  </div>`,
  n: [
    "Bazı diller bir altprogramı başka bir altprograma parametre olarak geçirmeye izin verir. Bu durumda iki yeni soru ortaya çıkar.",
    "C'de bunu fonksiyon işaretçileriyle yaparız. Execute fonksiyonu bir sayı ve bir fonksiyon alır ve o fonksiyonu sayıya uygular. Execute üç, Plus altı; Execute üç, Square ise dokuz döndürür.",
    "Birinci soru: parametre olarak geçen altprogramın parametre tipleri kontrol edilecek mi? Erken Pascal ve FORTRAN 77 kontrol etmezdi; sonraki Pascal sürümleri ve FORTRAN 90 eder. C ve C++'ta fonksiyon işaretçilerinin tipi kontrol edilebilir. Ada ve Java ise altprogramların doğrudan parametre olarak geçirilmesine izin vermez.",
    "İkinci soru daha ilginç: parametre olarak geçen altprogram çalıştığında hangi referans çevresini kullanacak? Bu JavaScript örneğinde sub1 içinde üç farklı x var: sub1'in x'i bir, sub3'ün x'i üç, sub4'ün x'i dört. sub3, sub2'yi sub4'e parametre olarak veriyor ve sub4 onu çağırıyor. sub2 hangi x'i yazdıracak?",
    "Yüzeysel bağlamada, altprogramı çalıştıran çağrı deyiminin çevresi kullanılır; yani sub4'ün çevresi ve x dört olur. Dinamik kapsamlı diller için en doğal seçenek budur.",
    "Derin bağlamada, geçirilen altprogramın tanımlandığı yerin çevresi kullanılır; sub2, sub1'in içinde tanımlandığı için x bir olur. Statik kapsamlı diller için, JavaScript dahil, en doğal seçenek budur.",
    "Özel bağlamada ise altprogramı parametre olarak veren çağrının çevresi, yani sub3'ünki kullanılır ve x üç olur. Bu seçenek pratikte hiçbir dilde kullanılmamıştır.",
  ],
},
{
  id: "overload-generic", ch: "8.3 Aşırı yükleme ve jenerikler", chip: "<b>8.3–8.4</b> Aşırı yüklenmiş ve jenerik altprogramlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aynı isim, <em>farklı tipler</em></h2>
    <div class="grid2" style="gap:30px">
      <div class="col">
        <div class="card tint-v r" data-s="1" style="padding:20px 26px"><h3 class="vl" style="font-size:28px">Aşırı yükleme (overloading)</h3><p style="font-size:21px">Aynı referans çevresinde <b>aynı isimli</b> birden çok altprogram. Hangisinin çağrılacağına <b>parametrelere</b> bakılarak karar verilir. C++, Java, C#, Ada.</p></div>
        <div class="r" data-s="1">${code("cpp", ["int    topla(int a, int b);", "double topla(double a, double b);", "topla(2, 3);       // int sürüm", "topla(2.5, 1.0);   // double sürüm"], { lang: "c", cls: "xs" })}</div>
        <div class="note r" data-s="2" style="font-size:20px"><b>Ada</b> dönüş tipine de bakar: <span class="mono">A := B + Fun(7);</span> A integer ise integer döndüren Fun seçilir.</div>
      </div>
      <div class="col">
        <div class="card tint-t r" data-s="3" style="padding:20px 26px"><h3 class="tl" style="font-size:28px">Jenerik (generic)</h3><p style="font-size:21px">Farklı çağrılarda <b>farklı tiplerle</b> çalışan tek altprogram: <b>parametrik çok biçimlilik</b>. Aynı sıralamayı her tip için yeniden yazmamak.</p></div>
        <div class="r" data-s="4">${code("ada / java", ["generic type element is private;", "procedure Generic_Sort(list : in out vector);", "procedure Integer_Sort is new Generic_Sort(INTEGER);", "", "public static <T extends Comparable> T doIt(T[] list)"], { lang: "ada", cls: "xs" })}</div>
        <div class="note r" data-s="5" style="font-size:20px">Ada, C++: derleyici her tip için <b>ayrı kopya</b> üretir. Java 5.0, C# 2005: <span class="mono">&lt;T&gt;</span>, sınırlar, Java'da joker <span class="mono">Collection&lt;?&gt;</span>. F#: otomatik genelleştirme <span class="mono">'a</span>.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.3 ve 8.4: Aşırı yüklenmiş ve jenerik altprogramlar.",
    "Aynı referans çevresinde, aynı isme sahip başka bir altprogram bulunan altprograma aşırı yüklenmiş altprogram denir. C++, Java, C# ve Ada hem hazır aşırı yüklenmiş altprogramlar sunar hem de programcının kendisininkini yazmasına izin verir. Hangisinin çağrılacağına parametrelerin sayısı ve tiplerine bakılarak karar verilir: topla iki ve üç, int sürümünü; topla iki buçuk ve bir ise double sürümünü çağırır.",
    "Ada'da dönüş tipi de seçimde rol oynayabilir. Ada karışık tipli ifadelere izin vermediği için, A integer ise A eşittir B artı Fun yedi ifadesinde derleyici integer döndüren Fun'ı seçer.",
    "Jenerik altprogram ise farklı çağrılarda farklı tiplerde parametre alabilen tek bir altprogramdır; buna parametrik çok biçimlilik denir. Motivasyon basittir: bir sıralama algoritmasını tam sayılar, gerçel sayılar ve dizgiler için ayrı ayrı yazmamak.",
    "Ada'da generic anahtar kelimesiyle eleman tipi parametre olan bir sıralama yordamı yazılır. Bu tanım için kod üretilmez; ancak new ile örneklendirildiğinde, örneğin Integer_Sort tanımlandığında, derleyici tam sayıları sıralayan bir sürüm üretir. Java ve C#'ta açılı ayraç içindeki T ile jenerik metotlar yazılır; extends Comparable gibi sınırlar konabilir.",
    "Ada ve C++'ta derleyici her tip için ayrı bir kopya üretir. Java 5.0 ve C# 2005 de jenerik metotları destekler; Java ayrıca soru işaretiyle yazılan joker tipleri sunar. F# ise tipi belirlenemeyen parametreleri kesme işaretiyle yazılan tip değişkenleriyle otomatik olarak genelleştirir.",
  ],
},
{
  id: "returns-ops", ch: "8.3 Aşırı yükleme ve jenerikler", chip: "<b>8.5</b> Dönüş tipleri ve kullanıcı tanımlı işleçler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Fonksiyon ne <em>döndürebilir?</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px;gap:12px">
        ${[["FORTRAN, Pascal", "yalnızca basit tipler"], ["C", "dizi ve fonksiyon hariç her tip (onlar işaretçiyle)"], ["C++", "C gibi + kullanıcı tanımlı tipler, sınıflar"], ["Ada", "her tip (altprogram tip değil; işaretçisi dönebilir)"], ["Java, C#", "her tip ve sınıf; metotlar tip değil"], ["JavaScript, fonksiyonel diller", "fonksiyonlar da değer: döndürülebilir!"]].map(([l, d], i) => `<div class="card r rl" data-s="${i < 3 ? 1 : 2}" style="padding:13px 22px;display:flex;gap:20px;align-items:center;transition-delay:${(i % 3) * 0.12}s"><span style="font-weight:700;font-size:23px;width:300px">${l}</span><span style="font-size:21px;color:var(--muted)">${d}</span></div>`).join("")}
        <div class="note r" data-s="3" style="font-size:21px"><b>Yan etkiler:</b> iki yönlü parametreler (Ada fonksiyonlarda izin vermez) ve yerel olmayan değişkenlere erişim varsa yan etkiler kaçınılmazdır.</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:20px 26px"><h3 style="font-size:27px">Kullanıcı tanımlı işleçler</h3><p style="font-size:21px">İşleçler zaten aşırı yüklüdür (<span class="mono">+</span> tam sayı ve gerçel). C++ ve Ada'da programcı kendi tipleri için de tanımlayabilir; Java'ya taşınmadı.</p></div>
        <div class="r" data-s="4">${code("vektor.cpp", ["Vektor operator+(Vektor a, Vektor b) {", "   return Vektor(a.x + b.x, a.y + b.y);", "}", "v3 = v1 + v2;"], { lang: "c", cls: "xs" })}</div>
      </div>
    </div>
  </div>`,
  n: [
    "Fonksiyonlarla ilgili iki tasarım sorusu daha var: hangi tipte değerler döndürülebilir ve yan etkilere izin verilecek mi?",
    "Dönüş tiplerine bakalım. FORTRAN ve Pascal yalnızca basit tipler döndürür. C, diziler ve fonksiyonlar hariç her tipi döndürebilir; onlar işaretçi olarak döndürülür. C++ buna kullanıcı tanımlı tipleri ve sınıfları ekler.",
    "Ada her tipi döndürebilir; altprogramlar tip olmadığı için döndürülemez ama işaretçileri döndürülebilir. Java ve C#'ta fonksiyon değil metot vardır ve her tip ile sınıf döndürülebilir. JavaScript'te ve birçok fonksiyonel dilde ise fonksiyonlar sıradan veri nesneleri gibidir: parametre olarak geçirilebilir ve değer olarak döndürülebilir. Bu, birazdan göreceğimiz kapatmaların temelidir.",
    "Yan etkiler konusunda: eğer iki yönlü parametrelere ya da yerel olmayan değişkenlere erişime izin veriliyorsa, fonksiyonların yan etkileri kaçınılmazdır. Ada bu yüzden fonksiyonlarda iki yönlü parametrelere izin vermez.",
    "Bölüm 8.5: Kullanıcı tanımlı aşırı yüklenmiş işleçler. İşleçler zaten bütün dillerde aşırı yüklüdür; örneğin artı hem tam sayıları hem gerçel sayıları toplar. C++ ve Ada'da programcı kendi tipleri için de işleç tanımlayabilir: iki vektörü artı ile toplamak gibi. Okunabilirliği artırabilir, ama anlamsız kullanılırsa azaltır. Bu özellik Java'ya taşınmadı.",
  ],
},
{
  id: "closures", ch: "8.6 Kapatmalar", chip: "<b>8.6</b> Kapatmalar (closures)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kapatma: fonksiyon + <em>çevresi</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:740px;gap:18px">
        <div class="r" data-s="1">${code("adder.js", ["function makeAdder(x) {", "   return function(y) { return x + y; };", "}", { t: "var add10 = makeAdder(10);", hot: "2" }, { t: "var add5  = makeAdder(5);", hot: "2" }, { t: "add10(20);   // 30", hot: "3" }, { t: "add5(20);    // 25", hot: "3" }], { lang: "java", cls: "sm" })}</div>
        <div class="card r" data-s="4" style="padding:18px 24px"><p style="font-size:21px">Kapatma = bir altprogram + <b>tanımlandığı referans çevresi</b>. Ancak altprogram iç içe kapsamdaki değişkenlere erişebiliyor <b>ve</b> her yerden çağrılabiliyorsa gerekir. Bu değişkenlerin ömrü <b>sınırsız</b> olabilir.</p></div>
      </div>
      <div class="col f1" style="gap:18px">
        <div class="row r" data-s="2" style="gap:16px">
          ${frame("add10", [["kod", "x + y"], ["x", "10", { col: "amber" }]], { c: "t", w: 230, fs: 24 })}
          ${frame("add5", [["kod", "x + y"], ["x", "5", { col: "amber" }]], { c: "v", w: 230, fs: 24 })}
        </div>
        <div class="r" data-s="2" style="font-size:20px;color:var(--muted)">makeAdder bitti ama <b>x</b> yaşamaya devam ediyor.</div>
        <div class="r" data-s="5">${code("counter.js", ["function mk_counter(init) {", "   var count = init;", "   return function(inc) { count += inc; return count; };", "}", "var c = mk_counter(1);", "c(2) + c(2);   // 3 + 5 = 8"], { lang: "java", cls: "xs" })}</div>
        <div class="note r" data-s="5" style="font-size:20px">count, kapatmanın <b>özel durumu</b>: her çağrı onu hatırlar. C#: delegate ile aynı fikir.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.6: Kapatmalar. Fonksiyonların değer olarak döndürülebildiği dillerde ilginç bir durum ortaya çıkar.",
    "makeAdder fonksiyonu bir x alır ve geriye isimsiz yeni bir fonksiyon döndürür; bu yeni fonksiyon kendisine verilen y'ye x'i ekler.",
    "makeAdder on ile çağrıldığında add10, beş ile çağrıldığında add5 elde edilir. Dikkat edin: makeAdder'ın çalışması bitti, normalde yerel değişkeni x'in yığıttan silinmesi gerekirdi. Ama dönen fonksiyonlar x'i hâlâ kullanıyor; her biri kendi x'ini taşıyor.",
    "add10 yirmi otuz, add5 yirmi ise yirmi beş verir.",
    "İşte kapatma budur: bir altprogram ile onun tanımlandığı referans çevresinin birlikte tutulması. Kapatmaya yalnızca altprogram iç içe kapsamdaki değişkenlere erişebiliyorsa ve programın herhangi bir yerinden çağrılabiliyorsa ihtiyaç duyulur. Bunu desteklemek için bazı değişkenlerin ömrü, onları tanımlayan altprogram bittikten sonra da sürmelidir; yani yığıtta değil heap'te tutulmaları gerekir.",
    "Kapatmalar özel bir durum da saklayabilir. mk_counter bir sayaç fonksiyonu döndürür; count yalnızca bu fonksiyonun görebildiği bir değişkendir. c iki ilk çağrıda count'u üçe, ikinci çağrıda beşe çıkarır; toplam sekiz olur. C#'ta da aynı fikir delegate'lerle yazılabilir; ML ve diğer fonksiyonel dillerde ise bu yapı çok yaygındır.",
  ],
},
// ───────── 8.7-8.8
{
  id: "activation", ch: "8.7 Etkinlik kayıtları", chip: "<b>8.7</b> Etkinlik kayıtları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Her çağrıya bir <em>etkinlik kaydı</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:470px;gap:0;align-items:stretch">
        <div style="font-size:22px;color:var(--faint);margin-bottom:6px" class="r" data-s="1">etkinlik kaydı (yığıtta)</div>
        ${[["Yerel değişkenler", "teal"], ["Parametreler", "violet"], ["Dinamik bağ (çağıranın kaydı)", "amber"], ["Dönüş adresi", "coral"]].map(([t, c], i) => `<div class="box r" data-s="1" style="height:96px;border-color:var(--${c});margin-top:${i ? 6 : 0}px;font-size:25px;transition-delay:${i * 0.15}s">${t}</div>`).join("")}
        <div style="font-size:20px;color:var(--faint);margin-top:6px" class="r" data-s="1">↑ yığıt bu yönde büyür</div>
      </div>
      <div class="col f1" style="gap:16px">
        <div class="card r" data-s="0" style="padding:18px 24px"><p style="font-size:22px">ALGOL 60'tan beri parametre iletişimi ve yerel değişkenler <b>yığıt</b> üzerindedir. Yığıt <b>LIFO</b>: en son çağrılan ilk biter, tıpkı altprogramlar gibi.</p></div>
        <div class="card tint-t r" data-s="2" style="padding:18px 24px"><h3 class="tl" style="font-size:25px">Çağrıda</h3><p style="font-size:21px">çağıranın durumunu sakla → parametreleri hesapla ve aktar → dönüş adresini aktar → denetimi altprograma ver → yeni kayıt için yer ayır</p></div>
        <div class="card tint-a r" data-s="3" style="padding:18px 24px"><h3 class="hl" style="font-size:25px">Dönüşte</h3><p style="font-size:21px">out/inout değerlerini kopyala → fonksiyonsa değeri hazırla → yığıt işaretçisini geri al (kayıt silinir) → çağıranın durumunu yükle → dönüş adresine atla</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.7: Etkinlik kayıtları. Bir altprogramın yerel değişkenleri ve parametreleri için bellek, altprogram çağrıldığında ayrılır. ALGOL 60 ve sonraki dillerde bu iş, çalışma zamanı belleğinin yığıt bölümünde yapılır. Yığıt en son giren ilk çıkar mantığıyla çalışır; altprogramlar da tam böyle davranır: en son çağrılan, ilk biter.",
    "Her etkin altprogram için yığıtta bir etkinlik kaydı oluşturulur. Bu kayıtta altprogramın yerel değişkenleri, parametreleri, çağıranın kaydını gösteren dinamik bağ ve altprogram bitince dönülecek yer, yani dönüş adresi bulunur.",
    "Bir çağrı gerçekleştiğinde sırasıyla şunlar olur: çağıran birimin durumu saklanır, parametreler hesaplanıp aktarılır, dönüş adresi aktarılır, denetim altprograma verilir ve altprogramın yerel değişkenleri için yığıtta yer ayrılır.",
    "Altprogram bittiğinde ise: dışarı ya da içeri-dışarı parametrelerin değerleri gerçek parametrelere kopyalanır, fonksiyonsa dönüş değeri hazırlanır, yığıt işaretçisi geri alınarak kayıt silinir, çağıranın durumu geri yüklenir ve dönüş adresine atlanır.",
  ],
},
{
  id: "recursion", ch: "8.8 Özyineleme", chip: "<b>8.8</b> Özyinelemeli bir altprogramın çoklu çağrımı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Özyineleme: aynı fonksiyonun <em>birçok kaydı</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px;gap:18px">
        <div class="r" data-s="0">${code("fakt.c", ["int fakt(int n) {", "   if (n == 1) return 1;", "   return n * fakt(n - 1);", "}", "x = fakt(3);"], { lang: "c", cls: "sm" })}</div>
        <div class="r" data-s="6">${code("diğer diller", ["(define (fakt n)                    ; Scheme", "  (if (= n 1) 1 (* n (fakt (- n 1)))))", "fakt(1, 1).                         % Prolog", "fakt(N, F) :- N > 1, N1 is N - 1,", "              fakt(N1, F1), F is N * F1."], { lang: "text", cls: "xs" })}</div>
      </div>
      <div class="f1" style="display:flex;flex-direction:column-reverse;gap:8px;align-items:flex-start">
        ${frame("main", [["x", sw([["?", 0, 5], ["6", 5]], "amber")]], { c: "t", s: 0, w: 380, fs: 25 })}
        ${frame("fakt(3)", [["n", "3"], ["döner", sw([["3 × fakt(2)", 1, 5], ["6", 5]], "amber")]], { c: "v", s: 1, h: 6, w: 380, fs: 25 })}
        ${frame("fakt(2)", [["n", "2"], ["döner", sw([["2 × fakt(1)", 2, 4], ["2", 4]], "amber")]], { c: "v", s: 2, h: 5, w: 380, fs: 25 })}
        ${frame("fakt(1)", [["n", "1"], ["döner", sw([["1", 3]], "amber")]], { c: "a", s: 3, h: 4, w: 380, fs: 25 })}
        <div class="r" data-s="1" style="font-size:20px;color:var(--faint)">yığıtın tepesi ↑</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.8: Özyinelemeli bir altprogramın çoklu çağrımı. Kendi deyimleri içinden yeniden çağrılabilen altprograma özyinelemeli altprogram denir. Faktöriyel bunun klasik örneğidir: n faktöriyel, n çarpı n eksi bir faktöriyeldir ve bir faktöriyel birdir. main, fakt üçü çağırıyor.",
    "fakt üç için bir etkinlik kaydı oluşturulur; n üç. Sonucu hesaplamak için fakt ikiyi çağırması gerekir ve kendisi bekler.",
    "fakt iki için yığıtta yeni, ayrı bir kayıt açılır; bu kaydın n'i iki. O da fakt biri çağırır.",
    "fakt bir için üçüncü bir kayıt açılır. n bir olduğu için özyineleme burada durur ve bir döndürülür.",
    "fakt birin kaydı silinir; fakt iki, iki çarpı bir, yani iki döndürür ve onun kaydı da silinir.",
    "fakt üç, üç çarpı iki, yani altı döndürür; main'deki x altı olur. Gördüğünüz gibi aynı fonksiyonun aynı anda üç etkin kopyası vardı ve her birinin kendi n'i vardı. Bu yüzden özyinelemeyi destekleyen bir dil, yerel değişkenleri yığıt-dinamik tutmak zorundadır; statik yerel değişkenlerle bu mümkün olmazdı.",
    "Aynı fonksiyon farklı paradigmalarda farklı görünür. LISP ve Scheme'de döngülerin yerini zaten özyineleme alır; Prolog'da ise faktöriyel iki kuralla tanımlanır. Mantık hep aynıdır: bir durma koşulu ve problemi küçülterek kendini çağırma.",
  ],
},
{
  id: "coroutines", ch: "8.10 Eşyordamlar", chip: "<b>8.9–8.10</b> Parametre tip kontrolü ve eşyordamlar",
  html: (() => {
    const segs = [["A", 0, 1], ["B", 1, 2], ["A", 2, 3], ["B", 3, 4], ["A", 4, 5]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Eşyordamlar: <em>sırayla devam et</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px;gap:16px">
        <div class="card r" data-s="0" style="padding:18px 24px"><h3 style="font-size:26px">8.9 Parametre tip kontrolü</h3><p style="font-size:20px;line-height:1.55"><b>FORTRAN 77, ilk C:</b> yok · <b>Pascal, FORTRAN 90, Java, Ada:</b> her zaman · <b>ANSI C, C++:</b> prototiple, programcıya bağlı · <b>Perl, JavaScript, PHP:</b> gerekmez · <b>Python, Ruby:</b> değişkenin tipi yok, kontrol mümkün değil</p></div>
        <div class="card tint-v r" data-s="1" style="padding:18px 24px"><h3 class="vl" style="font-size:26px">8.10 Eşyordam (coroutine)</h3><p style="font-size:21px">Birden çok giriş noktası olan, <b>kaldığı yeri hatırlayan</b>, çağıranla <b>eşit yetkili</b> program birimi: simetrik denetim. Çağrı yerine <span class="mono hl">resume</span>. İlk: <b>SIMULA 67</b>; sonra BLISS, INTERLISP, Modula-2.</p></div>
        <div class="note r" data-s="4" style="font-size:21px">Tek işlemcide <b>yarı koşut</b> (quasi-concurrent) çalışma. Bugünün üreteçleri (Python <span class="mono">yield</span>) ve async yapıları bu fikrin torunları.</div>
      </div>
      <svg viewBox="40 0 460 540" style="width:620px;height:728px" font-family="Inter">
        <text x="140" y="30" fill="#a493ff" font-size="30" text-anchor="middle" font-weight="700" class="r" data-s="2">A</text>
        <text x="380" y="30" fill="#35d0c0" font-size="30" text-anchor="middle" font-weight="700" class="r" data-s="2">B</text>
        ${segs.map(([w, k], i) => { const x = w === "A" ? 140 : 380, y0 = 60 + k * 95, y1 = y0 + 70; const nx = w === "A" ? 380 : 140; return `<line class="r rf" data-s="${2 + (i > 2 ? 1 : 0)}" style="transition-delay:${(i % 3) * 0.35}s" x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="${w === "A" ? "#a493ff" : "#35d0c0"}" stroke-width="10" stroke-linecap="round"/>${i < 4 ? `<path class="r rf" data-s="${2 + (i > 1 ? 1 : 0)}" style="transition-delay:${(i % 3) * 0.35 + 0.2}s" d="M${x},${y1} L${nx},${y1 + 25}" stroke="#ffb547" stroke-width="2.5" stroke-dasharray="7 5" fill="none"/><text class="r" data-s="${2 + (i > 1 ? 1 : 0)}" x="260" y="${y1 + 6}" fill="#ffb547" font-size="20" text-anchor="middle">resume ${w === "A" ? "B" : "A"}</text>` : ""}`; }).join("")}
      </svg>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 8.9: Parametrelerin tip kontrolü. Güvenilirlik için çok önemlidir. FORTRAN 77 ve ilk C bunu yapmazdı. Pascal, FORTRAN 90, Java ve Ada her zaman yapar. ANSI C ve C++'ta prototipler aracılığıyla programcıya bırakılmıştır. Perl, JavaScript ve PHP tip kontrolü gerektirmez. Python ve Ruby'de ise değişkenlerin değil nesnelerin tipi olduğu için parametre tip kontrolü zaten mümkün değildir.",
    "Bölüm 8.10: Eşyordamlar. Şimdiye kadar gördüğümüz altprogramların tek bir giriş noktası vardı ve çağıran, çağrılan üzerinde üstün durumdaydı. Eşyordam ise birden çok giriş noktası olan, kaldığı yeri hatırlayan ve onu çağıranla eşit yetkiye sahip bir program birimidir. Bu yüzden buna simetrik denetim denir ve çağırma yerine resume, yani sürdür işlemi kullanılır. Eşyordamları kullanan ilk dil, sistem benzetimleri için geliştirilen SIMULA 67'dir.",
    "Nasıl çalıştığına bakalım. Ana program A'yı başlatır. A bir süre çalışır, sonra resume B der. B baştan başlar, bir süre çalışır ve resume A der.",
    "Ama A bu kez baştan değil, kaldığı yerden devam eder. Sonra tekrar B'ye geçer ve B de kaldığı yerden devam eder. Eşyordama ilk giriş başından olur; sonraki her giriş, en son bırakılan yerden devam eder. Tipik olarak eşyordamlar birbirini defalarca sürdürür.",
    "Eşyordamlar tek işlemcili bir makinede bile yarı koşut, yani aynı anda çalışıyormuş gibi bir yürütme sağlar. Python'daki yield ile yazılan üreteçler ve bugünkü async yapıları bu fikrin modern torunlarıdır.",
  ],
},
// ───────── summary / quiz / outro
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="zoom:1.2">
      ${[["🧩", "t", "Altprogram", "İşlev soyutlaması. Başlık, profil, protokol; resmi ve gerçek parametre; yordam ve fonksiyon."], ["🔁", "a", "Parametre aktarımı", "Değer (kopya), sonuç, değer-sonuç, başvuru (adres), isim (metin). Takma ad farkı yaratır."],
         ["🧠", "v", "İleri kavramlar", "Fonksiyon parametreleri ve derin/yüzeysel bağlama, aşırı yükleme, jenerikler, kapatmalar."], ["📚", "c", "Çalışma zamanı", "Etkinlik kaydı yığıtta; özyineleme her çağrıya ayrı kayıt; eşyordamlar resume ile sürer."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "Altprogramlar işlev soyutlaması sağlar. Başlık, arayüzü tanımlar; parametre profili ve protokol, altprogramın nasıl çağrılacağını belirler. Başlıktaki parametreler resmi, çağrıdakiler gerçek parametrelerdir. Yordamlar değer döndürmez, fonksiyonlar döndürür.",
    "Parametre aktarımında değer ile çağırma kopya gönderir; sonuç ile çağırma dönüşte kopyalar; değer-sonuç ikisini birleştirir; başvuru ile çağırma adres gönderir; isim ile çağırma ise metni yerine koyar. Takma ad oluştuğunda başvuru ve değer-sonuç farklı sonuç verir.",
    "Altprogramlar parametre olarak geçirildiğinde referans çevresi derin ya da yüzeysel bağlamayla belirlenir. Aşırı yükleme aynı isme farklı altprogramlar, jenerikler tek altprograma farklı tipler sunar. Kapatmalar bir fonksiyonu tanımlandığı çevreyle birlikte taşır.",
    "Çalışma zamanında her çağrı için yığıtta bir etkinlik kaydı açılır; özyinelemede her çağrının kendi kaydı vardır. Eşyordamlar ise birbirini resume ile, kaldıkları yerden sürdürür.",
  ],
},
{
  id: "quiz", ch: "Özet ve mini test", chip: "Mini test",
  html: (() => {
    const quiz = [["Resmi parametre ile gerçek parametre arasındaki fark nedir?", "Resmi: başlıkta yazılan. Gerçek: çağrıda gönderilen."], ["a = 6, b = 4 iken değer ile çağrılan Cswap(a, b) bitince a ve b kaç olur?", "a = 6, b = 4 — yalnızca kopyalar takas edildi."], ["y = 2; p(y) içinde x := x + 1; x := x + y. Başvuru ile y kaç olur? Değer-sonuç ile?", "Başvuru: 6 · Değer-sonuç: 5"], ["Derin bağlama ve yüzeysel bağlama arasındaki fark nedir?", "Derin: tanımlandığı yerin çevresi. Yüzeysel: çağrıldığı yerin çevresi."], ["Özyineleme neden yığıt-dinamik yerel değişken gerektirir?", "Aynı anda birden çok etkin çağrı var; her birinin kendi değişkenleri olmalı."]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kendini <em>test et</em> <span class="emo">🧠</span></h2>
    <div class="stack" style="flex:1">
      ${quiz.map(([q, a], i) => `
      <div class="col r" data-s="${1 + i * 2}" data-h="${3 + i * 2}" style="gap:34px">
        <div class="card" style="padding:44px 50px"><div class="mono" style="color:var(--amber);font-size:28px;margin-bottom:16px">SORU ${i + 1} / ${quiz.length}</div>
          <div style="font-size:44px;font-weight:600;line-height:1.35">${q}</div></div>
        <div class="r" data-s="${1 + i * 2}" data-h="${2 + i * 2}" style="font-size:32px;color:var(--muted);display:flex;align-items:center;gap:26px">
          <svg viewBox="0 0 100 100" style="width:110px;height:110px"><circle cx="50" cy="50" r="42" fill="none" stroke="#2a3160" stroke-width="9"/><circle class="cd" cx="50" cy="50" r="42" fill="none" stroke="#ffb547" stroke-width="9" stroke-linecap="round" stroke-dasharray="264" transform="rotate(-90 50 50)"/></svg>
          <span><span class="emo">⏸️</span> Videoyu durdurup düşünebilirsin…</span></div>
        <div class="card tint-t r rp" data-s="${2 + i * 2}" style="padding:34px 50px;border-color:rgba(53,208,192,.5)"><div style="font-size:40px;font-weight:700;color:var(--teal);line-height:1.35">✓ ${a}</div></div>
      </div>`).join("")}
    </div>
    <style>.cd{stroke-dashoffset:0}.r.on .cd{animation:cd 4s linear 1.2s both}@keyframes cd{from{stroke-dashoffset:0}to{stroke-dashoffset:264}}</style>
  </div>`;
  })(),
  n: [
    "Şimdi kısa bir mini test yapalım. Her sorudan sonra birkaç saniye düşünme süreniz var.",
    { t: "Soru 1. Resmi parametre ile gerçek parametre arasındaki fark nedir?", pause: 3.5 }, "Cevap: Resmi parametre altprogramın başlığında yazılan parametredir; gerçek parametre ise çağrıda gönderilen değer ya da değişkendir.",
    { t: "Soru 2. a altı, b dört iken değer ile çağrılan Cswap a, b bittiğinde a ve b kaç olur?", pause: 3.5 }, "Cevap: a altı, b dört. Cswap yalnızca kendi kopyalarını takas etti.",
    { t: "Soru 3. y iki. p y'nin içinde x eşittir x artı bir, sonra x eşittir x artı y. Başvuru ile çağırmada y kaç olur? Değer-sonuç ile?", pause: 3.5 }, "Cevap: Başvuru ile altı, değer-sonuç ile beş.",
    { t: "Soru 4. Derin bağlama ile yüzeysel bağlama arasındaki fark nedir?", pause: 3.5 }, "Cevap: Derin bağlamada parametre olarak geçen altprogramın tanımlandığı yerin çevresi, yüzeysel bağlamada ise onu çağıran deyimin çevresi kullanılır.",
    { t: "Soru 5. Özyineleme neden yığıt-dinamik yerel değişkenler gerektirir?", pause: 3.5 }, "Cevap: Çünkü aynı anda aynı altprogramın birden çok etkin çağrısı vardır ve her birinin kendi yerel değişkenlerine ihtiyacı vardır.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 8 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Sıradaki: <b style="color:var(--text)">Bölüm 9 — Altprogramları uygulamak</b></div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta · Watt · Scott · Z. Orhan · M. Şahin · Ahmet Yesevi Üniversitesi · D. Evans · O. Nierstrasz · J. Mitchell</div>
  </div>`,
  n: [
    "Bölüm 8'i tamamladık! Bir sonraki bölümde altprogramların arka planda nasıl gerçekleştirildiğini, yani etkinlik kayıtlarını, statik ve dinamik bağları daha ayrıntılı inceleyeceğiz.",
    "Pratik için, dört çıktı örneğini kâğıt üzerinde kendiniz yeniden çözün; bu tür sorular sınavlarda çok sık çıkar. İzlediğiniz için teşekkürler, görüşmek üzere!",
  ],
},
];
