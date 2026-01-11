/**
 * Event Types
 * ===========
 * Type definitions for event-related data.
 * 
 * "There is a time for everything." — Ecclesiastes 3:1
 */

/**
 * Event category enum
 */
export type EventCategory =
  | "WORSHIP"
  | "FELLOWSHIP"
  | "EVANGELISM"
  | "TRAINING"
  | "YOUTH"
  | "CHILDREN"
  | "SPECIAL";

/**
 * Event model as returned from the database
 */
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  location: string | null;
  imageUrl: string | null;
  isOnline: boolean;
  onlineUrl: string | null;
  category: EventCategory;
  featured: boolean;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Event with creator info (from API)
 */
export interface EventWithCreator extends Event {
  createdBy: {
    id: string;
    name: string;
  } | null;
}

/**
 * Event card display data (subset for lists)
 */
export interface EventCard {
  id: string;
  title: string;
  slug: string;
  startDate: Date | string;
  endDate: Date | string | null;
  location: string | null;
  imageUrl: string | null;
  isOnline: boolean;
  category: EventCategory;
  featured: boolean;
}

/**
 * Create event input
 */
export interface CreateEventInput {
  title: string;
  description?: string;
  startDate: Date | string;
  endDate?: Date | string;
  location?: string;
  imageUrl?: string;
  isOnline?: boolean;
  onlineUrl?: string;
  category?: EventCategory;
  featured?: boolean;
  published?: boolean;
}

/**
 * Update event input
 */
export type UpdateEventInput = Partial<CreateEventInput>;

/**
 * Event filters for API queries
 */
export interface EventFilters {
  page?: number;
  limit?: number;
  category?: EventCategory;
  upcoming?: boolean;
  featured?: boolean;
  search?: string;
}

/**
 * Category configuration (for UI)
 */
export interface EventCategoryConfig {
  value: EventCategory;
  label: string;
  color: string;
}
