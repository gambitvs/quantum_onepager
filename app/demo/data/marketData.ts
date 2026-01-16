export interface Ticker {
  symbol: string;
  price: number;
  change: number;
  category: "equity" | "crypto" | "etf" | "macro";
}

export interface Anomaly {
  id: string;
  type: string;
  asset: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  timestamp: string;
}

export interface MarketState {
  regime: "RISK_ON" | "RISK_OFF" | "TRANSITIONAL" | "UNCERTAIN";
  uncertainty: number;
  anomalyCount: number;
}

export const baseTickers: Ticker[] = [
  { symbol: "NVDA", price: 892.34, change: 2.34, category: "equity" },
  { symbol: "AAPL", price: 187.42, change: 0.82, category: "equity" },
  { symbol: "MSFT", price: 402.18, change: 1.12, category: "equity" },
  { symbol: "GOOGL", price: 142.87, change: -0.34, category: "equity" },
  { symbol: "TSLA", price: 248.92, change: -1.87, category: "equity" },
  { symbol: "BTC", price: 67432, change: -0.82, category: "crypto" },
  { symbol: "ETH", price: 3421, change: 1.24, category: "crypto" },
  { symbol: "SOL", price: 124.87, change: 3.42, category: "crypto" },
  { symbol: "SPY", price: 478.23, change: 0.45, category: "etf" },
  { symbol: "QQQ", price: 412.87, change: 0.92, category: "etf" },
  { symbol: "VIX", price: 14.2, change: -5.23, category: "macro" },
  { symbol: "GLD", price: 187.42, change: -0.12, category: "macro" },
  { symbol: "TLT", price: 92.34, change: 0.34, category: "macro" },
];

export const anomalies: Anomaly[] = [
  {
    id: "anom-1",
    type: "IV_SPIKE",
    asset: "NVDA",
    severity: "HIGH",
    description: "Implied vol +18% in 2h ahead of earnings",
    timestamp: "2026-01-14T14:32:00Z",
  },
  {
    id: "anom-2",
    type: "VOLUME_SURGE",
    asset: "BTC",
    severity: "MEDIUM",
    description: "3.2x average volume on Coinbase",
    timestamp: "2026-01-14T14:28:00Z",
  },
  {
    id: "anom-3",
    type: "CORRELATION_BREAK",
    asset: "SPY/TLT",
    severity: "MEDIUM",
    description: "30d correlation broke below -0.3",
    timestamp: "2026-01-14T14:15:00Z",
  },
];

export const initialMarketState: MarketState = {
  regime: "RISK_ON",
  uncertainty: 0.82,
  anomalyCount: 3,
};

// Simulate price changes
export function simulatePriceChange(ticker: Ticker): Ticker {
  const volatility = ticker.category === "crypto" ? 0.005 : 0.001;
  const delta = (Math.random() - 0.5) * 2 * volatility;
  const newPrice = ticker.price * (1 + delta);
  const newChange = ticker.change + delta * 100;

  return {
    ...ticker,
    price: Math.round(newPrice * 100) / 100,
    change: Math.round(newChange * 100) / 100,
  };
}

export interface TradeDecision {
  tradeNumber: number;
  action: "BUY" | "SELL";
  asset: string;
  price: number;
  confidence: number;
  outcome: number;
  analysis: {
    entryTiming: "OPTIMAL" | "EARLY" | "LATE";
    positionSizing: string;
    exitTiming: string;
  };
  modelUpdate: {
    layer: string;
    weightDelta: number;
    newConfidence: number;
  };
}

export const tradeDecisions: TradeDecision[] = [
  {
    tradeNumber: 12847,
    action: "BUY",
    asset: "NVDA",
    price: 892.34,
    confidence: 78,
    outcome: 2.1,
    analysis: {
      entryTiming: "OPTIMAL",
      positionSizing: "+12% ADJ NEEDED",
      exitTiming: "EARLY (-0.4% left on table)",
    },
    modelUpdate: {
      layer: "encoder.layer[4]",
      weightDelta: 0.0023,
      newConfidence: 81,
    },
  },
  {
    tradeNumber: 12846,
    action: "SELL",
    asset: "BTC",
    price: 68421,
    confidence: 82,
    outcome: -0.8,
    analysis: {
      entryTiming: "LATE",
      positionSizing: "CORRECT",
      exitTiming: "STOP LOSS TRIGGERED",
    },
    modelUpdate: {
      layer: "decoder.attn[2]",
      weightDelta: -0.0018,
      newConfidence: 79,
    },
  },
  {
    tradeNumber: 12845,
    action: "BUY",
    asset: "AAPL",
    price: 186.23,
    confidence: 71,
    outcome: 1.4,
    analysis: {
      entryTiming: "OPTIMAL",
      positionSizing: "CORRECT",
      exitTiming: "TARGET REACHED",
    },
    modelUpdate: {
      layer: "encoder.layer[2]",
      weightDelta: 0.0012,
      newConfidence: 74,
    },
  },
];
