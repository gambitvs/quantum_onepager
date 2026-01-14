"use client";

import { motion } from "framer-motion";

/**
 * VARIATION A: THE INSIDER
 * Target: Finance-native billionaires (hedge fund, PE, family office)
 *
 * Approach:
 * - Lead with technical insight only insiders would know
 * - Remove all consumer brand references
 * - Skeptical, honest tone
 * - Acknowledge what's hard
 * - Flash roll: demonstrate expertise without bragging
 */

export default function InsiderPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ============================================
          HERO - Lead with insider insight
          ============================================ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="px-8 md:px-16 pt-16 pb-12 border-b border-[#262626]"
      >
        <h1 className="font-display text-[3.5rem] md:text-[5rem] lg:text-[6rem] tracking-[-0.04em] leading-[0.9] mb-6">
          Quantum Capital
        </h1>
        <p className="font-data text-[0.8125rem] md:text-[0.875rem] text-white/60 tracking-wide max-w-xl">
          AI research lab for financial markets
        </p>
      </motion.section>

      {/* ============================================
          THE PROBLEM - Insider knowledge
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">What We Know</p>

        <div className="max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-8 leading-tight">
            The quant arms race has a ceiling.
          </h2>

          <div className="space-y-6 mb-8">
            <p className="font-data text-sm text-white/60 leading-relaxed">
              Renaissance, Citadel, Two Sigma — they've optimized the extractable
              alpha from narrow, task-specific models. Hundreds of PhDs building
              thousands of siloed algorithms. Each one fragile to regime change.
              Each one requires constant human re-tuning.
            </p>

            <p className="font-data text-sm text-white/60 leading-relaxed">
              DeepMind attempted a trading system internally. It showed promise
              in simulation, then quietly disappeared. Market complexity broke
              their approach. The problem wasn't compute or data — it was
              architecture.
            </p>

            <p className="font-data text-sm text-white/60 leading-relaxed">
              The gap isn't more signals or faster execution. It's integration.
              No system today can read a Fed statement, parse order flow, and
              adjust positioning in a unified reasoning loop.
            </p>
          </div>

          <p className="font-data text-sm text-[#D0FF14]">
            That's the research problem we're solving.
          </p>
        </div>
      </section>

      {/* ============================================
          THE APPROACH - Technical substance
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Research Focus</p>

        <div className="grid md:grid-cols-2 gap-12 mb-8">
          <div className="border-l-2 border-white/20 pl-6">
            <h3 className="font-display text-xl mb-4">
              Multi-Modal Reasoning
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Hybrid architectures that process numeric time-series and natural
              language in a single inference pass. The agent reads earnings
              transcripts and tick data simultaneously — no human-built feature
              engineering.
            </p>
          </div>

          <div className="border-l-2 border-white/20 pl-6">
            <h3 className="font-display text-xl mb-4">
              Reinforcement Learning in Market Simulators
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Agents trained via self-play in simulated order books. Stochastic
              regime shifts, adversarial market makers, liquidity shocks. The
              model learns robust strategies, not curve-fitted backtests.
            </p>
          </div>

          <div className="border-l-2 border-white/20 pl-6">
            <h3 className="font-display text-xl mb-4">
              Continuous Adaptation
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Online learning with drift detection. The system identifies when
              its edge decays and autonomously retrains on recent data. No
              quarterly model refresh cycles.
            </p>
          </div>

          <div className="border-l-2 border-white/20 pl-6">
            <h3 className="font-display text-xl mb-4">
              Explainable Decisions
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Natural language reasoning traces. The agent explains why it's
              taking a position, what signals drove the decision. Not a black
              box — auditable logic for risk management.
            </p>
          </div>
        </div>

        <p className="font-data text-xs text-white/30 max-w-xl">
          ICLR 2025: LLM-integrated RL trading agents significantly outperformed
          conventional models on real equity data. We're building on this.
        </p>
      </section>

      {/* ============================================
          WHY NOW - Honest assessment
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Timing</p>

        <h2 className="font-display text-2xl md:text-3xl mb-8 max-w-2xl">
          The toolkit just arrived. The window is narrow.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-data text-sm text-white/60 leading-relaxed">
              <span className="text-[#D0FF14]">Compute access:</span> Mid-sized
              teams can now train models that required nation-state budgets three
              years ago.
            </p>
          </div>

          <div>
            <p className="font-data text-sm text-white/60 leading-relaxed">
              <span className="text-[#D0FF14]">Architecture breakthroughs:</span>{" "}
              Transformers, RLHF, and multi-modal fusion have matured from
              research papers to deployable systems.
            </p>
          </div>

          <div>
            <p className="font-data text-sm text-white/60 leading-relaxed">
              <span className="text-[#D0FF14]">First-mover dynamics:</span> The
              major quant funds are optimizing existing approaches. The AI labs
              aren't focused on finance. The gap exists.
            </p>
          </div>
        </div>

        <p className="font-data text-sm text-white/40">
          This window closes when either a top fund or a major AI lab commits
          serious resources. We're moving now.
        </p>
      </section>

      {/* ============================================
          WHAT'S HARD - Intellectual honesty
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626] bg-[#0a0a0a]">
        <p className="stat-label text-white/40 mb-8">What's Hard</p>

        <div className="max-w-2xl">
          <p className="font-display text-xl md:text-2xl mb-6 leading-tight text-white/60">
            We're not pretending this is easy.
          </p>

          <div className="space-y-4 mb-8">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              Markets are adversarial. Every edge attracts capital until it
              disappears. A system that works in 2026 may not work in 2028 without
              fundamental adaptation capability.
            </p>

            <p className="font-data text-sm text-white/50 leading-relaxed">
              The research timeline is uncertain. We're targeting milestones, not
              guaranteeing them. This is R&D, not a fund with projected returns.
            </p>

            <p className="font-data text-sm text-white/50 leading-relaxed">
              The best outcome requires the best people. We're competing for
              talent with DeepMind, OpenAI, and Renaissance. That's expensive.
            </p>
          </div>

          <p className="font-data text-sm text-[#D0FF14]">
            We're building for the partners who understand this.
          </p>
        </div>
      </section>

      {/* ============================================
          TEAM - Credibility without bragging
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Team</p>

        <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
          <p className="font-display text-2xl md:text-3xl">Michael Gonzales</p>
          <p className="font-display text-2xl md:text-3xl">Shawn Henry</p>
          <p className="font-display text-2xl md:text-3xl">Zan Shaikh</p>
        </div>

        <p className="font-data text-sm text-white/50 leading-relaxed max-w-xl mb-6">
          Founding partners with a track record of building and exiting ventures
          in competitive markets. Now focused entirely on this problem.
        </p>

        <p className="text-sm text-white/30">
          Advisory network from quantitative hedge funds and AI research labs.
        </p>
      </section>

      {/* ============================================
          CTA - Direct, no games
          ============================================ */}
      <section className="px-8 md:px-16 py-16">
        <p className="font-display text-2xl md:text-3xl mb-4">
          Request Materials
        </p>

        <p className="font-data text-sm text-white/50 mb-6 max-w-md">
          Technical whitepaper. Research roadmap. Partnership structure.
        </p>

        <a href="mailto:partners@quantumcapital.ai" className="cta-button">
          <span>Get in Touch</span>
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
