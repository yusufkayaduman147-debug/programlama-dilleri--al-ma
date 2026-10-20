const { code } = require("./lib");

module.exports = [
// ───────────────────────── Yazılabilirlik
{
  id: "writability", ch: "1.3 Yazılabilirlik", chip: "<b>1.3</b> Yazılabilirlik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="hl">Yazılabilirlik</span> · probleme göre değişir</h2>
    <p class="lead r" data-s="0" style="font-size:31px">Okunabilirliği etkileyen sadelik, ortogonallik ve sözdizimi, yazılabilirliği de etkiler.</p>
    <div class="grid2" style="gap:36px;flex:1">
      ${[["🪟", "Grafik arayüzlü uygulama", "Visual Basic", "C", 1], ["🧩", "İşletim sistemi", "C", "Visual Basic", 2]].map(([e, task, win, lose, s]) => `
      <div class="card r" data-s="${s}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;text-align:center">
        <div class="emo" style="font-size:110px">${e}</div>
        <h3 style="font-size:40px;margin:0">${task}</h3>
        <div style="display:flex;gap:18px;align-items:center;font-size:30px"><span class="pill t" style="font-size:32px">${win}</span><span style="color:var(--teal);font-weight:700">daha yazılabilir</span><span style="color:var(--faint)">›</span><span class="pill" style="font-size:26px;opacity:.6">${lose}</span></div></div>`).join("")}
    </div>
    <div class="note r" data-s="3" style="margin-top:30px;font-size:29px"><b>Sadelik ve ortogonallik:</b> Çok fazla yapı varsa programcı bazılarını hiç bilmez ve zahmetli yollar seçer. Az sayıda temel yapı + tutarlı birleştirme kuralları yazmayı kolaylaştırır — ama <b>aşırı ortogonallik</b> hataların fark edilmesini zorlaştırır.</div>
  </div>`,
  n: [
    "Şimdi yazılabilirliğe geçelim: Bir dil, seçilen problem için program yazmayı ne kadar kolaylaştırıyor? Okunabilirliği etkileyen sadelik, ortogonallik ve sözdizimi, yazılabilirliği de etkiler.",
    "Yazılabilirlik uygulama alanına göre değişir. Grafik arayüzlü bir program yazacaksanız, Visual Basic C'den çok daha yazılabilirdir.",
    "Ama bir işletim sistemi yazacaksanız, C açık ara daha uygundur.",
    "Çok sayıda yapı içeren bir dilde programcı bazı yapıları hiç bilmeyebilir ve daha zahmetli yollarla kod yazar. Az sayıda temel yapı ve tutarlı birleştirme kuralları, yani ortogonallik, yazmayı kolaylaştırır. Ama aşırı ortogonallik, hataların fark edilmesini zorlaştırabilir.",
  ],
},
{
  id: "abstraction", ch: "1.3 Yazılabilirlik", chip: "<b>1.3</b> Yazılabilirlik · Soyutlama",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="hl">Soyutlama</span> · ayrıntıyı gizle, özü kullan</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:560px">
        <div class="card r" data-s="1" data-dim="2"><div class="ic t">🔁</div><h3>Süreç soyutlaması</h3>
          <p>Alt programlar: sıralamayı <b>bir kez</b> yaz, her yerde <span class="mono hl">sirala(dizi)</span> diye çağır.</p></div>
        <div class="card r" data-s="2" data-hot="2,3"><div class="ic v">🌳</div><h3>Veri soyutlaması</h3>
          <p>Örnek: <b>ikili ağaç</b> düğümü = 1 değer + 2 bağlantı.</p></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2" data-dim="3">${code("agac.f — Fortran 77 (işaretçi yok)", [
          "INTEGER DEGER(100), SOL(100), SAG(100)", "C  düğüm i: DEGER(i), çocuklar SOL(i), SAG(i)", "      SOL(1) = 2", "      SAG(1) = 3"], { lang: "fortran", cls: "xs" })}</div>
        <div class="r" data-s="3">${code("Dugum.java", ["class Dugum {", "    int deger;", "    Dugum sol, sag;", "}"], { lang: "java", cls: "sm" })}</div>
        <div class="r" data-s="4" style="display:flex;align-items:center;gap:22px;justify-content:center;margin-top:6px">
          <span class="pill t" style="font-size:23px;white-space:nowrap">Süreç soyutlaması</span><span style="font-size:32px;color:var(--faint)">+</span>
          <span class="pill v" style="font-size:23px;white-space:nowrap">Veri soyutlaması</span><span style="font-size:32px;color:var(--faint)">=</span>
          <span class="pill a" style="font-size:24px;font-weight:700;white-space:nowrap">Nesne yönelimli programlama</span></div>
      </div>
    </div>
  </div>`,
  n: [
    "Yazılabilirliği etkileyen en önemli kavramlardan biri soyutlama desteğidir. Soyutlama, karmaşık yapıları ayrıntılarını göz ardı ederek tanımlayıp kullanabilme yeteneğidir.",
    "İki tür soyutlama vardır. Birincisi süreç soyutlaması; en iyi örneği alt programlardır. Bir sıralama algoritmasını bir kez yazar, gerektiği her yerde tek satırla çağırırsınız. Kod tekrarı azalır.",
    "İkincisi veri soyutlaması. Diyelim ki ikili ağaç kurmak istiyoruz. Fortran 77'de işaretçi ve dinamik bellek olmadığı için ağacı paralel tam sayı dizileriyle taklit etmeniz gerekir: değer, sol çocuk ve sağ çocuk için ayrı ayrı diziler.",
    "Java'da ise bir düğümü, bir tam sayı ve iki referansla doğal biçimde tanımlarsınız. Kod hem daha kısa hem daha anlaşılırdır.",
    "Bu iki soyutlama türü sınıf yapısında birleşir ve ortaya nesne yönelimli programlama çıkar.",
  ],
},
{
  id: "expressivity", ch: "1.3 Yazılabilirlik", chip: "<b>1.3</b> Yazılabilirlik · İfade gücü",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="hl">İfade gücü</span> · işlemi belirtmenin elverişli yolu</h2>
    <div class="grid2" style="flex:1;align-items:start">
      <div class="col r" data-s="1">
        ${code("uzun yol", ["count = count + 1;"], { lang: "c", cls: "lg" })}
        <div style="text-align:center;font-size:44px;color:var(--amber)">↓</div>
        ${code("kısa yol", ["count++;"], { lang: "c", cls: "lg" })}
      </div>
      <div class="col r" data-s="2">
        ${code("while ile sayaç", ["int i = 0;", "while (i < 10) {", "    topla(i);", "    i++;", "}"], { lang: "c", cls: "sm" })}
        <div style="text-align:center;font-size:44px;color:var(--amber)">↓</div>
        ${code("for ile", ["for (int i = 0; i < 10; i++)", "    topla(i);"], { lang: "c", cls: "sm" })}
      </div>
    </div>
    <div class="note r" data-s="3" style="margin-top:24px">Ama hatırla: aynı işi yapmanın <b>çok fazla</b> yolu okunabilirliği düşürür. Kriterler arasında hep bir <b>denge</b> var.</div>
  </div>`,
  n: [
    "Yazılabilirliğin son etkeni ifade gücü, yani işlemleri belirtmenin elverişli yollarının olmasıdır.",
    "C'de count artı artı yazmak, count eşittir count artı bir yazmaktan daha kısa ve kullanışlıdır.",
    "Benzer şekilde, sayaçlı döngüler için for ifadesi, aynı işi while ile kurmaktan daha kolaydır.",
    "Ama hatırlayın: aynı işi yapmanın çok fazla yolu okunabilirliği düşürebilir. Kriterler arasında hep bir denge var.",
  ],
},
// ───────────────────────── Güvenilirlik
{
  id: "typecheck", ch: "1.3 Güvenilirlik", chip: "<b>1.3</b> Güvenilirlik · Tip kontrolü",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="vl">Güvenilirlik</span> · Tip kontrolü</h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:760px">
        <p class="lead r" data-s="0" style="font-size:30px">Program her koşulda istenen görevi <b>doğru</b> yapıyorsa güvenilirdir.</p>
        <div class="card r" data-s="1">
          <h3 style="font-size:32px">Ne zaman kontrol edilmeli?</h3>
          <div style="display:flex;flex-direction:column;gap:18px;margin-top:16px">
            <div style="display:flex;align-items:center;gap:18px"><span class="pill t" style="width:270px;text-align:center">Derleme zamanı</span><div style="height:22px;width:120px;border-radius:11px;background:var(--teal)"></div><span style="font-size:26px;color:var(--muted)">ucuz, erken ✓</span></div>
            <div style="display:flex;align-items:center;gap:18px"><span class="pill c" style="width:270px;text-align:center">Çalışma zamanı</span><div style="height:22px;width:330px;border-radius:11px;background:var(--coral)"></div><span style="font-size:26px;color:var(--muted)">pahalı</span></div>
          </div>
          <p style="margin-top:20px">Hata ne kadar <b>erken</b> bulunursa düzeltmesi o kadar <b>ucuz</b>.</p>
        </div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("eski_c.c — parametre tipi kontrol edilmiyor", [
          "int kare(n)", "int n;", "{ return n * n; }", "", { t: "sonuc = kare(23.0);  /* float! */", hot: "2,3" }], { lang: "c", cls: "sm" })}</div>
        <div class="row r" data-s="3" style="gap:24px">
          <div class="card f1" style="padding:24px 28px"><p style="font-size:24px">Beklenen</p><div class="mono" style="font-size:46px;color:var(--teal)">529</div></div>
          <div class="card f1" style="padding:24px 28px;border-color:rgba(255,122,122,.5)"><p style="font-size:24px">Gerçek</p><div class="mono" style="font-size:46px;color:var(--coral)">??? anlamsız</div></div>
        </div>
      </div>
    </div>
  </div>`,
  n: [
    "Gelelim güvenilirliğe. Bir program her koşulda istenen görevi doğru yapıyorsa güvenilirdir. Bunu destekleyen ilk dil özelliği tip kontrolüdür.",
    "Tip kontrolü, tip hatalarının derleme sırasında ya da çalışma sırasında test edilmesidir. Derleme zamanında yapmak daha ucuzdur; çalışma zamanı kontrolü ise maliyetlidir. Ayrıca hata ne kadar erken bulunursa, düzeltmesi o kadar ucuzdur.",
    "Bir örnek: Eski C sürümlerinde fonksiyon parametrelerinin tipi kontrol edilmezdi. int bekleyen bir fonksiyona 23 yerine 23.0 gibi bir float gönderirseniz, derleyici itiraz etmez.",
    "Fonksiyon, float'ın bit desenini bir tam sayıymış gibi yorumlar ve tamamen anlamsız bir sonuç üretir. Üstelik program çökmediği için bu hatayı fark etmek çok zordur.",
  ],
},
{
  id: "exceptions-alias", ch: "1.3 Güvenilirlik", chip: "<b>1.3</b> Güvenilirlik · İstisnalar ve aliasing",
  html: `
  <div class="wrap">
    <div class="grid2" style="flex:1;gap:44px">
      <div class="col r" data-s="0" data-dim="1">
        <h2 class="t" style="font-size:52px;margin-bottom:6px">İstisna yönetimi</h2>
        <p class="lead" style="font-size:28px;margin-bottom:6px">Çalışma zamanı hatalarını <b>yakala</b> ve önlem al.</p>
        ${code("Bolme.java", ["try {", "    int sonuc = a / b;", "} catch (ArithmeticException e) {", "    System.out.println(\"Sıfıra bölme!\");", "}"], { lang: "java", cls: "xs" })}
        <div class="pills"><span class="pill t">Ada ✓</span><span class="pill t">C++ ✓</span><span class="pill t">Java ✓</span><span class="pill c">C ✕</span><span class="pill c">Fortran ✕</span></div>
      </div>
      <div class="col r" data-s="1">
        <h2 class="t" style="font-size:52px;margin-bottom:6px">Takma adlandırma</h2>
        <p class="lead" style="font-size:28px;margin-bottom:6px">Aynı bellek hücresine <b>iki farklı isim</b>.</p>
        <svg viewBox="0 0 760 250" style="width:100%;height:250px">
          <defs><marker id="ah" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a2a9d2"/></marker></defs>
          <rect x="20" y="30" width="130" height="70" rx="14" fill="#1c2241" stroke="#a493ff" stroke-width="2.5"/><text x="85" y="76" fill="#eef0fa" font-size="34" text-anchor="middle" font-family="JBM">p</text>
          <rect x="20" y="150" width="130" height="70" rx="14" fill="#1c2241" stroke="#ffb547" stroke-width="2.5"/><text x="85" y="196" fill="#eef0fa" font-size="34" text-anchor="middle" font-family="JBM">q</text>
          <path d="M150,65 C300,65 330,125 470,125" stroke="#a2a9d2" stroke-width="3" fill="none" marker-end="url(#ah)"/>
          <path d="M150,185 C300,185 330,125 470,125" stroke="#a2a9d2" stroke-width="3" fill="none" marker-end="url(#ah)"/>
          <rect x="480" y="75" width="250" height="100" rx="16" fill="#151a31" stroke="#35d0c0" stroke-width="3"/>
          <text x="605" y="70" fill="#a2a9d2" font-size="22" text-anchor="middle">x (bellek hücresi)</text>
          <text class="r rf" data-s="1" data-h="2" x="605" y="140" fill="#35d0c0" font-size="48" text-anchor="middle" font-family="JBM">10</text>
          <text class="r rf" data-s="2" x="605" y="140" fill="#ff7a7a" font-size="48" text-anchor="middle" font-family="JBM">99</text>
        </svg>
        ${code("alias.c", ["int x = 10;", "int *p = &x, *q = &x;", { t: "*q = 99;", hot: "2" }, { t: "printf(\"%d\", *p);  // 99 !", hot: "2,3" }], { lang: "c", cls: "xs" })}
        <div class="note r" data-s="3" style="font-size:26px"><b>Tehlike:</b> p'yi kullanan kod, değerin değiştiğinden habersiz.</div>
      </div>
    </div>
  </div>`,
  n: [
    "İkinci özellik istisna yönetimi: programın çalışma zamanı hatalarını yakalayıp düzeltici önlem alabilmesi. Ada, C++ ve Java bu özelliğe sahiptir; C ve Fortran'da ise yoktur. Bu konuyu ileriki bölümlerde ayrıntılı göreceğiz.",
    "Üçüncüsü takma adlandırma, yani aliasing: aynı bellek hücresine iki ya da daha fazla farklı isimle erişilebilmesi. Burada p ve q işaretçileri aynı x hücresini gösteriyor.",
    "q üzerinden değeri 99 yaptığımızda, p'nin gösterdiği değer de sessizce değişir.",
    "Programcı bunu unutursa beklenmedik hatalar çıkar. Bu yüzden aliasing tehlikeli bir özellik kabul edilir ve programcının çok dikkatli olmasını gerektirir.",
  ],
},
{
  id: "chain", ch: "1.3 Güvenilirlik", chip: "<b>1.3</b> Güvenilirlik · Okunabilirlik ve yazılabilirlik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Her şey <span class="vl">güvenilirliğe</span> akar</h2>
    <p class="lead r" data-s="0" style="font-size:30px">Algoritmayı <b>doğal</b> biçimde ifade edemeyen dil, programcıyı doğal olmayan — ve hataya açık — çözümlere iter.</p>
    <div style="position:relative;flex:1">
      <svg viewBox="0 0 1680 520" style="position:absolute;inset:0;width:100%;height:100%">
        <defs><marker id="ah2" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="#ffb547"/></marker></defs>
        <g class="r rf" data-s="1"><path d="M410,150 L640,150" stroke="#ffb547" stroke-width="5" marker-end="url(#ah2)"/><path d="M1040,150 L1270,150" stroke="#ffb547" stroke-width="5" marker-end="url(#ah2)"/>
          <text x="525" y="125" fill="#a2a9d2" font-size="26" text-anchor="middle">1. yol</text></g>
        <g class="r rf" data-s="2"><path d="M220,210 C220,380 460,400 640,400" stroke="#ffb547" stroke-width="5" fill="none" marker-end="url(#ah2)"/><path d="M1040,400 C1270,400 1460,380 1460,215" stroke="#ffb547" stroke-width="5" fill="none" marker-end="url(#ah2)"/>
          <text x="370" y="355" fill="#a2a9d2" font-size="26" text-anchor="middle">2. yol</text></g>
      </svg>
      <div class="box r" data-s="0" style="position:absolute;left:30px;top:100px;width:380px;height:110px;font-size:34px;border-color:var(--teal);color:var(--teal)">Okunabilirlik</div>
      <div class="box r" data-s="1" style="position:absolute;left:650px;top:100px;width:380px;height:110px;font-size:34px;border-color:var(--amber);color:var(--amber)">Yazılabilirlik</div>
      <div class="box r" data-s="0" style="position:absolute;left:1280px;top:100px;width:380px;height:110px;font-size:34px;border-color:var(--violet);color:var(--violet)">Güvenilirlik</div>
      <div class="box r" data-s="2" style="position:absolute;left:650px;top:345px;width:380px;height:110px;font-size:32px">Bakım kolaylığı</div>
    </div>
  </div>`,
  n: [
    "Son olarak, okunabilirlik ve yazılabilirlik de güvenilirliği etkiler. Bir algoritmayı doğal biçimde ifade edemeyen bir dil, programcıyı doğal olmayan ve bu yüzden hataya açık çözümlere iter.",
    "Okunabilirlik, güvenilirliği iki yoldan etkiler. Birincisi: okunabilirlik yazılabilirliği, yazılabilirlik de güvenilirliği etkiler.",
    "İkincisi: okunması zor bir programın bakımını yapmak da zordur. Bakım sırasında yapılan hatalar güvenilirliği düşürür.",
  ],
},
// ───────────────────────── Maliyet
{
  id: "cost", ch: "1.3 Maliyet", chip: "<b>1.3</b> Maliyet",
  html: (() => {
    const items = [["🎓", "Programcıları eğitme", "sadelik, ortogonallik, deneyim", 34, 1], ["⌨️", "Program yazma", "yazılabilirlik", 40, 1],
      ["🔧", "Derleme", "ör. ilk Ada derleyicileri pahalıydı", 26, 2], ["⏱️", "Yürütme", "çok fazla çalışma zamanı kontrolü", 38, 2],
      ["🏷️", "Uygulama sistemi", "Java: ücretsiz derleyici", 22, 3], ["💥", "Zayıf güvenilirlik", "uzay görevi, kriptografi…", 58, 3],
      ["🧰", "Bakım", "geliştirme maliyetinin 2–4 katı!", 100, 4]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="cl">Maliyet</span> · tek kalem değil, toplam</h2>
    <div class="col" style="gap:16px;flex:1">
      ${items.map(([e, h, p, w, s], i) => `
      <div class="r rl" data-s="${s}" data-hot="${i === 6 ? 4 : -9}" style="display:flex;align-items:center;gap:24px;transition-delay:${(i % 2) * 0.15}s">
        <span class="emo" style="font-size:40px;width:56px">${e}</span>
        <span style="font-size:31px;font-weight:700;width:340px">${h}</span>
        <div style="flex:1;display:flex;align-items:center;gap:22px">
          <div style="height:30px;width:${w * 6}px;border-radius:15px;background:${i === 6 ? "var(--coral)" : "rgba(255,122,122,.45)"}"></div>
          <span style="font-size:26px;color:var(--muted)">${p}</span></div></div>`).join("")}
    </div>
    <div class="note r" data-s="5" style="margin-top:10px"><b>Soru:</b> Derleme ve yürütme maliyeti nasıl dengelenir? → <b>Optimizasyon</b>: daha yavaş derle, daha hızlı çalıştır. &nbsp;·&nbsp; Low-code / no-code platformlar da maliyeti düşürme arayışıdır.</div>
  </div>`;
  })(),
  n: [
    "Dördüncü kriter maliyet. Bir dilin maliyeti tek bir kalem değil, birçok bileşenin toplamıdır. Çubuklar, kalemlerin kabaca büyüklüğünü temsil ediyor.",
    "Programcıları eğitme maliyeti, dilin sadeliğine, ortogonalliğine ve programcının deneyimine bağlıdır. Program yazma maliyeti ise dilin yazılabilirliğiyle ilgilidir.",
    "Sonra derleme maliyeti: örneğin Ada'nın ilk derleyicileri çok pahalı çalışıyordu. Ve yürütme maliyeti: çalışma zamanında çok fazla tip kontrolü yapan bir dil daha yavaş çalışır.",
    "Uygulama sisteminin maliyeti de var: Java'nın derleyicisinin ücretsiz olması yayılmasına büyük katkı sağladı. Zayıf güvenilirliğin maliyeti ise bir uzay görevinde ya da bir kriptografi sisteminde çok pahalıya patlayabilir.",
    "Ve en büyük kalem: bakım. Eskiden maliyetin büyük kısmı kodlamadaydı; bugün en önemli parametre bakımdır. Sebesta'ya göre bakım maliyeti, geliştirme maliyetinin iki ila dört katı olabilir.",
    "Peki derleme maliyeti ile yürütme maliyeti nasıl dengelenir? Cevap optimizasyon: Derleyici ne kadar çok optimizasyon yaparsa derleme o kadar yavaşlar, ama ortaya çıkan program o kadar hızlı çalışır. Bugün yükselen low-code ve no-code platformlar da bu maliyetleri düşürme arayışının bir sonucudur.",
  ],
},
{
  id: "other-criteria", ch: "1.3 Diğer kriterler", chip: "<b>1.3</b> Diğer kriterler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Diğer kriterler</h2>
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="0" style="grid-column:span 2;display:flex;flex-direction:column">
        <div class="ic b">🧳</div><h3>Taşınabilirlik</h3>
        <p>Programın bir implementasyondan diğerine taşınma kolaylığı → dilin <b>standartlaşma</b> derecesine bağlı. (BASIC: zayıf standart)</p>
        <div class="r" data-s="1" style="margin-top:auto;padding-top:30px">
          <div style="position:relative;height:120px">
            <div style="position:absolute;left:40px;right:40px;top:50px;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--blue),var(--teal))"></div>
            <div style="position:absolute;left:20px;top:30px;text-align:center"><div style="width:46px;height:46px;border-radius:50%;background:var(--blue);margin:0 auto"></div><div class="mono" style="font-size:30px;margin-top:10px">1989</div></div>
            <div style="position:absolute;right:20px;top:30px;text-align:center"><div style="width:46px;height:46px;border-radius:50%;background:var(--teal);margin:0 auto"></div><div class="mono" style="font-size:30px;margin-top:10px">1998</div></div>
            <div style="position:absolute;left:0;right:0;top:0;text-align:center;font-size:26px;color:var(--muted)">C++ standardı: komite kuruldu → standart yayımlandı (≈ 9 yıl)</div>
          </div></div>
      </div>
      <div class="col">
        <div class="card r" data-s="2"><div class="ic g">🌍</div><h3>Genellik</h3><p>Geniş bir uygulama yelpazesinde kullanılabilme.</p></div>
        <div class="card r" data-s="2" style="transition-delay:.25s"><div class="ic v">📐</div><h3>İyi tanımlanmışlık</h3><p>Resmî tanımın <b>kesin</b> ve <b>eksiksiz</b> olması.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Ana kriterlerin yanında birkaç kriter daha var. İlki taşınabilirlik: bir programın bir implementasyondan diğerine ne kolaylıkla taşınabildiği. Bu, dilin standartlaşma derecesine bağlıdır. Örneğin BASIC'in standardı zayıftır ve programlarını taşımak zordur.",
    "Standartlaşma ise zahmetli bir süreçtir. C++'ı standartlaştırmak için 1989'da kurulan komite, çalışmasını ancak 1998'de tamamlayabildi.",
    "Diğerleri genellik, yani dilin geniş bir uygulama yelpazesinde kullanılabilmesi; ve iyi tanımlanmışlık, yani dilin resmî tanımının kesin ve eksiksiz olması.",
  ],
},
// ───────────────────────── 1.4
{
  id: "vonneumann", ch: "1.4 Dil tasarımını etkileyen faktörler", chip: "<b>1.4</b> Bilgisayar mimarisi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">von Neumann <em>mimarisi</em></h2>
    <div style="position:relative;height:680px;margin-top:-20px">
      <svg viewBox="0 0 1680 760" style="position:absolute;inset:0;width:100%;height:100%">
        <defs><marker id="av" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="#a2a9d2"/></marker></defs>
        <g class="r rf" data-s="1">
          <rect x="60" y="80" width="520" height="430" rx="28" fill="#151a31" stroke="#35d0c0" stroke-width="3"/>
          <text x="320" y="150" fill="#35d0c0" font-size="44" font-weight="700" text-anchor="middle">Bellek</text>
          <text x="320" y="195" fill="#a2a9d2" font-size="26" text-anchor="middle">komutları VE veriyi saklar</text>
          ${[0, 1, 2, 3, 4].map((i) => `<rect x="110" y="${230 + i * 52}" width="420" height="42" rx="8" fill="#0d1124" stroke="#2a3160"/><text x="130" y="${259 + i * 52}" fill="#6b7399" font-size="22" font-family="JBM">${["0100  LOAD b", "0101  ADD  c", "0102  STORE a", "0200  b = 7", "0201  c = 5"][i]}</text>`).join("")}
          <rect x="1060" y="80" width="560" height="430" rx="28" fill="#151a31" stroke="#ffb547" stroke-width="3"/>
          <text x="1340" y="150" fill="#ffb547" font-size="40" font-weight="700" text-anchor="middle">Merkezi İşlem Birimi</text>
          <rect x="1110" y="200" width="460" height="120" rx="18" fill="#1c2241" stroke="#2a3160"/><text x="1340" y="272" fill="#eef0fa" font-size="32" text-anchor="middle">Aritmetik ve mantık birimi</text>
          <rect x="1110" y="350" width="460" height="120" rx="18" fill="#1c2241" stroke="#2a3160"/><text x="1340" y="422" fill="#eef0fa" font-size="32" text-anchor="middle">Kontrol birimi</text>
          <rect x="560" y="610" width="560" height="110" rx="22" fill="#151a31" stroke="#2a3160" stroke-width="2"/>
          <text x="840" y="678" fill="#a2a9d2" font-size="32" text-anchor="middle">Giriş ve çıkış aygıtları</text>
          <path d="M840,610 L840,560 L320,560 L320,515" stroke="#2a3160" stroke-width="3" fill="none"/>
        </g>
        <g class="r rf" data-s="2"><path d="M585,220 L1050,220" stroke="#a2a9d2" stroke-width="4" marker-end="url(#av)"/>
          <text x="818" y="200" fill="#eef0fa" font-size="30" text-anchor="middle">Komutlar ve veri</text></g>
        <g class="r rf" data-s="3"><path d="M1055,380 L590,380" stroke="#a2a9d2" stroke-width="4" marker-end="url(#av)"/>
          <text x="818" y="420" fill="#eef0fa" font-size="30" text-anchor="middle">İşlemlerin sonuçları</text></g>
        ${[0, 1, 2].map((i) => `<circle class="pk r" data-s="2" cx="600" cy="220" r="15" fill="#35d0c0" style="--d:${i * 0.45}s;filter:drop-shadow(0 0 10px #35d0c0)"/>`).join("")}
        ${[0, 1].map((i) => `<circle class="pk pkl r" data-s="3" cx="1040" cy="380" r="15" fill="#ffb547" style="--d:${i * 0.45}s;filter:drop-shadow(0 0 10px #ffb547)"/>`).join("")}
      </svg>
    </div>
    <style>.pk.r.on{animation:pk 1.6s ease-in-out var(--d) both}.pkl.r.on{animation-name:pkl}@keyframes pk{0%{transform:translateX(0);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateX(440px);opacity:0}}@keyframes pkl{0%{transform:translateX(0);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateX(-440px);opacity:0}}</style>
    <div class="note r" data-s="4" style="margin-top:auto;text-align:center;font-size:32px">Bu mimari, <b>imperatif</b> (zorunlu, komut merkezli) dilleri doğurdu.</div>
  </div>`,
  n: [
    "Bölüm 1.4: Dil tasarımını etkileyen faktörler. İki ana etken var: bilgisayar mimarisi ve programlama tasarım yöntemleri. Önce mimariye bakalım.",
    "Son yetmiş yılın popüler dillerinin çoğu, von Neumann mimarisi etrafında tasarlandı. Bu mimaride veriler ve programlar aynı bellekte saklanır ve bellek, işlemciden ayrıdır.",
    "Komutlar ve veriler bellekten işlemciye taşınır, orada işlenir...",
    "...ve işlemlerin sonuçları tekrar belleğe gönderilir.",
    "1940'lardan bu yana üretilen bilgisayarların çoğu bu mimariyi kullanır. Ve bu mimari, zorunlu, yani imperatif dilleri doğurdu.",
  ],
},
{
  id: "imperative-features", ch: "1.4 Dil tasarımını etkileyen faktörler", chip: "<b>1.4</b> Mimariden dile",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Mimariden <em>dile</em></h2>
    <div class="col" style="gap:22px">
      ${[["Değişkenler", "bellek hücrelerini modeller", "📦", 1], ["Atama ifadeleri", "veri aktarımına (piping) dayanır", "🔀", 2], ["Yineleme (iterasyon)", "tekrarın en verimli yolu", "🔁", 3]].map(([a, b, e, s]) => `
      <div class="card r rl" data-s="${s}" data-hot="${s}" style="display:flex;align-items:center;gap:30px;padding:30px 38px">
        <span class="emo" style="font-size:46px">${e}</span><span style="font-size:36px;font-weight:700;width:420px">${a}</span>
        <span style="font-size:36px;color:var(--amber)">⟷</span><span style="font-size:32px;color:var(--muted)">${b}</span></div>`).join("")}
    </div>
    <div class="row" style="margin-top:auto;margin-bottom:20px;gap:40px;align-items:center">
      <div class="r" data-s="2" style="width:560px">${code("atama.c", ["a = b + c;"], { lang: "c", cls: "lg" })}</div>
      <div class="r" data-s="2" style="flex:1;display:flex;align-items:center;gap:18px;font-size:28px">
        <span class="box" style="font-size:30px;flex-direction:column;width:170px;height:120px">b, c<span style="color:var(--faint);font-size:22px">bellek</span></span><span class="arrow">→</span>
        <span class="box" style="font-size:30px;border-color:var(--amber);flex-direction:column;width:170px;height:120px">b + c<span style="color:var(--faint);font-size:22px">işlemci</span></span><span class="arrow">→</span>
        <span class="box" style="font-size:30px;flex-direction:column;width:170px;height:120px">a<span style="color:var(--faint);font-size:22px">bellek</span></span></div>
    </div>
  </div>`,
  n: [
    "İmperatif dillerin temel özellikleri doğrudan bu mimariden gelir.",
    "Değişkenler bellek hücrelerini modeller.",
    "Atama ifadeleri, verinin bellek ile işlemci arasında aktarılmasına dayanır. a eşittir b artı c ifadesinde, b ve c bellekten işlemciye getirilir, toplanır ve sonuç a'nın hücresine geri yazılır.",
    "Yineleme ise bu mimaride tekrarı gerçekleştirmenin en verimli yoludur; çünkü komutlar bellekte ardışık hücrelerde durur. Bu yüzden özyineleme bazı problemler için daha doğal olsa da, von Neumann makinelerinde döngüler genelde daha verimlidir.",
  ],
},
{
  id: "fetch-execute", ch: "1.4 Dil tasarımını etkileyen faktörler", chip: "<b>1.4</b> Getir–yürüt döngüsü",
  html: (() => {
    const nodes = [["Getir", "fetch", 0, "teal"], ["Sayacı artır", "PC + 1", 90, "amber"], ["Çöz", "decode", 180, "violet"], ["Yürüt", "execute", 270, "coral"]];
    const cx = 330, cy = 330, R = 230;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Getir – yürüt <em>döngüsü</em></h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:820px">
        <div class="r" data-s="0">${code("fetch-execute", ["program sayacını başlat", "repeat forever", { t: "  sayacın gösterdiği komutu getir", hot: "1" }, { t: "  sayacı bir artır", hot: "2" }, { t: "  komutu çöz", hot: "3" }, { t: "  komutu yürüt", hot: "4" }, "end repeat"], { lang: "plain", cls: "sm" })}</div>
        <div class="card r" data-s="0" style="display:flex;align-items:center;gap:30px;padding:24px 32px">
          <span style="font-size:28px;color:var(--muted)">Program sayacı (PC)</span>
          <span class="stack mono" style="font-size:54px;font-weight:700;color:var(--amber)"><span class="r rf on" data-h="2">0100</span><span class="r rf" data-s="2">0101</span></span>
        </div>
      </div>
      <div class="f1 r" data-s="0" style="position:relative">
        <svg viewBox="0 0 660 660" style="width:660px;height:660px">
          <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#2a3160" stroke-width="6" stroke-dasharray="14 12"/>
          ${nodes.map(([a, b, ang, c], i) => {
            const t = ((ang - 90) * Math.PI) / 180, x = cx + R * Math.cos(t), y = cy + R * Math.sin(t);
            return `<g class="anim nd" data-hot="${i + 1}"><circle cx="${x}" cy="${y}" r="92" fill="#151a31" stroke="var(--${c})" stroke-width="4"/>
              <text x="${x}" y="${y - 2}" fill="#eef0fa" font-size="${a.length > 6 ? 25 : 32}" font-weight="700" text-anchor="middle">${a}</text>
              <text x="${x}" y="${y + 32}" fill="#a2a9d2" font-size="22" text-anchor="middle" font-family="JBM">${b}</text></g>`;
          }).join("")}
          <text x="${cx}" y="${cy + 12}" fill="#6b7399" font-size="34" text-anchor="middle" font-family="JBM">↻</text>
        </svg>
        <style>.nd circle{transition:fill .4s ease, stroke-width .4s ease}.nd.hot circle{fill:#2a2f55;stroke-width:9}</style>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Makine kodu, von Neumann bilgisayarında getir yürüt döngüsüyle çalışır. Komutlar bellekte durur ama işlemcide işlenmelidir. Bir sonraki komutun adresi, program sayacı denen bir yazmaçta tutulur.",
    "Önce program sayacının gösterdiği komut bellekten getirilir.",
    "Sayaç bir artırılır; böylece bir sonraki komutu gösterir.",
    "Komut çözülür, yani ne yapılacağı anlaşılır.",
    "Ve komut yürütülür. Sonra döngü baştan başlar; bu, bilgisayar kapanana kadar sürer.",
  ],
},
{
  id: "bottleneck", ch: "1.4 Dil tasarımını etkileyen faktörler", chip: "<b>1.4</b> Darboğaz ve fonksiyonel diller",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">von Neumann <em>darboğazı</em></h2>
    <div class="r" data-s="0" style="display:flex;align-items:center;justify-content:center;gap:0;margin:10px 0 34px">
      <div class="box" style="width:300px;height:150px;font-size:36px;border-color:var(--teal);color:var(--teal)">Bellek</div>
      <div style="width:420px;height:150px;position:relative">
        <div style="position:absolute;left:0;right:0;top:60px;height:30px;background:rgba(255,122,122,.35);border-top:3px solid var(--coral);border-bottom:3px solid var(--coral)"></div>
        <div style="position:absolute;left:0;right:0;top:100px;text-align:center;font-size:24px;color:var(--coral)">dar bağlantı</div></div>
      <div class="box" style="width:300px;height:150px;font-size:36px;border-color:var(--amber);color:var(--amber)">İşlemci</div>
    </div>
    <p class="lead r" data-s="0" style="font-size:30px;text-align:center;max-width:none">Komutlar, bağlantının taşıyabileceğinden hızlı yürütülür → bağlantı hızı bilgisayarın hızını sınırlar.</p>
    <div class="grid2" style="margin-top:20px">
      <div class="card r" data-s="1"><div class="quote" style="font-size:31px;padding-left:56px">Fonksiyonel dilleri verimli çalıştıracak bir mimari tasarlanmadıkça, bu dillerin imperatif dillerin yerini alma şansı yok.<small>— John Backus, 1978 (özetle)</small></div></div>
      <div class="card r" data-s="2"><h3>Karşı görüş</h3><p>Öyle bir mimari olsa bile, imperatif diller insanlara <b>daha doğal</b> geldiği için tercih edilmeye devam eder.</p></div>
    </div>
  </div>`,
  n: [
    "Bu mimarinin bir zaafı var: von Neumann darboğazı. Komutlar, bellek ile işlemci arasındaki bağlantının taşıyabileceğinden çok daha hızlı yürütülebilir. Bu yüzden bağlantının hızı, bilgisayarın hızını sınırlayan birincil etkendir.",
    "Fonksiyonel dillerde ise değişkenler, atamalar ve döngüler yoktur. John Backus 1978'de, fonksiyonel dilleri verimli çalıştıracak bir von Neumann alternatifi tasarlanmadıkça, bu dillerin imperatif dillerin yerini alamayacağını söylemişti.",
    "Bazı bilim insanları ise, öyle bir mimari olsa bile imperatif dillerin daha doğal olduğu için tercih edilmeye devam edeceğini savunur.",
  ],
},
{
  id: "methodologies", ch: "1.4 Dil tasarımını etkileyen faktörler", chip: "<b>1.4</b> Tasarım yöntemlerinin etkisi",
  html: (() => {
    const ev = [["1950'ler – 60'lar", "Makine verimliliği", "Basit uygulamalar; donanım pahalı", "teal"],
      ["60'ların sonu – 70'ler", "İnsan verimliliği", "Okunabilirlik, yapısal programlama, yukarıdan aşağı tasarım", "amber"],
      ["70'lerin sonu", "Veri odaklı tasarım", "Süreç odaklıdan veri odaklıya: veri soyutlama", "violet"],
      ["80'lerin ortası", "Nesne yönelimli", "Veri soyutlama + kalıtım + çok biçimlilik · CLOS, Prolog++", "coral"]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Programlama <em>tasarım yöntemleri</em></h2>
    <div style="position:relative;flex:1;margin-top:20px">
      <div class="r rf" data-s="0" style="position:absolute;left:0;right:0;top:92px;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--teal),var(--amber),var(--violet),var(--coral))"></div>
      <div class="grid4" style="position:relative">
        ${ev.map(([y, h, p, c], i) => `<div class="r" data-s="${i + 1}" data-hot="${i + 1}" style="display:flex;flex-direction:column;align-items:flex-start">
          <div class="mono" style="font-size:26px;color:var(--${c});height:56px">${y}</div>
          <div style="width:40px;height:40px;border-radius:50%;background:var(--${c});box-shadow:0 0 0 10px rgba(255,255,255,.04);margin:8px 0 34px"></div>
          <div class="card" style="width:100%;padding:30px;min-height:300px"><h3 style="font-size:35px;color:var(--${c})">${h}</h3><p style="font-size:28px">${p}</p></div></div>`).join("")}
      </div>
      <div class="note r" data-s="2" style="position:absolute;bottom:0;left:0;right:0;font-size:27px"><b>Neden?</b> 70'lerde donanım ucuzladı, programcı maliyeti arttı → maliyet donanımdan yazılıma kaydı.</div>
    </div>
  </div>`;
  })(),
  n: [
    "İkinci etken, programlama tasarım yöntemleri. Yazılım geliştirme yöntemleri değiştikçe yeni programlama yaklaşımları ve yeni diller doğdu.",
    "Elli ve altmışlı yıllarda uygulamalar basitti ve asıl ilgi makine verimliliğiydi.",
    "Altmışların sonunda insan verimliliği önem kazandı. Donanım ucuzlarken programcı maliyeti arttı. Okunabilirlik, daha iyi kontrol yapıları, yapısal programlama ve yukarıdan aşağıya, adım adım tasarım ön plana çıktı.",
    "Yetmişlerin sonunda süreç odaklı tasarımdan veri odaklı tasarıma geçildi ve veri soyutlama doğdu. Yine de süreç odaklı yaklaşım hiç terk edilmedi; özellikle eşzamanlı programlamada hâlâ önemlidir.",
    "Seksenlerin ortasında ise nesne yönelimli programlama geldi: veri soyutlama, kalıtım ve çok biçimlilik. Hatta fonksiyonel ve mantıksal dillere de nesne özellikleri eklendi; örneğin CLOS ve Prolog++.",
  ],
},
];
