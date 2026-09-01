import React from 'react'
import Link from 'next/link'
import { ActionGallery } from '@/components/ActionGallery'
import { getInspirationSpaces } from '@/utilities/inspirationData'

export async function InspirationTab({ locale = 'en' }: { locale?: any }) {
  const images = await getInspirationSpaces(locale)

  return (
    <div className="py-8">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tighter text-reliance-navy mb-4">
          Browse by Space
        </h2>
        <p className="text-reliance-navy/70 text-lg max-w-2xl">
          Looking for ideas for your next painting project? Explore our collection of beautifully
          designed interiors, exteriors, and living spaces to discover color combinations, design
          inspiration, and painting ideas for every corner of your home.
        </p>
      </div>

      <ActionGallery images={images} showFilters={true} />

      <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/colors"
          className="inline-flex items-center justify-center gap-2 bg-reliance-navy text-white px-8 py-4 font-sans uppercase tracking-wider text-sm font-semibold hover:bg-reliance-gold hover:text-reliance-navy transition-colors shadow-sm"
        >
          Explore Color Fan Deck
        </Link>
        <Link
          href="/visualiser"
          className="inline-flex items-center justify-center gap-2 bg-white border-2 border-reliance-navy text-reliance-navy px-8 py-4 font-sans uppercase tracking-wider text-sm font-semibold hover:bg-reliance-navy hover:text-white transition-colors shadow-sm"
        >
          Open Room Visualizer
        </Link>
      </div>
    </div>
  )
}