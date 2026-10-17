import { motion } from 'framer-motion';

interface CleanProfileProps {
  onSwitchToChaos?: () => void;
}

const PROJECTS = [
  {
    title: 'AuraPulse — Realtime Performance Monitor',
    desc: 'High-throughput metrics dashboard streaming telemetry across microservices with sub-50ms latency using WebSockets & WebGL charts.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Go', 'Redis'],
    stars: '1.4k',
    link: 'https://github.com/ArvyKrane',
  },
  {
    title: 'HyperRender — AI Image Enhancement Engine',
    desc: 'Deep learning pipeline optimizing raster assets into vector layers and neural super-resolution models deployed via WebAssembly.',
    tech: ['Python', 'FastAPI', 'WASM', 'PyTorch', 'Next.js'],
    stars: '890',
    link: 'https://github.com/ArvyKrane',
  },
  {
    title: 'QuantumPay — Decentralized Microtransactions',
    desc: 'Low-fee peer-to-peer settlement infrastructure with cryptographic signature verification and biometric auth for web platforms.',
    tech: ['TypeScript', 'Solidity', 'Ethers.js', 'PostgreSQL'],
    stars: '2.1k',
    link: 'https://github.com/ArvyKrane',
  },
  {
    title: 'NeonCanvas — Creative WebGL Playground',
    desc: 'Interactive shader generation and generative audio-visual synthesizer running purely in the browser with zero external plugins.',
    tech: ['WebGL', 'GLSL', 'Web Audio API', 'React 19'],
    stars: '640',
    link: 'https://github.com/ArvyKrane',
  },
];

const SKILL_CATEGORIES = [
  {
    name: 'Frontend Architecture',
    skills: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'WebGL'],
  },
  {
    name: 'Backend & Cloud',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
  },
  {
    name: 'Tooling & Quality',
    skills: ['Vite', 'Git', 'CI/CD Pipelines', 'REST & GraphQL', 'Web Audio API'],
  },
];

export default function CleanProfile({ onSwitchToChaos }: CleanProfileProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '1040px',
        margin: '0 auto',
        padding: '100px 24px 60px 24px',
        color: '#f5f5f5',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Top Banner / Mode Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderRadius: '12px',
          background: 'rgba(57, 255, 20, 0.06)',
          border: '1px solid rgba(57, 255, 20, 0.25)',
          marginBottom: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>😇</span>
          <span style={{ fontSize: '0.9rem', color: '#39ff14', fontWeight: 600 }}>
            Clean Mode Activated — You survived RAGEBAIT.EXE!
          </span>
        </div>
        {onSwitchToChaos && (
          <button
            onClick={onSwitchToChaos}
            style={{
              background: '#ff1493',
              color: '#fff',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(255,20,147,0.4)',
            }}
          >
            😈 Re-enter Chaos Mode
          </button>
        )}
      </div>

      {/* Hero Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '56px',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(57,255,20,0.2), rgba(255,20,147,0.2))',
            border: '2px solid #39ff14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            marginBottom: '20px',
            boxShadow: '0 0 30px rgba(57,255,20,0.25)',
          }}
        >
          👨‍💻
        </motion.div>

        <h1
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            lineHeight: 1.15,
          }}
        >
          Arvy Krane
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: '#39ff14',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            marginBottom: '14px',
          }}
        >
          Full-Stack Software Engineer & Creative Technologist
        </p>

        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(245, 245, 245, 0.75)',
            maxWidth: '620px',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}
        >
          Crafting delightful digital experiences, rock-solid web infrastructure, and high-performance user interfaces. 
          When not coding, studying chaotic UX patterns and building meme-tier software.
        </p>

        {/* Social / Contact Links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="https://github.com/ArvyKrane"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            🐙 GitHub
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            📸 Instagram
          </a>
          <a
            href="mailto:contact@arvykrane.dev"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(57,255,20,0.12)',
              border: '1px solid rgba(57,255,20,0.4)',
              color: '#39ff14',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            ✉️ Get in Touch
          </a>
        </div>
      </div>

      {/* Skills Matrix */}
      <div style={{ marginBottom: '56px' }}>
        <h2
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.6rem',
            fontWeight: 700,
            marginBottom: '20px',
            borderLeft: '4px solid #39ff14',
            paddingLeft: '12px',
          }}
        >
          Technical Arsenal
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {SKILL_CATEGORIES.map(cat => (
            <div
              key={cat.name}
              className="glass-card"
              style={{
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#39ff14', marginBottom: '12px' }}>
                {cat.name}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map(s => (
                  <span
                    key={s}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: 'rgba(245,245,245,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div style={{ marginBottom: '60px' }}>
        <h2
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.6rem',
            fontWeight: 700,
            marginBottom: '20px',
            borderLeft: '4px solid #ff1493',
            paddingLeft: '12px',
          }}
        >
          Featured Work
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -4 }}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'border-color 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#ff1493', fontWeight: 700, letterSpacing: '1px' }}>
                    PROJECT 0{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.5)' }}>
                    ★ {p.stars}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#fff',
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(245,245,245,0.7)',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                  }}
                >
                  {p.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {p.tech.map(t => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(57, 255, 20, 0.08)',
                        color: '#39ff14',
                        border: '1px solid rgba(57, 255, 20, 0.2)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    color: '#ff1493',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  View Code & Live Demo &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'rgba(245,245,245,0.5)',
        }}
      >
        © 2026 Arvy Krane · Built with React, TypeScript & Vite · Clean Mode
      </footer>
    </motion.section>
  );
}
