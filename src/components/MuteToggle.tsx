import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toggleMute } from '../lib/sound';

export default function MuteToggle() {
  const [muted, setMuted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dodgeCount = useRef(0);

  const dodge = useCallback(() => {
    if (dodgeCount.current >= 3) return;
    dodgeCount.current++;
    const dx = (Math.random() - 0.5) * 120;
    const dy = (Math.random() - 0.5) * 80;
    setPos({ x: dx, y: dy });
    setTimeout(() => setPos({ x: 0, y: 0 }), 500);
  }, []);

  const handleClick = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
    dodgeCount.current = 0;
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={dodge}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="fixed bottom-4 right-4 w-12 h-12 rounded-full font-pixel flex items-center justify-center glass-card"
      style={{
        zIndex: 300,
        border: '1px solid var(--color-border)',
        fontSize: 18,
        cursor: 'pointer',
      }}
      title={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? '🔇' : '🔊'}
    </motion.button>
  );
}
