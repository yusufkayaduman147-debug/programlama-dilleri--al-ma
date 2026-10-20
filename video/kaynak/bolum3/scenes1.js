const { code } = require("../build/lib");
const { nt, tree, deriv, grammar } = require("./h");

module.exports = [
{
  id: "intro", ch: "Giriş", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r" data-s="1" style="display:flex;gap:40px;margin-bottom:56px;align-items:center">
      <div class="card" style="padding:24px 40px;text-align:center"><div class="mono" style="font-size:40px;color:var(--teal)">a = b + 1;</div><div style="font-size:24px;color:var(--muted);margin-top:8px">biçim · <b style="color:var(--teal)">sentaks</b></div></div>
      <span style="font-size:50px;color:var(--faint)">→</span>
      <div class="card" style="padding:24px 40px;text-align:center"><div class="mono" style="font-size:40px;color:var(--amber)">a ← b + 1</div><div style="font-size:24px;color:var(--muted);margin-top:8px">anlam · <b style="color:var(--amber)">semantik</b></div></div>
    </div>
    <div class="r" data-s="0" style="font-family:JBM;color:var(--amber);font-size:30px;letter-spacing:.2em">PROGRAMLAMA DİLLERİ</div>
    <div class="r big" data-s="0" style="font-size:116px;line-height:1.05;margin:18px 0 26px;text-align:center">Bölüm 3: Sentaks ve<br>Semantiği Tanımlama</div>
  </div>`,
  n: [
    "Merhaba! Programlama Dilleri dersinin üçüncü bölümüne hoş geldiniz.",
    "Bu bölümde bir programlama dilinin nasıl kesin ve açık biçimde tanımlandığını öğreneceğiz. Önce dilin biçimini, yani sentaksını; sonra anlamını, yani semantiğini tanımlamanın yollarını göreceğiz. Bu bölüm biraz teknik; o yüzden her kavramı adım adım, örneklerle ilerleteceğiz.",
  ],
},
{
  id: "roadmap", ch: "Giriş", chip: "Yol haritası",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bu bölümde <em>neler var?</em></h2>
    <div class="col" style="gap:22px;margin-top:10px">
      ${["Giriş: sentaks ve semantik", "Genel sentaks tanımlama problemi", "Sentaks tanımlamanın biçimsel yöntemleri: BNF, EBNF", "Özellik (attribute) gramerleri", "Programların anlamını açıklamak: dinamik semantik"]
        .map((t, i) => `<div class="r rl" data-s="${i < 3 ? 1 : 2}" style="display:flex;align-items:center;gap:28px;transition-delay:${(i % 3) * 0.15}s">
          <span class="mono" style="font-size:34px;font-weight:700;color:var(--amber);background:rgba(255,181,71,.12);border-radius:16px;width:96px;height:72px;display:flex;align-items:center;justify-content:center">3.${i + 1}</span>
          <span style="font-size:38px;font-weight:600">${t}</span></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Yol haritamıza bakalım.",
    "Önce sentaks ile semantiğin farkını göreceğiz. Sonra sentaksı tanımlamanın genel problemine ve biçimsel yöntemlere, yani BNF ve EBNF'e geçeceğiz.",
    "Ardından sentaksın yetmediği yerde devreye giren özellik gramerlerini, son olarak da programların anlamını tanımlayan üç yaklaşımı inceleyeceğiz: işlemsel, aksiyomatik ve denotasyonel semantik.",
  ],
},
// ───────── 3.1
{
  id: "syn-sem", ch: "3.1 Giriş", chip: "<b>3.1</b> Sentaks ve semantik",
  html: `
  <div class="wrap">
    <div class="grid2" style="margin-bottom:30px">
      <div class="card tint-t r" data-s="0"><h3 class="tl">Sentaks (sözdizimi)</h3><p>İfadelerin, deyimlerin ve program birimlerinin <b>biçimi</b> ya da yapısı.</p><p style="margin-top:10px;font-size:25px">Örnek kural: her deyim <b>noktalı virgülle</b> biter.</p></div>
      <div class="card tint-a r" data-s="0" style="transition-delay:.2s"><h3 class="hl">Semantik (anlam)</h3><p>Bu ifadelerin, deyimlerin ve birimlerin <b>anlamı</b>.</p><p style="margin-top:10px;font-size:25px">Örnek kural: değişken kullanılmadan önce <b>tanımlanmalı</b>.</p></div>
    </div>
    <div class="row" style="flex:1;gap:30px">
      <div class="card r" data-s="1" style="flex:1"><h3>Aynı biçim, farklı anlam</h3><p>Tarih biçimi: <span class="mono hl">gg.aa.yyyy</span></p>
        <div class="mono big" style="font-size:66px;text-align:center;margin:18px 0">03.04.2025</div>
        <div class="grid2" style="gap:14px"><div style="text-align:center;font-size:26px">🇹🇷 3 Nisan</div><div style="text-align:center;font-size:26px">🇺🇸 (aa.gg) 4 Mart</div></div></div>
      <div class="card r" data-s="2" style="flex:1.2"><h3>Küçük sentaks farkı, büyük anlam farkı</h3>
        <div class="grid2" style="gap:16px;margin-top:10px">${code("A", ["while (i < 10)", "  { a[i] = ++i; }"], { lang: "c", cls: "xs" })}${code("B", ["while (i < 10)", "  { a[i] = i++; }"], { lang: "c", cls: "xs" })}</div>
        <p style="margin-top:14px;font-size:25px">Tek fark <span class="mono hl">++</span>'nın yeri — ama diziye yazılan değerler farklı!</p></div>
    </div>
  </div>`,
  n: [
    "Bölüm 3.1: Giriş. Her programlama dilinde, geçerli programları belirleyen kurallar vardır ve bu kurallar ikiye ayrılır. Sentaks, yani sözdizimi, ifadelerin ve program birimlerinin biçimidir; örneğin her deyimin noktalı virgülle bitmesi bir sentaks kuralıdır. Semantik ise bu yapıların anlamıdır; örneğin bir değişkenin kullanılmadan önce tanımlanması bir semantik kuralıdır.",
    "Farkı günlük hayattan bir örnekle görelim. Tarih gün nokta ay nokta yıl biçiminde yazılsın. 03.04.2025 yazısının biçimi her yerde aynıdır; ama Türkiye'de 3 Nisan, ay-gün sırası kullanan Amerika'da ise 4 Mart anlamına gelir. Biçim aynı, anlam farklı.",
    "Programlarda da küçük bir sentaks farkı büyük bir anlam farkı yaratabilir. Bu iki döngüde tek fark artı artı işaretinin yeri. Ama birincisinde i önce artırılıp yazılır, ikincisinde eski değer yazılır; dolayısıyla diziye farklı değerler kaydedilir.",
  ],
},
{
  id: "abstract-syntax", ch: "3.1 Giriş", chip: "<b>3.1</b> Soyut sözdizim",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Soyut sözdizim: <em>gösterimden bağımsız</em> yapı</h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:620px">
        ${[["+ab", "prefix"], ["a+b", "infix"], ["ab+", "postfix"]].map(([e, n], i) => `<div class="card r rl" data-s="0" style="display:flex;align-items:center;gap:30px;padding:22px 30px;transition-delay:${i * 0.2}s"><span class="mono" style="font-size:48px;width:180px">${e}</span><span style="font-size:28px;color:var(--muted)">${n}</span></div>`).join("")}
        <p class="lead r" data-s="1" style="font-size:28px;margin-top:10px">Üçünün de anlamlı bileşenleri aynı: <b>+ işlemcisi</b> ve <b>a, b</b> işlenenleri → aynı <b>soyut sözdizim ağacı</b>.</p>
      </div>
      <div class="col f1" style="align-items:center">
        <div class="r" data-s="1" style="width:420px;height:260px">${tree({ t: "+", c: ["a", "b"] }, { s: 1, dx: 160, fs: 32 })}</div>
        <div class="r" data-s="2" style="width:100%;height:330px">${tree({ t: "if-then-else", c: [{ t: "<=", c: ["a", "b"] }, "a", "b"] }, { s: 2, dx: 150, fs: 28 })}</div>
        <div class="mono r" data-s="2" style="font-size:30px;color:var(--muted)">if a &lt;= b then a else b</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bir dilin soyut sözdizimi, her yapıdaki anlamlı bileşenleri tanımlar. Bakın: artı a b önek, a artı b araek, a b artı ise sonek gösterimidir.",
    "Üçünde de anlamlı bileşenler aynıdır: bir artı işlemcisi ve a ile b işlenenleri. Bu yüzden üçü de aynı ağaçla gösterilir. İşlemci ve işlenen yapısını, yazılış biçiminden bağımsız gösteren bu ağaçlara soyut sözdizim ağaçları denir.",
    "Bu fikir diğer yapılara da genişletilebilir. Örneğin if a küçük eşit b then a else b ifadesi, üç çocuklu bir if düğümüyle gösterilir: koşul, then kolu ve else kolu.",
  ],
},
{
  id: "lexemes", ch: "3.2 Genel sentaks tanımlama problemi", chip: "<b>3.2</b> Lexeme ve token",
  html: (() => {
    const rows = [["index", "tanıtıcı (identifier)"], ["=", "eşittir işareti"], ["2", "tam sayı sabiti"], ["*", "çarpma operatörü"], ["count", "tanıtıcı (identifier)"], ["+", "toplama operatörü"], ["17", "tam sayı sabiti"], [";", "noktalı virgül"]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Lexeme ve <em>token</em></h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:720px">
        <div class="card r" data-s="0" style="padding:24px 30px"><p><b>Cümle:</b> alfabedeki karakterlerden oluşan dizi. <b>Dil:</b> cümleler kümesi.</p></div>
        <div class="card tint-t r" data-s="1" style="padding:24px 30px"><h3 class="tl" style="font-size:30px">Lexeme</h3><p>En alt düzey sözdizimsel birim: <span class="mono">*</span>, <span class="mono">sum</span>, <span class="mono">begin</span></p></div>
        <div class="card tint-v r" data-s="2" style="padding:24px 30px"><h3 class="vl" style="font-size:30px">Token</h3><p>Lexeme'lerin <b>kategorisi</b>: tanıtıcı token'ının lexeme'leri <span class="mono">toplam</span>, <span class="mono">sonuc</span>… Bazı token'ların tek lexeme'i vardır: <span class="mono">+</span></p></div>
        <p class="r" data-s="3" style="font-size:26px;color:var(--muted)">Boşluk, sekme, yeni satır token'lar arasında anlamı değiştirmez.</p>
      </div>
      <div class="f1 r" data-s="3">
        <div class="mono" style="font-size:38px;text-align:center;margin-bottom:18px">index = 2 * count + 17;</div>
        <table style="width:100%;border-collapse:collapse;font-size:27px">
          <tr style="color:var(--faint);font-size:22px"><td style="padding:6px 16px">Lexeme</td><td>Token</td></tr>
          ${rows.map(([l, t], i) => `<tr class="r rl" data-s="3" style="transition-delay:${i * 0.12}s;background:${i % 2 ? "transparent" : "rgba(255,255,255,.03)"}"><td class="mono" style="padding:9px 16px;color:var(--teal)">${l}</td><td style="color:var(--violet)">${t}</td></tr>`).join("")}
        </table>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 3.2: Genel sentaks tanımlama problemi. Önce terimleri netleştirelim. Bir cümle, herhangi bir alfabedeki karakterlerden oluşan bir dizidir. Bir dil ise cümlelerden oluşan bir kümedir.",
    "Lexeme, bir dilin en alt düzeydeki sözdizimsel birimidir: çarpı işareti, sum gibi bir isim ya da begin gibi bir anahtar kelime.",
    "Token ise lexeme'lerin bir kategorisidir. Örneğin tanıtıcı token'ının toplam, sonuc gibi pek çok lexeme'i olabilir. Bazı token'ların ise tek bir olası lexeme'i vardır; toplama operatörünün tek lexeme'i artı işaretidir.",
    "Şu C deyimine bakalım: index eşittir 2 çarpı count artı 17. Sözcüksel analiz bu satırı lexeme'lere ayırır ve her birinin token'ını belirler: index ve count tanıtıcı, 2 ve 17 tam sayı sabiti, diğerleri operatör ve noktalama. Lexeme'ler arasındaki boşlukların programın anlamına bir etkisi yoktur.",
  ],
},
{
  id: "errors", ch: "3.2 Genel sentaks tanımlama problemi", chip: "<b>3.2</b> Sözcüksel ve sözdizimsel hatalar",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Hangi hata <em>nerede</em> yakalanır?</h2>
    <div class="row" style="gap:20px;align-items:center;margin-bottom:30px" >
      ${[["Kaynak program", ""], ["Sözcüksel analiz", "teal"], ["Sözdizim analizi", "violet"], ["Anlamsal analiz", "amber"]].map(([t, c], i) => `${i ? '<span class="arrow r" data-s="0">→</span>' : ""}<div class="box r" data-s="0" style="flex:1;height:90px;${c ? `border-color:var(--${c})` : ""}">${t}</div>`).join("")}
    </div>
    <div class="grid3" style="flex:1">
      <div class="card r" data-s="1"><h3 class="tl">Sözcüksel (token) hataları</h3><div class="mono" style="font-size:30px;line-height:1.7;margin-top:10px">int x$y;<br>int 32xy;<br>x = x @ y;</div><p style="margin-top:12px;font-size:24px">Geçersiz karakter ya da kurala uymayan tanıtıcı.</p></div>
      <div class="card r" data-s="2"><h3 class="vl">Sözdizim hataları</h3><div class="mono" style="font-size:30px;line-height:1.7;margin-top:10px">X = ;<br>Y = x + ;<br>Z = [ ;</div><p style="margin-top:12px;font-size:24px">Token'lar geçerli, ama dizilişleri gramere uymuyor.</p></div>
      <div class="card r" data-s="3"><h3 class="hl">Anlamsal hatalar</h3><div class="mono" style="font-size:30px;line-height:1.7;margin-top:10px">int x;<br>x = "SHERRY";</div><p style="margin-top:12px;font-size:24px">Sözdizimi doğru, ama <b>tip uyumsuz</b> — sembol tablosu gerekir.</p></div>
    </div>
  </div>`,
  n: [
    "Bir derleyicide program önce sözcüksel analizden, sonra sözdizim analizinden, sonra da anlamsal analizden geçer. Her aşama farklı türde hataları yakalar.",
    "Sözcüksel hatalar, token düzeyindeki hatalardır: x dolar y gibi geçersiz bir karakter içeren isim, rakamla başlayan bir tanıtıcı ya da dilde olmayan bir et işareti operatörü.",
    "Sözdizim hatalarında ise her token tek başına geçerlidir, ama dizilişleri gramere uymaz: X eşittir noktalı virgül, ya da Y eşittir x artı noktalı virgül gibi yarım kalmış ifadeler.",
    "Anlamsal hatalarda sözdizimi tamamen doğrudur, ama anlam yanlıştır: int olarak tanımlanmış x'e bir metin atamak gibi. Bunu yakalamak için derleyicinin sembol tablosuna bakması gerekir.",
  ],
},
{
  id: "recognizers", ch: "3.2 Genel sentaks tanımlama problemi", chip: "<b>3.2</b> Dillerin biçimsel tanımı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bir dili tanımlamanın <em>iki yolu</em></h2>
    <div class="grid2" style="flex:1">
      <div class="card r" data-s="1" style="display:flex;flex-direction:column"><div class="ic t">🔍</div><h3>Tanıyıcı (recognizer)</h3><p>Girdi dizisini okur ve dile <b>ait olup olmadığına</b> karar verir.</p>
        <div style="display:flex;align-items:center;gap:16px;margin-top:auto;padding-top:30px;font-size:26px"><span class="pill mono">001110</span><span class="arrow">→</span><div class="box" style="width:200px;height:90px;border-color:var(--teal)">Tanıyıcı</div><span class="arrow">→</span><div class="col" style="gap:8px"><span class="pill t">✓ kabul</span><span class="pill c">✕ red</span></div></div>
        <p style="margin-top:20px;font-size:25px">Örnek: derleyicinin sözdizim analizcisi (sonlu otomat). Ayrıntısı Bölüm 4'te.</p></div>
      <div class="card r" data-s="2" style="display:flex;flex-direction:column"><div class="ic v">🏭</div><h3>Üreteç (generator)</h3><p>Dilin <b>cümlelerini üretir</b>. Bir cümlenin doğru olup olmadığı, üretecin yapısıyla karşılaştırılarak anlaşılır.</p>
        <div style="display:flex;align-items:center;gap:16px;margin-top:auto;padding-top:30px;font-size:26px"><div class="box" style="width:200px;height:90px;border-color:var(--violet)">Gramer</div><span class="arrow">→</span><div class="col" style="gap:8px;font-family:JBM;font-size:24px"><span>a = b + c</span><span>x = 1</span><span>b = b * 2</span><span style="color:var(--faint)">…</span></div></div>
        <p style="margin-top:20px;font-size:25px">Örnek: düzenli ifadeler, içerikten bağımsız gramerler.</p></div>
    </div>
  </div>`,
  n: [
    "Bir dili biçimsel olarak tanımlamanın iki yolu vardır.",
    "Birincisi tanıyıcıdır. Tanıyıcı, bir girdi dizisini okur ve bu dizinin dile ait olup olmadığına karar verir: kabul ya da red. Derleyicinin sözdizim analizcisi bir tanıyıcıdır. Bunu dördüncü bölümde ayrıntılı göreceğiz.",
    "İkincisi üreteçtir. Üreteç, dilin cümlelerini üreten bir mekanizmadır. Düzenli ifadeler ve içerikten bağımsız gramerler birer üreteçtir. Bu bölümde asıl odaklanacağımız araç, programlama dillerinin sentaksını tanımlamak için kullanılan gramerlerdir.",
  ],
},
// ───────── 3.3 BNF
{
  id: "bnf-origin", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> BNF ve içerikten bağımsız gramerler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İki kaynak, <em>tek fikir</em></h2>
    <div class="row" style="flex:1;gap:30px;align-items:stretch">
      <div class="card r" data-s="1" style="flex:1"><div class="ic v">🗣️</div><h3>Noam Chomsky · 1950'lerin ortası</h3><p>Doğal dillerin sentaksı için dil üreteçleri. <b>İçerikten bağımsız</b> (context-free) diller sınıfı:</p><div class="mono" style="font-size:40px;text-align:center;margin:18px 0;color:var(--violet)">A → γ</div><p style="font-size:25px">Neredeyse tüm programlama dillerinin temeli.</p></div>
      <div class="card r" data-s="2" style="flex:1"><div class="ic t">📜</div><h3>John Backus · 1959</h3><p>ALGOL 58'i tanımlamak için bir gösterim. <b>Peter Naur</b> ALGOL 60 için biraz değiştirdi → <b>Backus–Naur Formu (BNF)</b>.</p></div>
      <div class="card tint-a r" data-s="3" style="flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center"><div class="big" style="font-size:72px;color:var(--amber)">BNF ≡ CFG</div><p style="margin-top:16px">BNF, içerikten bağımsız gramerlerle <b>eşdeğerdir</b>. Başka bir dili tanımlayan bir <b>metadil</b>dir.</p></div>
    </div>
  </div>`,
  n: [
    "Bölüm 3.3: Sentaks tanımlamanın biçimsel yöntemleri. Bir dilin sözdizimini anlatmak için kullanılan dile metadil denir. Programlama dilleri için en çok bilinen metadil BNF'tir. Ama hikâyesi iki farklı kaynaktan gelir.",
    "Dilbilimci Noam Chomsky, ellilerin ortasında doğal dillerin sentaksını tanımlamak için dil üreteçleri üzerinde çalıştı ve içerikten bağımsız diller adı verilen bir sınıf tanımladı. Bu dillerde her kural, A ok gama biçimindedir: sol tarafta tek bir sembol, sağ tarafta bir sembol dizisi. Neredeyse bütün programlama dilleri bu sınıfa dayanır.",
    "Neredeyse aynı zamanda John Backus, ALGOL 58'i tanımlamak için bir gösterim icat etti. Peter Naur bu gösterimi ALGOL 60 için biraz değiştirdi ve ortaya Backus-Naur Formu, kısaca BNF çıktı.",
    "Sonradan anlaşıldı ki BNF ile içerikten bağımsız gramerler eşdeğerdir. BNF, başka bir dili tanımlamak için kullanılan bir metadildir.",
  ],
},
{
  id: "bnf-parts", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> BNF'in dört bileşeni",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">BNF'in <em>dört bileşeni</em></h2>
    <div class="grid2" style="gap:24px;margin-bottom:26px">
      <div class="card r" data-s="1" style="padding:24px 30px"><h3 style="font-size:30px"><span class="tl">1.</span> Terminal semboller</h3><p style="font-size:25px">Atomik birimler (lexeme/token): <span class="mono tl">+  *  if  &gt;=  begin</span></p></div>
      <div class="card r" data-s="2" style="padding:24px 30px"><h3 style="font-size:30px"><span class="vl">2.</span> Terminal olmayanlar</h3><p style="font-size:25px">Kurallarla tanımlanan soyutlamalar, <span class="mono">&lt; &gt;</span> içinde: ${nt("stmt")} ${nt("expr")}</p></div>
      <div class="card r" data-s="3" style="padding:24px 30px"><h3 style="font-size:30px"><span class="hl">3.</span> Kurallar (üretimler)</h3><p style="font-size:25px">Sol: tek terminal olmayan · <span class="mono hl">→</span> · Sağ: semboller dizisi. <span class="mono hl">|</span> = “veya”</p></div>
      <div class="card r" data-s="4" style="padding:24px 30px"><h3 style="font-size:30px"><span class="cl">4.</span> Başlangıç sembolü</h3><p style="font-size:25px">Dilin ana yapısını gösteren terminal olmayan, ör. ${nt("program")}</p></div>
    </div>
    <div class="row" style="gap:30px">
      <div class="f1 r" data-s="3">${grammar([["<if_stmt>", "if <logic_expr> then <stmt>"], ["<stmt>", "<single_stmt> | begin <stmt_list> end"]], 27)}</div>
      <div class="f1 r" data-s="5">${grammar([["<ident_list>", "ident | ident , <ident_list>"]], 27)}<p style="font-size:25px;color:var(--muted);margin-top:12px">Sol taraf sağda tekrar geçiyor → <b style="color:var(--amber)">özyinelemeli kural</b>: istenen uzunlukta liste.</p></div>
    </div>
  </div>`,
  n: [
    "BNF ile tanımlanan bir gramer dört bileşenden oluşur.",
    "Birincisi terminal sembollerdir: daha alt parçalara ayrılamayan atomik birimler, yani lexeme'ler ve token'lar. Artı, çarpı, if, büyük eşit ya da begin gibi.",
    "İkincisi terminal olmayan sembollerdir. Bunlar dilde doğrudan görünmez; kurallarla tanımlanan ara soyutlamalardır ve küçüktür, büyüktür işaretleri arasında yazılır: stmt, yani deyim; expr, yani ifade gibi.",
    "Üçüncüsü kurallardır. Her kuralın sol tarafında tek bir terminal olmayan, ardından bir ok, sağ tarafında ise terminal ve terminal olmayanlardan oluşan bir dizi bulunur. Bir terminal olmayanın birden çok tanımı varsa, bunlar dikey çizgiyle, yani veya ile ayrılır. Örneğin bir deyim, tek bir deyim ya da begin ile end arasında bir deyim listesi olabilir.",
    "Dördüncüsü başlangıç sembolüdür: dilin ana yapısını gösteren terminal olmayan, örneğin program.",
    "Bir önemli nokta daha: Sol taraftaki sembol sağ tarafta da geçiyorsa kural özyinelemelidir. Tanıtıcı listesi kuralı, ya tek bir tanıtıcı ya da bir tanıtıcı, virgül ve yine bir tanıtıcı listesi diyor. Böylece sonlu sayıda kuralla istenen uzunlukta listeler tanımlanabiliyor.",
  ],
},
{
  id: "derivation", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Türetme",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Bir cümleyi <em>türetmek</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:720px">
        <div class="r" data-s="0">${grammar([["<program>", "<stmts>"], ["<stmts>", "<stmt> | <stmt> ; <stmts>"], ["<stmt>", "<var> = <expr>"], ["<var>", "a | b | c | d"], ["<expr>", "<term> + <term> | <term> - <term>"], ["<term>", "<var> | const"]], 25)}</div>
        <div class="note r" data-s="8" style="font-size:26px">Her adımda <b>en soldaki</b> terminal olmayan açıldı → <b>sola dayalı (leftmost) türetme</b>.</div>
      </div>
      <div class="f1">
        ${deriv([["<program>", 1], ["<stmts>", 1], ["<stmt>", 2], ["<var> = <expr>", 2], ["a = <expr>", 3], ["a = <term> + <term>", 4], ["a = <var> + <term>", 5], ["a = b + <term>", 6], ["a = b + const", 7, "7,8"]], 31)}
      </div>
    </div>
  </div>`,
  n: [
    "Gramer kullanarak dildeki cümleleri üretebiliriz. Başlangıç sembolünden başlayıp kuralları sırayla uygulamaya türetme denir. Soldaki gramer, atama deyimlerinden oluşan küçük bir dili tanımlıyor. Şimdi a eşittir b artı const cümlesini türetelim.",
    "Başlangıç sembolü program. İlk kural program yerine stmts yazmamızı söylüyor.",
    "stmts, tek bir stmt olabilir. stmt ise var eşittir expr biçimindedir.",
    "En soldaki terminal olmayan var. Onu a ile değiştiriyoruz.",
    "Şimdi en soldaki expr. Onu term artı term ile açıyoruz.",
    "Soldaki term, bir var olsun.",
    "O var da b olsun.",
    "Son olarak kalan term, const olsun. Artık cümlede hiç terminal olmayan kalmadı; türetme bitti ve a eşittir b artı const cümlesini elde ettik.",
    "Dikkat edin: her adımda en soldaki terminal olmayanı açtık. Buna sola dayalı türetme denir. Farklı kurallar seçerek dildeki farklı cümleleri üretebiliriz.",
  ],
},
{
  id: "derivation-terms", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Türetme terimleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Türetmenin <em>dili</em></h2>
    <div class="grid2" style="gap:26px">
      <div class="card r" data-s="1"><h3>Cümlesel biçim</h3><p>Türetme sırasında oluşan her sembol dizisi: <span class="mono">a = ${nt("term")} + ${nt("term")}</span></p></div>
      <div class="card r" data-s="2"><h3>Cümle</h3><p>Sadece <b>terminal</b> içeren cümlesel biçim: <span class="mono tl">a = b + const</span></p></div>
      <div class="card r" data-s="3"><h3>Sola dayalı türetme</h3><p>Her adımda <b>en soldaki</b> terminal olmayan açılır.</p></div>
      <div class="card r" data-s="3" style="transition-delay:.2s"><h3>Sağa dayalı türetme</h3><p>Her adımda <b>en sağdaki</b> açılır. Türetme ikisi de olmayabilir.</p></div>
    </div>
    <div class="r" data-s="4" style="margin-top:28px;display:flex;align-items:center;gap:30px">
      <span style="font-size:30px;color:var(--muted)">Örnek:</span><span class="mono" style="font-size:40px;color:var(--amber)">a = b * (a + c)</span>
      <span style="font-size:28px;color:var(--muted)">→ 9 adımda türetilir:</span>
    </div>
    <div class="r" data-s="4" style="margin-top:14px">${code("sola dayalı türetme", ["<assign> ⇒ <id> = <expr> ⇒ a = <expr> ⇒ a = <id> * <expr> ⇒ a = b * <expr>", "⇒ a = b * ( <expr> ) ⇒ a = b * ( <id> + <expr> ) ⇒ a = b * ( a + <expr> )", "⇒ a = b * ( a + <id> ) ⇒ a = b * ( a + c )"], { lang: "plain", cls: "xs" })}</div>
  </div>`,
  n: [
    "Türetmeyle ilgili birkaç terimi netleştirelim.",
    "Türetme sırasında oluşan her sembol dizisine cümlesel biçim denir. Örneğin a eşittir term artı term bir cümlesel biçimdir.",
    "Yalnızca terminal semboller içeren cümlesel biçime ise cümle denir. a eşittir b artı const bir cümledir.",
    "Her adımda en soldaki terminal olmayanı açarsak sola dayalı, en sağdakini açarsak sağa dayalı türetme yapmış oluruz. Bir türetme bunların hiçbiri de olmayabilir.",
    "Biraz daha uzun bir örnek: a eşittir b çarpı parantez a artı c. Bu cümle, id, expr ve assign kurallarını içeren bir gramerle dokuz adımda sola dayalı olarak türetilir. Ekranda adımları takip edebilirsiniz; her adımda yine en soldaki terminal olmayan açılıyor.",
  ],
},
{
  id: "parse-tree", ch: "3.3 BNF ve gramerler", chip: "<b>3.3</b> Ayrıştırma ağacı",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Ayrıştırma ağacı: <em>türetmenin resmi</em></h2>
    <div class="row" style="flex:1;gap:30px">
      <div class="col" style="width:560px">
        <p class="lead r" data-s="0" style="font-size:29px">Türetmenin <b>hiyerarşik</b> gösterimi.</p>
        <ul class="b r" data-s="5"><li style="font-size:27px">İç düğümler: <b class="vl">terminal olmayanlar</b></li><li style="font-size:27px">Yapraklar: <b class="tl">terminaller</b></li><li style="font-size:27px">Yaprakları soldan sağa oku → <b>cümle</b></li></ul>
      </div>
      <div class="f1 r" data-s="0">${tree({ t: "<program>", s: 0, c: [{ t: "<stmts>", s: 1, c: [{ t: "<stmt>", s: 1, c: [{ t: "<var>", s: 2, c: [{ t: "a", s: 2 }] }, { t: "=", s: 2 }, { t: "<expr>", s: 3, c: [{ t: "<term>", s: 3, c: [{ t: "<var>", s: 4, c: [{ t: "b", s: 4 }] }] }, { t: "+", s: 3 }, { t: "<term>", s: 4, c: [{ t: "const", s: 4 }] }] }] }] }] }, { dx: 150, dy: 100, fs: 26, maxH: 700 })}</div>
    </div>
  </div>`,
  n: [
    "Gramerler, cümlelerin hiyerarşik yapısını da gösterebilir. Bu yapılara ayrıştırma ağacı denir. Az önce türettiğimiz a eşittir b artı const cümlesinin ağacını kuralım. Kökte başlangıç sembolü program var.",
    "program'dan stmts, ondan da stmt dalı çıkıyor.",
    "stmt üç çocuğa ayrılıyor: var, eşittir ve expr. var'ın altında a yaprağı var.",
    "expr de üç çocuğa ayrılıyor: term, artı ve term.",
    "Soldaki term, var üzerinden b'ye; sağdaki term ise const'a iniyor.",
    "Gördüğünüz gibi iç düğümler terminal olmayanlar, yapraklar ise terminallerdir. Yaprakları soldan sağa okuduğunuzda cümleyi elde edersiniz. Ayrıştırma ağaçları ve türetmeler birbirinden elde edilebilir.",
  ],
},
];
