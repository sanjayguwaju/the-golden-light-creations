"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Clock, Search, Compass, ExternalLink, Loader2 } from "lucide-react";
import MapView from "../StoreLocator/MapView";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface StoreData {
  id: string;
  storeName: string;
  province: string;
  district: string;
  address: string;
  area?: string | null;
  dealerType?: string | null;
  googleMapsUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface StoreLocatorProps {
  title?: string;
  subheading?: string;
  initialStores?: StoreData[];
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({ title, subheading, initialStores }) => {
  const [query, setQuery] = useState("");
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);
  const [stores, setStores] = useState<StoreData[]>(initialStores || []);
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }
    },
    { scope: sectionRef },
  );

  // Fetch dynamically if no initialStores are provided (e.g. static previews)
  useEffect(() => {
    if (initialStores && initialStores.length > 0) {
      setStores(initialStores);
      return;
    }

    const fetchStores = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/stores?limit=1000");
        if (res.ok) {
          const data = await res.json();
          if (data && data.docs) {
            const mapped = data.docs.map((s: any) => ({
              id: s.id,
              storeName: s.storeName,
              province: s.province,
              district: s.district,
              address: s.address,
              googleMapsUrl: s.googleMapsUrl || null,
              latitude: s.latitude || null,
              longitude: s.longitude || null,
            }));
            setStores(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to fetch stores dynamically from Payload:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [initialStores]);

  // Filter stores by query
  const filteredStores = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return stores;

    return stores.filter(
      (s) =>
        s.storeName.toLowerCase().includes(trimmed) ||
        s.address.toLowerCase().includes(trimmed) ||
        s.district.toLowerCase().includes(trimmed) ||
        s.province.toLowerCase().includes(trimmed)
    );
  }, [query, stores]);

  // Determine active store
  const activeStore = useMemo(() => {
    if (activeStoreId) {
      const found = filteredStores.find((s) => s.id === activeStoreId);
      if (found) return found;
    }
    return filteredStores[0] || null;
  }, [activeStoreId, filteredStores]);

  // Compute map iframe url
  const iframeUrl = useMemo(() => {
    if (!activeStore) {
      // Default center: Kathmandu, Nepal
      return "https://maps.google.com/maps?q=Kathmandu,Nepal&t=&z=12&ie=UTF8&iwloc=&output=embed";
    }

    // If coordinates exist, use them
    if (activeStore.latitude && activeStore.longitude) {
      return `https://maps.google.com/maps?q=${activeStore.latitude},${activeStore.longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    // Otherwise, embed via store name and address
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      `${activeStore.storeName}, ${activeStore.address}`
    )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }, [activeStore]);

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-[#FAF9F6] border-t border-reliance-navy/10 text-reliance-navy" id="store">
      <div className="max-w-360 mx-auto px-6 lg:px-16">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">Dealer Locator</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4">
            {title || "Find Your Nearest Dealer"}
          </h2>
          <p className="text-lg text-reliance-grey">
            {subheading ? subheading : (stores.length === 0
              ? "Find authorized dealers near you."
              : `Browse our network of ${stores.length} authorized dealers.`)}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left Column: Search & List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col h-125 lg:h-162.5">
            {/* Search Input Box */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-reliance-navy/40 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveStoreId(null); // Reset active selection when query changes
                }}
                placeholder="Search by city, area, district or pincode..."
                className="w-full bg-white border border-reliance-navy/20 text-reliance-navy placeholder-reliance-navy/40 pl-12 pr-4 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-reliance-gold focus:ring-1 focus:ring-reliance-gold transition-all"
              />
            </div>

            {/* Store Cards List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center">
                  <Loader2 className="w-8 h-8 text-reliance-gold animate-spin mb-2" />
                  <p className="text-sm text-reliance-grey">Loading authorized dealers...</p>
                </div>
              ) : filteredStores.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center border border-reliance-navy/10 bg-white p-6 animate-[fadeIn_0.3s_ease_forwards]">
                  <Compass className="w-12 h-12 text-reliance-gold/50 mb-3 animate-pulse" />
                  <h3 className="font-bold text-reliance-navy text-lg mb-1">No dealers found</h3>
                  <p className="text-sm text-reliance-grey">
                    Try adjusting your search query or look for another location.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStores.map((s) => {
                    const isActive = activeStore?.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setActiveStoreId(s.id)}
                        className={`bg-white border p-6 cursor-pointer transition-all duration-300 group ${
                          isActive
                            ? "border-reliance-gold bg-reliance-gold/5"
                            : "border-reliance-navy/10 hover:border-reliance-gold/50 hover:bg-reliance-navy/5 shadow-sm hover:shadow-md"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3 gap-3">
                          <h4
                            className={`font-bold transition-colors ${
                              isActive ? "text-reliance-gold" : "text-reliance-navy group-hover:text-reliance-gold"
                            }`}
                          >
                            {s.storeName}
                          </h4>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border whitespace-nowrap transition-colors ${
                              isActive
                                ? "bg-reliance-gold text-white border-reliance-gold"
                                : "text-reliance-gold border-reliance-gold/50"
                            }`}
                          >
                            {s.district || s.province || "Dealer"}
                          </span>
                        </div>

                        <div className="space-y-2.5 text-sm text-reliance-grey">
                          <div className="flex items-start gap-2.5">
                            <MapPin size={14} className="mt-0.5 shrink-0 text-reliance-gold" />
                            <span className="line-clamp-2">{s.address}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Clock size={14} className="shrink-0 text-reliance-gold" />
                            <span>Mon–Sat: 9:00 AM – 6:00 PM</span>
                          </div>
                        </div>

                        {s.googleMapsUrl && (
                          <a
                            href={s.googleMapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-4 inline-flex items-center gap-1.5 text-xs text-reliance-gold font-bold hover:underline"
                          >
                            Get Directions <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Real Google Maps (7 cols) */}
          <div className="lg:col-span-7 h-100 lg:h-162.5 sticky top-24 bg-white border border-reliance-navy/10 overflow-hidden shadow-sm">
            <MapView 
              stores={filteredStores}
              activeStoreId={activeStoreId}
              onMarkerClick={setActiveStoreId}
              className="w-full h-full [&>div]:min-h-0 [&>div]:rounded-none [&>div]:shadow-none pointer-events-auto"
            />
            {/* Control Panel Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-reliance-navy/10 p-6 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-reliance-gold uppercase tracking-widest block mb-0.5">
                  Currently Viewing Map For
                </span>
                <h4 className="font-bold text-reliance-navy text-sm truncate">
                  {activeStore ? activeStore.storeName : "All Stores Overview"}
                </h4>
                <p className="text-xs text-reliance-grey truncate mt-0.5">
                  {activeStore ? activeStore.address : "Select a dealer to locate on map."}
                </p>
              </div>
              {activeStore && (
                <a
                  href={
                    activeStore.googleMapsUrl ||
                    `https://maps.google.com/?q=${encodeURIComponent(
                      `${activeStore.storeName}, ${activeStore.address}`
                    )}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="border border-reliance-gold bg-transparent text-reliance-gold hover:bg-reliance-gold hover:text-reliance-navy transition-colors text-[10px] uppercase tracking-widest font-bold px-4 py-3 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  Directions <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind style injection for custom-scrollbar */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(10, 37, 64, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(10, 37, 64, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </section>
  );
};
