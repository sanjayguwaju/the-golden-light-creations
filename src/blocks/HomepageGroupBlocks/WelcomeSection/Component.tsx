"use client";

import React from "react";
import type { WelcomeSectionBlock as WelcomeSectionProps, Media } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import RichText from "@/components/RichText";

export const WelcomeSectionBlock: React.FC<WelcomeSectionProps> = ({
  title,
  subtitle,
  content,
  image,
  features,
  primaryButton,
}) => {
  const hasImage = image && typeof image === "object" && "url" in image && Boolean(image.url);

  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24 bg-white text-reliance-navy overflow-hidden relative border-b border-reliance-navy/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Content Column (Centered on Mobile, Left-aligned on Desktop) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-6 order-2 lg:order-1 text-center lg:text-left">
            {/* Subtitle Badge */}
            {subtitle && (
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-reliance-gold/15 border border-reliance-gold/30 text-reliance-navy text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-reliance-gold shrink-0" />
                  <span>{subtitle}</span>
                </div>
              </div>
            )}

            {/* Main Title */}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy leading-tight">
                {title}
              </h2>
            )}

            {/* RichText Content */}
            {content && (
              <div className="prose prose-sm sm:prose-base text-reliance-navy/75 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed text-center lg:text-left prose-p:my-1.5 sm:prose-p:my-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <RichText data={content as any} enableGutter={false} />
              </div>
            )}

            {/* Features Grid */}
            {features && features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4 max-w-lg lg:max-w-none mx-auto lg:mx-0 text-left">
                {features.map((feature, index) => {
                  const hasIcon =
                    feature.icon && typeof feature.icon === "object" && "url" in feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 sm:gap-3.5 p-3 sm:p-3.5 bg-white lg:bg-transparent border border-reliance-navy/10 lg:border-0 rounded-none transition-all duration-300 hover:border-reliance-navy/20"
                    >
                      <div className="shrink-0 mt-0.5">
                        {hasIcon ? (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 relative rounded-full bg-reliance-gold/15 flex items-center justify-center p-1 border border-reliance-gold/30">
                            <Image
                              src={(feature.icon as Media).url!}
                              alt={feature.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-reliance-navy/5 flex items-center justify-center border border-reliance-navy/20">
                            <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-reliance-navy" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-reliance-navy text-xs sm:text-sm tracking-tight">
                          {feature.title}
                        </h4>
                        {feature.description && (
                          <p className="text-[11px] sm:text-xs text-reliance-navy/70 leading-normal">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action Button */}
            {primaryButton?.label && primaryButton?.url && (
              <div className="pt-3 sm:pt-6 flex justify-center lg:justify-start">
                <Link
                  href={primaryButton.url}
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-reliance-navy text-white hover:bg-reliance-gold hover:text-reliance-navy text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[3px_3px_0_0_#C59B27] active:scale-[0.98]"
                >
                  <span>{primaryButton.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>

          {/* Image Column (Pure white seamless presentation with no shadows on mobile or desktop) */}
          <div className="lg:col-span-5 xl:col-span-5 order-1 lg:order-2 relative flex items-center justify-center">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-square w-full max-w-[460px] sm:max-w-[540px] lg:max-w-none mx-auto bg-white flex items-center justify-center">
              {hasImage ? (
                <Image
                  src={(image as Media).url!}
                  alt={title || "Welcome image"}
                  fill
                  className="object-contain drop-shadow-none transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 540px, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white border border-reliance-navy/10 flex items-center justify-center">
                  <span className="text-reliance-navy/40 text-xs font-mono uppercase tracking-wider">
                    Reliance Paints
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
