"use client";

import React from "react";
import { defaultStudioSettings } from "@/utilities/studioDefaults";

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
    { num: String(stats.projectsCount || 500), suffix: "+", label: "Projects Completed" },
    { num: String(stats.clientsCount || 300), suffix: "+", label: "Happy Clients" },
    { num: String(parseInt(stats.socialReach || "20") || 20), suffix: "M+", label: "Social Media Reach" },
    { num: String(stats.yearsExperience || 5), suffix: "+", label: "Years Experience" },
  ];

  return (
    <section
      id="stats"
      className="relative bg-gradient-to-r from-[#0c0c0c] via-[#111111] to-[#0c0c0c] py-20 px-6 sm:px-8 border-b border-white/5 overflow-hidden"
    >
      {/* Central Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,179,1,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {statItems.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-6 sm:p-8 text-center"
            >
              <div className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-[#F5B301] tracking-tight leading-none drop-shadow-[0_0_35px_rgba(245,179,1,0.25)]">
                {s.num}
                <span className="text-[#F5B301]/70 text-[0.65em] ml-0.5">{s.suffix}</span>
              </div>
              <div className="font-montserrat text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
