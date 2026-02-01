"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AskActProps {
  progress: number;
}

export function AskAct({ progress }: AskActProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const contentOpacity = Math.min(1, progress * 3);
  const ctaOpacity = progress > 0.3 ? Math.min(1, (progress - 0.3) * 3) : 0;

  return (
    <div className="h-full w-full bg-black relative overflow-hidden flex items-center justify-center">
      {/* Convergence effect - lines pointing to center */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const startX = 50 + Math.cos(angle) * 60;
          const startY = 50 + Math.sin(angle) * 60;

          return (
            <motion.line
              key={i}
              x1={`${startX}%`}
              y1={`${startY}%`}
              x2="50%"
              y2="50%"
              stroke="rgba(208, 255, 20, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: contentOpacity }}
              transition={{ duration: 1, delay: i * 0.05 }}
            />
          );
        })}
      </svg>

      {/* Central content */}
      <motion.div
        className="relative z-10 text-center px-8 max-w-2xl"
        style={{ opacity: contentOpacity }}
      >
        {/* Main message */}
        <motion.h2
          className="font-display text-5xl md:text-7xl text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: contentOpacity, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join us.
        </motion.h2>

        <motion.p
          className="font-data text-lg text-white/60 mb-12"
          style={{ opacity: contentOpacity }}
        >
          The next OpenAI will be built in finance.
          <br />
          <span className="text-white/40">We're building it.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: ctaOpacity }}
        >
          <motion.a
            href="mailto:invest@quantumcapital.ai"
            className={`px-8 py-4 font-data text-sm uppercase tracking-wider transition-all duration-300 ${
              hoveredButton === "invest"
                ? "bg-[#D0FF14] text-black"
                : "bg-transparent text-[#D0FF14] border border-[#D0FF14]"
            }`}
            onMouseEnter={() => setHoveredButton("invest")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Invest with us
          </motion.a>

          <motion.a
            href="mailto:careers@quantumcapital.ai"
            className={`px-8 py-4 font-data text-sm uppercase tracking-wider transition-all duration-300 ${
              hoveredButton === "join"
                ? "bg-white text-black"
                : "bg-transparent text-white/60 border border-white/20"
            }`}
            onMouseEnter={() => setHoveredButton("join")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Join the team
          </motion.a>
        </motion.div>

        {/* Subtle credentials */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-8"
          style={{ opacity: ctaOpacity * 0.5 }}
        >
          <span className="font-data text-[10px] text-white/30 uppercase tracking-wider">
            Series A: $50M
          </span>
          <span className="text-white/10">|</span>
          <span className="font-data text-[10px] text-white/30 uppercase tracking-wider">
            Founded 2024
          </span>
          <span className="text-white/10">|</span>
          <span className="font-data text-[10px] text-white/30 uppercase tracking-wider">
            San Francisco
          </span>
        </motion.div>
      </motion.div>

      {/* Corner branding */}
      <motion.div
        className="absolute bottom-8 left-8"
        style={{ opacity: ctaOpacity * 0.6 }}
      >
        <span className="font-display text-sm text-white/20">
          Quantum Capital
        </span>
      </motion.div>

      {/* Back to top hint */}
      <motion.div
        className="absolute bottom-8 right-8"
        style={{ opacity: ctaOpacity * 0.4 }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-data text-[10px] text-white/30 uppercase tracking-wider hover:text-white/60 transition-colors"
        >
          ↑ Back to top
        </button>
      </motion.div>
    </div>
  );
}
