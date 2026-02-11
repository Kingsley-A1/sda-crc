/**
 * Application Constants
 * =====================
 * Centralized configuration values used throughout the application.
 * 
 * "Jesus Christ is the same yesterday and today and forever." — Hebrews 13:8
 */

// ============================================================================
// Site Information
// ============================================================================

export const SITE_NAME = "SDA Cross River Conference";
export const SITE_DESCRIPTION = "The official website of the Seventh-day Adventist Church, Cross River Conference, Nigeria.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sdacrossriver.org";
export const SITE_EMAIL = "info@sdacrossriver.org";
export const SITE_PHONE = "+234 XXX XXX XXXX";

// ============================================================================
// Conference Information
// ============================================================================

export const CONFERENCE_NAME = "Cross River Conference";
export const CONFERENCE_LOCATION = "Calabar, Cross River State, Nigeria";
export const CONFERENCE_ADDRESS = "Conference Headquarters, Calabar, Cross River State";
export const CONFERENCE_COORDS = {
  lat: 4.9517,
  lng: 8.322,
};

// ============================================================================
// API Configuration
// ============================================================================

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// ============================================================================
// Authentication
// ============================================================================

export const AUTH_COOKIE_NAME = "crc-session";
export const SESSION_DURATION = 30 * 24 * 60 * 60; // 30 days in seconds

// ============================================================================
// Media Configuration
// ============================================================================

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
];

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// ============================================================================
// UI Configuration
// ============================================================================

export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

export const SPRING_CONFIG = {
  stiff: { stiffness: 400, damping: 30 },
  gentle: { stiffness: 100, damping: 15 },
  bouncy: { stiffness: 400, damping: 10 },
} as const;

// ============================================================================
// Color Palette (from prototypes)
// ============================================================================

export const BRAND_COLORS = {
  primary: {
    DEFAULT: "#15803d", // SDA Green
    light: "#16a34a",
    dark: "#166534",
    darker: "#14532d",
  },
  accent: {
    DEFAULT: "#22c55e", // Bright Green (for MISSION)
    light: "#4ade80",
    dark: "#16a34a",
  },
  gold: {
    DEFAULT: "#f59e0b", // Gold (workers/honors)
    light: "#fbbf24",
    dark: "#d97706",
  },
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#0f172a",
  },
} as const;

// ============================================================================
// Social Media Links
// ============================================================================

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/sdacrossriver",
  twitter: "https://twitter.com/sdacrossriver",
  instagram: "https://instagram.com/sdacrossriver",
  youtube: "https://youtube.com/@sdacrossriver",
  whatsapp: "https://wa.me/234XXXXXXXXXX",
} as const;

// ============================================================================
// Service Times
// ============================================================================

export const SERVICE_TIMES = [
  {
    name: "Sabbath School",
    day: "Saturday",
    time: "9:00 AM - 10:30 AM",
  },
  {
    name: "Divine Service",
    day: "Saturday",
    time: "11:00 AM - 1:00 PM",
  },
  {
    name: "Prayer Meeting",
    day: "Wednesday",
    time: "6:00 PM - 7:30 PM",
  },
  {
    name: "Youth Program (AY)",
    day: "Saturday",
    time: "4:00 PM - 6:00 PM",
  },
] as const;

// ============================================================================
// Event Categories
// ============================================================================

export const EVENT_CATEGORIES = [
  { value: "WORSHIP", label: "Worship Service", color: "#1a365d" },
  { value: "FELLOWSHIP", label: "Fellowship", color: "#059669" },
  { value: "EVANGELISM", label: "Evangelism", color: "#c9a227" },
  { value: "TRAINING", label: "Training & Seminar", color: "#7c3aed" },
  { value: "YOUTH", label: "Youth Event", color: "#2563eb" },
  { value: "CHILDREN", label: "Children's Event", color: "#ec4899" },
  { value: "SPECIAL", label: "Special Event", color: "#f97316" },
] as const;

// ============================================================================
// Pledge Purposes
// ============================================================================

export const PLEDGE_PURPOSES = [
  { value: "TITHE", label: "Tithe" },
  { value: "OFFERING", label: "General Offering" },
  { value: "EVANGELISM", label: "Evangelism Fund" },
  { value: "BUILDING", label: "Building Fund" },
  { value: "SPECIAL_PROJECT", label: "Special Project" },
  { value: "OTHER", label: "Other" },
] as const;

// ============================================================================
// Contact Categories
// ============================================================================

export const CONTACT_CATEGORIES = [
  { value: "GENERAL", label: "General Inquiry" },
  { value: "PRAYER_REQUEST", label: "Prayer Request" },
  { value: "MEMBERSHIP", label: "Membership Question" },
  { value: "EVENTS", label: "Events & Programs" },
  { value: "FEEDBACK", label: "Feedback & Suggestions" },
  { value: "OTHER", label: "Other" },
] as const;

// ============================================================================
// Nigerian States (for forms)
// ============================================================================

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You must be logged in to perform this action",
  FORBIDDEN: "You do not have permission to perform this action",
  NOT_FOUND: "The requested resource was not found",
  VALIDATION_ERROR: "Please check your input and try again",
  SERVER_ERROR: "Something went wrong. Please try again later",
  RATE_LIMIT: "Too many requests. Please slow down",
  FILE_TOO_LARGE: "File size exceeds the maximum allowed",
  INVALID_FILE_TYPE: "This file type is not supported",
} as const;

// ============================================================================
// Success Messages
// ============================================================================

export const SUCCESS_MESSAGES = {
  CREATED: "Successfully created",
  UPDATED: "Successfully updated",
  DELETED: "Successfully deleted",
  SAVED: "Changes saved successfully",
  SENT: "Message sent successfully",
  REGISTERED: "Registration successful",
  PLEDGED: "Thank you for your pledge",
} as const;

// ============================================================================
// SEO Defaults
// ============================================================================

export const SEO_DEFAULTS = {
  titleTemplate: "%s | SDA Cross River Conference",
  defaultTitle: "SDA Cross River Conference",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: SITE_NAME,
  },
  twitter: {
    cardType: "summary_large_image",
    handle: "@sdacrossriver",
  },
} as const;
