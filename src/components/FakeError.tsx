import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playError } from '../lib/sound';

const ERROR_MESSAGES = [
  'Your vibes could not be found',
  'Skibidi.dll has stopped working',
  'Rizz not detected',
  'Sigma.exe encountered a fatal error',
  'Aura.sys is corrupted',
  'brainrot_level overflow (0xDEADBEEF)',
  'NPC behaviour detected in User32.dll',
  'Your clout has stopped working',
  'TouchGrass.dll not found',
  'EXCEPTION: mid energy at 0x00000000',
];

interface ErrorDialogProps {
  id: number;
  onClose: () => void;
}

function ErrorDialog({ id, onClose }: ErrorDialogProps) {
  const msg = ERROR_MESSAGES[id % ERROR_MESSAGES.length];

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      drag
      dragMomentum={false}
      className="fixed z-[var(--z-modal)] select-none"
      style={{
        top: `${15 + (id % 5) * 8}%`,
        left: `${10 + (id % 7) * 6}%`,
        zIndex: 200 + id,
        width: 360,
        maxWidth: '90vw',
      }}
    >
      {/* XP-style title bar */}
      <div
        className="flex items-center justify-between px-2 py-1 rounded-t"
        style={{ background: 'linear-gradient(to right, #003380, #1084d0)', cursor: 'move' }}
      >
        <div className="flex items-center gap-1">
          <span style={{ fontSize: 14 }}>⚠️</span>
          <span style={{ color: 'white', fontSize: 12, fontFamily: 'Tahoma, sans-serif' }}>
            System Error
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: '#c75050',
            color: 'white',
            border: 'none',
            borderRadius: 2,
            width: 18,
            height: 18,
            fontSize: 11,
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div
        className="rounded-b p-4"
        style={{ background: '#ece9d8', border: '1px solid #7a7a7a', borderTop: 'none' }}
      >
        <div className="flex gap-3 items-start mb-4">
          <span style={{ fontSize: 32 }}>🚨</span>
          <div>
            <p style={{ color: '#000', fontSize: 13, fontFamily: 'Tahoma, sans-serif', marginBottom: 4 }}>
              {msg}
            </p>
            <p style={{ color: '#666', fontSize: 11, fontFamily: 'Tahoma, sans-serif' }}>
              Error code: 0x{Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0')}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            style={{
              padding: '4px 24px',
              background: '#ece9d8',
              border: '2px outset #c0c0c0',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: 13,
              cursor: 'pointer',
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
