import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  heading?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function StudioBannerBlockComponent({
  eyebrow = "Ready To Create Magic?",
  heading = "Let's Capture Your Next Visual Story",
  buttonText = "Book Your Shoot",
  buttonLink = "/contact",
}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 my-12 sm:my-16">
      <div className="bg-[#C0171E] text-white p-6 sm:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-2xl">
        <div>
          {eyebrow && (
            <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] block mb-2">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide leading-tight">
              {heading}
            </h3>
          )}
        </div>
        <Link
          href={buttonLink || "/contact"}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#C0171E] hover:bg-[#FFF5F5] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 shadow-xl whitespace-nowrap"
        >
          <span>{buttonText || "Book Your Shoot"}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
