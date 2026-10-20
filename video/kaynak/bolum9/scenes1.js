const { code } = require("../build/lib");
const { trace, frame, sw, FRCSS } = require("../ch8/h");

const roadmap = ["Çağrı ve dönüşün anlamı", "Basit altprogramlar (Fortran I)", "Yığıt-dinamik yerel değişkenler", "Etkinlik kayıtları ve özyineleme", "İç içe altprogramlar: statik zincir", "Ekranlar (displays) ve bloklar", "Dinamik kapsamın uygulanması", "Arabellek aşımı saldırısı"];

// AR as a stack of labelled cells
const AR = (title, cells, { c = "violet", s, h, w = 360, fs = 22 } = {}) => `<div class="${s !== undefined || h !== undefined ? "r" : ""}" ${s !== undefined ? `data-s="${s}"` : ""} ${h !== undefined ? `data-h="${h}"` : ""} style="display:flex;align-items:stretch;gap:12px"><div style="width:${w}px;border:2px solid var(--${c});border-radius:12px;overflow:hidden;background:var(--panel)">${cells.map(([l, v, col], i) => `<div style="display:flex;justify-content:space-between;padding:6px 14px;font-size:${fs}px;${i ? "border-top:1px solid var(--line)" : ""}"><span style="color:var(--muted)">${l}</span><span class="mono" style="color:var(--${col || "text"});font-weight:700">${v || ""}</span></div>`).join("")}</div><div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:19px;color:var(--${c});font-weight:700;text-align:center">${title}</div></div>`;

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:10px;flex-direction:column-reverse;margin-bottom:40px;align-items:center">
      ${["main", "B", "A", "C"].map((t, i) => `<div class="box r rp" data-s="1" style="width:${360 - i * 30}px;height:48px;font-size:22px;border-color:var(--${["teal", "violet", "amber", "coral"][i]});transition-delay:${i * 0.2}s">${t} için etkinlik kaydı</div>`).join("")}
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:108px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 9: Altprogramları<br>Uygulamak</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin dokuzuncu bölümüne hoş geldiniz. Önceki bölümde altprogramları programcının gözünden gördük; bu bölümde perdenin arkasına geçiyoruz.",
    "Bir altprogram çağrıldığında derleyici ve çalışma zamanı sistemi neler yapar? Değişkenler bellekte nereye konur, iç içe altprogramlar dıştaki değişkenleri nasıl bulur? Bunları yığıt üzerindeki kutularla, adım adım izleyeceğiz.",
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
    "Önce bir çağrının ve dönüşün genel anlamını, sonra en basit durumu, yani bütün yerel değişkenleri statik olan altprogramları göreceğiz. Ardından yığıt-dinamik yerel değişkenlere, etkinlik kayıtlarına ve özyinelemeye geçeceğiz.",
    "İkinci yarıda iç içe altprogramların yerel olmayan değişkenleri nasıl bulduğunu, yani statik zinciri ve ekranları; blokları ve dinamik kapsamın nasıl uygulandığını inceleyeceğiz. Son olarak bu bilgilerin güvenlikle ilgisini, arabellek aşımı saldırısı üzerinden göreceğiz.",
  ],
},
{
  id: "linkage", ch: "9.1 Çağrı ve dönüş", chip: "Çağrıların ve dönüşlerin genel anlamı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Altprogram bağlanması: <em>arka planda neler olur?</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:760px;gap:14px">
        <div class="card r" data-s="0" style="padding:18px 24px"><p style="font-size:23px">Çağrı ve dönüş işlemlerinin ikisine birden <b>altprogram bağlanması</b> (subprogram linkage) denir. Gerçekleştirim şunları sağlamalı:</p></div>
        ${["Parametreler altprograma <b>nasıl geçecek</b>?", "Çağıranın çalışma <b>durumu korunmalı</b>", "Yerel değişkenler (statik değilse) için <b>yer ayrılmalı</b>", "Dönüşte çağıranın <b>doğru noktasına</b>, doğru değerlerle dönülmeli", "İç içe altprogramlarda <b>yerel olmayan</b> değişkenlere erişilmeli"].map((t, i) => `<div class="card r rl" data-s="1" style="padding:12px 22px;font-size:23px;display:flex;gap:16px;transition-delay:${i * 0.12}s"><span class="mono hl" style="font-weight:700">${i + 1}</span><span style="color:var(--muted)">${t}</span></div>`).join("")}
      </div>
      <div class="col f1 r" data-s="2" style="align-items:center;gap:8px">
        ${[["Program çalışıyor", "teal"], ["Program durumunu kaydet", "amber"], ["Etkinlik kaydı: parametreler · yerel veri · dönüş adresi", "violet"], ["Altprogram çalışır", "violet"], ["Dönüş değerini ayarla", "amber"], ["Program durumunu geri yükle", "amber"], ["Program kaldığı yerden devam eder", "teal"]].map(([t, c], i) => `${i ? `<div style="color:var(--faint);font-size:24px">↓</div>` : ""}<div class="box r" data-s="2" style="width:520px;border-color:var(--${c});font-size:21px;padding:9px;transition-delay:${i * 0.15}s">${t}</div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 9.1: Çağrıların ve dönüşlerin genel anlamı. Bir dilde altprogramların çağrılması ve dönmesi işlemlerinin ikisine birden altprogram bağlanması denir.",
    "Bir gerçekleştirim beş şeyi sağlamak zorundadır: parametrelerin altprograma nasıl geçeceği belirlenmeli; çağıran birimin çalışma durumu korunmalı; yerel değişkenler statik değilse onlar için yer ayrılmalı; dönüşte çağıranın doğru noktasına, doğru değerlerle dönülmeli; ve iç içe altprogramlar varsa, yerel olmayan değişkenlere erişim sağlanmalıdır.",
    "Genel akış şöyledir: program çalışırken bir çağrı gelir; önce programın durumu kaydedilir. Altprogram için parametreleri, yerel verileri ve dönüş adresini içeren bir etkinlik kaydı hazırlanır ve altprogram çalışır. Bitince, fonksiyonsa dönüş değeri ayarlanır, program durumu geri yüklenir ve program kaldığı yerden devam eder.",
  ],
},
{
  id: "simple", ch: "9.2 Basit altprogramlar", chip: "\"Basit\" altprogramların gerçekleştirilmesi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Basit altprogram: <em>her şey statik</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:620px;gap:16px">
        <div class="card r" data-s="0" style="padding:18px 24px"><p style="font-size:22px"><b>Basit</b> = bütün yerel değişkenleri statik, iç içe tanımlanamayan altprogramlar. Örnek: <b>Fortran I</b>.</p></div>
        <div class="card tint-t r" data-s="1" style="padding:18px 24px"><h3 class="tl" style="font-size:26px">Çağrıda</h3><p style="font-size:21px;line-height:1.6">1. Çağıranın durumunu sakla<br>2. Parametreleri aktar<br>3. Dönüş adresini çağrılana ver<br>4. Denetimi çağrılana ver</p></div>
        <div class="card tint-a r" data-s="2" style="padding:18px 24px"><h3 class="hl" style="font-size:26px">Dönüşte</h3><p style="font-size:21px;line-height:1.6">1. Değer-sonuç parametrelerini gerçek parametrelere kopyala<br>2. Fonksiyonsa sonucu çağıranın bulacağı yere koy<br>3. Çağıranın durumunu geri yükle<br>4. Denetimi çağırana ver</p></div>
      </div>
      <div class="col f1" style="gap:16px">
        <div class="row r" data-s="3" style="gap:20px;align-items:flex-start">
          ${AR("etkinlik kaydı", [["Fonksiyon dönüş değeri"], ["Yerel değişkenler"], ["Parametreler"], ["Dönüş adresi"]], { c: "violet", w: 340, fs: 21 })}
          <div class="col" style="gap:6px;width:300px">
            ${[["Ortak bellek", "line"], ["main: veri", "teal"], ["A: veri", "violet"], ["B: veri", "violet"], ["main: kod", "faint"], ["A: kod", "faint"], ["B: kod", "faint"]].map(([t, c]) => `<div class="box" style="height:40px;font-size:19px;border-color:var(--${c})">${t}</div>`).join("")}
          </div>
        </div>
        <div class="card r" data-s="4" style="padding:16px 22px"><p style="font-size:21px">Kaydın biçimine <b>etkinlik kaydı</b>, çağrı anında değerlerle dolmuş haline <b>etkinlik kaydı örneği</b> (instance) denir. Burada her altprogramın <b>tek</b> örneği vardır ve statik bellektedir.</p></div>
        <div class="note r" data-s="5" style="font-size:21px">✓ Basit ve hızlı erişim · ✕ <b>Özyineleme yok</b>: g kendini çağırırsa tek kaydının üzerine yazar!</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 9.2: Basit altprogramların gerçekleştirilmesi. Basit altprogramdan kastımız, bütün yerel değişkenleri statik olan ve iç içe tanımlanamayan altprogramlardır. İlk Fortran sürümleri buna örnektir.",
    "Bir çağrıda dört şey yapılır: çağıranın çalışma durumu saklanır, parametre aktarımı yapılır, dönüş adresi çağrılan altprograma verilir ve denetim çağrılana geçer.",
    "Dönüşte de dört şey yapılır: değer-sonuç ile geçirilen parametreler varsa değerleri gerçek parametrelere kopyalanır; altprogram bir fonksiyonsa dönüş değeri çağıranın bulacağı yere konur; çağıranın çalışma ortamı geri yüklenir ve denetim çağırana döner.",
    "Bunun için saklanması gerekenler: çağıranın durum bilgisi, parametreler, dönüş adresi ve fonksiyonsa dönüş değeri. Altprogramın kod olmayan, veri kısmının yerleşim planına etkinlik kaydı denir. Basit altprogramlarda bu kayıtlar, kodla birlikte statik bellekte yer alır.",
    "Kaydın biçimine etkinlik kaydı, çağrı anında gerçek değerlerle doldurulmuş haline ise etkinlik kaydı örneği denir. Basit altprogramlarda her altprogramın yalnızca tek bir örneği olabilir.",
    "Bu yaklaşımın avantajı basitlik ve hızlı erişimdir. Ama büyük bir dezavantajı var: özyineleme desteklenemez. Bir altprogram kendini çağırırsa, tek kaydının üzerine yazar ve önceki çağrının parametreleri ile dönüş adresi kaybolur.",
  ],
},
{
  id: "stack-ar", ch: "9.3 Yığıt-dinamik yereller", chip: "Yığıt-dinamik yerel değişkenlerle gerçekleştirim",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Etkinlik kaydı <em>yığıtta</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:680px;gap:16px">
        <div class="card r" data-s="0" style="padding:18px 24px"><p style="font-size:22px"><b>Daha karmaşık</b>, çünkü: derleyici yer ayırma/geri verme kodu üretmeli; özyineleme → aynı anda <b>birden çok örnek</b>; bazı dillerde yerel dizi boyu çağrıda belli → kayıt boyu dinamik.</p></div>
        <div class="r" data-s="1">${code("sub.c", ["void sub(float total, int part) {", "   int list[5];", "   float sum;", "   ...", "}"], { lang: "c", cls: "sm" })}</div>
        <div class="card r" data-s="3" style="padding:16px 22px"><p style="font-size:21px;line-height:1.6"><b class="hl">Dinamik bağ:</b> çağıranın kaydının başını gösterir (çağrı zinciri).<br><b class="vl">Statik bağ:</b> yerel olmayan değişkenler için, statik ebeveyni gösterir.<br>Biçim statik, <b>boyut</b> dinamik olabilir; kayıt çağrıda oluşturulur.</p></div>
      </div>
      <div class="col f1 r" data-s="2" style="gap:0;align-items:center">
        <div style="font-size:20px;color:var(--faint);margin-bottom:6px">yığıtın tepesi ↑</div>
        <div style="width:440px;border:2px solid var(--violet);border-radius:14px;overflow:hidden;background:var(--panel)">
          ${[["sum", "yerel", "teal"], ["list[4]", "yerel", "teal"], ["list[3]", "yerel", "teal"], ["list[2]", "yerel", "teal"], ["list[1]", "yerel", "teal"], ["list[0]", "yerel", "teal"], ["part", "parametre", "violet"], ["total", "parametre", "violet"], ["dinamik bağ", "", "amber"], ["statik bağ", "", "amber"], ["dönüş adresi", "", "coral"]].map(([n, k, c], i) => `<div style="display:flex;justify-content:space-between;padding:7px 18px;${i ? "border-top:1px solid var(--line)" : ""};font-size:22px"><span class="mono" style="color:var(--${c})">${n}</span><span style="color:var(--faint);font-size:19px">${k}</span></div>`).join("")}
        </div>
        <div style="font-size:20px;color:var(--faint);margin-top:6px">sub için etkinlik kaydı (ARI)</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 9.3: Yığıt-dinamik yerel değişkenlerle gerçekleştirim. Bugünkü dillerin çoğunda yerel değişkenler yığıttadır ve bu iş daha karmaşıktır. Derleyici, yerel değişkenler için örtük yer ayırma ve geri verme kodu üretmelidir. Özyineleme mümkün olduğu için aynı altprogramın aynı anda birden çok etkinlik kaydı örneği bulunabilir. Bazı dillerde yerel dizilerin boyu çağrı sırasında belirlendiği için, kaydın boyu da dinamik olabilir.",
    "Bu C fonksiyonuna bakalım: iki parametresi, total ve part; ve iki yerel değişkeni, beş elemanlı list dizisi ve sum var.",
    "Etkinlik kaydı yığıtta alttan üste şöyle dizilir: en altta dönüş adresi, sonra statik bağ ve dinamik bağ, ardından parametreler total ve part, en üstte de yerel değişkenler: list'in beş elemanı ve sum.",
    "Dinamik bağ, çağıran altprogramın etkinlik kaydının başını gösterir; dinamik bağların oluşturduğu zincire çağrı zinciri denir. Statik bağ ise yerel olmayan değişkenlere erişmek için kullanılır ve altprogramın statik ebeveyninin kaydını gösterir; birazdan ayrıntılı göreceğiz. Kaydın biçimi statiktir, yani derleme zamanında bilinir; ama kaydın kendisi her çağrıda dinamik olarak oluşturulur.",
  ],
},
{
  id: "stack-trace", ch: "9.3 Yığıt-dinamik yereller", chip: "Örnek: main → B → A → C",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Çağrılar ilerledikçe <em>yığıt</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:680px;gap:16px">
        <div class="r" data-s="0">${code("abc.c", ["void A(int x) { int y;   ... C(y); ... }", "void B(float r) { int s, t; ... A(s); ... }", "void C(int q) { ... }", "void main() { float p; ... B(p); ... }"], { lang: "c", cls: "xs" })}</div>
        <div class="card r" data-s="4" style="padding:16px 22px"><p style="font-size:21px">Yığıttaki dinamik bağların toplamı: <b>çağrı zinciri</b>.<br>Yerel değişkenlere kaydın başından <b>bağıl konumla</b> (local_offset) erişilir; bu konumları derleyici belirler.</p></div>
      </div>
      <div class="f1" style="display:flex;flex-direction:column-reverse;gap:10px;align-items:flex-start">
        ${AR("main", [["p", "yerel"]], { c: "teal", s: 0, w: 480 })}
        ${AR("B", [["t", "yerel"], ["s", "yerel"], ["r", "parametre"], ["dinamik bağ", "→ main", "amber"], ["dönüş", "main'e", "coral"]], { c: "violet", s: 1, w: 480 })}
        ${AR("A", [["y", "yerel"], ["x", "parametre"], ["dinamik bağ", "→ B", "amber"], ["dönüş", "B'ye", "coral"]], { c: "amber", s: 2, w: 480 })}
        ${AR("C", [["q", "parametre"], ["dinamik bağ", "→ A", "amber"], ["dönüş", "A'ya", "coral"]], { c: "coral", s: 3, w: 480 })}
        <div class="r" data-s="1" style="font-size:20px;color:var(--faint)">yığıtın tepesi ↑</div>
      </div>
    </div>
  </div>`,
  n: [
    "Özyinelemesiz bir örnek izleyelim: main, B'yi; B, A'yı; A da C'yi çağırıyor. Yığıtın en altında main'in kaydı ve onun yerel değişkeni p var.",
    "main, B'yi çağırdığında yığıta B'nin kaydı eklenir: dönüş adresi main'e, dinamik bağ main'in kaydına işaret eder; ayrıca parametre r ve yereller s ile t yer alır.",
    "B, A'yı çağırınca A'nın kaydı eklenir: dönüş adresi B'ye, dinamik bağ B'nin kaydına; parametre x ve yerel y.",
    "A, C'yi çağırınca C'nin kaydı en üste eklenir: parametre q, dinamik bağ A'ya. C bittiğinde kaydı silinir ve A kaldığı yerden devam eder; sonra A, sonra B biter. Yığıt, tıpkı çağrılar gibi en son giren ilk çıkar mantığıyla çalışır.",
    "Herhangi bir anda yığıttaki dinamik bağların oluşturduğu zincire çağrı zinciri denir. Yerel değişkenlere ise kaydın başlangıcına göre sabit bir uzaklıkla, yani yerel bağıl konumla erişilir. Bu konumları derleyici derleme zamanında belirler; böylece çalışma zamanında bir değişkeni aramak gerekmez.",
  ],
},
{
  id: "recursion-ar", ch: "9.3 Yığıt-dinamik yereller", chip: "Özyinelemede etkinlik kayıtları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">factorial(3): kayıtlar <em>dolup boşalır</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:560px;gap:16px">
        <div class="r" data-s="0">${code("fact.c", ["int factorial(int n) {", "   if (n <= 1) return 1;", "   else return n * factorial(n - 1);", "}", "void main() {", "   int value;", "   value = factorial(3);", "}"], { lang: "c", cls: "xs" })}</div>
        <div class="card r" data-s="1" style="padding:16px 22px"><p style="font-size:21px">Kayıtta ek bir alan: <b>fonksiyon değeri</b>. Her çağrının kendi n'i ve kendi dönüş değeri yeri var.</p></div>
      </div>
      <div class="f1" style="display:flex;flex-direction:column-reverse;gap:10px;align-items:flex-start">
        ${AR("main", [["value", sw([["?", 0, 6], ["6", 6]], "amber")]], { c: "teal", s: 0, w: 460 })}
        ${AR("fact(3)", [["fonksiyon değeri", sw([["?", 1, 6], ["6", 6]], "amber")], ["n", "3"], ["dinamik bağ", "→ main", "faint"], ["dönüş", "main'e", "coral"]], { c: "violet", s: 1, h: 7, w: 460 })}
        ${AR("fact(2)", [["fonksiyon değeri", sw([["?", 2, 5], ["2", 5]], "amber")], ["n", "2"], ["dinamik bağ", "→ fact(3)", "faint"], ["dönüş", "fact'e", "coral"]], { c: "violet", s: 2, h: 6, w: 460 })}
        ${AR("fact(1)", [["fonksiyon değeri", sw([["?", 3, 4], ["1", 4]], "amber")], ["n", "1"], ["dinamik bağ", "→ fact(2)", "faint"], ["dönüş", "fact'e", "coral"]], { c: "amber", s: 3, h: 5, w: 460 })}
      </div>
    </div>
  </div>`,
  n: [
    "Özyinelemede aynı etkinlik kaydı biçimi kullanılır; tek farkı fonksiyonlar için bir fonksiyon değeri alanı eklenmesidir. main, factorial üçü çağırıyor.",
    "factorial üç için bir kayıt açılır: fonksiyon değeri henüz bilinmiyor, n üç, dinamik bağ main'i gösteriyor.",
    "n birden büyük olduğu için factorial iki çağrılır ve yığıta ikinci, ayrı bir kayıt eklenir; bu kaydın n'i iki.",
    "factorial bir çağrılır ve üçüncü kayıt eklenir. n bir olduğu için özyineleme burada durur.",
    "factorial bir, fonksiyon değeri alanına biri yazar ve döner; kaydı silinir.",
    "factorial iki, iki çarpı bir, yani iki sonucunu kendi fonksiyon değeri alanına yazar ve döner.",
    "factorial üç, üç çarpı iki, yani altı sonucunu yazar ve döner; main'deki value altı olur.",
    "Her çağrının kendi n'i ve kendi dönüş değeri yeri olduğu için, aynı fonksiyonun üç etkin örneği birbirine karışmadan çalışabildi. İşte statik kayıtlarla mümkün olmayan özyinelemeyi, yığıt-dinamik kayıtlar bu şekilde mümkün kılar.",
  ],
},
];
