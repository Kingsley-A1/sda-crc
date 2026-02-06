/**
 * Edit Sermon Page
 * ================
 * Form for editing an existing sermon.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SermonForm } from "@/components/command/sermons/sermon-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { CreateSermonInput } from "@/types/sermon";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Sermon | Command Center",
};

export const dynamic = 'force-dynamic';

async function getSermon(id: string) {
  const sermon = await db.sermon.findUnique({
    where: { id },
  });
  return sermon;
}

export default async function EditSermonPage({ params }: PageProps) {
  const { id } = await params;
  const sermon = await getSermon(id);

  if (!sermon) {
    return notFound();
  }

  // Map to form input
  const initialData = {
    title: sermon.title,
    speaker: sermon.speaker,
    date: sermon.date.toISOString().split("T")[0],
    description: sermon.description || "",
    scriptureReference: sermon.scriptureReference || "",
    videoUrl: sermon.videoUrl || "",
    audioUrl: sermon.audioUrl || "",
    tags: [],
  };

  async function handleSubmit(data: CreateSermonInput) {
    "use server";

    await db.sermon.update({
      where: { id },
      data: {
        title: data.title,
        speaker: data.speaker,
        date: new Date(data.date),
        description: data.description || null,
        scriptureReference: data.scriptureReference || null,
        videoUrl: data.videoUrl || null,
        audioUrl: data.audioUrl || null,
      },
    });

    revalidatePath("/command/sermons");
    redirect("/command/sermons");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Sermon</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update sermon details
        </p>
      </div>

      <SermonForm
        initial={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Sermon"
      />
    </div>
  );
}
