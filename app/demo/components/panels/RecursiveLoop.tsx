"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tradeDecisions, type TradeDecision } from "../../data/marketData";

interface RecursiveLoopProps {
  isActive: boolean;
  cycleNumber: number;
  cumulativeImprovement: number;
}

export function RecursiveLoop({
  isActive,
  cycleNumber,
  cumulativeImprovement,
}: RecursiveLoopProps) {
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);

  const currentTrade = tradeDecisions[cycleNumber % tradeDecisions.length];

  // Reset on cycle change
  useEffect(() => {
    setAnalysisStep(0);
    setShowUpdate(false);
  }, [cycleNumber]);

  // Animate analysis steps
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < 3) {
          return prev + 1;
        }
        setShowUpdate(true);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isActive, cycleNumber]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="stat-label text-white/40">Recursive Loop</h3>
        <span className="font-data text-xs text-[#D0FF14]">
          CYCLE {cycleNumber.toLocaleString()}
        </span>
      </div>

      <div className="mission-panel p-4 flex-1 overflow-y-auto">
        <div className="font-data text-xs space-y-2">
          {/* Trade Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-white/80"
          >
            <span className="text-white/40">├─</span>
            <span>Trade #{currentTrade.tradeNumber.toLocaleString()}:</span>
            <span
              className={
                currentTrade.action === "BUY"
                  ? "text-[#D0FF14]"
                  : "text-red-400"
              }
            >
              {currentTrade.action}
            </span>
            <span>{currentTrade.asset}</span>
            <span className="text-white/40">@</span>
            <span>${currentTrade.price.toLocaleString()}</span>
          </motion.div>

          {/* Confidence & Outcome */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: analysisStep >= 1 ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-white/60"
          >
            <span className="text-white/40">├─</span>
            <span>Confidence: {currentTrade.confidence}%</span>
            <span className="text-white/40">→</span>
            <span>Outcome:</span>
            <span
              className={
                currentTrade.outcome >= 0 ? "text-[#D0FF14]" : "text-red-400"
              }
            >
              {currentTrade.outcome >= 0 ? "+" : ""}
              {currentTrade.outcome.toFixed(1)}%
            </span>
          </motion.div>

          {/* Analysis Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: analysisStep >= 2 ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-1"
          >
            <div className="text-white/40">├─ ANALYSIS:</div>
            <div className="ml-4 space-y-1 text-white/50">
              <div className="flex gap-2">
                <span className="text-white/30">│</span>
                <span>Entry timing:</span>
                <span
                  className={
                    currentTrade.analysis.entryTiming === "OPTIMAL"
                      ? "text-[#D0FF14]"
                      : currentTrade.analysis.entryTiming === "LATE"
                        ? "text-red-400/80"
                        : "text-amber-400"
                  }
                >
                  {currentTrade.analysis.entryTiming}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-white/30">│</span>
                <span>Position size:</span>
                <span className="text-white/70">
                  {currentTrade.analysis.positionSizing}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-white/30">│</span>
                <span>Exit:</span>
                <span className="text-white/70">
                  {currentTrade.analysis.exitTiming}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Model Update */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showUpdate ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-1 pt-2 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-white/40">├─</span>
              <span>Model Update:</span>
              <span className="text-[#D0FF14]">
                {currentTrade.modelUpdate.layer}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/50 ml-4">
              <span className="text-white/30">├─</span>
              <span>Weight delta:</span>
              <span
                className={
                  currentTrade.modelUpdate.weightDelta >= 0
                    ? "text-[#D0FF14]"
                    : "text-red-400/80"
                }
              >
                {currentTrade.modelUpdate.weightDelta >= 0 ? "+" : ""}
                {currentTrade.modelUpdate.weightDelta.toFixed(4)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/50 ml-4">
              <span className="text-white/30">└─</span>
              <span>New confidence:</span>
              <span className="text-[#D0FF14]">
                {currentTrade.modelUpdate.newConfidence}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cumulative Improvement Bar */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-data text-[10px] text-white/40 uppercase tracking-wider">
              Cumulative Improvement
            </span>
            <span className="font-data text-xs text-[#D0FF14]">
              {cumulativeImprovement.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#D0FF14]"
              initial={{ width: 0 }}
              animate={{ width: `${cumulativeImprovement}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
