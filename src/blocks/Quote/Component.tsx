import React from "react";
import Image from "next/image";
import type { QuoteBlock as QuoteBlockProps } from "@/payload-types";
import type { Media } from "@/payload-types";

const styleClasses: Record<string, string> = {
  default: "bg-primary/10 border-l-4 border-primary text-primary",
  highlight: "bg-gradient-to-br from-primary to-primary/80 text-white border-none shadow-lg",
  minimal: "bg-transparent border-l-2 border-border text-muted-foreground",
};

export const QuoteBlock: React.FC<QuoteBlockProps> = ({
  quoteText,
  attribution,
  attributionTitle,
  image,
  style = "default",
}) => {
  if (!quoteText) return null;

  const containerClass = styleClasses[style ?? "default"] ?? styleClasses.default;
  const isHighlight = style === "highlight";

  return (
    <blockquote className={`my-8 rounded-2xl px-8 py-6 ${containerClass}`}>
      <p
        className={`text-lg md:text-xl font-medium leading-relaxed before:content-['"'] after:content-['"'] ${
          isHighlight ? "text-white" : ""
        }`}
      >
        {quoteText}
      </p>

      {(attribution || attributionTitle || image) && (
        <footer className="mt-5 flex items-center gap-4">
          {image && typeof image === "object" && (image as Media).url && (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image
                src={(image as Media).url!}
                alt={(image as Media).alt ?? attribution ?? ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            {attribution && (
              <cite
                className={`not-italic font-semibold block ${
                  isHighlight ? "text-white" : "text-foreground"
                }`}
              >
                {attribution}
              </cite>
            )}
            {attributionTitle && (
              <span
                className={`text-sm ${
                  isHighlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {attributionTitle}
              </span>
            )}
          </div>
        </footer>
      )}
    </blockquote>
  );
};
