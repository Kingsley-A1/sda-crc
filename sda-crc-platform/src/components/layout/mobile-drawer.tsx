/**
 * Mobile Drawer Component
 * =======================
 * Slide-out drawer for mobile navigation.
 *
 * "Open my eyes that I may see wonderful things." — Psalm 119:18
 */

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { drawer, drawerOverlay } from "@/animations/variants";

type DrawerPosition = "left" | "right" | "top" | "bottom";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: DrawerPosition;
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

function MobileDrawer({
  isOpen,
  onClose,
  children,
  position = "right",
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
}: MobileDrawerProps) {
  const drawerRef = React.useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
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

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Position-specific classes and animations
  const positionConfig: Record<
    DrawerPosition,
    {
      container: string;
      panel: string;
      initial: { x?: string; y?: string };
      animate: { x?: number; y?: number };
      exit: { x?: string; y?: string };
    }
  > = {
    left: {
      container: "justify-start",
      panel: "left-0 top-0 bottom-0 w-full max-w-xs",
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    right: {
      container: "justify-end",
      panel: "right-0 top-0 bottom-0 w-full max-w-xs",
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
    top: {
      container: "items-start",
      panel: "top-0 left-0 right-0 max-h-[80vh]",
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
    },
    bottom: {
      container: "items-end",
      panel: "bottom-0 left-0 right-0 max-h-[80vh] rounded-t-2xl",
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    },
  };

  const config = positionConfig[position];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)]">
          {/* Overlay */}
          <motion.div
            variants={drawerOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Drawer"}
            initial={config.initial}
            animate={config.animate}
            exit={config.exit}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className={cn(
              "fixed bg-white shadow-2xl overflow-hidden flex flex-col",
              config.panel,
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between border-b border-[var(--border-light)] px-4 py-4">
                {title && (
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-alt)] hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    aria-label="Close drawer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { MobileDrawer };
export type { MobileDrawerProps, DrawerPosition };
