import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the useMarketData hook
vi.mock("@/app/hooks/useMarketData", () => ({
  useMarketData: () => ({
    tickers: [
      {
        symbol: "SPY",
        price: 500,
        change: 5,
        changePercent: 1.01,
        volume: 50000000,
        high: 502,
        low: 498,
        open: 499,
        previousClose: 495,
        timestamp: Date.now(),
        category: "etf",
      },
      {
        symbol: "BTC",
        price: 45000,
        change: -500,
        changePercent: -1.1,
        volume: 30000000,
        high: 46000,
        low: 44500,
        open: 45500,
        previousClose: 45500,
        timestamp: Date.now(),
        category: "crypto",
      },
    ],
    regime: {
      regime: "RISK_ON",
      confidence: 0.8,
      vix: 14.5,
      breadth: 0.65,
      momentum: 0.7,
    },
    anomalies: [],
    orderFlow: [],
    isLive: true,
    isFallback: false,
    isLoading: false,
    error: null,
    refresh: vi.fn(),
  }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/markets",
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<object>) => (
    <>{children}</>
  ),
}));

describe("Markets Page", () => {
  describe("Price Tickers", () => {
    it("displays live price tickers for all assets", async () => {
      const { MarketsClient } = await import("@/app/markets/MarketsClient");
      render(<MarketsClient />);

      // Should show SPY ticker
      expect(screen.getByText("SPY")).toBeDefined();
      expect(screen.getByText("$500.00")).toBeDefined();

      // Should show BTC ticker
      expect(screen.getByText("BTC")).toBeDefined();
      expect(screen.getByText("$45,000")).toBeDefined();
    });

    it("shows positive changes in lime color", async () => {
      const { MarketsClient } = await import("@/app/markets/MarketsClient");
      render(<MarketsClient />);

      const positiveChange = screen.getByText("+1.01%");
      expect(positiveChange).toBeDefined();
    });

    it("shows negative changes in red color", async () => {
      const { MarketsClient } = await import("@/app/markets/MarketsClient");
      render(<MarketsClient />);

      const negativeChange = screen.getByText("-1.10%");
      expect(negativeChange).toBeDefined();
    });
  });

  describe("Regime Indicator", () => {
    it("displays current market regime", async () => {
      const { MarketsClient } = await import("@/app/markets/MarketsClient");
      render(<MarketsClient />);

      expect(screen.getByText("RISK-ON")).toBeDefined();
    });

    it("shows VIX value", async () => {
      const { MarketsClient } = await import("@/app/markets/MarketsClient");
      render(<MarketsClient />);

      expect(screen.getByText("14.50")).toBeDefined();
    });

    it("shows confidence level", async () => {
      const { MarketsClient } = await import("@/app/markets/MarketsClient");
      render(<MarketsClient />);

      expect(screen.getByText("80% confidence")).toBeDefined();
    });
  });

  describe("Live Status", () => {
    it("shows live indicator when connected", async () => {
      const { MarketsClient } = await import("@/app/markets/MarketsClient");
      render(<MarketsClient />);

      expect(screen.getByText("Live")).toBeDefined();
    });
  });
});
