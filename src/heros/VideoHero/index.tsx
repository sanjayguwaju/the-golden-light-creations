"use client";

import React, { useEffect, useRef, useState } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/utilities/ui";

interface VideoHeroProps {
  links?: Page["hero"]["links"];
  richText?: Page["hero"]["richText"];
  videoUrl?: string | null;
  videoPoster?: (string | null) | { url?: string | null };
}

export const VideoHero: React.FC<VideoHeroProps> = ({ links, richText, videoUrl, videoPoster }) => {
  const { setHeaderTheme } = useHeaderTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Extract poster URL from Media object or string
  const posterUrl =
    typeof videoPoster === "object" && videoPoster !== null ? videoPoster.url : videoPoster;

  useEffect(() => {
    setHeaderTheme("dark");
  }, [setHeaderTheme]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl || undefined}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {richText && (
            <RichText
              className="prose prose-invert max-w-none [&_h1]:text-5xl md:[&_h1]:text-7xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-8 [&_p]:text-xl md:[&_p]:text-2xl [&_p]:text-white/90 [&_p]:mb-8"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300",
                    i === 0
                      ? "bg-white text-primary hover:bg-white/90 hover:scale-105"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Controls */}
      {videoUrl && (
        <div className="absolute bottom-8 right-8 z-20 flex gap-3">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};
