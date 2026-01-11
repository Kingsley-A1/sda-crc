/**
 * Input Component
 * ===============
 * Text input with validation states, icons, and addons.
 *
 * "Apply your heart to instruction and your ears to words of knowledge." — Proverbs 23:12
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-muted)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--border)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20",
        filled:
          "bg-[var(--background-alt)] border-2 border-transparent focus-visible:border-[var(--primary)] focus-visible:bg-[var(--surface)]",
        flushed:
          "border-b-2 border-[var(--border)] rounded-none px-0 focus-visible:border-[var(--primary)]",
        unstyled: "border-0 bg-transparent focus-visible:ring-0",
      },
      inputSize: {
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
      inputSize: "md",
      state: "default",
    },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  error?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      inputSize,
      state,
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      error,
      helperText,
      label,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hasError = !!error;
    const currentState = hasError ? "error" : state;

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

        {/* Input Container */}
        <div className="relative flex">
          {/* Left Addon */}
          {leftAddon && (
            <div className="flex items-center rounded-l-xl border border-r-0 border-[var(--border)] bg-[var(--background-alt)] px-4 text-sm text-[var(--text-secondary)]">
              {leftAddon}
            </div>
          )}

          {/* Input Wrapper */}
          <div className="relative flex-1">
            {/* Left Icon */}
            {leftIcon && (
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                {leftIcon}
              </div>
            )}

            {/* Input */}
            <input
              ref={ref}
              id={inputId}
              type={type}
              className={cn(
                inputVariants({ variant, inputSize, state: currentState }),
                leftIcon && "pl-11",
                rightIcon && "pr-11",
                leftAddon && "rounded-l-none",
                rightAddon && "rounded-r-none",
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

            {/* Right Icon */}
            {rightIcon && (
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                {rightIcon}
              </div>
            )}
          </div>

          {/* Right Addon */}
          {rightAddon && (
            <div className="flex items-center rounded-r-xl border border-l-0 border-[var(--border)] bg-[var(--background-alt)] px-4 text-sm text-[var(--text-secondary)]">
              {rightAddon}
            </div>
          )}
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
);

Input.displayName = "Input";

export { Input, inputVariants };
export type { InputProps };
