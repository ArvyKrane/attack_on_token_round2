import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { unlockAudio, playError, playVineBoom, playRickrollMelody } from '../lib/sound';
import RealResumeModal from './RealResumeModal';

type Phase = 'idle' | 'loading' | 'rickroll';

export default function RickrollTrap() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [realResumeOpen, setRealResumeOpen] = useState(false);
  const { showRickroll, hideRickroll, rickrollVisible, drainAura, surrendered } = useChaos();

  const handleDownloadClick = () => {
    unlockAudio();
    if (surrendered) {
      setRealResumeOpen(true);
      return;
    }
    drainAura(15);
    playVineBoom();
    setPhase('loading');
    setProgress(0);
  };

  useEffect(() => {
    if (phase !== 'loading') return;

    let val = 0;
    const interval = setInterval(() => {
      if (val < 99) {
        val = Math.min(99, val + Math.random() * 14);
        setProgress(val);
      } else {
        clearInterval(interval);
        // Stall at 99 for 1.2s then rickroll
        setTimeout(() => {
          playError();
          playRickrollMelody();
          setPhase('rickroll');
          showRickroll();
        }, 1200);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [phase, showRickroll]);

  const handleSkip = () => {
    // Fake skip: restart the rickroll video!
    playError();
    hideRickroll();
    setTimeout(() => showRickroll(), 80);
  };

  const handleClose = () => {
    hideRickroll();
    setPhase('idle');
  };

  return (
    <>
      {/* Download button */}
      <motion.button
        onClick={handleDownloadClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-card"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: '9999px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          border: '1px solid #39ff14',
          color: '#39ff14',
          background: 'rgba(57, 255, 20, 0.08)',
          boxShadow: '0 0 15px rgba(57, 255, 20, 0.2)',
          cursor: 'pointer',
        }}
      >
        <span>📄</span>
        <span>Download Resume.pdf</span>
      </motion.button>

      {/* Fake loading bar modal */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(5, 5, 8, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
            }}
          >
            <div
              className="glass-card"
              style={{
                padding: '36px',
                textAlign: 'center',
                maxWidth: '460px',
                width: '100%',
                border: '1px solid #39ff14',
                boxShadow: '0 0 30px rgba(57, 255, 20, 0.25)',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⏳</div>
              <p
                className="font-pixel"
                style={{ fontSize: '0.8rem', color: '#39ff14', marginBottom: '20px', lineHeight: 1.6 }}
              >
                Generating Certified 100% Real Resume.pdf...
              </p>
              <div
                style={{
                  width: '100%',
                  height: '14px',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  marginBottom: '14px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: '9999px',
                    background: 'linear-gradient(90deg, #39ff14, #ff1493)',
                    width: `${progress}%`,
                  }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: 'rgba(245, 245, 245, 0.7)',
                }}
              >
                {progress < 99 ? `${Math.floor(progress)}% — crunching clout metrics...` : '⚠️ 99% — Verifying rizz levels (stalling)...'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rickroll fullscreen iframe modal */}
      <AnimatePresence>
        {rickrollVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9500,
              backgroundColor: '#000',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Top header bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 24px',
                background: '#0a0a10',
                borderBottom: '1px solid rgba(255,20,147,0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-pixel" style={{ color: '#ff1493', fontSize: '0.8rem' }}>
                  🎵 RICKROLLED.EXE
                </span>
                <span style={{ color: 'rgba(245,245,245,0.5)', fontSize: '0.75rem' }}>
                  (you really thought you were getting a pdf?)
                </span>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Close ✕
              </button>
            </div>

            {/* Video player */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&controls=1"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              style={{ flex: 1, width: '100%', height: '100%', border: 'none' }}
              title="Official Resume Video"
            />

            {/* Bottom Troll Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                padding: '14px',
                background: '#050508',
              }}
            >
              <motion.button
                onClick={handleSkip}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: '#ff1493',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 24px',
                  borderRadius: '9999px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(255,20,147,0.5)',
                }}
              >
                Skip Video ▶ (troll restart)
              </motion.button>
              <button
                onClick={handleClose}
                style={{
                  background: 'transparent',
                  color: 'rgba(245,245,245,0.5)',
                  border: 'none',
                  fontSize: '0.8rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                I have suffered enough, take me back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Candidate Resume Modal (after surrender / safe mode) */}
      <RealResumeModal isOpen={realResumeOpen} onClose={() => setRealResumeOpen(false)} />
    </>
  );
}

