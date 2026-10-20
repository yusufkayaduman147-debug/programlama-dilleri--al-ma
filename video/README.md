# Programlama Dilleri — Konu Anlatım Videoları

Ders sunumlarındaki (PD1–PD5) konuları anlatan, animasyonlu, Türkçe seslendirmeli videolar.
Her videoda gömülü Türkçe altyazı (ayrıca `.tr.srt` dosyası), bölüm işaretleri (chapter) ve sonunda 5 soruluk mini test var.

| Video | Süre | İçerik |
|---|---|---|
| `ProgramlamaDilleri_Bolum1_Giris.mp4` | ~39 dk | Neden dil kavramları, programlama alanları, değerlendirme kriterleri, von Neumann, paradigmalar, ödünleşimler, derleme/yorumlama/JIT, platformlar |
| `ProgramlamaDilleri_Bolum2_Dillerin_Gelisimi.mp4` | ~32 dk | Plankalkül, sözde kodlar, Fortran, LISP, ALGOL, COBOL, BASIC, PL/I, APL/SNOBOL, SIMULA, Pascal/C, Prolog, Ada, Smalltalk, C++, Java, betik diller, C#, hibrit diller |
| `ProgramlamaDilleri_Bolum3_Sentaks_ve_Semantik.mp4` | ~31 dk | Lexeme/token, BNF/EBNF, türetme ve ayrıştırma ağacı, belirsizlik, öncelik, birleşirlik, sözdizim grafikleri, özellik gramerleri, işlemsel/aksiyomatik/denotasyonel semantik |
| `ProgramlamaDilleri_Bolum4_Sozcuksel_ve_Sentaks_Analiz.mp4` | ~22 dk | Sözcüksel analiz ve durum diyagramı, ayrıştırma problemi, özyinelemeli iniş, FIRST/FOLLOW ve LL(1), shift-reduce, LR ayrıştırma |
| `ProgramlamaDilleri_Bolum5_Adlar_Baglama_Kapsam.mp4` | ~30 dk | Değişkenin özellikleri (isim, adres, değer, tip, ömür, kapsam), takma adlar, sabitler, işlemciler ve ifadeler, yan etkiler, kısa devre, bağlama zamanları, tip ve bellek bağlama, statik/dinamik kapsam, tip kontrolü ve uyumluluk |

## Nasıl üretildi
- **Sahneler:** HTML/CSS ile tasarlandı (`kaynak/bolumN/scenes*.js`), Chromium (Playwright) ile kare kare yakalanıp 30 fps kaydedildi (`kaynak/render.js`).
- **Seslendirme:** Çevrimdışı nöral Türkçe ses (Piper `tr_TR-dfki-medium`, sherpa-onnx) — `kaynak/narrate.py` (terimler için Türkçe telaffuz kuralları içerir). Telaffuz Whisper ile örneklenerek kontrol edildi.
- **Birleştirme:** ffmpeg ile kare-hassas ses/altyazı/bölüm hizalama — `kaynak/assemble.py`.

Kaynak: R. W. Sebesta, *Concepts of Programming Languages* ve ders sunumları.
