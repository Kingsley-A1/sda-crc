/**
 * New Sermon Page
 * ===============
 * Form for creating a new sermon entry.
 */

import type { Metadata } from "next";
import { SermonForm } from "@/components/command/sermons/sermon-form";

export const metadata: Metadata = {
  title: "Add Sermon | Command Center",
};

export default function NewSermonPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Sermon</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload and publish a new sermon
        </p>
      </div>

      <SermonForm mode="create" />
    </div>
  );
}
