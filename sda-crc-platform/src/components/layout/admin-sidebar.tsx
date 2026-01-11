/**
 * Admin Sidebar Component
 * =======================
 * Navigation sidebar for the Command Center (admin area).
 *
 * "Be strong and courageous, for the Lord is with you." — Joshua 1:9
 */

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  VideoCamera,
  CalendarDots,
  Users,
  UsersThree,
  HandHeart,
  Gear,
  SignOut,
  CaretLeft,
  CaretRight,
  ChartLine,
  Medal,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

const sidebarLinks: SidebarLink[] = [
  { href: "/command", label: "Dashboard", icon: <House weight="fill" /> },
  {
    href: "/command/sermons",
    label: "Sermons",
    icon: <VideoCamera weight="fill" />,
  },
  {
    href: "/command/events",
    label: "Events",
    icon: <CalendarDots weight="fill" />,
  },
  { href: "/command/members", label: "Members", icon: <Users weight="fill" /> },
  { href: "/command/workers", label: "Workers", icon: <Medal weight="fill" /> },
  {
    href: "/command/small-groups",
    label: "Small Groups",
    icon: <UsersThree weight="fill" />,
  },
  {
    href: "/command/evangelism",
    label: "Evangelism",
    icon: <HandHeart weight="fill" />,
  },
  {
    href: "/command/analytics",
    label: "Analytics",
    icon: <ChartLine weight="fill" />,
  },
];

const bottomLinks: SidebarLink[] = [
  {
    href: "/command/settings",
    label: "Settings",
    icon: <Gear weight="fill" />,
  },
];

interface AdminSidebarProps {
  className?: string;
}

function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/command") return pathname === "/command";
    return pathname.startsWith(href);
  };

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-[var(--admin-bg)] border-r border-[var(--admin-border)] transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          // Mobile: hidden by default, shown when open
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--admin-border)] px-4">
          <Link
            href="/command"
            className={cn(
              "flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg",
              isCollapsed && "justify-center"
            )}
          >
            <div className="relative h-8 w-8">
              <Image
                src="/logo.svg"
                alt="SDA CRC"
                fill
                className="object-contain"
              />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-[var(--admin-text)]">
                Command
              </span>
            )}
          </Link>

          {/* Collapse Toggle (Desktop) */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-[var(--admin-text-muted)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-text)] transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <CaretRight className="h-4 w-4" />
            ) : (
              <CaretLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const active = isActive(link.href);
              const content = (
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                    active
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--admin-text-muted)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-text)]",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <span className="text-lg">{link.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{link.label}</span>
                      {link.badge && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--secondary)] px-1.5 text-xs font-bold text-black">
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );

              return (
                <li key={link.href}>
                  {isCollapsed ? (
                    <Tooltip content={link.label} position="right">
                      {content}
                    </Tooltip>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-[var(--admin-border)] p-3">
          <ul className="space-y-1">
            {bottomLinks.map((link) => {
              const active = isActive(link.href);
              const content = (
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                    active
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--admin-text-muted)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-text)]",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <span className="text-lg">{link.icon}</span>
                  {!isCollapsed && <span>{link.label}</span>}
                </Link>
              );

              return (
                <li key={link.href}>
                  {isCollapsed ? (
                    <Tooltip content={link.label} position="right">
                      {content}
                    </Tooltip>
                  ) : (
                    content
                  )}
                </li>
              );
            })}

            {/* Logout */}
            <li>
              {isCollapsed ? (
                <Tooltip content="Sign Out" position="right">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-[var(--accent-red-light)] transition-colors hover:bg-[var(--admin-surface)]"
                  >
                    <SignOut className="text-lg" />
                  </button>
                </Tooltip>
              ) : (
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--accent-red-light)] transition-colors hover:bg-[var(--admin-surface)]"
                >
                  <SignOut className="text-lg" />
                  <span>Sign Out</span>
                </button>
              )}
            </li>
          </ul>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--admin-bg)] text-white shadow-lg lg:hidden"
        aria-label="Open menu"
      >
        <CaretRight className="h-5 w-5" />
      </button>

      {/* Spacer for main content */}
      <div
        className={cn(
          "hidden lg:block transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      />
    </>
  );
}

export { AdminSidebar };
export type { AdminSidebarProps };
