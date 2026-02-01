"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface MoatActProps {
  progress: number;
}

interface Layer {
  id: string;
  number: number;
  title: string;
  headline: string;
  differentiator: string;
  details: string[];
  color: string;
}

const LAYERS: Layer[] = [
  {
    id: "data",
    number: 5,
    title: "DATA MOAT",
    headline: "Data nobody else has.",
    differentiator: "L3 order book, alternative data, dark pool prints",
    details: [
      "Level 3 order book (microsecond resolution)",
      "Alternative data (satellite, sentiment firehose)",
      "Options flow + dark pool prints",
      "SEC filings parsed in real-time",
    ],
    color: "#A78BFA", // purple
  },
  {
    id: "learning",
    number: 4,
    title: "CONTINUOUS LEARNING",
    headline: "Every trade teaches.",
    differentiator:
      "System improves autonomously, like AlphaGo through self-play",
    details: [
      "Online learning (adapts to regime changes)",
      "100+ experiments per day",
      "Detects drift, retrains automatically",
      "Cycle 847 is smarter than Cycle 1",
    ],
    color: "#FFE66D", // yellow
  },
  {
    id: "fusion",
    number: 3,
    title: "MULTI-MODAL FUSION",
    headline: "See what others can't.",
    differentiator: "Price + Sentiment + Flow = patterns invisible to others",
    details: [
      "Transformer-based market encoder",
      "Fuses price, text/news, and order flow",
      "Causal discovery (true lead-lag)",
      "Uncertainty quantification",
    ],
    color: "#F472B6", // pink
  },
  {
    id: "strategy",
    number: 2,
    title: "STRATEGY ENGINE",
    headline: "AI that writes strategies.",
    differentiator:
      "Generates novel trading logic, not just optimizes parameters",
    details: [
      "Reasons through market observations",
      "Generates hypotheses in natural language",
      "Tests before humans review",
      "Research factory: faster than humans can read",
    ],
    color: "#60A5FA", // blue
  },
  {
    id: "alpha",
    number: 1,
    title: "ALPHA",
    headline: "The output.",
    differentiator: "Sharpe 2.8+ target, <10% drawdown, uncorrelated to S&P",
    details: [
      "Win rate: 65%+",
      "Annual alpha: 15-25%",
      "Correlation to S&P: <0.3",
      "Regime-adaptive (bull AND bear)",
    ],
    color: "#D0FF14", // lime
  },
];

export function MoatAct({ progress }: MoatActProps) {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  // Calculate which layers are visible based on progress
  // Layers reveal from bottom (data) to top (alpha)
  const getLayerOpacity = (index: number) => {
    const layerProgress = progress * 5; // 0-5 range
    const layerThreshold = index; // 0, 1, 2, 3, 4
    if (layerProgress < layerThreshold) return 0;
    return Math.min(1, (layerProgress - layerThreshold) * 2);
  };

  const titleOpacity = progress > 0.1 ? Math.min(1, (progress - 0.1) * 3) : 0;

  return (
    <div className="h-full w-full bg-black relative overflow-hidden flex flex-col items-center justify-center py-16">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        style={{ opacity: titleOpacity }}
      >
        <h2 className="font-display text-4xl md:text-5xl text-white mb-3">
          The Moat
        </h2>
        <p className="font-data text-sm text-white/40">
          Five layers. One unfair advantage.
        </p>
      </motion.div>

      {/* Layer Stack */}
      <div className="w-full max-w-3xl px-6 flex flex-col-reverse gap-3">
        {LAYERS.map((layer, index) => {
          const opacity = getLayerOpacity(index);
          const isExpanded = expandedLayer === layer.id;
          const isHovered = hoveredLayer === layer.id;
          const isActive = isExpanded || isHovered;

          return (
            <motion.div
              key={layer.id}
              className="relative"
              style={{ opacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity, y: opacity > 0 ? 0 : 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Connector line to next layer */}
              {index < LAYERS.length - 1 && opacity > 0.5 && (
                <motion.div
                  className="absolute left-1/2 -top-3 w-[1px] h-3"
                  style={{ backgroundColor: `${layer.color}40` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}

              {/* Layer Card */}
              <motion.div
                className={`relative cursor-pointer border transition-all duration-300 ${
                  isActive
                    ? "bg-black border-white/30"
                    : "bg-black/50 border-white/10"
                }`}
                style={{
                  borderLeftWidth: "3px",
                  borderLeftColor: isActive ? layer.color : `${layer.color}60`,
                }}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Layer Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Layer number and title */}
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="font-data text-[10px] uppercase tracking-wider"
                          style={{ color: layer.color }}
                        >
                          Layer {layer.number}
                        </span>
                        <span className="font-data text-xs text-white/30">
                          {layer.title}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="font-display text-xl md:text-2xl text-white mb-2">
                        {layer.headline}
                      </h3>

                      {/* Differentiator */}
                      <p className="font-data text-sm text-white/50">
                        {layer.differentiator}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <motion.span
                      className="font-data text-white/30 mt-1"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      +
                    </motion.span>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {layer.details.map((detail, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2"
                              >
                                <div
                                  className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: layer.color }}
                                />
                                <span className="font-data text-xs text-white/60">
                                  {detail}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <motion.p
        className="mt-12 font-data text-[10px] text-white/20 uppercase tracking-widest"
        style={{
          opacity: progress > 0.8 ? Math.min(1, (progress - 0.8) * 5) : 0,
        }}
      >
        Built to compound. Designed to win.
      </motion.p>
    </div>
  );
}
