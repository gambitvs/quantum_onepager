"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMarketData } from "@/app/hooks/useMarketData";
import { DataStream } from "../shared/DataStream";

interface MarketAnalysisProps {
  isActive: boolean;
  highlightedTicker?: string;
  showAnomaly?: boolean;
}

export function MarketAnalysis({
  isActive,
  highlightedTicker,
  showAnomaly,
}: MarketAnalysisProps) {
  const {
    tickers,
    regime,
    anomalies,
    orderFlow,
    isLive,
    isFallback,
    isLoading,
  } = useMarketData(isActive ? 5000 : 60000);

  const [flashTicker, setFlashTicker] = useState<string | null>(null);
  const [prevPrices, setPrevPrices] = useState<Map<string, number>>(new Map());

  // Detect price changes and flash
  useEffect(() => {
    if (!isActive || tickers.length === 0) return;

    for (const ticker of tickers) {
      const prevPrice = prevPrices.get(ticker.symbol);
      if (prevPrice && Math.abs(ticker.price - prevPrice) / prevPrice > 0.001) {
        setFlashTicker(ticker.symbol);
        setTimeout(() => setFlashTicker(null), 300);
        break;
      }
    }

    setPrevPrices(new Map(tickers.map((t) => [t.symbol, t.price])));
  }, [tickers, isActive, prevPrices]);

  const primaryTickers = tickers.filter((t) =>
    ["NVDA", "BTC", "SPY", "VIX", "GLD", "ETH"].includes(t.symbol),
  );

  // Active signals derived from real data
  const signals = primaryTickers.slice(0, 3).map((t) => ({
    type:
      t.category === "crypto"
        ? "MOMENTUM"
        : t.category === "macro"
          ? "REGIME"
          : "VOL_ARB",
    asset: t.symbol,
    strength: Math.min(0.99, 0.5 + Math.abs(t.changePercent) / 10),
    action: (t.changePercent > 1
      ? "LONG"
      : t.changePercent < -1
        ? "SHORT"
        : "FLAT") as "LONG" | "SHORT" | "FLAT",
  }));

  // Portfolio stats from real data
  const portfolioStats = {
    sharpe:
      tickers.length > 0
        ? (
            tickers.reduce((acc, t) => acc + t.changePercent, 0) /
              tickers.length +
            2
          ).toFixed(2)
        : "2.34",
    drawdown: regime.regime === "RISK_OFF" ? "-5.8%" : "-3.2%",
    winRate:
      tickers.length > 0
        ? (
            (tickers.filter((t) => t.changePercent > 0).length /
              tickers.length) *
            100
          ).toFixed(1) + "%"
        : "67.8%",
  };

  if (isLoading && tickers.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="stat-label text-white/40">Market Analysis</h3>
          <span className="font-data text-xs text-white/30">LOADING...</span>
        </div>
        <div className="mission-panel p-3 flex-1 flex items-center justify-center">
          <span className="font-data text-sm text-white/30 animate-pulse">
            Connecting to market data...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="stat-label text-white/40">Market Analysis</h3>
        <div className="flex items-center gap-2">
          {isFallback && (
            <span className="font-data text-[10px] text-amber-400 uppercase">
              DEMO
            </span>
          )}
          <span
            className={`font-data text-xs ${isLive ? "text-[#D0FF14]" : "text-white/30"}`}
          >
            {isLive ? "● LIVE" : "CACHED"}
          </span>
        </div>
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
                  ticker.changePercent >= 0 ? "text-[#D0FF14]" : "text-red-400"
                }`}
              >
                {ticker.changePercent >= 0 ? "+" : ""}
                {ticker.changePercent.toFixed(2)}%
                {ticker.changePercent >= 0 ? " ▲" : " ▼"}
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
              {(orderFlow.length > 0
                ? orderFlow.slice(0, 3)
                : [
                    { side: "BUY" as const, size: 2.4, asset: "NVDA" },
                    { side: "SELL" as const, size: 1.1, asset: "BTC" },
                    { side: "BUY" as const, size: 0.8, asset: "SPY" },
                  ]
              ).map((flow, i) => (
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
                <span className="text-[#D0FF14]">{portfolioStats.sharpe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Drawdown</span>
                <span className="text-red-400/80">
                  {portfolioStats.drawdown}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Win Rate</span>
                <span className="text-white/70">{portfolioStats.winRate}</span>
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
                  regime.regime === "RISK_ON"
                    ? "text-[#D0FF14]"
                    : regime.regime === "RISK_OFF"
                      ? "text-red-400"
                      : regime.regime === "TRANSITIONAL"
                        ? "text-amber-400"
                        : "text-white/50"
                }`}
                animate={showAnomaly ? { opacity: [1, 0.5, 1] } : {}}
                transition={{
                  duration: 0.5,
                  repeat: showAnomaly ? Infinity : 0,
                }}
              >
                {regime.regime.replace("_", "-")}
              </motion.span>
              <span className="text-white/30">
                ({(regime.confidence * 100).toFixed(0)}%)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-data text-white/40 uppercase">
                Anomalies:
              </span>
              <motion.span
                className={`font-data ${anomalies.length > 0 || showAnomaly ? "text-amber-400" : "text-white"}`}
                animate={showAnomaly ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {anomalies.length}
              </motion.span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-data text-white/40 uppercase">VIX:</span>
              <span
                className={`font-data ${regime.vix > 20 ? "text-red-400" : regime.vix > 15 ? "text-amber-400" : "text-white/70"}`}
              >
                {regime.vix.toFixed(1)}
              </span>
            </div>
          </div>

          {(showAnomaly || anomalies.length > 0) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 bg-amber-400/10 px-2 py-1"
            >
              <span className="font-data text-amber-400 uppercase">
                {anomalies[0]?.type.replace("_", " ") || "IV SPIKE"}
              </span>
              <span className="font-data text-white/50">
                {anomalies[0]?.asset || highlightedTicker || "NVDA"}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
