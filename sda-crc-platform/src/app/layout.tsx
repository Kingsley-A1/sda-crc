/**
 * Root Layout
 * ===========
 * "Unless the Lord builds the house, the builders labor in vain." — Psalm 127:1
 */

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/context/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SDA Cross River Conference",
    template: "%s | SDA CRC",
  },
  description:
    "Seventh-day Adventist Church, Cross River Conference — Integrated for Mission. Experience worship, community, and spiritual growth.",
  keywords: [
    "SDA",
    "Seventh-day Adventist",
    "Cross River Conference",
    "Nigeria",
    "Church",
    "Worship",
    "Sermons",
    "Adventist",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "SDA Cross River Conference",
    title: "SDA Cross River Conference",
    description: "Integrated for Mission — Worship, Community, Spiritual Growth",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#15803d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
