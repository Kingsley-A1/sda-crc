"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { HeroSlide, type HeroSlideData } from "./hero-slide";

export interface HeroSliderProps {
  slides: HeroSlideData[];
  autoAdvanceMs?: number;
  className?: string;
}

export function HeroSlider({
  slides,
  autoAdvanceMs = 6000,
  className,
}: HeroSliderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const slideCount = slides.length;
  const activeSlide = slides[index];

  const goTo = React.useCallback(
    (nextIndex: number) => {
      if (slideCount === 0) return;
      const safe = ((nextIndex % slideCount) + slideCount) % slideCount;
      setIndex(safe);
    },
    [slideCount]
  );

  const next = React.useCallback(() => {
    setDirection(1);
    goTo(index + 1);
  }, [goTo, index]);

  const prev = React.useCallback(() => {
    setDirection(-1);
    goTo(index - 1);
  }, [goTo, index]);

  React.useEffect(() => {
    if (slideCount <= 1) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, autoAdvanceMs);
    return () => window.clearInterval(id);
  }, [autoAdvanceMs, slideCount]);

  const variants = {
    enter: (dir: 1 | -1) => ({
      x: shouldReduceMotion ? 0 : dir === 1 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: (dir: 1 | -1) => ({
      x: shouldReduceMotion ? 0 : dir === 1 ? -30 : 30,
      opacity: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.25, ease: "easeOut" as const },
    }),
  };

  if (slideCount === 0) {
    return (
      <section className={cn("w-full", className)}>
        <div className="h-[62vh] max-h-[720px] min-h-[460px] rounded-2xl bg-[var(--background-alt)]" />
      </section>
    );
  }

  return (
    <section className={cn("w-full", className)} aria-roledescription="carousel">
      <div className="relative">
        <div className="h-[62vh] max-h-[720px] min-h-[460px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full"
            >
              <HeroSlide slide={activeSlide} priority />
            </motion.div>
          </AnimatePresence>
        </div>

        {slideCount > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/35 p-3 text-white backdrop-blur transition-colors hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous slide"
            >
              <CaretLeft className="h-5 w-5" weight="bold" />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/35 p-3 text-white backdrop-blur transition-colors hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next slide"
            >
              <CaretRight className="h-5 w-5" weight="bold" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    goTo(i);
                  }}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all",
                    i === index ? "bg-white w-7" : "bg-white/50 hover:bg-white/80"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
