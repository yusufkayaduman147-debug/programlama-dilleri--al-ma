import sys, re, subprocess, numpy as np, soundfile as sf
mp4, srt, phrase, out = sys.argv[1:5]
txt = open(srt).read()
m = re.search(r"(\d\d:\d\d:\d\d,\d\d\d) --> .*\n[^\n]*" + re.escape(phrase), txt)
h, mi, s = m.group(1).replace(",", ".").split(":"); t = int(h) * 3600 + int(mi) * 60 + float(s)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(t + 1.0), "-i", mp4, "-frames:v", "1", "-vf", "scale=960:-1", out], check=True)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(t), "-t", "3.5", "-i", mp4, "-vn", "-ac", "1", "-ar", "16000", "/tmp/claude-0/-home-user-programlama-dilleri--al-ma/12bb24ac-1272-59e0-b149-5d316713804d/scratchpad/sync.wav"], check=True)
exec(open("tools/asr.py").read().split("for f in sys.argv[2:]")[0].replace("d = sys.argv[1]", "d='voices/sherpa-onnx-whisper-small'"))
a, _ = sf.read("/tmp/claude-0/-home-user-programlama-dilleri--al-ma/12bb24ac-1272-59e0-b149-5d316713804d/scratchpad/sync.wav", dtype="float32")
st = r.create_stream(); st.accept_waveform(16000, a); r.decode_stream(st)
print(f"t={t:.1f}s  ASR: {st.result.text}")
