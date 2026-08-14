"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-neutral-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full h-11 sm:h-10 px-3 pr-8 bg-white text-neutral-primary border border-neutral-border rounded-md text-sm appearance-none cursor-pointer transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              error && "border-status-critical focus:ring-status-critical",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-muted pointer-events-none" />
        </div>
        {error && <p className="text-xs text-status-critical">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
