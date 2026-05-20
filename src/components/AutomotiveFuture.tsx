"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Compass, BatteryCharging, Gauge, ArrowRight } from "lucide-react";

interface Vehicle {
  name: string;
  brand: string;
  type: string;
  specs: {
    acceleration: string;
    range: string;
    power: string;
    ai: string;
  };
  accentColor: string;
  wireframeUrl: string; // We will build stunning inline SVGs instead of static image links!
}

const VEHICLES: Vehicle[] = [
  {
    name: "CYBERBEAST",
    brand: "TESLA",
    type: "Tactical Armored EV Cargo",
    specs: {
      acceleration: "2.6s 0-60",
      range: "518 Miles",
      power: "845 HP",
      ai: "FSD v15 Core",
    },
    accentColor: "rgba(0, 240, 255, 1)",
    wireframeUrl: "cyberbeast",
  },
  {
    name: "LOKAJET eVTOL",
    brand: "LOKANODE AEROSPACE",
    type: "Autonomous Ducted-Fan Jet",
    specs: {
      acceleration: "0-180 in 4s",
      range: "420 Miles",
      power: "1200 kW",
      ai: "Avionics Neural",
    },
    accentColor: "rgba(189, 0, 255, 1)",
    wireframeUrl: "evtol",
  },
  {
    name: "AETHERA HYPERCAR",
    brand: "NEURAL MOTORS",
    type: "AGI-Cognitive hypercar",
    specs: {
      acceleration: "1.7s 0-60",
      range: "680 Miles",
      power: "1800 HP",
      ai: "Neural Link v4",
    },
    accentColor: "rgba(255, 59, 48, 1)",
    wireframeUrl: "hypercar",
  },
];

