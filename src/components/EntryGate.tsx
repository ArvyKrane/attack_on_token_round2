import { useState } from 'react';
import { motion } from 'framer-motion';
import { unlockAudio, playVineBoom, playDing } from '../lib/sound';

// The real Enter button is randomly positioned each load
const REAL_POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'] as const;
type Position = typeof REAL_POSITIONS[number];

function getPositionStyle(pos: Position): React.CSSProperties {
  switch (pos) {
    case 'top-left':     return { top: '15%', left: '10%' };
    case 'top-right':    return { top: '15%', right: '10%' };
    case 'bottom-left':  return { bottom: '20%', left: '10%' };
    case 'bottom-right': return { bottom: '20%', right: '10%' };
    case 'center':       return { top: '55%', left: '50%', transform: 'translate(-50%, -50%)' };
  }
}

interface EntryGateProps {
  onEnter: () => void;
}

export default function EntryGate({ onEnter }: EntryGateProps) {
  const [realPos] = useState<Position>(
    () => REAL_POSITIONS[Math.floor(Math.random() * REAL_POSITIONS.length)]
  );
  const [shaking, setShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Shake page when wrong button is clicked
  const handleFakeClick = () => {
    unlockAudio();
    playDing();
    setShaking(true);
    setAttempts(a => a + 1);
    setTimeout(() => setShaking(false), 520);
  };

  const handleRealClick = () => {
    unlockAudio();
    playVineBoom();
    onEnter();
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${shaking ? 'shake' : ''}`}
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(57,255,20,0.06) 0%, transparent 70%), var(--color-bg)',
      }}
    >
      {/* Grain */}
      <div className="grain-overlay" />

      {/* Center content */}
      <div className="text-center z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="font-display font-bold glitch-text glow-acid mb-4"
          data-text="RAGEBAIT.EXE"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', color: 'var(--color-acid)' }}
        >
          RAGEBAIT.EXE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display mb-12"
          style={{ fontSize: 'var(--text-lg)', color: 'var(--color-muted)' }}
        >
          a premium portfolio experience™
        </motion.p>

        {/* The fake "Enter" button in the center — clicking shakes page */}
        <motion.button
          onClick={handleFakeClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="px-10 py-4 rounded-full font-display font-bold text-black"
          style={{
            background: 'var(--color-acid)',
            boxShadow: 'var(--glow-green)',
            fontSize: 'var(--text-lg)',
            cursor: 'pointer',
          }}
        >
          Enter
        </motion.button>

        {attempts > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 font-pixel"
            style={{ fontSize: '0.6rem', color: 'var(--color-muted)' }}
          >
            {attempts === 1 ? 'hm.' : attempts < 4 ? 'still not it chief' : 'bro.'}
          </motion.p>
        )}
      </div>

      {/* The REAL enter button — randomly placed */}
      <motion.button
        onClick={handleRealClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{ delay: 1.2 }}
        className="absolute font-pixel"
        style={{
          ...getPositionStyle(realPos),
          fontSize: '0.55rem',
          color: 'var(--color-muted)',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '6px 12px',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        actually enter
      </motion.button>
    </motion.div>
  );
}
