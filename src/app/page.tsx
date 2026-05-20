"use client";

import React, { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import ScrollProvider from "../components/ui/ScrollProvider";
import CustomCursor from "../components/ui/CustomCursor";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MarketIntelligence from "../components/MarketIntelligence";
import TrendingGrid from "../components/TrendingGrid";
import AiCivilization from "../components/AiCivilization";
import AutomotiveFuture from "../components/AutomotiveFuture";
import SpaceDefense from "../components/SpaceDefense";
import HardwareComputing from "../components/HardwareComputing";
import TechGeopolitics from "../components/TechGeopolitics";
import Articles from "../components/Articles";
import Footer from "../components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 1. Cinematic Loading Screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* 2. Main Page Render */}
      {!loading && (
        <ScrollProvider>
          {/* Smooth custom cursor glows */}
          <CustomCursor />

          <div className="relative min-h-screen bg-[#030303] text-white flex flex-col justify-between selection:bg-cyan-500/30">
            
            {/* Top Capsule HUD Navbar */}
            <Navbar />

            {/* Content Sections */}
            <main className="flex-grow">
              
              {/* Fullscreen Hero (Three.js globe + brand values) */}
              <Hero />

              {/* Bloomberg futuristic terminal + live tickers */}
              <MarketIntelligence />

              {/* Emerging technological domain grids */}
              <TrendingGrid />

              {/* Editorial essay with dynamic Bezier link connections */}
              <AiCivilization />

              {/* Horizontal sticky parallax EV scroll showcase */}
              <AutomotiveFuture />

              {/* Space defense launchers + interactive radar HUD grids */}
              <SpaceDefense />

              {/* Photonic silicon + Bloch quantum qubit simulator */}
              <HardwareComputing />

              {/* Semiconductor Geopolitical map hotspots */}
              <TechGeopolitics />

              {/* Wired/Verge styled featured news stories */}
              <Articles />

            </main>

            {/* Immersive security footer */}
            <Footer />

          </div>
        </ScrollProvider>
      )}
    </>
  );
}
