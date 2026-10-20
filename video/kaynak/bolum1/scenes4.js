const { code } = require("./lib");

const tok = (t, k, c) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px"><span class="mono" style="font-size:38px;padding:10px 22px;border-radius:14px;background:var(--panel2);border:2px solid var(--${c})">${t}</span><span style="font-size:19px;color:var(--muted)">${k}</span></div>`;

const quiz = [
  ["Aynı işi yapmanın birden çok yolu olması (count++, count += 1 …) hangi kriteri olumsuz etkiler?", "Okunabilirlik — buna özellik çokluğu denir."],
  ["VAX'ın her işlenen türüyle çalışan tek ADDL komutu hangi kavrama örnektir?", "Ortogonallik"],
  ["Java'nın her dizi erişiminde indis kontrolü yapması, hangi iki kriter arasındaki ödünleşmedir?", "Güvenilirlik ↔ yürütme maliyeti"],
  ["Bir dilin toplam maliyetinde genellikle en büyük kalem hangisidir?", "Bakım maliyeti"],
  ["Java bayt kodunun Java Sanal Makinesi'nde çalıştırılması hangi implementasyon yöntemidir?", "Hibrit implementasyon (bugün JIT ile)"],
];

module.exports = [
{
  id: "compile-example", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> Derleme · somut örnek",
  html: `
  <div class="wrap">
    <div class="r mono" data-s="0" style="font-size:54px;text-align:center;margin-bottom:26px">toplam = a + b * 2;</div>
    <div class="r" data-s="1" style="display:flex;gap:16px;justify-content:center;margin-bottom:30px">
      ${tok("toplam", "tanıtıcı", "teal")}${tok("=", "atama", "amber")}${tok("a", "tanıtıcı", "teal")}${tok("+", "operatör", "amber")}${tok("b", "tanıtıcı", "teal")}${tok("*", "operatör", "amber")}${tok("2", "sayı", "violet")}${tok(";", "noktalama", "coral")}
    </div>
    <div class="row" style="flex:1;gap:36px;align-items:center">
      <div class="f1 r" data-s="2">
        <svg viewBox="40 0 560 360" style="width:100%;height:440px">
          <g stroke="#2a3160" stroke-width="3"><line x1="280" y1="50" x2="120" y2="135"/><line x1="280" y1="50" x2="440" y2="135"/><line x1="440" y1="135" x2="340" y2="220"/><line x1="440" y1="135" x2="520" y2="220" style="display:none"/><line x1="440" y1="135" x2="500" y2="220"/><line x1="500" y1="220" x2="440" y2="310"/><line x1="500" y1="220" x2="545" y2="310"/></g>
          ${[[280, 50, "=", "amber"], [120, 135, "toplam", "teal"], [440, 135, "+", "amber"], [340, 220, "a", "teal"], [500, 220, "*", "amber"], [440, 310, "b", "teal"], [545, 310, "2", "violet"]].map(([x, y, t, c]) => `<g><circle cx="${x}" cy="${y}" r="${t.length > 2 ? 52 : 34}" fill="#151a31" stroke="var(--${c})" stroke-width="3"/><text x="${x}" y="${y + 10}" fill="#eef0fa" font-size="28" text-anchor="middle" font-family="JBM">${t}</text></g>`).join("")}
        </svg></div>
      <div class="f1 r" data-s="3">${code("ara kod", ["t1 = b * 2", "t2 = a + t1", "toplam = t2"], { lang: "plain" })}</div>
      <div class="f1 r" data-s="4">${code("makine kodu (temsilî)", ["LOAD  R1, b", "MUL   R1, #2", "ADD   R1, a", "STORE R1, toplam"], { lang: "asm" })}</div>
    </div>
  </div>`,
  n: [
    "Somut bir örnekle görelim: toplam eşittir a artı b çarpı iki.",
    "Sözcüksel analiz bu satırı sekiz token'a böler: toplam tanıtıcısı, atama operatörü, a, artı, b, çarpı, 2 sayısı ve noktalı virgül.",
    "Sözdizim analizi bir ayrıştırma ağacı kurar. Çarpmanın önceliği daha yüksek olduğu için b çarpı 2, ağacın daha derininde yer alır ve önce hesaplanır.",
    "Anlamsal analizden sonra üretilen ara kod, ağacı aşağıdan yukarıya, adım adım basit işlemlere çevirir.",
    "Son olarak kod üreteci bunları makine komutlarına çevirir. Gördüğünüz gibi, makine düzeyinde her şey yükle, işle, sakla düzenindedir.",
  ],
},
{
  id: "linking", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> Bağlama ve yükleme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bağlama ve <em>yükleme</em></h2>
    <div style="display:flex;align-items:center;gap:26px;flex:1;justify-content:center">
      <div class="col r" data-s="0" style="gap:26px;width:440px">
        <div class="box" style="height:170px;font-size:32px;border-color:var(--teal)">Senin programın<br><span style="font-size:22px;color:var(--muted);font-weight:400">(nesne kodu)</span></div>
        <div class="box" style="height:170px;font-size:32px;border-color:var(--violet)">Kütüphaneler + sistem kodu<br><span style="font-size:22px;color:var(--muted);font-weight:400">(printf, dosya, bellek…)</span></div>
      </div>
      <span class="arrow r" data-s="0" style="font-size:60px">→</span>
      <div class="box r" data-s="0" data-hot="0" style="width:300px;height:240px;font-size:34px;border-color:var(--amber)">🔗 Bağlayıcı<span style="font-size:22px;color:var(--muted);font-weight:400">linker</span></div>
      <span class="arrow r" data-s="1" style="font-size:60px">→</span>
      <div class="box r" data-s="1" data-hot="1" style="width:340px;height:240px;font-size:32px;border-color:var(--coral)">📦 Yükleme modülü<span style="font-size:22px;color:var(--muted);font-weight:400">çalıştırılabilir görüntü</span></div>
      <span class="arrow r" data-s="1" style="font-size:60px">→</span>
      <div class="box r" data-s="1" style="width:200px;height:240px;font-size:32px">🧠 Bellek<span style="font-size:22px;color:var(--muted);font-weight:400">yükleyici</span></div>
    </div>
  </div>`,
  n: [
    "Programın çalışabilmesi için bir adım daha gerekir. Programlar genellikle işletim sisteminin ve kütüphanelerin hazır kodlarını kullanır. Bu sistem kodlarının toplanıp kullanıcı programına bağlanmasına, bağlama, yani linking denir.",
    "Ortaya çıkan, kullanıcı ve sistem kodunu birlikte içeren çalıştırılabilir görüntüye yükleme modülü denir. Yükleyici bu modülü belleğe alır ve daha önce gördüğümüz getir yürüt döngüsü başlar.",
  ],
},
{
  id: "interpretation", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> Saf yorumlama",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="cl">Saf yorumlama</span> · çeviri yok</h2>
    <div class="r" data-s="0" style="display:flex;align-items:center;gap:26px;justify-content:center;margin:10px 0 40px">
      <span class="pill" style="font-size:30px">Kaynak program</span><span class="arrow">→</span>
      <div class="box" style="width:330px;height:130px;font-size:32px;border-color:var(--coral)">Yorumlayıcı<br><span style="font-size:21px;color:var(--muted);font-weight:400">“yüksek seviyeli sanal makine”</span></div>
      <span class="arrow">→</span><span class="pill" style="font-size:30px">Çıktı</span>
      <span style="font-size:28px;color:var(--faint);margin-left:30px">(girdi verisi de yorumlayıcıya gider)</span>
    </div>
    <div class="grid2">
      <div class="card tint-t r" data-s="1"><h3 class="tl">✓ Artıları</h3><ul class="b t" style="margin-top:10px"><li>Uygulaması kolay</li><li>Çalışma zamanı hataları kaynaktaki yeriyle <b>hemen</b> gösterilir → kolay hata ayıklama</li></ul></div>
      <div class="card tint-c r" data-s="2"><h3 class="cl">✕ Eksileri</h3><ul class="b" style="margin-top:10px"><li>Derlenmişe göre <b>10–100 kat</b> yavaş</li><li>Genelde daha fazla bellek ister</li><li>Bugün nadir; ama web betiklerinde önemli (ör. JavaScript)</li></ul></div>
    </div>
  </div>`,
  n: [
    "İkinci yöntem saf yorumlamadır. Burada hiç çeviri yapılmaz: yorumlayıcı denen bir program, kaynak kodu okuyup doğrudan çalıştırır. Yorumlayıcı, makine dili yerine yüksek seviyeli dili çalıştıran bir sanal makine gibidir.",
    "Avantajı, uygulamasının ve hata ayıklamanın kolay olmasıdır: çalışma zamanı hataları kaynak koddaki yeriyle birlikte hemen gösterilir.",
    "Dezavantajı ise hızdır: saf yorumlanan programlar, derlenmiş programlardan on ile yüz kat daha yavaş çalışabilir ve genelde daha fazla bellek ister. Bu yüzden yüksek seviyeli dillerde nadirdir; ama JavaScript gibi bazı web betik dillerinde önemini korumuştur.",
  ],
},
{
  id: "hybrid-jit", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> Hibrit sistemler ve JIT",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="vl">Hibrit</span> sistemler ve <span class="hl">JIT</span></h2>
    <div class="r" data-s="0" style="display:flex;align-items:center;gap:20px;margin-bottom:30px">
      <span class="pill" style="font-size:28px">Kaynak</span><span class="arrow">→</span>
      <div class="box" style="width:300px;height:110px;font-size:28px;border-color:var(--teal)">Ara kod üretici<br><span style="font-size:20px;color:var(--muted);font-weight:400">sözcük + sözdizim analizi</span></div><span class="arrow">→</span>
      <div class="box" data-hot="1" style="width:240px;height:110px;font-size:28px;border-color:var(--violet)">Ara kod</div><span class="arrow">→</span>
      <div class="box" style="width:280px;height:110px;font-size:28px;border-color:var(--coral)">Yorumlayıcı</div><span class="arrow">→</span>
      <span class="pill" style="font-size:28px">Sonuç</span>
    </div>
    <div class="grid2" style="flex:1">
      <div class="card r" data-s="1"><div class="ic v">☕</div><h3>Java bayt kodu</h3>
        <p><span class="mono hl">Merhaba.java</span> → <span class="mono hl">javac</span> → <span class="mono hl">Merhaba.class</span> (bayt kodu)</p>
        <p style="margin-top:14px">Java Sanal Makinesi (JVM) olan <b>her</b> bilgisayarda çalışır → taşınabilirlik. Perl de çalıştırmadan önce kısmen derlenir.</p></div>
      <div class="card r" data-s="2"><div class="ic a">⚡</div><h3>Tam zamanında (JIT)</h3>
        <p>Ara koddaki alt program <b>ilk çağrıldığında</b> makine koduna derlenir; makine kodu sonraki çağrılar için <b>saklanır</b>.</p>
        <div class="pills"><span class="pill a">Java</span><span class="pill a">.NET dilleri (C#…)</span></div></div>
    </div>
  </div>`,
  n: [
    "Üçüncü yöntem hibrit sistemlerdir: derleme ile saf yorumlama arasında bir uzlaşma. Program önce kolayca yorumlanabilen bir ara dile çevrilir, sonra bu ara dil yorumlanır. Sonuç, saf yorumlamadan daha hızlıdır.",
    "En bilinen örnek Java. Java derleyicisi kaynak kodu bayt koduna çevirir. Bayt kodu, Java Sanal Makinesi olan her bilgisayarda çalışabilir; Java'nın taşınabilirliğinin sırrı budur. Perl programları da çalıştırılmadan önce hataları bulmak için kısmen derlenir.",
    "Tam zamanında, yani JIT sistemleri bir adım daha ileri gider. Ara koddaki bir alt program ilk çağrıldığında makine koduna derlenir ve bu makine kodu sonraki çağrılar için saklanır. Bugün Java programları ve tüm .NET dilleri JIT sistemleriyle çalışır.",
  ],
},
{
  id: "compare", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> Karşılaştırma",
  html: (() => {
    const rows = [["Derleme", "tüm program, bir kez", "en hızlı", "C, C++", "teal"], ["Saf yorumlama", "yok", "en yavaş", "kabuk betikleri, ilk JavaScript", "coral"], ["Hibrit", "ara koda", "orta", "Perl, ilk Java", "violet"], ["JIT", "ara kod → gerektiğinde makine koduna", "derlenmişe yakın", "Java, C#", "amber"]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dört yaklaşım <em>yan yana</em></h2>
    <table style="width:100%;border-collapse:separate;border-spacing:0 18px;font-size:32px">
      <tr class="r" data-s="0" style="color:var(--faint);font-size:24px"><td style="padding:0 26px">Yöntem</td><td>Çeviri</td><td>Yürütme hızı</td><td>Örnek</td></tr>
      ${rows.map(([a, b, c, d, k], i) => `<tr class="r rl" data-s="${i + 1}" data-hot="${i + 1}" style="background:var(--panel)">
        <td style="padding:34px 26px;border-radius:18px 0 0 18px;font-weight:700;color:var(--${k});width:330px">${a}</td><td style="color:var(--muted)">${b}</td><td style="font-weight:600">${c}</td><td style="border-radius:0 18px 18px 0;color:var(--muted)" class="mono">${d}</td></tr>`).join("")}
    </table>
    <div class="note r" data-s="4" style="margin-top:auto"><b>Derleyici neden?</b> Erken hata kontrolü, hızlı çalışma, “bir kez derle, çok kez çalıştır”. &nbsp; <b>Yorumlayıcı neden?</b> Esneklik, dinamik ortamlar, sanal makineler.</div>
  </div>`;
  })(),
  n: [
    "Dört yaklaşımı yan yana koyalım.",
    "Derleme: tüm program bir kez çevrilir; yürütme en hızlıdır. C ve C++ buna örnektir.",
    "Saf yorumlama: çeviri yoktur; yürütme en yavaştır ama hata ayıklama kolaydır. Kabuk betikleri ve ilk dönem JavaScript buna örnektir.",
    "Hibrit: program ara koda çevrilir, hız ortadadır ve taşınabilirlik yüksektir. Perl ve ilk Java sürümleri buna örnektir.",
    "JIT: ara kod gerektiğinde makine koduna derlenir ve derlenmiş koda yakın bir hız elde edilir; bugünkü Java ve C# böyle çalışır. Özetle derleyiciyi erken hata kontrolü ve hız için, yorumlayıcıyı ise esneklik için tercih ederiz.",
  ],
},
{
  id: "preprocessor", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> Önişlemci",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="hl">Önişlemci</span> · derlemeden hemen önce</h2>
    <div class="row" style="flex:1;gap:30px;align-items:center">
      <div class="f1 r" data-s="1">${code("input.cpp", [{ t: "#define MAX 50", hot: "2" }, { t: "//this is a comment", hot: "2" }, "void main()", "{", "    int x;", { t: "//more comments", hot: "2" }, { t: "    x = MAX;", hot: "2" }, { t: "#define MIN 10", hot: "2" }, "    int y;", { t: "    x = y - MIN;  //blah", hot: "2" }, "}"], { lang: "c", cls: "xs" })}</div>
      <div class="r" data-s="2" style="display:flex;flex-direction:column;align-items:center;gap:12px"><div class="box" style="width:220px;height:110px;font-size:28px;border-color:var(--amber)">Önişlemci</div><span class="arrow" style="font-size:60px">→</span></div>
      <div class="f1 r" data-s="2">${code("temp.cpp", ["void main()", "{", "    int x;", { t: "    x = 50;", hot: "2" }, "    int y;", { t: "    x = y - 10;", hot: "2" }, "}"], { lang: "c", cls: "xs" })}</div>
    </div>
    <div class="note r" data-s="2">Yorumlar silindi, <b>MAX → 50</b>, <b>MIN → 10</b>. En bilinen örnek: C önişlemcisi (<span class="mono">#include</span>, <span class="mono">#define</span>).</div>
  </div>`,
  n: [
    "Derlemeden hemen önce çalışan bir araç daha var: önişlemci. Önişlemci, programdaki makroları genişletir, başka bir dosyadaki kodu programa dahil eder ve yorumları kaldırır.",
    "Soldaki input.cpp dosyasında iki define makrosu ve birkaç yorum satırı var.",
    "Önişlemciden geçtikten sonra sağdaki temp.cpp oluşur: yorumlar silinmiş, MAX yerine 50, MIN yerine 10 yazılmıştır. Derleyici artık bu değiştirilmiş kaynağı görür. En bilinen örnek, include ve define komutlarını işleyen C önişlemcisidir.",
  ],
},
// ───────────────────────── 1.8
{
  id: "environments", ch: "1.8 Programlama platformları", chip: "<b>1.8</b> Programlama platformları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Programlama <em>ortamları</em></h2>
    <p class="lead r" data-s="0" style="font-size:30px">Yazılım geliştirmede kullanılan araçlar bütünü: dosya sistemi, metin editörü, bağlayıcı, derleyici… Verimliliği dil kadar etkiler.</p>
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="1"><div class="ic t">🐧</div><h3>UNIX</h3><p>Eski ama güçlü bir işletim sistemi + araç koleksiyonu. İlk sürümlerde grafik arayüz yoktu; bugün <b>GNOME</b>, <b>KDE</b>, CDE.</p></div>
      <div class="card r" data-s="2"><div class="ic a">☕</div><h3>JBuilder · NetBeans</h3><p>Java için tümleşik geliştirme ortamı (IDE): derleyici, editör, hata ayıklayıcı ve dosya sistemi tek grafik arayüzde.</p></div>
      <div class="card r" data-s="2" style="transition-delay:.25s"><div class="ic v">🪟</div><h3>Visual Studio .NET</h3><p>Büyük, karmaşık bir görsel ortam: C#, Visual Basic .NET, JScript, J#, C++.</p></div>
    </div>
    <div class="r" data-s="3" style="display:flex;align-items:center;gap:20px;margin-top:28px"><span style="font-size:28px;color:var(--muted)">Bugün:</span><span class="pill t">VS Code</span><span class="pill t">IntelliJ IDEA</span><span class="pill t">Eclipse</span><span class="pill t">PyCharm</span></div>
  </div>`,
  n: [
    "Bölüm 1.8: Programlama platformları. Yazılım geliştirirken kullanılan araçların bütününe programlama ortamı denir: dosya sistemi, metin editörü, bağlayıcı ve derleyici gibi. Bir yazılım geliştirme sisteminin gücü, yalnızca dilin özellikleriyle ölçülmez.",
    "UNIX, eski ama güçlü bir işletim sistemi ve araç koleksiyonudur. İlk sürümlerinde araçlar arasında grafik bir arayüz yoktu ve öğrenmesi zordu. Bugün GNOME ve KDE gibi grafik arayüzlerle Windows ve Mac'e benzer bir görünüm kazandı.",
    "Borland JBuilder ve NetBeans, Java için derleyici, editör, hata ayıklayıcı ve dosya sistemini tek bir grafik arayüzde birleştiren tümleşik geliştirme ortamlarıdır. Microsoft Visual Studio .NET ise C#, Visual Basic .NET ve C++ gibi birçok dili destekleyen büyük ve karmaşık bir görsel ortamdır.",
    "Bugün aynı fikri Visual Studio Code, IntelliJ IDEA ve Eclipse gibi ortamlarda görüyoruz.",
  ],
},
// ───────────────────────── Özet & Quiz
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="flex:1">
      ${[["💡", "t", "Neden öğrenmeli?", "İfade gücü, bilinçli dil seçimi, yeni dilleri kolay öğrenme"],
         ["⚖️", "a", "Değerlendirme kriterleri", "Okunabilirlik · Yazılabilirlik · Güvenilirlik · Maliyet"],
         ["🏛️", "v", "Tasarımı etkileyenler", "Makine mimarisi (von Neumann) ve yazılım geliştirme yöntemleri"],
         ["⚙️", "c", "İmplementasyon", "Derleme · Saf yorumlama · Hibrit (ve JIT)"]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "Programlama dili kavramlarını öğrenmek ifade gücümüzü artırır, dil seçimimizi bilinçli kılar ve yeni dilleri öğrenmeyi kolaylaştırır.",
    "Dilleri değerlendirirken dört ana kriter kullanırız: okunabilirlik, yazılabilirlik, güvenilirlik ve maliyet.",
    "Dil tasarımını en çok etkileyen iki etken, makine mimarisi ve yazılım geliştirme yöntemleridir.",
    "Ve programlama dilleri üç ana yöntemle uygulanır: derleme, saf yorumlama ve hibrit sistemler.",
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
        <div class="card tint-t r rp" data-s="${2 + i * 2}" style="padding:34px 50px;border-color:rgba(53,208,192,.5)"><div style="font-size:42px;font-weight:700;color:var(--teal)">✓ ${a}</div></div>
      </div>`).join("")}
    </div>
    <style>.cd{stroke-dashoffset:0}.r.on .cd{animation:cd 4s linear 1.2s both}@keyframes cd{from{stroke-dashoffset:0}to{stroke-dashoffset:264}}</style>
  </div>`,
  n: [
    "Şimdi kısa bir mini test yapalım. Her sorudan sonra birkaç saniye düşünme süreniz var.",
    ...quiz.flatMap(([q, a], i) => [
      { t: `Soru ${i + 1}. ${q.replace(/\s*\(.*?\)/, "")}`, pause: 3.5 },
      `Cevap: ${a.replace("↔", "ve").replace(/[—()]/g, ",")}.`,
    ]),
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "", brand: false,
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 1 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Sıradaki: <b style="color:var(--text)">Bölüm 2 — Başlıca programlama dillerinin evrimi</b></div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta, <i>Concepts of Programming Languages</i> · Watt, <i>Programming Language Design Concepts</i> · Scott, <i>Programming Language Pragmatics</i><br>Ders notları: Z. Orhan, M. Şahin, E. Tanyıldızı, Ahmet Yesevi Üniversitesi</div>
  </div>`,
  n: [
    "Bölüm 1'i tamamladık! Bir sonraki bölümde başlıca programlama dillerinin tarihsel evrimini inceleyeceğiz.",
    "İzlediğiniz için teşekkürler. Notlarınızı tekrar etmeyi ve mini testteki soruları kendi cümlelerinizle cevaplamayı unutmayın. Görüşmek üzere!",
  ],
},
];
