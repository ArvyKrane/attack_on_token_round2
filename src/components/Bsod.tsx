import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playError, playDing, unlockAudio } from '../lib/sound';

export default function Bsod() {
  const { bsodVisible, hideBsod, surrendered } = useChaos();
  const [rebooting, setRebooting] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!bsodVisible) {
      setRebooting(false);
      setPct(0);
    }
  }, [bsodVisible]);

  const handleReboot = () => {
    unlockAudio();
    playError();
    setRebooting(true);
    let v = 0;
    const iv = setInterval(() => {
      v += Math.random() * 14 + 5;
      if (v >= 100) {
        clearInterval(iv);
        playDing();
        hideBsod();
      } else {
        setPct(Math.min(99, v));
      }
    }, 180);
  };

  if (surrendered) return null;

  return (
    <AnimatePresence>
      {bsodVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9800,
            backgroundColor: '#0058b8',
            backgroundImage: 'radial-gradient(ellipse at 50% 30%, #0066d6 0%, #004294 100%)',
            color: '#ffffff',
            fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '820px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {!rebooting ? (
              <>
                {/* Giant Sad Emoticon */}
                <div
                  style={{
                    fontSize: 'clamp(5rem, 12vw, 8rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: '-2px',
                  }}
                >
                  :(
                </div>

                {/* Main Error Heading */}
                <div>
                  <h1
                    style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: 400,
                      lineHeight: 1.25,
                      margin: '0 0 14px 0',
                    }}
                  >
                    Your vibe ran into a problem and needs to restart.
                  </h1>
                  <p
                    style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                      fontWeight: 300,
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    We're just collecting some error info, and then we'll restart for you.
                  </p>
                </div>

                {/* Progress Counter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 300, color: '#e0f2fe' }}>
                    Collecting vibe telemetry: <strong>{Math.floor(Math.random() * 25 + 65)}% complete</strong>
                  </span>
                </div>

                {/* QR Code and Technical Info Box */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '24px',
                    marginTop: '12px',
                    padding: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {/* Clean SVG QR Code */}
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: '110px',
                      height: '110px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      padding: '8px',
                      boxSizing: 'border-box',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                      flexShrink: 0,
                    }}
                    title="Click or Scan for Fix"
                  >
                    {/* Retro QR Pattern */}
                    <svg viewBox="0 0 24 24" width="70" height="70" fill="#000000">
                      <path d="M2 2h8v8H2zM4 4v4h4V4zm10-2h8v8h-8zM16 4v4h4V4zM2 14h8v8H2zm2 2v4h4v-4zm13-2h2v2h-2zm3 0h2v2h-2zm-3 3h2v2h-2zm3 0h2v2h-2zm-3 3h2v2h-2zm3 0h2v2h-2z" />
                    </svg>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#0058b8', marginTop: '2px' }}>
                      SCAN FOR FIX 📱
                    </span>
                  </a>

                  {/* Technical Information */}
                  <div style={{ flex: 1, minWidth: '260px', fontSize: '0.95rem', lineHeight: 1.6, color: '#e0f2fe' }}>
                    <p style={{ margin: '0 0 6px 0' }}>
                      For more information about this issue and possible fixes, visit:
                    </p>
                    <a
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        fontSize: '1rem',
                      }}
                    >
                      https://definitely-not-a-rickroll.com/vibe-error
                    </a>

                    <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      <div>Stop code: <strong style={{ color: '#ffffff' }}>AURA_NOT_FOUND_EXCEPTION</strong></div>
                      <div>What failed: <strong style={{ color: '#ffffff' }}>Skibidi.sys (0x80070002 — Skill Issue)</strong></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Control Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                  <button
                    onClick={handleReboot}
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#0058b8',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '12px 28px',
                      fontFamily: "'Segoe UI', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    ⚡ Reboot System Now
                  </button>

                  <button
                    onClick={() => hideBsod()}
                    style={{
                      backgroundColor: 'transparent',
                      color: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '6px',
                      padding: '12px 20px',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    ⌨️ Press Left-Ctrl or Click Here to Bypass
                  </button>
                </div>
              </>
            ) : (
              /* Reboot Sequence */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, margin: 0 }}>
                  Rebooting system & re-calibrating aura... {Math.floor(pct)}%
                </h2>
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '5px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      backgroundColor: '#ffffff',
                      transition: 'width 0.15s ease',
                    }}
                  />
                </div>
                <p style={{ color: '#e0f2fe', fontSize: '0.95rem', margin: 0 }}>
                  Clearing memory heap, flushing Ohio cache, and restoring workstation...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
