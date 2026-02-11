"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "ghost";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, helperText, variant = "default", id, ...props },
    ref,
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const variantStyles = {
      default: "bg-background border-border focus:border-primary",
      filled:
        "bg-muted border-transparent focus:bg-background focus:border-primary",
      ghost:
        "bg-transparent border-transparent hover:bg-muted focus:bg-muted focus:border-primary",
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "flex w-full rounded-lg border px-4 py-3 text-sm text-foreground transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring/20",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
            "min-h-[120px] resize-y leading-relaxed",
            variantStyles[variant],
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive/20",
            className,
          )}
          {...props}
        />
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
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export { Textarea };
export type { TextareaProps };
