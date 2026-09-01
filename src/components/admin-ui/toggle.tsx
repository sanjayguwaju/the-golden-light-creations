"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utilities/ui";

const toggleVariants = cva(
  "adm:inline-flex adm:items-center adm:justify-center adm:rounded-md adm:text-sm adm:font-medium adm:ring-offset-background adm:transition-colors adm:hover:bg-muted adm:hover:text-muted-foreground adm:focus-visible:outline-none adm:focus-visible:ring-2 adm:focus-visible:ring-ring adm:focus-visible:ring-offset-2 adm:disabled:pointer-events-none adm:disabled:opacity-50 adm:data-[state=on]:bg-accent adm:data-[state=on]:text-accent-foreground adm:[&_svg]:pointer-events-none adm:[&_svg]:size-4 adm:[&_svg]:shrink-0 adm:gap-2",
  {
    variants: {
      variant: {
        default: "adm:bg-transparent",
        outline:
          "adm:border adm:border-input adm:bg-transparent adm:hover:bg-accent adm:hover:text-accent-foreground",
      },
      size: {
        default: "adm:h-10 adm:px-3 adm:min-w-10",
        sm: "adm:h-9 adm:px-2.5 adm:min-w-9",
        lg: "adm:h-11 adm:px-5 adm:min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
