"use client";

import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, RefreshCw, BarChart2, Grid } from "lucide-react";

// Types
interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  history: { time: string; value: number }[];
}

interface HeatmapItem {
  sector: string;
  code: string;
  change: number;
  marketCap: string;
  status: string;
}

// Stock/Crypto Initial Data
const INITIAL_STOCKS: Record<string, StockItem> = {
  BTC: {
    symbol: "BTC",
    name: "Bitcoin (Quantum-Resistant)",
    price: 94250.35,
    change: 2.45,
    history: [
      { time: "09:00", value: 92100 },
      { time: "11:00", value: 92800 },
      { time: "13:00", value: 93400 },
      { time: "15:00", value: 93100 },
      { time: "17:00", value: 93900 },
      { time: "19:00", value: 94250 },
    ],
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum (Pos-Quantum Mesh)",
    price: 3620.15,
    change: -0.85,
    history: [
      { time: "09:00", value: 3680 },
      { time: "11:00", value: 3650 },
      { time: "13:00", value: 3610 },
      { time: "15:00", value: 3630 },
      { time: "17:00", value: 3640 },
      { time: "19:00", value: 3620 },
    ],
  },
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corp (AGI Compute)",
    price: 1840.80,
    change: 4.82,
    history: [
      { time: "09:00", value: 1750 },
      { time: "11:00", value: 1780 },
      { time: "13:00", value: 1810 },
      { time: "15:00", value: 1795 },
      { time: "17:00", value: 1825 },
      { time: "19:00", value: 1840 },
    ],
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla Inc (FSD & Optimus)",
    price: 412.50,
    change: 3.12,
    history: [
      { time: "09:00", value: 398 },
      { time: "11:00", value: 402 },
      { time: "13:00", value: 405 },
      { time: "15:00", value: 401 },
      { time: "17:00", value: 409 },
      { time: "19:00", value: 412 },
    ],
  },
};

const INITIAL_HEATMAP: HeatmapItem[] = [
  { sector: "AI Compute Chips", code: "NVDA", change: 4.82, marketCap: "$4.5T", status: "Bullish" },
  { sector: "Quantum Qubits", code: "QNET", change: 8.41, marketCap: "$180B", status: "Extreme Growth" },
  { sector: "Military Autonomous AI", code: "PLTR", change: -1.25, marketCap: "$115B", status: "Correction" },
  { sector: "Tesla Autopilot", code: "TSLA", change: 3.12, marketCap: "$1.3T", status: "Strong Demand" },
  { sector: "Renewable Energy Grid", code: "ENPH", change: 0.15, marketCap: "$42B", status: "Stable" },
  { sector: "Space Aerospace Cargo", code: "SPACEX", change: 6.95, marketCap: "$380B", status: "Mission Launch" },
  { sector: "Cyber Defense Systems", code: "CRWD", change: -3.42, marketCap: "$95B", status: "Volatile" },
  { sector: "Semi Lithography", code: "ASML", change: 2.18, marketCap: "$490B", status: "Bullish" },
];

