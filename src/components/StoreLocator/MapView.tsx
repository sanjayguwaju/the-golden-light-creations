'use client'

import React, { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps'
import { StoreData } from './StoreLocatorClient'
import { MapPinOff, MapPin, ExternalLink } from 'lucide-react'

declare global {
  interface Window {
    gm_authFailure?: () => void
  }
}

// Custom map style to make it look clean, modern, and branded
const mapStyles = [
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
]


type MapViewProps = {
  stores: StoreData[]
  activeStoreId: string | null
  onMarkerClick: (storeId: string) => void
  className?: string
}

// A sub-component to handle map panning programmatically
function MapPanHandler({ 
  stores, 
  activeStoreId 
}: { 
  stores: StoreData[], 
  activeStoreId: string | null 
}) {
  const map = useMap()

  useEffect(() => {
    if (map && activeStoreId) {
      const store = stores.find(s => s.id === activeStoreId)
      if (store && store.latitude && store.longitude) {
        map.panTo({ lat: store.latitude, lng: store.longitude })
        map.setZoom(15) // Zoom in when selected
      }
    }
  }, [map, activeStoreId, stores])

  return null
}

export default function MapView({ stores, activeStoreId, onMarkerClick, className }: MapViewProps) {
  const [hasAuthError, setHasAuthError] = useState(false)

  useEffect(() => {
    window.gm_authFailure = () => {
      setHasAuthError(true)
    }
    return () => {
      window.gm_authFailure = undefined
    }
  }, [])

  const defaultCenter = { lat: 27.7172, lng: 85.3240 } // Kathmandu
  
  // Calculate dynamic center if stores are present
  const center = stores.length > 0 && stores[0].latitude && stores[0].longitude
    ? { lat: stores[0].latitude, lng: stores[0].longitude }
    : defaultCenter

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const showFallback = !apiKey || hasAuthError

  return (
    <div className={className || "w-full h-full min-h-100 lg:min-h-150 rounded-xl overflow-hidden shadow-md relative bg-gray-100 flex items-center justify-center"}>
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50/90 z-10 p-6 text-center backdrop-blur-md">
          <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center gap-4 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-reliance-red animate-pulse">
              <MapPinOff className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-reliance-navy mb-2">Store Map Unavailable</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We&apos;re currently unable to display the interactive map. You can still view all store addresses and directions in the list.
              </p>
            </div>
          </div>
        </div>
      )}
      <APIProvider apiKey={apiKey}>
        <Map 
          defaultCenter={center} 
          defaultZoom={13} 
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="STORE_LOCATOR_MAP_ID" // Can be configured later for custom styling
          styles={mapStyles}
        >
          {stores.map(store => (
            store.latitude && store.longitude && (
              <AdvancedMarker 
                key={store.id} 
                position={{ lat: store.latitude, lng: store.longitude }} 
                onClick={() => onMarkerClick(store.id)}
              >
                <Pin
                  background={activeStoreId === store.id ? '#D94040' : '#EA4335'}
                  borderColor={activeStoreId === store.id ? '#FFFFFF' : '#B72A2A'}
                  glyphColor={activeStoreId === store.id ? '#FFFFFF' : '#FFFFFF'}
                  scale={activeStoreId === store.id ? 1.25 : 1.0}
                />
              </AdvancedMarker>
            )
          ))}

          {/* Render InfoWindow for active store */}
          {activeStoreId && (() => {
            const activeStore = stores.find(s => s.id === activeStoreId)
            if (activeStore && activeStore.latitude && activeStore.longitude) {
              return (
                <InfoWindow 
                  position={{ lat: activeStore.latitude, lng: activeStore.longitude }}
                  onCloseClick={() => onMarkerClick('')}
                >
                  <div className="p-3 min-w-55 max-w-65 font-sans">
                    <h3 className="font-bold text-reliance-navy text-base leading-tight mb-2 border-b border-gray-100 pb-2">
                      {activeStore.storeName}
                    </h3>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 flex items-start gap-1.5 leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-400 shrink-0" />
                        <span>{activeStore.address}</span>
                      </p>
                    </div>

                    {(() => {
                      const directionsUrl = activeStore.latitude && activeStore.longitude
                        ? `https://www.google.com/maps/dir/?api=1&destination=${activeStore.latitude},${activeStore.longitude}`
                        : (activeStore.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${activeStore.storeName}, ${activeStore.address}, ${activeStore.district}, ${activeStore.province}`
                          )}`)
                      return (
                        <a 
                          href={directionsUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full text-center bg-reliance-navy text-white hover:bg-reliance-gold transition-all duration-200 text-xs font-semibold py-2 px-3 rounded-lg shadow-sm flex items-center justify-center gap-1.5 mt-4 group"
                        >
                          <span>Get Directions</span>
                          <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      )
                    })()}
                  </div>
                </InfoWindow>
              )
            }
            return null
          })()}

          <MapPanHandler stores={stores} activeStoreId={activeStoreId} />
        </Map>
      </APIProvider>
    </div>
  )
}
