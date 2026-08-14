"use client";

import { create } from "zustand";

export type UserRole = 'Farmer' | 'Official' | 'Researcher';

interface UserState {
  name: string;
  email: string;
  role: UserRole;
  region: string;
  language: string;
  theme: 'Light' | 'Dark';
  units: 'SI' | 'Imperial';
  emailNotifications: boolean;
  smsAlerts: boolean;
  criticalOnly: boolean;
  notificationFrequency: 'Instant' | 'Daily Summary' | 'Weekly Summary';

  // Actions
  updateProfile: (profile: Partial<Omit<UserState, 'updateProfile'>>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "Rajesh Kumar",
  email: "rajesh.kumar@ingres.gov.in",
  role: "Farmer",
  region: "Jaipur, Rajasthan",
  language: "English",
  theme: "Light",
  units: "SI",
  emailNotifications: true,
  smsAlerts: true,
  criticalOnly: false,
  notificationFrequency: "Instant",

  updateProfile: (updates) => set((state) => ({ ...state, ...updates })),
}));
