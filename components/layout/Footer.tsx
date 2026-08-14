"use client";

import React from "react";
import Link from "next/link";
import { Droplet } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background-card border-t border-neutral-border py-8 px-4 md:px-8 mt-12 text-xs text-neutral-secondary">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center">
            <Droplet className="w-4 h-4 fill-current" />
          </div>
          <span className="font-semibold text-neutral-primary">INGRES AI Advanced Groundwater Assistant</span>
          <span className="text-neutral-muted">| Ministry of Jal Shakti, Govt. of India</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-secondary">
          <Link href="/reports" className="hover:text-primary transition-colors">
            Telemetry Reports
          </Link>
          <Link href="/map" className="hover:text-primary transition-colors">
            Aquifer Map
          </Link>
          <Link href="/alerts" className="hover:text-primary transition-colors">
            Early Warnings
          </Link>
          <Link href="/settings" className="hover:text-primary transition-colors">
            Accessibility & Privacy
          </Link>
        </div>

        {/* Network performance badge */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Optimized for 2G/3G low-bandwidth sync</span>
        </div>
      </div>
    </footer>
  );
}
