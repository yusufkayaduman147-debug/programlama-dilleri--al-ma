const { code } = require("../build/lib");
const { trace, frame, sw, FRCSS } = require("./h");

module.exports = [
{
  id: "by-value", ch: "8.2.4 Parametre aktarımı", chip: "<b>8.2.4.1</b> Değer ile çağırma (call by value)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Değer ile çağırma: <em>kopya gider</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:600px;gap:18px">
        <div class="r" data-s="0">${code("swap.c", ["main() {", "   int a = 6, b = 4;", { t: "   Cswap(a, b);", hot: "1,4" }, "   // a = 6, b = 4  (değişmedi!)", "}", "Cswap(int c, int d) {", { t: "   int temp = c;", hot: "2" }, { t: "   c = d;", hot: "2" }, { t: "   d = temp;", hot: "2" }, "}"], { lang: "c", cls: "sm" })}</div>
        <div class="card tint-t r" data-s="5" style="padding:18px 24px"><p style="font-size:21px"><b>İçeri modeli.</b> Resmi parametre, gerçek parametrenin <b>kopyasıyla</b> başlayan yerel bir değişkendir. Gerçek parametre sabit, değişken ya da ifade olabilir.<br>✓ En güvenilir yöntem · ✕ kopyalama için ek bellek ve zaman</p></div>
      </div>
      <div class="f1" style="position:relative;zoom:1.3">
        <div style="position:absolute;left:30px;top:0">${frame("main", [["a", "6"], ["b", "4"]], { c: "t", s: 0, w: 320 })}</div>
        <div style="position:absolute;left:420px;top:0">${frame("Cswap", [["c", sw([["6", 1, 2], ["4", 2]], "amber")], ["d", sw([["4", 1, 2], ["6", 2]], "amber")], ["temp", sw([["?", 1, 2], ["6", 2]], "amber")]], { c: "v", s: 1, h: 4, w: 320 })}</div>
        <div class="r" data-s="1" data-h="4" style="position:absolute;left:350px;top:70px;font-size:22px;color:var(--teal);text-align:center;width:70px">kopya<br>→</div>
        <div class="note r" data-s="3" style="position:absolute;left:30px;top:300px;width:710px;font-size:23px">Cswap kendi <b>kopyalarını</b> takas etti. main'deki a ve b'ye hiç dokunulmadı.</div>
        <div class="card r" data-s="4" style="position:absolute;left:30px;top:430px;width:710px;padding:18px 24px"><p style="font-size:23px">Çağrı bitti, Cswap'ın yeri silindi. Sonuç: <span class="mono hl">a = 6, b = 4</span></p></div>
      </div>
    </div>
    ${FRCSS}
  </div>`,
  n: [
    "Bölüm 8.2.4.1: Değer ile çağırma. Bu yöntem içeri modelinin gerçekleştirimidir ve en yaygın yöntemdir. Örneğimizde main, a'ya altı, b'ye dört verip Cswap'ı çağırıyor. Cswap'ın amacı iki değeri takas etmek.",
    "Çağrı anında Cswap için yeni bir bellek alanı açılır ve a'nın değeri c'ye, b'nin değeri d'ye kopyalanır. Artık c ve d, Cswap'a ait yerel değişkenlerdir.",
    "Gövde çalışır: temp altı olur, c dört olur, d altı olur. Yani takas gerçekten yapıldı, ama yalnızca kopyalar üzerinde.",
    "main'deki a ve b'ye hiç dokunulmadı, çünkü Cswap onların adreslerini bilmiyor; yalnızca değerlerinin bir kopyasını aldı.",
    "Çağrı bitince Cswap'ın alanı silinir ve a hâlâ altı, b hâlâ dörttür. Takas başarısız oldu.",
    "Değer ile çağırmada resmi parametre, gerçek parametrenin değeriyle başlayan yerel bir değişkendir. Gerçek parametre bir sabit, değişken ya da ifade olabilir. Veri yalnızca içeri aktığı için en güvenilir yöntemdir; dezavantajı ise kopyalama için ek bellek ve zaman gerekmesidir. Büyük bir diziyi değerle geçirmek pahalı olabilir.",
  ],
},
{
  id: "by-result", ch: "8.2.4 Parametre aktarımı", chip: "<b>8.2.4.2</b> Sonuç ile çağırma (call by result)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Sonuç ile çağırma: <em>dönüşte kopyalanır</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px;gap:18px">
        <div class="r" data-s="0">${code("plus", ["void plus(by-value int a, by-value int b,", "          by-result int c) {", { t: "   c = a + b;", hot: "2" }, "}", "void f() {", "   int x = 3, y = 4, z;", { t: "   plus(x, y, z);", hot: "1,3" }, { t: "   write z;        // 7", hot: "3" }, "}"], { lang: "c", cls: "xs" })}</div>
        <div class="card tint-a r" data-s="4" style="padding:18px 24px"><p style="font-size:21px"><b>Dışarı modeli.</b> Çağrıda değer <b>gitmez</b>; resmi parametre yerel değişken gibi çalışır ve altprogram bitince değeri gerçek parametreye yazılır. Gerçek parametre <b>değişken olmak zorunda</b>.</p></div>
        <div class="note r" data-s="5" style="font-size:21px"><b>Sorunlar:</b> resmi parametre başlangıçta tanımsız; <span class="mono">sub(p1, p1)</span> gibi çağrılarda hangi kopya en son yazılırsa o kalır; adres çağrıda mı dönüşte mi hesaplanacak?</div>
      </div>
      <div class="f1" style="position:relative;zoom:1.3">
        <div style="position:absolute;left:20px;top:0">${frame("f", [["x", "3"], ["y", "4"], ["z", sw([["?", 0, 3], ["7", 3]], "amber")]], { c: "t", s: 0, w: 300 })}</div>
        <div style="position:absolute;left:420px;top:0">${frame("plus", [["a", "3"], ["b", "4"], ["c", sw([["?", 1, 2], ["7", 2]], "amber")]], { c: "v", s: 1, h: 4, w: 300 })}</div>
        <div class="r" data-s="1" data-h="3" style="position:absolute;left:330px;top:70px;font-size:22px;color:var(--teal);text-align:center;width:80px">x, y<br>→</div>
        <div class="r" data-s="3" data-h="4" style="position:absolute;left:330px;top:190px;font-size:22px;color:var(--amber);text-align:center;width:80px">←<br>c → z</div>
      </div>
    </div>
    ${FRCSS}
  </div>`,
  n: [
    "Bölüm 8.2.4.2: Sonuç ile çağırma. Bu yöntem dışarı modelinin gerçekleştirimidir. Örnekteki plus altprogramında a ve b değerle, c ise sonuçla aktarılıyor.",
    "Çağrı anında x ve y'nin değerleri a ve b'ye kopyalanır. Ama c'ye hiçbir değer gönderilmez; c, plus'ın içinde başlangıç değeri olmayan yerel bir değişken gibidir.",
    "Gövde çalışır ve c, üç artı dört, yani yedi olur.",
    "Altprogram biterken, denetim çağırana dönmeden hemen önce, c'nin değeri gerçek parametre z'ye kopyalanır. Böylece f, z'yi yazdırdığında yedi görür.",
    "Sonuç ile çağırmada gerçek parametrenin bir değişken olması zorunludur, çünkü değer oraya yazılacaktır. Altprogram içinde resmi parametre yerel bir değişken gibi davranır.",
    "Bu yöntemin bazı sorunları vardır. Resmi parametre başlangıçta tanımsızdır; Pascal benzeri bir örnekte başlatılmamış bir parametreyi kullanmak hataya yol açar. Aynı değişken iki kez gerçek parametre olarak verilirse, hangi kopyanın en son yazıldığı sonucu belirler. Ayrıca dönüş adresinin çağrı anında mı yoksa dönüşte mi hesaplanacağı da bir tasarım kararıdır.",
  ],
},
{
  id: "by-value-result", ch: "8.2.4 Parametre aktarımı", chip: "<b>8.2.4.3</b> Değer ve sonuç ile çağırma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Değer-sonuç: <em>gidişte de, dönüşte de kopya</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px;gap:18px">
        <div class="r" data-s="0">${code("ornek", ["int x = 0;            // global", "main() {", { t: "   f(x);            // değer-sonuç ile", hot: "1,4" }, "}", "void f(int a) {", { t: "   x = 3;", hot: "2" }, { t: "   a++;", hot: "3" }, "}"], { lang: "c", cls: "sm" })}</div>
        <div class="card r" data-s="5" style="padding:18px 24px"><p style="font-size:21px"><b>İçeri-dışarı modeli</b> = değer + sonuç. Ada'da <span class="mono">in out</span> (skaler tipler), Fortran 77, ALGOL W. Gerçek parametre değişken olmalı. ✕ Her parametre için ek bellek ve kopyalama zamanı.</p></div>
      </div>
      <div class="f1" style="position:relative;zoom:1.3">
        <div style="position:absolute;left:20px;top:0">${frame("global", [["x", sw([["0", 0, 2], ["3", 2, 4], ["1", 4]], "amber")]], { c: "t", s: 0, w: 300 })}</div>
        <div style="position:absolute;left:420px;top:0">${frame("f", [["a", sw([["0", 1, 3], ["1", 3]], "amber")]], { c: "v", s: 1, h: 5, w: 300 })}</div>
        <div class="r" data-s="1" data-h="4" style="position:absolute;left:330px;top:40px;font-size:22px;color:var(--teal);text-align:center;width:80px">x → a</div>
        <div class="r" data-s="4" data-h="5" style="position:absolute;left:330px;top:40px;font-size:22px;color:var(--amber);text-align:center;width:80px">a → x</div>
        <div class="note r" data-s="2" data-h="4" style="position:absolute;left:20px;top:180px;width:700px;font-size:22px">f, global x'i doğrudan <b>3</b> yaptı. Ama a hâlâ kendi kopyası: 0.</div>
        <div class="card tint-a r" data-s="4" style="position:absolute;left:20px;top:180px;width:700px;padding:20px 24px"><p style="font-size:24px">Dönüşte a (1) x'e kopyalanır, 3'ün üzerine yazar. Sonuç: <span class="mono hl">x = 1</span>. Başvuru ile olsaydı <span class="mono">x = 4</span> olurdu.</p></div>
      </div>
    </div>
    ${FRCSS}
  </div>`,
  n: [
    "Bölüm 8.2.4.3: Değer ve sonuç ile çağırma. Bu yöntem içeri-dışarı modelinin gerçekleştirimidir ve önceki iki yöntemin birleşimidir: çağrıda değer kopyalanır, dönüşte sonuç geri kopyalanır. Örnekte global bir x var ve f'ye değer-sonuç ile veriliyor.",
    "Çağrıda x'in değeri olan sıfır, a'ya kopyalanır.",
    "Gövdenin ilk satırı global x'i doğrudan üç yapar. Dikkat: a bundan etkilenmez, çünkü a ayrı bir kopyadır ve hâlâ sıfırdır.",
    "İkinci satır a'yı bir artırır; a bir olur.",
    "Altprogram biterken a'nın değeri gerçek parametre x'e geri kopyalanır ve üçün üzerine yazar. Sonuçta x bir olur. Eğer bu parametre başvuru ile geçirilseydi, a ile x aynı bellek yeri olurdu: x önce üç, sonra dört olurdu.",
    "Değer-sonuç ile çağırma Ada'nın skaler in out parametrelerinde, Fortran 77'de ve ALGOL W'da kullanılır. Gerçek parametrenin değişken olması gerekir. Dezavantajı, her parametre için birden çok bellek yeri gerekmesi ve iki yönlü kopyalamanın zaman almasıdır.",
  ],
},
{
  id: "by-ref", ch: "8.2.4 Parametre aktarımı", chip: "<b>8.2.4.4</b> Başvuru ile çağırma (call by reference)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Başvuru ile çağırma: <em>adres gider</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:620px;gap:16px">
        <div class="r" data-s="0">${code("swap.c", ["int a = 3, b = 1;", { t: "swap(&a, &b);", hot: "1,3" }, "", "swap(int *c, int *d) {", { t: "   int temp = *c;", hot: "2" }, { t: "   *c = *d;", hot: "2" }, { t: "   *d = temp;", hot: "2" }, "}"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="4">${code("swap.cpp", ["void swap(int &c, int &d) {   // C++ referans", "   int temp = c;  c = d;  d = temp;", "}", "swap(a, b);"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="f1" style="position:relative;zoom:1.3">
        <div style="position:absolute;left:20px;top:0">${frame("caller", [["a <span style='color:var(--faint);font-size:18px'>@2000</span>", sw([["3", 0, 2], ["1", 2]], "amber")], ["b <span style='color:var(--faint);font-size:18px'>@2004</span>", sw([["1", 0, 2], ["3", 2]], "amber")]], { c: "t", s: 0, w: 320 })}</div>
        <div style="position:absolute;left:440px;top:0">${frame("swap", [["c", "2000"], ["d", "2004"], ["temp", sw([["?", 1, 2], ["3", 2]], "amber")]], { c: "v", s: 1, h: 3, w: 290 })}</div>
        <div class="r" data-s="1" data-h="3" style="position:absolute;left:345px;top:60px;font-size:22px;color:var(--coral);text-align:center;width:90px">← adres<br>gösterir</div>
        <div class="card tint-t r" data-s="3" style="position:absolute;left:20px;top:250px;width:710px;padding:18px 24px"><p style="font-size:23px">swap, a ve b'nin <b>kendisini</b> değiştirdi: <span class="mono hl">a = 1, b = 3</span>. Takas başarılı!</p></div>
        <div class="row r" data-s="5" style="position:absolute;left:20px;top:380px;width:710px;gap:18px">
          <div class="card f1" style="padding:16px 20px"><h3 class="tl" style="font-size:24px">Avantaj</h3><p style="font-size:20px">Kopya yok: hem yer hem zaman açısından verimli.</p></div>
          <div class="card f1" style="padding:16px 20px"><h3 class="cl" style="font-size:24px">Dezavantaj</h3><p style="font-size:20px">Her erişimde dolaylı adresleme; istenmeyen değişiklik; <b>takma ad</b> (alias) riski.</p></div></div>
      </div>
    </div>
    ${FRCSS}
  </div>`,
  n: [
    "Bölüm 8.2.4.4: Başvuru ile çağırma. Bu yöntem de iki yönlü veri aktarımı sağlar, ama en önemli farkı şudur: altprograma verinin kendisi değil, adresi aktarılır. Örneğimizde a üç, b bir ve swap'a ikisinin adresi gönderiliyor.",
    "swap'ın c parametresi a'nın adresi olan iki bini, d ise b'nin adresi olan iki bin dördü tutar. Yani c ve d, doğrudan main'in değişkenlerini gösterir.",
    "Gövde çalışırken yıldızlı ifadeler, gösterilen yerdeki değerlere erişir: temp, a'nın değeri olan üç olur; a'ya b'nin değeri olan bir yazılır; b'ye de temp yazılır.",
    "Çağrı bittiğinde a bir, b üç olmuştur. Bu kez takas başarılı, çünkü swap kopyalarla değil, asıl bellek yerleriyle çalıştı.",
    "C'de başvuru ile çağırma işaretçilerle taklit edilir. C++ ise ve işaretiyle tanımlanan referans parametreleri sunar: kod normal değişken kullanıyormuş gibi görünür ama arka planda adresler aktarılır. Pascal'da da var kelimesiyle aynı etki elde edilir.",
    "En büyük avantajı verimliliktir: kopyalama olmadığı için hem bellekten hem zamandan tasarruf edilir; büyük diziler için idealdir. Dezavantajları ise her erişimde fazladan bir dolaylı adresleme gerekmesi, yalnızca değer aktarmak istediğimiz durumlarda gerçek parametrenin yanlışlıkla değiştirilebilmesi ve aynı bellek yerine iki isimle erişilen takma ad durumlarının ortaya çıkmasıdır.",
  ],
},
{
  id: "ref-vs-vr", ch: "8.2.4 Parametre aktarımı", chip: "Başvuru mu, değer-sonuç mu? Aynı kod, farklı sonuç",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aynı kod, <em>farklı sonuç</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:480px;gap:18px">
        <div class="r" data-s="0">${code("p.pas", ["y : integer;", "procedure p(x : integer)", "begin", { t: "   x := x + 1;", hot: "2" }, { t: "   x := x + y;", hot: "3" }, "end;", "", "y := 2;", { t: "p(y);", hot: "1" }, { t: "write(y);", hot: "4" }], { lang: "pascal", cls: "sm" })}</div>
      </div>
      <div class="col f1" style="gap:20px">
        <div class="r" data-s="1">${trace([{ h: "adım", color: "text" }, { h: "BAŞVURU: x ≡ y", color: "coral", align: "center" }, { h: "DEĞER-SONUÇ: x kopya", color: "teal", align: "center" }], [[["çağrı", "x = y = 2", "x = 2, y = 2"], 1], [["x := x + 1", "x = y = 3", "x = 3, y = 2"], 2], [["x := x + y", "x = y = 3 + 3 = 6", "x = 3 + 2 = 5"], 3], [["dönüş", "—", "y := x = 5"], 4]], { fs: 25 })}</div>
        <div class="row" style="gap:20px">
          <div class="card tint-c r f1" data-s="4" style="padding:18px 24px;text-align:center"><div style="font-size:22px;color:var(--muted)">başvuru ile</div><div class="mono" style="font-size:52px;color:var(--coral);font-weight:700">6</div></div>
          <div class="card tint-t r f1" data-s="4" style="padding:18px 24px;text-align:center"><div style="font-size:22px;color:var(--muted)">değer-sonuç ile</div><div class="mono" style="font-size:52px;color:var(--teal);font-weight:700">5</div></div>
        </div>
        <div class="note r" data-s="5" style="font-size:21px">Fark, x ile y'nin <b>aynı bellek yeri</b> (takma ad) olup olmamasından doğar. Sınavlarda çok sorulan bir örnek türüdür!</div>
      </div>
    </div>
  </div>`,
  n: [
    "Başvuru ile çağırma ile değer-sonuç ile çağırma ilk bakışta aynı sonucu veriyor gibi görünür, çünkü ikisi de iki yönlüdür. Ama bu örnekte farklı sonuçlar verirler. y global bir değişken ve iki; p'ye y'yi gönderiyoruz. p'nin içinde hem x'i hem de global y'yi kullanıyoruz.",
    "Çağrı anı. Başvuru ile çağırmada x ve y aynı bellek yeridir; ikisi de iki. Değer-sonuçta ise x, y'nin bir kopyasıdır: x iki, y iki ama ayrı yerlerde.",
    "x eşittir x artı bir. Başvuruda bu aynı zamanda y'yi değiştirir: ikisi de üç olur. Değer-sonuçta yalnızca kopya değişir: x üç, y hâlâ iki.",
    "x eşittir x artı y. Başvuruda y de üç olduğu için x, üç artı üç, yani altı olur ve y de altıdır. Değer-sonuçta ise y hâlâ iki olduğu için x, üç artı iki, yani beş olur.",
    "Dönüşte değer-sonuç yönteminde x'in değeri y'ye kopyalanır. Sonuç olarak başvuru ile çağırmada altı, değer-sonuç ile çağırmada beş yazdırılır.",
    "Farkın kaynağı, x ile y'nin aynı bellek yeri olup olmamasıdır. Başvuru ile çağırmada altprogram içindeki x ve global y aynı yerin iki ismidir; yani bir takma ad oluşur. Bu tür sorular sınavlarda çok sık karşınıza çıkar: tabloyu adım adım doldurmak en güvenli yoldur.",
  ],
},
{
  id: "by-name", ch: "8.2.4 Parametre aktarımı", chip: "<b>8.2.4.5</b> İsim ile çağırma (call by name)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İsim ile çağırma: <em>metin olarak yerine koy</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px;gap:18px">
        <div class="r" data-s="1">${code("isim", ["int i = 1;", "void p(int f, int g) {", { t: "   g++;", hot: "2" }, { t: "   f = 5 * i;", hot: "3" }, "}", "int a[] = {0, 1, 2};", { t: "p(a[i], i);", hot: "1" }], { lang: "c", cls: "sm" })}</div>
        <div class="card r" data-s="1" style="padding:16px 22px"><p style="font-size:21px">Gövdede her <span class="mono">f</span> yerine <span class="mono hl">a[i]</span>, her <span class="mono">g</span> yerine <span class="mono hl">i</span> yazılır. İfade, <b>kullanıldığı anda</b> değerlendirilir.</p></div>
      </div>
      <div class="col f1" style="gap:18px">
        <div class="r" data-s="2">${code("p'nin gerçekte çalışan hali", [{ t: "i++;            // i = 2", hot: "2" }, { t: "a[i] = 5 * i;   // a[2] = 10 !", hot: "3" }], { lang: "c", cls: "sm" })}</div>
        <div class="r" data-s="4">${trace([{ h: "yöntem", color: "text" }, { h: "i", color: "amber", align: "center" }, { h: "a[0] a[1] a[2]", color: "teal", align: "center" }], [[["değer ile", "1", "0  1  2"], 4], [["başvuru ile", "2", "0  10  2"], 4], [["isim ile", "2", "0  1  10"], 4]], { fs: 25, hotLast: false })}</div>
        <div class="note r" data-s="5" style="font-size:21px">ALGOL 60 ile geldi; sabit verilirse değer ile, basit değişken verilirse başvuru ile aynı davranır. Gerçekleştirmesi zor ve okunması güç olduğu için bugün popüler dillerde yok. Haskell'in tembel değerlendirmesi bu fikrin akrabası.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 8.2.4.5: İsim ile çağırma. Bu da iki yönlü bir yöntemdir ama çok farklı çalışır: altprogramın gövdesinde resmi parametrenin geçtiği her yere, gerçek parametre metin olarak yerleştirilir.",
    "Örneğimizde i bir, a dizisi sıfır, bir, iki. p'yi a köşeli parantez i ve i ile çağırıyoruz. İsim ile çağırmada gövdedeki her f yerine a köşeli parantez i, her g yerine de i yazılır; ve bu ifadeler önceden değil, kullanıldıkları anda değerlendirilir.",
    "İlk satır g artı artı, aslında i artı artı olur: i iki olur.",
    "İkinci satır f eşittir beş çarpı i, aslında a köşeli parantez i eşittir beş çarpı i olur. Ama artık i iki olduğu için a iki, on olur! a köşeli parantez i ifadesi, ihtiyaç duyulana kadar değerlendirilmedi ve bu arada i değişti.",
    "Aynı programı üç yöntemle karşılaştıralım. Değer ile çağırmada hiçbir şey değişmez: i bir, dizi sıfır, bir, iki. Başvuru ile çağırmada f, çağrı anındaki a bir'i gösterir: i iki olur ve a bir, beş çarpı iki, yani on olur. İsim ile çağırmada ise i iki olur ve on, a iki'ye yazılır.",
    "İsim ile çağırma ALGOL 60 ile tanıtıldı. Gerçek parametre bir sabitse değer ile, basit bir değişkense başvuru ile çağırma gibi davranır. Ancak gerçekleştirmesi zordur ve programları okumayı da yazmayı da karmaşıklaştırır; bu yüzden bugün popüler dillerde kullanılmaz. Yine de Haskell'deki tembel değerlendirme, yani bir ifadenin yalnızca gerektiğinde hesaplanması, bu fikrin yakın bir akrabasıdır.",
  ],
},
{
  id: "methods-table", ch: "8.2.4 Parametre aktarımı", chip: "<b>8.2.4.6</b> Yöntemlerin karşılaştırılması",
  html: (() => {
    const L = [["FORTRAN IV", "", "", "", "X", ""], ["Fortran 77", "", "", "X", "", ""], ["ALGOL 60", "seçimlik", "", "", "", "X"], ["ALGOL W", "", "", "X", "", ""], ["Pascal, Modula-2", "X", "", "", "var", ""], ["C", "X", "", "", "işaretçi", ""], ["C++", "X", "", "", "X (&)", ""], ["Ada", "X (in)", "X (out)", "X (in out)", "X", ""], ["Java", "X (ilkel)", "", "", "nesne ref.", ""]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kim <em>hangi yöntemi</em> kullanıyor?</h2>
    <div class="row" style="flex:1;gap:36px">
      <table class="r" data-s="1" style="width:1080px;border-collapse:separate;border-spacing:0 6px;font-size:24px">
        <tr style="color:var(--faint);font-size:21px">${["Dil", "Değer", "Sonuç", "Değer-sonuç", "Başvuru", "İsim"].map((h, i) => `<td style="padding:6px 14px;${i ? "text-align:center" : ""}">${h}</td>`).join("")}</tr>
        ${L.map((r) => `<tr style="background:var(--panel)">${r.map((c, i) => `<td style="padding:11px 14px;${i ? "text-align:center;font-family:JBM;font-size:21px;color:var(--teal)" : "font-weight:600"};${i === 0 ? "border-radius:12px 0 0 12px" : i === 5 ? "border-radius:0 12px 12px 0" : ""}">${c}</td>`).join("")}</tr>`).join("")}
      </table>
      <div class="col f1" style="justify-content:center">
        <div class="card tint-t r" data-s="2" style="padding:20px 24px"><p style="font-size:22px"><b>Değer ile:</b> güvenli ama çoğu zaman <b>yetersiz</b>: sonuç döndüremez.</p></div>
        <div class="card tint-c r" data-s="3" style="padding:20px 24px"><p style="font-size:22px"><b>Değer-sonuç ve başvuru:</b> <b>gerekli</b> ama o kadar güvenli değil.</p></div>
        <div class="note r" data-s="4" style="font-size:21px">Ada, programcıya veri akışı modelini (<span class="mono">in, out, in out</span>) doğrudan yazdırır: niyet açık, derleyici kontrol eder.</div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 8.2.4.6: Çağırma yöntemlerinin karşılaştırılması.",
    "Tabloda dillerin hangi yöntemleri kullandığını görüyorsunuz. FORTRAN dört başvuru, Fortran 77 değer-sonuç kullanır. ALGOL 60 isim ile çağırmayı tanıttı, değer ile çağırma isteğe bağlıydı. Pascal ve Modula-2 varsayılan olarak değer, var ile başvuru kullanır. C yalnızca değer ile çağırır; başvuru etkisi işaretçilerle sağlanır. C++ ayrıca referans parametreleri sunar. Ada üç modeli de destekler. Java'da ilkel tipler değerle aktarılır; nesneler ise referansları aracılığıyla erişilir.",
    "Genel bir değerlendirme yaparsak: değer ile çağırma güvenlidir ama çoğu durumda yetersizdir, çünkü altprogramdan çağırana sonuç döndüremez.",
    "Değer-sonuç ve başvuru ile çağırma ise gereklidir, ama aynı ölçüde güvenli değildir; yan etkilere ve takma adlara kapı açarlar.",
    "Ada'nın yaklaşımı dikkat çekicidir: programcı her parametre için in, out ya da in out yazarak veri akışı modelini doğrudan belirtir. Böylece niyet açıkça görülür ve derleyici, örneğin bir in parametresine yazılmasını engelleyebilir.",
  ],
},
{
  id: "outputs", ch: "8.2.4 Parametre aktarımı", chip: "Örnek: dört yöntem, dört çıktı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bir program, <em>dört çıktı</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:520px">
        <div class="r" data-s="0">${code("A.pas", ["var y : integer;", "procedure A(x : integer);", "begin", "   write(x);", "   x := 1;", "   write(y + x);", "end;", "begin", "   y := 5;", "   A(y);", "   write(y);", "end."], { lang: "pascal", cls: "sm" })}</div>
      </div>
      <div class="col f1" style="gap:16px">
        ${[["Değer ile", "5, 6, 5", "x kopya: 5; x := 1 kopyayı değiştirir; y + x = 5 + 1; y hâlâ 5", "t", 1], ["Başvuru ile (var)", "5, 2, 1", "x ≡ y: 5; x := 1 → y de 1; y + x = 1 + 1; y = 1", "c", 2], ["Değer-sonuç ile", "5, 6, 1", "x kopya: 5; y + x = 5 + 1 = 6; dönüşte y := x = 1", "a", 3], ["Sonuç ile", "?, 6, 1", "x başta tanımsız; y + x = 5 + 1; dönüşte y := 1", "v", 4]]
          .map(([m, o, e, c, s]) => `<div class="card tint-${c} r rl" data-s="${s}" style="padding:16px 24px;display:flex;align-items:center;gap:24px"><div style="width:230px"><div style="font-size:23px;font-weight:700">${m}</div></div><div class="mono" style="font-size:40px;font-weight:700;width:190px;color:var(--${{ t: "teal", c: "coral", a: "amber", v: "violet" }[c]})">${o}</div><div style="font-size:19px;color:var(--muted);flex:1">${e}</div></div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Bir alıştırmayla pekiştirelim. Bu Pascal programı üç değer yazdırıyor: A'nın içinde önce x'i, sonra y artı x'i; A döndükten sonra da y'yi. y beş ve A'ya y veriliyor. Her yöntem için çıktıyı birlikte bulalım.",
    "Değer ile çağırma: x, y'nin kopyasıdır; önce beş yazılır. x bir yapılır ama bu yalnızca kopyayı değiştirir; y artı x, beş artı bir, altı. A bitince y hâlâ beştir. Çıktı: beş, altı, beş.",
    "Başvuru ile çağırma, yani Pascal'da var parametresi: x ile y aynı yerdir. Önce beş yazılır. x bir yapılınca y de bir olur; y artı x, bir artı bir, iki. Sonunda y bir. Çıktı: beş, iki, bir.",
    "Değer-sonuç ile çağırma: x, y'nin kopyasıyla başlar; beş yazılır. x bir olur ama y hâlâ beş; y artı x altı. Dönüşte x'in değeri y'ye kopyalanır ve y bir olur. Çıktı: beş, altı, bir.",
    "Sonuç ile çağırma: x'e başlangıçta değer gönderilmez, bu yüzden ilk yazılan değer tanımsızdır. x bir olur; y hâlâ beş, y artı x altı. Dönüşte y bir olur. Çıktı: tanımsız, altı, bir. Bu tür sorularda her adımda hangi değişkenin kopya, hangisinin aynı yer olduğunu sormak yeterlidir.",
  ],
},
];
