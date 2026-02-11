/**
 * useScrollPosition Hook
 * ======================
 * React hook for tracking scroll position with performance optimization.
 * 
 * "They that wait upon the LORD shall renew their strength." — Isaiah 40:31
 */

"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";

interface ScrollPosition {
  x: number;
  y: number;
  direction: "up" | "down" | null;
  isAtTop: boolean;
  isAtBottom: boolean;
  progress: number; // 0-1 scroll progress
}

interface UseScrollPositionOptions {
  throttleMs?: number;
  element?: HTMLElement | null;
}

/**
 * Hook to track scroll position with direction and progress
 */
export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): ScrollPosition {
  const { throttleMs = 100, element = null } = options;
  
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
    progress: 0,
  });

  const lastYRef = React.useRef(0);

  const handleScroll = useCallback(() => {
    const target = element || document.documentElement;
    const scrollY = element ? element.scrollTop : window.scrollY;
    const scrollX = element ? element.scrollLeft : window.scrollX;
    
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const progress = scrollHeight > 0 ? scrollY / scrollHeight : 0;
    
    const direction = scrollY > lastYRef.current ? "down" : scrollY < lastYRef.current ? "up" : null;
    
    setPosition({
      x: scrollX,
      y: scrollY,
      direction,
      isAtTop: scrollY <= 0,
      isAtBottom: scrollY >= scrollHeight - 1,
      progress: Math.min(1, Math.max(0, progress)),
    });
    
    lastYRef.current = scrollY;
  }, [element]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    let lastCall = 0;

    const throttledHandler = () => {
      const now = Date.now();
      if (now - lastCall >= throttleMs) {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
          lastCall = now;
        }
      }
    };

    const target = element || window;
    target.addEventListener("scroll", throttledHandler, { passive: true });
    
    // Initial call in next tick to avoid setState during render
    requestAnimationFrame(handleScroll);

    return () => {
      target.removeEventListener("scroll", throttledHandler);
    };
  }, [element, throttleMs, handleScroll]);

  return position;
}

/**
 * Hook to detect if scrolled past a threshold
 */
export function useScrolledPast(threshold: number = 100): boolean {
  const { y } = useScrollPosition();
  return y > threshold;
}

/**
 * Hook for scroll-based animations (header hide/show pattern)
 */
export function useScrollDirection(): "up" | "down" | null {
  const { direction } = useScrollPosition({ throttleMs: 50 });
  return direction;
}

/**
 * Hook to get scroll progress (0-1)
 */
export function useScrollProgress(): number {
  const { progress } = useScrollPosition();
  return progress;
}

// Default export
export default useScrollPosition;
