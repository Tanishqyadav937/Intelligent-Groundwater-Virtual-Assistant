"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils";
import { ArrowRight, Droplet } from "lucide-react";

// Fix Leaflet default marker icon asset paths for Next.js SSR/Bundler
const customIcon = (status: "Safe" | "Semi-Critical" | "Critical") => {
  const color =
    status === "Safe" ? "#10B981" : status === "Semi-Critical" ? "#F59E0B" : "#EF4444";

  const svgIcon = `
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27.2 16 42 16 42C16 42 32 27.2 32 16C32 7.163 24.837 0 16 0Z" fill="${color}"/>
      <circle cx="16" cy="16" r="7" fill="white"/>
      <circle cx="16" cy="16" r="4" fill="${color}"/>
    </svg>
  `;

  return L.divIcon({
    className: "custom-leaflet-pin",
    html: svgIcon,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  });
};

export default function LeafletMap() {
  const { districts, selectedDistrictId, setSelectedDistrict } = useGroundwaterStore();

  const centerDistrict = districts.find((d) => d.id === selectedDistrictId) || districts[0];
  const centerPosition: [number, number] = [centerDistrict.lat, centerDistrict.lng];

  useEffect(() => {
    // Clean up default Leaflet icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full rounded-3xl"
        style={{ minHeight: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          {/* Base Light OpenStreetMap Tile */}
          <LayersControl.BaseLayer checked name="OpenStreetMap Light">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* CartoDB Positron (Ultra-Clean Airy Light Theme) */}
          <LayersControl.BaseLayer name="CartoDB Clean Light">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          {/* Optional Overlay: Rain Contours */}
          <LayersControl.Overlay checked name="Monitoring Stations">
            <React.Fragment>
              {districts.map((d) => (
                <Marker
                  key={d.id}
                  position={[d.lat, d.lng]}
                  icon={customIcon(d.status)}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 space-y-2 max-w-xs font-sans">
                      <div className="flex items-center justify-between gap-2 border-b pb-2">
                        <span className="font-extrabold text-sm text-black">{d.name}, {d.state}</span>
                        <StatusBadge status={d.status} size="sm" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-1">
                        <div>
                          <span className="text-gray-500 block text-[10px]">Water Table</span>
                          <span className="font-bold text-blue-600">{formatNumber(d.groundwaterLevel)} m bgl</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-[10px]">Extraction</span>
                          <span className="font-bold text-gray-900">{formatNumber(d.extractionRate)}%</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t flex justify-end">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => setSelectedDistrict(d.id)}
                          className="w-full text-xs h-8"
                          rightIcon={<ArrowRight className="w-3 h-3" />}
                        >
                          Select {d.name}
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
