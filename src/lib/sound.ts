// sound.ts — Web Audio API synth engine + mute state
// All sounds are synthesised — no external audio files, no copyright issues.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let _muted = false;
export let audioUnlocked = false;

const MAX_VOLUME = 0.45; // never exceed

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = MAX_VOLUME;
    masterGain.connect(audioCtx.destination);
  }
  return audioCtx;
}

/** Must be called from a user gesture to unlock Web Audio */
export function unlockAudio(): void {
  if (audioUnlocked) return;
  getCtx();
  audioUnlocked = true;
}

export function getMuted(): boolean {
  return _muted;
}

export function setMuted(val: boolean): void {
  _muted = val;
  if (masterGain) {
    masterGain.gain.value = val ? 0 : MAX_VOLUME;
  }
}

export function toggleMute(): boolean {
  setMuted(!_muted);
  return _muted;
}

// ---------- helpers ----------

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
  if (_muted || !audioUnlocked) return;
  const ctx = getCtx();
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, now());
  g.gain.exponentialRampToValueAtTime(0.0001, now() + dur);
  g.connect(masterGain!);

  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, now());
  if (pitchEnd !== undefined) {
    o.frequency.exponentialRampToValueAtTime(pitchEnd, now() + dur);
  }
  o.connect(g);
  o.start(now());
  o.stop(now() + dur);
}

function noise(dur: number, vol = 0.3): void {
  if (_muted || !audioUnlocked) return;
  const ctx = getCtx();
  const bufSize = ctx.sampleRate * dur;
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
}

// ---------- named sounds ----------

export function playCoin(): void {
  osc('square', 988, 0.1, 0.3);
  setTimeout(() => osc('square', 1319, 0.15, 0.3), 80);
}

export function playError(): void {
  osc('sawtooth', 200, 0.12, 0.35, 80);
  setTimeout(() => osc('sawtooth', 160, 0.15, 0.35, 60), 140);
}

export function playVineBoom(): void {
  if (_muted || !audioUnlocked) return;
  const ctx = getCtx();
  // Deep sub bass drop
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.8, now());
  g.gain.exponentialRampToValueAtTime(0.0001, now() + 0.9);
  g.connect(masterGain!);
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(80, now());
  o.frequency.exponentialRampToValueAtTime(30, now() + 0.9);
  o.connect(g);
  o.start(now());
  o.stop(now() + 0.9);
  noise(0.07, 0.4);
}

export function playAirhorn(): void {
  osc('sawtooth', 466, 0.6, 0.5, 440);
  setTimeout(() => osc('sawtooth', 440, 0.5, 0.4), 400);
}

export function playPop(): void {
  osc('sine', 600, 0.08, 0.3, 200);
}

export function playOof(): void {
  osc('sine', 350, 0.2, 0.4, 120);
}

export function playDing(): void {
  osc('triangle', 1047, 0.3, 0.25);
}

export function playShake(): void {
  noise(0.15, 0.25);
}

export function playScream(): void {
  osc('sawtooth', 880, 0.3, 0.4, 440);
  setTimeout(() => osc('sawtooth', 1320, 0.2, 0.3, 660), 150);
}
