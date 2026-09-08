import React from "react";
import Link from "next/link";
import { V5TiltCard } from "@/components/v5/V5TiltCard";

export interface V5ServiceItem {
  idx: string;
  title: string;
  description: string;
  link?: string;
}

export interface V5ServicesBlockProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  services?: V5ServiceItem[];
}

const defaultServicesList: V5ServiceItem[] = [
  {
    idx: "01",
    title: "Wedding Photography",
    description:
      "Timeless luxury coverage capturing every intimate emotion and golden detail of your day.",
  },
  {
    idx: "02",
    title: "Cinematic Videography",
    description:
      "Wedding films crafted like feature productions — emotional, gripping, and built to last.",
  },
  {
    idx: "03",
    title: "Drone Coverage",
    description:
      "Aerial perspectives that reveal the scale of your venue and the grandeur of the moment.",
  },
  {
    idx: "04",
    title: "Event Coverage",
    description:
      "Full documentation of corporate galas, cultural celebrations, and milestone occasions.",
  },
  {
    idx: "05",
    title: "Concert Photography",
    description:
      "High-energy live coverage that captures the raw power of a performance in motion.",
  },
  {
    idx: "06",
    title: "Music Video Production",
    description:
      "Concept-to-screen production — artistic, cinematic, and built around your sound.",
  },
];

export function V5ServicesBlockComponent({
  eyebrow = "What We Offer",
  title = "Premium creative services, built for people who notice detail",
  description = "From intimate weddings to full commercial campaigns — every service is shot, edited, and delivered to a cinema-grade standard.",
  services = defaultServicesList,
}: V5ServicesBlockProps) {
  const items = services && services.length > 0 ? services : defaultServicesList;

  return (
    <section
      id="services"
      className="relative w-full py-16 sm:py-24 px-6 sm:px-14 bg-white overflow-hidden text-[#1A1414]"
    >
      {/* Decorative blurred background orb */}
      <div
        className="absolute top-0 -right-24 w-[340px] h-[340px] rounded-full blur-[60px] opacity-50 pointer-events-none z-0 bg-[#F6E3E4]"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-[12.5px] text-[#A31621] font-bold tracking-[0.03em] uppercase mb-3.5">
              {eyebrow}
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.15] text-[#1A1414]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {title}
            </h2>
          </div>
          {description && (
            <p className="max-w-md text-[15px] text-[#7A716C] leading-[1.65]">
              {description}
            </p>
          )}
        </div>

        {/* 3D Tilting Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((svc, idx) => {
            const cardContent = (
              <div className="flex flex-col h-full">
                <div
                  className="w-[34px] h-[34px] rounded-full bg-[#A31621] text-white flex items-center justify-center text-[15px] font-semibold mb-5 shadow-[0_14px_30px_rgba(163,22,33,0.22)]"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {svc.idx || `0${idx + 1}`}
                </div>
                <h3
                  className="text-[19px] font-normal mb-3 text-[#1A1414]"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {svc.title}
                </h3>
                <p className="text-[14px] text-[#7A716C] leading-[1.6] flex-1">
                  {svc.description}
                </p>
              </div>
            );

            return (
              <V5TiltCard
                key={idx}
                className="bg-white p-8 sm:p-10 rounded-md border border-[#EDE7E3] shadow-[0_1px_2px_rgba(26,20,20,0.04),0_2px_6px_rgba(26,20,20,0.04)] hover:shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] hover:border-transparent transition-all duration-300"
              >
                {svc.link ? (
                  <Link href={svc.link} className="block h-full no-underline">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </V5TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
