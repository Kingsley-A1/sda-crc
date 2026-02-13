"use client";

/**
 * Navbar — Responsive mobile-first navigation with green gradient
 */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/departments", label: "Departments" },
  { href: "/workers", label: "Workers" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-green-100">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SDA</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-heading font-bold text-green-800 text-sm leading-tight">
              Cross River Conference
            </p>
            <p className="text-[10px] text-gray-500">Integrated for Mission</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="hidden sm:inline-flex bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-600 transition-all"
          >
            Join Us
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-green-100 bg-white"
          >
            <ul className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-green-100 text-green-800"
                        : "text-gray-600 hover:bg-green-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/join"
                  onClick={() => setIsOpen(false)}
                  className="block mt-2 text-center bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 rounded-lg font-semibold"
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
