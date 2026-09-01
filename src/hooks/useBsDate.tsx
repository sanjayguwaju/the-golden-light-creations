"use client";

import { useMemo } from "react";
import { adToBS, getFiscalYear } from "@/lib/bs-date";

export function useBSDate(adDate?: string | Date | null) {
  return useMemo(() => {
    if (!adDate) return null;
    try {
      return adToBS(adDate);
    } catch {
      return null;
    }
  }, [adDate]);
}

export function useFiscalYear(adDate?: Date) {
  return useMemo(() => getFiscalYear(adDate), [adDate]);
}
