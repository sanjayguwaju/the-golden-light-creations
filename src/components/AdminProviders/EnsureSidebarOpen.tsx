"use client";

import { useEffect } from "react";
import { useNav, usePreferences } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import { PREFERENCE_KEYS } from "payload/shared";

export function EnsureSidebarOpen() {
  const { navOpen, setNavOpen } = useNav();
  const { setPreference } = usePreferences();
  const pathname = usePathname();

  useEffect(() => {
    const isExplicitlyClosed = typeof window !== "undefined" && sessionStorage.getItem("payload-sidebar-manual-closed") === "true";

    // If the user has not manually closed the sidebar with the toggle button,
    // ensure the sidebar is always open as default across page navigations & screen sizes
    if (!isExplicitlyClosed) {
      if (!navOpen) {
        setNavOpen(true);
      }
      // Also persist preference so Payload internals default to open
      try {
        setPreference?.(PREFERENCE_KEYS.NAV, { open: true }, true);
      } catch (err) {
        // Ignore preference error if not authenticated yet
      }
    }
  }, [navOpen, pathname, setNavOpen, setPreference]);

  useEffect(() => {
    // Listen for manual user clicks on the collapse / toggle button
    const handleTogglerClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const toggler = target.closest(
        ".nav-toggler, [class*='nav-toggler'], #nav-toggler, [aria-label*='menu'], [aria-label*='Menu'], [class*='nav__toggler'], aside button"
      );

      if (toggler) {
        // If user clicked the toggler while it was open, they explicitly want it closed
        if (navOpen) {
          sessionStorage.setItem("payload-sidebar-manual-closed", "true");
        } else {
          sessionStorage.removeItem("payload-sidebar-manual-closed");
        }
      }
    };

    document.addEventListener("click", handleTogglerClick, true);
    return () => {
      document.removeEventListener("click", handleTogglerClick, true);
    };
  }, [navOpen]);

  return null;
}
