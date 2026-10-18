# Programlama Dilleri — Bölüm 1: Giriş (konu anlatım videosu)

`ProgramlamaDilleri_Bolum1_Giris.mp4` — 1920×1080, ~39 dakika, Türkçe seslendirme,
gömülü Türkçe altyazı (ayrıca `.tr.srt` dosyası) ve bölüm işaretleri (chapter).

| Süre  | Bölüm |
|-------|-------|
| 00:00 | Giriş ve yol haritası |
| 00:51 | 1.1 Programlama dili kavramlarını öğrenmenin nedenleri |
| 04:27 | 1.2 Programlama alanları |
| 05:38 | 1.3 Dil değerlendirme kriterleri (okunabilirlik, yazılabilirlik, güvenilirlik, maliyet) |
| 19:10 | 1.4 Dil tasarımını etkileyen faktörler (von Neumann, getir–yürüt, tasarım yöntemleri) |
| 22:49 | 1.5 Dil kategorileri (imperatif, fonksiyonel, mantıksal, nesne yönelimli; Dexter & Mimi örneği) |
| 28:55 | 1.6 Dil tasarımında verilen ödünler |
| 30:06 | 1.7 İmplementasyon yöntemleri (derleme, yorumlama, hibrit, JIT, önişlemci) |
| 35:58 | 1.8 Programlama platformları |
| 37:01 | Özet ve mini test (5 soru) |

## Nasıl üretildi
- **Sahneler:** HTML/CSS ile tasarlandı (`kaynak/scenes*.js`), Chromium (Playwright) ile kare kare yakalanıp
  animasyonlar 30 fps olarak kaydedildi (`kaynak/render.js`).
- **Seslendirme:** Çevrimdışı nöral Türkçe ses (Piper `tr_TR-dfki-medium`, sherpa-onnx) — `kaynak/narrate.py`.
  Telaffuz Whisper ile kontrol edildi.
- **Birleştirme:** ffmpeg ile kare-hassas ses/altyazı/bölüm hizalama — `kaynak/assemble.py`.

Kaynak: R. W. Sebesta, *Concepts of Programming Languages* ve ders sunumu (PD1.pptx).
