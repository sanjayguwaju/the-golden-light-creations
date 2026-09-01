"use client"

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  Box, 
  Maximize, 
  ShieldCheck, 
  CheckCircle2,
  X,
  Clock,
  ArrowRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { createPortal } from 'react-dom'
import { Badge } from '@/components/ui/badge'
import { isProductComingSoon, sanitizePlaceholderText } from '@/utilities/productUtils'
import { ComparisonTable } from '@/components/home/ComparisonTable'

export type AllProductsCatalogClientProps = {
  products: any[]
  categories: any[]
  locale: string
  logoUrl?: string
}

export function AllProductsCatalogClient({
  products = [],
  categories = [],
  locale = 'en',
  logoUrl = '/reliance-logo2.png'
}: AllProductsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'coming_soon'>('all')
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc' | 'warranty-desc'>('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [compareList, setCompareList] = useState<any[]>([])
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)
  const gridTopRef = useRef<HTMLDivElement>(null)

  const toggleCompare = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(prev => prev.filter(p => p.id !== product.id))
    } else {
      if (compareList.length >= 3) {
        toast.error('You can only compare up to 3 products at a time.')
        return
      }
      setCompareList(prev => [...prev, product])
    }
  }

  // Reset pagination when search or category filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategorySlug, statusFilter, sortBy, itemsPerPage])

  // Robust helper to match a product to a category
  const doesProductMatchCategory = (product: any, category: any) => {
    if (!product?.category || !category) return false
    const pCat = product.category
    const pCatSlug = typeof pCat === 'object' ? pCat?.slug : null
    const pCatId = typeof pCat === 'object' ? pCat?.id : pCat
    return (
      (pCatSlug && pCatSlug === category.slug) ||
      (pCatId && pCatId === category.id) ||
      (pCatId && pCatId === category.slug) ||
      (pCatSlug && pCatSlug === category.id)
    )
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products]

    // 1. Filter by category
    if (selectedCategorySlug !== 'all') {
      const selectedCategory = categories.find(
        (c) => c.slug === selectedCategorySlug || c.id === selectedCategorySlug
      )
      list = list.filter((p) => {
        if (selectedCategory) {
          return doesProductMatchCategory(p, selectedCategory)
        }
        const pCatSlug = typeof p.category === 'object' ? p.category?.slug : p.category
        return pCatSlug === selectedCategorySlug
      })
    }

    // 2. Filter by status (available vs coming soon)
    if (statusFilter === 'available') {
      list = list.filter((p) => !isProductComingSoon(p))
    } else if (statusFilter === 'coming_soon') {
      list = list.filter((p) => isProductComingSoon(p))
    }

    // 3. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(q)
        const taglineMatch = p.tagline?.toLowerCase().includes(q)
        const featuresMatch = p.keyFeatures?.some((f: any) => 
          (typeof f === 'string' ? f : f.feature)?.toLowerCase().includes(q)
        )
        const finishMatch = p.finish?.toLowerCase().includes(q)
        const compMatch = p.basicComposition?.toLowerCase().includes(q)
        return titleMatch || taglineMatch || featuresMatch || finishMatch || compMatch
      })
    }

    // 4. Sorting
    list.sort((a, b) => {
      if (sortBy === 'name-asc') {
        return (a.title || '').localeCompare(b.title || '')
      }
      if (sortBy === 'name-desc') {
        return (b.title || '').localeCompare(a.title || '')
      }
      if (sortBy === 'warranty-desc') {
        const extractYears = (p: any) => {
          const str = (p.durability || p.warranty || '')
          const m = str.match(/(\d+)/)
          return m ? parseInt(m[1], 10) : 0
        }
        return extractYears(b) - extractYears(a)
      }
      return 0
    })

    return list
  }, [products, categories, selectedCategorySlug, statusFilter, searchQuery, sortBy])

  // Pagination calculation
  const totalItems = filteredProducts.length
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Scroll to top of grid when page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14" ref={gridTopRef}>
      {/* Search & Filter Header Container */}
      <div className="container mb-8">
        <div className="bg-white border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
          {/* Top Row: Search Input + Sorting Dropdown */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search paints by name, application, composition, or finish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-none text-xs sm:text-sm text-reliance-navy placeholder:text-slate-400 focus:outline-hidden focus:border-reliance-navy focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Controls: Items per page + Sorting */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="hidden sm:inline font-medium">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 py-2 px-3 text-xs font-semibold text-reliance-navy rounded-none focus:outline-hidden focus:border-reliance-navy cursor-pointer"
                >
                  <option value={8}>8 / page</option>
                  <option value={12}>12 / page</option>
                  <option value={16}>16 / page</option>
                  <option value={24}>24 / page</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <SlidersHorizontal className="w-3.5 h-3.5 text-reliance-navy hidden sm:inline" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 py-2 px-3 text-xs font-semibold text-reliance-navy rounded-none focus:outline-hidden focus:border-reliance-navy cursor-pointer"
                >
                  <option value="featured">Featured Order</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="warranty-desc">Highest Warranty</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-100 scrollbar-none">
            <button
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 rounded-none cursor-pointer ${
                selectedCategorySlug === 'all'
                  ? 'bg-reliance-navy text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((cat) => {
              const isSelected = selectedCategorySlug === cat.slug
              const count = products.filter((p) => doesProductMatchCategory(p, cat)).length
              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 rounded-none cursor-pointer ${
                    isSelected
                      ? 'bg-reliance-navy text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.title} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        {currentProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 p-8 space-y-4">
            <Filter className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-reliance-navy">No products match your criteria</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Try adjusting your search terms or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategorySlug('all')
                setStatusFilter('all')
              }}
              className="px-6 py-2.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-reliance-gold hover:text-reliance-navy transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {currentProducts.map((product) => {
              const image = product.images?.[0]?.image
              const categoryTitle = product.category?.title || 'Paint'
              const isComingSoon = isProductComingSoon(product)
              const warrantyText = product.isWarrantyAvailable ? (product.warranty || product.durability) : null

              const cleanTagline = sanitizePlaceholderText(product.tagline)
              const cleanFeatures = (product.keyFeatures || []).filter((item: any) => {
                const feat = typeof item === 'string' ? item : item?.feature || ''
                return feat && !feat.toLowerCase().includes('lorem ipsum')
              })

              return (
                <div
                  key={product.id || product.slug}
                  className="group flex flex-col bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-reliance-navy/30 transition-all duration-300"
                >
                  {/* Top Image Container linking directly to Product Specs */}
                  <Link
                    href={`/${locale}/products/${product.slug}`}
                    className="relative h-64 bg-linear-to-b from-slate-50 to-slate-100/60 p-6 flex items-center justify-center overflow-hidden cursor-pointer block"
                  >
                    {/* Top Badges Strip - Collision-Proof & Fully Responsive */}
                    <div className="absolute top-0 inset-x-0 p-2.5 sm:p-3 flex flex-wrap items-start justify-between gap-2 z-10 pointer-events-none">
                      {/* Left: Category and Warranty badges */}
                      <div className="flex flex-col items-start gap-1 min-w-0 max-w-[62%] sm:max-w-[65%]">
                        <span 
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-reliance-navy text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs truncate max-w-full block"
                          title={categoryTitle}
                        >
                          {categoryTitle}
                        </span>
                        {warrantyText && (
                          <span className="px-2 py-0.5 bg-reliance-gold text-reliance-navy text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs shrink-0 truncate max-w-full block">
                            {warrantyText.split(' ')[0]} {warrantyText.split(' ')[1] || 'Warranty'}
                          </span>
                        )}
                      </div>

                      {/* Right: Coming Soon Badge */}
                      {isComingSoon && (
                        <div className="shrink-0">
                          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs flex items-center gap-1 shrink-0 whitespace-nowrap">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-950 shrink-0" />
                            <span>Coming Soon</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Image */}
                    {image && typeof image === 'object' && image.url ? (
                      <img
                        src={image.url}
                        alt={image.alt || product.title}
                        className="max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-32 h-44 bg-slate-200/80 border border-dashed border-slate-300 flex flex-col items-center justify-center p-3 text-center text-slate-400">
                        <Box className="w-8 h-8 mb-1 text-slate-400" />
                        <span className="text-[11px] font-semibold">Reliance Product</span>
                      </div>
                    )}
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <Link href={`/${locale}/products/${product.slug}`} className="block">
                        <h3 className="font-bold text-reliance-navy text-lg group-hover:text-reliance-gold transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                      </Link>
                      {cleanTagline ? (
                        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-medium">
                          {cleanTagline}
                        </p>
                      ) : isComingSoon ? (
                        <p className="text-amber-800 text-xs line-clamp-2 leading-relaxed font-medium italic">
                          Premium formulation in progress
                        </p>
                      ) : null}

                      {/* Key features bullets */}
                      {cleanFeatures.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          {cleanFeatures.slice(0, 2).map((item: any, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-reliance-gold shrink-0" />
                              <span className="line-clamp-1">{typeof item === 'string' ? item : item.feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Meta Specs */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        {product.packSizes && product.packSizes.length > 0 && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Box className="w-3.5 h-3.5 text-reliance-gold shrink-0" />
                            <span className="truncate">{product.packSizes.map((s: any) => s.size).join(', ')}</span>
                          </div>
                        )}
                        {product.coverage && !product.coverage.toLowerCase().includes('lorem ipsum') && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Maximize className="w-3.5 h-3.5 text-reliance-gold shrink-0" />
                            <span className="truncate" title={product.coverage}>{product.coverage.split('(')[0]}</span>
                          </div>
                        )}
                      </div>

                      {/* Single Primary Card Action */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                        {!isComingSoon ? (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => toggleCompare(product, e)}
                              className={`flex items-center justify-center w-5 h-5 border transition-colors ${compareList.find(p => p.id === product.id) ? 'border-emerald-500' : 'border-slate-300'}`}
                            >
                              {compareList.find(p => p.id === product.id) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />}
                            </button>
                            
                            {compareList.find(p => p.id === product.id) && compareList.length > 1 ? (
                              <button 
                                onClick={() => setIsCompareModalOpen(true)}
                                className="text-sm text-emerald-500 font-medium hover:underline"
                              >
                                See compared ({compareList.length})
                              </button>
                            ) : (
                              <span className="text-sm text-slate-600 font-medium cursor-pointer select-none" onClick={(e) => toggleCompare(product, e)}>
                                Compare {compareList.length > 0 && !compareList.find(p => p.id === product.id) ? `(${compareList.length})` : ''}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-amber-600 font-medium italic">Available Soon</span>
                        )}

                        <Link 
                          href={`/${locale}/products/${product.slug}`} 
                          className={`w-10 h-10 flex items-center justify-center transition-colors ${isComingSoon ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600'}`}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-reliance-navy">{startIndex + 1}–{endIndex}</span> of <span className="font-bold text-reliance-navy">{totalItems}</span> products
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3.5 py-2 border border-slate-200 bg-white text-reliance-navy text-xs font-bold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer rounded-none"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 text-xs font-bold transition-all rounded-none cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-reliance-navy text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-reliance-navy hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3.5 py-2 border border-slate-200 bg-white text-reliance-navy text-xs font-bold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer rounded-none"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Compare Modal Overlay */}
      {isCompareModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] my-auto relative shadow-2xl flex flex-col rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex-none bg-white border-b border-slate-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm rounded-t-xl z-10">
              <button 
                onClick={() => setIsCompareModalOpen(false)} 
                className="flex items-center gap-1.5 text-slate-500 hover:text-reliance-navy font-medium text-sm transition-colors"
                aria-label="Back to products"
              >
                <ChevronLeft className="w-4 h-4" /> Back to products
              </button>
              <div className="flex items-center">
                <button 
                  onClick={() => setIsCompareModalOpen(false)} 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="Close Comparison"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full overflow-y-auto flex-1 bg-white">
              <ComparisonTable 
                title="Compare Products" 
                subheading="" 
                products={compareList} 
                isModal={true}
                onRemoveProduct={(id) => {
                  setCompareList(prev => prev.filter(p => p.id !== id))
                  if (compareList.length <= 2) {
                    setIsCompareModalOpen(false) // Close modal if less than 2 left
                  }
                }}
                logoUrl={logoUrl}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
