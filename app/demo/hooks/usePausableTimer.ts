"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UsePausableTimerOptions {
  duration: number;
  onComplete?: () => void;
  autoStart?: boolean;
  loop?: boolean;
}

export function usePausableTimer({
  duration,
  onComplete,
  autoStart = true,
  loop = false,
}: UsePausableTimerOptions) {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  const pause = useCallback(() => {
    setIsPaused(true);
    pausedAtRef.current = elapsed;
  }, [elapsed]);

  const resume = useCallback(() => {
    setIsPaused(false);
    startTimeRef.current = Date.now() - pausedAtRef.current;
  }, []);

  const toggle = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);

  const reset = useCallback(() => {
    setElapsed(0);
    setIsComplete(false);
    pausedAtRef.current = 0;
    startTimeRef.current = Date.now();
    if (autoStart) {
      setIsPaused(false);
    }
  }, [autoStart]);

  useEffect(() => {
    if (isPaused || isComplete) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    startTimeRef.current = Date.now() - elapsed;

    intervalRef.current = setInterval(() => {
      const newElapsed = Date.now() - startTimeRef.current;

      if (newElapsed >= duration) {
        setElapsed(duration);
        setIsComplete(true);
        onComplete?.();

        if (loop) {
          setTimeout(() => {
            reset();
          }, 100);
        }
      } else {
        setElapsed(newElapsed);
      }
    }, 16); // ~60fps

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isComplete, duration, onComplete, loop, elapsed, reset]);

  const progress = Math.min(elapsed / duration, 1);
  const remaining = Math.max(duration - elapsed, 0);

  return {
    elapsed,
    progress,
    remaining,
    isPaused,
    isComplete,
    pause,
    resume,
    toggle,
    reset,
  };
}
