import React, { useRef, useEffect, useState, useCallback } from "react";
import { soundFx } from "../utils/gameAudio";
import "./InteractiveSkyBackground.css";

// Authentic Traditional Punjabi Kite Archetypes
const AUTHENTIC_KITES = [
  {
    name: "Lahori Kesari Gudda",
    type: "gudda",
    colorLeft: "#F59E0B",
    colorRight: "#DC2626",
    accentColor: "#FFFFFF",
    size: 58,
    speed: 1.1,
  },
  {
    name: "Do-Ranga Patang",
    type: "patang",
    colorLeft: "#10B981",
    colorRight: "#F59E0B",
    accentColor: "#FEF08A",
    size: 52,
    speed: 1.4,
  },
  {
    name: "Walled City Tukkal",
    type: "tukkal",
    colorLeft: "#E11D48",
    colorRight: "#3B82F6",
    accentColor: "#FDE047",
    size: 56,
    speed: 1.2,
  },
  {
    name: "Taxali Kup",
    type: "patang",
    colorLeft: "#1E293B",
    colorRight: "#EA580C",
    accentColor: "#FFFFFF",
    size: 50,
    speed: 1.5,
  },
  {
    name: "Bhati Pari (Twin Ribbon)",
    type: "pari",
    colorLeft: "#8B5CF6",
    colorRight: "#F43F5E",
    accentColor: "#FDE047",
    size: 48,
    speed: 1.6,
  },
];

