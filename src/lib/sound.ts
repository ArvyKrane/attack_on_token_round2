// sound.ts — Web Audio API synth engine + speech TTS + mute state
// All sounds are synthesised — zero external audio files, zero copyright issues.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let _muted = false;
export let audioUnlocked = false;

const MAX_VOLUME = 0.55;

function getCtx(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = MAX_VOLUME;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Must be called from a user gesture to unlock Web Audio */
export function unlockAudio(): void {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    audioUnlocked = true;
  } catch (e) {
    console.warn('Audio unlock warning:', e);
  }
}

export function getMuted(): boolean {
  return _muted;
}

export function setMuted(val: boolean): void {
  _muted = val;
  if (masterGain) {
    masterGain.gain.value = val ? 0 : MAX_VOLUME;
  }
  if (val && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function toggleMute(): boolean {
  setMuted(!_muted);
  return _muted;
}

function now(): number {
  return getCtx().currentTime;
}

function osc(
  type: OscillatorType,
  freq: number,
  dur: number,
  vol = 0.4,
  pitchEnd?: number,
): void {
  if (_muted) return;
  try {
    const ctx = getCtx();
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, now());
    g.gain.exponentialRampToValueAtTime(0.0001, now() + dur);
    g.connect(masterGain!);

    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, now());
    if (pitchEnd !== undefined) {
      o.frequency.exponentialRampToValueAtTime(Math.max(10, pitchEnd), now() + dur);
    }
    o.connect(g);
    o.start(now());
    o.stop(now() + dur);
  } catch (e) {
    console.warn('Osc warning:', e);
  }
}

function noise(dur: number, vol = 0.3): void {
  if (_muted) return;
  try {
    const ctx = getCtx();
    const bufSize = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, now());
    g.gain.exponentialRampToValueAtTime(0.0001, now() + dur);

    src.connect(g);
    g.connect(masterGain!);
    src.start(now());
  } catch (e) {
    console.warn('Noise warning:', e);
  }
}

// ---------- named sounds ----------

export function playCoin(): void {
  unlockAudio();
  osc('square', 988, 0.1, 0.3);
  setTimeout(() => osc('square', 1319, 0.18, 0.35), 80);
}

export function playError(): void {
  unlockAudio();
  osc('sawtooth', 220, 0.14, 0.45, 90);
  setTimeout(() => osc('sawtooth', 170, 0.18, 0.45, 60), 120);
}

export function playVineBoom(): void {
  unlockAudio();
  if (_muted) return;
  try {
    const ctx = getCtx();
    // Deep punch + sub bass drop
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.9, now());
    g.gain.exponentialRampToValueAtTime(0.0001, now() + 1.1);
    g.connect(masterGain!);

    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(95, now());
    o.frequency.exponentialRampToValueAtTime(25, now() + 1.1);
    o.connect(g);
    o.start(now());
    o.stop(now() + 1.1);

    noise(0.12, 0.5);
  } catch (e) {
    console.warn('Vine boom error:', e);
  }
}

export function playAirhorn(): void {
  unlockAudio();
  const notes = [466.16, 466.16, 466.16, 466.16, 622.25];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      osc('sawtooth', freq, 0.18, 0.5);
    }, idx * 130);
  });
}

export function playPop(): void {
  unlockAudio();
  osc('sine', 650, 0.08, 0.35, 250);
}

export function playOof(): void {
  unlockAudio();
  osc('sawtooth', 360, 0.22, 0.45, 110);
}

export function playDing(): void {
  unlockAudio();
  osc('triangle', 1175, 0.35, 0.3);
}

export function playScream(): void {
  unlockAudio();
  osc('sawtooth', 880, 0.25, 0.4, 440);
  setTimeout(() => osc('sawtooth', 1320, 0.2, 0.35, 660), 140);
}

/** Synthesized 8-bit snippet of Never Gonna Give You Up */
export function playRickrollMelody(): void {
  unlockAudio();
  // Notes: D4, E4, G4, E4, B4, A4...
  const tune = [
    { f: 293.66, d: 0.18 }, // D4
    { f: 329.63, d: 0.18 }, // E4
    { f: 392.00, d: 0.22 }, // G4
    { f: 329.63, d: 0.18 }, // E4
    { f: 493.88, d: 0.35 }, // B4
    { f: 440.00, d: 0.40 }, // A4
  ];

  tune.forEach((note, i) => {
    setTimeout(() => {
      osc('square', note.f, note.d, 0.3);
    }, i * 200);
  });
}

/** Funny robot speech synthesis for roasts */
export function speakRoast(text: string): void {
  if (_muted || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 0.9;
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
}
