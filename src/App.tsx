import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './styles/tokens.css';
import './styles/glitch.css';
import './styles/grain.css';
import './index.css';

// Components
import EntryGate from './components/EntryGate';
import AuraMeter from './components/AuraMeter';
import RunawayButton from './components/RunawayButton';
import RoastButton from './components/RoastButton';
import EmojiRain from './components/EmojiRain';
import RickrollTrap from './components/RickrollTrap';
import CookieBanner from './components/CookieBanner';
import FakeError from './components/FakeError';
import Bsod from './components/Bsod';
import Captcha from './components/Captcha';
import ChatDave from './components/ChatDave';
import LikeButton from './components/LikeButton';
import SurrenderButton from './components/SurrenderButton';
import CleanProfile from './components/CleanProfile';
import MuteToggle from './components/MuteToggle';
import {
  useKonamiCode,
  GodModeOverlay,
  WastedOverlay,
  EmergencyMeeting,
  VisitorPopup,
  ScrollBetrayalToast,
  MissionFailed,
} from './components/P2Components';

// Store
import { useChaos } from './store/useChaos';

// Sound effects are handled by individual components via sound.ts

// Custom cursor
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [nearButton, setNearButton] = useState(false);
  const targetRef = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Check proximity to buttons
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isBtn = el?.tagName === 'BUTTON' || el?.closest('button') !== null;
      setNearButton(!!isBtn);
    };

    window.addEventListener('mousemove', onMove);

    // Lag effect via lerp
    const animate = () => {
      setPos(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.2,
        y: prev.y + (targetRef.current.y - prev.y) * 0.2,
      }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - 12,
        top: pos.y - 12,
        width: 24,
        height: 24,
        pointerEvents: 'none',
        zIndex: 99999,
        fontSize: nearButton ? 22 : 14,
        transform: 'translate(0,0)',
        userSelect: 'none',
        transition: 'font-size 0.15s ease',
      }}
    >
      {nearButton ? '🖕' : '•'}
    </div>
  );
}

