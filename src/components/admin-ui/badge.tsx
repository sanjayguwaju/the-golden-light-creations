import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utilities/ui";

const badgeVariants = cva(
  "adm:inline-flex adm:items-center adm:rounded-full adm:border adm:px-2.5 adm:py-0.5 adm:text-xs adm:font-semibold adm:transition-colors focus:adm:outline-none focus:adm:ring-2 focus:adm:ring-ring focus:adm:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "adm:border-transparent adm:bg-primary adm:text-primary-foreground adm:hover:bg-primary/80",
        secondary:
          "adm:border-transparent adm:bg-secondary adm:text-secondary-foreground adm:hover:bg-secondary/80",
        destructive:
          "adm:border-transparent adm:bg-destructive adm:text-destructive-foreground adm:hover:bg-destructive/80",
        outline: "adm:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
