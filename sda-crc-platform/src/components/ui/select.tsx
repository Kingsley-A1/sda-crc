/**
 * Select Component
 * ================
 * Dropdown select with custom styling and keyboard navigation.
 * 
 * "Choose this day whom you will serve." — Joshua 24:15
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--border)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20",
        filled:
          "bg-[var(--background-alt)] border-2 border-transparent focus-visible:border-[var(--primary)] focus-visible:bg-[var(--surface)]",
      },
      selectSize: {
        sm: "h-9 px-3 text-sm rounded-lg",
        md: "h-11 px-4 text-base rounded-xl",
        lg: "h-14 px-5 text-lg rounded-xl",
      },
      state: {
        default: "",
        error:
          "border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20",
        success:
          "border-[var(--success)] focus-visible:border-[var(--success)] focus-visible:ring-[var(--success)]/20",
      },
    },
    defaultVariants: {
      variant: "default",
      selectSize: "md",
      state: "default",
    },
  }
);

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  variant,
  selectSize,
  state,
  error,
  helperText,
  label,
  required,
  className,
  id,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputId = id || React.useId();
  const hasError = !!error;
  const currentState = hasError ? "error" : state;

  const selectedOption = options.find((opt) => opt.value === value);

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

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          const option = options[highlightedIndex];
          if (!option.disabled) {
            onChange?.(option.value);
            setIsOpen(false);
          }
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => {
            const next = prev + 1;
            return next >= options.length ? 0 : next;
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
            return next < 0 ? options.length - 1 : next;
          });
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
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
            selectTriggerVariants({ variant, selectSize, state: currentState }),
            isOpen && "ring-2 ring-[var(--primary)]/20 border-[var(--primary)]"
          )}
        >
          <span
            className={cn(
              !selectedOption && "text-[var(--text-muted)]"
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <CaretDown
            className={cn(
              "h-4 w-4 text-[var(--text-muted)] transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              id={`${inputId}-options`}
              role="listbox"
              aria-labelledby={inputId}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-[var(--z-dropdown)] mt-2 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-lg"
            >
              {options.map((option, index) => (
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
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors",
                    value === option.value
                      ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                      : "text-[var(--text-primary)]",
                    highlightedIndex === index &&
                      value !== option.value &&
                      "bg-[var(--background-alt)]",
                    option.disabled &&
                      "cursor-not-allowed opacity-50"
                  )}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-[var(--primary)]" weight="bold" />
                  )}
                </li>
              ))}
            </motion.ul>
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

export { Select, selectTriggerVariants };
export type { SelectProps, SelectOption };
