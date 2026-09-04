import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { StudioServices } from "@/components/studio/StudioServices";
import { getStudioServices } from "@/utilities/getStudioData";

export const metadata: Metadata = {
  title: "Production Services | The Golden Light Creations",
  description:
    "Explore our complete suite of creative services: Luxury Wedding Photography, Cinematic Videography, Drone Aerials, Commercial Ads, and Social Branding.",
};

export default async function ServicesPage() {
  const services = await getStudioServices();

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
            <span className="text-white font-bold">Services</span>
          </div>

          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#FFD04A] uppercase">
              Comprehensive Solutions
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#FFD04A]/60" />
          </div>

          <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-3 sm:mb-4 text-white">
            Creative <em className="text-[#FFD04A] not-italic">Services</em>
          </h1>
          <p className="font-poppins text-xs sm:text-base text-white/90 max-w-2xl font-light leading-relaxed">
            From full-day wedding coverage to multi-camera corporate productions and end-to-end digital
            branding campaigns — crafted with uncompromising artistry.
          </p>
        </div>
      </div>

      {/* Dynamic 10 Services Grid (Red section) */}
      <StudioServices items={services} isHomepagePreview={false} />

      {/* Consultation Action Banner: Red background with white text and white button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 sm:mt-16">
        <div className="bg-[#C0171E] text-white p-6 sm:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-2xl">
          <div>
            <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] block mb-2">
              Custom Requirements?
            </span>
            <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide leading-tight">
              Need A Tailored Package For Your Event Or Brand?
            </h3>
          </div>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#C0171E] hover:bg-[#FFF5F5] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 shadow-xl whitespace-nowrap"
          >
            <span>Request Custom Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
