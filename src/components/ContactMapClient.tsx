'use client'

import React from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

export default function ContactMapClient({ lat, lng }: { lat: number, lng: number }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 border border-gray-200">
        <p>Google Maps API Key not configured</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={{ lat, lng }} defaultZoom={15} gestureHandling={'greedy'} disableDefaultUI={true}>
          <Marker position={{ lat, lng }} />
        </Map>
      </APIProvider>
    </div>
  )
}
