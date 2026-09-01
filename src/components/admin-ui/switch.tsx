"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/utilities/ui";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "adm:peer adm:inline-flex adm:h-6 adm:w-11 adm:shrink-0 adm:cursor-pointer adm:items-center adm:rounded-full adm:border-2 adm:border-transparent adm:transition-colors focus-visible:adm:outline-none focus-visible:adm:ring-2 focus-visible:adm:ring-ring focus-visible:adm:ring-offset-2 focus-visible:adm:ring-offset-background disabled:adm:cursor-not-allowed disabled:adm:opacity-50 data-[state=checked]:adm:bg-primary data-[state=unchecked]:adm:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "adm:pointer-events-none adm:block adm:h-5 adm:w-5 adm:rounded-full adm:bg-background adm:shadow-lg adm:ring-0 adm:transition-transform data-[state=checked]:adm:translate-x-5 data-[state=unchecked]:adm:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
