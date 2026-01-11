/**
 * Tabs Component
 * ==============
 * Accessible tab navigation with animations.
 *
 * "There is a time for every purpose under heaven." — Ecclesiastes 3:1
 */

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// Context
// ============================================================================

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: "horizontal" | "vertical";
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

// ============================================================================
// Tabs Root
// ============================================================================

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  className?: string;
}

function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  children,
  className,
}: TabsProps) {
  const [activeTab, setActiveTabState] = React.useState(defaultValue || "");

  const setActiveTab = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setActiveTabState(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  const currentValue = value !== undefined ? value : activeTab;

  return (
    <TabsContext.Provider
      value={{ activeTab: currentValue, setActiveTab, orientation }}
    >
      <div
        className={cn(orientation === "vertical" && "flex gap-6", className)}
        data-orientation={orientation}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ============================================================================
// Tab List
// ============================================================================

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

function TabList({ children, className }: TabListProps) {
  const { orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "relative",
        orientation === "horizontal" &&
          "flex items-center gap-1 border-b border-[var(--border)] p-1",
        orientation === "vertical" &&
          "flex flex-col gap-1 border-r border-[var(--border)] p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// Tab Trigger
// ============================================================================

interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

function TabTrigger({
  value,
  children,
  disabled = false,
  className,
}: TabTriggerProps) {
  const { activeTab, setActiveTab, orientation } = useTabsContext();
  const isActive = activeTab === value;
  const id = React.useId();

  return (
    <button
      id={`tab-${id}`}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative px-4 py-2.5 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        orientation === "horizontal" && "rounded-lg",
        orientation === "vertical" && "w-full text-left rounded-lg",
        isActive
          ? "text-[var(--primary)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-alt)]",
        className
      )}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className={cn(
            "absolute bg-[var(--primary)]",
            orientation === "horizontal" &&
              "bottom-0 left-0 right-0 h-0.5 -mb-1 rounded-full",
            orientation === "vertical" &&
              "left-0 top-0 bottom-0 w-0.5 -ml-1 rounded-full"
          )}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

// ============================================================================
// Tab Content
// ============================================================================

interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  forceMount?: boolean;
}

function TabContent({
  value,
  children,
  className,
  forceMount = false,
}: TabContentProps) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;
  const id = React.useId();

  if (!forceMount && !isActive) return null;

  return (
    <motion.div
      id={`tabpanel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      hidden={!isActive}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "focus-visible:outline-none",
        !isActive && "hidden",
        className
      )}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Pill Tabs Variant
// ============================================================================

interface PillTabsProps {
  tabs: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function PillTabs({ tabs, value, onChange, className }: PillTabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-[var(--background-alt)] p-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
              isActive
                ? "text-[var(--primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="pill-tab-bg"
                className="absolute inset-0 rounded-lg bg-[var(--surface)] shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { Tabs, TabList, TabTrigger, TabContent, PillTabs };
// Aliases for compatibility
export {
  TabList as TabsList,
  TabTrigger as TabsTrigger,
  TabContent as TabsContent,
};
export type {
  TabsProps,
  TabListProps,
  TabTriggerProps,
  TabContentProps,
  PillTabsProps,
};
