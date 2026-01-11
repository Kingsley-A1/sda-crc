/**
 * Live Indicator Component
 * ========================
 * Shows live status badge.
 */

"use client";

import { useState, useEffect } from "react";

export function LiveIndicator() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Would check actual live status from API
    // For now, we'll simulate checking
    const checkLiveStatus = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setIsLive(data.isLive || false);
      } catch {
        setIsLive(false);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLive) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white text-sm font-medium">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        LIVE NOW
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-600 text-white text-sm font-medium">
      <span className="w-2 h-2 rounded-full bg-gray-400" />
      OFFLINE
    </div>
  );
}
