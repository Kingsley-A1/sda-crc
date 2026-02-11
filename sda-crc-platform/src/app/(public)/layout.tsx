/**
 * Public Layout
 * =============
 * Layout for all public-facing pages (Sanctuary).
 * "How lovely is your dwelling place, Lord Almighty!" — Psalm 84:1
 */

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
