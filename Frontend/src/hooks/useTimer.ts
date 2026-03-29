// Reusable countdown timer hook used by FocusModeScreen and CalmingExercisesScreen.
//
// Usage:
//   const { timeLeft, isRunning, toggle, reset, formatTime, isComplete } = useTimer(300);

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  formatTime: () => string;
  isComplete: boolean;
}

export const useTimer = (
  initialSeconds: number,
  onComplete?: () => void,
): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = useCallback(() => {
    if (timeLeft > 0) setIsRunning(true);
  }, [timeLeft]);
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);
  const toggle = useCallback(() => {
    if (timeLeft === 0) {
      setTimeLeft(initialSeconds);
      setIsRunning(true);
    } else setIsRunning(prev => !prev);
  }, [timeLeft, initialSeconds]);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);
  const formatTime = useCallback(() => {
    const m = Math.floor(timeLeft / 60),
      sec = timeLeft % 60;
    return `${m.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  }, [timeLeft]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    toggle,
    reset,
    formatTime,
    isComplete: timeLeft === 0,
  };
};
