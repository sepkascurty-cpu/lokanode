"use client";

import React, { useState } from "react";
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
    <footer id="footer" className="bg-[#030303] border-t border-white/5 pt-24 pb-12 relative overflow-hidden text-left">
      <div className="cyber-grid opacity-10" />
      <div className="absolute bottom-0 right-0 w-[45vw] h-[45vh] rounded-full filter blur-[150px] pointer-events-none bg-purple-500/[0.03]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-16">
        
        {/* Top Segment: Brand Title & Newsletter Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-16">
          
          {/* Taglines */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.jpg" alt="LokaNode Logo" className="h-8 w-8 rounded-md border border-white/10" />
              <span className="text-sm font-bold tracking-widest text-cyan-400 font-mono uppercase">
                LOKA<span className="text-white">NODE</span>
              </span>
            </div>
            
            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
              INTELLIGENCE FOR <br />
              THE NEXT ERA.
            </h3>
            
            <p className="text-xs text-white/50 max-w-sm font-sans leading-relaxed">
              Synthesizing technological singularities, global supply-chain shifts, and frontier cybernetics to guide the trajectories of modern civilization.
            </p>
          </div>

          {/* Futuristic Newsletter Matrix */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block">
              SYNDICATE NETWORK SUBSCRIBER
            </span>
            <p className="text-xs text-white/50 font-sans">
              Enter your address below to synchronize with weekly telemetry indices and intelligence dispatches.
            </p>

            {subscribed ? (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="p-4 bg-cyan-400/10 border border-cyan-400/25 rounded-xl text-xs font-mono text-cyan-400 uppercase tracking-wider animate-pulse">
                  SYSTEM STATUS: NEURAL FEED SYNCED SUCCESSFULLY
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-xs space-y-3">
                  <p className="text-white/60 font-sans leading-relaxed">
                    We now have direct telemetry access to update your cortex feed! Connect with our TikTok node for premium next-generation intelligence, AGI news, and daily tech updates:
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
                  className="flex-grow bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 transition-all uppercase"
                />
                
                <Magnetic>
                  <button
                    type="submit"
                    className="p-3.5 bg-white hover:bg-cyan-400 text-black rounded-xl transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center"
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
            <span className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">PLATFORM HUB</span>
            <ul className="space-y-2.5 text-white/60">
              <li><a href="#market" className="hover:text-cyan-400 transition-colors uppercase">Bloomberg Telemetry</a></li>
              <li><a href="#trending" className="hover:text-cyan-400 transition-colors uppercase">Emerging Tech</a></li>
              <li><a href="#civilization" className="hover:text-cyan-400 transition-colors uppercase">AGI Consciousness</a></li>
              <li><a href="#automotive" className="hover:text-cyan-400 transition-colors uppercase">Auto blueprints</a></li>
            </ul>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <span className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">RESOURCES</span>
            <ul className="space-y-2.5 text-white/60">
              <li><a href="#geopolitics" className="hover:text-cyan-400 transition-colors uppercase">Semiconductor war</a></li>
              <li><a href="#hardware" className="hover:text-cyan-400 transition-colors uppercase">Quantum matrix</a></li>
              <li><a href="#articles" className="hover:text-cyan-400 transition-colors uppercase">Editorial logs</a></li>
              <li><a href="#space-defense" className="hover:text-cyan-400 transition-colors uppercase">Tactical command</a></li>
            </ul>
          </div>

          {/* Simulated node status */}
          <div className="space-y-4 text-xs font-mono col-span-2 text-left">
            <span className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">GLOBAL SERVER TELEMETRY</span>
            
            <div className="grid grid-cols-2 gap-4 text-[10px] text-white/50 bg-white/[0.01] border border-white/[0.03] p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-400" />
                <div>
                  <span className="block text-[8px] text-white/30">SECURITY CORE</span>
                  <span className="font-bold text-white uppercase">SSL_ACTIVE_OK</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-purple-400" />
                <div>
                  <span className="block text-[8px] text-white/30">SERVER REGISTRY</span>
                  <span className="font-bold text-white uppercase">US-EAST ONLINE</span>
                </div>
              </div>
              <div className="flex items-center gap-2 col-span-2 border-t border-white/5 pt-2 mt-1">
                <RefreshCw className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
                <div>
                  <span className="block text-[8px] text-white/30">TELEMETRY LINK STATUS</span>
                  <span className="font-bold text-emerald-400 uppercase">SYNCHRONIZED SHIELD OK</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyrights */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-white/30">
          <div>
            &copy; {currentYear} LokaNode. All rights reserved. Encryption standard AES-256.
          </div>
          <div>
            LokaNode &mdash; Intelligence For The Next Era.
          </div>
        </div>

      </div>
    </footer>
  );
}
