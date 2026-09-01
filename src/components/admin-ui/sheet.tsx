"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/utilities/ui";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "adm:fixed adm:inset-0 adm:z-50 adm:bg-black/80  data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "adm:fixed adm:z-50 adm:gap-4 adm:bg-background adm:p-6 adm:shadow-lg adm:transition adm:ease-in-out data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:duration-300 data-[state=open]:adm:duration-500",
  {
    variants: {
      side: {
        top: "adm:inset-x-0 adm:top-0 adm:border-b data-[state=closed]:adm:slide-out-to-top data-[state=open]:adm:slide-in-from-top",
        bottom:
          "adm:inset-x-0 adm:bottom-0 adm:border-t data-[state=closed]:adm:slide-out-to-bottom data-[state=open]:adm:slide-in-from-bottom",
        left: "adm:inset-y-0 adm:left-0 adm:h-full adm:w-3/4 adm:border-r data-[state=closed]:adm:slide-out-to-left data-[state=open]:adm:slide-in-from-left sm:adm:max-w-sm",
        right:
          "adm:inset-y-0 adm:right-0 adm:h-full adm:w-3/4  adm:border-l data-[state=closed]:adm:slide-out-to-right data-[state=open]:adm:slide-in-from-right sm:adm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <SheetPrimitive.Close className="adm:absolute adm:right-4 adm:top-4 adm:rounded-sm adm:opacity-70 adm:ring-offset-background adm:transition-opacity hover:adm:opacity-100 focus:adm:outline-none focus:adm:ring-2 focus:adm:ring-ring focus:adm:ring-offset-2 disabled:adm:pointer-events-none data-[state=open]:adm:bg-secondary">
        <X className="adm:h-4 adm:w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "adm:flex adm:flex-col adm:space-y-2 adm:text-center sm:adm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "adm:flex adm:flex-col-reverse sm:adm:flex-row sm:adm:justify-end sm:adm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("adm:text-lg adm:font-semibold adm:text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("adm:text-sm adm:text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
