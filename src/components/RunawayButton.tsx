import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unlockAudio, playScream } from '../lib/sound';

const BUTTON_TEXTS = [
  '+ Follow Developer',
  'Connecting...',
  'Wait... Follow',
  'Click to Follow',
  'Quick, click me!',
  'Too slow!',
  'Almost got me',
  'Skill issue...',
  'LAST CHANCE',
  'Fine.',
];

interface RunawayButtonProps {
  onAttempt: () => void;
}

export default function RunawayButton({ onAttempt }: RunawayButtonProps) {
  const [attempts, setAttempts] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState(BUTTON_TEXTS[0]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const escaped = attempts >= 10;

  const dodge = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (escaped) return;
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

    let cx = 0, cy = 0;
    if ('clientX' in e) {
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
    }

    let nx: number, ny: number;
    let tries = 0;
    do {
      nx = Math.random() * (W - 140);
      ny = Math.random() * (H - 50);
      tries++;
    } while (Math.hypot(nx - cx, ny - cy) < 140 && tries < 20);

    setPos({ x: nx - W / 2, y: ny - H / 2 });
  }, [attempts, escaped, onAttempt]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (escaped) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;
    const nx = Math.random() * (W - 140);
    const ny = Math.random() * (H - 50);
    setPos({ x: nx - W / 2, y: ny - H / 2 });
    setAttempts(a => {
      const na = a + 1;
      setLabel(BUTTON_TEXTS[Math.min(na, BUTTON_TEXTS.length - 1)]);
      return na;
    });
    onAttempt();
  }, [escaped, onAttempt]);

  const handleClick = useCallback(() => {
    if (!escaped) return;
    playScream();
  }, [escaped]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px dashed rgba(255, 255, 255, 0.1)',
      }}
    >
      <AnimatePresence>
        {escaped ? (
          <motion.div
            key="escaped"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '12px' }}
          >
            <p
              className="font-pixel"
              style={{ fontSize: '0.8rem', color: '#ff1493', lineHeight: 1.6 }}
            >
              nah you're not worthy to follow 💀
            </p>
            <motion.button
              onClick={handleClick}
              animate={{ scale: [1, 0.95, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                marginTop: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(255,20,147,0.3)',
                color: '#ff1493',
                fontSize: '0.75rem',
                cursor: 'not-allowed',
                background: 'transparent',
                opacity: 0.5,
              }}
            >
              (too late chief)
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            ref={btnRef}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            onMouseEnter={dodge}
            onTouchStart={handleTouchStart}
            onClick={handleClick}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              color: '#000000',
              background: '#39ff14',
              boxShadow: '0 0 16px rgba(57, 255, 20, 0.4)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </motion.button>
        )}
      </AnimatePresence>

      {attempts > 0 && !escaped && (
        <span
          className="font-pixel"
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '12px',
            fontSize: '0.55rem',
            color: 'rgba(245,245,245,0.4)',
          }}
        >
          evaded: {attempts}/10
        </span>
      )}
    </div>
  );
}
