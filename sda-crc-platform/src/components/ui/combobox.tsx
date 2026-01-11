/**
 * Combobox Component
 * ==================
 * Searchable dropdown for selecting from a large list (e.g., worker roles).
 *
 * "Seek and you shall find." — Matthew 7:7
 */

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, CaretDown, Check, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ComboboxOption {
  value: string;
  label: string;
  category?: string;
  disabled?: boolean;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  className?: string;
  id?: string;
  emptyMessage?: string;
  groupByCategory?: boolean;
}

function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  disabled = false,
  error,
  helperText,
  label,
  required,
  className,
  id,
  emptyMessage = "No results found.",
  groupByCategory = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const inputId = id || React.useId();
  const hasError = !!error;

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.category?.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  // Group options by category
  const groupedOptions = React.useMemo(() => {
    if (!groupByCategory) return { "": filteredOptions };

    return filteredOptions.reduce((groups, option) => {
      const category = option.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(option);
      return groups;
    }, {} as Record<string, ComboboxOption[]>);
  }, [filteredOptions, groupByCategory]);

  // Flatten for keyboard navigation
  const flatOptions = React.useMemo(() => {
    return Object.values(groupedOptions).flat();
  }, [groupedOptions]);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Reset search and highlighted index when closed
  React.useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
        event.preventDefault();
        if (
          isOpen &&
          highlightedIndex >= 0 &&
          highlightedIndex < flatOptions.length
        ) {
          const option = flatOptions[highlightedIndex];
          if (!option.disabled) {
            onChange?.(option.value);
            setIsOpen(false);
          }
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => {
            const next = prev + 1;
            return next >= flatOptions.length ? 0 : next;
          });
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? flatOptions.length - 1 : next;
          });
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
  };

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
          {required && (
            <span className="ml-1 text-[var(--error)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
          id={inputId}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${inputId}-options`}
          aria-invalid={hasError}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex w-full items-center justify-between bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            "h-11 px-4 text-base rounded-xl",
            "border border-[var(--border)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20",
            hasError &&
              "border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20",
            isOpen && "ring-2 ring-[var(--primary)]/20 border-[var(--primary)]"
          )}
        >
          <span
            className={cn(
              "flex-1 text-left truncate",
              !selectedOption && "text-[var(--text-muted)]"
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <div className="flex items-center gap-2">
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full p-0.5 hover:bg-[var(--background-alt)] transition-colors"
                aria-label="Clear selection"
              >
                <X className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              </button>
            )}
            <CaretDown
              className={cn(
                "h-4 w-4 text-[var(--text-muted)] transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-[var(--z-dropdown)] mt-2 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg"
            >
              {/* Search Input */}
              <div className="border-b border-[var(--border)] p-2">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setHighlightedIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-lg bg-[var(--background-alt)] py-2 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Options List */}
              <ul
                id={`${inputId}-options`}
                role="listbox"
                aria-labelledby={inputId}
                className="max-h-60 overflow-auto py-1"
              >
                {flatOptions.length === 0 ? (
                  <li className="px-4 py-3 text-center text-sm text-[var(--text-muted)]">
                    {emptyMessage}
                  </li>
                ) : (
                  Object.entries(groupedOptions).map(
                    ([category, categoryOptions]) => (
                      <React.Fragment key={category}>
                        {/* Category Header */}
                        {groupByCategory && category && (
                          <li className="sticky top-0 bg-[var(--background-alt)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                            {category}
                          </li>
                        )}

                        {/* Options */}
                        {categoryOptions.map((option) => {
                          const globalIndex = flatOptions.findIndex(
                            (o) => o.value === option.value
                          );
                          return (
                            <li
                              key={option.value}
                              role="option"
                              aria-selected={value === option.value}
                              aria-disabled={option.disabled}
                              onClick={() => {
                                if (!option.disabled) {
                                  onChange?.(option.value);
                                  setIsOpen(false);
                                }
                              }}
                              onMouseEnter={() =>
                                setHighlightedIndex(globalIndex)
                              }
                              className={cn(
                                "flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors",
                                value === option.value
                                  ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                                  : "text-[var(--text-primary)]",
                                highlightedIndex === globalIndex &&
                                  value !== option.value &&
                                  "bg-[var(--background-alt)]",
                                option.disabled &&
                                  "cursor-not-allowed opacity-50"
                              )}
                            >
                              <span>{option.label}</span>
                              {value === option.value && (
                                <Check
                                  className="h-4 w-4 text-[var(--primary)]"
                                  weight="bold"
                                />
                              )}
                            </li>
                          );
                        })}
                      </React.Fragment>
                    )
                  )
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-sm text-[var(--error)]"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <p
          id={`${inputId}-helper`}
          className="mt-2 text-sm text-[var(--text-secondary)]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Combobox };
export type { ComboboxProps, ComboboxOption };
