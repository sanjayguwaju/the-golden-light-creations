"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { Instagram, Youtube, Facebook, ArrowUpRight } from "lucide-react";

export function StudioFooter() {
  const servicesLinks = [
    { label: "Wedding Photography", href: "/services" },
    { label: "Cinematic Films", href: "/films" },
    { label: "Drone Coverage", href: "/services" },
    { label: "Fashion Shoots", href: "/services" },
    { label: "Digital Marketing", href: "/services" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Films", href: "/films" },
    { label: "Services", href: "/services" },
    { label: "Journal & Stories", href: "/posts" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#C0171E] text-white pt-16 sm:pt-20 pb-10 px-4 sm:px-8 border-t border-[#A01018]">
      <div className="max-w-7xl mx-auto">
        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          {/* Brand Bio */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span className="font-bebas text-3xl tracking-[0.15em] text-white">
                THE GOLDEN
              </span>
              <span className="font-montserrat text-xs font-bold tracking-[0.35em] text-[#FFD04A]">
                LIGHT CREATIONS
              </span>
            </Link>
            <p className="font-poppins text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-sm mb-8">
              Nepal&apos;s premier luxury photography and cinematic production studio. Every moment,
              immortalised with international excellence and authentic soul.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/the_golden_creations"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-white/30 hover:border-white text-white hover:bg-white hover:text-[#C0171E] flex items-center justify-center transition-colors bg-white/10"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@thegoldenlightcreations"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 border border-white/30 hover:border-white text-white hover:bg-white hover:text-[#C0171E] flex items-center justify-center transition-colors bg-white/10"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@thegoldencreations"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 border border-white/30 hover:border-white text-white hover:bg-white hover:text-[#C0171E] flex items-center justify-center transition-colors bg-white/10 font-bebas text-sm"
              >
                🎵
              </a>
              <a
                href="https://facebook.com/thegoldenlightcreations"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 border border-white/30 hover:border-white text-white hover:bg-white hover:text-[#C0171E] flex items-center justify-center transition-colors bg-white/10"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services Links */}
          <div className="lg:col-span-3">
            <h4 className="font-montserrat text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {servicesLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-poppins text-xs sm:text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-[#FFD04A]/60 group-hover:text-white transition-colors">
                      —
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="lg:col-span-2">
            <h4 className="font-montserrat text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-poppins text-xs sm:text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-[#FFD04A]/60 group-hover:text-white transition-colors">
                      —
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Links */}
          <div className="lg:col-span-3">
            <h4 className="font-montserrat text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] mb-6">
              Contact
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href="tel:+9779810175322"
                  className="font-poppins text-xs sm:text-sm text-white/90 hover:text-white transition-colors"
                >
                  +977 9810175322
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@thegoldenlightcreations.com"
                  className="font-poppins text-xs sm:text-sm text-white/90 hover:text-white transition-colors"
                >
                  info@thegoldenlightcreations.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9779810175322"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-poppins text-xs sm:text-sm text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li className="font-poppins text-xs sm:text-sm text-white/70">
                Kathmandu, Nepal
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-poppins text-white/70">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">The Golden Light Creations</span>. All rights reserved.
          </p>
          <p>
            Crafted with ♥ in <span className="text-[#FFD04A]">Nepal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
