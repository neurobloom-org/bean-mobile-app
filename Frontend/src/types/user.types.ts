// Type definitions for the user profile domain.

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  profilePhotoUri?: string;
  guardianPhone?: string;
  createdAt?: string;
}

export interface GuardianProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  organisation?: string;
  specialisation?: string;
  profilePhotoUri?: string;
  wardUserId?: string;
  createdAt?: string;
}

export interface MoodEntry {
  date: string; // ISO date string e.g. '2026-03-29'
  score: number; // 0–10
  note?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}
