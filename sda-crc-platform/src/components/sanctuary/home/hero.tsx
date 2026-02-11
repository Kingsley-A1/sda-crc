"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/50 pt-28 pb-16 md:pt-36 md:pb-28">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary.100/30)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.100/30)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-gradient-to-br from-primary-200/40 to-primary-100/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-gradient-to-br from-primary-100/40 to-transparent blur-3xl" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 shadow-sm mb-8">
              <Sparkle size={14} weight="fill" className="text-primary-500" />
              <span className="text-xs font-semibold text-primary-700 tracking-wide">
                Seventh-day Adventist Church
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6">
              Integrated for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500">
                  Mission
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary-200/50 -z-0 rounded" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Experience transformative worship, genuine community, and
              spiritual growth. Join a movement dedicated to spreading hope
              across Cross River State.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/join">
                <Button
                  size="lg"
                  variant="gradient-primary"
                  className="w-full sm:w-auto text-base font-semibold"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Join Our Community
                </Button>
              </Link>
              <Link href="/sermons">
                <Button
                  variant="outline-muted"
                  size="lg"
                  className="w-full sm:w-auto text-base"
                  leftIcon={
                    <PlayCircle
                      size={20}
                      weight="fill"
                      className="text-primary"
                    />
                  }
                >
                  Watch Sermons
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-11 w-11 rounded-full border-[3px] border-white bg-primary-100 overflow-hidden relative shadow-sm"
                  >
                    <Image
                      src={`/hero/avatar-${i}.jpg`}
                      alt="Member"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="h-11 w-11 rounded-full border-[3px] border-white bg-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  +99
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">2,500+</span>{" "}
                members
                <br />
                <span className="text-xs">worshiping together</span>
              </p>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10 border-4 border-white aspect-[4/3]">
              <Image
                src="/hero/divine service 2.jpg"
                alt="Worship Service"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                    Every Sabbath
                  </span>
                </div>
                <p className="font-heading text-xl md:text-2xl font-bold text-white">
                  Divine Worship Service
                </p>
                <p className="text-sm text-white/80 mt-1">
                  Saturdays • 9:00 AM - 12:30 PM
                </p>
              </div>
            </div>

            {/* Floating info card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-10 bg-white p-4 rounded-2xl shadow-xl border border-primary-100"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                  <PlayCircle size={24} weight="fill" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Watch Live</p>
                  <p className="text-xs text-muted-foreground">
                    Stream services online
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 right-12 w-12 h-12 bg-primary-200/50 rounded-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
