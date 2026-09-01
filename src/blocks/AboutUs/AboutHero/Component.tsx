import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { AboutHeroBlock as AboutHeroBlockProps, Media } from "@/payload-types";
import AboutPageInteractive from "@/components/AboutPageInteractive";

export const AboutHeroBlock: React.FC<AboutHeroBlockProps> = ({
  eyebrow = "About Us",
  titleLineOne,
  titleLineTwo,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref = "/collections",
  secondaryCtaLabel,
  secondaryCtaHref = "#about",
  image,
  imageLabel,
  imageCaption,
}) => {
  const mediaObj = image && typeof image === "object" ? (image as Media) : null;
  const imageUrl = mediaObj?.url || "";
  const imageAlt = mediaObj?.alt || "Hero Image";
  const imageWidth = mediaObj?.width || 1200;
  const imageHeight = mediaObj?.height || 800;
  const primaryHref = primaryCtaHref || "/collections";
  const secondaryHref = secondaryCtaHref || "#about";

  return (
    <AboutPageInteractive>
      <section className="bg-gradient-to-br from-white via-reliance-navy/[0.03] to-reliance-gold/10 px-6 py-16 md:py-20 ">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="animate-fade-up transition-all duration-700 ease-out">
              <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-2">
                  <li>
                    <Link href="/" className="text-sm text-gray-500 hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </li>
                  <li className="text-sm font-medium text-reliance-navy">{eyebrow}</li>
                </ol>
              </nav>
              <h1 className="mb-6 text-4xl font-medium leading-tight text-reliance-navy sm:text-5xl md:text-6xl">
                <span className="text-pretty">{titleLineOne}</span>
                {titleLineTwo && (
                  <>
                    <br />
                    <span className="font-medium text-reliance-gold">{titleLineTwo}</span>
                  </>
                )}
              </h1>
              {subtitle && (
                <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-600">
                  {subtitle}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                {primaryCtaLabel && (
                  <Link
                    href={primaryHref}
                    className="rounded-none bg-reliance-navy px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-reliance-navy/90 hover:shadow-[0_12px_30px_-12px_rgba(18,39,67,0.4)]"
                  >
                    {primaryCtaLabel}
                  </Link>
                )}
                {secondaryCtaLabel && (
                  <Link
                    href={secondaryHref}
                    className="rounded-none border border-gray-300 px-8 py-3 text-sm font-medium text-reliance-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-sm"
                  >
                    {secondaryCtaLabel}
                  </Link>
                )}
              </div>
            </div>

            {imageUrl && (
              <div className="animate-fade-up animate-float overflow-hidden rounded-none bg-white p-0 shadow-md">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  {imageLabel && (
                    <div className="absolute left-8 top-8 rounded-none border border-reliance-navy/10 bg-white/70 px-4 py-2 text-sm font-medium text-reliance-navy backdrop-blur-sm">
                      {imageLabel}
                    </div>
                  )}
                  {imageCaption && (
                    <div className="absolute bottom-8 right-8 rounded-none border border-reliance-white/20 bg-reliance-navy/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                      {imageCaption}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </AboutPageInteractive>
  );
};
