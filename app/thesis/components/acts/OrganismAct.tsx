"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

interface OrganismActProps {
  progress: number;
}

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  connections: number[];
  activity: number;
  region: "strategy" | "risk" | "pattern" | "execution" | "memory";
}

const REGION_COLORS: Record<string, string> = {
  strategy: "#D0FF14",
  risk: "#FF6B6B",
  pattern: "#4ECDC4",
  execution: "#FFE66D",
  memory: "#A78BFA",
};

const REGION_LABELS: Record<string, string> = {
  strategy: "Strategy Generation",
  risk: "Risk Assessment",
  pattern: "Pattern Recognition",
  execution: "Trade Execution",
  memory: "Market Memory",
};

export function OrganismAct({ progress }: OrganismActProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const animationRef = useRef<number | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [thoughts, setThoughts] = useState<string[]>([]);

  // Initialize neurons
  useEffect(() => {
    const regions: Neuron["region"][] = [
      "strategy",
      "risk",
      "pattern",
      "execution",
      "memory",
    ];
    const neurons: Neuron[] = [];

    // Create neuron clusters for each region
    for (let r = 0; r < regions.length; r++) {
      const region = regions[r];
      const centerAngle = (r / regions.length) * Math.PI * 2 - Math.PI / 2;
      const centerX = 0.5 + Math.cos(centerAngle) * 0.25;
      const centerY = 0.5 + Math.sin(centerAngle) * 0.25;

      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 0.12;
        neurons.push({
          x: centerX + Math.cos(angle) * dist,
          y: centerY + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.001,
          vy: (Math.random() - 0.5) * 0.001,
          radius: 2 + Math.random() * 3,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
          activity: Math.random(),
          region,
        });
      }
    }

    // Create connections
    neurons.forEach((n, i) => {
      const connectionCount = 2 + Math.floor(Math.random() * 3);
      const nearby = neurons
        .map((other, j) => ({
          index: j,
          dist: Math.hypot(n.x - other.x, n.y - other.y),
        }))
        .filter((o) => o.index !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, connectionCount);
      n.connections = nearby.map((o) => o.index);
    });

    neuronsRef.current = neurons;
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const neurons = neuronsRef.current;
      const time = Date.now() * 0.001;

      // Update and draw connections
      ctx.lineWidth = 0.5;
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach((j) => {
          const other = neurons[j];
          const activity = (neuron.activity + other.activity) / 2;

          // Signal traveling along connection
          const signalPos = (Math.sin(time * 2 + i * 0.5) + 1) / 2;
          const gradient = ctx.createLinearGradient(
            neuron.x * width,
            neuron.y * height,
            other.x * width,
            other.y * height,
          );

          const baseColor = REGION_COLORS[neuron.region];
          gradient.addColorStop(0, `${baseColor}20`);
          gradient.addColorStop(signalPos, `${baseColor}60`);
          gradient.addColorStop(1, `${baseColor}20`);

          ctx.strokeStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(neuron.x * width, neuron.y * height);
          ctx.lineTo(other.x * width, other.y * height);
          ctx.stroke();
        });
      });

      // Update and draw neurons
      neurons.forEach((neuron, i) => {
        // Subtle movement
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        // Bounce off edges
        if (neuron.x < 0.1 || neuron.x > 0.9) neuron.vx *= -1;
        if (neuron.y < 0.1 || neuron.y > 0.9) neuron.vy *= -1;

        // Activity pulse
        neuron.activity = 0.5 + 0.5 * Math.sin(time * 3 + neuron.pulsePhase);

        // Draw glow
        const pulseScale = 1 + 0.3 * Math.sin(time * 2 + neuron.pulsePhase);
        const glowRadius = neuron.radius * pulseScale * 3;
        const glowGradient = ctx.createRadialGradient(
          neuron.x * width,
          neuron.y * height,
          0,
          neuron.x * width,
          neuron.y * height,
          glowRadius,
        );
        const color = REGION_COLORS[neuron.region];
        glowGradient.addColorStop(0, `${color}40`);
        glowGradient.addColorStop(1, `${color}00`);

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(
          neuron.x * width,
          neuron.y * height,
          glowRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Draw neuron
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(
          neuron.x * width,
          neuron.y * height,
          neuron.radius * pulseScale,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Generate thoughts for hovered region
  useEffect(() => {
    if (!hoveredRegion) {
      setThoughts([]);
      return;
    }

    const thoughtsMap: Record<string, string[]> = {
      strategy: [
        "Analyzing momentum divergence in NVDA...",
        "Hypothesis: Vol crush post-earnings",
        "Backtesting iron condor structure...",
        "Confidence: 87.3%",
      ],
      risk: [
        "Portfolio VaR: $2.4M (95%)",
        "Correlation breakdown detected",
        "Adjusting position limits...",
        "Hedging beta exposure",
      ],
      pattern: [
        "Unusual options flow: 3.2σ",
        "Historical match: 78% correlation",
        "Regime shift probability: 23%",
        "Scanning cross-asset signals...",
      ],
      execution: [
        "Slicing 50K share order",
        "VWAP deviation: -0.02%",
        "Smart routing engaged",
        "Estimated impact: 0.8bps",
      ],
      memory: [
        "Similar pattern: March 2020",
        "Outcome correlation: +2.3%",
        "Updating market regime model",
        "Reinforcing winning signals",
      ],
    };

    setThoughts(thoughtsMap[hoveredRegion] || []);
  }, [hoveredRegion]);

  const mergeProgress = Math.min(1, progress * 2);
  const textOpacity = progress > 0.3 ? Math.min(1, (progress - 0.3) * 3) : 0;

  return (
    <div className="h-full w-full bg-black relative overflow-hidden">
      {/* Neural network canvas */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: mergeProgress }}
      />

      {/* Region labels (hover targets) */}
      <div className="absolute inset-0 pointer-events-none">
        {Object.entries(REGION_LABELS).map(([region, label], i) => {
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 30;
          const y = 50 + Math.sin(angle) * 30;

          return (
            <motion.div
              key={region}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                opacity: mergeProgress,
              }}
              onMouseEnter={() => setHoveredRegion(region)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <div
                className={`px-3 py-1.5 rounded-sm border transition-all duration-300 ${
                  hoveredRegion === region
                    ? "bg-black/80 border-white/30"
                    : "bg-black/40 border-white/10"
                }`}
              >
                <span
                  className="font-data text-[10px] uppercase tracking-wider"
                  style={{ color: REGION_COLORS[region] }}
                >
                  {label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Thoughts panel */}
      {hoveredRegion && thoughts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-72 p-4 bg-black/80 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: REGION_COLORS[hoveredRegion] }}
            />
            <span
              className="font-data text-xs uppercase tracking-wider"
              style={{ color: REGION_COLORS[hoveredRegion] }}
            >
              {REGION_LABELS[hoveredRegion]}
            </span>
          </div>
          <div className="space-y-2">
            {thoughts.map((thought, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-data text-xs text-white/70"
              >
                {thought}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Central title */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <div className="text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            The Organism
          </h2>
          <p className="font-data text-sm text-white/40 max-w-md">
            A living intelligence that breathes, thinks, and evolves.
            <br />
            Hover to see what each region is processing.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
