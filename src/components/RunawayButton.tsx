import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unlockAudio, playScream } from '../lib/sound';

const BUTTON_TEXTS = [
  'Follow Me',
  'FOLLOW',
  'Click to Follow',
  'Just Follow Bro',
  'PLEASE',
  'FOLLOW 😭',
  'LAST CHANCE',
  'Fine.',
];

interface RunawayButtonProps {
  onAttempt: () => void;
}

export default function RunawayButton({ onAttempt }: RunawayButtonProps) {
  const [attempts, setAttempts] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const surrendered = false; // always false — surrender is handled at App level
  const [label, setLabel] = useState(BUTTON_TEXTS[0]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const escaped = attempts >= 10;

  const dodge = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (escaped || surrendered) return;
    unlockAudio();
    onAttempt();

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setLabel(BUTTON_TEXTS[Math.min(newAttempts, BUTTON_TEXTS.length - 1)]);

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    // Pick a random position that avoids the cursor
    let cx = 0, cy = 0;
    if ('clientX' in e) {
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
    }

    let nx: number, ny: number;
    let tries = 0;
    do {
      nx = Math.random() * (W - 160);
      ny = Math.random() * (H - 60);
      tries++;
    } while (Math.hypot(nx - cx, ny - cy) < 150 && tries < 20);

    setPos({ x: nx - W / 2, y: ny - H / 2 });
  }, [attempts, escaped, surrendered, onAttempt]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (escaped || surrendered) return;
    e.preventDefault();
    // On touch: teleport instantly
    const container = containerRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;
    const nx = Math.random() * (W - 160);
    const ny = Math.random() * (H - 60);
    setPos({ x: nx - W / 2, y: ny - H / 2 });
    setAttempts(a => {
      const na = a + 1;
      setLabel(BUTTON_TEXTS[Math.min(na, BUTTON_TEXTS.length - 1)]);
      return na;
    });
    onAttempt();
  }, [escaped, surrendered, onAttempt]);

  const handleClick = useCallback(() => {
    if (!escaped) return;
    playScream();
  }, [escaped]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence>
        {escaped ? (
          <motion.div
            key="escaped"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p
              className="font-pixel text-pink"
              style={{ fontSize: 'var(--text-sm)', lineHeight: 1.8 }}
            >
              nah you're not worthy 💀
            </p>
            <motion.button
              onClick={handleClick}
              animate={{ scale: [1, 0.95, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-4 px-6 py-2 rounded-full border border-pink-500/30 text-pink-400 text-sm cursor-not-allowed opacity-40"
            >
              (too late)
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            ref={btnRef}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onMouseEnter={dodge}
            onTouchStart={handleTouchStart}
            onClick={handleClick}
            className="px-8 py-3 rounded-full font-display font-semibold text-black cursor-pointer select-none whitespace-nowrap"
            style={{
              background: 'var(--color-acid)',
              boxShadow: 'var(--glow-green)',
              fontSize: 'var(--text-base)',
            }}
          >
            {label}
          </motion.button>
        )}
      </AnimatePresence>

      {attempts > 0 && !escaped && (
        <p
          className="absolute bottom-2 text-xs text-muted opacity-60"
          style={{ color: 'var(--color-muted)' }}
        >
          attempts: {attempts}/10
        </p>
      )}
    </div>
  );
}
