/**
 * Worker Types
 * ============
 * Type definitions for church workers and leadership.
 * 
 * "Let the elders who rule well be counted worthy of double honor." — 1 Timothy 5:17
 */

/**
 * Worker role enum (40+ roles)
 */
export type WorkerRole =
  // Conference Leadership
  | "PRESIDENT"
  | "EXECUTIVE_SECRETARY"
  | "TREASURER"
  // Pastoral Ministry
  | "SENIOR_PASTOR"
  | "ASSOCIATE_PASTOR"
  | "DISTRICT_PASTOR"
  | "INTERN_PASTOR"
  // Church Elders
  | "FIRST_ELDER"
  | "SECOND_ELDER"
  | "ELDER"
  // Deacons & Deaconesses
  | "HEAD_DEACON"
  | "DEACON"
  | "HEAD_DEACONESS"
  | "DEACONESS"
  // Music Ministry
  | "MUSIC_DIRECTOR"
  | "CHOIR_LEADER"
  | "ORGANIST"
  | "CHOIR_MEMBER"
  // Sabbath School
  | "SS_SUPERINTENDENT"
  | "SS_SECRETARY"
  | "SS_TEACHER"
  // Youth Ministry
  | "AY_DIRECTOR"
  | "AY_ASSOCIATE"
  | "PATHFINDER_DIRECTOR"
  | "PATHFINDER_DEPUTY"
  | "ADVENTURER_DIRECTOR"
  | "MASTER_GUIDE"
  // Women & Family Ministry
  | "WM_LEADER"
  | "WM_ASSOCIATE"
  | "FM_LEADER"
  // Children's Ministry
  | "CHILDREN_DIRECTOR"
  | "CHILDREN_TEACHER"
  // Communication & Media
  | "COMMUNICATION_DIRECTOR"
  | "MEDIA_DIRECTOR"
  | "SOUND_ENGINEER"
  | "CAMERA_OPERATOR"
  // Other Departments
  | "HEALTH_DIRECTOR"
  | "EDUCATION_DIRECTOR"
  | "STEWARDSHIP_DIRECTOR"
  | "PERSONAL_MINISTRIES_DIRECTOR"
  | "PUBLISHING_DIRECTOR"
  // Church Officers
  | "CHURCH_CLERK"
  | "CHURCH_TREASURER"
  | "INTEREST_COORDINATOR"
  // General Workers
  | "USHER"
  | "GREETER"
  | "SECURITY"
  | "VOLUNTEER";

/**
 * Role category for grouping
 */
export type RoleCategory =
  | "LEADERSHIP"
  | "PASTORAL"
  | "ELDERS"
  | "DEACONS"
  | "MUSIC"
  | "SABBATH_SCHOOL"
  | "YOUTH"
  | "WOMEN_FAMILY"
  | "CHILDREN"
  | "MEDIA"
  | "DEPARTMENTS"
  | "OFFICERS"
  | "GENERAL";

/**
 * Worker social links
 */
export interface WorkerSocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

/**
 * Worker model as returned from the database
 */
export interface Worker {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  role: WorkerRole;
  title: string | null;
  department: string | null;
  bio: string | null;
  photoUrl: string | null;
  startDate: Date | string | null;
  endDate: Date | string | null;
  isActive: boolean;
  displayOrder: number | null;
  showOnWebsite: boolean;
  socialLinks: WorkerSocialLinks | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Worker with role label (from API)
 */
export interface WorkerWithLabel extends Worker {
  roleLabel: string;
  hierarchyOrder?: number;
  roleCategory?: RoleCategory;
}

/**
 * Worker with relations (detailed view)
 */
export interface WorkerWithRelations extends WorkerWithLabel {
  member?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photoUrl: string | null;
  } | null;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

/**
 * Worker card display data (subset for lists)
 */
export interface WorkerCard {
  id: string;
  firstName: string;
  lastName: string;
  role: WorkerRole;
  roleLabel: string;
  title: string | null;
  photoUrl: string | null;
  department: string | null;
}

/**
 * Create worker input
 */
export interface CreateWorkerInput {
  memberId?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  role: WorkerRole;
  title?: string;
  department?: string;
  bio?: string;
  photoUrl?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  isActive?: boolean;
  displayOrder?: number;
  showOnWebsite?: boolean;
  socialLinks?: WorkerSocialLinks;
}

/**
 * Update worker input
 */
export type UpdateWorkerInput = Partial<CreateWorkerInput>;

/**
 * Worker filters for API queries
 */
export interface WorkerFilters {
  page?: number;
  limit?: number;
  role?: WorkerRole;
  department?: string;
  active?: boolean;
  grouped?: boolean;
}

/**
 * Grouped workers response
 */
export interface GroupedWorkersResponse {
  [category: string]: {
    label: string;
    description: string;
    workers: WorkerWithLabel[];
  };
}
