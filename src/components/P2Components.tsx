import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playAirhorn } from '../lib/sound';

// Konami code sequence
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useKonamiCode() {
  const { activateGodMode, godMode } = useChaos();
  const seq = useRef<string[]>([]);

  useEffect(() => {
    if (godMode) return;
    const handler = (e: KeyboardEvent) => {
      seq.current.push(e.key);
      if (seq.current.length > KONAMI.length) seq.current.shift();
      if (seq.current.join(',') === KONAMI.join(',')) {
        playAirhorn();
        activateGodMode();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [godMode, activateGodMode]);
}

export function GodModeOverlay() {
  const { godMode, surrendered } = useChaos();

  if (!godMode || surrendered) return null;

  return (
    <AnimatePresence>
      {godMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: [0, 2, -2, 1, -1, 0] }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 pointer-events-none z-[9600] flex items-center justify-center"
        >
          <motion.p
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: [1, 0] }}
            transition={{ duration: 2 }}
            className="font-pixel text-center"
            style={{
              fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
              color: 'var(--color-acid)',
              textShadow: 'var(--glow-green)',
            }}
          >
            GOD MODE<br/>(does nothing)
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// GTA Wasted overlay
export function WastedOverlay() {
  const { wastedVisible, hideWasted, surrendered } = useChaos();

  if (surrendered) return null;

  return (
    <AnimatePresence>
      {wastedVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9700] flex items-center justify-center pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onAnimationComplete={() => setTimeout(hideWasted, 2000)}
        >
          <motion.p
            initial={{ scaleX: 3, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: 'clamp(3rem, 12vw, 7rem)',
              color: '#c0392b',
              letterSpacing: '0.05em',
              textShadow: '0 0 30px #c0392b88',
            }}
          >
            WASTED
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Among Us Emergency Meeting
export function EmergencyMeeting() {
  const { emergencyMeetingVisible, hideEmergencyMeeting, surrendered } = useChaos();

  if (surrendered) return null;

  return (
    <AnimatePresence>
      {emergencyMeetingVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-[9650] flex items-center justify-center bg-black/80"
        >
          <div className="text-center">
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: 2, duration: 0.3 }}
              style={{
                fontFamily: 'Impact, sans-serif',
                fontSize: 'clamp(2rem, 8vw, 5rem)',
                color: '#e74c3c',
                textShadow: '0 0 20px #e74c3c88',
                letterSpacing: '0.05em',
              }}
            >
              EMERGENCY MEETING
            </motion.p>
            <p className="font-display mt-4 mb-8" style={{ color: 'var(--color-white)', fontSize: 'var(--text-xl)' }}>
              Who is sus?<br/><span style={{ color: 'var(--color-pink)' }}>(it's you)</span>
            </p>
            <button
              onClick={hideEmergencyMeeting}
              className="px-8 py-3 rounded-full font-display font-bold text-black"
              style={{ background: 'var(--color-acid)', cursor: 'pointer' }}
            >
              Skip (I'm not sus)
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Fake 1,000,000th visitor popup
export function VisitorPopup() {
  const { visitorPopupVisible, hideVisitorPopup, surrendered } = useChaos();

  if (surrendered) return null;

  return (
    <AnimatePresence>
      {visitorPopupVisible && (
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-[var(--z-toast)] glass-card p-5 text-center"
          style={{
            zIndex: 'var(--z-toast)',
            border: '2px solid gold',
            maxWidth: 340,
            width: '90vw',
          }}
        >
          <p style={{ fontSize: '1.5rem' }}>🎉🎊🏆</p>
          <p className="font-display font-bold mt-1" style={{ color: 'gold', fontSize: 'var(--text-base)' }}>
            YOU ARE THE 1,000,000TH VISITOR!
          </p>
          <p className="text-sm mt-2 mb-4" style={{ color: 'var(--color-muted)' }}>
            Your prize: a Fanum Tax invoice for <strong style={{ color: 'var(--color-pink)' }}>₹69,420</strong> is on the way. Congratulations 🙏
          </p>
          <button
            onClick={hideVisitorPopup}
            className="px-6 py-2 rounded-full font-display font-semibold text-black"
            style={{ background: 'gold', cursor: 'pointer' }}
          >
            Claim Prize 🤑
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Scroll betrayal toast
export function ScrollBetrayalToast({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          className="fixed top-20 right-4 z-[var(--z-toast)] glass-card px-4 py-3"
          style={{ zIndex: 'var(--z-toast)', border: '1px solid var(--color-acid)', maxWidth: 240 }}
        >
          <p className="text-sm font-display" style={{ color: 'var(--color-acid)' }}>
            you're welcome 🙃
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mission failed banner
export function MissionFailed({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-12 inset-x-0 z-[var(--z-toast)] flex justify-center pointer-events-none"
        >
          <div
            className="px-6 py-3 font-display font-bold"
            style={{
              background: 'rgba(0,0,0,0.85)',
              border: '2px solid var(--color-pink)',
              color: 'var(--color-pink)',
              fontSize: 'var(--text-base)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Mission Failed — We'll get 'em next time
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