export default function MarketIntelligence() {
  const [stocks, setStocks] = useState<Record<string, StockItem>>(INITIAL_STOCKS);
  const [activeTab, setActiveTab] = useState<string>("BTC");
  const [heatmap, setHeatmap] = useState<HeatmapItem[]>(INITIAL_HEATMAP);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    };
    updateTime();

    // Live fluctuating stock charts and heatmap telemetry
    const interval = setInterval(() => {
      setStocks((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          const item = next[key];
          const volatility = key === "BTC" ? 150 : key === "ETH" ? 10 : 3;
          const delta = (Math.random() - 0.48) * volatility; // slightly positive drift
          const nextPrice = Number((item.price + delta).toFixed(2));
          const nextChange = Number((item.change + (delta / item.price) * 100).toFixed(2));
          
          // Append new history node
          const now = new Date();
          const nextHistory = [...item.history.slice(1), {
            time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
            value: Math.round(nextPrice),
          }];

          next[key] = {
            ...item,
            price: nextPrice,
            change: nextChange,
            history: nextHistory,
          };
        });
        return next;
      });

      // Update Heatmap
      setHeatmap((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.5) * 1.5;
          return {
            ...item,
            change: Number((item.change + delta).toFixed(2)),
          };
        })
      );

      updateTime();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activeStock = stocks[activeTab];

  return (
    <section id="market" className="py-24 relative overflow-hidden bg-[#030303] border-t border-white/5">
      <div className="cyber-grid opacity-10" />

      {/* Infinite Marquee Stock Ticker */}
      <div className="w-full bg-[#0a0a0f] border-y border-white/5 py-3 relative z-10 overflow-hidden mb-16">
        <div className="flex w-[200%] animate-[marquee_30s_linear_infinite] gap-12 text-[10px] font-mono tracking-widest text-white/50 uppercase select-none">
          {Object.keys(stocks).concat(Object.keys(stocks)).map((key, index) => {
            const item = stocks[key === "BTC" || key === "ETH" || key === "NVDA" || key === "TSLA" ? key : "BTC"];
            const isUp = item.change >= 0;
            return (
              <div key={index} className="flex items-center gap-2">
                <span className="text-white font-bold">{item.symbol}</span>
                <span>${item.price.toLocaleString()}</span>
                <span className={`flex items-center ${isUp ? "text-emerald-400" : "text-red-500"}`}>
                  {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {isUp ? "+" : ""}{item.change}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>LIVE TELEMETRY STREAM</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
              MARKET <span className="text-cyan-400">INTELLIGENCE</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-white/40">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5">
              <RefreshCw className="h-3 w-3 text-cyan-400 animate-spin" />
              <span>Last update: {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Bloomberg Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column Left: Live Recharts Interactive Visualizer */}
          <div className="lg:col-span-8 glass-panel rounded-2xl border border-white/5 p-6 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full filter blur-2xl pointer-events-none" />
            
            {/* Tab Controller */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5 hud-line">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Performance Stream</span>
              </div>
              <div className="flex gap-1 bg-white/5 border border-white/5 rounded-lg p-1">
                {Object.keys(stocks).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-all cursor-pointer uppercase ${
                      activeTab === key
                        ? "bg-white text-black font-semibold shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Ticker Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 font-mono">
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest">{activeStock.name}</span>
                <div className="text-3xl font-extrabold tracking-tight text-white mt-1">
                  ${activeStock.price.toLocaleString()}
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">24h Variance</span>
                <div className={`flex items-center sm:justify-end text-lg font-bold mt-1 ${
                  activeStock.change >= 0 ? "text-emerald-400" : "text-red-500"
                }`}>
                  {activeStock.change >= 0 ? "+" : ""}{activeStock.change}%
                  {activeStock.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 ml-1.5" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 ml-1.5" />
                  )}
                </div>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeStock.history} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeStock.change >= 0 ? "#00f0ff" : "#ff3b30"} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={activeStock.change >= 0 ? "#00f0ff" : "#ff3b30"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.15)"
                    style={{ fontSize: "10px", fontFamily: "monospace" }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.15)"
                    domain={["auto", "auto"]}
                    style={{ fontSize: "10px", fontFamily: "monospace" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 10, 15, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontFamily: "monospace",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={activeStock.change >= 0 ? "#00f0ff" : "#ff3b30"}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Column Right: Custom Bloomberg Terminal Style Interactive Heatmap */}
          <div className="lg:col-span-4 glass-panel rounded-2xl border border-white/5 p-6 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5 hud-line">
                <Grid className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Emerging Sector Heatmap</span>
              </div>

              {/* Heatmap Blocks */}
              <div className="grid grid-cols-2 gap-3.5">
                {heatmap.map((item, index) => {
                  const isUp = item.change >= 0;
                  return (
                    <div
                      key={index}
                      className={`interactive-card p-3 rounded-xl border transition-all duration-300 relative group overflow-hidden ${
                        isUp
                          ? "bg-emerald-500/[0.01] hover:bg-emerald-500/[0.05] border-emerald-500/10 hover:border-emerald-500/30"
                          : "bg-red-500/[0.01] hover:bg-red-500/[0.05] border-red-500/10 hover:border-red-500/30"
                      }`}
                    >
                      {/* Mini corner highlight */}
                      <span className={`absolute top-0 right-0 w-1.5 h-1.5 ${
                        isUp ? "bg-emerald-400" : "bg-red-500"
                      } opacity-50 rounded-bl-md`} />

                      <div className="text-[9px] font-mono text-white/30 uppercase tracking-wider">
                        {item.sector}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-white font-mono">{item.code}</span>
                        <span className={`text-[10px] font-mono font-bold ${
                          isUp ? "text-emerald-400" : "text-red-500"
                        }`}>
                          {isUp ? "+" : ""}{item.change.toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-[8px] font-mono text-white/20 mt-1 flex justify-between">
                        <span>Val: {item.marketCap}</span>
                        <span className="group-hover:text-white/50 transition-colors uppercase">{item.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[9px] font-mono text-white/30 mt-6 border-t border-white/5 pt-4 text-center leading-relaxed">
              *Data feeds are simulated dynamically to emulate real-time intelligence algorithms. Values reflect simulated global technology liquidity pools.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
