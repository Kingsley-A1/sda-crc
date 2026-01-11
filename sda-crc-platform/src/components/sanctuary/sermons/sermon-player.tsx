"use client";

import * as React from "react";
import { FilmSlate, Headphones } from "@phosphor-icons/react";

import { Button, Card } from "@/components/ui";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";

type PlayerMode = "video" | "audio";

export interface SermonPlayerProps {
  title: string;
  videoUrl?: string | null;
  audioUrl?: string | null;
  className?: string;
  storageKey?: string;
}

export function SermonPlayer({
  title,
  videoUrl,
  audioUrl,
  className,
  storageKey = "sermon-player",
}: SermonPlayerProps) {
  const hasVideo = !!videoUrl;
  const hasAudio = !!audioUrl;

  const defaultMode: PlayerMode = hasVideo ? "video" : "audio";
  const [mode, setMode] = useLocalStorage<PlayerMode>(`${storageKey}:mode`, defaultMode);

  const mediaRef = React.useRef<HTMLMediaElement | null>(null);
  const [resumeSeconds, setResumeSeconds] = useLocalStorage<number>(`${storageKey}:t`, 0);

  React.useEffect(() => {
    // If mode becomes invalid (e.g. no video), fall back.
    if (mode === "video" && !hasVideo && hasAudio) setMode("audio");
    if (mode === "audio" && !hasAudio && hasVideo) setMode("video");
  }, [mode, hasVideo, hasAudio, setMode]);

  const activeSrc = mode === "video" ? videoUrl : audioUrl;

  React.useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;

    const handleTimeUpdate = () => {
      // Update occasionally; localStorage hook already debounces via React state batching.
      setResumeSeconds(el.currentTime || 0);
    };

    const handleLoaded = () => {
      if (resumeSeconds > 2 && el.duration && resumeSeconds < el.duration) {
        try {
          el.currentTime = resumeSeconds;
        } catch {
          // ignore
        }
      }
    };

    el.addEventListener("timeupdate", handleTimeUpdate);
    el.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      el.removeEventListener("timeupdate", handleTimeUpdate);
      el.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [resumeSeconds, setResumeSeconds, activeSrc]);

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-[var(--text-primary)]">Listen / Watch</p>

        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={mode === "video" ? "primary" : "outline"}
            className="min-h-11"
            disabled={!hasVideo}
            onClick={() => setMode("video")}
            leftIcon={<FilmSlate className="h-4 w-4" weight="bold" />}
          >
            Video
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "audio" ? "primary" : "outline"}
            className="min-h-11"
            disabled={!hasAudio}
            onClick={() => setMode("audio")}
            leftIcon={<Headphones className="h-4 w-4" weight="bold" />}
          >
            Audio
          </Button>
        </div>
      </div>

      <div className="mt-3">
        {!activeSrc ? (
          <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--background-alt)] p-4">
            <p className="text-sm text-[var(--text-secondary)]">
              No media available for “{title}”.
            </p>
          </div>
        ) : mode === "video" ? (
          <video
            key={activeSrc}
            ref={(node) => {
              mediaRef.current = node;
            }}
            className="w-full rounded-xl bg-black"
            controls
            playsInline
            preload="metadata"
            aria-label={`Sermon video: ${title}`}
            src={activeSrc}
          />
        ) : (
          <audio
            key={activeSrc}
            ref={(node) => {
              mediaRef.current = node;
            }}
            className="w-full"
            controls
            preload="metadata"
            aria-label={`Sermon audio: ${title}`}
            src={activeSrc}
          />
        )}
      </div>
    </Card>
  );
}
