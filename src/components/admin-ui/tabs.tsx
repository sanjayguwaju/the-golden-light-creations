"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utilities/ui";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "adm:inline-flex adm:h-11 adm:items-center adm:justify-center adm:rounded-full adm:bg-muted/60 adm:p-1 adm:text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "adm:inline-flex adm:items-center adm:justify-center adm:whitespace-nowrap adm:rounded-full adm:px-5 adm:py-1.5 adm:text-sm adm:font-medium adm:ring-offset-background adm:transition-all adm:focus-visible:outline-none adm:focus-visible:ring-2 adm:focus-visible:ring-ring adm:focus-visible:ring-offset-2 adm:disabled:pointer-events-none adm:disabled:opacity-50",
      "adm:hover:text-foreground/80",
      "adm:data-[state=active]:bg-background adm:data-[state=active]:text-foreground adm:data-[state=active]:font-semibold adm:data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "adm:mt-2 adm:ring-offset-background adm:focus-visible:outline-none adm:focus-visible:ring-2 adm:focus-visible:ring-ring adm:focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
