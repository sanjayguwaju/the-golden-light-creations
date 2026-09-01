import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utilities/ui";

const alertVariants = cva(
  "adm:relative adm:w-full adm:rounded-lg adm:border adm:p-4 [&>svg~*]:adm:pl-7 [&>svg+div]:adm:translate-y-[-3px] [&>svg]:adm:absolute [&>svg]:adm:left-4 [&>svg]:adm:top-4 [&>svg]:adm:text-foreground",
  {
    variants: {
      variant: {
        default: "adm:bg-background adm:text-foreground",
        destructive:
          "adm:border-destructive/50 adm:text-destructive dark:adm:border-destructive [&>svg]:adm:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("adm:mb-1 adm:font-medium adm:leading-none adm:tracking-tight", className)}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("adm:text-sm [&_p]:adm:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
