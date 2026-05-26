"use client";

import React, { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import ScrollProvider from "../components/ui/ScrollProvider";
import CustomCursor from "../components/ui/CustomCursor";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Articles from "../components/Articles";
import SectionFeed from "../components/SectionFeed";
import SpaceDefense from "../components/SpaceDefense";
import HardwareComputing from "../components/HardwareComputing";
import TechGeopolitics from "../components/TechGeopolitics";
import Footer from "../components/Footer";
import { Terminal, Shield, Cpu, Globe } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<"radar" | "qubit" | "geopolitics">("radar");

  return (
    <>
      {/* 1. Cinematic Loading Screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* 2. Main Page Render */}
      {!loading && (
        <ScrollProvider>
          {/* Smooth custom cursor glows */}
          <CustomCursor />

          <div className="relative min-h-screen bg-[#05070A] text-white flex flex-col justify-between selection:bg-blue-600/30">
            
            {/* Sticky Glass Navbar */}
            <Navbar />

            {/* Content Sections */}
            <main className="flex-grow">
              
              {/* Fullscreen Hero (Three.js globe + featured article spotlight) */}
              <Hero />

              {/* Infinite Breaking News Ticker */}
              <Ticker />

              {/* Main News Grid & Numbered Trending Sidebar */}
              <Articles />

              {/* Tiered News Section Feed (AI, Robotics, Cyber, Space, Future, Gadgets) */}
              <SectionFeed />

              {/* ========================================================
                  LOKANODE MISSION COMMAND DECK (NASA / SPACEX TABBED HUD)
                 ======================================================== */}
              <section className="py-20 relative bg-[#05070A] border-t border-white/5 overflow-hidden">
                <div className="orbital-grid opacity-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-blue-600/[0.015] rounded-full filter blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
                  
                  {/* Title Banner */}
                  <div className="border-b border-white/5 pb-5 text-left">
                    <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest">
                      <Terminal className="h-4 w-4" />
                      <span>MISSION_DECK v4.2 // RAW HUD STREAM</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight">
                      LIVE MISSION <span className="text-blue-500">DECK CONSOLE</span>
                    </h2>
                    <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-xl">
                      Access real-time orbital intelligence streams, quantum qubit Bloch simulators, and global semiconductor fabrication plant hotspot coordinates.
                    </p>
                  </div>

                  {/* SpaceX-style Tab Controller */}
                  <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-4">
                    <button
                      onClick={() => setActiveTelemetryTab("radar")}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer border flex items-center gap-2 ${
                        activeTelemetryTab === "radar"
                          ? "bg-blue-600/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(27,77,255,0.15)]"
                          : "text-slate-500 border-white/5 hover:text-slate-300 hover:bg-white/[0.02]"
                      }`}
                    >
                      <Shield className="h-4.5 w-4.5" />
                      <span>01 // Orbital Radar</span>
                    </button>

                    <button
                      onClick={() => setActiveTelemetryTab("qubit")}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer border flex items-center gap-2 ${
                        activeTelemetryTab === "qubit"
                          ? "bg-blue-600/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(27,77,255,0.15)]"
                          : "text-slate-500 border-white/5 hover:text-slate-300 hover:bg-white/[0.02]"
                      }`}
                    >
                      <Cpu className="h-4.5 w-4.5" />
                      <span>02 // Quantum Simulator</span>
                    </button>

                    <button
                      onClick={() => setActiveTelemetryTab("geopolitics")}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer border flex items-center gap-2 ${
                        activeTelemetryTab === "geopolitics"
                          ? "bg-blue-600/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(27,77,255,0.15)]"
                          : "text-slate-500 border-white/5 hover:text-slate-300 hover:bg-white/[0.02]"
                      }`}
                    >
                      <Globe className="h-4.5 w-4.5" />
                      <span>03 // Semiconductor Geopolitics</span>
                    </button>
                  </div>

                  {/* Dynamic Tab Rendering with Fade Reveal */}
                  <div className="bg-space-secondary/10 border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all">
                    {activeTelemetryTab === "radar" && (
                      <div className="animate-fade-in py-2">
                        {/* Interactive Space Defense radar HUD */}
                        <SpaceDefense />
                      </div>
                    )}

                    {activeTelemetryTab === "qubit" && (
                      <div className="animate-fade-in py-2">
                        {/* Photonic silicon + Bloch quantum qubit simulator */}
                        <HardwareComputing />
                      </div>
                    )}

                    {activeTelemetryTab === "geopolitics" && (
                      <div className="animate-fade-in py-2">
                        {/* Semiconductor Geopolitical map hotspots */}
                        <TechGeopolitics />
                      </div>
                    )}
                  </div>

                </div>
              </section>

            </main>

            {/* Immersive SpaceX dark footer */}
            <Footer />

          </div>
        </ScrollProvider>
      )}
    </>
  );
}
