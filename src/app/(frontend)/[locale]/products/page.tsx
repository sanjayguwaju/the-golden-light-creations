import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import Link from 'next/link'
import { ChevronRight, Star, LayoutGrid } from 'lucide-react'
import { Media } from '@/components/Media'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ComparisonTable } from '@/components/home/ComparisonTable'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function ProductsPage({ params }: Args) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const categoriesRes = await payload.find({
    collection: 'product-categories',
    depth: 1,
    limit: 100,
    locale,
  })

  const sortedCategories = categoriesRes.docs.sort((a: any, b: any) => {
    const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
    const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
    return aOrder - bOrder;
  })

  // Fetch top products for the comparison table
  const productsRes = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 4,
    locale,
  })
  
  const comparisonProducts = productsRes.docs;

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Hero Section */}
      <section className="relative bg-reliance-navy pt-12 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-reliance-gold rounded-none -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-reliance-red rounded-none translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-reliance-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-reliance-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-reliance-white">Products</span>
          </div>

          <div className="max-w-2xl text-reliance-white">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/20 rounded-none px-4 py-1.5 text-reliance-gold text-sm mb-6 border-0">
              <Star className="w-4 h-4" />
              <span>Explore Our Range</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              World-Class Paints & Finishes
            </h1>
            <p className="text-reliance-white/70 text-lg leading-relaxed max-w-xl">
              From interiors that breathe life to exteriors that withstand time, explore our comprehensive range of high-performance coatings.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-reliance-gold/10 flex items-center justify-center">
              <LayoutGrid className="w-6 h-6 text-reliance-gold" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-reliance-navy">Product Categories</h2>
              <span className="text-reliance-grey text-xs">{categoriesRes.totalDocs} Categories Available</span>
            </div>
          </div>
          <Link
            href={`/${locale}/products/all`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-reliance-gold hover:text-reliance-navy transition-all self-start sm:self-auto"
          >
            <span>View All Products Directly</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {sortedCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-none border-0">
            <p className="text-reliance-grey">No product categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedCategories.map((category) => {
              const image = category.image;
              const imageUrl = typeof image === 'object' && image?.url ? image.url : null;
              
              return (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className="group relative h-[400px] rounded-none overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100" />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-reliance-navy via-reliance-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:-translate-y-1 transition-transform">
                      {category.title}
                    </h3>
                    <div className="flex items-center text-reliance-gold font-medium text-sm opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      Explore Product Lines
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>


    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Products | Reliance Paints',
    description: 'Explore our wide range of interior, exterior, wood, metal, and industrial paints.',
  }
}
