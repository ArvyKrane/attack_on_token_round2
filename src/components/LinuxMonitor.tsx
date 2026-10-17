import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playDegauss, unlockAudio } from '../lib/sound';

interface LinuxMonitorProps {
  children: React.ReactNode;
  activeTab: 'chaos' | 'clean';
  onTabChange: (tab: 'chaos' | 'clean') => void;
  aura: number;
  auraColor: string;
  muted: boolean;
  onToggleMute: () => void;
  bypassNotice: string | null;
}

export default function LinuxMonitor({
  children,
  activeTab,
  onTabChange,
  aura,
  auraColor,
  muted,
  onToggleMute,
  bypassNotice,
}: LinuxMonitorProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const [degaussing, setDegaussing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDegauss = () => {
    unlockAudio();
    playDegauss();
    setDegaussing(true);
    setTimeout(() => setDegaussing(false), 900);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#030305',
        backgroundImage: `
          radial-gradient(ellipse 90% 70% at 50% 20%, rgba(57, 255, 20, 0.05) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 80% 90%, rgba(255, 20, 147, 0.05) 0%, transparent 60%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px 40px 16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Physical Monitor Outer Housing */}
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          backgroundColor: '#111218',
          borderRadius: '24px',
          padding: '16px',
          boxShadow: `
            0 25px 60px -15px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 2px 4px rgba(255, 255, 255, 0.15)
          `,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Monitor Top Bezel Details */}
        <div
          style={{
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
          }}
        >
          {/* Subtle Webcam sensor */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#0a0a0f',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </div>

        {/* The Display Screen Glass Enclosure */}
        <div
          className={degaussing ? 'shake' : ''}
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#050508',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '2px solid #1f2029',
            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Optional CRT Scanlines Layer */}
          {scanlinesActive && <div className="scanlines crt-flicker" />}
          <div className="grain-overlay" />

          {/* CRT Curved Screen Vignette & Glare */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 998,
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
              borderRadius: '14px',
            }}
          />

          {/* Linux Desktop Top Bar (Gnome / Arch Style) */}
          <div
            style={{
              height: '38px',
              backgroundColor: 'rgba(10, 11, 16, 0.94)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              fontSize: '0.8rem',
              color: '#d1d5db',
              fontFamily: 'Inter, system-ui, sans-serif',
              userSelect: 'none',
              zIndex: 999,
              position: 'relative',
            }}
          >
            {/* Left: Linux Distro & Apps */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 700,
                  color: '#39ff14',
                }}
              >
                <span>🐧</span> Arch Linux
              </span>

              <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>

              {/* Workspaces / 2-Page Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => onTabChange('chaos')}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid ' + (activeTab === 'chaos' ? '#ff1493' : 'rgba(255,255,255,0.1)'),
                    background: activeTab === 'chaos' ? 'rgba(255, 20, 147, 0.2)' : 'transparent',
                    color: activeTab === 'chaos' ? '#ff1493' : '#9ca3af',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  [1] Ragebait OS
                </button>
                <button
                  onClick={() => onTabChange('clean')}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid ' + (activeTab === 'clean' ? '#39ff14' : 'rgba(255,255,255,0.1)'),
                    background: activeTab === 'clean' ? 'rgba(57, 255, 20, 0.2)' : 'transparent',
                    color: activeTab === 'clean' ? '#39ff14' : '#9ca3af',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  [2] Clean Portfolio
                </button>
              </div>
            </div>

            {/* Center: Window Info */}
            <div
              className="font-pixel"
              style={{
                fontSize: '0.62rem',
                color: 'rgba(245, 245, 245, 0.6)',
                letterSpacing: '1px',
              }}
            >
              arvy@archlinux: ~/portfolio (zsh)
            </div>

            {/* Right: Left-Ctrl Shortcut Badge + Telemetry + Clock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Left Ctrl Bypass Hint */}
              <div
                style={{
                  background: 'rgba(57, 255, 20, 0.08)',
                  border: '1px solid rgba(57, 255, 20, 0.25)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  color: '#39ff14',
                }}
                title="Press Left Control on your keyboard to instantly dismiss any prank/error overlay!"
              >
                ⌨️ <strong style={{ color: '#fff' }}>Left-Ctrl</strong>: Bypass
              </div>

              {/* Aura Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="font-pixel" style={{ fontSize: '0.6rem', color: auraColor }}>AURA:</span>
                <span className="font-pixel" style={{ fontSize: '0.6rem', color: auraColor }}>{aura}%</span>
              </div>

              {/* Mute icon */}
              <button
                onClick={onToggleMute}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  padding: 0,
                }}
                title={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? '🔇' : '🔊'}
              </button>

              {/* Live Clock */}
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#9ca3af' }}>
                {currentTime}
              </span>
            </div>
          </div>

          {/* Left Ctrl Bypass Notification Toast */}
          <AnimatePresence>
            {bypassNotice && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  position: 'absolute',
                  top: '46px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 9999,
                  background: 'rgba(10, 15, 20, 0.95)',
                  border: '1px solid #39ff14',
                  boxShadow: '0 0 20px rgba(57, 255, 20, 0.4)',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  color: '#39ff14',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span>🛡️</span>
                <span>{bypassNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Linux Terminal / Window Chrome Bar */}
          <div
            style={{
              height: '32px',
              backgroundColor: 'rgba(20, 22, 30, 0.9)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              userSelect: 'none',
            }}
          >
            {/* Window controls (red/yellow/green) */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            </div>

            <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'monospace' }}>
              Neovim / ZSH · UTF-8 · 100% Aura
            </span>

            <div style={{ width: '40px' }} />
          </div>

          {/* Actual Website Inner Screen Area */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '740px',
              maxHeight: '82vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: '#07080d',
            }}
          >
            {children}
          </div>
        </div>

        {/* Physical Monitor Bottom Chin Controls */}
        <div
          style={{
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            marginTop: '8px',
            userSelect: 'none',
          }}
        >
          {/* Monitor Model Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="font-pixel"
              style={{
                fontSize: '0.65rem',
                color: 'rgba(255, 255, 255, 0.35)',
                letterSpacing: '1.5px',
              }}
            >
              ARCH-STATION 3000 // CRT MULTISCAN
            </span>
          </div>

          {/* Physical Monitor Knobs & Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Degauss Button */}
            <button
              onClick={handleDegauss}
              style={{
                background: '#1b1d26',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#9ca3af',
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              title="Trigger CRT Degauss"
            >
              ⚡ DEGAUSS
            </button>

            {/* Scanlines Toggle */}
            <button
              onClick={() => setScanlinesActive(!scanlinesActive)}
              style={{
                background: scanlinesActive ? 'rgba(57, 255, 20, 0.15)' : '#1b1d26',
                border: '1px solid ' + (scanlinesActive ? '#39ff14' : 'rgba(255,255,255,0.1)'),
                color: scanlinesActive ? '#39ff14' : '#9ca3af',
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              CRT SCANLINES: {scanlinesActive ? 'ON' : 'OFF'}
            </button>

            {/* Glowing Power LED */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#39ff14',
                  boxShadow: '0 0 8px #39ff14',
                }}
              />
              <span style={{ fontSize: '0.6rem', color: '#6b7280', fontFamily: 'monospace' }}>POWER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monitor Desktop Stand Base */}
      <div
        style={{
          width: '280px',
          height: '16px',
          backgroundColor: '#161720',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderTop: 'none',
        }}
      />
      <div
        style={{
          width: '360px',
          height: '8px',
          backgroundColor: '#0e0f14',
          borderRadius: '4px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.7)',
        }}
      />
    </div>
  );
}
