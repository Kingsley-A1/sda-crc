/**
 * Skeleton Component
 * ==================
 * Loading placeholder with shimmer animation.
 *
 * "Wait on the Lord and be of good courage." — Psalm 27:14
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "animate-pulse rounded bg-gradient-to-r from-[var(--border-light)] via-gray-100 to-[var(--border-light)] bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]",
  {
    variants: {
      variant: {
        default: "",
        circular: "rounded-full",
        text: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  className,
  variant,
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

// ============================================================================
// Pre-built Skeleton Components
// ============================================================================

function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className="h-4"
          style={{ width: i === lines - 1 ? "70%" : "100%" }}
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return <Skeleton variant="circular" className={cn(sizes[size], className)} />;
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 p-4", className)}>
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}

function SkeletonSermonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--border-light)] bg-[var(--surface)]",
        className
      )}
    >
      <Skeleton className="aspect-video w-full" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-4/5" />
        <div className="flex items-center gap-2">
          <SkeletonAvatar size="sm" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

function SkeletonEventCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex gap-4 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] p-4",
        className
      )}
    >
      <Skeleton className="h-24 w-24 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

function SkeletonWorkerCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border border-[var(--border-light)] bg-[var(--surface)] p-6",
        className
      )}
    >
      <Skeleton variant="circular" className="mb-4 h-24 w-24" />
      <Skeleton className="mb-2 h-5 w-32" />
      <Skeleton className="h-6 w-28 rounded-full" />
    </div>
  );
}

function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex gap-4 border-b border-[var(--border)] p-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 border-b border-[var(--border-light)] p-4"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-4 flex-1"
              style={{ width: colIndex === 0 ? "40%" : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonSermonCard,
  SkeletonEventCard,
  SkeletonWorkerCard,
  SkeletonTable,
  skeletonVariants,
};
export type { SkeletonProps };
