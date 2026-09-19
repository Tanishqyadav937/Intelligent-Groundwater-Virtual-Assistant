"use client";

import React, { useState } from "react";
import { useSupabaseAlerts } from "@/hooks/useSupabaseAlerts";
import {
  Alert,
  SeverityColors,
  SeverityBadges,
  SeverityLabels,
} from "@/lib/alertTypes";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import {
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Wifi,
  WifiOff,
  Clock,
  MapPin,
  Zap,
  TrendingDown,
} from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

interface AlertsFeedProps {
  districtId?: string;
  severity?: "CRITICAL" | "WARNING" | "INFO";
  limit?: number;
  showFilters?: boolean;
}

export const AlertsFeed: React.FC<AlertsFeedProps> = ({
  districtId,
  severity,
  limit = 50,
  showFilters = true,
}) => {
  const {
    alerts,
    loading,
    error,
    isConnected,
    acknowledgeAlert,
    refresh,
  } = useSupabaseAlerts({ districtId, severity, limit });

  const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
  const [acknowledging, setAcknowledging] = useState<number | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const handleAcknowledge = async (alertId: number) => {
    setAcknowledging(alertId);
    try {
      await acknowledgeAlert(alertId, userId);
    } catch (err) {
      console.error("Failed to acknowledge alert:", err);
    } finally {
      setAcknowledging(null);
    }
  };

  // Filter alerts by selected severity (client-side filtering for demo)
  const filteredAlerts = selectedSeverity
    ? alerts.filter((a) => a.severity === selectedSeverity)
    : alerts;

  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL").length;
  const warningCount = alerts.filter((a) => a.severity === "WARNING").length;
  const infoCount = alerts.filter((a) => a.severity === "INFO").length;

  if (loading && alerts.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <Spinner size="lg" />
        <span className="ml-3 text-sm text-neutral-secondary">
          Loading alerts...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Card variant="alert" className="border-l-status-critical bg-red-50/70 border-red-200">
        <div className="flex gap-3 items-start p-4">
          <WifiOff className="w-5 h-5 text-status-critical shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-red-900">Connection Error</h3>
            <p className="text-xs text-red-800 leading-relaxed">{error}</p>
            <p className="text-[11px] text-red-600 mt-2">
              Make sure Supabase is configured in your environment variables.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={refresh}
              leftIcon={<RefreshCw className="w-3 h-3" />}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modern Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 shadow-xl">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  Live Alerts Feed
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-blue-100">
                    {filteredAlerts.length} active alert{filteredAlerts.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-blue-200/50">•</span>
                  <div className="flex items-center gap-1.5">
                    {isConnected ? (
                      <>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-emerald-200 font-medium">
                          Real-time connected
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-xs text-amber-200 font-medium">
                          Connecting...
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={refresh}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Modern Stats Cards with Gradient Borders */}
      <div className="grid grid-cols-3 gap-4">
        <Card
          variant="status"
          className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
            selectedSeverity === "CRITICAL" 
              ? "ring-2 ring-red-500 shadow-lg shadow-red-100" 
              : ""
          }`}
          onClick={() =>
            setSelectedSeverity(selectedSeverity === "CRITICAL" ? null : "CRITICAL")
          }
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <span className="text-2xl">{SeverityBadges.CRITICAL}</span>
              </div>
              <div>
                <p className="text-xs text-neutral-secondary font-semibold uppercase tracking-wide">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
            </div>
            {criticalCount > 0 && (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
          </div>
        </Card>

        <Card
          variant="status"
          className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
            selectedSeverity === "WARNING" 
              ? "ring-2 ring-amber-500 shadow-lg shadow-amber-100" 
              : ""
          }`}
          onClick={() =>
            setSelectedSeverity(selectedSeverity === "WARNING" ? null : "WARNING")
          }
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <span className="text-2xl">{SeverityBadges.WARNING}</span>
              </div>
              <div>
                <p className="text-xs text-neutral-secondary font-semibold uppercase tracking-wide">Warning</p>
                <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card
          variant="status"
          className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
            selectedSeverity === "INFO" 
              ? "ring-2 ring-blue-500 shadow-lg shadow-blue-100" 
              : ""
          }`}
          onClick={() => setSelectedSeverity(selectedSeverity === "INFO" ? null : "INFO")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="text-2xl">{SeverityBadges.INFO}</span>
              </div>
              <div>
                <p className="text-xs text-neutral-secondary font-semibold uppercase tracking-wide">Info</p>
                <p className="text-2xl font-bold text-blue-600">{infoCount}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <Card variant="status" className="p-12 text-center border-dashed bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-4">
            <AlertTriangle className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-neutral-primary mb-1">
            No alerts to display
          </p>
          <p className="text-xs text-neutral-secondary">
            {selectedSeverity 
              ? `No ${SeverityLabels[selectedSeverity as keyof typeof SeverityLabels]} alerts found` 
              : "All systems operating normally"}
          </p>
          {selectedSeverity && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedSeverity(null)}
              className="mt-4"
            >
              Clear Filter
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              variant="alert"
              className={`border-l-4 ${SeverityColors[alert.severity]} transition-all hover:shadow-lg hover:-translate-y-0.5 duration-200`}
            >
              <div className="flex gap-4 items-start p-5">
                {/* Icon & Badge with Animation */}
                <div className="shrink-0">
                  <div className={`p-3 rounded-xl ${
                    alert.severity === 'CRITICAL' ? 'bg-red-50' :
                    alert.severity === 'WARNING' ? 'bg-amber-50' : 'bg-blue-50'
                  }`}>
                    <span className="text-3xl">{SeverityBadges[alert.severity]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                          alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                          alert.severity === 'WARNING' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {SeverityLabels[alert.severity]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-muted" />
                        <p className="text-sm font-semibold text-neutral-primary">
                          {alert.district_id}
                        </p>
                      </div>
                    </div>

                    {alert.metric_type && (
                      <div className="text-right bg-gray-50 px-3 py-2 rounded-lg">
                        <p className="text-[10px] text-neutral-muted uppercase tracking-wide">{alert.metric_type}</p>
                        <p className="text-lg font-bold text-neutral-primary">
                          {alert.metric_value?.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="text-sm font-medium text-neutral-primary leading-relaxed mt-3">
                    {alert.message}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-border">
                    <div className="flex items-center gap-1 text-xs text-neutral-muted">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatDistanceToNow(new Date(alert.triggered_at))}
                      </span>
                    </div>

                    {alert.acknowledged_at ? (
                      <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>
                          Acknowledged by {alert.acknowledged_by}
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleAcknowledge(alert.id)}
                        isLoading={acknowledging === alert.id}
                        leftIcon={<CheckCircle2 className="w-3 h-3" />}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
