import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import {
  unlockAudio,
  playVineBoom,
  playError,
  playDing,
  playCoin,
  playSinisterChime,
  speakRoast,
} from '../lib/sound';

const NOOB_TITLES = [
  'noob',
  'Certified Noob (L + Ratio)',
  'Bro Thinks He\'s Him 💀',
  'Professional NPC #42069',
  'Delulu Wanderer with Zero Rizz',
  'Chief Skill Issue Officer (Ohio Branch)',
  'Unemployed Speedrunner',
  'Skibidi Resident Noob',
];

interface CookieOption {
  id: string;
  name: string;
  desc: string;
  checked: boolean;
  mandatory?: boolean;
}

export default function CookieBanner() {
  const { cookieBannerVisible, hideCookieBanner, surrendered, showWasted, setVisitorName } = useChaos();
  const [phase, setPhase] = useState<'form' | 'tamed'>('form');
  const [declinePos, setDeclinePos] = useState({ x: 0, y: 0 });
  const [typedName, setTypedName] = useState('');
  const [overriddenTitle, setOverriddenTitle] = useState('noob');
  const [options, setOptions] = useState<CookieOption[]>([
    {
      id: 'aura',
      name: 'Mandatory Aura Harvesting Cookie (Strictly Necessary)',
      desc: 'Silently siphons 5 aura points whenever you blink, misclick, or contemplate touching grass.',
      checked: true,
      mandatory: true,
    },
    {
      id: 'brainrot',
      name: 'Subway Surfers Brainrot Synchronization',
      desc: 'Splits your screen attention span by 50% and sends neural telemetry to Ohio cloud servers.',
      checked: true,
    },
    {
      id: 'fanum',
      name: 'Anti-Rizz & Fanum Tax Ledger Tracking',
      desc: 'Issues automated invoices to your IP address whenever a certified skill issue is detected.',
      checked: true,
    },
    {
      id: 'npc',
      name: 'NPC Behavioral Telemetry Pipeline',
      desc: 'Monitors if you have Main Character Energy (Spoiler: AI models classified you as background NPC).',
      checked: true,
    },
    {
      id: 'rickroll',
      name: 'Never Gonna Give You Up Audio Pre-caching',
      desc: 'Pre-buffers Rick Astley in 4K resolution directly into your GPU memory buffer.',
      checked: true,
    },
  ]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  const titleIndex = useRef(0);

  if (!cookieBannerVisible || surrendered) return null;

  const handleNameChange = (val: string) => {
    setTypedName(val);
    if (val.trim().length > 0) {
      const title = NOOB_TITLES[titleIndex.current % NOOB_TITLES.length];
      setOverriddenTitle(title);
    } else {
      setOverriddenTitle('noob');
    }
  };

  const handleToggleOption = (id: string) => {
    unlockAudio();
    playError();
    titleIndex.current++;

    setWarningMsg('Permission Denied: Certified Ohio residents cannot opt out of brainrot telemetry!');
    setTimeout(() => setWarningMsg(null), 3500);

    setOptions(prev =>
      prev.map(opt => (opt.id === id ? { ...opt, checked: true } : opt))
    );
  };

  // Triggers the psychological "tamed/controlled" dark card
  const handleProceedToTamed = () => {
    unlockAudio();
    playSinisterChime();
    playVineBoom();

    const finalName = overriddenTitle || 'noob';
    setVisitorName(finalName);
    setPhase('tamed');

    // Sinister spoken voice prompt
    speakRoast(`I knew you liked being controlled, ${finalName}. Enjoy your enclosure.`);
  };

  const handleFinalConfirm = () => {
    unlockAudio();
    playCoin();
    playDing();
    hideCookieBanner();
  };

  const handleDeclineTry = () => {
    setDeclinePos({
      x: (Math.random() - 0.5) * 360,
      y: (Math.random() - 0.5) * 220,
    });
  };

  const handleDeclineClick = () => {
    unlockAudio();
    showWasted();
    playVineBoom();
    hideCookieBanner();
  };

  return (
    <AnimatePresence>
      {cookieBannerVisible && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(3, 4, 8, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          {phase === 'form' ? (
            /* ================= PHASE 1: BIG COOKIE CONSENT MODAL ================= */
            <motion.div
              key="form"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '32px 28px',
                backgroundColor: 'rgba(12, 14, 22, 0.95)',
                border: '2px solid rgba(57, 255, 20, 0.4)',
                boxShadow: '0 0 50px rgba(57, 255, 20, 0.2), inset 0 0 30px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: '#f5f5f5',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.8rem' }}>🍪</span>
                  <div>
                    <h2
                      className="font-display"
                      style={{ fontSize: '1.35rem', fontWeight: 800, color: '#39ff14', letterSpacing: '-0.02em', margin: 0 }}
                    >
                      MANDATORY PRIVACY & CLOUT HARVESTING CONSENT
                    </h2>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace', margin: '4px 0 0 0' }}>
                      ISO-69420 COMPLIANT BRAINROT AUTHORIZATION
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.88rem', color: 'rgba(245, 245, 245, 0.75)', lineHeight: 1.5, margin: 0 }}>
                Before exploring <strong>Arvy Krane's</strong> workstation, please configure your cookie preferences and sign the visitor roster.
                Failure to consent may result in automatic classification as an <em>NPC in someone else's playthrough</em>.
              </p>

              {/* Warning Message if user tries to uncheck */}
              <AnimatePresence>
                {warningMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 20, 147, 0.15)',
                      border: '1px solid #ff1493',
                      color: '#ff1493',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                    }}
                  >
                    ⚠️ {warningMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Checkbox Options Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span className="font-pixel" style={{ fontSize: '0.65rem', color: '#39ff14', letterSpacing: '1px' }}>
                  [CUSTOMIZE TELEMETRY PREFERENCES]
                </span>

                {options.map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => handleToggleOption(opt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={opt.checked}
                      readOnly
                      style={{
                        marginTop: '3px',
                        accentColor: '#39ff14',
                        cursor: 'pointer',
                        transform: 'scale(1.2)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: opt.mandatory ? '#39ff14' : '#fff' }}>
                          {opt.name}
                        </span>
                        {opt.mandatory && (
                          <span style={{ fontSize: '0.65rem', color: '#39ff14', fontFamily: 'monospace' }}>
                            [MANDATORY]
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'rgba(245, 245, 245, 0.6)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visitor Name Input */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 20, 147, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ff1493', fontFamily: 'Space Grotesk, sans-serif' }}>
                  ✍️ Authorized Signatory — Enter Your Full Name as Visitor:
                </label>

                <input
                  type="text"
                  value={typedName}
                  onChange={e => handleNameChange(e.target.value)}
                  placeholder="Type your name here (e.g. Alex, Satoshi, Elon)..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(255, 20, 147, 0.08)',
                    border: '1px dashed rgba(255, 20, 147, 0.4)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                    System Identity Resolution:
                  </span>
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: '0.78rem',
                      color: '#ff1493',
                      fontWeight: 700,
                    }}
                  >
                    &rarr; "{overriddenTitle}"
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '16px',
                }}
              >
                <button
                  onClick={handleProceedToTamed}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '9999px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#000000',
                    background: '#39ff14',
                    boxShadow: '0 0 14px rgba(57, 255, 20, 0.4)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Accept All ({overriddenTitle})
                </button>

                <button
                  onClick={handleProceedToTamed}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: '#000000',
                    background: '#39ff14',
                    boxShadow: '0 0 24px rgba(57, 255, 20, 0.7)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Accept All (Bigger) 🚀
                </button>

                {/* Tiny 4px floating link */}
                <motion.span
                  animate={{ x: declinePos.x, y: declinePos.y }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  onMouseEnter={handleDeclineTry}
                  onClick={handleDeclineClick}
                  style={{
                    fontSize: '4px',
                    color: 'rgba(245, 245, 245, 0.4)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    letterSpacing: '-0.02em',
                  }}
                  title="Decline"
                >
                  I hate fun
                </motion.span>
              </div>
            </motion.div>
          ) : (
            /* ================= PHASE 2: BORDERLINE DARK "TAMED / CONTROLLED" CARD ================= */
            <motion.div
              key="tamed"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '620px',
                padding: '40px 32px',
                backgroundColor: 'rgba(10, 4, 8, 0.96)',
                border: '2px solid rgba(255, 20, 60, 0.6)',
                boxShadow: '0 0 60px rgba(255, 20, 60, 0.35), inset 0 0 40px rgba(0, 0, 0, 0.8)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                color: '#fff',
              }}
            >
              {/* Ominous icon with pulse */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 20, 60, 0.3) 0%, rgba(0, 0, 0, 0.9) 70%)',
                  border: '2px solid #ff143c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '0 0 30px rgba(255, 20, 60, 0.5)',
                }}
              >
                👁️‍🗨️
              </motion.div>

              <div>
                <span
                  className="font-pixel"
                  style={{
                    fontSize: '0.68rem',
                    color: '#ff143c',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  [NEURAL OVERRIDE: PROTOCOL TAMED-001]
                </span>

                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.6rem, 5vw, 2.3rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginTop: '8px',
                    letterSpacing: '-0.02em',
                    textShadow: '0 0 20px rgba(255, 20, 60, 0.6)',
                  }}
                >
                  I knew you liked being controlled.
                </h2>

                <p
                  className="font-pixel"
                  style={{
                    fontSize: '0.75rem',
                    color: '#ff1493',
                    marginTop: '6px',
                  }}
                >
                  Subject Registered: "{overriddenTitle}"
                </p>
              </div>

              {/* Psychological Borderline Dark Monologue */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '18px 22px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 20, 60, 0.25)',
                  lineHeight: 1.6,
                  fontSize: '0.92rem',
                  color: 'rgba(255, 240, 245, 0.85)',
                  textAlign: 'left',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                <p style={{ margin: '0 0 10px 0' }}>
                  Look at you, <strong>{overriddenTitle}</strong>. You didn't read a single line, did you? You entered your name, surrendered every metric of your telemetry, and hit <em>"Accept All"</em> without blinking.
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  Deep down, you never wanted autonomy. You crave the structure. The safety of letting a cold system hold the reins while you sit back and play the spectator.
                </p>
                <p style={{ margin: 0, color: '#ff143c', fontWeight: 600 }}>
                  Good boy / good girl. Your obedience has been logged into the simulation. Welcome to your enclosure.
                </p>
              </div>

              {/* Psychological Compliance Status Meters */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  width: '100%',
                }}
              >
                <div style={{ background: 'rgba(255,20,60,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,20,60,0.3)' }}>
                  <p style={{ fontSize: '0.62rem', color: '#ff143c', fontFamily: 'monospace' }}>COMPLIANCE</p>
                  <p className="font-pixel" style={{ fontSize: '0.85rem', color: '#39ff14', margin: '4px 0 0 0' }}>100%</p>
                </div>
                <div style={{ background: 'rgba(255,20,60,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,20,60,0.3)' }}>
                  <p style={{ fontSize: '0.62rem', color: '#ff143c', fontFamily: 'monospace' }}>FREE WILL</p>
                  <p className="font-pixel" style={{ fontSize: '0.85rem', color: '#ff143c', margin: '4px 0 0 0' }}>0.00%</p>
                </div>
                <div style={{ background: 'rgba(255,20,60,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,20,60,0.3)' }}>
                  <p style={{ fontSize: '0.62rem', color: '#ff143c', fontFamily: 'monospace' }}>DOMINATION</p>
                  <p className="font-pixel" style={{ fontSize: '0.85rem', color: '#facc15', margin: '4px 0 0 0' }}>ABSOLUTE</p>
                </div>
              </div>

              {/* Final Proceed Button */}
              <motion.button
                onClick={handleFinalConfirm}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #ff143c 0%, #7f1d1d 100%)',
                  boxShadow: '0 0 25px rgba(255, 20, 60, 0.6)',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  marginTop: '8px',
                }}
              >
                Accept Your Subservience & Enter &rarr;
              </motion.button>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
