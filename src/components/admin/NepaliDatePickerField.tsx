"use client";

import React from "react";
import { useField } from "@payloadcms/ui";
import { NepaliDateInput } from "@/components/ui/NepaliDateInput";

export function NepaliDatePickerField({
  path,
  field,
}: {
  path: string;
  field?: Record<string, unknown>;
}) {
  // useField syncs the React state with Payload's form state
  const { value, setValue } = useField<string>({ path });

  // Get label safely, fallback to field name
  const label = typeof field?.label === "string" ? field.label : undefined;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <NepaliDateInput
        name={path}
        label={label}
        value={value ? new Date(value).toISOString().split("T")[0] : ""}
        onChange={(adIso) => {
          // Payload stores raw full ISO strings for date fields by default.
          setValue(new Date(adIso).toISOString());
        }}
        locale="en"
      />
    </div>
  );
}
