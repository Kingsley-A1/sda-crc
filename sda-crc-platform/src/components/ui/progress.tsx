/**
 * Progress Component
 * ==================
 * Progress bar with labels and animations.
 *
 * "Forgetting what is behind, I press on toward the goal." — Philippians 3:13-14
 */

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "w-full overflow-hidden rounded-full bg-[var(--background-alt)]",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
        xl: "h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const progressBarVariants = cva("h-full rounded-full transition-all", {
  variants: {
    variant: {
      default: "bg-[var(--primary)]",
      secondary: "bg-[var(--secondary)]",
      success: "bg-[var(--success)]",
      warning: "bg-[var(--warning)]",
      error: "bg-[var(--error)]",
      gradient: "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]",
    },
    striped: {
      true: "bg-[length:1rem_1rem] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1s_linear_infinite]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    striped: false,
  },
});

interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => string;
  animated?: boolean;
}

function Progress({
  className,
  size,
  variant,
  striped,
  value,
  max = 100,
  label,
  showValue = false,
  valueFormat,
  animated = true,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayValue = valueFormat
    ? valueFormat(value, max)
    : `${Math.round(percentage)}%`;

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Label and value row */}
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-[var(--text-primary)]">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-[var(--text-secondary)]">{displayValue}</span>
          )}
        </div>
      )}

      {/* Progress bar container */}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={progressVariants({ size })}
      >
        {/* Progress bar fill */}
        <motion.div
          className={cn(progressBarVariants({ variant, striped }))}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Circular Progress
// ============================================================================

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "secondary" | "success" | "warning" | "error";
  showValue?: boolean;
  label?: string;
  className?: string;
}

function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = "default",
  showValue = true,
  label,
  className,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    default: "stroke-[var(--primary)]",
    secondary: "stroke-[var(--secondary)]",
    success: "stroke-[var(--success)]",
    warning: "stroke-[var(--warning)]",
    error: "stroke-[var(--error)]",
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-[var(--background-alt)]"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={variantColors[variant]}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>

      {/* Center content */}
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-[var(--text-primary)]">
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-xs text-[var(--text-secondary)]">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { Progress, CircularProgress, progressVariants, progressBarVariants };
export type { ProgressProps, CircularProgressProps };
