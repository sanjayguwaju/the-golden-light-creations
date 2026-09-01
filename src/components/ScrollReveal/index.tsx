"use client";

import React, { ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set(containerRef.current, { opacity: 0, y: 40, scale: 0.96 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 88%",
        onEnter: () => {
          gsap.to(containerRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            y: 40,
            scale: 0.96,
            duration: 0.5,
            ease: "power2.in",
            overwrite: "auto",
          });
        },
      });
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
};
