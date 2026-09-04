"use client";

import { Check, Facebook, Link as LinkIcon, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";

const shareItems = [
  {
    key: "facebook",
    label: "Facebook",
    icon: Facebook,
    hoverClassName: "group-hover:text-[#1877F2]",
    onClick: (url: string) => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    },
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    hoverClassName: "group-hover:text-[#0A66C2]",
    onClick: (url: string) => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    },
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    hoverClassName: "group-hover:text-[#25D366]",
    onClick: (url: string) => {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, "_blank");
    },
  },
];

export function ActionButtons() {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm font-semibold text-white/80">Share this story</p>

      <div className="flex flex-wrap items-center gap-4 sm:gap-5">
        {shareItems.map(({ key, label, icon: Icon, hoverClassName, onClick }) => (
          <button
            key={key}
            onClick={() => onClick(url)}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5"
            aria-label={`Share on ${label}`}
          >
            <Icon className={`h-4 w-4 text-white/40 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 ${hoverClassName}`} />
            <span className={`transition-all duration-300 ${hoverClassName}`}>{label}</span>
          </button>
        ))}

        <button
          onClick={handleCopyLink}
          className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Copy article link"
        >
          {copied ? (
            <Check className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:text-[#F5B301]" />
          ) : (
            <LinkIcon className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:text-[#F5B301]" />
          )}
          <span className="transition-all duration-300 group-hover:text-[#F5B301]">{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
}
