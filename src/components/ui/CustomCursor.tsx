"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor once mouse moves
    const handleFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener("mousemove", handleFirstMove);
    };
    window.addEventListener("mousemove", handleFirstMove);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleFirstMove);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Smooth lagging follower
  useEffect(() => {
    if (!isVisible) return;

    let id: number;
    const updateFollower = () => {
      setFollowerPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Adjust the speed divider (e.g. 8) to make it more/less responsive
        return {
          x: prev.x + dx / 10,
          y: prev.y + dy / 10,
        };
      });
      id = requestAnimationFrame(updateFollower);
    };

    id = requestAnimationFrame(updateFollower);

    return () => cancelAnimationFrame(id);
  }, [position, isVisible]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("interactive-card") ||
          target.closest(".interactive-card"))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Glow aura */}
      <div
        className="cursor-follower"
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          width: hovered ? "450px" : "250px",
          height: hovered ? "450px" : "250px",
          background: hovered
            ? "radial-gradient(circle, rgba(189, 0, 255, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 70%)",
        }}
      />
      {/* Central tracking dot */}
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.7 : hovered ? 1.5 : 1})`,
          backgroundColor: hovered ? "#00f0ff" : "#ffffff",
          boxShadow: hovered 
            ? "0 0 15px #00f0ff, 0 0 30px #bd00ff"
            : "0 0 8px #ffffff, 0 0 15px #00f0ff",
        }}
      />
    </>
  );
}
