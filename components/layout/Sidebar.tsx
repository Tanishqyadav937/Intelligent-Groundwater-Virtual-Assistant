"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import {
  LayoutDashboard,
  LineChart,
  GitCompare,
  Bell,
  FileText,
  MapPin,
  Search,
  Settings,
  Home,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Detailed Analysis", href: "/analysis", icon: LineChart },
  { label: "AI Predictor", href: "/predict", icon: Sparkles },
  { label: "Compare Districts", href: "/compare", icon: GitCompare },
  { label: "Alerts & Warnings", href: "/alerts", icon: Bell, hasBadge: true },
  { label: "Reports Builder", href: "/reports", icon: FileText },
  { label: "Geospatial Map", href: "/map", icon: MapPin },
  { label: "AI Search", href: "/search", icon: Search },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();
  const { alerts } = useGroundwaterStore();

  const unreadAlertCount = alerts.filter((a) => a.status === "Unread").length;

  if (!sidebarOpen) return null;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-background-card border-r border-neutral-border h-[calc(100vh-4rem)] sticky top-16 shrink-0 p-4 justify-between transition-all duration-200">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <p className="px-3 text-[11px] font-semibold text-neutral-muted uppercase tracking-wider mb-2">
            Main Navigation
          </p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-light/60 text-primary-dark font-semibold border-l-3 border-primary"
                      : "text-neutral-secondary hover:text-neutral-primary hover:bg-background-hover"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", isActive ? "text-primary-dark" : "text-neutral-muted")} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasBadge && unreadAlertCount > 0 && (
                    <span className="px-1.5 py-0.5 text-xs font-bold bg-status-critical text-white rounded-full">
                      {unreadAlertCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* System Quick Status Widget */}
      <div className="p-3 bg-white border border-neutral-border rounded-lg shadow-subtle space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-neutral-primary">NWIC Telemetry Online</span>
        </div>
        <p className="text-[11px] text-neutral-secondary">
          Connected to Central Ground Water Board (CGWB) telemetry sensors across India.
        </p>
      </div>
    </aside>
  );
}
