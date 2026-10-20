"""Split narration into sentences, convert to TTS-friendly Turkish, synthesize with Piper (sherpa-onnx).
usage: python3 -I narrate.py <build_dir> <voice_dir> [--only id,id] [--dry]
writes <build>/audio/<id>/<step>_<k>.wav, <build>/audio/sentences.json, <build>/audio/durations.json
"""
import sys, os, re, json, glob

GAP = 0.32  # silence between sentences of one step

SUBS = [
    (r"Visual Studio Code", "Vijuıl Stüdyo Kod"), (r"Visual Studio", "Vijuıl Stüdyo"), (r"Visual Basic", "Vijuıl Beyzik"),
    (r"VB\.NET", "Vi Bi dat net"), (r"\.NET", "dat net"), (r"IntelliJ IDEA", "İntelicey Aydiya"), (r"Eclipse", "İklips"),
    (r"JavaScript", "Cava Skript"), (r"JScript", "Cey Skript"), (r"\bjavac\b", "cava si"), (r"Java", "Cava"),
    (r"C\+\+", "Si artı artı"), (r"C#", "Si şarp"), (r"\bC\b(?![+#])", "Si"),
    (r"Prolog\+\+", "Prolog artı artı"), (r"\bCLOS\b", "Klos"),
    (r"FORTRAN", "Fortran"), (r"COBOL", "Kobol"), (r"LISP", "Lisp"), (r"ALGOL", "Algol"), (r"\bAPL\b", "A Pe Le"),
    (r"UNIX", "Yuniks"), (r"Python", "Paytın"), (r"\bPerl\b", "Pörl"), (r"\bRuby\b", "Rubi"), (r"\bPHP\b", "Pe Ha Pe"),
    (r"Haskell", "Haskıl"), (r"Scheme", "Skiim"), (r"Smalltalk", "Smoltok"), (r"Eiffel", "Ayfıl"), (r"\bML\b", "Em El"),
    (r"XHTML", "İks Ha Te Em Le"), (r"\bXML\b", "İks Em Le"), (r"XSLT", "İks Es El Te"), (r"JSTL", "Ce Es Te Le"),
    (r"\bIBM\b", "Ay Bi Em"), (r"\bVAX\b", "Vaks"), (r"\bADDL\b", "Ed El"), (r"\bAR\b", "A Ar"),
    (r"\bJVM\b", "Ce Vi Em"), (r"\bJIT\b", "Cit"), (r"GPSS", "Ce Pe Se Se"), (r"\bRPG\b", "Ar Pe Ge"), (r"\bAPT\b", "A Pe Te"),
    (r"NetBeans", "Net Biins"), (r"JBuilder", "Ce Bildır"), (r"GNOME", "Gınom"), (r"\bKDE\b", "Ka De E"), (r"\bBASIC\b", "Beyzik"),
    (r"Windows", "Vindovs"), (r"Microsoft", "Maykrosoft"), (r"\bp\b", "pe"), (r"\bq\b", "ku"), (r"INDEX", "İndeks"), (r"\bcount\b", "kaunt"), (r"timeout", "taym aut"), (r"\btrue\b", "tru"), (r"boolean", "bulıyın"),
    (r"\bgoto\b", "go tu"), (r"\bwhile\b", "vayl"), (r"\bstatic\b", "statik"), (r"regular expression", "regülır ekspreşın"),
    (r"\bprint\b", "print"), (r"von Neumann", "fon Noyman"), (r"Backus", "Bekıs"), (r"Hoare'un", "Hoor'un"), (r"Hoare", "Hoor"),
    (r"McCracken", "Mek Kreken"), (r"Daniel", "Danyel"), (r"Robert", "Rabırt"), (r"Dexter", "Dekstır"),
    (r"low-code", "lov kod"), (r"no-code", "no kod"), (r"token", "tokın"), (r"aliasing", "eliasing"), (r"linking", "linking"),
    (r"ed editörünü", "i di editörünü"), (r"-ed\b", "i di"), (r"\bwent\b", "vent"),
    (r"input\.cpp", "input nokta si pi pi"), (r"temp\.cpp", "temp nokta si pi pi"), (r"\bdefine\b", "difayn"), (r"\binclude\b", "inklud"),
    (r"\bMAX\b", "maks"), (r"\bMIN\b", "min"), (r"gcd2", "ce se de iki"), (r"\bgcd\b", "ce se de"),
    (r"ogrenci_no", "öğrenci alt çizgi no"), (r"OGRNNO", "o ge re ne ne o"), (r"\bDo ve End\b", "du ve end"), (r"end loop", "end luup"),
    (r"\bx\b", "iks"), (r"\bfloat\b", "flout"), (r"\bdouble\b", "dabıl"), (r"\bchar\b", "çar"), (r"\bint\b", "int"),
    (r"(\d)\.(\d)", r"\1 nokta \2"), (r"(\d)\s*[-–]\s*(\d)", r"\1 ile \2"),
    (r"\.\.\.", ","), (r"…", ","), (r"[—–]", ","), (r"[“”\"]", ""),
]


