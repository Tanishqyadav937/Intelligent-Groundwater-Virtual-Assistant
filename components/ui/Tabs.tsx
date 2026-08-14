"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex border-b border-neutral-border overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 py-2.5 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors min-h-[44px]",
              isActive
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-neutral-secondary hover:text-neutral-primary hover:bg-background-hover"
            )}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded-full font-normal",
                  isActive ? "bg-primary-light text-primary-dark" : "bg-neutral-divider text-neutral-secondary"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
