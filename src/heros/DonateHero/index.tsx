"use client";

import React, { useEffect } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { Heart, HandHeart, ArrowRight, Star } from "lucide-react";
import { cn } from "@/utilities/ui";
import { Button } from "@/components/ui/button";

export const DonateHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  }, [setHeaderTheme]);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === "object" && (
          <Media
            fill
            imgClassName="object-cover"
            priority
            resource={media}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/85 to-primary/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-8">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>

          {/* Rich Text */}
          {richText && (
            <RichText
              className="prose prose-invert max-w-none [&_h1]:text-4xl md:[&_h1]:text-6xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-6 [&_p]:text-xl [&_p]:text-white/90 [&_p]:mb-8"
              data={richText}
              enableGutter={false}
            />
          )}

          {/* Donation Amounts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {[25, 50, 100, 250].map((amount) => (
              <button
                key={amount}
                className={cn(
                  "py-4 px-6 rounded-xl font-semibold transition-all duration-300",
                  "bg-white/10 border-2 border-white/20 text-white",
                  "hover:bg-white hover:text-accent hover:border-white hover:scale-105"
                )}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">$</span>
              <input
                type="number"
                placeholder="Enter custom amount"
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          {Array.isArray(links) && links.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={cn(
                    "inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300",
                    i === 0
                      ? "bg-white text-accent hover:bg-white/90 hover:scale-105 shadow-2xl"
                      : "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20"
                  )}
                />
              ))}
            </div>
          ) : (
            <Button
              size="lg"
              className="bg-white text-accent hover:bg-white/90 px-10 py-6 text-lg font-bold rounded-full shadow-2xl"
            >
              <HandHeart className="w-5 h-5 mr-2" />
              Donate Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Tax Deductible</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>100% Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
