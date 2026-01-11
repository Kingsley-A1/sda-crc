/**
 * Avatar Component
 * ================
 * User avatar with fallback initials and status indicators.
 *
 * "So God created man in His own image." — Genesis 1:27
 */

"use client";

import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getInitials } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--background-alt)]",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
        "3xl": "h-24 w-24 text-2xl",
      },
      border: {
        none: "",
        default: "ring-2 ring-[var(--surface)]",
        primary: "ring-2 ring-[var(--primary)]",
        secondary: "ring-2 ring-[var(--secondary)]",
        gold: "ring-4 ring-[var(--secondary)]",
      },
    },
    defaultVariants: {
      size: "md",
      border: "none",
    },
  }
);

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  name?: string;
  showStatus?: boolean;
  status?: "online" | "offline" | "busy" | "away";
}

function Avatar({
  className,
  size,
  border,
  src,
  alt,
  name,
  showStatus = false,
  status = "offline",
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);
  const initials = name ? getInitials(name) : "?";

  // Status indicator colors
  const statusColors = {
    online: "bg-[var(--success)]",
    offline: "bg-gray-400",
    busy: "bg-[var(--error)]",
    away: "bg-[var(--warning)]",
  };

  // Status indicator sizes based on avatar size
  const statusSizes = {
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-3.5 w-3.5",
    "2xl": "h-4 w-4",
    "3xl": "h-5 w-5",
  };

  return (
    <div className={cn(avatarVariants({ size, border }), className)} {...props}>
      {/* Image */}
      {src && !hasError ? (
        <Image
          src={src}
          alt={alt || name || "Avatar"}
          fill
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        // Fallback with initials
        <span className="font-semibold text-[var(--text-secondary)]">
          {initials}
        </span>
      )}

      {/* Status indicator */}
      {showStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--surface)]",
            statusColors[status],
            statusSizes[size || "md"]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

// ============================================================================
// Avatar Group
// ============================================================================

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  className?: string;
}

function AvatarGroup({
  children,
  max,
  size = "md",
  className,
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visibleAvatars = max ? childArray.slice(0, max) : childArray;
  const remainingCount = max ? Math.max(0, childArray.length - max) : 0;

  const overlapClasses = {
    xs: "-ml-2",
    sm: "-ml-2",
    md: "-ml-3",
    lg: "-ml-4",
    xl: "-ml-5",
    "2xl": "-ml-6",
    "3xl": "-ml-8",
  };

  return (
    <div className={cn("flex items-center", className)}>
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className={cn(index > 0 && overlapClasses[size || "md"])}
          style={{ zIndex: visibleAvatars.length - index }}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size,
                border: "default",
              })
            : child}
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            overlapClasses[size || "md"],
            avatarVariants({ size, border: "default" }),
            "bg-[var(--primary)] text-white"
          )}
          style={{ zIndex: 0 }}
        >
          <span className="font-semibold">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup, avatarVariants };
export type { AvatarProps, AvatarGroupProps };
