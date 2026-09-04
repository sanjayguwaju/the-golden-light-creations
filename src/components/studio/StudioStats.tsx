"use client";

import React from "react";
import { defaultStudioSettings } from "@/utilities/studioDefaults";
import { NumberTicker } from "@/components/magicui";

interface StudioStatsProps {
  stats?: {
    projectsCount?: number;
    clientsCount?: number;
    socialReach?: string;
    yearsExperience?: number;
  };
}

export function StudioStats({ stats = defaultStudioSettings.stats }: StudioStatsProps) {
  const statItems = [
    { value: stats.projectsCount || 500, suffix: "+", label: "Projects Completed" },
    { value: stats.clientsCount || 300, suffix: "+", label: "Happy Clients" },
    { value: parseInt(stats.socialReach || "20") || 20, suffix: "M+", label: "Social Media Reach" },
    { value: stats.yearsExperience || 5, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section
      id="stats"
      className="relative bg-[#C0171E] py-16 sm:py-20 px-4 sm:px-8 border-b border-white/5 overflow-hidden"
    >
      {/* Central Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {statItems.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-white/[0.01] border border-white/5 sm:border-none"
            >
              <div className="font-bebas text-4xl sm:text-6xl lg:text-8xl text-white tracking-tight leading-none drop-shadow-[0_0_35px_rgba(255,255,255,0.20)] flex items-center justify-center">
                <NumberTicker value={s.value} delay={idx * 0.15} className="text-white" />
                <span className="text-white/70 text-[0.65em] ml-0.5">{s.suffix}</span>
              </div>
              <div className="font-montserrat text-[9px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/60 mt-2 sm:mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
