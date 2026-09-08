import React from "react";
import Link from "next/link";

export interface V5CtaBandBlockProps {
  eyebrow?: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function V5CtaBandBlockComponent({
  eyebrow = "2026 Commissions Open",
  title = "Let's capture your next visual masterpiece",
  buttonText = "Book Your Shoot",
  buttonLink = "#contact",
}: V5CtaBandBlockProps) {
  return (
    <section
      className="relative w-full py-24 sm:py-28 px-6 sm:px-14 text-center overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(120% 160% at 50% 0%, #241515 0%, #1A1414 55%, #100a0a 100%)",
      }}
    >
      {/* Centered Glowing Ambient Orb */}
      <div
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none opacity-40 z-0 bg-[#A31621]"
        aria-hidden="true"
      />

      <div className="max-w-[800px] mx-auto relative z-10">
        <p className="text-[12.5px] text-[#E7A7AC] font-bold tracking-[0.03em] uppercase mb-4">
          {eyebrow}
        </p>

        <h2
          className="text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.15] text-white max-w-lg mx-auto mb-9"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          {title}
        </h2>

        {buttonText && (
          <Link
            href={buttonLink || "#contact"}
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-white bg-[#A31621] px-8 py-4 rounded-[2px] shadow-[0_14px_30px_rgba(163,22,33,0.35),0_4px_10px_rgba(163,22,33,0.2)] transition-all duration-200 hover:bg-[#6E0F17] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(163,22,33,0.4)]"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
