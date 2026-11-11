import { useEffect, useState } from "react";

const TIMER_KEY = "magnertia_offer_target_date";
const DEFAULT_DURATION_MS = (12 * 24 * 60 * 60 + 18 * 60 * 60 + 59 * 60 + 32) * 1000;

function getTargetTimestamp(): number {
  if (typeof window === "undefined") {
    return Date.now() + DEFAULT_DURATION_MS;
  }
  try {
    const stored = localStorage.getItem(TIMER_KEY);
    if (!stored) {
      const target = Date.now() + DEFAULT_DURATION_MS;
      localStorage.setItem(TIMER_KEY, target.toString());
      return target;
    }
    return parseInt(stored, 10) || Date.now() + DEFAULT_DURATION_MS;
  } catch {
    return Date.now() + DEFAULT_DURATION_MS;
  }
}

export function usePersistentTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 18, minutes: 59, seconds: 32 });

  useEffect(() => {
    const target = getTargetTimestamp();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
