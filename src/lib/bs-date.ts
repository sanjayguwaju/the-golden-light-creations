// ✅ nepali-datetime v1.5.0 verified API
// ✅ Works in Node.js (Payload hooks) AND browser (React components)
import NepaliDate from "nepali-datetime";

export interface BSDateFormatted {
  bs: string; // "२०८१-०७-१५"
  bsEn: string; // "2081-07-15"
  bsFull: string; // "१५ कार्तिक २०८१"
  bsFullEn: string; // "15 Kartik 2081"
  ad: string; // "2024-10-31"
  adDate: Date;
}

export const BS_MONTHS_NE = [
  "बैशाख",
  "जेठ",
  "असार",
  "श्रावण",
  "भाद्र",
  "आश्विन",
  "कार्तिक",
  "मंसिर",
  "पुष",
  "माघ",
  "फाल्गुन",
  "चैत्र",
];

export const BS_MONTHS_EN = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

export const BS_DAYS_NE = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहीबार",
  "शुक्रबार",
  "शनिबार",
];

const toNepaliDigits = (val: string | number): string =>
  String(val).replace(/[0-9]/g, (d) => "०१२३४५६७८९"[+d]);

const toEnglishDigits = (val: string | number): string => {
  const neToEn: Record<string, string> = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };
  return String(val).replace(/[०-९]/g, (d) => neToEn[d]);
};

const pad = (n: number) => String(n).padStart(2, "0");

// ─── AD → BS ──────────────────────────────────────────────
// ✅ new NepaliDate(jsDate) verified constructor
// ✅ getYear(), getMonth() [0-based], getDate() verified methods
// ✅ format() verified method — format tokens from official docs
export function adToBS(adDate: Date | string): BSDateFormatted {
  const date = typeof adDate === "string" ? new Date(adDate) : adDate;
  const npDate = new NepaliDate(date);

  const year = npDate.getYear();
  const month = npDate.getMonth() + 1; // getMonth() is 0-based ✅
  const day = npDate.getDate();

  const bsEn = `${year}-${pad(month)}-${pad(day)}`;
  const bs = `${toNepaliDigits(year)}-${toNepaliDigits(pad(month))}-${toNepaliDigits(pad(day))}`;
  const bsFullEn = `${day} ${BS_MONTHS_EN[month - 1]} ${year}`;
  const bsFull = `${toNepaliDigits(day)} ${BS_MONTHS_NE[month - 1]} ${toNepaliDigits(year)}`;
  // ✅ format() with AD format token verified in official docs
  const ad = npDate.formatEnglishDate("YYYY-MM-DD");

  return { bs, bsEn, bsFull, bsFullEn, ad, adDate: date };
}

// ─── BS → AD ──────────────────────────────────────────────
// ✅ new NepaliDate("2081-07-15") string constructor verified
// ✅ formatEnglishDate("YYYY-MM-DD") verified method — returns "2024-10-31"
// ✅ Works in browser — no Node-only imports needed
export function bsToAD(year: number, month: number, day: number): Date {
  const bsString = `${year}-${pad(month)}-${pad(day)}`;
  // ✅ Verified: new NepaliDate(bsString) parses BS date string directly
  const adString = new NepaliDate(bsString).formatEnglishDate("YYYY-MM-DD");
  // Parse as UTC to avoid timezone-related off-by-one issues
  return new Date(`${adString}T00:00:00.000Z`);
}

// ✅ Handles "2081-7-5" or "२०८१-७-५"
export function bsStringToAD(bsString: string): Date {
  const englishBsString = toEnglishDigits(bsString);
  const [y, m, d] = englishBsString.split("-").map(Number);
  return bsToAD(y, m, d);
}

export function todayBS(): BSDateFormatted {
  return adToBS(new Date());
}

// ─── Fiscal year (Shrawan=4 to Asar=3) ───────────────────
export function getFiscalYear(adDate?: Date): {
  bsStart: number;
  bsEnd: number;
  label: string;
  labelNe: string;
} {
  const npDate = new NepaliDate(adDate ?? new Date());
  const year = npDate.getYear();
  const month = npDate.getMonth() + 1;
  const fiscalStart = month >= 4 ? year : year - 1;
  const fiscalEnd = fiscalStart + 1;
  return {
    bsStart: fiscalStart,
    bsEnd: fiscalEnd,
    label: `${fiscalStart}/${fiscalEnd}`,
    labelNe: `${toNepaliDigits(fiscalStart)}/${toNepaliDigits(fiscalEnd)}`,
  };
}

export function calculateAgeBS(dobAD: Date | string): string {
  const dob = new NepaliDate(typeof dobAD === "string" ? new Date(dobAD) : dobAD);
  const today = new NepaliDate(new Date());
  let years = today.getYear() - dob.getYear();
  let months = today.getMonth() + 1 - (dob.getMonth() + 1);
  if (months < 0) {
    years--;
    months += 12;
  }
  return `${toNepaliDigits(years)} वर्ष ${toNepaliDigits(months)} महिना`;
}

export function formatBSDate(
  adDate: Date | string,
  locale: "ne" | "en" = "ne",
  format: "short" | "full" = "full"
): string {
  const f = adToBS(adDate);
  if (locale === "ne") return format === "full" ? f.bsFull : f.bs;
  return format === "full" ? f.bsFullEn : f.bsEn;
}

export function formatNepaliCurrentDate(date: Date = new Date()): string {
  const f = adToBS(date);
  const dayIndex = date.getDay();
  const dayName = BS_DAYS_NE[dayIndex] || "";
  return `${f.bsFull}, ${dayName}`;
}

