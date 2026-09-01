import * as React from "react";

import { cn } from "@/utilities/ui";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "adm:flex adm:min-h-[80px] adm:w-full adm:rounded-md adm:border adm:border-input adm:bg-background adm:px-3 adm:py-2 adm:text-base adm:ring-offset-background adm:placeholder:text-muted-foreground adm:focus-visible:outline-none adm:focus-visible:ring-2 adm:focus-visible:ring-ring adm:focus-visible:ring-offset-2 adm:disabled:cursor-not-allowed adm:disabled:opacity-50 adm:md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
