"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { TypedLocale } from "payload";

import { usePathname, useRouter } from "@/i18n/routing";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/utilities/ui";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onToggleChange(checked: boolean) {
    const value: TypedLocale = checked ? "en" : "ne";
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value }
      );
    });
  }

  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor="language-switch"
        className={cn(
          "text-[13px] font-medium cursor-pointer transition-colors",
          locale === "ne" ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
        )}
        onClick={() => onToggleChange(false)}
      >
        नेपाली
      </Label>
      <Switch
        id="language-switch"
        checked={locale === "en"}
        onCheckedChange={onToggleChange}
        disabled={isPending}
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300 dark:data-[state=unchecked]:bg-slate-700"
      />
      <Label
        htmlFor="language-switch"
        className={cn(
          "text-[13px] font-medium cursor-pointer transition-colors",
          locale === "en" ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
        )}
        onClick={() => onToggleChange(true)}
      >
        English
      </Label>
    </div>
  );
}
