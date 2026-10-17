import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playError } from '../lib/sound';

const SQUARES = Array.from({ length: 9 }, (_, i) => i);

const IMAGES = ['🌵', '🪨', '🧱', '💀', '🗿', '🍄', '🪐', '🎭', '🤡'];

export default function Captcha() {
  const { captchaVisible, hideCaptcha, surrendered, drainAura } = useChaos();
  const [selected, setSelected] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');

  const toggle = (i: number) => {
    setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  };

  const handleVerify = () => {
    playError();
    drainAura(10);
    setAttempts(a => a + 1);
    setMessage('you are a robot (an NPC one) — try again');
    setSelected([]);
  };

  if (!captchaVisible || surrendered) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/70"
        style={{ zIndex: 'var(--z-modal)' }}
      >
        <div
          className="glass-card p-6 w-80 max-w-[92vw]"
          style={{ border: '1px solid var(--color-acid)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="font-display font-bold" style={{ color: 'var(--color-white)' }}>
              ☑ I am not a robot
            </p>
            <button
              onClick={hideCaptcha}
              className="text-muted text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              ✕
            </button>
          </div>

          <p className="text-sm mb-3" style={{ color: 'var(--color-muted)' }}>
            Select all squares with <strong style={{ color: 'var(--color-acid)' }}>sigma energy</strong>.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-1 mb-4">
            {SQUARES.map(i => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className="aspect-square flex items-center justify-center text-2xl rounded transition-all"
                style={{
                  background: selected.includes(i)
                    ? 'rgba(57,255,20,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  border: selected.includes(i)
                    ? '2px solid var(--color-acid)'
                    : '2px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                }}
              >
                {IMAGES[i]}
              </button>
            ))}
          </div>

          {message && (
            <p className="text-xs mb-3 text-center" style={{ color: 'var(--color-pink)' }}>
              {message}
            </p>
          )}

          {attempts > 2 && (
            <p className="text-xs mb-3 text-center" style={{ color: 'var(--color-muted)' }}>
              attempt #{attempts} — aura draining faster now 💀
            </p>
          )}

          <button
            onClick={handleVerify}
            className="w-full py-2 rounded font-display font-semibold text-black"
            style={{ background: 'var(--color-acid)', cursor: 'pointer' }}
          >
            Verify
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
