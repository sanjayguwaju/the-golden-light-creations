"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, HelpCircle, Layers, Brush, Award, BookOpen, Settings } from "lucide-react";
import { cn } from "@/utilities/ui";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "products" | "technical" | "visualizer" | "warranty";
}

interface FaqAccordionProps {
  items: FaqItem[];
  locale?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: Layers },
  { id: "general", label: "General", icon: BookOpen },
  { id: "products", label: "Products", icon: Brush },
  { id: "technical", label: "Technical & Application", icon: Settings },
  { id: "visualizer", label: "Color & Visualizer", icon: Brush },
  { id: "warranty", label: "Warranty", icon: Award },
];

export default function FaqAccordion({ items, locale = "en" }: FaqAccordionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      {/* Search & Category Filter Section */}
      <div className="mb-12 space-y-6">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-reliance-navy/40" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-reliance-navy/10 rounded-2xl text-reliance-navy placeholder-reliance-navy/40 focus:outline-none focus:ring-2 focus:ring-reliance-gold/30 focus:border-reliance-gold transition-all shadow-sm text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-reliance-navy/40 hover:text-reliance-navy transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenId(null); // Close accordion on tab change
                }}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                  isActive
                    ? "bg-reliance-navy border-reliance-navy text-reliance-white shadow-sm"
                    : "bg-white border-reliance-navy/10 text-reliance-navy/70 hover:border-reliance-gold hover:text-reliance-navy"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive ? "text-reliance-gold" : "text-reliance-navy/50"
                  )}
                />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion list */}
      {filteredItems.length > 0 ? (
        <div className="space-y-6 relative py-4">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  "relative bg-white rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-reliance-gold/60 shadow-lg ring-1 ring-reliance-gold/20"
                    : "border-reliance-navy/5 hover:border-reliance-navy/10 shadow-sm"
                )}
              >
                {/* 
                  Aceternity UI Signature: Dashed Grid Lines
                  Renders 4 lines surrounding the active card extending outwards.
                */}
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-20",
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-98"
                  )}
                >
                  {/* Top Line */}
                  <div
                    className="absolute -top-2 -left-7.5 -right-7.5 h-px border-t border-dashed border-reliance-gold/45"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
                    }}
                  />
                  {/* Bottom Line */}
                  <div
                    className="absolute -bottom-2 -left-7.5 -right-7.5 h-px border-b border-dashed border-reliance-gold/45"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
                    }}
                  />
                  {/* Left Line */}
                  <div
                    className="absolute -left-2 -top-7.5 -bottom-7.5 w-px border-l border-dashed border-reliance-gold/45"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
                    }}
                  />
                  {/* Right Line */}
                  <div
                    className="absolute -right-2 -top-7.5 -bottom-7.5 w-px border-r border-dashed border-reliance-gold/45"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
                    }}
                  />
                </div>

                {/* Question / Trigger */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group relative z-10"
                >
                  <div className="flex items-start gap-4 pr-4">
                    <HelpCircle
                      className={cn(
                        "w-6 h-6 mt-0.5 shrink-0 transition-colors duration-300",
                        isOpen
                          ? "text-reliance-gold"
                          : "text-reliance-navy/30 group-hover:text-reliance-navy/60"
                      )}
                    />
                    <h3
                      className={cn(
                        "font-bold text-lg md:text-xl transition-colors duration-300",
                        isOpen
                          ? "text-reliance-navy"
                          : "text-reliance-navy/80 group-hover:text-reliance-navy"
                      )}
                    >
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0",
                      isOpen
                        ? "bg-reliance-gold/10 border-reliance-gold text-reliance-gold rotate-45"
                        : "bg-reliance-navy/5 border-reliance-navy/5 text-reliance-navy/60 group-hover:bg-reliance-navy/10 group-hover:text-reliance-navy"
                    )}
                  >
                    <Plus className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </button>

                {/* Answer / Content */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out relative z-10",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 pl-16 text-gray-600 leading-relaxed text-base md:text-lg border-t border-reliance-navy/5 mt-2">
                      <p className="whitespace-pre-line">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-reliance-navy/5 p-8 max-w-md mx-auto">
          <HelpCircle className="w-12 h-12 text-reliance-navy/20 mx-auto mb-4" />
          <h3 className="font-bold text-reliance-navy text-lg mb-2">
            No questions found
          </h3>
          <p className="text-gray-500 text-sm">
            Try filtering by a different category or search for something else.
          </p>
        </div>
      )}
    </div>
  );
}
