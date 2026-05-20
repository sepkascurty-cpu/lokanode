"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Brain, Landmark, Rocket, Eye, Terminal, Sparkles } from "lucide-react";

interface TechCard {
  title: string;
  category: string;
  desc: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<any>;
  glowColor: "cyan" | "purple" | "amber" | "red";
  techStack: string[];
}

const CARDS: TechCard[] = [
  {
    title: "Artificial General Intelligence",
    category: "AI & AGI",
    desc: "Neural synapse emulation platforms mimicking human cognitive behavior with active multi-agent reinforcement learning.",
    metric: "89.5% Sync",
    metricLabel: "AGI Consciousness Index",
    icon: Brain,
    glowColor: "cyan",
    techStack: ["Transformers", "RLHF", "Deep Neural Nets"],
  },
  {
    title: "Quantum Supercomputing",
    category: "Computing",
    desc: "Harnessing superposition states and quantum entanglement to solve cryptographic complexities in fractions of a second.",
    metric: "420 Qubits",
    metricLabel: "Coherent Qubit Count",
    icon: Cpu,
    glowColor: "purple",
    techStack: ["Cryogenics", "Qubit Coherence", "Qiskit"],
  },
  {
    title: "Decentralized Finance & DePIN",
    category: "Finance & Web3",
    desc: "Post-quantum cryptographic networks powering global transaction scaling and decentralized physical infrastructure nodes.",
    metric: "$2.8B TVL",
    metricLabel: "Total Synced Value",
    icon: Landmark,
    glowColor: "cyan",
    techStack: ["ZK-Snarks", "Post-Quantum", "Solidity Mesh"],
  },
  {
    title: "Deep Space Aerospace",
    category: "Aerospace",
    desc: "Next-gen reusable spacecraft rocket telemetry, autonomous satellite constellation docking, and deep planetary navigation.",
    metric: "4.2M Lbs",
    metricLabel: "Orbital Thrust Level",
    icon: Rocket,
    glowColor: "amber",
    techStack: ["Raptor Engine", "SpaceX Link", "RTOS Navigation"],
  },
  {
    title: "Cognitive Humanoid Robotics",
    category: "Robotics",
    desc: "Zero-latency autonomous motor coordination using vision-language-action (VLA) models for human-collaborative operations.",
    metric: "12ms Latency",
    metricLabel: "Motor Synapse Delay",
    icon: Sparkles,
    glowColor: "purple",
    techStack: ["Actuators", "VLA Models", "Real-time Kinematics"],
  },
  {
    title: "1nm Semiconductor Lithography",
    category: "Semiconductor",
    desc: "Pioneering Angstrom-level gate technology to density-scale billions of transits per square millimeter for ultimate computing power.",
    metric: "1.2A Scale",
    metricLabel: "Lithography Resolution",
    icon: Terminal,
    glowColor: "red",
    techStack: ["EUV Photons", "Silicon Wafer", "NVIDIA CUDA"],
  },
];

export default function TrendingGrid() {
  return (
    <section id="trending" className="py-24 relative overflow-hidden bg-[#030303]">
      <div className="cyber-grid-dots opacity-20" />
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-1/4 w-[45vw] h-[45vw] bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse glow-purple" />
            <span>DISCOVERY PROTOCOLS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
            TRENDING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">TECHNOLOGY</span>
          </h2>
          <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed">
            Real-time analytics and predictive indexing of technologies defining the trajectory of future human civilization.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            
            // Set dynamic hover glow classes based on glowColor
            const glowStyles = {
              cyan: "hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] hover:border-cyan-400/40",
              purple: "hover:shadow-[0_0_40px_rgba(189,0,255,0.15)] hover:border-purple-400/40",
              amber: "hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:border-amber-400/40",
              red: "hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] hover:border-red-400/40",
            };

            const iconColors = {
              cyan: "text-cyan-400 bg-cyan-400/10",
              purple: "text-purple-400 bg-purple-400/10",
              amber: "text-amber-400 bg-amber-400/10",
              red: "text-red-400 bg-red-400/10",
            };

            const metricTextColors = {
              cyan: "text-cyan-400",
              purple: "text-purple-400",
              amber: "text-amber-400",
              red: "text-red-400",
            };

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`interactive-card cyber-card glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] border border-white/5 transition-all duration-500 group cursor-pointer ${
                  glowStyles[card.glowColor]
                }`}
              >
                {/* Top Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      {card.category}
                    </span>
                    <div className={`p-2 rounded-lg transition-transform duration-500 group-hover:scale-110 ${iconColors[card.glowColor]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase transition-colors group-hover:text-white group-hover:glow-text-cyan">
                    {card.title}
                  </h3>
                  
                  <p className="text-xs text-white/50 font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {card.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] font-mono bg-white/[0.03] border border-white/[0.04] text-white/60 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Telemetry telemetry bar */}
                  <div className="border-t border-white/5 pt-3 flex justify-between items-end font-mono">
                    <div>
                      <span className="text-[8px] text-white/30 uppercase tracking-wider block">
                        {card.metricLabel}
                      </span>
                      <span className={`text-base font-extrabold tracking-tight mt-1 inline-block ${metricTextColors[card.glowColor]}`}>
                        {card.metric}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] text-cyan-400/80">
                      <Eye className="h-3.5 w-3.5" />
                      <span>TELEMETRY</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
