"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Search as SearchIcon, X, Loader2, ArrowRight, FileText, ShoppingBag, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDebounce } from "@/utilities/useDebounce";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  relationTo: "posts" | "pages" | "products";
  description: string;
  image?: any;
  categories: string[];
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear query and selection when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Fetch results when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/instant-search?q=${encodeURIComponent(debouncedQuery)}&locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.docs || []);
          setSelectedIndex(-1);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, locale]);

  const handleSelect = useCallback((item: SearchResult) => {
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
    onClose();
  }, [router, onClose]);

  // Handle keyboard navigation (ArrowUp, ArrowDown, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, handleSelect]);

  const popularSearches = [
    { title: "Interior Paints", href: "/products/interior-paints" },
    { title: "Exterior Paints", href: "/products/exterior-paints" },
    { title: "Store Locator", href: "/store-locator" },
    { title: "About Us", href: "/about-us" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden rounded-none sm:rounded-none [&>button]:hidden">
        <DialogTitle className="sr-only">Search Website</DialogTitle>
        
        {/* Search Input Area */}
        <div className="relative flex items-center border-b border-gray-100 p-4 pr-6">
          <SearchIcon className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, posts, pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-reliance-navy placeholder:text-gray-400 text-lg border-0 outline-none focus:ring-0 pr-8"
          />
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-reliance-navy transition-colors rounded-none"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-reliance-navy transition-colors rounded-none border-l border-gray-100 pl-2.5"
              title="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results / Suggestions Area */}
        <div className="max-h-[400px] overflow-y-auto p-4 scrollbar-thin">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-reliance-gold mb-3" />
              <span className="text-sm font-medium">Searching our archive...</span>
            </div>
          )}

          {!isLoading && !query.trim() && (
            <div className="py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-reliance-navy bg-slate-50 hover:bg-reliance-gold hover:text-reliance-navy transition-all duration-200 border border-slate-100"
                  >
                    <SearchIcon className="w-3.5 h-3.5" />
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLoading && query.trim() && results.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-none bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-reliance-navy font-semibold mb-1">No results found</p>
              <p className="text-sm text-gray-400 max-w-sm mx-auto">
                We couldn&apos;t find anything matching &quot;{query}&quot;. Try adjusting your keywords.
              </p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Search Results ({results.length})
              </span>
              <div className="space-y-1">
                {results.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const itemUrl = typeof item.image === "object" && item.image?.url ? item.image.url : null;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left flex items-start gap-4 p-3 transition-all duration-200 border ${
                        isSelected 
                          ? "bg-slate-50 border-reliance-gold/30 shadow-sm" 
                          : "bg-transparent border-transparent"
                      }`}
                    >
                      {/* Image Preview / Icon */}
                      <div className="w-12 h-12 bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200/50">
                        {itemUrl ? (
                          <img src={itemUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : item.relationTo === "products" ? (
                          <ShoppingBag className="w-5 h-5 text-gray-400" />
                        ) : item.relationTo === "pages" ? (
                          <Globe className="w-5 h-5 text-gray-400" />
                        ) : (
                          <FileText className="w-5 h-5 text-gray-400" />
                        )}
                      </div>

                      {/* Content details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-reliance-navy truncate text-sm sm:text-base">
                            {item.title}
                          </span>
                          
                          {/* Entity Type Badge */}
                          <Badge 
                            variant="secondary" 
                            className={`text-[10px] font-bold tracking-widest uppercase rounded-none border-0 px-2 py-0.5 ${
                              item.relationTo === "products" 
                                ? "bg-reliance-gold/10 text-reliance-navy" 
                                : item.relationTo === "posts" 
                                ? "bg-blue-50 text-blue-700" 
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.relationTo === "products" 
                              ? "Product" 
                              : item.relationTo === "posts" 
                              ? "Blog Post" 
                              : "Page"}
                          </Badge>
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-400 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                        {item.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.categories.slice(0, 2).map((cat, cIdx) => (
                              <span key={cIdx} className="text-[9px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5">
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <ArrowRight className={`w-4 h-4 mt-1 transition-transform duration-200 shrink-0 ${
                        isSelected ? "translate-x-1 text-reliance-navy" : "text-gray-300"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
