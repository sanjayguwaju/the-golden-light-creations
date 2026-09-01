import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utilities/ui";

const buttonVariants = cva(
  "adm:inline-flex adm:items-center adm:justify-center adm:gap-2 adm:whitespace-nowrap adm:rounded-md adm:text-sm adm:font-medium adm:ring-offset-background adm:transition-colors focus-visible:adm:outline-none focus-visible:adm:ring-2 focus-visible:adm:ring-ring focus-visible:adm:ring-offset-2 disabled:adm:pointer-events-none disabled:adm:opacity-50 [&_svg]:adm:pointer-events-none [&_svg]:adm:size-4 [&_svg]:adm:shrink-0",
  {
    variants: {
      variant: {
        default: "adm:bg-primary adm:text-primary-foreground adm:hover:bg-primary/90",
        destructive:
          "adm:bg-destructive adm:text-destructive-foreground adm:hover:bg-destructive/90",
        outline:
          "adm:border adm:border-input adm:bg-background adm:hover:bg-accent adm:hover:text-accent-foreground",
        secondary: "adm:bg-secondary adm:text-secondary-foreground adm:hover:bg-secondary/80",
        ghost: "adm:hover:bg-accent adm:hover:text-accent-foreground",
        link: "adm:text-primary adm:underline-offset-4 adm:hover:underline",
      },
      size: {
        default: "adm:h-10 adm:px-4 adm:py-2",
        sm: "adm:h-9 adm:rounded-md adm:px-3",
        lg: "adm:h-11 adm:rounded-md adm:px-8",
        icon: "adm:h-10 adm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
