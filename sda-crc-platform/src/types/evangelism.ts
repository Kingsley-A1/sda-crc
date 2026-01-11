/**
 * Evangelism Types
 * ================
 * Type definitions for evangelism sites and outreach.
 * 
 * "Go into all the world and preach the gospel." — Mark 16:15
 */

/**
 * Evangelism site status enum
 */
export type EvangelismStatus =
  | "PLANNING"
  | "ACTIVE"
  | "COMPLETED"
  | "PAUSED";

/**
 * Evangelism site model as returned from the database
 */
export interface EvangelismSite {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  status: EvangelismStatus;
  startDate: Date | string | null;
  endDate: Date | string | null;
  targetAttendance: number | null;
  actualAttendance: number | null;
  baptisms: number;
  decisions: number;
  imageUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Evangelism site with coordinator (from API)
 */
export interface EvangelismSiteWithCoordinator extends EvangelismSite {
  coordinator: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
    email?: string;
    phone?: string;
  } | null;
  progressPercentage?: number | null;
}

/**
 * Evangelism site card display data
 */
export interface EvangelismSiteCard {
  id: string;
  name: string;
  city: string | null;
  status: EvangelismStatus;
  startDate: Date | string | null;
  baptisms: number;
  decisions: number;
  imageUrl: string | null;
}

/**
 * Create evangelism site input
 */
export interface CreateEvangelismSiteInput {
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  status?: EvangelismStatus;
  startDate?: Date | string;
  endDate?: Date | string;
  coordinatorId?: string;
  targetAttendance?: number;
  actualAttendance?: number;
  baptisms?: number;
  decisions?: number;
  imageUrl?: string;
}

/**
 * Update evangelism site input
 */
export type UpdateEvangelismSiteInput = Partial<CreateEvangelismSiteInput>;

/**
 * Evangelism statistics
 */
export interface EvangelismStats {
  totalSites: number;
  totalBaptisms: number;
  totalDecisions: number;
  totalAttendance: number;
  activeSites: number;
  completedSites: number;
}

/**
 * Evangelism site filters
 */
export interface EvangelismSiteFilters {
  page?: number;
  limit?: number;
  status?: EvangelismStatus;
  city?: string;
}
