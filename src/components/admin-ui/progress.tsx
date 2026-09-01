"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utilities/ui";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "adm:relative adm:h-4 adm:w-full adm:overflow-hidden adm:rounded-full adm:bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="adm:h-full adm:w-full adm:flex-1 adm:bg-primary adm:transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
