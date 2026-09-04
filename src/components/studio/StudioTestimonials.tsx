"use client";

import React from "react";
import { Star } from "lucide-react";
import { defaultTestimonials, type FallbackTestimonialItem } from "@/utilities/studioDefaults";
import { Marquee } from "@/components/magicui";

interface StudioTestimonialsProps {
  items?: FallbackTestimonialItem[];
}

export function StudioTestimonials({ items = defaultTestimonials }: StudioTestimonialsProps) {
  return (
    <section id="testimonials" className="bg-[#FFF5F5] py-20 sm:py-32 px-4 sm:px-8 border-b border-[#C0171E]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
            <span className="w-8 sm:w-10 h-[1px] bg-[#C0171E]/60" />
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
              Client Love
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#C0171E]/60" />
          </div>
          <h2 className="font-bebas text-3xl sm:text-6xl md:text-7xl tracking-[0.02em] text-[#0A0A0A] uppercase leading-none">
            What Our <em className="text-[#C0171E] not-italic">Clients</em> Say
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/60 max-w-md mx-auto mt-3">
            Real stories and heartfelt words from the couples and brands we have had the privilege to document.
          </p>
        </div>

        {/* Magic UI Marquee with Left/Right Edge Fades */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FFF5F5] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FFF5F5] to-transparent z-10" />

          <Marquee pauseOnHover repeat={3} className="[--duration:35s] py-4">
            {items.map((t, idx) => (
              <div
                key={t.id || idx}
                className="w-[320px] sm:w-[400px] shrink-0 relative bg-white border border-[#C0171E]/10 hover:border-[#C0171E]/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 overflow-hidden group mx-3"
              >
                {/* Background Quotation Accent */}
                <span
                  className="absolute top-2 right-4 font-bebas text-7xl text-[#C0171E]/[0.04] select-none pointer-events-none group-hover:text-[#C0171E]/10 transition-colors"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div>
                  {/* Stars based on rating */}
                  <div className="flex items-center gap-1 mb-4" aria-label={`${t.rating || 5} out of 5 stars`}>
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F5B301] text-[#F5B301]"
                      />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/80 font-light leading-relaxed italic mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#C0171E]/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#C0171E]/50"
                  />
                  <div>
                    <h3 className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      {t.name}
                    </h3>
                    <p className="font-poppins text-[10px] sm:text-[11px] text-[#0A0A0A]/50 font-medium mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
