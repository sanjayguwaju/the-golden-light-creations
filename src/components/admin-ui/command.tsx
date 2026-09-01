"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/utilities/ui";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "adm:flex adm:h-full adm:w-full adm:flex-col adm:overflow-hidden adm:rounded-md adm:bg-popover adm:text-popover-foreground",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="adm:overflow-hidden adm:p-0 adm:shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:adm:px-2 [&_[cmdk-group-heading]]:adm:font-medium [&_[cmdk-group-heading]]:adm:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:adm:pt-0 [&_[cmdk-group]]:adm:px-2 [&_[cmdk-input-wrapper]_svg]:adm:h-5 [&_[cmdk-input-wrapper]_svg]:adm:w-5 [&_[cmdk-input]]:adm:h-12 [&_[cmdk-item]]:adm:px-2 [&_[cmdk-item]]:adm:py-3 [&_[cmdk-item]_svg]:adm:h-5 [&_[cmdk-item]_svg]:adm:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="adm:flex adm:items-center adm:border-b adm:px-3" cmdk-input-wrapper="">
    <Search className="adm:mr-2 adm:h-4 adm:w-4 adm:shrink-0 adm:opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "adm:flex adm:h-11 adm:w-full adm:rounded-md adm:bg-transparent adm:py-3 adm:text-sm adm:outline-none adm:placeholder:text-muted-foreground disabled:adm:cursor-not-allowed disabled:adm:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("adm:max-h-[300px] adm:overflow-y-auto adm:overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="adm:py-6 adm:text-center adm:text-sm" {...props} />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "adm:overflow-hidden adm:p-1 adm:text-foreground [&_[cmdk-group-heading]]:adm:px-2 [&_[cmdk-group-heading]]:adm:py-1.5 [&_[cmdk-group-heading]]:adm:text-xs [&_[cmdk-group-heading]]:adm:font-medium [&_[cmdk-group-heading]]:adm:text-muted-foreground",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("adm:-mx-1 adm:h-px adm:bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "adm:relative adm:flex adm:cursor-default adm:gap-2 adm:select-none adm:items-center adm:rounded-sm adm:px-2 adm:py-1.5 adm:text-sm adm:outline-none data-[disabled=true]:adm:pointer-events-none data-[selected='true']:adm:bg-accent data-[selected=true]:adm:text-accent-foreground data-[disabled=true]:adm:opacity-50 [&_svg]:adm:pointer-events-none [&_svg]:adm:size-4 [&_svg]:adm:shrink-0",
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
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
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
