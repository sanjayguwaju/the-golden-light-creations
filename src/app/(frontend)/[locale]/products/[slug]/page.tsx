import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import Link from 'next/link'
import { 
  ChevronRight, 
  Box, 
  Maximize, 
  Droplets, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Palette,  
  CheckCircle2,
  ArrowRight,
  Filter,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import { Media } from '@/components/Media'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { ProductDetailModal } from '@/components/ProductDetailModal'
import { CategoryDetailClient } from '@/components/CategoryDetailClient'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RelatedProducts } from '@/components/RelatedProducts'
import { isProductComingSoon, hasLoremIpsumRichText, sanitizePlaceholderText } from '@/utilities/productUtils'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
    slug: string
  }>
}

export default async function SmartProductPage({ params }: Args) {
  const { locale, slug } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Try to fetch as a product
  const productsData = await payload.find({
    collection: 'products' as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    locale,
  })

  if (productsData.docs.length > 0) {
    const product = productsData.docs[0]

    // Fetch related products with fallback logic
    let relatedProducts = product.relatedProducts || []

    if (relatedProducts.length === 0 && product.category) {
      const fallbackRes = await payload.find({
        collection: 'products' as any,
        where: {
          and: [
            { category: { equals: typeof product.category === 'object' ? product.category.id : product.category } },
            { id: { not_equals: product.id } },
          ],
        },
        limit: 4,
        locale,
      })
      relatedProducts = fallbackRes.docs
    }

    // Fetch shades linked to this product from colors collection
    const shadesRes = await payload.find({
      collection: 'colors',
      where: {
        relatedProducts: {
          contains: product.id,
        },
      },
      limit: 1200,
      depth: 0,
      locale,
    })

    const sortedShades = [...shadesRes.docs].sort((a: any, b: any) => {
      const codeA = a.shadeCode || a.colorId || a.name || ''
      const codeB = b.shadeCode || b.colorId || b.name || ''
      return codeA.localeCompare(codeB, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    })

    return <ProductDetail product={product} relatedProducts={relatedProducts} availableShades={sortedShades} locale={locale} />
  }

  // 2. Try to fetch as a subcategory
  const subcategoriesData = await payload.find({
    collection: 'product-subcategories' as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1, // Ensure parentCategory is populated for breadcrumbs
    limit: 1,
    locale,
  })

  if (subcategoriesData.docs.length > 0) {
    const subcategory = subcategoriesData.docs[0]
    
    // Fetch products in this subcategory
    const subcategoryProducts = await payload.find({
      collection: 'products' as any,
      where: { subcategory: { equals: subcategory.id } },
      depth: 1,
      limit: 100,
      locale,
    })

    const sortedProducts = subcategoryProducts.docs.sort((a: any, b: any) => {
      const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
      const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
      return aOrder - bOrder;
    })

    return <CategoryDetail category={subcategory} products={sortedProducts} />
  }

  // 3. Try to fetch as a category
  const categoriesData = await payload.find({
    collection: 'product-categories' as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    locale,
  })

  if (categoriesData.docs.length > 0) {
    const category = categoriesData.docs[0]
    
    // Fetch subcategories
    const categorySubcategories = await payload.find({
      collection: 'product-subcategories' as any,
      where: { parentCategory: { equals: category.id } },
      depth: 1,
      limit: 100,
      locale,
    })

    const sortedSubcategories = categorySubcategories.docs.sort((a: any, b: any) => {
      const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
      const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
      return aOrder - bOrder;
    })

    // Fetch products in this category
    const categoryProducts = await payload.find({
      collection: 'products' as any,
      where: { category: { equals: category.id } },
      depth: 1,
      limit: 100,
      locale,
    })

    const sortedProducts = categoryProducts.docs.sort((a: any, b: any) => {
      const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
      const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
      return aOrder - bOrder;
    })

    return <CategoryDetail category={category} subcategories={sortedSubcategories} products={sortedProducts} />
  }

  // 4. Not found
  notFound()
}

function ProductDetail({ product, relatedProducts, availableShades = [], locale }: { product: any, relatedProducts: any[], availableShades?: any[], locale: string }) {
  const category = typeof product.category === 'object' ? product.category : null
  const subcategory = typeof product.subcategory === 'object' ? product.subcategory : null
  const isComingSoon = isProductComingSoon(product)
  const isDescLorem = hasLoremIpsumRichText(product.description)
  const imageUrl = product.images?.[0]?.image && typeof product.images[0].image !== 'string'
    ? product.images[0].image.url
    : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.tagline,
    image: imageUrl,
    brand: { '@type': 'Brand', name: 'Reliance Paints' },
    ...(category ? { category: category.title } : {}),
    offers: {
      '@type': 'Offer',
      availability: isComingSoon ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
      priceCurrency: 'NPR',
      seller: { '@type': 'Organization', name: 'Reliance Paints' },
    },
  }

  const validFeatures = (product.keyFeatures || []).filter((item: any) => {
    const feat = typeof item === 'string' ? item : item?.feature || ''
    return feat && !feat.toLowerCase().includes('lorem ipsum')
  })

  // Sanitized specs
  const basicComposition = sanitizePlaceholderText(product.basicComposition)
  const paintFilmProperties = sanitizePlaceholderText(product.paintFilmProperties)
  const finish = sanitizePlaceholderText(product.finish)
  const appearance = sanitizePlaceholderText(product.appearance)
  const specificGravity = sanitizePlaceholderText(product.specificGravity)
  const viscosity = sanitizePlaceholderText(product.viscosity)
  const scrubResistance = sanitizePlaceholderText(product.scrubResistance)
  const volumeSolids = sanitizePlaceholderText(product.volumeSolids)
  const dft = sanitizePlaceholderText(product.dft)
  const thinner = sanitizePlaceholderText(product.thinner)
  const thinningRatio = sanitizePlaceholderText(product.thinningRatio)
  const durability = sanitizePlaceholderText(product.durability)
  const sheenLevel = sanitizePlaceholderText(product.sheenLevel)
  const shelfLife = sanitizePlaceholderText(product.shelfLife)

  const hasAnySpec = Boolean(
    basicComposition ||
    paintFilmProperties ||
    finish ||
    appearance ||
    specificGravity ||
    viscosity ||
    scrubResistance ||
    volumeSolids ||
    dft ||
    thinner ||
    thinningRatio ||
    durability ||
    sheenLevel ||
    shelfLife
  )

  const surfacePreparationNew = sanitizePlaceholderText(product.surfacePreparationNew)
  const surfacePreparationOld = sanitizePlaceholderText(product.surfacePreparationOld)
  const hasDirections = Boolean(surfacePreparationNew || surfacePreparationOld || thinningRatio)

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href={`/${locale}`} className="hover:text-reliance-navy transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/${locale}/products`} className="hover:text-reliance-navy transition-colors">
              Products
            </Link>
            {category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/${locale}/products/${category.slug}`} className="hover:text-reliance-navy transition-colors">
                  {category.title}
                </Link>
              </>
            )}
            {subcategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/${locale}/products/${subcategory.slug}`} className="hover:text-reliance-navy transition-colors">
                  {subcategory.title}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-reliance-navy font-bold truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-square bg-slate-50/50 rounded-none overflow-hidden border border-slate-100 relative">
                {product.images?.[0]?.image && typeof product.images[0].image !== 'string' ? (
                  <Media 
                    resource={product.images[0].image}
                    fill
                    pictureClassName="w-full h-full block p-4"
                    imgClassName="object-contain mix-blend-multiply brightness-105 contrast-105"
                  />
                ) : (
                  <div className="text-slate-400 flex flex-col items-center justify-center w-full h-full p-8 text-center space-y-3">
                    <Box className="w-16 h-16 text-slate-300 stroke-[1.5]" />
                    <span className="text-sm font-semibold">Reliance Premium Paint</span>
                  </div>
                )}

                {/* Coming Soon floating badge on image */}
                {isComingSoon && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-950" />
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {category && (
                    <Badge className="bg-reliance-gold/10 text-reliance-gold hover:bg-reliance-gold/20 border-0 rounded-none px-4 py-1">
                      {category.title}
                    </Badge>
                  )}
                  {isComingSoon && (
                    <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border border-amber-500/30 rounded-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Coming Soon / Under Formulation</span>
                    </Badge>
                  )}
                  {product.isWarrantyAvailable && (product.warranty || product.durability) && (
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 border-0 rounded-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{product.warranty || product.durability}</span>
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-reliance-navy mb-4 leading-tight">
                  {product.title}
                </h1>
                {product.tagline && !product.tagline.toLowerCase().includes('lorem ipsum') && (
                  <p className="text-reliance-gold text-xl font-medium italic">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* Description or Coming Soon Banner */}
              {isComingSoon && (!product.description || isDescLorem) ? (
                <div className="bg-amber-50/70 border border-amber-200/90 p-6 rounded-none space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    New Product Formulation
                  </div>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                    This premium paint formulation is currently in preparation by the Reliance Paints technical laboratory. Detailed product literature, coverage guides, and retail availability will be announced soon.
                  </p>
                </div>
              ) : product.description ? (
                <div className="prose prose-slate max-w-none mb-10">
                  <RichText data={product.description} />
                </div>
              ) : null}

              {/* Key Features */}
              {validFeatures.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {validFeatures.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-page-bg/50 p-3 rounded-none border-0">
                      <CheckCircle2 className="w-5 h-5 text-reliance-gold shrink-0" />
                      <span className="text-sm font-medium text-reliance-navy">{typeof item === 'string' ? item : item.feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-0">
                 {isComingSoon ? (
                   <>
                     <Link 
                       href={`/${locale}/contact-us?inquiry=product&item=${product.slug}`}
                       className="px-8 py-4 bg-reliance-navy text-white rounded-none font-bold hover:bg-reliance-gold hover:text-reliance-navy transition-all flex items-center gap-2 text-center"
                     >
                       Inquire Availability
                       <ArrowRight className="w-4 h-4" />
                     </Link>
                     <Link 
                       href={`/${locale}/store-locator`}
                       className="px-8 py-4 border border-reliance-navy/20 text-reliance-navy rounded-none font-bold hover:bg-reliance-navy/5 transition-all text-center"
                     >
                       Locate Dealers
                     </Link>
                   </>
                 ) : (
                   <>
                     <Link 
                       href={`/${locale}/store-locator`}
                       className="px-8 py-4 bg-reliance-navy text-white rounded-none font-bold hover:bg-reliance-navy/90 transition-all flex items-center gap-2 text-center"
                     >
                       Locate Store
                       <ArrowRight className="w-4 h-4" />
                     </Link>
                     <Link 
                       href={`/${locale}/calculator?product=${product.slug}`}
                       className="px-8 py-4 border-0 text-reliance-navy rounded-none font-bold hover:bg-reliance-navy/5 transition-all text-center"
                     >
                       Calculate Paint
                     </Link>
                   </>
                 )}
              </div>
            </div>
          </div>

          {/* Specifications, Directions & Colours Tabs */}
          <div className="max-w-4xl">
            <Separator className="my-12" />
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="flex flex-wrap justify-start w-full border-b border-slate-200 bg-transparent p-0 rounded-none h-auto gap-6 sm:gap-8 mb-8">
                <TabsTrigger 
                  value="specs" 
                  className="pb-4 pt-0 px-0 bg-transparent text-base sm:text-lg font-bold text-reliance-navy/40 data-[state=active]:text-reliance-navy data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-reliance-gold rounded-none transition-all cursor-pointer"
                >
                  Technical Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="directions" 
                  className="pb-4 pt-0 px-0 bg-transparent text-base sm:text-lg font-bold text-reliance-navy/40 data-[state=active]:text-reliance-navy data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-reliance-gold rounded-none transition-all cursor-pointer"
                >
                  Directions for Use
                </TabsTrigger>
                <TabsTrigger 
                  value="colours" 
                  className="pb-4 pt-0 px-0 bg-transparent text-base sm:text-lg font-bold text-reliance-navy/40 data-[state=active]:text-reliance-navy data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-reliance-gold rounded-none transition-all cursor-pointer"
                >
                  Available Colours
                </TabsTrigger>
              </TabsList>

              {/* 1. TECHNICAL SPECIFICATIONS TAB */}
              <TabsContent value="specs" className="mt-0 outline-none space-y-10">
                {/* Key Metric Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {/* Pack Sizes */}
                  {product.packSizes && product.packSizes.length > 0 && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-page-bg rounded-none text-reliance-gold shrink-0">
                        <Box className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-reliance-navy mb-1">Pack Sizes</h4>
                        <p className="text-reliance-grey text-sm md:text-base leading-relaxed">
                          {product.packSizes.map((size: any) => size.size).join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Coverage */}
                  {product.coverage && !product.coverage.toLowerCase().includes('lorem ipsum') && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-page-bg rounded-none text-reliance-gold shrink-0">
                        <Maximize className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-reliance-navy mb-1">Theoretical Coverage</h4>
                        <p className="text-reliance-grey text-sm md:text-base leading-relaxed">{product.coverage}</p>
                      </div>
                    </div>
                  )}

                  {/* Application Method */}
                  {product.applicationMethod && !product.applicationMethod.toLowerCase().includes('lorem ipsum') && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-page-bg rounded-none text-reliance-gold shrink-0">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-reliance-navy mb-1">Application Method</h4>
                        <p className="text-reliance-grey text-sm md:text-base leading-relaxed">{product.applicationMethod}</p>
                      </div>
                    </div>
                  )}

                  {/* Surface Compatibility */}
                  {product.surfaceCompatibility && !product.surfaceCompatibility.toLowerCase().includes('lorem ipsum') && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-page-bg rounded-none text-reliance-gold shrink-0">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-reliance-navy mb-1">Area of Application</h4>
                        <p className="text-reliance-grey text-sm md:text-base leading-relaxed">{product.surfaceCompatibility}</p>
                      </div>
                    </div>
                  )}

                  {/* Drying Time */}
                  {product.dryingTime && !product.dryingTime.toLowerCase().includes('lorem ipsum') && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-page-bg rounded-none text-reliance-gold shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-reliance-navy mb-1">Drying Time</h4>
                        <p className="text-reliance-grey text-sm md:text-base leading-relaxed">{product.dryingTime}</p>
                      </div>
                    </div>
                  )}

                  {/* Recommended Primer */}
                  {product.recommendedPrimer && !product.recommendedPrimer.toLowerCase().includes('lorem ipsum') && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-page-bg rounded-none text-reliance-gold shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-reliance-navy mb-1">Recommended Primer</h4>
                        <p className="text-reliance-grey text-sm md:text-base leading-relaxed">{product.recommendedPrimer}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Comprehensive Technical Details Table */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold text-reliance-navy uppercase tracking-wide">
                    Technical Specifications & Physical Properties
                  </h3>
                  {hasAnySpec ? (
                    <div className="border border-slate-200 overflow-hidden bg-white shadow-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                          <thead>
                            <tr className="bg-reliance-navy text-white text-xs uppercase tracking-wider font-semibold">
                              <th className="py-3.5 px-4 w-12 text-center border-r border-white/10">S.N.</th>
                              <th className="py-3.5 px-4 w-1/3 border-r border-white/10">Physical Properties</th>
                              <th className="py-3.5 px-4">Specification / Observation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 text-reliance-navy">
                            {basicComposition && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">1</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Basic Composition / Binder</td>
                                <td className="py-3 px-4 text-slate-700">{basicComposition}</td>
                              </tr>
                            )}
                            {paintFilmProperties && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">2</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Paint Film Properties</td>
                                <td className="py-3 px-4 text-slate-700">{paintFilmProperties}</td>
                              </tr>
                            )}
                            {finish && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">3</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Finish</td>
                                <td className="py-3 px-4 text-slate-700">{finish}</td>
                              </tr>
                            )}
                            {appearance && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">4</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Appearance or Consistency</td>
                                <td className="py-3 px-4 text-slate-700">{appearance}</td>
                              </tr>
                            )}
                            {specificGravity && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">5</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Specific Gravity</td>
                                <td className="py-3 px-4 text-slate-700 font-mono text-xs">{specificGravity}</td>
                              </tr>
                            )}
                            {viscosity && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">6</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Supplied Viscosity</td>
                                <td className="py-3 px-4 text-slate-700 font-mono text-xs">{viscosity}</td>
                              </tr>
                            )}
                            {scrubResistance && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">7</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Scrub Resistance</td>
                                <td className="py-3 px-4 text-slate-700 font-semibold text-emerald-700">{scrubResistance}</td>
                              </tr>
                            )}
                            {volumeSolids && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">8</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Volume Solids</td>
                                <td className="py-3 px-4 text-slate-700 font-mono text-xs">{volumeSolids}</td>
                              </tr>
                            )}
                            {dft && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">9</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">DFT min. for Coverage per Coat</td>
                                <td className="py-3 px-4 text-slate-700 font-mono text-xs">{dft}</td>
                              </tr>
                            )}
                            {thinner && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">10</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Thinner Recommended</td>
                                <td className="py-3 px-4 text-slate-700">{thinner}</td>
                              </tr>
                            )}
                            {thinningRatio && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">11</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Thinning Ratio</td>
                                <td className="py-3 px-4 text-slate-700 leading-relaxed">{thinningRatio}</td>
                              </tr>
                            )}
                            {product.isWarrantyAvailable && durability && (
                              <tr className="hover:bg-slate-50/75 transition-colors bg-emerald-50/40">
                                <td className="py-3 px-4 text-center font-mono text-xs text-emerald-700 font-bold border-r border-slate-200">12</td>
                                <td className="py-3 px-4 font-semibold text-emerald-900 border-r border-slate-200">Durability / Warranty Guarantee</td>
                                <td className="py-3 px-4 text-emerald-700 font-bold">{durability}</td>
                              </tr>
                            )}
                            {sheenLevel && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">13</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Sheen Level</td>
                                <td className="py-3 px-4 text-slate-700 font-mono text-xs">{sheenLevel}</td>
                              </tr>
                            )}
                            {shelfLife && (
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-xs text-reliance-grey border-r border-slate-200">14</td>
                                <td className="py-3 px-4 font-semibold border-r border-slate-200">Shelf Life</td>
                                <td className="py-3 px-4 text-slate-700">{shelfLife}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-slate-50 border border-slate-200 p-8 space-y-2">
                      <HelpCircle className="w-8 h-8 text-reliance-gold/70 mx-auto" />
                      <h4 className="font-bold text-reliance-navy text-sm uppercase tracking-wide">
                        Technical Bulletin Under Finalization
                      </h4>
                      <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Official laboratory tests, DFT parameters, and binder specifications will be published upon commercial distribution.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 2. DIRECTIONS FOR USE TAB */}
              <TabsContent value="directions" className="mt-0 outline-none space-y-8">
                {hasDirections ? (
                  <div className="space-y-6">
                    {surfacePreparationNew && (
                      <div className="bg-white border border-slate-200 p-6 shadow-xs space-y-2.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-reliance-gold/15 text-reliance-navy text-xs font-bold uppercase tracking-wider">
                          Step 1
                        </div>
                        <h4 className="text-lg font-bold text-reliance-navy">Surface Preparation for New Plaster</h4>
                        <p className="text-slate-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                          {surfacePreparationNew}
                        </p>
                      </div>
                    )}

                    {surfacePreparationOld && (
                      <div className="bg-white border border-slate-200 p-6 shadow-xs space-y-2.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-reliance-navy/10 text-reliance-navy text-xs font-bold uppercase tracking-wider">
                          Step 2
                        </div>
                        <h4 className="text-lg font-bold text-reliance-navy">Surface Preparation for Old / Previously Painted Plaster</h4>
                        <p className="text-slate-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                          {surfacePreparationOld}
                        </p>
                      </div>
                    )}

                    {thinningRatio && (
                      <div className="bg-[#FAF8F5] border border-reliance-navy/15 p-6 space-y-2">
                        <h4 className="text-sm font-bold text-reliance-navy uppercase tracking-wider">
                          Mixing & Thinning Instructions
                        </h4>
                        <p className="text-reliance-navy/80 text-sm leading-relaxed">
                          {thinningRatio}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white border border-slate-200 p-8 space-y-2">
                    <p className="text-reliance-grey">
                      Ensure the surface is dry, clean, free from dust, grease, and loose particles before paint application. Detailed step-by-step contractor guidelines will be provided with product release.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* 3. AVAILABLE COLOURS TAB */}
              <TabsContent value="colours" className="mt-0 outline-none space-y-6">
                {availableShades && availableShades.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <h4 className="font-bold text-reliance-navy text-base">
                          {availableShades.length} Verified Factory Shade{availableShades.length > 1 ? 's' : ''} Available
                        </h4>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Formulated to exact Reliance Paints machine standards for {product.title}.
                        </p>
                      </div>
                      <Link
                        href={`/${locale}/colors`}
                        className="text-xs font-bold text-reliance-navy hover:text-reliance-gold inline-flex items-center gap-1 transition-colors"
                      >
                        Explore All Palette Shades →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 max-h-[460px] overflow-y-auto pr-1">
                      {availableShades.map((colour: any) => (
                        <div
                          key={colour.id}
                          className="group relative flex flex-col items-center gap-2 bg-white p-3 rounded-none border border-slate-200 shadow-xs hover:border-reliance-navy transition-all"
                        >
                          <div
                            className="w-full aspect-4/3 rounded-none border border-slate-200 shadow-inner group-hover:scale-102 transition-transform"
                            style={{
                              backgroundColor: colour.hexCode || "#0D1B3E",
                            }}
                            title={`${colour.name} (${colour.colorId || colour.hexCode})`}
                          />
                          <div className="w-full text-center space-y-0.5">
                            <p className="text-xs font-bold text-reliance-navy truncate">{colour.colorId || colour.name}</p>
                            <p className="font-mono text-[10px] text-reliance-navy/60 uppercase">{colour.hexCode}</p>
                          </div>
                          <Link
                            href={`/${locale}/visualiser?color=${encodeURIComponent(colour.slug || colour.name)}&hex=${encodeURIComponent(colour.hexCode)}&code=${encodeURIComponent(colour.colorId || "")}`}
                            className="w-full mt-1 text-[10px] font-bold text-center py-1 bg-slate-50 hover:bg-reliance-gold hover:text-reliance-navy text-slate-700 transition-colors uppercase tracking-wider block"
                          >
                            Try in Room
                          </Link>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-reliance-gold/10 border border-reliance-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-reliance-navy text-sm uppercase">Explore in 3D Visualizer</h4>
                        <p className="text-slate-600 text-xs mt-0.5">Test any of these shades on real room walls before painting.</p>
                      </div>
                      <Link
                        href={`/${locale}/visualiser`}
                        className="px-5 py-2.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-reliance-gold hover:text-reliance-navy transition-all shrink-0"
                      >
                        Launch Visualizer
                      </Link>
                    </div>
                  </div>
                ) : product.availableColours && product.availableColours.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
                      {product.availableColours.map((colour: any, i: number) => (
                        <div key={i} className="flex flex-col items-center gap-2.5 bg-white p-3.5 sm:p-4 rounded-none border border-slate-200 shadow-xs hover:border-reliance-navy transition-all">
                          <div
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-none border border-slate-300 shadow-inner"
                            style={{
                              backgroundColor: colour.color || "#0D1B3E",
                            }}
                            title={colour.name}
                          />
                          <span className="text-xs font-bold text-reliance-navy text-center line-clamp-2">{colour.name}</span>
                          {colour.color && (
                            <span className="font-mono text-[10px] text-reliance-navy/60 uppercase">{colour.color}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-reliance-gold/10 border border-reliance-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-reliance-navy text-sm uppercase">Looking for custom tinting?</h4>
                        <p className="text-slate-600 text-xs mt-0.5">Over 2,000+ custom shades can be tinted on-demand at any Reliance Color Studio.</p>
                      </div>
                      <Link
                        href={`/${locale}/colors`}
                        className="px-5 py-2.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-reliance-gold hover:text-reliance-navy transition-all shrink-0"
                      >
                        Explore Color Palette
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white border border-slate-200 p-8 space-y-3">
                    <Palette className="w-10 h-10 text-reliance-gold/60 mx-auto" />
                    <h4 className="font-bold text-reliance-navy text-base">Shade Spectrum In Progress</h4>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      This range will support custom tinting from Reliance Paints extensive color library across pastels, accents, and deep shades.
                    </p>
                    <Link
                      href={`/${locale}/colors`}
                      className="inline-block mt-2 px-6 py-2.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-reliance-gold hover:text-reliance-navy transition-all"
                    >
                      Browse Color Library
                    </Link>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  )
}

function CategoryDetail({ category, subcategories, products }: { category: any, subcategories?: any[], products: any[] }) {
  return <CategoryDetailClient category={category} subcategories={subcategories} products={products} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const payload = await getPayload({ config: configPromise })
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://reliancepaints.com'

  const product = await payload.find({
    collection: 'products' as any,
    where: { slug: { equals: slug } },
    depth: 1,
    locale,
  })

  if (product.docs[0]) {
    const p = product.docs[0]
    const imageUrl = p.images?.[0]?.image && typeof p.images[0].image !== 'string'
      ? (p.images[0].image as any).url
      : `${siteUrl}/og-image.png`
    const title = `${p.title} | Reliance Paints`
    const description = p.tagline || `Buy ${p.title} from Reliance Paints Nepal.`
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        siteName: 'Reliance Paints',
        images: [{ url: imageUrl, width: 1200, height: 630, alt: p.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    }
  }

  const subcategory = await payload.find({
    collection: 'product-subcategories' as any,
    where: { slug: { equals: slug } },
    locale,
  })

  if (subcategory.docs[0]) {
    const s = subcategory.docs[0]
    const title = `${s.title} | Reliance Paints`
    return {
      title,
      description: s.description,
      openGraph: { title, description: s.description, type: 'website', siteName: 'Reliance Paints' },
      twitter: { card: 'summary_large_image', title },
    }
  }

  const category = await payload.find({
    collection: 'product-categories' as any,
    where: { slug: { equals: slug } },
    locale,
  })

  if (category.docs[0]) {
    const c = category.docs[0]
    const title = `${c.title} | Reliance Paints`
    return {
      title,
      description: c.description,
      openGraph: { title, description: c.description, type: 'website', siteName: 'Reliance Paints' },
      twitter: { card: 'summary_large_image', title },
    }
  }

  return { title: 'Product Not Found' }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const [products, categories, subcategories] = await Promise.all([
    payload.find({
      collection: 'products' as any,
      limit: 1000,
      select: { slug: true },
      depth: 0,
    }),
    payload.find({
      collection: 'product-categories' as any,
      limit: 1000,
      select: { slug: true },
      depth: 0,
    }),
    payload.find({
      collection: 'product-subcategories' as any,
      limit: 1000,
      select: { slug: true },
      depth: 0,
    }),
  ])

  const productSlugs = products.docs.map((doc) => ({ slug: doc.slug })).filter((item) => Boolean(item.slug))
  const categorySlugs = categories.docs.map((doc) => ({ slug: doc.slug })).filter((item) => Boolean(item.slug))
  const subcategorySlugs = subcategories.docs.map((doc) => ({ slug: doc.slug })).filter((item) => Boolean(item.slug))

  return [...productSlugs, ...categorySlugs, ...subcategorySlugs]
}

