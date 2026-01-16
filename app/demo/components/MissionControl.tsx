"use client";

import { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useAutoPlay, type Phase } from "../hooks/useAutoPlay";
import { ResearchPipeline } from "./panels/ResearchPipeline";
import { CodeGenesisPanel } from "./panels/CodeGenesisPanel";
import { RecursiveLoop } from "./panels/RecursiveLoop";
import { MarketAnalysis } from "./panels/MarketAnalysis";
import { NarrationModal } from "./NarrationModal";
import {
  narrationPoints,
  getNarrationByTrigger,
  type NarrationPoint,
  type NarrationTrigger,
} from "../data/narrationContent";

interface MissionControlProps {
  onPhaseChange?: (phase: Phase) => void;
}

export function MissionControl({ onPhaseChange }: MissionControlProps) {
  const [visibleStreams, setVisibleStreams] = useState(0);
  const [activeStreamIndex, setActiveStreamIndex] = useState(0);
  const [codeSnippetIndex, setCodeSnippetIndex] = useState(0);
  const [cycleNumber, setCycleNumber] = useState(847);
  const [cumulativeImprovement, setCumulativeImprovement] = useState(68.4);
  const [showAnomaly, setShowAnomaly] = useState(false);
  const [highlightedTicker, setHighlightedTicker] = useState<string>();

  // Narration state
  const [activeNarration, setActiveNarration] = useState<NarrationPoint | null>(
    null,
  );
  const [narrationsShown, setNarrationsShown] = useState<Set<string>>(
    new Set(),
  );
  const [isCodeGenerating, setIsCodeGenerating] = useState(false);
  const [analysisReached, setAnalysisReached] = useState(false);

  const handlePhaseChange = useCallback(
    (phase: Phase) => {
      onPhaseChange?.(phase);

      switch (phase) {
        case "awakening":
          setVisibleStreams(0);
          setShowAnomaly(false);
          break;
        case "intelligence":
          // Streams will animate in via interval
          break;
        case "climax":
          setShowAnomaly(true);
          setHighlightedTicker("NVDA");
          break;
        case "resolution":
          setCycleNumber((prev) => prev + 1);
          setCumulativeImprovement((prev) => Math.min(prev + 0.3, 99));
          break;
      }
    },
    [onPhaseChange],
  );

  const {
    elapsed,
    progress,
    isPaused,
    toggle,
    reset,
    pause,
    resume,
    currentPhase,
    isPhaseActive,
    getPhaseProgress,
  } = useAutoPlay({
    onPhaseChange: handlePhaseChange,
  });

  // Trigger a narration if not already shown
  const triggerNarration = useCallback(
    (trigger: NarrationTrigger) => {
      const narration = getNarrationByTrigger(trigger);
      if (narration && !narrationsShown.has(narration.id) && !activeNarration) {
        pause();
        setActiveNarration(narration);
      }
    },
    [narrationsShown, activeNarration, pause],
  );

  // Dismiss narration and resume
  const dismissNarration = useCallback(() => {
    if (activeNarration) {
      setNarrationsShown((prev) => new Set([...prev, activeNarration.id]));
      setActiveNarration(null);
      resume();
    }
  }, [activeNarration, resume]);

  // Animate streams appearing during intelligence phase
  useEffect(() => {
    if (currentPhase === "awakening") {
      const timeout = setTimeout(() => {
        setVisibleStreams(1);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (currentPhase === "intelligence" && visibleStreams < 4) {
      const interval = setInterval(() => {
        setVisibleStreams((prev) => Math.min(prev + 1, 4));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentPhase, visibleStreams]);

  // Rotate active stream
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStreamIndex((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle keyboard pause (only when no narration active)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !activeNarration) {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, activeNarration]);

  // Narration triggers

  // Trigger 1: First stream appears
  useEffect(() => {
    if (visibleStreams === 1) {
      triggerNarration("stream_1");
    }
  }, [visibleStreams, triggerNarration]);

  // Trigger 2: All streams visible
  useEffect(() => {
    if (visibleStreams === 4) {
      triggerNarration("all_streams");
    }
  }, [visibleStreams, triggerNarration]);

  // Trigger 3: Code generating (around 10s into intelligence phase)
  useEffect(() => {
    if (elapsed >= 10000 && elapsed < 12000 && !isCodeGenerating) {
      setIsCodeGenerating(true);
      triggerNarration("code_generating");
    }
    // Reset for next cycle
    if (elapsed < 5000) {
      setIsCodeGenerating(false);
    }
  }, [elapsed, isCodeGenerating, triggerNarration]);

  // Trigger 4: Analysis reached (around 25s)
  useEffect(() => {
    if (elapsed >= 25000 && elapsed < 27000 && !analysisReached) {
      setAnalysisReached(true);
      triggerNarration("analysis");
    }
    // Reset for next cycle
    if (elapsed < 5000) {
      setAnalysisReached(false);
    }
  }, [elapsed, analysisReached, triggerNarration]);

  // Trigger 5: Anomaly detected
  useEffect(() => {
    if (showAnomaly) {
      triggerNarration("anomaly");
    }
  }, [showAnomaly, triggerNarration]);

  // Trigger 6: Resolution phase
  useEffect(() => {
    if (currentPhase === "resolution") {
      triggerNarration("resolution");
    }
  }, [currentPhase, triggerNarration]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="h-screen bg-black text-white flex flex-col overflow-hidden cursor-pointer"
      onClick={() => {
        if (!activeNarration) {
          toggle();
        }
      }}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-6 py-4 border-b border-[#262626] flex items-center justify-between"
      >
        <div className="flex items-center gap-8">
          <h1 className="font-display text-xl tracking-tight">
            Quantum Capital
          </h1>
          <span className="font-data text-xs text-[#D0FF14] uppercase tracking-widest">
            Mission Control
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Phase Indicator */}
          <div className="flex items-center gap-2">
            {(
              ["awakening", "intelligence", "climax", "resolution"] as Phase[]
            ).map((phase) => (
              <div
                key={phase}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPhase === phase
                    ? "bg-[#D0FF14]"
                    : isPhaseActive(phase)
                      ? "bg-white/50"
                      : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Pause/Play */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="font-data text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider"
          >
            [{isPaused ? "PLAY" : "PAUSE"}]
          </button>

          {/* Timer */}
          <span className="font-data text-sm text-white/40 tabular-nums">
            {formatTime(elapsed)}
          </span>
        </div>
      </motion.header>

      {/* Progress Bar */}
      <div className="h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-[#D0FF14]"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[1px] bg-[#262626] min-h-0">
        {/* Research Pipeline (HERO) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black p-4 min-h-0 overflow-hidden"
        >
          <ResearchPipeline
            visibleStreams={visibleStreams}
            activeStreamIndex={activeStreamIndex}
            isActive={!isPaused}
          />
        </motion.div>

        {/* Code Genesis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-black p-4 min-h-0 overflow-hidden"
        >
          <CodeGenesisPanel
            isActive={!isPaused && currentPhase !== "awakening"}
            progress={getPhaseProgress("intelligence")}
            currentSnippetIndex={codeSnippetIndex}
          />
        </motion.div>

        {/* Recursive Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-black p-4 min-h-0 overflow-hidden"
        >
          <RecursiveLoop
            isActive={!isPaused && currentPhase !== "awakening"}
            cycleNumber={cycleNumber}
            cumulativeImprovement={cumulativeImprovement}
          />
        </motion.div>

        {/* Market Analysis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-black p-4 min-h-0 overflow-hidden"
        >
          <MarketAnalysis
            isActive={!isPaused}
            highlightedTicker={highlightedTicker}
            showAnomaly={showAnomaly}
          />
        </motion.div>
      </div>

      {/* Pause Overlay (only show when manually paused, not during narration) */}
      {isPaused && !activeNarration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <p className="font-display text-3xl mb-2">PAUSED</p>
            <p className="font-data text-sm text-white/50">
              Click anywhere or press SPACE to resume
            </p>
          </div>
        </motion.div>
      )}

      {/* Narration Modal */}
      <NarrationModal
        narration={activeNarration}
        onDismiss={dismissNarration}
      />
    </div>
  );
}
