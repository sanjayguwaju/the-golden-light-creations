import * as React from "react";

import { cn } from "@/utilities/ui";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "adm:flex adm:h-10 adm:w-full adm:rounded-md adm:border adm:border-input adm:bg-background adm:px-3 adm:py-2 adm:text-base adm:ring-offset-background file:adm:border-0 file:adm:bg-transparent file:adm:text-sm file:adm:font-medium file:adm:text-foreground adm:placeholder:text-muted-foreground focus-visible:adm:outline-none focus-visible:adm:ring-2 focus-visible:adm:ring-ring focus-visible:adm:ring-offset-2 disabled:adm:cursor-not-allowed disabled:adm:opacity-50 adm:md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
