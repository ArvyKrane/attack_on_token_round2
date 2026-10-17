import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { unlockAudio, playVineBoom, playError, playDing, playCoin } from '../lib/sound';

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
      // Pick a funny internet comedy title for them
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

    // Troll: trying to uncheck shows a funny comedy message and re-checks
    setWarningMsg('Permission Denied: Certified Ohio residents cannot opt out of brainrot telemetry!');
    setTimeout(() => setWarningMsg(null), 3500);

    setOptions(prev =>
      prev.map(opt => (opt.id === id ? { ...opt, checked: true } : opt))
    );
  };

  const handleAccept = () => {
    unlockAudio();
    playCoin();
    playDing();
    const finalName = overriddenTitle || 'noob';
    setVisitorName(finalName);
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
            backgroundColor: 'rgba(3, 4, 8, 0.82)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
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

            {/* Visitor Name Input — Whatever they type, renamed as "noob" / funny title */}
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

              {/* Automatic System Override Display */}
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
              <span style={{ fontSize: '0.7rem', color: 'rgba(245,245,245,0.4)', fontStyle: 'italic' }}>
                (Notice: All visitor credentials undergo automated neural normalization to standard "noob" tier).
              </span>
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
                onClick={handleAccept}
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
                onClick={handleAccept}
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

              {/* Tiny 4px floating "I hate fun" link */}
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
        </div>
      )}
    </AnimatePresence>
  );
}
