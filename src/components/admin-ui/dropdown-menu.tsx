"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/utilities/ui";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "adm:flex adm:cursor-default adm:select-none adm:items-center adm:gap-2 adm:rounded-sm adm:px-2 adm:py-1.5 adm:text-sm adm:outline-none focus:adm:bg-accent data-[state=open]:adm:bg-accent [&_svg]:adm:pointer-events-none [&_svg]:adm:size-4 [&_svg]:adm:shrink-0",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="adm:ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "adm:z-50 adm:min-w-[8rem] adm:overflow-hidden adm:rounded-md adm:border adm:bg-popover adm:p-1 adm:text-popover-foreground adm:shadow-lg data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[side=bottom]:adm:slide-in-from-top-2 data-[side=left]:adm:slide-in-from-right-2 data-[side=right]:adm:slide-in-from-left-2 data-[side=top]:adm:slide-in-from-bottom-2 adm:origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "adm:z-50 adm:max-h-[var(--radix-dropdown-menu-content-available-height)] adm:min-w-[8rem] adm:overflow-y-auto adm:overflow-x-hidden adm:rounded-md adm:border adm:bg-popover adm:p-1 adm:text-popover-foreground adm:shadow-md data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[side=bottom]:adm:slide-in-from-top-2 data-[side=left]:adm:slide-in-from-right-2 data-[side=right]:adm:slide-in-from-left-2 data-[side=top]:adm:slide-in-from-bottom-2 adm:origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:gap-2 adm:rounded-sm adm:px-2 adm:py-1.5 adm:text-sm adm:outline-none adm:transition-colors focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50 [&_svg]:adm:pointer-events-none [&_svg]:adm:size-4 [&_svg]:adm:shrink-0",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:py-1.5 adm:pl-8 adm:pr-2 adm:text-sm adm:outline-none adm:transition-colors focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="adm:absolute adm:left-2 adm:flex adm:h-3.5 adm:w-3.5 adm:items-center adm:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="adm:h-4 adm:w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:select-none adm:items-center adm:rounded-sm adm:py-1.5 adm:pl-8 adm:pr-2 adm:text-sm adm:outline-none adm:transition-colors focus:adm:bg-accent focus:adm:text-accent-foreground data-[disabled]:adm:pointer-events-none data-[disabled]:adm:opacity-50",
      className
    )}
    {...props}
  >
    <span className="adm:absolute adm:left-2 adm:flex adm:h-3.5 adm:w-3.5 adm:items-center adm:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="adm:h-2 adm:w-2 adm:fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "adm:px-2 adm:py-1.5 adm:text-sm adm:font-semibold",
      inset && "adm:pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("adm:-mx-1 adm:my-1 adm:h-px adm:bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("adm:ml-auto adm:text-xs adm:tracking-widest adm:opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
