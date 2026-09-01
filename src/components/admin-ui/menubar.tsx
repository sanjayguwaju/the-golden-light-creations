"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/utilities/ui";

function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "adm:flex adm:h-10 adm:items-center adm:space-x-1 adm:rounded-md adm:border adm:bg-background adm:p-1",
      className
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:px-3 adm:py-1.5 adm:text-sm adm:font-medium adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[state=open]:adm:bg-accent data-[state=open]:adm:text-accent-foreground",
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:px-2 adm:py-1.5 adm:text-sm adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[state=open]:adm:bg-accent data-[state=open]:adm:text-accent-foreground",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="adm:ml-auto adm:h-4 adm:w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "adm:z-50 adm:min-w-[8rem] adm:overflow-hidden adm:rounded-md adm:border adm:bg-popover adm:p-1 adm:text-popover-foreground data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[side=bottom]:adm:slide-in-from-top-2 data-[side=left]:adm:slide-in-from-right-2 data-[side=right]:adm:slide-in-from-left-2 data-[side=top]:adm:slide-in-from-bottom-2 adm:origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "adm:z-50 adm:min-w-[12rem] adm:overflow-hidden adm:rounded-md adm:border adm:bg-popover adm:p-1 adm:text-popover-foreground adm:shadow-md data-[state=open]:adm:animate-in data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[side=bottom]:adm:slide-in-from-top-2 data-[side=left]:adm:slide-in-from-right-2 data-[side=right]:adm:slide-in-from-left-2 data-[side=top]:adm:slide-in-from-bottom-2 adm:origin-[--radix-menubar-content-transform-origin]",
        className
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:px-2 adm:py-1.5 adm:text-sm adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:py-1.5 adm:pl-8 adm:pr-2 adm:text-sm adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="adm:absolute adm:left-2 adm:flex adm:h-3.5 adm:w-3.5 adm:items-center adm:justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="adm:h-4 adm:w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:py-1.5 adm:pl-8 adm:pr-2 adm:text-sm adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      className
    )}
    {...props}
  >
    <span className="adm:absolute adm:left-2 adm:flex adm:h-3.5 adm:w-3.5 adm:items-center adm:justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="adm:h-2 adm:w-2 adm:fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "adm:px-2 adm:py-1.5 adm:text-sm adm:font-semibold",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("adm:-mx-1 adm:my-1 adm:h-px adm:bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "adm:ml-auto adm:text-xs adm:tracking-widest adm:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
