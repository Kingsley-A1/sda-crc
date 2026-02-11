"use client";

import * as React from "react";

interface SermonPlayerProps {
  videoUrl: string | null;
  audioUrl: string | null;
  title: string;
}

export function SermonPlayer({ videoUrl, audioUrl, title }: SermonPlayerProps) {
  const [activeTab, setActiveTab] = React.useState<"video" | "audio">(
    videoUrl ? "video" : "audio",
  );

  if (!videoUrl && !audioUrl) {
    return (
      <div className="aspect-video rounded-2xl bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">
          No media available for this sermon.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Tab Toggle */}
      {videoUrl && audioUrl && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("video")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "video"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Video
          </button>
          <button
            onClick={() => setActiveTab("audio")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "audio"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Audio
          </button>
        </div>
      )}

      {/* Video Player */}
      {activeTab === "video" && videoUrl && (
        <div className="aspect-video rounded-2xl overflow-hidden bg-black">
          {videoUrl.includes("youtube") || videoUrl.includes("youtu.be") ? (
            <iframe
              src={videoUrl.replace("watch?v=", "embed/")}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : (
            <video
              src={videoUrl}
              controls
              className="w-full h-full"
              preload="metadata"
            >
              Your browser does not support video playback.
            </video>
          )}
        </div>
      )}

      {/* Audio Player */}
      {activeTab === "audio" && audioUrl && (
        <div className="rounded-2xl bg-muted p-6">
          <p className="text-sm font-medium text-foreground mb-3">{title}</p>
          <audio src={audioUrl} controls className="w-full">
            Your browser does not support audio playback.
          </audio>
        </div>
      )}
    </div>
  );
}
