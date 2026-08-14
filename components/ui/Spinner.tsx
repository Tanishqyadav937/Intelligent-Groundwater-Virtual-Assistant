"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Spinner({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizeStyles = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };
  return (
    <div
      className={cn(
        "rounded-full border-primary border-t-transparent animate-spin inline-block",
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading..."
    />
  );
}

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}) {
  const variantStyles = {
    default: "bg-primary-light text-primary-dark border-transparent",
    outline: "bg-transparent text-neutral-secondary border-neutral-border",
    secondary: "bg-background-hover text-neutral-primary border-transparent",
    success: "bg-status-safe-light text-emerald-800 border-transparent",
    warning: "bg-status-warning-light text-amber-900 border-transparent",
    danger: "bg-status-critical-light text-red-800 border-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Avatar({ name, role }: { name: string; role?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-full bg-primary-light text-primary-dark font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">
        {initials}
      </div>
      <div className="hidden md:block text-left">
        <p className="text-xs font-semibold text-neutral-primary leading-tight">{name}</p>
        {role && <p className="text-[11px] text-neutral-secondary">{role}</p>}
      </div>
    </div>
  );
}
