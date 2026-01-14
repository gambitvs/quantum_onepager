"use client";

import { motion } from "framer-motion";

/**
 * VARIATION B: THE RESEARCH LAB
 * Target: Tech billionaires (founders, VCs who backed AI companies)
 *
 * Approach:
 * - Minimal copy, maximum authority
 * - Let the opportunity speak for itself
 * - Research lab positioning (like early OpenAI/DeepMind)
 * - No hype, no market size stats
 * - Focus on the hard problem and the team attacking it
 */

export default function LabPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ============================================
          HERO - Sparse, confident
          ============================================ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="px-8 md:px-16 pt-20 pb-16 border-b border-[#262626] min-h-[50vh] flex flex-col justify-end"
      >
        <h1 className="font-display text-[4rem] md:text-[6rem] lg:text-[8rem] tracking-[-0.04em] leading-[0.85] mb-4">
          Quantum
        </h1>
        <p className="font-data text-[0.75rem] md:text-[0.8125rem] text-white/40 tracking-[0.2em] uppercase">
          AI Research Lab
        </p>
      </motion.section>

      {/* ============================================
          THE PROBLEM - One sentence
          ============================================ */}
      <section className="px-8 md:px-16 py-16 border-b border-[#262626]">
        <p className="font-display text-2xl md:text-3xl lg:text-4xl max-w-3xl leading-tight">
          Financial markets are the hardest adversarial environment for AI.
          <span className="text-white/30"> No one has solved it.</span>
        </p>
      </section>

      {/* ============================================
          THE RESEARCH - Clean, technical
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-12">Research Areas</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="font-display text-lg mb-3">Multi-Modal Reasoning</p>
            <p className="font-data text-xs text-white/40 leading-relaxed">
              Unified architectures processing language and numeric data in
              single inference passes.
            </p>
          </div>

          <div>
            <p className="font-display text-lg mb-3">Market Simulation</p>
            <p className="font-data text-xs text-white/40 leading-relaxed">
              RL agents trained via self-play in adversarial order book
              environments.
            </p>
          </div>

          <div>
            <p className="font-display text-lg mb-3">Continuous Learning</p>
            <p className="font-data text-xs text-white/40 leading-relaxed">
              Online adaptation with drift detection. No manual retraining
              cycles.
            </p>
          </div>

          <div>
            <p className="font-display text-lg mb-3">Explainable Decisions</p>
            <p className="font-data text-xs text-white/40 leading-relaxed">
              Natural language reasoning traces for every position.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          THE CONTEXT - Why this matters
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Context</p>

        <div className="max-w-2xl space-y-6">
          <p className="font-data text-sm text-white/50 leading-relaxed">
            DeepMind built game-playing AI that defeated world champions.
            Protein folding AI that solved a 50-year biology problem. They
            attempted trading AI internally. It quietly disappeared.
          </p>

          <p className="font-data text-sm text-white/50 leading-relaxed">
            The major quant funds — Renaissance, Citadel, Two Sigma — employ
            thousands of PhDs building narrow, siloed models. Impressive
            engineering. Not general intelligence.
          </p>

          <p className="font-data text-sm text-white/50 leading-relaxed">
            The architecture breakthroughs of the past three years (transformers,
            RLHF, multi-modal fusion) haven't been seriously applied to this
            problem. We're doing that.
          </p>
        </div>
      </section>

      {/* ============================================
          PRINCIPLES - How we work
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626] bg-[#0a0a0a]">
        <p className="stat-label text-white/40 mb-8">Principles</p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
          <div>
            <p className="font-display text-lg mb-2">Research First</p>
            <p className="font-data text-xs text-white/40 leading-relaxed">
              We're not a hedge fund layering AI onto existing strategies. We're
              a research lab building new capabilities.
            </p>
          </div>

          <div>
            <p className="font-display text-lg mb-2">Long Horizon</p>
            <p className="font-data text-xs text-white/40 leading-relaxed">
              Fundamental research takes time. We're structured for multi-year
              work, not quarterly P&L pressure.
            </p>
          </div>

          <div>
            <p className="font-display text-lg mb-2">Small Team</p>
            <p className="font-data text-xs text-white/40 leading-relaxed">
              Dense talent over headcount. Every person ships research. No
              bureaucracy.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          TEAM - Names only
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Founders</p>

        <div className="space-y-2">
          <p className="font-display text-2xl md:text-3xl">Michael Gonzales</p>
          <p className="font-display text-2xl md:text-3xl">Shawn Henry</p>
          <p className="font-display text-2xl md:text-3xl">Zan Shaikh</p>
        </div>
      </section>

      {/* ============================================
          CTA - Minimal
          ============================================ */}
      <section className="px-8 md:px-16 py-16">
        <a href="mailto:research@quantumcapital.ai" className="cta-button">
          <span>Research Materials</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-8 border-t border-[#262626]">
        <p className="stat-label text-white/20">© 2026 Quantum Capital</p>
      </footer>
    </main>
  );
}
