import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import StoreLocatorClient, { StoreData } from '@/components/StoreLocator/StoreLocatorClient'

export const dynamic = 'force-dynamic'

export default async function StoreLocatorPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: stores } = await payload.find({
    collection: 'stores',
    limit: 1000,
    select: {
      id: true,
      storeName: true,
      province: true,
      district: true,
      address: true,
      area: true,
      dealerType: true,
      googleMapsUrl: true,
      latitude: true,
      longitude: true,
    },
  })

  // Map to client data
  const mappedStores: StoreData[] = stores.map(s => ({
    id: s.id,
    storeName: s.storeName,
    province: s.province,
    district: s.district,
    address: s.address,
    area: s.area || null,
    dealerType: s.dealerType || null,
    googleMapsUrl: s.googleMapsUrl,
    latitude: s.latitude,
    longitude: s.longitude,
  }))

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 md:py-24">
      <div className="container mx-auto px-4 lg:px-16 max-w-[1440px]">
        <div className="mb-16 text-center space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold">Locate Us</p>
          <h1 className="text-4xl lg:text-5xl lg:text-7xl font-bold tracking-tight text-reliance-navy uppercase">
            Dealer Locator.
          </h1>
          <p className="text-reliance-grey text-lg max-w-2xl mx-auto">
            Find authorized Reliance Paints dealers and tinting centers near you.
          </p>
        </div>
        <StoreLocatorClient initialStores={mappedStores} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Store Locator | Reliance Paints',
    description: 'Find an authorized Reliance Paints dealer near you.',
  }
}
