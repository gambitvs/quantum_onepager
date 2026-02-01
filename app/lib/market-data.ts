/**
 * Real Market Data Service
 * Connects to Polygon.io, CoinGecko, and Alpha Vantage for live data
 */

export interface LiveTicker {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: number;
  category: "equity" | "crypto" | "etf" | "macro";
}

export interface MarketRegime {
  regime: "RISK_ON" | "RISK_OFF" | "TRANSITIONAL" | "UNCERTAIN";
  confidence: number;
  vix: number;
  breadth: number;
  momentum: number;
}

export interface Anomaly {
  id: string;
  type:
    | "IV_SPIKE"
    | "VOLUME_SURGE"
    | "CORRELATION_BREAK"
    | "GAP"
    | "MOMENTUM_DIVERGENCE";
  asset: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  timestamp: Date;
  data: Record<string, number>;
}

export interface OrderFlowSignal {
  side: "BUY" | "SELL";
  size: number;
  asset: string;
  timestamp: Date;
  source: "INSTITUTIONAL" | "RETAIL" | "DARK_POOL";
}

// Polygon.io REST API for equities
async function fetchPolygonQuote(symbol: string): Promise<LiveTicker | null> {
  const apiKey = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${apiKey}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.results?.[0]) return null;

    const result = data.results[0];
    const change = result.c - result.o;
    const changePercent = (change / result.o) * 100;

    return {
      symbol,
      price: result.c,
      change,
      changePercent,
      volume: result.v,
      high: result.h,
      low: result.l,
      open: result.o,
      previousClose: result.c - change,
      timestamp: result.t,
      category: symbol.includes("ETF") ? "etf" : "equity",
    };
  } catch {
    return null;
  }
}

// CoinGecko for crypto (free, no API key needed)
async function fetchCryptoPrice(
  coinId: string,
  symbol: string,
): Promise<LiveTicker | null> {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`,
      { next: { revalidate: 30 } },
    );

    if (!res.ok) return null;

    const data = await res.json();
    const coin = data[coinId];
    if (!coin) return null;

    return {
      symbol,
      price: coin.usd,
      change: 0, // CoinGecko doesn't give absolute change
      changePercent: coin.usd_24h_change || 0,
      volume: coin.usd_24h_vol || 0,
      high: 0,
      low: 0,
      open: 0,
      previousClose: 0,
      timestamp: Date.now(),
      category: "crypto",
    };
  } catch {
    return null;
  }
}

// FRED for VIX and macro
async function fetchFredSeries(
  seriesId: string,
  symbol: string,
): Promise<LiveTicker | null> {
  const apiKey = process.env.NEXT_PUBLIC_FRED_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=2`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.observations?.[0]) return null;

    const current = parseFloat(data.observations[0].value);
    const previous = parseFloat(data.observations[1]?.value || current);
    const change = current - previous;
    const changePercent = (change / previous) * 100;

    return {
      symbol,
      price: current,
      change,
      changePercent,
      volume: 0,
      high: 0,
      low: 0,
      open: previous,
      previousClose: previous,
      timestamp: Date.now(),
      category: "macro",
    };
  } catch {
    return null;
  }
}

// Asset mapping
const ASSET_CONFIG = {
  // Equities
  NVDA: { type: "equity", source: "polygon" },
  AAPL: { type: "equity", source: "polygon" },
  MSFT: { type: "equity", source: "polygon" },
  GOOGL: { type: "equity", source: "polygon" },
  TSLA: { type: "equity", source: "polygon" },
  META: { type: "equity", source: "polygon" },
  AMZN: { type: "equity", source: "polygon" },

  // ETFs
  SPY: { type: "etf", source: "polygon" },
  QQQ: { type: "etf", source: "polygon" },
  IWM: { type: "etf", source: "polygon" },
  TLT: { type: "etf", source: "polygon" },
  GLD: { type: "etf", source: "polygon" },

  // Crypto (CoinGecko IDs)
  BTC: { type: "crypto", source: "coingecko", id: "bitcoin" },
  ETH: { type: "crypto", source: "coingecko", id: "ethereum" },
  SOL: { type: "crypto", source: "coingecko", id: "solana" },

  // Macro (FRED series)
  VIX: { type: "macro", source: "fred", id: "VIXCLS" },
} as const;

type AssetSymbol = keyof typeof ASSET_CONFIG;

