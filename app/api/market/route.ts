import { NextResponse } from "next/server";
import {
  fetchAllTickers,
  calculateRegime,
  detectAnomalies,
  generateOrderFlow,
  type LiveTicker,
} from "@/app/lib/market-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// In-memory cache for rate limiting
let cache: {
  tickers: LiveTicker[];
  timestamp: number;
} | null = null;

const CACHE_TTL = 10000; // 10 seconds

export async function GET() {
  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      const vixTicker = cache.tickers.find((t) => t.symbol === "VIX");
      const breadth =
        cache.tickers.filter((t) => t.changePercent > 0).length /
        cache.tickers.length;

      return NextResponse.json({
        tickers: cache.tickers,
        regime: calculateRegime(vixTicker?.price || 15, breadth),
        anomalies: detectAnomalies(cache.tickers, new Map()),
        orderFlow: generateOrderFlow(cache.tickers),
        cached: true,
        timestamp: cache.timestamp,
      });
    }

    // Fetch fresh data
    const tickers = await fetchAllTickers();

    // If we got no data (no API keys), use fallback
    if (tickers.length === 0) {
      return NextResponse.json({
        tickers: getFallbackTickers(),
        regime: {
          regime: "RISK_ON",
          confidence: 0.75,
          vix: 14.5,
          breadth: 0.65,
          momentum: 1,
        },
        anomalies: [],
        orderFlow: [],
        cached: false,
        fallback: true,
        timestamp: Date.now(),
      });
    }

    // Update cache
    cache = { tickers, timestamp: Date.now() };

    const vixTicker = tickers.find((t) => t.symbol === "VIX");
    const breadth =
      tickers.filter((t) => t.changePercent > 0).length / tickers.length;

    return NextResponse.json({
      tickers,
      regime: calculateRegime(vixTicker?.price || 15, breadth),
      anomalies: detectAnomalies(tickers, new Map()),
      orderFlow: generateOrderFlow(tickers),
      cached: false,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Market data fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 },
    );
  }
}

// Fallback data when no API keys are configured
function getFallbackTickers(): LiveTicker[] {
  const now = Date.now();
  return [
    {
      symbol: "NVDA",
      price: 892.34,
      change: 21.42,
      changePercent: 2.46,
      volume: 45230000,
      high: 898.12,
      low: 871.23,
      open: 870.92,
      previousClose: 870.92,
      timestamp: now,
      category: "equity",
    },
    {
      symbol: "AAPL",
      price: 187.42,
      change: 1.54,
      changePercent: 0.83,
      volume: 52100000,
      high: 188.94,
      low: 185.67,
      open: 185.88,
      previousClose: 185.88,
      timestamp: now,
      category: "equity",
    },
    {
      symbol: "MSFT",
      price: 402.18,
      change: 4.51,
      changePercent: 1.13,
      volume: 21340000,
      high: 404.23,
      low: 397.12,
      open: 397.67,
      previousClose: 397.67,
      timestamp: now,
      category: "equity",
    },
    {
      symbol: "GOOGL",
      price: 142.87,
      change: -0.49,
      changePercent: -0.34,
      volume: 18920000,
      high: 144.12,
      low: 141.89,
      open: 143.36,
      previousClose: 143.36,
      timestamp: now,
      category: "equity",
    },
    {
      symbol: "TSLA",
      price: 248.92,
      change: -4.72,
      changePercent: -1.86,
      volume: 89210000,
      high: 256.34,
      low: 246.12,
      open: 253.64,
      previousClose: 253.64,
      timestamp: now,
      category: "equity",
    },
    {
      symbol: "BTC",
      price: 67432,
      change: -554,
      changePercent: -0.82,
      volume: 28400000000,
      high: 68234,
      low: 66890,
      open: 67986,
      previousClose: 67986,
      timestamp: now,
      category: "crypto",
    },
    {
      symbol: "ETH",
      price: 3421,
      change: 42,
      changePercent: 1.24,
      volume: 12800000000,
      high: 3467,
      low: 3378,
      open: 3379,
      previousClose: 3379,
      timestamp: now,
      category: "crypto",
    },
    {
      symbol: "SOL",
      price: 124.87,
      change: 4.12,
      changePercent: 3.41,
      volume: 2340000000,
      high: 126.34,
      low: 120.12,
      open: 120.75,
      previousClose: 120.75,
      timestamp: now,
      category: "crypto",
    },
    {
      symbol: "SPY",
      price: 478.23,
      change: 2.14,
      changePercent: 0.45,
      volume: 67890000,
      high: 479.12,
      low: 475.34,
      open: 476.09,
      previousClose: 476.09,
      timestamp: now,
      category: "etf",
    },
    {
      symbol: "QQQ",
      price: 412.87,
      change: 3.78,
      changePercent: 0.92,
      volume: 34210000,
      high: 414.23,
      low: 408.67,
      open: 409.09,
      previousClose: 409.09,
      timestamp: now,
      category: "etf",
    },
    {
      symbol: "VIX",
      price: 14.2,
      change: -0.79,
      changePercent: -5.27,
      volume: 0,
      high: 15.34,
      low: 13.89,
      open: 14.99,
      previousClose: 14.99,
      timestamp: now,
      category: "macro",
    },
    {
      symbol: "GLD",
      price: 187.42,
      change: -0.22,
      changePercent: -0.12,
      volume: 8920000,
      high: 188.12,
      low: 186.89,
      open: 187.64,
      previousClose: 187.64,
      timestamp: now,
      category: "etf",
    },
    {
      symbol: "TLT",
      price: 92.34,
      change: 0.31,
      changePercent: 0.34,
      volume: 12340000,
      high: 92.89,
      low: 91.67,
      open: 92.03,
      previousClose: 92.03,
      timestamp: now,
      category: "etf",
    },
  ];
}
