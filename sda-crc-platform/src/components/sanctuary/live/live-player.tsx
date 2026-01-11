/**
 * Live Player Component
 * =====================
 * Video player for live streams.
 */

"use client";

import { useState } from "react";

export function LivePlayer() {
  const [isLive] = useState(false); // Would check actual live status

  if (!isLive) {
    return (
      <div className="aspect-video rounded-2xl bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold mb-2">No Live Stream</h3>
        <p className="text-gray-400 text-center max-w-md">
          We&apos;re not currently streaming. Check back during service times 
          or browse our sermon archive.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-2xl overflow-hidden bg-black">
      {/* In production, this would be a proper video player */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID"
        title="Live Stream"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
