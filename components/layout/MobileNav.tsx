"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { NAV_ITEMS } from "./Sidebar";
import { LayoutDashboard, LineChart, GitCompare, Bell, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { alerts } = useGroundwaterStore();
  const unreadAlerts = alerts.filter((a) => a.status === "Unread").length;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  // Bottom navigation tab bar items (5 max for mobile)
  const BOTTOM_TABS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analysis", href: "/analysis", icon: LineChart },
    { label: "Compare", href: "/compare", icon: GitCompare },
    { label: "Alerts", href: "/alerts", icon: Bell, badge: unreadAlerts },
    { label: "Map", href: "/map", icon: MapPin },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative z-10 w-4/5 max-w-xs bg-white h-full border-r border-neutral-border p-4 flex flex-col justify-between shadow-elevated animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-divider mb-4">
                <span className="font-bold text-base text-neutral-primary">INGRES AI Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-neutral-muted hover:text-neutral-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium transition-colors min-h-[48px]",
                        isActive
                          ? "bg-primary-light text-primary-dark font-semibold"
                          : "text-neutral-primary hover:bg-background-hover"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <span>{item.label}</span>
                      </div>
                      {item.hasBadge && unreadAlerts > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-status-critical text-white rounded-full">
                          {unreadAlerts}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-border flex items-center justify-around h-16 px-1 shadow-elevated">
        {BOTTOM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full text-[11px] font-medium transition-colors",
                isActive ? "text-primary font-semibold" : "text-neutral-secondary hover:text-neutral-primary"
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-0.5" />
                {tab.badge ? (
                  <span className="absolute -top-1 -right-2 px-1 text-[9px] font-bold bg-status-critical text-white rounded-full">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
