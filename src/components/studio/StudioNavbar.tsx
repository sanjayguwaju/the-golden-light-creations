"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Search,
  MessageCircle,
  Globe,
  ArrowRight,
} from "lucide-react";
import type { StudioNavigation, NavItem } from "@/utilities/studioDefaults";
import { defaultNavigation } from "@/utilities/studioDefaults";

interface StudioNavbarProps {
  navigation?: StudioNavigation;
}

const languages = [
  { code: "en", label: "EN", fullLabel: "English", flag: "🇺🇸" },
  { code: "ne", label: "NE", fullLabel: "नेपाली", flag: "🇳🇵" },
  { code: "hr", label: "HR", fullLabel: "Hrvatski", flag: "🇭🇷" },
];

export function StudioNavbar({ navigation }: StudioNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const [localeDropdownOpen, setLocaleDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const localeDropdownRef = useRef<HTMLDivElement | null>(null);

  const navConfig =
    navigation && navigation.navItems && navigation.navItems.length > 0
      ? navigation
      : defaultNavigation;

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

  // Close locale dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        localeDropdownRef.current &&
        !localeDropdownRef.current.contains(e.target as Node)
      ) {
        setLocaleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileSubmenu = (label: string) => {
    setOpenMobileSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const onLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- routing parameters
        { pathname, params },
        { locale: newLocale }
      );
    });
    setLocaleDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <>
      {/* Top Fixed Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl py-2.5 sm:py-3.5 border-b border-[#C0171E]/15 shadow-2xl shadow-black/5"
            : "bg-transparent backdrop-blur-md py-3.5 sm:py-5 border-b border-white/5"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-4 xl:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col leading-none shrink-0 mr-1 sm:mr-3 lg:mr-2 xl:mr-6">
            <span
              className={`font-bebas text-xl sm:text-2xl lg:text-2xl xl:text-3xl tracking-[0.12em] xl:tracking-[0.15em] transition-colors ${
                isScrolled
                  ? "text-[#C0171E] group-hover:text-[#A01018]"
                  : "text-white group-hover:text-[#FFD04A]"
              }`}
            >
              THE GOLDEN
            </span>
            <span
              className={`font-montserrat text-[9px] sm:text-[10px] xl:text-[11px] font-bold tracking-[0.25em] xl:tracking-[0.35em] transition-colors ${
                isScrolled ? "text-[#0A0A0A]/80" : "text-[#FFD04A]"
              }`}
            >
              LIGHT CREATIONS
            </span>
          </Link>

          {/* Desktop Navigation Links & Dropdowns */}
          <nav
            className="hidden xl:flex items-center gap-3.5 2xl:gap-6 shrink-0"
            aria-label="Main Navigation"
          >
            {navConfig.navItems.map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const isDropdownOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative shrink-0"
                  onMouseEnter={() => (hasSubmenu ? handleMouseEnter(item.label) : undefined)}
                  onMouseLeave={() => (hasSubmenu ? handleMouseLeave() : undefined)}
                >
                  <Link
                    href={item.href}
                    className={`relative font-montserrat text-[11px] xl:text-xs font-semibold uppercase tracking-[0.06em] lg:tracking-[0.08em] xl:tracking-[0.12em] 2xl:tracking-[0.18em] transition-colors py-2 flex items-center gap-1 xl:gap-1.5 group whitespace-nowrap shrink-0 ${
                      isActive || isDropdownOpen
                        ? isScrolled
                          ? "text-[#C0171E]"
                          : "text-[#FFD04A]"
                        : isScrolled
                        ? "text-[#0A0A0A]/75 hover:text-[#C0171E]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>

                    {/* Badge if present */}
                    {item.badge && (
                      <span className="text-[8px] xl:text-[9px] font-montserrat font-bold uppercase tracking-wider px-1 xl:px-1.5 py-0.5 rounded-full bg-[#C0171E] text-white shadow-xs shrink-0">
                        {item.badge}
                      </span>
                    )}

                    {/* Chevron for submenus */}
                    {hasSubmenu && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 shrink-0 ${
                          isDropdownOpen ? "rotate-180 text-[#C0171E]" : "opacity-60"
                        }`}
                      />
                    )}

                    {/* Active Underline */}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                        isScrolled ? "bg-[#C0171E]" : "bg-[#FFD04A]"
                      } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>

                  {/* Glassmorphic Dropdown Menu */}
                  {hasSubmenu && isDropdownOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white/98 backdrop-blur-xl border border-[#C0171E]/15 rounded-2xl p-3 shadow-2xl min-w-[280px] max-w-[340px] overflow-hidden">
                        {/* Top decorative gradient bar */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-[#C0171E] via-[#FFD04A] to-[#C0171E] rounded-full mb-2" />

                        <div className="flex flex-col gap-1">
                          {item.submenu!.map((sub, sIdx) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sIdx}
                                href={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`group/sub p-2.5 rounded-xl transition-all duration-200 flex items-start justify-between gap-3 ${
                                  isSubActive
                                    ? "bg-[#FFF5F5] text-[#C0171E]"
                                    : "hover:bg-[#FFF5F5] text-[#0A0A0A]"
                                }`}
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-montserrat font-bold text-xs uppercase tracking-wider group-hover/sub:text-[#C0171E] transition-colors">
                                      {sub.label}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[9px] font-montserrat font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#FFF5F5] text-[#C0171E] border border-[#C0171E]/20">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  {sub.description && (
                                    <p className="font-poppins text-[11px] text-[#0A0A0A]/60 font-light leading-snug mt-0.5">
                                      {sub.description}
                                    </p>
                                  )}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-[#C0171E] opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Utility Cluster: Search, WhatsApp, Locale Switcher, CTA, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0">
            {/* Search Icon */}
            {navConfig.enableSearch && (
              <Link
                href="/search"
                aria-label="Search Studio Works"
                className={`hidden sm:inline-flex p-1.5 xl:p-2 rounded-full transition-colors shrink-0 ${
                  isScrolled
                    ? "text-[#0A0A0A]/70 hover:text-[#C0171E] hover:bg-[#FFF5F5]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                title="Search Stories & Films"
              >
                <Search className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              </Link>
            )}

            {/* WhatsApp Quick Direct */}
            {navConfig.enableWhatsApp && (
              <a
                href="https://wa.me/9779810175322"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat with us on WhatsApp"
                className={`hidden sm:inline-flex p-1.5 xl:p-2 rounded-full transition-colors shrink-0 ${
                  isScrolled
                    ? "text-[#0A0A0A]/70 hover:text-[#C0171E] hover:bg-[#FFF5F5]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              </a>
            )}

            {/* Language Switcher Dropdown */}
            {navConfig.enableLocaleSwitcher && (
              <div className="relative shrink-0" ref={localeDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLocaleDropdownOpen(!localeDropdownOpen)}
                  disabled={isPending}
                  className={`flex items-center gap-1 text-[10px] xl:text-xs font-montserrat font-bold uppercase tracking-wider py-1 xl:py-1.5 px-2 xl:px-2.5 rounded-full border transition-all whitespace-nowrap shrink-0 ${
                    isScrolled
                      ? "border-[#C0171E]/20 text-[#0A0A0A] hover:border-[#C0171E] hover:bg-[#FFF5F5]"
                      : "border-white/20 text-white hover:border-white hover:bg-white/10"
                  }`}
                  aria-label="Switch Language"
                >
                  <Globe className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#C0171E] shrink-0" />
                  <span>{currentLang.code}</span>
                  <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3 opacity-60 shrink-0" />
                </button>

                {localeDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-[#C0171E]/15 rounded-xl shadow-2xl p-1.5 min-w-[130px] z-50 animate-in fade-in-0 zoom-in-95">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => onLocaleChange(lang.code)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-montserrat font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                          locale === lang.code
                            ? "bg-[#C0171E] text-white"
                            : "text-[#0A0A0A] hover:bg-[#FFF5F5] hover:text-[#C0171E]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.fullLabel}</span>
                        </span>
                        {locale === lang.code && <span className="text-[10px]">●</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Desktop CTA Button */}
            <Link
              href={navConfig.ctaButton?.href || "/contact"}
              className={`hidden sm:inline-flex items-center gap-1.5 xl:gap-2 font-montserrat font-bold text-[10px] sm:text-[11px] xl:text-xs uppercase tracking-[0.10em] xl:tracking-[0.18em] px-3 sm:px-3.5 xl:px-5 2xl:px-6 py-1.5 sm:py-2 xl:py-2.5 2xl:py-3 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg rounded-full whitespace-nowrap shrink-0 ${
                isScrolled
                  ? "bg-[#C0171E] hover:bg-[#A01018] text-white shadow-[#C0171E]/20"
                  : "bg-white hover:bg-[#FFF5F5] text-[#C0171E] shadow-xl"
              }`}
            >
              <span>{navConfig.ctaButton?.label || "Book a Shoot"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className={`xl:hidden p-1.5 sm:p-2 transition-colors focus:outline-hidden shrink-0 ${
                isScrolled
                  ? "text-[#0A0A0A] hover:text-[#C0171E]"
                  : "text-white hover:text-[#FFD04A]"
              }`}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer: Crimson Red with White Text */}
      <div
        className={`fixed inset-0 z-[100] bg-[#C0171E] text-white flex flex-col justify-between p-6 sm:p-8 h-[100dvh] w-full overflow-y-auto transition-transform duration-500 ease-out xl:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col leading-none"
            >
              <span className="font-bebas text-2xl tracking-[0.15em] text-white">
                THE GOLDEN
              </span>
              <span className="font-montserrat text-[10px] font-bold tracking-[0.35em] text-[#FFD04A]">
                LIGHT CREATIONS
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="p-2 text-white/90 hover:text-white transition-colors focus:outline-hidden"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Mobile Navigation Links + Expandable Accordions */}
          <nav className="flex flex-col gap-2 py-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-bebas text-2xl sm:text-3xl uppercase tracking-[0.05em] py-2 transition-colors ${
                pathname === "/" ? "text-[#FFD04A]" : "text-white hover:text-[#FFD04A]"
              }`}
            >
              Home
            </Link>

            {navConfig.navItems.map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuOpen = openMobileSubmenus[item.label] || false;
              const isActive = pathname === item.href;

              return (
                <div key={item.label} className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-bebas text-2xl sm:text-3xl uppercase tracking-[0.05em] flex items-center gap-2 transition-colors ${
                        isActive ? "text-[#FFD04A]" : "text-white hover:text-[#FFD04A]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="font-montserrat text-[9px] uppercase tracking-wider font-bold bg-white text-[#C0171E] px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {hasSubmenu && (
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="p-2 text-white/80 hover:text-white focus:outline-hidden"
                        aria-label={`Toggle ${item.label} Submenu`}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isSubmenuOpen ? "rotate-180 text-[#FFD04A]" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu accordion list */}
                  {hasSubmenu && isSubmenuOpen && (
                    <div className="pl-4 pb-2 pt-1 flex flex-col gap-2 border-l-2 border-[#FFD04A]/40 my-1">
                      {item.submenu!.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-montserrat text-xs uppercase tracking-wider text-white/85 hover:text-[#FFD04A] py-1.5 flex items-center justify-between"
                        >
                          <span>{sub.label}</span>
                          {sub.badge && (
                            <span className="text-[8px] bg-white/20 text-[#FFD04A] px-1.5 py-0.5 rounded">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Footer: Language Pills + Search + WhatsApp + CTA */}
        <div className="flex flex-col gap-4 pt-6 border-t border-white/20">
          {/* Quick utility links row */}
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-white/10 text-white font-montserrat text-xs uppercase tracking-wider"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </Link>

            <a
              href="https://wa.me/9779810175322"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-white/10 text-white font-montserrat text-xs uppercase tracking-wider"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Language Selector Row */}
          <div className="flex items-center justify-center gap-2 py-1">
            <span className="text-xs font-montserrat text-white/60 uppercase tracking-widest mr-2">
              Language:
            </span>
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => onLocaleChange(l.code)}
                className={`px-3 py-1 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider transition-colors ${
                  locale === l.code
                    ? "bg-white text-[#C0171E]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>

          <Link
            href={navConfig.ctaButton?.href || "/contact"}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-white hover:bg-[#FFF5F5] text-[#C0171E] font-montserrat font-bold text-xs uppercase tracking-[0.2em] py-4 text-center flex items-center justify-center gap-2 shadow-2xl transition-colors rounded-full"
          >
            <span>{navConfig.ctaButton?.label || "Book a Shoot"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <p className="font-poppins text-xs text-white/80 text-center">
            Kathmandu, Nepal · +977 9810175322
          </p>
        </div>
      </div>
    </>
  );
}
