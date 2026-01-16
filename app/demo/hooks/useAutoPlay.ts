"use client";

import { useState, useEffect, useCallback } from "react";
import { usePausableTimer } from "./usePausableTimer";

export type Phase = "awakening" | "intelligence" | "climax" | "resolution";

interface PhaseConfig {
  phase: Phase;
  startTime: number;
  endTime: number;
}

const TOTAL_DURATION = 60000; // 60 seconds

const PHASES: PhaseConfig[] = [
  { phase: "awakening", startTime: 0, endTime: 5000 },
  { phase: "intelligence", startTime: 5000, endTime: 35000 },
  { phase: "climax", startTime: 35000, endTime: 50000 },
  { phase: "resolution", startTime: 50000, endTime: 60000 },
];

interface UseAutoPlayOptions {
  onPhaseChange?: (phase: Phase) => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function useAutoPlay({
  onPhaseChange,
  onComplete,
  autoStart = true,
}: UseAutoPlayOptions = {}) {
  const [currentPhase, setCurrentPhase] = useState<Phase>("awakening");

  const timer = usePausableTimer({
    duration: TOTAL_DURATION,
    onComplete,
    autoStart,
    loop: true,
  });

  useEffect(() => {
    const { elapsed } = timer;

    for (let i = PHASES.length - 1; i >= 0; i--) {
      if (elapsed >= PHASES[i].startTime) {
        const newPhase = PHASES[i].phase;
        if (newPhase !== currentPhase) {
          setCurrentPhase(newPhase);
          onPhaseChange?.(newPhase);
        }
        break;
      }
    }
  }, [timer.elapsed, currentPhase, onPhaseChange]);

  const getPhaseProgress = useCallback(
    (phase: Phase) => {
      const config = PHASES.find((p) => p.phase === phase);
      if (!config) return 0;

      const { elapsed } = timer;

      if (elapsed < config.startTime) return 0;
      if (elapsed >= config.endTime) return 1;

      return (elapsed - config.startTime) / (config.endTime - config.startTime);
    },
    [timer],
  );

  const isPhaseActive = useCallback(
    (phase: Phase) => {
      const config = PHASES.find((p) => p.phase === phase);
      if (!config) return false;

      return (
        timer.elapsed >= config.startTime && timer.elapsed < config.endTime
      );
    },
    [timer.elapsed],
  );

  const isPhaseComplete = useCallback(
    (phase: Phase) => {
      const config = PHASES.find((p) => p.phase === phase);
      if (!config) return false;

      return timer.elapsed >= config.endTime;
    },
    [timer.elapsed],
  );

  return {
    ...timer,
    currentPhase,
    getPhaseProgress,
    isPhaseActive,
    isPhaseComplete,
    totalDuration: TOTAL_DURATION,
  };
}
