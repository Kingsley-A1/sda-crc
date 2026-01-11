/**
 * Gold Badge Component
 * ====================
 * Special honour badge for worker roles with gold gradient styling.
 *
 * "Let the elders who rule well be counted worthy of double honor." — 1 Timothy 5:17
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { Crown, Star, Medal } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const goldBadgeVariants = cva(
  "inline-flex items-center gap-2 font-semibold text-black transition-all duration-300",
  {
    variants: {
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2 text-base",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
      },
      glow: {
        true: "shadow-[0_0_20px_rgba(249,160,27,0.4)]",
        false: "shadow-md",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
      glow: false,
    },
  }
);

type IconType = "crown" | "star" | "medal" | "none";

interface GoldBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof goldBadgeVariants> {
  icon?: IconType;
  animated?: boolean;
}

const iconComponents: Record<
  IconType,
  React.ComponentType<{
    className?: string;
    weight?: "regular" | "fill";
  }> | null
> = {
  crown: Crown,
  star: Star,
  medal: Medal,
  none: null,
};

const GoldBadge = React.forwardRef<HTMLSpanElement, GoldBadgeProps>(
  (
    {
      className,
      size,
      rounded,
      glow,
      icon = "crown",
      animated = true,
      children,
      ...props
    },
    ref
  ) => {
    const IconComponent = iconComponents[icon];

    const badge = (
      <span
        ref={ref}
        className={cn(
          goldBadgeVariants({ size, rounded, glow }),
          "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400",
          "bg-[length:200%_100%]",
          animated && "animate-[shimmer_3s_ease-in-out_infinite]",
          className
        )}
        {...props}
      >
        {IconComponent && (
          <IconComponent
            className={cn(
              "shrink-0",
              size === "sm" && "h-3.5 w-3.5",
              size === "md" && "h-4 w-4",
              size === "lg" && "h-5 w-5"
            )}
            weight="fill"
          />
        )}
        {children}
      </span>
    );

    if (animated) {
      return (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-flex"
        >
          {badge}
        </motion.span>
      );
    }

    return badge;
  }
);

GoldBadge.displayName = "GoldBadge";

// ============================================================================
// Worker Role Badge (Pre-configured Gold Badge for workers)
// ============================================================================

interface WorkerRoleBadgeProps {
  role: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function WorkerRoleBadge({
  role,
  size = "md",
  className,
}: WorkerRoleBadgeProps) {
  return (
    <GoldBadge
      size={size}
      icon="crown"
      rounded="full"
      glow={size === "lg"}
      className={className}
    >
      {role}
    </GoldBadge>
  );
}

export { GoldBadge, WorkerRoleBadge, goldBadgeVariants };
export type { GoldBadgeProps, WorkerRoleBadgeProps };
