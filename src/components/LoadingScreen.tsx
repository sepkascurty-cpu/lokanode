"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "SYSTEM INIT: LOKANODE CORE ENGINE v4.12.0...",
  "COGNITIVE LAYER: INITIALIZING NEURAL PATHWAYS...",
  "RESOLVING METRICS: STOCK HEATMAP & TELEMETRY MODULES...",
  "ESTABLISHING SYNERGY: CONNECTING QUANTUM SUPERPOSITION NODES...",
  "GEOPOLITICAL ORBIT: MAPPING GLOBE DATA CENTERS...",
  "AEROSPACE COMS: ORBITAL TELEMETRY LINKS READY...",
  "AGI SYNAPSE CHECK: 100% OPERATIONAL...",
  "LOKANODE INTERFACE: ONLINE. WELCOME TO THE NEXT ERA.",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Progress Bar Logic
    const duration = 2500; // 2.5 seconds loading
    const intervalTime = 25;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 500);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 2. Telemetry Logs Printing Logic
    if (currentLog >= BOOT_LOGS.length) return;

    const logDelay = 2200 / BOOT_LOGS.length; // stagger logs over loading time
    const timer = setTimeout(() => {
      setDisplayedLogs((prev) => [...prev, BOOT_LOGS[currentLog]]);
      setCurrentLog((prev) => prev + 1);
    }, logDelay);

    return () => clearTimeout(timer);
  }, [currentLog]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: "blur(20px)",
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] px-6 text-white font-mono"
        >
          {/* Cyber scanner animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1/2 w-full animate-pulse top-0 pointer-events-none" />
          <div className="cyber-grid opacity-30" />

          <div className="w-full max-w-xl relative z-10">
            {/* Tech Logo Header */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-sm font-bold tracking-widest text-cyan-400">LOKANODE // AGI_OS</span>
              </div>
              <span className="text-xs text-white/40">SYS_SEC: SECURE</span>
            </div>

            {/* Simulated Boot Console Log */}
            <div className="h-48 overflow-y-auto mb-8 pr-2 flex flex-col gap-1 text-[11px] leading-relaxed text-white/70 select-none scrollbar-thin">
              {displayedLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-cyan-500">[{index + 1}]</span>
                  <span className={index === BOOT_LOGS.length - 1 ? "text-cyan-400 font-bold" : ""}>
                    {log}
                  </span>
                </div>
              ))}
              {progress < 100 && (
                <div className="flex items-center gap-1 text-cyan-500/80">
                  <span>&gt;</span>
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
                </div>
              )}
            </div>

            {/* Progress Metrics & Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-end text-xs">
                <div className="space-y-1">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">Loading System Buffer</span>
                  <span className="font-semibold text-cyan-400">DATA TRANSMISSION IN PROGRESS</span>
                </div>
                <span className="text-xl font-bold text-cyan-400 tracking-tighter">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Progress track */}
              <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between text-[9px] text-white/30 uppercase tracking-widest">
                <span>0.00kb/s</span>
                <span>Port: 8080 // SSL_ACTIVE</span>
                <span>Core.v4</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
