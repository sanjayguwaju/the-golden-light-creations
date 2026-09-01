import React from "react";
import type { VideoEmbedBlock as VideoEmbedBlockProps } from "@/payload-types";

function getEmbedUrl(platform: string, videoId: string): string {
  switch (platform) {
    case "youtube":
      return `https://www.youtube.com/embed/${videoId}`;
    case "vimeo":
      return `https://player.vimeo.com/video/${videoId}`;
    case "custom":
      return videoId;
    default:
      return "";
  }
}

const aspectRatioClasses: Record<string, string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

export const VideoEmbedBlock: React.FC<VideoEmbedBlockProps> = ({
  platform = "youtube",
  videoId,
  caption,
  aspectRatio = "16:9",
}) => {
  if (!videoId) return null;

  const embedUrl = getEmbedUrl(platform, videoId);
  const aspectClass = aspectRatioClasses[aspectRatio ?? "16:9"] ?? "aspect-video";

  return (
    <div className="my-8 w-full">
      <div className={`${aspectClass} w-full overflow-hidden rounded-xl shadow-lg`}>
        <iframe
          src={embedUrl}
          title={caption ?? "Embedded video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      {caption && (
        <p className="mt-3 text-center text-sm text-gray-500 italic">{caption}</p>
      )}
    </div>
  );
};
