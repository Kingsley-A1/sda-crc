"use client";

import * as React from "react";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface ActionMenuItem {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  className?: string;
}

export function ActionMenu({ items, className }: ActionMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="min-h-11"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        leftIcon={<DotsThreeVertical className="h-4 w-4" weight="bold" />}
      >
        Actions
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={cn(
                  "w-full px-4 py-3 text-left text-sm transition-colors",
                  item.destructive
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-muted",
                )}
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
