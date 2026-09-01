"use client";

import React, { createContext, useCallback, use, useEffect } from "react";

import type { Theme, ThemeContextType } from "./types";

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: "light",
};

const ThemeContext = createContext(initialContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const setTheme = useCallback((_themeToSet: Theme | null) => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return <ThemeContext value={{ setTheme, theme: "light" }}>{children}</ThemeContext>;
};

export const useTheme = (): ThemeContextType => use(ThemeContext);
