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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className={`px-8 py-3.5 rounded-full font-display font-bold text-white select-none ${shaking ? 'shake' : ''}`}
        style={{
          background: 'linear-gradient(135deg, #ff1493 0%, #9900ef 100%)',
          boxShadow: '0 0 20px rgba(255,20,147,0.5)',
          fontSize: '1.05rem',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
        }}
      >
        💥 Click Me for Roast & Sound
      </motion.button>

      <AnimatePresence mode="wait">
        {roast && (
          <motion.div
            key={roast.text}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="glass-card"
            style={{
              padding: '16px 24px',
              width: '100%',
              textAlign: 'center',
              border: '1px solid rgba(255, 20, 147, 0.5)',
              boxShadow: '0 4px 24px rgba(255, 20, 147, 0.15)',
            }}
          >
            <span
              className="font-pixel"
              style={{
                display: 'inline-block',
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                color: '#ff1493',
                marginBottom: '6px',
                letterSpacing: '1px',
              }}
            >
              [{roast.category}]
            </span>
            <p
              className="font-display font-semibold"
              style={{
                color: '#f5f5f5',
                fontSize: '1.1rem',
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
