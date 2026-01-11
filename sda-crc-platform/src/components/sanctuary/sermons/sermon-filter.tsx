"use client";

import * as React from "react";

import { Input, Select } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { SermonFilters } from "@/types/sermon";

export interface SermonFilterProps {
  value: SermonFilters;
  onChange: (next: SermonFilters) => void;
  speakers?: string[];
  seriesOptions?: string[];
  className?: string;
}

export function SermonFilter({
  value,
  onChange,
  speakers = [],
  seriesOptions = [],
  className,
}: SermonFilterProps) {
  const speakerSelectOptions = React.useMemo(
    () => [{ value: "", label: "All speakers" }, ...speakers.map((s) => ({ value: s, label: s }))],
    [speakers]
  );

  const seriesSelectOptions = React.useMemo(
    () => [{ value: "", label: "All series" }, ...seriesOptions.map((s) => ({ value: s, label: s }))],
    [seriesOptions]
  );

  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-3", className)}>
      <Input
        type="search"
        placeholder="Search sermons…"
        value={value.search ?? ""}
        onChange={(e) => onChange({ ...value, search: e.target.value || undefined })}
        className="min-h-11"
      />

      <Select
        options={speakerSelectOptions}
        value={value.speaker ?? ""}
        onChange={(next) => onChange({ ...value, speaker: next || undefined })}
        placeholder="All speakers"
        selectSize="md"
      />

      <Select
        options={seriesSelectOptions}
        value={value.series ?? ""}
        onChange={(next) => onChange({ ...value, series: next || undefined })}
        placeholder="All series"
        selectSize="md"
      />
    </div>
  );
}
