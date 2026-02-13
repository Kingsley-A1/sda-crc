/**
 * Root Layout — SDA Cross River Conference
 * "Unless the Lord builds the house, the builders labor in vain." — Psalm 127:1
 */
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SDA Cross River Conference",
    template: "%s | SDA CRC",
  },
  description:
    "Seventh-day Adventist Church, Cross River Conference — Integrated for Mission.",
  keywords: ["SDA", "Seventh-day Adventist", "Cross River Conference", "Nigeria", "Church"],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "SDA Cross River Conference",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
