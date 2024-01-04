import { useEffect, useState, useCallback, useRef } from 'react';

export interface UseTimerOptions {
  autoStart?: boolean;
  interval?: number;
  onFinish?: () => void;
  onStart?: () => void;
}

export interface UseTimerReturn {
  currentTime: number;
  start: () => void;
  isRunning: boolean;
  pause: () => void;
}

const useTimer: (time: number, options?: UseTimerOptions) => UseTimerReturn = (
  time,
  { autoStart = false, interval = 1000, onFinish, onStart } = {}
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentTime, setCurrentTime] = useState(time);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [paused, setPaused] = useState(false);

  const start = useCallback(() => {
    if (onStart) {
      onStart();
    }
    if (timeoutRef.current && currentTime !== time) {
      clearTimeout(timeoutRef.current);
    }
    if (!paused) {
      setCurrentTime(time);
    }
    setIsRunning(true);
    setPaused(false);
  }, [currentTime, onStart, paused, time]);

  const pause = useCallback(() => {
    if (timeoutRef.current && currentTime !== time) {
      clearTimeout(timeoutRef.current);
    }
    setIsRunning(false);
    setPaused(true);
  }, [currentTime, time]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    if (currentTime > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (currentTime > 0) {
          setCurrentTime((time) => time - 1);
        }
      }, interval);
    } else {
      setIsRunning(false);
      if (onFinish) {
        onFinish();
      }
    }
  }, [currentTime, isRunning, interval, time, onFinish]);

  return { currentTime, start, isRunning, pause };
};

/** @deprecated default export is deprecated, instead import { useTimer } from '@gabrielyotoo/react-use-timer' */
const DEFAULT_EXPORT = useTimer;

export { useTimer };
export default DEFAULT_EXPORT;
