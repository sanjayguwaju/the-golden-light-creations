"use client";

// ✅ useFormFields import verified from official Payload v3 docs
import { useFormFields } from "@payloadcms/ui";
import { adToBS } from "@/lib/bs-date";

interface Props {
  linkedFieldName: string;
  label?: string;
}

export function BSDateDisplay({ linkedFieldName, label }: Props) {
  // ✅ Correct Payload v3 selector pattern — only rerenders when this field changes
  // Source: https://payloadcms.com/docs/admin/react-hooks
  const fieldValue = useFormFields(
    ([fields]) => fields[linkedFieldName]?.value as string | undefined
  );

  if (!fieldValue) return null;

  let bs;
  try {
    bs = adToBS(fieldValue);
  } catch {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "-12px",
        marginBottom: "16px",
        padding: "6px 10px",
        background: "var(--theme-elevation-50)",
        borderRadius: "4px",
        borderLeft: "3px solid var(--theme-success-500)",
        fontSize: "12px",
        color: "var(--theme-elevation-800)",
      }}
    >
      <span style={{ opacity: 0.6 }}>{label ?? linkedFieldName} (वि.सं.):&nbsp;</span>
      <strong>{bs.bsFull}</strong>
      <span style={{ opacity: 0.5, marginLeft: "8px" }}>({bs.bsEn})</span>
    </div>
  );
}
