import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapping our CSS Variables to Tailwind Classes
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
        accent: {
          green: "var(--accent-green)",
          red: "var(--accent-red)",
        },
        midnight: {
          bg: "var(--admin-bg)",
          panel: "var(--admin-panel)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slow-pulse": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      // Mobile-First Breakpoints
      screens: {
        xs: "375px",    // Small phones
        sm: "640px",    // Large phones/tablets
        md: "768px",    // Tablets
        lg: "1024px",   // Laptops
        xl: "1280px",   // Desktops
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;