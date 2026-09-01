import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { AboutTeamBlock } from "@/blocks/AboutUs/AboutTeam/Component";

import { Users, Sparkles, ArrowRight, Shield, Award, Heart, Briefcase } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 600;

type Args = {
  params: Promise<{
    locale?: string;
  }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = "en" } = await params;
  const title = "Our Team | Leadership & Paint Specialists | Reliance Paints";
  const description =
    "Meet the visionary leaders, innovative chemists, production engineers, and customer specialists who make Reliance Paints Nepal's trusted coating manufacturer.";
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://reliancepaintsnepal.com";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Reliance Paints",
      locale,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Reliance Paints Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function OurTeamPage({ params }: Args) {
  const { locale = "en" } = await params;
  const payload = await getPayload({ config: configPromise });

  // Fetch all active staff members
  const { docs: staffs } = await payload.find({
    collection: "staffs",
    where: {
      isActive: { equals: true },
      showOnWebsite: { equals: true },
    },
    sort: "displayOrder",
    limit: 50,
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-reliance-navy selection:bg-reliance-gold selection:text-reliance-navy">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-reliance-navy text-white pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-reliance-gold/20 border border-reliance-gold/40 text-reliance-gold text-xs font-bold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" />
              People Behind the Colors
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight text-white leading-none">
              Meet Our <span className="text-reliance-gold">Team</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-sans font-light leading-relaxed">
              Behind every can of Reliance Paints is a passionate team of chemists, engineers, 
              color specialists, and customer champions dedicated to beautifying and protecting Nepal&apos;s living spaces.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#team-grid"
                className="inline-flex items-center gap-2 bg-reliance-gold hover:bg-reliance-gold/90 text-reliance-navy px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-reliance-gold/20"
              >
                View Leadership & Members
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/careers"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all backdrop-blur-xs"
              >
                <Briefcase className="w-4 h-4 text-reliance-gold" />
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEAM MEMBERS GRID (Rendered via AboutTeamBlock) */}
      <div id="team-grid" className="border-b border-reliance-navy/10">
        <AboutTeamBlock
          blockType="aboutTeam"
          eyebrow="Executive Leadership & Specialists"
          heading="Dedicated to Craft & Innovation"
          description="Combining decades of technical mastery, certified manufacturing discipline, and a deep love for Nepali architecture."
          selectManually={false}
          limit={24}
        />
      </div>

      {/* 3. TEAM CULTURE & CORE VALUES */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-reliance-gold mb-3">
            Our Culture & Pillars
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy">
            How We Work Together
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-reliance-navy/15 p-8 shadow-[4px_4px_0_0_#0D1B3E]">
            <Award className="w-10 h-10 text-reliance-gold mb-6" />
            <h3 className="text-xl font-bold uppercase tracking-tight text-reliance-navy mb-3">
              Uncompromising Quality
            </h3>
            <p className="text-reliance-navy/70 text-sm leading-relaxed">
              Every batch undergoes strict multi-stage lab analysis for pigment dispersion, weatherability, and wash durability under ISO and NS standards.
            </p>
          </div>

          <div className="bg-white border border-reliance-navy/15 p-8 shadow-[4px_4px_0_0_#0D1B3E]">
            <Sparkles className="w-10 h-10 text-reliance-gold mb-6" />
            <h3 className="text-xl font-bold uppercase tracking-tight text-reliance-navy mb-3">
              Innovation & Sustainability
            </h3>
            <p className="text-reliance-navy/70 text-sm leading-relaxed">
              Our R&D specialists continuously formulate low-VOC, lead-free, and heavy-metal-free emulsions that keep Nepali families healthy and safe.
            </p>
          </div>

          <div className="bg-white border border-reliance-navy/15 p-8 shadow-[4px_4px_0_0_#0D1B3E]">
            <Heart className="w-10 h-10 text-reliance-gold mb-6" />
            <h3 className="text-xl font-bold uppercase tracking-tight text-reliance-navy mb-3">
              Customer First
            </h3>
            <p className="text-reliance-navy/70 text-sm leading-relaxed">
              From our dealer network to on-site contractor training, we provide end-to-end technical support and personalized shade consultations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TALENT NETWORK CTA */}
      <section className="bg-reliance-navy text-white py-20 border-t border-reliance-navy">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl lg:text-5xl font-display uppercase tracking-tight text-white mb-4">
            Want to Join <span className="text-reliance-gold">Our Team?</span>
          </h2>
          <p className="text-white/80 text-base max-w-xl mx-auto mb-10 font-sans">
            We are always looking for driven innovators, chemists, sales professionals, and leaders to shape the future of paint in Nepal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-reliance-gold hover:bg-white text-reliance-navy px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all shadow-md"
            >
              Explore Open Positions
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all"
            >
              About Our Heritage
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
