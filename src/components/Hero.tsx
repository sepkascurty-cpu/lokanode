"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Globe from "./Globe";
import Magnetic from "./ui/Magnetic";
import { ChevronRight, Globe2, Cpu, Radio, Calendar, User } from "lucide-react";

export default function Hero() {
  const featuredArticle = {
    slug: "silicon-hegemony-asml-taiwan-lithography",
    title: "THE SILICON WAR FOR TAIWAN: WILL ASML LITHOGRAPHY SYSTEMS GO DARK IN A CONFLICT?",
    category: "CYBER // GEOPOLITICS",
    excerpt: "An in-depth analysis of semiconductor foundry chokepoints and the ASML EUV lithography monopoly. As geopolitical tensions mount, tech giants rush to decentralize fabrication plants. We explore what happens if the lithography lasers go silent.",
    author: "Dr. Teresa L. Williams",
    date: "May 24, 2026",
    readTime: "8 min read",
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-12 overflow-hidden bg-[#05070A] border-b border-white/5">
      
      {/* Background Ambience & Space Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="orbital-grid opacity-20" />
        <div className="orbital-dots opacity-30" />
        <div className="space-glow-1" />
        <div className="space-glow-2" />
        {/* Subtle noise layer for high-end paper grain overlay */}
        <div className="noise-overlay" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-10">
        
        {/* Left Side: Large Featured Article details */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Mission Tag / Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-blue-500/10 bg-blue-500/5 text-[9px] font-mono tracking-[0.2em] text-blue-400 uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
            <span>FEATURED INTEL // LOKANODE MAIN DECK</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase block mb-2">
                {featuredArticle.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[0.98] text-white uppercase text-gradient">
                {featuredArticle.title}
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl tracking-wide font-sans leading-relaxed"
            >
              {featuredArticle.excerpt}
            </motion.p>
          </div>

          {/* Meta Author & Spacing */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-4 text-[10px] font-mono text-slate-500 border-y border-white/5 py-3 max-w-xl"
          >
            <div className="flex items-center gap-1.5 text-slate-300">
              <User className="h-3.5 w-3.5 text-blue-500" />
              <span>BY <strong className="text-white uppercase">{featuredArticle.author}</strong></span>
            </div>
            <div className="h-3 w-[1px] bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{featuredArticle.date}</span>
            </div>
            <div className="h-3 w-[1px] bg-white/10" />
            <span>{featuredArticle.readTime}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary CTA */}
            <Magnetic>
              <Link
                href={`/article/${featuredArticle.slug}`}
                className="group relative px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(27,77,255,0.25)] hover:shadow-[0_4px_30px_rgba(27,77,255,0.4)] cursor-pointer flex items-center gap-2 overflow-hidden border border-blue-400/20"
              >
                <span>Read Full Dispatch</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>

            {/* Secondary CTA */}
            <Magnetic>
              <Link
                href={`/category/cyber`}
                className="px-6 py-3.5 rounded-lg border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white font-semibold text-xs tracking-widest uppercase transition-all bg-white/[0.01] hover:bg-blue-500/[0.04] cursor-pointer flex items-center gap-2"
              >
                <span>Cyber Domain Feed</span>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Bottom Space HUD Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="pt-6 grid grid-cols-3 gap-6 max-w-md border-t border-white/5 font-mono"
          >
            <div className="space-y-1">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Orbital nodes</span>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <Globe2 className="h-3.5 w-3.5 text-blue-500" />
                <span>3.4k Nodes</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Quantum sync</span>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <Cpu className="h-3.5 w-3.5 text-blue-400" />
                <span>99.98%</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Mission radar</span>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <Radio className="h-3.5 w-3.5 text-emerald-500" />
                <span>ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Rotating 3D Aerospace Coordinates Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center w-full relative min-h-[350px] select-none pointer-events-none lg:pointer-events-auto"
        >
          {/* Circular Holographic Ring Background */}
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-white/[0.015] animate-[spin_80s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] rounded-full border border-dashed border-blue-500/5 animate-[spin_160s_linear_infinite] pointer-events-none" />
          
          <Globe />
        </motion.div>
      </div>

      {/* Bounce scroll down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 select-none text-[8px] font-mono tracking-widest uppercase pointer-events-none">
        <span>MISSION FEED SCROLL</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-blue-500 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
