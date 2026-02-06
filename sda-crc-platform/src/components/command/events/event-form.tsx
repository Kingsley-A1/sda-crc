"use client";

import * as React from "react";

import type { CreateEventInput, EventCategory } from "@/types/event";
import { cn } from "@/lib/utils";

import { Button, Card, Input, Select, Textarea } from "@/components/ui";

const EVENT_CATEGORIES: Array<{ value: EventCategory; label: string }> = [
  { value: "WORSHIP", label: "Worship" },
  { value: "FELLOWSHIP", label: "Fellowship" },
  { value: "EVANGELISM", label: "Evangelism" },
  { value: "TRAINING", label: "Training" },
  { value: "YOUTH", label: "Youth" },
  { value: "CHILDREN", label: "Children" },
  { value: "SPECIAL", label: "Special" },
];

export interface EventFormProps {
  initial?: Partial<CreateEventInput>;
  onSubmit: (input: CreateEventInput) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
}

export function EventForm({
  initial,
  onSubmit,
  submitLabel = "Save event",
  className,
}: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [startDate, setStartDate] = React.useState<string>(
    String(initial?.startDate ?? "")
  );
  const [endDate, setEndDate] = React.useState<string>(
    String(initial?.endDate ?? "")
  );
  const [category, setCategory] = React.useState<string>(
    String(initial?.category ?? "WORSHIP")
  );

  const [isOnline, setIsOnline] = React.useState<string>(
    initial?.isOnline ? "true" : "false"
  );
  const [onlineUrl, setOnlineUrl] = React.useState(initial?.onlineUrl ?? "");
  const [location, setLocation] = React.useState(initial?.location ?? "");

  const [featured, setFeatured] = React.useState<string>(
    initial?.featured ? "true" : "false"
  );
  const [published, setPublished] = React.useState<string>(
    initial?.published ? "true" : "false"
  );

  const [imageUrl, setImageUrl] = React.useState(initial?.imageUrl ?? "");
  const [description, setDescription] = React.useState(
    initial?.description ?? ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        startDate,
        endDate: endDate.trim() || undefined,
        category: category as EventCategory,
        isOnline: isOnline === "true",
        onlineUrl:
          isOnline === "true" ? onlineUrl.trim() || undefined : undefined,
        location:
          isOnline === "true" ? undefined : location.trim() || undefined,
        featured: featured === "true",
        published: published === "true",
        imageUrl: imageUrl.trim() || undefined,
        description: description.trim() || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const online = isOnline === "true";

  return (
    <Card className={cn("p-4", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            label="Category"
            value={category}
            onChange={setCategory}
            options={EVENT_CATEGORIES.map((c) => ({
              value: c.value,
              label: c.label,
            }))}
          />
          <Input
            label="Start date"
            required
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End date (optional)"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Online event?"
            value={isOnline}
            onChange={setIsOnline}
            options={[
              { value: "false", label: "No" },
              { value: "true", label: "Yes" },
            ]}
          />
          {online ? (
            <Input
              label="Online URL"
              value={onlineUrl}
              onChange={(e) => setOnlineUrl(e.target.value)}
            />
          ) : (
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          )}
          <Select
            label="Featured?"
            value={featured}
            onChange={setFeatured}
            options={[
              { value: "false", label: "No" },
              { value: "true", label: "Yes" },
            ]}
          />
          <Select
            label="Published?"
            value={published}
            onChange={setPublished}
            options={[
              { value: "false", label: "Draft" },
              { value: "true", label: "Published" },
            ]}
          />
        </div>

        <Input
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />

        {error ? <p className="text-sm text-[var(--error)]">{error}</p> : null}

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText="Saving..."
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}
