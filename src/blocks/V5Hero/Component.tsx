import React from "react";

export interface V5HeroBlockProps {
  video?: any;
  videoUrl?: string;
  poster?: any;
  posterUrl?: string;
  mobileVideo?: any;
  mobileVideoUrl?: string;
  showScrollCue?: boolean;
  showAccentStrip?: boolean;
}

export function V5HeroBlockComponent({
  video,
  videoUrl = "/v5/hero-video.mp4",
  poster,
  posterUrl = "/hero-poster.jpg",
  mobileVideo,
  mobileVideoUrl,
  showScrollCue = true,
  showAccentStrip = true,
}: V5HeroBlockProps) {
  const resolvedVideoUrl =
    (typeof video === "object" && video?.url) ? video.url : videoUrl || "/v5/hero-video.mp4";

  const resolvedPosterUrl =
    (typeof poster === "object" && poster?.url) ? poster.url : posterUrl || "/hero-poster.jpg";

  const resolvedMobileVideoUrl =
    (typeof mobileVideo === "object" && mobileVideo?.url) ? mobileVideo.url : mobileVideoUrl;

  return (
    <div className="relative w-full overflow-hidden bg-[#1A1414]">
      {/* Main Hero Container */}
      <section className="relative w-full h-[88vh] overflow-hidden bg-[#1A1414]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={resolvedPosterUrl}
          className="absolute inset-0 w-full h-full object-cover"
        >
          {resolvedMobileVideoUrl && (
            <source
              src={resolvedMobileVideoUrl}
              type="video/mp4"
              media="(max-width: 768px)"
            />
          )}
          <source src={resolvedVideoUrl} type="video/mp4" />
        </video>

        {/* Ambient bottom fade into white/wash */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Scroll Cue */}
        {showScrollCue && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] w-[26px] h-[42px] rounded-[14px] border-[1.5px] border-white/85 flex justify-center pt-2 pointer-events-none shadow-sm"
            aria-hidden="true"
          >
            <span className="w-1 h-2 rounded-[2px] bg-white animate-bounce opacity-80" />
          </div>
        )}
      </section>

      {/* Bottom Accent Strip */}
      {showAccentStrip && (
        <div
          className="w-full h-1"
          style={{
            background:
              "linear-gradient(90deg, #6E0F17, #A31621 50%, #6E0F17)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
