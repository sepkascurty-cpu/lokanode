"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INIT // LOKANODE MISSION INTEGRATION SYSTEMS...",
  "TELEMETRY: ESTABLISHING SECURE QUANTUM LINK STATE...",
  "COGNITIVE NODE: INITIALIZING DISTRIBUTED SYNAPSE PARADIGM...",
  "ORBITAL CHECK: SYNCING WITH ORBITAL SATELLITE ARRAY v4.2...",
  "PROPULSION SCAN: RAPTOR FLIGHT PATH ENVELOPE STABILIZED...",
  "SPECTRAL SCAN: HIGH-NA EUV LITHOGRAPHY CALIBRATION ACTIVE...",
  "INTELLIGENCE ROOM: ENGAGING JOURNALISTIC KNOWLEDGE CORES...",
  "READY // LOKANODE MISSION CONTROL SECURED. TECHNOLOGY BEYOND GRAVITY."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Progress Bar Logic
    const duration = 2000; // 2 seconds loading
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 400);
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

    const logDelay = 1700 / BOOT_LOGS.length; // stagger logs over loading time
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
            scale: 1.03,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070A] px-6 text-white font-mono"
        >
          {/* Subtle sweep scanner animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0 pointer-events-none" />
          <div className="orbital-grid opacity-20" />
          <div className="orbital-dots opacity-35" />

          <div className="w-full max-w-xl relative z-10">
            {/* Tech Logo Header */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-xs font-bold tracking-widest text-blue-400">LOKANODE // MISSION_CONTROL</span>
              </div>
              <span className="text-[10px] text-white/40">SYS_SEC: ACTIVE</span>
            </div>

            {/* Simulated Boot Console Log */}
            <div className="h-44 overflow-y-auto mb-8 pr-2 flex flex-col gap-1.5 text-[10px] leading-relaxed text-slate-400 select-none scrollbar-none">
              {displayedLogs.map((log, index) => (
                <div key={index} className="flex gap-2.5 items-start">
                  <span className="text-blue-500 font-bold">[{index + 1}]</span>
                  <span className={index === BOOT_LOGS.length - 1 ? "text-blue-400 font-semibold" : ""}>
                    {log}
                  </span>
                </div>
              ))}
              {progress < 100 && (
                <div className="flex items-center gap-1 text-blue-500/80">
                  <span>&gt;</span>
                  <span className="w-2.5 h-3.5 bg-blue-500 animate-pulse inline-block" />
                </div>
              )}
            </div>

            {/* Progress Metrics & Bar */}
            <div className="space-y-4">
              <div className="flex justify-between items-end text-xs">
                <div className="space-y-1">
                  <span className="text-white/30 block text-[9px] uppercase tracking-widest font-sans">Connecting Mission Systems</span>
                  <span className="font-semibold text-blue-400">SYNCING TELEMETRY STREAM</span>
                </div>
                <span className="text-lg font-bold text-blue-400 tracking-tight font-sans">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Progress track */}
              <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between text-[8px] text-white/30 uppercase tracking-widest">
                <span>TX / 840kbps</span>
                <span>SECURE SSL v3.4</span>
                <span>OS.CORE.v4.1</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
