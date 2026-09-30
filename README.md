# 🪁 Basant 2027 Lahore — Official Countdown & Interactive Sky

A modern, high-performance, mobile-first web application celebrating the historic festival of spring on the rooftops of Lahore, Pakistan.

Live countdown targeting **Friday, January 29 – Sunday, February 7, 2027** (Asia/Karachi, PKT UTC+5).

![Basant 2027](public/images/lahore-basant-real-sky.jpg)

---

## 🌟 Key Features

- **Live Precision Countdown**: Real-time ticker counting down Days, Hours, Minutes, and Seconds with progress percentage to January 29, 2027.
- **Interactive 60 FPS Kite-Flying Sky (Pipa Combat style)**:
  - **Touch & Click Anywhere to Launch Kites**: Tap or click any empty space on the screen to instantly spawn a new kite soaring into the sky with festive particle bursts and whoosh sound effects!
  - Authentic Lahori kite models (*Lahori Gudda, Do-Ranga Patang, Tukkal, Pari*).
  - Dynamic wind physics, catenary string simulation (*manjha/dor*), and ribbon tails.
  - Interactive player kite that follows pointer or touch across the sky.
  - String-cut collision detection (*Pecha*) triggering celebratory **"BO KATA!"** toasts and severed floating kites.
  - Interactive animated wooden *Charkhi* reel widget to instantly cut rival kites.
- **Dedicated Video Showcase Sections**:
  1. **Basant 2027 Preparations**: Cinematic documentary showcasing bamboo crafting, glass-coated dor grinding, and rooftop anticipation.
  2. **Basant 2026 Memories**: 2-column gallery preserving classic celebration footage from the Walled City.
- **Real Cinematic Visuals**: Authentic sunset rooftop photography of Lahore's Old City with Badshahi Mosque minarets.
- **Cultural Audio**: Celebratory Basant bugle (*Bhopa*), kite launch whoosh, & Bo-Kata sound effects using Web Audio API synthesis.
- **Calendar Integration**: One-click "Add to Google Calendar" button with festival details and Lahore location (Jan 29 - Feb 7, 2027).

---

## 🚀 Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS (Tailored Design System, Glassmorphism, 3D tilt perspective)
- **Animation**: 60 FPS Canvas 2D Physics + CSS Micro-animations
- **Deployment Ready**: Pre-configured for both **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`).

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 1-Click Deployment

### Deploy on Vercel
1. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Import this repository `hassaan-193/basant-countdown-2027`.
3. Vercel automatically detects Vite. Click **"Deploy"**.

### Deploy on Netlify
1. Go to [Netlify](https://netlify.com) and click **"Add new site"** &rarr; **"Import an existing project"**.
2. Connect to GitHub and select `basant-countdown-2027`.
3. Click **"Deploy site"**.
