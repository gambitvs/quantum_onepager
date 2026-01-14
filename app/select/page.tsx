"use client";

import { motion } from "framer-motion";

/**
 * VARIATION C: THE ANTI-PITCH (Maximum Klaff)
 * Target: Ultra-sophisticated allocators who've seen everything
 *
 * Klaff Principles Applied:
 * - Pessimism: Acknowledge risks upfront (builds trust)
 * - Plain Vanilla: Make it feel familiar, safe
 * - Status Alignment: Peer-level, not seeking validation
 * - Real Scarcity: Not manufactured FOMO
 * - Inception: Let them reach the conclusion
 * - Frame Control: We're evaluating fit, not pitching
 */

export default function SelectPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ============================================
          HERO - Understated
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
        <p className="font-data text-[0.8125rem] md:text-[0.875rem] text-white/40 tracking-wide max-w-xl">
          Financial AI research
        </p>
      </motion.section>

      {/* ============================================
          FRAME - This may not be for you
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">A Note</p>

        <div className="max-w-2xl">
          <p className="font-display text-xl md:text-2xl mb-6 leading-relaxed">
            This probably isn't the right fit for most allocators.
          </p>

          <div className="space-y-4">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              We're not a fund. There's no track record to analyze, no Sharpe
              ratio to compare. We're a research organization attempting
              something that may take years to prove out — or may not work at
              all.
            </p>

            <p className="font-data text-sm text-white/50 leading-relaxed">
              If you need quarterly updates, defined milestones, and conventional
              metrics, we're not structured for that. We're built for people who
              understand how fundamental research works.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          THE PROBLEM - Honest framing
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">The Problem</p>

        <div className="max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl mb-8 leading-tight">
            General intelligence for financial markets doesn't exist.
          </h2>

          <div className="space-y-6">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              The best quant funds deploy thousands of narrow, siloed models.
              Impressive engineering. But every algorithm requires human
              oversight, constant re-tuning, and breaks under regime change.
            </p>

            <p className="font-data text-sm text-white/50 leading-relaxed">
              The best AI labs have the talent but not the focus. DeepMind's
              internal trading project showed early promise before being
              shelved. Finance wasn't the priority.
            </p>

            <p className="font-data text-sm text-white/50 leading-relaxed">
              We think the architectures that emerged in the past three years —
              large-scale transformers, reinforcement learning from human
              feedback, multi-modal fusion — can be applied to this problem in
              ways that haven't been tried. We might be wrong.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT WE'RE BUILDING - Technical but accessible
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Research Focus</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <div className="border-l border-white/10 pl-6">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              <span className="text-white/80">Multi-modal reasoning:</span>{" "}
              Systems that process market data and natural language in unified
              inference passes. An agent that reads a Fed transcript and adjusts
              positioning without human-built rules.
            </p>
          </div>

          <div className="border-l border-white/10 pl-6">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              <span className="text-white/80">Simulated training:</span> RL
              agents that learn via self-play in synthetic market environments.
              Adversarial conditions, regime shifts, liquidity shocks. Robust
              strategies, not overfitted backtests.
            </p>
          </div>

          <div className="border-l border-white/10 pl-6">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              <span className="text-white/80">Continuous adaptation:</span>{" "}
              Online learning with automatic drift detection. The system knows
              when its edge is decaying and retrains without manual
              intervention.
            </p>
          </div>

          <div className="border-l border-white/10 pl-6">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              <span className="text-white/80">Explainable outputs:</span>{" "}
              Natural language reasoning traces. Every decision can be audited.
              Not a black box.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY IT MIGHT NOT WORK - Klaff pessimism
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626] bg-[#0a0a0a]">
        <p className="stat-label text-white/40 mb-8">Risks</p>

        <div className="max-w-2xl">
          <h2 className="font-display text-xl md:text-2xl mb-6">
            Ways this could fail
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <span className="font-data text-sm text-[#D0FF14]">01</span>
              <p className="font-data text-sm text-white/50 leading-relaxed">
                The problem might be harder than we think. Markets are
                adversarial, reflexive, and constantly adapting. What works today
                attracts capital until the edge disappears.
              </p>
            </div>

            <div className="flex gap-4">
              <span className="font-data text-sm text-[#D0FF14]">02</span>
              <p className="font-data text-sm text-white/50 leading-relaxed">
                A well-funded competitor could move faster. If Google or a
                sovereign wealth fund decides this is a priority, they can
                outspend us on talent and compute.
              </p>
            </div>

            <div className="flex gap-4">
              <span className="font-data text-sm text-[#D0FF14]">03</span>
              <p className="font-data text-sm text-white/50 leading-relaxed">
                Research timelines are uncertain. We have milestones, not
                guarantees. The path from prototype to production could take
                longer than projected.
              </p>
            </div>
          </div>

          <p className="font-data text-sm text-white/60">
            We're building anyway. The upside if it works is substantial.
          </p>
        </div>
      </section>

      {/* ============================================
          TEAM - Minimal, confident
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Founders</p>

        <div className="flex flex-wrap gap-x-12 gap-y-4 mb-6">
          <p className="font-display text-2xl md:text-3xl">Michael Gonzales</p>
          <p className="font-display text-2xl md:text-3xl">Shawn Henry</p>
          <p className="font-display text-2xl md:text-3xl">Zan Shaikh</p>
        </div>

        <p className="font-data text-sm text-white/40 max-w-md">
          Three founders. Aligned incentives. Full commitment to this problem.
        </p>
      </section>

      {/* ============================================
          FIT - Selecting partners
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Fit</p>

        <div className="max-w-2xl">
          <p className="font-display text-xl md:text-2xl mb-6">
            We're looking for a specific type of partner.
          </p>

          <div className="space-y-4 mb-8">
            <p className="font-data text-sm text-white/50 leading-relaxed">
              Someone who has backed fundamental research before and understands
              the timeline. Who won't need hand-holding on technical details.
              Who sees the asymmetry in the opportunity and can hold a position
              through uncertainty.
            </p>

            <p className="font-data text-sm text-white/50 leading-relaxed">
              If that's not you, we'd rather know now. We're optimizing for
              alignment, not capital raised.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA - Low pressure
          ============================================ */}
      <section className="px-8 md:px-16 py-16">
        <p className="font-display text-xl md:text-2xl mb-4">
          If this resonates
        </p>

        <p className="font-data text-sm text-white/50 mb-6 max-w-md">
          We can share technical materials and have a conversation about fit.
        </p>

        <a href="mailto:partners@quantumcapital.ai" className="cta-button">
          <span>Start a Conversation</span>
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
