/**
 * Theme Provider
 * ==============
 * Dark/Light mode provider with system preference detection.
 * 
 * "Let your light shine before others." — Matthew 5:16
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

// ============================================================================
// Theme Provider Component
// ============================================================================

/**
 * Theme provider wrapper for the application.
 * Uses next-themes under the hood for seamless SSR support.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// ============================================================================
// Theme Context Types
// ============================================================================

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark" | undefined;
  systemTheme: "light" | "dark" | undefined;
}

// ============================================================================
// Custom Theme Hook
// ============================================================================

import { useTheme as useNextTheme } from "next-themes";

/**
 * Custom hook for accessing theme with type safety.
 */
export function useTheme(): ThemeContextType {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  return {
    theme: (theme as Theme) || "system",
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    resolvedTheme: resolvedTheme as "light" | "dark" | undefined,
    systemTheme: systemTheme as "light" | "dark" | undefined,
  };
}

// ============================================================================
// Theme Toggle Component
// ============================================================================

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Simple theme toggle button.
 * Use this with your UI library's button component.
 */
export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const isDark = resolvedTheme === "dark";

  return {
    mounted,
    isDark,
    toggleTheme,
    currentTheme: resolvedTheme,
  };
}

// ============================================================================
// Theme Colors
// ============================================================================

/**
 * SDA brand colors for theming.
 * These match the Tailwind CSS configuration.
 */
export const themeColors = {
  light: {
    primary: "#1a365d", // SDA Blue
    secondary: "#065f46", // Emerald/Green
    accent: "#d4af37", // Gold
    background: "#ffffff",
    foreground: "#1a1a1a",
    muted: "#f4f4f5",
    border: "#e4e4e7",
  },
  dark: {
    primary: "#3b82f6", // Lighter blue for dark mode
    secondary: "#10b981", // Emerald for dark mode
    accent: "#fbbf24", // Brighter gold
    background: "#0a0a0a",
    foreground: "#fafafa",
    muted: "#27272a",
    border: "#3f3f46",
  },
} as const;

// ============================================================================
// Export
// ============================================================================

export { useNextTheme };
