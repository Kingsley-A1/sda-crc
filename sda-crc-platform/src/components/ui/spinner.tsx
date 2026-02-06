/**
 * Spinner Component
 * =================
 * Loading spinner indicator with multiple sizes.
 *
 * "Wait on the Lord: be of good courage." — Psalm 27:14
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3 border-[2px]",
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[3px]",
        xl: "h-12 w-12 border-4",
      },
      color: {
        default: "text-current",
        primary: "text-[var(--primary)]",
        secondary: "text-[var(--secondary)]",
        white: "text-white",
        muted: "text-[var(--text-secondary)]",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  }
);

interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

function Spinner({
  className,
  size,
  color,
  label = "Loading...",
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, color }), className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Spinner, spinnerVariants };
export type { SpinnerProps };
