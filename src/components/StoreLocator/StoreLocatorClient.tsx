'use client'

import React, { useState, useMemo } from 'react'
import { NEPAL_GEO, Province } from '@/utilities/nepalGeo'
import MapView from './MapView'
import { MapPin, Compass, Search, ExternalLink } from 'lucide-react'
import { EmptyState } from '../EmptyState'

export type StoreData = {
  id: string
  storeName: string
  province: string
  district: string
  address: string
  area?: string | null
  dealerType?: string | null
  googleMapsUrl?: string | null
  latitude?: number | null
  longitude?: number | null
}

export default function StoreLocatorClient({ initialStores }: { initialStores: StoreData[] }) {
  const [selectedProvince, setSelectedProvince] = useState<Province | ''>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value as Province)
    setSelectedDistrict('') // Reset district when province changes
    setActiveStoreId(null)
  }

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value)
    setActiveStoreId(null)
  }

  const filteredStores = useMemo(() => {
    return initialStores.filter((store) => {
      const matchesProv = selectedProvince ? store.province === selectedProvince : true
      const matchesDist = selectedDistrict ? store.district === selectedDistrict : true
      const matchesSearch = searchQuery 
        ? store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.district.toLowerCase().includes(searchQuery.toLowerCase())
        : true
      return matchesProv && matchesDist && matchesSearch
    })
  }, [selectedProvince, selectedDistrict, searchQuery, initialStores])

  // Derive available districts based on selected province
  const availableDistricts = selectedProvince ? NEPAL_GEO[selectedProvince] : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      
      {/* Sidebar / List View */}
      <div className="lg:col-span-4 lg:h-[650px] flex flex-col bg-white border border-reliance-navy relative z-10 overflow-hidden rounded-none">
        
        {/* Filters Header */}
        <div className="p-6 border-b border-reliance-navy/10 bg-white z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-reliance-gold/10 text-reliance-gold text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-reliance-gold animate-pulse" />
            AUTHORIZED DEALERS
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            Locate authorized tinting centers and dealers near you for color selection and supplies.
          </p>
          
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-reliance-navy/50" />
              <input
                type="text"
                placeholder="Search store name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-none border border-reliance-navy bg-white text-sm focus:bg-white focus:border-reliance-gold focus:ring-1 focus:ring-reliance-gold outline-none transition-all placeholder:text-reliance-navy/40"
              />
            </div>
            
            {/* Dropdowns Side-by-Side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-reliance-navy uppercase tracking-widest mb-1.5">Province</label>
                <select 
                  className="w-full text-xs rounded-none border border-reliance-navy p-3 bg-white focus:bg-white focus:border-reliance-gold focus:ring-1 focus:ring-reliance-gold outline-none cursor-pointer transition-all"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">All Provinces</option>
                  {Object.keys(NEPAL_GEO).map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-reliance-navy uppercase tracking-widest mb-1.5">District</label>
                <select 
                  className="w-full text-xs rounded-none border border-reliance-navy p-3 bg-white focus:bg-white focus:border-reliance-gold focus:ring-1 focus:ring-reliance-gold outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                >
                  <option value="">{selectedProvince ? 'All Districts' : 'Select Province'}</option>
                  {availableDistricts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center text-xs text-reliance-grey font-medium uppercase tracking-widest">
            <span>Showing <span className="font-bold text-reliance-navy">{filteredStores.length}</span> store(s)</span>
            {(selectedProvince || selectedDistrict || searchQuery) && (
              <button 
                onClick={() => {
                  setSelectedProvince('')
                  setSelectedDistrict('')
                  setSearchQuery('')
                }}
                className="text-reliance-gold hover:text-reliance-navy font-bold cursor-pointer transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Store List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF9F6]">
          {filteredStores.length === 0 ? (
            <EmptyState
              icon={<Compass className="w-12 h-12 text-reliance-navy/20" />}
              title="No stores found"
              description="Try selecting a different province, district, or search query."
              className="mt-8 border-none bg-transparent"
            />
          ) : (
            filteredStores.map(store => {
              const isActive = activeStoreId === store.id;
              const isPartner = store.storeName.toLowerCase().includes('corporate') || 
                                store.storeName.toLowerCase().includes('studio') || 
                                store.storeName.toLowerCase().includes('showroom');

              return (
                <div 
                  key={store.id} 
                  onClick={() => setActiveStoreId(store.id)}
                  className={`group relative p-5 border border-reliance-navy transition-all duration-300 cursor-pointer rounded-none ${
                    isActive 
                      ? 'bg-reliance-gold/5 shadow-[4px_4px_0_0_#C9A84C] translate-x-1' 
                      : 'bg-white hover:shadow-[4px_4px_0_0_#0D1B3E] hover:-translate-y-1'
                  }`}
                >
                  {/* Left accent border for active state */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                    isActive ? 'bg-reliance-gold scale-y-100' : 'bg-transparent scale-y-0'
                  }`} />
                  
                  <div className="flex justify-between items-start gap-2 mb-2.5">
                    <h3 className="font-bold text-reliance-navy text-lg leading-snug group-hover:text-reliance-gold transition-colors">
                      {store.storeName}
                    </h3>
                    {isPartner && (
                      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 bg-reliance-gold/10 text-reliance-gold uppercase tracking-widest">
                        Premium
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-reliance-grey leading-relaxed">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-reliance-navy" />
                      <span>{store.address}, {store.district}, {store.province}</span>
                    </div>
                  </div>

                  {(() => {
                    const directionsUrl = store.latitude && store.longitude
                      ? `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`
                      : (store.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${store.storeName}, ${store.address}, ${store.district}, ${store.province}`
                        )}`)
                    return (
                      <div className="mt-4 pt-3.5 border-t border-reliance-navy/10 flex justify-end items-center">
                        <a 
                          href={directionsUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-reliance-navy hover:text-reliance-gold font-bold text-xs uppercase tracking-widest transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Get Directions</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )
                  })()}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="lg:col-span-8 lg:h-[650px] h-[450px] border border-reliance-navy relative z-10 overflow-hidden">
        <MapView 
          stores={filteredStores} 
          activeStoreId={activeStoreId} 
          onMarkerClick={setActiveStoreId} 
        />
      </div>

    </div>
  )
}
