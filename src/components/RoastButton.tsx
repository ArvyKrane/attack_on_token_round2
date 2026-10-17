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
} from '../lib/sound';
import { useChaos } from '../store/useChaos';

const SOUND_FNS = [playVineBoom, playError, playCoin, playPop, playAirhorn, playOof, playDing];

export default function RoastButton() {
  const [roast, setRoast] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const { incrementClicks, drainAura } = useChaos();
  const clickCount = useRef(0);

  const handleClick = () => {
    unlockAudio();
    incrementClicks();
    drainAura(8);
    clickCount.current++;

    // Pick random sound
    const sfx = SOUND_FNS[Math.floor(Math.random() * SOUND_FNS.length)];
    sfx();

    // Screen shake
    setShaking(true);
    setTimeout(() => setShaking(false), 520);

    // Roast
    const r = getRandomRoast();
    setRoast(r.text);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        className={`px-10 py-4 rounded-full font-display font-bold text-white cursor-pointer select-none chroma-hover ${shaking ? 'shake' : ''}`}
        style={{
          background: 'linear-gradient(135deg, var(--color-pink) 0%, #a020f0 100%)',
          boxShadow: 'var(--glow-pink)',
          fontSize: 'var(--text-lg)',
        }}
      >
        Click Me 💥
      </motion.button>

      <AnimatePresence mode="wait">
        {roast && (
          <motion.div
            key={roast}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="glass-card px-6 py-3 max-w-md text-center"
            style={{ border: '1px solid var(--color-pink)' }}
          >
            <p
              className="font-display font-semibold"
              style={{ color: 'var(--color-pink)', fontSize: 'var(--text-base)' }}
            >
              {roast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
