"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface LiveBadgeProps {
  className?: string;
}

export function LiveBadge({ className }: LiveBadgeProps) {
  const reduce = useReducedMotion();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white",
        className
      )}
    >
      <motion.span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-white"
        animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
        transition={
          reduce
            ? undefined
            : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        }
      />
      LIVE
    </span>
  );
}
