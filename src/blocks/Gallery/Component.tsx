import React from "react";
import { GalleryClient } from "./GalleryClient";
import type { GalleryBlock as GalleryBlockProps } from "@/payload-types";

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  heading,
  caption,
  columns = "4",
  images,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <section className="w-full bg-background py-16">
      <div className="container px-0">
        {/* Heading */}
        {(heading || caption) && (
          <div className="mb-10 space-y-4">
            {heading && (
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-accent rounded-full shadow-[2px_0_10px_rgba(239,68,68,0.4)]" />
                <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                  {heading}
                </h2>
              </div>
            )}
            {caption && (
              <p className="pl-[22px] text-base md:text-lg text-muted-foreground max-w-2xl italic font-medium leading-relaxed">
                {caption}
              </p>
            )}
          </div>
        )}

        {/* Dynamic Gallery Client */}
        <div className="w-full">
          <GalleryClient images={images} columns={columns} />
        </div>
      </div>
    </section>
  );
};
