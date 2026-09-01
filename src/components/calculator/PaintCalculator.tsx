'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Download, MapPin, Info, Layers, CheckCircle2, ShieldCheck } from 'lucide-react'
import { 
  getPaintableAreaDetails, 
  calculatePaintRequirement, 
  getPackRecommendations, 
  calculatePackPrices,
  calculateTotalCost,
  SurfaceCondition,
  SURFACE_LABELS,
  Unit,
  AreaCalculation,
  PaintRequirement,
  PackRecommendations,
  PackPrices
} from '@/utilities/calculatorLogic'
import type { PDFData } from './EstimatePDF'
import { useDebounce } from '@/utilities/useDebounce'

const PDFDownloadButton = dynamic(
  () => import('./PDFDownloadButton'),
  { ssr: false }
)

export type PaintProductData = {
  id: string
  title: string
  slug: string
  coverageRate: number
  pricePerLitre: number
}

type CalculatorForm = {
  unit: Unit
  length: number
  width: number
  height: number
  doors: number
  windows: number
  includeCeiling: boolean
  surfaceCondition: SurfaceCondition
  coats: 1 | 2 | 3
  includeBuffer: boolean
  productId: string
}

type CalculationResults = {
  area: AreaCalculation
  paintReq: PaintRequirement
  packs: PackRecommendations
  packPrices: PackPrices
  totalCost: number
  product: PaintProductData
}

