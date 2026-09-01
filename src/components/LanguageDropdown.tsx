"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/utilities/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, ChevronDown, Check } from "lucide-react";

// Language configuration
const languages = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "ne", label: "Nepali", nativeLabel: "नेपाली", flag: "🇳🇵" },
  { code: "hr", label: "Croatian", nativeLabel: "Hrvatski", flag: "🇭🇷" },
];

export function LanguageDropdown() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const onLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale }
      );
    });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          className="h-9 px-2 md:px-3 gap-1.5 text-sm font-medium hover:bg-accent/10"
        >
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="hidden sm:inline">{currentLang.nativeLabel}</span>
          <span className="sm:hidden">{currentLang.flag}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLocaleChange(lang.code)}
            className={cn(
              "flex items-center gap-3 cursor-pointer",
              locale === lang.code && "bg-accent/10 font-medium"
            )}
          >
            <span className="text-base">{lang.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm">{lang.nativeLabel}</span>
              <span className="text-xs text-muted-foreground">{lang.label}</span>
            </div>
            {locale === lang.code && (
              <Check className="h-4 w-4 ml-auto text-accent" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
