"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DataStream } from "../shared/DataStream";
import {
  baseTickers,
  anomalies,
  initialMarketState,
  simulatePriceChange,
  type Ticker,
  type MarketState,
} from "../../data/marketData";

interface MarketAnalysisProps {
  isActive: boolean;
  highlightedTicker?: string;
  showAnomaly?: boolean;
}

interface OrderFlow {
  side: "BUY" | "SELL";
  size: number;
  asset: string;
  time: string;
}

interface Signal {
  type: string;
  asset: string;
  strength: number;
  action: "LONG" | "SHORT" | "FLAT";
}

export function MarketAnalysis({
  isActive,
  highlightedTicker,
  showAnomaly,
}: MarketAnalysisProps) {
  const [tickers, setTickers] = useState<Ticker[]>(baseTickers);
  const [marketState, setMarketState] =
    useState<MarketState>(initialMarketState);
  const [flashTicker, setFlashTicker] = useState<string | null>(null);
  const [orderFlow, setOrderFlow] = useState<OrderFlow[]>([
    { side: "BUY", size: 2.4, asset: "NVDA", time: "0.3s" },
    { side: "SELL", size: 1.1, asset: "BTC", time: "0.8s" },
    { side: "BUY", size: 0.8, asset: "SPY", time: "1.2s" },
  ]);
  const [signals, setSignals] = useState<Signal[]>([
    { type: "VOL_ARB", asset: "NVDA", strength: 0.87, action: "LONG" },
    { type: "MOMENTUM", asset: "BTC", strength: 0.62, action: "SHORT" },
    { type: "SENTIMENT", asset: "AAPL", strength: 0.71, action: "LONG" },
  ]);

  // Simulate price updates
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTickers((prev) => {
        const updated = prev.map((t) => {
          if (Math.random() > 0.3) return t;
          return simulatePriceChange(t);
        });

        if (Math.random() > 0.8) {
          const randomTicker =
            updated[Math.floor(Math.random() * updated.length)];
          setFlashTicker(randomTicker.symbol);
          setTimeout(() => setFlashTicker(null), 300);
        }

        return updated;
      });

      // Update order flow
      if (Math.random() > 0.6) {
        const assets = ["NVDA", "BTC", "SPY", "AAPL", "ETH"];
        const newFlow: OrderFlow = {
          side: Math.random() > 0.5 ? "BUY" : "SELL",
          size: Math.round(Math.random() * 50) / 10,
          asset: assets[Math.floor(Math.random() * assets.length)],
          time: "0.1s",
        };
        setOrderFlow((prev) => [newFlow, ...prev.slice(0, 2)]);
      }

      // Update signals occasionally
      if (Math.random() > 0.9) {
        setSignals((prev) =>
          prev.map((s) => ({
            ...s,
            strength: Math.min(
              0.99,
              Math.max(0.5, s.strength + (Math.random() - 0.5) * 0.1),
            ),
          })),
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const primaryTickers = tickers.filter((t) =>
    ["NVDA", "BTC", "SPY", "VIX", "GLD"].includes(t.symbol),
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="stat-label text-white/40">Market Analysis</h3>
        <span className="font-data text-xs text-white/30">LIVE</span>
      </div>

      <div className="mission-panel p-3 flex-1 flex flex-col min-h-0">
        {/* Top Row: Tickers */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 border-b border-white/10">
          {primaryTickers.map((ticker) => (
            <motion.div
              key={ticker.symbol}
              className={`flex items-center gap-2 whitespace-nowrap ${
                ticker.symbol === highlightedTicker
                  ? "bg-[#D0FF14]/10 px-2 py-1 -mx-2"
                  : ""
              } ${ticker.symbol === flashTicker ? "bg-[#D0FF14]/20" : ""}`}
              animate={
                ticker.symbol === flashTicker
                  ? {
                      backgroundColor: [
                        "rgba(208, 255, 20, 0.2)",
                        "transparent",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.3 }}
            >
              <span className="font-data text-xs text-white/70">
                {ticker.symbol}
              </span>
              <DataStream
                value={ticker.price}
                format="number"
                precision={ticker.price > 1000 ? 0 : 2}
                prefix={ticker.category === "crypto" ? "$" : ""}
                className="text-xs text-white"
              />
              <span
                className={`font-data text-xs ${
                  ticker.change >= 0 ? "text-[#D0FF14]" : "text-red-400"
                }`}
              >
                {ticker.change >= 0 ? "+" : ""}
                {ticker.change.toFixed(2)}%{ticker.change >= 0 ? " ▲" : " ▼"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Middle: 3-column layout */}
        <div className="flex-1 grid grid-cols-3 gap-3 py-2 min-h-0">
          {/* Order Flow */}
          <div className="space-y-1">
            <span className="font-data text-[9px] text-white/40 uppercase tracking-wider">
              Order Flow
            </span>
            <div className="space-y-1">
              {orderFlow.map((flow, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 font-data text-[10px]"
                >
                  <span
                    className={
                      flow.side === "BUY" ? "text-[#D0FF14]" : "text-red-400"
                    }
                  >
                    {flow.side}
                  </span>
                  <span className="text-white/70">{flow.size}M</span>
                  <span className="text-white/50">{flow.asset}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Active Signals */}
          <div className="space-y-1">
            <span className="font-data text-[9px] text-white/40 uppercase tracking-wider">
              Active Signals
            </span>
            <div className="space-y-1">
              {signals.map((signal, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 font-data text-[10px]"
                >
                  <span
                    className={
                      signal.action === "LONG"
                        ? "text-[#D0FF14]"
                        : signal.action === "SHORT"
                          ? "text-red-400"
                          : "text-white/40"
                    }
                  >
                    {signal.action}
                  </span>
                  <span className="text-white/50">{signal.asset}</span>
                  <span className="text-white/30">
                    {(signal.strength * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="space-y-1">
            <span className="font-data text-[9px] text-white/40 uppercase tracking-wider">
              Portfolio
            </span>
            <div className="space-y-1 font-data text-[10px]">
              <div className="flex justify-between">
                <span className="text-white/40">Sharpe</span>
                <span className="text-[#D0FF14]">2.34</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Drawdown</span>
                <span className="text-red-400/80">-3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Win Rate</span>
                <span className="text-white/70">67.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Regime & Status */}
        <div className="flex items-center justify-between text-[10px] border-t border-white/10 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-data text-white/40 uppercase">Regime:</span>
              <motion.span
                className={`font-data font-medium ${
                  marketState.regime === "RISK_ON"
                    ? "text-[#D0FF14]"
                    : marketState.regime === "RISK_OFF"
                      ? "text-red-400"
                      : marketState.regime === "TRANSITIONAL"
                        ? "text-amber-400"
                        : "text-white/50"
                }`}
                animate={showAnomaly ? { opacity: [1, 0.5, 1] } : {}}
                transition={{
                  duration: 0.5,
                  repeat: showAnomaly ? Infinity : 0,
                }}
              >
                {marketState.regime.replace("_", "-")}
              </motion.span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-data text-white/40 uppercase">
                Anomalies:
              </span>
              <motion.span
                className={`font-data ${showAnomaly ? "text-amber-400" : "text-white"}`}
                animate={showAnomaly ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {marketState.anomalyCount}
              </motion.span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-data text-white/40 uppercase">σ:</span>
              <span className="font-data text-white/70">
                {marketState.uncertainty.toFixed(2)}
              </span>
            </div>
          </div>

          {showAnomaly && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 bg-amber-400/10 px-2 py-1"
            >
              <span className="font-data text-amber-400 uppercase">
                {anomalies[0].type.replace("_", " ")}
              </span>
              <span className="font-data text-white/50">
                {anomalies[0].asset}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
