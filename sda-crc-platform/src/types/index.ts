/**
 * Types Index
 * ===========
 * Central export for all type definitions.
 * 
 * "For everything there is a season." — Ecclesiastes 3:1
 */

// ============================================================================
// Re-export all types
// ============================================================================

export * from "./sermon";
export * from "./event";
export * from "./member";
export * from "./department";
export * from "./worker";
export * from "./evangelism";

// ============================================================================
// Common API Types
// ============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: ApiPaginationMeta;
  error?: string;
  errors?: Record<string, string[]>;
}

/**
 * Pagination metadata
 */
export interface ApiPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Error response
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  errors?: Record<string, string[]>;
}

// ============================================================================
// User & Auth Types
// ============================================================================

/**
 * User role enum
 */
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

/**
 * Current user session
 */
export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string | null;
}

/**
 * Session type
 */
export interface Session {
  user: CurrentUser;
  expires: string;
}

// ============================================================================
// Contact & Pledge Types
// ============================================================================

/**
 * Contact category enum
 */
export type ContactCategory =
  | "GENERAL"
  | "PRAYER_REQUEST"
  | "MEMBERSHIP"
  | "EVENTS"
  | "FEEDBACK"
  | "OTHER";

/**
 * Contact status enum
 */
export type ContactStatus =
  | "NEW"
  | "READ"
  | "IN_PROGRESS"
  | "REPLIED"
  | "RESOLVED"
  | "ARCHIVED";

/**
 * Contact submission
 */
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  category: ContactCategory;
  status: ContactStatus;
  readAt: Date | string | null;
  repliedAt: Date | string | null;
  notes: string | null;
  createdAt: Date | string;
}

/**
 * Currency enum
 */
export type Currency = "NGN" | "USD";

/**
 * Pledge purpose enum
 */
export type PledgePurpose =
  | "TITHE"
  | "OFFERING"
  | "EVANGELISM"
  | "BUILDING"
  | "SPECIAL_PROJECT"
  | "OTHER";

/**
 * Pledge frequency enum
 */
export type PledgeFrequency =
  | "ONE_TIME"
  | "WEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "YEARLY";

/**
 * Pledge status enum
 */
export type PledgeStatus =
  | "PENDING"
  | "PARTIAL"
  | "FULFILLED"
  | "CANCELLED";

/**
 * Pledge model
 */
export interface Pledge {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  amount: number;
  currency: Currency;
  purpose: PledgePurpose;
  projectName: string | null;
  frequency: PledgeFrequency;
  startDate: Date | string;
  status: PledgeStatus;
  anonymous: boolean;
  createdAt: Date | string;
}

// ============================================================================
// Small Group Types
// ============================================================================

/**
 * Small group model
 */
export interface SmallGroup {
  id: string;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  address: string | null;
  city: string | null;
  state: string | null;
  meetingDay: string | null;
  meetingTime: string | null;
  maxMembers: number;
  isActive: boolean;
  acceptingMembers: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Small group with leader
 */
export interface SmallGroupWithLeader extends SmallGroup {
  leader: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    photoUrl: string | null;
  } | null;
  currentMembers: number;
  spotsRemaining?: number;
  distance?: string;
}

// ============================================================================
// Site Settings Types
// ============================================================================

/**
 * Site settings model
 */
export interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  liveStreamUrl: string | null;
  maintenanceMode: boolean;
  offlineMessage: string | null;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Make all properties optional except specified keys
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Make specified properties required
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * ID type
 */
export type ID = string;

/**
 * Timestamps type
 */
export interface Timestamps {
  createdAt: Date | string;
  updatedAt: Date | string;
}
