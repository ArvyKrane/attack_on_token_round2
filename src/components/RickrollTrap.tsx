import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { unlockAudio, playError } from '../lib/sound';

type Phase = 'idle' | 'loading' | 'rickroll';

export default function RickrollTrap() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const { showRickroll, drainAura } = useChaos();

  const handleDownloadClick = () => {
    unlockAudio();
    drainAura(15);
    setPhase('loading');
    setProgress(0);
  };

  useEffect(() => {
    if (phase !== 'loading') return;

    let val = 0;
    const interval = setInterval(() => {
      // Accelerate to 99 then stall
      if (val < 99) {
        val = Math.min(99, val + Math.random() * 12);
        setProgress(val);
      } else {
        clearInterval(interval);
        // Stall at 99 for 1.5s then rickroll
        setTimeout(() => {
          playError();
          setPhase('rickroll');
          showRickroll();
        }, 1500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [phase, showRickroll]);

  const { rickrollVisible, hideRickroll } = useChaos();

  const handleSkip = () => {
    // Skip button restarts the video (just hides & re-shows iframe)
    hideRickroll();
    setTimeout(() => showRickroll(), 50);
  };

  return (
    <>
      {/* Download button */}
      {phase === 'idle' && (
        <motion.button
          onClick={handleDownloadClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg glass-card font-display font-semibold chroma-hover"
          style={{ border: '1px solid var(--color-acid)', color: 'var(--color-acid)' }}
        >
          <span>📄</span>
          <span>Download my resume.pdf</span>
        </motion.button>
      )}

      {/* Fake loading bar */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/90"
          >
            <div className="glass-card p-10 text-center max-w-md w-full mx-4" style={{ border: '1px solid var(--color-acid)' }}>
              <p className="font-pixel text-acid mb-6" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-acid)' }}>
                Preparing your totally real resume...
              </p>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden mb-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--color-acid)', width: `${progress}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </div>
              <p className="text-muted text-sm" style={{ color: 'var(--color-muted)' }}>
                {progress < 99 ? `${Math.floor(progress)}%` : '99% — finalizing…'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rickroll fullscreen iframe */}
      <AnimatePresence>
        {rickrollVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9001] bg-black flex flex-col"
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="flex-1 w-full border-0"
              title="Definitely your resume"
            />
            <div className="flex justify-center p-4 gap-4 bg-black">
              <motion.button
                onClick={handleSkip}
                className="px-6 py-2 rounded text-sm font-display"
                style={{ background: 'var(--color-surface)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
                whileHover={{ scale: 1.05 }}
              >
                Skip ▶
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
