import React, { useRef, useState, useEffect } from "react";
import "./PreparationsSection.css";

export function PreparationsSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => console.warn("Play interrupted:", err));
      setHasStarted(true);
    } else {
      video.pause();
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

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec)) return "0:00";
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section id="preparations-2027" className="preparations-section section-spacing">
      <div className="container prep-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            Official Video &bull; 2027 Documentary
          </div>
          <h2 className="section-title">
            Basant 2027 <span className="title-gradient">Preparations</span>
          </h2>
          <p className="section-description">
            Across the historic rooftops and narrow alleys of Lahore's Walled City, master kite artisans and thread makers are busily shaping traditional bamboo frames (teela), dyeing tissue sheets, and preparing for Basant 2027.
          </p>
        </div>

        {/* Video Player Card */}
        <div
          className="video-player-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="video-viewport">
            <video
              ref={videoRef}
              className="featured-video"
              src="/videos/basant-2027-preparations.mp4"
              poster="/images/basant-preparations-poster.jpg"
              preload="metadata"
              playsInline
              muted={isMuted}
              loop
              aria-label="Basant 2027 preparations video in Lahore"
              onClick={togglePlay}
            >
              Your browser does not support HTML5 video playback.
            </video>

            {/* Big Center Play Button Overlay */}
            {(!isPlaying || !hasStarted) && (
              <div className="video-center-overlay" onClick={togglePlay}>
                <button
                  type="button"
                  className="big-play-btn"
                  aria-label="Play Basant 2027 preparations video"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </button>
                <span className="overlay-play-text">Watch 2027 Preparations</span>
              </div>
            )}

            {/* Custom Bottom Control Bar */}
            <div className={`video-controls-bar ${isHovered || !isPlaying ? "visible" : ""}`}>
              <div className="controls-left">
                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="control-btn"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                {/* Volume / Mute Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="control-btn"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>

                {/* Duration */}
                <span className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="controls-right">
                <span className="badge-video-quality">HD &bull; Local Stream</span>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="control-btn"
                  aria-label="Enter fullscreen"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Under-player Meta Card */}
          <div className="video-info-footer">
            <div className="video-info-main">
              <h3 className="video-card-title">Basant 2027 Preparations</h3>
              <p className="video-card-sub">Rooftop Artisans, Traditional Kites &amp; Thread Making in Old Lahore</p>
            </div>
            <div className="video-info-pill">
              <span className="pulse-dot"></span>
              2027 Exclusive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
