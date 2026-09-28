import { useState, useEffect, useCallback } from "react";
import { EVENT_CONFIG } from "../config/eventConfig";

export function useCountdown() {
  const targetTime = new Date(EVENT_CONFIG.targetDateISO).getTime();
  const startTime = new Date(EVENT_CONFIG.startDateISO).getTime();
  const totalDuration = targetTime - startTime;

  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        isCompleted: true,
        progressPercent: 100,
        totalSecondsRemaining: 0,
      };
    }

    const totalSecs = Math.floor(diff / 1000);
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    // Calculate progress percentage
    let progress = 0;
    if (totalDuration > 0) {
      const elapsed = now - startTime;
      progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    }

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      isCompleted: false,
      progressPercent: progress,
      totalSecondsRemaining: totalSecs,
    };
  }, [targetTime, startTime, totalDuration]);

  // Initial calculation without delay
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    // Tick exactly every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Sync on tab visibility change
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setTimeLeft(calculateTimeLeft());
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [calculateTimeLeft]);

  return timeLeft;
}
