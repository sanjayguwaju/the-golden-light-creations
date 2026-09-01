"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utilities/ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface GsapNumberTickerProps {
  /** The value to animate to (can be string like '100+' or number) */
  value: number | string;
  /** Direction of the animation */
  direction?: "up" | "down";
  /** Duration of the animation in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Decimal places */
  decimalPlaces?: number;
  /** Optional class name */
  className?: string;
  /** Optional prefix */
  prefix?: string;
  /** Optional suffix */
  suffix?: string;
  /** Use comma separators */
  separator?: boolean;
}

export function GsapNumberTicker({
  value,
  direction = "up",
  duration = 2,
  delay = 0,
  decimalPlaces = 0,
  className,
  prefix = "",
  suffix = "",
  separator = true,
}: GsapNumberTickerProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  // Parse string value if needed
  let numericValue = typeof value === "number" ? value : 0;
  let parsedPrefix = prefix;
  let parsedSuffix = suffix;

  if (typeof value === "string") {
    // Basic extraction of prefix, number, suffix
    const match = value.match(/^([^0-9.-]*)([0-9.,]+)([^0-9]*)$/);
    if (match) {
      parsedPrefix = prefix || match[1] || "";
      numericValue = parseFloat(match[2].replace(/,/g, ""));
      parsedSuffix = suffix || match[3] || "";
    }
  }

  useGSAP(
    () => {
      if (!numberRef.current) return;

      const element = numberRef.current;
      const startValue = direction === "up" ? 0 : numericValue * 2;
      
      const formatNumber = (num: number) => {
        const fixedNum = num.toFixed(decimalPlaces);
        if (!separator) return fixedNum;
        const parts = fixedNum.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      };

      // Create an object to tween
      const counter = { val: startValue };

      // Set initial value
      element.innerHTML = `${parsedPrefix}${formatNumber(startValue)}${parsedSuffix}`;

      gsap.to(counter, {
        val: numericValue,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Start animation when element is 85% in view
          once: true,
        },
        onUpdate: () => {
          if (element) {
            element.innerHTML = `${parsedPrefix}${formatNumber(counter.val)}${parsedSuffix}`;
          }
        },
      });
    },
    { dependencies: [value, direction, duration, delay, decimalPlaces, parsedPrefix, parsedSuffix, separator, numericValue] }
  );

  return (
    <span
      ref={numberRef}
      className={cn("inline-block tabular-nums tracking-wider", className)}
    />
  );
}
