const { code } = require("../build/lib");
const { tl, head } = require("./h");

module.exports = [
// ───────────────── 2.6 COBOL
{
  id: "cobol", ch: "2.6 Ticari kayıtlar: COBOL", chip: "<b>2.6</b> Ticari kayıtları bilgisayara uyarlamak: COBOL",
  html: `
  <div class="wrap">
    ${head("COBOL", "COmmon Business Oriented Language · 1960", "amber")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="0"><div class="ic a">👩‍💻</div><h3>Kökeni: FLOW-MATIC</h3><p><b>Grace Hopper</b>'ın UNIVAC dili: isimlerde tire, aritmetik için <b>İngilizce kelimeler</b>, veri ile kod tamamen ayrı, her ifade bir <b>fiille</b> başlar.</p></div>
        <div class="card r" data-s="1"><h3>Pentagon, Mayıs 1959</h3><ul class="b" style="margin-top:8px"><li style="font-size:26px">Basit <b>İngilizce</b> gibi görünmeli</li><li style="font-size:26px">Daha az güçlü olsa bile <b>kullanımı kolay</b></li><li style="font-size:26px">Bilgisayar kullanıcı tabanını genişletmeli</li></ul>
          <p style="margin-top:12px;font-size:25px">Komite: üreticiler + ABD Savunma Bakanlığı (DoD).</p></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("bordro.cbl", ["IDENTIFICATION DIVISION.", "PROGRAM-ID. BORDRO.", "DATA DIVISION.", "WORKING-STORAGE SECTION.", "01 MAAS      PIC 9(5)V99.", "01 PRIM      PIC 9(4)V99.", "01 TOPLAM    PIC 9(6)V99.", "PROCEDURE DIVISION.", { t: "    ADD MAAS TO PRIM GIVING TOPLAM.", hot: "2" }, "    DISPLAY TOPLAM.", "    STOP RUN."], { lang: "plain", cls: "xs" })}</div>
        <p class="lead r" data-s="2" style="font-size:26px">Veri ve işlem <b>ayrı bölümlerde</b>; ifadeler İngilizce cümle gibi.</p>
      </div>
    </div>
    ${tl(1960)}
  </div>`,
  n: [
    "Bölüm 2.6: Ticari kayıtları bilgisayara uyarlamak, COBOL. COBOL'un kökeni, Grace Hopper'ın UNIVAC için geliştirdiği FLOW-MATIC dilidir. FLOW-MATIC'te isimler tire içerebiliyor, aritmetik işlemler İngilizce kelimelerle yazılıyor, veri ve kod tamamen ayrı tutuluyor ve her ifade bir fiille başlıyordu.",
    "Mayıs 1959'da Pentagon'da ilk tasarım toplantısı yapıldı. Hedefler: dil basit İngilizce gibi görünmeli, daha az güçlü olsa bile kullanımı kolay olmalı ve bilgisayar kullanıcılarının tabanını genişletmeliydi. Komite, bilgisayar üreticilerinden ve ABD Savunma Bakanlığı birimlerinden oluşuyordu.",
    "İşte küçük bir COBOL programı. Veri tanımları DATA DIVISION'da, işlemler PROCEDURE DIVISION'da. Toplama işlemi bile bir İngilizce cümle gibi yazılıyor: maaşı prime ekle, toplamı ver.",
  ],
},
{
  id: "cobol-eval", ch: "2.6 Ticari kayıtlar: COBOL", chip: "<b>2.6</b> COBOL'un değerlendirmesi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">COBOL'un <em>mirası</em></h2>
    <div class="grid3" style="flex:1">
      ${[["🧱", "Hiyerarşik veri yapıları", "Kayıtlar (records) ilk kez bu dilde"], ["🔤", "Uzun, anlamlı isimler", "30 karaktere kadar, tire ile"], ["🧩", "Ayrı veri bölümü", "Veri tanımı ile işlem ayrıldı"],
         ["🪄", "Makrolar", "Yüksek seviyeli bir dilde ilk kez"], ["🪜", "İç içe seçim ifadeleri", ""], ["📊", "Rapor ve dosya işleme", "Büyük veriyle çalışmak kolay"]]
        .map(([e, h, p], i) => `<div class="card r rp" data-s="${i < 3 ? 1 : 2}" style="padding:28px;transition-delay:${(i % 3) * 0.15}s"><div class="ic a">${e}</div><h3 style="font-size:31px">${h}</h3><p style="font-size:25px">${p}</p></div>`).join("")}
    </div>
    <div class="note r" data-s="3" style="margin-top:24px"><b>DoD etkisi:</b> Savunma Bakanlığı istemeseydi muhtemelen başarısız olurdu. Bugün hâlâ bankalar ve kamu sistemlerinde çalışıyor; fonksiyon desteği zayıf.</div>
    ${tl(1960)}
  </div>`,
  n: [
    "COBOL'un programlama dillerine katkıları sanıldığından büyüktür.",
    "Hiyerarşik veri yapıları, yani kayıtlar, ilk kez COBOL'da görüldü. Otuz karaktere kadar uzun ve anlamlı isimler kullanılabiliyordu. Veri tanımları ayrı bir veri bölümünde toplanıyordu.",
    "Yüksek seviyeli bir dilde ilk kez makro olanağı sundu, iç içe seçim ifadelerine izin verdi ve rapor üretme, tabloda arama ve dosya sıralama gibi iş dünyasının ihtiyaç duyduğu işlemleri kolaylaştırdı.",
    "COBOL, ABD Savunma Bakanlığı'nın istediği ilk dildi; bu destek olmasaydı muhtemelen başarısız olurdu. Bugün hâlâ bankalarda ve kamu sistemlerinde milyonlarca satır COBOL kodu çalışıyor.",
  ],
},
// ───────────────── 2.7 BASIC
{
  id: "basic", ch: "2.7 Zaman paylaşımı: BASIC", chip: "<b>2.7</b> Zaman paylaşımının başlangıcı: BASIC",
  html: `
  <div class="wrap">
    ${head("BASIC", "Kemeny & Kurtz · Dartmouth · 1964", "teal")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="0"><div class="ic t">🎓</div><h3>Hedef kitle: bilim dışı öğrenciler</h3>
          <ul class="b t" style="margin-top:8px"><li style="font-size:26px">Öğrenmesi ve kullanması <b>kolay</b>, “dost canlısı”</li><li style="font-size:26px">Ödevler için <b>hızlı geri dönüş</b></li><li style="font-size:26px">Ücretsiz ve kişisel erişim</li><li style="font-size:26px">Kullanıcının zamanı, bilgisayarın zamanından <b>değerli</b></li></ul></div>
        <div class="card r" data-s="1" style="display:flex;align-items:center;gap:26px"><span class="emo" style="font-size:70px">⏱️</span><div><h3 style="margin-bottom:6px">Zaman paylaşımı</h3><p>Terminallerden uzaktan erişimle kullanılan <b>ilk yaygın dil</b>.</p></div></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("ortalama.bas", ["10 INPUT N", "20 LET S = 0", "30 FOR I = 1 TO N", "40   INPUT X", "50   LET S = S + X", "60 NEXT I", "70 PRINT \"ORTALAMA:\"; S / N", "80 END"], { lang: "plain" })}</div>
        <div class="note r" data-s="3">Sadece <b>14 komut</b> ve tek veri tipi (sayı). Bugünkü torunu: <b>Visual Basic</b>.</div>
      </div>
    </div>
    ${tl(1964, "teal")}
  </div>`,
  n: [
    "Bölüm 2.7: Zaman paylaşımının başlangıcı, BASIC. BASIC, 1964'te Dartmouth Üniversitesi'nde iki matematikçi, John Kemeny ve Thomas Kurtz tarafından tasarlandı. Hedef kitle, bilim dışı bölümlerin öğrencileriydi. Dil kolay öğrenilmeli, dost canlısı olmalı, ödevler için hızlı geri dönüş vermeli ve herkese ücretsiz erişim sağlamalıydı. Tasarımın ilkesi şuydu: kullanıcının zamanı, bilgisayarın zamanından daha değerlidir.",
    "BASIC, terminaller aracılığıyla uzaktan, zaman paylaşımlı olarak kullanılan ilk yaygın dildir. Birçok öğrenci aynı bilgisayarı aynı anda kullanabiliyordu.",
    "İşte satır numaralı klasik bir BASIC programı: N sayı okuyor ve ortalamalarını yazdırıyor. FOR ve NEXT ile sayma döngüsü kuruluyor.",
    "İlk BASIC'te yalnızca on dört komut ve tek bir veri tipi, yani sayı vardı. Kişisel bilgisayarlar çağında çok yaygınlaştı; bugünkü en bilinen torunu Visual Basic'tir.",
  ],
},
// ───────────────── 2.8 PL/I
{
  id: "pli", ch: "2.8 Herkes için her şey: PL/I", chip: "<b>2.8</b> Herkes için her şey: PL/I",
  html: `
  <div class="wrap">
    ${head("PL/I", "IBM + SHARE · 1965", "coral")}
    <div class="row" style="gap:30px;align-items:stretch">
      <div class="card r" data-s="0" style="flex:1"><h3 class="tl">🔬 Bilimsel dünya</h3><p>IBM 7090 · <b>Fortran</b> · SHARE kullanıcı grubu</p><p style="margin-top:10px;font-size:25px">Artık daha iyi G/Ç istiyor</p></div>
      <div class="r" data-s="1" style="display:flex;align-items:center;font-size:60px;color:var(--amber)">⇄</div>
      <div class="card r" data-s="0" style="flex:1"><h3 class="hl">💼 Ticari dünya</h3><p>IBM 7080 · <b>COBOL</b> · GUIDE kullanıcı grubu</p><p style="margin-top:10px;font-size:25px">Artık kayan nokta ve dizi istiyor</p></div>
    </div>
    <div class="row" style="flex:1;gap:30px;margin-top:30px">
      <div class="card r" data-s="2" style="flex:1"><h3>Çözüm: tek makine + tek dil</h3><p>IBM System/360 ve onun dili. 3×3 komite (3 IBM + 3 SHARE), 5 ayda tasarladı. Önce “NPL”, 1965'te <b>PL/I</b>.</p></div>
      <div class="card tint-t r" data-s="3" style="flex:1"><h3 class="tl">İlkler</h3><p>Birim düzeyinde <b>eşzamanlılık</b> · <b>istisna yönetimi</b> · seçilebilir özyineleme · <b>işaretçi</b> veri tipi · dizi kesitleri</p></div>
      <div class="card tint-c r" data-s="4" style="flex:1"><h3 class="cl">Zayıflıklar</h3><p>Yeni özelliklerin çoğu kötü tasarlanmıştı. <b>Aşırı büyük ve aşırı karmaşık.</b></p></div>
    </div>
    ${tl(1965, "coral")}
  </div>`,
  n: [
    "Bölüm 2.8: Herkes için her şey, PL/I. 1964'te IBM'in dünyası ikiye bölünmüştü. Bilimsel kullanıcılar IBM 7090 gibi makinelerde Fortran kullanıyordu; ticari kullanıcılar ise IBM 7080 gibi makinelerde COBOL.",
    "Ama ihtiyaçlar birbirine yaklaşıyordu: bilimsel kullanıcılar COBOL'daki gibi ayrıntılı girdi çıktı, ticari kullanıcılar ise kayan nokta ve diziler istiyordu. Birçok kurum iki tür bilgisayara, iki dile ve iki ayrı ekibe para ödüyordu.",
    "Çözüm açıktı: her iki işi de yapabilecek tek bir bilgisayar ve tek bir dil. Bilgisayar System/360 oldu. Dili ise IBM'den üç, SHARE'den üç kişilik bir komite beş ayda tasarladı. Önce Yeni Programlama Dili, yani NPL adı verildi; 1965'te adı PL/I oldu.",
    "PL/I birçok ilki getirdi: birim düzeyinde eşzamanlılık, istisna yönetimi, seçilebilir özyineleme, işaretçi veri tipi ve dizi kesitleri.",
    "Ama yeni özelliklerin çoğu kötü tasarlanmıştı ve dil aşırı büyük, aşırı karmaşık hale geldi. PL/I, her şeyi tek dilde toplamaya çalışmanın risklerini gösteren klasik bir örnektir.",
  ],
},
// ───────────────── 2.9 APL & SNOBOL
{
  id: "apl-snobol", ch: "2.9 İlk dinamik diller", chip: "<b>2.9</b> İlk iki dinamik dil: APL ve SNOBOL",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">İlk iki <em>dinamik</em> dil</h2>
    <div class="note r" data-s="0" style="margin-bottom:28px;font-size:29px"><b>Dinamik tipleme:</b> değişkenin tipi yok; değer atanınca tip kazanır. <b>Dinamik bellek:</b> değer atanınca bellek ayrılır.</div>
    <div class="grid2" style="flex:1">
      <div class="card r" data-s="1"><h3>APL <span style="font-size:24px;color:var(--muted);font-weight:400">· Ken Iverson · IBM · 1960'lar</span></h3>
        <p>Önce bir donanım tanımlama dili. Diziler için çok güçlü operatörler:</p>
        <div style="font-family:'DejaVu Sans Mono';font-size:44px;margin:22px 0;text-align:center;background:var(--code);border-radius:14px;padding:18px">⍉M <span style="font-size:26px;color:var(--muted)">← matrisin transpozu</span></div>
        <p>Çok ifade gücü… ama programları okumak <b>çok zor</b>.</p></div>
      <div class="card r" data-s="2"><h3>SNOBOL <span style="font-size:24px;color:var(--muted);font-weight:400">· Farber, Griswold, Polonsky · Bell Labs</span></h3>
        <p>Metin işleme dili; güçlü <b>desen eşleştirme</b> operatörleri.</p>
        <div class="mono" style="font-size:28px;margin:22px 0;background:var(--code);border-radius:14px;padding:18px;line-height:1.6">METIN 'ali' | 'veli' :S(BULDU)</div>
        <p>Yorumlanır, yavaştır. Mirası: <b>awk, Icon, Perl</b>.</p></div>
    </div>
    ${tl([1962, 1964], "violet")}
  </div>`,
  n: [
    "Bölüm 2.9: İlk iki dinamik dil, APL ve SNOBOL. Bu diller dinamik tipleme ve dinamik bellek ayırma ile tanınır. Değişkenlerin önceden belirlenmiş bir tipi yoktur; bir değer atandığında o değerin tipini kazanırlar ve bellek de o anda ayrılır.",
    "APL, altmışlarda IBM'de Ken Iverson tarafından aslında bir donanım tanımlama dili olarak tasarlandı. Hem skalerler hem de çok boyutlu diziler için çok sayıda güçlü operatörü vardır; örneğin tek bir operatörle bir matrisin transpozu alınabilir. Çok ifade gücüne sahiptir, ama programları okumak son derece zordur.",
    "SNOBOL ise Bell Laboratuvarları'nda Farber, Griswold ve Polonsky tarafından metin işleme dili olarak tasarlandı. Güçlü desen eşleştirme operatörleri vardı. Yorumlandığı için yavaştı, ama mirası büyük: awk, Icon ve Perl gibi metin işleme dilleri onun izinden gitti.",
  ],
},
// ───────────────── 2.10 SIMULA 67
{
  id: "simula", ch: "2.10 Veri soyutlama: SIMULA 67", chip: "<b>2.10</b> Veri soyutlamanın başlangıcı: SIMULA 67",
  html: `
  <div class="wrap">
    ${head("SIMULA 67", "Nygaard & Dahl · Norveç · 1967", "violet")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:780px">
        <div class="card r" data-s="0"><h3>🏭 Amaç: sistem simülasyonu</h3><p>ALGOL 60 temelli: blok yapısı ve kontrol ifadeleri oradan.</p></div>
        <div class="card r" data-s="1"><h3>Eş yordamlar (coroutines)</h3><p>Durdurulduğu yerden <b>devam edebilen</b> alt programlar — simülasyonda çok kullanışlı.</p></div>
        <div class="card tint-v r" data-s="2"><h3 class="vl">Sınıf (class)</h3><p>Verileri ve onlar üzerinde çalışan işlemleri <b>bir arada</b> tutan yapı → <b>veri soyutlamanın</b> ve nesne yönelimin temeli.</p></div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${code("etiket.sim", ["class Etiket;", "begin", "   text Ad, Sokak, Sehir;", "   procedure Oku;", "   begin", "      Ad :- InLine;", "      Sokak :- InLine;", "      Sehir :- InLine", "   end;", "   procedure Yaz;", "   begin", "      OutLine(Ad); OutLine(Sehir)", "   end;", "end;"], { lang: "pascal", cls: "xs" })}</div>
      </div>
    </div>
    ${tl(1967, "violet")}
  </div>`,
  n: [
    "Bölüm 2.10: Veri soyutlamanın başlangıcı, SIMULA 67. Norveç'te Kristen Nygaard ve Ole-Johan Dahl tarafından, asıl olarak sistem simülasyonu için tasarlandı. ALGOL 60'ı temel alıyordu; blok yapısı ve kontrol ifadeleri oradan geliyordu.",
    "SIMULA'nın ilk büyük katkısı eş yordamlardır: durdurulduğu yerden daha sonra devam edebilen alt programlar. Bir simülasyonda, örneğin bir bankadaki müşterileri modellerken, her müşterinin kendi akışını sürdürmesi için çok kullanışlıdır.",
    "İkinci ve çok daha önemli katkısı sınıf kavramıdır. Sınıf, verileri ve bu veriler üzerinde çalışan işlemleri bir arada tutar. Sağdaki Etiket sınıfı, ad, sokak ve şehir bilgilerini ve onları okuyan, yazan prosedürleri birlikte tanımlıyor. Bu fikir veri soyutlamanın ve bugünkü nesne yönelimli programlamanın temelidir.",
  ],
},
// ───────────────── 2.11 ALGOL 68
{
  id: "algol68", ch: "2.11 Ortogonal tasarım: ALGOL 68", chip: "<b>2.11</b> Ortogonal tasarım: ALGOL 68",
  html: `
  <div class="wrap">
    ${head("ALGOL 68", "van Wijngaarden ve arkadaşları · 1968", "amber")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="card r" data-s="0"><div class="ic a">⊥</div><h3>Tasarım ilkesi: ortogonallik</h3><p>Az sayıda temel kavram + az sayıda birleştirme mekanizması. ALGOL 60'ın devamı, ama üst kümesi <b>değil</b>.</p></div>
        <div class="card tint-t r" data-s="1"><h3 class="tl">Katkıları</h3><ul class="b t" style="margin-top:6px"><li style="font-size:26px"><b>Kullanıcı tanımlı</b> veri yapıları (ilk)</li><li style="font-size:26px"><b>Referans</b> tipleri</li><li style="font-size:26px">Dinamik diziler: <span class="mono hl">flex</span> (ilk)</li></ul></div>
      </div>
      <div class="col f1">
        <div class="card tint-c r" data-s="2"><h3 class="cl">Ama…</h3><p>ALGOL 60'tan bile <b>az kullanıldı</b>. Tanımı kendine özgü bir gramerle yazılmıştı; öğrenmesi çok zordu.</p></div>
        <div class="card r" data-s="3"><h3>Etkisi büyük</h3><p>Fikirleri sonraki dillere taşındı:</p><div class="pills"><span class="pill a" style="font-size:28px">Pascal</span><span class="pill a" style="font-size:28px">C</span><span class="pill a" style="font-size:28px">Ada</span></div></div>
      </div>
    </div>
    ${tl(1968)}
  </div>`,
  n: [
    "Bölüm 2.11: Ortogonal tasarım, ALGOL 68. ALGOL 60'ın devamı olarak geliştirildi, ama onun üst kümesi değildi. Tasarımı, ilk bölümde gördüğümüz ortogonallik kavramına dayanıyordu: az sayıda temel kavram ve onları birleştiren az sayıda mekanizma.",
    "Katkıları önemlidir: kullanıcının kendi veri yapılarını tanımlamasına izin veren ilk dildir. Referans tiplerini ve flex denen dinamik dizileri de ilk kez sundu.",
    "Ama ALGOL 68, ALGOL 60'tan bile daha az kullanıldı. Dilin tanımı kendine özgü, alışılmadık bir gramerle yazılmıştı ve öğrenmesi çok zordu.",
    "Yine de fikirleri boşa gitmedi. Pascal, C ve Ada gibi dillere doğrudan etki etti.",
  ],
},
// ───────────────── 2.12 Descendants
{
  id: "descendants", ch: "2.12 ALGOL'ün torunları", chip: "<b>2.12</b> ALGOL'ün ilk torunları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">ALGOL'ün <em>torunları</em></h2>
    <div class="grid2" style="flex:1;grid-template-rows:1fr 1fr">
      <div class="card r" data-s="1"><h3>Pascal <span style="font-size:24px;color:var(--muted);font-weight:400">· Niklaus Wirth · 1971</span></h3>
        <p><b>Yapısal programlamayı öğretmek</b> için. Küçük, basit, yenilik getirmeyen ama çok temiz bir dil.</p><p style="margin-top:12px">70'lerin ortasından 90'ların sonuna kadar <b>programlama eğitiminin</b> en yaygın dili.</p></div>
      <div class="card r" data-s="2"><h3>C <span style="font-size:24px;color:var(--muted);font-weight:400">· Dennis Ritchie · Bell Labs · 1972</span></h3>
        <p><b>Sistem programlama</b> için. BCPL → B → C; ALGOL 68'den de etkilendi.</p><p style="margin-top:12px">Güçlü operatörler, esneklik, ama <b>zayıf tip kontrolü</b>. UNIX ile yayıldı.</p></div>
      <div class="card r" data-s="3"><h3>Modula-2</h3><p>Wirth'ün yeni dili: güçlü tip kontrolü, modüller, soyut veri tipleri ve eşzamanlılık. Kalıtım yok.</p></div>
      <div class="card r" data-s="3" style="transition-delay:.2s"><h3>Oberon</h3><p>Modula-2'den daha basit; tip genişletme ile <b>nesne yönelimli</b> programlamayı destekler.</p></div>
    </div>
    ${tl([1971, 1988])}
  </div>`,
  n: [
    "Bölüm 2.12: ALGOL'ün ilk torunları. ALGOL dilleri, sonraki bütün imperatif dilleri etkiledi. En önemli dört tanesine bakalım.",
    "Pascal, 1971'de ALGOL 68 komitesinde de çalışmış olan Niklaus Wirth tarafından tasarlandı. Amacı yapısal programlamayı öğretmekti. Küçük, basit ve pek yenilik getirmeyen, ama çok temiz bir dildi. Yetmişlerin ortasından doksanların sonuna kadar programlama eğitiminde en yaygın kullanılan dil oldu.",
    "C, 1972'de Bell Laboratuvarları'nda Dennis Ritchie tarafından sistem programlama için tasarlandı. BCPL ve B dillerinden türedi, ALGOL 68'den de etkilendi. Güçlü operatörleri ve esnek yapısı vardı, ama tip kontrolü zayıftı. UNIX işletim sistemiyle birlikte tüm dünyaya yayıldı.",
    "Wirth daha sonra güçlü tip kontrolü, modüller, soyut veri tipleri ve eşzamanlılık sunan Modula-2'yi tasarladı; ancak kalıtım yoktu. Onun devamı olan Oberon ise daha basitti ve tip genişletme ile nesne yönelimli programlamayı destekliyordu.",
  ],
},
// ───────────────── 2.13 Prolog
{
  id: "prolog", ch: "2.13 Mantık programlama: Prolog", chip: "<b>2.13</b> Mantık temelli programlama: Prolog",
  html: `
  <div class="wrap">
    ${head("Prolog", "Colmerauer & Roussel (Marsilya) · Kowalski (Edinburgh) · 1972", "amber")}
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px">
        <ul class="b r" data-s="0"><li>Temeli <b>biçimsel mantık</b></li><li>Prosedürel değil: <b>ne</b> istendiğini söylersin</li><li>Program = <b>gerçekler + kurallar</b></li><li>Sorguları çıkarım yaparak yanıtlayan akıllı bir veritabanı gibi</li></ul>
        <div class="note r" data-s="3" style="margin-top:30px">Alanları: doğal dil işleme, uzman sistemler. Eleştiri: <b>verimsiz</b>, uygulama alanı dar.</div>
      </div>
      <div class="col f1">
        <div class="r" data-s="1">${code("aile.pl", ["anne(maria, ana).", "baba(juan, ana).", "baba(tom, juan).", "", "ebeveyn(X, Y) :- anne(X, Y).", "ebeveyn(X, Y) :- baba(X, Y).", "dede(X, Z)    :- baba(X, Y), ebeveyn(Y, Z).", "", { t: "?- dede(tom, ana).", s: 2 }, { t: "true.", s: 2 }], { lang: "prolog", cls: "sm" })}</div>
        <div class="r" data-s="2" style="display:flex;align-items:center;gap:14px;font-size:28px;font-family:JBM;justify-content:center">
          <span class="pill a">tom</span><span class="arrow">baba →</span><span class="pill a">juan</span><span class="arrow">baba →</span><span class="pill a">ana</span></div>
      </div>
    </div>
    ${tl(1972)}
  </div>`,
  n: [
    "Bölüm 2.13: Mantık temelli programlama, Prolog. Prolog, Marsilya Üniversitesi'nde Alain Colmerauer ve Philippe Roussel tarafından, Edinburgh'dan Robert Kowalski'nin katkısıyla geliştirildi. Temeli biçimsel mantıktır. Prosedürel değildir: nasıl yapılacağını değil, ne istendiğini söylersiniz. Program, gerçekler ve kurallardan oluşur.",
    "Bir aile örneği: Maria, Ana'nın annesi; Juan, Ana'nın babası; Tom da Juan'ın babası. Kurallar: anne ya da baba olan kişi ebeveyndir. X, Z'nin dedesidir, eğer X, Y'nin babasıysa ve Y de Z'nin ebeveyniyse.",
    "Şimdi soralım: Tom, Ana'nın dedesi mi? Prolog, Tom'un Juan'ın babası olduğunu ve Juan'ın da Ana'nın ebeveyni olduğunu bularak evet yanıtını verir. Prolog'u, sorgulara çıkarım yaparak yanıt veren akıllı bir veritabanı gibi düşünebilirsiniz.",
    "Prolog en çok doğal dil işleme ve uzman sistemlerde kullanıldı. Eleştirilen yanları ise verimsizliği ve uygulama alanının dar olmasıdır.",
  ],
},
// ───────────────── 2.14 Ada
{
  id: "ada", ch: "2.14 En büyük tasarım çabası: Ada", chip: "<b>2.14</b> Tarihin en büyük tasarım çabası: Ada",
  html: `
  <div class="wrap">
    ${head("Ada", "ABD Savunma Bakanlığı · 1975–1983", "teal")}
    <div class="r" data-s="0" style="display:flex;align-items:center;gap:10px;margin-bottom:30px">
      ${[["Strawman", "1975", "🌾"], ["Woodman", "1975", "🪵"], ["Tinman", "1976", "🥫"], ["Ironman", "1977", "⚙️"], ["Steelman", "1978", "🛡️"]].map(([n, y, e], i) => `${i ? '<span class="arrow">→</span>' : ""}<div class="card r rp" data-s="1" style="flex:1;padding:18px;text-align:center;transition-delay:${i * 0.2}s"><div class="emo" style="font-size:38px">${e}</div><div style="font-size:26px;font-weight:700">${n}</div><div class="mono" style="font-size:20px;color:var(--muted)">${y}</div></div>`).join("")}
    </div>
    <div class="row" style="flex:1;gap:30px">
      <div class="card tint-t r" data-s="2" style="flex:1.2"><h3 class="tl">Katkıları</h3><ul class="b t" style="margin-top:6px"><li style="font-size:26px"><b>Paketler</b> → veri soyutlama</li><li style="font-size:26px">Ayrıntılı <b>istisna yönetimi</b></li><li style="font-size:26px"><b>Soysal</b> (generic) program birimleri</li><li style="font-size:26px"><b>Eşzamanlılık:</b> görev (tasking), buluşma (rendezvous)</li></ul></div>
      <div class="card r" data-s="3" style="flex:1"><h3>Yorumlar</h3><p>Rekabetçi tasarım; dönemin bütün yazılım mühendisliği bilgisini içerdi. Ama ilk gerçek derleyici, tasarımdan <b>~5 yıl</b> sonra geldi.</p></div>
      <div class="card r" data-s="4" style="flex:1"><h3>Ada 95</h3><p>Tip türetme ile OOP, yeni eşzamanlılık özellikleri. DoD zorunluluğu kalkınca popülerliği C++'a kaptırdı.</p></div>
    </div>
    ${tl([1975, 1983], "teal")}
  </div>`,
  n: [
    "Bölüm 2.14: Tarihin en büyük tasarım çabası, Ada. Yetmişlerde ABD Savunma Bakanlığı'nın gömülü sistemleri için yüzlerce farklı dil kullanılıyordu. Tek bir dil için yüzlerce kişi, çok büyük bir bütçe ve yaklaşık sekiz yıl süren dev bir proje başlatıldı. Dilin adı, ilk programcı kabul edilen Augusta Ada Byron'dan geliyor.",
    "Gereksinimler beş aşamada olgunlaştırıldı: saman adam anlamına gelen Strawman, sonra Woodman, Tinman, Ironman ve son olarak 1978'de çelik adam, Steelman. Ardından rekabetçi bir tasarım yarışması yapıldı.",
    "Ada'nın katkıları büyüktür: veri soyutlamayı destekleyen paketler, ayrıntılı istisna yönetimi, yazılımın yeniden kullanılmasını sağlayan soysal program birimleri ve görevler ile buluşma mekanizmasına dayalı eşzamanlılık.",
    "Dil, dönemin bütün yazılım mühendisliği bilgisini içeriyordu; ama bu yüzden çok büyük ve karmaşıktı. İlk gerçekten kullanılabilir derleyici, tasarım bittikten yaklaşık beş yıl sonra çıkabildi.",
    "1995'te Ada 95 ile tip türetme yoluyla nesne yönelimli programlama ve yeni eşzamanlılık özellikleri eklendi. Ancak Savunma Bakanlığı Ada zorunluluğunu kaldırınca, popülerliğini büyük ölçüde C++'a kaptırdı.",
  ],
},
];
