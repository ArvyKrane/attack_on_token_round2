import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playAirhorn } from '../lib/sound';

interface SurrenderButtonProps {
  onSurrender: () => void;
}

export default function SurrenderButton({ onSurrender }: SurrenderButtonProps) {
  const [visible, setVisible] = useState(false);
  const { surrendered, surrender } = useChaos();

  // Appears after 45 seconds
  useEffect(() => {
    if (surrendered) return;
    const t = setTimeout(() => setVisible(true), 45_000);
    return () => clearTimeout(t);
  }, [surrendered]);

  if (surrendered || !visible) return null;

  const handleSurrender = () => {
    playAirhorn();
    surrender();
    onSurrender();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-toast)]"
        style={{ zIndex: 'var(--z-toast)' }}
      >
        <motion.button
          onClick={handleSurrender}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(255,20,147,0.4)',
              '0 0 30px rgba(255,20,147,0.8)',
              '0 0 10px rgba(255,20,147,0.4)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="px-8 py-4 rounded-full font-display font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, var(--color-pink) 0%, #a020f0 100%)',
            fontSize: 'var(--text-base)',
            cursor: 'pointer',
          }}
        >
          🏳️ I surrender
        </motion.button>
        <p className="text-center mt-2 text-xs" style={{ color: 'var(--color-muted)' }}>
          (shows the real profile, ends all pranks)
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
