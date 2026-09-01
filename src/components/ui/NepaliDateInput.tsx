"use client";

import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import React, { useState, useEffect, forwardRef } from "react";
import { bsStringToAD, adToBS, todayBS } from "@/lib/bs-date";

import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/utilities/ui";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  name: string;
  label?: string;
  labelNe?: string;
  required?: boolean;
  value?: string; // AD ISO string
  onChange?: (adIso: string, bsString: string) => void;
  locale?: "ne" | "en";
  disabled?: boolean;
  minDate?: string; // AD ISO
  maxDate?: string; // AD ISO
  showTodayButton?: boolean;
}

export const NepaliDateInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      labelNe,
      required,
      value,
      onChange,
      locale = "ne",
      disabled = false,
      minDate,
      maxDate,
      showTodayButton = true,
      className,
      ...props
    },
    ref
  ) => {
    // Always get initial BS string in English or Nepali based on locale
    const initialBs = value ? (locale === "ne" ? adToBS(value).bs : adToBS(value).bsEn) : "";
    const [bsValue, setBsValue] = useState<string>(initialBs);
    const [adIso, setAdIso] = useState<string>(value ?? "");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Sync incoming value changes (e.g. form resets)
    useEffect(() => {
      if (value && value !== adIso) {
        setAdIso(value);
        setBsValue(locale === "ne" ? adToBS(value).bs : adToBS(value).bsEn);
        setErrorMsg(null);
      } else if (!value && adIso) {
        setAdIso("");
        setBsValue("");
        setErrorMsg(null);
      }
    }, [value, locale, adIso]);

    const displayLabel = locale === "ne" ? (labelNe ?? label) : label;

    function validateBounds(isoDateStr: string): string | null {
      const d = new Date(isoDateStr).getTime();
      if (minDate && d < new Date(minDate).getTime()) return "Date is too early";
      if (maxDate && d > new Date(maxDate).getTime()) return "Date is too late";
      return null;
    }

    function handleChange(bsString: string) {
      if (!bsString) {
        handleClear();
        return;
      }
      setBsValue(bsString);
      try {
        // ✅ bsStringToAD handles Nepali string digits since bs-date is updated
        const adDate = bsStringToAD(bsString);
        const iso = adDate.toISOString().split("T")[0];

        const err = validateBounds(iso);
        if (err) {
          setErrorMsg(err);
          return;
        }

        setErrorMsg(null);
        setAdIso(iso);
        onChange?.(iso, bsString);
      } catch {
        setErrorMsg("Invalid Date Form");
      }
    }

    function handleClear(e?: React.MouseEvent) {
      e?.preventDefault();
      e?.stopPropagation();
      setBsValue("");
      setAdIso("");
      setErrorMsg(null);
      onChange?.("", "");
    }

    function handleSetToday(e: React.MouseEvent) {
      e.preventDefault();
      const tBS = todayBS();
      handleChange(tBS.bsEn);
    }

    return (
      <div className={cn("nepali-date-input space-y-2 w-full relative", className)}>
        {(displayLabel || showTodayButton) && (
          <div className="flex items-center justify-between pb-1">
            {displayLabel ? (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {displayLabel}
                {required && <span className="text-destructive"> *</span>}
              </label>
            ) : (
              <div /> // empty spacer so the button aligns correctly right
            )}
            {showTodayButton && !disabled && (
              <button
                type="button"
                onClick={handleSetToday}
                className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded hover:bg-primary/20 transition-colors"
              >
                {locale === "ne" ? "आज (Today)" : "Today"}
              </button>
            )}
          </div>
        )}

        <div
          className="relative nepali-date-picker-overrides"
          style={disabled ? { pointerEvents: "none", opacity: 0.5 } : undefined}
        >
          <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
          {/* ✅ Verified NepaliDatePicker props from npm docs */}
          <NepaliDatePicker
            value={bsValue}
            onChange={handleChange}
            options={{
              calenderLocale: locale === "ne" ? "ne" : "en",
              valueLocale: locale === "ne" ? "ne" : "en",
            }}
            inputClassName={cn(
              "flex h-10 w-full rounded-md border bg-background py-2 pr-10 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              errorMsg
                ? "border-destructive focus-visible:ring-destructive"
                : "border-input focus-visible:ring-ring"
            )}
          />
          {bsValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-2.5 p-0.5 rounded-sm opacity-70 hover:opacity-100 hover:bg-muted focus:outline-none"
              title="Clear Date"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Hidden input carries AD ISO string to form submit / Payload API */}
        <input type="hidden" name={name} value={adIso} readOnly ref={ref} {...props} />

        <div className="flex justify-between items-center mt-1">
          {adIso ? <p className="text-[11px] text-muted-foreground">AD: {adIso}</p> : <span />}
          {errorMsg && <p className="text-[11px] text-destructive font-medium">{errorMsg}</p>}
        </div>
      </div>
    );
  }
);

NepaliDateInput.displayName = "NepaliDateInput";
