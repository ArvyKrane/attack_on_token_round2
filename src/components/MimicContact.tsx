import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';
import { unlockAudio, playBiteCrunch, playDarkSoulsBell, playScream, playPop } from '../lib/sound';

export default function MimicContact() {
  const [bitten, setBitten] = useState(false);
  const [animatingBite, setAnimatingBite] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { drainAura, showDied } = useChaos();

  const handleChestClick = () => {
    unlockAudio();

    if (!bitten) {
      // First time: The Mimic Strikes!
      setAnimatingBite(true);
      playBiteCrunch();
      setTimeout(() => {
        playScream();
        playDarkSoulsBell();
        drainAura(100);
        showDied();
        setBitten(true);
        setAnimatingBite(false);
      }, 500);
    } else {
      // Slain mimic: Opens recruiter contact directly!
      playPop();
      setContactModalOpen(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('arvykrane@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="relative inline-block">
      {/* Jumpscare Red Blood Flash */}
      <AnimatePresence>
        {animatingBite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 pointer-events-none z-[9900]"
            style={{
              background: 'radial-gradient(circle, rgba(180, 0, 0, 0.8) 0%, rgba(30, 0, 0, 0.95) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
        )}
      </AnimatePresence>

      {/* Mimic Chest Button */}
      <motion.button
        onClick={handleChestClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="relative group px-5 py-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer select-none"
        style={{
          background: bitten
            ? 'linear-gradient(135deg, rgba(30, 35, 50, 0.9), rgba(15, 20, 30, 0.95))'
            : 'linear-gradient(135deg, #4a2810 0%, #2b1406 100%)',
          border: bitten ? '2px solid #39ff14' : '2px solid #d4af37',
          boxShadow: bitten
            ? '0 0 20px rgba(57, 255, 20, 0.3)'
            : '0 0 25px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(0,0,0,0.8)',
        }}
        title={bitten ? "Slain Mimic Loot (Click for Contact Info)" : "Suspiciously breathing wooden chest..."}
      >
        {/* Chest SVG / Graphic */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          {!bitten ? (
            <motion.div
              animate={{ scaleY: [1, 1.08, 1], scaleX: [1, 0.96, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="relative text-2xl"
            >
              {animatingBite ? '👹' : '🧰'}
              {/* Subtle mimic breathing smoke or chain */}
              <span
                className="absolute -top-1 -right-1 text-[10px] text-amber-300 opacity-70 group-hover:opacity-100"
                title="Curled chain"
              >
                ➰
              </span>
            </motion.div>
          ) : (
            <div className="text-2xl">💀</div>
          )}
        </div>

        {/* Text Content */}
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span
              className="font-display font-bold text-sm tracking-wide"
              style={{ color: bitten ? '#39ff14' : '#ffd700' }}
            >
              {bitten ? 'Slain Mimic Loot ⚔️' : 'Treasure Chest 📦'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-black/60 text-gray-300 border border-white/10">
              {bitten ? 'CLEARED' : 'LVL 99'}
            </span>
          </div>
          <p className="text-[11px] font-mono text-gray-300">
            {bitten ? 'Click to open Recruiter Contact' : 'Open Chest // Contact Arvy'}
          </p>
        </div>

        {/* Teeth lunge animation on bite */}
        <AnimatePresence>
          {animatingBite && (
            <motion.div
              initial={{ scale: 0.5, y: 10, opacity: 0 }}
              animate={{ scale: 2.5, y: -20, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none text-4xl"
            >
              🦷🩸
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Recruiter Contact Modal (Guaranteed not to trap recruiters!) */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md p-6 rounded-2xl border-2 border-green-400 bg-[#0d1117] text-white shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(57, 255, 20, 0.3)' }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h3 className="font-display font-bold text-lg text-green-400">
                      Recruiter Safety Zone
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      You survived the Dark Souls Mimic!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="text-gray-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Thanks for checking out my work. For genuine project inquiries, full-stack software roles, or developer collaborations, reach me directly:
                </p>

                {/* Email Box */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-400 font-mono block">PRIMARY EMAIL</span>
                    <span className="font-mono text-sm text-green-300 truncate block">
                      arvykrane@gmail.com
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30 shrink-0 cursor-pointer"
                  >
                    {copied ? 'Copied! ✓' : 'Copy'}
                  </button>
                </div>

                {/* Quick Action Links */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="mailto:arvykrane@gmail.com?subject=Job%20Opportunity%20%2F%20Collaboration%20for%20Arvy"
                    className="py-2.5 px-3 rounded-xl bg-green-500 text-black font-bold font-mono text-xs text-center hover:bg-green-400 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>✉️</span>
                    <span>Send Email</span>
                  </a>
                  <a
                    href="https://github.com/ArvyKrane"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white/10 text-white font-bold font-mono text-xs text-center hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-1.5"
                  >
                    <span>🐙</span>
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="text-xs font-mono text-gray-400 hover:text-white cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
