"use client";

import { create } from "zustand";
import { INDIAN_DISTRICTS, DistrictData, AlertItem, INITIAL_ALERTS, GroundWaterReport, INITIAL_REPORTS } from "@/lib/data";

interface GroundwaterState {
  districts: DistrictData[];
  selectedDistrictId: string;
  comparedDistrictIds: string[];
  alerts: AlertItem[];
  reports: GroundWaterReport[];
  timeRange: '1M' | '3M' | '6M' | '1Y' | 'All';
  
  // Actions
  setSelectedDistrict: (id: string) => void;
  toggleCompareDistrict: (id: string) => void;
  setTimeRange: (range: '1M' | '3M' | '6M' | '1Y' | 'All') => void;
  markAlertAsRead: (id: string) => void;
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
}

export const useGroundwaterStore = create<GroundwaterState>((set) => ({
  districts: INDIAN_DISTRICTS,
  selectedDistrictId: 'jaipur',
  comparedDistrictIds: ['jaipur', 'ludhiana', 'chennai'],
  alerts: INITIAL_ALERTS,
  reports: INITIAL_REPORTS,
  timeRange: '1Y',

  setSelectedDistrict: (id) => set({ selectedDistrictId: id }),

  toggleCompareDistrict: (id) =>
    set((state) => {
      const exists = state.comparedDistrictIds.includes(id);
      if (exists) {
        if (state.comparedDistrictIds.length <= 1) return state; // keep at least 1
        return { comparedDistrictIds: state.comparedDistrictIds.filter((d) => d !== id) };
      } else {
        if (state.comparedDistrictIds.length >= 4) return state; // max 4
        return { comparedDistrictIds: [...state.comparedDistrictIds, id] };
      }
    }),

  setTimeRange: (range) => set({ timeRange: range }),

  markAlertAsRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, status: 'Read' } : a)),
    })),

  acknowledgeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, status: 'Acknowledged' } : a)),
    })),

  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
}));
