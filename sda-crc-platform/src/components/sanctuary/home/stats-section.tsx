"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, Cross, CalendarCheck, HandHeart } from "@phosphor-icons/react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
}

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  cross: Cross,
  calendar: CalendarCheck,
  heart: HandHeart,
};

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection({ items }: { items: StatItem[] }) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
              Our Impact
            </span>
            <span className="h-px w-8 bg-white/40" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            God at Work Through Our Community
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Numbers that reflect lives transformed and a growing family of faith
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {items.map((item, index) => {
            const IconComponent = item.icon
              ? iconMap[item.icon] || Users
              : [Users, Cross, CalendarCheck, HandHeart][index % 4];

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 text-center p-6 lg:p-8">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-white/10 mb-4">
                    <IconComponent
                      size={28}
                      weight="duotone"
                      className="text-white"
                    />
                  </div>

                  {/* Value */}
                  <p className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </p>

                  {/* Label */}
                  <p className="text-sm font-medium text-white/70">
                    {item.label}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
