/**
 * Zod Validation Schemas
 * ======================
 * Type-safe validation for all API inputs.
 * These schemas ensure data integrity from the moment it enters our system.
 * 
 * "Test everything; hold fast what is good." — 1 Thessalonians 5:21
 */

import { z } from "zod";

// ============================================================================
// Common Validators
// ============================================================================

export const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PhoneSchema = z.string().regex(phoneRegex, {
  message: "Please enter a valid Nigerian phone number",
});

export const EmailSchema = z.string().email({
  message: "Please enter a valid email address",
});

export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
  message: "Slug must be lowercase letters, numbers, and hyphens only",
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

// ============================================================================
// Auth Schemas
// ============================================================================

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: EmailSchema,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// ============================================================================
// Sermon Schemas
// ============================================================================

export const CreateSermonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  speaker: z.string().min(2, "Speaker name is required").max(100),
  date: z.coerce.date(),
  description: z.string().optional(),
  audioUrl: z.string().url("Must be a valid URL").optional(),
  videoUrl: z.string().url("Must be a valid URL").optional(),
  thumbnailUrl: z.string().url("Must be a valid URL").optional(),
  duration: z.number().int().positive().optional(),
  scriptureReference: z.string().max(100).optional(),
  series: z.string().max(100).optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
});

export const UpdateSermonSchema = CreateSermonSchema.partial();

export const SermonQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  speaker: z.string().optional(),
  series: z.string().optional(),
  search: z.string().optional(),
  published: z.enum(["true", "false"]).optional(),
});

// ============================================================================
// Event Schemas
// ============================================================================

export const CreateEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  location: z.string().max(200).optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  isOnline: z.boolean().default(false),
  onlineUrl: z.string().url("Must be a valid URL").optional(),
  category: z.enum(["WORSHIP", "FELLOWSHIP", "EVANGELISM", "TRAINING", "YOUTH", "CHILDREN", "SPECIAL"]).default("WORSHIP"),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
}).refine((data) => {
  if (data.endDate && data.startDate > data.endDate) {
    return false;
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const UpdateEventSchema = CreateEventSchema.partial();

export const EventQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  category: z.string().optional(),
  upcoming: z.enum(["true", "false"]).optional(),
  featured: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
});

// ============================================================================
// Department Schemas
// ============================================================================

export const CreateDepartmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: SlugSchema.optional(),
  description: z.string().optional(),
  mission: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  iconName: z.string().max(50).optional(),
  leaderId: z.string().cuid().optional(),
  meetingDay: z.string().max(20).optional(),
  meetingTime: z.string().max(20).optional(),
  meetingLocation: z.string().max(200).optional(),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial();

// ============================================================================
// Small Group Schemas
// ============================================================================

export const CreateSmallGroupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().optional(),
  leaderId: z.string().cuid().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().max(300).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(50).optional(),
  meetingDay: z.string().max(20).optional(),
  meetingTime: z.string().max(20).optional(),
  maxMembers: z.number().int().positive().default(12),
  isActive: z.boolean().default(true),
  acceptingMembers: z.boolean().default(true),
});

export const UpdateSmallGroupSchema = CreateSmallGroupSchema.partial();

export const SmallGroupQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  radius: z.coerce.number().positive().max(100).default(10), // km
  city: z.string().optional(),
  active: z.enum(["true", "false"]).optional(),
});

// ============================================================================
// Member Registration Schemas
// ============================================================================

export const CreateMemberSchema = z.object({
  firstName: z.string().min(2, "First name is required").max(50),
  lastName: z.string().min(2, "Last name is required").max(50),
  email: EmailSchema,
  phone: PhoneSchema,
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  address: z.string().max(300).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(50).optional(),
  occupation: z.string().max(100).optional(),
  baptismDate: z.coerce.date().optional(),
  membershipType: z.enum(["FULL", "TRANSFER", "PROFESSION_OF_FAITH", "BAPTISM"]).default("FULL"),
  photoUrl: z.string().url().optional(),
  emergencyContactName: z.string().max(100).optional(),
  emergencyContactPhone: PhoneSchema.optional(),
  interests: z.array(z.string()).optional(),
  smallGroupId: z.string().cuid().optional(),
  notes: z.string().max(500).optional(),
});

