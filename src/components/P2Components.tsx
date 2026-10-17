import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { playAirhorn, playEmergencyMeetingSiren, playVoteStamp, playSpaceWhoosh, playPop } from '../lib/sound';

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

function CrewmateSvg({
  color = '#e74c3c',
  visor = '#85d0e7',
  size = 48,
}: {
  color?: string;
  visor?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-md">
      {/* Backpack */}
      <rect x="8" y="22" width="10" height="24" rx="5" fill={color} stroke="#0f172a" strokeWidth="3" />
      {/* Main Body */}
      <path
        d="M18 20 C18 10, 46 10, 46 20 L46 44 C46 51, 44 54, 40 54 L36 54 C34 54, 34 47, 30 47 C26 47, 26 54, 24 54 L20 54 C16 54, 18 44, 18 20 Z"
        fill={color}
        stroke="#0f172a"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Leg separator */}
      <path d="M30 47 L30 54" stroke="#0f172a" strokeWidth="3.5" />
      {/* Visor */}
      <rect x="28" y="18" width="22" height="13" rx="6.5" fill={visor} stroke="#0f172a" strokeWidth="3" />
      {/* Visor shine */}
      <ellipse cx="36" cy="22" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.75)" />
    </svg>
  );
}

const SPACE_STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  top: `${((i * 37) % 94) + 3}%`,
  left: `${((i * 61) % 96) + 2}%`,
  size: (i % 3) + 1.5,
  opacity: 0.35 + (i % 5) * 0.15,
  duration: 1.5 + (i % 4) * 0.5,
}));

