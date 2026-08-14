"use client";

import React, { useState } from "react";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { useUserStore } from "@/store/useUserStore";
import { useUIStore } from "@/store/useUIStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toggle, Checkbox } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Bell, ShieldAlert, Check, Trash2, Mail, Phone, Settings } from "lucide-react";

export default function AlertsPage() {
  const { alerts, markAlertAsRead, acknowledgeAlert, dismissAlert } = useGroundwaterStore();
  const {
    emailNotifications,
    smsAlerts,
    criticalOnly,
    notificationFrequency,
    updateProfile,
  } = useUserStore();
  const { addToast } = useUIStore();

  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const displayedAlerts = activeTab === "unread" ? alerts.filter((a) => a.status === "Unread") : alerts;

  const handleAcknowledge = (id: string, district: string) => {
    acknowledgeAlert(id);
    addToast({ title: "Alert Acknowledged", description: `Acknowledged hazard report for ${district}.`, type: "success" });
  };

  const handleDismiss = (id: string) => {
    dismissAlert(id);
    addToast({ title: "Alert Dismissed", description: "Removed alert from feed.", type: "info" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-divider">
        <div>
          <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">Alerts & Warning System</h1>
          <p className="text-xs text-neutral-secondary">Real-time hazard notifications, critical depletion thresholds, and notification controls</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Alert History Log */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === "all" ? "bg-primary text-white" : "bg-background-hover text-neutral-secondary"
                }`}
              >
                All Alerts ({alerts.length})
              </button>
              <button
                onClick={() => setActiveTab("unread")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === "unread" ? "bg-primary text-white" : "bg-background-hover text-neutral-secondary"
                }`}
              >
                Unread ({alerts.filter((a) => a.status === "Unread").length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {displayedAlerts.length === 0 ? (
              <Card className="p-8 text-center text-neutral-secondary space-y-2">
                <ShieldAlert className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-semibold">No active alerts</p>
                <p className="text-xs">Your region hydro-geology status is stable.</p>
              </Card>
            ) : (
              displayedAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  variant="alert"
                  className={`p-4 space-y-3 ${
                    alert.severity === "Critical"
                      ? "border-l-status-critical"
                      : alert.severity === "Warning"
                      ? "border-l-status-warning"
                      : "border-l-primary"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={alert.severity} size="sm" />
                      <span className="text-xs font-bold text-neutral-primary">{alert.district} District</span>
                      <span className="text-[11px] text-neutral-muted">• {alert.date}</span>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        alert.status === "Unread"
                          ? "bg-red-100 text-red-700"
                          : alert.status === "Acknowledged"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-primary font-medium leading-relaxed">{alert.message}</p>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-divider">
                    {alert.status !== "Acknowledged" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAcknowledge(alert.id, alert.district)}
                        leftIcon={<Check className="w-3.5 h-3.5 text-emerald-600" />}
                      >
                        Acknowledge
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismiss(alert.id)}
                      leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                    >
                      Dismiss
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Notification Settings */}
        <Card className="p-6 space-y-5 bg-white border-neutral-border h-fit">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-neutral-primary flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              Alert Notification Settings
            </h2>
            <p className="text-xs text-neutral-secondary">Configure automated channels for emergency water telemetry</p>
          </div>

          <div className="space-y-4 pt-2 border-t border-neutral-divider">
            {/* Email Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-neutral-primary">Email Notifications</span>
              </div>
              <Toggle
                checked={emailNotifications}
                onChange={(val) => {
                  updateProfile({ emailNotifications: val });
                  addToast({ title: "Preference Saved", description: `Email alerts ${val ? "enabled" : "disabled"}.` });
                }}
              />
            </div>

            {/* SMS Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-neutral-primary">SMS Telemetry Broadcast</span>
              </div>
              <Toggle
                checked={smsAlerts}
                onChange={(val) => {
                  updateProfile({ smsAlerts: val });
                  addToast({ title: "Preference Saved", description: `SMS broadcasts ${val ? "enabled" : "disabled"}.` });
                }}
              />
            </div>

            {/* Critical Checkbox */}
            <div className="pt-2">
              <Checkbox
                label="Only notify for Critical severity risks"
                checked={criticalOnly}
                onChange={(e) => {
                  updateProfile({ criticalOnly: e.target.checked });
                  addToast({ title: "Preference Saved", description: "Critical filter updated." });
                }}
              />
            </div>

            {/* Frequency Select */}
            <div className="pt-2">
              <Select
                label="Broadcast Frequency"
                value={notificationFrequency}
                onChange={(e: any) => {
                  updateProfile({ notificationFrequency: e.target.value });
                  addToast({ title: "Frequency Updated", description: `Set to ${e.target.value}.` });
                }}
                options={[
                  { value: "Instant", label: "Instant (Real-time telemetry)" },
                  { value: "Daily Summary", label: "Daily Morning Digest" },
                  { value: "Weekly Summary", label: "Weekly Hydro Assessment" },
                ]}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
