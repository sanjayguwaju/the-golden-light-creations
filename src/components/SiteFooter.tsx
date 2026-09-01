"use client";
import React from "react";
import type { Footer as FooterType } from "@/payload-types";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export function SiteFooter({ data }: { data: FooterType }) {
  const companyInfo = data?.companyInfo;
  const quickLinks = data?.quickLinks || [];
  const products = data?.products || [];
  const contactInfo = data?.contactInfo;
  const bottomBar = data?.bottomBar;

  return (
    <footer className="bg-reliance-navy text-[#F5F2ED] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            {companyInfo?.logo && typeof companyInfo.logo !== 'string' ? (
              <div className="mb-6">
                <Image 
                  src={companyInfo.logo.url || ''} 
                  alt={companyInfo.logo.alt || 'Reliance Paints'} 
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-2xl font-bold tracking-tight mb-6 text-white">
                RELIANCE <span className="text-reliance-gold">PAINTS</span>
              </div>
            )}
            <p className="text-[#F5F2ED]/80 mb-6 leading-relaxed text-sm">
              {companyInfo?.description}
            </p>
            <div className="flex gap-4">
              {companyInfo?.facebookUrl && (
                <a
                  href={companyInfo.facebookUrl}
                  className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {companyInfo?.instagramUrl && (
                <a
                  href={companyInfo.instagramUrl}
                  className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {companyInfo?.tiktokUrl && (
                <a
                  href={companyInfo.tiktokUrl}
                  target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
                >
                  <TiktokIcon className="w-5 h-5" />
                </a>
              )}
              {companyInfo?.youtubeUrl && (
                <a
                  href={companyInfo.youtubeUrl}
                  className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-0 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.url || "#"}
                    className="text-[#F5F2ED]/80 hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-none bg-[#C9A84C]"></span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-0 pb-2 inline-block">
              Products
            </h3>
            <ul className="space-y-3">
              {products.map((product, i) => (
                <li key={i}>
                  <Link
                    href={product.url || "#"}
                    className="text-[#F5F2ED]/80 hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-none bg-[#C9A84C]"></span> {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-0 pb-2 inline-block">
              Contact Info
            </h3>

            {/* Head Office */}
            <div className="mb-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] mb-3">
                Head Office
              </p>
              <ul className="space-y-2.5">
                {contactInfo?.location && (
                  <li className="flex items-start gap-2.5 text-[#F5F2ED]/80">
                    <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <span className="text-sm whitespace-pre-line">{contactInfo.location}</span>
                  </li>
                )}
                {contactInfo?.phone && (
                  <li className="flex items-center gap-2.5 text-[#F5F2ED]/80">
                    <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    <span className="text-sm">{contactInfo.phone}</span>
                  </li>
                )}
                {contactInfo?.email && (
                  <li className="flex items-center gap-2.5 text-[#F5F2ED]/80">
                    <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    <span className="text-sm">{contactInfo.email}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Branch Offices */}
            {contactInfo?.branches && contactInfo.branches.length > 0 && (
              <div className="space-y-4 border-t border-white/10 pt-4">
                {contactInfo.branches.map((branch, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] mb-2">
                      {branch.name}
                    </p>
                    <ul className="space-y-1.5">
                      {branch.location && (
                        <li className="flex items-start gap-2.5 text-[#F5F2ED]/75">
                          <MapPin className="w-4 h-4 text-[#C9A84C]/70 shrink-0 mt-0.5" />
                          <span className="text-sm whitespace-pre-line">{branch.location}</span>
                        </li>
                      )}
                      {branch.phone && (
                        <li className="flex items-center gap-2.5 text-[#F5F2ED]/75">
                          <Phone className="w-4 h-4 text-[#C9A84C]/70 shrink-0" />
                          <span className="text-sm">{branch.phone}</span>
                        </li>
                      )}
                      {branch.email && (
                        <li className="flex items-center gap-2.5 text-[#F5F2ED]/75">
                          <Mail className="w-4 h-4 text-[#C9A84C]/70 shrink-0" />
                          <span className="text-sm">{branch.email}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-0 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#F5F2ED]/60">
          <p>{bottomBar?.copyright || `© ${new Date().getFullYear()} Reliance Paints. All rights reserved.`}</p>
          <div className="flex gap-4">
            {bottomBar?.links?.map((link, i) => (
              <Link key={i} href={link.url || "#"} className="hover:text-[#C9A84C] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
