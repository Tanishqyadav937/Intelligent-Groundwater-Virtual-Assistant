"use client";

import dynamic from "next/dynamic";
import { Layers, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";

// 1. Load the Leaflet map dynamically with SSR disabled
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-50 text-gray-500 rounded-3xl border border-gray-200 animate-pulse font-sans text-sm font-medium">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        Loading interactive Leaflet groundwater map...
      </div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-divider">
        <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">Interactive Geospatial Aquifer Map</h1>
        <p className="text-xs text-neutral-secondary">Live Leaflet GIS telemetry map for monitoring wells across India</p>
      </div>

      {/* Map Container */}
      <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-neutral-border shadow-elevated relative bg-white">
        <LeafletMap />
      </div>
    </main>
  );
}
