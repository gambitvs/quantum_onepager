"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ============================================
          1. HERO / MASTHEAD
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
        <p className="font-data text-[0.8125rem] md:text-[0.875rem] text-white/60 tracking-wide max-w-xl mb-8">
          Fundamental AI research applied to trading and investment
        </p>
        <p className="font-display text-xl md:text-2xl text-white/40 italic">
          The next OpenAI will be built in finance.
        </p>
      </motion.section>

      {/* ============================================
          2. THE INSIGHT - Problem Statement
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">The Insight</p>

        <div className="max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-8 leading-tight">
            Current finance AI is fragmented.
            <br />
            <span className="text-white/40">
              Many savants, but no unified mind.
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border-l-2 border-white/20 pl-6">
              <p className="font-data text-sm text-white/60 leading-relaxed">
                Traditional quants build narrow, fragile models heavily reliant
                on human guidance. One algorithm for credit risk. Another for
                price prediction. Siloed intelligence that breaks under regime
                change.
              </p>
            </div>

            <div className="border-l-2 border-white/20 pl-6">
              <p className="font-data text-sm text-white/60 leading-relaxed">
                Even DeepMind attempted trading AI and fizzled out. Market
                complexity proved too hard for conventional approaches. The
                problem isn't compute or data. It's architecture.
              </p>
            </div>
          </div>

          <p className="font-data text-sm text-[#D0FF14]">
            No one has built an AI that reasons about markets holistically.
          </p>
        </div>
      </section>

      {/* ============================================
          3. THE OPPORTUNITY - Market Data
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">The Opportunity</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6 mb-12">
          <div>
            <p className="stat-label text-[#D0FF14] mb-2">Algo Trading</p>
            <p className="font-data text-2xl md:text-3xl font-semibold tracking-tight">
              $21B<span className="text-white/30">→</span>$43B
            </p>
            <p className="stat-label text-white/30 mt-1">by 2030</p>
          </div>

          <div>
            <p className="stat-label text-[#D0FF14] mb-2">AI in Finance</p>
            <p className="font-data text-2xl md:text-3xl font-semibold tracking-tight">
              $190B
            </p>
            <p className="stat-label text-white/30 mt-1">by 2030</p>
          </div>

          <div>
            <p className="stat-label text-[#D0FF14] mb-2">Algo Volume</p>
            <p className="font-data text-2xl md:text-3xl font-semibold tracking-tight">
              70%
            </p>
            <p className="stat-label text-white/30 mt-1">of trading</p>
          </div>

          <div>
            <p className="stat-label text-[#D0FF14] mb-2">Firms Using AI</p>
            <p className="font-data text-2xl md:text-3xl font-semibold tracking-tight">
              85%
            </p>
            <p className="stat-label text-white/30 mt-1">by 2025</p>
          </div>

          <div>
            <p className="stat-label text-[#D0FF14] mb-2">Polymarket</p>
            <p className="font-data text-2xl md:text-3xl font-semibold tracking-tight">
              $9B
            </p>
            <p className="stat-label text-white/30 mt-1">volume, 2025</p>
          </div>

          <div>
            <p className="stat-label text-[#D0FF14] mb-2">Target Surface</p>
            <p className="font-data text-2xl md:text-3xl font-semibold tracking-tight">
              $100T+
            </p>
            <p className="stat-label text-white/30 mt-1">global assets</p>
          </div>
        </div>

        <p className="font-display text-xl md:text-2xl text-white/50 max-w-2xl">
          The value of an AGI that captures even a fraction of global market
          inefficiencies is enormous.
        </p>
      </section>

      {/* ============================================
          4. WHY NOW - AI Inflection Point
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Why Now</p>

        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-10 max-w-2xl">
          The convergence that makes 2026 the moment.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="border-l-2 border-[#D0FF14] pl-6">
            <p className="stat-label text-[#D0FF14] mb-3">01</p>
            <h3 className="font-display text-lg mb-2">AI Leaps</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              GPT-4, BloombergGPT (50B params), breakthroughs in reinforcement
              learning have redefined what's possible.
            </p>
          </div>

          <div className="border-l-2 border-[#D0FF14] pl-6">
            <p className="stat-label text-[#D0FF14] mb-3">02</p>
            <h3 className="font-display text-lg mb-2">RL + LLMs</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              ICLR 2025: combining LLMs with RL trading agents significantly
              outperformed conventional models.
            </p>
          </div>

          <div className="border-l-2 border-[#D0FF14] pl-6">
            <p className="stat-label text-[#D0FF14] mb-3">03</p>
            <h3 className="font-display text-lg mb-2">Compute Access</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Mid-sized players can now train models that only nation-states
              could afford before.
            </p>
          </div>

          <div className="border-l-2 border-[#D0FF14] pl-6">
            <p className="stat-label text-[#D0FF14] mb-3">04</p>
            <h3 className="font-display text-lg mb-2">Data Abundance</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Decades of market data, alternative data sources, and synthetic
              simulation environments.
            </p>
          </div>

          <div className="border-l-2 border-[#D0FF14] pl-6">
            <p className="stat-label text-[#D0FF14] mb-3">05</p>
            <h3 className="font-display text-lg mb-2">White Space</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              No one has claimed "OpenAI for Finance." First mover window is
              open.
            </p>
          </div>
        </div>

        <p className="font-data text-sm text-white/40 mt-10 max-w-xl">
          The toolkit to attempt financial AGI is arriving. The question is who
          builds it.
        </p>
      </section>

      {/* ============================================
          5. THE APPROACH - Technical Differentiation
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">The Approach</p>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="border-l-2 border-[#D0FF14] pl-6">
            <h3 className="font-display text-xl md:text-2xl mb-4">
              Multi-Modal Intelligence
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Markets are influenced by numbers AND language: news, tweets,
              earnings calls, Fed statements. We train hybrid systems that fuse
              a time-series foundation model (long-context, probabilistic,
              regime-aware) with a retrieval-grounded language model that turns
              unstructured text into structured, tradeable signals.
            </p>
            <p className="font-data text-xs text-white/30">
              A trading agent that reads a Fed statement AND adjusts strategy
              accordingly — with sourced evidence, calibrated uncertainty, and
              an explicit "no-trade" option when the edge isn't there.
            </p>
          </div>

          <div className="border-l-2 border-[#D0FF14] pl-6">
            <h3 className="font-display text-xl md:text-2xl mb-4">
              Reinforcement Learning in Market Simulators
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Deep RL trains agents by "learning through trading" — but with
              modern, production-grade constraints: offline + constrained RL on
              real historical trajectories, then robustness training in
              calibrated multi-agent simulators where liquidity, slippage, and
              market impact are endogenous (not assumed).
            </p>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Agents don't just "self-play." They train against adversarial
              market conditions: regime shifts, volatility spikes, liquidity
              droughts, and adversarial flow — optimizing risk-adjusted returns
              under turnover, drawdown, and exposure limits.
            </p>
            <p className="font-data text-xs text-white/30">
              AlphaGo for markets — execution-aware and stress-tested, with
              stochasticity and adversarial scenario generation built into
              training for robustness.
            </p>
          </div>

          <div className="border-l-2 border-[#D0FF14] pl-6">
            <h3 className="font-display text-xl md:text-2xl mb-4">
              Large-Scale Foundation Models
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Finance GPT variants trained on SEC filings, news, social
              sentiment — paired with time-series foundation backbones for
              prices, liquidity, and cross-asset structure, and
              mixture-of-experts routing that learns when each modality is
              predictive.
            </p>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Models that digest information AND generate hypotheses with
              natural language interfaces — with post-training that enforces
              evidence discipline, calibration, and abstention rather than
              confident hallucination.
            </p>
            <p className="font-data text-xs text-white/30 mb-2">
              Explainable agent reasoning. Not a black box.
            </p>
            <p className="font-data text-xs text-white/30">
              Every position comes with a decision trace: sources → extracted
              signals → forecast distributions → portfolio action → constraint
              checks → risk contributions → scenario sensitivity.
            </p>
          </div>

          <div className="border-l-2 border-[#D0FF14] pl-6">
            <h3 className="font-display text-xl md:text-2xl mb-4">
              Continuous Adaptation
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Unlike static algorithms, our AI continuously learns from new data
              — but never blindly. It detects drift, runs shadow evaluations,
              and triggers gated retraining with canary deployment, rollback,
              and hard risk limits.
            </p>
            <p className="font-data text-xs text-white/30">
              An AI that updates itself like an evolving organism.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          6. THE TEAM
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Founding Partners</p>

        <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
          <p className="font-display text-2xl md:text-3xl">Michael Gonzales</p>
          <p className="font-display text-2xl md:text-3xl">Shawn Henry</p>
        </div>

        <div className="max-w-2xl mb-8">
          <p className="font-display text-lg md:text-xl text-white/60 mb-6">
            Proven pattern recognition across categories.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="stat-label text-[#D0FF14] mb-1">Exit</p>
              <p className="font-data text-sm">FitTea</p>
            </div>
            <div>
              <p className="stat-label text-[#D0FF14] mb-1">Partnership</p>
              <p className="font-data text-sm">Lamborghini</p>
            </div>
            <div>
              <p className="stat-label text-[#D0FF14] mb-1">Partnership</p>
              <p className="font-data text-sm">UFC</p>
            </div>
            <div>
              <p className="stat-label text-[#D0FF14] mb-1">Partnership</p>
              <p className="font-data text-sm">Kardashians</p>
            </div>
          </div>

          <p className="text-sm text-white/40 leading-relaxed">
            The same pattern recognition that built category-defining consumer
            brands now applied to the largest market opportunity in AI.
          </p>
        </div>

        <p className="text-sm text-white/30">
          Advisory network from top AI research labs and quantitative hedge
          funds.
        </p>
      </section>

      {/* ============================================
          7. THE INVITATION - Frame Control
          ============================================ */}
      <section className="px-8 md:px-16 py-12 border-b border-[#262626] bg-[#0a0a0a]">
        <p className="stat-label text-white/40 mb-8">The Invitation</p>

        <div className="max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6 leading-tight">
            We're selecting partners.
            <br />
            <span className="text-white/40">Not pitching.</span>
          </h2>

          <p className="text-sm text-white/50 leading-relaxed mb-6">
            This isn't a fundraise deck. This is an invitation to participate in
            building the intelligence layer for global finance. We're looking
            for partners who understand long-term research bets.
          </p>

          <p className="font-display text-lg text-white/60 italic">
            The opportunity exists whether you participate or not.
          </p>
        </div>
      </section>

      {/* ============================================
          8. CTA
          ============================================ */}
      <section className="px-8 md:px-16 py-16">
        <p className="font-display text-2xl md:text-3xl mb-6">
          Request the Full Deck
        </p>

        <a href="mailto:contact@quantumcapital.ai" className="cta-button">
          <span>Get Materials</span>
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

        <p className="text-xs text-white/30 mt-6">
          Whitepaper. Technical appendix. Partnership materials.
        </p>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="px-8 md:px-16 py-8 border-t border-[#262626]">
        <p className="stat-label text-white/20">© 2026 Quantum Capital</p>
      </footer>
    </main>
  );
}
