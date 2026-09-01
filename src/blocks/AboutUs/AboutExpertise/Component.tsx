import React from "react";
import Image from "next/image";
import type { AboutExpertiseBlock as AboutExpertiseProps, Media } from "@/payload-types";
import AboutPageInteractive from "@/components/AboutPageInteractive";

export const AboutExpertiseBlock: React.FC<AboutExpertiseProps> = ({
  eyebrow = "Expertise",
  heading,
  description,
  bulletPoints,
  image,
}) => {
  const mediaObj = image && typeof image === "object" ? (image as Media) : null;
  const imageUrl = mediaObj?.url || "";
  const imageAlt = mediaObj?.alt || "Expertise Image";

  return (
    <AboutPageInteractive>
      <section id="expertise" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-reliance-gold">
                {eyebrow}
              </p>
              <h2 className="mb-6 text-4xl font-medium text-reliance-navy">{heading}</h2>
              {description && (
                <p className="mb-4 text-lg leading-relaxed text-gray-600">{description}</p>
              )}
              {bulletPoints && bulletPoints.length > 0 && (
                <ul className="space-y-3 text-reliance-navy list-none pl-0">
                  {bulletPoints.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-reliance-gold shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {imageUrl && (
              <div className="overflow-hidden rounded-none bg-white shadow-md">
                <div className="group relative w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={mediaObj?.width || 800}
                    height={mediaObj?.height || 600}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </AboutPageInteractive>
  );
};
