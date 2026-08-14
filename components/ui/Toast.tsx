"use client";

import React from "react";
import { useUIStore } from "@/store/useUIStore";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
      {toasts.map((toast) => {
        const type = toast.type || "info";

        const iconMap = {
          success: <CheckCircle2 className="w-5 h-5 text-status-safe shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-status-critical shrink-0" />,
          info: <Info className="w-5 h-5 text-primary shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 p-4 bg-white rounded-lg shadow-elevated border border-neutral-border animate-in slide-in-from-bottom-2 duration-200"
            )}
          >
            {iconMap[type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-neutral-primary">{toast.title}</h4>
              {toast.description && <p className="text-xs text-neutral-secondary mt-0.5">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-muted hover:text-neutral-primary p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
