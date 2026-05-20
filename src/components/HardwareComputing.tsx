"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Terminal, Compass, Zap, HelpCircle } from "lucide-react";

interface Qubit {
  id: number;
  state: "zero" | "one" | "superposition";
  phase: number;
}

export default function HardwareComputing() {
  const [qubits, setQubits] = useState<Qubit[]>([
    { id: 1, state: "zero", phase: 0 },
    { id: 2, state: "zero", phase: 0 },
    { id: 3, state: "zero", phase: 0 },
  ]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [quantumStateExpression, setQuantumStateExpression] = useState("|Ψ⟩ = |000⟩");
  const [entropyLevel, setEntropyLevel] = useState(0.00);

  // 1. Quantum State calculations
  const toggleSuperposition = () => {
    setQubits((prev) =>
      prev.map((qubit) => ({
        ...qubit,
        state: qubit.state === "superposition" ? "zero" : "superposition",
      }))
    );
  };

  useEffect(() => {
    const hasSuperposition = qubits.some((q) => q.state === "superposition");
    if (hasSuperposition) {
      setQuantumStateExpression("|Ψ⟩ = 0.707|000⟩ + 0.707|111⟩ [ENTANGLED]");
      setEntropyLevel(0.98);
    } else {
      const stateString = qubits.map((q) => (q.state === "one" ? "1" : "0")).join("");
      setQuantumStateExpression(`|Ψ⟩ = |${stateString}⟩ [CLASSICAL]`);
      setEntropyLevel(0.00);
    }
  }, [qubits]);

  const measureStates = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      setQubits((prev) =>
        prev.map((qubit) => {
          if (qubit.state === "superposition") {
            // Collapse probability to 0 or 1
            const collapsed = Math.random() > 0.5 ? "one" : "zero";
            return { ...qubit, state: collapsed };
          }
          return qubit;
        })
      );
      setIsMeasuring(false);
    }, 1200);
  };

  const flipQubit = (id: number) => {
    setQubits((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          if (q.state === "superposition") return q;
          return { ...q, state: q.state === "zero" ? "one" : "zero" };
        }
        return q;
      })
    );
  };

  return (
    <section id="hardware" className="py-24 relative overflow-hidden bg-[#030303] border-t border-white/5">
      <div className="cyber-grid opacity-10" />
      <div className="absolute top-1/4 left-1/3 w-[35vw] h-[35vh] rounded-full filter blur-[120px] pointer-events-none bg-purple-500/[0.03]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest">
            <Cpu className="h-4.5 w-4.5 animate-pulse text-purple-400" />
            <span>PHOTONIC SILICON HARDWARE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight leading-none">
            HARDWARE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">COMPUTING</span>
          </h2>
        </div>

        {/* Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column Left: Quantum Entanglement Qubits Simulator */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/5 p-6 flex flex-col justify-between shadow-2xl relative min-h-[400px]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 hud-line font-mono text-xs text-left">
              <div className="space-y-1">
                <span className="text-white font-bold tracking-wider uppercase block">QUBIT SUPERPOSITION MATRIX</span>
                <span className="text-[10px] text-white/40 block">Interact with Qubits below to test state entanglement</span>
              </div>
              <Compass className="h-4 w-4 text-purple-400 animate-spin" />
            </div>

            {/* Core Qubits Row Visualization */}
            <div className="grid grid-cols-3 gap-6 py-12 items-center justify-center">
              {qubits.map((qubit) => {
                const isSuper = qubit.state === "superposition";
                const isOne = qubit.state === "one";

                return (
                  <div
                    key={qubit.id}
                    onClick={() => flipQubit(qubit.id)}
                    className="flex flex-col items-center gap-4 group cursor-pointer"
                  >
                    {/* Glowing Bloch Sphere representation */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-purple-400/40">
                      
                      {/* Orbit Ring */}
                      <div className={`absolute inset-0.5 rounded-full border border-dashed border-purple-400/20 ${
                        isSuper ? "animate-[spin_4s_linear_infinite]" : ""
                      }`} />

                      {/* Glowing sphere core */}
                      <div 
                        className={`w-12 h-12 rounded-full transition-all duration-700 relative ${
                          isSuper 
                            ? "bg-gradient-to-r from-cyan-400 to-purple-500 scale-110 animate-pulse glow-cyan" 
                            : isOne 
                              ? "bg-purple-500 glow-purple" 
                              : "bg-white/5"
                        }`}
                      />

                      {/* Overlay label */}
                      <span className="absolute text-[10px] font-mono text-white/50 bottom-2 uppercase">
                        {isSuper ? "Ψ STATE" : isOne ? "|1⟩ STATE" : "|0⟩ STATE"}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      Qubit Node 0{qubit.id}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* State controller telemetry outputs */}
            <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-left">
              <div>
                <span className="text-[9px] text-white/30 uppercase tracking-widest block">Quantum Probability Density</span>
                <span className="text-white font-bold block mt-1">{quantumStateExpression}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={toggleSuperposition}
                  className="px-4 py-2 border border-purple-500/20 hover:border-purple-500/50 bg-purple-500/[0.02] hover:bg-purple-500/[0.06] text-purple-400 font-bold tracking-wider text-[10px] rounded-lg transition-all cursor-pointer uppercase"
                >
                  Superposition
                </button>
                <button
                  onClick={measureStates}
                  disabled={isMeasuring}
                  className="px-4 py-2 bg-white hover:bg-purple-400 text-black font-bold tracking-wider text-[10px] rounded-lg transition-all cursor-pointer uppercase hover:shadow-[0_0_15px_rgba(189,0,255,0.4)] disabled:opacity-50"
                >
                  {isMeasuring ? "COLLAPSING..." : "MEASURE STATES"}
                </button>
              </div>
            </div>
          </div>

          {/* Column Right: Motherboard Photonic Specs */}
          <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/5 p-6 flex flex-col justify-between shadow-2xl relative text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">PHOTONIC ACCELERATOR CORE SPEC</span>
              </div>

              <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                
                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-widest">GATE LITHOGRAPHY</span>
                    <span className="text-white font-bold mt-0.5 block">3nm Neuromorphic Optical Gate</span>
                  </div>
                  <Zap className="h-4 w-4 text-cyan-400" />
                </div>

                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-widest">BANDWIDTH INTERCONNECTS</span>
                    <span className="text-white font-bold mt-0.5 block">2.4 Tbps Optical Fiber Transceiver</span>
                  </div>
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>

                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-widest">QUANTUM SYSTEM COHERENCE</span>
                    <span className="text-white font-bold mt-0.5 block">250 Microseconds Coherent</span>
                  </div>
                  <Zap className="h-4 w-4 text-emerald-400" />
                </div>

                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-widest">COMPUTE CLUSTER METRIC</span>
                    <span className="text-white font-bold mt-0.5 block">24 ExaFLOPs AGI Node Capacity</span>
                  </div>
                  <Zap className="h-4 w-4 text-rose-500" />
                </div>

              </div>
            </div>

            <div className="text-[9px] font-mono text-white/30 border-t border-white/5 pt-4 mt-6 flex justify-between items-center pointer-events-none">
              <span>SYS_TEMP: 0.15K (LIQUID HELIUM)</span>
              <span>NODE_ID: Photonic_09X</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
