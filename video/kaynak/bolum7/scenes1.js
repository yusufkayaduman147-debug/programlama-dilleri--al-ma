const { code } = require("../build/lib");
const { trace } = require("../ch4/h");

const roadmap = ["Yapısal programlama", "Üç temel yapı: sıra, seçim, yineleme", "Atama deyimi ve biçimleri", "İki yollu seçim ve sallanan else", "Çoklu seçim: case ve switch", "Sayaç ve mantık denetimli döngüler", "goto, break, continue", "Veri yapısı döngüleri, güvenlikli komutlar"];

// flowchart primitives (svg units)
const AR = (id, c) => `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="${c}"/></marker>`;
const box = (x, y, w, h, t, c = "#a493ff", fs = 20) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="10" fill="#151a31" stroke="${c}" stroke-width="2.5"/><text x="${x}" y="${y + fs * 0.35}" fill="#eef0fa" font-size="${fs}" text-anchor="middle">${t}</text>`;
const dia = (x, y, w, h, t, c = "#ffb547", fs = 19) => `<path d="M${x},${y - h / 2} L${x + w / 2},${y} L${x},${y + h / 2} L${x - w / 2},${y}Z" fill="#151a31" stroke="${c}" stroke-width="2.5"/><text x="${x}" y="${y + fs * 0.35}" fill="#eef0fa" font-size="${fs}" text-anchor="middle">${t}</text>`;
const ln = (d, m = "fa") => `<path d="${d}" stroke="#6b7399" stroke-width="2.5" fill="none" marker-end="url(#${m})"/>`;
const lbl = (x, y, t, c = "#a2a9d2") => `<text x="${x}" y="${y}" fill="${c}" font-size="17" text-anchor="middle">${t}</text>`;

const charts = [
  ["Sıra", `${box(110, 70, 150, 50, "ifade a")}${ln("M110,95 L110,145")}${box(110, 170, 150, 50, "ifade b")}${ln("M110,195 L110,245")}${box(110, 270, 150, 50, "ifade c")}`],
  ["Seçim (if/else)", `${dia(110, 80, 150, 80, "şart")}${ln("M35,80 L20,80 L20,180")}${ln("M185,80 L200,80 L200,180")}${lbl(28, 68, "doğru", "#35d0c0")}${lbl(192, 68, "yanlış", "#ff7a7a")}${box(55, 205, 90, 50, "a", "#35d0c0")}${box(165, 205, 90, 50, "b", "#ff7a7a")}${ln("M55,230 L55,290 L105,290")}${ln("M165,230 L165,290 L115,290")}`],
  ["Çoklu seçim", `${dia(70, 50, 110, 60, "durum a", "#ffb547", 16)}${dia(70, 140, 110, 60, "durum b", "#ffb547", 16)}${dia(70, 230, 110, 60, "durum x", "#ffb547", 16)}${ln("M70,80 L70,108")}${ln("M70,170 L70,198")}${ln("M125,50 L150,50")}${ln("M125,140 L150,140")}${ln("M125,230 L150,230")}${box(185, 50, 66, 40, "a", "#35d0c0", 17)}${box(185, 140, 66, 40, "b", "#35d0c0", 17)}${box(185, 230, 66, 40, "x", "#35d0c0", 17)}${ln("M70,260 L70,290")}${box(70, 315, 120, 40, "default", "#a493ff", 16)}`],
  ["Önce sınanan", `${dia(110, 80, 150, 80, "şart")}${ln("M110,120 L110,170")}${lbl(140, 150, "doğru", "#35d0c0")}${box(110, 200, 140, 56, "gövde", "#35d0c0")}${ln("M110,228 L110,255 L15,255 L15,80 L33,80")}${ln("M185,80 L205,80 L205,300")}${lbl(196, 66, "yanlış", "#ff7a7a")}`],
  ["Sonra sınanan", `${box(110, 60, 140, 56, "gövde", "#35d0c0")}${ln("M110,88 L110,138")}${dia(110, 180, 150, 80, "şart")}${ln("M35,180 L15,180 L15,60 L38,60")}${lbl(30, 205, "doğru", "#35d0c0")}${ln("M110,220 L110,290")}${lbl(140, 262, "yanlış", "#ff7a7a")}`],
];

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r mono" data-s="1" style="display:flex;gap:22px;margin-bottom:56px;align-items:center;font-size:34px">
      ${[["if", "amber"], ["switch", "amber"], ["for", "teal"], ["while", "teal"], ["break", "violet"], ["goto", "coral"]].map(([t, c], i) => `<div class="card r rp" data-s="1" style="padding:16px 28px;color:var(--${c});transition-delay:${i * 0.08}s;${t === "goto" ? "text-decoration:line-through" : ""}">${t}</div>`).join("")}
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:108px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 7: Yapısal Programlama<br>ve Akış Denetimi</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin yedinci bölümüne hoş geldiniz. Bu bölümün konusu yapısal programlama ve akış denetimi.",
    "Bir programın deyimlerinin hangi sırayla çalışacağını belirleyen yapıları, yani atama, seçim ve yineleme deyimlerini; bunların dillere göre nasıl tasarlandığını ve goto deyiminin neden bu kadar tartışıldığını inceleyeceğiz.",
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
    "Önce yapısal programlamanın ne olduğunu ve üç temel yapısını göreceğiz. Ardından atama deyimine, iki yollu seçime ve sallanan else sorununa geçeceğiz.",
    "Sonra çoklu seçim yapılarını, sayaç ve mantık denetimli döngüleri, goto, break ve continue deyimlerini, veri yapılarına dayalı döngüleri ve son olarak Dijkstra'nın güvenlikli komutlarını inceleyeceğiz.",
  ],
},
// ───────── 7.1
{
  id: "structured", ch: "7.1 Yapısal programlama", chip: "<b>7.1</b> Yapısal programlama",
  html: (() => {
    const N = (x, y, w, t, s, c = "#a493ff") => `<g class="r rp" data-s="${s}" style="transform-box:fill-box;transform-origin:center"><rect x="${x - w / 2}" y="${y - 30}" width="${w}" height="60" rx="14" fill="#151a31" stroke="${c}" stroke-width="3"/><text x="${x}" y="${y + 9}" fill="#eef0fa" font-size="24" text-anchor="middle">${t}</text></g>`;
    const L = (x1, y1, x2, y2, s) => `<line class="r rf" data-s="${s}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3a4278" stroke-width="3"/>`;
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Yapısal programlama: <em>disiplinli</em> tasarım</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:620px">
        <div class="card r" data-s="0" style="padding:22px 28px"><p style="font-size:24px">Yazılım yaşam döngüsünde en uzun ve en pahalı aşama <b>bakım</b>dır. Bakımın temeli, programı <b>okuyarak anlayabilmek</b>tir.</p></div>
        <div class="card r" data-s="1" style="padding:22px 28px"><p style="font-size:24px">Yapısal programlama, program tasarımını ve yazımını <b>kurallara bağlar</b>. Problem, kolayca çözülebilecek <b>modüllere</b> bölünür: yukarıdan aşağıya tasarım.</p></div>
        <div class="note r" data-s="3" style="font-size:22px">Her modül <b>bağımsız</b>; kontrol üst modülden gelir ve işi bitince ona döner. Modüller sözde kod veya akış diyagramıyla tanımlanır.</div>
      </div>
      <svg viewBox="0 0 960 520" style="width:960px;height:520px">
        ${L(480, 70, 190, 220, 2)}${L(480, 70, 480, 220, 2)}${L(480, 70, 770, 220, 2)}${L(480, 250, 360, 400, 2)}${L(480, 250, 630, 400, 2)}
        ${N(480, 50, 300, "Ana modül: 1+2+…+n", 1, "#ffb547")}
        ${N(190, 230, 180, "n'yi oku", 2)}${N(480, 230, 180, "Topla", 2)}${N(770, 230, 180, "Sonucu yaz", 2)}
        ${N(360, 410, 200, "toplam ← 0", 2, "#35d0c0")}${N(630, 410, 280, "i = 1..n: toplam += i", 2, "#35d0c0")}
        <text class="r" data-s="2" x="40" y="500" fill="#6b7399" font-size="20">aşağı indikçe ayrıntı artar ↓</text>
      </svg>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 7.1: Yapısal programlama. Yazılım mühendisliğinde üzerinde uzlaşılan bir gerçek var: bir yazılımın yaşam döngüsünde en uzun süren ve en çok kaynak harcayan aşama bakımdır. Bakımın en temel işlemi ise programı okuyarak anlamaktır. Bu yüzden anlaşılması kolay dil yapıları her zamankinden önemlidir.",
    "Yapısal programlama, program tasarımını ve yazımını kurallara bağlayan, disiplin altına alan bir yaklaşımdır. Amacı, program metnini okuyarak programın ne yaptığının anlaşılabilmesidir. Problem, daha kolay çözülebilen alt problemlere, yani modüllere bölünür; her modül de gerekirse daha alt seviyelere bölünür.",
    "Basit bir örnek: birden n'e kadar olan sayıların toplamını bulalım. En üstte çözümün ana mantığını gösteren ana modül var. Bu, n'yi okuyan, toplayan ve sonucu yazan üç modüle ayrılır; toplama modülü de toplamı sıfırlayan ve döngüyle sayıları ekleyen adımlara ayrılır. Aşağı indikçe ayrıntı artar.",
    "Modüler tasarımda her modül diğerlerinden bağımsız olmalıdır. Kontrol bir modüle üst seviyedeki modülden gelir ve modül işini bitirince yine ona döner. Modüller sözde kod ya da akış diyagramıyla tanımlanır; bu da programa geçişi büyük ölçüde kolaylaştırır.",
  ],
},
{
  id: "three", ch: "7.1 Yapısal programlama", chip: "<b>7.1</b> Üç temel yapı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><em>Sıra, seçim, yineleme</em> — ve goto yok</h2>
    <div class="grid5" style="gap:18px">
      ${charts.map(([t, svg], i) => `<div class="card r" data-s="${[1, 2, 2, 3, 3][i]}" style="padding:16px 10px;display:flex;flex-direction:column;align-items:center"><div style="font-size:24px;font-weight:700;color:var(--${["violet", "amber", "amber", "teal", "teal"][i]});margin-bottom:8px">${t}</div>
        <svg viewBox="0 0 220 340" style="width:260px;height:400px" font-family="Inter"><defs>${AR("fa", "#6b7399")}</defs>${svg}</svg></div>`).join("")}
    </div>
    <div class="row" style="gap:24px;margin-top:22px">
      <div class="note r f1" data-s="4" style="font-size:22px"><b>Tarih:</b> FORTRAN akışı büyük ölçüde <b>go to</b> ile yönetiyordu. ALGOL 60 daha iyi yapılar getirdi; yapısal programlama 1970'lerde yaygınlaştı.</div>
      <div class="card r f1" data-s="5" style="padding:18px 24px"><p style="font-size:22px"><b class="tl">Yararları:</b> anlaşılabilirlik ↑ · hata ayıklama, sınama ve düzeltme süresi ↓ · nitelik, güvenilirlik ve etkinlik ↑</p></div>
    </div>
  </div>`,
  n: [
    "Yapısal programlama, bir programdaki akış denetiminin yalnızca üç temel yapının birleştirilmesiyle kurulmasını ister.",
    "Birincisi sıralı yapıdır: deyimler yazıldıkları sırayla, birbiri ardına çalışır.",
    "İkincisi seçimli yapıdır. if else ile bir şarta göre iki yoldan biri seçilir; çoklu seçimde ise bir değere göre birçok yoldan biri seçilir ve hiçbiri tutmazsa varsayılan yol işlenir.",
    "Üçüncüsü yinelemeli yapıdır. Önce sınanan döngüde şart gövdeden önce kontrol edilir, bu yüzden gövde hiç çalışmayabilir. Sonra sınanan döngüde ise gövde önce çalışır, şart sonra kontrol edilir; gövde en az bir kez çalışır. Dikkat ederseniz bu yapıların hepsinin tek bir girişi ve tek bir çıkışı var.",
    "Bu yaklaşım, akışı koşulsuz değiştiren goto gibi deyimlere yer vermez. Tarihsel olarak FORTRAN akışı büyük ölçüde go to deyimleriyle yönetiyordu ve bu, programları izlemeyi zorlaştırıyordu. ALGOL 60 ve sonrası daha iyi yapılar getirdi ve yapısal programlama 1970'lerde yaygınlaştı.",
    "Bugün yararları kanıtlanmış bir tekniktir: programların anlaşılabilirliği artar; hata ayıklama, sınama ve düzeltme süresi kısalır; programın niteliği, güvenilirliği ve etkinliği artar.",
  ],
},
// ───────── 7.2.1 assignment
{
  id: "assign", ch: "7.2.1 Atama deyimi", chip: "<b>7.2.1</b> Atama deyimi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Atama: <em>değeri adrese kopyala</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:820px">
        <div class="card r" data-s="1" style="padding:24px 30px;text-align:center"><div class="mono" style="font-size:26px"><span class="tl">&lt;hedef_değişken&gt;</span> <span class="hl">&lt;atama_işlemcisi&gt;</span> <span class="vl">&lt;ifade&gt;</span></div>
          <div class="row" style="justify-content:center;gap:60px;margin-top:14px;font-size:22px;color:var(--muted)"><span>↑ bellekteki bir <b>adres</b></span><span>↑ bir <b>değer</b>: 3, a + 5</span></div></div>
        <div class="card r" data-s="2" style="padding:22px 28px"><p style="font-size:23px">İmperatif dillerde değişkenlerin değeri <b>yalnızca atama</b> ile değişir; seçim ve yineleme deyimleri atamaların <b>sırasını</b> belirler. Sağ ve sol taraf <b>atama uyumlu</b> olmalı: aksi halde zorunlu dönüşüm ya da tip hatası.</p></div>
        <div class="row r" data-s="3" style="gap:20px">
          <div class="card f1" style="padding:18px 24px"><div class="mono" style="font-size:34px;color:var(--teal)">=</div><p style="font-size:21px">FORTRAN, BASIC, PL/I, C, C++, Java</p></div>
          <div class="card f1" style="padding:18px 24px"><div class="mono" style="font-size:34px;color:var(--amber)">:=</div><p style="font-size:21px">ALGOL 60, Pascal, Ada</p></div></div>
      </div>
      <div class="col f1">
        <div class="card tint-c r" data-s="4" style="padding:22px 28px"><h3 class="cl" style="font-size:28px">= iki görevde</h3>
          <div class="mono" style="font-size:30px;margin:8px 0">say1 = say2 = say3</div>
          <p style="font-size:21px">PL/I'da anlamı: <b>say2 = say3</b> karşılaştırmasının sonucunu (doğru/yanlış) say1'e ata. Ama okuyan "say3'ü ikisine ata" sanabilir.</p></div>
        <div class="note r" data-s="5" style="font-size:22px">C: <span class="mono">=</span> atama, <span class="mono">==</span> eşitlik. <span class="mono">if (x = 0)</span> yazım hatası derleyiciden kaçabilir.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2: Program akış denetim deyimleri. Sıralı, seçimli ve yinelemeli yapılar imperatif programlamanın deyimlerini oluşturur. Bir dilde çok sayıda denetim deyimi bulunması yazılabilirliği artırır, ama sayısı arttıkça okunabilirlik azalır. İlk olarak en temel sıralı deyim olan atama deyimiyle başlayalım.",
    "Atama deyiminin genel yapısı şöyledir: hedef değişken, atama işlemcisi ve ifade. İfade bir değeri, örneğin üçü ya da a artı beşi gösterir; hedef değişken ise bellekteki bir adresi. Atamanın anlamı, sağdaki değerin soldaki adrese kopyalanmasıdır.",
    "İmperatif dillerde değişkenlerin değerleri yalnızca atama ile değişir; seçim ve yineleme deyimleri yalnızca atamaların hangi sırayla çalışacağını belirler. Kopyalamanın yapılabilmesi için iki tarafın atama uyumlu olması gerekir. Tipler farklıysa, dile göre ya zorunlu tip dönüşümü yapılır ya da tip uyuşmazlığı hatası verilir.",
    "Atama işlemcisi olarak FORTRAN, BASIC, PL/I, C, C++ ve Java eşittir işaretini; ALGOL 60 ve onu izleyen Pascal ve Ada ise iki nokta eşittiri kullanır.",
    "Neden iki farklı sembol? Çünkü eşittir işareti aynı zamanda karşılaştırma için de kullanılıyorsa karışıklık doğar. PL/I'da say1 eşittir say2 eşittir say3 deyimi, say2 ile say3'ün eşit olup olmadığını sınar ve bu mantıksal sonucu say1'e atar. Ama okuyan biri bunu, say3'ün değerinin hem say2'ye hem say1'e atanması sanabilir. ALGOL 60 bu yüzden iki nokta eşittiri seçti.",
    "C bu sorunu iki ayrı işlemciyle çözer: tek eşittir atama, çift eşittir eşitlik sınamasıdır. Ama bu kez de ikisi birbirine çok benzediği için, if içinde yanlışlıkla tek eşittir yazmak gibi hatalar programcının gözünden kolayca kaçabilir.",
  ],
},
{
  id: "assign-forms", ch: "7.2.1 Atama deyimi", chip: "<b>7.2.1.2</b> Atama deyimlerinin tasarımı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">C ailesinin <em>kısa atama biçimleri</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px;gap:20px">
        <div class="card r" data-s="1" style="padding:20px 26px"><h3 style="font-size:27px">1. Koşullu hedef</h3><div class="mono" style="font-size:24px">($flag ? $total : $subtotal) = 0;  <span class="cm"># Perl</span></div><div class="mono" style="font-size:21px;color:var(--faint);margin-top:6px">≡ if ($flag) { $total = 0 } else { $subtotal = 0 }</div></div>
        <div class="card r" data-s="2" style="padding:20px 26px"><h3 style="font-size:27px">2. Birleşik atama</h3><div class="mono" style="font-size:24px">toplam += deger;   <span class="cm">// toplam = toplam + deger</span></div><div class="mono" style="font-size:21px;color:var(--faint);margin-top:6px">+=  -=  *=  /=  %=</div></div>
        <div class="card r" data-s="3" style="padding:20px 26px"><h3 style="font-size:27px">3. Artırma / azaltma</h3><div class="mono" style="font-size:24px;line-height:1.6">sum = ++count;  <span class="cm">// önce artır, sonra ata</span><br>sum = count++;  <span class="cm">// önce ata, sonra artır</span></div></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="4" style="font-size:24px;color:var(--muted)">Başlangıçta <span class="mono hl">count = 5</span></div>
        <div class="r" data-s="4">${trace([{ h: "deyim", color: "text" }, { h: "count", color: "amber", align: "center" }, { h: "sum", color: "teal", align: "center" }], [[["sum = ++count", "6", "6"], 4], [["count = 5 (yeniden)", "5", "–"], 5], [["sum = count++", "6", "5"], 6]], { fs: 26 })}</div>
        <div class="note r" data-s="7" style="font-size:22px"><span class="mono">-count++</span> → önce <b>count++</b> (tekli işlemciler sağdan sola), sonra eksi alınır.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Atama deyiminin tasarımı dillere göre değişir. FORTRAN, Pascal ve Ada'da atama tek bir deyimdir ve hedefi tek bir değişkendir. PL/I'da ise solda birden çok değişken bulunabilir. C ve C++ programlarının genelde daha kısa olmasının bir nedeni, sık kullanılan işlemler için kısa gösterimler sunmalarıdır. Üç tasarıma bakalım.",
    "Birincisi koşullu hedeftir: atamanın hedefi bir koşula göre belirlenir. Perl örneğinde flag doğruysa total'e, değilse subtotal'e sıfır atanır. Bu, sağdaki if else yapısına eşdeğerdir.",
    "İkincisi birleşik atamadır: bir ikili işlemci ile atama işlemcisi birleştirilir. toplam artı eşittir deger, toplam eşittir toplam artı deger ile aynıdır. C'de artı, eksi, çarpı, bölü ve mod için birleşik atama işlemcileri vardır.",
    "Üçüncüsü artırma ve azaltma işlemcileridir. Artı artı ve eksi eksi, değişkenin önüne de arkasına da yazılabilir ve anlam değişir.",
    "count beş iken sum eşittir artı artı count yazarsak, önce count altıya artar, sonra bu değer sum'a atanır: ikisi de altı olur.",
    "Şimdi count'u yeniden beş yapalım.",
    "sum eşittir count artı artı yazarsak, önce count'un mevcut değeri olan beş sum'a atanır, sonra count altıya artar. Yani sum beş, count altı olur.",
    "Bir incelik daha: eksi count artı artı ifadesinde, tekli işlemciler sağdan sola bağlandığı için önce count artırılır, sonra sonucun negatifi alınır.",
  ],
},
{
  id: "assign-expr", ch: "7.2.1 Atama deyimi", chip: "<b>7.2.2–7.2.5</b> İfade olarak atama, çoklu ve karışık atama",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Atamanın <em>diğer yüzleri</em></h2>
    <div class="grid2" style="gap:30px">
      <div class="card r" data-s="1" style="padding:22px 28px"><h3 style="font-size:28px">İfade olarak atama</h3>
        ${code("c", ["while ((ch = getchar()) != EOF) {", "    ...", "}"], { lang: "c", cls: "xs" })}
        <p style="font-size:21px;margin-top:10px">Atama bir <b>değer üretir</b> (C ailesi, Perl, JavaScript). Kısa ama <b>yan etki</b> riski: <span class="mono">a = b + (c = d / b) - 1</span></p></div>
      <div class="card r" data-s="2" style="padding:22px 28px"><h3 style="font-size:28px">Çoklu atama</h3>
        ${code("perl", ["($first, $second, $third) = (20, 30, 40);", "($first, $second) = ($second, $first);  # takas!"], { lang: "python", cls: "xs" })}
        <p style="font-size:21px;margin-top:10px">Perl, Ruby, Lua (ve Python): geçici değişken olmadan yer değiştirme.</p></div>
      <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:28px">Fonksiyonel dillerde</h3>
        <div class="mono" style="font-size:24px;margin:6px 0">val fruit = apples + oranges;</div>
        <p style="font-size:21px">ML'de isim yalnızca bir <b>değere</b> bağlanır; değiştirilemez. Yeni bir <span class="mono">val fruit</span> yeni, ayrı bir isimdir. F#'ta <span class="mono">let</span> benzerdir, yeni kapsam açar.</p></div>
      <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:28px">Karışık biçim ataması</h3>
        <p style="font-size:22px;line-height:1.7"><b>Fortran, C, C++, Perl:</b> her sayısal tip her sayısal değişkene<br><b>Java, C#:</b> yalnızca <span class="tl">genişleten</span> zorunlu dönüşüm<br><b>Ada:</b> atamada zorunlu dönüşüm <span class="cl">yok</span></p></div>
    </div>
  </div>`,
  n: [
    "Atamanın birkaç önemli biçimi daha var.",
    "C ailesi, Perl ve JavaScript'te atama aynı zamanda bir ifadedir ve bir değer üretir. Bu yüzden başka bir ifadenin içinde işlenen olarak kullanılabilir. Klasik örnek: getchar ile okunan karakter ch'ye atanır ve atamanın sonucu dosya sonu ile karşılaştırılır; döngü dosya sonuna kadar devam eder. Bu kısa ve kullanışlıdır, ama ifadelerin içinde gizli yan etkilere yol açabilir ve okunabilirliği düşürebilir.",
    "Perl, Ruby ve Lua çok hedefli, çok kaynaklı atamalara izin verir. Üç değişkene tek satırda üç değer atanabilir. Hatta first ve second'ı geçici bir değişken kullanmadan yer değiştirmek de mümkündür; Python'da da aynı yazım geçerlidir.",
    "Fonksiyonel dillerde ise atama yoktur; tanımlayıcılar yalnızca değerlerin adlarıdır. ML'de val ile bir isim bir değere bağlanır ve bu bağ değiştirilemez. Aynı isimle yeni bir val yazarsanız, bu eskisini değiştirmez; yeni ve ayrı bir isim oluşturur. F#'taki let de buna benzer, ayrıca yeni bir kapsam açar.",
    "Son olarak karışık biçim ataması: atamanın iki tarafı farklı sayısal tiplerde olabilir mi? Fortran, C, C++ ve Perl'de her sayısal değer her sayısal değişkene atanabilir. Java ve C#'ta yalnızca genişleten dönüşümler örtük olarak yapılır. Ada'da ise atamada hiçbir zorunlu dönüşüm yoktur.",
  ],
},
// ───────── 7.2.2 selection
{
  id: "if", ch: "7.2.2 Seçim yapıları", chip: "<b>7.2.2.1</b> İkili ve tekli seçim",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İki yollu seçim: <em>if – then – else</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:640px">
        <div class="r" data-s="1">${code("genel", ["if (koşul)", "    deyim_1", "else", "    deyim_2"], { lang: "c", cls: "sm" })}</div>
        <div class="r" data-s="2">${code("tekli", ["if (not < 50)", "    printf(\"kaldı\");"], { lang: "c", cls: "sm" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:24px 30px"><h3 style="font-size:29px">Tasarım soruları</h3>
          <ol style="font-size:24px;line-height:1.6;color:var(--muted);margin:6px 0 0;padding-left:30px">
            <li>Kontrol ifadesinin <b style="color:var(--text)">tipi ve biçimi</b> ne olacak?</li>
            <li><b style="color:var(--text)">then</b> ve <b style="color:var(--text)">else</b> kısımları nasıl belirlenecek?</li>
            <li>İç içe seçicilerin <b style="color:var(--text)">anlamı</b> nasıl belirlenecek?</li></ol></div>
        <div class="card r" data-s="4" style="padding:22px 28px"><p style="font-size:22px;line-height:1.6"><b>C89:</b> aritmetik ifade (0 = yanlış)<br><b>Java, C#, Ada, Pascal:</b> yalnızca <span class="tl">Boolean</span><br><b>Python, Ruby:</b> her değerin doğruluk karşılığı var</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.2: Seçim yapıları. Bir seçim deyimi, tekli, ikili ya da çoklu akış yolları arasında seçim yapılmasını sağlar.",
    "İki yollu seçim deyiminin genel yapısı ekranda görülüyor. Anlamı şudur: koşul doğruysa deyim bir, yanlışsa deyim iki çalıştırılır.",
    "Tekli seçimde ise yalnızca if kısmı vardır: koşul doğruysa deyim çalışır, yanlışsa hiçbir şey yapılmadan devam edilir.",
    "Bu yapının üç tasarım sorusu vardır. Kontrol ifadesinin tipi ve biçimi ne olacak? then ve else kısımları nasıl belirlenecek? Ve iç içe geçmiş seçicilerin anlamı nasıl belirlenecek?",
    "Kontrol ifadesine bakalım. Eski C standardında koşul aritmetik bir ifade olabilir ve sıfır yanlış sayılır. Java, C#, Ada ve Pascal ise koşulun mutlaka Boolean olmasını ister; bu, yanlışlıkla atama yazmak gibi hataları derleme zamanında yakalar.",
  ],
},
{
  id: "dangling-else", ch: "7.2.2 Seçim yapıları", chip: "<b>7.2.2.1.1</b> Yuvalanmış if ve sallanan else",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bu <em>else</em> kimin?</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:780px;gap:20px">
        <div class="r" data-s="1">${code("java", ["if (sum == 0)", "    if (count == 0)", "        result = 0;", "else", "    result = 1;"], { lang: "java", cls: "sm" })}</div>
        <div class="row" style="gap:20px">
          <div class="card r f1" data-s="2" style="padding:18px 22px"><div style="font-size:22px;color:var(--faint);margin-bottom:6px">Yorum A: dış if'e</div><div class="mono" style="font-size:18px;line-height:1.5">if (sum == 0) {<br>  if (count == 0) result = 0;<br>} <span class="cl">else</span> result = 1;</div></div>
          <div class="card tint-t r f1" data-s="3" style="padding:18px 22px"><div style="font-size:22px;color:var(--teal);margin-bottom:6px">Yorum B: iç if'e ✓ (Java, C)</div><div class="mono" style="font-size:18px;line-height:1.5">if (sum == 0) {<br>  if (count == 0) result = 0;<br>  <span class="tl">else</span> result = 1; }</div></div>
        </div>
        <div class="note r" data-s="3" style="font-size:22px"><b>Kural:</b> else, kendisine <b>en yakın eşleşmemiş</b> if ile eşleşir. Girinti derleyici için bir şey ifade etmez!</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:20px 26px"><h3 style="font-size:27px">Çözüm 1: birleşik deyim</h3><p style="font-size:21px">Pascal <span class="mono">begin … end</span>, C ailesi <span class="mono">{ … }</span> ile A yorumu açıkça yazılır.</p></div>
        <div class="card r" data-s="5" style="padding:20px 26px"><h3 style="font-size:27px">Çözüm 2: kapanış kelimesi</h3>
          ${code("ada / ruby", ["if sum = 0 then", "   if count = 0 then", "      result := 0;", "   end if;", "else", "   result := 1;", "end if;"], { lang: "ada", cls: "xs" })}
          <p style="font-size:20px;margin-top:8px">Ada, Fortran 95, Ruby: <span class="mono">end if</span> · Python: girinti</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.2.1.1: Yuvalanmış if deyimleri. İki yollu seçim deyimleri iç içe yazıldığında, bir else'in hangi if'e ait olduğunu belirlemek güçleşebilir. Buna sallanan else problemi denir.",
    "Bu koda bakın. Girintiye bakarak else'in dıştaki if'e ait olduğunu düşünebilirsiniz. Ama derleyici girintiye bakmaz.",
    "Birinci yorum: else dıştaki if'e aittir; yani sum sıfır değilse result bire eşitlenir.",
    "İkinci yorum: else içteki if'e aittir; yani sum sıfırken count sıfır değilse result bir olur. Java ve C gibi diller bu belirsizliği bir anlam kuralıyla çözer: her else, kendisine en yakın eşleşmemiş if ile eşleşir. Yani bu kod aslında ikinci yorumla çalışır ve programcının niyetinden farklı davranır.",
    "Birinci yorumu istiyorsak, içteki if'i bir birleşik deyimin içine almalıyız. Birleşik deyim bir dizi deyimi tek bir deyim gibi soyutlar; Pascal'da begin end, C ailesinde küme parantezleriyle yazılır.",
    "Daha köklü bir çözüm, if yapısının sonunu özel bir kelimeyle bitirmektir. Ada, Fortran 95 ve Ruby'de her if, end if ile kapanır; böylece else'in kime ait olduğu her zaman açıktır. C'de bir kapanış parantezini unutmak bazen yalnızca belirsiz bir uyarıya yol açarken, bu tasarımda yapı hep açıktır. Python ise aynı sorunu girintiyi sözdiziminin parçası yaparak çözer.",
  ],
},
{
  id: "short-circuit", ch: "7.2.2 Seçim yapıları", chip: "<b>7.2.2.2</b> Kısa devre değerlendirme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kısa devre: <em>sonuç belliyse dur</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:840px;gap:20px">
        <div class="r" data-s="1">${code("c", ["if ((a != 0) && (28 / a++ > 2))", "    ..."], { lang: "c", cls: "sm" })}</div>
        <div class="r" data-s="2">${trace([{ h: "a (önce)", color: "amber", align: "center" }, { h: "a != 0", align: "center" }, { h: "28 / a++ > 2", align: "center" }, { h: "a (sonra)", color: "amber", align: "center" }], [[["0", "yanlış", "— atlandı", "0"], 2], [["4", "doğru", "7 > 2 → doğru", "5"], 3]], { fs: 25 })}</div>
        <div class="note r" data-s="4" style="font-size:22px">İkinci kısım bazen çalışmadığı için <b>a bazen artmaz</b>: yan etkili ifadeleri koşulun sağına koymayın. Aynı risk: <span class="mono">(a &gt; b) || (b++ / 3)</span></div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="1" style="padding:20px 26px"><p style="font-size:22px"><b>Tam değerlendirme:</b> her bileşen hesaplanır.<br><b>Kısa devre:</b> bir bileşen sonucu belirliyorsa gerisi hesaplanmaz.</p></div>
        <div class="card r" data-s="5" style="padding:20px 26px"><h3 style="font-size:26px">Diller</h3><p style="font-size:21px;line-height:1.6"><b>C, C++, Java:</b> <span class="mono">&amp;&amp; ||</span> kısa devre; <span class="mono">&amp; |</span> değil<br><b>Ruby, Perl, ML, F#, Python:</b> hepsi kısa devre<br><b>Ada:</b> programcı seçer: <span class="mono">and then</span>, <span class="mono">or else</span></p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.2.2: Kısa devre değerlendirme. Bir if koşulu birleşik bir ifadeyse iki değerlendirme seçeneği vardır. Tam değerlendirmede bütün bileşenler hesaplanır. Kısa devre değerlendirmede ise bir bileşenin sonucu tüm ifadenin sonucunu belirlemeye yetiyorsa, geri kalan bileşenler hesaplanmaz. Bazı ifadeler kısa devreye ihtiyaç duyar: buradaki bölme, ancak a sıfırdan farklıysa güvenle yapılabilir.",
    "a sıfır olsun. a eşit değildir sıfır yanlış çıkar; ve işleminin sonucu artık kesin olarak yanlıştır. Bu yüzden sağ taraf hiç hesaplanmaz ve sıfıra bölme hatası oluşmaz. Ama dikkat: a artı artı da çalışmadığı için a sıfır olarak kalır.",
    "a dört olsun. Sol taraf doğru, bu yüzden sağ taraf da hesaplanır: yirmi sekiz bölü dört yedi, ikiden büyük; ve a artı artı yüzünden a beşe çıkar.",
    "Gördüğünüz gibi kısa devre, if deyiminin her çalışmasında a'nın artırılıp artırılmayacağını değiştiriyor. Bu yüzden yan etkili ifadeleri bir koşulun sağ tarafına koymaktan kaçınmak gerekir. a büyüktür b veya b artı artı bölü üç ifadesinde de, a b'den büyük olduğu sürece b hiç artmaz.",
    "Diller nasıl davranır? C, C++ ve Java, çift ve ile çift veya işlemcilerinde kısa devre yapar, ama tek karakterli bit düzeyi ve ile veya işlemcilerinde yapmaz. Ruby, Perl, ML, F# ve Python'da tüm mantıksal işlemciler kısa devrelidir. Ada'da ise seçim programcıya bırakılmıştır: kısa devre isteniyorsa and then ya da or else yazılır.",
  ],
},
];
