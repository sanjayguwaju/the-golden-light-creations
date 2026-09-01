"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/utilities/ui";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "adm:fixed adm:inset-0 adm:z-50 adm:bg-black/80 data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "adm:fixed adm:left-[50%] adm:top-[50%] adm:z-50 adm:grid adm:w-full adm:max-w-lg adm:translate-x-[-50%] adm:translate-y-[-50%] adm:gap-4 adm:border adm:bg-background adm:p-6 adm:shadow-lg adm:duration-200 data-[state=open]:adm:animate-in data-[state=closed]:adm:animate-out data-[state=closed]:adm:fade-out-0 data-[state=open]:adm:fade-in-0 data-[state=closed]:adm:zoom-out-95 data-[state=open]:adm:zoom-in-95 data-[state=closed]:adm:slide-out-to-left-1/2 data-[state=closed]:adm:slide-out-to-top-[48%] data-[state=open]:adm:slide-in-from-left-1/2 data-[state=open]:adm:slide-in-from-top-[48%] sm:adm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="adm:absolute adm:right-4 adm:top-4 adm:rounded-sm adm:opacity-70 adm:ring-offset-background adm:transition-opacity hover:adm:opacity-100 focus:adm:outline-none focus:adm:ring-2 focus:adm:ring-ring focus:adm:ring-offset-2 disabled:adm:pointer-events-none data-[state=open]:adm:bg-accent data-[state=open]:adm:text-muted-foreground">
        <X className="adm:h-4 adm:w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "adm:flex adm:flex-col adm:space-y-1.5 adm:text-center sm:adm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "adm:flex adm:flex-col-reverse sm:adm:flex-row sm:adm:justify-end sm:adm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("adm:text-lg adm:font-semibold adm:leading-none adm:tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("adm:text-sm adm:text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
