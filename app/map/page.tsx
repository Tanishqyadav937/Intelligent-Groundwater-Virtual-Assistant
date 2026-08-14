"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Checkbox } from "@/components/ui/Toggle";
import { MapPin, Layers, ZoomIn, ZoomOut, Compass, ArrowRight, Eye, Droplet } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function MapPage() {
  const { districts, setSelectedDistrict } = useGroundwaterStore();
  const [selectedStation, setSelectedStation] = useState<typeof districts[0] | null>(districts[0]);
  const [layers, setLayers] = useState({
    groundwater: true,
    rainfall: true,
    irrigation: false,
    population: false,
  });

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleLayerToggle = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-divider">
        <div>
          <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">Interactive Geospatial Aquifer Map</h1>
          <p className="text-xs text-neutral-secondary">Lightweight vector GIS viewer for Indian groundwater telemetry stations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Layer Controls & Legend */}
        <Card className="p-5 space-y-5 bg-white border-neutral-border h-fit">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-neutral-primary flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              Toggle Map Layers
            </h2>
            <p className="text-xs text-neutral-secondary">Select telemetry overlays</p>
          </div>

          <div className="space-y-3 pt-2 border-t border-neutral-divider">
            <Checkbox
              label="Groundwater Monitoring Stations"
              checked={layers.groundwater}
              onChange={() => handleLayerToggle("groundwater")}
            />
            <Checkbox
              label="Monsoon Rainfall Contours"
              checked={layers.rainfall}
              onChange={() => handleLayerToggle("rainfall")}
            />
            <Checkbox
              label="Canal & Irrigation Command Areas"
              checked={layers.irrigation}
              onChange={() => handleLayerToggle("irrigation")}
            />
            <Checkbox
              label="Agricultural Population Density"
              checked={layers.population}
              onChange={() => handleLayerToggle("population")}
            />
          </div>

          {/* Map Legend */}
          <div className="space-y-2 pt-4 border-t border-neutral-divider">
            <h3 className="text-xs font-semibold text-neutral-primary">Telemetry Status Legend</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-status-safe"></span>
                <span>Safe (&lt;70% extraction)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-status-warning"></span>
                <span>Semi-Critical (70-100%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-status-critical"></span>
                <span>Critical / Over-Exploited (&gt;100%)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column: Main Map Surface */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="relative p-0 overflow-hidden bg-[#F0F4F8] border-neutral-border h-[480px] rounded-xl shadow-subtle flex flex-col justify-between">
            {/* Map Canvas Background (Light SVG Stylized Map of India) */}
            <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 800 600" className="w-full h-full stroke-blue-200 fill-blue-50/50">
                <path d="M 200,100 Q 300,50 400,100 T 600,200 T 500,450 T 350,550 T 250,400 T 150,250 Z" strokeWidth="2" />
                <path d="M 250,180 Q 350,150 450,220" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 300,300 Q 400,280 500,350" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Floating Map Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 bg-white border border-neutral-border rounded-lg p-1 shadow-subtle">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
                className="p-1.5 hover:bg-background-hover rounded text-neutral-primary"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="p-1.5 hover:bg-background-hover rounded text-neutral-primary"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive District Pins overlay */}
            <div
              className="relative w-full h-full transition-transform duration-300 flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {districts.map((d, index) => {
                const isSelected = selectedStation?.id === d.id;

                // Relative pixel positioning based on lat/lng
                const leftPos = `${((d.lng - 70) / 15) * 60 + 20}%`;
                const topPos = `${((35 - d.lat) / 25) * 60 + 20}%`;

                const badgeBg =
                  d.status === "Safe"
                    ? "bg-status-safe"
                    : d.status === "Semi-Critical"
                    ? "bg-status-warning"
                    : "bg-status-critical";

                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedStation(d)}
                    style={{ left: leftPos, top: topPos }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`w-4 h-4 rounded-full ${badgeBg} animate-ping opacity-75 absolute`} />
                      <div
                        className={`w-6 h-6 rounded-full ${badgeBg} text-white font-bold text-[10px] flex items-center justify-center shadow-elevated border-2 border-white transition-transform ${
                          isSelected ? "scale-125 ring-2 ring-primary" : "group-hover:scale-110"
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                    <span className="mt-1 block text-[10px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-subtle border border-neutral-border whitespace-nowrap text-neutral-primary">
                      {d.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Station Details Card overlay */}
            {selectedStation && (
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-xs border border-neutral-border rounded-lg p-4 shadow-elevated animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-neutral-primary">
                        {selectedStation.name} Station, {selectedStation.state}
                      </h3>
                      <StatusBadge status={selectedStation.status} size="sm" />
                    </div>
                    <p className="text-xs text-neutral-secondary">
                      Water Table Depth: <span className="font-semibold text-primary">{formatNumber(selectedStation.groundwaterLevel)} m bgl</span> | Extraction: <span className="font-semibold text-neutral-primary">{selectedStation.extractionRate}%</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link href="/dashboard">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setSelectedDistrict(selectedStation.id)}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        Set as Active Region
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
