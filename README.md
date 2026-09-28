# Basant 2027 Countdown & Memories Portal

A modern, fast, mobile-first web app celebrating the historic **Basant Festival 2027** in Lahore, Pakistan. Built completely from the ground up with **React + Vite**, featuring real-time countdown tracking, an interactive **background kite-flying activity (Pipa Combat style)**, and two dedicated video sections for **Basant 2027 Preparations** and **Basant 2026 Memories**.

---

## 1. Project Directory

- **New Project Folder:** `d:\Personal\basant-countdown-new`
- **Original Project:** `d:\Personal\basant-countdown` (Untouched for comparison)

---

## 2. Quick Start Commands

### Install Dependencies
```bash
cd d:\Personal\basant-countdown-new
npm install
```

### Run Locally (Development Server)
```bash
npm run dev
```
Runs at `http://localhost:5173/` (or `http://localhost:5174/` if 5173 is occupied).

### Build for Production
```bash
npm run build
```
Creates an optimized, tree-shaken static production bundle in `dist/`.

---

## 3. Dedicated Video & Memories Architecture

The landing page features two distinct video sections as you scroll down:

### Section 1: Basant 2027 Preparations (`#preparations-2027`)
- **Video:** `/videos/basant-2027-preparations.mp4` (New Video, 4.9 MB)
- **Concept:** Master kite artisans in Lahore's Walled City shaping bamboo frames (teela), dyeing tissue paper, and preparing kites for the upcoming Basant 2027 festival.
- **Controls:** Custom HTML5 video player with big play button overlay, mute toggle, time counter, and fullscreen.

### Section 2: Basant 2026 Memories (`#memories-2026`)
- **2-Column Video Showcase** displaying both original classic clips:
  - **Memory 1:** `/videos/basant_memory_1.mp4` — *Lahore Rooftop Sky Battles* (High-tension daylight kite duels over the Walled City).
  - **Memory 2:** `/videos/basant_memory_2.mp4` — *Night Skies & Rooftop Jashn* (Searchlights illuminating the night skies with music and celebration).
- Both videos have independent play/pause controls, volume toggles, and responsive 16:9 viewports.

---

## 4. Interactive Background Sky (Pipa Combat Style)

- **Live Ambient Sky:** Multiple authentic Punjabi kites (*Patang, Gudda, Pari, Kup, Tukkal*) soar gracefully across the sky behind the countdown with realistic wind physics and trailing tension strings (*dor*).
- **Interactive Player Kite:** Your own royal Kesari Patang follows your mouse or touch anywhere across the sky.
- **Pecha & String Slicing:** Move your kite line across an opponent's line (or tap any opponent kite in the sky) to snap their string.
- **"BO KATA!" Celebration:** Cut kites tumble and drift away with a celebratory **"BO KATA! 🪁"** banner, particle confetti burst, and audio fanfare.
- **Floating Wooden Charkhi Reel:** Located at the bottom-right of the screen—tap anytime to spin the reel, launch fresh kites, or slice nearby rival kites!

---

## 5. Professional Visual Design & Color Palette

- **Refined Color Palette:**
  - Radiant Festival Gold (`#F59E0B`, `#FBBF24`, `#FDE68A`)
  - Deep Obsidian Twilight (`#050811`, `#090E1B`, `#0F1728`)
  - Frosted Glassmorphism with luminous amber micro-borders (`border: 1px solid rgba(245, 158, 11, 0.35)`)
- **Smooth Scrolling (`html { scroll-behavior: smooth; }`):**
  - Smooth jump buttons in the hero section glide visitors directly to **2027 Preparations** or **2026 Memories**.
  - Animated bouncing scroll-down indicator encourages visitors to explore the video content below.
- **Single-Page Flow:**
  - Zero confusing navigation menus; designed for visitors of all technical levels to simply scroll and experience the festival.
