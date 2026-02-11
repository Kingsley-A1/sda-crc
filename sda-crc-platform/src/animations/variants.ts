/**
 * Animation Variants — Framer Motion
 * ====================================
 * Purposeful, performant animations for the Digital Sanctuary.
 */

import type { Variants, Transition } from "framer-motion";

/* === TRANSITIONS === */

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

export const fastTransition: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

/* === FADE === */

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: defaultTransition },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: defaultTransition },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: defaultTransition },
};

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: defaultTransition },
};

/* === SLIDE === */

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: defaultTransition },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: defaultTransition },
};

/* === STAGGER CONTAINERS === */

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: defaultTransition },
};

/* === HOVER EFFECTS === */

export const cardHover = {
  whileHover: { y: -6, transition: { duration: 0.3 } },
};

export const buttonHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

/* === HERO SLIDER === */

export const heroSlide: Variants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.5 } },
};

export const heroContent: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/* === MODAL === */

export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: fastTransition },
  exit: { opacity: 0, transition: fastTransition },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: springTransition },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: fastTransition },
};

/* === DRAWER (Mobile Nav) === */

export const drawerOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const drawer: Variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { x: "100%", transition: { duration: 0.25 } },
};

export const drawerItem: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
};

/* === LIVE PULSE === */

export const livePulse: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: { duration: 2, repeat: Infinity },
  },
};

/* === NAVBAR === */

export const navbarHidden: Variants = {
  visible: { y: 0 },
  hidden: { y: "-100%" },
};

/* === COUNTER === */

export const counterAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* === PAGE TRANSITION === */

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
