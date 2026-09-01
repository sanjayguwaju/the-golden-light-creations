"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/utilities/ui";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:w-full adm:touch-none adm:select-none adm:items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="adm:relative adm:h-2 adm:w-full adm:grow adm:overflow-hidden adm:rounded-full adm:bg-secondary">
      <SliderPrimitive.Range className="adm:absolute adm:h-full adm:bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="adm:block adm:h-5 adm:w-5 adm:rounded-full adm:border-2 adm:border-primary adm:bg-background adm:ring-offset-background adm:transition-colors focus-visible:adm:outline-none focus-visible:adm:ring-2 focus-visible:adm:ring-ring focus-visible:adm:ring-offset-2 disabled:adm:pointer-events-none disabled:adm:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
