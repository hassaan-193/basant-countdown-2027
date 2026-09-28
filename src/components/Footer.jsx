import React from "react";
import { EVENT_CONFIG } from "../config/eventConfig";
import "./Footer.css";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          {/* Brand & Cultural Note */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <svg className="footer-kite-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <polygon points="14,2 24,14 14,26 4,14" fill="#F59E0B" />
                <line x1="14" y1="2" x2="24" y2="14" stroke="#0B0F19" strokeWidth="1.5" />
                <path d="M4 14 Q14 11 24 14" stroke="#0B0F19" strokeWidth="1.5" fill="none" />
                <polygon points="14,26 11,28 17,28" fill="#F59E0B" />
              </svg>
              <div className="footer-brand-text">
                <span className="footer-title">BASANT</span>
                <span className="footer-year">2027</span>
              </div>
            </div>
            <p className="footer-desc">
              Dedicated to celebrating and preserving the living cultural heritage of Lahore, Punjab &bull; Jashn-e-Baharan, rooftop Patang Bazi, and spring festivities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Features</h4>
            <ul className="footer-links">
              <li><a href="#countdown">Live Countdown</a></li>
              <li><a href="#preparations-2027">🎬 2027 Preparations Video</a></li>
              <li><a href="#memories-2026">📼 2026 Memories Videos</a></li>
            </ul>
          </div>

          {/* Event Specs */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Event Schedule</h4>
            <p className="footer-spec-item">
              <strong>Target:</strong> {EVENT_CONFIG.displayDate}
            </p>
            <p className="footer-spec-item">
              <strong>Time:</strong> {EVENT_CONFIG.displayTime}
            </p>
            <p className="footer-spec-item">
              <strong>Location:</strong> Ghaziabad, Lahore, Pakistan
            </p>
            <p className="footer-spec-item">
              <strong>Zone:</strong> {EVENT_CONFIG.timezoneName}
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Basant 2027 Portal. High-performance, mobile-first festival web app.
          </p>

          <button onClick={scrollToTop} className="btn-back-to-top" aria-label="Scroll back to top">
            <span>Back to Top</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
