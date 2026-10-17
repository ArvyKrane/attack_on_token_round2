import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playError } from '../lib/sound';

const ERROR_MESSAGES = [
  'Your vibes could not be found in memory heap',
  'Skibidi.dll has encountered an irrecoverable crash',
  'Rizz not detected in system drivers',
  'Sigma.exe encountered a fatal personality fault',
  'Aura.sys is corrupted (loss of main character energy)',
  'brainrot_level buffer overflow (0xDEADBEEF)',
  'NPC behaviour detected in User32.dll',
  'Your clout token has expired unexpectedly',
  'TouchGrass.dll missing from C:\\Windows\\System32',
  'CRITICAL EXCEPTION: Mid energy detected at 0x00000000',
];

interface ErrorDialogProps {
  id: number;
  onClose: () => void;
}

function ErrorDialog({ id, onClose }: ErrorDialogProps) {
  const msg = ERROR_MESSAGES[id % ERROR_MESSAGES.length];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      drag
      dragMomentum={false}
      style={{
        position: 'fixed',
        top: `${16 + (id % 5) * 7}%`,
        left: `${12 + (id % 6) * 7}%`,
        zIndex: 9000 + id,
        width: '400px',
        maxWidth: '92vw',
        userSelect: 'none',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0,0,0,0.5)',
        borderRadius: '8px 8px 0 0',
      }}
    >
      {/* XP Retro Blue Title Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px',
          background: 'linear-gradient(to right, #0a4ebd, #1e7bd6)',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
          cursor: 'move',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1rem' }}>⚠️</span>
          <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Tahoma, sans-serif' }}>
            Critical System Alert — Error #{id + 1}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: '#e81123',
            color: '#ffffff',
            border: '1px solid #7c0a13',
            borderRadius: '3px',
            width: '22px',
            height: '22px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
          title="Close (Spawns 2 more!)"
        >
          ✕
        </button>
      </div>

      {/* Dialog Body */}
      <div
        style={{
          background: '#f0ece1',
          border: '1px solid #7a7a7a',
          borderTop: 'none',
          padding: '20px',
          boxSizing: 'border-box',
          color: '#1a1a1a',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '18px' }}>
          <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>🚨</span>
          <div>
            <p
              style={{
                color: '#000000',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: 'Tahoma, sans-serif',
                lineHeight: 1.4,
                margin: '0 0 6px 0',
              }}
            >
              {msg}
            </p>
            <p style={{ color: '#555555', fontSize: '0.82rem', fontFamily: 'monospace', margin: 0 }}>
              Error code: 0x{Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0')}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #d4cfc0', paddingTop: '14px' }}>
          <span style={{ fontSize: '0.72rem', color: '#666', fontFamily: 'monospace' }}>
            ⌨️ [Left-Ctrl to dismiss all]
          </span>
          <button
            onClick={onClose}
            style={{
              padding: '6px 28px',
              background: '#e1dcd0',
              border: '2px outset #ffffff',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '1px 1px 4px rgba(0,0,0,0.2)',
            }}
          >
            OK
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FakeError() {
  const { fakeErrors, closeFakeError, surrendered } = useChaos();
  const dialogs = Array.from({ length: Math.min(fakeErrors, 8) }, (_, i) => i);

  if (surrendered) return null;

  const handleClose = () => {
    playError();
    closeFakeError();
  };

  return (
    <AnimatePresence>
      {dialogs.map(id => (
        <ErrorDialog key={`${id}-${fakeErrors}`} id={id} onClose={handleClose} />
      ))}
    </AnimatePresence>
  );
}
