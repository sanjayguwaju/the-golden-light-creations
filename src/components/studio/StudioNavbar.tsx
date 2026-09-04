"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function StudioNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Films", href: "/films" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Fixed Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl py-3.5 border-b border-[#F5B301]/15 shadow-2xl"
            : "bg-[#0A0A0A]/60 backdrop-blur-md py-5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-bebas text-2xl sm:text-3xl tracking-[0.15em] text-[#F5B301] group-hover:text-[#FFD04A] transition-colors">
              THE GOLDEN
            </span>
            <span className="font-montserrat text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-white/90">
              LIGHT CREATIONS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative font-montserrat text-xs font-semibold uppercase tracking-[0.2em] transition-colors py-1 group ${
                    isActive ? "text-[#F5B301]" : "text-white/80 hover:text-[#F5B301]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#F5B301] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#F5B301] hover:bg-[#FFD04A] text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#F5B301]/20"
            >
              <span>Book a Shoot</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden p-2 text-white hover:text-[#F5B301] transition-colors focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 h-[100dvh] w-full overflow-y-auto transition-transform duration-500 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col leading-none"
          >
            <span className="font-bebas text-2xl tracking-[0.15em] text-[#F5B301]">
              THE GOLDEN
            </span>
            <span className="font-montserrat text-[10px] font-bold tracking-[0.35em] text-white/80">
              LIGHT CREATIONS
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="p-2 text-white/80 hover:text-[#F5B301] transition-colors focus:outline-none"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile Links */}
        <nav className="flex flex-col gap-5 py-6">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-bebas text-3xl sm:text-4xl uppercase tracking-[0.05em] transition-colors ${
              pathname === "/" ? "text-[#F5B301]" : "text-white hover:text-[#F5B301]"
            }`}
          >
            Home
          </Link>
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-bebas text-3xl sm:text-4xl uppercase tracking-[0.05em] transition-colors flex items-center justify-between ${
                  isActive ? "text-[#F5B301]" : "text-white hover:text-[#F5B301]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-[#F5B301] text-lg">●</span>}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Footer CTA */}
        <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-[#F5B301] text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.2em] py-4 text-center flex items-center justify-center gap-2 shadow-xl shadow-[#F5B301]/25"
          >
            <span>Book a Shoot</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <p className="font-poppins text-xs text-white/50 text-center">
            Kathmandu, Nepal · +977 9810175322
          </p>
        </div>
      </div>
    </>
  );
}
