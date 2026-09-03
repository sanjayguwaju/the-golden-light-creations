"use client";

import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Maharjan",
    role: "Bride · Kathmandu",
    text: "The Golden Light Creations transformed our wedding into a cinematic masterpiece. Every frame was a painting. We still cry watching our wedding film — in the most beautiful way possible.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    name: "Bikash Shrestha",
    role: "Groom · Pokhara",
    text: "From the very first consultation, we knew we were in extraordinary hands. The team's eye for detail and emotional intelligence is unmatched. Our photos are beyond anything we imagined.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Suman KC",
    role: "Event Director · Lalitpur",
    text: "We hired them for our annual corporate gala and the results were stunning. Professional, punctual, and incredibly talented. The aftermovie they produced became our brand's most-viewed content.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
  {
    name: "Aarav Basnet",
    role: "Brand Manager · Kathmandu",
    text: "The commercial campaign they produced for us exceeded every expectation. The production quality rivals international studios — but with authentic Nepali heart. Truly world-class.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
  },
  {
    name: "Anisha Tamang",
    role: "Bride · Bhaktapur",
    text: "I wanted my wedding photos to look like they belonged in a luxury magazine. That is exactly what I got. Every single image is magazine-worthy. Absolute perfection.",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80",
  },
  {
    name: "Dipesh Gurung",
    role: "Music Artist · Kathmandu",
    text: "My music video was produced with Hollywood-level care and creativity. The team understood my artistic vision completely and elevated it beyond what I thought was possible.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
];

export function StudioTestimonials() {
  return (
    <section id="testimonials" className="bg-[#111111] py-24 sm:py-32 px-6 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-[1px] bg-[#F5B301]/60" />
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
              Client Love
            </span>
            <span className="w-10 h-[1px] bg-[#F5B301]/60" />
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-none">
            What Our <em className="text-[#F5B301] not-italic">Clients</em> Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative bg-white/[0.02] border border-white/[0.08] hover:border-[#F5B301]/30 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Background Quotation Accent */}
              <span
                className="absolute top-2 right-4 font-bebas text-8xl text-white/[0.03] select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-6" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
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
