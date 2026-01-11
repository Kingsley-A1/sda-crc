"use client";

import * as React from "react";

import type { CreateSermonInput } from "@/types/sermon";
import { cn } from "@/lib/utils";

import { Button, Card, Input, Select, Textarea } from "@/components/ui";

export interface SermonFormProps {
  initial?: Partial<CreateSermonInput>;
  onSubmit: (input: CreateSermonInput) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
}

function toTags(value: string): string[] {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function SermonForm({
  initial,
  onSubmit,
  submitLabel = "Save sermon",
  className,
}: SermonFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [speaker, setSpeaker] = React.useState(initial?.speaker ?? "");
  const [date, setDate] = React.useState<string>(String(initial?.date ?? ""));
  const [published, setPublished] = React.useState<string>(initial?.published ? "true" : "false");

  const [description, setDescription] = React.useState(initial?.description ?? "");
  const [audioUrl, setAudioUrl] = React.useState(initial?.audioUrl ?? "");
  const [videoUrl, setVideoUrl] = React.useState(initial?.videoUrl ?? "");
  const [thumbnailUrl, setThumbnailUrl] = React.useState(initial?.thumbnailUrl ?? "");
  const [duration, setDuration] = React.useState<string>(
    typeof initial?.duration === "number" ? String(initial.duration) : ""
  );
  const [scriptureReference, setScriptureReference] = React.useState(initial?.scriptureReference ?? "");
  const [series, setSeries] = React.useState(initial?.series ?? "");
  const [tags, setTags] = React.useState((initial?.tags ?? []).join(", "));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        speaker: speaker.trim(),
        date,
        description: description.trim() || undefined,
        audioUrl: audioUrl.trim() || undefined,
        videoUrl: videoUrl.trim() || undefined,
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        duration: duration.trim() ? Number(duration) : undefined,
        scriptureReference: scriptureReference.trim() || undefined,
        series: series.trim() || undefined,
        tags: tags.trim() ? toTags(tags) : undefined,
        published: published === "true",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save sermon.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="Speaker" required value={speaker} onChange={(e) => setSpeaker(e.target.value)} />
          <Input
            label="Date"
            required
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Select
            label="Status"
            value={published}
            onChange={setPublished}
            options={[
              { value: "false", label: "Draft" },
              { value: "true", label: "Published" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input label="Audio URL" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} />
          <Input label="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <Input
            label="Thumbnail URL"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
          <Input
            label="Duration (seconds)"
            type="number"
            min={0}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Input
            label="Scripture reference"
            value={scriptureReference}
            onChange={(e) => setScriptureReference(e.target.value)}
          />
          <Input label="Series" value={series} onChange={(e) => setSeries(e.target.value)} />
          <Input
            label="Tags (comma separated)"
            className="sm:col-span-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />

        {error ? <p className="text-sm text-[var(--error)]">{error}</p> : null}

        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting} loadingText="Saving...">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}
