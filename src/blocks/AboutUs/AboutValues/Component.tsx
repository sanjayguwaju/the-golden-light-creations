import React from "react";
import Image from "next/image";
import type { AboutValuesBlock as AboutValuesProps, Media } from "@/payload-types";
import AboutPageInteractive from "@/components/AboutPageInteractive";

export const AboutValuesBlock: React.FC<AboutValuesProps> = ({
  eyebrow = "Core Values",
  heading,
  description,
  items,
}) => {
  return (
    <AboutPageInteractive>
      <section className="bg-gradient-to-br from-background to-secondary/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-reliance-gold">
              {eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-medium text-reliance-navy sm:text-4xl">{heading}</h2>
            {description && <p className="text-lg leading-8 text-gray-600">{description}</p>}
          </div>

          {items && items.length > 0 && (
            <div
              className={`mx-auto grid gap-8 ${
                items.length === 1
                  ? "max-w-sm grid-cols-1"
                  : items.length === 2
                    ? "max-w-2xl grid-cols-1 md:grid-cols-2"
                    : items.length === 3
                      ? "max-w-4xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
              }`}
            >
              {items.map((value, idx) => {
                // Determine image URL
                let cardImgUrl = `/images/about/value-${value.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "-")}.jpg`;

                if (value.image && typeof value.image === "object") {
                  cardImgUrl = (value.image as Media).url || cardImgUrl;
                }

                return (
                  <div key={idx} className="text-center group">
                    <div className="relative mb-6 h-48 w-full overflow-hidden rounded-none bg-white shadow-md">
                      <Image
                        src={cardImgUrl}
                        alt={value.title}
                        fill
                        className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>

                    <h3 className="mb-2 text-xl font-semibold text-reliance-navy">{value.title}</h3>
                    <p className="mx-auto max-w-xs text-sm leading-7 text-gray-600">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </AboutPageInteractive>
  );
};
