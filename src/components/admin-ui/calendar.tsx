"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/utilities/ui";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "adm:bg-background adm:group/calendar adm:p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:adm:bg-transparent [[data-slot=popover-content]_&]:adm:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:adm:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:adm:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("adm:w-fit", defaultClassNames.root),
        months: cn(
          "adm:relative adm:flex adm:flex-col adm:gap-4 md:adm:flex-row",
          defaultClassNames.months
        ),
        month: cn("adm:flex adm:w-full adm:flex-col adm:gap-4", defaultClassNames.month),
        nav: cn(
          "adm:absolute adm:inset-x-0 adm:top-0 adm:flex adm:w-full adm:items-center adm:justify-between adm:gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "adm:h-[--cell-size] adm:w-[--cell-size] adm:select-none adm:p-0 aria-disabled:adm:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "adm:h-[--cell-size] adm:w-[--cell-size] adm:select-none adm:p-0 aria-disabled:adm:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "adm:flex adm:h-[--cell-size] adm:w-full adm:items-center adm:justify-center adm:px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "adm:flex adm:h-[--cell-size] adm:w-full adm:items-center adm:justify-center adm:gap-1.5 adm:text-sm adm:font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:adm:border-ring adm:border-input adm:shadow-xs has-focus:adm:ring-ring/50 has-focus:adm:ring-[3px] adm:relative adm:rounded-md adm:border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "adm:bg-popover adm:absolute adm:inset-0 adm:opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "adm:select-none adm:font-medium",
          captionLayout === "label"
            ? "adm:text-sm"
            : "[&>svg]:adm:text-muted-foreground adm:flex adm:h-8 adm:items-center adm:gap-1 adm:rounded-md adm:pl-2 adm:pr-1 adm:text-sm [&>svg]:adm:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "adm:w-full adm:border-collapse",
        weekdays: cn("adm:flex", defaultClassNames.weekdays),
        weekday: cn(
          "adm:text-muted-foreground adm:flex-1 adm:select-none adm:rounded-md adm:text-[0.8rem] adm:font-normal",
          defaultClassNames.weekday
        ),
        week: cn("adm:mt-2 adm:flex adm:w-full", defaultClassNames.week),
        week_number_header: cn(
          "adm:w-[--cell-size] adm:select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "adm:text-muted-foreground adm:select-none adm:text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
