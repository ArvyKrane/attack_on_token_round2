import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playError } from '../lib/sound';

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
    playError();
    setRebooting(true);
    let v = 0;
    const iv = setInterval(() => {
      v += Math.random() * 8;
      if (v >= 100) {
        clearInterval(iv);
        hideBsod();
      } else {
        setPct(Math.min(99, v));
      }
    }, 200);
  };

  if (surrendered) return null;

  return (
    <AnimatePresence>
      {bsodVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9800] flex flex-col items-start justify-center p-12 select-none"
          style={{ background: '#0000AA', color: 'white', fontFamily: 'Consolas, monospace' }}
        >
          {!rebooting ? (
            <>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: 24 }}>
                :( Your vibe just crashed.
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 2, marginBottom: 32, maxWidth: 600 }}>
                AURA_NOT_FOUND<br/>
                If you feel cool in real life, great!<br/>
                You can close this message and forget any of this happened.<br/>
                (You can't.)<br/><br/>
                For more brainrot:<br/>
                <span style={{ textDecoration: 'underline' }}>
                  https://definitely-not-a-rickroll.com
                </span>
                <br/><br/>
                Collecting vibe data: {Math.floor(Math.random() * 97)}% complete
              </p>

              {/* QR code placeholder — rickroll link embedded */}
              <div
                style={{
                  width: 100, height: 100,
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#0000AA', fontSize: 9, textAlign: 'center', padding: 6 }}
                >
                  [SCAN QR<br/>for fix]<br/>📱
                </a>
              </div>

              <button
                onClick={handleReboot}
                style={{
                  background: 'white',
                  color: '#0000AA',
                  border: 'none',
                  padding: '8px 24px',
                  fontFamily: 'Consolas, monospace',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Reboot into page
              </button>
            </>
          ) : (
            <div>
              <p style={{ fontSize: '0.85rem', marginBottom: 16 }}>
                Rebooting your personality... {Math.floor(pct)}%
              </p>
              <div style={{ width: 300, height: 4, background: '#ffffff33' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: 'white' }} />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
