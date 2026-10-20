const { code } = require("./lib");

const traceRow = (cells, s, hot) => `<tr class="r rl" data-s="${s}" ${hot ? `data-hot="${hot}"` : ""}>${cells.map((c) => `<td style="padding:12px 22px;border-bottom:1px solid var(--line)">${c}</td>`).join("")}</tr>`;

module.exports = [
// ───────────────────────── 1.5
{
  id: "paradigms", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> Dil kategorileri · Paradigmalar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Programlama <em>paradigmaları</em></h2>
    <p class="lead r" data-s="0" style="font-size:30px">Paradigma: bir topluluğun konuya bakışını belirleyen <b>kavramsal çerçeve</b>. Programcının problem çözme biçimini derinden etkiler.</p>
    <div class="row r" data-s="1" style="gap:30px;margin-bottom:34px">
      <div class="card f1" style="padding:26px 32px"><h3 style="font-size:30px">Paradigma yönelimli</h3><div class="pills" style="margin-top:8px"><span class="pill c">Smalltalk</span><span class="pill c">Eiffel</span><span style="font-size:26px;color:var(--muted);align-self:center">→ nesne</span><span class="pill t">FORTRAN</span><span class="pill t">Pascal</span><span style="font-size:26px;color:var(--muted);align-self:center">→ imperatif</span></div></div>
      <div class="card f1" style="padding:26px 32px"><h3 style="font-size:30px">Çok paradigmalı</h3><div class="pills" style="margin-top:8px"><span class="pill a">C++</span><span style="font-size:26px;color:var(--muted);align-self:center">imperatif + nesne yönelimli</span></div></div>
    </div>
    <div class="grid4" style="flex:1">
      ${[["{ }", "İmperatif", "Komutlar belleği değiştirir", "teal"], ["λ", "Fonksiyonel", "Fonksiyonları uygula", "violet"], [":-", "Mantıksal", "Kurallar ve gerçekler", "amber"], ["obj.", "Nesne yönelimli", "Mesajlaşan nesneler", "coral"]]
        .map(([g, h, p, c], i) => `<div class="card r rp" data-s="2" style="transition-delay:${i * 0.15}s;text-align:center;padding:30px 24px">
          <div class="mono" style="font-size:64px;font-weight:700;color:var(--${c})">${g}</div><h3 style="margin-top:10px">${h}</h3><p style="font-size:25px">${p}</p></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Bölüm 1.5: Dil kategorileri. Bir paradigma, bir topluluğun bir konuya bakışını belirleyen kavramsal bir çerçevedir. Programlama paradigması da programcının problemlere nasıl çözüm ürettiğini derinden etkiler.",
    "Bazı diller tek bir paradigmayı destekler: Smalltalk ve Eiffel nesne yönelimli, FORTRAN ve Pascal ise imperatiftir. Bazıları da birden çok paradigmayı destekler; örneğin C++ hem imperatif hem de nesne yönelimli kod yazmaya izin verir.",
    "Dört temel paradigma vardır: imperatif, fonksiyonel, mantıksal ve nesne yönelimli. Aynı paradigmadaki diller kavramları paylaştığı için birini öğrenmek diğerini kolaylaştırır. Şimdi ilk üçünü aynı problemle tanıyalım: Öklid'in en büyük ortak bölen algoritması.",
  ],
},
{
  id: "imperative", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> İmperatif paradigma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="tl">İmperatif</span> · komutlar sırayla belleği değiştirir</h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:800px">
        <div class="pills r" data-s="0" style="margin:0 0 6px"><span class="pill t">C</span><span class="pill t">FORTRAN</span><span class="pill t">Pascal</span><span class="pill t">COBOL</span><span class="pill t">Ada</span><span class="pill t">PL/I</span></div>
        <div class="r" data-s="1">${code("obeb.c — Öklid algoritması", ["int gcd(int a, int b) {", { t: "    while (a != b) {", hot: "4" }, { t: "        if (a > b) a = a - b;", hot: "2" }, { t: "        else       b = b - a;", hot: "3" }, "    }", { t: "    return a;", hot: "4" }, "}"], { lang: "c", cls: "sm" })}</div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2" style="font-size:28px;color:var(--muted)">İzleme: <span class="mono hl">gcd(12, 8)</span></div>
        <table class="mono" style="font-size:32px;border-collapse:collapse;width:100%">
          <tr class="r" data-s="2"><td style="padding:12px 22px;color:var(--faint)">adım</td><td style="padding:12px 22px;color:var(--teal)">a</td><td style="padding:12px 22px;color:var(--amber)">b</td><td></td></tr>
          ${traceRow(["0", "12", "8", ""], 2)}
          ${traceRow(["1", "<b class='hl'>4</b>", "8", "<span style='font-size:24px;color:var(--muted)'>a = 12 − 8</span>"], 2, 2)}
          ${traceRow(["2", "4", "<b class='hl'>4</b>", "<span style='font-size:24px;color:var(--muted)'>b = 8 − 4</span>"], 3, 3)}
          ${traceRow(["→", "4", "4", "<span style='font-size:24px;color:var(--teal)'>eşit: return 4</span>"], 4, 4)}
        </table>
        <div class="note r" data-s="4" style="font-size:27px">Her adımda <b>bellekteki değişkenler değişti</b> — imperatif programlamanın özü.</div>
      </div>
    </div>
  </div>`,
  n: [
    "İmperatif paradigmada program, belleği değiştiren komutların sırasıdır. Deyimler birbirleriyle değişkenler aracılığıyla iletişim kurar. C, FORTRAN, Pascal, COBOL ve Ada bu ailedendir.",
    "İşte C'de en büyük ortak bölen. İki sayı eşit olana kadar, büyük olandan küçük olanı çıkarıyoruz.",
    "Fonksiyonu 12 ve 8 ile çağıralım. a, b'den büyük; bu yüzden a, 12 eksi 8, yani 4 olur.",
    "Şimdi b büyük; b, 8 eksi 4, yani 4 olur.",
    "a ile b eşitlendi, döngü biter ve sonuç 4. Dikkat edin: her adımda bellekteki değişkenlerin değeri değişti. İmperatif programlamanın özü budur.",
  ],
},
{
  id: "functional", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> Fonksiyonel paradigma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="vl">Fonksiyonel</span> · fonksiyonları parametrelere uygula</h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:860px">
        <p class="lead r" data-s="0" style="font-size:29px">Atama yok, döngü yok. Fonksiyonlar başka fonksiyonları çağırır ya da onlara <b>parametre</b> olur.</p>
        <div class="r" data-s="1">${code("obeb.scm — Scheme", ["(define gcd2", "  (lambda (a b)", "    (cond ((= a b) a)", "          ((> a b) (gcd2 (- a b) b))", "          (else    (gcd2 (- b a) a)))))"], { lang: "scheme", cls: "sm" })}</div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2" style="font-size:28px;color:var(--muted)">Değerlendirme:</div>
        ${[["(gcd2 12 8)", 2], ["→ (gcd2 4 8)", 2], ["→ (gcd2 4 4)", 2], ["→ 4", 2]].map(([t, s], i) => `<div class="card r rl mono" data-s="${s}" style="padding:18px 28px;font-size:34px;transition-delay:${i * 0.35}s;${i === 3 ? "color:var(--violet);font-weight:700" : ""}">${t}</div>`).join("")}
        <div class="r" data-s="3" style="margin-top:10px">
          <div class="pills"><span class="pill v">LISP · ilk</span><span class="pill v">ML · karma</span><span class="pill v">Haskell · saf</span></div></div>
      </div>
    </div>
  </div>`,
  n: [
    "Fonksiyonel paradigmada hesaplama, fonksiyonları parametrelere uygulayarak yapılır. Değişkene atama ve döngü yoktur; fonksiyonlar başka fonksiyonları çağırır ya da başka fonksiyonlara parametre olur.",
    "Aynı algoritma Scheme dilinde böyle yazılır. Döngü yerine özyineleme var: fonksiyon kendini yeni değerlerle çağırıyor.",
    "gcd2 12 8, gcd2 4 8'i çağırır; o da gcd2 4 4'ü; sonuç yine 4. Bu kez hiçbir değişkenin değeri değişmedi; sadece yeni değerlerle yeni çağrılar yapıldı.",
    "İlk fonksiyonel dil LISP'tir. ML ve Haskell ise modern fonksiyonel dillerdir. ML ve LISP, değişken ve atama gibi imperatif özellikleri de destekler; Haskell ise tamamen saf fonksiyoneldir.",
  ],
},
{
  id: "logic", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> Mantıksal paradigma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="hl">Mantıksal</span> · nasıl değil, <em>ne</em> istendiğini söyle</h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:780px">
        <div class="r" data-s="1">${code("olum.pl — Prolog", [{ t: "insan(ali).", hot: "1" }, { t: "olumlu(X) :- insan(X).", hot: "1" }, "", { t: "?- olumlu(ali).", s: 2 }, { t: "true.", s: 2 }], { lang: "prolog" })}</div>
        <div class="row r" data-s="1" style="gap:20px">
          <div class="card f1" style="padding:20px 26px"><p style="font-size:24px">Gerçek</p><p style="color:var(--text);font-size:28px">Ali insandır.</p></div>
          <div class="card f1" style="padding:20px 26px"><p style="font-size:24px">Kural</p><p style="color:var(--text);font-size:28px">İnsanlar ölümlüdür.</p></div></div>
        <div class="card r" data-s="2" style="padding:20px 26px;border-color:rgba(255,181,71,.5)"><p style="font-size:24px">Hedef (sorgu)</p><p style="color:var(--amber);font-size:30px;font-weight:700">Ali ölümlü mü? → Evet ✓</p></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="3">${code("obeb.pl", ["gcd(A,B,G) :- A = B, G = A.", "gcd(A,B,G) :- A > B, C is A-B,", "              gcd(C,B,G).", "gcd(A,B,G) :- B > A, C is B-A,", "              gcd(C,A,G)."], { lang: "prolog", cls: "xs" })}</div>
        <ul class="b r" data-s="3"><li style="font-size:27px">Kural tabanlı; <b>sıra belirli değil</b></li><li style="font-size:27px">Hangi kuralı ne zaman kullanacağına <b>dil</b> karar verir</li><li style="font-size:27px">Yaygın alan: doğal dil işleme</li></ul>
      </div>
    </div>
  </div>`,
  n: [
    "Mantıksal paradigmada, bir işin nasıl yapılacağını değil, ne istendiğini belirtirsiniz. Program gerçekler ve kurallardan oluşur; kuralların hangi sırayla kullanılacağına dil karar verir.",
    "Örneğin bir gerçek verelim: Ali insandır. Ve bir kural: İnsanlar ölümlüdür.",
    "Şimdi soralım: Ali ölümlü müdür? Prolog gerçeklere ve kurallara bakarak çıkarım yapar ve evet yanıtını verir.",
    "Öklid algoritması Prolog'da üç kural olarak yazılır: A ile B eşitse sonuç A'dır; A büyükse A eksi B ile, B büyükse B eksi A ile devam edilir. En tanınmış mantıksal dil Prolog'dur ve doğal dil işleme gibi alanlarda yaygın olarak kullanılır.",
  ],
},
{
  id: "oop", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> Nesne yönelimli paradigma",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="cl">Nesne yönelimli</span> · mesajlaşan nesneler</h2>
    <div class="row" style="flex:1;gap:50px;align-items:flex-start">
      <div class="col" style="width:760px">
        <div class="r" data-s="0">${code("Ogrenci.java", ["class Ogrenci {", "    String ad;          // veri", "    double ortalama;", "", "    void notEkle(int n) { ... }  // işlem", "}"], { lang: "java", cls: "sm" })}</div>
        <p class="lead r" data-s="0" style="font-size:28px">Nesne = <b>veri</b> + o veri üzerinde çalışan <b>işlemler</b>.</p>
        <div class="row r" data-s="0" style="gap:20px">${[["ali", "Ali", "3.2"], ["ayse", "Ayşe", "3.6"]].map(([v, a, o]) => `<div class="card f1" style="padding:22px 26px;border-color:rgba(255,122,122,.35)"><div class="mono" style="font-size:24px;color:var(--coral)">${v} : Ogrenci</div><div class="mono" style="font-size:22px;color:var(--muted);margin-top:8px">ad = "${a}"<br>ortalama = ${o}</div></div>`).join("")}</div>
        <div class="r mono" data-s="0" style="font-size:26px;color:var(--muted)">ali.<span class="fn">notEkle</span>(90)  <span class="cm">// nesneye mesaj gönder</span></div>
      </div>
      <div class="col f1">
        <div class="grid3 r" data-s="1" style="gap:18px">
          ${["Veri soyutlama", "Kalıtım", "Geç bağlama"].map((t) => `<div class="box" style="height:130px;font-size:30px;border-color:var(--coral)">${t}</div>`).join("")}
        </div>
        <div class="pills r" data-s="1"><span class="pill c">Simula 67</span><span class="pill c">Smalltalk</span><span class="pill c">C++</span><span class="pill c">Java</span><span class="pill c">C#</span></div>
        <div class="note r" data-s="2" style="font-size:27px">İmperatif bir dili nesne desteğiyle genişletmek zor değil: C ve Java'da <b>atama</b> ve <b>kontrol ifadeleri</b> neredeyse aynıdır.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Nesne yönelimli paradigmada program, birbiriyle mesajlaşan nesnelerden oluşur. Bir nesne, verileri ve bu veriler üzerinde çalışan işlemleri bir arada tutar.",
    "Temel kavramları veri soyutlama, kalıtım ve geç bağlamadır. Simula 67, Smalltalk, C++, Java ve C# bu paradigmanın örnekleridir.",
    "Nesne yönelimli yaklaşım imperatif dillerden çok farklı görünse de, imperatif bir dili nesneleri destekleyecek şekilde genişletmek zor değildir. Örneğin C ve Java'da atama ve kontrol ifadeleri neredeyse aynıdır.",
  ],
},
{
  id: "dexter1", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> Örnek: Dexter ve Mimi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dexter, Mimi'ye <em>çiçek</em> göndermek istiyor <span class="emo">💐</span></h2>
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="1" data-dim="2"><h3 class="tl">İmperatif</h3>
        <ol style="margin:10px 0 0;padding-left:34px;font-size:25px;line-height:1.55;color:var(--muted)">
          <li>Para ve çiçek için yer ayır</li><li>Bankadan para çek</li><li>Parayı sakla</li><li>Çiçekçiye parayı ver</li><li>Çiçekleri al, sakla</li><li>Adrese git</li><li>Çiçekleri teslim et</li></ol>
        <p style="margin-top:14px;color:var(--teal)">Her adımı <b>biz</b> sırayla yönetiriz.</p></div>
      <div class="card r" data-s="2" data-dim="3"><h3 class="cl">Nesne yönelimli</h3>
        <svg viewBox="0 0 460 400" style="width:100%;margin-top:6px">
          <defs><marker id="ao" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ff7a7a"/></marker></defs>
          ${[["Dexter", 30, 170], ["Banka memuru", 250, 30], ["Çiçekçi", 250, 170], ["Dağıtımcı", 250, 310]].map(([t, x, y]) => `<rect x="${x}" y="${y}" width="${t === "Dexter" ? 150 : 190}" height="64" rx="14" fill="#1c2241" stroke="#ff7a7a" stroke-width="2"/><text x="${x + (t === "Dexter" ? 75 : 95)}" y="${y + 41}" fill="#eef0fa" font-size="24" text-anchor="middle">${t}</text>`).join("")}
          <path d="M180,190 L245,75" stroke="#ff7a7a" stroke-width="3" marker-end="url(#ao)"/><text x="200" y="118" fill="#a2a9d2" font-size="19" text-anchor="end">paraÇek()</text>
          <path d="M180,202 L245,202" stroke="#ff7a7a" stroke-width="3" marker-end="url(#ao)"/><text x="214" y="160" fill="#a2a9d2" font-size="19" text-anchor="middle">sipariş()</text>
          <path d="M345,234 L345,305" stroke="#ff7a7a" stroke-width="3" marker-end="url(#ao)"/><text x="355" y="276" fill="#a2a9d2" font-size="19">teslimEt()</text>
          <text x="345" y="396" fill="#eef0fa" font-size="24" text-anchor="middle">→ Mimi</text>
        </svg></div>
      <div class="card r" data-s="3"><h3 class="vl">Fonksiyonel</h3>
        <p>Ne gerekli? <b>Nakit → Çiçek → Dağıtım</b></p>
        <div class="mono" style="margin-top:30px;font-size:30px;line-height:1.6"><span class="vl">Dagit</span>(<br>&nbsp;&nbsp;<span class="tl">Satinal</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="hl">Cek</span>()))</div>
        <p style="margin-top:22px">Her fonksiyonun çıktısı, bir sonrakinin <b>girdisi</b>.</p></div>
    </div>
  </div>`,
  n: [
    "Paradigmalar arasındaki farkı eğlenceli bir örnekle pekiştirelim. Dexter, Mimi'ye çiçek göndermek istiyor. Bu problemi farklı paradigmalarla nasıl çözeriz?",
    "İmperatif çözüm, adım adım bir tarif gibidir: para ve çiçek için yer ayır, bankadan parayı çek, sakla, çiçekçiye ver, çiçekleri al, adrese git ve teslim et. Her şeyi sırasıyla biz yönetiyoruz.",
    "Nesne yönelimli çözümde ise işi nesneler arasında paylaştırırız. Dexter banka memuruna para çekme mesajı gönderir, çiçekçiye sipariş verir; çiçekçi de dağıtımcıya teslimat mesajı yollar. Her nesne kendi işini bilir.",
    "Fonksiyonel çözümde neyin yapılacağını ve sırasını fonksiyon bileşimiyle ifade ederiz: önce nakit çek, sonra çiçek satın al, sonra dağıt. Yani Dağıt, Satın al, Çek. Her fonksiyonun çıktısı bir sonrakinin girdisidir.",
  ],
},
{
  id: "dexter2", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> Örnek: mantıksal çözüm",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="hl">Mantıksal</span> çözüm: sadece soruyu sor</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:900px">
        <div class="r" data-s="0">${code("kurallar", ["CicekAlir(x)      :- CicekDagitir(y, x).", "CicekDagitir(y, x):- Cicekci(y), CicekSiparisi(x, y),", "                     Kisi(x).", "CicekSiparisi(x,y):- Cicekci(y), Kisi(x),", "                     ParasiVar(x), ParaVerir(x, y)."], { lang: "plain", cls: "xs" })}</div>
        <div class="r" data-s="1">${code("gerçekler", ["ParasiVar(Dexter).", "Cicekci(Faruk).", "ParaVerir(Dexter, Faruk).", { t: "Kopek(Dexter).   Kopek(Mimi).", s: 3, hot: "3" }], { lang: "plain", cls: "xs" })}</div>
      </div>
      <div class="col f1 center">
        <div class="mono r" data-s="2" style="font-size:44px;color:var(--amber)">?- CicekAlir(Mimi).</div>
        <div class="stack" style="margin-top:30px;place-items:center">
          <div class="r rp big" data-s="2" data-h="3" style="font-size:120px;color:var(--faint)">???</div>
          <div class="r rp" data-s="3" style="text-align:center"><div class="emo" style="font-size:110px">🐕 🐕</div><div class="big" style="font-size:96px;color:var(--coral)">HAYIR</div></div>
        </div>
        <p class="r" data-s="3" style="font-size:28px;color:var(--muted);text-align:center;margin-top:20px">Kisi(Mimi) kanıtlanamıyor:<br>Dexter ve Mimi <b style="color:var(--text)">köpek!</b></p>
      </div>
    </div>
  </div>`,
  n: [
    "Mantıksal çözümde ise kuralları ve gerçekleri yazar, sadece soruyu sorarız. Kurallarımız şöyle: Bir çiçekçi, parası olan ve ödeme yapan bir kişiden sipariş alırsa, o kişiye çiçek dağıtır.",
    "Gerçeklerimiz de şunlar: Dexter'ın parası var. Faruk bir çiçekçi. Dexter, Faruk'a para veriyor.",
    "Şimdi soruyu soralım: Mimi çiçek alır mı? Ama cevap bulunamıyor. Neden? Ne eksik?",
    "Çünkü kişi koşulu sağlanmıyor: Dexter ve Mimi aslında birer köpek! Mantıksal programlamada sistem, yalnızca verdiğiniz gerçeklerden çıkarım yapabilir. Cevap: Hayır.",
  ],
},
{
  id: "other-categories", ch: "1.5 Dil kategorileri", chip: "<b>1.5</b> Diğer kategoriler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Diğer <em>kategoriler</em></h2>
    <div class="grid3" style="flex:1;grid-template-rows:1fr 1fr">
      ${[["🏷️", "t", "İşaretleme", "Programlama değil; web belgesindeki bilgiyi düzenler", ["XHTML", "XML"], 1],
         ["🧬", "v", "Hibrit (işaretleme + programlama)", "İşaretleme diline programlama yetenekleri", ["JSTL", "XSLT"], 1],
         ["🖱️", "a", "Görsel", "Sürükle-bırak ile arayüz; imperatifin alt kategorisi", ["VB.NET"], 2],
         ["📜", "c", "Betik (scripting)", "Aslında imperatif dillerdir", ["Perl", "JavaScript", "Ruby"], 2],
         ["🎯", "g", "Özel amaçlı", "RPG: ticari rapor · APT: tezgâh · GPSS: simülasyon", ["RPG", "APT", "GPSS"], 3]]
        .map(([e, c, h, p, l, s], i) => `<div class="card r rp" data-s="${s}" style="${i === 4 ? "grid-column:span 1;" : ""}transition-delay:${(i % 2) * 0.2}s;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:20px"><div class="ic ${c}" style="margin:0;width:70px;height:70px;font-size:34px">${e}</div><h3 style="margin:0;font-size:32px">${h}</h3></div>
          <p style="margin-top:16px;font-size:26px">${p}</p><div class="pills" style="margin-top:auto;padding-top:14px">${l.map((x) => `<span class="pill ${c === "g" ? "" : c}">${x}</span>`).join("")}</div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Dört temel paradigmanın dışında başka kategoriler de var.",
    "İşaretleme dilleri, XHTML ve XML gibi, kendi başına programlama dili değildir; web belgelerindeki bilgiyi düzenler. Bunlara bazı programlama yetenekleri eklenince hibrit diller ortaya çıkar; örneğin JSTL ve XSLT.",
    "Görsel diller, VB.NET gibi, sürükle bırak mantığıyla grafik arayüz tasarlamayı kolaylaştırır. Betik diller ise Perl, JavaScript ve Ruby gibi dillerdir. Bazıları bunları ayrı kategori sayar, ama ikisi de aslında imperatif dillerin alt kategorileridir.",
    "Son olarak özel amaçlı diller: ticari raporlar için RPG, programlanabilir tezgâhlar için APT ve sistem simülasyonu için GPSS.",
  ],
},
// ───────────────────────── 1.6
{
  id: "tradeoffs", ch: "1.6 Tasarımda verilen ödünler", chip: "<b>1.6</b> Dil tasarımında ödünleşimler",
  html: (() => {
    const scale = (l, r, tilt, lc, rc) => `<svg viewBox="-10 -45 440 220" style="width:100%;height:170px">
      <polygon points="210,150 185,170 235,170" fill="#2a3160"/><rect x="206" y="40" width="8" height="112" fill="#2a3160"/>
      <g style="transform-origin:210px 40px;transform:rotate(${tilt}deg)"><rect x="30" y="34" width="360" height="10" rx="5" fill="#a2a9d2"/>
        <rect x="10" y="-2" width="150" height="38" rx="10" fill="var(--${lc})" opacity=".9"/><text x="85" y="25" font-size="21" text-anchor="middle" fill="#0c0f1e" font-weight="700">${l}</text>
        <rect x="260" y="-2" width="150" height="38" rx="10" fill="var(--${rc})" opacity=".9"/><text x="335" y="25" font-size="21" text-anchor="middle" fill="#0c0f1e" font-weight="700">${r}</text></g></svg>`;
    return `
  <div class="wrap">
    <div class="quote r" data-s="0" data-h="1" style="position:absolute;top:120px;font-size:46px;max-width:1500px">Bir dil tasarlanırken birçok önemli kriter vardır, ama bunlar birbiriyle çelişir. İyi bir dil tasarlamak çok zor bir mühendislik görevidir.<small>— C. A. R. Hoare, 1973</small></div>
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="1" style="display:flex;flex-direction:column">${scale("Güvenilirlik", "Hız", 8, "violet", "coral")}
        <h3 style="font-size:30px;margin-top:6px">Güvenilirlik ↔ yürütme maliyeti</h3>
        ${code("dizi sınırı", ["a[7] = 1;   // a: 5 eleman", { t: "Java → istisna fırlatır ✓", lang: "plain" }, { t: "C    → belleği bozar ✕", lang: "plain" }], { lang: "c", cls: "xs" })}
        <p style="margin-top:14px;font-size:24px">Java güvenlik için <b>hızdan</b> ödün verdi.</p></div>
      <div class="card r" data-s="2" style="display:flex;flex-direction:column">${scale("Yazılabilirlik", "Okunabilirlik", 8, "amber", "teal")}
        <h3 style="font-size:30px;margin-top:6px">Yazılabilirlik ↔ okunabilirlik</h3>
        <div class="mono" style="font-size:40px;background:var(--code);border-radius:14px;padding:20px;text-align:center;margin-top:6px">(~R∊R∘.×R)/R←1↓⍳R</div>
        <p style="margin-top:12px;font-size:24px">APL: R'ye kadar asal sayılar — tek satır!</p>
        <p style="margin-top:10px;font-size:23px;font-style:italic">“4 satırlık APL programını anlamak 4 saatimi aldı.” — D. McCracken</p></div>
      <div class="card r" data-s="3" style="display:flex;flex-direction:column">${scale("Esneklik", "Güvenilirlik", -8, "amber", "violet")}
        <h3 style="font-size:30px;margin-top:6px">Yazılabilirlik ↔ güvenilirlik</h3>
        <p style="font-size:26px">C++ işaretçileri güçlü ve esnek, ama güvenilir değil.</p>
        <div style="display:flex;align-items:center;gap:16px;margin-top:22px"><span class="pill a" style="white-space:nowrap">C++: işaretçi ✓</span><span class="arrow">→</span><span class="pill v" style="white-space:nowrap">Java: yok</span></div></div>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 1.6: Dil tasarımında verilen ödünler. Hoare'un 1973'teki sözü durumu çok iyi özetliyor: Bir dil tasarlanırken birçok önemli kriter vardır, ama bunlar birbiriyle çelişir. İyi bir dil tasarlamak çok zor bir mühendislik görevidir.",
    "Birinci çatışma: güvenilirlik ve yürütme maliyeti. Java, her dizi erişiminde indisin geçerli aralıkta olup olmadığını kontrol eder. Bu güvenilirliği artırır ama yürütmeyi yavaşlatır. C bu kontrolü yapmaz; daha hızlıdır ama taşma hatalarına açıktır. Java tasarımcıları güvenlik için hızdan ödün verdi.",
    "İkinci çatışma: yazılabilirlik ve okunabilirlik. APL, çok güçlü operatörler ve birçok özel sembol sunar; karmaşık hesaplamalar tek satırda yazılır. Ekrandaki satır, R'ye kadar olan asal sayıları bulur. Daniel McCracken, dört satırlık bir APL programını anlamak için dört saat uğraştığını söylemiştir.",
    "Üçüncü çatışma: yazılabilirlik ve güvenilirlik. C++'taki işaretçiler çok güçlü ve esnektir, ama güvenilir değildir. Java bu yüzden işaretçileri dilden çıkarmıştır.",
  ],
},
// ───────────────────────── 1.7
{
  id: "layers", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> İmplementasyon yöntemleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bilgisayarın <em>katmanlı</em> görünümü</h2>
    <div class="row" style="flex:1;gap:50px">
      <div class="col" style="width:600px">
        <div class="card r" data-s="0"><h3>İki temel bileşen</h3><p><b>Bellek:</b> program ve veriyi saklar.</p><p><b>İşlemci:</b> makro komutları yürütür (her biri mikro komutlardan oluşur).</p><p style="margin-top:14px;color:var(--amber)">İşlemcinin anladığı tek dil: makine dili.</p></div>
        <div class="col r" data-s="2" style="gap:16px">
          ${[["Derleme", "makine diline çevir", "teal"], ["Saf yorumlama", "çevirmeden yorumla", "coral"], ["Hibrit", "ara dile çevir + yorumla", "violet"]].map(([a, b, c]) => `<div style="display:flex;align-items:center;gap:18px"><span class="pill ${c[0]}" style="font-size:27px;width:240px;text-align:center">${a}</span><span style="font-size:27px;color:var(--muted)">${b}</span></div>`).join("")}
        </div>
      </div>
      <div class="f1 r" data-s="1" style="display:flex;flex-direction:column;gap:12px;justify-content:center">
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px">
          ${["Sanal C bilgisayarı", "Sanal C++ bilgisayarı", "Sanal Ada bilgisayarı", "Sanal LISP bilgisayarı", "Sanal assembly bilgisayarı"].map((t) => `<div class="box" style="height:94px;font-size:20px;background:transparent;border-style:dashed;color:var(--muted)">${t}</div>`).join("")}
          ${["C derleyicisi", "C++ derleyicisi", "Ada derleyicisi", "LISP yorumlayıcısı", "Assembler"].map((t, i) => `<div class="box" style="height:100px;font-size:22px;border-color:var(--${i === 3 ? "coral" : "teal"})">${t}</div>`).join("")}
        </div>
        <div class="box" style="height:84px;font-size:28px;border-color:var(--violet)">İşletim sistemi <span style="color:var(--faint);font-size:22px;margin-left:12px">+ komut yorumlayıcısı (kabuk)</span></div>
        <div class="box" style="height:84px;font-size:28px;border-color:var(--amber)">Makro komut yorumlayıcısı</div>
        <div class="box" style="height:84px;font-size:28px;background:#0a0c18">Çıplak makine</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 1.7: İmplementasyon yöntemleri. Bir bilgisayarın iki temel bileşeni vardır: verileri ve programları saklayan bellek ve komutları yürüten işlemci. İşlemcinin anladığı tek dil makine dilidir.",
    "Bu yüzden bilgisayarı katmanlar halinde düşünebiliriz. En altta çıplak makine, üstünde makro komut yorumlayıcısı ve işletim sistemi, en üstte de derleyiciler ve yorumlayıcılar. Her katman kullanıcıya bir sanal bilgisayar sunar: Örneğin C derleyicisi yüklü bir makine, sanki doğrudan C çalıştıran bir sanal C bilgisayarıdır.",
    "Yüksek seviyeli bir dili çalıştırmanın üç temel yolu vardır: derleme, saf yorumlama ve ikisinin arasındaki hibrit sistemler.",
  ],
},
{
  id: "compiler-phases", ch: "1.7 İmplementasyon yöntemleri", chip: "<b>1.7</b> Derleme süreci",
  html: (() => {
    const ph = [["Sözcüksel analiz", "karakterler → token'lar", 1], ["Sözdizim analizi", "token'lar → ayrıştırma ağacı", 2], ["Anlamsal analiz + ara kod", "anlam hataları, ara kod", 3], ["Optimizasyon", "isteğe bağlı", 4], ["Kod üreteci", "ara kod → makine dili", 5]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="tl">Derleme</span> · yavaş çeviri, hızlı yürütme</h2>
    <div style="display:flex;align-items:center;gap:10px;margin-top:50px">
      <div class="box r" data-s="0" style="width:170px;height:210px;font-size:26px;background:#0a0c18">Kaynak program</div>
      ${ph.map(([a, b, s]) => `<span class="arrow r" data-s="${s}">→</span><div class="box r" data-s="${s}" data-hot="${s}" style="flex:1;height:210px;gap:12px;font-size:27px;border-color:var(--teal)">${a}<span style="font-size:21px;color:var(--muted);font-weight:400">${b}</span></div>`).join("")}
      <span class="arrow r" data-s="5">→</span>
      <div class="box r" data-s="5" style="width:170px;height:210px;font-size:26px;background:#0a0c18;border-color:var(--amber);color:var(--amber)">Makine dili</div>
    </div>
    <div class="r" data-s="6" style="display:flex;gap:24px;margin:40px 190px 0">
      <div class="box f1" data-hot="6" style="height:100px;font-size:30px;border-color:var(--violet)">📒 Sembol tablosu — tüm aşamalara hizmet eder</div>
      <div class="box" style="width:380px;height:100px;font-size:30px;border-color:var(--coral)">⚠️ Hata yöneticisi</div>
    </div>
    <div class="r" data-s="0" style="margin-top:auto;margin-bottom:20px;display:flex;align-items:center;gap:26px;justify-content:center;font-size:30px">
      <span class="pill">Kaynak kod</span><span class="arrow">→</span><span class="pill t">Derleyici</span><span class="arrow">→</span><span class="pill a">Makine kodu</span><span style="font-size:30px;color:var(--faint)">+ girdi</span><span class="arrow">→</span><span class="pill">Çıktı</span>
    </div>
  </div>`;
  })(),
  n: [
    "İlk yöntem derleme. Derleyici programı doğrudan makine diline çevirir. Çeviri yavaştır, ama ortaya çıkan program çok hızlı çalışır. Derleme birkaç aşamadan oluşur.",
    "Sözcüksel analizci, kaynak koddaki karakterleri sözcük birimlerine, yani token'lara ayırır: tanıtıcılar, özel kelimeler, operatörler ve noktalama işaretleri.",
    "Sözdizim analizcisi bu token'lardan, programın sözdizimsel yapısını gösteren ayrıştırma ağaçları kurar.",
    "Anlamsal analizci ve ara kod üreteci, tip hataları gibi anlam hatalarını yakalar ve makineden bağımsız bir ara kod üretir.",
    "İsteğe bağlı optimizasyon aşaması, programı küçültür ya da hızlandırır.",
    "Kod üreteci ise ara kodu hedef makinenin diline çevirir.",
    "Bu sırada sembol tablosu, programdaki bütün isimlerin tip ve özellik bilgilerini tutarak tüm aşamalara hizmet eder. Hata yöneticisi de paralel olarak çalışır. Altı ana aşama ve bu iki yardımcıyla, toplam sekiz bileşenden söz ederiz.",
  ],
},
];
