import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../store/useChaos';

const DAVE_REPLIES: string[] = [
  'skill issue, tbh',
  'have you tried touching grass?',
  'git gud or go home',
  'bro this ain\'t a help desk, this is a vibe check',
  'ratio',
  'L + bozo + you asked Dave',
  'bruh just respawn',
  'I don\'t speak NPC',
  'dave.exe has no solution for that',
  'try pressing Alt+F4 irl',
  'certified mid behavior detected',
  'the answer is skill issue, the question doesn\'t matter',
  'in Minecraft terms: you just got smelted',
  'your aura dropped just from asking that',
  'not my problem tbh',
  'bro i\'m a bot and even I feel secondhand embarrassment',
  'you\'re literally the floor of Valorant ranked',
  '...',
  'nah.',
  'that\'s a you problem',
];

function getDaveReply(): string {
  return DAVE_REPLIES[Math.floor(Math.random() * DAVE_REPLIES.length)];
}

interface Message {
  from: 'user' | 'dave';
  text: string;
}

export default function ChatDave() {
  const { chatOpen, toggleChat, surrendered } = useChaos();
  const [messages, setMessages] = useState<Message[]>([
    { from: 'dave', text: 'sup. i\'m Dave. i won\'t help you.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(m => [...m, { from: 'user', text: userMsg }]);

    // Typing indicator -- lasts too long
    setTyping(true);
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: 'dave', text: getDaveReply() }]);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, delay);
  };

  if (surrendered) return null;

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-4 z-[var(--z-float)] w-14 h-14 rounded-full font-pixel flex items-center justify-center shadow-lg"
        style={{
          zIndex: 10,
          background: 'var(--color-pink)',
          boxShadow: 'var(--glow-pink)',
          fontSize: 24,
          cursor: 'pointer',
        }}
        title="Chat with Dave"
      >
        {'\uD83D\uDCAC'}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-44 right-4 glass-card flex flex-col"
            style={{
              zIndex: 200,
              width: 300,
              maxWidth: '92vw',
              maxHeight: 420,
              border: '1px solid var(--color-pink)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">&#x1F916;</span>
                <div>
                  <p className="font-display font-bold text-sm" style={{ color: 'var(--color-white)' }}>
                    Dave
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-acid)' }}>
                    online (unhelpfully)
                  </p>
                </div>
              </div>
              <button onClick={toggleChat} style={{ color: 'var(--color-muted)', fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }}>x</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm px-3 py-2 rounded-xl max-w-[85%] ${m.from === 'user' ? 'self-end' : 'self-start'}`}
                  style={{
                    background: m.from === 'user'
                      ? 'var(--color-acid)'
                      : 'rgba(255,255,255,0.07)',
                    color: m.from === 'user' ? '#000' : 'var(--color-white)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div
                  className="self-start text-sm px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--color-muted)' }}
                >
                  Dave is typing<span className="animate-pulse">...</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="flex gap-2 p-3 border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask Dave anything..."
                className="flex-1 bg-transparent text-sm rounded px-3 py-2 outline-none"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-white)',
                  fontSize: 'var(--text-sm)',
                }}
              />
              <button
                onClick={send}
                className="px-3 py-2 rounded font-bold text-black"
                style={{ background: 'var(--color-acid)', fontSize: 'var(--text-sm)', cursor: 'pointer' }}
              >
                &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
