"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Church, Heart } from "@phosphor-icons/react";

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900" />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-8">
            <Church size={32} weight="duotone" className="text-white" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance leading-tight">
            Step Into a Community Built for{" "}
            <span className="text-primary-200">Worship</span>,{" "}
            <span className="text-primary-200">Growth</span>, and{" "}
            <span className="text-primary-200">Service</span>
          </h2>

          {/* Description */}
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you want to serve, worship in person, or stream from
            anywhere, we have a place for you. Let&apos;s build faith and impact
            together.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/join">
              <Button
                size="lg"
                variant="white"
                rightIcon={<Heart size={18} weight="fill" />}
                className="text-primary-700 hover:text-primary-800"
              >
                Join Our Family
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline-white"
                rightIcon={<ArrowRight size={18} />}
              >
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className="text-white/50 text-sm">
              Seventh-day Adventist Church — Cross River Conference, Nigeria
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
