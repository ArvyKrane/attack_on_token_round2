import { motion } from 'framer-motion';

interface RealResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RealResumeModal({ isOpen, onClose }: RealResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9800] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="relative w-full max-w-3xl rounded-2xl bg-[#0f1420] text-gray-100 border border-green-500/40 shadow-2xl p-6 sm:p-10 my-8"
        style={{
          boxShadow: '0 0 50px rgba(57, 255, 20, 0.25), inset 0 0 20px rgba(0,0,0,0.8)',
        }}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <span className="text-xs font-mono font-bold text-green-400 uppercase tracking-widest block">
                VERIFIED CANDIDATE DOSSIER
              </span>
              <span className="text-xs text-gray-400 font-mono">
                Official Production Resume // Arvy Krane
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-green-500 text-black hover:bg-green-400 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="space-y-6 text-left">
          {/* Header */}
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Arvy Krane
            </h1>
            <p className="text-sm sm:text-base font-semibold text-green-400 font-mono mt-1">
              Senior Full-Stack Engineer & Distributed Systems Architect
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-300 mt-2">
              <span>📧 arvykrane@gmail.com</span>
              <span>🐙 github.com/ArvyKrane</span>
              <span>📸 @arvykrane</span>
              <span>📍 San Francisco, CA / Remote</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
              Executive Summary
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              Full-Stack Software Engineer with 6+ years of experience engineering high-throughput distributed microservices, low-latency WebGL/WebGPU graphics pipelines, and resilient reactive applications. Passionate about systems performance, zero-latency state synchronization, and building developer tools that withstand chaotic production workloads.
            </p>
          </div>

          {/* Technical Arsenal */}
          <div>
            <h2 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-green-400 font-bold block">Languages & Systems:</span>
                <span className="text-gray-300">Rust, Go, TypeScript, C++, Python, SQL</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-green-400 font-bold block">Frontend & Graphics:</span>
                <span className="text-gray-300">React, Next.js, WebGL/WebGPU, Tailwind, Three.js</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-green-400 font-bold block">Distributed Infrastructure:</span>
                <span className="text-gray-300">Docker, Kubernetes, Kafka, Redis, PostgreSQL, Raft</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-green-400 font-bold block">Observability & Testing:</span>
                <span className="text-gray-300">Prometheus, Grafana, OpenTelemetry, Vitest, Playwright</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
              Professional Experience
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-sm font-bold text-white">
                    Lead Systems Architect — HyperScale Labs
                  </h3>
                  <span className="text-xs font-mono text-gray-400">2022 – Present</span>
                </div>
                <p className="text-xs text-green-300 font-mono">Realtime Telemetry & Neural Inference Platforms</p>
                <ul className="list-disc list-inside text-xs text-gray-300 mt-1.5 space-y-1 leading-relaxed">
                  <li>Architected real-time WebSocket cluster processing 120,000 requests/sec with &lt;12ms p99 latency.</li>
                  <li>Re-engineered memory allocator in Rust, slashing peak heap allocations by 44%.</li>
                  <li>Led cross-functional team of 8 engineers delivering the core neural telemetry dashboard.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-sm font-bold text-white">
                    Senior Software Engineer — Distributed Core Inc.
                  </h3>
                  <span className="text-xs font-mono text-gray-400">2020 – 2022</span>
                </div>
                <p className="text-xs text-green-300 font-mono">Consensus Engines & Cloud Storage</p>
                <ul className="list-disc list-inside text-xs text-gray-300 mt-1.5 space-y-1 leading-relaxed">
                  <li>Implemented Raft consensus algorithm in Go with leader lease elections and WAL snapshots.</li>
                  <li>Integrated zero-copy serialization buffers, boosting IOPS throughput by 2.8x.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="border-t border-white/10 pt-4 flex justify-between items-baseline flex-wrap">
            <div>
              <span className="text-xs font-bold text-white block">Bachelor of Science in Computer Science</span>
              <span className="text-xs text-gray-400 font-mono">Specialization in Distributed Systems & Graphics</span>
            </div>
            <span className="text-xs font-mono text-green-400">Graduated Magna Cum Laude</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
