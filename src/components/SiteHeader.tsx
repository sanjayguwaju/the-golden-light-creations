"use client";

import React from "react";
import Link from "next/link";
import type { TopBar } from "@/payload-types";

interface SiteHeaderProps {
  data: TopBar;
}

export function SiteHeader({ data }: SiteHeaderProps) {
  if (!data?.announcement?.enabled || !data?.announcement?.text) {
    return null;
  }

  return (
    <div className="w-full bg-reliance-navy border-b border-white/10">
      <div className="container flex flex-wrap items-center justify-center gap-6 md:gap-10 py-4 px-4">
        {/* Right: Announcement + Contact Us */}
        <div className="flex items-center gap-4 md:gap-6">
          {data?.announcement?.enabled && (
            <div className="hidden md:flex items-center gap-2 bg-brand-accent/10 px-3 py-1.5 rounded-full border border-brand-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
              </span>
              {data.announcement.link ? (
                <Link
                  href={data.announcement.link}
                  className="text-xs md:text-sm text-reliance-offwhite font-medium hover:text-brand-accent transition-colors"
                >
                  {data.announcement.text}
                </Link>
              ) : (
                <span className="text-xs md:text-sm text-reliance-offwhite font-medium">
                  {data.announcement.text}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
