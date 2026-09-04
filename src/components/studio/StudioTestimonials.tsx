"use client";

import React from "react";
import { Star } from "lucide-react";
import { defaultTestimonials, type FallbackTestimonialItem } from "@/utilities/studioDefaults";

interface StudioTestimonialsProps {
  items?: FallbackTestimonialItem[];
}

export function StudioTestimonials({ items = defaultTestimonials }: StudioTestimonialsProps) {
  return (
    <section id="testimonials" className="bg-[#111111] py-20 sm:py-32 px-4 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
            <span className="w-8 sm:w-10 h-[1px] bg-[#F5B301]/60" />
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
              Client Love
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#F5B301]/60" />
          </div>
          <h2 className="font-bebas text-3xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-none">
            What Our <em className="text-[#F5B301] not-italic">Clients</em> Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {items.map((t, idx) => (
            <div
              key={t.id || idx}
              className="relative bg-white/[0.02] border border-white/[0.08] hover:border-[#F5B301]/30 p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Background Quotation Accent */}
              <span
                className="absolute top-2 right-4 font-bebas text-8xl text-white/[0.03] select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div>
                {/* Stars based on rating */}
                <div className="flex items-center gap-1 mb-6" aria-label={`${t.rating || 5} out of 5 stars`}>
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#F5B301] text-[#F5B301]"
                    />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="font-poppins text-xs sm:text-sm text-white/75 font-light leading-relaxed italic mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F5B301]/50"
                />
                <div>
                  <h3 className="font-montserrat text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    {t.name}
                  </h3>
                  <p className="font-poppins text-[11px] text-[#F5B301] font-medium mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
