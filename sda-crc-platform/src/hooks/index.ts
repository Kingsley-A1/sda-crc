/**
 * Hooks Index
 * ===========
 * Central export for all custom React hooks.
 * 
 * "Iron sharpens iron, and one man sharpens another." — Proverbs 27:17
 */

// Media Query Hooks
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsTouchDevice,
  usePrefersReducedMotion,
  usePrefersDarkMode,
} from "./use-media-query";

// Scroll Position Hooks
export {
  useScrollPosition,
  useScrolledPast,
  useScrollDirection,
  useScrollProgress,
} from "./use-scroll-position";

// Storage Hooks
export {
  useLocalStorage,
  useSessionStorage,
} from "./use-local-storage";

// Debounce/Throttle Hooks
export {
  useDebounce,
  useDebouncedCallback,
  useThrottledCallback,
  useDebouncedSearch,
} from "./use-debounce";
