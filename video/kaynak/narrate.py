"""Split narration into sentences, convert to TTS-friendly Turkish, synthesize with Piper (sherpa-onnx).
usage: python3 -I narrate.py <build_dir> <voice_dir> [--only id,id] [--dry]
writes <build>/audio/<id>/<step>_<k>.wav, <build>/audio/sentences.json, <build>/audio/durations.json
"""
import sys, os, re, json, glob

GAP = 0.32  # silence between sentences of one step

SUBS = [
    (r"\bGNU\b", "Ge En U"), (r"\blex\(\)", "leks"), (r"\blex\b", "leks"), (r"\bflex\b", "fleks"), (r"getChar", "get çar"), (r"addChar", "ed çar"), (r"nextChar", "nekst çar"),
    (r"charClass", "çar klas"), (r"nextToken", "nekst tokın"), (r"\bLETTER\b", "leter"), (r"\bDIGIT\b", "dicit"), (r"INT_LIT", "int lit"), (r"\bIDENT\b", "aydent"),
    (r"ASSIGN_OP", "esayn op"), (r"SEMICOLON", "semikolın"), (r"\bfactor\b", "faktör"), (r"\bexp\b", "eksp"), (r"\baddop\b", "ed op"), (r"\bmulop\b", "mal op"),
    (r"\bnum\b", "nam"), (r"\bFIRST\b", "först"), (r"\bFOLLOW\b", "falov"), (r"LALR\(1\)", "La Lar bir"), (r"SLR\(1\)", "Es El Ar bir"), (r"LR\(0\)", "El Ar sıfır"),
    (r"LR\(1\)", "El Ar bir"), (r"LL\(1\)", "El El bir"), (r"\bLL\b", "El El"), (r"\bLR\b", "El Ar"), (r"\bACTION\b", "ekşın"), (r"\bGOTO\b", "go tu"),
    (r"\bshift", "şift"), (r"\breduce", "ridyus"), (r"\bhandle\b", "hendıl"), (r"\byacc\b", "yak"), (r"\bbison\b", "bayzın"), (r"\bANTLR\b", "Antlır"),
    (r"\bid\b", "ay di"), (r"\bEOF\b", "i o ef"), (r"lookahead", "luk ehed"), (r"\bsum1\b", "sam bir"), (r"\bsum\b", "sam"), (r"\bint\b", "int"),
    (r"\bEBNF", "E Bi En Ef"), (r"Noam Chomsky", "Noam Çomski"), (r"\bCFG\b", "Si Ef Ci"), (r"lexeme", "leksim"), (r"\bindex\b", "indeks"),
    (r"\bstmts\b", "steytmınts"), (r"\bstmt\b", "steytmınt"), (r"expr(\d)", r"ekspreşın \1"), (r"\bexpr\b", "ekspreşın"), (r"\bterm\b", "törm"),
    (r"\bconst\b", "konst"), (r"\bassign\b", "esayn"), (r"proc_name", "prok neym"), (r"actual_type", "ekçuıl tayp"), (r"expected_type", "ekspektıd tayp"),
    (r"\blookup\b", "lukap"), (r"\breal\b", "riıl"), (r"Donald Knuth", "Donıld Knut"), (r"\bVDL\b", "Vi Di El"), (r"Dana Scott", "Deyna Skat"),
    (r"Christopher Strachey", "Kristofır Streyçi"), (r"M_bin", "em bin"), (r"VARMAP", "var map"), (r"\bloop\b", "luup"), (r"\bout\b", "aut"),
    (r"\bthen\b", "den"), (r"\belse\b", "els"), (r"\bdownto\b", "daun tu"), (r"\bISO\b", "İso"), (r"\b2y\b", "iki ye"), (r"\b3x\b", "üç iks"),
    (r"\bvar\b", "var"), (r"Hesapla", "Hesapla"),
    (r"SIMULA", "Simula"), (r"IF-THEN-ELSE", "if den els"), (r"\bIF\b", "if"), (r"\bCASE\b", "keys"), (r"\bANSI\b", "Ansi"), (r"\bBNF", "Bi En Ef"),
    (r"\bABD\b", "A Be De"), (r"\bDoD\b", "Di O Di"), (r"Fortran IV", "Fortran dört"), (r"Fortran II\b", "Fortran iki"), (r"Fortran I\b", "Fortran bir"),
    (r"Konrad Zuse", "Konrad Tsuze"), (r"Zuse", "Tsuze"), (r"ENIAC", "Eniak"), (r"\bZ4\b", "Zet dört"), (r"Mauchly", "Moçli"), (r"BINAC", "Baynek"),
    (r"\bX0\b", "iks sıfır"), (r"\bY0\b", "ye sıfır"), (r"Speedcoding", "Spiid kodink"), (r"Grace Hopper", "Greys Hapır"), (r"UNIVAC", "Yunivek"),
    (r"David Wheeler", "Deyvid Viilır"), (r"Cambridge", "Keymbriç"), (r"\bDO\b", "du"), (r"lingua franca", "lingua franka"), (r"McCarthy", "Mek Karti"),
    (r"\bMIT\b", "Em Ay Ti"), (r"Alonzo Church", "Alonzo Çörç"), (r"\bCAR\b", "kar"), (r"\bCDR\b", "kudır"), (r"\bACM\b", "A Se Em"), (r"\bGAMM\b", "Gamm"),
    (r"\bbegin\b", "bigin"), (r"FLOW-MATIC", "Flov Matik"), (r"DATA DIVISION", "Deyta Divijın"), (r"PROCEDURE DIVISION", "Prosiicır Divijın"),
    (r"Kemeny", "Kemeni"), (r"Kurtz", "Körts"), (r"Dartmouth", "Dartmut"), (r"\bFOR\b", "for"), (r"\bNEXT\b", "nekst"), (r"\bSHARE\b", "Şeyr"), (r"\bGUIDE\b", "Gayd"),
    (r"System/360", "Sistım üç yüz altmış"), (r"\bNPL\b", "En Pe Le"), (r"PL/I", "Pe El Bir"), (r"Ken Iverson", "Ken Ayvırsın"), (r"SNOBOL", "Snobol"),
    (r"Griswold", "Grizvold"), (r"\bawk\b", "ok"), (r"\bIcon\b", "Aykın"), (r"Kristen Nygaard", "Kristen Nügor"), (r"Ole-Johan Dahl", "Ole Yohan Dal"),
    (r"van Wijngaarden", "fan Vaynhaardın"), (r"Niklaus Wirth", "Niklaus Virt"), (r"Wirth", "Virt"), (r"\bBCPL\b", "Bi Si Pi El"), (r"\bB dillerinden", "Bi dillerinden"),
    (r"Dennis Ritchie", "Denis Riçi"), (r"Modula-2", "Modula iki"), (r"Alain Colmerauer", "Alen Kolmorer"), (r"Philippe Roussel", "Filip Rusel"), (r"Kowalski", "Kovalski"),
    (r"\bJuan", "Huan"), (r"Augusta Ada Byron", "Augusta Ada Bayrın"), (r"Strawman", "Stromen"), (r"Woodman", "Vudmen"), (r"Tinman", "Tinmen"),
    (r"Ironman", "Ayırnmen"), (r"Steelman", "Stiilmen"), (r"Xerox PARC", "Ziroks Park"), (r"Alan Kay", "Elın Key"), (r"Adele Goldberg", "Adel Goldberg"),
    (r"Bjarne Stroustrup", "Biyarne Stravstrup"), (r"Bertrand Meyer", "Bertran Mayer"), (r"Delphi", "Delfi"), (r"Sun Microsystems", "San Maykrosistıms"),
    (r"\bSun\b", "San"), (r"Netscape", "Netskeyp"), (r"LiveScript", "Layv Skript"), (r"Larry Wall", "Leri Vol"), (r"\bCGI\b", "Si Ci Ay"), (r"\bsh\b", "eş haş"),
    (r"Guido van Rossum", "Gido fan Rosum"), (r"Ierusalimschy", "Yerusalimski"), (r"\bMatz\b", "Mets"), (r"\btimes\b", "taymz"), (r"\bCLR\b", "Si El Ar"),
    (r"\bJSP\b", "Ce Es Pe"), (r"Java Server Pages", "Cava Sörvır Peyciz"), (r"Servlet", "Sörvlet"), (r"Managed", "Menecd"), (r"\bHTML\b", "Ha Te Em Le"),
    (r"Xerox", "Ziroks"), (r"\bEdinburgh", "Edinbırg"), (r"Marsilya", "Marsilya"), (r"Common LISP", "Komın Lisp"), (r"Miranda", "Miranda"),
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
