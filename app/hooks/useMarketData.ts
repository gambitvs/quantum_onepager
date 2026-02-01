"use client";

import useSWR from "swr";
import type {
  LiveTicker,
  MarketRegime,
  Anomaly,
  OrderFlowSignal,
} from "@/app/lib/market-data";

interface MarketDataResponse {
  tickers: LiveTicker[];
  regime: MarketRegime;
  anomalies: Anomaly[];
  orderFlow: OrderFlowSignal[];
  cached: boolean;
  fallback?: boolean;
  timestamp: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useMarketData(refreshInterval = 10000) {
  const { data, error, isLoading, mutate } = useSWR<MarketDataResponse>(
    "/api/market",
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    },
  );

  return {
    tickers: data?.tickers || [],
    regime: data?.regime || {
      regime: "UNCERTAIN" as const,
      confidence: 0,
      vix: 0,
      breadth: 0,
      momentum: 0,
    },
    anomalies: data?.anomalies || [],
    orderFlow: data?.orderFlow || [],
    isLive: !data?.fallback && !data?.cached,
    isFallback: data?.fallback || false,
    timestamp: data?.timestamp || 0,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
}

export function useTicker(symbol: string, refreshInterval = 5000) {
  const { tickers, isLoading, isError } = useMarketData(refreshInterval);
  const ticker = tickers.find((t) => t.symbol === symbol);

  return {
    ticker,
    isLoading,
    isError,
  };
}

export function useRegime(refreshInterval = 30000) {
  const { regime, isLoading, isError } = useMarketData(refreshInterval);

  return {
    regime,
    isRiskOn: regime.regime === "RISK_ON",
    isRiskOff: regime.regime === "RISK_OFF",
    isLoading,
    isError,
  };
}

export function useAnomalies(refreshInterval = 10000) {
  const { anomalies, isLoading, isError } = useMarketData(refreshInterval);

  return {
    anomalies,
    hasHighSeverity: anomalies.some((a) => a.severity === "HIGH"),
    count: anomalies.length,
    isLoading,
    isError,
  };
}