def to_tts(t):
    for a, b in SUBS:
        t = re.sub(a, b, t)
    return re.sub(r"\s+", " ", t).strip()


def split(t):
    parts = re.split(r"(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜa-zçğıöşü0-9\"“'])", t.strip())
    return [p for p in parts if p.strip()]


def main():
    build, vdir = sys.argv[1], sys.argv[2]
    only = None
    if "--only" in sys.argv:
        only = set(sys.argv[sys.argv.index("--only") + 1].split(","))
    dry = "--dry" in sys.argv
    data = json.load(open(os.path.join(build, "narration.json")))
    out = os.path.join(build, "audio")
    os.makedirs(out, exist_ok=True)
    meta = {}
    jobs = []
    for sc in data:
        meta[sc["id"]] = []
        for si, st in enumerate(sc["steps"]):
            sents = []
            for k, s in enumerate(split(st["t"])):
                wav = os.path.join(out, sc["id"], f"{si:02d}_{k:02d}.wav")
                sents.append({"sub": s, "tts": to_tts(s), "wav": wav})
                if only is None or sc["id"] in only:
                    jobs.append((wav, sents[-1]["tts"]))
            meta[sc["id"]].append({"sents": sents, "pause": st["pause"]})
    if dry:
        for w, t in jobs:
            print(t)
        return
    import sherpa_onnx, soundfile as sf, numpy as np
    onnx = glob.glob(os.path.join(vdir, "*.onnx"))[0]
    cfg = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
        vits=sherpa_onnx.OfflineTtsVitsModelConfig(model=onnx, tokens=os.path.join(vdir, "tokens.txt"),
                                                   data_dir=os.path.join(vdir, "espeak-ng-data"),
                                                   noise_scale=0.6, noise_scale_w=0.8, length_scale=1.0),
        num_threads=4), max_num_sentences=1)
    tts = sherpa_onnx.OfflineTts(cfg)
    for i, (wav, text) in enumerate(jobs):
        os.makedirs(os.path.dirname(wav), exist_ok=True)
        a = tts.generate(text, sid=0, speed=1.0)
        x = np.asarray(a.samples, dtype=np.float32)
        fi, fo = int(0.012 * a.sample_rate), int(0.04 * a.sample_rate)
        x[:fi] *= np.linspace(0, 1, fi); x[-fo:] *= np.linspace(1, 0, fo)
        sf.write(wav, x, a.sample_rate)
        if i % 40 == 0:
            print(f"{i}/{len(jobs)}", flush=True)
    durs = {}
    for sid, steps in meta.items():
        durs[sid] = []
        for st in steps:
            tot = 0.0
            for s in st["sents"]:
                s["dur"] = sf.info(s["wav"]).duration
                tot += s["dur"]
            tot += GAP * max(0, len(st["sents"]) - 1) + st["pause"]
            durs[sid].append(round(tot, 3))
    json.dump(meta, open(os.path.join(out, "sentences.json"), "w"), ensure_ascii=False, indent=1)
    json.dump(durs, open(os.path.join(out, "durations.json"), "w"), indent=1)
    print("total narration", round(sum(sum(v) for v in durs.values()) / 60, 1), "min")


if __name__ == "__main__":
    main()
