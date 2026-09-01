"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useDebounce } from "@/utilities/useDebounce";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";

export const Search: React.FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [value, setValue] = useState(initialQuery);
  const [prevQuery, setPrevQuery] = useState(initialQuery);
  const router = useRouter();

  if (initialQuery !== prevQuery) {
    setPrevQuery(initialQuery);
    setValue(initialQuery);
  }

  const debouncedValue = useDebounce(value, 350);

  useEffect(() => {
    router.push(
      `/search${debouncedValue ? `?q=${encodeURIComponent(debouncedValue)}` : ""}` as Parameters<typeof router.push>[0],
      { scroll: false },
    );
  }, [debouncedValue, router]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/60 pointer-events-none" />
        <Input
          id="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search posts, articles, news…"
          className="pl-12 pr-12 h-14 text-base rounded-none border-0 bg-[#FFFFFF] text-black placeholder:text-black/50 focus-visible:border-0 focus-visible:ring-0 shadow-none transition-colors"
          autoComplete="off"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 text-black/60 hover:text-black hover:bg-black/10 rounded-none"
            onClick={() => setValue("")}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