// Among Us Emergency Meeting & Cinematic Ejection Sequence
export function EmergencyMeeting() {
  const { emergencyMeetingVisible, hideEmergencyMeeting, surrendered, visitorName } = useChaos();
  const [phase, setPhase] = useState<'voting' | 'verdict' | 'ejection'>('voting');
  const [votedTarget, setVotedTarget] = useState<{ name: string; color: string; isImpostor: boolean } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timer, setTimer] = useState(25);

  const displayName = visitorName || 'Certified Noob';

  const crewmates = [
    { id: 'red', name: 'Red', role: 'Crewmate', color: '#e74c3c', visor: '#85d0e7', quote: 'saw visitor vent in electrical fr fr', isImpostor: false },
    { id: 'arvy', name: 'Arvy (Host)', role: 'Senior Architect', color: '#00e5ff', visor: '#ffffff', quote: 'was compiling rust kernels in medbay', isImpostor: false },
    { id: 'dave', name: 'Dave', role: 'Junior Dev', color: '#9b59b6', visor: '#85d0e7', quote: 'pushed broken code to main, my bad', isImpostor: false },
    { id: 'sigma', name: 'Big Sigma', role: 'Alpha Crewmate', color: '#f1c40f', visor: '#85d0e7', quote: 'mewing streak cannot be interrupted', isImpostor: false },
    { id: 'ohio', name: 'Ohio Resident', role: 'Skibidi Witness', color: '#e67e22', visor: '#85d0e7', quote: 'found the dead production branch', isImpostor: true },
    { id: 'player', name: `${displayName} (YOU)`, role: 'Chief Suspect', color: '#ff007f', visor: '#39ff14', quote: 'sweating profusely at the terminal', isImpostor: false },
  ];

  // Siren sound on modal open
  useEffect(() => {
    if (emergencyMeetingVisible) {
      setPhase('voting');
      setVotedTarget(null);
      setSelectedId(null);
      setTimer(25);
      playEmergencyMeetingSiren();
    }
  }, [emergencyMeetingVisible]);

  // Countdown timer
  useEffect(() => {
    if (!emergencyMeetingVisible || phase !== 'voting') return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          handleVote(crewmates[5]); // auto-eject suspect on timeout
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [emergencyMeetingVisible, phase]);

  const handleVote = (target: typeof crewmates[0] | null) => {
    if (phase !== 'voting') return;
    playVoteStamp();
    setSelectedId(target ? target.id : 'skip');
    // Default to player if skipped or voted
    const finalEjected = target && target.id !== 'skip' ? target : crewmates[5];
    setVotedTarget(finalEjected);
    setPhase('verdict');

    setTimeout(() => {
      setPhase('ejection');
      playSpaceWhoosh();
    }, 1800);
  };

  if (surrendered) return null;

  return (
    <AnimatePresence>
      {emergencyMeetingVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9650] flex items-center justify-center p-3 sm:p-6"
          style={{
            background: 'radial-gradient(circle at center, rgba(30, 10, 15, 0.95) 0%, rgba(4, 6, 12, 0.98) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Red Emergency Rotating Beacon Ambient Overlay */}
          {phase === 'voting' && (
            <motion.div
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(231, 76, 60, 0.35) 0%, transparent 70%)',
              }}
            />
          )}

          {/* Voting Terminal View */}
          {(phase === 'voting' || phase === 'verdict') && (
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden border-2 shadow-2xl flex flex-col"
              style={{
                borderColor: '#e74c3c',
                background: 'rgba(14, 18, 28, 0.96)',
                boxShadow: '0 0 50px rgba(231, 76, 60, 0.3), inset 0 0 20px rgba(0,0,0,0.8)',
                maxHeight: '92vh',
              }}
            >
              {/* Header: Hazard Strobe & Siren Title */}
              <div
                className="px-4 py-3 flex items-center justify-between border-b flex-wrap gap-2"
                style={{
                  background: 'repeating-linear-gradient(45deg, #781717, #781717 12px, #991b1b 12px, #991b1b 24px)',
                  borderColor: '#e74c3c',
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-base"
                    style={{ background: '#f59e0b', color: '#000', boxShadow: '0 0 12px #f59e0b' }}
                  >
                    🚨
                  </motion.div>
                  <span
                    style={{
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
                      color: '#ffffff',
                      letterSpacing: '0.08em',
                      textShadow: '0 0 12px rgba(255,255,255,0.7)',
                    }}
                  >
                    EMERGENCY MEETING
                  </span>
                </div>

                {/* Voting Countdown Timer */}
                <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-red-500/50">
                  <span className="text-xs text-red-300 font-mono">VOTING TIME:</span>
                  <span className="text-base font-bold font-mono text-red-400">
                    {timer}s
                  </span>
                </div>
              </div>

              {/* Accusation / Situation Brief */}
              <div className="px-5 py-3 border-b border-white/10 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                      CRITICAL SABOTAGE DETECTED // SECTOR ELECTRICAL
                    </span>
                  </div>
                  <p className="text-sm text-gray-200 mt-0.5">
                    Production Cluster was murdered! Witness testimony accuses:{' '}
                    <strong style={{ color: '#ff007f' }}>{displayName}</strong>
                  </p>
                </div>
                <div className="text-xs text-gray-400 font-mono bg-white/5 px-2.5 py-1 rounded border border-white/10 shrink-0">
                  ⌨️ Left-Ctrl: Panic Override
                </div>
              </div>

              {/* Crewmates Grid */}
              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto">
                {crewmates.map(member => {
                  const isSelected = selectedId === member.id;
                  const isPlayer = member.id === 'player';

                  return (
                    <motion.div
                      key={member.id}
                      whileHover={{ scale: phase === 'voting' ? 1.02 : 1 }}
                      className="relative p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all"
                      style={{
                        background: isPlayer
                          ? 'rgba(255, 0, 127, 0.12)'
                          : 'rgba(255, 255, 255, 0.04)',
                        borderColor: isSelected
                          ? '#e74c3c'
                          : isPlayer
                          ? 'rgba(255, 0, 127, 0.4)'
                          : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isSelected
                          ? '0 0 20px rgba(231, 76, 60, 0.4)'
                          : 'none',
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <CrewmateSvg color={member.color} visor={member.visor} size={44} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="font-bold text-sm truncate"
                              style={{
                                color: isPlayer ? '#ff77c2' : '#ffffff',
                                fontFamily: 'monospace',
                              }}
                            >
                              {member.name}
                            </span>
                            {isPlayer && (
                              <span className="text-[10px] bg-red-600/80 text-white font-mono px-1.5 py-0.5 rounded font-bold shrink-0">
                                SUS
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            "{member.quote}"
                          </p>
                        </div>
                      </div>

                      {/* Vote Button */}
                      {phase === 'voting' && (
                        <button
                          onClick={() => handleVote(member)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono text-white transition-all shrink-0"
                          style={{
                            background: isPlayer
                              ? 'linear-gradient(135deg, #e74c3c, #c0392b)'
                              : 'rgba(255, 255, 255, 0.12)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={() => playPop()}
                        >
                          VOTE 🗳️
                        </button>
                      )}

                      {/* Stamped Vote Badge */}
                      {phase === 'verdict' && isSelected && (
                        <motion.span
                          initial={{ scale: 2, rotate: -20, opacity: 0 }}
                          animate={{ scale: 1, rotate: -10, opacity: 1 }}
                          className="px-2.5 py-1 text-xs font-black font-mono border-2 border-red-500 text-red-500 rounded uppercase tracking-wider bg-black/80"
                        >
                          VOTED
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Actions Bar */}
              <div className="px-5 py-3.5 bg-black/60 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => handleVote(null)}
                  disabled={phase !== 'voting'}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-gray-300 hover:text-white transition-all border border-gray-600 hover:border-gray-400 bg-white/5"
                  style={{ cursor: phase === 'voting' ? 'pointer' : 'default' }}
                >
                  ⛔ Skip Vote (Vote Nobody)
                </button>

                <div className="text-xs text-gray-400 font-mono">
                  {phase === 'voting'
                    ? 'Cast your vote before time runs out!'
                    : 'Tallying votes across starship...'}
                </div>
              </div>
            </motion.div>
          )}

          {/* Cinematic Deep Space Ejection Sequence */}
          {phase === 'ejection' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full max-w-5xl flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Twinkling Starfield */}
              {SPACE_STARS.map(star => (
                <motion.div
                  key={star.id}
                  animate={{ opacity: [star.opacity, 1, star.opacity] }}
                  transition={{ repeat: Infinity, duration: star.duration, ease: 'easeInOut' }}
                  className="absolute rounded-full bg-white"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                  }}
                />
              ))}

              {/* Drifting Ejected Crewmate */}
              <div className="relative w-full h-48 flex items-center justify-center my-6">
                <motion.div
                  initial={{ x: -280, y: 40, rotate: 0 }}
                  animate={{ x: 280, y: -30, rotate: 720 }}
                  transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
                  className="absolute"
                >
                  <CrewmateSvg
                    color={votedTarget ? votedTarget.color : '#ff007f'}
                    visor="#85d0e7"
                    size={80}
                  />
                </motion.div>
              </div>

              {/* Atmospheric Reveal Text */}
              <div className="text-center px-4 z-10">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="font-mono text-sm tracking-widest text-gray-400 mb-2"
                >
                  . 　　　。　　　　•　 　ﾟ　　。 　　.
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="text-2xl sm:text-4xl font-mono font-black text-white tracking-wider"
                  style={{ textShadow: '0 0 25px rgba(255,255,255,0.6)' }}
                >
                  {votedTarget ? votedTarget.name : displayName} was ejected.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  className="mt-3 font-mono text-base sm:text-lg"
                  style={{
                    color: votedTarget?.isImpostor ? '#39ff14' : '#e74c3c',
                    textShadow: votedTarget?.isImpostor ? '0 0 15px #39ff14' : '0 0 15px #e74c3c',
                  }}
                >
                  {votedTarget?.isImpostor ? 'They were The Impostor.' : 'They were not An Impostor.'}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0, duration: 0.5 }}
                  className="mt-2 text-xs sm:text-sm font-mono text-gray-400"
                >
                  1 Impostor remains.
                </motion.p>

                {/* Return Button & Bypass hint */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.4, duration: 0.5 }}
                  className="mt-8 flex flex-col items-center gap-3"
                >
                  <button
                    onClick={hideEmergencyMeeting}
                    className="px-8 py-3 rounded-full font-mono font-bold text-black transition-all hover:scale-105"
                    style={{
                      background: '#39ff14',
                      boxShadow: '0 0 20px rgba(57, 255, 20, 0.4)',
                      cursor: 'pointer',
                    }}
                  >
                    🚀 Return to Bridge
                  </button>

                  <span className="text-xs font-mono text-gray-500">
                    [ Press Left-Ctrl or click Return to resume workstation ]
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
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
