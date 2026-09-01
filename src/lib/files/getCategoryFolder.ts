export const CATEGORY_FOLDER_MAP: Record<string, string> = {
  notice_pdf: "notices",
  notice_image: "notices",
  staff_photo: "staff-photos",
  report: "reports",
  tender: "tenders",
  form_attachment: "form-attachments",
  academic_certificate: "academic-certificates",
  identity_document: "identity-documents",
  authorization_letter: "authorization-letters",
  staff_contract: "staff-contracts",
  cv: "cvs",
  warranty_invoice: "warranty-invoices",
  other: "other",
} as const;

export type FileCategory = keyof typeof CATEGORY_FOLDER_MAP;

export function getFolderForCategory(category: string): string {
  return CATEGORY_FOLDER_MAP[category] ?? "other";
}

export function getS3Prefix(category: string): string {
  return `files/${getFolderForCategory(category)}`;
}

function buildTimestamp(): string {
  const now = new Date();
  const YYYY = now.getUTCFullYear();
  const MM = String(now.getUTCMonth() + 1).padStart(2, "0");
  const DD = String(now.getUTCDate()).padStart(2, "0");
  const HH = String(now.getUTCHours()).padStart(2, "0");
  const mm = String(now.getUTCMinutes()).padStart(2, "0");
  const ss = String(now.getUTCSeconds()).padStart(2, "0");
  const SSS = String(now.getUTCMilliseconds()).padStart(3, "0");
  return `${YYYY}${MM}${DD}-${HH}${mm}${ss}${SSS}`;
}

export function buildPrefixedFilename(category: string, originalFilename: string): string {
  const folder = getFolderForCategory(category);
  const ext = originalFilename.substring(originalFilename.lastIndexOf("."));
  const base = originalFilename
    .substring(0, originalFilename.lastIndexOf("."))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const timestamp = buildTimestamp();
  // e.g. notices_my-report_20240315-123456789.pdf
  return `${folder}_${base}_${timestamp}${ext}`;
}

export function parsePrefixedFilename(filename: string): {
  folder: string;
  base: string;
} {
  // filename format: {folder}_{base}_{timestamp}.{ext}
  // folder may contain hyphens but never underscores, so first _ is the delimiter
  const underscoreIndex = filename.indexOf("_");
  if (underscoreIndex === -1) {
    return { folder: "other", base: filename };
  }
  return {
    folder: filename.substring(0, underscoreIndex), // e.g. "notices"
    base: filename.substring(underscoreIndex + 1), // e.g. "my-report_20240315-123456789.pdf"
  };
}
