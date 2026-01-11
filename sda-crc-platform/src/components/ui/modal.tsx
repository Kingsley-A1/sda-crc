/**
 * Modal Component
 * ===============
 * Accessible dialog/modal with animations and customization.
 *
 * "Behold, I stand at the door and knock." — Revelation 3:20
 */

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { modalOverlay, modalContent } from "@/animations/variants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  // Size classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[90vw] max-h-[90vh]",
  };

  // Close on Escape key
  React.useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Lock body scroll when modal is open
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

  // Focus trap
  React.useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
      return;
    }

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)]">
          {/* Overlay */}
          <motion.div
            variants={modalOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
          >
            {/* Modal */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              aria-describedby={description ? descriptionId : undefined}
              variants={modalContent}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                "relative w-full overflow-hidden rounded-2xl bg-[var(--surface)] shadow-2xl",
                sizeClasses[size],
                className
              )}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between border-b border-[var(--border-light)] p-6">
                  <div className="flex-1 pr-8">
                    {title && (
                      <h2
                        id={titleId}
                        className="text-xl font-bold text-[var(--text-primary)]"
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p
                        id={descriptionId}
                        className="mt-1 text-sm text-[var(--text-secondary)]"
                      >
                        {description}
                      </p>
                    )}
                  </div>

                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="absolute right-4 top-4 rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-alt)] hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// Modal Sub-components
// ============================================================================

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function ModalHeader({ children, className }: ModalHeaderProps) {
  return <div className={cn("mb-6", className)}>{children}</div>;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={cn("", className)}>{children}</div>;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center justify-end gap-3 border-t border-[var(--border-light)] pt-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Modal, ModalHeader, ModalBody, ModalFooter };
export type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps };
