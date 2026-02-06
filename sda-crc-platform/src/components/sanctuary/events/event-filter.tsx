"use client";

import * as React from "react";

import { Button, Input, Select } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { EventCategory, EventFilters } from "@/types/event";

const CATEGORY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "All categories" },
  { value: "WORSHIP", label: "Worship" },
  { value: "FELLOWSHIP", label: "Fellowship" },
  { value: "EVANGELISM", label: "Evangelism" },
  { value: "TRAINING", label: "Training" },
  { value: "YOUTH", label: "Youth" },
  { value: "CHILDREN", label: "Children" },
  { value: "SPECIAL", label: "Special" },
];

export interface EventFilterProps {
  value: EventFilters;
  onChange: (next: EventFilters) => void;
  className?: string;
}

export function EventFilter({ value, onChange, className }: EventFilterProps) {
  const hasUpcoming = !!value.upcoming;
  const hasFeatured = !!value.featured;

  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-4", className)}>
      <div className="sm:col-span-2">
        <Input
          type="search"
          placeholder="Search events…"
          value={value.search ?? ""}
          onChange={(e) =>
            onChange({ ...value, search: e.target.value || undefined })
          }
          className="min-h-11"
        />
      </div>

      <Select
        options={CATEGORY_OPTIONS}
        value={(value.category as string | undefined) ?? ""}
        onChange={(next) =>
          onChange({
            ...value,
            category: (next || undefined) as EventCategory | undefined,
          })
        }
        placeholder="All categories"
        selectSize="md"
      />

      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          className="min-h-11 flex-1"
          variant={hasUpcoming ? "primary" : "outline"}
          onClick={() =>
            onChange({ ...value, upcoming: hasUpcoming ? undefined : true })
          }
        >
          Upcoming
        </Button>
        <Button
          type="button"
          size="sm"
          className="min-h-11 flex-1"
          variant={hasFeatured ? "primary" : "outline"}
          onClick={() =>
            onChange({ ...value, featured: hasFeatured ? undefined : true })
          }
        >
          Featured
        </Button>
      </div>
    </div>
  );
}
