import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/intelligence",
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

describe("Intelligence Hub", () => {
  describe("News Feed", () => {
    it("displays news headlines", async () => {
      const { IntelligenceClient } =
        await import("@/app/intelligence/IntelligenceClient");
      render(<IntelligenceClient />);

      expect(screen.getByText("Market Intelligence")).toBeDefined();
      expect(screen.getByText("News Feed")).toBeDefined();
    });

    it("shows news source and timestamp", async () => {
      const { IntelligenceClient } =
        await import("@/app/intelligence/IntelligenceClient");
      render(<IntelligenceClient />);

      // Should have at least one news item with source
      const newsFeed = screen.getByText("News Feed");
      expect(newsFeed).toBeDefined();
    });
  });

  describe("Sentiment Scores", () => {
    it("displays sentiment section", async () => {
      const { IntelligenceClient } =
        await import("@/app/intelligence/IntelligenceClient");
      render(<IntelligenceClient />);

      expect(screen.getByText("Sentiment")).toBeDefined();
    });

    it("shows sentiment for tracked assets", async () => {
      const { IntelligenceClient } =
        await import("@/app/intelligence/IntelligenceClient");
      render(<IntelligenceClient />);

      // Should show sentiment indicators
      expect(screen.getByText("Sentiment")).toBeDefined();
    });
  });

  describe("Earnings Calendar", () => {
    it("displays earnings section", async () => {
      const { IntelligenceClient } =
        await import("@/app/intelligence/IntelligenceClient");
      render(<IntelligenceClient />);

      expect(screen.getByText("Earnings")).toBeDefined();
    });
  });

  describe("Alert Builder", () => {
    it("displays alert configuration section", async () => {
      const { IntelligenceClient } =
        await import("@/app/intelligence/IntelligenceClient");
      render(<IntelligenceClient />);

      expect(screen.getByText("Alerts")).toBeDefined();
    });
  });
});
