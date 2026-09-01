import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ActionGallery } from '@/components/ActionGallery'
import {
  getInspirationSpaces,
  DESIGNER_PALETTES,
} from '@/utilities/inspirationData'
import {
  Palette,
  Eye,
  Calculator,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Layers,
  ChevronRight,
} from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Inspiration Gallery | Room Ideas & Color Harmonies | Reliance Paints',
  description:
    'Explore real room transformations, curated color harmonies, and designer-tested palettes for living rooms, bedrooms, kitchens, and exteriors with Reliance Paints.',
}

export default async function InspirationPage({
  params,
}: {
  params: Promise<{ locale?: string }>
}) {
  const { locale = 'en' } = await params
  const spaces = await getInspirationSpaces(locale)

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-reliance-navy selection:bg-reliance-gold selection:text-reliance-navy">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-reliance-navy text-white pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Subtle architectural background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-reliance-gold/20 border border-reliance-gold/40 text-reliance-gold text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Inspiration & Transformation Gallery
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight text-white mb-6 leading-none">
              Bring Your Dream Spaces <span className="text-reliance-gold">To Life</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl font-sans font-light leading-relaxed mb-10">
              Discover real room transformations, curated color harmonies, and designer-tested
              palettes crafted specifically for modern architecture and heritage living across Nepal.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#gallery-section"
                className="inline-flex items-center gap-2 bg-reliance-gold hover:bg-reliance-gold/90 text-reliance-navy px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-reliance-gold/20"
              >
                Browse All Spaces
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/visualiser"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all backdrop-blur-xs"
              >
                <Eye className="w-4 h-4 text-reliance-gold" />
                Try Room Visualizer
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/15">
            <div>
              <p className="text-3xl lg:text-4xl font-display uppercase text-reliance-gold">60+</p>
              <p className="text-xs uppercase tracking-wider text-white/70 mt-1">Curated Shades</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-display uppercase text-reliance-gold">8</p>
              <p className="text-xs uppercase tracking-wider text-white/70 mt-1">Space Categories</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-display uppercase text-reliance-gold">100%</p>
              <p className="text-xs uppercase tracking-wider text-white/70 mt-1">
                Washable & Weatherproof
              </p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-display uppercase text-reliance-gold">30+</p>
              <p className="text-xs uppercase tracking-wider text-white/70 mt-1">Years of Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE GALLERY SECTION */}
      <section id="gallery-section" className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-reliance-gold mb-2">
            Click Any Space to View Colors & Details
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy">
            Explore Curated Spaces
          </h2>
          <p className="text-reliance-navy/70 text-base max-w-2xl mt-2 font-sans">
            Filter by room or style to find inspiration. Click any photo to see the featured shade,
            complementary accent colors, and recommended paint finish.
          </p>
        </div>

        <ActionGallery images={spaces} showFilters={true} />
      </section>

      {/* 3. DESIGNER COLOR HARMONIES & PALETTES */}
      <section className="py-20 bg-white border-y border-reliance-navy/15">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-reliance-gold mb-3">
              Harmonious Color Systems
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy mb-4">
              Designer Palette Combinations
            </h2>
            <p className="text-reliance-navy/70 text-base">
              Take the guesswork out of pairing wall shades. These 4-color palettes coordinate
              primary walls, accent features, trim, and ceilings for complete visual balance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DESIGNER_PALETTES.map((pal) => (
              <div
                key={pal.id}
                className="bg-[#FAF8F5] border border-reliance-navy/15 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-reliance-navy text-white text-[10px] font-bold uppercase tracking-wider">
                      {pal.roomRecommendation}
                    </span>
                    <span className="text-[11px] font-mono text-reliance-gold font-bold uppercase">
                      4 Shades
                    </span>
                  </div>

                  <h3 className="text-2xl font-display uppercase tracking-tight text-reliance-navy mb-2">
                    {pal.name}
                  </h3>
                  <p className="text-reliance-navy/70 text-xs sm:text-sm font-sans mb-8 leading-relaxed">
                    {pal.tagline}
                  </p>

                  {/* Swatches Stack */}
                  <div className="space-y-3">
                    {pal.colors.map((c) => (
                      <Link
                        key={c.name}
                        href={`/colors/${c.slug}`}
                        className="group flex items-center justify-between p-2.5 bg-white border border-reliance-navy/10 hover:border-reliance-navy transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-7 h-7 border border-reliance-navy/20 shadow-xs group-hover:scale-110 transition-transform shrink-0"
                            style={{ backgroundColor: c.hexCode }}
                          />
                          <div>
                            <p className="text-xs font-bold text-reliance-navy group-hover:text-reliance-gold transition-colors">
                              {c.name}
                            </p>
                            <p className="text-[10px] text-reliance-navy/50 uppercase tracking-wider font-semibold">
                              {c.role}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-reliance-navy/60 uppercase">
                          {c.hexCode}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-reliance-navy/10 flex items-center justify-between gap-4">
                  <Link
                    href={`/visualiser?color=${pal.colors[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-reliance-navy hover:text-reliance-gold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-reliance-gold" />
                    Test Palette in Visualizer
                  </Link>

                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-reliance-navy/70 hover:text-reliance-navy transition-colors"
                  >
                    Estimate
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUALIZER & CALCULATOR DUAL CTA SECTION */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Visualizer */}
          <div className="relative overflow-hidden bg-reliance-navy text-white p-8 sm:p-12 border border-reliance-navy flex flex-col justify-between min-h-[340px]">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-reliance-gold/20 to-transparent pointer-events-none" />

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-reliance-gold text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                <Eye className="w-3.5 h-3.5" />
                Live 3D Preview
              </span>
              <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white mb-3">
                See Colors On Your Own Walls
              </h3>
              <p className="text-white/80 text-sm font-sans max-w-md leading-relaxed">
                Experiment with wall colors, accent combinations, and finish sheens in real-time
                before opening a single paint can.
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/visualiser"
                className="inline-flex items-center gap-2 bg-reliance-gold hover:bg-white text-reliance-navy px-7 py-3.5 font-bold uppercase tracking-widest text-xs transition-all shadow-md"
              >
                Launch Room Visualizer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Calculator */}
          <div className="relative overflow-hidden bg-[#ECE7DF] text-reliance-navy p-8 sm:p-12 border border-reliance-navy/20 flex flex-col justify-between min-h-[340px]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider mb-4">
                <Calculator className="w-3.5 h-3.5 text-reliance-gold" />
                Accurate Paint Estimation
              </span>
              <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-reliance-navy mb-3">
                Calculate Paint & Budget
              </h3>
              <p className="text-reliance-navy/75 text-sm font-sans max-w-md leading-relaxed">
                Enter your room dimensions and surface porosity to get instant volume requirements,
                optimal pack sizes, and downloadable PDF estimate reports.
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy px-7 py-3.5 font-bold uppercase tracking-widest text-xs transition-all shadow-md"
              >
                Calculate Paint Requirements
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
