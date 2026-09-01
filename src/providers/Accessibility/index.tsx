"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { FontSize, AccessibilityContextType } from "./types";
import canUseDOM from "@/utilities/canUseDOM";

const fontSizeLocalStorageKey = "payload-font-size";

const initialContext: AccessibilityContextType = {
  fontSize: "normal",
  setFontSize: () => null,
};

const AccessibilityContext = createContext(initialContext);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (canUseDOM) {
      const saved = window.localStorage.getItem(fontSizeLocalStorageKey) as FontSize;
      if (saved === "small" || saved === "normal" || saved === "large") {
        return saved;
      }
    }
    return "normal";
  });

  const setFontSize = useCallback((newSize: FontSize) => {
    setFontSizeState(newSize);
    if (canUseDOM) {
      window.localStorage.setItem(fontSizeLocalStorageKey, newSize);
      document.documentElement.setAttribute("data-font-size", newSize);
    }
  }, []);

  useEffect(() => {
    if (canUseDOM) {
      const saved = window.localStorage.getItem(fontSizeLocalStorageKey) as FontSize;
      const sizeToSet =
        saved === "small" || saved === "normal" || saved === "large" ? saved : "normal";
      document.documentElement.setAttribute("data-font-size", sizeToSet);
      setFontSizeState(sizeToSet);
    }
  }, []);

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => useContext(AccessibilityContext);
