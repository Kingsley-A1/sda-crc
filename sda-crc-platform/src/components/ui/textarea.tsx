/**
 * Textarea Component
 * ==================
 * Multi-line text input with auto-resize and validation states.
 *
 * "Let the words of my mouth be acceptable in your sight." — Psalm 19:14
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-[120px] w-full resize-none bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-muted)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--border)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20 rounded-xl",
        filled:
          "bg-[var(--background-alt)] border-2 border-transparent focus-visible:border-[var(--primary)] focus-visible:bg-[var(--surface)] rounded-xl",
        flushed:
          "border-b-2 border-[var(--border)] rounded-none px-0 focus-visible:border-[var(--primary)]",
      },
      textareaSize: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
      },
      state: {
        default: "",
        error:
          "border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20",
        success:
          "border-[var(--success)] focus-visible:border-[var(--success)] focus-visible:ring-[var(--success)]/20",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
      state: "default",
      resize: "none",
    },
  }
);

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  error?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  maxLength?: number;
  showCount?: boolean;
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textareaSize,
      state,
      resize,
      error,
      helperText,
      label,
      required,
      maxLength,
      showCount = false,
      autoResize = false,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const hasError = !!error;
    const currentState = hasError ? "error" : state;
    const [charCount, setCharCount] = React.useState(0);

    // Handle auto-resize
    const handleResize = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea && autoResize) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoResize]);

    // Handle change with character count
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
        handleResize();
      },
      [onChange, handleResize]
    );

    // Set initial char count
    React.useEffect(() => {
      if (typeof value === "string") {
        setCharCount(value.length);
      }
    }, [value]);

    // Initial resize
    React.useEffect(() => {
      handleResize();
    }, [handleResize]);

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div className="w-full">
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

        {/* Textarea */}
        <textarea
          ref={mergedRef}
          id={inputId}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            textareaVariants({
              variant,
              textareaSize,
              state: currentState,
              resize,
            }),
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />

        {/* Bottom Row */}
        <div className="mt-2 flex items-center justify-between">
          {/* Error or Helper Text */}
          <div className="flex-1">
            {error && (
              <p
                id={`${inputId}-error`}
                className="text-sm text-[var(--error)]"
                role="alert"
              >
                {error}
              </p>
            )}
            {!error && helperText && (
              <p
                id={`${inputId}-helper`}
                className="text-sm text-[var(--text-secondary)]"
              >
                {helperText}
              </p>
            )}
          </div>

          {/* Character Count */}
          {showCount && (
            <p
              className={cn(
                "text-sm",
                maxLength && charCount >= maxLength
                  ? "text-[var(--error)]"
                  : "text-[var(--text-muted)]"
              )}
            >
              {charCount}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
export type { TextareaProps };
