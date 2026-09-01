"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/utilities/ui";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "adm:grid adm:place-content-center adm:peer adm:h-4 adm:w-4 adm:shrink-0 adm:rounded-sm adm:border adm:border-primary adm:ring-offset-background focus-visible:adm:outline-none focus-visible:adm:ring-2 focus-visible:adm:ring-ring focus-visible:adm:ring-offset-2 disabled:adm:cursor-not-allowed disabled:adm:opacity-50 data-[state=checked]:adm:bg-primary data-[state=checked]:adm:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("adm:grid adm:place-content-center adm:text-current")}
    >
      <Check className="adm:h-4 adm:w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
