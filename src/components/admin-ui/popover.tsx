"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/utilities/ui";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "adm:z-50 adm:w-72 adm:rounded-md adm:border adm:bg-popover adm:p-4 adm:text-popover-foreground adm:shadow-md adm:outline-none data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[side=bottom]:adm:slide-in-from-top-2 data-[side=left]:adm:slide-in-from-right-2 data-[side=right]:adm:slide-in-from-left-2 data-[side=top]:adm:slide-in-from-bottom-2 adm:origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
