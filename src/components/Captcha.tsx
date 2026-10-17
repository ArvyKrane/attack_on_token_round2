import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playError, playDing, unlockAudio } from '../lib/sound';

const SQUARES = Array.from({ length: 9 }, (_, i) => i);
const IMAGES = ['🌵', '🪨', '🧱', '💀', '🗿', '🍄', '🪐', '🎭', '🤡'];

export default function Captcha() {
  const { captchaVisible, hideCaptcha, surrendered, drainAura } = useChaos();
  const [selected, setSelected] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');

  const toggle = (i: number) => {
    unlockAudio();
    playDing();
    setSelected(s => (s.includes(i) ? s.filter(x => x !== i) : [...s, i]));
  };

  const handleVerify = () => {
    unlockAudio();
    playError();
    drainAura(10);
    const newAtt = attempts + 1;
    setAttempts(newAtt);
    setMessage(`Verification Failed: You are a robot (an NPC one). Attempt #${newAtt}`);
    setSelected([]);
  };

  if (!captchaVisible || surrendered) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(3, 4, 8, 0.85)',
          backdropFilter: 'blur(12px)',
          padding: '16px',
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: '24px 28px',
            width: '100%',
            maxWidth: '380px',
            backgroundColor: 'rgba(15, 18, 28, 0.95)',
            border: '2px solid #39ff14',
            boxShadow: '0 0 35px rgba(57, 255, 20, 0.3)',
            borderRadius: '16px',
            color: '#ffffff',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>🛡️</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#39ff14', fontFamily: 'Space Grotesk, sans-serif' }}>
                Human Verification
              </h3>
            </div>
            <button
              onClick={hideCaptcha}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#f5f5f5', lineHeight: 1.4, marginBottom: '16px' }}>
            Select all squares containing <strong style={{ color: '#39ff14' }}>sigma energy</strong>.
          </p>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            {SQUARES.map(i => (
              <button
                key={i}
                onClick={() => toggle(i)}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  borderRadius: '10px',
                  background: selected.includes(i) ? 'rgba(57, 255, 20, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                  border: selected.includes(i) ? '2px solid #39ff14' : '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {IMAGES[i]}
              </button>
            ))}
          </div>

          {message && (
            <p
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ff1493',
                textAlign: 'center',
                marginBottom: '14px',
                lineHeight: 1.3,
              }}
            >
              ⚠️ {message}
            </p>
          )}

          <button
            onClick={handleVerify}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: '1rem',
              color: '#000000',
              background: '#39ff14',
              boxShadow: '0 0 16px rgba(57, 255, 20, 0.5)',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Verify Identity
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#9ca3af', fontFamily: 'monospace', margin: 0 }}>
            ⌨️ [Press Left-Ctrl to bypass]
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
