'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Check, ChevronRight, Copy, Search, SlidersHorizontal, X } from 'lucide-react'
import { EmptyState } from './EmptyState'

// Simplified type for the component props
type Color = {
  id: string
  name: string
  slug?: string
  shadeCode?: string | null
  colorId?: string | null
  hexCode: string
  rgb?: {
    r?: number
    g?: number
    b?: number
    string?: string
  } | null
  colorFamily?: string | null
  moodTags?: string[] | null
  popularity?: number | null
}

const FAMILIES = [
  { label: 'All Colors', value: 'all' },
  { label: 'Reds', value: 'reds' },
  { label: 'Blues', value: 'blues' },
  { label: 'Greens', value: 'greens' },
  { label: 'Yellows', value: 'yellows' },
  { label: 'Neutrals', value: 'neutrals' },
  { label: 'Oranges', value: 'oranges' },
  { label: 'Purples', value: 'purples' },
  { label: 'Earths', value: 'earths' },
  { label: 'Darks', value: 'darks' },
  { label: 'Whites', value: 'whites' },
]

const MOODS = [
  { label: 'All Moods', value: 'all' },
  { label: 'Calm', value: 'calm' },
  { label: 'Vibrant', value: 'vibrant' },
  { label: 'Earthy', value: 'earthy' },
  { label: 'Energetic', value: 'energetic' },
  { label: 'Elegant', value: 'elegant' },
  { label: 'Playful', value: 'playful' },
  { label: 'Minimalist', value: 'minimalist' },
  { label: 'Cozy', value: 'cozy' },
]

const getRgbDisplay = (color: Color): string => {
  if (color.rgb?.string) return color.rgb.string
  if (
    typeof color.rgb?.r === 'number' &&
    typeof color.rgb?.g === 'number' &&
    typeof color.rgb?.b === 'number'
  ) {
    return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
  }
  const hex = (color.hexCode || '').replace('#', '')
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return `rgb(${r}, ${g}, ${b})`
    }
  }
  return ''
}

