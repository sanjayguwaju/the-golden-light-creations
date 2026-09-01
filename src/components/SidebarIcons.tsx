"use client";

import React from "react";
import { SidebarIconProvider } from "payload-sidebar-plugin/components";
import {
  Rocket,
  Flame,
  Star,
  Crown,
  Gem,
  Compass,
  Fingerprint,
  Ghost,
  Bug,
  Atom,
} from "lucide-react";

// Register additional custom icons beyond the plugin's default ~100
const customIcons = {
  rocket: Rocket,
  flame: Flame,
  sparkles: Star,
  crown: Crown,
  gem: Gem,
  compass: Compass,
  fingerprint: Fingerprint,
  ghost: Ghost,
  bug: Bug,
  atom: Atom,
};

export function SidebarIcons({ children }: { children: React.ReactNode }) {
  return <SidebarIconProvider icons={customIcons}>{children}</SidebarIconProvider>;
}
