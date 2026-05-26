"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "./ui/Magnetic";
import { Search, Menu, X, Globe, Wifi, Compass, Cpu, Bell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(14);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLang, setCurrentLang] = useState<"en" | "id">("en");

  useEffect(() => {
    // Keep Google Translate cookie check
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
    document.cookie = `googtrans=/en/${nextLang}; path=/;`;
    document.cookie = `googtrans=/en/${nextLang}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  useEffect(() => {
    // Real-time clock (UTC+7 / Local)
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

    // Fluctuating network telemetry (SpaceX cockpit feel)
    const latencyInterval = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next < 10 ? 10 : next > 22 ? 22 : next;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(latencyInterval);
    };
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "AI", href: "/category/ai" },
    { label: "Startup", href: "/category/startup" },
    { label: "Cyber", href: "/category/cyber" },
    { label: "Gadget", href: "/category/gadget" },
    { label: "Robotics", href: "/category/robotics" },
    { label: "Space", href: "/category/space" },
    { label: "Future", href: "/category/future" },
    { label: "Reviews", href: "/category/reviews" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass-header border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo - SpaceX / NASA style */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Lokanode Logo"
                className="h-6 w-6 object-contain"
              />
              <span 
                className="font-heading text-lg font-black tracking-[0.25em] text-white transition-all group-hover:text-blue-400 notranslate"
                translate="no"
              >
                LOKA<span className="text-blue-500 font-light">NODE</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse hidden sm:inline-block" />
            </Link>
            <span className="text-[9px] font-mono text-slate-500 hidden xl:inline-block border border-white/10 rounded px-1.5 py-0.5 bg-white/[0.01]">
              MISSION CONTROL // v4.2
            </span>
          </div>

          {/* Navigation Links - Centered */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest font-heading transition-all rounded-md hover:text-white ${
                    isActive 
                      ? "text-blue-400 bg-blue-500/5 border border-blue-500/10" 
                      : "text-slate-400 border border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Interactive Utilities & Telemetry HUD */}
          <div className="flex items-center gap-4">
            
            {/* Live Telemetry Panel - Desktop */}
            <div className="hidden md:flex items-center gap-3.5 text-[9px] font-mono text-slate-400 border border-white/5 bg-space-secondary/40 px-3 py-1.5 rounded-md">
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-blue-500" />
                <span>PING: <strong className="text-white">{latency}MS</strong></span>
              </div>
              <div className="h-2.5 w-[1px] bg-white/10" />
              <div className="flex items-center gap-1">
                <Cpu className="h-3 w-3 text-blue-400" />
                <span>SERVER: <strong className="text-white">SYS_OK</strong></span>
              </div>
              <div className="h-2.5 w-[1px] bg-white/10" />
              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-blue-400 font-bold hover:text-blue-300 transition-colors cursor-pointer"
                title="Switch Language (Google Translate)"
              >
                <Globe className="h-3 w-3" />
                <span>{currentLang === "en" ? "EN" : "ID"}</span>
              </button>
            </div>

            {/* Live Clock Display */}
            <div className="text-[10px] font-mono text-blue-400 font-bold hidden sm:block border border-blue-500/10 px-2 py-1 rounded bg-blue-500/5">
              {time || "00:00:00"}
            </div>

            {/* Search Toggle Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5 rounded-md hover:bg-white/[0.03]"
              title="Search Articles"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5 rounded-md hover:bg-white/[0.03]"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-space-black/95 backdrop-blur-md flex items-start justify-center pt-24 px-4 sm:px-6">
          <div className="w-full max-w-2xl bg-space-secondary border border-white/10 rounded-xl p-5 shadow-2xl relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-heading text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 notranslate" translate="no">
              LOKANODE // SEARCH DATABASE
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, technology paradigms, space programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-space-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
              <Search className="absolute right-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
            </div>

            {/* Quick Suggestions */}
            <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span>Trending:</span>
              {["ASML Lithography", "Orion GPT-6", "SpaceX Telemetry", "Tesla Optimus"].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 px-2 py-1 rounded border border-white/5 transition-all text-[11px] cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
            
            {/* Search Results Mock / Hint */}
            {searchQuery && (
              <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
                <p className="text-[11px] font-mono text-slate-400 uppercase">
                  SIMULATING QUERY RESULTS FOR: &quot;{searchQuery}&quot;
                </p>
                <div className="bg-space-black/50 border border-white/5 rounded-lg p-3.5 hover:border-blue-500/30 transition-all">
                  <Link 
                    href={`/article/silicon-hegemony-asml-taiwan-lithography`} 
                    onClick={() => setSearchOpen(false)}
                    className="block group"
                  >
                    <div className="text-[10px] font-mono text-blue-400 uppercase mb-1">CYBER // GEOPOLITICS</div>
                    <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      The Silicon Hegemony: Will ASML EUV Lithography Systems Go Dark in a Global Conflict?
                    </h4>
                  </Link>
                </div>
                <div className="bg-space-black/50 border border-white/5 rounded-lg p-3.5 hover:border-blue-500/30 transition-all">
                  <Link 
                    href={`/article/openai-orion-gpt6-agi-neural-networks`} 
                    onClick={() => setSearchOpen(false)}
                    className="block group"
                  >
                    <div className="text-[10px] font-mono text-blue-400 uppercase mb-1">AI // NEURAL</div>
                    <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      OpenAI Orion Architecture: The Distributed Synapse Paradigm for GPT-6 Revealed
                    </h4>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-space-black/98 backdrop-blur-xl flex flex-col justify-center px-6 lg:hidden">
          <div className="orbital-grid opacity-10" />
          <nav className="flex flex-col gap-5 relative z-10">
            {menuItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-left text-xl font-bold tracking-widest uppercase hover:text-blue-400 transition-colors border-b border-white/5 pb-2 font-heading"
              >
                <span className="text-blue-500 mr-4 font-mono text-xs">0{idx + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-10 left-6 right-6 font-mono text-[9px] text-slate-500 space-y-4 border-t border-white/5 pt-6">
            <div className="grid grid-cols-2 gap-3.5">
              <div>SYS_OK: 100%</div>
              <div>PING DUPLEX: {latency}MS</div>
              <div>TIME STAMP: {time || "00:00:00"}</div>
              <div>
                <button
                  onClick={toggleLanguage}
                  className="text-blue-400 font-bold"
                >
                  🌐 TRANS: {currentLang === "en" ? "EN" : "ID"}
                </button>
              </div>
            </div>
            <div className="text-[8px] text-slate-600 tracking-wider notranslate" translate="no">
              LOKANODE — TECHNOLOGY BEYOND GRAVITY. ALL SYSTEMS SECURED.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
