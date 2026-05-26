"use client";

import React from "react";
import Link from "next/link";

const TICKER_ITEMS = [
  { text: "ASML lithography remote self-destruct mechanisms confirmed operational for geopolitics insulation", link: "/article/silicon-hegemony-asml-taiwan-lithography" },
  { text: "SpaceX Starship Raptor V4 vacuum ignition tests hit 230 bar chamber pressure limit", link: "/article/spacex-starship-orbital-refueling-mars" },
  { text: "Leaked Redmond specs detail OpenAI Orion (GPT-6) 12.8 trillion active neural parameters MoE v2", link: "/article/openai-orion-gpt6-agi-neural-networks" },
  { text: "Tesla humanoid Optimus Gen 3 units enter Gigafactory assembly lanes for fluid micro-tactile tests", link: "/article/tesla-optimus-gen3-gigafactory-deployment" },
  { text: "IBM deploys 1,200-Qubit Heron processor demonstrating commercial quantum error correction", link: "/article/quantum-computing-ibm-heron-qubit-advantage" },
  { text: "Apple Spatial Glass specs revealed: 72g weight, titanium chassis, custom Micro-OLED waveguides", link: "/article/apple-vision-glass-spatial-computing" },
];

export default function Ticker() {
  return (
    <div className="w-full bg-[#05070A] border-y border-white/5 relative z-20 py-2.5 overflow-hidden">
      {/* Accent thin blue indicator on top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 relative">
        {/* Flashing "Breaking" badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
          <span>LIVE TELEMETRY FEED</span>
        </div>

        {/* Vertical divider */}
        <div className="h-4 w-[1px] bg-white/10 shrink-0 hidden sm:block" />

        {/* Marquee container */}
        <div className="relative flex-grow overflow-hidden select-none">
          <div className="animate-marquee flex items-center whitespace-nowrap gap-12 text-[10px] font-mono tracking-wider uppercase text-slate-400">
            {/* First sequence of ticker items */}
            {TICKER_ITEMS.map((item, index) => (
              <div key={`tick-1-${index}`} className="flex items-center gap-3">
                <span className="text-blue-500 font-bold">//</span>
                <Link href={item.link} className="hover:text-blue-400 transition-colors">
                  {item.text}
                </Link>
                <span className="h-1 w-1 bg-slate-700 rounded-full" />
              </div>
            ))}

            {/* Repeated sequence to ensure infinite scroll loop works */}
            {TICKER_ITEMS.map((item, index) => (
              <div key={`tick-2-${index}`} className="flex items-center gap-3">
                <span className="text-blue-500 font-bold">//</span>
                <Link href={item.link} className="hover:text-blue-400 transition-colors">
                  {item.text}
                </Link>
                <span className="h-1 w-1 bg-slate-700 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
