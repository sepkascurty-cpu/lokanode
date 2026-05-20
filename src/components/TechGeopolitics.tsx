"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ShieldAlert, Cpu, Sparkles, MapPin } from "lucide-react";

interface Hotspot {
  id: string;
  name: string;
  region: string;
  x: number; // SVG mapping coordinates
  y: number;
  r: number;
  metricLabel: string;
  metricValue: string;
  description: string;
  status: "high-tension" | "strategic" | "command";
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "taiwan",
    name: "Hsinchu (TSMC Foundry)",
    region: "Taiwan",
    x: 410,
    y: 135,
    r: 8,
    metricLabel: "Advanced Node Output",
    metricValue: "92% global supply",
    description: "Geopolitical flashpoint. TSMC foundries represent the single point of failure for international computing infrastructure.",
    status: "high-tension",
  },
  {
    id: "silicon_valley",
    name: "Silicon Valley (NVIDIA & OpenAI)",
    region: "United States",
    x: 130,
    y: 110,
    r: 8,
    metricLabel: "AGI Architecture & Design",
    metricValue: "84% market cap",
    description: "Design hub of top-tier accelerators (NVIDIA) and frontier LLM development centers (OpenAI, Google DeepMind).",
    status: "command",
  },
  {
    id: "shenzhen",
    name: "Shenzhen (Rare Earth & Hardware)",
    region: "China",
    x: 395,
    y: 130,
    r: 7,
    metricLabel: "Lithium & Raw Supply",
    metricValue: "78% global capacity",
    description: "Rare earth elements refinement and massive supply-chain scale for electronic assembly manufacturing.",
    status: "strategic",
  },
  {
    id: "netherlands",
    name: "Eindhoven (ASML Monopoly)",
    region: "Netherlands",
    x: 275,
    y: 90,
    r: 6,
    metricLabel: "EUV Lithography Machine",
    metricValue: "100% advanced output",
    description: "ASML gatekeep lithography systems. Essential capital hardware required to print transistors beneath 3nm thresholds.",
    status: "strategic",
  },
];

export default function TechGeopolitics() {
  const [hoveredNode, setHoveredNode] = useState<Hotspot | null>(HOTSPOTS[0]); // default to first

  return (
    <section id="geopolitics" className="py-24 relative overflow-hidden bg-[#030303] border-t border-white/5">
      <div className="cyber-grid opacity-10" />
      <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vh] rounded-full filter blur-[150px] pointer-events-none bg-cyan-500/[0.03]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest">
            <Globe className="h-4.5 w-4.5 animate-pulse text-rose-500" />
            <span>GLOBAL COLD WAR MONITORS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
            GLOBAL TECH <span className="text-rose-500">GEOPOLITICS</span>
          </h2>
          <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed">
            Investigating critical supply chains, lithium refinement monopolies, semiconductor foundry chokepoints, and the global race for AGI dominance.
          </p>
        </div>

        {/* Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Column Left: Visual minimalist SVG world map */}
          <div className="lg:col-span-8 glass-panel rounded-2xl border border-white/5 p-6 flex flex-col justify-center items-center shadow-2xl relative min-h-[380px] overflow-hidden">
            <div className="absolute top-4 left-4 font-mono text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">
              Strategic Foundry Hubs & Node Maps
            </div>

            {/* Custom World Map Graphic */}
            <div className="w-full relative max-w-[550px] aspect-[550/260]">
              
              {/* Minimal world silhouette path */}
              <svg viewBox="0 0 550 260" className="w-full h-full opacity-20 pointer-events-none">
                {/* Continents outlines (Stylized clean shapes) */}
                {/* Americas */}
                <path d="M 60 40 L 90 20 L 140 40 L 180 80 L 150 110 L 120 120 L 160 160 L 170 210 L 150 240 L 130 220 L 140 180 L 110 150 L 90 125 L 80 80 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                {/* Eurasia/Africa */}
                <path d="M 230 110 L 260 90 L 320 30 L 400 40 L 460 70 L 490 120 L 440 180 L 390 180 L 320 150 L 260 140 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <path d="M 230 110 L 280 110 L 320 160 L 340 220 L 310 240 L 270 210 L 250 170 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                {/* Australia */}
                <path d="M 440 200 L 480 200 L 490 230 L 450 240 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              </svg>

              {/* Hotspot buttons laid on map coordinates */}
              {HOTSPOTS.map((node) => {
                const isActive = hoveredNode?.id === node.id;
                
                // Color schemes
                const statusColors = {
                  "high-tension": "bg-rose-500 shadow-rose-500/50 border-rose-500/50",
                  "strategic": "bg-cyan-400 shadow-cyan-400/50 border-cyan-400/50",
                  "command": "bg-purple-500 shadow-purple-500/50 border-purple-500/50",
                };

                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onClick={() => setHoveredNode(node)}
                    className="absolute cursor-pointer transition-all duration-300 focus:outline-none"
                    style={{
                      left: `${(node.x / 550) * 100}%`,
                      top: `${(node.y / 260) * 100}%`,
                      transform: `translate(-50%, -50%)`,
                    }}
                  >
                    {/* Ring animation */}
                    <span className={`absolute -inset-2.5 rounded-full border border-dashed animate-spin opacity-40 ${
                      isActive ? "scale-110 border-white/40" : "border-white/10"
                    }`} />
                    
                    {/* Pulsing glow node */}
                    <span className={`h-3 w-3 rounded-full block border ${
                      statusColors[node.status]
                    } ${isActive ? "scale-125 animate-ping" : "animate-pulse"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column Right: Live HUD Telemetry details of hovered node */}
          <div className="lg:col-span-4 h-full">
            <AnimatePresence mode="wait">
              {hoveredNode && (
                <motion.div
                  key={hoveredNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col justify-between h-[380px] shadow-2xl relative text-left"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4.5 w-4.5 text-rose-500" />
                        <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                          Hub Location Details
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded uppercase ${
                        hoveredNode.status === "high-tension"
                          ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                          : hoveredNode.status === "command"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}>
                        {hoveredNode.status}
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">
                          Chokepoint Hub
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-wide uppercase mt-0.5">
                          {hoveredNode.name}
                        </h3>
                        <span className="text-xs text-white/50 block font-mono mt-0.5">
                          Region: {hoveredNode.region}
                        </span>
                      </div>

                      <p className="text-xs text-white/60 leading-relaxed font-sans">
                        {hoveredNode.description}
                      </p>
                    </div>

                    {/* Geopolitical Telemetry metrics */}
                    <div className="bg-white/[0.01] border border-white/[0.03] rounded-xl p-3.5 font-mono text-[11px] space-y-1">
                      <span className="text-[8px] text-white/30 uppercase tracking-widest block">
                        {hoveredNode.metricLabel}
                      </span>
                      <span className="text-white font-bold block">
                        {hoveredNode.metricValue}
                      </span>
                    </div>
                  </div>

                  <div className="text-[8px] font-mono text-white/30 border-t border-white/5 pt-3 uppercase tracking-wider flex items-center gap-1.5 pointer-events-none mt-auto">
                    <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
                    <span>COGNITIVE INTEL: HIGH RISK</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
