"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange?:
    | ((value: string) => void)
    | React.ChangeEventHandler<HTMLSelectElement>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, options, placeholder, id, onChange, ...props },
    ref,
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!onChange) return;
      // Check if handler is a simple value setter
      if (onChange.length <= 1) {
        (onChange as (value: string) => void)(e.target.value);
      } else {
        (onChange as React.ChangeEventHandler<HTMLSelectElement>)(e);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "flex h-11 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-all duration-200 appearance-none",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive/20",
            className,
          )}
          onChange={handleChange}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
export { Select };
export type { SelectProps };
