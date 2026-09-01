import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import { PaintCalculator, PaintProductData } from '@/components/calculator/PaintCalculator'
import Link from 'next/link'
import { ChevronRight, Calculator } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
  searchParams: Promise<{
    product?: string
  }>
}

export default async function CalculatorPage({ params, searchParams }: Args) {
  const { locale } = await params
  const { product: queryProductSlug } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const { docs: rawProducts } = await payload.find({
    collection: 'products',
    select: {
      title: true,
      slug: true,
      coverageRate: true,
      pricePerLitre: true,
    },
    limit: 100,
    locale,
  })

  // Realistic defaults dictionary by slug prefix / category
  const getProductDefaults = (slug: string, title: string) => {
    const s = (slug || '').toLowerCase()
    const t = (title || '').toLowerCase()
    
    if (s.includes('double-dfence') || t.includes('double dfence')) {
      return { coverageRate: 190, pricePerLitre: 680 }
    }
    if (s.includes('elega') || t.includes('elega')) {
      return { coverageRate: 210, pricePerLitre: 750 }
    }
    if (s.includes('ultra-protec') || t.includes('ultra protec')) {
      return { coverageRate: 180, pricePerLitre: 580 }
    }
    if (s.includes('barpimo') || t.includes('barpimo')) {
      return { coverageRate: 190, pricePerLitre: 560 }
    }
    if (s.includes('shangrila-exterior') || t.includes('shangri-la exterior')) {
      return { coverageRate: 175, pricePerLitre: 480 }
    }
    if (s.includes('shangrila-interior') || t.includes('shangri-la interior')) {
      return { coverageRate: 180, pricePerLitre: 450 }
    }
    if (s.includes('protec') || t.includes('protec')) {
      return { coverageRate: 165, pricePerLitre: 420 }
    }
    if (s.includes('distemper') || t.includes('distemper')) {
      return { coverageRate: 160, pricePerLitre: 220 }
    }
    if (s.includes('enamel') || t.includes('enamel')) {
      return { coverageRate: 180, pricePerLitre: 520 }
    }
    if (s.includes('primer') || t.includes('primer')) {
      return { coverageRate: 160, pricePerLitre: 320 }
    }
    return { coverageRate: 180, pricePerLitre: 550 }
  }

  // Map to the required client side type with realistic defaults
  const paintProducts: PaintProductData[] = rawProducts.map(p => {
    const defaults = getProductDefaults(p.slug || '', p.title || '')
    return {
      id: p.id,
      title: p.title || 'Unknown Product',
      slug: p.slug || '',
      coverageRate: p.coverageRate && p.coverageRate > 50 ? p.coverageRate : defaults.coverageRate,
      pricePerLitre: p.pricePerLitre && p.pricePerLitre > 50 ? p.pricePerLitre : defaults.pricePerLitre,
    }
  })

  // If a specific product is requested via query param (e.g. from a product detail page),
  // fetch it by slug and add it to the paintProducts list if it's not already present.
  if (queryProductSlug) {
    try {
      const p = await payload.find({
        collection: 'products',
        where: {
          slug: { equals: queryProductSlug }
        },
        limit: 1,
        depth: 0,
        locale,
      })
      if (p.docs[0]) {
        const prod = p.docs[0]
        if (!paintProducts.some(item => item.id === prod.id)) {
          const defaults = getProductDefaults(prod.slug || '', prod.title || '')
          paintProducts.unshift({
            id: prod.id,
            title: prod.title || 'Unknown Product',
            slug: prod.slug || '',
            coverageRate: prod.coverageRate && prod.coverageRate > 50 ? prod.coverageRate : defaults.coverageRate,
            pricePerLitre: prod.pricePerLitre && prod.pricePerLitre > 50 ? prod.pricePerLitre : defaults.pricePerLitre,
          })
        }
      }
    } catch (e) {
      // Ignore invalid slugs or missing docs
    }
  }

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
            <span className="text-reliance-white">Paint Calculator</span>
          </div>

          <div className="max-w-2xl text-reliance-white">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/20 rounded-full px-4 py-1.5 text-reliance-gold text-sm mb-6 border border-reliance-gold/30">
              <Calculator className="w-4 h-4" />
              <span>Smart Estimator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Paint & Wall Price Calculator
            </h1>
            <p className="text-reliance-white/70 text-lg leading-relaxed max-w-xl">
              Get an accurate estimate of how much paint you&apos;ll need and what it will cost. Simply enter your room dimensions below.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="container py-12 md:py-20">
        <React.Suspense fallback={<div className="text-center py-12 text-reliance-navy font-medium">Loading Calculator...</div>}>
          <PaintCalculator products={paintProducts} />
        </React.Suspense>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Paint Calculator | Reliance Paints',
    description: 'Estimate paint quantity and total cost for your room painting project accurately with the Reliance Paints Calculator.',
  }
}