export const UpdateMemberSchema = CreateMemberSchema.partial();

// ============================================================================
// Worker Schemas
// ============================================================================

export const WorkerRoleEnum = z.enum([
  // Conference Leadership
  "PRESIDENT",
  "EXECUTIVE_SECRETARY",
  "TREASURER",
  
  // Pastoral Ministry
  "SENIOR_PASTOR",
  "ASSOCIATE_PASTOR",
  "DISTRICT_PASTOR",
  "INTERN_PASTOR",
  
  // Church Elders
  "FIRST_ELDER",
  "SECOND_ELDER",
  "ELDER",
  
  // Deacons & Deaconesses
  "HEAD_DEACON",
  "DEACON",
  "HEAD_DEACONESS",
  "DEACONESS",
  
  // Music Ministry
  "MUSIC_DIRECTOR",
  "CHOIR_LEADER",
  "ORGANIST",
  "CHOIR_MEMBER",
  
  // Sabbath School
  "SS_SUPERINTENDENT",
  "SS_SECRETARY",
  "SS_TEACHER",
  
  // Youth Ministry
  "AY_DIRECTOR",
  "AY_ASSOCIATE",
  "PATHFINDER_DIRECTOR",
  "PATHFINDER_DEPUTY",
  "ADVENTURER_DIRECTOR",
  "MASTER_GUIDE",
  
  // Women & Family Ministry
  "WM_LEADER",
  "WM_ASSOCIATE",
  "FM_LEADER",
  
  // Children's Ministry
  "CHILDREN_DIRECTOR",
  "CHILDREN_TEACHER",
  
  // Communication & Media
  "COMMUNICATION_DIRECTOR",
  "MEDIA_DIRECTOR",
  "SOUND_ENGINEER",
  "CAMERA_OPERATOR",
  
  // Other Departments
  "HEALTH_DIRECTOR",
  "EDUCATION_DIRECTOR",
  "STEWARDSHIP_DIRECTOR",
  "PERSONAL_MINISTRIES_DIRECTOR",
  "PUBLISHING_DIRECTOR",
  
  // Church Officers
  "CHURCH_CLERK",
  "CHURCH_TREASURER",
  "INTEREST_COORDINATOR",
  
  // General Workers
  "USHER",
  "GREETER",
  "SECURITY",
  "VOLUNTEER",
]);

