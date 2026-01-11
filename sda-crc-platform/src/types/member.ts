/**
 * Member Types
 * ============
 * Type definitions for member-related data.
 * 
 * "For we are all members of one body." — Ephesians 4:25
 */

/**
 * Gender enum
 */
export type Gender = "MALE" | "FEMALE";

/**
 * Membership type enum
 */
export type MembershipType =
  | "FULL"
  | "TRANSFER"
  | "PROFESSION_OF_FAITH"
  | "BAPTISM";

/**
 * Member model as returned from the database
 */
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | string | null;
  gender: Gender | null;
  address: string | null;
  city: string | null;
  state: string | null;
  occupation: string | null;
  baptismDate: Date | string | null;
  membershipType: MembershipType;
  photoUrl: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  interests: string[];
  isActive: boolean;
  notes: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Member with relations (from API)
 */
export interface MemberWithRelations extends Member {
  department: {
    id: string;
    name: string;
    slug?: string;
  } | null;
  smallGroup: {
    id: string;
    name: string;
    city?: string;
  } | null;
  worker: {
    id: string;
    role: string;
    isActive: boolean;
  } | null;
}

/**
 * Member card display data (subset for lists)
 */
export interface MemberCard {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl: string | null;
  city: string | null;
  isActive: boolean;
}

/**
 * Create member input (registration form)
 */
export interface CreateMemberInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date | string;
  gender?: Gender;
  address?: string;
  city?: string;
  state?: string;
  occupation?: string;
  baptismDate?: Date | string;
  membershipType?: MembershipType;
  photoUrl?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  interests?: string[];
  smallGroupId?: string;
  notes?: string;
}

/**
 * Update member input
 */
export type UpdateMemberInput = Partial<CreateMemberInput>;

/**
 * Member filters for API queries
 */
export interface MemberFilters {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
  smallGroupId?: string;
}

/**
 * Member full name helper type
 */
export interface MemberName {
  firstName: string;
  lastName: string;
}

/**
 * Helper to get full name
 */
export function getFullName(member: MemberName): string {
  return `${member.firstName} ${member.lastName}`;
}
