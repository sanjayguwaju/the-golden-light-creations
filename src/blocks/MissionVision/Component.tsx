import React from "react";
import type { MissionVisionBlock as MissionVisionBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { Target, Eye, Heart, Lightbulb } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";

const defaultIcons = [Target, Eye, Heart, Lightbulb];

const colorClasses: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary text-secondary-foreground border-secondary",
  accent: "bg-accent/10 text-accent border-accent/20",
  muted: "bg-muted text-muted-foreground border-muted",
};

export const MissionVisionBlock: React.FC<MissionVisionBlockProps> = ({
  sectionTitle,
  layout = "cards",
  pillars,
  backgroundImage,
  showDivider = true,
}) => {
  if (!pillars?.length) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {backgroundImage && typeof backgroundImage === "object" && backgroundImage.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.url}
            alt=""
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      )}

      <div className="container relative z-10">
        {sectionTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {sectionTitle}
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full" />
          </div>
        )}

        {layout === "cards" && (
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6",
            pillars.length >= 3 ? "lg:grid-cols-3" : "max-w-5xl mx-auto"
          )}>
            {pillars.map((pillar, index) => {
              const IconComponent = defaultIcons[index % defaultIcons.length];
              const colorClass = colorClasses[pillar.color ?? "primary"];

              return (
                <div
                  key={index}
                  className={cn(
                    "group relative p-8 rounded-2xl border-2 transition-all duration-300",
                    "hover:shadow-xl hover:-translate-y-1",
                    colorClass
                  )}
                >
                  <div className="flex flex-col items-center text-center">
                    {pillar.icon && typeof pillar.icon === "object" && pillar.icon.url ? (
                      <div className="relative w-16 h-16 mb-4">
                        <Image
                          src={pillar.icon.url}
                          alt={pillar.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="p-4 rounded-full bg-white/50 mb-4">
                        <IconComponent className="w-8 h-8" />
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>

                    {pillar.description && (
                      <div className="prose prose-sm max-w-none">
                        <RichText data={pillar.description} enableGutter={false} />
                      </div>
                    )}
                  </div>

                  {showDivider && index < pillars.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {layout === "sideBySide" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {pillars.map((pillar, index) => {
              const IconComponent = defaultIcons[index % defaultIcons.length];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={cn(
                    "flex gap-6 items-start",
                    !isEven && "lg:flex-row-reverse lg:text-right"
                  )}
                >
                  <div className="flex-shrink-0">
                    {pillar.icon && typeof pillar.icon === "object" && pillar.icon.url ? (
                      <div className="relative w-20 h-20">
                        <Image
                          src={pillar.icon.url}
                          alt={pillar.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="p-5 rounded-2xl bg-primary/10">
                        <IconComponent className="w-10 h-10 text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    {pillar.description && (
                      <div className="prose prose-slate max-w-none">
                        <RichText data={pillar.description} enableGutter={false} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {layout === "timeline" && (
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            
            <div className="space-y-8">
              {pillars.map((pillar, index) => {
                const IconComponent = defaultIcons[index % defaultIcons.length];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={cn(
                      "relative flex items-center gap-8",
                      isEven ? "md:flex-row" : "md:flex-row-reverse",
                      "flex-row"
                    )}
                  >
                    <div className={cn(
                      "flex-1 md:text-right",
                      !isEven && "md:text-left",
                      "text-left pl-12 md:pl-0"
                    )}>
                      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {pillar.title}
                        </h3>
                        {pillar.description && (
                          <div className="prose prose-sm max-w-none">
                            <RichText data={pillar.description} enableGutter={false} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
