"use client";

import React from "react";
import type { PartnersBlock as PartnersBlockProps } from "@/payload-types";
import { Card } from "@/components/ui/card";
import { cn } from "@/utilities/ui";
import Image from "next/image";

const tierOrder = ["platinum", "gold", "silver", "bronze", "strategic", "community", "media"];

const tierLabels: Record<string, string> = {
  platinum: "Platinum Sponsors",
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
  bronze: "Bronze Sponsors",
  strategic: "Strategic Partners",
  community: "Community Partners",
  media: "Media Partners",
};

const tierColors: Record<string, string> = {
  platinum: "from-slate-300 to-slate-100",
  gold: "from-amber-300 to-amber-100",
  silver: "from-gray-300 to-gray-100",
  bronze: "from-orange-400 to-orange-200",
  strategic: "from-blue-300 to-blue-100",
  community: "from-green-300 to-green-100",
  media: "from-purple-300 to-purple-100",
};

const columnClasses: Record<string, string> = {
  "3": "grid-cols-2 md:grid-cols-3",
  "4": "grid-cols-2 md:grid-cols-4",
  "5": "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  "6": "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

const heightClasses: Record<string, string> = {
  small: "h-[60px]",
  medium: "h-[80px]",
  large: "h-[120px]",
};

export const PartnersBlock: React.FC<PartnersBlockProps> = ({
  title,
  subtitle,
  partners,
  layout = "grid",
  columns = "4",
  logoHeight = "medium",
  showPartnerNames,
}) => {
  const showNames = showPartnerNames ?? false;
  if (!partners?.length) return null;

  const heightClass = heightClasses[logoHeight ?? "medium"];

  if (layout === "tiered") {
    const partnersByTier: Record<string, typeof partners> = {};
    partners.forEach((partner) => {
      const tier = partner.type || "community";
      if (!partnersByTier[tier]) partnersByTier[tier] = [];
      partnersByTier[tier].push(partner);
    });

    return (
      <section className="py-16 md:py-24">
        <div className="container">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
              )}
              {subtitle && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          )}

          <div className="space-y-16">
            {tierOrder.map((tier) => {
              const tierPartners = partnersByTier[tier];
              if (!tierPartners?.length) return null;

              return (
                <div key={tier}>
                  <h3 className="text-center text-lg font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                    {tierLabels[tier]}
                  </h3>
                  <div
                    className={cn(
                      "grid gap-6 items-center",
                      tier === "platinum" || tier === "gold"
                        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        : columnClasses[columns ?? "4"]
                    )}
                  >
                    {tierPartners.map((partner, index) => (
                      <PartnerCard
                        key={index}
                        partner={partner}
                        heightClass={heightClass}
                        showName={showNames}
                        tier={tier}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {layout === "grid" && (
          <div className={cn("grid gap-8 items-center", columnClasses[columns ?? "4"])}>
            {partners.map((partner, index) => (
              <PartnerCard
                key={index}
                partner={partner}
                heightClass={heightClass}
                showName={showNames}
              />
            ))}
          </div>
        )}

        {layout === "marquee" && (
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-8 hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  {partner.logo && typeof partner.logo === "object" && partner.logo.url && (
                    <div className={cn("relative w-32", heightClass)}>
                      <Image
                        src={partner.logo.url}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

function PartnerCard({
  partner,
  heightClass,
  showName,
  tier,
}: {
  partner: {
    name: string;
    logo: unknown;
    website?: string | null;
    description?: string | null;
    type?: string | null;
  };
  heightClass: string;
  showName: boolean;
  tier?: string;
}) {
  const Wrapper = partner.website ? "a" : "div";
  const wrapperProps = partner.website
    ? { href: partner.website, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group flex flex-col items-center p-6 rounded-xl transition-all duration-300",
        partner.website && "hover:shadow-lg cursor-pointer"
      )}
    >
      <Card
        className={cn(
          "relative w-full p-6 flex items-center justify-center bg-white border-2",
          tier && `bg-gradient-to-br ${tierColors[tier]} border-transparent`,
          "group-hover:scale-105 transition-transform duration-300"
        )}
      >
        {partner.logo &&
        typeof partner.logo === "object" &&
        (partner.logo as { url?: string }).url ? (
          <div className={cn("relative w-full", heightClass)}>
            <Image
              src={(partner.logo as { url?: string }).url!}
              alt={partner.name}
              fill
              className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ) : null}
      </Card>

      {showName && (
        <div className="mt-4 text-center">
          <h4 className="font-medium text-foreground">{partner.name}</h4>
          {partner.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{partner.description}</p>
          )}
        </div>
      )}
    </Wrapper>
  );
}
