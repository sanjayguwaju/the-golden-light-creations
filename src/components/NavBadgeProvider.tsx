"use client";

import React, { useEffect, useState } from "react";
import { SidebarBadgeProvider } from "payload-sidebar-plugin/components";

type BadgeColor = "red" | "orange" | "yellow" | "blue" | "green" | "gray";

interface BadgeEntry {
  count: number;
  color: BadgeColor;
}

export function NavBadgeProvider({ children }: { children: React.ReactNode }) {
  const [badges, setBadges] = useState<Record<string, BadgeEntry>>({});

  useEffect(() => {
    async function fetchBadgeCounts() {
      try {
        const [usersRes, mediaRes] = await Promise.all([
          fetch("/api/users?limit=0&depth=0"),
          fetch("/api/media?limit=0&depth=0"),
        ]);

        const usersData = await usersRes.json();
        const mediaData = await mediaRes.json();

        const newBadges: Record<string, BadgeEntry> = {};

        if (usersData.totalDocs > 0) {
          newBadges["users"] = { count: usersData.totalDocs, color: "blue" };
        }
        if (mediaData.totalDocs > 0) {
          newBadges["media"] = { count: mediaData.totalDocs, color: "green" };
        }

        setBadges(newBadges);
      } catch (error) {
        console.error("Error fetching badge counts:", error);
      }
    }

    fetchBadgeCounts();

    // Refresh badge counts every 30 seconds
    const interval = setInterval(fetchBadgeCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  return <SidebarBadgeProvider badges={badges}>{children}</SidebarBadgeProvider>;
}
