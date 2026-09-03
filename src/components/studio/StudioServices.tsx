"use client";

import React from "react";
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
} from "lucide-react";

interface ServiceItem {
  num: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
}

const services: ServiceItem[] = [
  {
    num: "001",
    icon: <Camera className="w-6 h-6 text-[#F5B301]" />,
    name: "Wedding Photography",
    desc: "Timeless luxury wedding coverage capturing every intimate emotion and golden detail of your sacred day.",
  },
  {
    num: "002",
    icon: <Film className="w-6 h-6 text-[#F5B301]" />,
    name: "Cinematic Videography",
    desc: "Cinematic wedding films crafted like Hollywood productions — emotional, gripping, and eternally beautiful.",
  },
  {
    num: "003",
    icon: <Compass className="w-6 h-6 text-[#F5B301]" />,
    name: "Drone Coverage",
    desc: "Breathtaking aerial perspectives that reveal the grandeur of your venue and the scale of your celebration.",
  },
  {
    num: "004",
    icon: <PartyPopper className="w-6 h-6 text-[#F5B301]" />,
    name: "Event Coverage",
    desc: "Comprehensive documentation of corporate galas, cultural celebrations, and milestone anniversaries.",
  },
  {
    num: "005",
    icon: <Music className="w-6 h-6 text-[#F5B301]" />,
    name: "Concert Photography",
    desc: "High-energy concert and music event photography that captures the raw power of live performances.",
  },
  {
    num: "006",
    icon: <Video className="w-6 h-6 text-[#F5B301]" />,
    name: "Music Video Production",
    desc: "Professional music video production from concept to screen — artistic, cinematic, and deeply impactful.",
  },
  {
    num: "007",
    icon: <Smartphone className="w-6 h-6 text-[#F5B301]" />,
    name: "Digital Marketing",
    desc: "Strategic digital campaigns that elevate your brand presence across all major platforms and markets.",
  },
  {
    num: "008",
    icon: <Sparkles className="w-6 h-6 text-[#F5B301]" />,
    name: "Social Media Branding",
    desc: "Premium social media content creation and management that builds an authentic, luxury brand identity.",
  },
  {
    num: "009",
    icon: <Tv className="w-6 h-6 text-[#F5B301]" />,
    name: "Commercial Advertisement",
    desc: "Compelling commercial ad production for brands seeking to communicate quality and drive lasting results.",
  },
  {
    num: "010",
    icon: <Lightbulb className="w-6 h-6 text-[#F5B301]" />,
    name: "Creative Direction",
    desc: "Full-spectrum creative direction and visual storytelling strategy for discerning brands and individuals.",
  },
];

export function StudioServices() {
  return (
    <section id="services" className="bg-[#111111] py-24 sm:py-32 px-6 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
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
          <p className="font-poppins text-sm text-white/70 max-w-md leading-relaxed">
            Premium creative solutions crafted for brands and couples who demand the very best visual execution.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.num}
              className="group relative bg-white/[0.02] border border-white/[0.08] hover:border-[#F5B301]/40 p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#F5B301]/[0.03] overflow-hidden"
            >
              {/* Bottom expanding gold indicator */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F5B301] transition-all duration-500 ease-out group-hover:w-full" />

              {/* Icon Container */}
              <div className="w-14 h-14 border border-[#F5B301]/30 group-hover:border-[#F5B301] group-hover:bg-[#F5B301]/10 flex items-center justify-center mb-6 transition-all duration-300">
                {srv.icon}
              </div>

              {/* Number */}
              <div className="font-bebas text-sm tracking-[0.25em] text-[#F5B301]/60 mb-2">
                {srv.num}
              </div>

              {/* Name */}
              <h3 className="font-montserrat text-base sm:text-lg font-bold uppercase tracking-wider text-white mb-3 group-hover:text-[#F5B301] transition-colors">
                {srv.name}
              </h3>

              {/* Description */}
              <p className="font-poppins text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
