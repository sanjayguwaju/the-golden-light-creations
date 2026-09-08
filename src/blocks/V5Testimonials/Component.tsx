import React from "react";
import Image from "next/image";
import { V5TiltCard } from "@/components/v5/V5TiltCard";

export interface V5TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar?: any;
  avatarUrl?: string;
}

export interface V5TestimonialsBlockProps {
  eyebrow?: string;
  title?: string;
  testimonials?: V5TestimonialItem[];
}

const defaultTestimonialsList: V5TestimonialItem[] = [
  {
    quote:
      "The Golden Light Creations transformed our wedding into a cinematic masterpiece. Every frame felt like a painting.",
    name: "Priya Maharjan",
    role: "Bride · Kathmandu",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
  },
  {
    quote:
      "Professional, punctual, and incredibly talented. The aftermovie became our brand's most-viewed content.",
    name: "Suman KC",
    role: "Event Director · Lalitpur",
    avatarUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
  },
  {
    quote:
      "I wanted my wedding photos to look like they belonged in a luxury magazine. That's exactly what I got.",
    name: "Anisha Tamang",
    role: "Bride · Bhaktapur",
    avatarUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
  },
];

export function V5TestimonialsBlockComponent({
  eyebrow = "Client Love",
  title = "What our clients say",
  testimonials = defaultTestimonialsList,
}: V5TestimonialsBlockProps) {
  const items =
    testimonials && testimonials.length > 0
      ? testimonials
      : defaultTestimonialsList;

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-14 bg-[#FAF7F4] text-[#1A1414] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Head */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[12.5px] text-[#A31621] font-bold tracking-[0.03em] uppercase mb-3.5">
            {eyebrow}
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.15] text-[#1A1414]"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {title}
          </h2>
        </div>

        {/* Testimonials Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, idx) => {
            const avatarSrc =
              (typeof t.avatar === "object" && t.avatar?.url)
                ? t.avatar.url
                : t.avatarUrl || defaultTestimonialsList[idx % defaultTestimonialsList.length].avatarUrl;

            return (
              <V5TiltCard
                key={idx}
                className="relative bg-white p-9 sm:p-10 rounded-lg shadow-[0_4px_10px_rgba(26,20,20,0.06),0_12px_28px_rgba(26,20,20,0.08)] hover:shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Decorative Quotation Mark Watermark */}
                <span
                  className="absolute top-2.5 right-5 text-[64px] leading-none text-[#F6E3E4] select-none pointer-events-none z-0"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  “
                </span>

                <p className="relative z-10 text-[14.5px] leading-[1.7] text-[#1A1414] mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="relative z-10 flex items-center gap-3 pt-2">
                  {avatarSrc && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-[0_1px_2px_rgba(26,20,20,0.04),0_2px_6px_rgba(26,20,20,0.04)] shrink-0">
                      <Image
                        src={avatarSrc}
                        alt={t.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-[13.5px] font-semibold text-[#1A1414]">
                      {t.name}
                    </div>
                    <div className="text-[12px] text-[#7A716C]">{t.role}</div>
                  </div>
                </div>
              </V5TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
