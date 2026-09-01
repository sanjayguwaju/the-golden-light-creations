"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/utilities/ui";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("adm:border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="adm:flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "adm:flex adm:flex-1 adm:items-center adm:justify-between adm:py-4 adm:font-medium adm:transition-all adm:hover:underline [&[data-state=open]>svg]:adm:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="adm:h-4 adm:w-4 adm:shrink-0 adm:transition-transform adm:duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="adm:overflow-hidden adm:text-sm adm:transition-all data-[state=closed]:adm:animate-accordion-up data-[state=open]:adm:animate-accordion-down"
    {...props}
  >
    <div className={cn("adm:pb-4 adm:pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
