import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/utilities/ui";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "adm:relative adm:z-10 adm:flex adm:max-w-max adm:flex-1 adm:items-center adm:justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "adm:group adm:flex adm:flex-1 adm:list-none adm:items-center adm:justify-center adm:space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "adm:group adm:inline-flex adm:h-10 adm:w-max adm:items-center adm:justify-center adm:rounded-md adm:bg-background adm:px-4 adm:py-2 adm:text-sm adm:font-medium adm:transition-colors hover:adm:bg-accent hover:adm:text-accent-foreground focus:adm:bg-accent focus:adm:text-accent-foreground focus:adm:outline-none disabled:adm:pointer-events-none disabled:adm:opacity-50 data-[state=open]:adm:text-accent-foreground data-[state=open]:adm:bg-accent/50 data-[state=open]:hover:adm:bg-accent data-[state=open]:focus:adm:bg-accent"
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="adm:relative adm:top-[1px] adm:ml-1 adm:h-3 adm:w-3 adm:transition adm:duration-200 group-data-[state=open]:adm:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "adm:left-0 adm:top-0 adm:w-full data-[motion^=from-]:adm:animate-in data-[motion^=to-]:adm:animate-out data-[motion^=from-]:adm:fade-in data-[motion^=to-]:adm:fade-out data-[motion=from-end]:adm:slide-in-from-right-52 data-[motion=from-start]:adm:slide-in-from-left-52 data-[motion=to-end]:adm:slide-out-to-right-52 data-[motion=to-start]:adm:slide-out-to-left-52 md:adm:absolute md:adm:w-auto ",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("adm:absolute adm:left-0 adm:top-full adm:flex adm:justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "adm:origin-top-center adm:relative adm:mt-1.5 adm:h-[var(--radix-navigation-menu-viewport-height)] adm:w-full adm:overflow-hidden adm:rounded-md adm:border adm:bg-popover adm:text-popover-foreground adm:shadow-lg data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-90 md:adm:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "adm:top-full adm:z-[1] adm:flex adm:h-1.5 adm:items-end adm:justify-center adm:overflow-hidden data-[state=visible]:adm:animate-in data-[state=hidden]:adm:animate-out data-[state=hidden]:adm:fade-out data-[state=visible]:adm:fade-in",
      className
    )}
    {...props}
  >
    <div className="adm:relative adm:top-[60%] adm:h-2 adm:w-2 adm:rotate-45 adm:rounded-tl-sm adm:bg-border adm:shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
