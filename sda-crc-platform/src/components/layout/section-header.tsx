/**
 * Section Header Component
 * ========================
 * Section title with optional subtitle and description.
 *
 * "Order is heaven's first law." — Alexander Pope
 */

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/animations/variants";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  animated?: boolean;
  className?: string;
}

function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  badge,
  actions,
  animated = true,
  className,
}: SectionHeaderProps) {
  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: "initial",
        whileInView: "animate",
        viewport: { once: true, margin: "-100px" },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "mb-10 lg:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <motion.div variants={animated ? fadeInUp : undefined} className="mb-4">
          {badge}
        </motion.div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={animated ? fadeInUp : undefined}
          className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--secondary)]"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Title */}
      <motion.h2
        variants={animated ? fadeInUp : undefined}
        className={cn(
          "text-2xl font-bold text-[var(--text-primary)] sm:text-3xl lg:text-4xl text-balance",
          align === "center" && "max-w-2xl mx-auto"
        )}
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          variants={animated ? fadeInUp : undefined}
          className={cn(
            "mt-4 text-lg text-[var(--text-secondary)]",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}

      {/* Actions */}
      {actions && (
        <motion.div
          variants={animated ? fadeInUp : undefined}
          className={cn(
            "mt-6 flex flex-wrap gap-4",
            align === "center" && "justify-center"
          )}
        >
          {actions}
        </motion.div>
      )}
    </Wrapper>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
