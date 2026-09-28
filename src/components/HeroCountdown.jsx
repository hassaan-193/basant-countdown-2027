import React, { useRef, useState } from "react";
import { EVENT_CONFIG } from "../config/eventConfig";
import { useCountdown } from "../hooks/useCountdown";
import { addToGoogleCalendar } from "../utils/calendar";
import "./HeroCountdown.css";

export function HeroCountdown() {
  const { days, hours, minutes, seconds, isCompleted, progressPercent } = useCountdown();
  const showcaseRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Interactive 3D Cursor Tilt & Soft Float Animation with dynamic light tracking
  const handleMouseMove = (e) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3.8;
    const rotateY = ((x - centerX) / centerX) * 3.8;

    showcaseRef.current.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(1)}%`);
    showcaseRef.current.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(1)}%`);

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: "transform 80ms ease-out",
    });
  };

  const handleMouseLeave = () => {
    if (showcaseRef.current) {
      showcaseRef.current.style.setProperty('--mouse-x', '50%');
      showcaseRef.current.style.setProperty('--mouse-y', '50%');
    }
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
    });
  };

  return (
    <section id="countdown" className="hero-section">
      <div className="container hero-container">
        {/* Cultural Badge */}
        <div className="hero-badge-wrap">
          <span className="hero-festival-pill">
            <span className="live-sparkle"></span>
            Jashn-e-Basant Lahore &bull; Spring 2027
          </span>
        </div>

        {/* Hero Title with High-Contrast Background Halo */}
        <div className="hero-header">
          <h1 className="hero-title">
            <span className="hero-word-basant">BASANT</span>{" "}
            <span className="hero-year-neon">2027</span>
          </h1>
          <p className="hero-subtitle">
            The Historic Festival of Spring &bull; Rooftops of Lahore
          </p>
        </div>

        {/* Main Countdown Soft Frosted Glass Showcase with Cursor Interactive Tilt */}
        <div
          ref={showcaseRef}
          className="countdown-glass-showcase"
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="countdown-grid">
            {/* Days Card */}
            <div className="glow-countdown-card">
              <div className="card-top-rim"></div>
              <span className="time-digit">{days}</span>
              <span className="time-unit">DAYS</span>
            </div>

            {/* Hours Card */}
            <div className="glow-countdown-card">
              <div className="card-top-rim"></div>
              <span className="time-digit">{hours}</span>
              <span className="time-unit">HOURS</span>
            </div>

            {/* Minutes Card */}
            <div className="glow-countdown-card">
              <div className="card-top-rim"></div>
              <span className="time-digit">{minutes}</span>
              <span className="time-unit">MINUTES</span>
            </div>

            {/* Seconds Card */}
            <div className="glow-countdown-card seconds-glow">
              <div className="card-top-rim"></div>
              <span className="time-digit neon-sec">{seconds}</span>
              <span className="time-unit">SECONDS</span>
            </div>
          </div>

          {/* Real-time Status Message */}
          <div className="hero-status-message">
            {isCompleted ? (
              <span className="celebration-shout">🎉 BASANT 2027 IS HERE! BO KATA LAHORE! 🎉</span>
            ) : (
              <span>
                <strong className="status-gold">{days}</strong> days &amp;{" "}
                <strong className="status-gold">{hours}</strong> hours until kites fill the Lahore skies
              </span>
            )}
          </div>

          {/* Festival Progress Line */}
          <div className="hero-progress-wrap">
            <div className="progress-meta-row">
              <span>AUG 2026</span>
              <span className="progress-val-text">{progressPercent.toFixed(1)}% JOURNEY COMPLETED</span>
              <span>MAR 2027</span>
            </div>
            <div className="progress-groove">
              <div
                className="progress-flow"
                style={{ width: `${progressPercent}%` }}
              >
                <span className="progress-runner-kite" title="Spring Approaching">🪁</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Sky Hint Callout */}
        <div className="sky-interaction-callout">
          <span className="callout-icon">🪁</span>
          <span className="callout-text">
            <strong>Interactive Sky:</strong> Move or tap anywhere in the sky above to fly your Patang, or tap the <strong>Charkhi</strong> reel to cut rival kites!
          </span>
        </div>

        {/* Line 1: Event Schedule & Location Bar */}
        <div className="hero-event-strip">
          <div className="event-strip-item">
            <span className="strip-icon">🗓️</span>
            <span><strong>Target:</strong> Thursday, March 11, 2027 &bull; 11:59 PM PKT</span>
          </div>
          <div className="strip-separator">&bull;</div>
          <div className="event-strip-item">
            <span className="strip-icon">📍</span>
            <span><strong>Venue:</strong> Ghaziabad, Lahore</span>
          </div>
        </div>

        {/* Line 2: Smooth Scroll Navigation CTA Buttons with generous clean gap */}
        <div className="hero-cta-group">
          <button
            type="button"
            onClick={() => scrollToSection("preparations-2027")}
            className="btn-hero-action primary-glow"
          >
            <span className="btn-icon">🎬</span>
            <span>2027 Preparations</span>
            <span className="btn-arrow">&darr;</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("memories-2026")}
            className="btn-hero-action secondary-glow"
          >
            <span className="btn-icon">📼</span>
            <span>Basant 2026 Memories</span>
            <span className="btn-arrow">&darr;</span>
          </button>

          <button
            type="button"
            onClick={addToGoogleCalendar}
            className="btn-hero-action outline-glow"
            title="Add festival date to Google Calendar"
          >
            <span className="btn-icon">📅</span>
            <span>Add to Calendar</span>
          </button>
        </div>

        {/* Bouncing Scroll Indicator */}
        <div
          className="scroll-down-hint"
          onClick={() => scrollToSection("preparations-2027")}
        >
          <span className="scroll-hint-text">Scroll Down to Explore Videos</span>
          <span className="scroll-chevron">&darr;</span>
        </div>
      </div>
    </section>
  );
}
