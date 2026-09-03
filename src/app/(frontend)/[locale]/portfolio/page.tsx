import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { StudioPortfolio } from "@/components/studio/StudioPortfolio";
import { getStudioPortfolio } from "@/utilities/getStudioData";

export const metadata: Metadata = {
  title: "Visual Portfolio | The Golden Light Creations",
  description:
    "Explore our complete gallery of luxury weddings, grand events, fashion editorials, and live concert photography across Nepal.",
};

export default async function PortfolioPage() {
  const portfolio = await getStudioPortfolio();

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-28 pb-20">
      {/* Page Hero Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-12 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/50 uppercase mb-6">
          <Link href="/" className="hover:text-[#F5B301] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#F5B301]" />
          <span className="text-[#F5B301]">Portfolio</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
            Captured Moments
          </span>
          <span className="w-10 h-[1px] bg-[#F5B301]/60" />
        </div>

        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-4">
          Complete <em className="text-[#F5B301] not-italic">Portfolio</em>
        </h1>
        <p className="font-poppins text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
          Browse our complete archive of luxury weddings, high-fashion editorials, live concerts,
          and cultural celebrations across Nepal. Every image is an eternal masterpiece.
        </p>
      </div>

      {/* Dynamic Filterable Portfolio Grid with Lightbox */}
      <StudioPortfolio items={portfolio} isHomepagePreview={false} />

      {/* Conversion Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
        <div className="bg-gradient-to-r from-[#111111] via-[#1a1710] to-[#111111] border border-[#F5B301]/30 p-10 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-montserrat text-xs font-bold tracking-[0.3em] uppercase text-[#F5B301] block mb-2">
              Ready To Create Magic?
            </span>
            <h3 className="font-bebas text-3xl sm:text-5xl uppercase text-white tracking-wide">
              Let&apos;s Capture Your Next Visual Story
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#F5B301] hover:bg-[#FFD04A] text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-[#F5B301]/20 whitespace-nowrap"
          >
            <span>Book Your Shoot</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
