"use client";

import { motion } from "framer-motion";

interface PulseIndicatorProps {
  status: "active" | "pending" | "error" | "idle" | "staged";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const colorMap = {
  active: "#D0FF14",
  staged: "#FFFFFF",
  pending: "#FFB800",
  error: "rgba(255, 100, 100, 0.8)",
  idle: "rgba(255, 255, 255, 0.3)",
};

export function PulseIndicator({
  status,
  size = "md",
  label,
  className = "",
}: PulseIndicatorProps) {
  const color = colorMap[status];
  const shouldPulse = status === "active" || status === "pending";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={`${sizeMap[size]} rounded-full`}
        style={{ backgroundColor: color }}
        animate={
          shouldPulse
            ? {
                boxShadow: [
                  `0 0 0 0 ${color}00`,
                  `0 0 8px 2px ${color}60`,
                  `0 0 0 0 ${color}00`,
                ],
              }
            : {}
        }
        transition={
          shouldPulse
            ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />
      {label && (
        <span
          className="font-data text-xs uppercase tracking-wider"
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
