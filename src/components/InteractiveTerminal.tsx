import React, { useState, useRef, useEffect } from 'react';
import { useChaos } from '../store/useChaos';
import { unlockAudio, playError, playDing, playVineBoom, playAirhorn, playCoin, speakRoast, playBiteCrunch, playDarkSoulsBell } from '../lib/sound';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'motd',
      output: 'Arch Linux Workstation v6.9-arch1 (tty1). Type "help" for commands or "matrix" for rain.',
    },
  ]);
  const { visitorName, aura, triggerEmojiRain, showRickroll, showBsod, spawnFakeError, drainAura, showDied } = useChaos();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    setInput('');
    unlockAudio();

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      return;
    }

    let out: React.ReactNode = '';

    if (lower === 'help') {
      playDing();
      out = (
        <div style={{ color: '#d1d5db' }}>
          Available shell binaries:
          <br />• <span style={{ color: '#39ff14' }}>neofetch</span> — Display kernel specs
          <br />• <span style={{ color: '#39ff14' }}>sudo &lt;cmd&gt;</span> — Execute with root privileges
          <br />• <span style={{ color: '#39ff14' }}>cat resume</span> — Inspect candidate CV
          <br />• <span style={{ color: '#39ff14' }}>matrix</span> — Initiate digital emoji rain
          <br />• <span style={{ color: '#39ff14' }}>roast</span> — Synthesize voice insult
          <br />• <span style={{ color: '#39ff14' }}>rickroll</span> — Critical vulnerability audit
          <br />• <span style={{ color: '#39ff14' }}>diagnostics</span> — Run memory leak test
          <br />• <span style={{ color: '#ff1744' }}>horror</span> — 666 Daemon invocation
          <br />• <span style={{ color: '#d4af37' }}>mimic</span> — Open suspicious dungeon chest
          <br />• <span style={{ color: '#39ff14' }}>clear</span> — Flush terminal buffer
        </div>
      );
    } else if (lower.startsWith('sudo rm -rf')) {
      playError();
      playVineBoom();
      out = (
        <span style={{ color: '#ef4444', fontWeight: 700 }}>
          [KERNEL PANIC] rm: cannot remove '/sys/firmware/aura': Permission denied by Big Sigma. Nice try, {visitorName}.
        </span>
      );
    } else if (lower.startsWith('sudo')) {
      playError();
      out = (
        <span style={{ color: '#f59e0b' }}>
          {visitorName} is not in the sudoers file. This incident will be reported to Santa Claus and the FBI.
        </span>
      );
    } else if (lower === 'neofetch') {
      playCoin();
      out = (
        <div style={{ color: '#39ff14', whiteSpace: 'pre' }}>
{`       /\\        OS: Arch Linux x86_64
      /  \\       Host: ThinkPad X1
     /\\   \\      Uptime: 420 hrs, 69 mins
    /   ,, \\     Aura: ${aura}%
   /   |  | -\\   Active User: ${visitorName}
  /_-''    ''-_\\ Shell: zsh 5.9`}
        </div>
      );
    } else if (lower === 'cat resume' || lower === 'cat cv') {
      playDing();
      out = (
        <span style={{ color: '#39ff14' }}>
          Opening high-resolution candidate portfolio dossier... (Or click "Download Verified CV" on desktop).
        </span>
      );
      setTimeout(() => showRickroll(), 1200);
    } else if (lower === 'matrix' || lower === 'rain') {
      playAirhorn();
      triggerEmojiRain();
      out = <span style={{ color: '#39ff14' }}>Injecting digital rain sequence into display buffer...</span>;
    } else if (lower === 'roast') {
      playVineBoom();
      speakRoast(`${visitorName}, your code looks like it was written by an unplugged toaster.`);
      out = <span style={{ color: '#ff1493' }}>Synthesizing audio voice critique for {visitorName}...</span>;
    } else if (lower === 'rickroll') {
      showRickroll();
      out = <span style={{ color: '#facc15' }}>Auditing Never Gonna Give You Up protocol...</span>;
    } else if (lower === 'diagnostics' || lower === 'crash') {
      spawnFakeError();
      out = <span style={{ color: '#ef4444' }}>Spawning kernel memory stack trace dialog...</span>;
    } else if (lower === 'bsod') {
      showBsod();
      out = <span style={{ color: '#0055ff' }}>Executing hardware level fault...</span>;
    } else if (lower === 'horror' || lower === '666' || lower === 'curse' || lower === 'blood') {
      playBiteCrunch();
      playDarkSoulsBell();
      drainAura(25);
      out = (
        <div style={{ color: '#ff1744', fontFamily: 'monospace', lineHeight: 1.35, whiteSpace: 'pre-wrap' }}>
{`☠️ [FATAL ENTITY INVOCATION: 0x666]
   .---.
  /     \\     THE SHADOW PROCESS IS UNLEASHED.
 | () () |    Aura corrupted (-25).
  \\  _  /     SOMETHING BREATHES BEHIND THE MONITOR.
   \`---\``}
        </div>
      );
    } else if (lower === 'mimic' || lower === 'chest') {
      playBiteCrunch();
      playDarkSoulsBell();
      drainAura(100);
      showDied();
      out = <span style={{ color: '#8B0000', fontWeight: 'bold' }}>THE CHEST BIT YOUR WHOLE HAND OFF. YOU DIED.</span>;
    } else {
      playError();
      out = (
        <span style={{ color: '#9ca3af' }}>
          zsh: command not found: {cmd}. Type "help" to view allowed utilities.
        </span>
      );
    }

    setHistory(prev => [...prev, { command: cmd, output: out }]);
  };

  return (
    <div
      className="glass-card"
      style={{
        width: '100%',
        backgroundColor: 'rgba(8, 10, 16, 0.92)',
        border: '1px solid rgba(57, 255, 20, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Terminal Titlebar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          backgroundColor: 'rgba(20, 24, 34, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600 }}>
            terminal — zsh — 80x24
          </span>
        </div>
        <span style={{ fontSize: '0.7rem', color: '#39ff14', fontFamily: 'monospace' }}>
          user: {visitorName}
        </span>
      </div>

      {/* Terminal History Output */}
      <div
        style={{
          padding: '16px',
          maxHeight: '260px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.82rem',
          lineHeight: 1.5,
          color: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {history.map((h, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#39ff14' }}>arvy@arch:~$</span>
              <span style={{ color: '#fff', fontWeight: 700 }}>{h.command}</span>
            </div>
            <div style={{ marginTop: '2px', paddingLeft: '12px' }}>{h.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />

        {/* Input Line */}
        <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <span style={{ color: '#39ff14' }}>arvy@arch:~$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type "help", "neofetch", "matrix", "sudo rm -rf /"...'
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              color: '#39ff14',
            }}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
