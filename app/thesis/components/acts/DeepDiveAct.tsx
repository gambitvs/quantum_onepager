"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DeepDiveActProps {
  progress: number;
}

interface Layer {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  color: string;
}

const LAYERS: Layer[] = [
  {
    id: "performance",
    title: "Performance",
    subtitle: "Layer 1",
    content: [
      "Sharpe Ratio: 2.8+ (target)",
      "Max Drawdown: <10%",
      "Win Rate: 65%+",
      "Annual Alpha: 15-25%",
      "Correlation to S&P: <0.3",
    ],
    color: "#D0FF14",
  },
  {
    id: "strategies",
    title: "Strategy Generation",
    subtitle: "Layer 2",
    content: [
      "Multi-asset momentum",
      "Statistical arbitrage",
      "Volatility harvesting",
      "Cross-market correlation",
      "Sentiment alpha extraction",
      "Regime-adaptive allocation",
    ],
    color: "#60A5FA",
  },
  {
    id: "architecture",
    title: "AI Architecture",
    subtitle: "Layer 3",
    content: [
      "Transformer-based market encoder",
      "Reinforcement learning execution",
      "Multi-modal fusion (price + text + flow)",
      "Continuous online learning",
      "Uncertainty quantification",
      "Causal discovery module",
    ],
    color: "#F472B6",
  },
  {
    id: "infrastructure",
    title: "Training Infrastructure",
    subtitle: "Layer 4",
    content: [
      "Distributed GPU cluster (256 A100s)",
      "Custom market simulator",
      "Microsecond-resolution replay",
      "Petabyte-scale data lake",
      "Real-time feature store",
      "MLOps pipeline (100+ experiments/day)",
    ],
    color: "#FFE66D",
  },
  {
    id: "data",
    title: "Data Sources",
    subtitle: "Layer 5",
    content: [
      "Level 3 order book data",
      "Alternative data (satellite, sentiment)",
      "SEC filings + earnings transcripts",
      "Options flow + dark pool prints",
      "Social media firehose",
      "Macro indicators (real-time)",
    ],
    color: "#A78BFA",
  },
];

export function DeepDiveAct({ progress }: DeepDiveActProps) {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const textOpacity = progress > 0.1 ? Math.min(1, (progress - 0.1) * 3) : 0;
  const layersOpacity = progress > 0.2 ? Math.min(1, (progress - 0.2) * 2) : 0;

  return (
    <div className="h-full w-full bg-black relative overflow-hidden flex flex-col items-center justify-center">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        style={{ opacity: textOpacity }}
      >
        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
          Go Deeper
        </h2>
        <p className="font-data text-sm text-white/40">
          Click any layer to explore. Scroll down to continue.
        </p>
      </motion.div>

      {/* Layered visualization */}
      <motion.div
        className="relative w-full max-w-3xl px-8"
        style={{ opacity: layersOpacity }}
      >
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer.id}
            className={`relative mb-2 cursor-pointer transition-all duration-300 ${
              hoveredLayer === layer.id || expandedLayer === layer.id
                ? "z-10"
                : "z-0"
            }`}
            style={{
              transform: `translateY(${hoveredLayer === layer.id && !expandedLayer ? -5 : 0}px)`,
            }}
            onMouseEnter={() => setHoveredLayer(layer.id)}
            onMouseLeave={() => setHoveredLayer(null)}
            onClick={() =>
              setExpandedLayer(expandedLayer === layer.id ? null : layer.id)
            }
          >
            {/* Layer header */}
            <div
              className={`p-4 border transition-all duration-300 ${
                expandedLayer === layer.id
                  ? "border-white/30 bg-black"
                  : hoveredLayer === layer.id
                    ? "border-white/20 bg-black/80"
                    : "border-white/10 bg-black/40"
              }`}
              style={{
                borderLeftWidth: "3px",
                borderLeftColor: layer.color,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className="font-data text-[10px] uppercase tracking-wider"
                    style={{ color: layer.color }}
                  >
                    {layer.subtitle}
                  </span>
                  <h3 className="font-display text-lg text-white">
                    {layer.title}
                  </h3>
                </div>
                <motion.span
                  className="font-data text-white/40"
                  animate={{ rotate: expandedLayer === layer.id ? 180 : 0 }}
                >
                  ▼
                </motion.span>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedLayer === layer.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-2">
                        {layer.content.map((item, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-1 h-1 rounded-full"
                              style={{ backgroundColor: layer.color }}
                            />
                            <span className="font-data text-xs text-white/60">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Depth indicator lines */}
            {i < LAYERS.length - 1 && (
              <div className="absolute left-8 top-full h-2 w-[1px] bg-white/10" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Depth meter */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
        style={{ opacity: layersOpacity * 0.6 }}
      >
        <span className="font-data text-[10px] text-white/30 uppercase tracking-wider -rotate-90 origin-center whitespace-nowrap mb-8">
          Depth
        </span>
        <div className="flex flex-col gap-1">
          {LAYERS.map((layer) => (
            <div
              key={layer.id}
              className={`w-1 h-6 transition-colors duration-300 ${
                expandedLayer === layer.id || hoveredLayer === layer.id
                  ? ""
                  : "opacity-30"
              }`}
              style={{ backgroundColor: layer.color }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
