import type { Metadata } from "next";
import { TypedLocale } from "payload";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";
import { queryPageBySlug } from "@/utilities/queryPageBySlug";
import { generateMeta } from "@/utilities/generateMeta";
import { StudioStory } from "@/components/studio/StudioStory";
import { StudioStats } from "@/components/studio/StudioStats";
import { getStudioSettings } from "@/utilities/getStudioData";
import { Link } from "@/i18n/routing";
import { ChevronRight, ArrowUpRight, Sparkles, Heart, Shield, Video } from "lucide-react";

export const revalidate = 600;

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale } = await paramsPromise;
  const page = await queryPageBySlug({ slug: "about", locale });
  if (page) return generateMeta({ doc: page });
  return {
    title: "About Our Studio | The Golden Light Creations",
    description:
      "Learn about The Golden Light Creations — Nepal's premier luxury photography and cinematic production studio. Crafting timeless visual stories since 2019.",
  };
}

export default async function AboutPage({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise;
  const page = await queryPageBySlug({ slug: "about", locale });

  if (page?.layout && page.layout.length > 0) {
    return (
      <div className="bg-white text-[#0A0A0A] min-h-screen">
        {page.hero && <RenderHero {...page.hero} />}
        <RenderBlocks blocks={page.layout} />
      </div>
    );
  }

  // Fallback if CMS page is not yet populated
  const settings = await getStudioSettings();

  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#F5B301]" />,
      title: "Obsession With Light",
      desc: "We understand that lighting is not just technical exposure; it is the emotional heartbeat of every frame.",
    },
    {
      icon: <Heart className="w-6 h-6 text-[#C0171E]" />,
      title: "Authentic Emotion",
      desc: "Unstaged, raw, genuine moments are what make photographs eternal. We capture the feelings you never want to forget.",
    },
    {
      icon: <Video className="w-6 h-6 text-[#C0171E]" />,
      title: "Cinema-Grade Gear",
      desc: "Top-tier full-frame cinema cameras, anamorphic lenses, and precision drones delivering Hollywood-level visual standards.",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#C0171E]" />,
      title: "Uncompromising Reliability",
      desc: "Flawless on-time delivery, secure multi-backup data redundancy, and client-first communication throughout.",
    },
  ];

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
            <span className="text-white font-bold">About Us</span>
          </div>

          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#FFD04A] uppercase">
              Our Philosophy
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#FFD04A]/60" />
          </div>

          <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-3 sm:mb-4 text-white">
            About Our <em className="text-[#FFD04A] not-italic">Studio</em>
          </h1>
          <p className="font-poppins text-xs sm:text-base text-white/90 max-w-2xl font-light leading-relaxed">
            Founded in 2019 in Kathmandu, Nepal. Driven by an obsession with golden light, human
            connection, and visual storytelling that withstands the test of time.
          </p>
        </div>
      </div>

      {/* Story Component (White background, Black text) */}
      <StudioStory
        headline={settings.story.headline}
        quote={settings.story.quote}
        paragraph1={settings.story.paragraph1}
        paragraph2={settings.story.paragraph2}
        stats={settings.stats}
        isHomepagePreview={false}
      />

      {/* Large Glowing Stats Band (Red background, White text) */}
      <StudioStats stats={settings.stats} />

      {/* Core Studio Pillars Section (Light red-tinted background, Black text) */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-black/5">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase block mb-3">
            How We Work
          </span>
          <h2 className="font-bebas text-3xl sm:text-6xl text-[#0A0A0A] uppercase leading-none">
            The Studio <em className="text-[#C0171E] not-italic">Pillars</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#C0171E]/15 hover:border-[#C0171E]/50 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-md"
            >
              <div className="w-12 h-12 border border-[#C0171E]/30 bg-[#FFF5F5] flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="font-montserrat text-base font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 sm:mb-3">
                {v.title}
              </h3>
              <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Banner: Red background with white text and white button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 sm:mt-16">
        <div className="bg-[#C0171E] text-white p-6 sm:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-2xl">
          <div>
            <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] block mb-2">
              Let&apos;s Create Together
            </span>
            <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide leading-tight">
              Work With Nepal&apos;s Finest Creative Studio
            </h3>
          </div>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#C0171E] hover:bg-[#FFF5F5] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 shadow-xl whitespace-nowrap"
          >
            <span>Book A Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
