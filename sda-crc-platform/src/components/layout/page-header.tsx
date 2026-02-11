"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/animations/variants";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "gradient";
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  description,
  align = "center",
  size = "md",
  variant = "minimal",
  className,
  children,
}: PageHeaderProps) {
  const sizeClasses = {
    sm: "py-10 md:py-14",
    md: "py-14 md:py-20",
    lg: "py-18 md:py-28",
  };

  // Minimal variant - clean, professional look with light background
  if (variant === "minimal") {
    return (
      <section
        className={cn(
          "relative bg-gradient-to-b from-primary-50/80 to-white border-b border-border",
          sizeClasses[size],
          className,
        )}
      >
        {/* Subtle decorative pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary-100/30 to-transparent rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
        </div>

        <motion.div
          className={cn(
            "relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8",
            align === "center" && "text-center",
          )}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {subtitle && (
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {subtitle}
              </span>
            </motion.div>
          )}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div variants={fadeInUp} className="mt-6">
              {children}
            </motion.div>
          )}
        </motion.div>
      </section>
    );
  }

  // Gradient variant - for special pages
  return (
    <section
      className={cn(
        "relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white overflow-hidden",
        sizeClasses[size],
        className,
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/30 -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      <motion.div
        className={cn(
          "relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8",
          align === "center" && "text-center",
        )}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {subtitle && (
          <motion.p
            variants={fadeInUp}
            className="text-sm font-semibold uppercase tracking-wider text-primary-100 mb-3"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div variants={fadeInUp} className="mt-6">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
