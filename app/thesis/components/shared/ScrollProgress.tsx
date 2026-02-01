"use client";

import { motion } from "framer-motion";

interface ScrollProgressProps {
  progress: number;
  currentAct: number;
}

const ACT_NAMES = [
  "THE OPPORTUNITY",
  "THE PROBLEM",
  "THE ORGANISM",
  "THE NETWORK",
  "THE MOAT",
  "THE DEEP DIVE",
  "THE ASK",
];

export function ScrollProgress({ progress, currentAct }: ScrollProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Progress bar */}
      <div className="h-[2px] bg-white/10">
        <motion.div
          className="h-full bg-[#D0FF14]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Act indicator */}
      <div className="absolute top-4 right-6 flex items-center gap-4">
        <span className="font-data text-[10px] text-white/40 uppercase tracking-widest">
          {ACT_NAMES[currentAct - 1]}
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((act) => (
            <div
              key={act}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                act === currentAct
                  ? "bg-[#D0FF14]"
                  : act < currentAct
                    ? "bg-white/50"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