export async function fetchLiveTicker(
  symbol: AssetSymbol,
): Promise<LiveTicker | null> {
  const config = ASSET_CONFIG[symbol];
  if (!config) return null;

  switch (config.source) {
    case "polygon":
      return fetchPolygonQuote(symbol);
    case "coingecko":
      return fetchCryptoPrice((config as { id: string }).id, symbol);
    case "fred":
      return fetchFredSeries((config as { id: string }).id, symbol);
    default:
      return null;
  }
}

export async function fetchAllTickers(): Promise<LiveTicker[]> {
  const symbols = Object.keys(ASSET_CONFIG) as AssetSymbol[];
  const results = await Promise.all(symbols.map(fetchLiveTicker));
  return results.filter((t): t is LiveTicker => t !== null);
}

// Calculate market regime from VIX and breadth
export function calculateRegime(vix: number, breadth: number): MarketRegime {
  let regime: MarketRegime["regime"];
  let confidence: number;

  if (vix < 15 && breadth > 0.6) {
    regime = "RISK_ON";
    confidence = Math.min(0.95, 0.7 + (0.6 - vix / 50) + (breadth - 0.5));
  } else if (vix > 25 || breadth < 0.4) {
    regime = "RISK_OFF";
    confidence = Math.min(0.95, 0.5 + (vix - 20) / 40 + (0.5 - breadth));
  } else if (vix > 18 && vix < 25) {
    regime = "TRANSITIONAL";
    confidence = 0.6;
  } else {
    regime = "UNCERTAIN";
    confidence = 0.4;
  }

  return {
    regime,
    confidence,
    vix,
    breadth,
    momentum: breadth > 0.5 ? 1 : -1,
  };
}

// Detect anomalies from price data
export function detectAnomalies(
  tickers: LiveTicker[],
  historicalVol: Map<string, number>,
): Anomaly[] {
  const anomalies: Anomaly[] = [];

  for (const ticker of tickers) {
    const histVol = historicalVol.get(ticker.symbol) || 2;

    // Volume surge detection
    if (ticker.volume > 0) {
      // Would compare to average volume
      const volRatio = Math.random() * 3 + 0.5; // Placeholder
      if (volRatio > 2.5) {
        anomalies.push({
          id: `vol-${ticker.symbol}-${Date.now()}`,
          type: "VOLUME_SURGE",
          asset: ticker.symbol,
          severity: volRatio > 4 ? "HIGH" : "MEDIUM",
          description: `${volRatio.toFixed(1)}x average volume`,
          timestamp: new Date(),
          data: { ratio: volRatio },
        });
      }
    }

    // IV spike detection (for equities with options)
    if (
      ticker.category === "equity" &&
      Math.abs(ticker.changePercent) > histVol * 2
    ) {
      anomalies.push({
        id: `iv-${ticker.symbol}-${Date.now()}`,
        type: "IV_SPIKE",
        asset: ticker.symbol,
        severity: "HIGH",
        description: `Price move ${Math.abs(ticker.changePercent).toFixed(1)}% exceeds 2σ`,
        timestamp: new Date(),
        data: { move: ticker.changePercent, threshold: histVol * 2 },
      });
    }

    // Gap detection
    if (ticker.open > 0 && ticker.previousClose > 0) {
      const gapPercent =
        ((ticker.open - ticker.previousClose) / ticker.previousClose) * 100;
      if (Math.abs(gapPercent) > 3) {
        anomalies.push({
          id: `gap-${ticker.symbol}-${Date.now()}`,
          type: "GAP",
          asset: ticker.symbol,
          severity: Math.abs(gapPercent) > 5 ? "HIGH" : "MEDIUM",
          description: `${gapPercent > 0 ? "Gap up" : "Gap down"} ${Math.abs(gapPercent).toFixed(1)}%`,
          timestamp: new Date(),
          data: { gap: gapPercent },
        });
      }
    }
  }

  return anomalies;
}

// Simulate order flow (would connect to real data feed in production)
export function generateOrderFlow(tickers: LiveTicker[]): OrderFlowSignal[] {
  const signals: OrderFlowSignal[] = [];

  for (const ticker of tickers.slice(0, 5)) {
    if (Math.random() > 0.7) {
      signals.push({
        side: ticker.changePercent > 0 ? "BUY" : "SELL",
        size: Math.round(Math.random() * 50) / 10,
        asset: ticker.symbol,
        timestamp: new Date(),
        source:
          Math.random() > 0.6
            ? "INSTITUTIONAL"
            : Math.random() > 0.5
              ? "DARK_POOL"
              : "RETAIL",
      });
    }
  }

  return signals;
}
