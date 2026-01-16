"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface DataStreamProps {
  value: number;
  format?: "currency" | "percent" | "number";
  precision?: number;
  animate?: boolean;
  highlightChange?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function DataStream({
  value,
  format = "number",
  precision = 2,
  animate = true,
  highlightChange = true,
  prefix = "",
  suffix = "",
  className = "",
}: DataStreamProps) {
  const [flash, setFlash] = useState(false);
  const prevValue = useRef(value);
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v) =>
    formatValue(v, format, precision),
  );
  const [displayValue, setDisplayValue] = useState(
    formatValue(value, format, precision),
  );

  useEffect(() => {
    if (animate) {
      spring.set(value);
    }

    if (highlightChange && prevValue.current !== value) {
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }
    prevValue.current = value;
  }, [value, animate, highlightChange, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [display]);

  return (
    <motion.span
      className={`font-data tabular-nums ${className}`}
      animate={
        flash
          ? { backgroundColor: ["rgba(208, 255, 20, 0.3)", "transparent"] }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}

function formatValue(value: number, format: string, precision: number): string {
  switch (format) {
    case "currency":
      return value.toLocaleString("en-US", {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      });
    case "percent":
      return `${value >= 0 ? "+" : ""}${value.toFixed(precision)}%`;
    default:
      return value.toFixed(precision);
  }
}
