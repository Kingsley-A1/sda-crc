"use client";

import { motion } from "framer-motion";
import {
  CalendarBlank,
  User,
  BookOpen,
  Eye,
  Clock,
} from "@phosphor-icons/react";
import { Badge, Button } from "@/components/ui";
import { fadeInUp } from "@/animations";
import Link from "next/link";

interface SermonData {
  id: string;
  title: string;
  speaker: string;
  date: string;
  description: string | null;
  scriptureReference: string | null;
  series: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  thumbnailUrl: string | null;
  duration: string | number | null;
  tags: string[];
  slug: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface SermonDetailsProps {
  sermon: SermonData;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SermonDetails({ sermon }: SermonDetailsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
        {sermon.title}
      </h1>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          <span>{sermon.speaker}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarBlank className="h-4 w-4" />
          <span>{formatDate(sermon.date)}</span>
        </div>
        {sermon.duration && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{sermon.duration}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" />
          <span>{sermon.viewCount} views</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sermon.series && <Badge variant="success">{sermon.series}</Badge>}
        {sermon.scriptureReference && (
          <Badge variant="outline">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            {sermon.scriptureReference}
          </Badge>
        )}
      </div>

      {/* Description */}
      {sermon.description && (
        <div className="prose prose-green max-w-none mb-8">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {sermon.description}
          </p>
        </div>
      )}

      {/* Back link */}
      <Link href="/sermons">
        <Button variant="outline" size="sm">
          ← Back to Sermons
        </Button>
      </Link>
    </motion.div>
  );
}
