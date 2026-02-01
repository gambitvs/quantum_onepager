"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface ProblemActProps {
  progress: number;
}

interface FragmentNode {
  id: string;
  label: string;
  category: "quant" | "retail" | "ai";
  x: number;
  y: number;
}

const FRAGMENTS: FragmentNode[] = [
  { id: "openai", label: "OpenAI", category: "ai", x: 12, y: 20 },
  { id: "deepmind", label: "DeepMind", category: "ai", x: 88, y: 22 },
  { id: "twosigma", label: "Two Sigma", category: "quant", x: 15, y: 78 },
  { id: "renaissance", label: "Renaissance", category: "quant", x: 85, y: 75 },
  { id: "citadel", label: "Citadel", category: "quant", x: 50, y: 12 },
  { id: "retail1", label: "Retail Traders", category: "retail", x: 25, y: 35 },
  { id: "retail2", label: "Algo Traders", category: "retail", x: 75, y: 38 },
  { id: "anthropic", label: "Anthropic", category: "ai", x: 10, y: 55 },
  { id: "jump", label: "Jump Trading", category: "quant", x: 90, y: 55 },
];

export function ProblemAct({ progress }: ProblemActProps) {
  const [pulsingNodes, setPulsingNodes] = useState<Set<string>>(new Set());

  // Random pulsing effect
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode =
        FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
      setPulsingNodes((prev) => new Set([...prev, randomNode.id]));
      setTimeout(() => {
        setPulsingNodes((prev) => {
          const next = new Set(prev);
          next.delete(randomNode.id);
          return next;
        });
      }, 500);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Failed connection lines - deterministic to avoid hydration mismatch
  const connectionAttempts = useMemo(() => {
    // Use fixed pairs instead of random to avoid server/client mismatch
    const pairs = [
      [0, 1], // OpenAI -> DeepMind
      [2, 3], // Two Sigma -> Renaissance
      [4, 5], // Citadel -> Retail Traders
      [6, 7], // Algo Traders -> Anthropic
      [8, 0], // Jump Trading -> OpenAI
      [3, 4], // Renaissance -> Citadel
    ];
    return pairs.map(([fromIdx, toIdx], i) => ({
      from: FRAGMENTS[fromIdx],
      to: FRAGMENTS[toIdx],
      id: `${FRAGMENTS[fromIdx].id}-${FRAGMENTS[toIdx].id}-${i}`,
    }));
  }, []);

  const titleOpacity = progress > 0.1 ? Math.min(1, (progress - 0.1) * 5) : 0;
  const nodesOpacity = Math.min(1, progress * 3);
  const quoteOpacity = progress > 0.4 ? Math.min(1, (progress - 0.4) * 3) : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai":
        return "#D0FF14";
      case "quant":
        return "#60A5FA";
      case "retail":
        return "#F472B6";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <div className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Fragmented nodes visualization */}
      <div className="absolute inset-0" style={{ opacity: nodesOpacity }}>
        {/* Failed connection attempts - dashed lines that fade */}
        <svg className="absolute inset-0 w-full h-full">
          {connectionAttempts.map((conn, i) => (
            <motion.line
              key={conn.id}
              x1={`${conn.from.x}%`}
              y1={`${conn.from.y}%`}
              x2={`${conn.to.x}%`}
              y2={`${conn.to.y}%`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0.5, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {FRAGMENTS.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            {/* Node circle */}
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: getCategoryColor(node.category),
                boxShadow: pulsingNodes.has(node.id)
                  ? `0 0 20px 4px ${getCategoryColor(node.category)}40`
                  : "none",
              }}
              animate={
                pulsingNodes.has(node.id)
                  ? { scale: [1, 1.5, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
            />
            {/* Label */}
            <span
              className="font-data text-[10px] mt-2 whitespace-nowrap"
              style={{ color: `${getCategoryColor(node.category)}80` }}
            >
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Central quote */}
      <div className="relative z-10 text-center px-8 max-w-3xl">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-white mb-6"
          style={{ opacity: titleOpacity }}
        >
          Many savants.
          <br />
          <span className="text-white/40">No unified mind.</span>
        </motion.h2>

        <motion.p
          className="font-data text-sm text-white/50 leading-relaxed max-w-xl mx-auto"
          style={{ opacity: quoteOpacity }}
        >
          Quants build models in isolation. AI labs chase benchmarks. Retail
          traders follow noise. Everyone hunting alpha—nobody coordinating.
          <br />
          <span className="text-white/30 mt-4 block">
            The edge isn't in any one of them.
            <br />
            It's in connecting them.
          </span>
        </motion.p>
      </div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-8 left-8 flex gap-6"
        style={{ opacity: nodesOpacity * 0.6 }}
      >
        {[
          { label: "AI Research", color: "#D0FF14" },
          { label: "Quant Funds", color: "#60A5FA" },
          { label: "Retail/Algo", color: "#F472B6" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-data text-[10px] text-white/40">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
