"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("INGRES AI Telemetry Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto py-12">
      <div className="w-16 h-16 rounded-full bg-status-critical-light text-status-critical flex items-center justify-center shadow-subtle">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-extrabold text-status-critical">500</span>
        <h1 className="text-xl font-bold text-neutral-primary">Telemetry Server Exception</h1>
        <p className="text-xs text-neutral-secondary">
          An unexpected error occurred while processing groundwater sensor streams.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="primary" onClick={() => reset()} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Retry Connection
        </Button>
        <Link href="/dashboard">
          <Button variant="outline" leftIcon={<Home className="w-4 h-4" />}>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
