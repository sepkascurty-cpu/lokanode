"use client";

import React, { useEffect, useState } from "react";
import Magnetic from "./ui/Magnetic";
import { Terminal, Shield, Wifi, Cpu, Menu, X } from "lucide-react";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(14);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"en" | "id">("en");

  useEffect(() => {
    // Check current cookie language setting
    const getCookie = (name: string) => {
      if (typeof document === "undefined") return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };
    const lang = getCookie("googtrans");
    if (lang === "/en/id") {
      setCurrentLang("id");
    } else {
      setCurrentLang("en");
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "id" : "en";
    // Set language translation cookie
    document.cookie = `googtrans=/en/${nextLang}; path=/;`;
    document.cookie = `googtrans=/en/${nextLang}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  useEffect(() => {
    // Real-time HUD Clock (UTC+7 / Local format)
    const updateClock = () => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    // Simulate fluctuating network telemetry
    const latencyInterval = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 8 ? 8 : next > 25 ? 25 : next;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(latencyInterval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Market", target: "market" },
    { label: "Trending", target: "trending" },
    { label: "Civilization", target: "civilization" },
    { label: "Automotive", target: "automotive" },
    { label: "Space & Defense", target: "space-defense" },
    { label: "Computing", target: "hardware" },
    { label: "Geopolitics", target: "geopolitics" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Logo HUD Panel */}
          <div className="glass-panel-heavy rounded-xl px-3 py-1.5 border border-white/5 flex items-center gap-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <img src="/logo.jpg" alt="LokaNode Logo" className="h-6 w-6 rounded-md border border-white/10" />
            <span className="text-xs font-bold tracking-widest text-white font-mono uppercase">
              LOKA<span className="text-cyan-400">NODE</span>
            </span>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <span className="text-[9px] font-mono text-white/40 hidden sm:inline-block tracking-wider">
              CIV_OS v9.5
            </span>
          </div>

          {/* Floating Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel rounded-full px-2 py-1.5 border border-white/5 shadow-2xl">
            {navItems.map((item) => (
              <Magnetic key={item.label}>
                <button
                  onClick={() => scrollToSection(item.target)}
                  className="px-4 py-2 text-xs font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                >
                  {item.label}
                </button>
              </Magnetic>
            ))}
          </nav>

          {/* System Telemetry & Quick CTA - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* System Status */}
            <div className="glass-panel px-4 py-2 rounded-xl text-[10px] font-mono flex items-center gap-4 text-white/50 border border-white/5 shadow-lg">
              <div className="flex items-center gap-1.5">
                <Wifi className="h-3 w-3 text-cyan-400" />
                <span>PING: <strong className="text-white">{latency}MS</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-purple-400" />
                <span>AGI CORE: <strong className="text-white">98%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-emerald-400" />
                <span>SEC: <strong className="text-white">SYS_OK</strong></span>
              </div>
              <div className="h-3 w-[1px] bg-white/10" />
              
              {/* Google Translate Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-cyan-400 font-bold hover:text-white transition-colors cursor-pointer"
                title="Change Platform Language"
              >
                <span>🌐 {currentLang === "en" ? "EN" : "ID"}</span>
              </button>

              <div className="h-3 w-[1px] bg-white/10" />
              <div className="text-cyan-400 font-bold">{time || "00:00:00"}</div>
            </div>

            {/* Premium CTA Button */}
            <Magnetic>
              <button 
                onClick={() => scrollToSection("footer")}
                className="bg-white text-black font-semibold text-xs tracking-widest px-4 py-2.5 rounded-lg hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer uppercase"
              >
                Connect Net
              </button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="glass-panel-heavy px-3 py-2 rounded-xl text-cyan-400 font-mono text-xs hover:text-white cursor-pointer"
            >
              🌐 {currentLang === "en" ? "EN" : "ID"}
            </button>
            
            <div className="glass-panel-heavy px-3 py-2 rounded-xl text-cyan-400 font-mono text-xs">
              {time || "00:00:00"}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="glass-panel-heavy p-2.5 rounded-xl border border-white/5 text-white/80 hover:text-white"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden">
          <div className="cyber-grid opacity-20" />
          <nav className="flex flex-col gap-6 relative z-10">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.target)}
                className="text-left text-2xl font-bold tracking-widest uppercase hover:text-cyan-400 transition-colors border-b border-white/5 pb-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="text-cyan-400 mr-4 font-mono text-sm">0{idx + 1}</span>
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="absolute bottom-10 left-8 right-8 font-mono text-[10px] text-white/40 space-y-4 border-t border-white/5 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>SYS_SECURE: ACTIVE</div>
              <div>AGI SYNERGY: 98%</div>
              <div>PING TELEMETRY: {latency}MS</div>
              <div>TIME STAMP: {time || "00:00:00"}</div>
            </div>
            <button
              onClick={() => scrollToSection("footer")}
              className="w-full bg-white text-black font-semibold text-xs tracking-widest py-3 rounded-lg text-center"
            >
              CONNECT TO THE NETWORK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
