import React from "react";
import Link from "next/link";
import type { AboutCTABlock as AboutCTAProps } from "@/payload-types";
import AboutPageInteractive from "@/components/AboutPageInteractive";

export const AboutCTABlock: React.FC<AboutCTAProps> = ({
  eyebrow = "Ready to explore",
  heading,
  description,
  primaryCtaLabel,
  primaryCtaHref = "/collections",
  secondaryCtaLabel,
  secondaryCtaHref = "/contact",
}) => {
  const primaryHref = primaryCtaHref || "/collections";
  const secondaryHref = secondaryCtaHref || "/contact";
  return (
    <AboutPageInteractive>
      <section className="border-y border-gray-200 bg-gradient-to-r from-reliance-gold/5 to-reliance-navy/5 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-reliance-gold">
            {eyebrow}
          </p>
          <h2 className="mb-6 text-3xl font-medium text-reliance-navy sm:text-4xl">{heading}</h2>
          {description && (
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-600">{description}</p>
          )}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {primaryCtaLabel && (
              <Link
                href={primaryHref}
                className="rounded-none bg-reliance-navy px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-reliance-navy/90 hover:shadow-[0_12px_30px_-12px_rgba(18,39,67,0.35)]"
              >
                {primaryCtaLabel}
              </Link>
            )}
            {secondaryCtaLabel && (
              <Link
                href={secondaryHref}
                className="rounded-none border border-gray-300 px-8 py-3 text-sm font-medium text-reliance-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </section>
    </AboutPageInteractive>
  );
};
