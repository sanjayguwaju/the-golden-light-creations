"use client";

import { useEffect } from "react";

// Isolated state object — easier to reset in dev
const scrollLock = {
  count: 0,
  originalOverflow: "",
  originalPaddingRight: "",
};

const lockBodyScroll = () => {
  if (typeof window === "undefined") return;

  if (scrollLock.count === 0) {
    scrollLock.originalOverflow = document.body.style.overflow;
    scrollLock.originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
  }

  scrollLock.count += 1;
};

const unlockBodyScroll = () => {
  if (typeof window === "undefined") return;

  scrollLock.count = Math.max(0, scrollLock.count - 1);

  if (scrollLock.count === 0) {
    document.body.style.overflow = scrollLock.originalOverflow;
    document.body.style.paddingRight = scrollLock.originalPaddingRight;

    // Reset saved values so stale state doesn't persist
    scrollLock.originalOverflow = "";
    scrollLock.originalPaddingRight = "";
  }
};

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [isLocked]);
};
