"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/utilities/ui";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("adm:grid adm:gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "adm:aspect-square adm:h-4 adm:w-4 adm:rounded-full adm:border adm:border-primary adm:text-primary adm:ring-offset-background focus:adm:outline-none focus-visible:adm:ring-2 focus-visible:adm:ring-ring focus-visible:adm:ring-offset-2 disabled:adm:cursor-not-allowed disabled:adm:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="adm:flex adm:items-center adm:justify-center">
        <Circle className="adm:h-2.5 adm:w-2.5 adm:fill-current adm:text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
