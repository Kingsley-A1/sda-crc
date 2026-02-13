/**
 * API Client — Fetches data from the sda-crc-backend server
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOpts } = options;

  let url = `${API_BASE}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) searchParams.set(key, String(val));
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    ...fetchOpts,
    headers: {
      "Content-Type": "application/json",
      ...fetchOpts.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "API request failed" }));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}

// ─── PUBLIC API METHODS ───

export const api = {
  // Sermons
  getSermons: (params?: { page?: number; limit?: number; search?: string }) =>
    fetchAPI<{ data: Sermon[]; total: number }>("/sermons", { params, next: { revalidate: 60 } }),

  getSermon: (id: string) =>
    fetchAPI<Sermon>(`/sermons/${id}`, { next: { revalidate: 60 } }),

  // Events
  getEvents: (params?: { page?: number; limit?: number; category?: string }) =>
    fetchAPI<{ data: Event[]; total: number }>("/events", { params, next: { revalidate: 60 } }),

  getEvent: (id: string) =>
    fetchAPI<Event>(`/events/${id}`, { next: { revalidate: 60 } }),

  // Departments
  getDepartments: () =>
    fetchAPI<{ data: Department[] }>("/departments", { next: { revalidate: 120 } }),

  getDepartment: (id: string) =>
    fetchAPI<Department>(`/departments/${id}`, { next: { revalidate: 120 } }),

  // Workers
  getWorkers: () =>
    fetchAPI<{ data: Worker[] }>("/workers", { next: { revalidate: 120 } }),

  // Small Groups
  getSmallGroups: () =>
    fetchAPI<{ data: SmallGroup[] }>("/small-groups", { next: { revalidate: 120 } }),

  // Settings
  getSettings: () =>
    fetchAPI<SiteSettings>("/settings", { next: { revalidate: 300 } }),

  // Contact form
  submitContact: (data: ContactFormData) =>
    fetchAPI<{ success: boolean }>("/contact", { method: "POST", body: JSON.stringify(data) }),

  // Soul pledge
  submitPledge: (data: PledgeFormData) =>
    fetchAPI<{ success: boolean }>("/soul-pledges", { method: "POST", body: JSON.stringify(data) }),

  // Membership
  submitMembership: (data: MemberFormData) =>
    fetchAPI<{ success: boolean }>("/members", { method: "POST", body: JSON.stringify(data) }),
};

// ─── TYPES (mirrored from backend) ───

export interface Sermon {
  id: string;
  title: string;
  slug: string;
  preacher: string;
  date: string;
  description: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  thumbnailUrl: string | null;
  duration: number | null;
  seriesName: string | null;
  isPublished: boolean;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string | null;
  location: string;
  category: string;
  imageUrl: string | null;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  mission: string | null;
  imageUrl: string | null;
  leaderName: string | null;
  leaderTitle: string | null;
  leaderImage: string | null;
  meetingSchedule: string | null;
  isActive: boolean;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  title: string | null;
  imageUrl: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
  isActive: boolean;
  hierarchyOrder: number;
}

export interface SmallGroup {
  id: string;
  name: string;
  leader: string;
  location: string;
  meetingDay: string;
  meetingTime: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  maxMembers: number;
  currentMembers: number;
  isActive: boolean;
}

export interface SiteSettings {
  id: string;
  conferenceName: string;
  tagline: string | null;
  liveStreamUrl: string | null;
  isLiveNow: boolean;
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category?: string;
}

export interface PledgeFormData {
  name: string;
  phone: string;
  email?: string;
  commitment: string;
}

export interface MemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth?: string;
  address?: string;
  membershipType: string;
  previousChurch?: string;
  isWorker: boolean;
  workerRole?: string;
}
