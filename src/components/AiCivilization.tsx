"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Share2 } from "lucide-react";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  r: number;
  desc: string;
}

interface Particle {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  t: number;
  speed: number;
  color: string;
}

export default function AiCivilization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  // Nodes list mapped inside canvas coordinates (normalized to 0-100)
  const nodes: Node[] = [
    { id: "agi", name: "AGI Core v1.0", x: 50, y: 50, r: 16, desc: "Autonomous cognitive coordination center" },
    { id: "cortex", name: "Human Cortex Link", x: 20, y: 30, r: 12, desc: "Zero-lag high-throughput neural transceiver" },
    { id: "quantum", name: "Quantum Synthesis", x: 80, y: 30, r: 12, desc: "Entangled multithreaded simulation processing" },
    { id: "depin", name: "Silicon Synapse", x: 25, y: 75, r: 12, desc: "Decentralized neurological edge node" },
    { id: "bio", name: "Bio-interfacing", x: 75, y: 75, r: 12, desc: "Molecular organic semiconductor translation" },
  ];

  const [particles, setParticles] = useState<Particle[]>([]);

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
    let localParticles: Particle[] = [];

    // Helper to calculate exact coordinates on canvas from normalized 0-100 values
    const getNodeCoords = (node: Node) => ({
      x: (node.x / 100) * width,
      y: (node.y / 100) * height,
    });

    const onCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Check which node was clicked
      nodes.forEach((node) => {
        const { x, y } = getNodeCoords(node);
        const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (dist < node.r + 10) {
          // Fire packets from this node to all other nodes!
          nodes.forEach((other) => {
            if (other.id !== node.id) {
              const otherCoords = getNodeCoords(other);
              localParticles.push({
                startX: x,
                startY: y,
                endX: otherCoords.x,
                endY: otherCoords.y,
                t: 0,
                speed: 0.02 + Math.random() * 0.015,
                color: "#00f0ff",
              });
            }
          });
        }
      });
    };

    const onCanvasMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: Node | null = null;
      nodes.forEach((node) => {
        const { x, y } = getNodeCoords(node);
        const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (dist < node.r + 15) {
          found = node;
        }
      });
      setActiveNode(found);
    };

    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("mousemove", onCanvasMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static grid mesh lines behind
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw connections (Bezier/Standard paths)
      nodes.forEach((n1, idx1) => {
        nodes.forEach((n2, idx2) => {
          if (idx1 >= idx2) return; // avoid drawing lines twice

          const c1 = getNodeCoords(n1);
          const c2 = getNodeCoords(n2);

          const isDirectlyConnected = activeNode?.id === n1.id || activeNode?.id === n2.id;

          ctx.beginPath();
          ctx.moveTo(c1.x, c1.y);
          // Drawing smooth curves using slight offset
          const midX = (c1.x + c2.x) / 2;
          const midY = (c1.y + c2.y) / 2 - (isDirectlyConnected ? 15 : 0);
          ctx.quadraticCurveTo(midX, midY, c2.x, c2.y);
          
          ctx.strokeStyle = isDirectlyConnected
            ? "rgba(0, 240, 255, 0.25)"
            : "rgba(255, 255, 255, 0.035)";
          ctx.lineWidth = isDirectlyConnected ? 1.5 : 1;
          ctx.stroke();
        });
      });

      // 3. Update & Draw particles (pulses travelling down routes)
      localParticles.forEach((p, idx) => {
        p.t += p.speed;

        // Quadratic bezier interpolation for mid-offset matching connection curvature
        const midX = (p.startX + p.endX) / 2;
        // Match curve offset
        const midY = (p.startY + p.endY) / 2 - 15;

        // Bezier points calculation
        const x = (1 - p.t) ** 2 * p.startX + 2 * (1 - p.t) * p.t * midX + p.t ** 2 * p.endX;
        const y = (1 - p.t) ** 2 * p.startY + 2 * (1 - p.t) * p.t * midY + p.t ** 2 * p.endY;

        // Draw particle trail
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Filter out completed particles
      localParticles = localParticles.filter((p) => p.t < 1);

      // 4. Draw node circles
      nodes.forEach((node) => {
        const { x, y } = getNodeCoords(node);
        const isActive = activeNode?.id === node.id;

        // Outer glow
        if (isActive) {
          ctx.beginPath();
          ctx.arc(x, y, node.r + 10, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 240, 255, 0.05)";
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#bd00ff";
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Mid ring
        ctx.beginPath();
        ctx.arc(x, y, node.r + (isActive ? 4 : 0), 0, Math.PI * 2);
        ctx.strokeStyle = isActive ? "#00f0ff" : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(x, y, node.r - 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#bd00ff" : "rgba(255, 255, 255, 0.05)";
        ctx.fill();

        // Node Title Tag
        ctx.fillStyle = isActive ? "#ffffff" : "rgba(255, 255, 255, 0.4)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(node.name, x, y - node.r - 8);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", onCanvasClick);
      canvas.removeEventListener("mousemove", onCanvasMove);
      cancelAnimationFrame(animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNode]);

  // Editorial quote reveal items
  const quoteWords = [
    "AGI", "is", "not", "just", "a", "computational", "breakthrough—it", "is",
    "the", "genesis", "of", "a", "new", "cosmic", "epoch.", "As", "silicon",
    "fuses", "with", "biological", "intuition,", "the", "boundary", "of",
    "our", "civilization", "expands", "infinitely.", "LokaNode", "charts",
    "this", "neural", "transmutation."
  ];

  return (
    <section id="civilization" ref={containerRef} className="py-32 relative overflow-hidden bg-[#030303] border-t border-white/5">
      <div className="cyber-grid opacity-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side: Stunning Editorial Layout */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              <Terminal className="h-4.5 w-4.5" />
              <span>COGNITIVE FRONTIERS</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-[0.95]">
              AI & FUTURE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 glow-text-purple">
                CIVILIZATION
              </span>
            </h2>
          </div>

          {/* Staggered Blur-to-Focus Text Reveal */}
          <div className="flex flex-wrap gap-x-2 gap-y-1 max-w-xl text-lg sm:text-xl font-normal leading-relaxed text-white/85 select-none font-sans">
            {quoteWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ filter: "blur(6px)", opacity: 0.1 }}
                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                className="inline-block hover:text-cyan-400 transition-colors"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Additional details */}
          <div className="space-y-4 pt-4 border-t border-white/5 max-w-lg font-sans text-xs text-white/50 leading-relaxed">
            <p>
              In our transition toward Type I civilization scales, cognitive nodes will represent the primary infrastructure grids. Silicon synapses and brain-computer interfaces (BCIs) will decentralize intelligence, transferring sovereignty from corporate platforms to universal networks.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Connection Canvas */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center w-full relative">
          
          {/* HUD Telemetry Frame around Canvas */}
          <div className="w-full h-[400px] md:h-[450px] glass-panel rounded-2xl border border-white/5 relative p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
            
            {/* Top hud indicators */}
            <div className="flex justify-between items-center font-mono text-[9px] text-white/30 border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-cyan-400" />
                <span>ACTIVE NODES: {nodes.length}</span>
              </div>
              <span className="text-purple-400">MATRIX: SYNCHRONIZED</span>
            </div>

            {/* Core interactive Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer z-10" />

            {/* Bottom HUD Node details display */}
            <div className="relative z-20 font-mono text-[10px] text-white/40 border-t border-white/5 pt-2 flex items-center justify-between pointer-events-none mt-auto">
              {activeNode ? (
                <div className="animate-fade-in">
                  <span className="text-cyan-400 font-bold block">{activeNode.name}</span>
                  <span className="text-[9px] text-white/60 block">{activeNode.desc}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Share2 className="h-3.5 w-3.5 text-white/20" />
                  <span>HOVER AND CLICK ON MATRIX NODES TO SYNC COGNITIONS</span>
                </div>
              )}
              <span className="text-[9px]">v1.01_alpha</span>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