export function InteractiveSkyBackground() {
  const canvasRef = useRef(null);
  const [boKataToast, setBoKataToast] = useState(null);
  const [kitesCutCount, setKitesCutCount] = useState(0);
  const [reelAngle, setReelAngle] = useState(0);

  const gameState = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
    userKite: {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.32,
      targetX: window.innerWidth * 0.72,
      targetY: window.innerHeight * 0.32,
      vx: 0,
      vy: 0,
      angle: 0,
      type: "patang",
      anchor: { x: window.innerWidth * 0.85, y: window.innerHeight },
      tail: [],
      tailFlutterPhase: 0,
    },
    aiKites: [],
    particles: [],
    lastTime: performance.now(),
  });

  // Spawn an authentic traditional kite in the background sky
  const spawnKite = useCallback((customX, customY) => {
    const state = gameState.current;
    const preset = AUTHENTIC_KITES[Math.floor(Math.random() * AUTHENTIC_KITES.length)];
    const fromLeft = Math.random() > 0.5;

    const x = customX !== undefined ? customX : (fromLeft ? -50 : state.width + 50);
    const y = customY !== undefined ? customY : 70 + Math.random() * (state.height * 0.5);

    const kite = {
      id: Math.random().toString(36).substring(7),
      name: preset.name,
      type: preset.type,
      x: x,
      y: y,
      baseY: y,
      targetX: Math.random() * state.width,
      targetY: y,
      vx: fromLeft ? preset.speed : -preset.speed,
      vy: 0,
      angle: 0,
      size: preset.size,
      colorLeft: preset.colorLeft,
      colorRight: preset.colorRight,
      accentColor: preset.accentColor,
      anchor: {
        x: Math.random() * state.width,
        y: state.height,
      },
      cut: false,
      fallVx: (Math.random() - 0.5) * 2.8,
      fallVy: 1.8,
      fallRot: (Math.random() - 0.5) * 0.14,
      tail: [],
      tailFlutterPhase: Math.random() * 10,
      timeOffset: Math.random() * 100,
    };

    // Initialize fluttering ribbon tail
    for (let i = 0; i < 9; i++) {
      kite.tail.push({ x: kite.x, y: kite.y + i * 8 });
    }

    state.aiKites.push(kite);
  }, []);

  // Cut an AI kite & trigger Bo Kata celebration
  const cutKite = useCallback((kite) => {
    if (kite.cut) return;
    kite.cut = true;
    soundFx.playCut();
    setTimeout(() => soundFx.playBoKata(), 80);

    setKitesCutCount((prev) => prev + 1);
    setBoKataToast({
      title: "BO KATA!",
      kiteName: kite.name,
      id: Date.now(),
    });

    setTimeout(() => {
      setBoKataToast(null);
    }, 2200);

    // Particle burst
    const state = gameState.current;
    const colors = ["#F59E0B", "#FBBF24", "#EF4444", "#10B981", "#3B82F6", "#FFFFFF"];
    for (let i = 0; i < 30; i++) {
      state.particles.push({
        x: kite.x,
        y: kite.y,
        vx: (Math.random() - 0.5) * 9,
        vy: (Math.random() - 0.7) * 9,
        size: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
      });
    }

    // Launch replacement kite after delay
    setTimeout(() => {
      if (gameState.current.aiKites.filter((k) => !k.cut).length < 5) {
        spawnKite();
      }
    }, 2000);
  }, [spawnKite]);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = gameState.current;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.userKite.anchor = { x: state.width * 0.85, y: state.height };
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize user tail
    state.userKite.tail = [];
    for (let i = 0; i < 10; i++) {
      state.userKite.tail.push({ x: state.userKite.x, y: state.userKite.y + i * 8 });
    }

    // Spawn 5 background kites initially
    state.aiKites = [];
    for (let i = 0; i < 5; i++) {
      spawnKite(
        (state.width * (i + 1)) / 6 + (Math.random() - 0.5) * 80,
        70 + Math.random() * (state.height * 0.42)
      );
    }

    let animId;

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - state.lastTime) / 1000, 0.1);
      state.lastTime = currentTime;

      // 1. Update Player Kite
      const u = state.userKite;
      const dx = u.targetX - u.x;
      const dy = u.targetY - u.y;
      u.vx += (dx * 5 - u.vx) * 0.12;
      u.vy += (dy * 5 - u.vy) * 0.12;
      u.x += u.vx * dt;
      u.y += u.vy * dt;

      u.angle = (u.vx / 70) * 0.35 + Math.sin(currentTime * 0.002) * 0.08;
      u.tailFlutterPhase += dt * 8;

      if (u.tail.length > 0) {
        u.tail[0] = { x: u.x, y: u.y + 16 };
        for (let i = 1; i < u.tail.length; i++) {
          const prev = u.tail[i - 1];
          const curr = u.tail[i];
          const segDx = prev.x - curr.x;
          const segDy = prev.y - curr.y;
          const dist = Math.sqrt(segDx * segDx + segDy * segDy) || 1;
          const wave = Math.sin(u.tailFlutterPhase + i * 0.6) * (i * 1.4);
          curr.x = prev.x - (segDx / dist) * 8 + wave * 0.2;
          curr.y = prev.y - (segDy / dist) * 8 + 1.2;
        }
      }

      // 2. Update AI Kites
      state.aiKites.forEach((kite) => {
        if (kite.cut) {
          kite.x += kite.fallVx;
          kite.y += kite.fallVy;
          kite.angle += kite.fallRot;
          kite.fallVy += 0.045;
        } else {
          kite.timeOffset += dt;
          kite.x += kite.vx;
          kite.y = kite.baseY + Math.sin(kite.timeOffset * 1.5) * 16;
          kite.angle = Math.sin(kite.timeOffset * 2) * 0.12 + (kite.vx / 10) * 0.08;
          kite.tailFlutterPhase += dt * 6;

          // Wrap edges
          if (kite.vx > 0 && kite.x > state.width + 60) {
            kite.x = -60;
          } else if (kite.vx < 0 && kite.x < -60) {
            kite.x = state.width + 60;
          }

          // Update tail
          if (kite.tail.length > 0) {
            kite.tail[0] = { x: kite.x, y: kite.y + 14 };
            for (let i = 1; i < kite.tail.length; i++) {
              const prev = kite.tail[i - 1];
              const curr = kite.tail[i];
              const tDx = prev.x - curr.x;
              const tDy = prev.y - curr.y;
              const dist = Math.sqrt(tDx * tDx + tDy * tDy) || 1;
              const wave = Math.sin(kite.tailFlutterPhase + i * 0.5) * (i * 1.2);
              curr.x = prev.x - (tDx / dist) * 7 + wave * 0.2;
              curr.y = prev.y - (tDy / dist) * 7 + 1;
            }
          }

          // Check if player kite overlaps/cuts this kite
          const distToUser = Math.hypot(kite.x - u.x, kite.y - u.y);
          if (distToUser < 50) {
            cutKite(kite);
          }
        }
      });

      // Cleanup out of bounds cut kites
      state.aiKites = state.aiKites.filter((k) => k.y < state.height + 120);

      // 3. Update Particles
      state.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= p.decay;
      });
      state.particles = state.particles.filter((p) => p.life > 0);

      // 4. Render Canvas
      ctx.clearRect(0, 0, state.width, state.height);

      // Draw AI Strings (Fine glass dor with gentle glint)
      state.aiKites.forEach((kite) => {
        if (!kite.cut) {
          ctx.beginPath();
          ctx.moveTo(kite.anchor.x, kite.anchor.y);
          const midX = (kite.anchor.x + kite.x) * 0.5 + Math.sin(kite.timeOffset) * 12;
          const midY = (kite.anchor.y + kite.y) * 0.5 + 14;
          ctx.quadraticCurveTo(midX, midY, kite.x, kite.y);
          ctx.strokeStyle = "rgba(255, 235, 180, 0.35)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw Fluttering Tail Ribbon
        if (kite.tail.length > 1) {
          drawFlutteringTail(ctx, kite.tail, kite.colorRight, 4);
        }

        // Draw Authentic Kite
        drawRealKite(ctx, kite.x, kite.y, kite.angle, kite.size, kite.type, kite.colorLeft, kite.colorRight, kite.accentColor);
      });

      // Draw User String (Luminous high-tension Dor)
      ctx.beginPath();
      ctx.moveTo(u.anchor.x, u.anchor.y);
      const uMidX = (u.anchor.x + u.x) * 0.5;
      const uMidY = (u.anchor.y + u.y) * 0.5 + 10;
      ctx.quadraticCurveTo(uMidX, uMidY, u.x, u.y);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.75)";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#F59E0B";
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw User Tail Ribbon
      if (u.tail.length > 1) {
        drawFlutteringTail(ctx, u.tail, "#DC2626", 5, true);
      }

      // Draw User Kite (Signature Royal Kesari & Crimson Patang)
      drawRealKite(ctx, u.x, u.y, u.angle, 58, "patang", "#F59E0B", "#DC2626", "#FFFFFF", true);

      // Draw Particles
      state.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [cutKite, spawnKite]);

  // Render a realistic fluttering crepe-paper tail with undulating ribbon width
  const drawFlutteringTail = (ctx, tailPoints, color, baseWidth, isPlayer = false) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(tailPoints[0].x, tailPoints[0].y);
    for (let i = 1; i < tailPoints.length; i++) {
      ctx.lineTo(tailPoints[i].x, tailPoints[i].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = baseWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    // Fringe / Tassel at end of tail
    const last = tailPoints[tailPoints.length - 1];
    ctx.fillStyle = isPlayer ? "#F59E0B" : "#FFFFFF";
    ctx.beginPath();
    ctx.arc(last.x, last.y, baseWidth * 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Render authentic Lahori Kite anatomy on Canvas:
  // Patang, Gudda, Tukkal, or Pari with translucent paper gradients and real bamboo spines
  const drawRealKite = (ctx, x, y, angle, size, type, colLeft, colRight, accentCol, isPlayer = false) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const s = size * 0.5;

    // 1. PAPER BODY (With light translucency & paper highlights)
    ctx.beginPath();
    if (type === "gudda") {
      // Gudda has rounded upper shoulders and wider stance
      ctx.moveTo(0, -s * 0.95);
      ctx.quadraticCurveTo(s * 0.9, -s * 0.5, s * 0.95, 0);
      ctx.lineTo(0, s * 1.05);
      ctx.lineTo(-s * 0.95, 0);
      ctx.quadraticCurveTo(-s * 0.9, -s * 0.5, 0, -s * 0.95);
    } else if (type === "tukkal") {
      // Tukkal has curved oval lobes
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s, -s * 0.6, s, 0, s * 0.7, s * 0.35);
      ctx.lineTo(0, s * 1.1);
      ctx.lineTo(-s * 0.7, s * 0.35);
      ctx.bezierCurveTo(-s, 0, -s, -s * 0.6, 0, -s);
    } else {
      // Classic Diamond Patang
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.95, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.95, 0);
    }
    ctx.closePath();

    // Authentic Two-Tone (Do-Ranga) Paper Split
    const paperGrad = ctx.createLinearGradient(-s, 0, s, 0);
    paperGrad.addColorStop(0, colLeft);
    paperGrad.addColorStop(0.48, colLeft);
    paperGrad.addColorStop(0.52, colRight);
    paperGrad.addColorStop(1, colRight);
    ctx.fillStyle = paperGrad;
    ctx.fill();

    // Subtle Paper Texture Sheen / Sunlit highlight
    const sunSheen = ctx.createLinearGradient(0, -s, 0, s);
    sunSheen.addColorStop(0, "rgba(255, 255, 255, 0.35)");
    sunSheen.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
    sunSheen.addColorStop(1, "rgba(0, 0, 0, 0.2)");
    ctx.fillStyle = sunSheen;
    ctx.fill();

    // Delicate Paper Edge Outline
    ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 2. AUTHENTIC BAMBOO FRAME (Natural wood tone with curvature)
    // Center Spine (Teela) - thick in middle, tapering at tip
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s * 1.05);
    ctx.strokeStyle = "#451A03"; // Natural cured bamboo brown
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Bow Spar (Kamaan) - Arched tension bow
    ctx.beginPath();
    ctx.moveTo(-s * 0.95, 0);
    ctx.quadraticCurveTo(0, -s * 0.48, s * 0.95, 0);
    ctx.strokeStyle = "#451A03";
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // 3. TRADITIONAL PAPER PATCHES (Chand, Stars, or Winglets)
    if (type === "gudda") {
      // White circular moon patch (Chand) in center
      ctx.beginPath();
      ctx.arc(0, -s * 0.15, s * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = accentCol || "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    } else if (type === "tukkal") {
      // Wingtip decorative fringe dots
      ctx.fillStyle = accentCol || "#FDE047";
      ctx.beginPath();
      ctx.arc(-s * 0.65, s * 0.2, 4, 0, Math.PI * 2);
      ctx.arc(s * 0.65, s * 0.2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. TRIANGULAR TAIL FIN (Tandi)
    ctx.beginPath();
    ctx.moveTo(-s * 0.24, s * 0.95);
    ctx.lineTo(s * 0.24, s * 0.95);
    ctx.lineTo(0, s * 1.35);
    ctx.closePath();
    ctx.fillStyle = colLeft;
    ctx.fill();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
    ctx.stroke();

    // Player Kite subtle aura shimmer
    if (isPlayer) {
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  // User input handler: moves the player kite to touch or mouse position
  const handlePointer = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    if (clientX !== undefined && clientY !== undefined) {
      gameState.current.userKite.targetX = clientX;
      gameState.current.userKite.targetY = clientY;
    }
  };

  // Tap in sky: checks if tapped near any AI kite to cut it!
  const handleSkyTap = (e) => {
    handlePointer(e);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    if (clientX !== undefined && clientY !== undefined) {
      const target = gameState.current.aiKites.find(
        (k) => !k.cut && Math.hypot(k.x - clientX, k.y - clientY) < 65
      );
      if (target) {
        cutKite(target);
      }
    }
  };

  // Tap Charkhi widget: reels in string, launches new kite & sound
  const handleCharkhiTap = () => {
    setReelAngle((prev) => prev + 45);
    soundFx.playReel();
    spawnKite();

    const nearest = gameState.current.aiKites.find(
      (k) => !k.cut && Math.hypot(k.x - gameState.current.userKite.x, k.y - gameState.current.userKite.y) < 140
    );
    if (nearest) {
      cutKite(nearest);
    }
  };

  return (
    <div
      className="interactive-sky-root"
      onMouseMove={handlePointer}
      onTouchMove={handlePointer}
      onClick={handleSkyTap}
    >
      {/* Real Cinematic Lahore Rooftop Background Sky */}
      <div className="sky-real-backdrop">
        <div className="sky-photo-overlay"></div>
      </div>

      {/* "BO KATA!" Perfectly Centered Celebratory Modal */}
      {boKataToast && (
        <div className="sky-bo-kata-overlay" key={boKataToast.id}>
          <div className="sky-bo-kata-card">
            <div className="bo-kata-sparkles">🎉 🪁 ✨</div>
            <div className="bo-kata-headline">BO KATA!</div>
            <div className="bo-kata-victim-badge">
              <span className="victim-kite-name">{boKataToast.kiteName}</span>
              <span className="victim-cut-tag">CUT!</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Wooden Charkhi Reel Widget */}
      <div
        className="floating-charkhi-widget"
        onClick={(e) => {
          e.stopPropagation();
          handleCharkhiTap();
        }}
        title="Tap to reel string & launch kites into the sky!"
      >
        <div className="charkhi-svg-frame" style={{ transform: `rotate(${reelAngle}deg)` }}>
          <svg viewBox="0 0 100 100" className="charkhi-svg">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#D97706" strokeWidth="6" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#FDE68A" strokeWidth="2" />
            <circle cx="50" cy="50" r="28" fill="#E11D48" stroke="#F59E0B" strokeWidth="4" />
            <circle cx="50" cy="50" r="18" fill="#F59E0B" />
            <line x1="50" y1="6" x2="50" y2="94" stroke="#D97706" strokeWidth="4" />
            <line x1="6" y1="50" x2="94" y2="50" stroke="#D97706" strokeWidth="4" />
            <line x1="19" y1="19" x2="81" y2="81" stroke="#D97706" strokeWidth="3" />
            <line x1="19" y1="81" x2="81" y2="19" stroke="#D97706" strokeWidth="3" />
            <circle cx="50" cy="50" r="7" fill="#0B0F19" stroke="#F59E0B" strokeWidth="2" />
          </svg>
        </div>
        <div className="charkhi-text-info">
          <span className="charkhi-label">Charkhi &bull; {kitesCutCount} Cut</span>
          <span className="charkhi-hint">Tap to Fly &amp; Cut!</span>
        </div>
      </div>
    </div>
  );
}
