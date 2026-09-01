"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utilities/ui";

export interface GsapMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Direction of the marquee.
   * @default "left"
   */
  direction?: "left" | "right" | "up" | "down";
  /**
   * Pause the marquee on hover.
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Reverse the direction.
   * @default false
   */
  reverse?: boolean;
  /**
   * CSS class to apply to the container.
   */
  className?: string;
  /**
   * The speed multiplier. Higher is faster.
   * @default 1
   */
  speed?: number;
  /**
   * Number of times to duplicate children for seamless looping.
   * @default 4
   */
  repeat?: number;
}

export function GsapMarquee({
  children,
  direction = "left",
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 1,
  repeat = 4,
  ...props
}: GsapMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const isVertical = direction === "up" || direction === "down";

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const elements = gsap.utils.toArray(track.children) as HTMLElement[];
      if (elements.length === 0) return;

      const totalItems = elements.length;
      
      // Calculate total width/height of a single block (original children)
      // Since we repeated the children `repeat` times, the real block is totalItems / repeat
      const originalCount = Math.max(1, Math.floor(totalItems / repeat));

      // Create a seamless loop animation
      // We animate from 0 to the size of ONE full set of original children, 
      // which is 100% / repeat in terms of the entire track's size, but GSAP uses percent relative to the element itself.
      
      const percentPerBlock = -100 / repeat;
      let targetPercent = percentPerBlock;

      if (direction === "right" || direction === "down") {
        targetPercent = Math.abs(percentPerBlock);
      }
      
      if (reverse) {
        targetPercent *= -1;
      }

      // Base duration depending on speed (e.g. 10s base)
      const duration = 20 / speed;

      const animProps: gsap.TweenVars = {
        ease: "none",
        duration: duration,
        repeat: -1,
      };

      if (isVertical) {
        // For vertical, we might need to set up absolute positioning or flex column
        animProps.yPercent = targetPercent;
      } else {
        animProps.xPercent = targetPercent;
      }

      tweenRef.current = gsap.to(track, animProps);
    },
    { scope: containerRef, dependencies: [direction, reverse, speed, repeat] }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2",
        {
          "flex-row": !isVertical,
          "flex-col": isVertical,
        },
        className
      )}
      onMouseEnter={() => {
        if (pauseOnHover && tweenRef.current) {
          tweenRef.current.pause();
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover && tweenRef.current) {
          tweenRef.current.play();
        }
      }}
      {...props}
    >
      <div
        ref={trackRef}
        className={cn("flex shrink-0 justify-around gap-4", {
          "flex-row": !isVertical,
          "flex-col": isVertical,
        })}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <React.Fragment key={i}>{children}</React.Fragment>
        ))}
      </div>
    </div>
  );
}
