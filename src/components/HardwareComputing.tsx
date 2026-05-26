"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Terminal, Compass, Zap } from "lucide-react";

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
    <section id="hardware" className="py-20 relative overflow-hidden bg-[#05070A] border-t border-white/5">
      <div className="orbital-grid opacity-10" />
      <div className="absolute top-1/4 left-1/3 w-[35vw] h-[35vh] rounded-full filter blur-[120px] pointer-events-none bg-blue-600/[0.015]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="border-b border-white/5 pb-5 text-left">
          <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest">
            <Cpu className="h-4 w-4 animate-pulse text-blue-400" />
            <span>PHOTONIC SILICON HARDWARE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight leading-none mt-2">
            HARDWARE & <span className="text-blue-500">QUANTUM NEURAL CORE</span>
          </h2>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-xl">
            Simulate leading-edge quantum superposition gates and analyze thermal loads across distributed photonic accelerators.
          </p>
        </div>

        {/* Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column Left: Quantum Entanglement Qubits Simulator */}
          <div className="lg:col-span-7 bg-space-secondary/20 rounded-xl border border-white/5 p-6 flex flex-col justify-between shadow-2xl relative min-h-[400px]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 font-mono text-xs text-left">
              <div className="space-y-1">
                <span className="text-white font-bold tracking-wider uppercase block text-[10px]">QUBIT SUPERPOSITION MATRIX</span>
                <span className="text-[9px] text-slate-500 block">Interact with Qubits below to test state entanglement</span>
              </div>
              <Compass className="h-4 w-4 text-blue-400 animate-spin" />
            </div>

            {/* Core Qubits Row Visualization */}
            <div className="grid grid-cols-3 gap-6 py-10 items-center justify-center">
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
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-blue-400/40">
                      
                      {/* Orbit Ring */}
                      <div className={`absolute inset-0.5 rounded-full border border-dashed border-blue-500/20 ${
                        isSuper ? "animate-[spin_4s_linear_infinite]" : ""
                      }`} />

                      {/* Glowing sphere core */}
                      <div 
                        className={`w-12 h-12 rounded-full transition-all duration-700 relative ${
                          isSuper 
                            ? "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300 scale-110 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                            : isOne 
                              ? "bg-blue-600 shadow-[0_0_15px_rgba(27,77,255,0.4)]" 
                              : "bg-white/5"
                        }`}
                      />

                      {/* Overlay label */}
                      <span className="absolute text-[9px] font-mono text-slate-500 bottom-2 uppercase font-semibold">
                        {isSuper ? "Ψ STATE" : isOne ? "|1⟩ STATE" : "|0⟩ STATE"}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                      Qubit Node 0{qubit.id}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* State controller telemetry outputs */}
            <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-left">
              <div>
                <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Quantum Probability Density</span>
                <span className="text-white font-bold block mt-1">{quantumStateExpression}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={toggleSuperposition}
                  className="px-4 py-2 border border-blue-500/20 hover:border-blue-500/50 bg-blue-500/[0.02] hover:bg-blue-500/[0.06] text-blue-400 font-bold tracking-wider text-[9px] rounded-lg transition-all cursor-pointer uppercase font-mono"
                >
                  Superposition
                </button>
                <button
                  onClick={measureStates}
                  disabled={isMeasuring}
                  className="px-4 py-2 bg-white hover:bg-blue-600 text-black hover:text-white font-bold tracking-wider text-[9px] rounded-lg transition-all cursor-pointer uppercase font-mono hover:shadow-[0_0_15px_rgba(27,77,255,0.3)] border border-transparent disabled:opacity-50"
                >
                  {isMeasuring ? "COLLAPSING..." : "MEASURE STATES"}
                </button>
              </div>
            </div>
          </div>

          {/* Column Right: Motherboard Photonic Specs */}
          <div className="lg:col-span-5 bg-space-secondary/20 rounded-xl border border-white/5 p-6 flex flex-col justify-between shadow-2xl relative text-left">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Terminal className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">PHOTONIC ACCELERATOR CORE SPEC</span>
              </div>

              <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                
                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase tracking-widest">GATE LITHOGRAPHY</span>
                    <span className="text-white font-bold mt-0.5 block">3nm Neuromorphic Optical Gate</span>
                  </div>
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>

                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase tracking-widest">BANDWIDTH INTERCONNECTS</span>
                    <span className="text-white font-bold mt-0.5 block">2.4 Tbps Optical Fiber Transceiver</span>
                  </div>
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>

                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase tracking-widest">QUANTUM SYSTEM COHERENCE</span>
                    <span className="text-white font-bold mt-0.5 block">250 Microseconds Coherent</span>
                  </div>
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>

                <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase tracking-widest">COMPUTE CLUSTER METRIC</span>
                    <span className="text-white font-bold mt-0.5 block">24 ExaFLOPs AGI Node Capacity</span>
                  </div>
                  <Zap className="h-4 w-4 text-blue-500" />
                </div>

              </div>
            </div>

            <div className="text-[9px] font-mono text-slate-500 border-t border-white/5 pt-4 mt-6 flex justify-between items-center pointer-events-none">
              <span>SYS_TEMP: 0.15K (LIQUID HELIUM)</span>
              <span>NODE_ID: Photonic_09X</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
