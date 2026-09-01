'use client';

import React from "react";
import { ProgressProvider } from "@bprogress/next/app";

import { HeaderThemeProvider } from "./HeaderTheme";
import { ThemeProvider } from "./Theme";
import { AccessibilityProvider } from "./Accessibility";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#3554d1"
      options={{ showSpinner: false }}
      shallowRouting={false}
    >
      <ThemeProvider>
        <AccessibilityProvider>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ProgressProvider>
  );
};
