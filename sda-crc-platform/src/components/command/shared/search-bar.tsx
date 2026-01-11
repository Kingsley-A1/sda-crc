"use client";

import * as React from "react";

import { Input } from "@/components/ui";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  debounceMs = 250,
  className,
}: SearchBarProps) {
  const [local, setLocal] = React.useState(value);
  const debounced = useDebounce(local, debounceMs);

  React.useEffect(() => {
    setLocal(value);
  }, [value]);

  React.useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  return (
    <Input
      type="search"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      className={cn("min-h-11", className)}
    />
  );
}
