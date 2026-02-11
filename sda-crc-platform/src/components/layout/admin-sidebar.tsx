"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import {
  House,
  Microphone,
  CalendarBlank,
  Users,
  HandHeart,
  UserCircle,
  Gear,
  List,
  X,
} from "@phosphor-icons/react";

const navItems = [
  { label: "Dashboard", href: "/command", icon: House },
  { label: "Sermons", href: "/command/sermons", icon: Microphone },
  { label: "Events", href: "/command/events", icon: CalendarBlank },
  { label: "Members", href: "/command/members", icon: Users },
  { label: "Workers", href: "/command/workers", icon: UserCircle },
  { label: "Evangelism", href: "/command/evangelism", icon: HandHeart },
  { label: "Settings", href: "/command/settings", icon: Gear },
];

function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/command") return pathname === "/command";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-4">
        <Logo variant="icon" size="sm" />
        <span className="text-sm font-bold text-primary">SDA CRC Admin</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200",
              )}
            >
              <Icon size={20} weight={active ? "fill" : "regular"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to site */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          ← Back to Site
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg md:hidden"
        aria-label="Open sidebar"
      >
        <List size={24} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="flex h-full w-64 flex-col bg-white dark:bg-gray-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1 text-gray-500 hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-gray-200 md:dark:border-gray-700 md:bg-white md:dark:bg-gray-900">
        {sidebarContent}
      </aside>
    </>
  );
}

export { AdminSidebar };
