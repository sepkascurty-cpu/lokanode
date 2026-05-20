"use client";

import React from "react";
import { motion } from "framer-motion";
import Globe from "./Globe";
import Magnetic from "./ui/Magnetic";
import { ChevronRight, ShieldAlert, Cpu, Globe2, Radio } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#030303]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-20" />
        <div className="cyber-grid-dots opacity-40" />
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
        
        {/* Animated Scanlines */}
        <div className="scanlines opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        
        {/* Left Side: Dynamic Editorial Branding Content */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Status HUD tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-cyan text-[10px] font-mono tracking-widest text-cyan-400 uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ORBITAL NET CONNECTED // NODE_SYS: OK</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.95] text-white uppercase"
            >
              THE FUTURE <br className="hidden sm:inline" />
              RUNS THROUGH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 glow-text-cyan">
                LOKANODE
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-base sm:text-lg md:text-xl font-normal max-w-xl tracking-wide font-sans leading-relaxed"
            >
              Global technology intelligence for the next civilization. Mapping the frontiers of AI, quantum computing, aerospace, cybersecurity, and future infrastructure.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            {/* Primary CTA */}
            <Magnetic>
              <button
                onClick={() => scrollToSection("market")}
                className="group relative px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-xs tracking-widest uppercase transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] cursor-pointer flex items-center gap-2 overflow-hidden"
              >
                <span>Explore Intelligence</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>

            {/* Secondary CTA */}
            <Magnetic>
              <button
                onClick={() => scrollToSection("geopolitics")}
                className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-cyan-400/50 text-white font-semibold text-xs tracking-widest uppercase transition-all bg-white/[0.02] hover:bg-cyan-500/[0.04] cursor-pointer flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
              >
                <span>Enter The Network</span>
              </button>
            </Magnetic>
          </motion.div>

          {/* Bottom HUD metrics display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-10 grid grid-cols-3 gap-6 max-w-lg border-t border-white/5 hud-line font-mono"
          >
            <div className="space-y-1">
              <span className="text-[9px] text-white/30 uppercase tracking-widest block">Core Telemetry</span>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <Globe2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>3.4k Nodes</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-white/30 uppercase tracking-widest block">Quantum Sync</span>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <Cpu className="h-3.5 w-3.5 text-purple-400" />
                <span>99.98%</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-white/30 uppercase tracking-widest block">Defense Mesh</span>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <Radio className="h-3.5 w-3.5 text-emerald-400" />
                <span>Active</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Three.js Globe Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center w-full relative min-h-[400px] select-none pointer-events-auto"
        >
          {/* Circular Holographic Ring Background */}
          <div className="absolute w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full border border-white/[0.02] animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-dashed border-cyan-400/5 animate-[spin_120s_linear_infinite]" />
          
          <Globe />
        </motion.div>
      </div>

      {/* Slide indicator chevron */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20 select-none text-[9px] font-mono tracking-widest uppercase pointer-events-none">
        <span>Scroll down</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
