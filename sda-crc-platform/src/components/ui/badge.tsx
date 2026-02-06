/**
 * Badge Component
 * ===============
 * Status indicators and labels with multiple variants.
 *
 * "A good name is to be chosen rather than great riches." — Proverbs 22:1
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-white",
        secondary: "bg-[var(--secondary)] text-black",
        outline:
          "border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent",
        "outline-secondary":
          "border-2 border-[var(--secondary)] text-[var(--secondary)] bg-transparent",
        subtle: "bg-[var(--primary-50)] text-[var(--primary)]",
        "subtle-secondary":
          "bg-[var(--secondary-50)] text-[var(--secondary-dark)]",
        success: "bg-[var(--success)] text-white",
        "success-subtle": "bg-[var(--success-light)] text-[var(--success)]",
        warning: "bg-[var(--warning)] text-white",
        "warning-subtle": "bg-[var(--warning-light)] text-[var(--warning)]",
        error: "bg-[var(--error)] text-white",
        "error-subtle": "bg-[var(--error-light)] text-[var(--error)]",
        info: "bg-[var(--info)] text-white",
        "info-subtle": "bg-[var(--info-light)] text-[var(--info)]",
        live: "bg-[var(--accent-red)] text-white",
        new: "bg-[var(--accent-green)] text-white",
        muted: "bg-[var(--background-alt)] text-[var(--text-secondary)]",
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px] rounded",
        sm: "px-2 py-0.5 text-xs rounded-md",
        md: "px-2.5 py-1 text-xs rounded-lg",
        lg: "px-3 py-1.5 text-sm rounded-lg",
      },
      rounded: {
        default: "",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      leftIcon,
      rightIcon,
      dot = false,
      pulse = false,
      children,
      ...props
    },
    ref
  ) => {
    if (pulse) {
      return (
        <motion.span
          ref={ref}
          className={cn(badgeVariants({ variant, size, rounded }), className)}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          {dot && (
            <span className={cn("h-1.5 w-1.5 rounded-full bg-current", "animate-pulse")} />
          )}
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </motion.span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}

        {/* Left icon */}
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}

        {/* Content */}
        {children}

        {/* Right icon */}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps };
