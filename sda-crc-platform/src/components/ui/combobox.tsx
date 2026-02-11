"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CaretDown, MagnifyingGlass, Check } from "@phosphor-icons/react";

interface ComboboxOption {
  value: string;
  label: string;
  category?: string;
}

interface ComboboxProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  required?: boolean;
  groupByCategory?: boolean;
  error?: string;
  className?: string;
}

function Combobox({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  required,
  groupByCategory,
  error,
  className,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const filtered = options.filter(
    (o) =>
      o.label.toLowerCase().includes(search.toLowerCase()) ||
      o.category?.toLowerCase().includes(search.toLowerCase()),
  );

  // Group by category if enabled
  const grouped = React.useMemo(() => {
    if (!groupByCategory) return null;
    const groups: Record<string, ComboboxOption[]> = {};
    filtered.forEach((opt) => {
      const cat = opt.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(opt);
    });
    return groups;
  }, [filtered, groupByCategory]);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className={cn("space-y-1.5 relative", className)} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-left transition-colors",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          error && "border-destructive",
          !selectedOption && "text-gray-400",
        )}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <CaretDown
          size={16}
          className={cn(
            "ml-2 shrink-0 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <MagnifyingGlass size={16} className="text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-sm text-gray-400">
                No options found
              </p>
            )}

            {grouped
              ? Object.entries(grouped).map(([category, opts]) => (
                  <div key={category}>
                    <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {category}
                    </p>
                    {opts.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelect(opt.value)}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                          value === opt.value && "bg-primary/5 text-primary",
                        )}
                      >
                        <span>{opt.label}</span>
                        {value === opt.value && (
                          <Check size={16} weight="bold" />
                        )}
                      </button>
                    ))}
                  </div>
                ))
              : filtered.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                      value === opt.value && "bg-primary/5 text-primary",
                    )}
                  >
                    <span>{opt.label}</span>
                    {value === opt.value && <Check size={16} weight="bold" />}
                  </button>
                ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export { Combobox };
