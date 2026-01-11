/**
 * Department Types
 * ================
 * Type definitions for department-related data.
 * 
 * "Now you are the body of Christ." — 1 Corinthians 12:27
 */

/**
 * Department model as returned from the database
 */
export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mission: string | null;
  imageUrl: string | null;
  iconName: string | null;
  meetingDay: string | null;
  meetingTime: string | null;
  meetingLocation: string | null;
  active: boolean;
  order: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Department with leader info (from API)
 */
export interface DepartmentWithLeader extends Department {
  leader: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
    email?: string;
    phone?: string;
  } | null;
  _count?: {
    members: number;
  };
}

/**
 * Department with members (detailed view)
 */
export interface DepartmentWithMembers extends DepartmentWithLeader {
  members: Array<{
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
  }>;
}

/**
 * Department card display data (subset for lists)
 */
export interface DepartmentCard {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  iconName: string | null;
  memberCount?: number;
  leader?: {
    firstName: string;
    lastName: string;
    photoUrl: string | null;
  } | null;
}

/**
 * Create department input
 */
export interface CreateDepartmentInput {
  name: string;
  slug?: string;
  description?: string;
  mission?: string;
  imageUrl?: string;
  iconName?: string;
  leaderId?: string;
  meetingDay?: string;
  meetingTime?: string;
  meetingLocation?: string;
  active?: boolean;
  order?: number;
}

/**
 * Update department input
 */
export type UpdateDepartmentInput = Partial<CreateDepartmentInput>;

/**
 * Department meeting schedule
 */
export interface DepartmentSchedule {
  day: string | null;
  time: string | null;
  location: string | null;
}
