import React, { useState, useEffect } from "react";
import { soundFx } from "../utils/gameAudio";
import "./Navbar.css";

export function Navbar() {
  const [lahoreTime, setLahoreTime] = useState("");
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setLahoreTime(formatted + " PKT");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#countdown" className="header-brand" aria-label="Basant 2027 Home">
          <svg className="brand-kite-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <polygon points="14,2 24,14 14,26 4,14" fill="#F59E0B" />
            <line x1="14" y1="2" x2="24" y2="14" stroke="#0B0F19" strokeWidth="1.5" />
            <path d="M4 14 Q14 11 24 14" stroke="#0B0F19" strokeWidth="1.5" fill="none" />
            <polygon points="14,26 11,28 17,28" fill="#F59E0B" />
          </svg>
          <div className="brand-text">
            <span className="brand-title">BASANT</span>
            <span className="brand-year">2027</span>
          </div>
        </a>

        {/* Right Side: Live Lahore Clock & Sound Toggle */}
        <div className="header-right-strip">
          <div className="lahore-clock" title="Current Time in Lahore, Pakistan (PKT)">
            <span className="clock-pulse"></span>
            <span className="clock-city">Lahore</span>
            <span className="clock-time">{lahoreTime || "Loading..."}</span>
          </div>

          <button
            type="button"
            onClick={toggleSound}
            className="sound-toggle-btn"
            title={isAudioMuted ? "Unmute festival sounds" : "Mute festival sounds"}
            aria-label="Toggle festival sounds"
          >
            <span>{isAudioMuted ? "🔇" : "🔊"}</span>
            <span className="sound-btn-text">{isAudioMuted ? "Muted" : "Sound"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
