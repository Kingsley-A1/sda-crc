/**
 * Public Layout
 * =============
 * Layout for all public-facing pages (Sanctuary).
 * Includes Navbar, Footer, and Mobile PWA enhancements.
 *
 * "How lovely is your dwelling place, Lord Almighty!" — Psalm 84:1
 */

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// ============================================================================
// Public Layout Component
// ============================================================================

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
