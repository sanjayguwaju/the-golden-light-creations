"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SidebarScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Function to find the scrollable sidebar container
    const findScrollContainer = () => {
      // Common class for Payload sidebar scroll container
      let container = document.querySelector('aside [class*="__scroll"]');
      
      if (!container) {
        container = document.querySelector('#nav-scroll, .nav__scroll, aside nav');
      }

      // If we found a container and it's not the scrollable one, find the scrollable one
      if (container && container.scrollHeight <= container.clientHeight) {
         // Maybe it's a child or parent
         const scrollableChild = Array.from(container.querySelectorAll('*')).find(
           el => el.scrollHeight > el.clientHeight
         );
         if (scrollableChild) return scrollableChild;
      }
      
      if (container && container.scrollHeight > container.clientHeight) {
        return container;
      }

      // Fallback to checking all elements in aside
      const aside = document.querySelector('aside');
      if (aside) {
        const scrollable = Array.from(aside.querySelectorAll('*')).find(
          el => el.scrollHeight > el.clientHeight && window.getComputedStyle(el).overflowY !== 'hidden'
        );
        return scrollable || aside;
      }

      return null;
    };

    const restoreAndListen = () => {
      const container = findScrollContainer();
      if (!container) return;

      const STORAGE_KEY = 'payload-admin-sidebar-scroll';

      // Restore scroll position
      const savedPosition = sessionStorage.getItem(STORAGE_KEY);
      if (savedPosition) {
        container.scrollTop = parseInt(savedPosition, 10);
      }

      // Save scroll position on scroll
      const handleScroll = () => {
        sessionStorage.setItem(STORAGE_KEY, container.scrollTop.toString());
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    };

    // Use a small timeout to allow the DOM to render the sidebar content
    const timeoutId = setTimeout(() => {
      const cleanup = restoreAndListen();
      // If we couldn't find the container, try one more time slightly later
      if (!cleanup) {
        setTimeout(restoreAndListen, 500);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