// Back button guard — one time only
function BackButtonGuard() {
  const fired = useRef(false);
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (fired.current) return;
      fired.current = true;
      e.preventDefault();
      e.returnValue = 'are you sure you want to leave? 🫡';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);
  return null;
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [scrollInvertActive, setScrollInvertActive] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);

  const {
    surrendered,
    emojiRainActive,
    scrollInverted,
    drainAura,
    invertScroll,
    showBsod,
    showCaptcha,
    showEmergencyMeeting,
    spawnFakeError,
  } = useChaos();

  // Konami code P2
  useKonamiCode();

  // Scroll inversion (P1)
  useEffect(() => {
    if (surrendered) return;
    let lastScroll = 0;
    const handler = (e: WheelEvent) => {
      if (scrollInverted) {
        e.preventDefault();
        window.scrollBy(0, -e.deltaY * 1.5);

        // Show toast once per inversion
        if (!scrollInvertActive) {
          setScrollInvertActive(true);
          setTimeout(() => setScrollInvertActive(false), 3200);
        }
      } else {
        // Randomly trigger scroll inversion
        const now = Date.now();
        if (now - lastScroll > 8000 && Math.random() < 0.07) {
          lastScroll = now;
          invertScroll();
        }
      }
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [scrollInverted, scrollInvertActive, surrendered, invertScroll]);

  // Random prank triggers after entry
  useEffect(() => {
    if (!entered || surrendered) return;

    const triggers = [
      { delay: 15000, fn: () => showCaptcha() },
      { delay: 25000, fn: () => spawnFakeError() },
      { delay: 35000, fn: () => showEmergencyMeeting() },
    ];

    const timers = triggers.map(t => setTimeout(t.fn, t.delay));
    return () => timers.forEach(clearTimeout);
  }, [entered, surrendered, showCaptcha, spawnFakeError, showEmergencyMeeting]);

  // Mission failed banner — show briefly after surrender
  const handleSurrender = () => {
    setMissionFailed(true);
    setTimeout(() => setMissionFailed(false), 3000);
  };

  return (
    <>
      {/* Overlays that appear regardless of entry */}
      <div className="grain-overlay" />
      <div className="scanlines crt-flicker" />
      <BackButtonGuard />
      <CustomCursor />

      {/* Entry gate */}
      <AnimatePresence>
        {!entered && (
          <EntryGate onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {/* Main page — shown after entry */}
      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* HUD */}
            <AuraMeter />
            <MuteToggle />

            {surrendered ? (
              /* ===== Clean Profile (post-surrender) ===== */
              <CleanProfile />
            ) : (
              /* ===== Chaos Page ===== */
              <main
                className="min-h-screen flex flex-col items-center"
                style={{ paddingTop: '4rem' }}
              >
                {/* Hero */}
                <section className="w-full max-w-4xl px-6 py-20 text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="font-display font-bold glitch-text glow-acid mb-4"
                    data-text="Hi, I'm {{NAME}}"
                    style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', color: 'var(--color-white)', lineHeight: 'var(--leading-tight)' }}
                  >
                    Hi, I'm <span style={{ color: 'var(--color-acid)' }}>{'{{NAME}}'}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: 'var(--text-xl)', color: 'var(--color-muted)', maxWidth: 560, margin: '0 auto 3rem' }}
                  >
                    full-stack developer · sigma grindset · certified Ohio resident · 
                    <span style={{ color: 'var(--color-pink)' }}> definitely hireable</span>
                  </motion.p>

                  {/* P0 Pranks row */}
                  <div className="flex flex-col items-center gap-12">
                    {/* Runaway Follow button */}
                    <div className="w-full max-w-lg">
                      <p className="font-pixel mb-4 text-acid" style={{ fontSize: '0.6rem', color: 'var(--color-acid)' }}>
                        — try to follow me —
                      </p>
                      <RunawayButton onAttempt={() => drainAura(5)} />
                    </div>

                    {/* Roast button */}
                    <RoastButton />

                    {/* Like + rickroll row */}
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                      <LikeButton />
                      <RickrollTrap />
                    </div>
                  </div>
                </section>

                {/* Prank buttons section */}
                <section className="w-full max-w-4xl px-6 py-16">
                  <h2
                    className="font-display font-bold text-center mb-10 chroma-hover"
                    style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-white)' }}
                  >
                    My <span style={{ color: 'var(--color-pink)' }}>Skills™</span>
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: '💀 View Error Log', fn: () => spawnFakeError(), drain: 8 },
                      { label: '🔵 Do NOT Click', fn: () => showBsod(), drain: 20 },
                      { label: '☑ Prove You\'re Human', fn: () => showCaptcha(), drain: 5 },
                      { label: '🚨 Emergency Meeting', fn: () => showEmergencyMeeting(), drain: 10 },
                      { label: '🌀 Konami Code Hint', fn: () => {}, drain: 0 },
                      { label: '🏳️ I give up', fn: handleSurrender, drain: 0 },
                    ].map(({ label, fn, drain }) => (
                      <motion.button
                        key={label}
                        onClick={() => { fn(); if (drain) drainAura(drain); }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="glass-card px-4 py-4 text-sm font-display font-semibold chroma-hover"
                        style={{
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-white)',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Konami hint */}
                  <p className="text-center mt-6 font-pixel" style={{ fontSize: '0.55rem', color: 'var(--color-muted)', opacity: 0.5 }}>
                    ↑ ↑ ↓ ↓ ← → ← → B A — for something that does nothing
                  </p>
                </section>

                {/* Footer chaos */}
                <footer
                  className="w-full py-10 text-center"
                  style={{ borderTop: '1px solid var(--color-border)' }}
                >
                  <p className="font-pixel" style={{ fontSize: '0.6rem', color: 'var(--color-muted)' }}>
                    © 2024 RAGEBAIT.EXE — All rights reserved (none of this is real) — aura: still draining
                  </p>
                </footer>
              </main>
            )}

            {/* Persistent overlays */}
            <FakeError />
            <Bsod />
            <Captcha />
            <CookieBanner />
            <ChatDave />
            <SurrenderButton onSurrender={handleSurrender} />

            {/* P2 overlays */}
            <GodModeOverlay />
            <WastedOverlay />
            <EmergencyMeeting />
            <VisitorPopup />
            <ScrollBetrayalToast active={scrollInvertActive} />
            <MissionFailed show={missionFailed} />

            {/* Emoji rain (canvas) */}
            <EmojiRain active={emojiRainActive} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
