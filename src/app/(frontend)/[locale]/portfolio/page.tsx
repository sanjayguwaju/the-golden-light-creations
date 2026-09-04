import type { Metadata } from "next";
import { TypedLocale } from "payload";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";
import { queryPageBySlug } from "@/utilities/queryPageBySlug";
import { generateMeta } from "@/utilities/generateMeta";
import { StudioPortfolio } from "@/components/studio/StudioPortfolio";
import { getStudioPortfolio } from "@/utilities/getStudioData";
import { Link } from "@/i18n/routing";
import { ChevronRight, ArrowUpRight } from "lucide-react";

export const revalidate = 600;

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale } = await paramsPromise;
  const page = await queryPageBySlug({ slug: "portfolio", locale });
  if (page) return generateMeta({ doc: page });
  return {
    title: "Visual Portfolio | The Golden Light Creations",
    description:
      "Explore our complete gallery of luxury weddings, grand events, fashion editorials, and live concert photography across Nepal.",
  };
}

export default async function PortfolioPage({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise;
  const page = await queryPageBySlug({ slug: "portfolio", locale });

  if (page?.layout && page.layout.length > 0) {
    return (
      <div className="bg-white text-[#0A0A0A] min-h-screen">
        {page.hero && <RenderHero {...page.hero} />}
        <RenderBlocks blocks={page.layout} />
      </div>
    );
  }

  // Fallback if CMS page is not yet populated
  const portfolio = await getStudioPortfolio();

  return (
    <div className="bg-white text-[#0A0A0A] min-h-screen pb-20">
      {/* Page Hero Header: Red Background with White Text */}
      <div className="bg-[#C0171E] text-white pt-32 pb-14 sm:pb-16 px-4 sm:px-8 border-b border-[#A01018]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/70 uppercase mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white font-bold">Portfolio</span>
          </div>

          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#FFD04A] uppercase">
              Captured Moments
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#FFD04A]/60" />
          </div>

          <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-3 sm:mb-4 text-white">
            Complete <em className="text-[#FFD04A] not-italic">Portfolio</em>
          </h1>
          <p className="font-poppins text-xs sm:text-base text-white/90 max-w-2xl font-light leading-relaxed">
            Browse our complete archive of luxury weddings, high-fashion editorials, live concerts,
            and cultural celebrations across Nepal. Every image is an eternal masterpiece.
          </p>
        </div>
      </div>

      {/* Dynamic Filterable Portfolio Grid with Lightbox (White background, Black text) */}
      <StudioPortfolio items={portfolio} isHomepagePreview={false} />

      {/* Conversion Banner: Red background with white text and white CTA button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 sm:mt-16">
        <div className="bg-[#C0171E] text-white p-6 sm:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-2xl">
          <div>
            <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] block mb-2">
              Ready To Create Magic?
            </span>
            <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide leading-tight">
              Let&apos;s Capture Your Next Visual Story
            </h3>
          </div>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#C0171E] hover:bg-[#FFF5F5] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 shadow-xl whitespace-nowrap"
          >
            <span>Book Your Shoot</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
