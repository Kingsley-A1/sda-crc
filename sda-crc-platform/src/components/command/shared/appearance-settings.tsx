/**
 * Appearance Settings Component
 * =============================
 * Theme and visual settings.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Theme = "light" | "dark" | "system";

export function AppearanceSettings() {
  const [theme, setTheme] = useState<Theme>("system");
  const [primaryColor, setPrimaryColor] = useState("#1e40af");
  const [loading, setLoading] = useState(false);

  const themeOptions: { value: Theme; label: string; description: string }[] = [
    {
      value: "light",
      label: "Light",
      description: "Always use light mode",
    },
    {
      value: "dark",
      label: "Dark",
      description: "Always use dark mode",
    },
    {
      value: "system",
      label: "System",
      description: "Follow system preference",
    },
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch("/api/settings/appearance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme,
          primaryColor,
        }),
      });
    } catch (error) {
      console.error("Failed to save appearance settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-6">Appearance Settings</h3>

      {/* Theme Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Theme</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                theme === option.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
              }`}
            >
              <p className="font-medium">{option.label}</p>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color */}
      <div className="mb-6 max-w-xs">
        <label className="block text-sm font-medium mb-2">Primary Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="h-10 w-10 rounded-md border border-gray-300 cursor-pointer"
          />
          <span className="text-sm font-mono">{primaryColor}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Used for buttons, links, and accent colors.
        </p>
      </div>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </Card>
  );
}
