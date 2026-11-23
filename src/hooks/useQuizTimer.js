import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom Hook: useQuizTimer
 * @param {number} duration  - წამების რაოდენობა
 * @param {object} options
 *   - onExpire: ფუნქცია, რომელიც გამოიძახება დროის ამოწურვისას
 *   - autoStart: ავტომატურად დაიწყოს თუ არა (default: true)
 * @returns {{ timeLeft, isRunning, progress, start, pause, reset }}
 */
export function useQuizTimer(duration, { onExpire, autoStart = true } = {}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const expireRef = useRef(onExpire);

  // ყოველთვის ბოლო onExpire-ს ვიყენებთ, interval-ის თავიდან შექმნის გარეშე
  useEffect(() => {
    expireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // დროის ამოწურვის დეტექტორი
  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      expireRef.current?.();
    }
  }, [timeLeft, isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(
    (newDuration = duration, run = true) => {
      setTimeLeft(newDuration);
      setIsRunning(run);
    },
    [duration]
  );

  return {
    timeLeft,
    isRunning,
    progress: duration > 0 ? timeLeft / duration : 0,
    start,
    pause,
    reset,
  };
}
