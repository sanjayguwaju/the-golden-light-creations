"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LiquidTransitionBlock as LiquidTransitionBlockProps } from "@/payload-types";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const LiquidTransitionBlock: React.FC<LiquidTransitionBlockProps> = ({
  topColor = "#FFFFFF",
  bottomColor = "#C9A84C",
  height = 200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // SVG strings must match exactly in structure for GSAP to interpolate numbers
  const pathFlat = "M0,0 Q50,0 100,0 L100,100 L0,100 Z";
  const pathWave = "M0,0 Q50,150 100,0 L100,100 L0,100 Z";

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      gsap.fromTo(
        path,
        { attr: { d: pathFlat } },
        {
          attr: { d: pathWave },
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1, // Smooth scrub
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-visible"
      style={{
        height: `${height}px`,
        backgroundColor: topColor,
        marginTop: "-1px", // prevent sub-pixel gaps
        marginBottom: "-1px",
      }}
    >
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ fill: bottomColor }}
      >
        <path ref={pathRef} d={pathFlat} />
      </svg>
    </div>
  );
};
