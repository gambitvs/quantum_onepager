"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useMarketData } from "@/app/hooks/useMarketData";
import type { UserRole } from "@/auth";

interface DashboardClientProps {
  user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: UserRole;
  };
}

export function DashboardClient({ user }: DashboardClientProps) {
  const { tickers, regime, isLive, isFallback } = useMarketData(10000);

  const topMovers = [...tickers]
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 5);

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
              className="font-data text-sm text-[#D0FF14] uppercase tracking-wider"
            >
              Dashboard
            </a>
            <a
              href="/demo"
              className="font-data text-sm text-white/50 hover:text-white uppercase tracking-wider transition-colors"
            >
              Mission Control
            </a>
            {(user.role === "admin" || user.role === "researcher") && (
              <a
                href="/research"
                className="font-data text-sm text-white/50 hover:text-white uppercase tracking-wider transition-colors"
              >
                Research
              </a>
            )}
            {user.role === "admin" && (
              <a
                href="/admin"
                className="font-data text-sm text-white/50 hover:text-white uppercase tracking-wider transition-colors"
              >
                Admin
              </a>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${isLive ? "bg-[#D0FF14]" : isFallback ? "bg-amber-400" : "bg-white/30"}`}
            />
            <span className="font-data text-xs text-white/50 uppercase">
              {isLive ? "Live" : isFallback ? "Demo" : "Cached"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user.image && (
              <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
            )}
            <div>
              <p className="font-data text-sm text-white">
                {user.name || user.email}
              </p>
              <p className="font-data text-xs text-white/40 uppercase">
                {user.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="font-data text-xs text-white/50 hover:text-white uppercase tracking-wider transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome */}
          <div className="mb-12">
            <h2 className="font-display text-4xl mb-2">
              Welcome back, {user.name?.split(" ")[0] || "Researcher"}
            </h2>
            <p className="font-data text-sm text-white/50">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <div className="border border-[#262626] p-6">
              <p className="stat-label text-white/40 mb-2">Market Regime</p>
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

            <div className="border border-[#262626] p-6">
              <p className="stat-label text-white/40 mb-2">VIX</p>
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

            <div className="border border-[#262626] p-6">
              <p className="stat-label text-white/40 mb-2">Active Strategies</p>
              <p className="font-display text-2xl text-white">12</p>
              <p className="font-data text-xs text-[#D0FF14] mt-1">
                +2 pending review
              </p>
            </div>

            <div className="border border-[#262626] p-6">
              <p className="stat-label text-white/40 mb-2">Today's P&L</p>
              <p className="font-display text-2xl text-[#D0FF14]">+$142.3K</p>
              <p className="font-data text-xs text-white/30 mt-1">
                +0.34% portfolio
              </p>
            </div>
          </div>

          {/* Top Movers */}
          <div className="mb-12">
            <h3 className="font-display text-xl mb-6">Top Movers</h3>
            <div className="grid grid-cols-5 gap-4">
              {topMovers.map((ticker) => (
                <div
                  key={ticker.symbol}
                  className="border border-[#262626] p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-data text-sm text-white">
                      {ticker.symbol}
                    </span>
                    <span className="font-data text-xs text-white/40 uppercase">
                      {ticker.category}
                    </span>
                  </div>
                  <p className="font-display text-lg text-white">
                    ${ticker.price.toLocaleString()}
                  </p>
                  <p
                    className={`font-data text-sm ${
                      ticker.changePercent >= 0
                        ? "text-[#D0FF14]"
                        : "text-red-400"
                    }`}
                  >
                    {ticker.changePercent >= 0 ? "+" : ""}
                    {ticker.changePercent.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-display text-xl mb-6">Quick Actions</h3>
            <div className="flex gap-4">
              <a
                href="/demo"
                className="border border-[#262626] px-6 py-4 hover:border-[#D0FF14] transition-colors"
              >
                <p className="font-data text-sm text-white mb-1">
                  Mission Control
                </p>
                <p className="font-data text-xs text-white/40">
                  View live trading dashboard
                </p>
              </a>
              <a
                href="/research"
                className="border border-[#262626] px-6 py-4 hover:border-[#D0FF14] transition-colors"
              >
                <p className="font-data text-sm text-white mb-1">
                  Research Pipeline
                </p>
                <p className="font-data text-xs text-white/40">
                  View active strategies
                </p>
              </a>
              <a
                href="/settings"
                className="border border-[#262626] px-6 py-4 hover:border-[#D0FF14] transition-colors"
              >
                <p className="font-data text-sm text-white mb-1">Settings</p>
                <p className="font-data text-xs text-white/40">
                  Manage your account
                </p>
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
