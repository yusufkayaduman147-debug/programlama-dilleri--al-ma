const { code } = require("./lib");

module.exports = [
// ───────────────────────── GİRİŞ
{
  id: "intro", ch: "Giriş", chip: "", brand: false,
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div style="display:flex;gap:46px;margin-bottom:56px">
      ${[["{ }", "teal", "İmperatif"], ["λ", "violet", "Fonksiyonel"], [":-", "amber", "Mantıksal"], ["obj.", "coral", "Nesne"]].map(([g, c, l], i) => `
      <div class="r rp" data-s="1" style="width:150px;height:150px;border-radius:36px;background:var(--panel);border:2px solid var(--${c});display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;transition-delay:${i * 0.12}s">
        <span class="mono" style="font-size:52px;color:var(--${c});font-weight:700">${g}</span>
        <span style="font-size:19px;color:var(--muted)">${l}</span></div>`).join("")}
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:150px;line-height:1;margin:18px 0 26px;transition-delay:.1s">Bölüm 1: Giriş</div>
    <div class="r" data-s="2" style="font-size:32px;color:var(--muted)">Kaynak: R. W. Sebesta — <i>Concepts of Programming Languages</i></div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin ilk bölümüne hoş geldiniz.",
    "Bu bölümde programlama dillerine kuş bakışı bakacağız. Neden bu kavramları öğrenmeliyiz? Bir dili nasıl değerlendiririz? Diller nasıl tasarlanır ve yazdığımız kod makinede nasıl çalışır?",
    "Anlatım, Robert Sebesta'nın Programlama Dilleri Kavramları kitabının ilk bölümünü takip ediyor. Hazırsanız başlayalım.",
  ],
},
{
  id: "roadmap", ch: "Giriş", chip: "Yol Haritası",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bu bölümde <em>neler var?</em></h2>
    <div class="grid2" style="gap:24px 60px;margin-top:10px">
      ${["Programlama dili kavramlarını öğrenmenin nedenleri", "Programlama alanları", "Dil değerlendirme kriterleri", "Dil tasarımını etkileyen faktörler", "Dil kategorileri (paradigmalar)", "Dil tasarımında verilen ödünler", "İmplementasyon yöntemleri", "Programlama platformları"]
        .map((t, i) => `<div class="r rl" data-s="${i < 4 ? 1 : 2}" style="display:flex;align-items:center;gap:28px;transition-delay:${(i % 4) * 0.15}s;grid-row:${(i % 4) + 1};grid-column:${i < 4 ? 1 : 2}">
          <span class="mono" style="font-size:34px;font-weight:700;color:var(--amber);background:rgba(255,181,71,.12);border-radius:16px;width:96px;height:72px;display:flex;align-items:center;justify-content:center">1.${i + 1}</span>
          <span style="font-size:36px;font-weight:600">${t}</span></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Önce yol haritamıza bakalım. Bu bölümde sekiz konu var.",
    "Programlama dili kavramlarını öğrenmenin nedenleri, programlama alanları, dil değerlendirme kriterleri ve dil tasarımını etkileyen faktörler.",
    "Ardından dil kategorilerini, tasarımda verilen ödünleri, implementasyon yöntemlerini ve son olarak programlama platformlarını göreceğiz.",
  ],
},
// ───────────────────────── 1.1
{
  id: "why", ch: "1.1 Neden programlama dilleri?", chip: "<b>1.1</b> Kavramları öğrenmenin nedenleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Neden dil <em>kavramlarını</em> öğrenelim?</h2>
    <div class="grid3" style="flex:1">
      ${[["💬", "t", "Fikirleri ifade etme", "Düşünce ufkunu genişletir"], ["🧭", "a", "Uygun dili seçebilme", "Doğru iş için doğru araç"], ["📚", "v", "Yeni dilleri öğrenme", "Kavramlar dilden dile taşınır"],
         ["⚙️", "c", "İmplementasyonu anlama", "Kod makinede nasıl çalışır?"], ["🛠️", "g", "Bilinen dili iyi kullanma", "Bilmediğin özellikleri keşfet"], ["🚀", "b", "Bilgisayar biliminin ilerlemesi", "Daha iyi diller, daha iyi seçimler"]]
        .map(([e, c, h, p], i) => `<div class="card r rp" data-s="${1 + Math.floor(i / 2)}" style="transition-delay:${(i % 2) * 0.18}s">
          <div class="ic ${c}">${e}</div><h3>${h}</h3><p>${p}</p></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Bölüm 1.1. Zaten bir iki programlama dili biliyorken, neden programlama dillerinin kavramlarını öğrenelim? Sebesta altı neden sayıyor.",
    "Birincisi, fikirlerimizi ifade etme yeteneğimizi artırmak. İkincisi, bir proje için en uygun dili seçebilmek.",
    "Üçüncüsü, yeni dilleri daha kolay öğrenmek. Dördüncüsü, dillerin nasıl gerçekleştirildiğini, yani implementasyonun önemini anlamak.",
    "Beşincisi, zaten bildiğimiz dili daha iyi kullanmak. Altıncısı ise bilgisayar biliminin genel olarak ilerlemesi. Şimdi bunlara tek tek bakalım.",
  ],
},
{
  id: "express", ch: "1.1 Neden programlama dilleri?", chip: "<b>1.1</b> Fikirleri ifade etme",
  html: `
  <div class="wrap">
    <div class="row" style="flex:1;gap:60px">
      <div class="col" style="width:720px;justify-content:center">
        <div class="quote r" data-s="0">Düşüncelerimizin derinliği, kullandığımız dilin ifade gücünden etkilenir.</div>
        <div class="note r" data-s="1">Programcının dili de sınırlar: <b>kontrol yapıları</b>, <b>veri yapıları</b> ve <b>soyutlamalar</b>. Daha çok dil özelliği bilmek = daha geniş ufuk.</div>
      </div>
      <div class="col f1" style="justify-content:center">
        <div class="r" data-s="2">${code("ara.f90", ["pos = INDEX('PROGRAMLAMA', 'GRAM')", "! pos = 4  → hazır fonksiyon"], { lang: "fortran", cls: "sm" })}</div>
        <div class="r" data-s="3">${code("ara.pas  — INDEX yok, simüle edelim", [
          "function Bul(s, t: string): integer;",
          "var i: integer;",
          "begin",
          "  Bul := 0;",
          "  for i := 1 to Length(s) do",
          "    if Copy(s, i, Length(t)) = t then",
          "    begin Bul := i; Exit end;",
          "end;"], { lang: "pascal", cls: "xs" })}</div>
        <div class="note r" data-s="4" style="background:rgba(53,208,192,.08);border-color:rgba(53,208,192,.3)">Seçme şansın varsa: özelliği <b style="color:var(--teal)">doğrudan destekleyen</b> dili kullan.</div>
      </div>
    </div>
  </div>`,
  n: [
    "İlk neden, fikirleri ifade etme yeteneği. Düşüncelerimizin derinliğinin, kullandığımız dilin ifade gücünden etkilendiğine inanılır. Sözle anlatamadığımız bir yapıyı kavramlaştırmak da zordur.",
    "Programcılar için de durum aynı. Bildiğimiz dilin kontrol yapıları, veri yapıları ve soyutlamaları, aklımıza gelen çözümleri sınırlar. Ne kadar çok dil özelliği tanırsak, bu sınır o kadar genişler.",
    "Peki bir dili kullanmak zorundaysak bu bilgi yine de işe yarar mı? Evet! Örneğin Fortran 90'da bir metnin içinde alt metin arayan hazır bir INDEX fonksiyonu vardır.",
    "Standart Pascal'da böyle bir fonksiyon yok. Ama bu kavramı bilen bir programcı, aynı işi yapan küçük bir alt program yazarak özelliği simüle edebilir.",
    "Yine de seçme şansımız varsa, özelliği doğrudan destekleyen dili kullanmak daha iyidir. Çünkü simülasyon her zaman daha hantal ve daha karmaşıktır.",
  ],
},
{
  id: "choose", ch: "1.1 Neden programlama dilleri?", chip: "<b>1.1</b> Dil seçimi ve yeni diller",
  html: `
  <div class="wrap">
    <div class="grid2" style="flex:1">
      <div class="card tint-a r" data-s="0" style="display:flex;flex-direction:column">
        <div class="ic a">🧭</div><h3>Uygun dili seçebilme</h3>
        <p>Az dil bilen programcı, yeni projede <b>en uygun</b> dili değil, <b>bildiği</b> dili seçer.</p>
        <div class="r" data-s="0" style="margin-top:auto;padding-top:30px;display:flex;align-items:center;gap:26px">
          <span class="emo" style="font-size:90px">🔨</span>
          <span style="font-size:30px;font-style:italic;color:var(--text)">“Elinde sadece çekiç olana her şey çivi görünür.”</span></div>
        <p class="r" data-s="1" style="margin-top:24px;color:var(--amber)">Diğer dilleri tanıyan → doğru aracı seçer, daha verimli projeler çıkarır.</p>
      </div>
      <div class="card tint-v r" data-s="2" style="display:flex;flex-direction:column">
        <div class="ic v">📚</div><h3>Yeni dilleri öğrenebilme</h3>
        <p>Bilgisayar bilimi genç ve hızla değişiyor → programcılık <b>ömür boyu öğrenme</b> ister.</p>
        <div class="col" style="margin-top:30px;gap:18px">
          ${[["Veri soyutlama", "Java'da soyut veri tipleri"], ["Nesne yönelimli kavramlar", "C++ / Java"]].map(([a, b]) => `
          <div class="r" data-s="3" style="display:flex;align-items:center;gap:18px;font-size:28px">
            <span class="pill v">${a}</span><span class="arrow">→</span><span class="pill">${b}</span></div>`).join("")}
          <p class="r" data-s="3" style="color:var(--violet)">Kavramı bilen, yeni dilde onu hemen tanır.</p>
        </div>
      </div>
    </div>
  </div>`,
  n: [
    "İkinci neden, uygun dili seçebilmek. Bir programcı yalnızca bir iki dil biliyorsa, yeni bir projede en uygun dili değil, bildiği dili seçer. Hani derler ya: elinde sadece çekiç olana her şey çivi gibi görünür.",
    "Diğer dillerin özelliklerini ve kavramlarını tanıyan programcı ise proje için doğru aracı seçer ve çok daha verimli işler çıkarır.",
    "Üçüncü neden, yeni dilleri öğrenebilmek. Bilgisayar programcılığı genç ve hızla değişen bir alan. Diller, araçlar ve tasarım yöntemleri gelişmeye devam ediyor. Bu yüzden programcılık ömür boyu öğrenmeyi gerektirir.",
    "Temel kavramları bilen biri, yeni bir dilde bu kavramların nasıl birleştirildiğini hemen görür. Örneğin veri soyutlamayı bilen biri Java'daki soyut veri tiplerini, nesne yönelimli kavramları bilen biri de C++ ya da Java'yı çok daha hızlı öğrenir.",
  ],
},
{
  id: "impl-adv", ch: "1.1 Neden programlama dilleri?", chip: "<b>1.1</b> İmplementasyon, kullanım, ilerleme",
  html: `
  <div class="wrap">
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="0" data-dim="1"><div class="ic c">⚙️</div><h3>İmplementasyonu anlamak</h3>
        <ul class="b" style="margin-top:12px"><li style="font-size:27px">Hataları bulup düzeltmek kolaylaşır</li><li style="font-size:27px">Makinenin yapıları nasıl çalıştırdığını canlandırırsın</li><li style="font-size:27px">Aynı işi yapan yapılardan <b>verimlisini</b> seçersin</li></ul></div>
      <div class="card r" data-s="1" data-dim="2"><div class="ic g">🛠️</div><h3>Bildiğin dili iyi kullanmak</h3>
        <p>Diller büyük ve karmaşık. Çoğu programcı dilin <b>bir kısmını</b> bilir.</p>
        <p style="margin-top:18px">Kavramları bilen, hiç kullanmadığı özellikleri de rahatça öğrenir.</p></div>
      <div class="card r" data-s="2"><div class="ic b">🚀</div><h3>Bilimin ilerlemesi</h3>
        <p>Popüler olan her zaman en iyisi değildir.</p>
        <div style="margin-top:26px;display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;justify-content:space-between;font-size:28px"><span class="pill t">ALGOL 60</span><span style="color:var(--muted)">daha iyi tasarım</span></div>
          <div style="display:flex;justify-content:space-between;font-size:28px"><span class="pill a">FORTRAN</span><span style="color:var(--muted)">ama kazanan</span></div>
        </div>
        <p class="r" data-s="3" style="margin-top:30px;font-size:34px;color:var(--amber);font-weight:700">Bugünün dilleri sonsuza kadar mı?</p></div>
    </div>
  </div>`,
  n: [
    "Dördüncü neden, implementasyonun önemini kavramak. Bir dilin nasıl gerçekleştirildiğini bilen programcı, hataları daha kolay bulur ve aynı işi yapan iki yapıdan hangisinin daha verimli olduğunu anlayabilir. Detaylar derleyici tasarımı dersinde; burada kısaca değineceğiz.",
    "Beşincisi, zaten bildiğimiz dili daha iyi kullanmak. Modern diller çok büyük ve karmaşık; çoğumuz bir dilin yalnızca bir kısmını kullanırız. Kavramları bilen, dilin daha önce kullanmadığı özelliklerini de rahatça öğrenip kullanır.",
    "Ve altıncısı, bilgisayar biliminin genel ilerlemesi. Tarih, popüler olan dilin her zaman en iyi dil olmadığını gösteriyor. Altmışlı yıllarda ALGOL 60'ın FORTRAN'ın yerini alacağı düşünülüyordu. Ama ALGOL'un tanımı karmaşık ve okunması zor bulundu, bu yüzden FORTRAN'ın yerini alamadı.",
    "O halde şu soruyu sormakta fayda var: Bugün popüler olan diller sonsuza kadar kullanılacak mı?",
  ],
},
// ───────────────────────── 1.2
{
  id: "domains", ch: "1.2 Programlama alanları", chip: "<b>1.2</b> Programlama alanları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Her alanın <em>ihtiyacı</em> farklı</h2>
    <div class="grid5" style="flex:1">
      ${[["🔬", "t", "Bilimsel", "Diziler, matrisler, yoğun kayan noktalı hesap", ["Fortran"]],
         ["💼", "a", "Ticari", "Raporlar, ondalık sayılar, karakter verisi", ["COBOL"]],
         ["🧠", "v", "Yapay Zekâ", "Sayı yerine sembol, bağlı listeler, esneklik", ["LISP", "Prolog"]],
         ["🖥️", "c", "Sistem", "Verimlilik ve alçak seviyeli donanım erişimi", ["C", "UNIX"]],
         ["🌐", "b", "Web", "İşaretleme + betik + genel amaçlı diller", ["XHTML", "PHP", "Java"]]]
        .map(([e, c, h, p, l], i) => `<div class="card r rp" data-s="${i + 1}" data-hot="${i + 1}" style="padding:30px 28px;display:flex;flex-direction:column">
          <div class="ic ${c}">${e}</div><h3 style="font-size:34px">${h}</h3><p style="font-size:25px">${p}</p>
          <div class="pills" style="margin-top:auto;padding-top:20px">${l.map((x) => `<span class="pill ${c}">${x}</span>`).join("")}</div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Bölüm 1.2: Programlama alanları. Bilgisayarlar çok farklı işlerde kullanılır ve her alan dillere farklı ihtiyaçlar yükler.",
    "İlk alan bilimsel uygulamalardı. Bunlar basit veri yapıları, özellikle diziler ve matrisler, ama çok sayıda kayan noktalı hesaplama içerir. Bu alanın ilk ve en önemli dili FORTRAN'dır.",
    "Ardından ticari uygulamalar geldi: rapor üretmek, ondalık sayıları ve karakter verisini işlemek. Bu alanın klasik dili COBOL'dur.",
    "Yapay zekâda ise sayılar yerine semboller işlenir ve diziler yerine bağlı listeler kullanılır. Hatta bazı programlar çalışırken kendi kodunu üretir. LISP ve Prolog bu alanın dilleridir.",
    "Sistem programlamada, yani işletim sistemleri ve destek araçlarında, sürekli kullanım nedeniyle verimlilik kritiktir ve donanıma alçak seviyeli erişim gerekir. Örneğin UNIX işletim sistemi büyük ölçüde C ile yazılmıştır.",
    "Son olarak web yazılımı: burada XHTML gibi işaretleme dilleri, PHP gibi betik diller ve Java gibi genel amaçlı diller bir arada kullanılır.",
  ],
},
// ───────────────────────── 1.3
{
  id: "criteria", ch: "1.3 Dil değerlendirme kriterleri", chip: "<b>1.3</b> Dil değerlendirme kriterleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bir dili <em>iyi</em> yapan nedir?</h2>
    <div class="grid4" style="flex:1">
      ${[["👁️", "t", "Okunabilirlik", "Readability", "Programlar ne kolay okunup anlaşılıyor?"],
         ["✍️", "a", "Yazılabilirlik", "Writability", "Program yazmak ne kadar kolay?"],
         ["🛡️", "v", "Güvenilirlik", "Reliability", "Program her koşulda şartnameye uygun mu?"],
         ["💰", "c", "Maliyet", "Cost", "Toplam, nihai maliyet ne?"]]
        .map(([e, c, h, en, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" data-hot="${i + 1}" style="display:flex;flex-direction:column">
          <div class="ic ${c}" style="width:110px;height:110px;font-size:56px">${e}</div>
          <h3 style="font-size:40px;color:var(--${["teal", "amber", "violet", "coral"][i]})">${h}</h3>
          <div class="mono" style="font-size:24px;color:var(--faint);margin-bottom:18px">${en}</div><p>${p}</p>
          <div style="margin-top:auto;font-size:96px;opacity:.16;text-align:right" class="emo">${e}</div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Bölüm 1.3, bu bölümün kalbi: Dil değerlendirme kriterleri. Bir dili iyi ya da kötü yapan nedir?",
    "Birinci kriter okunabilirlik: programların ne kolaylıkla okunup anlaşılabildiği.",
    "İkincisi yazılabilirlik: bir dille, seçilen problem için ne kolaylıkla program yazılabildiği.",
    "Üçüncüsü güvenilirlik: programın her koşulda şartnameye uygun, yani doğru davranması.",
    "Ve dördüncüsü maliyet: dilin toplam, nihai maliyeti.",
  ],
},
{
  id: "matrix", ch: "1.3 Dil değerlendirme kriterleri", chip: "<b>1.3</b> Özellikler ve kriterler",
  html: (() => {
    const rows = [["Sadelik", 3], ["Kontrol yapıları", 3], ["Veri tipleri ve yapıları", 3], ["Sözdizimi tasarımı", 3], ["Soyutlama desteği", 2], ["İfade gücü", 2], ["Tip kontrolü", 1], ["İstisna yönetimi", 1], ["Kısıtlı takma adlandırma", 1]];
    const cols = [["Okunabilirlik", "teal"], ["Yazılabilirlik", "amber"], ["Güvenilirlik", "violet"]];
    const dot = (c, s) => `<span class="r rp" data-s="${s}" style="display:inline-block;width:30px;height:30px;border-radius:50%;background:var(--${c});box-shadow:0 0 18px var(--${c})"></span>`;
    return `
  <div class="wrap" style="flex-direction:row;gap:60px">
    <div class="r" data-s="0" style="width:1120px">
      <table style="border-collapse:separate;border-spacing:0;width:100%;font-size:29px">
        <tr><th style="text-align:left;padding:0 0 18px;color:var(--faint);font-weight:500;font-size:24px">Özellik</th>${cols.map(([c, k]) => `<th style="color:var(--${k});padding:0 0 18px;font-size:27px;width:230px">${c}</th>`).join("")}</tr>
        ${rows.map(([r, n], i) => `<tr style="background:${i % 2 ? "transparent" : "rgba(255,255,255,.03)"}"><td style="padding:12px 18px;font-weight:600">${r}</td>
          <td style="text-align:center">${n === 3 ? dot("teal", 1) : ""}</td>
          <td style="text-align:center">${n >= 2 ? dot("amber", 2) : ""}</td>
          <td style="text-align:center">${dot("violet", 3)}</td></tr>`).join("")}
      </table>
    </div>
    <div class="col f1" style="justify-content:center">
      <div class="note r" data-s="1" data-dim="2" style="background:rgba(53,208,192,.08);border-color:rgba(53,208,192,.3)"><b style="color:var(--teal)">Okunabilirlik:</b> ilk dört özellik</div>
      <div class="note r" data-s="2" data-dim="3"><b>Yazılabilirlik:</b> + soyutlama, ifade gücü</div>
      <div class="note r" data-s="3" style="background:rgba(164,147,255,.08);border-color:rgba(164,147,255,.3)"><b style="color:var(--violet)">Güvenilirlik:</b> hepsi + tip kontrolü, istisnalar, aliasing</div>
      <div class="r" data-s="4" style="font-size:30px;line-height:1.45;color:var(--text);margin-top:16px">Okunabilirliği iyileştiren her şey <span class="hl">güvenilirliği de</span> iyileştirir.</div>
    </div>
  </div>`;
  })(),
  n: [
    "Bu kriterler, dilin bazı temel özelliklerinden etkilenir. Bu tabloyu bölüm boyunca aklınızda tutun.",
    "Okunabilirliği sadelik, kontrol yapıları, veri tipleri ve sözdizimi tasarımı belirler.",
    "Yazılabilirliği bu dört özelliğe ek olarak soyutlama desteği ve ifade gücü etkiler.",
    "Güvenilirlik ise hepsinden etkilenir. Üstüne tip kontrolü, istisna yönetimi ve kısıtlı takma adlandırma eklenir.",
    "Dikkat edin: okunabilirliği iyileştiren her şey, dolaylı yoldan güvenilirliği de iyileştirir. Şimdi bunları tek tek inceleyelim.",
  ],
},
{
  id: "simplicity", ch: "1.3 Okunabilirlik", chip: "<b>1.3</b> Okunabilirlik · Sadelik",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="tl">Okunabilirlik</span> · Genel sadelik</h2>
    <div class="row" style="flex:1;gap:56px">
      <div class="col" style="width:760px">
        <p class="lead r" data-s="0" style="font-size:31px">Programın ömrünün büyük kısmı <b>bakımla</b> geçer — bakım için kodu okumak gerekir.</p>
        <ul class="b t">
          <li class="r" data-s="1"><b>Çok fazla temel yapı</b> → herkes dilin farklı bir alt kümesini bilir; yazan ile okuyan anlaşamaz.</li>
          <li class="r" data-s="2"><b>Özellik çokluğu:</b> aynı işi yapmanın birden çok yolu.</li>
        </ul>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("Java · count değerini 1 artır", ["count = count + 1;", "count += 1;", "count++;", "++count;"], { lang: "java", cls: "lg" })}</div>
        <div class="r" data-s="3">${code("Bir ifadenin içinde fark eder!", ["int count = 5;", { t: "x = count++;  // x = 5, count = 6", hot: "3" }, { t: "x = ++count;  // x = 7, count = 7", hot: "3" }], { lang: "java", cls: "sm" })}</div>
      </div>
    </div>
  </div>`,
  n: [
    "Okunabilirlik, bir dilin değerlendirilmesindeki en önemli kriterlerden biridir. Çünkü bir programın ömrünün büyük kısmı bakımla geçer ve bakım için kodu okumak gerekir.",
    "Okunabilirliği etkileyen ilk özellik genel sadeliktir. Çok fazla temel yapıya sahip bir dili öğrenmek zordur. Programcılar dilin sadece bir alt kümesini öğrenir ve kodu yazan ile okuyan farklı alt kümeleri biliyorsa sorun çıkar.",
    "İkinci sorun özellik çokluğu, yani aynı işi yapmanın birden fazla yolu olması. Örneğin Java'da bir değişkeni bir artırmanın tam dört yolu var.",
    "Tek başlarına kullanıldıklarında hepsi aynı işi yapar. Ama bir ifadenin içinde fark ederler. x eşittir count artı artı, önce eski değeri atar, sonra artırır. Artı artı count ise önce artırır, sonra atar. Okuyucunun bu farkları bilmesi gerekir.",
  ],
},
{
  id: "overload", ch: "1.3 Okunabilirlik", chip: "<b>1.3</b> Okunabilirlik · Operatör aşırı yükleme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bir operatör, <em>birçok anlam</em></h2>
    <div class="row" style="flex:1;gap:56px">
      <div class="col" style="width:820px">
        ${[["3 + 4", "tam sayı toplama", "t", 1], ["2.5 + 1.5", "reel sayı toplama", "t", 1], ["A + B", "matris toplama", "t", 1], ["+ dizi", "dizinin tüm elemanlarını topla?!", "c", 2]]
          .map(([e, d, c, s]) => `<div class="card r rl" data-s="${s}" style="display:flex;align-items:center;gap:30px;padding:24px 34px;${c === "c" ? "border-color:rgba(255,122,122,.5)" : ""}">
            <span class="mono" style="font-size:42px;font-weight:700;width:260px;color:var(--${c === "c" ? "coral" : "text"})">${e}</span>
            <span style="font-size:30px;color:var(--${c === "c" ? "coral" : "muted"})">${d}</span>
            <span style="margin-left:auto;font-size:40px" class="emo">${c === "c" ? "🤔" : "✅"}</span></div>`).join("")}
        <div class="note r" data-s="2">Aşırı yükleme <b>ölçülü</b> olmalı — okuyucu operatörün ne yaptığından emin olabilmeli.</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="flex:1">
          <h3>Aşırı sadelik de zararlı</h3>
          <p>Assembly en sade dillerden biridir; ama <span class="mono hl">c = a + b</span> bile:</p>
          <div style="margin-top:24px">${code("topla.asm", ["MOV  AX, [a]", "ADD  AX, [b]", "MOV  [c], AX"], { lang: "asm" })}</div>
          <p style="margin-top:22px">Sadelik okunabilirliği artırır, ama <b>dengeyle</b>.</p>
        </div>
      </div>
    </div>
  </div>`,
  n: [
    "Sadeliği etkileyen bir diğer konu operatör aşırı yüklemedir, yani bir operatöre birden fazla anlam verilmesi.",
    "Artı operatörünün tam sayıları, reel sayıları ve matrisleri toplaması makuldür. Bu, dildeki operatör sayısını azaltır.",
    "Ama bir programcı artı operatörünü örneğin bir dizinin bütün elemanlarını toplamak için tanımlarsa, kodu okuyan kişi artının burada ne yaptığından şüpheye düşer. Bu yüzden aşırı yükleme ölçülü olmalıdır.",
    "Öte yandan aşırı sadelik de zararlıdır. Assembly dili çok basit yapılara sahiptir, ama c eşittir a artı b gibi basit bir işlem bile birkaç satır sürer ve okunması zordur. Yani sadelik okunabilirliği artırır, ama dengeyle.",
  ],
},
{
  id: "orthogonality", ch: "1.3 Okunabilirlik", chip: "<b>1.3</b> Okunabilirlik · Ortogonallik",
  html: (() => {
    const types = ["int", "float", "char", "double"];
    const rows = [["T", "temel tip"], ["T[ ]", "dizi"], ["T*", "işaretçi"], ["T*[ ]", "işaretçi dizisi"], ["(T[ ])*", "diziye işaretçi"]];
    const cell = (ri, ti) => {
      const bad = (ri === 1 && ti !== 1) || ri === 3 || (ri === 4 && ti !== 1);
      return `<td style="padding:6px"><div class="box anim" data-hot="2" style="height:62px;font-family:JBM;font-size:24px;font-weight:500;position:relative">
        <span class="anim" ${bad ? `data-dim="3"` : ""}>${rows[ri][0].replace("T", types[ti])}</span>
        ${bad ? `<span class="r rp" data-s="3" style="position:absolute;right:8px;top:2px;color:var(--coral);font-size:30px;font-weight:700">✕</span>` : ""}</div></td>`;
    };
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="tl">Ortogonallik</span> · az parça, her birleşim geçerli</h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:640px">
        <p class="lead r" data-s="0" style="font-size:30px">Az sayıda <b>temel yapı</b>, az sayıda <b>birleştirme yolu</b> — ve her kombinasyon <b>kurallara uygun</b>.</p>
        <div class="card r" data-s="1" style="padding:26px 30px"><p><b>4 temel tip:</b> int, float, char, double</p><p><b>2 tip operatörü:</b> dizi, işaretçi</p></div>
        <div class="note r" data-s="4"><b>İngilizce benzetmesi:</b> geçmiş zaman için <span class="mono">-ed</span> eklenir… ama <span class="mono">go → went</span>. İstisnalar öğrenmeyi zorlaştırır.</div>
      </div>
      <div class="f1 r" data-s="1">
        <table style="width:100%;border-collapse:collapse">
          <tr><td></td>${types.map((t) => `<td style="text-align:center;font-family:JBM;color:var(--teal);font-size:26px;padding-bottom:10px">${t}</td>`).join("")}</tr>
          ${rows.map((r, ri) => `<tr><td style="font-size:24px;color:var(--muted);padding-right:16px;white-space:nowrap">${r[1]}</td>${types.map((_, ti) => cell(ri, ti)).join("")}</tr>`).join("")}
        </table>
        <div class="r" data-s="3" style="margin-top:20px;font-size:28px;color:var(--coral);text-align:center">Dizi sadece <span class="mono">float</span> ile çalışsaydı…</div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Okunabilirliği etkileyen ikinci özellik ortogonalliktir. Ortogonal bir dilde, az sayıda temel yapı, az sayıda yolla birleştirilir ve bu birleşimlerin her biri geçerlidir. Yani dilin özellikleri birbirinden bağımsızdır.",
    "Bir örnek verelim. Dört temel tipimiz olsun: int, float, char ve double. Ve iki tip operatörümüz olsun: dizi ve işaretçi.",
    "Bu operatörler hem temel tiplere hem de birbirlerine uygulanabiliyorsa çok sayıda veri yapısı elde ederiz: int dizisi, float'a işaretçi, işaretçi dizisi, diziye işaretçi ve daha fazlası.",
    "Peki dizi operatörü sadece float ile çalışsaydı? O zaman int dizisi, işaretçi dizisi ya da int dizisine işaretçi olmazdı. Dil istisnalarla dolu ve esnekliği az bir dil olurdu.",
    "İngilizce öğrenen birini düşünün: geçmiş zaman için fiilin sonuna -ed eklendiğini öğrenir, ama go fiilinin geçmişi went'tir. Her istisna, ayrıca öğrenilmesi gereken bir kuraldır. Ortogonallik, az istisna demektir.",
  ],
},
{
  id: "ibm-vax", ch: "1.3 Okunabilirlik", chip: "<b>1.3</b> Ortogonallik · IBM ve VAX",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Hangisi <em>ortogonal?</em></h2>
    <p class="lead r" data-s="0" style="font-size:30px">Görev: biri bellekte, biri yazmaçta olan iki 32 bitlik sayıyı topla.</p>
    <div class="grid2" style="flex:1">
      <div class="card r" data-s="1" data-dim="3">
        <h3>IBM ana bilgisayarı</h3>
        <div style="margin:16px 0 20px">${code("ibm.asm", ["A   Reg1, memory_cell", "AR  Reg1, Reg2"], { lang: "asm" })}</div>
        <p class="mono" style="font-size:22px">Reg1 ← Reg1 + memory_cell<br>Reg1 ← Reg1 + Reg2</p>
        <p style="margin-top:16px">İki ayrı komut; sonuç <b>hep bir yazmaçta</b>.</p>
      </div>
      <div class="card r" data-s="2" data-hot="3">
        <h3>VAX</h3>
        <div style="margin:16px 0 20px">${code("vax.asm", ["ADDL  operand_1, operand_2"], { lang: "asm" })}</div>
        <p class="mono" style="font-size:22px">operand_2 ← operand_1 + operand_2</p>
        <p style="margin-top:16px">Tek komut; işlenenler <b>yazmaç ya da bellek</b> olabilir.</p>
        <p class="r" data-s="3" style="margin-top:22px;font-size:34px;color:var(--teal);font-weight:700">✓ Daha ortogonal</p>
      </div>
    </div>
    <div class="note r" data-s="4" style="margin-top:28px">Ama <b>aşırı ortogonallik</b> de sorun: gereksiz karmaşıklık, daha çok hata. Sade ve dengeli örnek: <b>LISP</b> gibi fonksiyonel diller.</div>
  </div>`,
  n: [
    "Ortogonalliğe klasik bir örnek: iki farklı assembly dili. Görev, biri bellekte, diğeri yazmaçta duran iki tane otuz iki bitlik sayıyı toplamak.",
    "IBM ana bilgisayarlarında bunun için iki ayrı komut var. Yazmaç ile bellek hücresini toplamak için A, iki yazmacı toplamak için AR. Üstelik sonuç her zaman bir yazmaca yazılır.",
    "VAX'ta ise tek bir toplama komutu var: ADDL. İşlenenlerin her biri yazmaç da olabilir, bellek hücresi de.",
    "Yani VAX tasarımı daha ortogonaldir. Tek bir komut, her kombinasyonda çalışır ve öğrenilecek bir istisna yoktur.",
    "Ama dikkat: aşırı ortogonallik de sorundur. Her şeyin her şeyle birleşebildiği bir dilde gereksiz karmaşıklık doğar ve hata yapma olasılığı artar. LISP gibi fonksiyonel diller, sade ve ortogonal tasarımlarıyla iyi bir denge örneğidir.",
  ],
},
{
  id: "control-data", ch: "1.3 Okunabilirlik", chip: "<b>1.3</b> Okunabilirlik · Kontrol ve veri tipleri",
  html: `
  <div class="wrap">
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:1060px">
        <h2 class="t r" data-s="0" style="font-size:54px;margin-bottom:10px">Kontrol ifadeleri</h2>
        <div class="row" style="gap:28px;align-items:flex-start">
          <div class="r f1" data-s="1" data-dim="2">${code("goto ile", ["loop1:", "  if (incr >= 20) goto out;", "loop2:", "  if (sum > 100) goto next;", "  sum += incr;", "  goto loop2;", "next:", "  incr++;", "  goto loop1;", "out:"], { lang: "c", cls: "xs" })}</div>
          <div class="r f1" data-s="2">${code("while ile", ["while (incr < 20) {", "  while (sum <= 100) {", "    sum += incr;", "  }", "  incr++;", "}"], { lang: "c", cls: "xs" })}
            <p class="r" data-s="2" style="font-size:28px;color:var(--teal);margin-top:20px">Yapı bir bakışta okunuyor ✓</p></div>
        </div>
      </div>
      <div class="col f1">
        <h2 class="t r" data-s="3" style="font-size:54px;margin-bottom:10px">Veri tipleri</h2>
        <div class="card r" data-s="3" style="border-color:rgba(255,122,122,.4)"><div class="mono" style="font-size:40px">timeout = <span class="n">1</span></div><p style="margin-top:10px">Boolean yoksa: 1 ne demek?</p></div>
        <div class="card r" data-s="3" style="border-color:rgba(53,208,192,.5);transition-delay:.3s"><div class="mono" style="font-size:40px">timeout = <span class="k">true</span></div><p style="margin-top:10px">Anlamı tartışmasız ✓</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Okunabilirliği etkileyen üçüncü özellik kontrol ifadeleridir. Altmışlı yıllarda birçok dilde düzgün döngü yapıları yoktu ve programcılar goto komutlarıyla dallanmak zorundaydı.",
    "Soldaki kod, iç içe iki döngüyü goto ile kuruyor. Akışı takip etmek için sürekli yukarı aşağı zıplamanız gerekiyor.",
    "Aynı mantık while döngüleriyle yazılınca, yapı bir bakışta okunuyor. İyi tasarlanmış kontrol yapıları okunabilirliği büyük ölçüde artırır.",
    "Dördüncü özellik veri tipleri ve yapıları. Örneğin boolean tipi olmayan bir dilde zaman aşımını timeout eşittir 1 diye göstermek zorunda kalırız. timeout eşittir true ise anlamı hiç tartışmaya açık bırakmaz.",
  ],
},
{
  id: "syntax", ch: "1.3 Okunabilirlik", chip: "<b>1.3</b> Okunabilirlik · Sözdizimi tasarımı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="tl">Sözdizimi</span> tasarımı</h2>
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="1" data-dim="2"><div class="ic t">🏷️</div><h3>Tanıtıcı biçimi</h3>
        <p>Fortran 77: değişken adı en fazla <b>6 karakter</b>.</p>
        <div style="margin-top:22px;display:flex;flex-direction:column;gap:12px;font-family:JBM;font-size:30px">
          <span style="color:var(--coral)">✕ ogrenci_no</span><span style="color:var(--text)">→ OGRNNO ?</span></div></div>
      <div class="card r" data-s="2" data-dim="3"><div class="ic a">🔑</div><h3>Özel kelimeler</h3>
        <p>Ada: <span class="mono hl">end if</span>, <span class="mono hl">end loop</span> — hangi blok bitti belli.</p>
        <p style="margin-top:16px">Fortran 95: <span class="mono cl">Do</span> ve <span class="mono cl">End</span> değişken adı bile olabilir!</p></div>
      <div class="card r" data-s="3"><div class="ic v">🎭</div><h3>Biçim ve anlam</h3>
        <p>C'de <span class="mono hl">static</span>, yerine göre iki farklı anlam taşır:</p>
        <div style="margin-top:18px">${code("static.c", ["static int sayac;   // dışarıda:", "                   // sadece bu dosya", "void f() {", "  static int n = 0; // içeride:", "}                  // değerini korur"], { lang: "c", cls: "xs" })}</div></div>
    </div>
  </div>`,
  n: [
    "Beşinci özellik sözdizimi, yani dilin biçimsel görünüşü.",
    "Önce tanıtıcı isimleri. Fortran 77'de değişken isimleri en fazla altı karakter olabiliyordu. ogrenci_no gibi açıklayıcı bir isim veremez, OGRNNO gibi şifreli kısaltmalar yazardınız.",
    "Sonra özel kelimeler. Blokların nasıl kapandığı önemlidir. Ada, end if ve end loop gibi ayrık kapanışlar kullanarak hangi bloğun bittiğini açıkça gösterir. Fortran 95'te ise Do ve End gibi özel kelimeler değişken ismi olarak bile kullanılabilir; bu da okumayı zorlaştırır.",
    "Son olarak biçim ve anlam: Bir yapının görünüşü anlamını yansıtmalıdır. C'deki static kelimesi buna ters bir örnek. Bir fonksiyonun içinde kullanılırsa, değişkenin derleme zamanında oluşturulduğunu ve değerini çağrılar arasında koruduğunu söyler. Fonksiyonların dışında kullanılırsa, değişkenin sadece o dosyada görünür olduğunu söyler. Aynı kelime, iki farklı anlam.",
  ],
},
{
  id: "grep", ch: "1.3 Okunabilirlik", chip: "<b>1.3</b> Sözdizimi · grep örneği",
  html: `
  <div class="wrap center">
    <div class="r" data-s="0" style="font-family:JBM;font-size:40px;color:var(--faint);margin-bottom:30px">$ grep "hata" log.txt</div>
    <div style="display:flex;gap:30px;align-items:flex-end">
      ${[["g", "global", "teal"], ["re", "regular expression", "amber"], ["p", "print", "violet"]].map(([l, w, c], i) => `
      <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
        <div class="r rp mono" data-s="0" style="font-size:220px;font-weight:700;line-height:1;transition:color .5s ease, opacity .55s, transform .7s" data-hot="1"><span class="anim" data-hot="1,2" style="${""}">${l}</span></div>
        <div class="r" data-s="1" style="font-size:36px;color:var(--${c});font-weight:600;transition-delay:${i * 0.35}s">${w}</div></div>`).join("")}
    </div>
    <div class="r" data-s="2" style="margin-top:60px;font-size:34px;color:var(--muted);max-width:1300px;text-align:center;line-height:1.45">Adı, işlevi hakkında <b style="color:var(--text)">hiçbir ipucu</b> vermiyor. Anlamlı anahtar sözcükler okunabilirliğin temelidir.</div>
  </div>`,
  n: [
    "UNIX kabuk komutları, biçimle anlamın kopuk olduğu güzel bir örnektir. grep komutunun adı size ne anlatıyor?",
    "Muhtemelen hiçbir şey. Aslında g, global; r e, regular expression yani düzenli ifade; p ise print, yani yazdır demektir.",
    "Bunu ancak eski ed editörünü bilenler tahmin edebilir. Anlamlı anahtar sözcükler ve anlaşılır yapılar, okunabilirliğin temelidir.",
  ],
},
];
