"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-primary-100 text-primary-700",
        outline: "border border-primary text-primary bg-transparent",
        muted: "bg-muted text-muted-foreground",
        subtle: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        success:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        warning:
          "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        live: "bg-red-600 text-white animate-pulse",
        gold: "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900",
        "success-subtle": "bg-green-50 text-green-700 border border-green-200",
        "warning-subtle": "bg-amber-50 text-amber-700 border border-amber-200",
        "error-subtle": "bg-red-50 text-red-700 border border-red-200",
        "info-subtle": "bg-blue-50 text-blue-700 border border-blue-200",
        "primary-subtle":
          "bg-primary-50 text-primary-700 border border-primary-200",
      },
      size: {
        xs: "text-[10px] px-1.5 py-0.5 rounded",
        sm: "text-xs px-2 py-0.5 rounded-md",
        md: "text-sm px-2.5 py-1 rounded-lg",
        lg: "text-base px-3 py-1.5 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  pulse?: boolean;
  rounded?: "default" | "full";
  icon?: React.ReactNode;
}

function Badge({
  className,
  variant,
  size,
  dot,
  pulse,
  rounded,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size }),
        rounded === "full" && "rounded-full",
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full",
            variant === "live" ? "bg-white" : "bg-current",
            pulse && "animate-pulse",
          )}
        />
      )}
      {icon && <span className="mr-1.5 -ml-0.5">{icon}</span>}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
