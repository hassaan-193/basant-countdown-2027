import React from "react";
import { InteractiveSkyBackground } from "./components/InteractiveSkyBackground";
import { Navbar } from "./components/Navbar";
import { HeroCountdown } from "./components/HeroCountdown";
import { PreparationsSection } from "./components/PreparationsSection";
import { MemoriesSection } from "./components/MemoriesSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="app-root">
      {/* 1. Live interactive background sky with kites, strings, Charkhi, and Bo Kata celebrations */}
      <InteractiveSkyBackground />

      {/* 2. Sleek sticky header: Brand, Live Lahore Clock, Sound Toggle */}
      <Navbar />

      {/* 3. Main Single-Page Flow with Smooth Scrolling */}
      <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
        {/* Main Countdown & Sky Interaction Hint */}
        <HeroCountdown />

        {/* Video Section 1: Basant 2027 Preparations (New Video) */}
        <PreparationsSection />

        {/* Video Section 2: Basant 2026 Memories (2 Preserved Classic Videos) */}
        <MemoriesSection />
      </main>

      {/* 4. Cultural Footer */}
      <Footer />
    </div>
  );
}
