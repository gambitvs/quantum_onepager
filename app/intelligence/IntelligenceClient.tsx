"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  timestamp: Date;
  sentiment: "positive" | "negative" | "neutral";
  assets: string[];
}

interface SentimentScore {
  asset: string;
  score: number; // -1 to 1
  volume: number; // mention count
  trend: "up" | "down" | "flat";
}

interface EarningsEvent {
  company: string;
  ticker: string;
  date: Date;
  expectedEPS: number;
  actualEPS?: number;
  status: "upcoming" | "reported";
}

interface Alert {
  id: string;
  name: string;
  condition: string;
  active: boolean;
}

// Mock data for development
const mockNews: NewsItem[] = [
  {
    id: "1",
    headline: "Fed signals potential rate cuts in Q2 2026",
    summary:
      "Federal Reserve officials indicated openness to rate reductions as inflation continues to moderate.",
    source: "Reuters",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    sentiment: "positive",
    assets: ["SPY", "QQQ", "TLT"],
  },
  {
    id: "2",
    headline: "NVIDIA announces next-gen AI chip architecture",
    summary:
      "New Blackwell Ultra chips promise 3x performance improvement for AI training workloads.",
    source: "Bloomberg",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    sentiment: "positive",
    assets: ["NVDA", "AMD", "MSFT"],
  },
  {
    id: "3",
    headline: "Bitcoin ETF sees record outflows",
    summary:
      "Institutional investors pulled $1.2B from spot Bitcoin ETFs amid regulatory uncertainty.",
    source: "CoinDesk",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    sentiment: "negative",
    assets: ["BTC", "ETH"],
  },
];

const mockSentiment: SentimentScore[] = [
  { asset: "SPY", score: 0.65, volume: 15420, trend: "up" },
  { asset: "QQQ", score: 0.72, volume: 12380, trend: "up" },
  { asset: "NVDA", score: 0.85, volume: 28900, trend: "up" },
  { asset: "BTC", score: -0.32, volume: 45200, trend: "down" },
  { asset: "TSLA", score: 0.12, volume: 22100, trend: "flat" },
  { asset: "AAPL", score: 0.45, volume: 18700, trend: "up" },
];

const mockEarnings: EarningsEvent[] = [
  {
    company: "Apple Inc.",
    ticker: "AAPL",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    expectedEPS: 2.15,
    status: "upcoming",
  },
  {
    company: "Microsoft Corp",
    ticker: "MSFT",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    expectedEPS: 2.98,
    status: "upcoming",
  },
  {
    company: "Alphabet Inc.",
    ticker: "GOOGL",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    expectedEPS: 1.72,
    actualEPS: 1.89,
    status: "reported",
  },
];

const mockAlerts: Alert[] = [
  {
    id: "1",
    name: "VIX > 25",
    condition: "VIX crosses above 25",
    active: true,
  },
  {
    id: "2",
    name: "BTC -5%",
    condition: "BTC drops more than 5% in 1 hour",
    active: true,
  },
  {
    id: "3",
    name: "SPY Volume Surge",
    condition: "SPY volume > 2x average",
    active: false,
  },
];

export function IntelligenceClient() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
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
              className="font-data text-sm text-white/50 hover:text-white uppercase tracking-wider transition-colors"
            >
              Markets
            </a>
            <a
              href="/intelligence"
              className="font-data text-sm text-[#D0FF14] uppercase tracking-wider"
            >
              Intelligence
            </a>
          </nav>
        </div>
      </header>

      <main className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-3xl mb-8">Market Intelligence</h2>

          <div className="grid grid-cols-3 gap-8">
            {/* News Feed - 2 columns */}
            <div className="col-span-2">
              <div className="border border-[#262626] p-6">
                <h3 className="font-display text-xl mb-6">News Feed</h3>
                <div className="space-y-4">
                  {mockNews.map((news) => (
                    <div
                      key={news.id}
                      className="border-b border-[#262626] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-display text-lg text-white">
                          {news.headline}
                        </h4>
                        <span
                          className={`font-data text-xs px-2 py-1 ${
                            news.sentiment === "positive"
                              ? "bg-[#D0FF14]/10 text-[#D0FF14]"
                              : news.sentiment === "negative"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-white/5 text-white/50"
                          }`}
                        >
                          {news.sentiment.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-data text-sm text-white/60 mb-3">
                        {news.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-data text-xs text-white/40">
                            {news.source}
                          </span>
                          <span className="font-data text-xs text-white/30">
                            {formatTimeAgo(news.timestamp)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {news.assets.map((asset) => (
                            <span
                              key={asset}
                              className="font-data text-xs text-[#D0FF14]/70 bg-[#D0FF14]/5 px-2 py-0.5"
                            >
                              {asset}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Sentiment */}
              <div className="border border-[#262626] p-6">
                <h3 className="font-display text-xl mb-6">Sentiment</h3>
                <div className="space-y-3">
                  {mockSentiment.map((item) => (
                    <div
                      key={item.asset}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-data text-sm text-white">
                          {item.asset}
                        </span>
                        <span
                          className={`font-data text-xs ${
                            item.trend === "up"
                              ? "text-[#D0FF14]"
                              : item.trend === "down"
                                ? "text-red-400"
                                : "text-white/40"
                          }`}
                        >
                          {item.trend === "up"
                            ? "↑"
                            : item.trend === "down"
                              ? "↓"
                              : "→"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-2 bg-[#262626]">
                          <div
                            className={`h-full ${
                              item.score >= 0 ? "bg-[#D0FF14]" : "bg-red-400"
                            }`}
                            style={{
                              width: `${Math.abs(item.score) * 100}%`,
                              marginLeft:
                                item.score < 0
                                  ? `${(1 + item.score) * 50}%`
                                  : "50%",
                            }}
                          />
                        </div>
                        <span className="font-data text-xs text-white/40 w-12 text-right">
                          {item.volume.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings */}
              <div className="border border-[#262626] p-6">
                <h3 className="font-display text-xl mb-6">Earnings</h3>
                <div className="space-y-3">
                  {mockEarnings.map((event) => (
                    <div
                      key={event.ticker}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className="font-data text-sm text-white">
                          {event.ticker}
                        </span>
                        <span className="font-data text-xs text-white/40 ml-2">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <div className="text-right">
                        {event.status === "reported" ? (
                          <span
                            className={`font-data text-xs ${
                              event.actualEPS! > event.expectedEPS
                                ? "text-[#D0FF14]"
                                : "text-red-400"
                            }`}
                          >
                            ${event.actualEPS?.toFixed(2)} vs $
                            {event.expectedEPS.toFixed(2)}
                          </span>
                        ) : (
                          <span className="font-data text-xs text-white/40">
                            Est. ${event.expectedEPS.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              <div className="border border-[#262626] p-6">
                <h3 className="font-display text-xl mb-6">Alerts</h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className="font-data text-sm text-white">
                          {alert.name}
                        </span>
                        <p className="font-data text-xs text-white/40">
                          {alert.condition}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        className={`w-10 h-5 rounded-full transition-colors ${
                          alert.active ? "bg-[#D0FF14]" : "bg-[#262626]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-black rounded-full transition-transform ${
                            alert.active ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 border border-[#262626] font-data text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors">
                  + Add Alert
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
