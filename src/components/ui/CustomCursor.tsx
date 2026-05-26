"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch capability to completely disable custom cursor on mobile/tablets
    const checkTouch = () => {
      const isTouch = 
        window.matchMedia("(pointer: coarse)").matches || 
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      return isTouch;
    };

    if (checkTouch()) return;

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

  useEffect(() => {
    if (isTouchDevice) return;

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
  }, [isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central tracking dot - simplified, flat, clean, no neon glow shadows */}
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.7 : hovered ? 1.4 : 1})`,
          backgroundColor: hovered ? "#3b82f6" : "#ffffff",
          border: hovered ? "1px solid rgba(255, 255, 255, 0.4)" : "none",
          transition: "transform 0.15s ease, background-color 0.15s ease",
          boxShadow: "none"
        }}
      />
    </>
  );
}
