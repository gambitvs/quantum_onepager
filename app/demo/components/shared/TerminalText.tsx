"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TerminalTextProps {
  content: string;
  speed?: "slow" | "medium" | "fast";
  cursor?: boolean;
  onComplete?: () => void;
  className?: string;
  delay?: number;
  isActive?: boolean;
}

const speedMap = {
  slow: 50,
  medium: 25,
  fast: 10,
};

export function TerminalText({
  content,
  speed = "medium",
  cursor = true,
  onComplete,
  className = "",
  delay = 0,
  isActive = true,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("");
      setIsComplete(false);
      setHasStarted(false);
      return;
    }

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, isActive]);

  useEffect(() => {
    if (!hasStarted || !isActive) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speedMap[speed]);

    return () => clearInterval(interval);
  }, [content, speed, onComplete, hasStarted, isActive]);

  return (
    <span className={`font-data ${className}`}>
      {displayedText}
      {cursor && !isComplete && hasStarted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block w-[0.5em] h-[1.1em] bg-[#D0FF14] ml-[1px] align-middle"
        />
      )}
    </span>
  );
}
