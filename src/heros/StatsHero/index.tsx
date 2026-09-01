"use client";

import React, { useEffect, useRef, useState } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { Users, Heart, Globe, Award } from "lucide-react";
import { cn } from "@/utilities/ui";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
};

const defaultStats = [
  { icon: "users", value: "50", suffix: "K+", label: "Lives Impacted" },
  { icon: "heart", value: "100", suffix: "+", label: "Communities Served" },
  { icon: "globe", value: "25", suffix: "", label: "Countries Reached" },
  { icon: "award", value: "15", suffix: "", label: "Years of Service" },
];

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = numericValue / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [numericValue]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

type StatFromPayload = {
  value: string;
  suffix?: string | null;
  label: string;
  id?: string | null;
};

export const StatsHero: React.FC<Page["hero"] & { stats?: StatFromPayload[] | null }> = ({
  links,
  media,
  richText,
  stats,
}) => {
  const displayStats = stats ?? defaultStats;
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  }, [setHeaderTheme]);

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      data-theme="dark"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === "object" && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div>
            {richText && (
              <RichText
                className="prose prose-invert max-w-none [&_h1]:text-4xl md:[&_h1]:text-6xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-6 [&_p]:text-lg [&_p]:text-white/90"
                data={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-8">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300",
                      i === 0
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {displayStats.map((stat: (typeof defaultStats)[0] | StatFromPayload, index: number) => (
              <div
                key={index}
                className={cn(
                  "relative p-6 rounded-2xl backdrop-blur-sm border border-white/10",
                  "bg-white/5 hover:bg-white/10 transition-all duration-300",
                  index === 0 && "col-span-2 sm:col-span-1"
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
                    {iconMap[(stat as { icon?: string }).icon ?? "award"] || (
                      <Award className="w-6 h-6" />
                    )}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix ?? undefined} />
                </div>
                <div className="text-sm text-white/70 uppercase tracking-wider">
                  {(stat as StatFromPayload).label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};
