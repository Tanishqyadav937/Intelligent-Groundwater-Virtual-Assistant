"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({ isOpen, onClose, title, children, footer, size = "md" }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative z-10 w-full bg-white rounded-lg shadow-elevated border border-neutral-border p-6 space-y-4 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200",
          sizeStyles[size]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-divider">
          {title && <h2 className="text-lg font-semibold text-neutral-primary">{title}</h2>}
          <button
            onClick={onClose}
            className="p-1 text-neutral-muted hover:text-neutral-primary hover:bg-background-hover rounded-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-1 text-sm text-neutral-primary">{children}</div>

        {/* Footer */}
        {footer && <div className="pt-3 border-t border-neutral-divider flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
