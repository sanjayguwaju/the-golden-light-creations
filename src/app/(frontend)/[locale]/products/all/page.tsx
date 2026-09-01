import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import Link from 'next/link'
import { ChevronRight, Sparkles, Layers, ShieldCheck, Paintbrush } from 'lucide-react'
import { AllProductsCatalogClient } from '@/components/AllProductsCatalogClient'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function AllProductsPage({ params }: Args) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch all products
  const productsRes = await payload.find({
    collection: 'products' as any,
    depth: 2,
    limit: 1000,
    locale,
  })

  const sortedProducts = productsRes.docs.sort((a: any, b: any) => {
    const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
    const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
    return aOrder - bOrder;
  })

  // 2. Fetch all product categories
  const categoriesRes = await payload.find({
    collection: 'product-categories' as any,
    depth: 1,
    limit: 100,
    locale,
  })

  const sortedCategories = categoriesRes.docs.sort((a: any, b: any) => {
    const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
    const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
    return aOrder - bOrder;
  })

  // 3. Fetch Navigation for dynamic logo
  const navData = await payload.findGlobal({
    slug: 'navigation' as any,
    locale,
  })
  
  const logoUrl = typeof navData?.brand?.logo === 'object' && navData.brand.logo?.url 
    ? navData.brand.logo.url 
    : '/reliance-logo2.png'

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Hero Header */}
      <section className="relative bg-reliance-navy pt-12 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-reliance-gold rounded-none -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-reliance-red rounded-none translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>

        <div className="container relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/${locale}/products`} className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-reliance-gold font-semibold">All Products</span>
          </div>

          <div className="max-w-3xl text-white space-y-4">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/15 border border-reliance-gold/30 px-3.5 py-1 text-reliance-gold text-xs font-bold uppercase tracking-wider">
              <Paintbrush className="w-3.5 h-3.5" />
              <span>Full Product Range ({sortedProducts.length} Products)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              All Reliance Paints & Coatings
            </h1>

            <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              Explore our complete range of premium exterior emulsions, luxury interior finishes, durable distempers, mirror-gloss enamels, and specialized wall primers — all engineered for Nepal’s climate.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog with Live Filters, Pagination and Quick-View Modal */}
      <section className="pt-10 pb-20">
        <AllProductsCatalogClient 
          products={sortedProducts} 
          categories={sortedCategories} 
          locale={locale} 
          logoUrl={logoUrl}
        />
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://reliancepaints.com'

  return {
    title: 'All Products Catalog | Reliance Paints Nepal',
    description: 'Explore the full catalog of all 16 Reliance Paints products including Double Dfence, Ultra Protec, Elega Luxury, Barpimo, Shangri-La, and high-performance primers.',
    openGraph: {
      title: 'All Products Catalog | Reliance Paints Nepal',
      description: 'Explore the full catalog of all 16 Reliance Paints products.',
      url: `${siteUrl}/${locale}/products/all`,
    },
  }
}
