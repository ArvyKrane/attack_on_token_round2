import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { unlockAudio, playVineBoom } from '../lib/sound';

export default function CookieBanner() {
  const { cookieBannerVisible, hideCookieBanner, surrendered, showWasted } = useChaos();
  const [declinePos, setDeclinePos] = useState({ x: 0, y: 0 });

  if (!cookieBannerVisible || surrendered) return null;

  const handleAccept = () => {
    unlockAudio();
    playCoin?.();
    hideCookieBanner();
  };

  const handleDeclineTry = () => {
    // Float away
    setDeclinePos({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200,
    });
  };

  const handleDeclineClick = () => {
    unlockAudio();
    // Closing cookie banner too fast triggers GTA WASTED (P2)
    showWasted();
    playVineBoom();
    hideCookieBanner();
  };

  return (
    <AnimatePresence>
      {cookieBannerVisible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-[var(--z-modal)] glass-card p-5 md:p-6"
          style={{ zIndex: 'var(--z-modal)', border: '1px solid var(--color-acid)' }}
        >
          <p
            className="font-display font-semibold mb-1"
            style={{ fontSize: 'var(--text-base)', color: 'var(--color-white)' }}
          >
            🍪 We use cookies
          </p>
          <p
            className="mb-4 text-sm"
            style={{ color: 'var(--color-muted)' }}
          >
            We use cookies to track your aura, harvest your vibes, sell your rizz data to Big Sigma, and make this page chaotic.
            By clicking "Accept All" you agree to our completely made up terms.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleAccept}
              className="px-5 py-2 rounded-full font-display font-semibold text-black cursor-pointer"
              style={{ background: 'var(--color-acid)', fontSize: 'var(--text-sm)' }}
            >
              Accept All
            </button>
            <button
              onClick={handleAccept}
              className="px-7 py-3 rounded-full font-display font-bold text-black cursor-pointer"
              style={{ background: 'var(--color-acid)', fontSize: 'var(--text-base)', boxShadow: 'var(--glow-green)' }}
            >
              Accept All (bigger)
            </button>
            <motion.span
              animate={{ x: declinePos.x, y: declinePos.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              onMouseEnter={handleDeclineTry}
              onClick={handleDeclineClick}
              className="cursor-pointer select-none"
              style={{
                fontSize: '4px',
                color: 'var(--color-muted)',
                letterSpacing: '-0.02em',
              }}
            >
              I hate fun
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Need to import this
function playCoin() {
  // delegated to sound.ts
}
