"use client";

import React, { useState } from "react";
import { Share2, Link as LinkIcon, Check, Linkedin, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShareJobButtonsProps {
  title: string;
  url?: string;
}

export const ShareJobButtons: React.FC<ShareJobButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return url || window.location.href;
    }
    return url || "";
  };

  const copyToClipboard = async () => {
    const currentUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("Job link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const shareOnLinkedIn = () => {
    const currentUrl = encodeURIComponent(getShareUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnWhatsApp = () => {
    const currentUrl = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Check out this job opening at Reliance Paints: ${title} - `);
    window.open(
      `https://api.whatsapp.com/send?text=${text}${currentUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareViaEmail = () => {
    const currentUrl = getShareUrl();
    const subject = encodeURIComponent(`Job Opening: ${title} at Reliance Paints`);
    const body = encodeURIComponent(
      `Hi,\n\nI thought you might be interested in this job opening at Reliance Paints:\n\n${title}\n${currentUrl}\n`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-reliance-navy/10 mt-6">
      <span className="text-xs font-bold uppercase tracking-wider text-reliance-navy dark:text-slate-300 flex items-center mr-2">
        <Share2 className="w-4 h-4 mr-1 text-reliance-gold" /> Share Position:
      </span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="rounded-none border-reliance-navy/20 hover:border-reliance-gold text-xs uppercase font-semibold h-9 px-3"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 mr-1 text-green-600" /> Copied
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5 mr-1" /> Copy Link
          </>
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={shareOnLinkedIn}
        className="rounded-none border-reliance-navy/20 hover:border-reliance-gold text-xs uppercase font-semibold h-9 px-3"
      >
        <Linkedin className="w-3.5 h-3.5 mr-1 text-blue-600" /> LinkedIn
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={shareOnWhatsApp}
        className="rounded-none border-reliance-navy/20 hover:border-reliance-gold text-xs uppercase font-semibold h-9 px-3"
      >
        <Send className="w-3.5 h-3.5 mr-1 text-green-600" /> WhatsApp
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={shareViaEmail}
        className="rounded-none border-reliance-navy/20 hover:border-reliance-gold text-xs uppercase font-semibold h-9 px-3"
      >
        Email
      </Button>
    </div>
  );
};
