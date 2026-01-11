/**
 * Worker Roles Configuration
 * ==========================
 * Defines the hierarchy and display properties for all worker roles.
 * Order matters: Lower index = Higher hierarchy = Displayed first.
 * 
 * "Let the elders who rule well be counted worthy of double honor." — 1 Timothy 5:17
 */

import type { WorkerRole } from "./validators";

// ============================================================================
// Role Hierarchy (Order determines display priority)
// ============================================================================

export const WORKER_ROLE_HIERARCHY: WorkerRole[] = [
  // Conference Leadership (Highest Honor)
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
];

// ============================================================================
// Role Display Labels
// ============================================================================

export const WORKER_ROLE_LABELS: Record<WorkerRole, string> = {
  // Conference Leadership
  PRESIDENT: "Conference President",
  EXECUTIVE_SECRETARY: "Executive Secretary",
  TREASURER: "Conference Treasurer",
  
  // Pastoral Ministry
  SENIOR_PASTOR: "Senior Pastor",
  ASSOCIATE_PASTOR: "Associate Pastor",
  DISTRICT_PASTOR: "District Pastor",
  INTERN_PASTOR: "Intern Pastor",
  
  // Church Elders
  FIRST_ELDER: "First Elder",
  SECOND_ELDER: "Second Elder",
  ELDER: "Elder",
  
  // Deacons & Deaconesses
  HEAD_DEACON: "Head Deacon",
  DEACON: "Deacon",
  HEAD_DEACONESS: "Head Deaconess",
  DEACONESS: "Deaconess",
  
  // Music Ministry
  MUSIC_DIRECTOR: "Music Director",
  CHOIR_LEADER: "Choir Leader",
  ORGANIST: "Organist",
  CHOIR_MEMBER: "Choir Member",
  
  // Sabbath School
  SS_SUPERINTENDENT: "Sabbath School Superintendent",
  SS_SECRETARY: "Sabbath School Secretary",
  SS_TEACHER: "Sabbath School Teacher",
  
  // Youth Ministry
  AY_DIRECTOR: "Adventist Youth Director",
  AY_ASSOCIATE: "Adventist Youth Associate",
  PATHFINDER_DIRECTOR: "Pathfinder Director",
  PATHFINDER_DEPUTY: "Pathfinder Deputy Director",
  ADVENTURER_DIRECTOR: "Adventurer Director",
  MASTER_GUIDE: "Master Guide",
  
  // Women & Family Ministry
  WM_LEADER: "Women's Ministry Leader",
  WM_ASSOCIATE: "Women's Ministry Associate",
  FM_LEADER: "Family Ministry Leader",
  
  // Children's Ministry
  CHILDREN_DIRECTOR: "Children's Ministry Director",
  CHILDREN_TEACHER: "Children's Ministry Teacher",
  
  // Communication & Media
  COMMUNICATION_DIRECTOR: "Communication Director",
  MEDIA_DIRECTOR: "Media Director",
  SOUND_ENGINEER: "Sound Engineer",
  CAMERA_OPERATOR: "Camera Operator",
  
  // Other Departments
  HEALTH_DIRECTOR: "Health Ministry Director",
  EDUCATION_DIRECTOR: "Education Director",
  STEWARDSHIP_DIRECTOR: "Stewardship Director",
  PERSONAL_MINISTRIES_DIRECTOR: "Personal Ministries Director",
  PUBLISHING_DIRECTOR: "Publishing Director",
  
  // Church Officers
  CHURCH_CLERK: "Church Clerk",
  CHURCH_TREASURER: "Church Treasurer",
  INTEREST_COORDINATOR: "Interest Coordinator",
  
  // General Workers
  USHER: "Usher",
  GREETER: "Greeter",
  SECURITY: "Security",
  VOLUNTEER: "Volunteer",
};

// ============================================================================
// Role Categories (for grouping in UI)
// ============================================================================

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

