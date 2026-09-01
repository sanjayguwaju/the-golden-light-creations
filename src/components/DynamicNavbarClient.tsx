"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Search, Menu, X, Loader2, ArrowRight, FileText, ShoppingBag, Globe } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { useDebounce } from "@/utilities/useDebounce";
import { Badge } from "@/components/ui/badge";
import type { Navigation } from "@/payload-types";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  relationTo: "posts" | "pages" | "products";
  description: string;
  image?: any;
  categories: string[];
}

// Dynamic unsplash fallback image matching by slug
const getLinkImage = (slug: string) => {
  const images: Record<string, string> = {
    "about-us": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    "our-team": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    "careers": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    "investor-relations": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
    "sustainability": "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop",
    "certifications-quality-standards": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    "posts": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    "painting-tips-diy-guides": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    "colour-trends": "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop",
    "media-center": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=600&auto=format&fit=crop",
    "faqs": "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=600&auto=format&fit=crop",
    "contact-us": "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=600&auto=format&fit=crop",
    "store-locator": "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=600&auto=format&fit=crop",
    "calculator": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    "inspiration": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    "dealership-inquiry": "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=600&auto=format&fit=crop",
    "contractors-program": "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=600&auto=format&fit=crop",
    "warranty-registration": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
    "exterior-paints": "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=600&auto=format&fit=crop",
    "interior-paints": "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop",
    "distempers": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
    "enamel-paints": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    "undercoats-and-wall-primers": "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop",
    "undercoats-primers": "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop",
    "metal-primer": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
    "wood-primer": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
  };

  const cleanSlug = slug.replace(/^\//, "");
  return images[cleanSlug] || "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop";
};

// Utility to resolve dynamic link Href and Label
const getLinkHrefAndLabel = (linkObj: any) => {
  const label = linkObj?.label || "";
  let href = "";
  
  if (linkObj?.type === "reference" && linkObj?.reference) {
    const refValue = linkObj.reference.value;
    const relationTo = linkObj.reference.relationTo;
    const slug = typeof refValue === "object" ? refValue?.slug : "";
    
    if (relationTo === "posts") {
      href = `/posts/${slug}`;
    } else if (relationTo === "pages") {
      href = slug === "home" ? "/" : `/${slug}`;
    } else {
      href = `/${slug}`;
    }
  } else {
    href = linkObj?.url || "#";
  }
  
  return { href, label };
};

export function DynamicNavbarClient({ 
  navigation, 
  locale 
}: { 
  navigation: Navigation; 
  locale: string; 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchSelectedIndex, setSearchSelectedIndex] = useState(-1);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Helper to determine if a menu item is active
  const isItemActive = (item: any) => {
    if (!item?.link) return false;
    const { href } = getLinkHrefAndLabel(item.link);
    if (href === pathname || (href !== "/" && pathname?.startsWith(href))) return true;

    const menuType = item.link.menuType || "standalone";
    if (menuType === "subMenu" && item.link.subMenuLinks) {
      return item.link.subMenuLinks.some((sub: any) => {
        const { href: subHref } = getLinkHrefAndLabel(sub?.link);
        return subHref === pathname || (subHref !== "/" && pathname?.startsWith(subHref));
      });
    }

    if ((menuType === "megaMenu" || menuType === "verticalLinksMegaMenu") && item.link.megaMenuTabs) {
      return item.link.megaMenuTabs.some((tab: any) => {
        return (tab.links || []).some((tabLink: any) => {
          const { href: tabHref } = getLinkHrefAndLabel(tabLink?.link);
          return tabHref === pathname || (tabHref !== "/" && pathname?.startsWith(tabHref));
        });
      });
    }

    return false;
  };

  useEffect(() => {
    if (!isMobileMenuOpen) setOpenMobileAccordion(null);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setHoveredMenu(null);
  }, [pathname]);

  useGSAP(() => {
    if (isMobileMenuOpen) {
      setTimeout(() => {
        gsap.fromTo(
          ".mobile-menu-item",
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: 0.1, 
            duration: 0.6, 
            ease: "power2.out",
          }
        );
      }, 50); // Ensure Shadcn Sheet has mounted the elements in the DOM
    }
  }, { dependencies: [isMobileMenuOpen] });

  // Focus input when search bar opens
  useEffect(() => {
    if (isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setSearchSelectedIndex(-1);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Fetch search results
  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setSearchResults([]);
      setIsSearchLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsSearchLoading(true);
      try {
        const response = await fetch(`/api/instant-search?q=${encodeURIComponent(debouncedSearchQuery)}&locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.docs || []);
          setSearchSelectedIndex(-1);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsSearchLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearchQuery, locale]);

  const handleSelectSearch = useCallback((item: SearchResult) => {
    let href = "";
    if (item.relationTo === "products") {
      href = `/products/${item.slug}`;
    } else if (item.relationTo === "posts") {
      href = `/posts/${item.slug}`;
    } else {
      // Pages
      href = item.slug === "home" ? "/" : `/${item.slug}`;
    }
    
    router.push(href);
    setIsSearchOpen(false);
  }, [router]);

  // Handle keyboard navigation inside search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSearchSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSearchSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (searchSelectedIndex >= 0 && searchSelectedIndex < searchResults.length) {
          handleSelectSearch(searchResults[searchSelectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, searchResults, searchSelectedIndex, handleSelectSearch]);

  const popularSearches = [
    { title: "Interior Paints", href: "/products/interior-paints" },
    { title: "Exterior Paints", href: "/products/exterior-paints" },
    { title: "Store Locator", href: "/store-locator" },
    { title: "About Us", href: "/about-us" },
  ];

  return (
    <nav className="bg-white border-0 sticky top-0 z-50 w-full transition-all duration-300">
      {/* Background backdrop for search */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 top-20 bg-[#0A101C]/40 backdrop-blur-sm z-40" 
          onClick={() => setIsSearchOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 relative h-20">
        
        {/* --- NORMAL NAVBAR CONTENT --- */}
        <div 
          className="w-full h-full flex justify-between items-center gap-4 relative z-50 bg-white"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            {typeof navigation.brand?.logo === "object" && navigation.brand.logo?.url ? (
              <Image 
                src={navigation.brand.logo.url} 
                alt={navigation.brand.logo.alt || navigation.brand.brandName || "Logo"} 
                width={navigation.brand.logoConfiguration?.width || 140}
                height={navigation.brand.logoConfiguration?.height || 70}
                className="object-contain"
                style={{
                  height: `${navigation.brand.logoConfiguration?.height || 70}px`,
                  width: "auto"
                }}
              />
            ) : (
              <div className="text-2xl font-bold text-reliance-navy tracking-tight">
                {navigation.brand?.brandName || (
                  <>RELIANCE <span className="text-reliance-gold">PAINTS</span></>
                )}
              </div>
            )}
          </Link>

          {/* Desktop Menus */}
          <div className="hidden xl:flex flex-1 justify-center items-center h-full z-40">
            <div className="flex items-center gap-6">
              {navigation.navItems?.map((item) => {
                const { link: linkData } = item;
                if (!linkData) return null;
                
                const { href, label } = getLinkHrefAndLabel(linkData);
                const menuType = linkData.menuType || "standalone";

                if (menuType === "standalone") {
                  const isActive = isItemActive(item);
                  return (
                    <Link 
                      key={item.id} 
                      href={href} 
                      className={`${isActive ? "text-reliance-gold" : "text-reliance-navy"} font-medium hover:text-reliance-gold transition-colors`}
                    >
                      {label}
                    </Link>
                  );
                }

                if (menuType === "subMenu") {
                  const subLinks = linkData.subMenuLinks || [];
                  const isActive = isItemActive(item);
                  return (
                    <div 
                      key={item.id} 
                      className="group relative"
                      onMouseEnter={() => setHoveredMenu(item.id as string)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      <Link 
                        href={href} 
                        className={`flex items-center gap-1 ${isActive ? "text-reliance-gold" : "text-reliance-navy"} font-medium hover:text-reliance-gold transition-colors py-8`}
                      >
                        {label} <ChevronDown className="w-4 h-4" />
                      </Link>
                      <div className={`absolute top-full right-0 w-64 bg-white rounded-none shadow-xl border border-gray-100 transition-all duration-300 z-50 ${hoveredMenu === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
                        <div className="p-2 flex flex-col">
                          {subLinks.map((subItem) => {
                            const subLinkData = subItem.link;
                            if (!subLinkData) return null;
                            const { href: subHref, label: subLabel } = getLinkHrefAndLabel(subLinkData);
                            const isSubActive = subHref === pathname || (subHref !== "/" && pathname?.startsWith(subHref));
                            return (
                              <Link 
                                key={subItem.id} 
                                href={subHref} 
                                className={`px-4 py-3 text-sm font-medium hover:text-reliance-gold hover:bg-slate-50 transition-colors ${isSubActive ? "text-reliance-gold bg-slate-50/50" : "text-reliance-navy"}`}
                              >
                                {subLabel}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (menuType === "megaMenu" || menuType === "verticalLinksMegaMenu") {
                  const tabs = linkData.megaMenuTabs || [];
                  const hasImages = tabs.some((tab) =>
                    (tab.links || []).some((tabLink) =>
                      tabLink.link?.image && typeof tabLink.link.image === "object" && tabLink.link.image.url
                    )
                  );

                  if (hasImages) {
                    const isActive = isItemActive(item);
                    return (
                      <div 
                        key={item.id} 
                        className="group"
                        onMouseEnter={() => setHoveredMenu(item.id as string)}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <Link 
                          href={href} 
                          className={`flex items-center gap-1 ${isActive ? "text-reliance-gold" : "text-reliance-navy"} font-medium hover:text-reliance-gold transition-colors py-8`}
                        >
                          {label} <ChevronDown className="w-4 h-4" />
                        </Link>
                        <div className={`absolute top-[80px] left-0 w-full bg-[#0A101C] rounded-none shadow-2xl transition-all duration-300 overflow-hidden border-0 z-[100] ${hoveredMenu === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
                          <div className="container mx-auto px-4 py-10">
                            {tabs.map((tab) => {
                              const tabLinks = tab.links || [];
                              return (
                                <div key={tab.id}>
                                  <div className="text-[10px] font-bold tracking-widest text-gray-400 mb-6 uppercase">
                                    {tab.tabLabel} &gt;
                                  </div>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {tabLinks.map((tabLinkItem) => {
                                      const tabLinkData = tabLinkItem.link;
                                      if (!tabLinkData) return null;
                                      
                                      const { href: tabHref, label: tabLabel } = getLinkHrefAndLabel(tabLinkData);
                                      const customImageUrl = typeof tabLinkData.image === "object" && tabLinkData.image?.url ? tabLinkData.image.url : null;

                                      if (customImageUrl) {
                                        return (
                                          <Link 
                                            key={tabLinkItem.id} 
                                            href={tabHref} 
                                            className="group/card flex flex-col rounded-none overflow-hidden bg-[#162032] hover:bg-reliance-navy transition-colors shadow-sm"
                                          >
                                            <div className="h-36 w-full relative bg-gray-800 flex items-center justify-center">
                                              <img 
                                                src={customImageUrl} 
                                                alt={tabLabel} 
                                                className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity" 
                                              />
                                            </div>
                                            <div className="p-4 flex justify-between items-center bg-[#162032] group-hover/card:bg-reliance-navy transition-colors">
                                              <span className="text-sm font-semibold text-white">{tabLabel}</span>
                                              <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90 group-hover/card:text-white transition-colors group-hover/card:translate-x-1" />
                                            </div>
                                          </Link>
                                        );
                                      } else {
                                        const isTabActive = tabHref === pathname || (tabHref !== "/" && pathname?.startsWith(tabHref));
                                        return (
                                          <Link 
                                            key={tabLinkItem.id} 
                                            href={tabHref} 
                                            className={`flex items-center justify-between p-4 transition-colors border shadow-sm ${isTabActive ? "bg-reliance-gold/10 text-reliance-gold border-reliance-gold/20" : "bg-[#162032]/40 hover:bg-[#162032] text-gray-200 hover:text-white border-white/5"}`}
                                          >
                                            <span>{tabLabel}</span>
                                            <ChevronDown className={`w-4 h-4 -rotate-90 transition-colors ${isTabActive ? "text-reliance-gold" : "text-gray-400 hover:text-white"}`} />
                                          </Link>
                                        );
                                      }
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    // Fallback
                    const flattenedLinks = tabs.flatMap((tab) => tab.links || []);
                    const isActive = isItemActive(item);
                    return (
                      <div 
                        key={item.id} 
                        className="group relative"
                        onMouseEnter={() => setHoveredMenu(item.id as string)}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <Link 
                          href={href} 
                          className={`flex items-center gap-1 ${isActive ? "text-reliance-gold" : "text-reliance-navy"} font-medium hover:text-reliance-gold transition-colors py-8`}
                        >
                          {label} <ChevronDown className="w-4 h-4" />
                        </Link>
                        <div className={`absolute top-[80px] left-0 w-64 bg-white rounded-none shadow-xl border border-gray-100 transition-all duration-300 z-[100] ${hoveredMenu === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
                          <div className="p-2 flex flex-col">
                            {flattenedLinks.map((tabLinkItem) => {
                              const tabLinkData = tabLinkItem.link;
                              if (!tabLinkData) return null;
                              const { href: subHref, label: subLabel } = getLinkHrefAndLabel(tabLinkData);
                              const isSubActive = subHref === pathname || (subHref !== "/" && pathname?.startsWith(subHref));
                              return (
                                <Link 
                                  key={tabLinkItem.id} 
                                  href={subHref} 
                                  className={`px-4 py-3 text-sm font-medium hover:text-reliance-gold hover:bg-slate-50 transition-colors ${isSubActive ? "text-reliance-gold bg-slate-50/50" : "text-reliance-navy"}`}
                                >
                                  {subLabel}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                }

                return null;
              })}
            </div>
          </div>

          {/* Actions (Desktop & Mobile normal state) */}
          <div className="flex items-center gap-4 z-50 shrink-0">
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={`transition-colors focus:outline-none cursor-pointer p-2 -mr-2 xl:mr-0 ${
                isSearchOpen ? 'text-reliance-gold' : 'text-reliance-navy hover:text-reliance-gold'
              }`}
              aria-label="Toggle search dialog"
            >
              {isSearchOpen ? <X className="w-5 h-5 xl:w-5 xl:h-5" /> : <Search className="w-5 h-5 xl:w-5 xl:h-5" />}
            </button>
            <MagneticWrapper>
              <Link 
                href="/store-locator" 
                className="hidden xl:flex items-center justify-center bg-reliance-navy text-white px-5 py-2.5 text-sm rounded-none hover:bg-reliance-gold transition-colors font-semibold tracking-wide"
              >
                Find a Dealer
              </Link>
            </MagneticWrapper>
            
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="xl:hidden text-reliance-navy" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="!max-w-full w-full sm:w-full bg-white border-none text-reliance-navy [&>button]:hidden p-0 z-[200] flex flex-col h-[100dvh]">
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                <div className="flex justify-between items-center p-4 bg-white shrink-0">
                  <div className="text-xl font-bold text-reliance-navy tracking-tight flex items-center">
                    {typeof navigation.brand?.logo === "object" && navigation.brand.logo?.url ? (
                      <Image 
                        src={navigation.brand.logo.url} 
                        alt={navigation.brand.logo.alt || navigation.brand.brandName || "Logo"} 
                        width={navigation.brand.logoConfiguration?.width || 140}
                        height={navigation.brand.logoConfiguration?.height || 70}
                        className="object-contain"
                        style={{
                          height: "60px",
                          width: "auto"
                        }}
                      />
                    ) : (
                      navigation.brand?.brandName || (
                        <>RELIANCE <span className="text-reliance-gold">PAINTS</span></>
                      )
                    )}
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 -mr-2 text-gray-400 hover:text-reliance-navy hover:bg-slate-100 rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto overscroll-contain text-reliance-navy">
                  <div className="p-4 flex flex-col gap-2 pb-6">
                    <Link 
                      href="/" 
                      className="mobile-menu-item px-4 py-3 text-lg font-medium hover:bg-slate-50 rounded-none" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>

                    {/* Mobile Menu Accordion */}
                    {navigation.navItems?.map((item) => {
                      const { link: linkData } = item;
                      if (!linkData) return null;
                      
                      const { href, label } = getLinkHrefAndLabel(linkData);
                      if (href === "/") return null; // Skip Home link

                      const menuType = linkData.menuType || "standalone";

                      if (menuType === "standalone") {
                        return (
                          <Link 
                            key={item.id} 
                            href={href} 
                            className="mobile-menu-item px-4 py-3 text-lg font-medium hover:bg-slate-50 rounded-none" 
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {label}
                          </Link>
                        );
                      }

                      if (menuType === "subMenu") {
                        const subLinks = linkData.subMenuLinks || [];
                        return (
                          <Collapsible 
                            key={item.id} 
                            className="w-full mobile-menu-item"
                            open={openMobileAccordion === item.id}
                            onOpenChange={(isOpen) => setOpenMobileAccordion(isOpen ? (item.id ?? null) : null)}
                          >
                            <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium hover:bg-slate-50 rounded-none group">
                              {label}
                              <ChevronDown className="w-5 h-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="py-2">
                              <div className="flex flex-col">
                                {subLinks.map((subItem) => {
                                  const subLinkData = subItem.link;
                                  if (!subLinkData) return null;
                                  const { href: subHref, label: subLabel } = getLinkHrefAndLabel(subLinkData);
                                  return (
                                    <Link 
                                      key={subItem.id} 
                                      href={subHref} 
                                      onClick={() => setIsMobileMenuOpen(false)} 
                                      className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-reliance-navy hover:bg-slate-50 transition-colors rounded-none"
                                    >
                                      {subLabel}
                                    </Link>
                                  );
                                })}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      }

                      if (menuType === "megaMenu" || menuType === "verticalLinksMegaMenu") {
                        const tabs = linkData.megaMenuTabs || [];
                        return (
                          <Collapsible 
                            key={item.id} 
                            className="w-full mobile-menu-item"
                            open={openMobileAccordion === item.id}
                            onOpenChange={(isOpen) => setOpenMobileAccordion(isOpen ? (item.id ?? null) : null)}
                          >
                            <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium hover:bg-slate-50 rounded-none group">
                              {label}
                              <ChevronDown className="w-5 h-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-2 pt-4 pb-2">
                              {tabs.map((tab) => {
                                const tabLinks = tab.links || [];
                                return (
                                  <div key={tab.id} className="mb-4">
                                    <div className="text-[10px] font-bold tracking-widest text-gray-500 mb-4 px-2 uppercase">
                                      {tab.tabLabel} &gt;
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {tabLinks.map((tabLinkItem) => {
                                        const tabLinkData = tabLinkItem.link;
                                        if (!tabLinkData) return null;
                                        const { href: tabHref, label: tabLabel } = getLinkHrefAndLabel(tabLinkData);
                                        const customImageUrl = typeof tabLinkData.image === "object" && tabLinkData.image?.url ? tabLinkData.image.url : null;

                                        if (customImageUrl) {
                                          return (
                                            <Link 
                                              key={tabLinkItem.id} 
                                              href={tabHref}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="group/mobcard flex flex-col rounded-none overflow-hidden bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors text-center"
                                            >
                                              <div className="h-24 w-full relative bg-slate-200">
                                                <img 
                                                  src={customImageUrl} 
                                                  alt={tabLabel} 
                                                  className="w-full h-full object-cover opacity-90 group-hover/mobcard:opacity-100 transition-opacity" 
                                                />
                                              </div>
                                              <div className="p-3">
                                                <span className="text-xs font-semibold text-reliance-navy">{tabLabel}</span>
                                              </div>
                                            </Link>
                                          );
                                        } else {
                                          return (
                                            <Link 
                                              key={tabLinkItem.id} 
                                              href={tabHref}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="col-span-2 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-reliance-navy bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
                                            >
                                              {tabLabel}
                                            </Link>
                                          );
                                        }
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
                  
                <div className="p-4 bg-white border-t border-gray-100 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <Link 
                    href="/store-locator"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-menu-item block w-full text-center bg-reliance-gold text-reliance-navy font-bold py-3.5 rounded-none hover:bg-slate-100 transition-colors border-2 border-reliance-gold"
                  >
                    Find a Dealer
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* --- PRODUCTION GRADE SEARCH MODAL --- */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
            {/* Dark Blurred Backdrop */}
            <div 
              className="absolute inset-0 bg-reliance-navy/80 backdrop-blur-md transition-opacity" 
              onClick={() => setIsSearchOpen(false)}
            />
            
            {/* Modal Container */}
            <div 
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input Area */}
              <div className="relative flex items-center px-4 border-b border-gray-100">
                <Search className="w-6 h-6 text-reliance-gold shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, posts, pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-16 sm:h-20 px-4 bg-transparent border-none text-reliance-navy placeholder:text-gray-400 focus:outline-none focus:ring-0 text-lg sm:text-2xl font-medium w-full"
                />
                
                <div className="flex items-center gap-2 shrink-0">
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")} 
                      className="p-2 text-gray-400 hover:text-reliance-navy transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
                      title="Clear search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block"></div>
                  <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-reliance-navy bg-gray-50 hover:bg-gray-200 transition-colors rounded-md border border-gray-200" 
                    title="Close (Esc)"
                  >
                    <span className="font-bold text-red-500">X</span>
                  </button>
                  <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="sm:hidden p-2 text-gray-400 hover:text-reliance-navy bg-gray-50 rounded-full" 
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* SEARCH RESULTS AREA */}
              <div className="flex flex-col bg-slate-50/50 min-h-[300px] max-h-[60vh] overflow-hidden relative">
                
                {isSearchLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-reliance-gold mb-3" />
                    <span className="text-sm font-medium text-reliance-navy">Searching...</span>
                  </div>
                )}

                <div className="overflow-y-auto scrollbar-thin p-4 sm:p-6 flex-1">
                  
                  {/* Default State: Popular Searches */}
                  {!searchQuery.trim() && (
                    <div className="py-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">
                        Popular Searches
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {popularSearches.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              router.push(item.href);
                              setIsSearchOpen(false);
                            }}
                            className="flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-reliance-gold hover:shadow-md transition-all duration-200 text-center group"
                          >
                            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-reliance-gold/10 transition-colors">
                              <Search className="w-5 h-5 text-gray-400 group-hover:text-reliance-gold transition-colors" />
                            </div>
                            <span className="text-sm font-semibold text-reliance-navy">{item.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {searchQuery.trim() && searchResults.length === 0 && !isSearchLoading && (
                    <div className="text-center py-16 px-4">
                      <div className="w-20 h-20 bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-6 rounded-2xl rotate-3">
                        <Search className="w-10 h-10 text-gray-300 -rotate-3" />
                      </div>
                      <p className="text-reliance-navy text-xl font-bold mb-2">No results found</p>
                      <p className="text-base text-gray-500 max-w-sm mx-auto">
                        We couldn&apos;t find anything matching &quot;<span className="font-semibold text-reliance-navy">{searchQuery}</span>&quot;. Try checking for typos or using different keywords.
                      </p>
                    </div>
                  )}

                  {/* Results List */}
                  {searchQuery.trim() && searchResults.length > 0 && !isSearchLoading && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 flex items-center justify-between">
                        <span>Search Results</span>
                        <span className="bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
                          {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}
                        </span>
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {searchResults.map((item, idx) => {
                          const isSelected = idx === searchSelectedIndex;
                          const itemUrl = typeof item.image === "object" && item.image?.url ? item.image.url : null;
                          
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelectSearch(item)}
                              onMouseEnter={() => setSearchSelectedIndex(idx)}
                              className={`w-full text-left flex items-start gap-4 p-3 rounded-xl transition-all duration-200 border outline-none ${
                                isSelected 
                                  ? "bg-white border-reliance-gold shadow-md ring-1 ring-reliance-gold/20" 
                                  : "bg-white border-gray-200 hover:border-reliance-gold/50 hover:shadow-sm"
                              }`}
                            >
                              {/* Thumbnail / Icon */}
                              <div className="w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                                {itemUrl ? (
                                  <img src={itemUrl} alt={item.title} className="w-full h-full object-cover" />
                                ) : item.relationTo === "products" ? (
                                  <ShoppingBag className="w-6 h-6 text-gray-400" />
                                ) : item.relationTo === "pages" ? (
                                  <Globe className="w-6 h-6 text-gray-400" />
                                ) : (
                                  <FileText className="w-6 h-6 text-gray-400" />
                                )}
                              </div>

                              {/* Content Details */}
                              <div className="flex-1 min-w-0 py-0.5">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-[9px] font-bold tracking-widest uppercase rounded bg-opacity-10 border-0 px-1.5 py-0.5 shrink-0 ${
                                      item.relationTo === "products" 
                                        ? "bg-reliance-gold text-reliance-navy" 
                                        : item.relationTo === "posts" 
                                        ? "bg-blue-500 text-blue-700" 
                                        : "bg-gray-500 text-gray-700"
                                    }`}
                                  >
                                    {item.relationTo === "products" 
                                      ? "Product" 
                                      : item.relationTo === "posts" 
                                      ? "Post" 
                                      : "Page"}
                                  </Badge>
                                </div>
                                <span className="font-bold text-reliance-navy line-clamp-1 text-sm mb-1 group-hover:text-reliance-gold transition-colors">
                                  {item.title}
                                </span>
                                {item.description && (
                                  <p className="text-xs text-gray-500 line-clamp-1">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              {/* Enter arrow for selected item (desktop only) */}
                              {isSelected && (
                                <div className="hidden sm:flex self-center w-6 h-6 rounded-full bg-reliance-gold/10 items-center justify-center shrink-0">
                                  <ArrowRight className="w-3.5 h-3.5 text-reliance-gold" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="hidden sm:flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-100 text-[11px] font-medium text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <kbd className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 shadow-sm font-sans">↑</kbd>
                      <kbd className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 shadow-sm font-sans">↓</kbd>
                      to navigate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 shadow-sm font-sans">Enter</kbd>
                      to select
                    </span>
                  </div>
                  <span>reliancepaints.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
