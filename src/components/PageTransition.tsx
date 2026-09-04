"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Smooth entrance fade & subtle slide; clearProps: "all" completely removes
    // any lingering CSS transforms so descendant fixed elements are never trapped
    gsap.fromTo(
      containerRef.current,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "all",
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="invisible">
      {children}
    </div>
  );
}

