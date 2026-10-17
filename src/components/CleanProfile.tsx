import { motion } from 'framer-motion';

const PROJECTS = [
  {
    name: '{{PROJECT_1}}',
    desc: 'A full-stack web application with real-time features.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    name: '{{PROJECT_2}}',
    desc: 'Machine learning model for image classification.',
    tech: ['Python', 'TensorFlow', 'FastAPI'],
    link: '#',
  },
  {
    name: '{{PROJECT_3}}',
    desc: 'Mobile-first e-commerce platform with Stripe integration.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    link: '#',
  },
];

export default function CleanProfile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="min-h-screen flex flex-col items-center justify-start py-24 px-6 gap-16"
      style={{ paddingTop: '5rem' }}
    >
      {/* Hero */}
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl"
          style={{ background: 'var(--glass-bg)', border: '2px solid var(--color-acid)' }}
        >
          👤
        </motion.div>

        <h1
          className="font-display font-bold mb-3"
          style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-white)', lineHeight: 'var(--leading-tight)' }}
        >
          {'{{NAME}}'}
        </h1>

        <p
          className="mb-6"
          style={{ fontSize: 'var(--text-lg)', color: 'var(--color-muted)', lineHeight: 'var(--leading-normal)' }}
        >
          {'{{BIO}}'}
        </p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="{{GITHUB}}"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full glass-card font-display font-semibold chroma-hover"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-white)', fontSize: 'var(--text-sm)', textDecoration: 'none' }}
          >
            🐙 GitHub
          </a>
          <a
            href="{{INSTAGRAM}}"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full glass-card font-display font-semibold chroma-hover"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-white)', fontSize: 'var(--text-sm)', textDecoration: 'none' }}
          >
            📸 Instagram
          </a>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', maxWidth: 600, height: 1, background: 'var(--color-border)' }} />

      {/* Projects */}
      <div className="w-full max-w-3xl">
        <h2
          className="font-display font-bold text-center mb-10"
          style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-white)' }}
        >
          Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={i}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -4 }}
              className="glass-card p-5 block chroma-hover"
              style={{
                border: '1px solid var(--color-border)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <h3
                className="font-display font-bold mb-2"
                style={{ fontSize: 'var(--text-base)', color: 'var(--color-white)' }}
              >
                {p.name}
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: 'var(--color-muted)', lineHeight: 'var(--leading-normal)' }}
              >
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: 'rgba(57,255,20,0.1)',
                      color: 'var(--color-acid)',
                      border: '1px solid rgba(57,255,20,0.2)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <p className="text-center text-sm" style={{ color: 'var(--color-muted)' }}>
        🏳️ You survived RAGEBAIT.EXE. Respect.
      </p>
    </motion.section>
  );
}
