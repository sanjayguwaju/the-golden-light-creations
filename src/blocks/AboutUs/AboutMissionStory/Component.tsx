import React from "react";
import Image from "next/image";
import type { AboutMissionStoryBlock as AboutMissionStoryProps, Media } from "@/payload-types";
import RichText from "@/components/RichText";
import AboutPageInteractive from "@/components/AboutPageInteractive";

export const AboutMissionStoryBlock: React.FC<AboutMissionStoryProps> = ({
  image,
  imageLabel,
  eyebrow = "Mission Statement",
  heading,
  description,
  supportingText,
  story,
  stats,
}) => {
  const mediaObj = image && typeof image === "object" ? (image as Media) : null;
  const imageUrl = mediaObj?.url || "";
  const imageAlt = mediaObj?.alt || "Mission Image";
  const imageWidth = mediaObj?.width || 1200;
  const imageHeight = mediaObj?.height || 600;

  return (
    <AboutPageInteractive>
      <section id="about" className="bg-white px-6 py-20">
        {imageUrl && (
          <div className="mx-auto mb-16 max-w-6xl overflow-hidden rounded-none bg-white shadow-md">
            <div className="relative w-full overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              {imageLabel && (
                <div className="absolute bottom-8 left-8 rounded-none border border-reliance-white/20 bg-reliance-navy/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  {imageLabel}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-12 md:flex-row md:items-start">
            <div className="md:flex-1">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-reliance-gold">
                {eyebrow}
              </p>
              <h2 className="mb-6 text-3xl font-medium text-reliance-navy sm:text-4xl">
                {heading}
              </h2>
              {description && (
                <p className="mb-4 text-lg leading-8 text-gray-600">{description}</p>
              )}
              {supportingText && (
                <p className="mb-6 text-base leading-8 text-gray-600">{supportingText}</p>
              )}
              {story && (
                <div className="prose max-w-none text-gray-600 prose-p:leading-8">
                  <RichText data={story} enableGutter={false} />
                </div>
              )}
            </div>

            {stats && stats.length > 0 && (
              <div className="flex flex-col gap-4 md:w-72 md:shrink-0">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`card-interaction rounded-none p-6 transition-shadow ${
                      index % 2 === 1
                        ? "bg-reliance-gold/[0.07]"
                        : "bg-reliance-navy/[0.06]"
                    }`}
                  >
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-light text-reliance-navy">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </AboutPageInteractive>
  );
};
