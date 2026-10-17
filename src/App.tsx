import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './styles/tokens.css';
import './styles/glitch.css';
import './styles/grain.css';
import './index.css';

// Components
import EntryGate from './components/EntryGate';
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

// Sound
import {
  unlockAudio,
  playVineBoom,
  playAirhorn,
  playError,
  playOof,
  playCoin,
  playDing,
  playRickrollMelody,
  toggleMute,
} from './lib/sound';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<'chaos' | 'clean'>('chaos');
  const [muted, setMutedState] = useState(false);
  const [scrollInvertActive, setScrollInvertActive] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);

  const {
    aura,
    diedVisible,
    hideDied,
    emojiRainActive,
    scrollInverted,
    drainAura,
    invertScroll,
    showBsod,
    showCaptcha,
    showEmergencyMeeting,
    spawnFakeError,
    surrender,
    triggerEmojiRain,
  } = useChaos();

  // Konami code P2
  useKonamiCode();

  // Handle Mute toggle
  const handleToggleMute = () => {
    const isMuted = toggleMute();
    setMutedState(isMuted);
  };

  // Scroll betrayal (P1)
  useEffect(() => {
    if (activeTab === 'clean') return;
    let lastScroll = 0;
    const handler = (e: WheelEvent) => {
      if (scrollInverted) {
        e.preventDefault();
        window.scrollBy(0, -e.deltaY * 1.5);
        if (!scrollInvertActive) {
          setScrollInvertActive(true);
          setTimeout(() => setScrollInvertActive(false), 3000);
        }
      } else {
        const now = Date.now();
        if (now - lastScroll > 9000 && Math.random() < 0.08) {
          lastScroll = now;
          invertScroll();
        }
      }
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [scrollInverted, scrollInvertActive, activeTab, invertScroll]);

  // Back button guard (P1)
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'are you sure you want to leave? 🫡';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  const handleSurrender = () => {
    surrender();
    setActiveTab('clean');
    setMissionFailed(true);
    setTimeout(() => setMissionFailed(false), 3000);
  };

  const auraColor =
    aura > 60 ? '#39ff14' : aura > 30 ? '#facc15' : '#ff1493';

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#050508', color: '#f5f5f5' }}>
      {/* Background grain and scanlines */}
      <div className="grain-overlay" />
      <div className="scanlines crt-flicker" />

      {/* Entry Gate (First Troll) */}
      <AnimatePresence>
        {!entered && (
          <EntryGate onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {entered && (
        <>
          {/* Top Sticky Navigation Bar */}
          <header
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              height: '64px',
              backgroundColor: 'rgba(5, 5, 8, 0.88)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
            }}
          >
            {/* Brand Logo */}
            <div
              onClick={() => {
                unlockAudio();
                playCoin();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>💀</span>
              <span
                className="font-pixel glitch-text"
                data-text="RAGEBAIT.EXE"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  color: '#39ff14',
                  letterSpacing: '1px',
                }}
              >
                RAGEBAIT.EXE
              </span>
            </div>

            {/* 2-Page Navigation Switcher Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '9999px',
                padding: '4px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <button
                onClick={() => {
                  unlockAudio();
                  playDing();
                  setActiveTab('chaos');
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'chaos' ? '#ff1493' : 'transparent',
                  color: activeTab === 'chaos' ? '#ffffff' : 'rgba(245, 245, 245, 0.65)',
                  boxShadow: activeTab === 'chaos' ? '0 0 14px rgba(255, 20, 147, 0.6)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                😈 Page 1: Ragebait Profile
              </button>

              <button
                onClick={() => {
                  unlockAudio();
                  playDing();
                  setActiveTab('clean');
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'clean' ? '#39ff14' : 'transparent',
                  color: activeTab === 'clean' ? '#000000' : 'rgba(245, 245, 245, 0.65)',
                  boxShadow: activeTab === 'clean' ? '0 0 14px rgba(57, 255, 20, 0.6)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                💼 Page 2: Real Portfolio
              </button>
            </div>

            {/* Right Controls: Aura HUD + Mute Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Aura Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <span className="font-pixel" style={{ fontSize: '0.65rem', color: auraColor }}>
                  AURA
                </span>
                <div
                  style={{
                    width: '60px',
                    height: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${aura}%`,
                      backgroundColor: auraColor,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <span className="font-pixel" style={{ fontSize: '0.65rem', color: auraColor }}>
                  {aura}%
                </span>
              </div>

              {/* Mute Button */}
              <button
                onClick={handleToggleMute}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                }}
                title={muted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {muted ? '🔇' : '🔊'}
              </button>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div style={{ paddingTop: '64px' }}>
            {activeTab === 'clean' ? (
              /* ================= PAGE 2: REAL CLEAN PORTFOLIO ================= */
              <CleanProfile onSwitchToChaos={() => setActiveTab('chaos')} />
            ) : (
              /* ================= PAGE 1: RAGEBAIT CHAOS PORTFOLIO ================= */
              <main
                style={{
                  width: '100%',
                  maxWidth: '920px',
                  margin: '0 auto',
                  padding: '48px 24px 80px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '48px',
                  alignItems: 'center',
                }}
              >
                {/* Hero Profile Card */}
                <div
                  className="glass-card"
                  style={{
                    width: '100%',
                    padding: '40px 24px',
                    textAlign: 'center',
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                    boxShadow: '0 0 35px rgba(57, 255, 20, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Interactive Avatar */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => {
                      unlockAudio();
                      playScreamSound();
                      drainAura(5);
                    }}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #39ff14 0%, #000 80%)',
                      border: '3px solid #ff1493',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      cursor: 'pointer',
                      marginBottom: '20px',
                      boxShadow: '0 0 25px rgba(255, 20, 147, 0.4)',
                    }}
                    title="Click for vibe check"
                  >
                    👾
                  </motion.div>

                  <h1
                    className="font-display glitch-text"
                    data-text="Hi, I'm Arvy Krane"
                    style={{
                      fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      marginBottom: '10px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Hi, I'm <span style={{ color: '#39ff14' }}>Arvy Krane</span>
                  </h1>

                  <p
                    style={{
                      fontSize: '1.1rem',
                      color: 'rgba(245, 245, 245, 0.75)',
                      maxWidth: '560px',
                      lineHeight: 1.5,
                      marginBottom: '24px',
                    }}
                  >
                    full-stack developer · sigma grindset · certified Ohio resident ·{' '}
                    <span style={{ color: '#ff1493', fontWeight: 600 }}>definitely hireable</span>
                  </p>

                  {/* Brainrot Stats Counter */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '12px',
                      width: '100%',
                      maxWidth: '500px',
                      marginBottom: '24px',
                    }}
                  >
                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ fontSize: '0.7rem', color: '#ff1493', fontWeight: 700 }}>AURA POINTS</p>
                      <p className="font-pixel" style={{ fontSize: '0.9rem', color: auraColor, marginTop: '4px' }}>{aura} / 100</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ fontSize: '0.7rem', color: '#39ff14', fontWeight: 700 }}>REAL-LIFE K/D</p>
                      <p className="font-pixel" style={{ fontSize: '0.9rem', color: '#39ff14', marginTop: '4px' }}>0.01</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ fontSize: '0.7rem', color: '#facc15', fontWeight: 700 }}>SKIBIDI LEVEL</p>
                      <p className="font-pixel" style={{ fontSize: '0.9rem', color: '#facc15', marginTop: '4px' }}>OVER 9000</p>
                    </div>
                  </div>

                  {/* Primary P0 Interaction Buttons Row */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '16px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '8px',
                    }}
                  >
                    <LikeButton />
                    <RickrollTrap />
                  </div>
                </div>

                {/* P0 Runaway Follow Trap */}
                <div
                  className="glass-card"
                  style={{
                    width: '100%',
                    padding: '24px',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 20, 147, 0.3)',
                    boxShadow: '0 0 25px rgba(255, 20, 147, 0.1)',
                  }}
                >
                  <p
                    className="font-pixel"
                    style={{ fontSize: '0.75rem', color: '#39ff14', marginBottom: '8px', letterSpacing: '1px' }}
                  >
                    🎯 PRANK #1: TRY TO FOLLOW ME
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(245,245,245,0.6)', marginBottom: '16px' }}>
                    (The button dodges your cursor with spring physics. On phones, it teleports away!)
                  </p>
                  <RunawayButton onAttempt={() => drainAura(4)} />
                </div>

                {/* P0 Roast Generator Trap */}
                <div
                  className="glass-card"
                  style={{
                    width: '100%',
                    padding: '28px',
                    textAlign: 'center',
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                    boxShadow: '0 0 25px rgba(57, 255, 20, 0.1)',
                  }}
                >
                  <p
                    className="font-pixel"
                    style={{ fontSize: '0.75rem', color: '#ff1493', marginBottom: '8px', letterSpacing: '1px' }}
                  >
                    🔥 PRANK #2: ROAST MACHINE (WITH AUDIO & TTS)
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(245,245,245,0.6)', marginBottom: '18px' }}>
                    Click to trigger random synthesized bass drops, screen shakes, and audible spoken roasts!
                  </p>
                  <RoastButton />
                </div>

                {/* 🔊 Audio Soundboard Bar */}
                <div
                  className="glass-card"
                  style={{
                    width: '100%',
                    padding: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#39ff14',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>🔊</span> Synthesized Web Audio Soundboard
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(245, 245, 245, 0.6)', marginBottom: '16px' }}>
                    All synthesized in real-time via Web Audio API. Click any button to blast sound:
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '10px',
                    }}
                  >
                    {[
                      { name: '💥 Vine Boom', fn: playVineBoom },
                      { name: '📯 MLG Airhorn', fn: playAirhorn },
                      { name: '⚠️ Windows Error', fn: playError },
                      { name: '🧱 Roblox Oof', fn: playOof },
                      { name: '🪙 Mario Coin', fn: playCoin },
                      { name: '🎵 Rickroll 8-Bit', fn: playRickrollMelody },
                      { name: '🖕 Emoji Rain', fn: triggerEmojiRain },
                    ].map(snd => (
                      <button
                        key={snd.name}
                        onClick={() => {
                          unlockAudio();
                          snd.fn();
                        }}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.15s',
                        }}
                      >
                        {snd.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chaotic Skills Grid (P1 & P2 Traps) */}
                <div style={{ width: '100%' }}>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '8px',
                      textAlign: 'center',
                    }}
                  >
                    My <span style={{ color: '#ff1493' }}>Skills™</span> (Interactive Pranks)
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(245, 245, 245, 0.6)', textAlign: 'center', marginBottom: '20px' }}>
                    Click each skill to unleash chaotic browser behavior:
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '14px',
                    }}
                  >
                    {[
                      {
                        title: '💀 Windows XP Error Stack',
                        desc: 'Spawns authentic retro system errors. Closing one spawns two more!',
                        action: () => spawnFakeError(),
                        color: '#ff1493',
                      },
                      {
                        title: '🔵 Blue Screen of Death',
                        desc: 'Simulates a crash screen with QR code and interactive reboot.',
                        action: () => showBsod(),
                        color: '#0055ff',
                      },
                      {
                        title: '🧩 Sigma Captcha',
                        desc: 'Select squares with sigma energy (spoiler: it always fails).',
                        action: () => showCaptcha(),
                        color: '#39ff14',
                      },
                      {
                        title: '🚨 Emergency Meeting',
                        desc: 'Among Us alarm overlay accusing you of being sus.',
                        action: () => showEmergencyMeeting(),
                        color: '#e74c3c',
                      },
                      {
                        title: '🙃 Invert Scroll Wheel',
                        desc: 'Inverts scroll wheel direction for 3 seconds.',
                        action: () => invertScroll(),
                        color: '#facc15',
                      },
                      {
                        title: '🏳️ I Surrender (Go to Page 2)',
                        desc: 'Ends all chaos and opens the genuine clean portfolio page.',
                        action: handleSurrender,
                        color: '#a855f7',
                      },
                    ].map(card => (
                      <div
                        key={card.title}
                        onClick={() => {
                          unlockAudio();
                          card.action();
                        }}
                        className="glass-card"
                        style={{
                          padding: '18px',
                          border: `1px solid rgba(255, 255, 255, 0.1)`,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: 'transform 0.15s, border-color 0.15s',
                        }}
                      >
                        <div>
                          <h4 style={{ color: card.color, fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '0.82rem', color: 'rgba(245, 245, 245, 0.65)', lineHeight: 1.4 }}>
                            {card.desc}
                          </p>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: card.color, fontWeight: 700, marginTop: '12px' }}>
                          Trigger Prank &rarr;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <footer
                  style={{
                    width: '100%',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '28px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'rgba(245, 245, 245, 0.5)',
                  }}
                >
                  <p className="font-pixel" style={{ fontSize: '0.65rem', marginBottom: '8px' }}>
                    © 2026 RAGEBAIT.EXE · Page 1 of 2 (Chaos Mode)
                  </p>
                  <p>
                    Ready for peace? Switch to{' '}
                    <span
                      onClick={() => setActiveTab('clean')}
                      style={{ color: '#39ff14', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Page 2 (Clean Portfolio)
                    </span>
                  </p>
                </footer>
              </main>
            )}
          </div>

          {/* Persistent Chaotic Overlays (Only active on Page 1) */}
          {activeTab === 'chaos' && (
            <>
              <FakeError />
              <Bsod />
              <Captcha />
              <CookieBanner />
              <ChatDave />
              <SurrenderButton onSurrender={handleSurrender} />
              <GodModeOverlay />
              <WastedOverlay />
              <EmergencyMeeting />
              <VisitorPopup />
              <ScrollBetrayalToast active={scrollInvertActive} />
              <MissionFailed show={missionFailed} />
              <EmojiRain active={emojiRainActive} />
            </>
          )}

          {/* Dark Souls You Died Screen */}
          <AnimatePresence>
            {diedVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9999,
                  backgroundColor: 'rgba(0, 0, 0, 0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p
                  className="font-pixel"
                  style={{
                    color: '#8B0000',
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    textShadow: '0 0 40px #8B0000',
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                >
                  YOU DIED
                </p>
                <p style={{ color: 'rgba(245,245,245,0.6)', marginBottom: '24px' }}>
                  Aura reached 0. Certified NPC moment.
                </p>
                <button
                  onClick={hideDied}
                  style={{
                    background: '#8B0000',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    fontFamily: 'Press Start 2P, monospace',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                >
                  RESPAWN (+30 AURA)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function playScreamSound() {
  playVineBoom();
}
