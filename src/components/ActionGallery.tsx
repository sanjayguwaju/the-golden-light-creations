'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Palette,
  Eye,
  Calculator,
  Search,
  Sparkles,
  Layers,
  Filter,
} from 'lucide-react'

export type InspirationImage = {
  id: string
  title: string
  description?: string
  image: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  featuredColour: {
    id: string
    name: string
    hexCode: string
    slug: string
    colorCode?: string
    colorFamily?: string
  }
  roomType?: string
  styleTags?: string[]
  secondaryColours?: {
    id: string
    name: string
    hexCode: string
    slug: string
    colorCode?: string
  }[]
  productRecommendation?: {
    title: string
    slug: string
  }
}

interface ActionGalleryProps {
  images: InspirationImage[]
  showFilters?: boolean
  initialRoomFilter?: string
}

const ROOM_OPTIONS = [
  { label: 'All Spaces', value: 'all' },
  { label: 'Living Room', value: 'living-room' },
  { label: 'Bedroom', value: 'bedroom' },
  { label: 'Kitchen', value: 'kitchen' },
  { label: 'Dining Room', value: 'dining-room' },
  { label: 'Exterior', value: 'exterior' },
  { label: 'Bathroom', value: 'bathroom' },
  { label: 'Office', value: 'office' },
]

