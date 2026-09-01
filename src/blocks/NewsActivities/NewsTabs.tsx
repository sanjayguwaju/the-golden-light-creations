"use client";

import React from "react";
import type { List, Category } from "@/payload-types";
import { Link } from "@/i18n/routing";
import { formatBSDate } from "@/lib/bs-date";
import { FileText, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

type NewsTabsProps = {
  categories: Category[];
  groupedItems: Record<string, List[]>;
  viewAllText: string;
};

export function NewsTabs({ categories, groupedItems, viewAllText }: NewsTabsProps) {
  const t = useTranslations();

  if (!categories || categories.length === 0) return null;

  return (
    <Tabs defaultValue={categories[0]?.id || ""} className="w-full">
      {/* Tabs Header */}
      <TabsList className="flex items-center justify-start bg-transparent p-0 h-auto rounded-none border-b-2 border-border mb-8 w-full gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.id}
            className="
              px-5 py-2.5 text-sm font-bold whitespace-nowrap rounded-lg
              bg-transparent text-muted-foreground
              hover:text-primary hover:bg-muted
              data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-accent/20
              transition-all duration-200 border-0 outline-none ring-0
            "
          >
            {cat.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab Content */}
      {categories.map((cat) => {
        const activeItems = groupedItems[cat.id] || [];

        return (
          <TabsContent key={cat.id} value={cat.id} className="m-0 p-0 focus-visible:outline-none">
            <div className="flex flex-col gap-3">
              {activeItems.length > 0 ? (
                activeItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-background rounded-2xl border border-border p-4 md:p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-accent/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                        <FileText className="w-6 h-6" />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col">
                        <Link
                          href={`/list/${item.slug}`}
                          className="font-bold text-[15px] text-foreground group-hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <div className="inline-flex w-fit items-center text-[10px] bg-muted text-muted-foreground font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mt-1.5 border border-border">
                          {formatBSDate(item.publishedDate, "en", "full")}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/list/${item.slug}`}
                      className="bg-accent hover:bg-accent-hover text-white text-[11px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-accent/20 active:scale-95 hidden sm:flex items-center gap-2"
                    >
                      {t("view-all") || "View All"}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-muted-foreground text-sm bg-background rounded-3xl border border-dashed border-border">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-10" />
                  <p className="font-medium tracking-tight">
                    No information available in this category.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href={`/list?category=${cat.id}`}
                className="text-primary hover:text-accent font-bold text-sm flex items-center gap-2 transition-colors duration-300 group"
              >
                {viewAllText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
