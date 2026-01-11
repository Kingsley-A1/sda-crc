/**
 * Root Layout
 * ===========
 * The root layout for the entire SDA CRC Digital Sanctuary Platform.
 * Provides theme support, fonts, and core metadata.
 * 
 * "Unless the Lord builds the house, the builders labor in vain." — Psalm 127:1
 */

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/context/theme-provider";
import "./globals.css";

// ============================================================================
// Font Configuration
// ============================================================================

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

// ============================================================================
// Metadata Configuration
// ============================================================================

export const metadata: Metadata = {
  title: {
    default: "SDA Cross River Conference | Digital Sanctuary",
    template: "%s | SDA CRC",
  },
  description:
    "Welcome to the Seventh-day Adventist Cross River Conference Digital Sanctuary. Experience worship, community, and spiritual growth in Nigeria's leading Adventist conference.",
  keywords: [
    "SDA",
    "Seventh-day Adventist",
    "Cross River Conference",
    "Nigeria",
    "Church",
    "Worship",
    "Sermons",
    "Sabbath",
    "Adventist",
  ],
  authors: [{ name: "SDA Cross River Conference" }],
  creator: "SDA Cross River Conference",
  publisher: "SDA Cross River Conference",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://sdacrc.org",
    siteName: "SDA Cross River Conference",
    title: "SDA Cross River Conference | Digital Sanctuary",
    description:
      "Experience worship, community, and spiritual growth with the Seventh-day Adventist Cross River Conference.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SDA Cross River Conference",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SDA Cross River Conference | Digital Sanctuary",
    description:
      "Experience worship, community, and spiritual growth with the Seventh-day Adventist Cross River Conference.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a365d" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ============================================================================
// Root Layout Component
// ============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
