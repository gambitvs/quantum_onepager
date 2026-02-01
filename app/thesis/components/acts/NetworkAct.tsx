"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface NetworkActProps {
  progress: number;
}

interface TeamNode {
  id: string;
  name: string;
  role: string;
  category: "founder" | "team" | "advisor" | "investor";
  connections: string[];
  previousCompanies?: string[];
}

const TEAM_DATA: TeamNode[] = [
  {
    id: "founder1",
    name: "Alex Chen",
    role: "CEO",
    category: "founder",
    connections: ["founder2", "advisor1", "investor1"],
    previousCompanies: ["Two Sigma", "DeepMind"],
  },
  {
    id: "founder2",
    name: "Sarah Kim",
    role: "CTO",
    category: "founder",
    connections: ["founder1", "team1", "advisor2"],
    previousCompanies: ["OpenAI", "Jump Trading"],
  },
  {
    id: "team1",
    name: "Marcus Liu",
    role: "Head of Research",
    category: "team",
    connections: ["founder2", "team2"],
    previousCompanies: ["Renaissance", "MIT"],
  },
  {
    id: "team2",
    name: "Elena Volkov",
    role: "ML Lead",
    category: "team",
    connections: ["team1", "advisor2"],
    previousCompanies: ["Anthropic", "Google Brain"],
  },
  {
    id: "advisor1",
    name: "David Park",
    role: "Advisor",
    category: "advisor",
    connections: ["founder1", "investor1"],
    previousCompanies: ["Citadel", "Goldman"],
  },
  {
    id: "advisor2",
    name: "Lisa Wang",
    role: "Advisor",
    category: "advisor",
    connections: ["founder2", "team2"],
    previousCompanies: ["Meta AI", "Stanford"],
  },
  {
    id: "investor1",
    name: "Sequoia Capital",
    role: "Lead Investor",
    category: "investor",
    connections: ["founder1", "advisor1"],
  },
  {
    id: "investor2",
    name: "a16z",
    role: "Investor",
    category: "investor",
    connections: ["founder1"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  founder: "#D0FF14",
  team: "#60A5FA",
  advisor: "#F472B6",
  investor: "#FFE66D",
};

export function NetworkAct({ progress }: NetworkActProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<TeamNode | null>(null);
  const [nodePositions, setNodePositions] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());
  const animationRef = useRef<number | null>(null);

  // Initialize node positions in a force-directed layout
  useEffect(() => {
    const positions = new Map<string, { x: number; y: number }>();

    // Simple circular layout with some randomness
    TEAM_DATA.forEach((node, i) => {
      const angle = (i / TEAM_DATA.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 0.25 + Math.random() * 0.1;
      positions.set(node.id, {
        x: 0.5 + Math.cos(angle) * radius,
        y: 0.5 + Math.sin(angle) * radius,
      });
    });

    setNodePositions(positions);
  }, []);

  // Animate the network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodePositions.size === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      // Draw connections
      ctx.lineWidth = 1;
      TEAM_DATA.forEach((node) => {
        const pos = nodePositions.get(node.id);
        if (!pos) return;

        node.connections.forEach((connId) => {
          const connPos = nodePositions.get(connId);
          if (!connPos) return;

          // Animated gradient
          const gradient = ctx.createLinearGradient(
            pos.x * width,
            pos.y * height,
            connPos.x * width,
            connPos.y * height,
          );

          const pulse = (Math.sin(time * 2) + 1) / 2;
          gradient.addColorStop(0, `${CATEGORY_COLORS[node.category]}30`);
          gradient.addColorStop(pulse, `${CATEGORY_COLORS[node.category]}60`);
          gradient.addColorStop(1, `${CATEGORY_COLORS[node.category]}30`);

          ctx.strokeStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(pos.x * width, pos.y * height);
          ctx.lineTo(connPos.x * width, connPos.y * height);
          ctx.stroke();
        });
      });

      // Draw nodes
      TEAM_DATA.forEach((node) => {
        const pos = nodePositions.get(node.id);
        if (!pos) return;

        const isSelected = selectedNode?.id === node.id;
        const radius = isSelected ? 12 : 8;
        const color = CATEGORY_COLORS[node.category];

        // Glow
        const glowGradient = ctx.createRadialGradient(
          pos.x * width,
          pos.y * height,
          0,
          pos.x * width,
          pos.y * height,
          radius * 3,
        );
        glowGradient.addColorStop(0, `${color}40`);
        glowGradient.addColorStop(1, `${color}00`);

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(pos.x * width, pos.y * height, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos.x * width, pos.y * height, radius, 0, Math.PI * 2);
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
  }, [nodePositions, selectedNode]);

  // Handle click on nodes
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Find clicked node
    for (const node of TEAM_DATA) {
      const pos = nodePositions.get(node.id);
      if (!pos) continue;

      const dist = Math.hypot(x - pos.x, y - pos.y);
      if (dist < 0.05) {
        setSelectedNode(node === selectedNode ? null : node);
        return;
      }
    }
    setSelectedNode(null);
  };

  const textOpacity = progress > 0.2 ? Math.min(1, (progress - 0.2) * 3) : 0;

  return (
    <div className="h-full w-full bg-black relative overflow-hidden">
      {/* Network canvas */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        style={{ opacity: Math.min(1, progress * 2) }}
        onClick={handleCanvasClick}
      />

      {/* Node labels */}
      {TEAM_DATA.map((node) => {
        const pos = nodePositions.get(node.id);
        if (!pos) return null;

        return (
          <motion.div
            key={node.id}
            className="absolute pointer-events-none"
            style={{
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
              transform: "translate(-50%, 20px)",
              opacity: Math.min(1, progress * 2),
            }}
          >
            <span
              className="font-data text-[10px] whitespace-nowrap"
              style={{ color: `${CATEGORY_COLORS[node.category]}80` }}
            >
              {node.name}
            </span>
          </motion.div>
        );
      })}

      {/* Selected node detail */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 p-6 bg-black/90 border border-white/10 max-w-md"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: CATEGORY_COLORS[selectedNode.category],
              }}
            />
            <h3 className="font-display text-xl text-white">
              {selectedNode.name}
            </h3>
          </div>
          <p className="font-data text-sm text-white/60 mb-2">
            {selectedNode.role}
          </p>
          {selectedNode.previousCompanies && (
            <div className="flex gap-2 flex-wrap">
              {selectedNode.previousCompanies.map((company) => (
                <span
                  key={company}
                  className="font-data text-[10px] px-2 py-1 bg-white/5 text-white/40"
                >
                  {company}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
          The Network
        </h2>
        <p className="font-data text-sm text-white/40">
          People invest in people. Click to explore.
        </p>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-8 right-8 flex gap-4"
        style={{ opacity: Math.min(1, progress * 2) * 0.6 }}
      >
        {[
          { label: "Founders", color: "#D0FF14" },
          { label: "Team", color: "#60A5FA" },
          { label: "Advisors", color: "#F472B6" },
          { label: "Investors", color: "#FFE66D" },
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
