import React from "react";
import Image from "next/image";

export interface V5FounderBlockProps {
  eyebrow?: string;
  title?: string;
  quote?: string;
  message1?: string;
  message2?: string;
  founderName?: string;
  founderTagTitle?: string;
  founderSignRole?: string;
  portrait?: any;
  portraitUrl?: string;
}

export function V5FounderBlockComponent({
  eyebrow = "A Message From Our Founder",
  title = "Every frame we deliver carries a name and a promise behind it",
  quote = "We don't just shoot — we create emotions. That's not a tagline for us, it's the standard every shoot is held to.",
  message1 = "I started The Golden Light Creations in 2019 with one camera and a simple belief: that the most important moments in a person's life deserve to be told with honesty, patience, and craft. Since then, that belief has taken our team from intimate Kathmandu weddings to festival main stages across Nepal.",
  message2 = "Every project we take on — big or small — gets the same attention to light, timing, and emotion. That is the standard I hold our entire team to, and it's the reason clients trust us with their most meaningful days.",
  founderName = "Suresh Lama",
  founderTagTitle = "Founder & Creative Director",
  founderSignRole = "Founder, The Golden Light Creations",
  portrait,
  portraitUrl = "/v5/suresh-lama-founder-of-the-golden-light-creations.jpg",
}: V5FounderBlockProps) {
  const resolvedPortraitUrl =
    (typeof portrait === "object" && portrait?.url)
      ? portrait.url
      : portraitUrl || "/v5/suresh-lama-founder-of-the-golden-light-creations.jpg";

  return (
    <section
      id="founder"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-14 bg-white text-[#1A1414] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Portrait & Badge */}
        <div className="lg:col-span-5 relative mb-8 lg:mb-0">
          <div
            className="hidden sm:block absolute inset-y-[20px] -right-[20px] left-[20px] -bottom-[20px] bg-[#1A1414] rounded-lg z-0 pointer-events-none"
            aria-hidden="true"
          />
          <figure className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] z-10 bg-[#1A1414] grayscale">
            {resolvedPortraitUrl && (
              <Image
                src={resolvedPortraitUrl}
                alt={founderName}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            )}
          </figure>

          {/* Floating Tag */}
          <div className="absolute left-6 -bottom-5 z-20 bg-[#A31621] text-white py-3 px-5 rounded-md shadow-[0_14px_30px_rgba(163,22,33,0.22)]">
            <strong
              className="block text-[16px] font-normal leading-snug"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {founderName}
            </strong>
            <span className="text-[11.5px] opacity-85 block">
              {founderTagTitle}
            </span>
          </div>
        </div>

        {/* Right Column: Founder Narrative */}
        <div className="lg:col-span-7">
          <p className="text-[12.5px] text-[#A31621] font-bold tracking-[0.03em] uppercase mb-3.5">
            {eyebrow}
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.15] text-[#1A1414] max-w-xl"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {title}
          </h2>

          {quote && (
            <p
              className="text-xl sm:text-2xl italic font-normal text-[#1A1414] leading-[1.55] my-6"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              <span className="text-[#A31621]">“</span>
              {quote}
              <span className="text-[#A31621]">”</span>
            </p>
          )}

          {message1 && (
            <p className="text-[15px] text-[#7A716C] leading-[1.75] mb-3.5">
              {message1}
            </p>
          )}

          {message2 && (
            <p className="text-[15px] text-[#7A716C] leading-[1.75] mb-7">
              {message2}
            </p>
          )}

          <div
            className="text-[17px] font-normal text-[#1A1414]"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {founderName}
            <span className="block font-sans text-[12.5px] text-[#7A716C] font-normal mt-0.5">
              {founderSignRole}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
