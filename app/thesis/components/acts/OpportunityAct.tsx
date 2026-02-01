"use client";

import { motion, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface OpportunityActProps {
  progress: number;
}

export function OpportunityAct({ progress }: OpportunityActProps) {
  const [displayNumber, setDisplayNumber] = useState(0);
  const targetNumber = 100_000_000_000_000;

  // Animate the number based on progress with easing
  useEffect(() => {
    if (progress < 0.6) {
      // Count up phase - extended over 60% of act for slower animation
      const countProgress = progress / 0.6;
      // Ease-out cubic for smooth deceleration as it approaches target
      const eased = 1 - Math.pow(1 - countProgress, 3);
      setDisplayNumber(Math.floor(targetNumber * eased));
    } else {
      setDisplayNumber(targetNumber);
    }
  }, [progress]);

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Opacity transitions - adjusted for slower number animation
  const numberOpacity =
    progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) * 4);
  const subtitleOpacity =
    progress > 0.5 ? Math.min(1, (progress - 0.5) * 4) : 0;
  const contextOpacity =
    progress > 0.65 ? Math.min(1, (progress - 0.65) * 4) : 0;

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center relative">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Main number */}
      <motion.div
        className="text-center z-10"
        style={{ opacity: numberOpacity }}
      >
        <motion.h1
          className="font-display text-[8vw] md:text-[6vw] tracking-tight text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {formatNumber(displayNumber)}
        </motion.h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="font-display text-xl md:text-2xl text-white/60 mt-4 text-center max-w-2xl px-8"
        style={{ opacity: subtitleOpacity }}
      >
        The surface area of global financial markets.
      </motion.p>

      {/* Context text */}
      <motion.div
        className="absolute bottom-20 left-0 right-0 text-center px-8"
        style={{ opacity: contextOpacity }}
      >
        <p className="font-data text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
          By 2030, AI in finance will be a{" "}
          <span className="text-[#D0FF14]">$190 billion</span> industry.
          <br />
          This is the largest intelligence problem on Earth.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      {progress < 0.2 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </div>
  );
}
