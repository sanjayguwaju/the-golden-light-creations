import React from "react";
import Image from "next/image";
import type { StatsListBlock as StatsListBlockProps } from "@/payload-types";
import type { Media } from "@/payload-types";
import { GsapNumberTicker } from "@/components/ui/gsap-number-ticker";

const columnClasses: Record<string, string> = {
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
};

export const StatsListBlock: React.FC<StatsListBlockProps> = ({
  heading,
  description,
  stats,
  columns = "3",
}) => {
  if (!stats || stats.length === 0) return null;

  const gridClass = columnClasses[columns ?? "3"] ?? columnClasses["3"];

  return (
    <section className="my-10 w-full">
      {(heading || description) && (
        <div className="mb-8 text-center">
          {heading && <h2 className="text-2xl md:text-3xl font-bold text-foreground">{heading}</h2>}
          {description && (
            <p className="mt-2 text-base text-muted-foreground max-w-xl mx-auto">{description}</p>
          )}
        </div>
      )}

      <div className={`grid ${gridClass} gap-6`}>
        {stats.map((stat, index) => (
          <div
            key={stat.id ?? index}
            className="flex flex-col items-center text-center rounded-2xl bg-background shadow-md border border-border p-6 hover:shadow-lg transition-shadow"
          >
            {stat.icon && typeof stat.icon === "object" && (stat.icon as Media).url && (
              <div className="mb-4 h-12 w-12 relative">
                <Image
                  src={(stat.icon as Media).url!}
                  alt={stat.label}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <GsapNumberTicker value={stat.value} className="text-3xl md:text-4xl font-extrabold text-primary" />
            <span className="mt-1 text-base font-semibold text-foreground">{stat.label}</span>
            {stat.description && (
              <span className="mt-1 text-sm text-muted-foreground">{stat.description}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

