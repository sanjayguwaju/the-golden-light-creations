"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, Search as SearchIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Navigation as NavigationType } from "@/payload-types";
import { cn } from "@/utilities/ui";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavItem {
  id?: string | null;
  label: string;
  url?: string | null;
  menuType?: string | null;
  children?: { id?: string | null; label: string; url?: string | null }[] | null;
  megaMenuTabs?:
    | { tabLabel: string; links: { id?: string | null; label: string; url?: string | null }[] }[]
    | null;
}

type LinkData = NonNullable<NonNullable<NavigationType["navItems"]>[number]>["link"];

function extractMenuLink(link: LinkData): string {
  if (link.type === "custom") return link.url || "#";
  if (link.type === "reference" && link.reference?.value) {
    if (typeof link.reference.value === "string") {
      return link.reference.relationTo === "pages"
        ? `/${link.reference.value}`
        : `/posts/${link.reference.value}`;
    } else {
      const slug = link.reference.value.slug || link.reference.value.id;
      return link.reference.relationTo === "pages"
        ? slug === "home"
          ? "/"
          : `/${slug}`
        : `/posts/${slug}`;
    }
  }
  return "#";
}

function mapNavItems(navItems?: NavigationType["navItems"]): NavItem[] {
  if (!navItems) return [];
  return navItems
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .map((item) => {
      const link = item.link;
      if (!link) return { id: item.id, label: "Missing Link" };

      let children: NavItem["children"] = null;
      let megaMenuTabs: NavItem["megaMenuTabs"] = null;

      if (link.menuType === "subMenu" && link.subMenuLinks) {
        children = link.subMenuLinks
          .filter((sub): sub is NonNullable<typeof sub> => sub !== null)
          .map((sub) => ({
            id: sub.id,
            label: sub.link?.label || "",
            url: extractMenuLink(sub.link),
          }));
      } else if (
        (link.menuType === "megaMenu" || link.menuType === "verticalLinksMegaMenu") &&
        link.megaMenuTabs
      ) {
        children = link.megaMenuTabs
          .filter((tab): tab is NonNullable<typeof tab> => tab !== null)
          .flatMap(
            (tab) =>
              tab.links
                ?.filter((sub): sub is NonNullable<typeof sub> => sub !== null)
                .map((sub) => ({
                  id: sub.id,
                  label: sub.link?.label || "",
                  url: extractMenuLink(sub.link),
                })) || []
          );

        megaMenuTabs = link.megaMenuTabs
          .filter((tab): tab is NonNullable<typeof tab> => tab !== null)
          .map((tab) => ({
            tabLabel: tab.tabLabel,
            links:
              tab.links
                ?.filter((sub): sub is NonNullable<typeof sub> => sub !== null)
                .map((sub) => ({
                  id: sub.id,
                  label: sub.link?.label || "",
                  url: extractMenuLink(sub.link),
                })) || [],
          }));
      }

      return {
        id: item.id,
        label: link.label || "",
        url: extractMenuLink(link),
        menuType: link.menuType,
        children,
        megaMenuTabs,
      };
    });
}

interface NavbarProps {
  data: NavigationType;
}

