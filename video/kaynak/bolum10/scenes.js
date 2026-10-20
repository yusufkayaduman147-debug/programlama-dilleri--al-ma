const { code } = require("../build/lib");

const roadmap = ["Neden ayrıştırma?", "Soyutlama ve modülerlik", "Bilgi saklama ve koruma", "Ayrı ve bağımsız derleme", "Pascal ve C'de modüller", "Veri soyutlama"];

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:18px;margin-bottom:50px;align-items:center">
      ${[["arayüz", "teal"], ["modül", "violet"], ["modül", "violet"], ["modül", "violet"], ["gerçekleştirim", "amber"]].map(([t, c], i) => `<div class="card r rp" data-s="1" style="padding:16px 26px;transition-delay:${i * 0.1}s"><div style="font-size:28px;color:var(--${c});font-weight:700">${t}</div></div>`).join("")}
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:116px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 10: Program Ayrıştırma</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin onuncu bölümüne hoş geldiniz. Bu bölümün konusu program ayrıştırma.",
    "Büyük bir yazılımın küçük, bağımsız parçalara nasıl bölündüğünü; soyutlama, modülerlik, bilgi saklama ve ayrı derleme kavramlarını inceleyeceğiz. Bu bölüm büyük ölçüde kavramsal; kod örnekleri çok kısa ve yalnızca fikri göstermek için.",
  ],
},
{
  id: "roadmap", ch: "Giriş", chip: "Yol haritası",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bu bölümde <em>neler var?</em></h2>
    <div class="grid2" style="gap:26px 60px;margin-top:10px">
      ${roadmap.map((t, i) => `<div class="r rl" data-s="${i < 3 ? 1 : 2}" style="display:flex;align-items:center;gap:26px;transition-delay:${(i % 3) * 0.15}s;grid-row:${(i % 3) + 1};grid-column:${i < 3 ? 1 : 2}">
          <span class="mono" style="font-size:30px;font-weight:700;color:var(--amber);background:rgba(255,181,71,.12);border-radius:16px;width:80px;height:66px;display:flex;align-items:center;justify-content:center">${i + 1}</span>
          <span style="font-size:36px;font-weight:600">${t}</span></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Yol haritamıza bakalım.",
    "Önce büyük programları neden ayrıştırmamız gerektiğini, ardından soyutlama ve modülerlik kavramlarını ve bilgi saklamayı göreceğiz.",
    "Sonra modüllerin ayrı ve bağımsız derlenmesini, Pascal ve C dillerinin bu konudaki yaklaşımlarını ve son olarak nesneye yönelik programlamanın temeli olan veri soyutlamasını inceleyeceğiz.",
  ],
},
{
  id: "why", ch: "10.1 Giriş", chip: "<b>10.1</b> Giriş: neden ayrıştırma?",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Büyük yazılım = <em>birçok küçük birim</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:640px;gap:18px">
        <div class="card r" data-s="1" style="padding:22px 28px"><p style="font-size:24px">Yazılım mühendisliğine göre bir sistem, birbirleriyle <b>tanımlı ve denetimli</b> biçimde etkileşen ama <b>bağımsız</b> olarak tasarlanabilen, gerçekleştirilebilen ve sınanabilen birimlerden oluşmalı.</p></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><p style="font-size:24px">Birçok geliştirici aynı anda çalışır → dil, birimlerin <b>diğerlerine ihtiyaç duymadan</b> derlenip çalıştırılmasını desteklemeli.</p></div>
        <div class="note r" data-s="4" style="font-size:23px">Temeldeki iki ilke: <b>soyutlama</b> ve <b>modülerlik</b>. Konu hem teknik hem <b>yönetimsel</b> boyutuyla yazılım mühendisliğinde incelenir.</div>
      </div>
      <svg viewBox="0 0 900 560" style="width:900px;height:560px" font-family="Inter" class="r" data-s="3">
        ${[[450, 60, "Yazılım sistemi", "#ffb547", 300]].map(([x, y, t, c, w]) => `<rect x="${x - w / 2}" y="${y - 32}" width="${w}" height="64" rx="14" fill="#151a31" stroke="${c}" stroke-width="3"/><text x="${x}" y="${y + 9}" fill="#eef0fa" font-size="26" text-anchor="middle">${t}</text>`).join("")}
        ${[[150, "Arayüz", "Ekip 1"], [450, "İş mantığı", "Ekip 2"], [750, "Veritabanı", "Ekip 3"]].map(([x, t, e], i) => `<line x1="450" y1="92" x2="${x}" y2="200" stroke="#3a4278" stroke-width="3"/><rect x="${x - 120}" y="200" width="240" height="64" rx="14" fill="#151a31" stroke="#a493ff" stroke-width="3"/><text x="${x}" y="241" fill="#eef0fa" font-size="24" text-anchor="middle">${t}</text>
          ${[0, 1].map((k) => `<line x1="${x}" y1="264" x2="${x - 60 + k * 120}" y2="360" stroke="#3a4278" stroke-width="2.5"/><rect x="${x - 110 + k * 120}" y="360" width="100" height="54" rx="12" fill="#151a31" stroke="#35d0c0" stroke-width="2.5"/><text x="${x - 60 + k * 120}" y="394" fill="#a2a9d2" font-size="19" text-anchor="middle">birim</text>`).join("")}
          <text x="${x}" y="470" fill="#ffb547" font-size="24" text-anchor="middle" font-weight="700">👥 ${e}</text>`).join("")}
        <text x="450" y="530" fill="#6b7399" font-size="21" text-anchor="middle">her ekip kendi birimini ayrı tasarlar, derler, sınar</text>
      </svg>
    </div>
  </div>`,
  n: [
    "Bölüm 10.1: Giriş. Binlerce satırlık bir programı tek parça olarak geliştirmek imkânsıza yakındır. Programın büyüklüğü arttıkça birimleri ve aralarındaki bağlantıları tanımlamak karmaşıklaşır.",
    "Yazılım mühendisliği ilkelerine göre bir yazılım sistemi, birbirleriyle tanımlı ve denetimli bir şekilde etkileşen, ama birbirlerinden bağımsız olarak tasarlanabilen, gerçekleştirilebilen ve sınanabilen birimlerden oluşmalıdır.",
    "Büyük projelerde birçok geliştirici ya da ekip, yazılımın farklı bölümlerinin tasarımını, kodlamasını ve sınanmasını aynı anda yürütür. Bu yüzden kullanılan programlama dili, altprogramların ve diğer program birimlerinin, diğer bölümlere ihtiyaç duymadan ayrı ayrı derlenip çalıştırılabilmesini desteklemelidir.",
    "Şekilde böyle bir proje görüyorsunuz: sistem arayüz, iş mantığı ve veritabanı gibi parçalara, onlar da daha küçük birimlere ayrılıyor. Her ekip kendi birimini bağımsız olarak geliştiriyor. Bu düzenleme, özellikle çok sayıda programcının çalıştığı projelerde, tüm sistemin anlaşılabilirliğini doğrudan etkiler.",
    "Dillerin ayrıştırmayı desteklemek için sunduğu bütün yaklaşımların temelinde iki ilke vardır: soyutlama ve modülerlik. Bu konu yazılım mühendisliğinde hem teknik hem de yönetimsel boyutuyla incelenir.",
  ],
},
{
  id: "abs-mod", ch: "10.2 Soyutlama ve modülerlik", chip: "<b>10.2</b> Soyutlama ve modülerlik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İki temel ilke</h2>
    <div class="grid2" style="gap:34px">
      <div class="card tint-t r" data-s="1" style="padding:28px 34px"><h3 class="tl">Soyutlama (abstraction)</h3><p>Önemsiz ayrıntıları göz ardı edip <b>önemli özelliklere</b> odaklanmak. Bir amaç için gereken özellikleri gerekmeyenlerden ayırmak.</p>
        <div class="pills r" data-s="2" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px"><span class="pill t">altprogramlar</span><span class="pill t">modüller</span><span class="pill t">kullanıcı tanımlı tipler</span><span class="pill t">nesneler</span></div>
        <p class="r" data-s="2" style="font-size:22px;margin-top:10px">← dillerdeki soyutlama araçları</p></div>
      <div class="card tint-v r" data-s="3" style="padding:28px 34px"><h3 class="vl">Modülerlik (modularity)</h3><p>Programı, <b>ilişkili tanımlamalar topluluğu</b> olan küçük parçalara, yani <b>modüllere</b> bölerek tasarlamak.</p>
        <div class="pills r" data-s="3" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px"><span class="pill v">yordamlar</span><span class="pill v">değişkenler</span><span class="pill v">sabitler</span><span class="pill v">tipler</span></div>
        <p class="r" data-s="3" style="font-size:22px;margin-top:10px">← tipik bir modülün içeriği</p></div>
    </div>
    <div class="card r" data-s="4" style="padding:22px 30px;margin-top:28px"><h3 style="font-size:28px">İyi bir modül…</h3>
      <div class="grid3" style="gap:20px;margin-top:6px">${["yararlı bir <b>soyutlamayı</b> temsil eder", "diğer modüllerle <b>önceden tanımlı</b> biçimde etkileşir", "diğer modüllerin yalnızca <b>tanımına (spesifikasyon)</b> bakılarak tasarlanabilir, derlenebilir, değiştirilebilir"].map((t) => `<p style="font-size:23px">✓ ${t}</p>`).join("")}</div></div>
  </div>`,
  n: [
    "Bölüm 10.2: Yazılım geliştirmede soyutlama ve modülerlik.",
    "Soyutlama, bir problemin önemsiz ayrıntılarını göz ardı ederek önemli özelliklerine odaklanmaktır. Bir harita düşünün: bir şehrin her ağacını değil, yalnızca yolculuk için gereken yolları gösterir. Soyutlama ile bir amaç için gerekli özellikler, gerekmeyenlerden ayrılır.",
    "Programlama dillerinde soyutlama araçları altprogramlar, modüller, kullanıcı tanımlı tipler ve nesnelerdir.",
    "Modülerlik ise bir programın, modül adı verilen küçük parçalara bölünerek tasarlanmasıdır. Modül, ilişkili tanımlamaların bir topluluğudur; tipik bir modül yordamlar, ilişkili değişkenler, sabitler ve tiplerden oluşur.",
    "İyi bir modülün üç özelliği vardır: yararlı bir soyutlamayı temsil eder; diğer modüllerle önceden tanımlanmış biçimlerde etkileşir; ve diğer modüllerin yalnızca tanımına, yani spesifikasyonuna bakılarak tasarlanabilir, gerçekleştirilebilir, derlenebilir ve değiştirilebilir. Yani bir modülü yazarken diğerlerinin içini bilmek zorunda kalmamalıyız.",
  ],
},
{
  id: "proc-limits", ch: "10.2 Soyutlama ve modülerlik", chip: "<b>10.2.1</b> Yordam ve fonksiyonların modülerliği",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Fonksiyonlar <em>yetmez</em></h2>
    <div class="row" style="flex:1;gap:40px;align-items:center">
      <div class="col f1" style="gap:20px">
        <div class="card r" data-s="1" style="padding:24px 30px"><p style="font-size:25px">Yordam ve fonksiyonlar <b>ilk soyutlama mekanizmalarıdır</b>; küçük programları yapılandırmak için yararlıdırlar.</p></div>
        <div class="card tint-c r" data-s="2" style="padding:24px 30px"><p style="font-size:25px">Ama büyük programlar için <b>yeterli değil</b>: fonksiyonlarla yeterince <b>bilgi saklama</b> yapılamaz. Veriler hâlâ paylaşılır.</p></div>
        <div class="card tint-t r" data-s="3" style="padding:24px 30px"><p style="font-size:25px">Bu yüzden <b>soyut veri tipleri</b> ve <b>nesneye yönelik programlama</b> popülerlik kazandı. Java, C++, C#, Ada, Fortran 90: altprogramların, tiplerin ve verilerin <b>ayrı derlenmesi</b> + birim içine <b>erişim denetimi</b>.</p></div>
      </div>
      <div class="col r" data-s="1" style="width:520px;gap:10px;align-items:center">
        ${[["fonksiyon", "1960'lar", "violet"], ["modül", "1970'ler", "amber"], ["soyut veri tipi", "1980'ler", "teal"], ["sınıf / nesne", "1990'lar", "green"]].map(([t, d, c], i) => `${i ? '<div style="color:var(--faint);font-size:28px">↓</div>' : ""}<div class="box r" data-s="${i < 2 ? 1 : 3}" style="width:440px;border-color:var(--${c});flex-direction:row;justify-content:space-between;padding:14px 26px;font-size:26px;transition-delay:${(i % 2) * 0.2}s"><span>${t}</span><span style="color:var(--faint);font-weight:400;font-size:21px">${d}</span></div>`).join("")}
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 10.2.1: Yordam ve fonksiyonların modülerliği.",
    "Yordamlar ve fonksiyonlar programlamada kullanılan ilk soyutlama mekanizmalarıdır ve küçük programları yapılandırmak için yararlıdırlar.",
    "Ancak büyük programların geliştirilmesi için yeterli değildirler. Çünkü yalnızca yordam ve fonksiyonlarla bir programı ayrıştırdığımızda yeterince bilgi saklama yapılamaz: fonksiyonlar arasında paylaşılan veriler herkese açık kalır.",
    "Bu yüzden yazılım mühendisliğinin gelişimi içinde modülerlik aracı olarak önce modüller, sonra soyut veri tipleri ve nesneye yönelik programlama öne çıktı. Bugün Java, C++, C#, Ada ve Fortran 90 gibi diller altprogramların, tip tanımlarının ve verilerin ayrı olarak derlenmesini ve bir birimin içindeki elemanlara erişimin denetlenmesini sağlayan yapılar sunar.",
  ],
},
{
  id: "hiding", ch: "10.2 Bilgi saklama", chip: "<b>10.2.2</b> Bilgi saklama (information hiding)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bilgi saklama: <em>arayüz görünür, içi gizli</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:660px;gap:18px">
        <div class="card r" data-s="1" style="padding:22px 28px"><p style="font-size:23px">Amaç: olabildiğince <b>bağımsız</b> modüller. Her modül <b>bir tasarım kararını</b> saklar; karar değişirse yalnızca o modül değişir.</p></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><p style="font-size:23px">Temeldeki fikir <b>erişim denetimi</b>: okumayı ve bakımı kolaylaştırır.</p></div>
        <div class="note r" data-s="4" style="font-size:22px"><b>Koruma kuralı:</b> gerçekleştirim istemcilere <b>görünmemeli</b>. Arayüzün gerçekleştirimden açıkça ayrılması, istemci ile sunucuyu birbirinden bağımsız kılar.</div>
      </div>
      <svg viewBox="0 0 900 560" style="width:900px;height:560px" font-family="Inter">
        <g class="r" data-s="3">
          <rect x="40" y="200" width="200" height="120" rx="18" fill="#151a31" stroke="#35d0c0" stroke-width="3"/><text x="140" y="250" fill="#35d0c0" font-size="28" text-anchor="middle" font-weight="700">İstemci</text><text x="140" y="285" fill="#a2a9d2" font-size="20" text-anchor="middle">modülü kullanan</text>
          <rect x="360" y="60" width="480" height="440" rx="22" fill="none" stroke="#a493ff" stroke-width="3" stroke-dasharray="10 8"/><text x="600" y="100" fill="#a493ff" font-size="24" text-anchor="middle" font-weight="700">MODÜL (sunucu)</text>
          <rect x="390" y="130" width="420" height="110" rx="16" fill="rgba(53,208,192,.12)" stroke="#35d0c0" stroke-width="3"/><text x="600" y="175" fill="#eef0fa" font-size="26" text-anchor="middle" font-weight="700">Arayüz (interface)</text><text x="600" y="210" fill="#a2a9d2" font-size="20" text-anchor="middle">ne sunuyor? nasıl erişilir?</text>
          <rect x="390" y="270" width="420" height="200" rx="16" fill="rgba(255,122,122,.08)" stroke="#ff7a7a" stroke-width="3"/><text x="600" y="320" fill="#eef0fa" font-size="26" text-anchor="middle" font-weight="700">Gerçekleştirim</text><text x="600" y="355" fill="#a2a9d2" font-size="20" text-anchor="middle">(implementation)</text><text x="600" y="420" fill="#ff7a7a" font-size="44" text-anchor="middle">🔒</text>
          <path d="M240,240 L384,190" stroke="#35d0c0" stroke-width="4" marker-end="url(#ha)"/><text x="300" y="195" fill="#35d0c0" font-size="20" text-anchor="middle">✓ erişir</text>
          <path d="M240,290 L384,350" stroke="#ff7a7a" stroke-width="4" stroke-dasharray="8 6"/><text x="312" y="360" fill="#ff7a7a" font-size="26" text-anchor="middle">✕</text>
        </g>
        <defs><marker id="ha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="#35d0c0"/></marker></defs>
      </svg>
    </div>
  </div>`,
  n: [
    "Bölüm 10.2.2: Bilgi saklama.",
    "Bir yazılım sistemini ayrıştırırken amaç, birbirinden olabildiğince bağımsız modüller geliştirmektir. Çünkü her modül belirli bir tasarım kararını temsil eder; o karar değişirse yalnızca o modülü değiştirmek ve diğerlerini etkilememek isteriz.",
    "Bu amaca yönelik yaklaşıma bilgi saklama denir ve temelindeki fikir erişim denetimidir. Programların okunmasını ve bakımını kolaylaştırır.",
    "Modülerlik yaklaşımına göre bir modül, istemcilerinin, yani onu kullanan program birimlerinin kullanabileceği hizmetler sunar ve bu hizmetlerin nasıl yapıldığını dışarıdan korur. Böylece bir modül iki bölümden oluşur: hizmetlere nasıl erişileceğini anlatan arayüz ve hizmetleri gerçekten yapan gerçekleştirim. İstemci arayüze erişebilir, ama gerçekleştirime erişemez.",
    "Koruma kuralı gereği modülün gerçekleştirimi istemciler tarafından görünmemelidir. Arayüzün gerçekleştirimden açıkça ayrılması, istemci ile sunucunun birbirinden bağımsız olmasını sağlar. Bir arabanın direksiyonu ve pedalları arayüz, motoru ise gerçekleştirim gibidir: sürücü motoru bilmeden arabayı kullanabilir, motor değişse de sürüş aynı kalır.",
  ],
},
{
  id: "protection", ch: "10.2 Bilgi saklama", chip: "<b>10.2.2.1–2</b> Koruma: C ve C++",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Koruma <em>birimleri</em></h2>
    <div class="grid2" style="gap:34px">
      <div class="col">
        <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:30px">C: fonksiyon</h3><p style="font-size:22px">Koruma birimi <b>fonksiyondur</b>. Fonksiyon <b>prototipi</b> basit bir arayüzdür: ne aldığını ve ne döndürdüğünü söyler, nasıl yaptığını değil.</p></div>
        <div class="r" data-s="1">${code("prototip", ["float ortalama(int dizi[], int n);   // arayüz", "", "float ortalama(int dizi[], int n) {  // gerçekleştirim", "   ...", "}"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col">
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:30px">C++: sınıf</h3><p style="font-size:22px">Koruma birimi <b>sınıftır</b>. Arayüz = istemcilerin erişebildiği (<span class="mono tl">public</span>) fonksiyonlar; veri <span class="mono cl">private</span>.</p></div>
        <div class="r" data-s="2">${code("zaman.cpp", ["class Zaman {", { t: "public:                   // arayüz", hot: "3" }, { t: "   void ayarla(int s, int d);", hot: "3" }, { t: "   void yazdir();", hot: "3" }, { t: "private:                  // gizli", hot: "4" }, { t: "   int saat, dakika;", hot: "4" }, "};"], { lang: "c", cls: "xs" })}</div>
      </div>
    </div>
    <div class="note r" data-s="4" style="font-size:23px;margin-top:22px">İstemci <span class="mono">z.ayarla(9, 30)</span> yazabilir, ama <span class="mono">z.saat = 25</span> yazamaz: derleyici engeller. Zamanı dakika cinsinden saklamaya karar verirsek, istemciler hiç etkilenmez.</div>
  </div>`,
  n: [
    "Koruma yöntemleri, bilgi saklamayı destekleyen dil yapılarıdır ve diller bu konuda farklı olanaklar sunar.",
    "C'de koruma birimi fonksiyondur. Bir fonksiyon prototipi basit bir arayüz örneğidir: fonksiyonun adını, ne aldığını ve ne döndürdüğünü söyler, ama işi nasıl yaptığını söylemez. İşin nasıl yapıldığı gövdede, yani gerçekleştirimdedir.",
    "C++'ta koruma birimi sınıftır. Bir sınıfın arayüzü, istemcilerin erişebildiği bütün fonksiyonlardan oluşur. Zaman sınıfı örneğinde...",
    "public bölümündeki ayarla ve yazdir fonksiyonları arayüzü oluşturur; istemciler bunları çağırabilir.",
    "private bölümündeki saat ve dakika ise gizlidir. Bir istemci z nokta ayarla dokuz otuz yazabilir, ama z nokta saat eşittir yirmi beş yazamaz; derleyici buna izin vermez. Böylece geçersiz bir saat değeri dışarıdan atanamaz. Üstelik ileride zamanı yalnızca dakika cinsinden saklamaya karar verirsek, yalnızca sınıfın içini değiştiririz; onu kullanan istemciler hiç etkilenmez. Bilgi saklamanın kazancı tam olarak budur.",
  ],
},
{
  id: "compilation", ch: "10.3 Ayrı ve bağımsız derleme", chip: "<b>10.3</b> Ayrı ve bağımsız derleme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Derleme birimi ve <em>derleme türleri</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:720px;gap:18px">
        <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:28px">Derleme birimi</h3><p style="font-size:22px">Programın diğer bölümlerine <b>ihtiyaç duymadan derlenebilen</b> altprogram ve veri topluluğu. Amaç: bir değişiklikte her şeyi <b>yeniden derlememek</b>.</p></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:28px">Derleme sırası</h3><p style="font-size:22px">Derleyici çağrılan altprogramın parametre <b>sayısını, sırasını, tiplerini</b> bilmek isteyebilir → dil bir <b>sıra</b> isteyebilir: önce çağrılanlar ve paylaşılan veri tanımları.</p></div>
      </div>
      <div class="col f1" style="gap:18px">
        <div class="card tint-t r" data-s="3" style="padding:22px 28px"><h3 class="tl" style="font-size:28px">Ayrı derleme</h3><p style="font-size:22px">Modüller tek tek ama <b>belirli bir sırayla</b> derlenir. Derleyici diğer modüllerin arayüz bilgisini kullanır → modüller arası <b>tip denetimi</b> ✓</p></div>
        <div class="card tint-a r" data-s="4" style="padding:22px 28px"><h3 class="hl" style="font-size:28px">Bağımsız derleme</h3><p style="font-size:22px">Bir modül diğerlerinden <b>tamamen bağımsız</b> derlenir ve sınanır. Başka modüllerdeki elemanlar <b>statik olarak denetlenemez</b> ✕ (ör. ilk C).</p></div>
        <div class="row r" data-s="5" style="gap:12px;align-items:center;justify-content:center;font-size:22px"><span class="pill">a.c</span><span class="pill">b.c</span><span class="arrow">→</span><span class="pill v">derleyici</span><span class="arrow">→</span><span class="pill">a.o</span><span class="pill">b.o</span><span class="arrow">→</span><span class="pill a">bağlayıcı</span><span class="arrow">→</span><span class="pill t">program</span></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 10.3: Ayrı ve bağımsız derleme. Modülerliğin amacı, büyük programları bağımsız olarak geliştirilmiş küçük parçalardan oluşturmaktır. Bunun doğal sonucu, program birimlerinin ayrı ayrı derlenebilmesidir.",
    "Bir değişiklik yaptığımızda bütün programı yeniden derlemekten kaçınmak için, program, diğer bölümlerine ihtiyaç duymadan derlenebilen altprogram ve veri topluluklarına ayrılmalıdır. Böyle bir birime derleme birimi denir.",
    "Ancak bir birim derlenirken derleyici, çağrılan bir altprogramın beklediği parametrelerin sayısını, sırasını ve tiplerini ya da paylaşılan veri nesnelerini bilmek isteyebilir. Bu bilgiyi sağlamak için dil, belirli bir derleme sırası isteyebilir: bir altprogramdan önce, onun çağırdığı altprogramların ve paylaşılan veri tanımlarının derlenmesi gibi.",
    "Burada iki kavram ayrılır. Ayrı derlemede modüller tek tek, ama belirli bir sıraya göre derlenir; derleyici diğer modüllerin arayüz bilgilerini kullanabildiği için modüller arası tip denetimi yapılabilir.",
    "Bağımsız derlemede ise bir modül, programın diğer bölümlerinden tamamen bağımsız olarak derlenir ve sınanır. Bunun bedeli şudur: modülün başvurduğu ama kendisinde bulunmayan elemanlar statik olarak denetlenemez; yani modüller arası tutarlılık kontrol edilemez. İlk C derleyicileri bu şekilde çalışıyordu.",
    "Pratikte süreç şöyle işler: her kaynak dosya derleyici tarafından ayrı ayrı nesne dosyasına çevrilir, sonra bağlayıcı bu nesne dosyalarını birleştirerek çalıştırılabilir programı oluşturur. Bir dosya değiştiğinde yalnızca o dosya yeniden derlenir.",
  ],
},
{
  id: "pascal-c", ch: "10.3 Ayrı ve bağımsız derleme", chip: "<b>10.3.1–10.3.2</b> Pascal ve C'de modüller",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Pascal'da tek metin, C'de <em>iki dosya</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:560px;gap:16px">
        <div class="r" data-s="1">${code("prog.pas", ["program prog_adi;", "   { tipler, değişkenler,", "     yordam ve fonksiyonlar }", "begin", "   { deyimler }", "end."], { lang: "pascal", cls: "sm" })}</div>
        <div class="card tint-c r" data-s="2" style="padding:18px 24px"><p style="font-size:21px">İlk Pascal: ayrı derleme <b>yok</b>; iç içe yordamlar → çok sayıda <b>paylaşılan değişken</b>; tek metin büyüdükçe modül sınırları kaybolur. Ticari sürümler (Turbo Pascal) <b>unit</b> ekledi.</p></div>
      </div>
      <div class="col f1" style="gap:16px">
        <div class="row r" data-s="3" style="gap:16px">
          <div class="f1">${code("zaman.h  (arayüz)", ["#define MAX 24", "typedef struct {...} Zaman;", "void ayarla(Zaman*, int, int);"], { lang: "c", cls: "xs" })}</div>
          <div class="f1">${code("zaman.c  (gerçekleştirim)", ["#include \"zaman.h\"", "static int sayac;", "void ayarla(...) { ... }"], { lang: "c", cls: "xs" })}</div>
        </div>
        <div class="r" data-s="4">${code("main.c  (istemci)", ["#include \"zaman.h\"", "extern int toplam;   // başka dosyada tanımlı", "int main() { Zaman z; ayarla(&z, 9, 30); }"], { lang: "c", cls: "xs" })}</div>
        <div class="row r" data-s="5" style="gap:16px">
          <div class="card f1" style="padding:14px 20px"><div class="mono tl" style="font-size:24px">extern int toplam;</div><p style="font-size:20px">başka bir modülden <b>alınan</b> değişken</p></div>
          <div class="card f1" style="padding:14px 20px"><div class="mono cl" style="font-size:24px">static int ort;</div><p style="font-size:20px">diğer modüllerden <b>gizlenen</b> değişken</p></div>
        </div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 10.3.1 ve 10.3.2: Pascal ve C'de ayrı derleme.",
    "Bir Pascal programı tek bir metindir: program başlığı, ardından tip, değişken, yordam ve fonksiyon tanımları, en sonda da begin ile end arasındaki deyimler.",
    "Pascal'ın ilk sürümünde yalnızca fonksiyonlar ve yordamlar olduğu için modülerlik kısıtlıydı ve modüllerin ayrı derlenmesi mümkün değildi. Program yordamların iç içe yerleştirilmesiyle düzenlendiği için, birçok değişkenin birimler arasında paylaşılması gerekiyordu. Ayrıca tüm program tek bir metin olduğundan, program büyüdükçe modül sınırlarını görmek zorlaşıyordu. Sonraki yıllarda Turbo Pascal gibi ticari sürümler, bir modül çeşidi olan unit'leri ekledi; ama bu özellik standart Pascal'da yoktur.",
    "C'de ise fonksiyonlar ayrı dosyalara yerleştirilebilir. Bir mantıksal modül iki fiziksel parçadan oluşur. Arayüz, başlık yani header dosyasıdır; uzantısı nokta h'dir ve modülün dışarıya sunduğu sabitler, tipler ve fonksiyon bildirimleri burada yer alır. Gerçekleştirim dosyası ise nokta c uzantılıdır ve modülün dışarıdan erişilemeyen özel bölümünü içerir.",
    "Başka bir modülün hizmetlerini kullanmak isteyen istemci, o modülün başlık dosyasını include komutuyla ekler. Başlık dosyası sayesinde istemci, gerçekleştirim dosyasından bağımsız olarak derlenebilir. Yine de C'de arayüzü gerçekleştirimden tam olarak ayırmak mümkün değildir; bu ayrım programcının disiplinine kalır.",
    "C'de iki anahtar kelime önemlidir. extern ile tanımlanan bir değişken, bu dosyada kullanılacağını ama başka bir dosyada tanımlandığını belirtir; yani başka bir modülden alınır. static ile dosya düzeyinde tanımlanan bir değişken ise diğer modüller tarafından erişilemez; yani gizlenir.",
  ],
},
{
  id: "data-abs", ch: "10.4 Veri soyutlama", chip: "<b>10.4</b> Veri soyutlama",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Veri soyutlama: modülü <em>veriye göre</em> tasarla</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px;gap:18px">
        <div class="card r" data-s="1" style="padding:20px 26px"><p style="font-size:23px">Bilgi saklamanın ana gereksinimi: <b>veri paylaşımını azaltmak</b>. Modüller işlemlere göre değil, <b>verilere göre</b> tasarlanır. 1990'larda yaygınlaşan <b>nesneye yönelik programlama</b> bunun üzerine kurulu.</p></div>
        <div class="card r" data-s="2" style="padding:20px 26px"><p style="font-size:23px">Aslında <b>hazır tiplerin hepsi soyuttur</b>: <span class="mono hl">float</span>'ın bellekteki gerçek bit düzenini görmezsiniz ve işlemlerini değiştiremezsiniz.</p></div>
        <div class="card tint-t r" data-s="3" style="padding:20px 26px"><h3 class="tl" style="font-size:27px">Kullanıcı tanımlı soyut veri tipi</h3><p style="font-size:22px;line-height:1.6">1. Tip tanımı ve işlemleri <b>tek bir birimde</b><br>2. Diğer birimler bu tipten <b>nesne oluşturabilir</b><br>3. Nesnelerin iç gösterimi <b>görünmez</b>; yalnızca tanımdaki işlemler kullanılabilir</p></div>
      </div>
      <div class="col f1 r" data-s="4" style="gap:12px;align-items:center;zoom:1.35">
        <div style="font-size:24px;color:var(--muted)">Örnek: <b style="color:var(--text)">Yığıt</b> soyut veri tipi</div>
        <div class="row" style="gap:12px">${["push(x)", "pop()", "top()", "bosMu()"].map((t) => `<span class="pill t" style="font-size:22px">${t}</span>`).join("")}</div>
        <div style="font-size:20px;color:var(--teal)">↑ arayüz: istemcinin bildiği tek şey</div>
        <div class="card" style="padding:20px;width:460px;border:2px dashed var(--coral);text-align:center"><div style="font-size:22px;color:var(--coral);margin-bottom:10px">🔒 gizli gösterim</div><div class="row" style="gap:20px;justify-content:center"><div style="font-size:20px;color:var(--muted)">dizi mi?<div class="mono" style="font-size:22px;color:var(--text)">[3, 7, 9]</div></div><div style="font-size:20px;color:var(--muted)">bağlı liste mi?<div class="mono" style="font-size:22px;color:var(--text)">3→7→9</div></div></div></div>
        <div style="font-size:20px;color:var(--muted);text-align:center;width:460px">Gösterim değişse de istemci kodu <b style="color:var(--text)">aynı kalır</b>.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 10.4: Veri soyutlama.",
    "Bilgi saklamanın ana gereksinimi, verilerin paylaşımını azaltmaktır. Veri soyutlamasının temeli de modülleri programdaki işlemlere göre değil, verilere göre tasarlamaktır. Bu yaklaşım karmaşıklığı azaltarak büyük programları yönetilebilir kılar. 1990'larda yaygınlaşan nesneye yönelik programlama, tam olarak bu fikrin üzerine kuruludur.",
    "Aslında bir dilin hazır veri tiplerinin hepsi soyut veri tipleridir. Örneğin kayan noktalı tipte bir değerin bellekteki gerçek bit düzenini kullanıcı görmez ve bu tip için tanımlı işlemleri değiştiremez; yalnızca dilin sunduğu işlemleri kullanabilir.",
    "Kullanıcı tanımlı bir soyut veri tipi üç koşulu sağlamalıdır. Birincisi, tipin tanımı ve tip üzerindeki işlemler tek bir birimde bulunmalıdır. İkincisi, diğer program birimleri bu tipten nesneler oluşturabilmelidir. Üçüncüsü, nesnelerin iç gösterimi o tipi kullanan birimlerden gizlenmelidir; böylece nesneler üzerinde yalnızca tipin tanımında sağlanan işlemler kullanılabilir.",
    "Bir yığıt örneğini düşünelim. İstemcinin bildiği tek şey arayüzdür: push, pop, top ve boş mu işlemleri. Yığıtın içeride bir diziyle mi, yoksa bir bağlı listeyle mi tutulduğu gizlidir. Gösterimi değiştirmeye karar verirsek, yığıtı kullanan programların tek satırı bile değişmez. Kullanıcı tanımlı soyut veri tipleri bugün nesneye yönelik dillerde sınıflarla desteklenir.",
  ],
},
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="zoom:1.2">
      ${[["🧩", "t", "Soyutlama ve modülerlik", "Önemliye odaklan; programı ilişkili tanımlardan oluşan modüllere böl."], ["🔒", "a", "Bilgi saklama", "Modül = arayüz + gizli gerçekleştirim. C: fonksiyon, C++: sınıf (public/private)."],
         ["⚙️", "v", "Ayrı ve bağımsız derleme", "Derleme birimi. Ayrı: sıralı, modüller arası denetim. Bağımsız: denetim yok. C: .h + .c, extern, static."], ["📦", "c", "Veri soyutlama", "Modülü veriye göre tasarla; soyut veri tipi → nesneye yönelik programlama."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "Büyük yazılımlar, bağımsız olarak geliştirilebilen birimlere ayrıştırılmalıdır. Bunun iki temel ilkesi soyutlama ve modülerliktir: önemli olana odaklanmak ve programı ilişkili tanımlardan oluşan modüllere bölmek.",
    "Bilgi saklamada bir modül, görünür bir arayüz ve gizli bir gerçekleştirimden oluşur. C'de koruma birimi fonksiyon, C++'ta ise public ve private bölümleri olan sınıftır.",
    "Derleme birimleri ayrı ya da bağımsız derlenebilir: ayrı derlemede modüller arası denetim yapılabilir, bağımsız derlemede yapılamaz. C'de modüller başlık ve gerçekleştirim dosyalarına ayrılır; extern ve static görünürlüğü belirler.",
    "Son olarak veri soyutlama, modülleri verilere göre tasarlar ve nesneye yönelik programlamanın temelini oluşturur.",
  ],
},
{
  id: "quiz", ch: "Özet ve mini test", chip: "Mini test",
  html: (() => {
    const quiz = [["Bir modülün iki bölümü nedir?", "Arayüz (görünür) ve gerçekleştirim (gizli)."], ["Ayrı derleme ile bağımsız derleme arasındaki fark nedir?", "Ayrı: belirli sırayla, modüller arası denetim var. Bağımsız: tamamen ayrı, denetim yok."], ["C'de extern ve static ne işe yarar?", "extern: başka dosyadan alınan değişken. static: diğer modüllerden gizlenen değişken."], ["Kullanıcı tanımlı soyut veri tipinin üç koşulu nedir?", "Tanım ve işlemler tek birimde · nesne oluşturulabilir · iç gösterim gizli."], ["Yordam ve fonksiyonlar büyük programlar için neden yetersiz?", "Yeterince bilgi saklama yapılamaz; veriler paylaşılmaya devam eder."]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kendini <em>test et</em> <span class="emo">🧠</span></h2>
    <div class="stack" style="flex:1">
      ${quiz.map(([q, a], i) => `
      <div class="col r" data-s="${1 + i * 2}" data-h="${3 + i * 2}" style="gap:34px">
        <div class="card" style="padding:44px 50px"><div class="mono" style="color:var(--amber);font-size:28px;margin-bottom:16px">SORU ${i + 1} / ${quiz.length}</div>
          <div style="font-size:46px;font-weight:600;line-height:1.35">${q}</div></div>
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
    { t: "Soru 1. Bir modülün iki bölümü nedir?", pause: 3.5 }, "Cevap: Dışarıya görünen arayüz ve gizli tutulan gerçekleştirim.",
    { t: "Soru 2. Ayrı derleme ile bağımsız derleme arasındaki fark nedir?", pause: 3.5 }, "Cevap: Ayrı derlemede modüller belirli bir sırayla derlenir ve modüller arası denetim yapılabilir. Bağımsız derlemede modül tamamen ayrı derlenir ve bu denetim yapılamaz.",
    { t: "Soru 3. C'de extern ve static anahtar kelimeleri ne işe yarar?", pause: 3.5 }, "Cevap: extern, değişkenin başka bir dosyada tanımlı olduğunu ve oradan alındığını belirtir. static ise değişkeni diğer modüllerden gizler.",
    { t: "Soru 4. Kullanıcı tanımlı bir soyut veri tipinin üç koşulu nedir?", pause: 3.5 }, "Cevap: Tip tanımı ve işlemleri tek bir birimde olmalı; diğer birimler bu tipten nesne oluşturabilmeli; ve nesnelerin iç gösterimi gizli olmalı.",
    { t: "Soru 5. Yordam ve fonksiyonlar büyük programlar için neden yetersizdir?", pause: 3.5 }, "Cevap: Çünkü onlarla yeterince bilgi saklama yapılamaz; veriler birimler arasında paylaşılmaya devam eder.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 10 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Programlama Dilleri · <b style="color:var(--text)">Bölüm 1–10</b> konu anlatım serisi</div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta · Watt · Scott · Ahmet Yesevi Üniversitesi Uzaktan Eğitim Notları</div>
  </div>`,
  n: [
    "Bölüm 10'u, ve böylece bu konu anlatım serisini tamamladık! Dillerin tarihinden sözdizimine, veri tiplerinden altprogramlara ve program ayrıştırmaya kadar uzun bir yol yürüdük.",
    "Sınavlara hazırlanırken her bölümün sonundaki mini testleri tekrar çözmenizi ve özet ekranlarını gözden geçirmenizi öneririm. İzlediğiniz için teşekkürler, başarılar!",
  ],
},
];
