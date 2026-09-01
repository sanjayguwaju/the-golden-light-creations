"use client";

import { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utilities/ui";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "adm:flex adm:flex-col adm:gap-6",
        "adm:has-[>[data-slot=checkbox-group]]:gap-3 adm:has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "adm:mb-3 adm:font-medium",
        "data-[variant=legend]:adm:text-base",
        "data-[variant=label]:adm:text-sm",
        className
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "adm:group/field-group adm:@container/field-group adm:flex adm:w-full adm:flex-col adm:gap-7 data-[slot=checkbox-group]:adm:gap-3 [&>[data-slot=field-group]]:adm:gap-4",
        className
      )}
      {...props}
    />
  );
}

const fieldVariants = cva("group/field data-[invalid=true]:text-destructive flex w-full gap-3", {
  variants: {
    orientation: {
      vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
      horizontal: [
        "flex-row items-center",
        "[&>[data-slot=field-label]]:flex-auto",
        "adm:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:adm:mt-px adm:has-[>[data-slot=field-content]]:adm:items-start",
      ],
      responsive: [
        "@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto",
        "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
        "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "adm:group/field-content adm:flex adm:flex-1 adm:flex-col adm:gap-1.5 adm:leading-snug",
        className
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "adm:group/field-label adm:peer/field-label adm:flex adm:w-fit adm:gap-2 adm:leading-snug group-data-[disabled=true]/field:adm:opacity-50",
        "adm:has-[>[data-slot=field]]:adm:w-full adm:has-[>[data-slot=field]]:adm:flex-col adm:has-[>[data-slot=field]]:adm:rounded-md adm:has-[>[data-slot=field]]:adm:border [&>[data-slot=field]]:adm:p-4",
        "adm:has-data-[state=checked]:adm:bg-primary/5 adm:has-data-[state=checked]:adm:border-primary dark:adm:has-data-[state=checked]:adm:bg-primary/10",
        className
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "adm:flex adm:w-fit adm:items-center adm:gap-2 adm:text-sm adm:font-medium adm:leading-snug group-data-[disabled=true]/field:adm:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "adm:text-muted-foreground adm:text-sm adm:font-normal adm:leading-normal group-has-[[data-orientation=horizontal]]/field:adm:text-balance",
        "adm:nth-last-2:-mt-1 adm:last:mt-0 adm:[[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:adm:text-primary [&>a]:adm:underline [&>a]:adm:underline-offset-4",
        className
      )}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "adm:relative adm:-my-2 adm:h-5 adm:text-sm group-data-[variant=outline]/field-group:adm:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors) {
      return null;
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return errors[0].message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
