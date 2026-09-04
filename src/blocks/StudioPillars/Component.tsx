import React from "react";
import { Sparkles, Heart, Video, Shield } from "lucide-react";

interface PillarItem {
  title: string;
  desc: string;
  iconType?: "sparkles" | "heart" | "video" | "shield";
}

interface Props {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  items?: PillarItem[];
}

const defaultPillars: PillarItem[] = [
  {
    iconType: "sparkles",
    title: "Obsession With Light",
    desc: "We understand that lighting is not just technical exposure; it is the emotional heartbeat of every frame.",
  },
  {
    iconType: "heart",
    title: "Authentic Emotion",
    desc: "Unstaged, raw, genuine moments are what make photographs eternal. We capture the feelings you never want to forget.",
  },
  {
    iconType: "video",
    title: "Cinema-Grade Gear",
    desc: "Top-tier full-frame cinema cameras, anamorphic lenses, and precision drones delivering Hollywood-level visual standards.",
  },
  {
    iconType: "shield",
    title: "Uncompromising Reliability",
    desc: "Flawless on-time delivery, secure multi-backup data redundancy, and client-first communication throughout.",
  },
];

function renderIcon(type?: string) {
  switch (type) {
    case "sparkles":
      return <Sparkles className="w-6 h-6 text-[#F5B301]" />;
    case "heart":
      return <Heart className="w-6 h-6 text-[#C0171E]" />;
    case "video":
      return <Video className="w-6 h-6 text-[#C0171E]" />;
    case "shield":
      return <Shield className="w-6 h-6 text-[#C0171E]" />;
    default:
      return <Sparkles className="w-6 h-6 text-[#F5B301]" />;
  }
}

export function StudioPillarsBlockComponent({
  eyebrow = "How We Work",
  title = "The Studio",
  highlight = "Pillars",
  items,
}: Props) {
  const pillarsToRender = items && items.length > 0 ? items : defaultPillars;

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-black/5">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        {eyebrow && (
          <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase block mb-3">
            {eyebrow}
          </span>
        )}
        <h2 className="font-bebas text-3xl sm:text-6xl text-[#0A0A0A] uppercase leading-none">
          {title}{" "}
          {highlight && <em className="text-[#C0171E] not-italic">{highlight}</em>}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {pillarsToRender.map((v, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#C0171E]/15 hover:border-[#C0171E]/50 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-md"
          >
            <div className="w-12 h-12 border border-[#C0171E]/30 bg-[#FFF5F5] flex items-center justify-center mb-6">
              {renderIcon(v.iconType)}
            </div>
            <h3 className="font-montserrat text-base font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 sm:mb-3">
              {v.title}
            </h3>
            <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light leading-relaxed">
              {v.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
