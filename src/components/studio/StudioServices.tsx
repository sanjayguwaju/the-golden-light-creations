"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import {
  Camera,
  Film,
  Compass,
  PartyPopper,
  Music,
  Video,
  Smartphone,
  Sparkles,
  Tv,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import { defaultServices, type FallbackServiceItem } from "@/utilities/studioDefaults";
import { MagicCard, BorderBeam } from "@/components/magicui";

interface StudioServicesProps {
  items?: FallbackServiceItem[];
  isHomepagePreview?: boolean;
}

function resolveServiceIcon(iconName: string) {
  switch (iconName?.toLowerCase()) {
    case "camera":
      return <Camera className="w-6 h-6 text-[#F5B301]" />;
    case "film":
      return <Film className="w-6 h-6 text-[#F5B301]" />;
    case "compass":
    case "drone":
      return <Compass className="w-6 h-6 text-[#F5B301]" />;
    case "party":
    case "partypopper":
      return <PartyPopper className="w-6 h-6 text-[#F5B301]" />;
    case "music":
      return <Music className="w-6 h-6 text-[#F5B301]" />;
    case "video":
      return <Video className="w-6 h-6 text-[#F5B301]" />;
    case "smartphone":
      return <Smartphone className="w-6 h-6 text-[#F5B301]" />;
    case "sparkles":
      return <Sparkles className="w-6 h-6 text-[#F5B301]" />;
    case "tv":
      return <Tv className="w-6 h-6 text-[#F5B301]" />;
    case "lightbulb":
    default:
      return <Lightbulb className="w-6 h-6 text-[#F5B301]" />;
  }
}

export function StudioServices({
  items = defaultServices,
  isHomepagePreview = false,
}: StudioServicesProps) {
  const displayedItems = isHomepagePreview ? items.slice(0, 6) : items;

  return (
    <section id="services" className="bg-[#111111] py-20 sm:py-32 px-4 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
                What We Offer
              </span>
              <span className="w-10 h-[1px] bg-[#F5B301]/60" />
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-none">
              Our <em className="text-[#F5B301] not-italic">Services</em>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-poppins text-sm text-white/70 max-w-md leading-relaxed">
              Premium creative solutions crafted for brands and couples who demand the very best visual execution.
            </p>
            {isHomepagePreview && (
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-[#F5B301] hover:text-[#FFD04A] transition-colors whitespace-nowrap"
              >
                <span>All 10 Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Services Grid with MagicCard Spotlight & BorderBeam on Flagship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((srv, index) => {
            const isFeatured = index === 0;
            return (
              <MagicCard
                key={srv.id || srv.num}
                gradientColor="rgba(245, 179, 1, 0.14)"
                gradientSize={280}
                className={`group relative bg-white/[0.02] p-6 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 ${
                  isFeatured
                    ? "border-[#F5B301]/50 shadow-[0_0_30px_rgba(245,179,1,0.12)]"
                    : "border-white/[0.08] hover:border-[#F5B301]/40"
                }`}
              >
                {/* BorderBeam for Flagship Signature Service */}
                {isFeatured && (
                  <BorderBeam
                    size={100}
                    duration={8}
                    colorFrom="#F5B301"
                    colorTo="#FFD04A"
                    borderWidth={1.5}
                  />
                )}

                {/* Bottom expanding gold indicator */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F5B301] transition-all duration-500 ease-out group-hover:w-full" />

                {/* Featured Badge */}
                {isFeatured && (
                  <span className="inline-block font-montserrat text-[9px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A] bg-[#F5B301] px-2.5 py-0.5 mb-4 shadow-sm">
                    Signature
                  </span>
                )}

                {/* Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[#F5B301]/30 group-hover:border-[#F5B301] group-hover:bg-[#F5B301]/10 flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300">
                  {resolveServiceIcon(srv.icon)}
                </div>

                {/* Number */}
                <div className="font-bebas text-sm tracking-[0.25em] text-[#F5B301]/60 mb-2">
                  {srv.num}
                </div>

                {/* Name */}
                <h3 className="font-montserrat text-base sm:text-lg font-bold uppercase tracking-wider text-white mb-2 sm:mb-3 group-hover:text-[#F5B301] transition-colors">
                  {srv.name}
                </h3>

                {/* Description */}
                <p className="font-poppins text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {srv.desc}
                </p>
              </MagicCard>
            );
          })}
        </div>

        {/* Homepage Preview Action */}
        {isHomepagePreview && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto border border-[#F5B301] text-[#F5B301] hover:bg-[#F5B301] hover:text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 sm:px-10 py-4 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              <span>Explore All Production Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
