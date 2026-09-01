import React from "react";
import type { InfoTableBlock as InfoTableBlockProps } from "@/payload-types";

const tableStyleClasses: Record<string, { table: string; th: string; tr: string }> = {
  striped: {
    table: "min-w-full divide-y divide-border",
    th: "bg-primary text-primary-foreground px-4 py-3 text-left text-sm font-semibold",
    tr: "odd:bg-background even:bg-muted/50",
  },
  bordered: {
    table: "min-w-full border border-border divide-y divide-border",
    th: "bg-muted text-foreground px-4 py-3 text-left text-sm font-semibold border border-border",
    tr: "divide-x divide-border",
  },
  clean: {
    table: "min-w-full divide-y-2 divide-border",
    th: "text-foreground px-4 py-3 text-left text-sm font-bold uppercase tracking-wide",
    tr: "",
  },
};

export const InfoTableBlock: React.FC<InfoTableBlockProps> = ({
  heading,
  caption,
  headers,
  rows,
  style = "striped",
}) => {
  if (!rows || rows.length === 0) return null;

  const styleConfig = tableStyleClasses[style ?? "striped"] ?? tableStyleClasses.striped;

  return (
    <div className="my-8 w-full">
      {heading && <h3 className="mb-2 text-xl font-bold text-foreground">{heading}</h3>}

      <div className="overflow-x-auto rounded-xl shadow-sm border border-border">
        <table className={`${styleConfig.table} w-full`}>
          {headers && headers.length > 0 && (
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th key={header.id ?? i} className={`${styleConfig.th}`}>
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex} className={styleConfig.tr}>
                {row.cells?.map((cell, cellIndex) => {
                  if (cell.isHeader) {
                    return (
                      <th
                        key={cell.id ?? cellIndex}
                        scope="row"
                        className="px-4 py-3 text-sm font-semibold text-foreground bg-muted text-left"
                      >
                        {cell.value}
                      </th>
                    );
                  }
                  return (
                    <td key={cell.id ?? cellIndex} className="px-4 py-3 text-sm text-foreground">
                      {cell.value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <p className="mt-2 text-xs text-muted-foreground text-center italic">{caption}</p>
      )}
    </div>
  );
};
