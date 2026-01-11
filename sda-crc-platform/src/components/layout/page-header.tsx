/**
 * Page Header Component
 * =====================
 * Hero banner for inner pages with customizable background.
 *
 * "This is the day that the Lord has made." — Psalm 118:24
 */

"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { fadeInUp, staggerContainer } from "@/animations/variants";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  overlay?: "dark" | "light" | "gradient" | "primary";
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  breadcrumbs?: BreadcrumbItem[];
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

function PageHeader({
  title,
  subtitle,
  description,
  backgroundImage,
  overlay = "dark",
  align = "center",
  size = "md",
  breadcrumbs,
  badge,
  actions,
  className,
}: PageHeaderProps) {
  const overlayClasses = {
    dark: "bg-black/60",
    light: "bg-white/30",
    gradient:
      "bg-gradient-to-r from-[var(--primary)]/90 to-[var(--primary-dark)]/80",
    primary: "bg-[var(--primary)]/85",
  };

  const sizeClasses = {
    sm: "py-12 lg:py-16",
    md: "py-16 lg:py-24",
    lg: "py-24 lg:py-32",
  };

  return (
    <header
      className={cn("relative overflow-hidden bg-[var(--primary)]", className)}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className={cn("absolute inset-0", overlayClasses[overlay])} />
        </div>
      )}

      {/* Content */}
      <Container className={cn("relative z-10", sizeClasses[size])}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center",
            align === "left" && "text-left"
          )}
        >
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              variants={fadeInUp}
              aria-label="Breadcrumb"
              className="mb-4"
            >
              <ol className="flex items-center justify-center gap-2 text-sm text-white/70">
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={item.label}>
                    {index > 0 && <span>/</span>}
                    <li>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="hover:text-white transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-white">{item.label}</span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </motion.nav>
          )}

          {/* Badge */}
          {badge && (
            <motion.div variants={fadeInUp} className="mb-4">
              {badge}
            </motion.div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--secondary)]"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg text-white/80 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          {/* Actions */}
          {actions && (
            <motion.div
              variants={fadeInUp}
              className={cn(
                "mt-8 flex flex-wrap gap-4",
                align === "center" && "justify-center"
              )}
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 0 480 0 720 15C960 30 1200 60 1440 60V60H0Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </header>
  );
}

export { PageHeader };
export type { PageHeaderProps, BreadcrumbItem };
