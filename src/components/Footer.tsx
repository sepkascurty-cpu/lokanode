"use client";

import React, { useState } from "react";
import Link from "next/link";
import Magnetic from "./ui/Magnetic";
import { Send, Shield, Server, RefreshCw } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#05070A] border-t border-white/5 pt-20 pb-12 relative overflow-hidden text-left z-20">
      <div className="orbital-grid opacity-10" />
      <div className="absolute bottom-0 right-0 w-[45vw] h-[45vh] rounded-full filter blur-[150px] pointer-events-none bg-blue-600/[0.02]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Segment: Brand Title & Newsletter Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-16">
          
          {/* Taglines */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Lokanode Logo"
                className="h-6 w-6 object-contain"
              />
              <span 
                className="font-heading text-lg font-black tracking-[0.25em] text-white notranslate"
                translate="no"
              >
                LOKA<span className="text-blue-500 font-light">NODE</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight leading-none text-gradient">
              TECHNOLOGY <br />
              BEYOND GRAVITY.
            </h3>
            
            <p className="text-xs text-slate-400 max-w-sm font-sans leading-relaxed">
              Synthesizing technological singularities, space-exploration paths, and advanced cyber security paradigms to chronicle the future of global civilization.
            </p>
          </div>

          {/* Futuristic Newsletter Matrix */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
              SUBSCRIBE TO THE INTELLIGENCE CORE
            </span>
            <p className="text-xs text-slate-400 font-sans">
              Synchronize your cortex with weekly telemetry indices, rocket flight manifests, and deep technology reports.
            </p>

            {subscribed ? (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="p-4 bg-blue-500/10 border border-blue-500/25 rounded-lg text-xs font-mono text-blue-400 uppercase tracking-wider animate-pulse">
                  SYSTEM STATUS: NEURAL FEED SYNCED SUCCESSFULLY
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-xs space-y-3">
                  <p className="text-slate-400 font-sans leading-relaxed">
                    Subscription linked! Connect with our TikTok node for premium next-generation space dispatches, robotics clips, and tech updates:
                  </p>
                  <Magnetic>
                    <a
                      href="https://www.tiktok.com/@lokanodebinary"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#fe2c55] hover:bg-[#d92247] text-white font-bold text-[10px] tracking-widest uppercase rounded-lg transition-all hover:shadow-[0_0_20px_rgba(254,44,85,0.4)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.2 1.22 1.34 2.92 2.16 4.74 2.37v3.74c-1.87-.13-3.64-.89-5-2.14-.08-.07-.15-.15-.24-.23v6.86c.02 4.43-3.08 8.42-7.46 9.13-4.99.96-9.87-2.28-10.74-7.23C-1.58 11.58 2.2 6.55 7.4 5.92c1.37-.2 2.77-.07 4.09.43v3.83c-1-.44-2.12-.55-3.19-.31-2.07.41-3.63 2.37-3.48 4.47.2 2.45 2.41 4.22 4.83 3.9 2.05-.22 3.65-1.95 3.63-4.01v-14.2z" />
                      </svg>
                      <span>FOLLOW @LOKANODEBINARY</span>
                    </a>
                  </Magnetic>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="IDENTITY@NETWORK.CORE"
                  required
                  className="flex-grow bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all uppercase"
                />
                
                <Magnetic>
                  <button
                    type="submit"
                    className="p-3 bg-white hover:bg-blue-500 text-black hover:text-white rounded-lg transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center border border-transparent"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>

        </div>

        {/* Mid Segment: Columns & System Monitors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5 pb-16">
          
          {/* Navigation Links */}
          <div className="space-y-4 text-xs font-mono">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">DOMAIN SECTORS</span>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/category/ai" className="hover:text-blue-400 transition-colors uppercase">Artificial Intelligence</Link></li>
              <li><Link href="/category/startup" className="hover:text-blue-400 transition-colors uppercase">Startup Funding</Link></li>
              <li><Link href="/category/cyber" className="hover:text-blue-400 transition-colors uppercase">Cyber Defense</Link></li>
              <li><Link href="/category/robotics" className="hover:text-blue-400 transition-colors uppercase">Autonomous Robotics</Link></li>
            </ul>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">RESOURCES</span>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/category/space" className="hover:text-blue-400 transition-colors uppercase">Space Exploration</Link></li>
              <li><Link href="/category/gadget" className="hover:text-blue-400 transition-colors uppercase">Hardware Gadgets</Link></li>
              <li><Link href="/category/future" className="hover:text-blue-400 transition-colors uppercase">Future Paradigms</Link></li>
              <li><Link href="/category/reviews" className="hover:text-blue-400 transition-colors uppercase">Analysis Reviews</Link></li>
            </ul>
          </div>

          {/* Simulated space telemetry status monitor */}
          <div className="space-y-4 text-xs font-mono col-span-2 text-left">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">GLOBAL MISSION TELEMETRY</span>
            
            <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-400 bg-white/[0.01] border border-white/[0.03] p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <div>
                  <span className="block text-[8px] text-slate-500">SECURITY CORE</span>
                  <span className="font-bold text-white uppercase">SSL_SECURE_OK</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-blue-400" />
                <div>
                  <span className="block text-[8px] text-slate-500">TRANSMIT HUB</span>
                  <span className="font-bold text-white uppercase">SATELLITE LINK ACTIVE</span>
                </div>
              </div>
              <div className="flex items-center gap-2 col-span-2 border-t border-white/5 pt-2 mt-1">
                <RefreshCw className="h-3.5 w-3.5 text-blue-500 animate-spin" />
                <div>
                  <span className="block text-[8px] text-slate-500">CORE DUPLEX STREAM</span>
                  <span className="font-bold text-emerald-400 uppercase">SYS_SYNCHRONIZED // 98% SYNC</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyrights */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[9px] text-slate-600">
          <div className="notranslate" translate="no">
            &copy; {currentYear} LOKANODE. All rights reserved. Technology Beyond Gravity.
          </div>
        </div>
      </div>
    </footer>
  );
}
