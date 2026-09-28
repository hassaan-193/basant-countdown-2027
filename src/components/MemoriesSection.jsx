import React, { useRef, useState } from "react";
import "./MemoriesSection.css";

function MemoryVideoCard({ title, subtitle, src, poster, badge }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => console.warn("Play interrupted:", err));
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  };

  return (
    <div className="memory-card">
      <div className="memory-video-viewport" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="memory-video-el"
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          muted={isMuted}
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support HTML5 video playback.
        </video>

        {/* Play Overlay */}
        {!isPlaying && (
          <div className="memory-play-overlay">
            <button type="button" className="memory-play-btn" aria-label={`Play ${title}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </button>
          </div>
        )}

        {/* Hover Mini Controls */}
        <div className="memory-controls-bar" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={togglePlay} className="memory-ctrl-btn" aria-label="Toggle play">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <button type="button" onClick={toggleMute} className="memory-ctrl-btn" aria-label="Toggle mute">
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          <button type="button" onClick={handleFullscreen} className="memory-ctrl-btn" aria-label="Fullscreen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="memory-card-body">
        <div className="memory-badge-row">
          <span className="memory-badge">{badge}</span>
        </div>
        <h3 className="memory-title">{title}</h3>
        <p className="memory-sub">{subtitle}</p>
      </div>
    </div>
  );
}

export function MemoriesSection() {
  return (
    <section id="memories-2026" className="memories-section section-spacing">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            Archival Classics &bull; Original Videos
          </div>
          <h2 className="section-title">
            Basant 2026 <span className="title-gradient">Memories</span>
          </h2>
          <p className="section-description">
            Relive the high-voltage rooftop kite duels, dhol beats, searchlight night skies, and jubilant "Bo Kata!" cries preserved from past Lahore Basant celebrations.
          </p>
        </div>

        {/* 2-Column Memories Grid */}
        <div className="memories-grid">
          <MemoryVideoCard
            title="Lahore Sky Battles (Memory I)"
            subtitle="Daylight rooftop duels, tension strings, and roaring crowds over the Walled City."
            src="/videos/basant_memory_1.mp4"
            poster="/images/basant-preparations-poster.jpg"
            badge="Classic Memory 1"
          />

          <MemoryVideoCard
            title="Night Skies &amp; Jashn (Memory II)"
            subtitle="Electric night festival atmosphere illuminated by rooftop searchlights and music."
            src="/videos/basant_memory_2.mp4"
            poster="/images/basant-preparations-poster.jpg"
            badge="Classic Memory 2"
          />
        </div>
      </div>
    </section>
  );
}