export function ActionGallery({
  images,
  showFilters = true,
  initialRoomFilter = 'all',
}: ActionGalleryProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>(initialRoomFilter)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const modalBackdropRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)

  // Filtered images list
  const filteredImages = useMemo(() => {
    return images.filter((item) => {
      if (!item.image?.url || !item.featuredColour?.hexCode) return false

      const matchesRoom =
        selectedRoom === 'all' ||
        item.roomType?.toLowerCase() === selectedRoom.toLowerCase() ||
        (selectedRoom === 'exterior' && item.roomType?.includes('exterior')) ||
        (selectedRoom === 'living-room' && item.roomType?.includes('living'))

      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.featuredColour.name.toLowerCase().includes(q) ||
        item.featuredColour.hexCode.toLowerCase().includes(q) ||
        item.roomType?.toLowerCase().includes(q) ||
        item.styleTags?.some((t) => t.toLowerCase().includes(q))

      return matchesRoom && matchesSearch
    })
  }, [images, selectedRoom, searchQuery])

  const currentImage = selectedIndex !== null ? filteredImages[selectedIndex] : null

  // Next / Previous navigation
  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredImages.length <= 1) return prev
      return prev === 0 ? filteredImages.length - 1 : prev - 1
    })
  }, [filteredImages.length])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredImages.length <= 1) return prev
      return prev === filteredImages.length - 1 ? 0 : prev + 1
    })
  }, [filteredImages.length])

  const closeModal = useCallback(() => {
    if (modalBackdropRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        scale: 0.94,
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: 'power2.in',
      })
      gsap.to(modalBackdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedIndex(null)
        },
      })
    } else {
      setSelectedIndex(null)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, closeModal, handlePrev, handleNext])

  // Animate modal & lock body scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
      if (modalBackdropRef.current && modalContentRef.current) {
        gsap.set(modalBackdropRef.current, { display: 'flex', opacity: 0 })
        gsap.set(modalContentRef.current, { scale: 0.94, opacity: 0, y: 20 })

        gsap.to(modalBackdropRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        })
        gsap.to(modalContentRef.current, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'back.out(1.1)',
        })
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  if (!images || images.length === 0) return null

  return (
    <div className="w-full">
      {/* Interactive Filter & Search Suite */}
      {showFilters && (
        <div className="mb-10 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Room Type Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {ROOM_OPTIONS.map((opt) => {
                const isActive = selectedRoom === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSelectedRoom(opt.value)
                      setSelectedIndex(null)
                    }}
                    className={`whitespace-nowrap px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                      isActive
                        ? 'bg-reliance-navy text-white border-reliance-navy shadow-md shadow-reliance-navy/10'
                        : 'bg-white text-reliance-navy/80 border-reliance-navy/15 hover:border-reliance-navy hover:text-reliance-navy'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-reliance-navy/40" />
              <input
                type="text"
                placeholder="Search color or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-white border border-reliance-navy/20 focus:border-reliance-navy focus:outline-none placeholder:text-reliance-navy/40 text-reliance-navy"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-reliance-navy/50 hover:text-reliance-navy"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results count & active query pill */}
          <div className="flex items-center justify-between text-xs text-reliance-navy/60">
            <span>
              Showing <strong className="text-reliance-navy">{filteredImages.length}</strong> spaces
            </span>
            {(selectedRoom !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedRoom('all')
                  setSearchQuery('')
                }}
                className="text-reliance-red font-semibold hover:underline"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Masonry / Grid Display */}
      {filteredImages.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((item, idx) => {
            const featured = item.featuredColour

            return (
              <div
                key={item.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className="relative group overflow-hidden cursor-pointer break-inside-avoid border border-reliance-navy/15 bg-[#F5F2ED] transition-all duration-300 hover:border-reliance-navy hover:shadow-xl"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedIndex(idx)
                  }
                }}
                aria-label={`View details for ${item.title}`}
              >
                {/* Photo */}
                <div className="relative overflow-hidden bg-slate-100">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                    width={item.image.width || 900}
                    height={item.image.height || 650}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    {item.roomType && (
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-reliance-navy text-[11px] font-bold uppercase tracking-wider border border-reliance-navy/10 shadow-xs">
                        {item.roomType.replace('-', ' ')}
                      </span>
                    )}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2.5 py-1 bg-reliance-navy text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3 h-3 text-reliance-gold" />
                      View Room Details
                    </span>
                  </div>

                  {/* Bottom Hover Overlay with Color Info */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="w-full flex flex-col gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white/90 text-sm font-semibold tracking-wide drop-shadow-xs">
                        {item.title}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-white/20">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-5 h-5 rounded-full border-2 border-white shadow-xs inline-block shrink-0"
                            style={{ backgroundColor: featured.hexCode }}
                          />
                          <span className="text-white text-xs font-bold font-sans tracking-wide">
                            {featured.name}
                          </span>
                        </div>
                        <span className="text-white/70 font-mono text-[10px] uppercase">
                          {featured.hexCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-reliance-navy/20 bg-white p-8">
          <Palette className="w-12 h-12 text-reliance-navy/30 mx-auto mb-3" />
          <h3 className="text-xl font-display uppercase tracking-tight text-reliance-navy mb-2">
            No Inspiration Spaces Match Your Filter
          </h3>
          <p className="text-reliance-navy/70 text-sm max-w-md mx-auto mb-6">
            Try choosing a different room type or clearing your search term to explore our curated
            color palettes.
          </p>
          <button
            onClick={() => {
              setSelectedRoom('all')
              setSearchQuery('')
            }}
            className="px-6 py-2.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-reliance-gold hover:text-reliance-navy transition-colors"
          >
            Show All Spaces
          </button>
        </div>
      )}

      {/* LIGHTBOX MODAL WITH FULL CONTENT / DETAIL */}
      {currentImage && selectedIndex !== null && typeof document !== 'undefined' && createPortal(
        <div
          ref={modalBackdropRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md"
          onClick={closeModal}
          style={{ opacity: 0 }}
        >
          {/* Top floating control bar */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-30">
            <button
              onClick={closeModal}
              className="p-3 bg-reliance-navy text-white hover:bg-reliance-gold hover:text-reliance-navy transition-colors border border-white/20 shadow-lg cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Card */}
          <div
            ref={modalContentRef}
            className="relative max-w-6xl w-full max-h-[92vh] flex flex-col lg:flex-row bg-[#FAF8F5] overflow-hidden shadow-2xl border border-reliance-navy"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: 'scale(0.94)', opacity: 0 }}
          >
            {/* Left/Main Column: Image Viewer with Next/Prev Controls */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[42vh] lg:min-h-[64vh]">
              <Image
                src={currentImage.image.url}
                alt={currentImage.image.alt || currentImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />

              {/* Prev / Next Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-reliance-navy text-white transition-all border border-white/20 rounded-full hover:scale-110 z-20 cursor-pointer"
                    aria-label="Previous space"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-reliance-navy text-white transition-all border border-white/20 rounded-full hover:scale-110 z-20 cursor-pointer"
                    aria-label="Next space"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-mono border border-white/15">
                Space {selectedIndex + 1} / {filteredImages.length}
              </div>
            </div>

            {/* Right Column: Complete Details & Content Sidepanel */}
            <div className="w-full lg:w-[400px] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[85vh] border-t lg:border-t-0 lg:border-l border-reliance-navy/15 bg-[#FAF8F5] shrink-0">
              <div className="space-y-6">
                {/* Header: Room Type & Style Tags */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {currentImage.roomType && (
                      <span className="px-2.5 py-1 bg-reliance-navy text-white text-[11px] font-bold uppercase tracking-wider">
                        {currentImage.roomType.replace('-', ' ')}
                      </span>
                    )}
                    {currentImage.styleTags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-reliance-gold/20 text-reliance-navy text-[11px] font-bold uppercase tracking-wider border border-reliance-gold/40"
                      >
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-reliance-navy leading-tight">
                    {currentImage.title}
                  </h3>

                  {currentImage.description && (
                    <p className="text-reliance-navy/75 text-xs sm:text-sm mt-2 leading-relaxed font-sans">
                      {currentImage.description}
                    </p>
                  )}
                </div>

                {/* Featured Color Card */}
                <div className="bg-white border border-reliance-navy/15 p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-widest text-reliance-navy/60 font-bold font-sans">
                      Featured Primary Shade
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-100 border border-slate-200 text-reliance-navy/70">
                      {currentImage.featuredColour.colorCode || 'Reliance Color'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 border-2 border-reliance-navy/20 shadow-inner shrink-0"
                      style={{ backgroundColor: currentImage.featuredColour.hexCode }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold font-sans text-reliance-navy truncate">
                        {currentImage.featuredColour.name}
                      </p>
                      <p className="text-xs font-mono uppercase text-reliance-navy/70">
                        {currentImage.featuredColour.hexCode}
                      </p>
                      {currentImage.featuredColour.colorFamily && (
                        <p className="text-[11px] text-reliance-gold font-semibold uppercase mt-0.5">
                          {currentImage.featuredColour.colorFamily} Palette
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Secondary / Accent Shades */}
                {currentImage.secondaryColours && currentImage.secondaryColours.length > 0 && (
                  <div className="space-y-2.5">
                    <p className="text-[11px] uppercase tracking-widest text-reliance-navy/60 font-bold font-sans">
                      Complementary Accents in this Room
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentImage.secondaryColours.map((col) => (
                        <Link
                          key={col.id || col.slug}
                          href={`/colors/${col.slug}`}
                          className="group flex items-center gap-2.5 p-2 bg-white border border-reliance-navy/10 hover:border-reliance-navy transition-all"
                        >
                          <span
                            className="w-6 h-6 border border-reliance-navy/20 shrink-0 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: col.hexCode }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-reliance-navy truncate group-hover:text-reliance-gold transition-colors">
                              {col.name}
                            </p>
                            <p className="text-[10px] font-mono text-reliance-navy/50 uppercase">
                              {col.hexCode}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Product Topcoat */}
                {currentImage.productRecommendation && (
                  <div className="bg-[#ECE7DF] border border-reliance-navy/10 p-3.5">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-reliance-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-reliance-navy">
                          Recommended Paint Topcoat
                        </p>
                        <Link
                          href={`/products/${currentImage.productRecommendation.slug}`}
                          className="text-xs text-reliance-navy/80 mt-0.5 hover:text-reliance-gold transition-colors font-bold block"
                        >
                          {currentImage.productRecommendation.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-reliance-navy/15 flex flex-col gap-2.5">
                <Link
                  href={`/visualiser?color=${currentImage.featuredColour.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-reliance-navy hover:bg-reliance-gold hover:text-reliance-navy text-white font-sans text-xs uppercase tracking-widest px-5 py-3.5 font-bold transition-all shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  Try in Room Visualizer
                </Link>

                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/colors/${currentImage.featuredColour.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-white border border-reliance-navy text-reliance-navy hover:bg-reliance-navy hover:text-white font-sans text-xs uppercase tracking-wider px-3 py-2.5 font-bold transition-all text-center"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    Shade Info
                  </Link>

                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center gap-1.5 bg-white border border-reliance-navy text-reliance-navy hover:bg-reliance-navy hover:text-white font-sans text-xs uppercase tracking-wider px-3 py-2.5 font-bold transition-all text-center"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    Estimate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

