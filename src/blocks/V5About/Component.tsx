import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface V5AboutBlockProps {
  eyebrow?: string;
  title?: string;
  quote?: string;
  paragraph?: string;
  image?: any;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function V5AboutBlockComponent({
  eyebrow = "Our Story",
  title = "Crafting timeless visual stories across Nepal since 2019",
  quote = "Every love story is rare, intimate, and sacred. We document feelings, not just poses.",
  paragraph = "From royal palace weddings in Kathmandu Valley to high-altitude cinematic pre-wedding shoots in the Himalayas, our team blends international film-grade cameras with heartfelt cultural storytelling.",
  image,
  imageUrl = "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=85",
  buttonText = "Read Our Full Story",
  buttonLink = "/about",
}: V5AboutBlockProps) {
  const resolvedImageUrl =
    (typeof image === "object" && image?.url) ? image.url : imageUrl || "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=85";

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-14 bg-white text-[#1A1414] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left: Layered Offset Photo Frame */}
        <div className="lg:col-span-5 relative">
          <div
            className="hidden sm:block absolute inset-y-[22px] -right-[22px] left-[22px] -bottom-[22px] bg-[#A31621] rounded-lg z-0 pointer-events-none"
            aria-hidden="true"
          />
          <figure className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] z-10 bg-[#1A1414]">
            {resolvedImageUrl && (
              <Image
                src={resolvedImageUrl}
                alt="The Golden Light Creations studio team"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            )}
          </figure>
        </div>

        {/* Right: Editorial Narrative Content */}
        <div className="lg:col-span-7">
          <p className="text-[12.5px] text-[#A31621] font-bold tracking-[0.03em] uppercase mb-3.5">
            {eyebrow}
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.15] text-[#1A1414]"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {title}
          </h2>

          {quote && (
            <blockquote
              className="my-7 pl-5 border-l-2 border-[#A31621] text-[21px] italic font-normal text-[#1A1414] leading-[1.5]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {quote}
            </blockquote>
          )}

          {paragraph && (
            <p className="text-[15px] text-[#7A716C] leading-[1.75] mb-8">
              {paragraph}
            </p>
          )}

          {buttonText && (
            <Link
              href={buttonLink || "/about"}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A1414] bg-white border border-[#1A1414] px-7 py-3.5 rounded-[2px] transition-all duration-200 hover:border-[#A31621] hover:text-[#A31621] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(26,20,20,0.06),0_12px_28px_rgba(26,20,20,0.08)]"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
