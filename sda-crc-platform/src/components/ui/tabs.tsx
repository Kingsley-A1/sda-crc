"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs?: { label: string; value: string }[];
  activeTab?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  children?: React.ReactNode;
}

function Tabs({
  tabs,
  activeTab,
  onChange,
  defaultValue,
  className,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = activeTab ?? internalValue;
  const handleChange = onChange ?? setInternalValue;

  // Children-based API (for admin)
  if (children) {
    return (
      <TabsContext.Provider
        value={{ activeTab: currentValue, onChange: handleChange }}
      >
        <div className={className}>{children}</div>
      </TabsContext.Provider>
    );
  }

  // Simple API (for public)
  if (!tabs) return null;

  return (
    <div
      className={cn("flex gap-1 rounded-xl bg-gray-100 p-1", className)}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={currentValue === tab.value}
          onClick={() => handleChange(tab.value)}
          className={cn(
            "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
            currentValue === tab.value
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Context for children-based tabs
const TabsContext = React.createContext<{
  activeTab: string;
  onChange: (value: string) => void;
}>({ activeTab: "", onChange: () => {} });

function useTabsContext() {
  return React.useContext(TabsContext);
}

function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex gap-1 rounded-xl bg-gray-100 p-1 mb-4", className)}
      role="tablist"
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab, onChange } = useTabsContext();
  return (
    <button
      role="tab"
      aria-selected={activeTab === value}
      onClick={() => onChange(value)}
      className={cn(
        "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
        activeTab === value
          ? "bg-white text-primary shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