export const ROLE_CATEGORIES: Record<RoleCategory, {
  label: string;
  description: string;
  roles: WorkerRole[];
}> = {
  LEADERSHIP: {
    label: "Conference Leadership",
    description: "Those who lead our conference",
    roles: ["PRESIDENT", "EXECUTIVE_SECRETARY", "TREASURER"],
  },
  PASTORAL: {
    label: "Pastoral Ministry",
    description: "Our shepherds who feed the flock",
    roles: ["SENIOR_PASTOR", "ASSOCIATE_PASTOR", "DISTRICT_PASTOR", "INTERN_PASTOR"],
  },
  ELDERS: {
    label: "Church Elders",
    description: "Servant leaders of the congregation",
    roles: ["FIRST_ELDER", "SECOND_ELDER", "ELDER"],
  },
  DEACONS: {
    label: "Deacons & Deaconesses",
    description: "Those who serve the church body",
    roles: ["HEAD_DEACON", "DEACON", "HEAD_DEACONESS", "DEACONESS"],
  },
  MUSIC: {
    label: "Music Ministry",
    description: "Leading us in worship through song",
    roles: ["MUSIC_DIRECTOR", "CHOIR_LEADER", "ORGANIST", "CHOIR_MEMBER"],
  },
  SABBATH_SCHOOL: {
    label: "Sabbath School",
    description: "Teaching and studying God's Word",
    roles: ["SS_SUPERINTENDENT", "SS_SECRETARY", "SS_TEACHER"],
  },
  YOUTH: {
    label: "Youth Ministry",
    description: "Nurturing the next generation",
    roles: [
      "AY_DIRECTOR", "AY_ASSOCIATE", 
      "PATHFINDER_DIRECTOR", "PATHFINDER_DEPUTY",
      "ADVENTURER_DIRECTOR", "MASTER_GUIDE"
    ],
  },
  WOMEN_FAMILY: {
    label: "Women & Family Ministry",
    description: "Strengthening homes and families",
    roles: ["WM_LEADER", "WM_ASSOCIATE", "FM_LEADER"],
  },
  CHILDREN: {
    label: "Children's Ministry",
    description: "Training up children in the way they should go",
    roles: ["CHILDREN_DIRECTOR", "CHILDREN_TEACHER"],
  },
  MEDIA: {
    label: "Communication & Media",
    description: "Sharing our message with the world",
    roles: ["COMMUNICATION_DIRECTOR", "MEDIA_DIRECTOR", "SOUND_ENGINEER", "CAMERA_OPERATOR"],
  },
  DEPARTMENTS: {
    label: "Department Directors",
    description: "Leading specialized ministries",
    roles: [
      "HEALTH_DIRECTOR", "EDUCATION_DIRECTOR", 
      "STEWARDSHIP_DIRECTOR", "PERSONAL_MINISTRIES_DIRECTOR", 
      "PUBLISHING_DIRECTOR"
    ],
  },
  OFFICERS: {
    label: "Church Officers",
    description: "Managing church operations",
    roles: ["CHURCH_CLERK", "CHURCH_TREASURER", "INTEREST_COORDINATOR"],
  },
  GENERAL: {
    label: "General Workers",
    description: "Serving in various capacities",
    roles: ["USHER", "GREETER", "SECURITY", "VOLUNTEER"],
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the hierarchy order for a role (lower = higher priority)
 */
export function getRoleHierarchyOrder(role: WorkerRole): number {
  const index = WORKER_ROLE_HIERARCHY.indexOf(role);
  return index === -1 ? WORKER_ROLE_HIERARCHY.length : index;
}

/**
 * Get the display label for a role
 */
export function getRoleLabel(role: WorkerRole): string {
  return WORKER_ROLE_LABELS[role] || role.replace(/_/g, " ");
}

/**
 * Get the category for a role
 */
export function getRoleCategory(role: WorkerRole): RoleCategory | null {
  for (const [category, data] of Object.entries(ROLE_CATEGORIES)) {
    if (data.roles.includes(role)) {
      return category as RoleCategory;
    }
  }
  return null;
}

/**
 * Check if a role is a leadership/pastoral role (featured prominently)
 */
export function isLeadershipRole(role: WorkerRole): boolean {
  const leadershipRoles: WorkerRole[] = [
    "PRESIDENT",
    "EXECUTIVE_SECRETARY",
    "TREASURER",
    "SENIOR_PASTOR",
    "ASSOCIATE_PASTOR",
    "DISTRICT_PASTOR",
    "FIRST_ELDER",
    "SECOND_ELDER",
  ];
  return leadershipRoles.includes(role);
}

/**
 * Sort workers by role hierarchy
 */
export function sortWorkersByHierarchy<T extends { role: WorkerRole }>(workers: T[]): T[] {
  return [...workers].sort((a, b) => {
    return getRoleHierarchyOrder(a.role) - getRoleHierarchyOrder(b.role);
  });
}

/**
 * Group workers by their role category
 */
export function groupWorkersByCategory<T extends { role: WorkerRole }>(
  workers: T[]
): Map<RoleCategory, T[]> {
  const groups = new Map<RoleCategory, T[]>();
  
  for (const worker of workers) {
    const category = getRoleCategory(worker.role);
    if (category) {
      const existing = groups.get(category) || [];
      groups.set(category, [...existing, worker]);
    }
  }
  
  // Sort workers within each group by hierarchy
  for (const [category, categoryWorkers] of groups.entries()) {
    groups.set(category, sortWorkersByHierarchy(categoryWorkers));
  }
  
  return groups;
}

/**
 * Get all roles as options for a select dropdown
 */
export function getRoleOptions(): Array<{ value: WorkerRole; label: string }> {
  return WORKER_ROLE_HIERARCHY.map((role) => ({
    value: role,
    label: WORKER_ROLE_LABELS[role],
  }));
}

/**
 * Get roles grouped by category for a grouped select
 */
export function getGroupedRoleOptions(): Array<{
  category: string;
  options: Array<{ value: WorkerRole; label: string }>;
}> {
  return Object.entries(ROLE_CATEGORIES).map(([, data]) => ({
    category: data.label,
    options: data.roles.map((role) => ({
      value: role,
      label: WORKER_ROLE_LABELS[role],
    })),
  }));
}
