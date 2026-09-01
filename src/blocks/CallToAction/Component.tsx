import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { GsapShimmerButton } from "@/components/ui/gsap-shimmer-button";

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container py-12">
      <div className="bg-card rounded-2xl border border-border shadow-md p-8 md:p-12 flex flex-col gap-8 md:flex-row md:justify-between md:items-center bg-linear-to-br from-background to-muted/30">
        <div className="max-w-3xl flex items-center">
          {richText && <RichText className="mb-0 text-lg" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />;
          })}
          {/* Enhanced CTA button using GSAP Shimmer */}
          <GsapShimmerButton className="hidden md:inline-flex">
            {"Get Started Now"}
          </GsapShimmerButton>
        </div>
      </div>
    </div>
  );
};

