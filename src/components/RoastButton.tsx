import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomRoast } from '../data/roasts';
import {
  unlockAudio,
  playVineBoom,
  playError,
  playCoin,
  playPop,
  playAirhorn,
  playOof,
  playDing,
  speakRoast,
} from '../lib/sound';
import { useChaos } from '../store/useChaos';

const SOUND_FNS = [playVineBoom, playError, playAirhorn, playOof, playCoin, playPop, playDing];

export default function RoastButton() {
  const [roast, setRoast] = useState<{ text: string; category: string } | null>(null);
  const [shaking, setShaking] = useState(false);
  const { incrementClicks, drainAura } = useChaos();
  const clickCount = useRef(0);

  const handleClick = () => {
    unlockAudio();
    incrementClicks();
    drainAura(8);
    clickCount.current++;

    // Pick random sound effect
    const sfx = SOUND_FNS[Math.floor(Math.random() * SOUND_FNS.length)];
    sfx();

    // Screen shake
    setShaking(true);
    setTimeout(() => setShaking(false), 520);

    // Pick roast & speak it aloud
    const r = getRandomRoast();
    setRoast({ text: r.text, category: r.category });
    speakRoast(r.text);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '440px' }}>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        className={shaking ? 'shake' : ''}
        style={{
          padding: '12px 26px',
          borderRadius: '10px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '0.92rem',
          color: '#ffffff',
          background: 'linear-gradient(135deg, rgba(255,20,147,0.85) 0%, rgba(147,51,234,0.85) 100%)',
          border: '1px solid rgba(255, 20, 147, 0.5)',
          boxShadow: '0 4px 20px rgba(255, 20, 147, 0.3)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span>⚡</span>
        <span>Endorse Developer & Run Vibe Check</span>
      </motion.button>

      <AnimatePresence mode="wait">
        {roast && (
          <motion.div
            key={roast.text}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            style={{
              padding: '14px 20px',
              width: '100%',
              borderRadius: '12px',
              textAlign: 'center',
              background: 'rgba(255, 20, 147, 0.08)',
              border: '1px solid rgba(255, 20, 147, 0.4)',
              boxShadow: '0 4px 24px rgba(255, 20, 147, 0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              className="font-pixel"
              style={{
                display: 'inline-block',
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                color: '#ff1493',
                marginBottom: '6px',
                letterSpacing: '1px',
              }}
            >
              [VIBE EVALUATION REPORT: {roast.category}]
            </span>
            <p
              className="font-display font-semibold"
              style={{
                color: '#ffffff',
                fontSize: '1rem',
                lineHeight: 1.4,
              }}
            >
              "{roast.text}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
