"use client";

import { useRowLabel } from "@payloadcms/ui";
import React from "react";

export const RowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{
    link?: { label?: string; url?: string };
    menuType?: string;
  }>();

  const label =
    data?.link?.label || data?.link?.url || `Item ${String(rowNumber).padStart(2, "0")}`;
  const menuType = data?.menuType ? ` (${data.menuType})` : "";

  return (
    <div>
      {label}
      <span style={{ opacity: 0.5, fontSize: "0.8em", marginLeft: "0.5em" }}>{menuType}</span>
    </div>
  );
};
