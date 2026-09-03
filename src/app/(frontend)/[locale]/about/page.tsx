import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ChevronRight, ArrowUpRight, Sparkles, Heart, Shield, Camera } from "lucide-react";
import { StudioStory } from "@/components/studio/StudioStory";
import { StudioStats } from "@/components/studio/StudioStats";
import { getStudioSettings } from "@/utilities/getStudioData";

export const metadata: Metadata = {
  title: "About Our Studio | The Golden Light Creations",
  description:
    "Learn about The Golden Light Creations — Nepal's premier luxury photography and cinematic production studio. Crafting timeless visual stories since 2019.",
};

export default async function AboutPage() {
  const settings = await getStudioSettings();

  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#F5B301]" />,
      title: "Obsession With Light",
      desc: "We understand that lighting is not just technical exposure; it is the emotional heartbeat of every frame.",
    },
    {
      icon: <Heart className="w-6 h-6 text-[#F5B301]" />,
      title: "Authentic Emotion",
      desc: "Unstaged, raw, genuine moments are what make photographs eternal. We capture the feelings you never want to forget.",
    },
    {
      icon: <Camera className="w-6 h-6 text-[#F5B301]" />,
      title: "Cinema-Grade Gear",
      desc: "Top-tier full-frame cinema cameras, anamorphic lenses, and precision drones delivering Hollywood-level visual standards.",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#F5B301]" />,
      title: "Uncompromising Reliability",
      desc: "Flawless on-time delivery, secure multi-backup data redundancy, and client-first communication throughout.",
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-28 pb-20">
      {/* Page Hero Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-12 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/50 uppercase mb-6">
          <Link href="/" className="hover:text-[#F5B301] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#F5B301]" />
          <span className="text-[#F5B301]">About Us</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
            Our Philosophy
          </span>
          <span className="w-10 h-[1px] bg-[#F5B301]/60" />
        </div>

        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-4">
          About Our <em className="text-[#F5B301] not-italic">Studio</em>
        </h1>
        <p className="font-poppins text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
          Founded in 2019 in Kathmandu, Nepal. Driven by an obsession with golden light, human
          connection, and visual storytelling that withstands the test of time.
        </p>
      </div>

      {/* Story Component */}
      <StudioStory
        headline={settings.story.headline}
        quote={settings.story.quote}
        paragraph1={settings.story.paragraph1}
        paragraph2={settings.story.paragraph2}
        stats={settings.stats}
        isHomepagePreview={false}
      />

      {/* Large Glowing Stats Band */}
      <StudioStats stats={settings.stats} />

      {/* Core Studio Pillars Section */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase block mb-3">
            How We Work
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white uppercase leading-none">
            The Studio <em className="text-[#F5B301] not-italic">Pillars</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="bg-white/[0.02] border border-white/[0.08] hover:border-[#F5B301]/40 p-8 transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="w-12 h-12 border border-[#F5B301]/30 flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="font-montserrat text-base font-bold uppercase tracking-wider text-white mb-3">
                {v.title}
              </h3>
              <p className="font-poppins text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
        <div className="bg-gradient-to-r from-[#111111] via-[#1a1710] to-[#111111] border border-[#F5B301]/30 p-10 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-montserrat text-xs font-bold tracking-[0.3em] uppercase text-[#F5B301] block mb-2">
              Let&apos;s Create Together
            </span>
            <h3 className="font-bebas text-3xl sm:text-5xl uppercase text-white tracking-wide">
              Work With Nepal&apos;s Finest Creative Studio
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#F5B301] hover:bg-[#FFD04A] text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-[#F5B301]/20 whitespace-nowrap"
          >
            <span>Book A Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
