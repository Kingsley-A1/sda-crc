/**
 * Framer Motion Animation Variants
 * =================================
 * Reusable animation presets for the SDA CRC Digital Sanctuary.
 *
 * "For everything there is a season, and a time for every purpose under heaven." — Ecclesiastes 3:1
 */

import { Variants, Transition } from "framer-motion";

// ============================================================================
// DEFAULT TRANSITIONS
// ============================================================================

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // Custom easeOut
};

export const fastTransition: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

export const slowTransition: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: fastTransition,
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
};

export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: fastTransition,
  },
};

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: fastTransition,
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: fastTransition,
  },
};

export const slideInFromRight: Variants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const slideInFromLeft: Variants = {
  initial: {
    x: "-100%",
  },
  animate: {
    x: 0,
    transition: springTransition,
  },
  exit: {
    x: "-100%",
    transition: fastTransition,
  },
};

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

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

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const staggerItemScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const pageSlideUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ============================================================================
// HOVER EFFECTS
// ============================================================================

export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
  },
  hover: {
    y: -8,
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const cardHoverSubtle: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05)",
  },
  hover: {
    y: -4,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const buttonHover: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const iconHover: Variants = {
  rest: {
    rotate: 0,
  },
  hover: {
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
};

// ============================================================================
// HERO SLIDER
// ============================================================================

export const heroSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export const heroSlideContent: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================================================
// MODAL / DIALOG
// ============================================================================

export const modalOverlay: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

export const modalContent: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.15,
    },
  },
};

// ============================================================================
// DRAWER / MOBILE MENU
// ============================================================================

export const drawerOverlay: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      delay: 0.1,
    },
  },
};

export const drawer: Variants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export const drawerItem: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

// ============================================================================
// SPECIAL EFFECTS
// ============================================================================

export const livePulse: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const liveDot: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatingAnimation: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ============================================================================
// ACCORDION / EXPAND
// ============================================================================

export const expandCollapse: Variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.25,
        ease: "easeIn",
      },
      opacity: {
        duration: 0.15,
      },
    },
  },
};

// ============================================================================
// COUNTER ANIMATION (For Stats)
// ============================================================================

export const counterAnimation: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// NAVBAR
// ============================================================================

export const navbarHidden: Variants = {
  visible: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hidden: {
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const navItem: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

// ============================================================================
// TOOLTIP
// ============================================================================

export const tooltip: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: -5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -5,
    transition: {
      duration: 0.1,
    },
  },
};

// ============================================================================
// NOTIFICATION / TOAST
// ============================================================================

export const toast: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// TAB INDICATOR
// ============================================================================

export const tabIndicator: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// PROGRESS BAR
// ============================================================================

export const progressBar: Variants = {
  initial: {
    width: 0,
  },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// ============================================================================
// SKELETON LOADING
// ============================================================================

export const skeletonPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