export default function AutomotiveFuture() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll position of container to drive horizontal position
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Map 0 -> 1 scroll state to horizontal slide shifts
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  return (
    <div id="automotive" ref={containerRef} className="h-[300vh] w-full relative">
      
      {/* Sticky viewport frame */}
      <div className="h-screen w-full sticky top-0 overflow-hidden bg-black flex items-center">
        
        {/* Subtle grid and ambient backdrop */}
        <div className="absolute inset-0 z-0">
          <div className="cyber-grid opacity-10" />
          <div className="cyber-grid-dots opacity-20" />
          <div className="absolute bottom-10 left-10 text-[9px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
            Sys_Auto: Active // Horizon Parallax Scroll
          </div>
        </div>

        {/* Dynamic Horizontal Track */}
        <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
          {VEHICLES.map((vehicle, idx) => (
            <section
              key={vehicle.name}
              className="w-screen h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative select-none"
            >
              
              {/* Background ambient lighting keyed to vehicle */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] rounded-full filter blur-[150px] pointer-events-none opacity-[0.06]"
                style={{ backgroundColor: vehicle.accentColor }}
              />

              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left spec panels */}
                <div className="lg:col-span-5 space-y-8 text-left">
                  
                  <div className="space-y-3">
                    <span className="text-xs font-mono tracking-widest uppercase block opacity-40">
                      {vehicle.brand} // {vehicle.type}
                    </span>
                    <h2 
                      className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none"
                      style={{ color: "#fff", textShadow: `0 0 40px ${vehicle.accentColor}30` }}
                    >
                      {vehicle.name}
                    </h2>
                  </div>

                  {/* Specification grid HUD style */}
                  <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-white/40 font-mono text-[9px] uppercase tracking-widest">
                        <Gauge className="h-3 w-3" />
                        <span>Velocity</span>
                      </div>
                      <span className="text-base font-extrabold text-white tracking-wide font-mono">
                        {vehicle.specs.acceleration}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-white/40 font-mono text-[9px] uppercase tracking-widest">
                        <BatteryCharging className="h-3 w-3" />
                        <span>Autonomy Range</span>
                      </div>
                      <span className="text-base font-extrabold text-white tracking-wide font-mono">
                        {vehicle.specs.range}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-white/40 font-mono text-[9px] uppercase tracking-widest">
                        <Zap className="h-3 w-3" />
                        <span>Core Thrust</span>
                      </div>
                      <span className="text-base font-extrabold text-white tracking-wide font-mono">
                        {vehicle.specs.power}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-white/40 font-mono text-[9px] uppercase tracking-widest">
                        <Compass className="h-3 w-3" />
                        <span>AI Autopilot</span>
                      </div>
                      <span className="text-base font-extrabold text-white tracking-wide font-mono">
                        {vehicle.specs.ai}
                      </span>
                    </div>
                  </div>

                  <button 
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase cursor-pointer hover:underline pt-4"
                    style={{ color: vehicle.accentColor }}
                  >
                    <span>Inspect specifications blueprint</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Right schematic wireframe vector artwork (Inline SVGs) */}
                <div className="lg:col-span-7 flex justify-center items-center w-full min-h-[300px]">
                  
                  {vehicle.wireframeUrl === "cyberbeast" && (
                    <svg viewBox="0 0 500 220" className="w-full max-w-xl opacity-75 animate-[pulse_6s_infinite]">
                      <defs>
                        <linearGradient id="cyberGlow" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      {/* Cyberbeast Blueprint */}
                      <path d="M 50 160 L 150 160 L 190 110 L 320 110 L 450 160 H 480 L 470 120 L 400 90 L 290 80 L 170 110 L 50 140 Z" fill="none" stroke="url(#cyberGlow)" strokeWidth="1.5" />
                      <circle cx="130" cy="165" r="28" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="130" cy="165" r="8" fill="none" stroke="#00f0ff" strokeWidth="1" />
                      <circle cx="380" cy="165" r="28" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="380" cy="165" r="8" fill="none" stroke="#00f0ff" strokeWidth="1" />
                      <line x1="170" y1="110" x2="290" y2="80" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="4 4" />
                      <text x="250" y="145" fill="#00f0ff" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.6">STEER-BY-WIRE MODULE</text>
                    </svg>
                  )}

                  {vehicle.wireframeUrl === "evtol" && (
                    <svg viewBox="0 0 500 220" className="w-full max-w-xl opacity-75 animate-[pulse_6s_infinite]">
                      <defs>
                        <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#bd00ff" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="#bd00ff" stopOpacity="1" />
                          <stop offset="100%" stopColor="#bd00ff" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      {/* eVTOL Jet Blueprint */}
                      <path d="M 50 120 Q 250 80 450 120 L 430 140 Q 250 110 70 140 Z" fill="none" stroke="url(#purpleGlow)" strokeWidth="1.5" />
                      {/* Front and back ducted fans */}
                      <ellipse cx="140" cy="115" rx="24" ry="8" fill="none" stroke="#bd00ff" strokeWidth="1.5" />
                      <ellipse cx="360" cy="115" rx="24" ry="8" fill="none" stroke="#bd00ff" strokeWidth="1.5" />
                      {/* Propeller axes */}
                      <line x1="140" y1="105" x2="140" y2="125" stroke="#bd00ff" strokeWidth="1" />
                      <line x1="360" y1="105" x2="360" y2="125" stroke="#bd00ff" strokeWidth="1" />
                      {/* Wing line */}
                      <path d="M 120 120 L 10 135 H 490 L 380 120" fill="none" stroke="#bd00ff" strokeWidth="1" />
                      <text x="250" y="170" fill="#bd00ff" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.6">QUAD-DUCTED SOLID-STATE FANS</text>
                    </svg>
                  )}

                  {vehicle.wireframeUrl === "hypercar" && (
                    <svg viewBox="0 0 500 220" className="w-full max-w-xl opacity-75 animate-[pulse_6s_infinite]">
                      <defs>
                        <linearGradient id="redGlow" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="#ff3b30" stopOpacity="1" />
                          <stop offset="100%" stopColor="#ff3b30" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      {/* Hypercar Blueprint */}
                      <path d="M 60 155 Q 120 150 150 120 Q 250 80 350 120 Q 380 150 440 155 L 450 130 Q 390 100 350 100 Q 250 85 150 100 Q 110 100 50 130 Z" fill="none" stroke="url(#redGlow)" strokeWidth="1.5" />
                      <circle cx="120" cy="155" r="24" fill="none" stroke="#ff3b30" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="380" cy="155" r="24" fill="none" stroke="#ff3b30" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="120" cy="155" r="6" fill="none" stroke="#ff3b30" strokeWidth="1" />
                      <circle cx="380" cy="155" r="6" fill="none" stroke="#ff3b30" strokeWidth="1" />
                      <path d="M 200 115 H 300 Q 310 130 300 140 H 200 Z" fill="none" stroke="#ff3b30" strokeWidth="1" />
                      <text x="250" y="170" fill="#ff3b30" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.6">CARBON-TITANIUM AGI MONOCOQUE</text>
                    </svg>
                  )}

                </div>

              </div>

            </section>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
