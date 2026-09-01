"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We do an entrance animation when this mounts (which happens on every route change in template.tsx)
    const tl = gsap.timeline();

    // 1. Set initial states
    gsap.set(containerRef.current, { autoAlpha: 0, y: 40 });
    gsap.set(wipeRef.current, { scaleY: 1, transformOrigin: "top" });

    // 2. Animate the "paint wipe" lifting up
    tl.to(wipeRef.current, {
      scaleY: 0,
      duration: 0.8,
      ease: "power4.inOut",
    });

    // 3. Fade and slide in the actual page content
    tl.to(
      containerRef.current,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4" // overlap slightly with the wipe
    );
  }, []);

  return (
    <>
      {/* The paint wipe overlay (acts as the transition curtain) */}
      <div 
        ref={wipeRef} 
        className="fixed inset-0 bg-reliance-gold z-[100] pointer-events-none"
      />
      
      {/* The actual page content */}
      <div ref={containerRef} className="invisible">
        {children}
      </div>
    </>
  );
}
