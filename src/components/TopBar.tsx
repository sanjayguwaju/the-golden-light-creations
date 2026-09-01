"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Accessibility, Phone, Calendar, Sun, Moon } from "lucide-react";
import type { TopBar as TopBarType } from "@/payload-types";
import { useTranslations, useLocale } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Link } from "@/i18n/routing";
import { cn } from "@/utilities/ui";
import { useAccessibility } from "@/providers/Accessibility";
import { useTheme } from "@/providers/Theme";
import { formatNepaliCurrentDate } from "@/lib/bs-date";

const SitemapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
  >
    <rect x="9" y="3" width="6" height="6" />
    <rect x="3" y="15" width="6" height="6" />
    <rect x="15" y="15" width="6" height="6" />
    <path d="M12 9v6" />
    <path d="M6 15v-3h12v3" />
  </svg>
);

interface TopBarProps {
  data: any;
}

export function TopBar({ data }: TopBarProps) {
  const t = useTranslations("topbar");
  const locale = useLocale();
  const { fontSize, setFontSize } = useAccessibility();
  const { theme, setTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const now = new Date();
    if (locale === "ne") {
      setCurrentDate(formatNepaliCurrentDate(now));
    } else {
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [locale]);

  return (
    <div
      className={cn(
        "bg-background border-b border-border transition-all",
        fontSize === "large" ? "text-[13px]" : fontSize === "small" ? "text-[9px]" : "text-[11px]"
      )}
    >
      <div className="container mx-auto flex items-center justify-end md:justify-between min-h-8 md:min-h-10 px-2 md:px-4">
        {/* Left Section: Utility Links & Phones - Hidden on Mobile */}
        <div className="hidden md:flex flex-wrap items-center divide-x divide-border">
          {data.sitemapUrl && (
            <Link
              href={data.sitemapUrl}
              className="group flex items-center gap-1.5 px-3 py-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              <SitemapIcon />
              <span>{t("sitemap")}</span>
            </Link>
          )}

          {data.lowBandwidthUrl && (
            <Link
              href={data.lowBandwidthUrl}
              className="group flex items-center gap-1.5 px-3 py-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>{t("low-bandwidth")}</span>
            </Link>
          )}

          {data.screenReaderUrl && (
            <Link
              href={data.screenReaderUrl}
              className="group flex items-center gap-1.5 px-3 py-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              <Accessibility className="w-3.5 h-3.5" />
              <span>{t("screen-reader")}</span>
            </Link>
          )}

          {data.adminPhone && (
            <div className="flex items-center gap-1.5 px-3 py-2 text-[10px] md:text-[11px]">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-muted-foreground">{t("administration")}</span>
                <span className="font-bold text-primary">{data.adminPhone}</span>
              </div>
            </div>
          )}

          {data.emergencyPhone && (
            <div className="flex items-center gap-1.5 px-3 py-2 text-[10px] md:text-[11px]">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-muted-foreground">{t("emergency")}</span>
                <span className="font-bold text-primary">{data.emergencyPhone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Date, Font, Lang */}
        <div className="flex items-center divide-x divide-border">
          {data.showDate && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 text-primary font-bold whitespace-nowrap">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </div>
          )}

          {data.showFontSize && (
            <div className="flex items-center px-4 py-2 gap-4 text-primary">
              <button
                onClick={() => setFontSize("large")}
                className={cn(
                  "hover:opacity-70 font-bold transition-all text-sm",
                  fontSize === "large" && "underline decoration-2 underline-offset-4"
                )}
              >
                {locale === "ne" ? "अ+" : "A+"}
              </button>
              <button
                onClick={() => setFontSize("normal")}
                className={cn(
                  "hover:opacity-70 font-bold transition-all text-xs",
                  fontSize === "normal" && "underline decoration-2 underline-offset-4"
                )}
              >
                {locale === "ne" ? "अ" : "A"}
              </button>
              <button
                onClick={() => setFontSize("small")}
                className={cn(
                  "hover:opacity-70 font-bold transition-all text-[10px]",
                  fontSize === "small" && "underline decoration-2 underline-offset-4"
                )}
              >
                {locale === "ne" ? "अ-" : "A-"}
              </button>
            </div>
          )}

          {data.showLanguage && (
            <div className="flex items-center px-4">
              <LocaleSwitcher />
            </div>
          )}

          {/* Dark Mode Toggle */}
          <div className="flex items-center px-4 py-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
