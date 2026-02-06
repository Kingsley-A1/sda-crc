/**
 * New Sermon Page
 * ===============
 * Form for creating a new sermon entry.
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SermonForm } from "@/components/command/sermons/sermon-form";
import { db } from "@/lib/db";
import type { CreateSermonInput } from "@/types/sermon";

export const metadata: Metadata = {
  title: "Add Sermon | Command Center",
};

export const dynamic = 'force-dynamic';

export default function NewSermonPage() {
  async function handleSubmit(data: CreateSermonInput) {
    "use server";

    await db.sermon.create({
      data: {
        title: data.title,
        slug: data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        speaker: data.speaker,
        date: new Date(data.date),
        description: data.description || null,
        scriptureReference: data.scriptureReference || null,
        videoUrl: data.videoUrl || null,
        audioUrl: data.audioUrl || null,
        thumbnailUrl: data.thumbnailUrl || null,
        duration: data.duration || null,
        series: data.series || null,
        tags: data.tags || [],
        published: data.published ?? false,
      },
    });

    revalidatePath("/command/sermons");
    redirect("/command/sermons");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Sermon</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload and publish a new sermon
        </p>
      </div>

      <SermonForm onSubmit={handleSubmit} submitLabel="Create Sermon" />
    </div>
  );
}
