"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Crosshair, Navigation, Radio, Play } from "lucide-react";

interface TelemetryLog {
  time: string;
  msg: string;
  type: "info" | "warning" | "success";
}

export default function SpaceDefense() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [orbitMeshActive, setOrbitMeshActive] = useState(true);
  const [logs, setLogs] = useState<TelemetryLog[]>([
    { time: "20:10:04", msg: "ORBITAL NET: SCANNING LATITUDE SECTOR 45-N", type: "info" },
    { time: "20:10:28", msg: "INTERCEPT MATRIX: LINK STABILIZED", type: "success" },
    { time: "20:11:12", msg: "STRATEGIC AI: HYPERSONIC VELOCITY THREAT RESOLVED", type: "success" },
  ]);
  const [launchSequence, setLaunchSequence] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);

  // 1. Radar Scanning Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    let animationId: number;
    let angle = 0;

    const drawRadar = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.45;

      // Draw background tactical grid circles - Styled with NASA Blue
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 1;
      for (let r = maxRadius / 4; r <= maxRadius; r += maxRadius / 4) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshair axes
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius - 10, centerY);
      ctx.lineTo(centerX + maxRadius + 10, centerY);
      ctx.moveTo(centerX, centerY - maxRadius - 10);
      ctx.lineTo(centerX, centerY + maxRadius + 10);
      ctx.stroke();

      // Draw scanning sweep
      angle += 0.012;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);

      // Gradient for sweep trail
      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxRadius);
      sweepGrad.addColorStop(0, "rgba(27, 77, 255, 0.18)");
      sweepGrad.addColorStop(1, "rgba(27, 77, 255, 0)");

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxRadius, 0, Math.PI / 3);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Lead sweep line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(maxRadius, 0);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      // Draw simulated orbital defense satellites (crisp white dots with blue outer glow)
      const satellites = [
        { x: centerX + maxRadius * 0.5 * Math.cos(angle - 0.5), y: centerY + maxRadius * 0.5 * Math.sin(angle - 0.5), label: "SAT_A (AGI_SHIELD)" },
        { x: centerX + maxRadius * 0.8 * Math.cos(angle + 1.2), y: centerY + maxRadius * 0.8 * Math.sin(angle + 1.2), label: "SAT_B (TACTICAL_NET)" },
        { x: centerX + maxRadius * 0.3 * Math.cos(angle - 2.1), y: centerY + maxRadius * 0.3 * Math.sin(angle - 2.1), label: "ORBITER_X" },
      ];

      satellites.forEach((sat) => {
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "8px monospace";
        ctx.fillText(sat.label, sat.x + 8, sat.y + 3);
      });

      // Draw orbital satellite connections if mesh toggled active
      if (orbitMeshActive) {
        ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(satellites[0].x, satellites[0].y);
        ctx.lineTo(satellites[1].x, satellites[1].y);
        ctx.lineTo(satellites[2].x, satellites[2].y);
        ctx.closePath();
        ctx.stroke();
      }

      animationId = requestAnimationFrame(drawRadar);
    };

    drawRadar();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [orbitMeshActive]);

  // Simulate launch progression
  useEffect(() => {
    if (!launchSequence) return;

    const timer = setInterval(() => {
      setLaunchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setLaunchSequence(false);
          const now = new Date();
          setLogs((logs) => [
            ...logs,
            {
              time: now.toLocaleTimeString(),
              msg: "SPACE_OPS: NEW SAT NODE PLACED IN LOW ORBIT",
              type: "success",
            },
          ]);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [launchSequence]);

  const triggerLaunch = () => {
    if (launchSequence) return;
    setLaunchSequence(true);
    setLaunchProgress(0);
    const now = new Date();
    setLogs((logs) => [
      ...logs,
      {
        time: now.toLocaleTimeString(),
        msg: "LAUNCH: ORBITER-V4 HEAVY ROCKET IGNITION SEQUENCE",
        type: "warning",
      },
    ]);
  };

  return (
    <section id="space-defense" className="py-20 relative overflow-hidden bg-[#05070A] border-t border-white/5">
      
      {/* Background canvas starfield */}
      <div className="absolute inset-0 z-0">
        <div className="orbital-grid opacity-10" />
        <div className="absolute top-1/4 right-1/4 w-[45vw] h-[45vh] rounded-full filter blur-[150px] pointer-events-none bg-blue-600/[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="border-b border-white/5 pb-5">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest">
              <Radio className="h-4 w-4 animate-pulse text-blue-400" />
              <span>TACTICAL STRATEGIC COMMAND</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight leading-none">
              SPACE & <span className="text-blue-500">DEFENSE COMMAND</span>
            </h2>
            <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-xl">
              Simulating orbital defense locks and heavy booster ignition profiles. Connect to low-orbit satellites directly.
            </p>
          </div>
        </div>

        {/* Tactical OS Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Radar Command Console (Center Visualizer) */}
          <div className="lg:col-span-8 bg-space-secondary/20 rounded-xl border border-white/5 p-6 flex flex-col justify-between shadow-2xl relative min-h-[400px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 font-mono text-[10px]">
              <span className="text-white font-bold tracking-wider uppercase">ORBITAL INTERCEPT HUD GRID</span>
              <button
                onClick={() => setOrbitMeshActive(!orbitMeshActive)}
                className={`px-3 py-1 rounded-md text-[9px] tracking-widest font-bold cursor-pointer transition-all border ${
                  orbitMeshActive 
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    : "text-white/40 border-white/10 hover:text-white"
                }`}
              >
                ORBIT_MESH: {orbitMeshActive ? "ACTIVE" : "OFF"}
              </button>
            </div>

            {/* Radar Canvas Container */}
            <div className="w-full flex-grow flex items-center justify-center py-6">
              <canvas ref={canvasRef} className="w-full max-w-[280px] h-[280px]" />
            </div>

            {/* Simulated telemetry tracker logs */}
            <div className="border-t border-white/5 pt-4 font-mono text-[9px] text-slate-500 flex flex-col gap-1.5 leading-relaxed text-left">
              {logs.slice(-3).map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-slate-600">[{log.time}]</span>
                  <span className={log.type === "success" ? "text-emerald-400" : log.type === "warning" ? "text-amber-400" : "text-blue-400"}>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Defense Launch Controllers & Threat Indexes */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Satellite Launcher Launcher */}
            <div className="bg-space-secondary/20 rounded-xl border border-white/5 p-6 space-y-6 shadow-2xl text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Crosshair className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">DEFENSE LAUNCH MATRIX</span>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Initiate a high-payload rocket launch sequence to deploy a custom post-quantum secure communications satellite orbital node.
              </p>

              <div className="space-y-4">
                {launchSequence ? (
                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between text-[9px] text-slate-400">
                      <span>BOOSTER DELTA VELOCITY</span>
                      <span>{launchProgress}%</span>
                    </div>
                    <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all duration-150" style={{ width: `${launchProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={triggerLaunch}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-widest rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 uppercase border border-blue-500/20"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    <span>LAUNCH ORBITAL SATELLITE</span>
                  </button>
                )}
              </div>
            </div>

            {/* Strategic Threat Indicator Index */}
            <div className="bg-space-secondary/20 rounded-xl border border-white/5 p-6 space-y-4 shadow-2xl text-left font-mono relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">SEC_THREAT LEVEL DETAILS</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">GLOBAL RADAR ALERTS</span>
                  <span className="text-emerald-400 font-bold">0 ACTIVE</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">KINETIC INTERCEPT NODES</span>
                  <span className="text-white font-bold">12 SHIELD NODES</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">SPACE COM ENCRYPTION</span>
                  <span className="text-blue-400 font-bold">ENTANGLED ACTIVE</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">SECURE CONSOLE STATUS</span>
                  <span className="text-blue-400 font-bold uppercase">SEC_SAFE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
