"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Droplet, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto py-12">
      <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center shadow-subtle">
        <Droplet className="w-8 h-8 fill-current" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-extrabold text-primary">404</span>
        <h1 className="text-xl font-bold text-neutral-primary">Page Not Found</h1>
        <p className="text-xs text-neutral-secondary">
          The groundwater telemetry page or district route you requested does not exist or has been relocated.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Link href="/dashboard">
          <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
