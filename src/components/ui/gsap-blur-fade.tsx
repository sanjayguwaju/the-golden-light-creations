"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utilities/ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface GsapBlurFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Stagger time if children are multiple elements (not implemented by default here, but useful for arrays) */
  stagger?: number;
  /** Y offset to animate from */
  yOffset?: number;
  /** Initial blur radius in pixels */
  blur?: number;
  /** Whether the animation should trigger only once */
  once?: boolean;
}

export function GsapBlurFade({
  children,
  duration = 0.8,
  delay = 0,
  yOffset = 24,
  blur = 12,
  once = true,
  className,
  ...props
}: GsapBlurFadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      
      // Set initial state
      gsap.set(element, {
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      });

      // Animate in
      gsap.to(element, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%", // Trigger when top of element is 90% down the viewport
          once: once,
        },
      });
    },
    { dependencies: [duration, delay, yOffset, blur, once], scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}
