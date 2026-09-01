"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ImpactNumbersBlock as ImpactNumbersProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import Image from "next/image";

const colorClasses: Record<string, { bg: string; text: string; number: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", number: "text-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", number: "text-secondary" },
  success: { bg: "bg-success/10", text: "text-success", number: "text-success" },
  warning: { bg: "bg-warning/10", text: "text-warning", number: "text-warning" },
  info: { bg: "bg-info/10", text: "text-info", number: "text-info" },
};

const backgroundClasses: Record<string, string> = {
  white: "bg-background",
  muted: "bg-muted",
  primary: "bg-primary",
  dark: "bg-slate-900",
  gradient: "bg-gradient-to-br from-primary to-primary-foreground",
};

function AnimatedNumber({ value, animate }: { value: string; animate: boolean }) {
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!animate || isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * numericValue);

      setDisplayValue(current.toLocaleString() + suffix);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [value, animate, numericValue, suffix]);

  return <span>{isNaN(numericValue) ? value : displayValue}</span>;
}

export const ImpactNumbersBlock: React.FC<ImpactNumbersProps> = ({
  layout = "grid",
  pretitle,
  title,
  subtitle,
  stats,
  backgroundStyle = "white",
  showIcons,
  animateNumbers,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!stats?.length) return null;

  const isDark =
    backgroundStyle === "dark" || backgroundStyle === "primary" || backgroundStyle === "gradient";

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24", backgroundClasses[backgroundStyle ?? "white"])}
    >
      <div className="container">
        {/* Header */}
        {(pretitle || title || subtitle) && (
          <div className="text-center mb-12">
            {pretitle && (
              <span
                className={cn(
                  "inline-block text-sm font-medium mb-4 tracking-wider uppercase",
                  isDark ? "text-white/80" : "text-primary"
                )}
              >
                {pretitle}
              </span>
            )}
            {title && (
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold mb-4",
                  isDark ? "text-white" : "text-foreground"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-lg max-w-2xl mx-auto",
                  isDark ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid Layout */}
        {layout === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const hasIcon = showIcons && stat?.icon != null && typeof stat.icon === "object";
              const iconUrl = hasIcon && typeof stat.icon === "object" ? stat.icon?.url : null;
              const colors = colorClasses[stat.color || "primary"];

              return (
                <div
                  key={index}
                  className={cn("text-center p-6 rounded-xl", isDark ? "bg-white/10" : colors.bg)}
                >
                  {hasIcon && iconUrl && (
                    <div className="relative w-12 h-12 mx-auto mb-4">
                      <Image src={iconUrl} alt="" fill className="object-contain" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "text-4xl md:text-5xl font-bold mb-2",
                      isDark ? "text-white" : colors.number
                    )}
                  >
                    <AnimatedNumber value={stat.value} animate={isVisible && !!animateNumbers} />
                  </div>
                  <div className={cn("font-medium mb-1", isDark ? "text-white" : colors.text)}>
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p
                      className={cn("text-sm", isDark ? "text-white/70" : "text-muted-foreground")}
                    >
                      {stat.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Row Layout */}
        {layout === "row" && (
          <div
            className={cn(
              "flex flex-wrap justify-center items-center gap-8 md:gap-16 py-8",
              isDark ? "border-y border-white/20" : "border-y border-border"
            )}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={cn(
                    "text-3xl md:text-4xl font-bold",
                    isDark ? "text-white" : "text-primary"
                  )}
                >
                  <AnimatedNumber value={stat.value} animate={isVisible && !!animateNumbers} />
                </div>
                <div
                  className={cn("text-sm mt-1", isDark ? "text-white/80" : "text-muted-foreground")}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Masonry Layout */}
        {layout === "masonry" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const isLarge = index === 0 || index === 3;
              const hasIcon = showIcons && stat?.icon != null && typeof stat.icon === "object";
              const iconUrl = hasIcon && typeof stat.icon === "object" ? stat.icon?.url : null;
              const colors = colorClasses[stat.color || "primary"];

              return (
                <div
                  key={index}
                  className={cn(
                    "p-8 rounded-2xl text-center",
                    isLarge && "md:col-span-2 lg:col-span-1",
                    isDark ? "bg-white/10" : colors.bg
                  )}
                >
                  {hasIcon && iconUrl && (
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <Image src={iconUrl} alt="" fill className="object-contain" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "text-5xl md:text-6xl font-bold mb-2",
                      isDark ? "text-white" : colors.number
                    )}
                  >
                    <AnimatedNumber value={stat.value} animate={isVisible && !!animateNumbers} />
                  </div>
                  <div className={cn("text-lg font-medium", isDark ? "text-white" : colors.text)}>
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p
                      className={cn(
                        "text-sm mt-2",
                        isDark ? "text-white/70" : "text-muted-foreground"
                      )}
                    >
                      {stat.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
