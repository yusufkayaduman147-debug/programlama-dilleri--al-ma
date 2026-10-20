"""Join rendered clips, lay narration on the exact frame timeline, write subtitles + chapters, mux final MP4.
usage: python3 -I assemble.py <build_dir> <out.mp4>
"""
import sys, os, json, re, subprocess
import numpy as np, soundfile as sf

FPS = 30
GAP = 0.32


def ts(t):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def chunks(text, maxlen=84):
    if len(text) <= maxlen:
        return [text]
    parts = re.split(r"(?<=[,;:])\s+", text)
    out, cur = [], ""
    for p in parts:
        if cur and len(cur) + 1 + len(p) > maxlen:
            out.append(cur); cur = p
        else:
            cur = (cur + " " + p).strip()
    if cur:
        out.append(cur)
    # still too long: split on words
    res = []
    for c in out:
        while len(c) > maxlen + 30:
            cut = c.rfind(" ", 0, maxlen)
            res.append(c[:cut]); c = c[cut + 1:]
        res.append(c)
    return res


def wrap2(t, width=46):
    if len(t) <= width:
        return t
    mid = len(t) // 2
    l, r = t.rfind(" ", 0, mid + 8), t.find(" ", mid - 8)
    cut = l if l != -1 and (r == -1 or mid - l <= r - mid) else r
    return t[:cut] + "\n" + t[cut + 1:] if cut > 0 else t


def main():
    build, out = sys.argv[1], sys.argv[2]
    order = json.load(open(os.path.join(build, "narration.json")))
    meta = json.load(open(os.path.join(build, "audio", "sentences.json")))
    tl = {s["id"]: json.load(open(os.path.join(build, "timeline", f"{s['id']}.json"))) for s in order}
    sr = 22050
    total_frames = sum(t["totalFrames"] for t in tl.values())
    audio = np.zeros(int(round(total_frames / FPS * sr)) + sr, dtype=np.float32)
    cues, chapters = [], []
    f0 = 0
    for sc in order:
        sid = sc["id"]
        if not chapters or chapters[-1][1] != sc["ch"]:
            chapters.append([f0, sc["ch"]])
        fstep = f0
        for k, st in enumerate(tl[sid]["steps"]):
            if st.get("out"):
                fstep += st["frames"]; continue
            t = (fstep + st["lead"]) / FPS
            for s in meta[sid][k]["sents"]:
                a, r = sf.read(s["wav"], dtype="float32")
                assert r == sr
                i = int(round(t * sr)); audio[i:i + len(a)] += a
                parts = chunks(s["sub"]); tot = sum(len(p) for p in parts); tt = t
                for p in parts:
                    d = s["dur"] * len(p) / tot
                    cues.append([tt, tt + d, p]); tt += d
                t += s["dur"] + GAP
            fstep += st["frames"]
        assert fstep - f0 == tl[sid]["totalFrames"], sid
        f0 = fstep
    dur = total_frames / FPS
    audio = audio[: int(round(dur * sr))]
    peak = np.abs(audio).max(); audio *= 0.89 / peak
    tmp = os.path.join(build, "final"); os.makedirs(tmp, exist_ok=True)
    sf.write(os.path.join(tmp, "narration.wav"), audio, sr)
    # subtitles: let each cue linger until the next one (max +0.8 s)
    srt = []
    for i, (a, b, txt) in enumerate(cues):
        nxt = cues[i + 1][0] if i + 1 < len(cues) else dur
        b = min(max(b, a + 1.0), nxt - 0.04, b + 0.8) if nxt - 0.04 > a else b
        srt.append(f"{i + 1}\n{ts(a)} --> {ts(b)}\n{wrap2(txt)}\n")
    open(os.path.join(tmp, "subs.srt"), "w").write("\n".join(srt))
    md = [";FFMETADATA1", "title=" + (sys.argv[3] if len(sys.argv) > 3 else "Programlama Dilleri — Bölüm 1: Giriş"), "artist=Konu anlatımı", "language=tur"]
    for i, (fs, name) in enumerate(chapters):
        fe = chapters[i + 1][0] if i + 1 < len(chapters) else total_frames
        md += ["[CHAPTER]", "TIMEBASE=1/30", f"START={fs}", f"END={fe}", f"title={name}"]
    open(os.path.join(tmp, "meta.txt"), "w").write("\n".join(md) + "\n")
    with open(os.path.join(tmp, "clips.txt"), "w") as f:
        for sc in order:
            f.write(f"file '{os.path.abspath(os.path.join(build, 'clips', sc['id'] + '.mp4'))}'\n")
    run = lambda *a: subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *a], check=True)
    run("-f", "concat", "-safe", "0", "-i", os.path.join(tmp, "clips.txt"), "-c", "copy", os.path.join(tmp, "video.mp4"))
    run("-i", os.path.join(tmp, "video.mp4"), "-i", os.path.join(tmp, "narration.wav"), "-i", os.path.join(tmp, "subs.srt"),
        "-i", os.path.join(tmp, "meta.txt"), "-map", "0:v", "-map", "1:a", "-map", "2:s", "-map_metadata", "3", "-map_chapters", "3",
        "-c:v", "copy", "-af", "highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000", "-c:a", "aac", "-b:a", "96k", "-ac", "1",
        "-c:s", "mov_text", "-metadata:s:s:0", "language=tur", "-metadata:s:a:0", "language=tur", "-disposition:s:0", "default",
        "-movflags", "+faststart", out)
    print(f"{out}: {dur / 60:.1f} min, {len(cues)} subtitle cues, {len(chapters)} chapters")
    for fs, name in chapters:
        s = fs / FPS
        print(f"  {int(s // 60):02d}:{int(s % 60):02d}  {name}")


if __name__ == "__main__":
    main()
