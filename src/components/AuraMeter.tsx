import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';

export default function AuraMeter() {
  const { aura, diedVisible, hideDied, surrendered } = useChaos();

  const color =
    aura > 60 ? 'var(--color-acid)' :
    aura > 30 ? '#facc15' :
    'var(--color-pink)';

  const label =
    aura > 60 ? 'SIGMA ENERGY' :
    aura > 30 ? 'DECLINING RAPIDLY' :
    aura > 0  ? 'CRITICALLY LOW' :
    'ZERO ☠️';

  if (surrendered) return null;

  return (
    <>
      {/* HUD bar — fixed top */}
      <div
        className="fixed top-0 left-0 right-0 z-[--z-hud] flex items-center gap-3 px-4 py-2"
        style={{
          zIndex: 'var(--z-hud)',
          background: 'rgba(5,5,8,0.85)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <span
          className="font-pixel text-acid shrink-0"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--color-acid)' }}
        >
          AURA
        </span>
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            animate={{ width: `${aura}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          />
        </div>
        <span
          className="font-pixel shrink-0"
          style={{ fontSize: '0.6rem', color }}
        >
          {label}
        </span>
      </div>

      {/* Dark Souls DIED screen */}
      <AnimatePresence>
        {diedVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9500] flex flex-col items-center justify-center bg-black/95"
          >
            <motion.p
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="font-pixel text-center"
              style={{
                color: '#8B0000',
                fontSize: 'clamp(2rem, 8vw, 5rem)',
                textShadow: '0 0 40px #8B000088',
              }}
            >
              YOU DIED
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-display mt-4 text-center"
              style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}
            >
              aura: 0 / 100 — that's rough buddy
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={hideDied}
              className="mt-8 px-8 py-3 font-pixel rounded"
              style={{
                background: '#8B0000',
                color: 'var(--color-white)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
              }}
            >
              RESPAWN
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
