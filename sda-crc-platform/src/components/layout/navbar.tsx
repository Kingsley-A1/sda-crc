/**
 * Navbar Component
 * ================
 * Main navigation bar with mobile responsiveness.
 *
 * "The Lord will guide you always." — Isaiah 58:11
 */

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  List,
  X,
  House,
  Church,
  VideoCamera,
  CalendarDots,
  Users,
  UsersThree,
  HandHeart,
  Broadcast,
  Phone,
  UserPlus,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: <House weight="fill" /> },
  { href: "/about", label: "About", icon: <Church weight="fill" /> },
  { href: "/sermons", label: "Sermons", icon: <VideoCamera weight="fill" /> },
  { href: "/events", label: "Events", icon: <CalendarDots weight="fill" /> },
  { href: "/departments", label: "Departments", icon: <Users weight="fill" /> },
  {
    href: "/small-groups",
    label: "Small Groups",
    icon: <UsersThree weight="fill" />,
  },
  {
    href: "/evangelism",
    label: "Vision 2026(Evangelism)",
    icon: <HandHeart weight="fill" />,
  },
  { href: "/workers", label: "Workers", icon: <Users weight="fill" /> },
  {
    href: "/live",
    label: "Live",
    icon: <Broadcast weight="fill" />,
    badge: "LIVE",
  },
  { href: "/contact", label: "Contact", icon: <Phone weight="fill" /> },
];

interface NavbarProps {
  isLive?: boolean;
}

function Navbar({ isLive = false }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--border-light)]"
            : "bg-white"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg"
            >
              <div className="relative h-10 w-10 lg:h-12 lg:w-12">
                <Image
                  src="/logo.svg"
                  alt="SDA CRC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-[var(--primary)] leading-tight">
                  SDA Cross River
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Conference
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navLinks.slice(0, 7).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                    "hover:bg-[var(--background-alt)]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                    isActive(link.href)
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--primary)] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Live Badge */}
              {isLive && (
                <Link href="/live" className="hidden sm:block">
                  <Badge variant="live" dot pulse className="cursor-pointer">
                    LIVE NOW
                  </Badge>
                </Link>
              )}

              {/* Join Button */}
              <Button
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
                leftIcon={<UserPlus className="h-4 w-4" />}
                asChild
              >
                <Link href="/join">Join Us</Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "lg:hidden rounded-lg p-2 transition-colors",
                  "hover:bg-[var(--background-alt)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                )}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-[var(--text-primary)]" />
                ) : (
                  <List className="h-6 w-6 text-[var(--text-primary)]" />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed right-0 top-0 bottom-0 z-[var(--z-modal)] w-full max-w-xs bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border-light)] p-4">
                  <span className="text-lg font-bold text-[var(--primary)]">
                    Menu
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 hover:bg-[var(--background-alt)]"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            isActive(link.href)
                              ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--background-alt)] hover:text-[var(--text-primary)]"
                          )}
                        >
                          <span
                            className={cn(
                              "text-xl",
                              isActive(link.href)
                                ? "text-[var(--primary)]"
                                : "text-[var(--text-muted)]"
                            )}
                          >
                            {link.icon}
                          </span>
                          <span className="flex-1">{link.label}</span>
                          {link.badge && isLive && (
                            <Badge variant="live" size="sm" dot pulse>
                              {link.badge}
                            </Badge>
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="border-t border-[var(--border-light)] p-4">
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<UserPlus className="h-5 w-5" />}
                    asChild
                  >
                    <Link href="/join">Join Our Church Family</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}

export { Navbar };
export type { NavbarProps };
