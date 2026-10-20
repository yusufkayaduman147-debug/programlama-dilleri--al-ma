const { code } = require("../build/lib");
const { nt, tree, grammar, trace } = require("./h");

// character-by-character lexer animation for "sum1 = 47;"
const chars = ["s", "u", "m", "1", " ", "=", " ", "4", "7", ";"];
function lexAnim() {
  const cell = (c, i) => `<div style="width:64px;height:76px;border-radius:12px;background:var(--panel2);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-family:JBM;font-size:40px;position:relative">${c === " " ? "␣" : c}</div>`;
  // pointer position per step: step1 → idx0..3 (letters), step2 → '=', step3 → digits, step4 → ';'
  const ptr = [[1, 4], [2, 5], [3, 9], [4, 10]];
  return `
  <div style="display:flex;gap:10px;position:relative;margin:10px 0 20px">${chars.map(cell).join("")}
    ${ptr.map(([s, i], k) => `<div class="r rf" data-s="${s}" data-h="${s + 1}" style="position:absolute;left:${i * 74 + 18}px;top:84px;font-size:34px;color:var(--amber)">▲</div>`).join("")}
  </div>`;
}

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:18px;margin-bottom:56px;align-items:center;font-family:JBM;font-size:32px">
      <span class="pill" style="font-size:32px">s u m = 4 7 ;</span><span style="color:var(--faint)">→</span>
      <span class="pill t" style="font-size:30px">ID</span><span class="pill a" style="font-size:30px">ASSIGN</span><span class="pill v" style="font-size:30px">INT</span><span class="pill c" style="font-size:30px">SEMI</span>
      <span style="color:var(--faint)">→</span><span class="pill" style="font-size:32px">🌳</span>
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:116px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 4: Sözcüksel ve<br>Sentaks Analiz</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin dördüncü bölümüne hoş geldiniz.",
    "Önceki bölümde bir dilin sentaksının gramerlerle nasıl tanımlandığını gördük. Bu bölümde bir derleyicinin bu gramerleri kullanarak kaynak kodu nasıl okuduğunu öğreneceğiz: önce karakterleri token'lara ayıran sözcüksel analizi, sonra token'lardan ayrıştırma ağacı kuran sentaks analizini.",
  ],
},
{
  id: "roadmap", ch: "Giriş", chip: "Yol haritası",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bu bölümde <em>neler var?</em></h2>
    <div class="col" style="gap:22px;margin-top:10px">
      ${["Giriş: sentaks analizinin iki parçası", "Sözcüksel analiz (lexical analysis)", "Ayrıştırma (parsing) problemi", "Özyinelemeli iniş ayrıştırma ve LL(1)", "Aşağıdan yukarıya ayrıştırma: shift-reduce ve LR"]
        .map((t, i) => `<div class="r rl" data-s="${i < 3 ? 1 : 2}" style="display:flex;align-items:center;gap:28px;transition-delay:${(i % 3) * 0.15}s">
          <span class="mono" style="font-size:34px;font-weight:700;color:var(--amber);background:rgba(255,181,71,.12);border-radius:16px;width:96px;height:72px;display:flex;align-items:center;justify-content:center">4.${i + 1}</span>
          <span style="font-size:38px;font-weight:600">${t}</span></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Yol haritamız şöyle.",
    "Önce sentaks analizinin neden iki parçaya ayrıldığını göreceğiz. Sonra sözcüksel analizi, ardından ayrıştırma probleminin kendisini inceleyeceğiz.",
    "Son olarak iki büyük ayrıştırma ailesini göreceğiz: yukarıdan aşağıya çalışan özyinelemeli iniş ve LL(1) ayrıştırıcıları, ve aşağıdan yukarıya çalışan shift-reduce ve LR ayrıştırıcıları.",
  ],
},
// ───────── 4.1
{
  id: "two-parts", ch: "4.1 Giriş", chip: "<b>4.1</b> Sentaks analizinin iki parçası",
  html: `
  <div class="wrap">
    <div class="r" data-s="0" style="display:flex;align-items:center;gap:18px;margin-bottom:34px">
      <div class="box" style="width:230px;height:120px">Kaynak kod<span style="font-size:20px;color:var(--muted);font-weight:400">karakterler</span></div><span class="arrow">→</span>
      <div class="box" data-hot="1" style="flex:1;height:120px;border-color:var(--teal)">Sözcüksel analizci<span style="font-size:20px;color:var(--muted);font-weight:400">sonlu otomat · düzenli gramer</span></div><span class="arrow">→ token'lar →</span>
      <div class="box" data-hot="2" style="flex:1;height:120px;border-color:var(--violet)">Sentaks analizci (parser)<span style="font-size:20px;color:var(--muted);font-weight:400">aşağı itmeli otomat · BNF</span></div><span class="arrow">→</span>
      <div class="box" style="width:200px;height:120px">🌳 Ayrıştırma ağacı</div>
    </div>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card r" data-s="3"><h3>Neden BNF?</h3><ul class="b" style="margin-top:8px"><li style="font-size:27px">Net ve özlü sentaks tanımı</li><li style="font-size:27px">Ayrıştırıcı <b>doğrudan</b> BNF'e dayanabilir</li><li style="font-size:27px">BNF'e dayalı ayrıştırıcının bakımı kolay</li></ul></div>
      <div class="card r" data-s="4"><h3>Neden iki ayrı parça?</h3><ul class="b t" style="margin-top:8px"><li style="font-size:27px"><b>Basitlik:</b> sözcüksel analiz daha basit yöntemlerle yapılır; parser sadeleşir</li><li style="font-size:27px"><b>Verimlilik:</b> asıl zaman sözcüksel analizde geçer → onu optimize etmek yeter</li><li style="font-size:27px"><b>Taşınabilirlik:</b> sözcüksel analizci platforma bağlı olabilir; parser taşınabilir</li></ul></div>
    </div>
  </div>`,
  n: [
    "Bölüm 4.1: Giriş. İster derleyici, ister yorumlayıcı, ister hibrit olsun, her dil gerçekleştirimi kaynak kodu analiz etmek zorundadır. Bir dil işlemcisinin sentaks analizi bölümü genellikle iki parçadan oluşur.",
    "Düşük seviyeli parça sözcüksel analizcidir. Matematiksel olarak, düzenli bir gramere dayanan bir sonlu otomattır. Karakterleri okuyup token'lara ayırır.",
    "Yüksek seviyeli parça ise sentaks analizci, yani ayrıştırıcıdır. Matematiksel olarak, içerikten bağımsız bir gramere, yani BNF'e dayanan bir aşağı itmeli otomattır. Token'lardan ayrıştırma ağacı kurar.",
    "Sentaksı BNF ile tanımlamanın üç avantajı var: tanım net ve özlüdür, ayrıştırıcı doğrudan BNF'ten üretilebilir ve böyle ayrıştırıcıların bakımı kolaydır.",
    "Peki neden iki ayrı parça? Üç neden var. Basitlik: sözcüksel analiz için daha basit yöntemler yeterlidir ve onu ayırmak ayrıştırıcıyı sadeleştirir. Verimlilik: derleme zamanının büyük kısmı sözcüksel analizde geçer, bu yüzden yalnızca onu optimize etmek yeterlidir. Taşınabilirlik: sözcüksel analizci dosya okuma gibi platforma bağlı işler yapabilir, ama ayrıştırıcı her zaman taşınabilir kalır.",
  ],
},
// ───────── 4.2 Lexical analysis
{
  id: "lexer-role", ch: "4.2 Sözcüksel analiz", chip: "<b>4.2</b> Sözcüksel analizci",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Sözcüksel analizci: bir <em>desen eşleştirici</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <ul class="b t r" data-s="0"><li>Ayrıştırıcının <b>ön ucu</b> (front-end)</li><li>Birbirine ait alt dizileri, yani <b>lexeme</b>'leri bulur</li><li>Her lexeme'i bir <b>token</b> kategorisiyle eşler: <span class="mono hl">sum</span> → <span class="mono tl">IDENT</span></li></ul>
        <div class="card r" data-s="2" style="margin-top:20px"><h3 style="font-size:30px">Üç yapım yolu</h3><ol style="margin:8px 0 0;padding-left:30px;font-size:25px;line-height:1.6;color:var(--muted)"><li>Token'ları biçimsel tanımla, bir <b>araç</b> (lex, flex) tablo üretsin</li><li class="hl" style="color:var(--amber)">Durum diyagramı tasarla, onu uygulayan <b>programı yaz</b> ← bizim yolumuz</li><li>Durum diyagramını elle tabloya dök</li></ol></div>
      </div>
      <div class="col f1 r" data-s="1" style="align-items:center;justify-content:center;gap:16px">
        <div class="box" style="width:380px;height:120px;border-color:var(--violet)">Ayrıştırıcı</div>
        <div style="display:flex;gap:80px;font-size:26px;color:var(--muted)"><span>↓ lex()</span><span>↑ sonraki token</span></div>
        <div class="box" style="width:380px;height:120px;border-color:var(--teal)">Sözcüksel analizci</div>
        <div style="font-size:26px;color:var(--muted)">↑ karakterler</div>
        <div class="box" style="width:380px;height:90px">Kaynak dosya</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 4.2: Sözcüksel analiz. Sözcüksel analizci, karakter dizileri için bir desen eşleştiricidir. Ayrıştırıcının ön ucudur: kaynak programda birbirine ait alt dizileri, yani lexeme'leri bulur ve her birini bir token kategorisiyle eşler. Örneğin sum bir lexeme'dir ve token'ı IDENT, yani tanıtıcı olabilir.",
    "Sözcüksel analizci genellikle bir fonksiyondur: ayrıştırıcı bir sonraki token'a ihtiyaç duyduğunda lex fonksiyonunu çağırır, lex de kaynak dosyadan gerektiği kadar karakter okuyup bir token döndürür.",
    "Sözcüksel analizci yapmanın üç yolu vardır: token'ları biçimsel olarak tanımlayıp lex ya da flex gibi bir aracın tablo üretmesini sağlamak; bir durum diyagramı tasarlayıp onu uygulayan programı elle yazmak; ya da durum diyagramını elle bir tabloya dökmek. Biz ikinci yolu inceleyeceğiz.",
  ],
},
{
  id: "state-diagram", ch: "4.2 Sözcüksel analiz", chip: "<b>4.2</b> Durum diyagramı",
  html: (() => {
    const C = (cx, cy, r, label, col, s, dbl) => `<g class="r rp" data-s="${s}" style="transform-box:fill-box;transform-origin:center"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#151a31" stroke="var(--${col})" stroke-width="3"/>${dbl ? `<circle cx="${cx}" cy="${cy}" r="${r - 8}" fill="none" stroke="var(--${col})" stroke-width="2"/>` : ""}<text x="${cx}" y="${cy + 10}" fill="#eef0fa" font-size="28" text-anchor="middle">${label}</text></g>`;
    const A = (d, s, lab, lx, ly) => `<g class="r rf" data-s="${s}"><path d="${d}" stroke="#a2a9d2" stroke-width="3" fill="none" marker-end="url(#sd)"/>${lab ? `<text x="${lx}" y="${ly}" fill="#ffb547" font-size="24" text-anchor="middle" font-family="JBM">${lab}</text>` : ""}</g>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">İsimleri, sayıları ve operatörleri tanıyan <em>durum diyagramı</em></h2>
    <div class="row" style="flex:1;gap:30px">
      <svg viewBox="0 0 1100 640" style="flex:1;height:640px">
        <defs><marker id="sd" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a2a9d2"/></marker></defs>
        ${C(150, 320, 70, "Başla", "amber", 0)}
        ${A("M220,290 C320,190 420,140 520,140", 1, "Harf", 360, 175)}${C(600, 140, 75, "id", "teal", 1)}
        ${A("M570,72 C540,0 660,0 630,72", 1, "Harf / Rakam", 600, 20)}
        ${A("M675,140 L860,140", 1, "", 0, 0)}${C(940, 140, 75, "return", "teal", 1, true)}<text class="r" data-s="1" x="940" y="250" fill="#a2a9d2" font-size="24" text-anchor="middle" font-family="JBM">lookup(lexeme)</text>
        ${A("M220,350 C320,450 420,500 520,500", 2, "Rakam", 360, 470)}${C(600, 500, 75, "int", "violet", 2)}
        ${A("M570,575 C540,640 660,640 630,575", 2, "Rakam", 600, 636)}
        ${A("M675,500 L860,500", 2, "", 0, 0)}${C(940, 500, 75, "return", "violet", 2, true)}<text class="r" data-s="2" x="940" y="610" fill="#a2a9d2" font-size="24" text-anchor="middle" font-family="JBM">INT_LIT</text>
        ${A("M220,320 L860,320", 3, "( ) + - * /", 520, 305)}${C(940, 320, 75, "return", "coral", 3, true)}<text class="r" data-s="3" x="940" y="420" fill="#a2a9d2" font-size="22" text-anchor="middle" font-family="JBM">LEFT_PAREN, ADD_OP…</text>
      </svg>
      <div class="col" style="width:520px">
        <div class="card r" data-s="4" style="padding:22px 26px"><h3 style="font-size:28px">Karakter sınıfları</h3><p style="font-size:24px">Her harf için ayrı ok yerine tek bir <b class="tl">LETTER</b>, her rakam için tek bir <b class="vl">DIGIT</b> sınıfı → diyagram küçülür.</p></div>
        <div class="card r" data-s="5" style="padding:22px 26px"><h3 style="font-size:28px">Ayrılmış kelimeler</h3><p style="font-size:24px"><span class="mono">while</span>, <span class="mono">if</span>… ayrı ayrı tanınmaz; önce isim gibi okunur, sonra <b>tabloya bakılır</b> (lookup).</p></div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Sözcüksel analizciyi tasarlamak için bir durum diyagramı çizeriz. Saf bir yaklaşımla, her durumdan her karakter için ayrı bir geçiş olurdu; böyle bir diyagram devasa olurdu. Bunun yerine geçişleri birleştiririz. Başlangıç durumundan üç yol çıkıyor.",
    "Birinci yol: ilk karakter bir harfse tanıtıcı durumuna geçeriz. Harf ya da rakam geldiği sürece aynı durumda kalırız. Başka bir karakter gelince dururuz ve biriken lexeme için tabloya bakıp token'ı döndürürüz.",
    "İkinci yol: ilk karakter bir rakamsa tam sayı durumuna geçeriz. Rakam geldikçe devam ederiz; bitince INT_LIT token'ını döndürürüz.",
    "Üçüncü yol: parantezler ve aritmetik operatörler tek karakterdir; hemen ilgili token döndürülür.",
    "Bu diyagramı küçük tutan fikir karakter sınıflarıdır. Bir tanıtıcıyı tanırken bütün harfler aynı işi görür; bu yüzden tek bir LETTER sınıfı kullanılır. Rakamlar için de tek bir DIGIT sınıfı.",
    "Ayrılmış kelimeler de ayrı ayrı tanınmaz. while ya da if gibi kelimeler önce sıradan bir isim gibi okunur, sonra bir tabloya bakılarak ayrılmış kelime olup olmadıklarına karar verilir.",
  ],
},
{
  id: "lex-trace", ch: "4.2 Sözcüksel analiz", chip: "<b>4.2</b> lex() adım adım",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">lex() adım adım: <span class="mono hl">sum1 = 47;</span></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px">
        ${lexAnim()}
        <div class="card r" data-s="0" style="padding:20px 26px"><h3 style="font-size:28px">Yardımcı alt programlar</h3><p style="font-size:24px"><b class="mono">getChar</b>: sonraki karakteri <span class="mono">nextChar</span>'a alır, sınıfını <span class="mono">charClass</span>'a yazar<br><b class="mono">addChar</b>: karakteri <span class="mono">lexeme</span> dizisine ekler<br><b class="mono">lookup</b>: lexeme ayrılmış kelime mi? token kodunu döndürür</p></div>
      </div>
      <div class="f1">${trace([{ h: "lexeme", color: "amber" }, { h: "token", color: "teal" }], [[["sum1", "IDENT"], 1], [["=", "ASSIGN_OP"], 2], [["47", "INT_LIT"], 3], [[";", "SEMICOLON"], 4]], { fs: 32 })}
        <p class="r" data-s="4" style="font-size:25px;color:var(--muted);margin-top:20px">Boşluklar atlandı; anlamı yok.</p></div>
    </div>
  </div>`,
  n: [
    "Şimdi lex fonksiyonunu sum1 eşittir 47 noktalı virgül girdisi üzerinde çalıştıralım. Üç yardımcı alt programımız var: getChar sonraki karakteri alıp sınıfını belirler, addChar karakteri biriken lexeme'e ekler, lookup ise lexeme'in ayrılmış kelime olup olmadığına bakar.",
    "İlk karakter s, bir harf. Tanıtıcı durumuna geçiyoruz. u, m ve 1 de harf ya da rakam olduğu için ekleniyor. Boşluğa gelince duruyoruz: lexeme sum1, lookup ayrılmış kelime olmadığını söylüyor; token IDENT.",
    "Boşluk atlanıyor. Sonraki karakter eşittir; tek karakterlik bir operatör, token ASSIGN_OP.",
    "Sonra 4, bir rakam; tam sayı durumuna geçiyoruz, 7 de ekleniyor. Noktalı virgülde duruyoruz: lexeme 47, token INT_LIT.",
    "Son olarak noktalı virgül, token SEMICOLON. Dört token ürettik; aradaki boşlukların hiçbir anlamı yoktu.",
  ],
},
{
  id: "lex-code", ch: "4.2 Sözcüksel analiz", chip: "<b>4.2</b> lex() kodu",
  html: `
  <div class="wrap">
    <div class="row" style="flex:1;gap:40px">
      <div class="f1 r" data-s="0">${code("lex.c", ["int lex() {", "  getChar();", "  switch (charClass) {", { t: "    case LETTER:", hot: "1" }, { t: "      addChar(); getChar();", hot: "1" }, { t: "      while (charClass == LETTER ||", hot: "1" }, { t: "             charClass == DIGIT) {", hot: "1" }, { t: "        addChar(); getChar();", hot: "1" }, "      }", { t: "      return lookup(lexeme);", hot: "1" }, { t: "    case DIGIT:", hot: "2" }, { t: "      addChar(); getChar();", hot: "2" }, { t: "      while (charClass == DIGIT) {", hot: "2" }, { t: "        addChar(); getChar();", hot: "2" }, "      }", { t: "      return INT_LIT;", hot: "2" }, "  }", "}"], { lang: "c", cls: "xs" })}</div>
      <div class="col" style="width:600px;justify-content:center">
        <p class="lead r" data-s="0" style="font-size:28px">Durum diyagramının <b>birebir</b> koda dökülmüş hali.</p>
        <div class="note r" data-s="1" style="font-size:26px"><b>LETTER</b> kolu → diyagramdaki tanıtıcı durumu ve döngüsü</div>
        <div class="note r" data-s="2" style="font-size:26px;background:rgba(164,147,255,.08);border-color:rgba(164,147,255,.3)"><b style="color:var(--violet)">DIGIT</b> kolu → tam sayı durumu ve döngüsü</div>
        <div class="card r" data-s="3" style="padding:20px 26px"><p style="font-size:24px">Boşluk farkı yok: Pascal'da <span class="mono">while i &lt;&gt; j do</span> ile <span class="mono">while   i&lt;&gt;j   do</span> aynı token'ları üretir.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "İşte lex fonksiyonunun C kodu. Gördüğünüz gibi durum diyagramının neredeyse birebir koda dökülmüş halidir. Önce bir karakter okunur ve sınıfına göre dallanılır.",
    "LETTER kolu, diyagramdaki tanıtıcı durumudur: karakteri ekle, sonrakini oku; harf ya da rakam geldiği sürece devam et; bitince lookup ile token'ı döndür.",
    "DIGIT kolu da tam sayı durumudur: rakam geldiği sürece ekle, bitince INT_LIT döndür.",
    "Sözcüksel analiz sayesinde ayrıştırıcının boşluklarla hiç uğraşması gerekmez. Bir Pascal programında while i farklıdır j do yazmak ile araya istediğiniz kadar boşluk koymak aynı token dizisini üretir.",
  ],
},
// ───────── 4.3 Parsing problem
{
  id: "parsing-problem", ch: "4.3 Ayrıştırma problemi", chip: "<b>4.3</b> Ayrıştırma problemi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Ayrıştırıcının <em>iki görevi</em></h2>
    <div class="grid2" style="gap:30px;margin-bottom:30px">
      <div class="card r" data-s="0"><div class="ic c">🐞</div><h3>Hataları bul</h3><p>Bütün sentaks hatalarını bulur, her biri için <b>anlaşılır bir mesaj</b> üretir ve mümkünse toparlanıp devam eder.</p></div>
      <div class="card r" data-s="0" style="transition-delay:.2s"><div class="ic t">🌳</div><h3>Ağacı üret</h3><p>Programın ayrıştırma ağacını ya da en azından ağacın <b>izini</b> üretir.</p></div>
    </div>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card tint-v r" data-s="1"><h3 class="vl">⬇ Yukarıdan aşağıya</h3><p>Ağacı <b>kökten</b> başlayarak kurar (önce-kök sırası). <b>Sola dayalı</b> türetmeyi izler.</p><div class="pills"><span class="pill v">özyinelemeli iniş</span><span class="pill v">LL</span></div></div>
      <div class="card tint-a r" data-s="2"><h3 class="hl">⬆ Aşağıdan yukarıya</h3><p>Ağacı <b>yapraklardan</b> başlayarak kurar. <b>Sağa dayalı</b> türetmeyi tersten izler.</p><div class="pills"><span class="pill a">shift-reduce</span><span class="pill a">LR</span></div></div>
    </div>
    <p class="r" data-s="3" style="font-size:27px;color:var(--muted);margin-top:20px">İkisi de girdide genellikle sadece <b style="color:var(--text)">bir token ileriye</b> bakar (lookahead).</p>
  </div>`,
  n: [
    "Bölüm 4.3: Ayrıştırma problemi. Ayrıştırıcının iki görevi vardır: programdaki bütün sentaks hatalarını bulup her biri için anlaşılır bir mesaj üretmek ve mümkünse toparlanıp devam etmek; ve programın ayrıştırma ağacını, ya da en azından bu ağacın izini üretmek.",
    "Ayrıştırıcılar iki kategoriye ayrılır. Yukarıdan aşağıya ayrıştırıcılar ağacı kökten başlayarak kurar ve sola dayalı türetmeyi izler. Özyinelemeli iniş ve LL ayrıştırıcıları bu ailedendir.",
    "Aşağıdan yukarıya ayrıştırıcılar ise ağacı yapraklardan başlayarak kurar ve sağa dayalı türetmeyi tersten izler. Shift-reduce ve LR ayrıştırıcıları bu ailedendir.",
    "İki ailede de ayrıştırıcı kararını verirken girdide genellikle yalnızca bir token ileriye bakar. Buna lookahead, yani ileri bakış denir.",
  ],
},
{
  id: "td-vs-bu", ch: "4.3 Ayrıştırma problemi", chip: "<b>4.3</b> Aynı ağaç, iki yön",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><span class="mono">id + id * id</span>: <em>aynı ağaç, farklı sıra</em></h2>
    <div class="grid2" style="flex:1;gap:30px">
      <div class="card tint-v r" data-s="1" style="display:flex;flex-direction:column;padding:20px 26px"><h3 class="vl" style="font-size:30px">⬇ Yukarıdan aşağıya (sola dayalı)</h3>
        <div class="f1">${tree({ t: "E", s: 1, c: [{ t: "E", s: 2, c: [{ t: "id", s: 2 }] }, { t: "+", s: 1 }, { t: "E", s: 3, c: [{ t: "E", s: 3, c: [{ t: "id", s: 3 }] }, { t: "*", s: 3 }, { t: "E", s: 3, c: [{ t: "id", s: 3 }] }] }] }, { dx: 110, dy: 96, fs: 28, maxH: 420 })}</div>
        <div class="mono" style="font-size:20px;color:var(--muted)">E ⇒ E+E ⇒ id+E ⇒ id+E*E ⇒ id+id*E ⇒ id+id*id</div></div>
      <div class="card tint-a r" data-s="4" style="display:flex;flex-direction:column;padding:20px 26px"><h3 class="hl" style="font-size:30px">⬆ Aşağıdan yukarıya (sağa dayalının tersi)</h3>
        <div class="f1">${tree({ t: "E", s: 6, c: [{ t: "E", s: 6, c: [{ t: "id", s: 4 }] }, { t: "+", s: 4 }, { t: "E", s: 5, c: [{ t: "E", s: 5, c: [{ t: "id", s: 4 }] }, { t: "*", s: 4 }, { t: "E", s: 5, c: [{ t: "id", s: 4 }] }] }] }, { dx: 110, dy: 96, fs: 28, maxH: 420 })}</div>
        <div class="mono" style="font-size:20px;color:var(--muted)">id+id*id ⇐ E+id*id ⇐ E+E*id ⇐ E+E*E ⇐ E+E ⇐ E</div></div>
    </div>
    <p class="r" data-s="7" style="font-size:27px;color:var(--muted);margin-top:16px">Ortaya çıkan ağaç <b style="color:var(--text)">aynı</b>; değişen sadece düğümlerin <b style="color:var(--text)">eklenme sırası</b>. Genel ayrıştırıcılar O(n³), derleyicilerinkiler <b style="color:var(--teal)">O(n)</b>.</p>
  </div>`,
  n: [
    "İki yaklaşımı id artı id çarpı id girdisi üzerinde karşılaştıralım.",
    "Yukarıdan aşağıya ayrıştırıcı kökten, E'den başlar ve onu E artı E olarak açar.",
    "Sonra en soldaki E'yi id'ye indirir.",
    "Ardından sağdaki E'yi E çarpı E olarak açar ve onları da id'lere indirir. Bu, sola dayalı bir türetmedir.",
    "Aşağıdan yukarıya ayrıştırıcı ise tam tersinden başlar: elinde sadece yapraklar, yani token'lar vardır.",
    "Önce çarpmanın iki tarafındaki id'leri E'ye indirger ve E çarpı E'yi tek bir E'ye birleştirir.",
    "Sonra soldaki id'yi de E'ye indirger ve E artı E'yi köke, yani E'ye birleştirir. Bu, sağa dayalı türetmenin tersten okunmasıdır.",
    "Ortaya çıkan ağaç iki durumda da aynıdır; değişen yalnızca düğümlerin eklenme sırasıdır. Bir not daha: her belirsiz olmayan gramer için çalışan genel ayrıştırıcılar n küp zaman alır. Derleyiciler ise gramerlerin bir alt kümesiyle sınırlı kalarak doğrusal, yani O(n) zamanda çalışan ayrıştırıcılar kullanır.",
  ],
},
];
