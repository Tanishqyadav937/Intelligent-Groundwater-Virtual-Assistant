"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status: "Safe" | "Semi-Critical" | "Critical" | "Good" | "Warning" | "Info";
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const isSafe = status === "Safe" || status === "Good";
  const isWarning = status === "Semi-Critical" || status === "Warning";
  const isCritical = status === "Critical";

  const colorStyles = isSafe
    ? "bg-status-safe-light text-emerald-800 border-emerald-200"
    : isWarning
    ? "bg-status-warning-light text-amber-900 border-amber-200"
    : isCritical
    ? "bg-status-critical-light text-red-800 border-red-200"
    : "bg-primary-light text-primary-dark border-blue-200";

  const dotColor = isSafe
    ? "bg-status-safe"
    : isWarning
    ? "bg-status-warning"
    : isCritical
    ? "bg-status-critical"
    : "bg-primary";

  const sizeStyles = size === "sm" ? "px-2 py-0.5 text-xs font-medium" : "px-2.5 py-1 text-xs font-semibold";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border shadow-subtle",
        colorStyles,
        sizeStyles,
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full animate-pulse", dotColor)} />
      {status}
    </span>
  );
}
