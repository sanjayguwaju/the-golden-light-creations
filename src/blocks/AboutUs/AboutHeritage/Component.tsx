import React from "react";
import Image from "next/image";
import type { AboutHeritageBlock as AboutHeritageProps, Media } from "@/payload-types";
import AboutPageInteractive from "@/components/AboutPageInteractive";

export const AboutHeritageBlock: React.FC<AboutHeritageProps> = ({
  eyebrow = "Our Heritage",
  heading,
  description,
  image,
  imageLabel,
  milestones,
}) => {
  const mediaObj = image && typeof image === "object" ? (image as Media) : null;
  const imageUrl = mediaObj?.url || "";
  const imageAlt = mediaObj?.alt || "Heritage Image";
  const imageWidth = mediaObj?.width || 1200;
  const imageHeight = mediaObj?.height || 600;

  return (
    <AboutPageInteractive>
      <section id="heritage" className="bg-gradient-to-br from-white to-reliance-navy/[0.03] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-reliance-gold">
              {eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-medium text-reliance-navy sm:text-4xl">
              {heading}
            </h2>
            {description && (
              <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">{description}</p>
            )}
          </div>

          {imageUrl && (
            <div className="mb-16 max-w-6xl mx-auto overflow-hidden rounded-none bg-white shadow-md">
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

          {milestones && milestones.length > 0 && (
            <div
              className={`mx-auto grid gap-6 ${
                milestones.length === 1
                  ? "max-w-sm grid-cols-1"
                  : milestones.length === 2
                    ? "max-w-2xl grid-cols-1 sm:grid-cols-2"
                    : milestones.length === 3
                      ? "max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="group card-interaction rounded-none bg-white p-6 shadow-sm hover:shadow-md border border-gray-200"
                  style={{ animationDelay: `${idx * 90}ms` }}
                >
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-reliance-gold transition-colors group-hover:text-reliance-navy">
                    {milestone.year}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-reliance-navy">
                    {milestone.title}
                  </h3>
                  <p className="text-sm leading-7 text-gray-600">{milestone.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </AboutPageInteractive>
  );
};
