"use client";

import React, { useRef, useEffect } from "react";
import type { VideoHeroBlock as VideoHeroProps, Media } from "@/payload-types";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities/ui";

export const VideoHeroBlock: React.FC<VideoHeroProps> = ({
  title,
  subtitle,
  video,
  fallbackImage,
  overlayOpacity = 50,
  actions,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = video && typeof video === "object" && "url" in video;
  const hasFallback = fallbackImage && typeof fallbackImage === "object" && "url" in fallbackImage;

  // Calculate overlay opacity (0-1) from percentage (0-100)
  const overlayAlpha = Math.min(Math.max((overlayOpacity || 50) / 100, 0), 1);

  // Ensure video plays on mobile devices
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Video auto-play was prevented:", e);
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Fallback Image */}
      {hasFallback && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={(fallbackImage as Media).url!}
            alt={title || "Video hero background"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Background Video */}
      {hasVideo && (
        <div className="absolute inset-0 -z-10">
          <video
            ref={videoRef}
            src={(video as Media).url!}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={hasFallback ? (fallbackImage as Media).url! : undefined}
          />
        </div>
      )}

      {/* Overlay */}
      <div 
        className="absolute inset-0 -z-10 bg-black"
        style={{ opacity: overlayAlpha }}
      />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-sm font-light">
              {subtitle}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              {actions.map((action, index) => (
                <Link key={index} href={action.url || "/"}>
                  <Button 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    variant={action.variant as any} 
                    size="lg" 
                    className={cn(
                      "min-w-[200px] text-base font-semibold",
                      action.variant === "outline" ? "text-white border-white hover:bg-white/10" : ""
                    )}
                  >
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
};