export const CreateWorkerSchema = z.object({
  memberId: z.string().cuid().optional(),
  userId: z.string().cuid().optional(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: EmailSchema.optional(),
  phone: PhoneSchema.optional(),
  role: WorkerRoleEnum,
  title: z.string().max(100).optional(),
  department: z.string().max(100).optional(),
  bio: z.string().max(1000).optional(),
  photoUrl: z.string().url().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().min(0).optional(),
  showOnWebsite: z.boolean().default(true),
  socialLinks: z.object({
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
});

export const UpdateWorkerSchema = CreateWorkerSchema.partial();

export const WorkerQuerySchema = z.object({
  role: WorkerRoleEnum.optional(),
  department: z.string().optional(),
  active: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

// ============================================================================
// Evangelism Site Schemas
// ============================================================================

export const CreateEvangelismSiteSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  address: z.string().max(300).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(50).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  status: z.enum(["PLANNING", "ACTIVE", "COMPLETED", "PAUSED"]).default("PLANNING"),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  coordinatorId: z.string().cuid().optional(),
  targetAttendance: z.number().int().positive().optional(),
  actualAttendance: z.number().int().min(0).optional(),
  baptisms: z.number().int().min(0).default(0),
  decisions: z.number().int().min(0).default(0),
  imageUrl: z.string().url().optional(),
});

export const UpdateEvangelismSiteSchema = CreateEvangelismSiteSchema.partial();

// ============================================================================
// Pledge Schemas
// ============================================================================

export const CreatePledgeSchema = z.object({
  memberId: z.string().cuid().optional(),
  name: z.string().min(2).max(100),
  email: EmailSchema.optional(),
  phone: PhoneSchema.optional(),
  amount: z.number().positive("Amount must be positive"),
  currency: z.enum(["NGN", "USD"]).default("NGN"),
  purpose: z.enum(["TITHE", "OFFERING", "EVANGELISM", "BUILDING", "SPECIAL_PROJECT", "OTHER"]).default("OFFERING"),
  projectName: z.string().max(200).optional(),
  frequency: z.enum(["ONE_TIME", "WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY"]).default("ONE_TIME"),
  startDate: z.coerce.date().optional(),
  notes: z.string().max(500).optional(),
  anonymous: z.boolean().default(false),
});

// ============================================================================
// Contact Form Schemas
// ============================================================================

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: EmailSchema,
  phone: PhoneSchema.optional(),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  category: z.enum(["GENERAL", "PRAYER_REQUEST", "MEMBERSHIP", "EVENTS", "FEEDBACK", "OTHER"]).default("GENERAL"),
});

// ============================================================================
// Upload Schemas
// ============================================================================

export const RequestUploadSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.string().regex(/^[a-z]+\/[a-z0-9\-\+\.]+$/i, "Invalid content type"),
  size: z.number().int().positive().max(50 * 1024 * 1024), // Max 50MB
  category: z.enum(["sermons", "events", "members", "workers", "departments", "general"]).default("general"),
});

// ============================================================================
// Resource Schemas
// ============================================================================

export const CreateResourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().max(2000).optional(),
  fileUrl: z.string().url("Must be a valid URL"),
  fileType: z.string().min(1).max(100),
  fileSize: z.number().int().positive().max(1024 * 1024 * 1024), // Max 1GB
  category: z.string().max(100).optional(),
  published: z.boolean().default(false),
});

export const UpdateResourceSchema = CreateResourceSchema.partial();

export const ResourceQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  category: z.string().optional(),
  search: z.string().optional(),
  published: z.enum(["true", "false"]).optional(),
});

// ============================================================================
// Settings Schemas
// ============================================================================

export const UpdateSettingsSchema = z.object({
  siteName: z.string().max(100).optional(),
  siteDescription: z.string().max(500).optional(),
  contactEmail: EmailSchema.optional(),
  contactPhone: PhoneSchema.optional(),
  address: z.string().max(300).optional(),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  liveStreamUrl: z.string().url().optional().or(z.literal("")),
  maintenanceMode: z.boolean().optional(),
  offlineMessage: z.string().max(500).optional(),
});

// ============================================================================
// Type Exports
// ============================================================================

export type CreateSermon = z.infer<typeof CreateSermonSchema>;
export type UpdateSermon = z.infer<typeof UpdateSermonSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;
export type UpdateEvent = z.infer<typeof UpdateEventSchema>;
export type CreateDepartment = z.infer<typeof CreateDepartmentSchema>;
export type CreateSmallGroup = z.infer<typeof CreateSmallGroupSchema>;
export type CreateMember = z.infer<typeof CreateMemberSchema>;
export type CreateWorker = z.infer<typeof CreateWorkerSchema>;
export type UpdateWorker = z.infer<typeof UpdateWorkerSchema>;
export type CreateEvangelismSite = z.infer<typeof CreateEvangelismSiteSchema>;
export type CreatePledge = z.infer<typeof CreatePledgeSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;
export type RequestUpload = z.infer<typeof RequestUploadSchema>;
export type CreateResource = z.infer<typeof CreateResourceSchema>;
export type WorkerRole = z.infer<typeof WorkerRoleEnum>;
