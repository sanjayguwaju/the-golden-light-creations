import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

interface Props {
  breadcrumb?: string;
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
}

export function StudioPageHeaderBlockComponent({
  breadcrumb,
  eyebrow,
  title,
  highlight,
  description,
}: Props) {
  return (
    <div className="bg-[#C0171E] text-white pt-32 pb-14 sm:pb-16 px-4 sm:px-8 border-b border-[#A01018]">
      <div className="max-w-7xl mx-auto">
        {breadcrumb && (
          <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/70 uppercase mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white font-bold">{breadcrumb}</span>
          </div>
        )}

        {eyebrow && (
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#FFD04A] uppercase">
              {eyebrow}
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#FFD04A]/60" />
          </div>
        )}

        <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-3 sm:mb-4 text-white">
          {title}{" "}
          {highlight && <em className="text-[#FFD04A] not-italic">{highlight}</em>}
        </h1>
        {description && (
          <p className="font-poppins text-xs sm:text-base text-white/90 max-w-2xl font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
