import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './styles/tokens.css';
import './styles/glitch.css';
import './styles/grain.css';
import './index.css';

// Components
import EntryGate from './components/EntryGate';
import LinuxMonitor from './components/LinuxMonitor';
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
  playPop,
  playDing,
  toggleMute,
} from './lib/sound';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<'chaos' | 'clean'>('chaos');
  const [muted, setMutedState] = useState(false);
  const [scrollInvertActive, setScrollInvertActive] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);
  const [bypassNotice, setBypassNotice] = useState<string | null>(null);

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
    bypassPranks,
    surrender,
    visitorName,
  } = useChaos();

  // Konami code P2
  useKonamiCode();

  // Left Ctrl Panic Bypass Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Left Control specifically
      if (e.code === 'ControlLeft' || (e.key === 'Control' && e.location === 1)) {
        bypassPranks();
        unlockAudio();
        playPop();
        setBypassNotice('Left-Ctrl Bypass: All active error stacks & traps dismissed!');
        setTimeout(() => setBypassNotice(null), 3200);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bypassPranks]);

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
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#030305' }}>
      {/* Entry Gate (First Troll) */}
      <AnimatePresence>
        {!entered && (
          <EntryGate onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {entered && (
        <LinuxMonitor
          activeTab={activeTab}
          onTabChange={tab => {
            unlockAudio();
            playDing();
            setActiveTab(tab);
          }}
          aura={aura}
          auraColor={auraColor}
          muted={muted}
          onToggleMute={handleToggleMute}
          bypassNotice={bypassNotice}
        >
          {activeTab === 'clean' ? (
            /* ================= PAGE 2: REAL CLEAN PORTFOLIO ================= */
            <CleanProfile onSwitchToChaos={() => setActiveTab('chaos')} />
          ) : (
            /* ================= PAGE 1: RAGEBAIT LINUX CHAOS PORTFOLIO ================= */
            <main
              style={{
                width: '100%',
                maxWidth: '920px',
                margin: '0 auto',
                padding: '36px 20px 80px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '36px',
                boxSizing: 'border-box',
              }}
            >
              {/* Linux Neofetch System Banner */}
              <div
                className="glass-card"
                style={{
                  padding: '20px 24px',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  backgroundColor: 'rgba(12, 14, 20, 0.75)',
                  border: '1px solid rgba(57, 255, 20, 0.25)',
                  color: '#9ca3af',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px',
                  alignItems: 'center',
                }}
              >
                <div style={{ color: '#39ff14', whiteSpace: 'pre', fontWeight: 700, fontSize: '0.75rem' }}>
{`       /\\        arvy@archlinux
      /  \\       --------------
     /\\   \\      OS: Arch Linux x86_64
    /      \\     Host: ThinkPad X1 Extreme
   /   ,,   \\    Kernel: 6.9.4-arch1-1
  /   |  |  -\\   Shell: zsh 5.9
 /_-''    ''-_\\  WM: Hyprland (Wayland)`}
                </div>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <p style={{ color: '#f5f5f5', marginBottom: '4px' }}>
                    <span style={{ color: '#39ff14' }}>uptime:</span> 420 hrs, 69 mins
                  </p>
                  <p style={{ color: '#f5f5f5', marginBottom: '4px' }}>
                    <span style={{ color: '#ff1493' }}>active_visitor:</span>{' '}
                    <span style={{ color: '#ff1493', fontWeight: 700 }}>{visitorName}</span>
                  </p>
                  <p style={{ color: '#f5f5f5', marginBottom: '4px' }}>
                    <span style={{ color: '#39ff14' }}>aura_status:</span>{' '}
                    <span style={{ color: auraColor, fontWeight: 700 }}>{aura}% (Draining per click)</span>
                  </p>
                  <p style={{ color: '#f5f5f5', marginBottom: '4px' }}>
                    <span style={{ color: '#39ff14' }}>panic_bypass:</span>{' '}
                    <span style={{ color: '#39ff14' }}>Press [Left-Ctrl] to dismiss active error windows</span>
                  </p>
                  <p style={{ color: '#f5f5f5' }}>
                    <span style={{ color: '#39ff14' }}>status:</span>{' '}
                    <span style={{ color: '#ff1493' }}>Exploring system. Beware of unexpected traps.</span>
                  </p>
                </div>
              </div>

              {/* Developer Hero Profile */}
              <div
                className="glass-card"
                style={{
                  padding: '36px 28px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'rgba(15, 17, 26, 0.65)',
                }}
              >
                {/* Avatar with live status dot */}
                <div style={{ position: 'relative', marginBottom: '18px' }}>
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 10 }}
                    onClick={() => {
                      unlockAudio();
                      playVineBoom();
                      drainAura(4);
                    }}
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #39ff14 0%, #0a0b10 80%)',
                      border: '2px solid #39ff14',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.8rem',
                      cursor: 'pointer',
                      boxShadow: '0 0 24px rgba(57, 255, 20, 0.3)',
                    }}
                    title="Developer Avatar"
                  >
                    🐧
                  </motion.div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: '#39ff14',
                      border: '2px solid #050508',
                      boxShadow: '0 0 8px #39ff14',
                    }}
                    title="Online & Ready to Troll"
                  />
                </div>

                <h1
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Arvy Krane
                </h1>

                <p
                  style={{
                    fontSize: '1rem',
                    color: '#39ff14',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  Lead Systems Architect & Full-Stack Engineer
                </p>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'rgba(245, 245, 245, 0.7)',
                    maxWidth: '580px',
                    lineHeight: 1.6,
                    marginBottom: '28px',
                  }}
                >
                  Specializing in distributed Linux daemons, microservices, high-performance UI, and experimental web experiments.
                  Explore the portfolio below or inspect project diagnostics.
                </p>

                {/* Primary Interaction Buttons (Disguised Traps) */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '14px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '20px',
                  }}
                >
                  {/* Like Button (un-likes after 800ms) */}
                  <LikeButton />

                  {/* Resume PDF Download (Triggers Rickroll trap after fake 99% load) */}
                  <RickrollTrap />
                </div>

                {/* Developer Follow & Endorse Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px',
                    width: '100%',
                    maxWidth: '720px',
                    marginTop: '8px',
                  }}
                >
                  {/* Runaway Follow Button (Dodges cursor on hover) */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                      [NETWORK] Developer Follow Graph
                    </span>
                    <RunawayButton onAttempt={() => drainAura(3)} />
                  </div>

                  {/* Roast / Vibe Endorsement Button (Speaks roast + screen shake) */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                      [PEER REVIEW] Skills Endorsement
                    </span>
                    <RoastButton />
                  </div>
                </div>
              </div>

              {/* Linux Repositories Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: '#39ff14' }}>📁</span> Featured Repositories
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                    Showing 4 active crates
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {[
                    {
                      repo: 'arvy/kernel-ipc-daemon',
                      desc: 'Zero-copy inter-process communication driver written in Rust with sub-microsecond latency.',
                      lang: 'Rust',
                      langColor: '#dea584',
                      action: () => spawnFakeError(),
                      actionLabel: 'Inspect Memory Buffer',
                    },
                    {
                      repo: 'arvy/hyprland-glass-dots',
                      desc: 'Custom Wayland compositor layout with dynamic frosted glassmorphic shaders and automated tiling.',
                      lang: 'C++',
                      langColor: '#f34b7d',
                      action: () => showBsod(),
                      actionLabel: 'Run Shader Benchmark',
                    },
                    {
                      repo: 'arvy/distributed-raft-kv',
                      desc: 'High-availability Raft consensus key-value cluster with automatic leader election and snapshotting.',
                      lang: 'Go',
                      langColor: '#00ADD8',
                      action: () => showCaptcha(),
                      actionLabel: 'Verify Cluster Quorum',
                    },
                    {
                      repo: 'arvy/neural-telemetry-ui',
                      desc: 'Realtime WebSocket dashboard streaming cluster telemetry and neural inference benchmarks.',
                      lang: 'TypeScript',
                      langColor: '#3178c6',
                      action: () => showEmergencyMeeting(),
                      actionLabel: 'Run Anomaly Detection',
                    },
                  ].map(item => (
                    <div
                      key={item.repo}
                      className="glass-card"
                      style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(15, 18, 28, 0.55)',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#39ff14', fontSize: '0.9rem' }}>
                            {item.repo}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Public</span>
                        </div>

                        <p style={{ fontSize: '0.82rem', color: 'rgba(245, 245, 245, 0.65)', lineHeight: 1.45, marginBottom: '16px' }}>
                          {item.desc}
                        </p>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: item.langColor,
                              display: 'inline-block',
                            }}
                          />
                          <span style={{ fontSize: '0.75rem', color: '#d1d5db', fontFamily: 'monospace' }}>
                            {item.lang}
                          </span>
                        </div>

                        {/* Button disguised as developer diagnostic — unexpectedly triggers funny pranks */}
                        <button
                          onClick={() => {
                            unlockAudio();
                            item.action();
                          }}
                          style={{
                            width: '100%',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            color: '#d1d5db',
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            cursor: 'pointer',
                            textAlign: 'center',
                          }}
                        >
                          {item.actionLabel} &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linux Terminal Diagnostic Controls */}
              <div
                className="glass-card"
                style={{
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(12, 14, 22, 0.6)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>⚙️</span> System Tools & Hardware Diagnostics
                  </h3>
                  <span style={{ fontSize: '0.7rem', color: '#39ff14', fontFamily: 'monospace' }}>
                    ● Kernel Diagnostic Mode
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'rgba(245, 245, 245, 0.6)', marginBottom: '16px' }}>
                  Interact with the system modules. (Hint: press <strong style={{ color: '#39ff14' }}>Left Ctrl</strong> anytime to panic-dismiss error stacks).
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                    gap: '10px',
                  }}
                >
                  <button
                    onClick={() => {
                      unlockAudio();
                      spawnFakeError();
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    🔍 Inspect Memory Heap
                  </button>

                  <button
                    onClick={() => {
                      unlockAudio();
                      showBsod();
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    ⚡ GPU Stress Benchmark
                  </button>

                  <button
                    onClick={() => {
                      unlockAudio();
                      showCaptcha();
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    🛡️ Verify Root Privileges
                  </button>

                  <button
                    onClick={() => {
                      unlockAudio();
                      invertScroll();
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    🔄 Recalibrate Mouse Driver
                  </button>

                  <button
                    onClick={handleSurrender}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      color: '#c084fc',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    🏳️ I Surrender (Clean Mode)
                  </button>
                </div>
              </div>

              {/* Linux Shell Terminal Prompt */}
              <div
                className="glass-card"
                style={{
                  padding: '18px 20px',
                  background: 'rgba(5, 7, 12, 0.85)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ color: '#39ff14' }}>arvy@archlinux:~$</span>
                <span style={{ color: '#9ca3af' }}>cat /etc/motd</span>
                <span style={{ color: '#fff' }}>&rarr; "Ready to see the real developer profile? Switch to [2] Clean Portfolio."</span>
              </div>
            </main>
          )}

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
        </LinuxMonitor>
      )}
    </div>
  );
}
