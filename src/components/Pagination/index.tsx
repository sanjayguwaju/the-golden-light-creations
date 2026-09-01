"use client";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/utilities/ui";
import { useRouter } from "next/navigation";
import React from "react";

type PageItem = number | "ellipsis";

function renderPageRange(current: number, total: number, maxVisible = 5): PageItem[] {
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: PageItem[] = [];

  // Always show first
  pages.push(1);

  const leftThreshold = 3;
  const rightThreshold = total - 2;

  if (current <= leftThreshold) {
    // show 1,2,3,4 ... last
    pages.push(2, 3, 4);
    pages.push("ellipsis");
    pages.push(total);
    return pages;
  }

  if (current >= rightThreshold) {
    // show 1, ... total-3, total-2, total-1, total
    pages.push("ellipsis");
    pages.push(total - 3, total - 2, total - 1, total);
    return pages;
  }

  // middle: 1 ... current-1, current, current+1 ... total
  pages.push("ellipsis");
  pages.push(current - 1, current, current + 1);
  pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export const Pagination: React.FC<{
  className?: string;
  page: number;
  totalPages: number;
  baseUrl?: string;
}> = (props) => {
  const router = useRouter();

  const { className, page, totalPages, baseUrl = "/posts" } = props;
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const hasExtraPrevPages = page - 1 > 1;
  const hasExtraNextPages = page + 1 < totalPages;

  const getPageUrl = (p: number) => {
    if (baseUrl.includes("?")) {
      return `${baseUrl}&page=${p}`;
    }
    return `${baseUrl}?page=${p}`;
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" && hasPrevPage) {
      router.push(getPageUrl(page - 1));
    }
    if (e.key === "ArrowRight" && hasNextPage) {
      router.push(getPageUrl(page + 1));
    }
  };

  return (
    <div className={cn("my-12", className)} tabIndex={0} onKeyDown={handleKey}>
      {/* Desktop / tablet full pagination */}
      <div className="hidden md:block">
        <PaginationComponent>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!hasPrevPage}
                onClick={() => {
                  if (hasPrevPage) router.push(getPageUrl(page - 1));
                }}
              />
            </PaginationItem>

            {renderPageRange(page, totalPages).map((item, i) =>
              item === "ellipsis" ? (
                <PaginationItem key={`e-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={item === page}
                    onClick={() => {
                      router.push(getPageUrl(Number(item)));
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                aria-disabled={!hasNextPage}
                onClick={() => {
                  if (hasNextPage) router.push(getPageUrl(page + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationComponent>
      </div>

      {/* Mobile compact pagination: Prev | X of Y | Next */}
      <div className="md:hidden">
        <PaginationComponent>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!hasPrevPage}
                onClick={() => {
                  if (hasPrevPage) router.push(getPageUrl(page - 1));
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="flex h-9 items-center px-3 text-sm">
                <span className="sr-only">Page</span>
                {page} / {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                aria-disabled={!hasNextPage}
                onClick={() => {
                  if (hasNextPage) router.push(getPageUrl(page + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationComponent>
      </div>
    </div>
  );
};
