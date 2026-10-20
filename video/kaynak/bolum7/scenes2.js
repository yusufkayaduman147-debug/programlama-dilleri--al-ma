const { code } = require("../build/lib");
const { trace } = require("../ch4/h");

module.exports = [
// ───────── 7.2.2.3 multi-way
{
  id: "multi-history", ch: "7.2.2 Seçim yapıları", chip: "<b>7.2.2.3</b> Çoklu seçim: eskiden ve şimdi",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Çoklu seçim: <em>goto'dan case'e</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:760px">
        <div class="card tint-c r" data-s="1" style="padding:22px 28px"><h3 class="cl" style="font-size:28px">FORTRAN aritmetik IF</h3>
          <div class="mono" style="font-size:26px;margin:8px 0">IF (X - Y) 10, 20, 30</div>
          <p style="font-size:21px">Negatifse 10'a, sıfırsa 20'ye, pozitifse 30'a <b>atla</b>. Seçilen bölümler programın <b>her yerinde</b> olabilir (kılıflanmamış) ve çıkış için <b>GOTO</b> gerekir. Hesaplanmış ve atanmış GOTO da benzer.</p></div>
        <div class="card tint-t r" data-s="2" style="padding:22px 28px"><h3 class="tl" style="font-size:28px">Pascal case <span style="font-size:20px;color:var(--faint);font-weight:500">Hoare → ALGOL W</span></h3>
          ${code("pascal", ["case ifade of", "   sabit_liste_1 : deyim_1;", "   ...", "   sabit_liste_n : deyim_n", "end"], { lang: "pascal", cls: "xs" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:22px 28px"><h3 style="font-size:27px">Tasarım soruları</h3><ol style="font-size:22px;line-height:1.55;color:var(--muted);margin:6px 0 0;padding-left:28px"><li>Kontrol ifadesinin tipi ve biçimi?</li><li>Seçilebilir bölümler nasıl belirlenir?</li><li>Akış yalnızca <b style="color:var(--text)">bir bölümle</b> mi sınırlı?</li><li>Hiçbir değere uymayan ifadeler ne olacak?</li></ol></div>
        <div class="card r" data-s="4" style="padding:22px 28px"><p style="font-size:22px"><b>Pascal'ın cevapları:</b> her sıralı tip (int, boolean, char, enum); tek deyim ya da birleşik deyim; her çalışmada <b>tek</b> bölüm; eşleşme yoksa belirsiz → ISO 1984: hata. Birçok dil <span class="mono">otherwise</span>/<span class="mono">else</span> ekledi.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.2.3: Çoklu seçim deyimi. Bir programda akış için ikiden fazla yol olduğunda çoklu seçim deyimi kullanılır.",
    "İlk çoklu seçim yapıları oldukça ilkeldi. FORTRAN'ın aritmetik IF deyimi, bir ifadenin negatif, sıfır ya da pozitif olmasına göre üç etiketten birine atlar. Sorun şu ki seçilen kod bölümleri programın herhangi bir yerinde olabilir, yani kılıflanmamıştır; ve bölümün sonunda akışı toparlamak için yine GOTO gerekir. FORTRAN'ın hesaplanmış ve atanmış GOTO deyimleri de aynı sorunları taşır.",
    "Modern çoklu seçimin atası, Hoare'un ALGOL W diline yaptığı katkıdır ve Pascal'ın case deyiminde yaşar. İfadenin değeri, sabit listelerinden biriyle eşleşen ilk bölümü seçer; o bölümün deyimleri çalışır ve akış case yapısının dışına çıkar.",
    "Çoklu seçimin tasarım soruları şunlardır: kontrol ifadesinin tipi ve biçimi ne olacak; seçilebilir bölümler nasıl belirlenecek; bir çalışmada akış yalnızca tek bir bölümle mi sınırlı olacak; ve hiçbir sabite uymayan değerler için ne yapılacak?",
    "Pascal'ın cevapları: kontrol ifadesi int, boolean, char ya da enum gibi herhangi bir sıralı tipte olabilir; bir bölüm tek bir deyim ya da birleşik deyim olabilir; her çalışmada yalnızca bir bölüm işlenir. Eşleşme yoksa Wirth'ün Pascal'ında sonuç belirsizdi; 1984 ISO standardı bunu hata olarak tanımladı. Birçok dil bu durum için otherwise ya da else kısmı ekledi.",
  ],
},
{
  id: "switch", ch: "7.2.2 Seçim yapıları", chip: "<b>7.2.2.3</b> C switch ve düşme (fall-through)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">C switch: <em>break unutulursa düşer</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px">
        <div class="r" data-s="1">${code("switch.c", ["switch (x) {", { t: "  case 1: a++;", hot: "2" }, { t: "  case 2: b++; break;", hot: "2" }, { t: "  case 3: c++;", hot: "3" }, { t: "  default: d++;", hot: "3" }, "}"], { lang: "c", cls: "sm" })}</div>
        <div class="r" data-s="2">${trace([{ h: "x", color: "amber", align: "center" }, { h: "çalışan", color: "text" }, { h: "sonra", color: "teal" }], [[["1", "a++, b++  (düştü)", "break → çık"], 2], [["3", "c++, d++  (düştü)", "switch sonu"], 3]], { fs: 25 })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:27px">C, C++, Java switch</h3><p style="font-size:22px;line-height:1.55">• Kontrol ifadesi yalnızca <b>tam sayı</b> (ve char, enum)<br>• Bölümler deyim dizisi ya da blok olabilir<br>• Bölüm sonunda <b>örtük çıkış yok</b>: birden çok bölüm çalışabilir; çıkmak için <span class="mono hl">break</span><br>• <span class="mono">default</span> yoksa ve eşleşme yoksa hiçbir şey yapılmaz</p></div>
        <div class="note r" data-s="5" style="font-size:22px">Esneklik (birden çok case aynı kodu paylaşır) karşılığında <b>güvenilirlik</b> kaybı: unutulan bir break, fark edilmesi zor bir hatadır.</div>
      </div>
    </div>
  </div>`,
  n: [
    "C, C++ ve Java'daki switch deyimi farklı bir tasarım izler.",
    "Bu örneğe bakalım. Dört case'imiz var, ama yalnızca ikincisinin sonunda break bulunuyor.",
    "x bir olduğunda case bir seçilir ve a artırılır. Ama bölümün sonunda break olmadığı için akış durmaz, bir sonraki bölüme düşer ve b de artırılır. Ancak oradaki break ile switch'in dışına çıkılır.",
    "x üç olduğunda c artırılır ve yine break olmadığı için akış default bölümüne düşer; d de artırılır.",
    "C'nin tasarım seçimlerini özetleyelim: kontrol ifadesi yalnızca tam sayı tipinde olabilir. Bölümler deyim dizisi ya da blok olabilir. Bölüm sonunda örtük bir çıkış yoktur, bu yüzden tek bir çalışmada birden çok bölüm işlenebilir; çıkmak için açıkça break yazılmalıdır. default kısmı, tanımlanmamış değerler içindir; yoksa ve hiçbir case eşleşmezse switch hiçbir şey yapmaz.",
    "Bu düşme davranışı esneklik sağlar, örneğin birkaç case aynı kodu paylaşabilir. Ama karşılığında güvenilirlik kaybedilir: unutulmuş bir break, derleyicinin yakalamadığı ve fark edilmesi zor bir hatadır.",
  ],
},
{
  id: "switch-cs-ada", ch: "7.2.2 Seçim yapıları", chip: "<b>7.2.2.3</b> C#, Ada ve if-elsif zincirleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Daha güvenli <em>çoklu seçimler</em></h2>
    <div class="grid3" style="gap:28px">
      <div class="col">
        <div class="card r" data-s="1" style="padding:20px 24px"><h3 style="font-size:27px">C# switch</h3><p style="font-size:21px">C gibi, ama <b>düşmeye izin yok</b>: her bölüm <span class="mono">break</span> ya da <span class="mono">goto case</span> ile bitmeli.</p></div>
        <div class="r" data-s="1">${code("cs", ["switch (indeks) {", "  case 1: goto case 3;", "  case 3: tek += 1;", "          break;", "  default: ...; break;", "}"], { lang: "java", cls: "xs" })}</div>
      </div>
      <div class="col">
        <div class="card r" data-s="2" style="padding:20px 24px"><h3 style="font-size:27px">Ada case</h3><p style="font-size:21px">Aralık ve seçenek listeleri; <b>tüm değerler</b> kapsanmalı, gerekirse <span class="mono">others</span>.</p></div>
        <div class="r" data-s="2">${code("ada", ["case not_ is", "  when 90..100   => H := 'A';", "  when 50..89    => H := 'B';", "  when others    => H := 'F';", "end case;"], { lang: "ada", cls: "xs" })}</div>
      </div>
      <div class="col">
        <div class="card r" data-s="3" style="padding:20px 24px"><h3 style="font-size:27px">if – elsif zinciri</h3><p style="font-size:21px">Her koşul <b>Boolean</b> olabilir: case'in yapamadığı aralık testleri. İç içe if'lerden okunaklı.</p></div>
        <div class="r" data-s="3">${code("python", ["if not_ >= 90:", "    harf = 'A'", "elif not_ >= 50:", "    harf = 'B'", "else:", "    harf = 'F'"], { lang: "python", cls: "xs" })}</div>
      </div>
    </div>
    <div class="note r" data-s="4" style="font-size:23px;margin-top:22px"><b>Ortak noktalar:</b> bir kontrol ifadesi, sabit değer ya da aralıklarla etiketlenmiş bölümler, eşleşmeyenler için varsayılan bölüm ve yapı sonundan tek çıkış.</div>
  </div>`,
  n: [
    "Daha yeni diller çoklu seçimi daha güvenli hale getirdi.",
    "C#'ın switch deyimi C'ye benzer, ama tek bir farkla: bölümler arasında düşmeye izin vermez. Her bölüm break ya da goto case gibi açık bir aktarma ile bitmelidir. Birden çok bölümün aynı kodu çalıştırması isteniyorsa, örnekteki gibi goto case ile açıkça belirtilir.",
    "Ada'nın case deyiminde seçenekler tek değerler, listeler ya da aralıklar olabilir. Derleyici, kontrol ifadesinin bütün olası değerlerinin kapsanmasını ister; kapsanmayanlar için others kullanılır. Böylece unutulan bir durum derleme zamanında yakalanır.",
    "Bazı diller ise çoklu seçimi if, elsif, else zinciriyle yapar; Python'da elif, Ada'da elsif. Burada her koşul ayrı bir Boolean ifadedir, bu yüzden case'in yapamadığı aralık testleri kolayca yazılabilir. İç içe if'lerden çok daha okunaklıdır.",
    "Yazımları farklı olsa da çoklu seçim yapılarının ortak noktaları şunlardır: bir kontrol ifadesi; sabit değer ya da aralıklarla etiketlenmiş bölümler; hiçbir etikete uymayan değerler için varsayılan bir bölüm; ve yapının sonundan tek bir çıkış.",
  ],
},
// ───────── 7.2.3 iteration
{
  id: "loops", ch: "7.2.3 Yineleme yapıları", chip: "<b>7.2.3</b> Yineleme yapıları",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Döngüler: <em>kim denetliyor, nerede?</em></h2>
    <div class="grid2" style="gap:30px">
      <div class="card tint-a r" data-s="1" style="padding:24px 30px"><h3 class="hl" style="font-size:29px">Neyle denetlenir?</h3><p style="font-size:23px"><b>Sayaç denetimli:</b> döngü değişkeni bir bitiş değerine ulaşınca biter.<br><b>Mantık denetimli:</b> bir Boolean ifade yanlış olunca biter.</p></div>
      <div class="card tint-t r" data-s="2" style="padding:24px 30px"><h3 class="tl" style="font-size:29px">Nerede denetlenir?</h3><p style="font-size:23px"><b>Önce sınanan</b> (pretest): gövdeden önce → 0 kez çalışabilir.<br><b>Sonra sınanan</b> (posttest): gövdeden sonra → en az 1 kez.</p></div>
    </div>
    <div class="card r" data-s="3" style="padding:24px 30px;margin-top:28px"><h3 style="font-size:29px">Sayaç denetimli döngülerin tasarım soruları</h3>
      <div class="grid2" style="gap:12px 40px;margin-top:8px">${["Döngü değişkeninin <b>tipi ve kapsamı</b> ne?", "Döngü bitince değişkenin <b>değeri</b> ne?", "Değişken döngü içinde <b>değiştirilebilir mi</b>? Bu, denetimi etkiler mi?", "Döngü parametreleri <b>bir kez mi</b>, her yinelemede mi değerlendirilir?"].map((t, i) => `<div style="font-size:24px;color:var(--muted);display:flex;gap:14px"><span class="mono hl" style="font-weight:700">${i + 1}</span><span>${t}</span></div>`).join("")}</div></div>
    <div class="row r" data-s="4" style="gap:16px;margin-top:24px;align-items:center;font-size:26px"><span class="pill a">başlangıç</span><span class="pill a">bitiş</span><span class="pill a">adım</span><span style="color:var(--muted)">→ gövdenin kaç kez çalışacağını belirler</span></div>
  </div>`,
  n: [
    "Bölüm 7.2.3: Yineleme yapıları. Yineleme yapıları, bir deyimin ya da deyim grubunun hiç, bir kez ya da defalarca çalışmasını sağlayan döngüleri oluşturur. Döngüleri iki soruya göre sınıflandırırız.",
    "Birinci soru: döngü neyle denetlenir? Yineleme bir sayacın belirli bir değere ulaşmasıyla denetleniyorsa sayaç denetimli, bir mantıksal ifadenin değeriyle denetleniyorsa mantık denetimli döngü elde ederiz.",
    "İkinci soru: denetim nerede yapılır? Denetim döngünün başındaysa önce sınanan döngü, sonundaysa sonra sınanan döngü olur. Aradaki deyimlere döngünün gövdesi denir.",
    "Sayaç denetimli döngülerin dört tasarım sorusu vardır: döngü değişkeninin tipi ve kapsamı nedir; döngü bittiğinde değişkenin değeri nedir; değişken döngü içinde değiştirilebilir mi ve bu denetimi etkiler mi; ve döngü parametreleri bir kez mi, yoksa her yinelemede mi değerlendirilir?",
    "Sayaç denetimli bir döngüde döngü değişkeninin başlangıç değeri, bitiş değeri ve adım büyüklüğü, gövdenin kaç kez yineleneceğini belirler. Değişken başlangıç değerinden başlar ve her yinelemede adım kadar artırılır ya da azaltılır.",
  ],
},
{
  id: "counter-langs", ch: "7.2.3 Yineleme yapıları", chip: "<b>7.2.3.1</b> Sayaç denetimli döngüler: diller",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Aynı fikir, <em>farklı tasarımlar</em></h2>
    <div class="grid2" style="gap:24px 30px">
      <div class="card r" data-s="1" style="padding:20px 26px"><h3 style="font-size:27px">FORTRAN 77 / 90</h3><div class="mono" style="font-size:23px;margin:4px 0 8px">DO 10 I = 1, N, 2</div><p style="font-size:21px">Değişken tam sayı ya da gerçel. Parametreler <b>bir kez</b> değerlendirilir, yineleme sayısı baştan hesaplanır: içeride değişseler de etkilemez.</p></div>
      <div class="card r" data-s="2" style="padding:20px 26px"><h3 style="font-size:27px">ALGOL 60</h3><div class="mono" style="font-size:21px;margin:4px 0 8px">for i := 1 step 1 until n, x while x &gt; 0 do</div><p style="font-size:21px">Bitiş ve adım <b>her yinelemede</b> yeniden değerlendirilir; sayaç ve mantık birleşebilir. Çok esnek ama <b>karmaşık</b>.</p></div>
      <div class="card r" data-s="3" style="padding:20px 26px"><h3 style="font-size:27px">Ada</h3><div class="mono" style="font-size:23px;margin:4px 0 8px">for I in reverse 1..10 loop … end loop;</div><p style="font-size:21px">Değişken <b>örtük tanımlı</b>, yalnızca döngü içinde var, değiştirilemez. Aralık bir kez hesaplanır. Döngüye yalnızca başından girilir.</p></div>
      <div class="card r" data-s="4" style="padding:20px 26px"><h3 style="font-size:27px">Python</h3><div class="mono" style="font-size:23px;margin:4px 0 8px">for x in range(5): … else: …</div><p style="font-size:21px">Bir nesnenin (çoğunlukla <span class="mono">range</span>) değerleri üzerinde döner: 0, 1, 2, 3, 4. Döngü normal biterse isteğe bağlı <span class="mono">else</span> çalışır.</p></div>
    </div>
    <div class="row r" data-s="5" style="gap:24px;margin-top:22px;align-items:center">
      <div class="f1">${code("fsharp", ["let rec forLoop loopBody reps =", "    if reps <= 0 then ()", "    else loopBody(); forLoop loopBody (reps - 1)"], { lang: "text", cls: "xs" })}</div>
      <p style="font-size:22px;color:var(--muted);width:560px">F# gibi fonksiyonel dillerde değiştirilebilir değişken olmadığı için sayaç döngüsü <b style="color:var(--text)">özyineleme</b> ile taklit edilir. <span class="mono">()</span> = değer yok.</p>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.3.1: Sayaç denetimli döngüler. Farklı dillerin bu soruları nasıl cevapladığına bakalım.",
    "FORTRAN 77 ve 90'da döngü değişkeni tam sayı ya da gerçel olabilir. Başlangıç, bitiş ve adım değerleri ifade olabilir, ama döngünün başında yalnızca bir kez değerlendirilir ve yineleme sayısı hemen hesaplanır. Bu yüzden döngü içinde bu değerler değişse bile yineleme sayısı etkilenmez. Daha eski FORTRAN dört'te ise bu değerler yalnızca tam sayı sabitleri ve değişkenleri olabiliyordu.",
    "ALGOL 60 bunun tam tersini yaptı: bitiş ve adım değerleri her yinelemede yeniden değerlendirilir ve döngü içinde değiştirilebilir. Hatta bir sayaç denetimi ile bir mantıksal ifade aynı döngüde birleştirilebilir. Bu çok işlevli tasarım esneklik sağlar ama ciddi bir karmaşıklığa yol açar.",
    "Ada'da döngü değişkeni örtük olarak tanımlanır, tipi aralığın tipidir ve yalnızca döngünün içinde vardır. Döngü içinde değiştirilemez. Aralık bir kez hesaplanır; reverse ile geriye doğru sayılabilir ve döngüye yalnızca başından girilebilir.",
    "Python'da for döngüsü bir nesnenin değerleri üzerinde döner; bu nesne çoğunlukla range fonksiyonudur. range beş, sıfırdan dörde kadar değerler üretir. İlginç bir özellik: döngü break ile kesilmeden normal biterse, isteğe bağlı else bloğu çalışır.",
    "F# gibi saf fonksiyonel dillerde ise değiştirilebilir değişken olmadığı için sayaç döngüsü özyinelemeli bir fonksiyonla taklit edilir: reps sıfıra inene kadar gövde çağrılır ve fonksiyon kendini reps eksi bir ile yeniden çağırır.",
  ],
},
{
  id: "pascal-for", ch: "7.2.3 Yineleme yapıları", chip: "<b>7.2.3.1.6</b> Pascal for döngüsü",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Pascal: sınırlar <em>bir kez</em> değerlendirilir</h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:720px">
        <div class="mono r" data-s="0" style="font-size:24px;color:var(--muted)">for deg := ilk (to | downto) son do deyim</div>
        <div class="r" data-s="1">${code("dongu.pas", ["ilk := 1;  son := 10;", { t: "for i := ilk to son do", hot: "1,2,3,4" }, "begin", { t: "   ilk := ilk + 1;", hot: "3" }, { t: "   son := son - 1;", hot: "3" }, "   writeln(i)", "end;"], { lang: "pascal", cls: "sm" })}</div>
        <div class="note r" data-s="5" style="font-size:22px">Döngü değişkeni <b>sıralı tipte</b> olmalı ve içeride <b>değiştirilemez</b>. ilk ve son değişebilir ama sayıyı etkilemez. Döngü bitince <span class="mono">i</span>'nin değeri <b>tanımsız</b>.</div>
      </div>
      <div class="col f1">
        <div class="r" data-s="2">${trace([{ h: "i", color: "amber", align: "center" }, { h: "ilk", align: "center" }, { h: "son", align: "center" }, { h: "çıktı", color: "teal", align: "center" }], [[["1", "2", "9", "1"], 2], [["2", "3", "8", "2"], 3], [["3", "4", "7", "3"], 3], [["…", "…", "…", "…"], 4], [["10", "11", "0", "10"], 4]], { fs: 26, hotLast: false })}</div>
        <div class="r" data-s="4" style="font-size:26px;text-align:center;margin-top:10px">Toplam: <b class="hl">10 yineleme</b> — başta hesaplandığı gibi</div>
      </div>
    </div>
  </div>`,
  n: [
    "Pascal'daki sayaç denetimli döngünün genel biçimi ekranda: to ile artan, downto ile azalan yönde sayılır.",
    "Bu örnekte ilk bir, son on. Döngünün içinde her yinelemede ilk'i bir artırıp son'u bir azaltıyoruz. Sizce döngü kaç kez çalışır?",
    "İlk yinelemede i bir; gövdede ilk ikiye çıkar, son dokuza iner ve bir yazdırılır.",
    "İkinci yinelemede i iki olur; ilk üç, son sekiz. Sonra i üç olur. Eğer sınırlar her yinelemede yeniden değerlendirilseydi, döngü ilk ile son birbirini geçtiğinde, yani beş yinelemede biterdi.",
    "Ama Pascal'da başlangıç ve bitiş değerleri yalnızca döngünün başında bir kez değerlendirilir. Bu yüzden döngü, ilk başta belirlendiği gibi tam on kez çalışır ve birden ona kadar bütün sayılar yazdırılır.",
    "Pascal'ın diğer kuralları: döngü değişkeni sıralı bir tipte olmalıdır ve döngü içinde değiştirilemez. Başlangıç ve bitiş değerlerinin kaynağı olan değişkenler değiştirilebilir ama yineleme sayısını etkilemez. Döngü bittiğinde döngü değişkeninin değeri ise tanımsızdır.",
  ],
},
{
  id: "c-for", ch: "7.2.3 Yineleme yapıları", chip: "<b>7.2.3.1.7</b> C for döngüsü",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">C for: <em>üç ifade</em>, döngü değişkeni yok</h2>
    <div class="row" style="flex:1;gap:44px">
      <div class="col" style="width:820px;gap:22px">
        <div class="mono r" data-s="1" style="font-size:34px;text-align:center;padding:10px 0">for (<span class="tl">ifade_1</span>; <span class="hl">ifade_2</span>; <span class="vl">ifade_3</span>) gövde</div>
        <div class="row r" data-s="2" style="gap:12px;align-items:center;justify-content:center;font-size:24px">
          <span class="pill t">① ilkleme (bir kez)</span><span class="arrow">→</span><span class="pill a">② sınama</span><span class="arrow">→</span><span class="pill">gövde</span><span class="arrow">→</span><span class="pill v">③ adım</span><span class="arrow">↺ ②</span></div>
        <div class="r" data-s="3">${code("c", ["for (sayac = 0; sayac < 25; sayac++)  ...", "for (k = 1; k < 50; k += 2)            ...", "for (x = 50; x > 10; x--)              ...", "for ( ; x < 10; x++)    /* x önceden atanmış olmalı */", "for (x = 2; x < n; )    /* x gövdede değişmeli */", "for (;;)                /* sonsuz döngü */"], { lang: "c", cls: "xs" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:22px 28px"><h3 style="font-size:27px">Özellikler</h3><p style="font-size:21px;line-height:1.55">Üç ifade de <b>isteğe bağlı</b>; ifade_2 yoksa sonsuz döngü. Ayrı bir döngü değişkeni yok: <b>her şey</b> gövdede değiştirilebilir. İfade_1 ve 3 virgülle birden çok ifade içerebilir.</p></div>
        <div class="card r" data-s="5" style="padding:22px 28px"><h3 style="font-size:27px">C++, Java, C#</h3><p style="font-size:21px;line-height:1.55"><b>C++:</b> kontrol ifadesi Boolean olabilir; ilklemede değişken tanımlanabilir: <span class="mono">for (int i = 0; …)</span><br><b>Java, C#:</b> kontrol ifadesi <b>mutlaka</b> Boolean.</p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.3.1.7: C'nin for döngüsü. C'nin tasarımı diğerlerinden çok farklıdır: belirli bir döngü değişkeni, başlangıç, bitiş ya da adım değeri yoktur.",
    "Genel biçimde parantez içinde noktalı virgüllerle ayrılmış üç ifade bulunur.",
    "Çalışma sırası şöyledir: birinci ifade, ilkleme, yalnızca bir kez çalışır. Sonra ikinci ifade sınanır; doğruysa gövde çalışır, ardından üçüncü ifade, yani adım çalışır ve tekrar sınamaya dönülür. Sınama yanlış olduğunda döngü biter.",
    "İlk örnekte sayac sıfırla ilklenir, sayac yirmi beşten küçük olduğu sürece döngü sürer ve her adımda sayac bir artar. Diğer örneklerde ikişer artan, geriye sayan ya da bazı ifadeleri boş bırakılmış döngüler görüyorsunuz. İfade bir boşsa değişken önceden atanmış olmalı; ifade üç boşsa gövdede değiştirilmelidir. Üç ifade de boşsa sonsuz döngü elde edilir.",
    "Özetle C'de üç ifade de isteğe bağlıdır; sınama ifadesi yoksa sonsuz döngü oluşur. Tanımlı bir döngü değişkeni olmadığı için bütün değişkenler gövdede değiştirilebilir. Bu, çok esnek ama hataya açık bir tasarımdır.",
    "C++ iki açıdan farklıdır: kontrol ifadesi Boolean olabilir ve ilkleme kısmında değişken tanımlanabilir; bu değişkenin kapsamı döngüyle sınırlıdır. Java ve C#'ta ise kontrol ifadesinin Boolean olması zorunludur.",
  ],
},
{
  id: "while", ch: "7.2.3 Yineleme yapıları", chip: "<b>7.2.3.2</b> Mantık denetimli döngüler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">while mı, <em>do-while</em> mı?</h2>
    <div class="grid2" style="gap:36px">
      <div class="col">
        <div class="r" data-s="1">${code("onceden.c", ["x = 10;", { t: "while (x < 5) {", hot: "2" }, "    printf(\"%d\", x);", "    x++;", "}"], { lang: "c", cls: "sm" })}</div>
        <div class="card tint-c r" data-s="2" style="padding:20px 26px"><div style="font-size:26px">Sınama önce: <span class="mono cl">10 &lt; 5</span> yanlış → gövde <b>0 kez</b>. Çıktı: <i>hiçbir şey</i></div></div>
      </div>
      <div class="col">
        <div class="r" data-s="3">${code("sonradan.c", ["x = 10;", { t: "do {", hot: "3" }, { t: "    printf(\"%d\", x);", hot: "3" }, "    x++;", { t: "} while (x < 5);", hot: "4" }], { lang: "c", cls: "sm" })}</div>
        <div class="card tint-t r" data-s="4" style="padding:20px 26px"><div style="font-size:26px">Gövde önce: <b>10</b> yazılır; sonra <span class="mono tl">11 &lt; 5</span> yanlış → <b>1 kez</b>.</div></div>
      </div>
    </div>
    <div class="row" style="gap:24px;margin-top:24px">
      <div class="card r f1" data-s="5" style="padding:18px 24px"><p style="font-size:21px">Mantık denetimli döngüler sayaç döngülerinden <b>daha basit ve genel</b>dir: her sayaç döngüsü while ile yazılabilir. C, C++, Java, C# ikisini de sunar; Pascal: <span class="mono">while … do</span> ve <span class="mono">repeat … until</span>.</p></div>
      <div class="note r f1" data-s="6" style="font-size:21px">Java: koşul Boolean, döngüye yalnızca baştan girilir, <b>goto yok</b>. C#: ortadan girişe izin verir. F#: yine <b>özyinelemeli</b> <span class="mono">whileLoop test body</span>.</div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.3.2: Mantık denetimli döngüler. Bu döngülerde gövdenin tekrar çalışıp çalışmayacağına bir mantıksal ifadenin değeri karar verir. Farkı görmek için aynı işi iki döngüyle yapalım.",
    "Önce sınanan while döngüsü. x on iken koşul x beşten küçük mü diye sorar.",
    "On beşten küçük olmadığı için koşul ilk sınamada yanlış çıkar ve gövde hiç çalışmaz. Ekrana hiçbir şey yazılmaz.",
    "Şimdi sonra sınanan do while döngüsü. Burada gövde, koşula bakılmadan önce çalışır.",
    "Önce on yazdırılır ve x on bir olur. Ancak ondan sonra koşul sınanır ve yanlış çıkar. Yani gövde bir kez çalışmıştır. Sonra sınanan döngüleri kullanırken bu ilk koşulsuz çalışmaya dikkat etmek gerekir.",
    "Mantık denetimli döngüler, sayaç denetimli döngülerden daha basit ve daha genel yapılardır; her sayaç döngüsü bir while döngüsüyle yazılabilir. Bugünkü popüler dillerin çoğu iki türü de sunar. Pascal'da bunlar while do ve repeat until deyimleridir.",
    "Java, koşulun Boolean olması dışında C ve C++'a benzer; döngüye yalnızca başından girilebilir ve dilde goto yoktur. C# ise goto ile döngüye ortadan girişe izin verir. F#'ta ise mantık denetimli döngüler de özyinelemeli fonksiyonlarla yazılır: test doğru olduğu sürece body çağrılır ve fonksiyon kendini yeniden çağırır.",
  ],
},
// ───────── 7.2.4 unconditional
{
  id: "goto", ch: "7.2.4 Koşulsuz dallanma", chip: "<b>7.2.4.1</b> goto deyimi",
  html: (() => {
    const lines = ["10  I = 1", "20  IF (I .GT. 5) GOTO 60", "30  PRINT *, I", "40  I = I + 1", "50  GOTO 20", "60  END"];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">goto: güçlü ama <em>tehlikeli</em></h2>
    <div class="row" style="flex:1;gap:40px">
      <div class="col" style="width:640px">
        <div class="r" data-s="1" style="position:relative">
          ${code("eski.f", lines, { lang: "fortran", cls: "sm" })}
          <svg viewBox="0 0 640 340" style="position:absolute;left:0;top:0;width:640px;height:340px;pointer-events:none;overflow:visible">
            <defs><marker id="gh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#ff7a7a"/></marker></defs>
            <path class="r rf" data-s="2" d="M440,150 C600,170 600,318 175,318" stroke="#ff7a7a" stroke-width="3.5" fill="none" marker-end="url(#gh)"/>
            <path class="r rf" data-s="2" d="M26,276 C-14,250 -14,178 26,154" stroke="#ff7a7a" stroke-width="3.5" fill="none" marker-end="url(#gh)" stroke-dasharray="9 7"/>
          </svg></div>
        <div class="r" data-s="3">${code("yapisal.c", ["for (i = 1; i <= 5; i++)", "    printf(\"%d\", i);"], { lang: "c", cls: "sm" })}</div>
      </div>
      <div class="col f1">
        <div class="card tint-c r" data-s="2" style="padding:20px 26px"><p style="font-size:22px">Akışı <b>koşulsuz</b> değiştirir. Deyimlerin sırası rastgele belirlenebildiği için okunabilirlik ve güvenilirlik düşer: <b>spagetti kod</b>. Dijkstra, 1968: <i>"Go To Statement Considered Harmful"</i>.</p></div>
        <div class="card r" data-s="4" style="padding:20px 26px"><h3 style="font-size:26px">Dillerin tutumu</h3><p style="font-size:21px;line-height:1.55"><b>Pascal, C:</b> var ama kısıtlı · <b>Java:</b> yok (ayrılmış kelime) · <b>C#:</b> var, özellikle switch içinde</p></div>
        <div class="card r" data-s="5" style="padding:20px 26px"><h3 style="font-size:26px">Etiket biçimleri</h3><p style="font-size:21px;line-height:1.55"><b>Pascal:</b> sayı + <span class="mono">:</span> · <b>FORTRAN:</b> sayı · <b>ALGOL 60, C:</b> isim + <span class="mono">:</span> · <b>Ada:</b> <span class="mono">&lt;&lt;isim&gt;&gt;</span> · <b>PL/I:</b> etiket <b>değişken</b> olabilir → çok esnek, okunamaz</p></div>
      </div>
    </div>
  </div>`;
  })(),
  n: [
    "Bölüm 7.2.4: Akış denetimini koşulsuz değiştirme. Bu deyimlerin en bilineni goto'dur.",
    "Ekrandaki eski FORTRAN programı birden beşe kadar sayıları yazdırıyor. Ama bunu yapmak için iki goto kullanıyor.",
    "Yirminci satırdaki goto ileri, programın sonuna atlıyor; ellinci satırdaki goto ise geriye, yirminci satıra dönüyor. goto, akışı koşulsuz olarak değiştiren güçlü bir deyimdir. Ancak deyimlerin çalışma sırası program metnindeki sıradan tamamen bağımsız hale gelebildiği için okunabilirlik ve güvenilirlik düşer; bakım zorlaşır. Bu tür programlara, iç içe dolanmış oklarına benzetilerek spagetti kod denir. Dijkstra'nın 1968'de yayımladığı, goto deyimi zararlı kabul edilir başlıklı mektubu bu tartışmayı başlattı.",
    "Aynı iş, yapısal bir for döngüsüyle tek bakışta anlaşılır biçimde yazılabilir.",
    "Bugünkü dillerin çoğu goto'ya yer verir ama kullanımını kısıtlar; Pascal ve C bunun örnekleridir. Java'da goto yoktur; kelime ayrılmıştır ama kullanılamaz. C#'ta ise goto vardır ve özellikle switch içinde bir case'den diğerine geçmek için kullanılır.",
    "Etiketlerin biçimi de dillere göre değişir. Pascal'da iki nokta üst üste ile biten işaretsiz sayılar, FORTRAN'da yalnızca sayılar, ALGOL 60 ve C'de iki nokta üst üste ile biten isimler, Ada'da çift açılı ayraçlar içinde isimler kullanılır. PL/I'da ise etiketler değişken olabilir: değer atanabilir ve parametre olarak geçirilebilir. Bu çok esnek ama aynı ölçüde okunamaz ve gerçekleştirilmesi zor bir tasarımdır.",
  ],
},
{
  id: "break-continue", ch: "7.2.4 Koşulsuz dallanma", chip: "<b>7.2.4.2</b> Döngüler için aktarma deyimleri",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0"><em>break</em> ve <em>continue</em>: evcil goto'lar</h2>
    <div class="row" style="flex:1;gap:36px">
      <div class="col" style="width:560px">
        <div class="r" data-s="1">${code("break.c", ["while (okunan % 2 > 0) {", { t: "    if (okunan % 7 == 0)", hot: "1" }, { t: "        break;      // çık", hot: "1" }, "    ...", "    scanf(\"%d\", &okunan);", "}", { t: "// buraya gelir", hot: "1" }], { lang: "c", cls: "xs" })}</div>
        <div class="card r" data-s="5" style="padding:18px 22px"><h3 style="font-size:25px">Etiketli break (Java, C#, Perl last)</h3>${code("java", ["dis:", "for (...) for (...)", "    if (bulundu) break dis;"], { lang: "java", cls: "xs" })}</div>
      </div>
      <div class="col" style="width:560px">
        <div class="r" data-s="2">${code("continue.c", ["while (gozlemler < 500) {", "    scanf(\"%d\", &sayi);", { t: "    if (sayi < 10)", hot: "3" }, { t: "        continue;   // atla", hot: "3" }, "    gozlemler += sayi;", "}"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="3">${trace([{ h: "sayi", color: "amber", align: "center" }, { h: "eylem", color: "text" }, { h: "gozlemler", color: "teal", align: "center" }], [[["120", "eklendi", "120"], 3], [["5", "continue → atlandı", "120"], 3], [["300", "eklendi", "420"], 3]], { fs: 23, hotLast: false })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="4" style="padding:18px 22px"><p style="font-size:21px">Yapısal kural: döngünün <b>tek girişi, tek çıkışı</b> olmalı. Ama erken çıkış ya da yinelemeyi atlama sık gerekir → goto yerine <b>sınırlı</b> deyimler.</p></div>
        <div class="card r" data-s="6" style="padding:18px 22px"><p style="font-size:21px"><b>QuickBASIC:</b> exit · <b>Ada:</b> <span class="mono">exit when</span>, gövdenin herhangi bir yerinde · <b>Fortran 90:</b> CYCLE = continue</p></div>
        <div class="note r" data-s="7" style="font-size:21px">Yazılabilirliği artırır; çıkış döngünün hemen sonuna olduğu için güvenli. Ama zorunlu değiller ve continue akışı izlemeyi zorlaştırır: <b>ölçülü</b> kullanın.</div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.4.2: Döngüler için aktarma deyimleri.",
    "C'de break deyimi, çalıştırıldığı anda en içteki döngüden çıkar. Bu örnekte okunan değer tek olduğu sürece döngü sürer; ama istisnai bir durum var: okunan sayı aynı zamanda yediye tam bölünüyorsa break çalışır ve akış doğrudan döngünün hemen sonrasına geçer.",
    "continue ise döngüyü bitirmez; gövdenin geri kalanını atlayarak denetimi döngünün sınama kısmına aktarır ve bir sonraki yineleme başlar. Bu örnekte okunan sayı ondan küçükse toplama eklenmeden atlanır.",
    "Girdiler yüz yirmi, beş ve üç yüz olsun. Yüz yirmi eklenir. Beş, ondan küçük olduğu için continue çalışır ve atlanır; gozlemler değişmez. Üç yüz eklenir ve toplam dört yüz yirmi olur. Döngü gozlemler beş yüzden küçük olduğu sürece devam eder.",
    "Peki neden bu deyimler var? Yapısal programlama kuralları bir döngünün tek bir girişi ve tek bir çıkışı olmasını ister. Ama döngüden erken çıkmak ya da bir yinelemeyi atlamak pratikte sık gerekir. Dil tasarımcıları bunun için goto yerine, gidebileceği yer sınırlı olan deyimler tanımladılar.",
    "C, C++, Java, Perl ve C#'taki break bir kademe çıkış sağlar. Java ve C# ayrıca etiketli break sunar: iç içe döngülerde etiketi verilen dış döngüden de tek seferde çıkılabilir. Perl'de bunun karşılığı last'tir; Java ve Perl'de continue da etiketli olabilir.",
    "Diğer dillerde de benzerleri vardır: QuickBASIC'te exit; Ada'da döngü gövdesinin herhangi bir yerine konulabilen exit when; Fortran 90'da continue'nun karşılığı olan CYCLE.",
    "Bu deyimler yazılabilirliğe katkıda bulunur ve çıkış döngünün hemen sonuna olduğu için okunabilirliği goto kadar bozmaz. Ama zorunlu değildirler; aynı iş iç içe seçim deyimleriyle de yapılabilir. Özellikle continue, akışı izlemeyi zorlaştırabildiği için ölçülü kullanılmalıdır.",
  ],
},
{
  id: "iterators", ch: "7.2.4 Veri yapısı döngüleri", chip: "<b>7.2.4.3</b> Veri yapılarına dayalı döngüler",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Veri yapısının <em>her elemanı için</em></h2>
    <div class="row" style="flex:1;gap:34px">
      <div class="col" style="width:820px;gap:18px">
        <div class="card r" data-s="1" style="padding:18px 24px"><p style="font-size:22px">Döngüyü bir sayaç değil, bir <b>veri yapısı</b> denetler: bir sonraki elemanı veren bir fonksiyon (yineleyici) eleman kalmayınca döngüyü bitirir.</p></div>
        <div class="r" data-s="2">${code("c", ["for (p = hdr; p != NULL; p = sonraki(p)) { ... }"], { lang: "c", cls: "xs" })}</div>
        <div class="r" data-s="3">${code("java / c#", ["for (String s : myList) { ... }              // Java 5.0", "foreach (string name in names)                // C#", "    Console.WriteLine(\"Name: {0}\", name);"], { lang: "java", cls: "xs" })}</div>
        <div class="r" data-s="4">${code("ruby", ["3.times { puts \"Hey!\" }", "list.each { |value| puts value }", "1.upto(5) { |x| print x, \" \" }      # 1 2 3 4 5"], { lang: "python", cls: "xs" })}</div>
      </div>
      <div class="col f1">
        <div class="card r" data-s="3" style="padding:18px 24px"><p style="font-size:21px"><b>Java:</b> Iterator (<span class="mono">next, hasNext, remove</span>) ya da for-each.<br><b>C#, F#:</b> .NET koleksiyonları (dizi, liste, yığıt, kuyruk) <span class="mono">foreach</span> ile gezilir.</p></div>
        <div class="card r" data-s="4" style="padding:18px 24px"><p style="font-size:21px"><b>Ruby:</b> bloklar <span class="mono">{ }</span> ya da <span class="mono">do … end</span>; <span class="mono">times, each, upto</span> metotlarına verilir. <span class="mono">for</span> bile içeride <span class="mono">each</span>'e çevrilir.</p></div>
        <div class="card r" data-s="5" style="padding:18px 24px"><p style="font-size:21px"><b>PHP:</b> <span class="mono">reset, current, next, prev</span><br><b>Ada:</b> döngü aralığı dizi indisine bağlanır: <span class="mono">for I in MyRange loop … MyArray(I) …</span></p></div>
      </div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.4.3: Veri yapılarına dayalı döngüler.",
    "Buradaki fikir, döngüyü bir sayaçla değil, bir veri yapısı ve onun eleman sırasıyla denetlemektir. Denetim mekanizması, veri yapısının bir sonraki elemanını döndüren bir fonksiyondur; buna yineleyici denir. Eleman kalmadığında döngü biter.",
    "C'de bunu for ile yapabiliriz: p başlık düğümünden başlar, NULL olmadığı sürece döngü sürer ve her adımda sonraki fonksiyonu bir sonraki düğümü verir. Böylece bağlı bir listenin bütün elemanları gezilir.",
    "Java'da Iterator arayüzünün next, hasNext ve remove metotları kullanılabilir; Java 5.0'dan beri de iki nokta üst üste ile yazılan for-each döngüsü vardır: myList'teki her String için gövde çalışır. C# ve F# gibi .NET dilleri dizi, liste, yığıt ve kuyruk gibi koleksiyonların tüm elemanlarını foreach ile gezmeye izin verir.",
    "Ruby'de bloklar, küme parantezleri ya da do end arasında yazılan kod parçalarıdır ve döngü kurmak için metotlara verilir. Üç times bloğu üç kez çalıştırır; each listenin her elemanı için, upto ise birden beşe kadar her sayı için bloğu çağırır. Ruby'nin for deyimi bile içeride each metoduna dönüştürülür.",
    "PHP'de reset, current, next ve prev fonksiyonlarıyla bir dizinin üzerinde gezinilir. Ada'da ise döngü aralığı bir dizinin indis tipine bağlanabilir; böylece döngü değişkeni tam olarak dizinin geçerli indislerini dolaşır.",
  ],
},
// ───────── 7.2.5 guarded commands
{
  id: "guarded", ch: "7.2.5 Güvenlikli komutlar", chip: "<b>7.2.5</b> Güvenlikli komutlar (Dijkstra, 1975)",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Güvenlikli komutlar: <em>bilinçli belirsizlik</em></h2>
    <div class="grid2" style="gap:36px">
      <div class="col">
        <div class="card r" data-s="1" style="padding:20px 26px"><h3 style="font-size:28px">Seçim: if … fi</h3>
          ${code("gcl", ["if x >= y -> max := x", "[] y >= x -> max := y", "fi"], { lang: "text", cls: "sm" })}
          <p style="font-size:21px;margin-top:10px">Bütün korumaları değerlendir. Birden çok doğruysa <b>birini rastgele</b> seç; hiçbiri doğru değilse <b class="cl">çalışma zamanı hatası</b>.</p></div>
        <div class="row r" data-s="2" style="gap:14px;font-size:22px;align-items:center"><span class="pill">x = y = 4</span><span class="arrow">→</span><span style="color:var(--muted)">iki koruma da doğru; hangisi seçilse <b style="color:var(--text)">max = 4</b></span></div>
      </div>
      <div class="col">
        <div class="card r" data-s="3" style="padding:20px 26px"><h3 style="font-size:28px">Döngü: do … od</h3>
          ${code("gcl", ["do q1 > q2 -> takas(q1, q2)", "[] q2 > q3 -> takas(q2, q3)", "[] q3 > q4 -> takas(q3, q4)", "od"], { lang: "text", cls: "sm" })}
          <p style="font-size:21px;margin-top:10px">Her turda doğru bir korumayı seç ve çalıştır; <b>hiçbiri doğru değilse döngüden çık</b>. Sonuç: q1 ≤ q2 ≤ q3 ≤ q4.</p></div>
      </div>
    </div>
    <div class="row" style="gap:24px;margin-top:22px">
      <div class="card r f1" data-s="4" style="padding:18px 24px"><p style="font-size:21px"><b>Düşünce:</b> değerlendirme sırası önemli değilse, program bir sıra <b>dayatmamalı</b>. Amaç: geliştirme sırasında <b>doğrulamayı</b> desteklemek. Eşzamanlı programlamada önemli: <b>CSP</b> ve <b>Ada</b>.</p></div>
      <div class="note r f1" data-s="5" style="font-size:21px">goto'lu programda doğrulama çok zordur; seçim ve mantık döngüleriyle mümkündür; güvenlikli komutlarla <b>görece basittir</b>.</div>
    </div>
  </div>`,
  n: [
    "Bölüm 7.2.5: Güvenlikli komutlar. Dijkstra 1975'te farklı bir seçim ve döngü yapısı önerdi. Amacı, programın geliştirilmesi sırasında doğruluğunun kanıtlanmasını, yani doğrulamayı destekleyen yeni bir programlama metodolojisi kurmaktı.",
    "Seçim yapısı if ile başlar, fi ile biter ve köşeli parantez çiftleriyle ayrılmış korumalı komutlardan oluşur. Her komutun başında bir Boolean koruma vardır. Yapıya ulaşıldığında bütün korumalar değerlendirilir. Birden fazlası doğruysa, aralarından biri belirlenimci olmayan biçimde, yani rastgele seçilir. Hiçbiri doğru değilse çalışma zamanı hatası oluşur.",
    "Örnekte x ve y eşitse iki koruma da doğrudur. Hangisi seçilirse seçilsin max dört olur. İşte fikir burada: sonuç sıraya bağlı değilse, programcı gereksiz bir sıra belirtmek zorunda kalmamalıdır.",
    "Döngü yapısı do ile başlar, od ile biter. Her yinelemede bütün korumalar değerlendirilir; doğru olanlardan biri seçilip çalıştırılır. Hiçbiri doğru değilse döngü sona erer. Bu örnekte komşu değişkenler sırasız olduğu sürece takas edilir; döngü bittiğinde hiçbir koruma doğru olmadığı için dört değişken küçükten büyüğe sıralanmış olur.",
    "Arkasındaki düşünce şudur: değerlendirme sırası önemli değilse, program böyle bir seçimi dayatmamalıdır. Bu yapılar, eşzamanlı programlama için önemli olan iki dil mekanizmasının, CSP ve Ada'nın temelini oluşturdu.",
    "Denetim yapıları ile program doğrulaması arasında güçlü bir ilişki vardır. goto kullanan bir programı doğrulamak çok zordur; seçim ve mantık denetimli döngüler kullanıldığında doğrulama mümkündür; güvenlikli komutlarla ise görece daha basittir.",
  ],
},
// ───────── summary / quiz / outro
{
  id: "summary", ch: "Özet ve mini test", chip: "Özet",
  html: `
  <div class="wrap">
    <h2 class="t r" data-s="0">Toparlayalım</h2>
    <div class="grid2" style="zoom:1.2">
      ${[["🧩", "t", "Yapısal programlama", "Sıra, seçim, yineleme; tek giriş tek çıkış. Anlaşılabilirlik ve bakım kolaylığı; goto yok."], ["✍️", "a", "Atama", "= ve := ; koşullu hedef, birleşik atama, ++/--, ifade olarak atama, çoklu atama, karışık biçim."],
         ["🔀", "v", "Seçim", "if-else ve sallanan else; kısa devre; case/switch, düşme ve break, C# ve Ada'nın güvenli tasarımları."], ["🔁", "c", "Yineleme ve dallanma", "Sayaç ve mantık denetimli, önce/sonra sınanan döngüler; break, continue, yineleyiciler, güvenlikli komutlar."]]
        .map(([e, c, h, p], i) => `<div class="card tint-${c} r rp" data-s="${i + 1}" style="display:flex;gap:28px;align-items:flex-start"><div class="ic ${c}" style="margin:0">${e}</div><div><h3>${h}</h3><p>${p}</p></div></div>`).join("")}
    </div>
  </div>`,
  n: [
    "Toparlayalım.",
    "Yapısal programlama, akış denetimini sıra, seçim ve yineleme olmak üzere tek girişli ve tek çıkışlı üç yapıyla kurar. Amacı programın anlaşılabilirliğini ve bakımını kolaylaştırmaktır; bu yüzden goto'ya yer vermez.",
    "Atama, imperatif dillerin temel işlemidir. Eşittir ve iki nokta eşittir sembolleri; koşullu hedefler, birleşik atamalar, artırma ve azaltma işlemcileri, ifade olarak atama, çoklu atama ve karışık biçim ataması dillerin farklı tasarım seçimleridir.",
    "Seçim yapılarında sallanan else, en yakın if kuralı ya da end if gibi kapanış kelimeleriyle çözülür. Kısa devre değerlendirme hem koruma sağlar hem de yan etki riski taşır. Çoklu seçimde C'nin switch'i düşmeye izin verir; C# ve Ada daha güvenli tasarımlar sunar.",
    "Döngüler sayaç ya da mantık denetimli, önce ya da sonra sınanan olabilir. break ve continue, goto'nun evcilleştirilmiş halleridir; yineleyiciler veri yapılarını gezmeyi kolaylaştırır; Dijkstra'nın güvenlikli komutları ise doğrulamayı destekler.",
  ],
},
{
  id: "quiz", ch: "Özet ve mini test", chip: "Mini test",
  html: (() => {
    const quiz = [["count = 5 iken sum = count++; çalışınca sum ve count kaç olur?", "sum = 5, count = 6"], ["if (a) if (b) x = 1; else x = 2; — else hangi if'e aittir (C, Java)?", "İçteki if (b)'ye: en yakın eşleşmemiş if."], ["switch (x) { case 1: a++; case 2: b++; break; } — x = 1 ise ne olur?", "a ve b artar: break olmadığı için case 2'ye düşer."], ["Pascal'da for i := 1 to 10 döngüsünde gövde son değişkenini azaltırsa döngü kaç kez çalışır?", "10 kez — sınırlar yalnızca başta bir kez değerlendirilir."], ["x = 10 iken do { … } while (x < 5); gövdesi kaç kez çalışır?", "1 kez — sonra sınanan döngü."]];
    return `
  <div class="wrap">
    <h2 class="t r" data-s="0">Kendini <em>test et</em> <span class="emo">🧠</span></h2>
    <div class="stack" style="flex:1">
      ${quiz.map(([q, a], i) => `
      <div class="col r" data-s="${1 + i * 2}" data-h="${3 + i * 2}" style="gap:34px">
        <div class="card" style="padding:44px 50px"><div class="mono" style="color:var(--amber);font-size:28px;margin-bottom:16px">SORU ${i + 1} / ${quiz.length}</div>
          <div style="font-size:44px;font-weight:600;line-height:1.35">${q.replace(/&/g, "&amp;")}</div></div>
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
    { t: "Soru 1. count beş iken sum eşittir count artı artı çalışınca sum ve count kaç olur?", pause: 3.5 }, "Cevap: sum beş, count altı. Sonek artırmada önce değer atanır, sonra artırılır.",
    { t: "Soru 2. if a, if b, x eşittir bir, else x eşittir iki. Bu else hangi if'e aittir?", pause: 3.5 }, "Cevap: İçteki if b'ye. C ve Java'da else, en yakın eşleşmemiş if ile eşleşir.",
    { t: "Soru 3. switch x, case bir: a artı artı, case iki: b artı artı ve break. x bir ise ne olur?", pause: 3.5 }, "Cevap: Hem a hem b artar. Case birin sonunda break olmadığı için akış case ikiye düşer.",
    { t: "Soru 4. Pascal'da i birden ona giden bir for döngüsünde, gövde son değişkenini her seferinde azaltırsa döngü kaç kez çalışır?", pause: 3.5 }, "Cevap: On kez. Pascal'da sınırlar yalnızca döngünün başında bir kez değerlendirilir.",
    { t: "Soru 5. x on iken, x beşten küçük olduğu sürece dönen bir do while döngüsünün gövdesi kaç kez çalışır?", pause: 3.5 }, "Cevap: Bir kez. Sonra sınanan döngüde gövde, koşula bakılmadan önce bir kez çalışır.",
  ],
},
{
  id: "outro", ch: "Özet ve mini test", chip: "",
  html: `
  <div class="wrap center" style="top:0;bottom:0">
    <div class="r big" data-s="0" style="font-size:110px;text-align:center;line-height:1.1">Bölüm 7 <span style="color:var(--amber)">tamam!</span></div>
    <div class="r" data-s="0" style="font-size:36px;color:var(--muted);margin-top:30px">Programlama Dilleri · <b style="color:var(--text)">Bölüm 1–7</b> konu anlatım serisi</div>
    <div class="r" data-s="1" style="font-size:26px;color:var(--faint);margin-top:70px;text-align:center;line-height:1.6">Kaynaklar: Sebesta · Watt · Scott · Z. Orhan · M. Şahin · Ahmet Yesevi Üniversitesi · D. Evans · O. Nierstrasz</div>
  </div>`,
  n: [
    "Bölüm 7'yi tamamladık! Böylece yapısal programlama ve akış denetimi konusunu da bitirmiş olduk.",
    "Pratik için, aynı problemi, örneğin birden n'e kadar toplamı, while, do while ve for döngüleriyle ayrı ayrı yazın ve aralarındaki farkları gözlemleyin. İzlediğiniz için teşekkürler, görüşmek üzere!",
  ],
},
];