export function PaintCalculator({ products }: { products: PaintProductData[] }) {
  const searchParams = useSearchParams()
  const queryProductSlug = searchParams.get('product') || ''

  const { register, watch, control, setValue } = useForm<CalculatorForm>({
    defaultValues: {
      unit: 'feet',
      length: 12,
      width: 14,
      height: 10,
      doors: 1,
      windows: 1,
      includeCeiling: false,
      surfaceCondition: 'smooth',
      coats: 2,
      includeBuffer: true,
      productId: products[0]?.id || '',
    },
    mode: 'onChange'
  })

  // Keep form value in sync with search params when they change (runs on client side only, preventing hydration mismatch)
  useEffect(() => {
    if (queryProductSlug) {
      const matched = products.find(p => p.slug === queryProductSlug)
      if (matched) {
        setValue('productId', matched.id)
      }
    }
  }, [queryProductSlug, products, setValue])

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formValues = watch()

  // Real-time calculation logic
  const results = useMemo((): CalculationResults | null => {
    const selectedProduct = products.find(p => p.id === formValues.productId) || products[0]
    const length = Number(formValues.length) || 0
    const width = Number(formValues.width) || 0
    const height = Number(formValues.height) || 0

    if (!selectedProduct || length <= 0 || width <= 0 || height <= 0) {
      return null
    }

    const area = getPaintableAreaDetails(
      length,
      width,
      height,
      formValues.doors,
      formValues.windows,
      formValues.includeCeiling,
      formValues.unit
    )

    if (area.netPaintableSqFt <= 0) {
      return null
    }

    const paintReq = calculatePaintRequirement(
      area.netPaintableSqFt,
      selectedProduct.coverageRate,
      formValues.coats,
      formValues.surfaceCondition,
      formValues.includeBuffer
    )

    const packPrices = calculatePackPrices(selectedProduct.pricePerLitre)
    const packs = getPackRecommendations(paintReq.totalLitres, packPrices)
    const totalCost = calculateTotalCost(packs, packPrices)

    return {
      area,
      paintReq,
      packs,
      packPrices,
      totalCost,
      product: selectedProduct
    }
  }, [formValues, products])

  const [referenceId] = useState(() => `RP-${Math.floor(100000 + Math.random() * 900000)}`)
  const [generatedDate] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  )

  // Create data structure for PDF
  const pdfData = useMemo((): PDFData | null => {
    const selectedProduct = products.find(p => p.id === formValues.productId) || products[0]
    if (!results || !selectedProduct) return null

    return {
      referenceId,
      generatedDate,
      companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Reliance Paints Nepal",
      websiteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "www.reliancepaintsnepal.com").replace(/^https?:\/\//, ""),
      dimensions: {
        length: formValues.length,
        width: formValues.width,
        height: formValues.height,
        doors: formValues.doors || 0,
        windows: formValues.windows || 0,
        includeCeiling: formValues.includeCeiling,
        surfaceCondition: formValues.surfaceCondition,
        surfaceLabel: SURFACE_LABELS[formValues.surfaceCondition],
        coats: formValues.coats,
        unit: formValues.unit === 'feet' ? 'ft' : 'm',
      },
      area: results.area,
      results: {
        product: {
          title: selectedProduct.title,
          pricePerLitre: selectedProduct.pricePerLitre,
          coverageRate: selectedProduct.coverageRate,
        },
        paintableArea: results.area.netPaintableSqFt,
        baseLitres: results.paintReq.baseLitres,
        bufferLitres: results.paintReq.bufferLitres,
        totalLitres: results.paintReq.totalLitres,
        primerLitres: results.paintReq.primerLitres,
        packs: results.packs,
        packPrices: results.packPrices,
        totalCost: results.totalCost,
      }
    }
  }, [formValues, results, products, referenceId, generatedDate])

  const debouncedPdfData = useDebounce(pdfData, 400)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Section */}
      <div className="lg:col-span-7 space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-reliance-navy">1. Room Dimensions</h2>
            
            {/* Unit Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setValue('unit', 'feet')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  formValues.unit === 'feet' ? 'bg-reliance-navy text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Feet (ft)
              </button>
              <button
                type="button"
                onClick={() => setValue('unit', 'metres')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  formValues.unit === 'metres' ? 'bg-reliance-navy text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Metres (m)
              </button>
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reliance-navy mb-1.5">Length</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  className="w-full rounded-xl border-gray-200 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3.5 bg-gray-50/70 border font-semibold text-reliance-navy pr-12"
                  {...register('length', { valueAsNumber: true, min: 0 })}
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-bold text-gray-400">
                  {formValues.unit === 'feet' ? 'ft' : 'm'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reliance-navy mb-1.5">Width</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  className="w-full rounded-xl border-gray-200 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3.5 bg-gray-50/70 border font-semibold text-reliance-navy pr-12"
                  {...register('width', { valueAsNumber: true, min: 0 })}
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-bold text-gray-400">
                  {formValues.unit === 'feet' ? 'ft' : 'm'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reliance-navy mb-1.5">Height</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  className="w-full rounded-xl border-gray-200 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3.5 bg-gray-50/70 border font-semibold text-reliance-navy pr-12"
                  {...register('height', { valueAsNumber: true, min: 0 })}
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-bold text-gray-400">
                  {formValues.unit === 'feet' ? 'ft' : 'm'}
                </span>
              </div>
            </div>
          </div>

          {/* Ceiling Toggle */}
          <label className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100/70 transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded text-reliance-navy focus:ring-reliance-gold cursor-pointer accent-reliance-navy"
              {...register('includeCeiling')}
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-reliance-navy">Include Ceiling in Painting Area</span>
              <span className="text-xs text-gray-500">Adds ceiling square footage to the paintable area</span>
            </div>
          </label>
        </div>

        {/* Deductions */}
        <div>
          <h2 className="text-xl font-bold text-reliance-navy mb-4">2. Deductions (Doors & Windows)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reliance-navy mb-1.5">
                Number of Doors <span className="text-gray-400 font-normal">(-21 sq.ft each)</span>
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3.5 bg-gray-50/70 border font-semibold text-reliance-navy"
                {...register('doors', { valueAsNumber: true, min: 0 })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reliance-navy mb-1.5">
                Number of Windows <span className="text-gray-400 font-normal">(-15 sq.ft each)</span>
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3.5 bg-gray-50/70 border font-semibold text-reliance-navy"
                {...register('windows', { valueAsNumber: true, min: 0 })}
              />
            </div>
          </div>
        </div>

        {/* Surface Texture & Porosity */}
        <div>
          <h2 className="text-xl font-bold text-reliance-navy mb-4">3. Wall Surface Condition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'smooth', label: 'Smooth / Repaint', desc: 'Standard coverage (1.0x)' },
              { id: 'fresh_plaster', label: 'Fresh Plaster', desc: 'Porous masonry (+15% paint)' },
              { id: 'rough_textured', label: 'Rough / Textured', desc: 'Exterior / Textured (+30% paint)' },
            ].map(item => (
              <label
                key={item.id}
                className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formValues.surfaceCondition === item.id
                    ? 'border-reliance-gold bg-reliance-gold/5 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  value={item.id}
                  className="sr-only"
                  {...register('surfaceCondition')}
                />
                <span className="font-bold text-reliance-navy text-sm">{item.label}</span>
                <span className="text-xs text-gray-500 mt-1">{item.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product & Coats */}
        <div>
          <h2 className="text-xl font-bold text-reliance-navy mb-4">4. Paint Selection & Coats</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reliance-navy mb-2">Select Paint Product</label>
              <select
                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3.5 bg-gray-50/70 border font-medium text-reliance-navy cursor-pointer"
                {...register('productId')}
              >
                {products.length === 0 && <option value="">No products available</option>}
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} — Spread: {p.coverageRate} sq.ft/L/coat
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reliance-navy mb-2">Number of Coats</label>
              <Controller
                name="coats"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { coat: 1, tag: '1 Coat', sub: 'Touch-up / Fresh coat' },
                      { coat: 2, tag: '2 Coats', sub: 'Recommended standard' },
                      { coat: 3, tag: '3 Coats', sub: 'Dark-to-light / High opacity' },
                    ].map(item => (
                      <button
                        key={item.coat}
                        type="button"
                        onClick={() => field.onChange(item.coat)}
                        className={`p-3 rounded-xl border-2 font-medium transition-all text-left ${
                          field.value === item.coat
                            ? 'bg-reliance-navy border-reliance-navy text-white shadow-md'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="block font-bold text-sm">{item.tag}</span>
                        <span className={`block text-[11px] mt-0.5 ${field.value === item.coat ? 'text-reliance-gold' : 'text-gray-500'}`}>
                          {item.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Buffer Allowance */}
            <label className="flex items-center gap-3 p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded text-reliance-gold focus:ring-reliance-gold cursor-pointer accent-reliance-gold"
                {...register('includeBuffer')}
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-reliance-navy">Include +10% Practical Wastage & Touch-up Buffer</span>
                <span className="text-xs text-amber-800/80">Accounts for roller/brush absorption, tray residue, and edge cuts</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-5 relative">
        <div className="sticky top-24 bg-reliance-navy text-white p-6 md:p-8 rounded-3xl border border-reliance-navy shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
            <h2 className="text-xl font-bold text-white tracking-wide">Estimate Summary</h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-reliance-gold/20 text-reliance-gold border border-reliance-gold/30 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Realistic Spread
            </span>
          </div>
          
          {!results ? (
            <div className="text-center py-12 text-white/60">
              <p>Enter your room dimensions to see the realistic estimate.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Product Info */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <div className="text-xs text-reliance-gold font-bold uppercase tracking-wider mb-1">Selected Product</div>
                <div className="font-bold text-white text-lg">{results.product.title}</div>
                <div className="text-xs text-white/70 mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                  <span>Coverage (1-Coat): <strong className="text-white">{results.product.coverageRate} sq.ft/L</strong></span>
                  <span className="text-reliance-gold font-semibold">Genuine Formulation</span>
                </div>
              </div>

              {/* Area & Paint Metrics */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-white/70">Net Paintable Area</span>
                  <span className="font-bold text-white">
                    {results.area.netPaintableSqFt} sq.ft <span className="text-xs text-white/50">({results.area.netPaintableSqM} m²)</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-white/70">Coats & Multiplier</span>
                  <span className="font-bold text-white">
                    {formValues.coats} Coats ({formValues.surfaceCondition === 'smooth' ? '1.0x' : formValues.surfaceCondition === 'fresh_plaster' ? '1.15x' : '1.30x'})
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-white/70">Required Paint Volume</span>
                  <span className="font-bold text-reliance-gold text-base">
                    {results.paintReq.totalLitres} Litres
                    {results.paintReq.bufferLitres > 0 && (
                      <span className="text-xs text-white/60 font-normal ml-1">
                        ({results.paintReq.baseLitres}L + {results.paintReq.bufferLitres}L buffer)
                      </span>
                    )}
                  </span>
                </div>
              </div>
              
              {/* Primer Callout if applicable */}
              {results.paintReq.primerLitres > 0 && (
                <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong>Primer Recommended:</strong> Fresh masonry requires 1 coat of Reliance Acrylic Primer (~{results.paintReq.primerLitres} Litres).
                  </div>
                </div>
              )}

              {/* Recommended Packs Breakdown */}
              <div className="bg-white rounded-2xl p-4 text-reliance-navy">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-reliance-navy">Recommended Pack Sizes</h4>
                  <span className="text-[11px] font-bold text-reliance-navy/60">
                    Total: {results.packs.totalVolume} Litres
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {results.packs[20] > 0 && (
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="font-medium text-gray-700">20 Litre Drum</span>
                      <span className="font-bold text-reliance-navy px-2.5 py-0.5 bg-gray-100 rounded">x {results.packs[20]}</span>
                    </div>
                  )}
                  {results.packs[10] > 0 && (
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="font-medium text-gray-700">10 Litre Bucket</span>
                      <span className="font-bold text-reliance-navy px-2.5 py-0.5 bg-gray-100 rounded">x {results.packs[10]}</span>
                    </div>
                  )}
                  {results.packs[4] > 0 && (
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="font-medium text-gray-700">4 Litre Gallon</span>
                      <span className="font-bold text-reliance-navy px-2.5 py-0.5 bg-gray-100 rounded">x {results.packs[4]}</span>
                    </div>
                  )}
                  {results.packs[1] > 0 && (
                    <div className="flex justify-between items-center py-1.5">
                      <span className="font-medium text-gray-700">1 Litre Tin</span>
                      <span className="font-bold text-reliance-navy px-2.5 py-0.5 bg-gray-100 rounded">x {results.packs[1]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Volume Callout */}
              <div className="pt-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-reliance-gold mb-1">
                  Total Estimated Volume
                </span>
                <span className="block text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {results.paintReq.totalLitres} Litres
                </span>
                <span className="text-[11px] text-white/50 block mt-1">
                  * Calculated for {formValues.coats} coats. Exact volume may vary slightly by application technique.
                </span>
              </div>

              {/* CTAs */}
              {isClient && (
                <div className="flex flex-col gap-3 pt-2">
                  {debouncedPdfData ? (
                    <PDFDownloadButton data={debouncedPdfData} />
                  ) : (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 bg-reliance-gold/50 text-white font-medium px-6 py-3.5 rounded-xl cursor-not-allowed"
                    >
                      <Download className="w-5 h-5" />
                      Calculating...
                    </button>
                  )}
                  
                  <Link 
                    href="/store-locator"
                    className="w-full flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-reliance-navy font-bold px-6 py-3 rounded-xl transition-all text-center text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    Locate Authorized Store
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

