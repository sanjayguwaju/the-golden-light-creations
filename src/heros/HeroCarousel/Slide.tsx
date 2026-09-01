import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { Media as MediaType } from "@/payload-types";
import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";
import { CarouselItem } from "@/components/ui/carousel";
import { CMSLink } from "@/components/Link";

interface SlideProps {
  slide: {
    image: string | MediaType;
    title?: string | null;
    description?: string | null;
    links?: { link: Parameters<typeof CMSLink>[0] }[] | null;
  };
  index: number;
  selectedIndex: number;
}

export const Slide: React.FC<SlideProps> = ({ slide, index, selectedIndex }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isActive = selectedIndex === index;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isActive) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power3.out" },
      );
    } else {
      gsap.to(el, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
    }
  }, [isActive]);

  return (
    <CarouselItem className="pl-0 relative">
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        {slide.image && typeof slide.image === "object" && (
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-1000 ease-out",
              isActive ? "scale-105" : "scale-100",
            )}
          >
            <Media
              fill
              imgClassName="object-cover"
              priority={index === 0}
              resource={slide.image}
            />
          </div>
        )}

        {/* Contrast Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content Area */}
        <div className="relative z-20 flex flex-col justify-center h-full container">
          {(slide.title || slide.description || (slide.links && slide.links.length > 0)) && (
            <div ref={contentRef} className="max-w-4xl" style={{ opacity: isActive ? 1 : 0 }}>
              {slide.title && (
                <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg mb-4">
                  {slide.title}
                </h2>
              )}
              {slide.description && (
                <p className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-md max-w-2xl mb-6">
                  {slide.description}
                </p>
              )}
              {slide.links && slide.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {slide.links.map(({ link }, i) => (
                    <CMSLink key={i} {...link} size="lg" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CarouselItem>
  );
};
