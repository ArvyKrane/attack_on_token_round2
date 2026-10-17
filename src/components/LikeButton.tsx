import { useState } from 'react';
import { motion } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playCoin, playOof } from '../lib/sound';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const { drainAura } = useChaos();

  const handle = () => {
    playCoin();
    drainAura(4);

    if (!liked) {
      setLiked(true);
      setCount(c => c + 1);
      // Instantly unlike after 800ms
      setTimeout(() => {
        playOof();
        setLiked(false);
        // Sometimes go to -1
        setCount(c => Math.random() < 0.35 ? -1 : Math.max(0, c - 1));
      }, 800);
    }
  };

  return (
    <motion.button
      onClick={handle}
      whileTap={{ scale: 0.85 }}
      className="flex items-center gap-2 px-5 py-2 rounded-full glass-card font-display font-semibold"
      style={{
        border: liked ? '1px solid var(--color-pink)' : '1px solid var(--color-border)',
        color: liked ? 'var(--color-pink)' : 'var(--color-muted)',
        transition: 'border-color 0.2s, color 0.2s',
        cursor: 'pointer',
      }}
    >
      <motion.span
        animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {liked ? '❤️' : '🤍'}
      </motion.span>
      <span style={{ fontSize: 'var(--text-sm)' }}>
        {count === -1 ? '-1 likes' : `${count} ${count === 1 ? 'like' : 'likes'}`}
      </span>
    </motion.button>
  );
}
