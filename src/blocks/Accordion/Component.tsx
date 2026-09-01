"use client";

import React, { useState } from "react";
import type { AccordionBlock as AccordionBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";

export const AccordionBlock: React.FC<AccordionBlockProps> = ({
  heading,
  items,
  defaultOpen = true,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ? 0 : null);

  if (!items || items.length === 0) return null;

  return (
    <section className="my-8 w-full">
      {heading && (
        <h2 className="mb-6 text-2xl md:text-3xl font-bold text-foreground">{heading}</h2>
      )}

      <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.id ?? index} className="bg-background">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-foreground hover:bg-muted transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-base md:text-lg">{item.title}</span>
                <span
                  className={`ml-4 text-primary transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-muted-foreground text-sm md:text-base">
                  <RichText data={item.content} enableGutter={false} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
