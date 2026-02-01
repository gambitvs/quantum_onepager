"use client";

import { motion } from "framer-motion";
import { useMarketData } from "@/app/hooks/useMarketData";

export function MarketsClient() {
  const { tickers, regime, anomalies, isLive, isFallback, isLoading, refresh } =
    useMarketData(5000); // Update every 5 seconds per spec

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString()}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-8 py-4 border-b border-[#262626] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-xl tracking-tight">
            Quantum Capital
          </h1>
          <nav className="flex items-center gap-6">
            <a
              href="/dashboard"
              className="font-data text-sm text-white/50 hover:text-white uppercase tracking-wider transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/markets"
              className="font-data text-sm text-[#D0FF14] uppercase tracking-wider"
            >
              Markets
            </a>
            <a
              href="/intelligence"
              className="font-data text-sm text-white/50 hover:text-white uppercase tracking-wider transition-colors"
            >
              Intelligence
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive
                  ? "bg-[#D0FF14]"
                  : isFallback
                    ? "bg-amber-400"
                    : "bg-white/30"
              }`}
            />
            <span className="font-data text-xs text-white/50 uppercase">
              {isLive ? "Live" : isFallback ? "Demo" : "Cached"}
            </span>
          </div>
          <button
            onClick={() => refresh()}
            className="font-data text-xs text-white/50 hover:text-white uppercase tracking-wider transition-colors"
          >
            Refresh
          </button>
        </div>
      </header>

      <main className="p-8">
        {/* Market Regime Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-4 gap-6">
            {/* Regime Indicator */}
            <div className="border border-[#262626] p-6">
              <p className="font-data text-xs text-white/40 uppercase tracking-wider mb-2">
                Market Regime
              </p>
              <p
                className={`font-display text-2xl ${
                  regime.regime === "RISK_ON"
                    ? "text-[#D0FF14]"
                    : regime.regime === "RISK_OFF"
                      ? "text-red-400"
                      : "text-amber-400"
                }`}
              >
                {regime.regime.replace("_", "-")}
              </p>
              <p className="font-data text-xs text-white/30 mt-1">
                {(regime.confidence * 100).toFixed(0)}% confidence
              </p>
            </div>

            {/* VIX */}
            <div className="border border-[#262626] p-6">
              <p className="font-data text-xs text-white/40 uppercase tracking-wider mb-2">
                VIX
              </p>
              <p
                className={`font-display text-2xl ${
                  regime.vix > 25
                    ? "text-red-400"
                    : regime.vix > 18
                      ? "text-amber-400"
                      : "text-white"
                }`}
              >
                {regime.vix.toFixed(2)}
              </p>
              <p className="font-data text-xs text-white/30 mt-1">
                Volatility Index
              </p>
            </div>

            {/* Market Breadth */}
            <div className="border border-[#262626] p-6">
              <p className="font-data text-xs text-white/40 uppercase tracking-wider mb-2">
                Breadth
              </p>
              <p className="font-display text-2xl text-white">
                {(regime.breadth * 100).toFixed(0)}%
              </p>
              <p className="font-data text-xs text-white/30 mt-1">
                Advance/Decline
              </p>
            </div>

            {/* Momentum */}
            <div className="border border-[#262626] p-6">
              <p className="font-data text-xs text-white/40 uppercase tracking-wider mb-2">
                Momentum
              </p>
              <p
                className={`font-display text-2xl ${
                  regime.momentum > 0.5 ? "text-[#D0FF14]" : "text-red-400"
                }`}
              >
                {(regime.momentum * 100).toFixed(0)}%
              </p>
              <p className="font-data text-xs text-white/30 mt-1">
                Trend Strength
              </p>
            </div>
          </div>
        </motion.div>

        {/* Price Tickers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl">Live Prices</h2>
            <span className="font-data text-xs text-white/40">
              {tickers.length} assets
            </span>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {tickers.map((ticker) => (
              <motion.div
                key={ticker.symbol}
                className="border border-[#262626] p-4 hover:border-[#D0FF14]/30 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-data text-sm font-medium text-white">
                    {ticker.symbol}
                  </span>
                  <span className="font-data text-xs text-white/40 uppercase">
                    {ticker.category}
                  </span>
                </div>

                <p className="font-display text-xl text-white mb-1">
                  {formatPrice(ticker.price)}
                </p>

                <p
                  className={`font-data text-sm ${
                    ticker.changePercent >= 0
                      ? "text-[#D0FF14]"
                      : "text-red-400"
                  }`}
                >
                  {formatChange(ticker.changePercent)}
                </p>

                <div className="mt-3 pt-3 border-t border-[#262626]">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">H</span>
                    <span className="text-white/50">
                      {formatPrice(ticker.high)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">L</span>
                    <span className="text-white/50">
                      {formatPrice(ticker.low)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Anomaly Alerts */}
        {anomalies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="font-display text-xl mb-6">Anomaly Alerts</h2>
            <div className="space-y-3">
              {anomalies.map((anomaly) => (
                <div
                  key={anomaly.id}
                  className={`border p-4 ${
                    anomaly.severity === "HIGH"
                      ? "border-red-500/30 bg-red-500/5"
                      : anomaly.severity === "MEDIUM"
                        ? "border-amber-500/30 bg-amber-500/5"
                        : "border-[#262626]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-data text-xs uppercase ${
                          anomaly.severity === "HIGH"
                            ? "text-red-400"
                            : anomaly.severity === "MEDIUM"
                              ? "text-amber-400"
                              : "text-white/50"
                        }`}
                      >
                        {anomaly.severity}
                      </span>
                      <span className="font-data text-sm text-white">
                        {anomaly.asset}
                      </span>
                      <span className="font-data text-xs text-white/40">
                        {anomaly.type.replace("_", " ")}
                      </span>
                    </div>
                    <span className="font-data text-xs text-white/30">
                      {new Date(anomaly.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="font-data text-sm text-white/60 mt-2">
                    {anomaly.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
