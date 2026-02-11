"use client";

import * as React from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface TablePaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export function TablePagination({
  page,
  totalPages,
  onChange,
  className,
}: TablePaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <p className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="min-h-11"
          disabled={!canPrev}
          onClick={() => onChange(page - 1)}
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="min-h-11"
          disabled={!canNext}
          onClick={() => onChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
