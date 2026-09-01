"use client";

import React from "react";
import { SidebarIcons } from "@/components/SidebarIcons";
import { NavBadgeProvider } from "@/components/NavBadgeProvider";
import { SidebarScrollRestoration } from "./SidebarScrollRestoration";
import { EnsureSidebarOpen } from "./EnsureSidebarOpen";

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SidebarIcons>
      <NavBadgeProvider>
        <EnsureSidebarOpen />
        <SidebarScrollRestoration />
        {children}
      </NavBadgeProvider>
    </SidebarIcons>
  );
}
