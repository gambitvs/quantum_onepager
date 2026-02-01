import { describe, it, expect } from "vitest";
import {
  calculateRegime,
  detectAnomalies,
  type LiveTicker,
} from "@/app/lib/market-data";

describe("Market Data Service", () => {
  describe("calculateRegime", () => {
    it("returns RISK_ON when VIX is low and breadth is high", () => {
      const regime = calculateRegime(12, 0.7);
      expect(regime.regime).toBe("RISK_ON");
      expect(regime.confidence).toBeGreaterThan(0.5);
    });

    it("returns RISK_OFF when VIX is high", () => {
      const regime = calculateRegime(35, 0.3);
      expect(regime.regime).toBe("RISK_OFF");
    });

    it("returns TRANSITIONAL when VIX is moderate", () => {
      const regime = calculateRegime(22, 0.5);
      expect(regime.regime).toBe("TRANSITIONAL");
    });

    it("includes VIX value in regime result", () => {
      const regime = calculateRegime(18.5, 0.6);
      expect(regime.vix).toBe(18.5);
    });
  });

  describe("detectAnomalies", () => {
    const mockTickers: LiveTicker[] = [
      {
        symbol: "SPY",
        price: 500,
        change: 25,
        changePercent: 5.2,
        volume: 100000000,
        high: 502,
        low: 495,
        open: 498,
        previousClose: 475,
        timestamp: Date.now(),
        category: "etf",
      },
    ];

    const historicalVol = new Map([["SPY", 1.2]]);

    it("returns an array of anomalies", () => {
      const anomalies = detectAnomalies(mockTickers, historicalVol);
      expect(Array.isArray(anomalies)).toBe(true);
    });

    it("anomalies have required fields when detected", () => {
      // Run multiple times since detection uses randomness
      for (let i = 0; i < 10; i++) {
        const anomalies = detectAnomalies(mockTickers, historicalVol);
        for (const anomaly of anomalies) {
          expect(anomaly).toHaveProperty("id");
          expect(anomaly).toHaveProperty("type");
          expect(anomaly).toHaveProperty("asset");
          expect(anomaly).toHaveProperty("severity");
          expect(["LOW", "MEDIUM", "HIGH"]).toContain(anomaly.severity);
        }
      }
    });

    it("handles empty ticker array", () => {
      const anomalies = detectAnomalies([], historicalVol);
      expect(anomalies).toEqual([]);
    });

    it("handles missing historical volatility data", () => {
      const anomalies = detectAnomalies(mockTickers, new Map());
      expect(Array.isArray(anomalies)).toBe(true);
    });
  });
});
