import { useState } from 'react';
import { motion } from 'framer-motion';
import { unlockAudio, playVineBoom, playDing } from '../lib/sound';

interface EntryGateProps {
  onEnter: () => void;
}

const TROLL_BUTTON_LABELS = [
  'Enter',
  'Enter (for real)',
  'Enter (definitely works this time)',
  'Entering...',
];

const TROLL_MESSAGES = [
  '',
  'hm... page shook. vibe check failed.',
  'still not it chief. skill issue.',
  'fine, you win. entering...',
];

export default function EntryGate({ onEnter }: EntryGateProps) {
  const [shaking, setShaking] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleEnterClick = () => {
    unlockAudio();
    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    if (nextClicks < 3) {
      // Troll: shake and tease
      playDing();
      setShaking(true);
      setTimeout(() => setShaking(false), 520);
    } else {
      // 3rd click lets them in!
      playVineBoom();
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        onEnter();
      }, 300);
    }
  };

  const handleBypassClick = () => {
    unlockAudio();
    playVineBoom();
    onEnter();
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center min-h-screen w-full px-6 select-none ${shaking ? 'shake' : ''}`}
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(57,255,20,0.08) 0%, transparent 70%), var(--color-bg)',
      }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center z-10 max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display font-black glitch-text glow-acid mb-4 tracking-wider"
          data-text="RAGEBAIT.EXE"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            color: 'var(--color-acid)',
            lineHeight: 1.1,
          }}
        >
          RAGEBAIT.EXE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display font-medium mb-10 tracking-wide"
          style={{ fontSize: 'var(--text-lg)', color: 'var(--color-muted)' }}
        >
          a premium portfolio experience™
        </motion.p>

        {/* The Troll Enter Button */}
        <motion.button
          onClick={handleEnterClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-full font-display font-bold text-black select-none shadow-2xl transition-all"
          style={{
            background: 'var(--color-acid)',
            boxShadow: 'var(--glow-green)',
            fontSize: 'var(--text-lg)',
            cursor: 'pointer',
          }}
        >
          {TROLL_BUTTON_LABELS[Math.min(clicks, TROLL_BUTTON_LABELS.length - 1)]}
        </motion.button>

        {/* Troll Status Feedback */}
        <div className="h-10 mt-5 flex items-center justify-center">
          {clicks > 0 && (
            <motion.p
              key={clicks}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-pixel text-center"
              style={{
                fontSize: '0.75rem',
                color: clicks >= 3 ? 'var(--color-acid)' : 'var(--color-pink)',
              }}
            >
              {TROLL_MESSAGES[Math.min(clicks, TROLL_MESSAGES.length - 1)]}
            </motion.p>
          )}
        </div>

        {clicks > 0 && clicks < 3 && (
          <p className="text-xs font-pixel text-muted opacity-50 mt-1" style={{ color: 'var(--color-muted)' }}>
            [hit it {3 - clicks} more {3 - clicks === 1 ? 'time' : 'times'} or use secret bypass below]
          </p>
        )}
      </div>

      {/* Secret Bypass Button — clearly positioned at bottom corner, no overlap */}
      <motion.button
        onClick={handleBypassClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        className="fixed bottom-6 right-6 font-pixel z-20 text-xs px-3 py-2 rounded border border-white/20 text-white/50 hover:text-acid hover:border-acid transition-colors"
        style={{
          background: 'rgba(0,0,0,0.5)',
          cursor: 'pointer',
        }}
        title="Secret bypass"
      >
        actually enter &rarr;
      </motion.button>
    </motion.div>
  );
}
