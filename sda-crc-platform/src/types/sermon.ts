/**
 * Sermon Types
 * ============
 * Type definitions for sermon-related data.
 * 
 * "Preach the word; be prepared in season and out of season." — 2 Timothy 4:2
 */

/**
 * Sermon model as returned from the database
 */
export interface Sermon {
  id: string;
  title: string;
  slug: string;
  speaker: string;
  date: Date | string;
  description: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  duration: number | null;
  scriptureReference: string | null;
  series: string | null;
  tags: string[];
  published: boolean;
  viewCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Sermon with creator info (from API)
 */
export interface SermonWithCreator extends Sermon {
  createdBy: {
    id: string;
    name: string;
  } | null;
}

/**
 * Sermon card display data (subset for lists)
 */
export interface SermonCard {
  id: string;
  title: string;
  slug: string;
  speaker: string;
  date: Date | string;
  thumbnailUrl: string | null;
  duration: number | null;
  scriptureReference: string | null;
  series: string | null;
}

/**
 * Create sermon input
 */
export interface CreateSermonInput {
  title: string;
  speaker: string;
  date: Date | string;
  description?: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  scriptureReference?: string;
  series?: string;
  tags?: string[];
  published?: boolean;
}

/**
 * Update sermon input
 */
export type UpdateSermonInput = Partial<CreateSermonInput>;

/**
 * Sermon filters for API queries
 */
export interface SermonFilters {
  page?: number;
  limit?: number;
  speaker?: string;
  series?: string;
  search?: string;
  published?: boolean;
}

/**
 * Sermon series grouping
 */
export interface SermonSeries {
  name: string;
  count: number;
  sermons: SermonCard[];
}
