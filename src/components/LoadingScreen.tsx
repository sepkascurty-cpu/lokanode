"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Elegant short loading time (1.5 seconds)
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: "blur(25px)",
            transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070A] text-white"
        >
          {/* Subtle noise layer */}
          <div className="noise-overlay" />

          <motion.div
            initial={{ filter: "blur(12px)", opacity: 0, scale: 0.96 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center gap-4 text-center select-none"
          >
            {/* Logo image next to text */}
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Lokanode Logo"
                className="h-10 w-10 object-contain"
              />
              <span 
                className="font-heading text-2xl font-black tracking-[0.25em] text-white notranslate"
                translate="no"
              >
                LOKA<span className="text-blue-500 font-light">NODE</span>
              </span>
            </div>
            
            {/* Simple thin blur loading indicator bar */}
            <div className="w-24 h-[1.5px] bg-white/5 relative overflow-hidden mt-1 rounded-full">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/3 bg-blue-500"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
