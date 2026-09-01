"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/utilities/ui";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "adm:z-50 adm:overflow-hidden adm:rounded-md adm:border adm:bg-popover adm:px-3 adm:py-1.5 adm:text-sm adm:text-popover-foreground adm:shadow-md adm:animate-in adm:fade-in-0 adm:zoom-in-95 adm:data-[state=closed]:animate-out adm:data-[state=closed]:fade-out-0 adm:data-[state=closed]:zoom-out-95 adm:data-[side=bottom]:slide-in-from-top-2 adm:data-[side=left]:slide-in-from-right-2 adm:data-[side=right]:slide-in-from-left-2 adm:data-[side=top]:slide-in-from-bottom-2 adm:origin-[--radix-tooltip-content-transform-origin]",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