export function ColourGridClient({ initialColours }: { initialColours: Color[] }) {
  const [search, setSearch] = useState('')
  const [familyFilter, setFamilyFilter] = useState('all')
  const [moodFilter, setMoodFilter] = useState('all')
  const [sortBy, setSortBy] = useState('shade-asc')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (hex: string, id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(hex)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const filteredColours = useMemo(() => {
    const q = search.trim().toLowerCase()
    let result = initialColours.filter((c) => {
      let matchesSearch = true

      if (q) {
        const nameMatch = (c.name || '').toLowerCase().includes(q)
        const hexClean = (c.hexCode || '').toLowerCase().replace('#', '')
        const hexMatch =
          (c.hexCode || '').toLowerCase().includes(q) ||
          hexClean.includes(q.replace('#', ''))
        const shadeCode = (c.shadeCode || c.colorId || '').toLowerCase()
        const codeMatch = shadeCode.includes(q)

        const rgbFormatted = getRgbDisplay(c).toLowerCase()
        const rgbRaw =
          c.rgb && typeof c.rgb.r === 'number'
            ? `${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b} ${c.rgb.r} ${c.rgb.g} ${c.rgb.b}`
            : ''
        const rgbMatch = rgbFormatted.includes(q) || rgbRaw.includes(q)
        const familyMatch = (c.colorFamily || '').toLowerCase().includes(q)
        const moodMatch = (c.moodTags || []).some((m) =>
          m.toLowerCase().includes(q),
        )

        matchesSearch = Boolean(
          nameMatch ||
            hexMatch ||
            codeMatch ||
            rgbMatch ||
            familyMatch ||
            moodMatch,
        )
      }

      const matchesFamily =
        familyFilter === 'all' || c.colorFamily === familyFilter
      const matchesMood =
        moodFilter === 'all' ||
        (c.moodTags && c.moodTags.includes(moodFilter))
      return matchesSearch && matchesFamily && matchesMood
    })

    if (sortBy === 'shade-asc') {
      result = [...result].sort((a, b) => {
        const codeA = a.shadeCode || a.colorId || a.name || ''
        const codeB = b.shadeCode || b.colorId || b.name || ''
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' })
      })
    } else if (sortBy === 'shade-desc') {
      result = [...result].sort((a, b) => {
        const codeA = a.shadeCode || a.colorId || a.name || ''
        const codeB = b.shadeCode || b.colorId || b.name || ''
        return codeB.localeCompare(codeA, undefined, { numeric: true, sensitivity: 'base' })
      })
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { numeric: true, sensitivity: 'base' }))
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) => (b.name || '').localeCompare(a.name || '', undefined, { numeric: true, sensitivity: 'base' }))
    } else if (sortBy === 'popularity') {
      result = [...result].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    }

    return result
  }, [search, familyFilter, moodFilter, sortBy, initialColours])

  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '')
    if (hex.length !== 6 && hex.length !== 3) return '#000000'
    const r =
      hex.length === 3
        ? parseInt(hex.charAt(0) + hex.charAt(0), 16)
        : parseInt(hex.substr(0, 2), 16)
    const g =
      hex.length === 3
        ? parseInt(hex.charAt(1) + hex.charAt(1), 16)
        : parseInt(hex.substr(2, 2), 16)
    const b =
      hex.length === 3
        ? parseInt(hex.charAt(2) + hex.charAt(2), 16)
        : parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#FFFFFF'
  }

  return (
    <div>
      {/* Filter and Search Bar */}
      <div className="sticky top-20 z-30 pt-4 pb-2 -mt-4 bg-page-bg mb-8">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-10 py-3 bg-gray-50 border-transparent rounded-xl text-reliance-navy placeholder-gray-400 focus:border-reliance-gold focus:bg-white focus:ring-0 sm:text-sm transition-colors"
                placeholder="Search shade code, hex or RGB..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full md:w-60 py-3 px-4 bg-gray-50 border-transparent rounded-xl text-reliance-navy text-sm font-medium focus:border-reliance-gold focus:bg-white focus:ring-0 cursor-pointer"
              >
                <option value="shade-asc">Shade Code: Ascending (1-1-1 →)</option>
                <option value="shade-desc">Shade Code: Descending (5-41-7 →)</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {FAMILIES.map((family) => (
              <button
                key={family.value}
                onClick={() => setFamilyFilter(family.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  familyFilter === family.value
                    ? 'bg-reliance-navy text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {family.label}
              </button>
            ))}
          </div>

          {/* Mood Chips */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setMoodFilter(mood.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  moodFilter === mood.value
                    ? 'bg-reliance-gold text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-reliance-navy">
            {familyFilter === 'all'
              ? 'All Colors'
              : FAMILIES.find((f) => f.value === familyFilter)?.label}
          </h2>
        </div>
        <span className="text-reliance-grey text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
          {filteredColours.length}{' '}
          {filteredColours.length === 1 ? 'Color' : 'Colors'} Available
        </span>
      </div>

      {filteredColours.length === 0 ? (
        <EmptyState
          icon={<Search className="w-8 h-8 text-gray-400" />}
          title="No colors found"
          description="We couldn't find any colors matching your search criteria. Try adjusting your filters or search terms."
          className="my-8"
          action={
            <button
              onClick={() => {
                setSearch('')
                setFamilyFilter('all')
                setMoodFilter('all')
              }}
              className="px-6 py-2 bg-reliance-gold text-white font-medium rounded-lg hover:bg-reliance-gold/90 transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-7 gap-3 sm:gap-3.5 md:gap-4">
          {filteredColours.map((color) => {
            const textColor = getContrastColor(color.hexCode)
            const rgbStr = getRgbDisplay(color)
            const code = color.shadeCode || color.colorId
            const isCopied = copiedId === color.id

            return (
              <Link
                key={color.id}
                href={`/colors/${color.slug || color.id}`}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block cursor-pointer"
              >
                <div
                  className="w-full h-full flex flex-col justify-between p-3 sm:p-3.5 relative"
                  style={{
                    backgroundColor: color.hexCode,
                    boxShadow:
                      'inset 0 2px 10px rgba(0,0,0,0.06), inset 0 -2px 10px rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Top: Shade Code Badge & View Arrow */}
                  <div className="flex items-center justify-between gap-1 relative z-10">
                    {code ? (
                      <span
                        className="px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider rounded-md backdrop-blur-md"
                        style={{
                          backgroundColor:
                            textColor === '#FFFFFF'
                              ? 'rgba(0,0,0,0.35)'
                              : 'rgba(255,255,255,0.65)',
                          color: textColor,
                        }}
                      >
                        {code}
                      </span>
                    ) : (
                      <span />
                    )}

                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md"
                      style={{
                        backgroundColor:
                          textColor === '#FFFFFF'
                            ? 'rgba(0,0,0,0.35)'
                            : 'rgba(255,255,255,0.65)',
                        color: textColor,
                      }}
                    >
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Center: Clipboard Copy Button (Appears on hover) */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <button
                      type="button"
                      onClick={(e) => handleCopy(color.hexCode, color.id, e)}
                      className="pointer-events-auto px-3 py-2 rounded-full backdrop-blur-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-80 group-hover:scale-100 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 border border-black/10"
                      style={{
                        backgroundColor:
                          textColor === '#FFFFFF'
                            ? 'rgba(0,0,0,0.65)'
                            : 'rgba(255,255,255,0.9)',
                        color: textColor,
                      }}
                      title="Copy Hex Code"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                            Copied
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                            Copy
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bottom: Hex Code & RGB Value (No color name) */}
                  <div className="relative z-10 space-y-0.5 transform translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">
                    <p
                      className="text-[11px] sm:text-xs font-mono font-bold tracking-wide drop-shadow-sm"
                      style={{ color: textColor }}
                    >
                      {color.hexCode.toUpperCase()}
                    </p>
                    {rgbStr && (
                      <p
                        className="text-[9px] sm:text-[10px] font-mono font-medium opacity-85 drop-shadow-sm truncate"
                        style={{ color: textColor }}
                        title={rgbStr}
                      >
                        {rgbStr}
                      </p>
                    )}
                  </div>

                  {/* Hover overlay gradient for slightly better text readability on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
