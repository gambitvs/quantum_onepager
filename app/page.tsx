"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * NAVIGATION HUB
 * Test page for all copy variations
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="px-8 md:px-16 pt-16 pb-12 border-b border-[#262626]"
      >
        <h1 className="font-display text-[3rem] md:text-[4rem] tracking-[-0.04em] leading-[0.9] mb-4">
          Quantum Capital
        </h1>
        <p className="font-data text-sm text-white/40">
          Copy Variations — Internal Testing
        </p>
      </motion.section>

      {/* VARIATIONS */}
      <section className="px-8 md:px-16 py-12">
        <p className="stat-label text-white/40 mb-8">Page Variations</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* VARIATION A */}
          <Link
            href="/insider"
            className="block border border-[#262626] p-8 hover:border-[#D0FF14] transition-colors group"
          >
            <p className="stat-label text-[#D0FF14] mb-3">Variation A</p>
            <h2 className="font-display text-2xl mb-4 group-hover:text-[#D0FF14] transition-colors">
              The Insider
            </h2>
            <p className="font-data text-sm text-white/50 leading-relaxed mb-4">
              For finance-native billionaires. Deep technical insight, honest
              about risks, removes consumer brand references. Demonstrates
              domain expertise.
            </p>
            <p className="font-data text-xs text-white/30">
              Target: Hedge fund allocators, family offices, PE
            </p>
          </Link>

          {/* VARIATION B */}
          <Link
            href="/lab"
            className="block border border-[#262626] p-8 hover:border-[#D0FF14] transition-colors group"
          >
            <p className="stat-label text-[#D0FF14] mb-3">Variation B</p>
            <h2 className="font-display text-2xl mb-4 group-hover:text-[#D0FF14] transition-colors">
              The Research Lab
            </h2>
            <p className="font-data text-sm text-white/50 leading-relaxed mb-4">
              For tech billionaires. Minimal copy, maximum authority. Positions
              as pure research lab (OpenAI/DeepMind parallel). No market stats,
              no hype.
            </p>
            <p className="font-data text-xs text-white/30">
              Target: Tech founders, AI-focused VCs
            </p>
          </Link>

          {/* VARIATION C */}
          <Link
            href="/select"
            className="block border border-[#262626] p-8 hover:border-[#D0FF14] transition-colors group"
          >
            <p className="stat-label text-[#D0FF14] mb-3">Variation C</p>
            <h2 className="font-display text-2xl mb-4 group-hover:text-[#D0FF14] transition-colors">
              The Anti-Pitch
            </h2>
            <p className="font-data text-sm text-white/50 leading-relaxed mb-4">
              Maximum Klaff "Flip the Script." Opens with "this probably isn't
              for you." Lists risks upfront. Frame control through selective
              positioning.
            </p>
            <p className="font-data text-xs text-white/30">
              Target: Ultra-sophisticated allocators who've seen everything
            </p>
          </Link>
        </div>
      </section>

      {/* AUDIT SUMMARY */}
      <section className="px-8 md:px-16 py-12 border-t border-[#262626]">
        <p className="stat-label text-white/40 mb-8">Copy Audit Summary</p>

        <div className="max-w-3xl">
          <h2 className="font-display text-xl mb-6">
            Red Flags Removed Across All Variations
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-l-2 border-red-500/50 pl-4">
              <p className="font-data text-xs text-red-500/80 uppercase tracking-wider mb-2">
                Removed
              </p>
              <ul className="font-data text-sm text-white/50 space-y-1">
                <li>• TAM/market size statistics</li>
                <li>• "The next OpenAI" claim</li>
                <li>• Consumer brand track record</li>
                <li>• Manufactured FOMO language</li>
                <li>• "AlphaGo for markets" comparison</li>
                <li>• "We're selecting partners. Not pitching."</li>
              </ul>
            </div>

            <div className="border-l-2 border-[#D0FF14]/50 pl-4">
              <p className="font-data text-xs text-[#D0FF14]/80 uppercase tracking-wider mb-2">
                Added
              </p>
              <ul className="font-data text-sm text-white/50 space-y-1">
                <li>• Specific technical approaches</li>
                <li>• Honest risk acknowledgment</li>
                <li>• Insider domain knowledge</li>
                <li>• Quiet confidence tone</li>
                <li>• Peer-level status framing</li>
                <li>• Real scarcity (not manufactured)</li>
              </ul>
            </div>
          </div>

          <p className="font-data text-sm text-white/40">
            Each variation targets a different psychographic profile while
            maintaining the editorial noir aesthetic. Test with real prospects
            to determine which resonates.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-8 border-t border-[#262626]">
        <p className="stat-label text-white/20">Internal Testing — Not for Distribution</p>
      </footer>
    </main>
  );
}
