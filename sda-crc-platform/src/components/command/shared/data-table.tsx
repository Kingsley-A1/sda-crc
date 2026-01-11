"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T extends { id: string }> {
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[700px] border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-left text-xs font-bold text-[var(--text-secondary)]",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center text-sm text-[var(--text-tertiary)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-[var(--border)]">
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-3 align-top text-sm text-[var(--text-primary)]">
                    {col.cell ? col.cell(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
