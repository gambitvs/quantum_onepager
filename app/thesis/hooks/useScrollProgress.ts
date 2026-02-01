"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollProgress {
  progress: number; // 0-1 overall progress
  scrollY: number;
  viewportHeight: number;
  documentHeight: number;
  currentAct: number; // 1-7
  actProgress: number; // 0-1 within current act
}

const ACT_BOUNDARIES = [
  { start: 0, end: 0.15 }, // Act 1: Opportunity
  { start: 0.15, end: 0.3 }, // Act 2: Problem
  { start: 0.3, end: 0.5 }, // Act 3: Organism
  { start: 0.5, end: 0.65 }, // Act 4: Network
  { start: 0.65, end: 0.8 }, // Act 5: Signal
  { start: 0.8, end: 0.95 }, // Act 6: Deep Dive
  { start: 0.95, end: 1.0 }, // Act 7: Ask
];

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    viewportHeight: 0,
    documentHeight: 0,
    currentAct: 1,
    actProgress: 0,
  });

  const rafRef = useRef<number | null>(null);

  const calculateProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight =
      document.documentElement.scrollHeight - viewportHeight;
    const overallProgress = documentHeight > 0 ? scrollY / documentHeight : 0;

    // Determine current act
    let currentAct = 1;
    let actProgress = 0;

    for (let i = 0; i < ACT_BOUNDARIES.length; i++) {
      const { start, end } = ACT_BOUNDARIES[i];
      if (overallProgress >= start && overallProgress < end) {
        currentAct = i + 1;
        actProgress = (overallProgress - start) / (end - start);
        break;
      }
      if (overallProgress >= end && i === ACT_BOUNDARIES.length - 1) {
        currentAct = 7;
        actProgress = 1;
      }
    }

    setProgress({
      progress: overallProgress,
      scrollY,
      viewportHeight,
      documentHeight,
      currentAct,
      actProgress,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(calculateProgress);
    };

    calculateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateProgress);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateProgress]);

  return progress;
}

export function getActProgress(
  overallProgress: number,
  actIndex: number,
): number {
  const { start, end } = ACT_BOUNDARIES[actIndex];
  if (overallProgress < start) return 0;
  if (overallProgress > end) return 1;
  return (overallProgress - start) / (end - start);
}

export { ACT_BOUNDARIES };
