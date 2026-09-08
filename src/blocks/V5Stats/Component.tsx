import React from "react";

export interface V5StatItem {
  num: string;
  label: string;
}

export interface V5StatsBlockProps {
  stats?: V5StatItem[];
  pullUp?: boolean;
}

const defaultStats: V5StatItem[] = [
  { num: "5+", label: "Years of Craft" },
  { num: "300+", label: "Projects Delivered" },
  { num: "250+", label: "Happy Clients" },
  { num: "10M+", label: "Social Reach" },
];

export function V5StatsBlockComponent({
  stats = defaultStats,
  pullUp = true,
}: V5StatsBlockProps) {
  const items = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <div
      className={`relative z-10 w-full px-5 sm:px-14 bg-[#FAF7F4] ${
        pullUp ? "-mt-12" : "py-8"
      }`}
    >
      <div
        className={`max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 bg-white rounded-md border border-[#EDE7E3] shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] ${
          pullUp ? "-translate-y-8" : ""
        }`}
      >
        {items.map((stat, idx) => (
          <div
            key={idx}
            className={`py-8 sm:py-10 px-6 text-center ${
              idx === 0
                ? ""
                : idx === 2
                ? "border-t md:border-t-0 border-[#EDE7E3] md:border-l border-[#EDE7E3]"
                : "border-l border-[#EDE7E3]"
            }`}
          >
            <div
              className="text-3xl sm:text-4xl font-normal text-[#A31621] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {stat.num}
            </div>
            <div className="text-[12.5px] text-[#7A716C] mt-1.5 font-medium tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
