"use client";

import { motion } from "framer-motion";
import { PulseIndicator } from "../shared/PulseIndicator";
import {
  researchStreams,
  type ResearchStream,
} from "../../data/researchStreams";

interface ResearchPipelineProps {
  visibleStreams: number;
  activeStreamIndex: number;
  isActive: boolean;
}

const statusToIndicator = (
  status: ResearchStream["deployStatus"],
): "active" | "pending" | "error" | "staged" => {
  switch (status) {
    case "ACTIVE":
      return "active";
    case "STAGED":
      return "staged";
    case "PENDING":
      return "pending";
    case "REJECTED":
      return "error";
  }
};

export function ResearchPipeline({
  visibleStreams,
  activeStreamIndex,
  isActive,
}: ResearchPipelineProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="stat-label text-white/40">Research Pipeline</h3>
        <span className="font-data text-xs text-white/30">
          {researchStreams.length} ACTIVE STREAMS
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {researchStreams.slice(0, visibleStreams).map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`mission-panel p-3 ${
              index === activeStreamIndex && isActive ? "active" : ""
            }`}
          >
            {/* Stream Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <PulseIndicator
                  status={statusToIndicator(stream.deployStatus)}
                  size="sm"
                />
                <span className="font-display text-sm text-white">
                  {stream.name}
                </span>
                <span className="font-data text-[10px] text-white/40">
                  ({stream.category})
                </span>
              </div>
              <span
                className={`font-data text-[10px] uppercase tracking-wider ${
                  stream.deployStatus === "ACTIVE"
                    ? "text-[#D0FF14]"
                    : stream.deployStatus === "REJECTED"
                      ? "text-red-400/60"
                      : stream.deployStatus === "STAGED"
                        ? "text-white"
                        : "text-amber-400"
                }`}
              >
                {stream.deployStatus}
              </span>
            </div>

            {/* Progress Pipeline */}
            <div className="grid grid-cols-4 gap-2">
              {/* Hypothesis Stage */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-data text-[10px] text-white/30 uppercase">
                    Hypothesis
                  </span>
                </div>
                <motion.div
                  className="h-1 bg-[#D0FF14]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                />
              </div>

              {/* Backtest Stage */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-data text-[10px] text-white/30 uppercase">
                    Backtest
                  </span>
                  <span className="font-data text-[10px] text-white/50">
                    SR {stream.backtest.sharpe.toFixed(1)}
                  </span>
                </div>
                <motion.div
                  className="h-1 bg-[#D0FF14]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.15 + 0.4, duration: 0.3 }}
                />
              </div>

              {/* Live Test Stage */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-data text-[10px] text-white/30 uppercase">
                    Live Test
                  </span>
                  <span
                    className={`font-data text-[10px] ${
                      stream.liveTest.pnl >= 0
                        ? "text-[#D0FF14]"
                        : "text-red-400/80"
                    }`}
                  >
                    {stream.liveTest.pnl >= 0 ? "+" : ""}
                    {stream.liveTest.pnl.toFixed(1)}%
                  </span>
                </div>
                <motion.div
                  className={`h-1 ${
                    stream.deployStatus === "REJECTED"
                      ? "bg-red-400/40"
                      : "bg-[#D0FF14]"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      stream.deployStatus === "REJECTED"
                        ? "60%"
                        : stream.deployStatus === "PENDING"
                          ? "80%"
                          : "100%",
                  }}
                  transition={{ delay: index * 0.15 + 0.6, duration: 0.3 }}
                />
              </div>

              {/* Deploy Stage */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-data text-[10px] text-white/30 uppercase">
                    Deploy
                  </span>
                </div>
                <motion.div
                  className={`h-1 ${
                    stream.deployStatus === "ACTIVE"
                      ? "bg-[#D0FF14]"
                      : stream.deployStatus === "REJECTED"
                        ? "bg-red-400/40"
                        : "bg-white/20"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      stream.deployStatus === "ACTIVE"
                        ? "100%"
                        : stream.deployStatus === "STAGED"
                          ? "50%"
                          : stream.deployStatus === "REJECTED"
                            ? "0%"
                            : "30%",
                  }}
                  transition={{ delay: index * 0.15 + 0.8, duration: 0.3 }}
                />
              </div>
            </div>

            {/* Status Reason - only show for rejected */}
            {stream.statusReason && stream.deployStatus === "REJECTED" && (
              <p className="font-data text-[10px] text-white/30 mt-1">
                {stream.statusReason}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
