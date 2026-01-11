"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface StatsCounterProps {
  items: StatItem[];
  className?: string;
}

function useCountUp(target: number, durationMs: number) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, target]);

  return value;
}

export function StatsCounter({ items, className }: StatsCounterProps) {
  return (
    <section className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {items.map((item) => (
        <StatCard key={item.label} item={item} />
      ))}
    </section>
  );
}

function StatCard({ item }: { item: StatItem }) {
  const shouldReduceMotion = useReducedMotion();
  const value = shouldReduceMotion ? item.value : useCountUp(item.value, 1200);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-[var(--border-light)] bg-[var(--surface)] p-4"
    >
      <p className="text-2xl font-extrabold text-[var(--text-primary)]">
        {value}
        {item.suffix ?? ""}
      </p>
      <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
        {item.label}
      </p>
    </motion.div>
  );
}
