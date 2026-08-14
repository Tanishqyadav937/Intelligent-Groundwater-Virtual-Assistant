"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { useUserStore } from "@/store/useUserStore";
import { useUIStore } from "@/store/useUIStore";
import { Droplet, Search, Bell, Menu, X, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/Spinner";

export function Header() {
  const router = useRouter();
  const { alerts, districts, selectedDistrictId, setSelectedDistrict } = useGroundwaterStore();
  const { name, role } = useUserStore();
  const { mobileMenuOpen, toggleMobileMenu, toggleSidebar } = useUIStore();

  const unreadAlerts = alerts.filter((a) => a.status === "Unread").length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-border shadow-subtle h-16 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-neutral-secondary hover:text-neutral-primary hover:bg-background-hover rounded-md"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-2 text-neutral-secondary hover:text-neutral-primary hover:bg-background-hover rounded-md"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
            <Droplet className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-neutral-primary tracking-tight">INGRES AI</span>
              <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-primary-light text-primary-dark rounded uppercase">
                Adv
              </span>
            </div>
            <p className="text-[10px] text-neutral-secondary hidden sm:block">India Groundwater Assistant</p>
          </div>
        </Link>
      </div>

      {/* Middle: AI Search Bar Shortcut */}
      <div className="hidden lg:flex flex-1 max-w-md mx-4">
        <div
          onClick={() => router.push("/search")}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 bg-background-card border border-neutral-border rounded-lg text-xs text-neutral-muted cursor-pointer hover:bg-background-hover hover:border-neutral-muted/40 transition-colors"
        >
          <Search className="w-4 h-4 text-primary shrink-0" />
          <span className="flex-1 truncate">Ask about your water... (e.g., &quot;Groundwater in Jaipur&quot;)</span>
          <span className="px-1.5 py-0.5 bg-white border border-neutral-border rounded text-[10px] font-mono text-neutral-secondary flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> AI
          </span>
        </div>
      </div>

      {/* Right: Region Select, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* District Switcher */}
        <select
          value={selectedDistrictId}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="hidden sm:block text-xs font-medium bg-background-card text-neutral-primary border border-neutral-border rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              📍 {d.name}, {d.state}
            </option>
          ))}
        </select>

        {/* Notifications Icon */}
        <Link
          href="/alerts"
          className="relative p-2 text-neutral-secondary hover:text-neutral-primary hover:bg-background-hover rounded-md transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-status-critical text-white font-bold text-[10px] rounded-full flex items-center justify-center">
              {unreadAlerts}
            </span>
          )}
        </Link>

        {/* User Profile */}
        <Link href="/settings" className="hover:opacity-90 transition-opacity">
          <Avatar name={name} role={role} />
        </Link>
      </div>
    </header>
  );
}
