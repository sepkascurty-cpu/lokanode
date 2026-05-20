"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Eye } from "lucide-react";

interface Article {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  color: string;
}

const SPOTLIGHT: Article = {
  title: "THE SILICON WAR FOR TAIWAN: WILL ASML LITHOGRAPHY MACHINES GO DARK IN A CONFLICT?",
  category: "GEOPOLITICS // SEMICONDUCTOR LITHOGRAPHY",
  excerpt: "An in-depth analysis of semiconductor foundry chokepoints and the ASML EUV lithography monopoly. As geopolitical tensions mount in the East, tech giants rush to decentralize fabrication plants. We explore what happens if the lithography lasers go silent.",
  author: "Teresa L. Williams",
  date: "May 20, 2026",
  readTime: "8 min read",
  color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

const ARTICLES: Article[] = [
  {
    title: "ORGANIC PHOTONIC INTEGRATED CIRCUITS: BIOLOGICAL BRAIN SYNERGY IN 1nm CHIPS",
    category: "HARDWARE // QUANTUM NEURAL NODES",
    excerpt: "Emerging research fuses organic bio-transceivers with optical wave interconnects, achieving raw computing capabilities at a fraction of thermodynamic load.",
    author: "Dr. Marcus Vance",
    date: "May 18, 2026",
    readTime: "6 min read",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    title: "AGI CONSTELLATION TELEMETRY: SPACEX RAPTOR V4 PREPARES FOR AN AUTONOMOUS MARS DESCENT",
    category: "AEROSPACE // MULTI-PLANETARY INTERRUPT",
    excerpt: "SpaceX's newest heavy rocket thruster undergoes AGI flight loop simulations to ensure safe Mars autonomous atmospheric deceleration entries.",
    author: "Elian H. Mercer",
    date: "May 15, 2026",
    readTime: "5 min read",
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    title: "ESTABLISHING QUANTUM CYBER FIREWALLS: IMMUNE NETWORKS AGAINST BRUTE COGNITIVE DECODERS",
    category: "CYBER DEFENSE // ENTANGLEMENT",
    excerpt: "National security agencies deploy post-quantum entanglement networks to insulate financial and military intelligence data pools from decrypting sweeps.",
    author: "Aiden S. Cross",
    date: "May 10, 2026",
    readTime: "7 min read",
    color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
];

export default function Articles() {
  return (
    <section id="articles" className="py-24 relative overflow-hidden bg-[#030303] border-t border-white/5 text-left">
      <div className="cyber-grid opacity-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <BookOpen className="h-4.5 w-4.5" />
            <span>ELITE MEDIA FEED</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
            FEATURED <span className="text-cyan-400">INTELLIGENCE</span>
          </h2>
          <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed">
            In-depth reporting and breaking dispatches at the intersection of future civilization, aerospace hegemony, and machine intelligence.
          </p>
        </div>

        {/* Media Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Spotlight Hero Left */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-panel rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col justify-between h-[450px] shadow-2xl relative overflow-hidden group cursor-pointer glint-effect"
          >
            {/* Ambient subtle image back glow */}
            <div className="absolute top-0 right-0 w-[45vw] h-[45vh] bg-rose-500/[0.02] rounded-full filter blur-[100px] pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded uppercase border ${SPOTLIGHT.color}`}>
                  {SPOTLIGHT.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight uppercase group-hover:text-rose-400 transition-colors">
                {SPOTLIGHT.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed font-sans max-w-xl">
                {SPOTLIGHT.excerpt}
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-white/40 mt-auto">
              <div className="flex items-center gap-4">
                <span>BY <strong className="text-white">{SPOTLIGHT.author}</strong></span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{SPOTLIGHT.date}</span>
                <span>{SPOTLIGHT.readTime}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-rose-500 font-bold group-hover:underline">
                <span>READ ESSAY</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>

          {/* Sidebar Grid Right */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {ARTICLES.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-panel rounded-2xl border border-white/5 p-5 flex flex-col justify-between h-[135px] shadow-2xl relative overflow-hidden group cursor-pointer glint-effect"
              >
                <div className="space-y-2">
                  <span className={`text-[8px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded uppercase border inline-block ${item.color}`}>
                    {item.category}
                  </span>
                  
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug uppercase tracking-wide group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </div>

                <div className="flex justify-between items-center font-mono text-[8px] text-white/30 border-t border-white/5 pt-2 mt-2">
                  <div className="flex items-center gap-3">
                    <span>{item.date}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Eye className="h-3 w-3" />
                    <span>TELEMETRY</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
