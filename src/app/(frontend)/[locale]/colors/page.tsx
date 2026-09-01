import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import Link from 'next/link'
import { ChevronRight, Palette } from 'lucide-react'
import { ColourGridClient } from '@/components/ColourGridClient'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function ColorsPage({ params }: Args) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const colors = await payload.find({
    collection: 'colors',
    sort: '-popularity',
    limit: 1500,
    locale,
  })

  // Only show colors that have related products and sort naturally by shade code
  const colorsWithProducts = colors.docs
    .filter(
      (color: any) => color.relatedProducts && color.relatedProducts.length > 0,
    )
    .sort((a: any, b: any) => {
      const codeA = a.shadeCode || a.colorId || a.name || ''
      const codeB = b.shadeCode || b.colorId || b.name || ''
      return codeA.localeCompare(codeB, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    })

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Hero Section */}
      <section className="relative bg-reliance-navy pt-12 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-reliance-gold rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-reliance-red rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-reliance-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-reliance-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-reliance-white">Colors</span>
          </div>

          <div className="max-w-2xl text-reliance-white">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/20 rounded-full px-4 py-1.5 text-reliance-gold text-sm mb-6 border border-reliance-gold/30">
              <Palette className="w-4 h-4" />
              <span>Color Palette</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Explore Our Colors
            </h1>
            <p className="text-reliance-white/70 text-lg leading-relaxed max-w-xl">
              Discover our extensive collection of colors, from trending shades to timeless classics. Find the perfect hue for your next project.
            </p>
          </div>
        </div>
      </section>

      {/* Colors Grid */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ColourGridClient initialColours={colorsWithProducts as React.ComponentProps<typeof ColourGridClient>['initialColours']} />
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Colors | Reliance Paints',
    description: 'Explore our extensive collection of paint colors, from trending shades to timeless classics.',
  }
}
