"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/utilities/ui";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
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
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "adm:z-50 adm:min-w-[8rem] adm:overflow-hidden adm:rounded-md adm:border adm:bg-popover adm:p-1 adm:text-popover-foreground adm:shadow-md data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[side=bottom]:adm:slide-in-from-top-2 data-[side=left]:adm:slide-in-from-right-2 data-[side=right]:adm:slide-in-from-left-2 data-[side=top]:adm:slide-in-from-bottom-2 adm:origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "adm:z-50 adm:max-h-[--radix-context-menu-content-available-height] adm:min-w-[8rem] adm:overflow-y-auto adm:overflow-x-hidden adm:rounded-md adm:border adm:bg-popover adm:p-1 adm:text-popover-foreground adm:shadow-md adm:animate-in adm:fade-in-80 data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[side=bottom]:adm:slide-in-from-top-2 data-[side=left]:adm:slide-in-from-right-2 data-[side=right]:adm:slide-in-from-left-2 data-[side=top]:adm:slide-in-from-bottom-2 adm:origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:px-2 adm:py-1.5 adm:text-sm adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:py-1.5 adm:pl-8 adm:pr-2 adm:text-sm adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="adm:absolute adm:left-2 adm:flex adm:h-3.5 adm:w-3.5 adm:items-center adm:justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="adm:h-4 adm:w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:py-1.5 adm:pl-8 adm:pr-2 adm:text-sm adm:outline-none focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      className
    )}
    {...props}
  >
    <span className="adm:absolute adm:left-2 adm:flex adm:h-3.5 adm:w-3.5 adm:items-center adm:justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="adm:h-2 adm:w-2 adm:fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "adm:px-2 adm:py-1.5 adm:text-sm adm:font-semibold adm:text-foreground",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("adm:-mx-1 adm:my-1 adm:h-px adm:bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
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
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
