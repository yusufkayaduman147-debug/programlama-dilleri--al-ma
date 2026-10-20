const { code } = require("../build/lib");
const { trace } = require("../ch8/h");

module.exports = [
// ───────── nested subprograms
{
  id: "nested", ch: "9.4 İç içe altprogramlar", chip: "İç içe altprogramlar ve statik zincir",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Yerel olmayan değişkeni <em>nasıl buluruz?</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:820px;gap:16px">
        <div class="card r" data-s="0" style="padding:18px 24px"><p style="font-size:22px">Fortran 95, Ada, JavaScript, Pascal: yığıt-dinamik yereller <b>ve</b> iç içe altprogramlar. <b>Kural:</b> erişilebilen her yerel olmayan değişken, yığıtta <b>etkin bir kayıtta</b> mutlaka vardır.</p></div>
        <div class="row r" data-s="1" style="gap:18px">
          <div class="card tint-a f1" style="padding:18px 22px"><div class="mono hl" style="font-size:30px">1</div><p style="font-size:21px">Doğru etkinlik kaydını bul <b>(zor kısım)</b></p></div>
          <div class="card tint-t f1" style="padding:18px 22px"><div class="mono tl" style="font-size:30px">2</div><p style="font-size:21px">Kayıt içinde bağıl konumu bul <b>(kolay: derleyici bilir)</b></p></div></div>
        <div class="card r" data-s="2" style="padding:18px 24px"><p style="font-size:22px"><b>Statik bağ:</b> bir kaydı, altprogramın <b>statik ebeveyninin</b> kaydına bağlar. Bunların zinciri: <b>statik zincir</b>. Bir altprogramın iç içe derinliği: <b>statik derinlik</b>.</p></div>
        <div class="note r" data-s="3" style="font-size:22px">Referans = <span class="mono hl">(zincir_bağılkonum, yerel_bağılkonum)</span>. Zincir bağıl konum = kullanan ile tanımlayanın statik derinlik farkı = statik zincirde kaç adım geri gidileceği.</div>
      </div>
      <div class="col f1 r" data-s="2" style="gap:12px;font-family:JBM;font-size:28px">
        <div>main <span style="color:var(--faint);font-size:22px">— derinlik 0</span></div>
        <div style="padding-left:50px;color:var(--violet)">A <span style="color:var(--faint);font-size:22px">— derinlik 1</span></div>
        <div style="padding-left:100px;color:var(--amber)">B <span style="color:var(--faint);font-size:22px">— derinlik 2</span></div>
        <div style="padding-left:50px;color:var(--violet)">C <span style="color:var(--faint);font-size:22px">— derinlik 1</span></div>
        <div class="card r" data-s="3" style="padding:16px 20px;margin-top:20px;font-family:Inter"><p style="font-size:21px">B, main'deki bir değişkeni kullanıyorsa: 2 − 0 = <b>2 adım</b> geri. A'daki birini kullanıyorsa: <b>1 adım</b>.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 9.4: İç içe altprogramlar. Fortran 95, Ada, JavaScript ve Pascal gibi diller hem yığıt-dinamik yerel değişkenler kullanır hem de altprogramların iç içe tanımlanmasına izin verir. Önemli bir kural var: statik kapsam gereği erişilebilen her yerel olmayan değişken, yığıtta etkin bir kaydın içinde mutlaka bulunur.",
    "Yerel olmayan bir değişkene erişmek iki adımdır: önce değişkenin bulunduğu doğru etkinlik kaydını bulmak, sonra o kayıt içindeki bağıl konumunu bulmak. İkinci adım kolaydır, çünkü derleyici konumu bilir. Zor olan birinci adımdır.",
    "Birinci teknik statik zincirdir. Her kayda bir statik bağ eklenir; bu bağ, altprogramın program metninde içinde tanımlandığı altprogramın, yani statik ebeveyninin kaydını gösterir. Statik bağların oluşturduğu zincire statik zincir denir. Bir altprogramın ne kadar iç içe olduğuna da statik derinlik denir: main sıfır, onun içindeki A bir, A'nın içindeki B iki, main'in içindeki C yine birdir.",
    "Böylece her yerel olmayan referans bir sayı çiftiyle gösterilebilir: zincir bağıl konumu ve yerel bağıl konum. Zincir bağıl konumu, değişkeni kullanan altprogramın statik derinliği ile değişkeni tanımlayanınki arasındaki farktır; yani statik zincirde kaç adım geri gidileceğini söyler. B, main'deki bir değişkeni kullanıyorsa iki adım, A'dakini kullanıyorsa bir adım geri gider.",
  ],
},
{
  id: "offsets", ch: "9.4 İç içe altprogramlar", chip: "Statik zincirle referanslar: (zincir, yerel) çiftleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Her referans <em>iki sayı</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:560px;gap:16px">
        <div class="r" data-s="0">${code("ic_ice.pas", ["program main          { derinlik 0 }", "  var x, y, w", "  procedure sub1      { derinlik 1 }", "    var z, y", "    procedure sub11   { derinlik 2 }", "      var z, w", "      begin", { t: "        z := x + y * w", hot: "2,3,4,5" }, "      end", "    begin sub11() end", "  begin sub1() end"], { lang: "pascal", cls: "xs" })}</div>
      </div>
      <div class="col f1" style="gap:16px">
        <div class="row r" data-s="1" style="gap:14px">
          ${[["0", "dönüş adresi"], ["1", "statik bağ"], ["2", "dinamik bağ"], ["3", "1. yerel"], ["4", "2. yerel"]].map(([o, t]) => `<div class="box f1" style="font-size:19px;padding:10px 6px"><span class="mono hl" style="font-size:26px">${o}</span>${t}</div>`).join("")}
        </div>
        <div class="r" data-s="1" style="font-size:20px;color:var(--muted);margin-top:-6px">her kayıtta yerel bağıl konumlar</div>
        <div class="r" data-s="2">${trace([{ h: "referans", color: "text", align: "center" }, { h: "tanımlandığı yer", color: "muted" }, { h: "(zincir, yerel)", color: "amber", align: "center" }], [[["z", "sub11, 1. yerel", "(0, 3)"], 2], [["x", "main, 1. yerel", "(2, 3)"], 3], [["y", "sub1, 2. yerel", "(1, 4)"], 4], [["w", "sub11, 2. yerel", "(0, 4)"], 5]], { fs: 26 })}</div>
        <div class="note r" data-s="6" style="font-size:21px">Dikkat: <b>y</b> hem main'de hem sub1'de var; statik kapsam gereği en yakın olan, <b>sub1</b>'deki kullanılır. w de sub11'in kendi w'si.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bir örnekle somutlaştıralım. main'in içinde sub1, sub1'in içinde de sub11 tanımlı. sub11'deki deyim z eşittir x artı y çarpı w. Bu dört değişkenin her biri nerede?",
    "Her etkinlik kaydında konumlar şöyle numaralanır: sıfır dönüş adresi, bir statik bağ, iki dinamik bağ; yerel değişkenler üçten başlar. Yani birinci yerel değişken üç, ikinci yerel değişken dört numaralı konumdadır.",
    "z, sub11'in kendi birinci yerel değişkenidir: zincirde sıfır adım, konum üç. Yani sıfır, üç.",
    "x, main'in birinci yerel değişkenidir. sub11'in derinliği iki, main'inki sıfır: statik zincirde iki adım geri gideriz. Çift: iki, üç.",
    "y hem main'de hem sub1'de tanımlı. Statik kapsam gereği en yakın kapsamdaki, yani sub1'deki y kullanılır. sub1'de z üç, y dört numaralı konumda. Zincirde bir adım: bir, dört.",
    "w de hem main'de hem sub11'de var; sub11'in kendi w'si kullanılır: sıfır, dört.",
    "Gördüğünüz gibi derleyici bu çiftleri derleme zamanında hesaplar. Çalışma zamanında yapılacak tek iş, statik zincirde belirtilen sayıda adım gitmek ve o kayıttaki belirtilen konuma bakmaktır.",
  ],
},
{
  id: "chain-diagram", ch: "9.4 İç içe altprogramlar", chip: "Örnek: MAIN_2 — statik ve dinamik bağlar",
  html: (() => {
    const B = [["SUB1", "A  D", 20, "#ffb547"], ["SUB3", "C  E", 142, "#a493ff"], ["SUB2", "X  B  E", 264, "#a493ff"], ["BIGSUB", "A  B  C", 386, "#35d0c0"], ["MAIN_2", "X", 508, "#35d0c0"]];
    const box = ([n, v, y, c], i) => `<g class="r rp" data-s="${5 - i > 1 ? 1 : 1}" style="transform-box:fill-box;transform-origin:center;transition-delay:${(4 - i) * 0.25}s"><rect x="330" y="${y}" width="360" height="100" rx="14" fill="#151a31" stroke="${c}" stroke-width="3"/><text x="350" y="${y + 38}" fill="${c}" font-size="26" font-weight="700">${n}</text><text x="350" y="${y + 78}" fill="#eef0fa" font-size="26" font-family="JBM">${v}</text></g>`;
    const dyn = (i) => { const y1 = B[i][2] + 50, y2 = B[i + 1][2] + 50; return `<path class="r rf" data-s="2" d="M692,${y1} C760,${y1} 760,${y2} 696,${y2}" stroke="#6b7399" stroke-width="3" fill="none" marker-end="url(#gd)"/>`; };
    const st = (i, j, dx) => { const y1 = B[i][2] + 50, y2 = B[j][2] + 50; return `<path class="r rf" data-s="3" d="M328,${y1} C${328 - dx},${y1} ${328 - dx},${y2} 324,${y2}" stroke="#ff7a7a" stroke-width="3.5" fill="none" marker-end="url(#gs)"/>`; };
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Statik bağ ≠ <em>dinamik bağ</em></h2>
    <div class="row" style="flex:1;gap:20px">
      <div class="col" style="width:520px;gap:14px">
        <div class="r" data-s="0">${code("MAIN_2", ["program MAIN_2;  var X", "  procedure BIGSUB;  var A, B, C", "    procedure SUB1;  var A, D", { t: "      A := B + C;          ← 1", hot: "4" }, "    procedure SUB2(X);  var B, E", "      procedure SUB3;  var C, E", "        SUB1;  E := B + A;", "      SUB3;  A := D + E;", "    SUB2(7);", "  BIGSUB;"], { lang: "pascal", cls: "xs" })}</div>
        <div class="r" data-s="1" style="font-size:21px;color:var(--muted)">Çağrılar: MAIN_2 → BIGSUB → SUB2 → SUB3 → SUB1</div>
        <div class="r" data-s="4">${trace([{ h: "SUB1'de", color: "text", align: "center" }, { h: "(zincir, yerel)", color: "amber", align: "center" }], [[["A", "(0, 3)"], 4], [["B", "(1, 4)"], 4], [["C", "(1, 5)"], 4]], { fs: 24, hotLast: false })}</div>
      </div>
      <svg viewBox="0 0 1000 640" style="width:1000px;height:640px" font-family="Inter">
        <defs><marker id="gd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="#6b7399"/></marker><marker id="gs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="#ff7a7a"/></marker></defs>
        ${B.map(box).join("")}
        ${[0, 1, 2, 3].map(dyn).join("")}
        ${st(0, 3, 230)}${st(1, 2, 70)}${st(2, 3, 70)}${st(3, 4, 70)}
        <text class="r" data-s="2" x="790" y="330" fill="#a2a9d2" font-size="22">dinamik bağ</text><text class="r" data-s="2" x="790" y="358" fill="#a2a9d2" font-size="20">(kim çağırdı?)</text>
        <text class="r" data-s="3" x="20" y="200" fill="#ff7a7a" font-size="22">statik bağ</text><text class="r" data-s="3" x="20" y="228" fill="#ff7a7a" font-size="20">(kimin içinde</text><text class="r" data-s="3" x="20" y="252" fill="#ff7a7a" font-size="20">tanımlı?)</text>
      </svg>
    </div>
  </div>`;
  })(),
  n: [
    "Daha büyük bir örnek. MAIN_2 programında BIGSUB, onun içinde SUB1 ve SUB2, SUB2'nin içinde de SUB3 tanımlı. Değişkenlere dikkat edin: A, B, C, E ve X birden çok yerde tanımlanmış.",
    "Çağrı sırası şöyle: MAIN_2, BIGSUB'ı; BIGSUB, SUB2'yi; SUB2, SUB3'ü; SUB3 de SUB1'i çağırıyor. Bir numaralı konumdayken, yani SUB1 çalışırken yığıt böyle görünür.",
    "Dinamik bağlar çağrı sırasını izler: her kayıt, kendisini çağıranın kaydını gösterir. SUB1, SUB3'ü; SUB3, SUB2'yi; SUB2, BIGSUB'ı gösterir.",
    "Statik bağlar ise program metnindeki iç içe yapıyı izler. SUB1, BIGSUB'ın içinde tanımlı olduğu için onun statik bağı, onu çağıran SUB3'ü değil, doğrudan BIGSUB'ı gösterir. SUB3 SUB2'nin, SUB2 BIGSUB'ın, BIGSUB da MAIN_2'nin içinde tanımlı olduğu için statik bağları onları gösterir.",
    "Şimdi SUB1'deki A eşittir B artı C deyimine bakalım. A, SUB1'in kendi değişkeni: sıfır, üç. B ve C ise SUB1'de yok; statik zincirde bir adım gidip BIGSUB'ta buluruz: B bir, dört; C bir, beş. Dikkat: SUB3'te de bir C var, ama SUB1 SUB3'ün içinde tanımlı olmadığı için o C görünmez. Benzer şekilde SUB3'teki E eşittir B artı A deyiminde E sıfır, dört; B bir, dört; A ise iki, üç olur. SUB2'de D'ye erişmek ise hatadır, çünkü D yalnızca SUB1'de tanımlıdır.",
  ],
},
{
  id: "chain-eval", ch: "9.4 İç içe altprogramlar", chip: "Statik zincirin kurulması, değerlendirilmesi ve ekranlar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Statik zincir mi, <em>ekran</em> mı?</h2>
    <div class="grid2" style="gap:30px">
      <div class="col">
        <div class="card r" data-s="1" style="padding:20px 26px"><h3 style="font-size:27px">Çağrıda statik bağ nasıl kurulur?</h3><p style="font-size:21px;line-height:1.6">Dinamik bağ → eski yığıt tepesi. Statik bağ → statik ebeveynin <b>en son</b> kaydı.<br><b>Yol 1:</b> dinamik zincirde ara: kolay ama yavaş.<br><b>Yol 2:</b> derleyici aradaki derinlik farkını hesaplar; çalışırken o kadar adım gidilir. (SUB3 → SUB1: 2 adım)</p></div>
        <div class="card tint-c r" data-s="2" style="padding:20px 26px"><h3 class="cl" style="font-size:27px">Sorunlar</h3><p style="font-size:21px">Derinlik arttıkça yerel olmayan erişim <b>yavaşlar</b>. Erişim süreleri <b>eşit değil</b>: zamana duyarlı programlar zorlaşır.</p></div>
      </div>
      <div class="col">
        <div class="card tint-t r" data-s="3" style="padding:20px 26px"><h3 class="tl" style="font-size:27px">2. teknik: ekranlar (displays)</h3><p style="font-size:21px">Statik bağları ayrı bir diziye, <b>ekrana</b> koy. ekran[k] = derinlik k'deki etkin kayıt. Referans: <span class="mono">(ekran_bağılkonum, yerel_bağılkonum)</span>; erişim her zaman <b>tek adım</b>.</p></div>
        <div class="row r" data-s="4" style="gap:30px;align-items:flex-end;justify-content:center">
          <div class="col" style="gap:6px;width:260px">${["SUB3", "SUB2", "BIGSUB", "MAIN_3"].map((t, i) => `<div class="box" style="height:52px;font-size:21px;border-color:var(--${i ? "violet" : "amber"})">${t} ARI</div>`).join("")}<div style="text-align:center;font-size:19px;color:var(--faint)">yığıt</div></div>
          <div class="col" style="gap:6px;width:200px">${[["3", "→ SUB3"], ["2", "→ SUB2"], ["1", "→ BIGSUB"], ["0", "→ MAIN_3"]].map(([k, t], i) => `<div class="box" style="height:52px;font-size:20px;flex-direction:row;gap:12px;border-color:var(--${i ? "teal" : "amber"})"><span class="mono hl">${k}</span>${t}</div>`).join("")}<div style="text-align:center;font-size:19px;color:var(--faint)">ekran</div></div>
        </div>
        <div class="note r" data-s="5" style="font-size:20px">Derinliği k olan P çağrılınca: ekran[k]'nın eski değeri P'nin kaydına <b>saklanır</b>, ekran[k] = P'nin kaydı; dönüşte eski değer geri yüklenir.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Statik zincir nasıl kurulur ve ne kadar verimlidir?",
    "Bir altprogram çağrıldığında yeni kaydın dinamik bağı eski yığıt tepesini gösterir. Statik bağ ise statik ebeveynin en son oluşturulmuş kaydını göstermelidir. Bunu bulmanın iki yolu var: dinamik zincirde geriye doğru aramak kolaydır ama yavaştır. Daha iyisi, derleyicinin çağıran ile çağrılanın tanımlandığı yer arasındaki derinlik farkını hesaplamasıdır. Örneğin SUB3, SUB1'i çağırırken derleyici iki adım gidileceğini bilir ve çalışma zamanında statik bağ buna göre kurulur.",
    "Statik zincirin iki sorunu var. Yerel olmayan referanslar, özellikle iç içe derinlik büyükse, yavaş çalışır. Ayrıca farklı değişkenlere erişim süreleri eşit olmadığı için, zamana duyarlı programlar yazmak zorlaşır ve kodu değiştirmek bu zamanlamayı da değiştirir.",
    "İkinci teknik ekranlardır. Fikir şu: statik bağları kayıtların içinde değil, ekran denilen ayrı bir dizide tutmak. Ekranın k'ıncı elemanı, statik derinliği k olan etkin altprogramın kaydını gösterir. Bir referans artık ekran bağıl konumu ve yerel bağıl konum çiftiyle gösterilir ve erişim her zaman tek adımdır: ekrandan kaydı al, kayıtta konuma git.",
    "Örneğin MAIN_3'te SUB2, SUB3'ü çağırdıktan sonra ekranın sıfırıncı elemanı MAIN_3'ü, birincisi BIGSUB'ı, ikincisi SUB2'yi, üçüncüsü SUB3'ü gösterir. Çalışan altprogramın derinliği k ise ekranda k artı bir işaretçi vardır.",
    "Ekranın güncellenmesi basittir: derinliği k olan bir altprogram çağrıldığında, ekranın k'ıncı elemanının eski değeri yeni kayda saklanır ve yerine yeni kaydın adresi yazılır. Altprogram döndüğünde eski değer geri yüklenir.",
  ],
},
{
  id: "blocks", ch: "9.5 Bloklar", chip: "Bloklar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bloklar: <em>parametresiz altprogram</em> gibi</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:620px;gap:16px">
        <div class="r" data-s="0">${code("blok.c", ["{  int temp;", "   temp = list[upper];", "   list[upper] = list[lower];", "   list[lower] = temp;", "}"], { lang: "c", cls: "sm" })}</div>
        <div class="card r" data-s="1" style="padding:16px 22px"><p style="font-size:21px"><b>temp</b>'in ömrü bloğa girişte başlar. Aynı isimli başka bir değişkenle <b>çakışmaz</b>.</p></div>
        <div class="card r" data-s="2" style="padding:16px 22px"><p style="font-size:21px"><b>Yol 1:</b> bloğu her zaman aynı yerden çağrılan parametresiz bir altprogram gibi ele al: her girişte kendi kaydı.<br><b>Yol 2 (yaygın):</b> gereken en büyük alan statik olarak bilinir; kaydın yerel değişkenlerinden sonra ayrılır.</p></div>
      </div>
      <div class="col f1" style="gap:14px">
        <div class="r" data-s="3">${code("MAIN_5", ["MAIN_5() {  int x, y, z;", "   while (...) {  int a, b, c;", "      while (...) {  int d, e;  }", "   }", "   while (...) {  int f, g;  }", "}"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="4" style="display:flex;flex-direction:column-reverse;gap:4px;width:460px">
          ${[["x", "teal"], ["y", "teal"], ["z", "teal"], ["a  ve  f", "amber"], ["b  ve  g", "amber"], ["c", "violet"], ["d", "violet"], ["e", "violet"]].map(([t, c]) => `<div class="box mono" style="height:44px;font-size:22px;border-color:var(--${c})">${t}</div>`).join("")}
        </div>
        <div class="r" data-s="4" style="font-size:20px;color:var(--muted)">İki while bloğu aynı anda etkin olmaz → <b style="color:var(--amber)">a/f</b> ve <b style="color:var(--amber)">b/g</b> aynı yeri paylaşır.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 9.5: Bloklar. Bloklar, değişkenler için programcının belirlediği yerel kapsamlardır. Bu C bloğunda temp, iki dizi elemanını takas etmek için kullanılıyor.",
    "temp'in ömrü denetim bloğa girdiğinde başlar ve çıkınca biter. Blok kullanmanın avantajı, temp'in programdaki aynı isimli başka bir değişkenle çakışmamasıdır.",
    "Bloklar iki şekilde gerçekleştirilebilir. Birincisi, bloğu her zaman aynı yerden çağrılan, parametresiz bir altprogram gibi ele almaktır; her girişte bloğun kendi etkinlik kaydı oluşturulur. Daha yaygın olan ikinci yolda ise, bir bloğun ihtiyaç duyacağı en büyük alan derleme zamanında bilinebildiği için, bu alan altprogramın kaydında yerel değişkenlerden hemen sonra ayrılır.",
    "Bu örnekte MAIN_5'in kendi değişkenleri x, y ve z. İlk while bloğunda a, b, c; onun içindeki blokta d ve e; ikinci while bloğunda f ve g var.",
    "İkinci yolla kayıt şöyle olur: x, y, z'den sonra blok değişkenleri gelir. İki while bloğu hiçbir zaman aynı anda etkin olmadığı için, a ile f ve b ile g aynı bellek yerlerini paylaşabilir. Böylece kayıt gereğinden büyük olmaz.",
  ],
},
{
  id: "dynamic-scope", ch: "9.6 Dinamik kapsam", chip: "Dinamik kapsamın uygulanması",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Dinamik kapsam: <em>derin mi, sığ mı erişim?</em></h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:470px;gap:14px">
        <div class="r" data-s="0">${code("MAIN_6", ["program MAIN_6;  integer v, u;", "procedure A;  integer v, w;", "procedure B;  integer w, x;", "procedure C;  integer x, z;", { t: "   x := u + v;", hot: "1,2,3" }], { lang: "pascal", cls: "xs" })}</div>
        <div class="r" data-s="0" style="font-size:21px;color:var(--muted)">Çağrılar: MAIN_6 → A → A → B → C</div>
        <div class="card r" data-s="4" style="padding:16px 20px"><p style="font-size:20px"><b>Derin:</b> kayıtlar değişken <b>isimlerini</b> taşımalı; zincir uzunluğu önceden bilinemez.<br><b>Sığ:</b> erişim hızlı, ama çağrı ve dönüşte yığıtların bakımı maliyetli.</p></div>
      </div>
      <div class="col f1" style="gap:14px">
        <div class="card tint-a r" data-s="1" style="padding:16px 22px"><h3 class="hl" style="font-size:26px">Derin erişim</h3><p style="font-size:20px">C'de <span class="mono">v</span>'yi bul: <b>dinamik zincirde</b> geri ara.</p>
          <div class="row" style="gap:8px;margin-top:10px;font-size:20px;align-items:center;flex-wrap:wrap">${[["C: x z", 0], ["B: w x", 0], ["A: v w", 1], ["A: v w", 0], ["MAIN_6: v u", 0]].map(([t, hit], i) => `${i ? '<span class="arrow" style="font-size:24px">→</span>' : ""}<span class="pill${hit ? " a" : ""}" style="font-size:19px">${t}</span>`).join("")}</div>
          <p style="font-size:19px;margin-top:8px">v ilk olarak en son A'da bulunur; u ise ancak MAIN_6'da.</p></div>
        <div class="card tint-t r" data-s="2" style="padding:16px 22px"><h3 class="tl" style="font-size:26px">Sığ erişim</h3><p style="font-size:20px">Her değişken <b>ismi için bir yığıt</b>: tepedeki her zaman geçerli olan.</p>
          <div class="row" style="gap:14px;margin-top:10px;align-items:flex-end">${[["u", ["MAIN_6"]], ["v", ["MAIN_6", "A", "A"]], ["w", ["A", "A", "B"]], ["x", ["B", "C"]], ["z", ["C"]]].map(([n, st]) => `<div class="col" style="gap:3px;width:118px">${[...st].reverse().map((t, i) => `<div class="box" style="height:36px;font-size:17px;${i === 0 ? "border-color:var(--amber);color:var(--amber)" : ""}">${t}</div>`).join("")}<div class="mono" style="text-align:center;font-size:24px;color:var(--teal)">${n}</div></div>`).join("")}</div></div>
        <div class="note r" data-s="3" style="font-size:20px">Alternatif: her isim için bir girdi içeren <b>merkezi tablo</b>. Çağrıda yerel değişkenler yığıtlara itilir, dönüşte çekilir.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 9.6: Dinamik kapsamın uygulanması. Beşinci bölümde dinamik kapsamda yerel olmayan bir ismin çağrı sırasına göre çözüldüğünü görmüştük. Bunu gerçekleştirmenin iki yolu var. Örneğimizde MAIN_6, A'yı; A kendini; sonra B'yi; B de C'yi çağırıyor. C'de x eşittir u artı v deyimi çalışıyor.",
    "Birinci yol derin erişimdir. Yerel olmayan bir referans, dinamik zincirdeki kayıtlar sırayla aranarak bulunur. v için önce C'ye, sonra B'ye bakılır; ikisinde de yok. Sonra en son çağrılan A'da v bulunur. u ise ancak zincirin sonunda, MAIN_6'da bulunur.",
    "İkinci yol sığ erişimdir. Burada yerel değişkenler kayıtlarda değil, merkezi bir yerde tutulur: her değişken ismi için ayrı bir yığıt vardır. Bir altprogram çağrıldığında yerel değişkenleri ilgili yığıtlara itilir, dönüşte çekilir. Böylece her yığıtın tepesindeki, o isim için o anda geçerli olan değişkendir. C çalışırken v yığıtının tepesinde A'nın v'si var; erişim tek adımdır.",
    "Bir başka seçenek, her değişken ismi için bir girdi içeren merkezi bir tablo tutmaktır.",
    "Karşılaştıralım: derin erişimde zincirin uzunluğu önceden bilinemez ve her kayıt, aranabilmesi için değişkenlerin isimlerini de taşımak zorundadır. Sığ erişimde değişkene erişim çok hızlıdır, ama her çağrı ve dönüşte yığıtların güncellenmesi maliyetlidir.",
  ],
},
{
  id: "overflow", ch: "9.7 Arabellek aşımı", chip: "Arabellek aşımı saldırısı (buffer overflow)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Yığıt bilgisi <em>güvenlik</em> demek</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px;gap:16px">
        <div class="r" data-s="0">${code("tasma.c", ["void main() {", "   char bufferA[256];", "   myFunction(bufferA);", "}", "void myFunction(char *str) {", "   char bufferB[16];", { t: "   strcpy(bufferB, str);   // sınır kontrolü YOK", hot: "2,3" }, "}"], { lang: "c", cls: "xs" })}</div>
        <div class="card tint-t r" data-s="5" style="padding:16px 22px"><h3 class="tl" style="font-size:25px">Çözüm: sınırı kontrol et</h3>${code("guvenli.c", ["void myFunction(char *str, int len) {", "   char bufferB[16];", "   if (len <= 16) strcpy(bufferB, str);", "}"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col f1" style="gap:14px">
        <div class="r" data-s="1" style="width:600px">
          <div style="font-size:19px;color:var(--faint);margin-bottom:6px">myFunction'ın yığıt içeriği</div>
          ${[["bufferB [16]", "teal", 2], ["işletim sistemi verisi", "line", 3], ["dinamik bağ", "line", 3], ["main'e dönüş adresi", "coral", 3], ["str", "line", 3], ["bufferA [256]  (main)", "teal", 0]].map(([t, c, s]) => `<div class="stack" style="margin-top:4px"><div class="box" style="height:64px;font-size:23px;border-color:var(--${c})">${t}</div>${s ? `<div class="box r" data-s="${s}" style="height:64px;font-size:23px;background:#4a1f2c;border-color:var(--coral);color:#fff">${s === 2 ? "AAAAAAAAAAAAAAAA" : t === "main'e dönüş adresi" ? "→ KÖTÜ KOD adresi!" : "AAAAAAAA…"}</div>` : ""}</div>`).join("")}
        </div>
        <div class="note r" data-s="4" style="font-size:21px">Fonksiyon dönerken bozulmuş adrese atlar: saldırganın yerleştirdiği <b>zararlı kod</b> çalışır. C'de çoğu kopyalama <b>sınır testi</b> yapmaz.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 9.7: Arabellek aşımı saldırısı. Bu bölümde öğrendiklerimiz yalnızca teori değil; güvenlik açısından da çok önemli. Arabellek, verilerin geçici olarak tutulduğu belirli boyutta bir bellek alanıdır. Bu örnekte main, iki yüz elli altı baytlık bir diziyi myFunction'a gönderiyor; myFunction ise onu yalnızca on altı baytlık bir diziye strcpy ile kopyalıyor.",
    "myFunction çalışırken yığıtı düşünelim: en üstte on altı baytlık bufferB; altında işletim sistemi verileri, dinamik bağ, main'e dönüş adresi ve str parametresi; daha aşağıda main'in kaydındaki bufferA.",
    "strcpy, hedefin büyüklüğünü kontrol etmez. İlk on altı bayt bufferB'yi doldurur.",
    "Ama kopyalama durmaz: fazla veri, bufferB'nin hemen arkasındaki alanların üzerine yazılır: dinamik bağ, str ve en önemlisi dönüş adresi. Kaynak dizgi dikkatlice hazırlanırsa, dönüş adresinin yerine saldırganın seçtiği bir adres yazılabilir.",
    "Fonksiyon bittiğinde sistem, dönüş adresine güvenerek oraya atlar ve saldırganın yerleştirdiği zararlı kod çalışmaya başlar. Bu, uzun yıllar boyunca en yaygın saldırı türlerinden biri oldu. Kökü, C gibi dillerde kopyalama işlemlerinin sınır testi yapmamasıdır.",
    "Çözüm, uzunluğu da göndermek ve kopyalamadan önce sınırı kontrol etmektir. Java ve C# gibi diller dizi sınırlarını otomatik olarak denetlediği için bu tür hatalara karşı çok daha dayanıklıdır; bu da dil tasarımının güvenliği nasıl etkilediğinin güzel bir örneğidir.",
  ],
},
// ───────── summary / quiz / outro
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="zoom:1.2">
      ${[["📦", "t", "Basit altprogramlar", "Statik etkinlik kaydı: hızlı ama tek örnek, özyineleme yok."], ["📚", "a", "Yığıt-dinamik", "Her çağrıya kayıt: yereller, parametreler, dinamik bağ, statik bağ, dönüş adresi."],
         ["🔗", "v", "İç içe altprogramlar", "Statik zincir: (zincir, yerel) çifti. Ekran: tek adımda erişim. Bloklar kayıtta yer paylaşır."], ["🛡️", "c", "Dinamik kapsam ve güvenlik", "Derin erişim ya da sığ erişim. Sınırsız kopyalama dönüş adresini bozabilir."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "Basit altprogramlarda etkinlik kayıtları statik bellektedir; erişim hızlıdır ama her altprogramın tek bir örneği olduğu için özyineleme desteklenemez.",
    "Yığıt-dinamik yerel değişkenlerde her çağrı için yığıtta bir etkinlik kaydı oluşturulur: yerel değişkenler, parametreler, dinamik bağ, statik bağ ve dönüş adresi. Özyineleme bu sayede mümkündür.",
    "İç içe altprogramlarda yerel olmayan değişkenler statik zincirle bulunur ve her referans bir zincir bağıl konumu ile yerel bağıl konum çiftiyle gösterilir. Ekranlar bu erişimi tek adıma indirir. Bloklar ise kayıtta yer paylaşarak gerçekleştirilebilir.",
    "Dinamik kapsam, derin erişim ya da sığ erişimle uygulanır. Son olarak gördük ki yığıtın düzenini bilmek güvenlik için de önemlidir: sınır kontrolü yapılmayan bir kopyalama, dönüş adresini bozarak saldırıya yol açabilir.",
  ],
},
{
  id: "quiz", ch: "Özet ve mini test", chip: "Mini test",
  html: (() => {
    const quiz = [["Basit (statik) etkinlik kayıtları neden özyinelemeyi desteklemez?", "Her altprogramın tek bir kaydı var; yeni çağrı eskisinin üzerine yazar."], ["Dinamik bağ ile statik bağ arasındaki fark nedir?", "Dinamik: çağıranın kaydı. Statik: tanımlandığı statik ebeveynin kaydı."], ["Derinliği 2 olan bir altprogram, derinliği 0 olan main'deki 1. yerel değişkeni kullanıyor. Çift nedir?", "(2, 3) — iki adım geri, 3. konum."], ["Ekranların statik zincire göre avantajı nedir?", "Yerel olmayan her erişim tek adımdır; derinlikten bağımsız."], ["Arabellek aşımı saldırısında saldırgan neyi hedefler?", "Yığıttaki dönüş adresini bozup zararlı koda atlatmayı."]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kendini <em>test et</em> <span class="emo">🧠</span></h2>
    <div class="stack" style="flex:1">
      ${quiz.map(([q, a], i) => `
      <div class="col r" data-s="${1 + i * 2}" data-h="${3 + i * 2}" style="gap:34px">
        <div class="card" style="padding:44px 50px"><div class="mono" style="color:var(--amber);font-size:28px;margin-bottom:16px">SORU ${i + 1} / ${quiz.length}</div>
          <div style="font-size:44px;font-weight:600;line-height:1.35">${q}</div></div>
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
    { t: "Soru 1. Basit, yani statik etkinlik kayıtları neden özyinelemeyi desteklemez?", pause: 3.5 }, "Cevap: Her altprogramın tek bir kaydı vardır; altprogram kendini çağırırsa yeni çağrı eskisinin parametrelerinin ve dönüş adresinin üzerine yazar.",
    { t: "Soru 2. Dinamik bağ ile statik bağ arasındaki fark nedir?", pause: 3.5 }, "Cevap: Dinamik bağ, altprogramı çağıranın kaydını gösterir. Statik bağ ise altprogramın program metninde içinde tanımlandığı statik ebeveyninin kaydını gösterir.",
    { t: "Soru 3. Statik derinliği iki olan bir altprogram, derinliği sıfır olan main'in birinci yerel değişkenini kullanıyor. Referans çifti nedir?", pause: 3.5 }, "Cevap: İki, üç. Statik zincirde iki adım geri gidilir ve kaydın üç numaralı konumuna bakılır.",
    { t: "Soru 4. Ekranların statik zincire göre avantajı nedir?", pause: 3.5 }, "Cevap: Yerel olmayan her erişim, iç içe derinlik ne olursa olsun tek adımda yapılır.",
    { t: "Soru 5. Arabellek aşımı saldırısında saldırgan neyi hedefler?", pause: 3.5 }, "Cevap: Yığıttaki dönüş adresini bozarak, fonksiyon döndüğünde kendi yerleştirdiği zararlı koda atlanmasını sağlamayı.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 9 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Sıradaki: <b style="color:var(--text)">Bölüm 10 — Program ayrıştırma</b></div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta · Watt · Scott · Z. Orhan · M. Şahin · Ahmet Yesevi Üniversitesi · D. Evans · J. Mitchell</div>
  </div>`,
  n: [
    "Bölüm 9'u tamamladık! Bir sonraki bölümde büyük programların modüllere nasıl ayrıştırıldığını, soyutlamayı, bilgi saklamayı ve ayrı derlemeyi inceleyeceğiz.",
    "Pratik için, main'den başlayan küçük bir çağrı zinciri çizin ve her adımda yığıtın, dinamik ve statik bağların nasıl göründüğünü kâğıt üzerinde gösterin. İzlediğiniz için teşekkürler, görüşmek üzere!",
  ],
},
];
