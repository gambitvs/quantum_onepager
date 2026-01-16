"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NarrationPoint } from "../data/narrationContent";

interface NarrationModalProps {
  narration: NarrationPoint | null;
  onDismiss: () => void;
}

export function NarrationModal({ narration, onDismiss }: NarrationModalProps) {
  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space" && narration) {
        e.preventDefault();
        onDismiss();
      }
    },
    [narration, onDismiss],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!narration) return null;

  return (
    <AnimatePresence>
      {narration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-50 flex items-center justify-center"
          onClick={onDismiss}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="max-w-[480px] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-8"
              style={{
                backgroundColor: "#0A0A0A",
                border: "1px solid #262626",
                borderLeft: "3px solid #D0FF14",
              }}
            >
              {/* Title */}
              <h2
                className="font-display text-xl tracking-tight mb-4"
                style={{ color: "#D0FF14" }}
              >
                {narration.title}
              </h2>

              {/* Quote */}
              <p
                className="font-display text-base italic mb-6"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                "{narration.quote}"
              </p>

              {/* Body */}
              <div className="space-y-3 mb-6">
                {narration.body.map((line, i) => (
                  <p
                    key={i}
                    className="font-data text-sm leading-relaxed"
                    style={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Dismiss hint */}
              <p
                className="font-data text-xs text-center"
                style={{ color: "rgba(255, 255, 255, 0.3)" }}
              >
                Click or press SPACE to continue
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