export function Navbar({ data }: NavbarProps) {
  const items = mapNavItems(data.navItems);

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      <nav className="bg-primary text-primary-foreground">
        <div className="container flex items-stretch min-h-[50px]">
          {/* Mobile: hamburger left, search icon right */}
          <div className="lg:hidden flex items-center justify-between w-full px-4">
            <MobileMenu items={items} />
            <Link
              href="/search"
              aria-label="Search"
              className="flex items-center justify-center w-9 h-9 rounded text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              <SearchIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Home Icon - desktop */}
          <Link
            href="/"
            className="hidden lg:flex items-center justify-center px-5 border-r border-primary-foreground/10 bg-accent hover:bg-accent-hover transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-stretch">
            <DesktopMenu items={items} />
          </div>

          {/* Desktop Search icon */}
          <Link
            href="/search"
            aria-label="Search"
            className="hidden lg:flex items-center justify-center px-4 border-l border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors duration-200"
          >
            <SearchIcon className="w-5 h-5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function DesktopMenu({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTabMapping, setActiveTabMapping] = useState<Record<string, number>>({});

  return (
    <div className="flex items-stretch" onMouseLeave={() => setActiveId(null)}>
      {items.map((item) => {
        const hasChildren =
          (item.children?.length ?? 0) > 0 || (item.megaMenuTabs?.length ?? 0) > 0;
        const isActive = activeId === item.id;
        const isMegaMenu =
          item.menuType === "megaMenu" || item.menuType === "verticalLinksMegaMenu";

        return (
          <div
            key={item.id}
            className={cn("flex items-stretch", isMegaMenu ? "static" : "relative")}
            onMouseEnter={() => setActiveId(item.id ?? null)}
          >
            {/* Main Nav Link */}
            <Link
              href={item.url || "#"}
              className={cn(
                "relative flex items-center gap-2 px-6 py-2 text-[15px] font-bold z-20 transition-all duration-200 border-r border-primary-foreground/10 whitespace-nowrap",
                isActive ? "bg-accent" : "hover:bg-accent/90"
              )}
            >
              {item.label}
              {hasChildren && (
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isActive && "rotate-180"
                  )}
                />
              )}
            </Link>

            {/* Sub Menu */}
            {hasChildren && item.menuType === "subMenu" && (
              <div
                className={cn(
                  "absolute left-0 top-full min-w-full w-max bg-primary/95 z-10 shadow-xl border-t border-primary-foreground/10 transition-all duration-200 origin-top",
                  isActive
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                )}
              >
                <ul className="flex flex-col">
                  {item.children?.map((child) => (
                    <li
                      key={child.id}
                      className="border-b border-primary-foreground/5 last:border-0"
                    >
                      <Link
                        href={child.url || "#"}
                        className="block px-6 py-3 text-[14px] font-medium hover:bg-primary-foreground/10 transition-colors whitespace-nowrap"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mega Menu */}
            {hasChildren && isMegaMenu && (
              <div
                className={cn(
                  "absolute left-0 top-full w-full bg-primary/95 z-40 shadow-xl border-t border-primary-foreground/10 transition-all duration-200 origin-top",
                  isActive
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="max-w-[1400px] mx-auto p-8 flex gap-8">
                  {/* Tabs */}
                  <div className="w-1/4 border-r border-primary-foreground/10 pr-4">
                    <ul className="flex flex-col gap-2">
                      {item.megaMenuTabs?.map((tab, idx) => {
                        const activeTab = activeTabMapping[item.id || ""] || 0;
                        return (
                          <li key={idx}>
                            <button
                              onMouseEnter={() =>
                                setActiveTabMapping((prev) => ({ ...prev, [item.id || ""]: idx }))
                              }
                              className={cn(
                                "w-full text-left px-4 py-2 font-medium transition-colors border-l-2",
                                activeTab === idx
                                  ? "border-accent bg-primary-foreground/10 text-primary-foreground"
                                  : "border-transparent hover:bg-primary-foreground/5"
                              )}
                            >
                              {tab.tabLabel}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* Tab Content */}
                  <div className="w-3/4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                      {item.megaMenuTabs?.[activeTabMapping[item.id || ""] || 0]?.links.map(
                        (link) => (
                          <Link
                            key={link.id}
                            href={link.url || "#"}
                            className="font-medium flex items-center text-[15px] hover:text-accent hover:translate-x-1 transition-all"
                          >
                            {link.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/10 border border-primary-foreground/10 rounded-sm"
        >
          <Menu className="w-7 h-7" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[80%] max-w-[300px] bg-primary text-primary-foreground p-0 border-none"
      >
        <div className="p-5 border-b border-primary-foreground/10">
          <SheetTitle className="text-primary-foreground text-lg font-bold">Menu</SheetTitle>
        </div>
        <nav className="flex flex-col overflow-y-auto max-h-[calc(100vh-70px)]">
          {items.map((item) => (
            <MobileItem key={item.id} item={item} onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const hasChildren = (item.children?.length ?? 0) > 0 || (item.megaMenuTabs?.length ?? 0) > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.url || "#"}
        onClick={onNavigate}
        className="px-6 py-4 border-b border-primary-foreground/10 hover:bg-accent transition-colors font-medium block"
      >
        {item.label}
      </Link>
    );
  }

  const isMegaMenu = item.menuType === "megaMenu" || item.menuType === "verticalLinksMegaMenu";

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex w-full justify-between items-center px-6 py-4 border-b border-primary-foreground/10 hover:bg-primary-foreground/5 transition-colors group">
        <span className="font-bold">{item.label}</span>
        <ChevronDown className="w-5 h-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-primary/80 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        {item.menuType === "subMenu" &&
          item.children?.map((child) => (
            <Link
              key={child.id}
              href={child.url || "#"}
              onClick={onNavigate}
              className="block pl-10 pr-6 py-3 border-b border-primary-foreground/5 hover:bg-accent text-[14px] transition-colors"
            >
              {child.label}
            </Link>
          ))}
        {isMegaMenu &&
          item.megaMenuTabs?.map((tab, idx) => (
            <Collapsible key={idx} className="w-full">
              <CollapsibleTrigger className="flex w-full justify-between items-center pl-10 pr-6 py-3 border-b border-primary-foreground/5 hover:bg-primary-foreground/5 transition-colors group">
                <span className="font-semibold text-[14px]">{tab.tabLabel}</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-primary/60">
                {tab.links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url || "#"}
                    onClick={onNavigate}
                    className="block pl-14 pr-6 py-3 border-b border-primary-foreground/5 hover:bg-accent text-[13px] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
