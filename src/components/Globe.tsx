"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 220;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 3. Create Particle Globe
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const sphereRadius = 60;
    const colorBlueMain = new THREE.Color("#1B4DFF");
    const colorBlueSoft = new THREE.Color("#3B82F6");

    for (let i = 0; i < particleCount; i++) {
      // Golden ratio spacing for uniform sphere distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Blend color based on vertical height
      const t = (y + sphereRadius) / (sphereRadius * 2);
      const mixedColor = colorBlueMain.clone().lerp(colorBlueSoft, t);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom glowing particle dot texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const globeParticles = new THREE.Points(geometry, material);
    scene.add(globeParticles);

    // 4. Create Orbital Rings & Coordinates
    const ringCount = 3;
    const rings: THREE.LineLoop[] = [];

    for (let r = 0; r < ringCount; r++) {
      const ringGeometry = new THREE.BufferGeometry();
      const ringPointsCount = 100;
      const ringPositions = new Float32Array(ringPointsCount * 3);
      const radius = sphereRadius + 12 + r * 15;

      for (let i = 0; i < ringPointsCount; i++) {
        const theta = (i / ringPointsCount) * Math.PI * 2;
        ringPositions[i * 3] = radius * Math.cos(theta);
        ringPositions[i * 3 + 1] = 0;
        ringPositions[i * 3 + 2] = radius * Math.sin(theta);
      }

      ringGeometry.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));

      const ringMaterial = new THREE.LineBasicMaterial({
        color: r === 0 ? "#1B4DFF" : r === 1 ? "#3B82F6" : "#ffffff",
        transparent: true,
        opacity: r === 0 ? 0.35 : r === 1 ? 0.2 : 0.08,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.LineLoop(ringGeometry, ringMaterial);
      // Random tilt for orbital loops
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      scene.add(ring);
      rings.push(ring);
    }

    // 5. Ambient star fields
    const starsCount = 400;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 500;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.6,
      color: "#ffffff",
      transparent: true,
      opacity: 0.35,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // 6. Interactive Mouse Tracker
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetX = (x - rect.width / 2) * 0.15;
      targetY = (y - rect.height / 2) * 0.15;
    };

    window.addEventListener("mousemove", onMouseMove);

    // 7. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Constant rotations
      globeParticles.rotation.y = elapsedTime * 0.08;
      globeParticles.rotation.x = elapsedTime * 0.02;

      rings.forEach((ring, idx) => {
        ring.rotation.z += 0.003 * (idx + 1);
        ring.rotation.y += 0.002 * (idx + 1);
      });

      // Mouse Parallax effect interpolation (Lerp)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      globeParticles.position.x = mouseX * 0.15;
      globeParticles.position.y = -mouseY * 0.15;

      rings.forEach((ring) => {
        ring.position.x = mouseX * 0.15;
        ring.position.y = -mouseY * 0.15;
      });

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Dynamic Resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[400px] md:min-h-[500px]" />;
}
