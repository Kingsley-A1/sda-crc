/**
 * useDebounce Hook
 * ================
 * React hook for debouncing values and callbacks.
 * 
 * "Be still, and know that I am God." — Psalm 46:10
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook to debounce a value
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook to debounce a callback function
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}

/**
 * Hook to throttle a callback function
 * @param callback - The function to throttle
 * @param limit - Minimum time between calls in milliseconds
 * @returns The throttled function
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  limit: number = 500
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const inThrottleRef = useRef(false);

  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottleRef.current) {
        callbackRef.current(...args);
        inThrottleRef.current = true;
        setTimeout(() => {
          inThrottleRef.current = false;
        }, limit);
      }
    },
    [limit]
  );
}

/**
 * Hook for debounced search input
 * Returns both instant value (for input) and debounced value (for API calls)
 */
export function useDebouncedSearch(
  initialValue: string = "",
  delay: number = 300
): {
  value: string;
  debouncedValue: string;
  setValue: (value: string) => void;
  clear: () => void;
} {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, delay);

  const clear = useCallback(() => {
    setValue("");
  }, []);

  return {
    value,
    debouncedValue,
    setValue,
    clear,
  };
}

// Default export
export default useDebounce;
