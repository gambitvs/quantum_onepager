export interface ResearchStream {
  id: string;
  name: string;
  category: string;
  hypothesis: string;
  backtest: {
    sharpe: number;
    winRate: number;
    maxDrawdown: number;
    trades: number;
  };
  liveTest: {
    pnl: number;
    duration: string;
    trades: number;
    startDate: string;
  };
  deployStatus: "STAGED" | "ACTIVE" | "PENDING" | "REJECTED";
  statusReason?: string;
}

export const researchStreams: ResearchStream[] = [
  {
    id: "mean-reversion-crypto",
    name: "Mean Reversion",
    category: "Crypto",
    hypothesis:
      "BTC/ETH ratio reverts to 20-day MA within 4h when deviation exceeds 2σ",
    backtest: {
      sharpe: 2.14,
      winRate: 67.3,
      maxDrawdown: -8.2,
      trades: 847,
    },
    liveTest: {
      pnl: 3.42,
      duration: "72h",
      trades: 12,
      startDate: "2026-01-11",
    },
    deployStatus: "STAGED",
    statusReason: "Awaiting confirmation",
  },
  {
    id: "sentiment-alpha-equities",
    name: "Sentiment Alpha",
    category: "Equities",
    hypothesis:
      "Twitter sentiment divergence leads price movement by 4h on mega-caps",
    backtest: {
      sharpe: 1.82,
      winRate: 58.1,
      maxDrawdown: -12.1,
      trades: 1243,
    },
    liveTest: {
      pnl: 1.23,
      duration: "48h",
      trades: 8,
      startDate: "2026-01-12",
    },
    deployStatus: "ACTIVE",
    statusReason: "Position: LONG AAPL",
  },
  {
    id: "volatility-arbitrage-options",
    name: "Volatility Arbitrage",
    category: "Options",
    hypothesis: "IV overestimates RV by 15%+ in 72h pre-earnings window",
    backtest: {
      sharpe: 3.21,
      winRate: 74.2,
      maxDrawdown: -5.1,
      trades: 312,
    },
    liveTest: {
      pnl: 5.71,
      duration: "96h",
      trades: 4,
      startDate: "2026-01-10",
    },
    deployStatus: "PENDING",
    statusReason: "Awaiting risk review",
  },
  {
    id: "cross-asset-momentum",
    name: "Cross-Asset Momentum",
    category: "Macro",
    hypothesis: "Gold price leads risk-off rotation by 2h with 0.7 correlation",
    backtest: {
      sharpe: 1.42,
      winRate: 52.8,
      maxDrawdown: -18.3,
      trades: 567,
    },
    liveTest: {
      pnl: -0.82,
      duration: "24h",
      trades: 3,
      startDate: "2026-01-13",
    },
    deployStatus: "REJECTED",
    statusReason: "Insufficient edge (Sharpe < 1.5)",
  },
];

export const getStreamById = (id: string) =>
  researchStreams.find((s) => s.id === id);
