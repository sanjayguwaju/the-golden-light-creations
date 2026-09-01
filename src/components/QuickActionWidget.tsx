"use client";

import React, { useRef, useState } from "react";
import { Calculator, MapPin, MessageCircle, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function QuickActionWidget({ whatsappNumber }: { whatsappNumber?: string | null }) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false); // Mobile primarily

  useGSAP(() => {
    // Entrance animation
    gsap.from(widgetRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 1.5, // wait for page load / splash screen
    });
  }, []);

  const cleanNumber = (whatsappNumber || "9779851310048").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  const actions = [
    {
      icon: <Calculator className="w-5 h-5" />,
      label: "Paint Calculator",
      href: "/calculator",
      color: "bg-reliance-navy text-white hover:bg-reliance-gold",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Store Locator",
      href: "/store-locator",
      color:
        "bg-white text-reliance-navy border border-gray-200 hover:border-reliance-gold hover:text-reliance-gold",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Expert Chat",
      href: whatsappUrl,
      color: "bg-[#25D366] text-white hover:bg-[#128C7E]",
      isExternal: true,
    },
  ];

  return (
    <>
      {/* DESKTOP STICKY SIDEBAR */}
      <div
        ref={widgetRef}
        className="hidden md:flex flex-col gap-3 fixed right-6 top-[72%] -translate-y-1/2 z-[90]"
      >
        {actions.map((action, idx) => {
          const content = (
            <>
              <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 shrink-0">
                {action.icon}
              </div>
              <span className="absolute right-14 bg-white text-reliance-navy text-sm font-bold px-3 py-1.5 rounded shadow-lg opacity-0 pointer-events-none translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-gray-100">
                {action.label}
              </span>
            </>
          );

          return (
            <div key={idx} className="relative group flex items-center justify-end">
              {action.isExternal ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative flex items-center justify-center rounded-full transition-colors shadow-lg ${action.color}`}
                >
                  {content}
                </a>
              ) : (
                <Link
                  href={action.href}
                  className={`relative flex items-center justify-center rounded-full transition-colors shadow-lg ${action.color}`}
                >
                  {content}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE FAB (FLOATING ACTION BUTTON) */}
      <div className="md:hidden fixed right-6 z-[90] flex flex-col items-end gap-4" style={{ bottom: "96px" }}>
        {/* Expanded Menu */}
        <div
          className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 translate-y-10 pointer-events-none"
          }`}
        >
          {actions.map((action, idx) => {
            const content = (
              <>
                <span className="text-sm font-bold bg-white text-reliance-navy px-3 py-1.5 rounded-lg shadow-md border border-gray-100">
                  {action.label}
                </span>
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg shrink-0 ${action.color}`}
                >
                  {action.icon}
                </div>
              </>
            );

            return action.isExternal ? (
              <a
                key={idx}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 justify-end"
                onClick={() => setIsOpen(false)}
              >
                {content}
              </a>
            ) : (
              <Link
                key={idx}
                href={action.href}
                className="flex items-center gap-3 justify-end"
                onClick={() => setIsOpen(false)}
              >
                {content}
              </Link>
            );
          })}
        </div>

        {/* Main Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-reliance-gold text-reliance-navy rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors border-2 border-transparent hover:border-reliance-gold"
          aria-label="Quick Actions"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}
