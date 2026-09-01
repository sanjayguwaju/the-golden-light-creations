"use client";

import React from "react";
import type { QuickLinksBlock as QuickLinksProps } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, ExternalLink } from "lucide-react";

const columnClasses: Record<string, string> = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  "5": "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
};

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "hover:border-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "hover:border-secondary" },
  success: { bg: "bg-success/10", text: "text-success", border: "hover:border-success" },
  warning: { bg: "bg-warning/10", text: "text-warning", border: "hover:border-warning" },
  info: { bg: "bg-info/10", text: "text-info", border: "hover:border-info" },
};

const backgroundClasses: Record<string, string> = {
  white: "bg-background",
  muted: "bg-muted",
  primaryLight: "bg-primary/5",
  dark: "bg-slate-900 text-white",
};

export const QuickLinksBlock: React.FC<QuickLinksProps> = ({
  title,
  subtitle,
  links,
  layout = "grid",
  columns = "4",
  backgroundStyle = "muted",
  showIcons = true,
}) => {
  if (!links?.length) return null;

  const isDark = backgroundStyle === "dark";

  return (
    <section
      className={cn("py-16 md:py-20", backgroundStyle && backgroundClasses[backgroundStyle])}
    >
      <div className="container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold mb-4",
                  isDark ? "text-white" : "text-foreground"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-lg max-w-2xl mx-auto",
                  isDark ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid Layout */}
        {layout === "grid" && (
          <div className={cn("grid gap-4", columns && columnClasses[columns])}>
            {links.map((linkItem, index) => {
              const hasIcon = showIcons && linkItem.icon && typeof linkItem.icon === "object";
              const colors = colorClasses[linkItem.color || "primary"];

              return (
                <Link
                  key={index}
                  href={linkItem.link?.url || "#"}
                  target={linkItem.link?.openInNewTab ? "_blank" : undefined}
                  rel={linkItem.link?.openInNewTab ? "noopener noreferrer" : undefined}
                >
                  <Card
                    className={cn(
                      "group h-full border-border transition-all duration-300 hover:shadow-md",
                      colors.border,
                      isDark && "bg-white/10 border-white/20 hover:bg-white/20"
                    )}
                  >
                    <CardContent className="p-6 flex items-start gap-4">
                      {hasIcon &&
                        typeof linkItem.icon === "object" &&
                        linkItem.icon !== null &&
                        "url" in linkItem.icon &&
                        linkItem.icon.url && (
                          <div
                            className={cn(
                              "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                              colors.bg
                            )}
                          >
                            <Image
                              src={linkItem.icon.url}
                              alt=""
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                        )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3
                            className={cn(
                              "font-semibold",
                              isDark ? "text-white" : "text-foreground"
                            )}
                          >
                            {linkItem.title}
                          </h3>
                          {linkItem.link?.openInNewTab && (
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        {linkItem.description && (
                          <p
                            className={cn(
                              "text-sm mt-1",
                              isDark ? "text-white/70" : "text-muted-foreground"
                            )}
                          >
                            {linkItem.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight
                        className={cn(
                          "w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1",
                          colors.text
                        )}
                      />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* Horizontal Scroll Layout */}
        {layout === "horizontal" && (
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {links.map((linkItem, index) => {
              const hasIcon = showIcons && linkItem.icon && typeof linkItem.icon === "object";
              const colors = colorClasses[linkItem.color || "primary"];

              return (
                <Link
                  key={index}
                  href={linkItem.link?.url || "#"}
                  target={linkItem.link?.openInNewTab ? "_blank" : undefined}
                  rel={linkItem.link?.openInNewTab ? "noopener noreferrer" : undefined}
                  className="flex-shrink-0 w-64"
                >
                  <Card
                    className={cn(
                      "group h-full border-border transition-all duration-300 hover:shadow-md",
                      colors.border,
                      isDark && "bg-white/10 border-white/20 hover:bg-white/20"
                    )}
                  >
                    <CardContent className="p-6">
                      {hasIcon &&
                        typeof linkItem.icon === "object" &&
                        linkItem.icon !== null &&
                        "url" in linkItem.icon &&
                        linkItem.icon.url && (
                          <div
                            className={cn(
                              "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                              colors.bg
                            )}
                          >
                            <Image
                              src={linkItem.icon.url}
                              alt=""
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                        )}
                      <h3
                        className={cn(
                          "font-semibold mb-2",
                          isDark ? "text-white" : "text-foreground"
                        )}
                      >
                        {linkItem.title}
                      </h3>
                      {linkItem.description && (
                        <p
                          className={cn(
                            "text-sm",
                            isDark ? "text-white/70" : "text-muted-foreground"
                          )}
                        >
                          {linkItem.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* List Layout */}
        {layout === "list" && (
          <div className="max-w-2xl mx-auto space-y-3">
            {links.map((linkItem, index) => {
              const hasIcon = showIcons && linkItem.icon && typeof linkItem.icon === "object";
              const colors = colorClasses[linkItem.color || "primary"];

              return (
                <Link
                  key={index}
                  href={linkItem.link?.url || "#"}
                  target={linkItem.link?.openInNewTab ? "_blank" : undefined}
                  rel={linkItem.link?.openInNewTab ? "noopener noreferrer" : undefined}
                >
                  <Card
                    className={cn(
                      "group border-border transition-all duration-300 hover:shadow-md",
                      colors.border,
                      isDark && "bg-white/10 border-white/20 hover:bg-white/20"
                    )}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      {hasIcon &&
                        typeof linkItem.icon === "object" &&
                        linkItem.icon !== null &&
                        "url" in linkItem.icon &&
                        linkItem.icon.url && (
                          <div
                            className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                              colors.bg
                            )}
                          >
                            <Image
                              src={linkItem.icon.url}
                              alt=""
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                        )}
                      <div className="flex-1">
                        <h3
                          className={cn("font-semibold", isDark ? "text-white" : "text-foreground")}
                        >
                          {linkItem.title}
                        </h3>
                        {linkItem.description && (
                          <p
                            className={cn(
                              "text-sm",
                              isDark ? "text-white/70" : "text-muted-foreground"
                            )}
                          >
                            {linkItem.description}
                          </p>
                        )}
                      </div>
                      {linkItem.link?.openInNewTab ? (
                        <ExternalLink className={cn("w-5 h-5", colors.text)} />
                      ) : (
                        <ArrowRight
                          className={cn(
                            "w-5 h-5 transition-transform group-hover:translate-x-1",
                            colors.text
                          )}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
