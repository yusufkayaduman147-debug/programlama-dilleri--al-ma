const { code } = require("../build/lib");
const { trace } = require("../ch4/h");

// call stack frames, top first: [[name, vars, color, step, hot]]
const stack = (frames) => `<div class="col" style="gap:8px">${frames.map(([n, v, c, s, hot]) => `<div class="r rp" data-s="${s}" ${hot !== undefined ? `data-hot="${hot}"` : ""} style="transform-origin:center"><div class="box anim" style="height:92px;flex-direction:row;justify-content:space-between;padding:0 26px;border-color:var(--${c})"><span style="font-size:28px">${n}</span><span class="mono" style="font-size:28px;color:var(--${c})">${v}</span></div></div>`).join("")}<div style="text-align:center;font-size:22px;color:var(--muted)">↑ çağrı yığını (tepe yukarıda)</div></div>`;

module.exports = [
// ───────── 5.5 Expressions
{
  id: "side-effects", ch: "5.5 İfadeler", chip: "<b>5.5</b> İfadeler ve fonksiyonel yan etkiler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İşlenenlerin sırası <em>neden önemli?</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:720px">
        <p class="lead r" data-s="0" style="font-size:27px">İfadeler: değerleri ve işlemcileri birleştirip <b>yeni değer</b> üreten yapılar. Tasarım soruları: öncelik, birleşmelilik, <b>işlenen sırası</b>, yan etkiler, yükleme, tip karışımı.</p>
        <div class="r" data-s="1">${code("yan_etki.c", ["int fun(int *u) {", "    *u = *u / 2;     // yan etki!", "    return *u;", "}", "", "a = 10;", { t: "b = a + fun(&a);", hot: "2,3" }], { lang: "c", cls: "sm" })}</div>
      </div>
      <div class="col f1">
        <div class="card tint-t r" data-s="2"><h3 class="tl" style="font-size:28px">Önce a okunursa</h3><div class="mono" style="font-size:34px;margin-top:8px">10 + 5 = <b>15</b></div></div>
        <div class="card tint-c r" data-s="3"><h3 class="cl" style="font-size:28px">Önce fun(&amp;a) çağrılırsa</h3><div class="mono" style="font-size:34px;margin-top:8px">5 + 5 = <b>10</b></div></div>
        <div class="note r" data-s="4" style="font-size:24px"><b>Çözümler:</b> fonksiyonlarda yan etkiyi yasakla (pratik değil) ya da işlenen sırasını sabitle (optimizasyonu kısıtlar). <b>Java</b>: soldan sağa → sonuç hep 15.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.5: İfadeler. İfadeler, değerleri ve işlemcileri birleştirerek yeni değerler üreten yapılardır. Aritmetik ifadelerin tasarımında öncelik ve birleşmeliliğin yanı sıra bir soru daha vardır: işlenenler hangi sırayla değerlendirilir? Bunun önemini fonksiyonel yan etkiler gösterir.",
    "Bir fonksiyon, parametresini ya da yerel olmayan bir değişkeni değiştiriyorsa yan etkisi vardır. Bu fun fonksiyonu, kendisine verilen adresteki değeri yarıya indiriyor. a 10 iken b eşittir a artı fun ve a ifadesini düşünelim.",
    "Derleyici önce a'yı okursa, a'nın değeri 10'dur; ardından fun çağrılır, a'yı 5 yapar ve 5 döndürür. Sonuç 15.",
    "Ama derleyici önce fun'ı çağırırsa, a önce 5 olur, sonra okunur. Sonuç 10! Aynı ifade, derleyiciye göre farklı sonuç veriyor.",
    "İki çözüm var: fonksiyonların parametrelerini ve global değişkenleri değiştirmesini yasaklamak; ama fonksiyonlar bazen birden çok değer döndürmek zorunda olduğu için bu pratik değil. Ya da işlenenlerin sırasını dil tanımında sabitlemek; bu da bazı derleyici optimizasyonlarını kısıtlar. Java ikinci yolu seçmiştir: işlenenler her zaman soldan sağa değerlendirilir, bu yüzden sonuç her zaman 15'tir.",
  ],
},
{
  id: "short-circuit", ch: "5.5 İfadeler", chip: "<b>5.5</b> İlişkisel, mantıksal ifadeler ve kısa devre",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Mantıksal ifadeler ve <em>kısa devre</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:700px">
        <div class="card r" data-s="0"><h3>C'nin tuhaf bir ifadesi</h3><div class="mono" style="font-size:40px;margin:10px 0">a &lt; b &lt; c</div><p style="font-size:24px">C'de Boolean tipi yok (0 = yanlış). Önce <span class="mono">a &lt; b</span> → 0 veya 1; sonra <b>bu sayı</b> c ile karşılaştırılır! <span class="mono">5 &lt; 3 &lt; 2</span> → <span class="mono">0 &lt; 2</span> → <b class="cl">doğru</b> ?!</p></div>
        <div class="card r" data-s="1"><h3>Kısa devre değerlendirme</h3><p style="font-size:24px">Sonuç belli olunca gerisi hesaplanmaz: <span class="mono">(13 * a) * (b / 13 - 1)</span> → a = 0 ise sağ taraf gereksiz.</p></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("ara.c", ["index = 0;", { t: "while (index < length &&", hot: "3" }, { t: "       LIST[index] != value)", hot: "3" }, "    index++;"], { lang: "c", cls: "sm" })}</div>
        <div class="note r" data-s="3" style="font-size:24px">index = length olunca sol taraf <b>yanlış</b> → sağ taraf hiç değerlendirilmez → dizi dışına erişim <b>olmaz</b>. Kısa devre olmasa program çökebilirdi.</div>
        <div class="card r" data-s="4" style="padding:20px 24px"><p style="font-size:23px"><b>C, C++, Java:</b> <span class="mono">&amp;&amp; ||</span> kısa devre, <span class="mono">&amp; |</span> değil · <b>Ada:</b> <span class="mono">and then</span>, <span class="mono">or else</span><br><b>Risk:</b> <span class="mono">(a &gt; b) || (b++ / 3)</span> → a &gt; b ise b hiç artmaz!</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "İlişkisel ve mantıksal ifadelere geçelim. C'de ayrı bir Boolean tipi yoktur; sıfır yanlış, diğer değerler doğru kabul edilir. Bu, a küçüktür b küçüktür c gibi tuhaf ama geçerli bir ifadeye yol açar: önce a küçüktür b hesaplanır ve sonuç 0 ya da 1 olur; sonra bu sayı c ile karşılaştırılır. Yani 5 küçüktür 3 küçüktür 2 ifadesi, 0 küçüktür 2'ye döner ve doğru çıkar!",
    "Kısa devre değerlendirme ise, sonuç belli olduğunda ifadenin geri kalanını hesaplamamaktır. Örneğin bir çarpımda a sıfırsa, diğer çarpanı hesaplamaya gerek yoktur.",
    "Kısa devrenin önemli olduğu klasik bir örnek: bir dizide değer arayan bu döngü. Koşul, index length'ten küçük ve dizinin index'inci elemanı aranan değere eşit değilse.",
    "index length'e ulaştığında sol taraf yanlış olur ve kısa devre sayesinde sağ taraf hiç değerlendirilmez. Böylece dizinin dışına erişilmez. Kısa devre olmasaydı bu kod, dizinin sonundan sonraki elemana erişip çökebilirdi.",
    "C, C++ ve Java'da ve ile veya işlemcileri kısa devre yapar, ama bit düzeyindeki tek karakterli versiyonları yapmaz. Ada'da programcı and then ve or else ile kısa devreyi açıkça seçer. Dikkat: kısa devre yan etkileri gizleyebilir. a büyüktür b veya b artı artı bölü 3 ifadesinde, a b'den büyükse b hiç artırılmaz.",
  ],
},
{
  id: "assign-forms", ch: "5.5 İfadeler", chip: "<b>5.5</b> Atama biçimleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Atamanın <em>biçimleri</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="f1 r" data-s="0">${trace([{ h: "Deyim", color: "amber" }, { h: "Anlamı", color: "text" }],
        [[["sum = ++count", "count = count+1; sum = count"], 1], [["sum = count++", "sum = count; count = count+1"], 1], [["puan += 500", "puan = puan + 500"], 2], [["-count++", "-(count++)  sağdan sola"], 2], [["F ? c1 : c2 = 0", "F doğruysa c1 = 0, değilse c2 = 0"], 3], [["while ((ch = getchar()) != EOF)", "atama bir değer döndürür"], 3]], { fs: 25, hotLast: false })}</div>
      <div class="col" style="width:560px">
        <div class="card r" data-s="4"><h3 style="font-size:28px">Çoklu atama (Perl, Ruby, Lua)</h3><div class="mono" style="font-size:24px;line-height:1.7;margin-top:8px">($a, $b, $c) = (20, 30, 40);<br><span class="hl">($a, $b) = ($b, $a);</span> <span class="cm"># takas!</span></div></div>
        <div class="card r" data-s="5"><h3 style="font-size:28px">Fonksiyonel dillerde</h3><div class="mono" style="font-size:26px;margin-top:8px">val fruit = apples + oranges;</div><p style="font-size:23px;margin-top:8px">ML'de isim bir <b>değere</b> bağlanır; yeniden atanamaz.</p></div>
        <div class="card r" data-s="6" style="padding:18px 24px"><p style="font-size:23px"><b>Karışık tipler:</b> C, C++, Fortran her sayısal tipi atar · Java, C# yalnızca <b>genişletici</b> · Ada hiç örtük dönüşüm yapmaz</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Atamanın farklı biçimlerine toplu bakalım.",
    "sum eşittir artı artı count: önce count artırılır, sonra sum'a atanır. sum eşittir count artı artı: önce sum'a atanır, sonra count artırılır.",
    "Birleşik atama, puan artı eşittir 500, puan eşittir puan artı 500 demektir; ALGOL'de tanımlanıp C tabanlı dillere geçmiştir. Eksi count artı artı ise sağdan sola değerlendirilir: önce count artırılır, sonra negatifi alınır.",
    "Koşullu hedefte, F doğruysa c1'e, değilse c2'ye sıfır atanır. Ve C tabanlı dillerde atama bir değer döndürdüğü için, while döngüsünün koşulunda karakteri okuyup aynı anda dosya sonuyla karşılaştırabilirsiniz.",
    "Perl, Ruby ve Lua çoklu atamaya izin verir: birden çok değişkene aynı anda değer atanabilir. Hatta iki değişkenin yerini tek satırda değiştirebilirsiniz.",
    "Fonksiyonel dillerde ise tanıtıcılar sadece değerlerin adıdır. ML'de val ile bir isim bir değere bağlanır ve bu isim bir daha değiştirilemez.",
    "Son olarak karışık tipli atamalar: C, C++ ve Fortran her sayısal değeri her sayısal değişkene atar ve gerekli dönüşümü yapar. Java ve C# yalnızca int'ten double'a gibi genişletici dönüşümlere izin verir. Ada ise atamada hiçbir örtük dönüşüm yapmaz.",
  ],
},
// ───────── 5.7 Binding
{
  id: "binding-times", ch: "5.7 Bağlama", chip: "<b>5.7</b> Bağlama ve bağlama zamanı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bağlama: bir varlık ile bir <em>özellik</em> arasındaki ilişki</h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="col" style="width:520px">
        <div class="r" data-s="0">${code("hesap.c", ["int hesap;", "…", "hesap = hesap + 10;"], { lang: "c" })}</div>
        <div class="col r" data-s="1" style="gap:10px">
          ${[["Dil tasarımı", "teal", "statik"], ["Dil gerçekleştirimi", "teal", "statik"], ["Derleme", "violet", "statik"], ["Çalışma", "coral", "dinamik"]].map(([a, c, k]) => `<div class="box" style="height:62px;flex-direction:row;justify-content:space-between;padding:0 22px;border-color:var(--${c})"><span style="font-size:24px">${a} zamanı</span><span style="font-size:20px;color:var(--${c})">${k}</span></div>`).join("")}
        </div>
      </div>
      <div class="f1">${trace([{ h: "Bağlanan özellik", color: "text" }, { h: "Ne zaman?", color: "amber" }],
        [[["* sembolünün çarpma olması", "dil tasarımı"], 2], [["hesap için olası tipler", "dil tasarımı"], 2], [["int'in alabileceği değerler", "gerçekleştirim (derleyici)"], 3], [["10 sabitinin iç gösterimi", "gerçekleştirim (derleyici)"], 3], [["hesap değişkeninin tipi", "derleme"], 4], [["+ işlemcisinin bu deyimdeki anlamı", "derleme"], 4], [["hesap'ın değeri", "çalışma"], 5]], { fs: 24 })}
        <p class="r" data-s="5" style="font-size:24px;color:var(--muted);margin-top:14px">Çalışmadan <b style="color:var(--teal)">önce</b> olan ve değişmeyen → <b>statik</b> · çalışma <b style="color:var(--coral)">sırasında</b> olan veya değişen → <b>dinamik</b></p></div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.7: Bağlama. Bir program elemanı ile bir özellik arasında ilişki kurulmasına bağlama denir; örneğin bir değişken ile tipi, ya da bir sembol ile bir işlem arasında. Bu deyime bakalım: int hesap, sonra hesap eşittir hesap artı 10.",
    "Bağlamalar farklı zamanlarda olabilir: dil tasarım zamanında, dilin gerçekleştirildiği, yani derleyicinin yazıldığı zamanda, programın derlendiği zamanda ve çalıştığı zamanda.",
    "Yıldız sembolünün çarpma anlamına gelmesi ve hesap için olası tiplerin neler olduğu dil tasarlanırken belirlenir.",
    "int tipinin alabileceği değerlerin aralığı ve 10 sabitinin bellekteki iç gösterimi ise derleyici yazılırken belirlenir.",
    "hesap değişkeninin int olması ve artı işlemcisinin bu deyimde tam sayı toplaması anlamına gelmesi derleme sırasında bağlanır.",
    "hesap'ın değeri ise ancak program çalışırken belirlenir ve çalışma boyunca defalarca değişebilir. Çalışmadan önce gerçekleşen ve çalışma boyunca değişmeyen bağlamalara statik, çalışma sırasında gerçekleşen ya da değişebilen bağlamalara dinamik bağlama denir.",
  ],
},
{
  id: "type-binding", ch: "5.7 Bağlama", chip: "<b>5.7.2</b> Tip bağlama",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Tip ne zaman ve nasıl <em>bağlanır?</em></h2>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="col">
        <div class="card tint-t r" data-s="0"><h3 class="tl">Statik tip bağlama</h3><p style="font-size:24px">Derleme zamanında, değişmez. Tip hataları <b>çalışmadan önce</b> yakalanır. Fortran, Pascal, C, C++</p></div>
        <div class="card r" data-s="1" style="padding:20px 24px"><h3 style="font-size:27px">Açık (explicit) bildirim</h3><div class="mono" style="font-size:26px">int sayac;</div></div>
        <div class="card r" data-s="2" style="padding:20px 24px"><h3 style="font-size:27px">Örtük (implicit) bildirim</h3><p style="font-size:23px">Varsayılan kural: Fortran'da <span class="mono">I–N</span> ile başlayan isim → integer, diğerleri → real. Yazım hatası yeni değişken yaratır → <b class="cl">güvenilirlik ↓</b></p></div>
        <div class="card r" data-s="3" style="padding:20px 24px"><h3 style="font-size:27px">Tip çıkarımı (inference)</h3><div class="mono" style="font-size:24px">var sum = 0;  var name = "Ali";</div><p style="font-size:22px">C#, ML, Haskell, F#: tip, ilk değerden çıkarılır.</p></div>
      </div>
      <div class="col">
        <div class="card tint-c r" data-s="4"><h3 class="cl">Dinamik tip bağlama</h3><p style="font-size:24px">Tip, atanan <b>değerle</b> çalışma zamanında belirlenir ve değişebilir.</p>
          <div class="mono" style="font-size:28px;line-height:1.7;margin-top:10px">list = [10.2, 3.5];  <span class="cm">// dizi</span><br>list = 47;           <span class="cm">// artık sayı</span></div>
          <div class="pills"><span class="pill c">JavaScript</span><span class="pill c">Python</span><span class="pill c">Ruby</span><span class="pill c">PHP</span><span class="pill c">LISP</span><span class="pill c">APL</span></div></div>
        <div class="grid2 r" data-s="5" style="gap:16px">
          <div class="card" style="padding:18px 22px"><h3 class="tl" style="font-size:26px">✓ Esneklik</h3><p style="font-size:22px">Tek bir sıralama programı her tip veriyi sıralayabilir.</p></div>
          <div class="card" style="padding:18px 22px"><h3 class="cl" style="font-size:26px">✕ Maliyet</h3><p style="font-size:22px">Hata yakalama zayıf, çalışma zamanı kontrolü pahalı → genelde yorumlanır.</p></div></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.7.2: Tip bağlama. Statik tip bağlamada değişkenin tipi derleme zamanında belirlenir ve çalışma boyunca değişmez. Bu sayede derleyici tip hatalarını program çalışmadan önce yakalar. Fortran, Pascal, C ve C++ böyledir.",
    "Statik tip iki şekilde bağlanabilir. Açık bildirimde, int sayac gibi bir tanımlama deyimiyle tip belirtilir.",
    "Örtük bildirimde ise tanımlama yoktur; tip varsayılan kurallarla belirlenir. Örneğin Fortran'da I'den N'ye kadar harflerle başlayan isimler tam sayı, diğerleri reel kabul edilir. Yazması kolaydır ama tehlikelidir: bir değişken adını yanlış yazarsanız derleyici hata vermez, yeni bir değişken yaratır. Bu güvenilirliği azaltır.",
    "Bazı diller tip çıkarımı yapar: C#'ta var sum eşittir 0 yazdığınızda, tip ilk değerden int olarak çıkarılır. ML, Haskell ve F# da tip çıkarımı kullanır; bu yazılabilirliği artırır.",
    "Dinamik tip bağlamada ise tip, değişkene atanan değerle çalışma zamanında belirlenir ve değişebilir. JavaScript'te list önce bir dizi olabilir, sonra 47 atanınca bir sayı olur. Python, Ruby, PHP, LISP ve APL de dinamik tiplidir.",
    "Avantajı esnekliktir: örneğin tek bir sıralama programı her tipte veriyi sıralayabilir. Dezavantajı ise derleyicinin tip hatalarını yakalayamaması ve çalışma zamanındaki tip kontrolünün pahalı olmasıdır. Bu yüzden dinamik tipli diller genellikle yorumlanır.",
  ],
},
{
  id: "storage-binding", ch: "5.7 Bağlama", chip: "<b>5.7.3</b> Bellek bağlama ve yaşam süresi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bellek bağlama ve <em>yaşam süresi</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:520px;gap:6px">
        ${[["Derlenmiş kod", "", "text", 1], ["Statik / global değişkenler", "doğrudan adres", "teal", 1], ["Yığıt (stack) ↓", "her çağrı için etkinlik kaydı", "violet", 2], ["boş alan", "", "faint", 2], ["Yığın (heap) ↑", "dinamik bellek: new, malloc", "amber", 3]].map(([a, b, c, s], i) => `<div class="box r" data-s="${s}" style="height:${i === 3 ? 90 : 110}px;${c === "faint" ? "border-style:dashed;color:var(--faint);background:transparent" : `border-color:var(--${c})`}">${a}<span style="font-size:20px;color:var(--muted);font-weight:400">${b}</span></div>`).join("")}
        <div class="r" data-s="1" style="text-align:center;font-size:22px;color:var(--muted)">çalışan programın bellek düzeni</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="0" style="padding:22px 28px"><p style="font-size:25px"><b>Allocation:</b> değişkene boş bir hücre bağlamak · <b>Deallocation:</b> hücreyi geri vermek<br><b>Yaşam süresi</b> = bu ikisi arasındaki süre</p></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:28px">Yığıt (stack)</h3><p style="font-size:24px">Bir alt program çağrılınca yerel değişkenleri için bir <b>etkinlik kaydı</b> eklenir; dönünce silinir. Özyineleme buna dayanır.</p></div>
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:28px">Yığın (heap)</h3><p style="font-size:24px">Programcı istediğinde ayrılır: C'de <span class="mono">malloc</span>, C++'ta <span class="mono">new</span>. Geri verme: Pascal <span class="mono">dispose</span>, C++ <span class="mono">delete</span>, Java <b>otomatik</b> (çöp toplama).</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.7.3: Bellek bağlama. Bir değişkene boş bellek hücreleri arasından bir hücre bağlanmasına bellek ayırma, hücrenin geri verilmesine ise belleğin serbest bırakılması denir. Bir değişkenin yaşam süresi, bu ikisi arasında geçen süredir.",
    "Bunu anlamak için çalışan bir programın bellek düzenine bakalım. En altta derlenmiş kod, onun üstünde statik ve global değişkenler bulunur; bunlara doğrudan adresle erişilir.",
    "Yığıt bölgesi, alt program çağrıları için kullanılır. Bir alt program çağrıldığında yerel değişkenlerini tutan bir etkinlik kaydı yığıta eklenir; alt program bitince bu kayıt silinir. Özyineleme bu mekanizma sayesinde mümkündür.",
    "Yığın, İngilizcesiyle heap ise dinamik bellek içindir: programcı istediğinde C'de malloc, C++'ta new ile bellek ayrılır. Geri verme Pascal'da dispose, C++'ta delete ile yapılır; Java'da ise bu iş çöp toplayıcı tarafından otomatik yapılır.",
  ],
},
{
  id: "lifetime-kinds", ch: "5.7 Bağlama", chip: "<b>5.7.3.2</b> Yaşam süresine göre değişkenler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dört tür değişken: <em>yaşam süresine göre</em></h2>
    <div class="grid2" style="gap:24px;zoom:1.35">
      ${[["Statik", "teal", "Program başlamadan bağlanır, sonuna kadar kalır.", "static int sayac;  // C", "Hızlı, doğrudan adres, geçmişe duyarlı", "Özyineleme yok", 1],
         ["Yığıt-dinamik", "violet", "Tanım deyimi çalışınca yığıtta yer alır; blok bitince gider.", "void f() { int x; }", "Özyineleme, bellek tasarrufu", "Ayırma maliyeti, geçmişi unutur", 2],
         ["Açık yığın-dinamik", "amber", "Programcının komutuyla heap'te; sadece işaretçiyle erişilir.", "int *p = new int;  delete p;", "Bağlı liste, ağaç gibi büyüyen yapılar", "Yönetmesi zor, güvenilirlik ↓", 3],
         ["Örtük yığın-dinamik", "coral", "Değer atandıkça heap'e bağlanır; tip bile değişebilir.", "list = [1, 2];  // JavaScript", "En yüksek esneklik", "Yavaş, hata yakalama zayıf", 4]]
        .map(([h, c, p, ex, plus, minus, s]) => `<div class="card r rp" data-s="${s}" style="padding:22px 26px"><h3 style="color:var(--${c});font-size:31px">${h}</h3><p style="font-size:22px">${p}</p>
          <div class="mono" style="font-size:22px;margin:10px 0;color:var(--text)">${ex.replace(/</g, "&lt;")}</div>
          <div style="font-size:21px"><span class="tl">✓ ${plus}</span><br><span class="cl">✕ ${minus}</span></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Değişkenleri bellek bağlamalarına ve yaşam sürelerine göre dört gruba ayırırız.",
    "Statik değişkenler, program çalışmaya başlamadan belleğe bağlanır ve program bitene kadar orada kalır. C'de static ile tanımlanan değişkenler ve Fortran 77'deki bütün değişkenler böyledir. Doğrudan adreslendikleri için hızlıdırlar ve bir alt programın önceki çağrıdan kalan değeri hatırlamasını sağlarlar. Ama yalnızca statik değişkenler olan bir dilde özyineleme yapılamaz.",
    "Yığıt-dinamik değişkenler, tanımlama deyimleri çalıştığında yığıtta yer alır ve tanımlandıkları blok bitince yok olurlar. C ve Java'daki yerel değişkenler böyledir. Özyinelemeye izin verir ve belleği verimli kullanırlar; ama her çağrıda ayırma maliyeti vardır ve alt program önceki çağrıyı hatırlamaz.",
    "Açık yığın-dinamik değişkenler, programcının new ya da malloc komutuyla heap'te oluşturulur ve sadece işaretçiler aracılığıyla erişilir. Bağlı listeler ve ağaçlar gibi çalışma sırasında büyüyüp küçülen yapılar için idealdir; ama yönetmesi zordur ve güvenilirliği düşürür.",
    "Örtük yığın-dinamik değişkenler ise her değer atandığında heap'e bağlanır; tipleri bile değişebilir. APL'de bütün değişkenler, JavaScript ve Perl'de diziler ve metinler böyledir. En yüksek esnekliği sağlarlar, ama her şey çalışma zamanında izlendiği için yavaştırlar ve derleyici hataları yakalayamaz.",
  ],
},
// ───────── 5.8 Scope
{
  id: "static-scope", ch: "5.8 İsim kapsamları", chip: "<b>5.8.1</b> Statik (durağan) kapsam",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Statik kapsam: <em>program metnine</em> bak</h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:760px">
        <div class="r" data-s="0" style="position:relative;padding:22px;border-radius:22px;border:3px solid var(--teal);background:rgba(53,208,192,.05)">
          <div class="mono" style="font-size:24px;color:var(--teal)">program main · <b>var sayac</b></div>
          <div style="margin-top:14px;padding:18px;border-radius:18px;border:3px solid var(--violet);background:rgba(164,147,255,.06)">
            <div class="mono" style="font-size:24px;color:var(--violet)">procedure notHesap · <b class="anim" data-hot="3,4">var sayac</b></div>
            <div style="margin-top:14px;padding:16px;border-radius:16px;border:3px solid var(--amber);background:rgba(255,181,71,.06)">
              <div class="mono" style="font-size:24px;color:var(--amber)">procedure yazdir</div>
              <div class="mono anim" data-hot="1,2" style="font-size:26px;margin-top:10px">writeln(<b>sayac</b>)</div></div></div></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="1" style="padding:20px 26px"><h3 style="font-size:28px">Arama kuralı</h3><ol style="margin:8px 0 0;padding-left:28px;font-size:24px;line-height:1.6;color:var(--muted)"><li class="r" data-s="2">Önce <b>yerel</b> tanımlara bak (yazdir: yok)</li><li class="r" data-s="3">Yoksa <b>statik ebeveyne</b> bak (notHesap: <b class="vl">var!</b>)</li><li class="r" data-s="4">Bulamazsan dışa doğru devam et</li></ol></div>
        <div class="note r" data-s="5" style="font-size:24px">Karar <b>derleme zamanında</b>, sadece metne bakarak verilir. ALGOL 60 tanıttı; Ada, JavaScript, PHP ve C tabanlı diller kullanır.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.8: İsim kapsamları. Bir ismin geçerli olduğu program alanına o ismin kapsamı denir. Bir kapsamda tanımlanan isim oranın yereli, çevreleyen kapsamlardan gelenler ise yerel olmayan isimlerdir. ALGOL 60, statik ya da durağan kapsam denen yöntemi tanıttı. Bu Pascal örneğinde main programının içinde notHesap, onun içinde de yazdir alt programı var.",
    "yazdir, sayac değişkenini yazdırıyor. Ama yazdir'da sayac tanımlı değil. Hangi sayac kastediliyor? Statik kapsamda arama kuralı şöyledir.",
    "Önce yerel tanımlara bakılır: yazdir'da sayac yok.",
    "Sonra statik ebeveyne, yani yazdir'ı metin olarak çevreleyen notHesap'a bakılır: orada sayac tanımlı! O halde yazdir'daki sayac, notHesap'ın sayac'ıdır.",
    "Orada da bulunamasaydı, bir dış kapsama, main'e bakılacaktı. Kısacası arama, en içteki kapsamdan dışa doğru ilerler.",
    "Önemli nokta şu: bu karar programı çalıştırmadan, sadece program metnine bakılarak, derleme zamanında verilir. ALGOL 60'tan sonra Ada, JavaScript, PHP ve C tabanlı diller statik kapsamı benimsedi.",
  ],
},
{
  id: "blocks", ch: "5.8 İsim kapsamları", chip: "<b>5.8.1</b> Bloklar ve gizleme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bloklar: <em>yeni kapsam, gizlenen isimler</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:720px">
        <div class="r" data-s="0">${code("blok.c", ["void sub() {", "    int count;           // dış count", "    …", "    while (…) {", { t: "        int count = 1;   // iç count", hot: "1" }, { t: "        count++;         // hangisi?", hot: "1" }, "    }", "}"], { lang: "c", cls: "sm" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="1" style="padding:22px 26px"><p style="font-size:25px">İç blokta tanımlanan <span class="mono">count</span>, dıştakini <b>gizler</b>. Gizlenen değişken var olmaya devam eder, ama blok içinde <b>görünmez</b>. (Java ve C# bunu yasaklar.)</p></div>
        <div class="card r" data-s="2" style="padding:22px 26px"><h3 style="font-size:27px">Gizleneni yakalamak</h3><div class="mono" style="font-size:25px;line-height:1.7">C++: <span class="hl">::count</span> &nbsp; <span class="hl">Sinif::isim</span><br>Ada: <span class="hl">birim.isim</span><br>Java: <span class="hl">this.myVar1</span></div></div>
        <div class="card r" data-s="3" style="padding:22px 26px"><p style="font-size:24px"><b>Blok yapılı dil:</b> kapsam oluşturan alt programlar iç içe yazılabilir (Pascal, Ada). C'de alt programlar iç içe olamaz, ama <span class="mono">{ }</span> blokları ayrı kapsamdır.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Kapsamlar yalnızca alt programlarla değil, bloklarla da oluşur. Blok, kendi yerel değişkenlerini tanımlayabilen bir deyim grubudur. C'de süslü parantezler bir blok oluşturur.",
    "Bu örnekte sub fonksiyonunda bir count var; while bloğunun içinde de yeni bir count tanımlanıyor. Blok içindeki count artı artı, içteki count'u artırır. İçteki tanım dıştakini gizler; dıştaki count var olmaya devam eder ama blok içinde görünmez. Java ve C# bu tür gizlemeye izin vermez, çünkü hataya açıktır.",
    "Bazı diller gizlenen isme ulaşma yolu sunar: C++'ta iki iki nokta ile sınıf adı veya global kapsam, Ada'da birim adı nokta isim, Java'da ise this nokta değişken adı kullanılır.",
    "Kapsam oluşturan alt programların iç içe yazılabildiği dillere blok yapılı diller denir; Pascal ve Ada böyledir. C'de alt programlar iç içe yazılamaz, ama süslü parantezli bloklar yine de ayrı kapsamlar oluşturur.",
  ],
},
{
  id: "static-scope-eval", ch: "5.8 İsim kapsamları", chip: "<b>5.8.1</b> Statik kapsamın sorunu",
  html: (() => {
    const N = (x, y, t, s) => `<g class="r rp" data-s="${s}" style="transform-box:fill-box;transform-origin:center"><rect x="${x - 70}" y="${y - 30}" width="140" height="60" rx="14" fill="#151a31" stroke="#a493ff" stroke-width="3"/><text x="${x}" y="${y + 10}" fill="#eef0fa" font-size="28" text-anchor="middle" font-family="JBM">${t}</text></g>`;
    const L = (x1, y1, x2, y2, s, c = "#3a4278", dash = "") => `<line class="r rf" data-s="${s}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="3" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Statik kapsam <em>globalleri teşvik eder</em></h2>
    <div class="row" style="flex:1;gap:30px">
      <svg viewBox="0 0 800 520" style="width:820px;height:540px">
        ${L(400, 90, 220, 230, 0)}${L(400, 90, 580, 230, 0)}${L(220, 230, 120, 380, 0)}${L(220, 230, 320, 380, 0)}${L(580, 230, 580, 380, 0)}
        ${N(400, 60, "MAIN", 0)}${N(220, 230, "A", 0)}${N(580, 230, "B", 0)}${N(120, 380, "C", 0)}${N(320, 380, "D", 0)}${N(580, 380, "E", 0)}
        <path class="r rf" data-s="2" d="M370,370 C440,330 470,300 510,262" stroke="#ff7a7a" stroke-width="4" fill="none" stroke-dasharray="10 8"/>
        <text class="r" data-s="2" x="400" y="475" fill="#ff7a7a" font-size="26" text-anchor="middle">D, B'nin verisine erişmeli</text>
      </svg>
      <div class="col f1">
        <div class="card r" data-s="1" style="padding:20px 26px"><p style="font-size:24px">MAIN, A ve B'yi; A, C ve D'yi; B, A ve E'yi çağırıyor. Yuvalama yapısı buna göre kuruldu.</p></div>
        <div class="card r" data-s="2" style="padding:20px 26px"><h3 style="font-size:27px">Şartlar değişti</h3><p style="font-size:24px">Çözüm 1: D'yi B'nin içine taşı → C artık D'yi çağıramaz.<br>Çözüm 2: Veriyi B'den <b>MAIN'e</b> taşı → herkes erişir!</p></div>
        <div class="note r" data-s="3" style="font-size:25px">Sonuç: statik kapsam çoğu zaman <b>gereğinden fazla global değişkene</b> yol açar → güvenilirlik ↓</div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Statik kapsamın bir zayıflığı var. MAIN'in içinde A ve B, A'nın içinde C ve D, B'nin içinde de E tanımlı olsun.",
    "MAIN, A ve B'yi; A, C ve D'yi; B ise A ve E'yi çağırıyor. Program yapısı bu çağrı ilişkilerine göre kuruldu.",
    "Şimdi şartlar değişsin: D'nin, B'deki bir veriye erişmesi gereksin. Bir çözüm, D'yi B'nin içine taşımak; ama o zaman C, D'yi artık çağıramaz ve D, A'nın değişkenlerine erişemez. Diğer çözüm, veriyi B'den MAIN'e taşımak; ama o zaman bütün alt programlar o veriye erişebilir.",
    "Pratikte genellikle ikinci yol seçilir. Bu yüzden statik kapsam, çoğu zaman gereğinden fazla global değişken kullanılmasına yol açar ve bu da güvenilirliği düşürür.",
  ],
},
{
  id: "dynamic-scope", ch: "5.8 İsim kapsamları", chip: "<b>5.8.2</b> Dinamik kapsam",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dinamik kapsam: <em>çağrı sırasına</em> bak</h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:640px">
        <div class="r" data-s="0">${code("kapsam.pas", ["program MAIN;", "  var a : integer;", "  procedure P1;", { t: "  begin print(a) end;", hot: "3,4" }, "  procedure P2;", "    var a : integer;", "  begin a := 0; P1 end;", "begin", "  a := 7; P2", "end."], { lang: "pascal", cls: "sm" })}</div>
        <p class="r" data-s="0" style="font-size:24px;color:var(--muted)">MAIN → P2 → P1. P1'deki <span class="mono">a</span> hangisi?</p>
      </div>
      <div class="col f1" style="gap:20px">
        <div class="r" data-s="1">${stack([["P1", "a = ?", "amber", 1, "3,4"], ["P2", "a = 0", "violet", 1, "4"], ["MAIN", "a = 7", "teal", 1, "3"]])}</div>
        <div class="grid2" style="gap:18px">
          <div class="card tint-t r" data-s="3" style="padding:18px 22px"><h3 class="tl" style="font-size:26px">Statik</h3><p style="font-size:22px">P1'i metinde çevreleyen: MAIN</p><div class="mono" style="font-size:44px;color:var(--teal)">7</div></div>
          <div class="card tint-v r" data-s="4" style="padding:18px 22px"><h3 class="vl" style="font-size:26px">Dinamik</h3><p style="font-size:22px">P1'i çağıran: P2</p><div class="mono" style="font-size:44px;color:var(--violet)">0</div></div>
        </div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.8.2: Dinamik kapsam. Dinamik kapsamda bir ismin kapsamı, alt programların program metnindeki yerine göre değil, çağrılma sırasına göre ve çalışma zamanında belirlenir. Bu Pascal benzeri programda MAIN'de bir a var ve 7 yapılıyor. P2'nin de kendi a'sı var ve 0 yapılıyor. P2, P1'i çağırıyor; P1 de a'yı yazdırıyor.",
    "Program çalışırken çağrı yığını şöyle oluşur: MAIN, P2'yi; P2 de P1'i çağırır. P1'de a tanımlı değil. Peki hangi a yazdırılacak?",
    "Kural farkına bakalım.",
    "Statik kapsamda, P1'i metin olarak çevreleyen kapsama, yani MAIN'e bakılır. Çıktı 7 olur.",
    "Dinamik kapsamda ise yığında geriye doğru, P1'i çağıran alt programa bakılır: P2. P2'nin a'sı 0 olduğu için çıktı 0 olur. Aynı program, kapsam kuralına göre farklı sonuç veriyor. APL, SNOBOL4 ve LISP'in ilk sürümleri dinamik kapsam kullanırdı; Perl ve Common LISP ikisini de destekler.",
  ],
},
{
  id: "scope-compare", ch: "5.8 İsim kapsamları", chip: "<b>5.8</b> Statik ve dinamik kapsam",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Statik mi, <em>dinamik mi?</em></h2>
    <div class="grid2" style="gap:30px;zoom:1.15">
      <div class="card tint-t r" data-s="1"><h3 class="tl">Statik kapsam</h3><ul class="b t" style="margin-top:8px"><li style="font-size:26px">Program <b>metnine</b> göre, derleme zamanında</li><li style="font-size:26px">Okunabilir; tip kontrolü kolay</li><li style="font-size:26px">Sorun: gereğinden fazla global değişken</li><li style="font-size:26px">ALGOL 60 sonrası dillerin çoğu</li></ul></div>
      <div class="card tint-v r" data-s="2"><h3 class="vl">Dinamik kapsam</h3><ul class="b v" style="margin-top:8px"><li style="font-size:26px">Çağrı <b>sırasına</b> göre, çalışma zamanında</li><li style="font-size:26px">Avantaj: elverişli — parametre geçirmeden erişim</li><li style="font-size:26px">Aynı başvuru her çalışmada farklı değişkeni gösterebilir</li><li style="font-size:26px">Korumak zor, tip kontrolü zor, okuması zor, yerel olmayana erişim yavaş</li></ul></div>
    </div>
    <div class="note r" data-s="3" style="margin-top:24px;font-size:26px"><b>Referans çevresi:</b> bir deyimde görünen bütün isimler. Statik dilde: yereller + çevreleyen kapsamlar. Dinamik dilde: yereller + <b>tüm aktif alt programlar</b>.</div>
  </div>`,
  n: [
    "İki yaklaşımı karşılaştıralım.",
    "Statik kapsam, program metnine göre derleme zamanında belirlenir. Program okunabilir ve tip kontrolü kolaydır. Tek önemli sorunu, gereğinden fazla global değişkene yol açmasıdır. ALGOL 60'tan sonraki dillerin çoğu statik kapsam kullanır.",
    "Dinamik kapsam ise çağrı sırasına göre çalışma zamanında belirlenir. Avantajı elverişliliktir: çağrılan alt program, çağıranın değişkenlerine parametre geçirmeden erişebilir. Ama dezavantajları ağırdır: aynı değişken başvurusu, her çalışmada farklı bir değişkeni gösterebilir; değişkenleri beklenmedik değişikliklerden korumak, tip kontrolü yapmak ve programı okumak çok zordur; yerel olmayan değişkenlere erişim de yavaştır.",
    "Bu bağlamda bir terim daha: bir deyimin referans çevresi, o deyimde görünür olan bütün isimlerdir. Statik kapsamlı bir dilde bu, yerel değişkenler ve çevreleyen kapsamlardaki görünür değişkenlerdir. Dinamik kapsamlı bir dilde ise yerel değişkenler ve o an aktif olan bütün alt programlardaki görünür değişkenlerdir.",
  ],
},
// ───────── 5.9 Type checking
{
  id: "type-checking", ch: "5.9 Tip kontrolü", chip: "<b>5.9</b> Tip kontrolü ve kesin tipleme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Tip kontrolü ve <em>kesin tipleme</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="0" style="padding:22px 26px"><p style="font-size:25px"><b>Tip kontrolü:</b> işlenenlerin işlemciye uygunluğunun denetlenmesi. Geniş anlamda: alt program ↔ parametreler, atama ↔ değişken ve ifade.</p></div>
        <div class="grid2 r" data-s="1" style="gap:16px">${code("uygun", ["int i; float f;", "f = 3.14 * i;  ✓"], { lang: "c", cls: "xs" })}${code("tip hatası", ["int *ip; float f;", "f = 3.14 * ip; ✕"], { lang: "c", cls: "xs" })}</div>
        <p class="r" data-s="1" style="font-size:23px;color:var(--muted)">Uygun tipli işlenen: ya doğrudan uyar ya da <b>örtük dönüşümle</b> (coercion) uygun tipe çevrilir.</p>
        <div class="note r" data-s="2" style="font-size:24px">Tip bağlama statikse kontrol de statik olabilir; dinamikse kontrol <b>dinamik</b> olmak zorundadır.</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3"><h3>Kesin tiplenmiş (strongly typed)</h3><p style="font-size:24px">Dil, <b>bütün</b> tip hatalarını fark ediyorsa.</p></div>
        <div class="r" data-s="4">${trace([{ h: "Dil", color: "text" }, { h: "Kesin tipli mi?", color: "amber" }],
          [[["Fortran 77", "hayır (EQUIVALENCE)"], 4], [["C, C++", "hayır (union, parametreler)"], 4], [["Ada", "neredeyse"], 4], [["Java, C#", "neredeyse"], 4]], { fs: 24, hotLast: false })}</div>
        <p class="r" data-s="5" style="font-size:23px;color:var(--muted)">Örtük dönüşüm kuralları kesin tiplemeyi <b>zayıflatır</b>: Java'da int + float → int sessizce float olur.</p>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.9: Tip kontrolü. Tip kontrolü, işlenenlerin işlemciye uygun olup olmadığının denetlenmesidir. Kavramı genişletirsek, alt programlar birer işlemci, parametreleri birer işlenen; atamalar birer işlemci, değişken ve ifade de işlenenler olarak düşünülebilir.",
    "Uygun tipli bir işlenen, ya işlemciye doğrudan uyar ya da dilin kurallarına göre örtük olarak, yani coercion ile uygun tipe çevrilebilir. 3.14 çarpı i'de int, float'a çevrilir. Ama bir işaretçiyi bir sayıyla çarpmak tip hatasıdır.",
    "Tip bağlama statikse tip kontrolü de derleme zamanında yapılabilir. Tip bağlama dinamikse, tip kontrolü de çalışma zamanında yapılmak zorundadır.",
    "Bir dil, bütün tip hatalarını fark edebiliyorsa ona kesin tiplenmiş dil denir. Bunun avantajı, değişkenlerin yanlış kullanımını ve bundan doğan hatalı sonuçları engellemesidir.",
    "Peki hangi diller kesin tiplidir? Fortran 77 değildir, çünkü EQUIVALENCE ile aynı bellek farklı tiplerle görülebilir. C ve C++ değildir: union'lar kontrol edilmez ve parametre kontrolü atlatılabilir. Ada neredeyse kesin tiplidir; Java ve C# da benzerdir.",
    "Örtük dönüşüm kuralları kesin tiplemeyi zayıflatır. Örneğin Java'da bir int ile bir float toplandığında int sessizce float'a çevrilir; yanlışlıkla yapılan bir karışım hata olarak yakalanmaz.",
  ],
},
{
  id: "type-compat", ch: "5.9 Tip kontrolü", chip: "<b>5.9.2</b> Tip uyumluluğu",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İki tip ne zaman <em>uyumludur?</em></h2>
    <div class="grid2" style="gap:30px;zoom:1.12">
      <div class="card r" data-s="1" style="display:flex;flex-direction:column"><h3 class="tl">İsim uyumluluğu</h3><p style="font-size:24px">Aynı tanımlamada ya da <b>aynı tip adıyla</b> tanımlanmışlarsa. Kolay ama kısıtlayıcı.</p>
        <div style="margin-top:14px">${code("ada", ["type indextype is 1..100;", "count : integer;", "index : indextype;", "-- count ve index UYUMSUZ"], { lang: "plain", cls: "xs" })}</div>
        <p style="font-size:22px;margin-top:10px">C++ isim uyumluluğu kullanır.</p></div>
      <div class="card r" data-s="2" style="display:flex;flex-direction:column"><h3 class="vl">Yapısal uyumluluk</h3><p style="font-size:24px">Yapıları aynıysa uyumlu. Esnek ama gerçekleştirmesi zor. Sorular:</p>
        <ul class="b v" style="margin-top:8px"><li style="font-size:23px">Alan adları farklı iki kayıt?</li><li style="font-size:23px"><span class="mono">[1..10]</span> ile <span class="mono">[0..9]</span> dizileri?</li><li style="font-size:23px">Aynı yapıda farklı anlam: <b>mph</b> ve <b>km/h</b>, ikisi de float!</li></ul>
        <div style="margin-top:auto">${code("ada çözümü", ["type mph  is new float;", "type kmph is new float;  -- karışmaz"], { lang: "plain", cls: "xs" })}</div></div>
    </div>
    <p class="r" data-s="3" style="font-size:24px;color:var(--muted);margin-top:18px"><b style="color:var(--text)">C:</b> struct ve union dışında yapısal · <b style="color:var(--text)">Pascal:</b> çoğunlukla yapısal · <b style="color:var(--text)">Ada:</b> isim (türetilmiş tipler ayrı)</p>
  </div>`,
  n: [
    "Bölüm 5.9.2: Tip uyumluluğu. İki değişkenin tipi ne zaman uyumlu sayılır? İki yaklaşım vardır.",
    "İsim uyumluluğunda iki değişken, aynı tanımlamada ya da aynı tip adıyla tanımlanmışlarsa uyumludur. Uygulaması kolaydır ama kısıtlayıcıdır: Ada'da 1 ile 100 arasında tanımlanan indextype ile integer, ikisi de tam sayı olmasına rağmen uyumsuzdur. C++ isim uyumluluğu kullanır.",
    "Yapısal uyumlulukta ise yapıları aynı olan tipler uyumludur. Daha esnektir ama gerçekleştirmesi zordur ve zor sorular doğurur: alan adları farklı ama yapısı aynı iki kayıt uyumlu mu? 1'den 10'a ve 0'dan 9'a indisli iki dizi aynı mı? Daha da önemlisi: saatte mil ve saatte kilometre cinsinden iki hız, ikisi de float olduğu için uyumlu sayılır ve yanlışlıkla toplanabilir. Ada bunu türetilmiş tiplerle çözer: mph ve kmph, float'tan türetilmiş iki ayrı tiptir ve birbirine karışmaz.",
    "Dillere bakarsak: C, struct ve union dışındaki tipler için yapısal uyumluluk kullanır; Pascal çoğunlukla yapısal; Ada ise isim uyumluluğu kullanır.",
  ],
},
{
  id: "scope-lifetime", ch: "5.10 Kapsam ve ömür", chip: "<b>5.10</b> Kapsam ≠ ömür",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kapsam ve ömür <em>farklı şeylerdir</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="f1 r" data-s="0">${code("sayac.c", ["int say() {", { t: "    static int n = 0;   // kapsam: sadece say()", hot: "1" }, { t: "    return ++n;         // ömür: program boyunca", hot: "1" }, "}", "", "say(); say(); say();  // 1, 2, 3"], { lang: "c" })}</div>
      <div class="col" style="width:620px">
        <div class="grid2 r" data-s="1" style="gap:16px"><div class="card" style="padding:20px 22px"><h3 class="tl" style="font-size:28px">Kapsam</h3><p style="font-size:23px">Uzaysal / metinsel: nerede <b>görünür</b>?</p></div><div class="card" style="padding:20px 22px"><h3 class="hl" style="font-size:28px">Ömür</h3><p style="font-size:23px">Zamansal: bellekte <b>ne zaman</b> var?</p></div></div>
        <div class="note r" data-s="2" style="font-size:25px"><span class="mono">n</span> sadece <span class="mono">say()</span> içinde görünür, ama değerini çağrılar arasında korur: değişken <b>görünmüyor ama yaşıyor</b>.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 5.10: Kapsam ve ömür. Bu iki kavram çoğu zaman birlikte düşünülür, ama farklıdırlar. C'deki bir static yerel değişkene bakalım.",
    "n'nin kapsamı yalnızca say fonksiyonudur; başka hiçbir yerden görünmez. Ama static olduğu için ömrü programın tamamıdır. say'i üç kez çağırırsanız 1, 2 ve 3 döner; değer çağrılar arasında korunur.",
    "Kapsam uzaysal, yani metinsel bir kavramdır: değişken nerede görünür? Ömür ise zamansal bir kavramdır: değişken bellekte ne zaman vardır? Bu örnekte say'in dışındayken n görünmüyor, ama yaşamaya devam ediyor.",
  ],
},
// ───────── summary / quiz / outro
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="flex:1">
      ${[["📦", "t", "Değişken", "İsim, adres, değer, tip, ömür, kapsam. Takma adlar okunabilirliği bozar."], ["⚙️", "a", "İşlemci ve ifade", "Öncelik, birleşmelilik, işlenen sırası, yan etki, kısa devre."],
         ["🔗", "v", "Bağlama", "Tasarım, gerçekleştirim, derleme (statik) ya da çalışma (dinamik) zamanında. Tip ve bellek bağlama."], ["🔭", "c", "Kapsam ve tip", "Statik kapsam metne, dinamik kapsam çağrı sırasına bakar. Kesin tipleme, isim ve yapısal uyumluluk."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "Bir değişken altı özellikle tanımlanır: isim, adres, değer, tip, ömür ve kapsam. Aynı adrese birden çok isimle erişmek, yani takma adlar, okunabilirliği bozar.",
    "İfadelerde öncelik ve birleşmeliliğin yanında işlenenlerin değerlendirme sırası da önemlidir; yan etkiler ve kısa devre değerlendirme sonucu değiştirebilir.",
    "Bağlama, bir özelliğin bir program elemanıyla ilişkilendirilmesidir ve dil tasarımı, gerçekleştirim ve derleme zamanında statik olarak ya da çalışma zamanında dinamik olarak yapılabilir. Tip bağlama ve bellek bağlama bunun en önemli örnekleridir.",
    "Statik kapsam program metnine, dinamik kapsam çağrı sırasına bakar. Kesin tipli diller bütün tip hatalarını yakalar; tip uyumluluğu ise isme ya da yapıya göre belirlenebilir.",
  ],
},
{
  id: "quiz", ch: "Özet ve mini test", chip: "Mini test",
  html: (() => {
    const quiz = [["Bir değişkenin l-value'su ve r-value'su nedir?", "l-value adresi, r-value değeridir."], ["a = 10; b = a + fun(&a); fun parametresini yarıya indirip döndürüyorsa Java'da b kaç olur?", "15 — Java işlenenleri soldan sağa değerlendirir."], ["Statik ve dinamik tip bağlamanın temel farkı nedir?", "Statik: derleme zamanında, değişmez. Dinamik: çalışma zamanında, atanan değere göre."], ["MAIN'de a = 7, P2'de a = 0; P2, P1'i çağırıyor ve P1 a'yı yazdırıyor. Dinamik kapsamda çıktı ne?", "0 — P1'i çağıran P2'nin a'sı kullanılır."], ["C'deki static yerel bir değişkenin kapsamı ve ömrü nedir?", "Kapsamı fonksiyonun içi, ömrü programın tamamı."]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kendini <em>test et</em> <span class="emo">🧠</span></h2>
    <div class="stack" style="flex:1">
      ${quiz.map(([q, a], i) => `
      <div class="col r" data-s="${1 + i * 2}" data-h="${3 + i * 2}" style="gap:34px">
        <div class="card" style="padding:44px 50px"><div class="mono" style="color:var(--amber);font-size:28px;margin-bottom:16px">SORU ${i + 1} / ${quiz.length}</div>
          <div style="font-size:46px;font-weight:600;line-height:1.35">${q.replace(/&/g, "&amp;")}</div></div>
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
    { t: "Soru 1. Bir değişkenin l-value'su ve r-value'su nedir?", pause: 3.5 }, "Cevap: l-value değişkenin adresi, r-value ise değeridir.",
    { t: "Soru 2. a 10 iken b eşittir a artı fun ve a. fun, parametresini yarıya indirip döndürüyorsa, Java'da b kaç olur?", pause: 3.5 }, "Cevap: 15. Çünkü Java işlenenleri soldan sağa değerlendirir; önce a'nın değeri olan 10 okunur.",
    { t: "Soru 3. Statik ve dinamik tip bağlamanın temel farkı nedir?", pause: 3.5 }, "Cevap: Statik tip bağlama derleme zamanında yapılır ve değişmez; dinamik tip bağlama çalışma zamanında, atanan değere göre yapılır.",
    { t: "Soru 4. MAIN'de a 7, P2'de a 0. P2, P1'i çağırıyor ve P1 a'yı yazdırıyor. Dinamik kapsamda çıktı ne olur?", pause: 3.5 }, "Cevap: 0. Çünkü P1'i çağıran P2'nin a'sı kullanılır.",
    { t: "Soru 5. C'deki static bir yerel değişkenin kapsamı ve ömrü nedir?", pause: 3.5 }, "Cevap: Kapsamı yalnızca fonksiyonun içi, ömrü ise programın tamamıdır.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 5 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Sıradaki: <b style="color:var(--text)">Bölüm 6 — Veri tipleri</b></div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta · Watt · Scott · Z. Orhan · M. Şahin · T. Yılmaz · Ahmet Yesevi Üniversitesi</div>
  </div>`,
  n: [
    "Bölüm 5'i tamamladık! Bir sonraki bölümde veri tiplerini, yani ilkel tiplerden dizilere, kayıtlara ve işaretçilere kadar dillerin sunduğu tip yapılarını inceleyeceğiz.",
    "Pratik için, statik ve dinamik kapsam örneğini kendi kâğıdınızda çağrı yığınıyla tekrar izleyin. İzlediğiniz için teşekkürler, görüşmek üzere!",
  ],
},
];
