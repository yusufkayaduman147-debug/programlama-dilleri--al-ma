const { code } = require("../build/lib");

// memory box: label above, value inside
const mem = (name, val, c, { s, h, id = "", w = 150, extra = "" } = {}) =>
  `<div class="r" ${s !== undefined ? `data-s="${s}"` : ""} ${h !== undefined ? `data-h="${h}"` : ""} ${id ? `id="${id}"` : ""} style="display:flex;flex-direction:column;align-items:center;gap:6px;${extra}"><span class="mono" style="font-size:24px;color:var(--faint)">${name}</span><div class="mono" style="width:${w}px;height:72px;border:2px solid var(--${c});border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:var(--${c})">${val}</div></div>`;

module.exports = [
// ───────── 6.3.2 records
{
  id: "records", ch: "6.3.2 Kayıtlar", chip: "<b>6.3.2</b> Kayıt (record) tipi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kayıt: <em>heterojen</em> alanlar, isimle erişim</h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:600px">
        <div class="r" data-s="1">${code("cobol", ["01 OGRENCI-KAYDI.", "   02 OGRENCI-ADI.", "      05 ILK    PICTURE IS X(15).", "      05 SOYAD  PICTURE IS X(15).", "   02 OGRENCI-NO  PICTURE IS 99999.", "   02 OGRENCI-ADRES PICTURE IS X(30)."], { lang: "text", cls: "xs" })}</div>
        <div class="r" data-s="1" style="font-size:22px;color:var(--muted)">01, 02, 05: <b style="color:var(--text)">düzey numaraları</b> hiyerarşiyi gösterir. PL/I de böyle.</div>
      </div>
      <div class="col" style="width:520px">
        <div class="r" data-s="2">${code("ada", ["type IsciAdi is record", "   Ilk  : String (1..20);", "   Soy  : String (1..20);", "end record;", "type IsciKaydi is record", "   Ad   : IsciAdi;", "   Ucret: Float;", "end record;"], { lang: "ada", cls: "xs" })}</div>
        <div class="r" data-s="3">${code("c", ["struct ogrenci {", "   int  no;", "   char ad[30];", "   float ort;", "} o;"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:20px 26px"><h3 style="font-size:26px">Alanlara başvuru</h3><div class="mono" style="font-size:22px;line-height:1.7"><span class="tl">o.ad</span>          C, Pascal, Ada<br><span class="hl">AD OF OGRENCI</span>  COBOL<br><span class="vl">with o do …</span>   Pascal</div></div>
        <div class="card r" data-s="5" style="padding:20px 26px"><h3 style="font-size:26px">Dizi mi, kayıt mı?</h3><p style="font-size:21px">Dizi: homojen, indis <b>dinamik</b> → daha yavaş erişim. Kayıt: heterojen, alan adı <b>statik</b> → hızlı erişim.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3.2: Kayıt tipi. Bir sınıftaki öğrencilerin numarasını, adını ve adresini tutmak istediğimizi düşünün. Dizilerle bunun için üç ayrı dizi gerekirdi. Kayıt tipi tam bu ihtiyaç için tasarlandı: kayıt, her elemanı ismiyle ayırt edilen heterojen veri elemanlarının topluluğudur.",
    "Kayıtlar ilk olarak COBOL'da tanıtıldı. COBOL düzey numaraları kullanır: sıfır bir en dıştaki kaydı, sıfır iki onun alanlarını, sıfır beş ise daha içteki alanları gösterir. Böylece kaydın hiyerarşik yapısı ortaya çıkar. PICTURE ifadeleri alanın biçimini belirtir; X on beş, on beş karakterlik bir alan demektir. PL/I de aynı yaklaşımı kullanır.",
    "Diğer diller iç içe kayıtları özyinelemeli tanımlarla kurar. Ada'da önce IsciAdi kaydını tanımlıyoruz, sonra onu IsciKaydi'nın içinde bir alan olarak kullanıyoruz.",
    "C'de kayıtlara yapı, yani struct denir ve Pascal'daki record yapısına benzer. Bir kayıt, bir dizinin elemanı da olabilir. Java'da ise ayrı bir kayıt yapısı yoktur; bu iş sınıflarla yapılır.",
    "Alanlara nasıl başvurulur? Çoğu dil nokta gösterimini kullanır: o nokta ad. COBOL'da ise alan adı, OF kelimesi ve kayıt adı yazılır. Pascal ayrıca with yapısı sunar; with bloğunun içinde kayıt adını tekrar yazmadan alanlara erişebilirsiniz.",
    "Dizilerle kayıtları karşılaştıralım. Dizide elemanlar homojendir ve indis çalışma zamanında hesaplanır; kayıtta alanlar heterojendir ve alan adları derleme zamanında bilinir. Bu yüzden bir kayıt alanına erişim, bir dizi elemanına erişimden daha hızlıdır.",
  ],
},
{
  id: "record-mem", ch: "6.3.2 Kayıtlar", chip: "<b>6.3.2.3–6.3.2.4</b> Kayıt ataması ve bellek düzeni",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kayıtlar bellekte: <em>ofsetler</em></h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:760px;gap:20px">
        <div class="r" data-s="1">${code("c", ["struct kisi {", "   char  bas_harf[2];   // ofset 0", "   int   tc_no;         // ofset 4  (hizalama!)", "   char  evli;          // ofset 8", "};"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="2" style="display:grid;grid-template-columns:repeat(12,60px);gap:4px">
          ${[["bas_harf", 2, "teal"], ["boş", 2, "line"], ["tc_no", 4, "amber"], ["evli", 1, "violet"], ["boş", 3, "line"]].map(([t, n, c]) => `<div class="mono" style="grid-column:span ${n};height:70px;border:2px ${c === "line" ? "dashed" : "solid"} var(--${c});border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--${c === "line" ? "faint" : c})">${t}</div>`).join("")}
          ${Array.from({ length: 12 }, (_, i) => `<div class="mono" style="text-align:center;font-size:17px;color:var(--faint)">${i}</div>`).join("")}
        </div>
        <div class="note r" data-s="3" style="font-size:22px">Alanlar bitişik ve tanım sırasıyla dizilir; derleyici hızlı erişim için <b>hizalama boşlukları</b> ekleyebilir. Alanların boyu farklı olduğundan dizilerdeki erişim formülü kullanılamaz: her alanın <b>sabit ofseti</b> derleme zamanında bilinir.</div>
      </div>
      <div class="col f1">
        <div class="r" data-s="4" style="text-align:center"><div style="border:2px solid var(--violet);border-radius:14px;overflow:hidden;font-size:22px;width:300px;margin:0 auto">${["Kayıt", "İsim", "Tip", "Ofset", "…", "İsim", "Tip", "Ofset", "Adres"].map((t, i) => `<div style="padding:7px;${i ? "border-top:1px solid var(--line)" : "background:rgba(164,147,255,.16);font-weight:700"}">${t}</div>`).join("")}</div><div style="font-size:19px;color:var(--faint);margin-top:6px">derleme zamanı tanımlayıcısı</div></div>
        <div class="card r" data-s="5" style="padding:20px 26px"><h3 style="font-size:26px">Kayıt ataması</h3><p style="font-size:21px">Pascal, C, C#: tipler aynıysa <span class="mono">k1 = k2;</span> tüm alanları kopyalar. COBOL: <span class="mono">MOVE CORRESPONDING</span> aynı isimli alanları kopyalar.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Kayıtlar bellekte nasıl tutulur?",
    "Bu C yapısında iki karakterlik bir baş harf alanı, dört baytlık bir kimlik numarası ve bir karakterlik bir evli alanı var.",
    "Alanlar bellekte bitişik olarak ve tanım sırasına göre yerleşir. Ancak dört baytlık tam sayının dördün katı olan bir adreste başlaması erişimi hızlandırdığı için, derleyici baş harften sonra iki baytlık bir boşluk bırakabilir. Buna hizalama denir. Alanların sırasını değiştirerek bu boşlukları azaltabilirsiniz.",
    "Kayıt alanlarının boyları farklı olduğu için, dizilerdeki eleman çarpı boyut formülü burada işe yaramaz. Bunun yerine her alanın kaydın başlangıcına göre sabit bir ofseti vardır ve bu ofset derleme zamanında bilinir.",
    "Derleyici bu bilgileri bir derleme zamanı tanımlayıcısında tutar: her alan için isim, tip ve ofset. Gerçek adresler derlemede hesaplandığı için bu tanımlayıcıya çalışma zamanında gerek kalmaz.",
    "Kayıtlar üzerinde en yaygın işlem atamadır. Pascal, C ve C#'ta iki taraftaki tipler aynıysa tek bir atama deyimi bütün alanları kopyalar. COBOL'daki MOVE CORRESPONDING ise kaynak kayıttaki alanları, hedef kayıtta aynı isme sahip alanlara kopyalar.",
  ],
},
{
  id: "union", ch: "6.3.3 Bileşim ve küme", chip: "<b>6.3.3–6.3.4</b> Bileşim (union) ve küme tipleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bileşim: <em>aynı bellek, farklı tipler</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:800px;gap:20px">
        <div class="r" data-s="1">${code("paylas.c", ["union paylas { double f; int i; char kr; };", "union paylas bir;", { t: "bir.kr = 'A';", s: 2, hot: "2" }, { t: "bir.f  = 3.14;", s: 3, hot: "3" }, { t: "bir.i  = 2000;   // f artık anlamsız!", s: 4, hot: "4" }], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="1">
          <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px">${Array.from({ length: 8 }, (_, i) => `<div class="mono" style="text-align:center;font-size:18px;color:var(--faint)">${i}</div>`).join("")}</div>
          <div class="stack" style="margin-top:4px">
            <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px">${Array.from({ length: 8 }, () => `<div style="height:70px;border:2px dashed var(--line);border-radius:10px"></div>`).join("")}</div>
            <div class="r" data-s="2" data-h="3" style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px"><div class="mono" style="height:70px;border:2px solid var(--violet);background:rgba(164,147,255,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--violet)">'A'</div></div>
            <div class="r" data-s="3" data-h="4" style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px"><div class="mono" style="grid-column:span 8;height:70px;border:2px solid var(--teal);background:rgba(53,208,192,.12);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--teal)">f = 3.14 (double, 8 bayt)</div></div>
            <div class="r" data-s="4" style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px"><div class="mono" style="grid-column:span 4;height:70px;border:2px solid var(--amber);background:rgba(255,181,71,.14);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--amber)">i = 2000</div><div class="mono" style="grid-column:span 4;height:70px;border:2px solid var(--coral);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--coral)">f'nin kalıntısı</div></div>
          </div>
          <div style="font-size:21px;color:var(--muted);margin-top:8px">Boyut = en geniş üye: <b style="color:var(--text)">8 bayt</b></div></div>
      </div>
      <div class="col f1">
        <div class="card tint-c r" data-s="5" style="padding:20px 26px"><h3 class="cl" style="font-size:27px">Güvensiz</h3><p style="font-size:21px">C, C++, Fortran: tip kontrolü yok; en son hangi üye yazıldı bilinmez. Java ve C# union desteklemez.</p></div>
        <div class="card tint-t r" data-s="6" style="padding:20px 26px"><h3 class="tl" style="font-size:27px">Etiketli bileşim</h3><p style="font-size:21px">Ada, Pascal (değişken kayıt): bir <b>etiket</b> alanı hangi üyenin geçerli olduğunu tutar → tip kontrolü mümkün.</p></div>
        <div class="card r" data-s="7" style="padding:20px 26px"><h3 style="font-size:27px">Küme (set) — Pascal</h3><div class="mono" style="font-size:20px;line-height:1.6">type Renk = set of (kir, yes, mav);<br>if kir in k1 then …</div><p style="font-size:20px;margin-top:4px">Üyelik (in), birleşim, kesişim, fark, eşitlik.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3.3: Bileşim tipi. Bileşim, bir değişkenin programın çalışması sırasında farklı zamanlarda farklı tipte değerler saklayabildiği bir tiptir; kayıt tipinin özel bir hali olarak görülebilir. Bütün üyeler aynı bellek alanını paylaştığı için bellek tasarrufu sağlar.",
    "C'de paylas adlı bir bileşim tanımlayalım: içinde bir double, bir int ve bir char var. Derleyici, en geniş üye olan double'ın sığacağı kadar, yani sekiz bayt yer ayırır.",
    "bir nokta kr'ye A harfini yazdığımızda yalnızca ilk bayt kullanılır.",
    "bir nokta f'ye üç virgül on dört yazdığımızda, sekiz baytın tamamı double değerle dolar ve A harfinin üzerine yazılır.",
    "Ardından bir nokta i'ye iki bin yazarsak ilk dört bayt değişir. Artık f'yi okumaya kalkarsak, yarısı tam sayı, yarısı eski double'ın kalıntısı olan anlamsız bir değer elde ederiz.",
    "İşte bileşimlerin sorunu: C, C++ ve Fortran'da en son hangi üyeye yazıldığını dil izlemez, bu yüzden tip kontrolü yapılamaz ve bileşimler güvensizdir. Güvenliğin önem kazanmasıyla Java ve C# bileşimleri hiç desteklememeyi seçti.",
    "Çözüm etiketli bileşimdir. Ada'da ve Pascal'ın değişken kayıtlarında, bir etiket alanı o anda hangi üyenin geçerli olduğunu tutar; dil bu etiketi kontrol ederek tip güvenliği sağlayabilir. Örneğin bir personel kaydında haftalık ve aylık ödeme alanları, ödeme tipini belirten bir etikete göre seçilebilir.",
    "Kısaca küme tipinden de bahsedelim. Bir küme, sıralı bir tipin değerlerinden oluşan sırasız bir topluluktur. Yaygın imperatif diller arasında yalnızca Pascal kümeyi bir veri tipi olarak sunar. Temel işlem in ile üyelik sınamasıdır; ayrıca birleşim, kesişim, fark ve eşitlik işlemleri vardır.",
  ],
},
// ───────── 6.3.5 pointers
{
  id: "pointers", ch: "6.3.5 İşaretçiler", chip: "<b>6.3.5</b> İşaretçi (pointer) tipi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İşaretçi: değeri bir <em>adres</em> olan değişken</h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:600px;gap:20px">
        <div class="r" data-s="0">${code("ptr.c", [{ t: "int n = 11;", hot: "1" }, { t: "int *q, *r, *h;", hot: "1" }, { t: "q = &n;  r = NULL;", s: 2, hot: "2" }, { t: "h = (int *)malloc(sizeof(int));", s: 3, hot: "3" }, { t: "*h = 33;", s: 4, hot: "4" }, { t: "int m = *h;      // m = 33", s: 5, hot: "5" }], { lang: "c", cls: "sm" })}</div>
        <div class="card r" data-s="1" style="padding:20px 26px"><p style="font-size:22px">Değerleri <b>bellek adresleri</b> ve özel <b>NULL</b> değeri. Boyu, gösterdiği veriden bağımsız (genelde bir kelime).</p></div>
        <div class="note r" data-s="6" style="font-size:22px"><b>&amp;</b> adresini al  ·  <b>*</b> başvuruyu çöz (dereference) — gösterilen değere eriş</div>
      </div>
      <div class="f1" style="position:relative">
        <div style="position:absolute;left:0;top:0;font-size:22px;color:var(--faint)" class="r" data-s="1">stack</div>
        <div style="position:absolute;left:0;top:40px;display:flex;flex-direction:column;gap:22px">
          ${mem("n", "11", "teal", { s: 1 })}
          ${mem("q", "?", "amber", { s: 1, h: 2 })}
          ${mem("r", "?", "violet", { s: 1, h: 2 })}
        </div>
        <div style="position:absolute;left:0;top:40px;display:flex;flex-direction:column;gap:22px">
          <div style="visibility:hidden">${mem("n", "11", "teal")}</div>
          ${mem("q", "&amp;n", "amber", { s: 2 })}
          ${mem("r", "NULL", "violet", { s: 2 })}
          ${mem("h", "•", "coral", { s: 3 })}
        </div>
        <div style="position:absolute;left:470px;top:0;font-size:22px;color:var(--faint)" class="r" data-s="3">heap</div>
        <div style="position:absolute;left:470px;top:430px" class="stack">
          ${mem("isimsiz", "?", "coral", { s: 3, h: 4 })}
          ${mem("isimsiz", "33", "coral", { s: 4 })}
        </div>
        <svg viewBox="0 0 700 600" style="position:absolute;left:0;top:0;width:700px;height:600px;overflow:visible">
          <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#ffb547"/></marker><marker id="ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#ff7a7a"/></marker></defs>
          <path class="r rf" data-s="2" d="M152,234 C240,220 240,110 156,104" stroke="#ffb547" stroke-width="4" fill="none" marker-end="url(#ah)"/>
          <path class="r rf" data-s="3" d="M152,494 C300,494 360,500 466,500" stroke="#ff7a7a" stroke-width="4" fill="none" marker-end="url(#ac)"/>
        </svg>
        <div class="r" data-s="3" style="position:absolute;left:250px;top:550px;font-size:20px;color:var(--faint)">isimsiz heap değişkeni</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3.5: İşaretçi tipi. İşaretçi, kendisi bir veri içermek yerine başka bir veriye başvurmak için kullanılır. Bu yüzden hem ilkel hem de yapısal tiplerden farklıdır.",
    "Bir işaretçinin değerleri bellek adresleri ve hiçbir yeri göstermeyen özel NULL değeridir. İşaretçinin boyu gösterdiği verinin boyundan bağımsızdır ve genellikle tek bir bellek kelimesine sığar. Örneğimizde n on bir değerinde bir tam sayı; q, r ve h ise int işaretçileri.",
    "q eşittir ve n, n'nin adresini q'ya atar; artık q, n'yi gösterir. r'ye ise NULL atanır, yani r hiçbir şeyi göstermiyor.",
    "malloc ile heap'ten bir int'lik yer alınır ve adresi h'ye atanır. Bu heap değişkeninin bir ismi yoktur; ona yalnızca h aracılığıyla ulaşabiliriz.",
    "Yıldız h eşittir otuz üç, h'nin gösterdiği yere otuz üç yazar. Buradaki yıldız, başvuru çözme işlemidir.",
    "int m eşittir yıldız h ise o adresteki değeri okur ve m otuz üç olur.",
    "Özetle C'de işaretçiler için iki temel işlem vardır: ve işareti bir değişkenin adresini verir; yıldız ise başvuruyu çözerek gösterilen değere erişir.",
  ],
},
{
  id: "pointer-uses", ch: "6.3.5 İşaretçiler", chip: "<b>6.3.5.1–6.3.5.3</b> Kullanım alanları ve işaretçi aritmetiği",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İşaretçiler <em>ne işe yarar?</em></h2>
    <div class="grid2" style="gap:36px">
      <div class="col">
        <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:28px">1. Dolaylı adresleme</h3>
          <div class="row" style="gap:18px;align-items:center;margin-top:8px">
            <div style="text-align:center"><div class="mono" style="font-size:20px;color:var(--faint)">abc</div>${'<div class="mono" style="width:120px;height:64px;border:2px solid var(--amber);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--amber)">5555</div>'}</div>
            <div class="arrow">→</div>
            <div style="text-align:center"><div class="mono" style="font-size:20px;color:var(--faint)">adres 5555</div>${'<div class="mono" style="width:120px;height:64px;border:2px solid var(--teal);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--teal)">9876</div>'}</div></div>
          <p style="font-size:21px;margin-top:10px">Normal başvuru <b>5555</b>, dolaylı başvuru <b>9876</b> verir.</p></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:28px">2. Dinamik bellek yönetimi</h3><p style="font-size:21px">Heap'teki isimsiz değişkenlere yalnızca işaretçiyle ulaşılır. Yer alma: <span class="mono">malloc</span>, <span class="mono">new</span> · geri verme: <span class="mono">free</span>, <span class="mono">delete</span>.</p></div>
        <div class="r" data-s="3">${code("kayit.c", ["struct ogr *p = malloc(sizeof(struct ogr));", "(*p).adres = ...;   // ya da", "p->adres = ...;"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col">
        <div class="card tint-a r" data-s="4" style="padding:22px 28px"><h3 class="hl" style="font-size:28px">İşaretçi aritmetiği (C, C++)</h3>
          ${code("arit.c", ["int list[10];", "int *ptr = list;    // = &list[0]", "*(ptr + 1)  ≡  list[1]", "*(ptr + i)  ≡  list[i]  ≡  ptr[i]"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="5" style="display:flex;gap:6px">${["list[0]", "list[1]", "list[2]", "list[3]"].map((t, i) => `<div style="flex:1;text-align:center"><div class="mono" style="height:62px;border:2px solid var(--${i === 1 ? "amber" : "line"});border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:19px">${t}</div><div class="mono" style="font-size:18px;color:var(--faint);margin-top:4px">${1000 + i * 4}</div></div>`).join("")}</div>
        <div class="note r" data-s="5" style="font-size:22px"><span class="mono">ptr + 1</span> adrese 1 değil, <b>sizeof(int) = 4</b> ekler: 1000 → 1004. Dizi adı, ilk elemanın adresidir.</div>
      </div>
    </div>
  </div>`,
  n: [
    "İşaretçiler iki temel amaçla kullanılır.",
    "Birincisi dolaylı adreslemedir. abc adlı bir işaretçinin değeri beş bin beş yüz elli beş olsun ve beş bin beş yüz elli beş adresli hücrede dokuz bin sekiz yüz yetmiş altı yazsın. abc'ye normal başvuru beş bin beş yüz elli beşi, dolaylı başvuru ise dokuz bin sekiz yüz yetmiş altıyı verir.",
    "İkincisi dinamik bellek yönetimidir. Çalışma zamanında büyüyüp küçülen veri yapıları heap'te tutulur ve bu değişkenlerin isimleri olmadığı için onlara yalnızca işaretçilerle ulaşılabilir. C'de malloc, C++'ta new ile yer alınır; C'de free, C++'ta delete ile geri verilir.",
    "İşaretçi bir kaydı gösteriyorsa, C ve C++'ta bir alana iki şekilde erişilebilir: yıldız p parantez içinde nokta adres, ya da daha okunaklı olan ok gösterimiyle p ok adres.",
    "C ve C++ ayrıca işaretçi aritmetiğine izin verir. Bir dizi adı, indissiz kullanıldığında dizinin ilk elemanının adresidir. Bu yüzden ptr artı bir, dizinin ikinci elemanını gösterir; ptr artı i'nin gösterdiği değer, list köşeli parantez i ile aynıdır.",
    "Buradaki incelik şudur: ptr'ye bir eklemek adrese bir bayt eklemek değildir. Eklenen değer, gösterilen tipin boyuyla ölçeklenir. int dört bayt olduğu için adres binden bin dörde ilerler.",
  ],
},
{
  id: "dangling", ch: "6.3.5 İşaretçiler", chip: "<b>6.3.5.4</b> İşaretçi sorunları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İki büyük sorun: <em>sallanan işaretçi</em> ve <em>bellek sızıntısı</em></h2>
    <div class="grid2" style="gap:40px">
      <div class="col" style="gap:18px">
        <div class="r" data-s="1">${code("sallanan.c", ["int *h = malloc(sizeof(int));", "*h = 33;", { t: "int *r = h;", hot: "1" }, { t: "free(h);        // bellek iade edildi", s: 2, hot: "2" }, { t: "*r = 0;         // TANIMSIZ DAVRANIŞ!", s: 3, hot: "3" }], { lang: "c", cls: "xs" })}</div>
        <div class="row r" data-s="1" style="gap:26px;align-items:center;justify-content:center">
          ${mem("h", "•", "coral", { s: 1, w: 110 })}${mem("r", "•", "coral", { s: 1, w: 110 })}
          <div class="arrow" style="font-size:52px">⇒</div>
          <div class="stack">${mem("heap", "33", "teal", { s: 1, h: 2, w: 130 })}${mem("heap", "iade", "line", { s: 2, w: 130 })}</div>
        </div>
        <div class="card tint-c r" data-s="3" style="padding:18px 24px"><p style="font-size:21px"><b>Sallanan işaretçi (dangling):</b> serbest bırakılmış bir yeri gösteren işaretçi. Bellek başkasına verilmiş olabilir.</p></div>
        <div class="r" data-s="4">${code("yerel.c", ["int *f() { int fv = 42; return &fv; }", "int *p = f();  *p = 0;   // fv artık yok!"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col" style="gap:18px">
        <div class="r" data-s="5">${code("kayip.c", ["int *h = malloc(sizeof(int));", "*h = 33;", { t: "h = NULL;       // tek bağlantı koptu", s: 6, hot: "6" }], { lang: "c", cls: "xs" })}</div>
        <div class="row r" data-s="5" style="gap:26px;align-items:center;justify-content:center">
          <div class="stack">${mem("h", "•", "coral", { s: 5, h: 6, w: 110 })}${mem("h", "NULL", "violet", { s: 6, w: 110 })}</div>
          <div class="stack"><div class="arrow r" data-s="5" data-h="6" style="font-size:52px">⇒</div><div class="arrow r" data-s="6" style="font-size:52px;color:var(--coral)">✕</div></div>
          ${mem("heap", "33", "amber", { s: 5, w: 130 })}
        </div>
        <div class="card tint-a r" data-s="7" style="padding:18px 24px"><p style="font-size:21px"><b>Kayıp heap değişkeni:</b> artık hiçbir işaretçinin göstermediği nesne = <b>çöp</b>. Çöplerin yer kaplamasına <b>bellek sızıntısı</b> denir.</p></div>
        <div class="note r" data-s="8" style="font-size:21px">Java'da işaretçi yok; referanslar ve <b>çöp toplama</b> var → iki sorun da büyük ölçüde ortadan kalkar.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.3.5.4: İşaretçi sorunları. İşaretçilerin iki büyük sorunu vardır: sallanan işaretçiler ve kayıp heap değişkenleri.",
    "Önce sallanan işaretçi. h, heap'te otuz üç değerini tutan bir yeri gösteriyor. r eşittir h dediğimizde, r de aynı yeri göstermeye başlar.",
    "Sonra free h ile o bellek sisteme iade edilir. Ama r hâlâ eski adresi tutmaktadır.",
    "Serbest bırakılmış bir yeri gösteren bu işaretçiye sallanan işaretçi denir. Yıldız r'ye yazmak tanımsız bir davranıştır: o bellek bu arada başka bir değişkene verilmiş olabilir ve programınız bambaşka bir veriyi bozabilir. Pascal'da da dispose komutu yüzünden aynı sorun oluşabilir.",
    "Bir başka klasik hata: f fonksiyonu kendi yerel değişkeni fv'nin adresini döndürüyor. Ama f bittiğinde fv'nin yığıttaki yeri geri alınır; dönen işaretçi artık geçersiz bir yeri gösterir.",
    "İkinci sorun kayıp heap değişkenidir. h yine heap'te otuz üçü tutan bir yeri gösteriyor.",
    "h'ye NULL atandığında, o heap değişkenine giden tek bağlantı kopar.",
    "Artık hiçbir işaretçinin göstermediği ve programın bir daha asla erişemeyeceği bu nesneye çöp denir. Çöplerin bellekte boşuna yer kaplamasına da bellek sızıntısı denir. Uzun çalışan programlarda sızıntı, belleğin yavaş yavaş tükenmesine yol açar.",
    "Java bu sorunlara kökten bir çözüm getirir: dilde işaretçi aritmetiği yoktur, yalnızca referanslar vardır ve bellek açık bir komutla geri verilmez; kullanılmayan nesneleri çöp toplayıcı bulur. Böylece hem sallanan referanslar hem de çoğu sızıntı ortadan kalkar.",
  ],
},
{
  id: "ptr-solutions", ch: "6.3.5 İşaretçiler", chip: "<b>6.3.5.5</b> Çözümler ve referans tipleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Sallanan işaretçiye <em>çözümler</em></h2>
    <div class="grid2" style="gap:36px">
      <div class="col">
        <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:28px">1. Yazıt (tombstone) <span style="font-size:20px;color:var(--faint);font-weight:500">Lomet, 1975</span></h3>
          <div class="row" style="gap:14px;align-items:center;margin:10px 0"><span class="pill a">p</span><span class="arrow">→</span><span class="pill v">yazıt</span><span class="arrow">→</span><span class="pill t">heap nesnesi</span></div>
          <p style="font-size:21px">Nesne silinince yazıt kalır, içi <b>nil</b> olur → erişim hata verir. Bedeli: ek bellek ve ek dolaylılık.</p></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:28px">2. Kilit ve anahtar <span style="font-size:20px;color:var(--faint);font-weight:500">Fisher, LeBlanc</span></h3>
          <div class="mono" style="font-size:22px;line-height:1.7;margin:6px 0">işaretçi = [anahtar, adres]<br>nesne    = [kilit, değer]</div>
          <p style="font-size:21px">Her erişimde anahtar = kilit kontrolü. Nesne silinince kilit değişir → eski işaretçiler reddedilir.</p></div>
        <div class="note r" data-s="3" style="font-size:22px"><b>Esas çözüm:</b> bellek iade yetkisini programcıdan almak. Java, C#, LISP: çöp toplama.</div>
      </div>
      <div class="col">
        <div class="card tint-v r" data-s="4" style="padding:22px 28px"><h3 class="vl" style="font-size:28px">C++ referans tipi</h3>
          ${code("ref.cpp", ["int result;", "int &ref = result;   // takma ad", "ref = 100;           // result = 100"], { lang: "c", cls: "xs" })}
          <p style="font-size:21px;margin-top:10px">Örtük olarak çözülen <b>sabit</b> işaretçi: başlatılmalı, sonra başka yeri gösteremez. Parametrelerde iki yönlü iletişim.</p></div>
        <div class="card r" data-s="5" style="padding:22px 28px"><h3 style="font-size:28px">Java ve C#</h3><p style="font-size:21px"><b>Java:</b> yalnız referanslar, aritmetik yok, açık silme yok, çöp toplama var.<br><b>C#:</b> Java referansları + C++ işaretçileri; ama işaretçi kullanan metot <span class="mono hl">unsafe</span> işaretlenmeli.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Sallanan işaretçi sorununa önerilen çözümlere bakalım.",
    "Birincisi yazıt yöntemidir. Her heap değişkeni için ek bir hücre, yani bir yazıt tutulur; işaretçiler doğrudan nesneyi değil, yazıtı gösterir. Nesne silindiğinde yazıt yerinde kalır ama içeriği nil yapılır. Böylece eski işaretçilerle yapılan erişimler hata olarak yakalanır. Bedeli ek bellek ve her erişimde bir ek dolaylı adımdır.",
    "İkincisi kilit ve anahtar yöntemidir. İşaretçiler anahtar ve adres çiftinden, heap değişkenleri ise kilit ve değer çiftinden oluşur. Nesne oluşturulduğunda kilit ve anahtara aynı tam sayı verilir ve her erişimde ikisinin eşitliği kontrol edilir. Nesne silinince kilit değiştirilir; eski işaretçilerin anahtarı artık tutmayacağı için hata verilir.",
    "Ancak sorunun asıl çözümü, bellek iade yetkisini programcıdan almaktır. Java, C# ve LISP, kullanılmayan belleği kendisi belirleyip geri alır.",
    "C++ ayrıca referans tipi sunar. Referans, örtük olarak başvurusu çözülen sabit bir işaretçidir: tanımlanırken bir değişkenle başlatılmalıdır ve sonra başka bir yeri gösteremez. ref'e yüz atamak aslında result'a yüz atamaktır. Referanslar en çok parametrelerde, çağıran ile çağrılan arasında iki yönlü iletişim için kullanılır ve işaretçilere göre çok daha okunaklıdır.",
    "Java bu fikri genişletir: dilde yalnızca referanslar vardır; işaretçi aritmetiği ve açık bellek iadesi yoktur, çöp toplama vardır. C# ise hem Java tarzı referansları hem de C++ işaretçilerini içerir, ancak işaretçi kullanan metotların unsafe olarak işaretlenmesi gerekir.",
  ],
},
{
  id: "gc", ch: "6.3.5 Heap yönetimi", chip: "Heap yönetimi ve çöp toplama",
  html: (() => {
    const nodes = [["root", 80, 220, "r"], ["A", 300, 110, "k"], ["B", 300, 330, "k"], ["C", 520, 110, "k"], ["D", 520, 330, "g"], ["E", 740, 220, "g"]];
    const edges = [[0, 1], [0, 2], [1, 3], [4, 5], [5, 4]];
    const N = Object.fromEntries(nodes.map((n) => [n[0], n]));
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kullanılmayan bellek <em>nasıl geri alınır?</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px">
        <svg viewBox="0 0 820 430" style="width:820px;height:430px" class="r" data-s="0">
          <defs><marker id="ga" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#6b7399"/></marker></defs>
          ${edges.map(([a, b]) => { const [, x1, y1] = nodes[a], [, x2, y2] = nodes[b]; const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); const off = a === 5 || (a === 4 && b === 5) ? 14 : 0; const nx = -dy / L * off, ny = dx / L * off; return `<line x1="${x1 + dx / L * 52 + nx}" y1="${y1 + dy / L * 40 + ny}" x2="${x2 - dx / L * 56 + nx}" y2="${y2 - dy / L * 44 + ny}" stroke="#6b7399" stroke-width="3" marker-end="url(#ga)"/>`; }).join("")}
          ${nodes.map(([t, x, y, k]) => `<g><rect x="${x - 52}" y="${y - 38}" width="104" height="76" rx="16" fill="#151a31" stroke="${k === "r" ? "#ffb547" : "#3a4278"}" stroke-width="3"/>
            ${k !== "r" ? `<rect class="r rf" data-s="${k === "k" ? 2 : 3}" x="${x - 52}" y="${y - 38}" width="104" height="76" rx="16" fill="${k === "k" ? "rgba(53,208,192,.18)" : "rgba(255,122,122,.18)"}" stroke="${k === "k" ? "#35d0c0" : "#ff7a7a"}" stroke-width="4"/>` : ""}
            <text x="${x}" y="${y + 10}" fill="#eef0fa" font-size="28" text-anchor="middle" font-family="JBM">${t}</text></g>`).join("")}
          <text class="r" data-s="1" x="520" y="410" fill="#a2a9d2" font-size="22" text-anchor="middle">D ↔ E: döngü, sayaç hep ≥ 1</text>
          <text class="r" data-s="2" x="300" y="40" fill="#35d0c0" font-size="22" text-anchor="middle">işaretle: erişilebilir</text>
          <text class="r" data-s="3" x="740" y="140" fill="#ff7a7a" font-size="22" text-anchor="middle">süpür: çöp</text>
        </svg>
      </div>
      <div class="col f1">
        <div class="card r" data-s="1" style="padding:20px 26px"><h3 style="font-size:27px">Referans sayma <span style="font-size:20px;color:var(--faint);font-weight:500">aceleci</span></h3><p style="font-size:21px">Her nesnenin bir sayacı var; sayaç 0 olunca hemen iade. Bedeli: yer ve zaman; <b>döngüsel yapılar</b> hiç toplanamaz.</p></div>
        <div class="card r" data-s="2" style="padding:20px 26px"><h3 style="font-size:27px">İşaretle-süpür <span style="font-size:20px;color:var(--faint);font-weight:500">tembel</span></h3><p style="font-size:21px">Bellek bitince: köklerden ulaşılanları işaretle, kalanları süpür. Dezavantaj: en çok ihtiyaç duyulduğunda en yavaş.</p></div>
        <div class="card r" data-s="4" style="padding:20px 26px"><h3 style="font-size:27px">Modern iyileştirmeler</h3><p style="font-size:21px"><b>Kopyalama:</b> iki yarı uzay, canlıları taşı. <b>Kuşaklı:</b> genç nesneleri sık tara. <b>Artımlı:</b> programla dönüşümlü, az bekleme.</p></div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Heap yönetimi, dil tasarımından çok dilin gerçekleştirimiyle ilgili bir sorundur. Kullanılmayan belleği toplamanın iki temel yaklaşımı vardır: referans sayma ve çöp toplama.",
    "Referans sayma aceleci bir yaklaşımdır. Her heap nesnesi için, onu kaç işaretçinin gösterdiğini tutan bir sayaç vardır; sayaç sıfıra düştüğü anda nesne iade edilir. Dezavantajı, her nesne için ek yer ve her atamada ek zaman harcamasıdır. Daha önemlisi döngüsel yapılardır: D ve E birbirini gösterdiği için sayaçları hiçbir zaman sıfır olmaz, kökten ulaşılamasalar bile toplanamazlar.",
    "Çöp toplama, yani işaretle-süpür ise tembel bir yaklaşımdır. Program belleği tükenene kadar yer alır ve kullanır. Bellek bitince toplayıcı köklerden, yani program değişkenlerinden başlar ve ulaşabildiği bütün hücreleri işaretler: A, B ve C.",
    "Sonra bütün heap'i süpürür ve işaretlenmemiş hücreleri, yani D ve E'yi boş listeye ekler. Döngüler sorun olmaz. Dezavantajı ise en çok belleğe ihtiyaç duyulduğu anda en yavaş çalışmasıdır; büyük bir heap'i taramak uzun sürer.",
    "Modern toplayıcılar bu sorunları çeşitli tekniklerle hafifletir. Kopyalama yönteminde bellek iki yarıya ayrılır ve canlı nesneler diğer yarıya taşınır. Kuşaklı yaklaşımda nesnelerin çoğunun genç öldüğü gözlemine dayanarak genç nesneler daha sık taranır. Artımlı toplamada ise toplayıcı programla dönüşümlü çalışarak uzun duraklamaları önler.",
  ],
},
// ───────── 6.4–6.5
{
  id: "strong-typing", ch: "6.4 Kuvvetli tipleme", chip: "<b>6.4–6.5</b> Kuvvetli tipleme ve tip denetimi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kuvvetli tipleme ve <em>tip denetimi</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:800px">
        <div class="card r" data-s="1" style="padding:24px 30px"><h3 style="font-size:29px">Kuvvetli tipli dil</h3><p style="font-size:23px">Bütün tip hatalarını yakalayan dil. Derleyici her değişkenin ve ifadenin tipini belirleyebilir; uyumsuz atamalara ve parametre bağlamalarına izin vermez. Az sayıda zorunlu dönüşüm istisnadır.</p></div>
        <div class="card r" data-s="3" style="padding:24px 30px"><h3 style="font-size:29px">Tip denetimi</h3><p style="font-size:23px">İşlenenlerin işlemciyle uyumlu olduğunun kontrolü. Tip bağlama <b class="tl">statik</b>se denetim derlemede; <b class="hl">dinamik</b>se çalışma zamanında yapılmalı.</p></div>
      </div>
      <div class="col f1 r" data-s="2" style="gap:14px">
        ${[["C, C++", "hayır", "coral", "union, örtük dönüşümler"], ["Pascal", "neredeyse", "amber", "kuvvetli tiplemeyi tanıttı"], ["Ada", "neredeyse", "teal", "Unchecked_Conversion hariç"], ["Java, C#", "neredeyse", "teal", "dönüşümler açık olmalı"], ["ML, Haskell", "evet", "green", "tip çıkarımı"]].map(([l, v, c, d]) => `<div class="card" style="padding:14px 22px;display:flex;align-items:center;gap:18px"><span style="font-weight:700;font-size:25px;width:170px">${l}</span><span class="pill" style="border-color:var(--${c});color:var(--${c})">${v}</span><span style="font-size:20px;color:var(--muted)">${d}</span></div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.4: Kuvvetli tipleme. Kuvvetli tipleme, farklı soyutlamaları temsil eden farklı veri tiplerinin birbirleriyle etkileşimini kısıtlamaktır.",
    "Bir dilin kuvvetli tipli sayılması için bütün tip hatalarını yakalaması gerekir. Böyle bir dilde derleyici her değişkenin ve her ifadenin tipini belirleyebilir; uyumsuz tiplerin birbirine atanmasına ve alt program çağrılarında uyumsuz parametre bağlamalarına izin vermez. Az sayıdaki zorunlu dönüşümler istisna sayılır.",
    "Popüler dillere bakalım. C ve C++ kuvvetli tipli değildir; bileşimler ve pek çok örtük dönüşüm buna izin vermez. Kuvvetli tiplemeyi programlama dillerine tanıtan dil Pascal'dır, ama Pascal da tam olarak kuvvetli tipli kabul edilmez. Ada, Java ve C# neredeyse kuvvetli tiplidir. ML ve Haskell ise kuvvetli tiplidir.",
    "Bölüm 6.5: Tip denetimi. Bir işlemcinin işlenenlerinin birbirleriyle uyumlu tiplerde olduğunun kontrolüne tip denetimi denir. Dildeki tüm değişkenlere statik tip bağlama uygulanıyorsa tip denetimi de statik, yani derleme zamanında yapılabilir. Tip bağlama dinamikse, denetim çalışma zamanında yapılmak zorundadır.",
  ],
},
{
  id: "conversions", ch: "6.5 Tip dönüşümleri", chip: "<b>6.5.1</b> Tip dönüşümleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Daralan, genişleyen; <em>örtük, açık</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="row r" data-s="1" style="gap:20px">
          <div class="card tint-t f1" style="padding:20px 24px"><h3 class="tl" style="font-size:27px">Genişleyen ✓</h3><div class="mono" style="font-size:24px">int → float</div><p style="font-size:20px;margin-top:6px">Hedef tip kaynağın tüm değerlerini içerir; güvenli.</p></div>
          <div class="card tint-c f1" style="padding:20px 24px"><h3 class="cl" style="font-size:27px">Daralan ✕</h3><div class="mono" style="font-size:24px">float → int</div><p style="font-size:20px;margin-top:6px">Değer kaybı olabilir: 3.7 → 3. Çoğu dil örtük olarak izin vermez.</p></div></div>
        <div class="card r" data-s="2" style="padding:20px 26px"><h3 style="font-size:27px">Örtük: zorunlu dönüşüm (coercion)</h3><p style="font-size:21px">Derleyici yapar; kurallar dil gerçekleştiriminde belirlenir. Karışık tipli ifadede genelde dar olan geniş olana çevrilir. Ada'da en az.</p></div>
        <div class="r" data-s="3">${code("hata.c", ["int a, b, c;  float d;", { t: "a = b * d;    // c yazmak istemiştik!", hot: "3" }], { lang: "c", cls: "xs" })}</div>
        <div class="note r" data-s="3" style="font-size:21px">b float'a çevrilir, çarpım yapılır, sonuç int'e kırpılır. <b>Hata yakalanmaz</b> → güvenilirlik azalır.</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:20px 26px"><h3 style="font-size:27px">Açık: cast</h3>
          ${code("cast.c", ["double x;", { t: "x = 4 / 3;            // 1.000000", hot: "4" }, { t: "x = (double) 4 / 3;   // 1.333333", s: 5, hot: "5" }], { lang: "c", cls: "xs" })}
          <p style="font-size:21px;margin-top:10px"><span class="mono">4/3</span> iki <b>int</b> → tam sayı bölmesi → 1, sonra double'a çevrilir.</p></div>
        <div class="card r" data-s="5" style="padding:20px 26px"><p style="font-size:21px">Ada: <span class="mono">Float(Sum)</span> · Java: <span class="mono">(int) 3.7</span> → 3. Açık dönüşüm hem daralan hem genişleyen olabilir.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 6.5.1: Tip dönüşümleri. Bir işlemcinin farklı tiplerde işlenenleri olabiliyorsa, buna karışık tipli ifade denir. Böyle ifadelere izin veren dillerde tip dönüşümleri gereklidir.",
    "Dönüşümler genişleyen ya da daralan olabilir. Hedef tip, kaynak tipin bütün değerlerini içeriyorsa dönüşüm genişleyendir; tam sayıdan kayan noktalıya dönüşüm buna örnektir ve güvenlidir. İçermiyorsa daralandır: kayan noktalıdan tam sayıya dönüşümde üç virgül yedi üçe kırpılır. Bu yüzden çoğu dil daralan dönüşümlere örtük olarak izin vermez.",
    "Dönüşümler örtük ya da açık olabilir. Örtük dönüşüme zorunlu dönüşüm, İngilizcesiyle coercion denir ve derleyici tarafından yapılır. Kuralları dilin gerçekleştirimi sırasında belirlenir. Karışık tipli bir ifadede genellikle dar olan işlenen geniş olana çevrilir; örneğin bir tam sayı ile bir gerçel sayı toplanırken tam sayı gerçel sayıya dönüştürülür. Zorunlu dönüşümün en az olduğu dillerden biri Ada'dır.",
    "Zorunlu dönüşümün tehlikesini bu C örneğinde görüyoruz. a eşittir b çarpı c yazmak isterken yanlışlıkla d yazdık. Derleyici şikâyet etmez: b'yi float'a çevirir, çarpar ve sonucu int'e kırpar. Dilde zorunlu dönüşüm olmasaydı, bu yazım hatası bir tip uyuşmazlığı olarak yakalanacaktı. Yani zorunlu dönüşüm, tip denetimini zayıflatır ve güvenilirliği azaltır.",
    "Açık dönüşüme C'de cast denir: işlenenden önce parantez içinde hedef tip yazılır. Şu örneğe dikkat edin: x bir double olmasına rağmen x eşittir dört bölü üç, bir virgül sıfır verir. Çünkü dört ve üç int sabitleridir; önce tam sayı bölmesi yapılır ve sonuç bir olur, ancak ondan sonra double'a çevrilir.",
    "Doğru sonucu almak için dördü double'a cast ederiz; o zaman bölme kayan noktalı yapılır ve bir virgül üç üç üç elde ederiz. Ada'da cast, Float parantez Sum gibi fonksiyon çağrısına benzer bir yazımla yapılır. Açık dönüşümler hem daralan hem genişleyen olabilir.",
  ],
},
// ───────── summary / quiz / outro
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="zoom:1.2">
      ${[["🔢", "t", "İlkel tipler", "Tam sayı, kayan nokta, decimal, Boolean, karakter; dizgiler ve sıralı tipler (enum, altalan)."], ["🧱", "a", "Diziler", "5 kategori, satır/sütun tabanlı yerleşim, erişim fonksiyonu, kesit, ilişkili dizi, demet, liste."],
         ["🗂️", "v", "Kayıt ve bileşim", "Kayıt: heterojen alanlar, sabit ofset. Bileşim: ortak bellek, etiket olmadan güvensiz."], ["👉", "c", "İşaretçi ve tipleme", "Sallanan işaretçi, sızıntı, çöp toplama. Kuvvetli tipleme; daralan/genişleyen, örtük/açık dönüşüm."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "İlkel tipler başka tiplerden oluşmaz: tam sayılar, kayan noktalı sayılar, onlu sayılar, mantıksal tip ve karakterler. Dizgiler ilkel tip ya da karakter dizisi olarak tasarlanabilir; sayılama ve altalan tipleri ise okunabilirliği ve güvenilirliği artırır.",
    "Diziler, indis ve bellek bağlama zamanına göre beş kategoriye ayrılır. Çok boyutlu diziler belleğe satır ya da sütun tabanlı yerleşir ve elemanların adresi erişim fonksiyonuyla hesaplanır. Kesitler, ilişkili diziler, demetler ve listeler bu ailenin diğer üyeleridir.",
    "Kayıtlar heterojen alanları isimle gruplar ve her alanın sabit bir ofseti vardır. Bileşimler aynı belleği farklı tiplerle paylaşır; etiket olmadan güvensizdir.",
    "İşaretçiler dolaylı adresleme ve dinamik bellek için vazgeçilmezdir, ama sallanan işaretçi ve bellek sızıntısı gibi sorunlar getirir; çöp toplama bunları büyük ölçüde çözer. Son olarak kuvvetli tipleme bütün tip hatalarını yakalamayı hedefler; zorunlu dönüşümler ise bu denetimi zayıflatır.",
  ],
},
{
  id: "quiz", ch: "Özet ve mini test", chip: "Mini test",
  html: (() => {
    const quiz = [["int a[3][4] dizisinin taban adresi 1000 ve int 4 bayt. Satır tabanlı sırada a[1][2]'nin adresi nedir?", "1000 + (1×4 + 2)×4 = 1024"], ["C'de bir union'ın boyutu nasıl belirlenir?", "En geniş üyenin boyutu kadar yer ayrılır."], ["Sallanan işaretçi ile bellek sızıntısı arasındaki fark nedir?", "Sallanan: işaretçi var, nesne yok. Sızıntı: nesne var, ona giden işaretçi yok."], ["double x = 4 / 3; sonrasında x kaçtır? Neden?", "1.0 — 4 ve 3 int; önce tam sayı bölmesi yapılır."], ["Referans sayma döngüsel yapıları neden toplayamaz?", "Birbirini gösteren nesnelerin sayacı hiçbir zaman 0 olmaz."]];
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
    { t: "Soru 1. Üç satır, dört sütunluk bir int dizisinin taban adresi bin ve her int dört bayt. Satır tabanlı sırada a bir iki elemanının adresi nedir?", pause: 3.5 }, "Cevap: bin artı, bir çarpı dört artı iki, yani altı, çarpı dört. Sonuç bin yirmi dört.",
    { t: "Soru 2. C'de bir union'ın boyutu nasıl belirlenir?", pause: 3.5 }, "Cevap: Derleyici, en geniş üyenin sığacağı kadar yer ayırır; bütün üyeler bu alanı paylaşır.",
    { t: "Soru 3. Sallanan işaretçi ile bellek sızıntısı arasındaki fark nedir?", pause: 3.5 }, "Cevap: Sallanan işaretçide işaretçi vardır ama gösterdiği nesne yoktur. Bellek sızıntısında ise nesne vardır ama ona giden bir işaretçi kalmamıştır.",
    { t: "Soru 4. double x eşittir dört bölü üç işleminden sonra x kaçtır? Neden?", pause: 3.5 }, "Cevap: Bir virgül sıfır. Çünkü dört ve üç int sabitleridir; önce tam sayı bölmesi yapılır, sonuç sonradan double'a çevrilir.",
    { t: "Soru 5. Referans sayma, döngüsel yapıları neden toplayamaz?", pause: 3.5 }, "Cevap: Birbirini gösteren nesnelerin sayaçları, programdan erişilemez olsalar bile hiçbir zaman sıfıra düşmez.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 6 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Sıradaki: <b style="color:var(--text)">Bölüm 7 — Yapısal programlama ve akış denetimi</b></div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta · Watt · Scott · Z. Orhan · M. Şahin · T. Yılmaz · Ahmet Yesevi Üniversitesi</div>
  </div>`,
  n: [
    "Bölüm 6'yı tamamladık! Bir sonraki bölümde yapısal programlamayı ve akış denetimini, yani seçim ve döngü deyimlerini inceleyeceğiz.",
    "Ödev olarak, kullandığınız bir dilin hangi veri tiplerini desteklediğini araştırın ve öğrencilerin kimlik ve not bilgilerini kayıtlarla tutan küçük bir Java programı yazın. İzlediğiniz için teşekkürler, görüşmek üzere!",
  ],
},
];
