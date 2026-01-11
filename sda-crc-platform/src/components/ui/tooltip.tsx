/**
 * Tooltip Component
 * =================
 * Hover tooltip with positioning and animations.
 *
 * "A word fitly spoken is like apples of gold in settings of silver." — Proverbs 25:11
 */

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { tooltip as tooltipAnimation } from "@/animations/variants";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  disabled?: boolean;
}

function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
  className,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  React.useEffect(() => {
    setIsMounted(true);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Position classes
  const positionClasses: Record<TooltipPosition, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // Arrow classes
  const arrowClasses: Record<TooltipPosition, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-[var(--admin-surface)] border-x-transparent border-b-transparent",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-b-[var(--admin-surface)] border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-[var(--admin-surface)] border-y-transparent border-r-transparent",
    right:
      "right-full top-1/2 -translate-y-1/2 border-r-[var(--admin-surface)] border-y-transparent border-l-transparent",
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      <AnimatePresence>
        {isVisible && !disabled && (
          <motion.div
            role="tooltip"
            variants={tooltipAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "absolute z-[var(--z-tooltip)] whitespace-nowrap rounded-lg bg-[var(--admin-surface)] px-3 py-2 text-sm text-white shadow-lg",
              positionClasses[position],
              className
            )}
          >
            {content}

            {/* Arrow */}
            <span className={cn("absolute border-4", arrowClasses[position])} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Tooltip };
export type { TooltipProps, TooltipPosition };
