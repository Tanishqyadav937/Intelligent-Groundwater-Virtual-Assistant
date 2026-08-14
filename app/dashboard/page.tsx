"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { useUserStore } from "@/store/useUserStore";
import { useUIStore } from "@/store/useUIStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  TrendingDown,
  TrendingUp,
  Minus,
  Droplet,
  Gauge,
  CloudRain,
  Calendar,
  Download,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const { name } = useUserStore();
  const { districts, selectedDistrictId, alerts } = useGroundwaterStore();
  const { addToast } = useUIStore();

  const [activeMetric, setActiveMetric] = useState<"level" | "extraction" | "recharge">("level");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const district = districts.find((d) => d.id === selectedDistrictId) || districts[0];
  const recentAlerts = alerts.slice(0, 3);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        title: "Telemetry Refreshed",
        description: `Updated latest telemetry for ${district.name} district.`,
        type: "success",
      });
    }, 800);
  };

  const handleDownload = () => {
    addToast({
      title: "Data Downloaded",
      description: `Exported 12-month groundwater telemetry CSV for ${district.name}.`,
      type: "info",
    });
  };

  const renderTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-600 inline" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-600 inline" />;
    return <Minus className="w-4 h-4 text-amber-600 inline" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-divider">
        <div>
          <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">
            Hello, {name} 👋
          </h1>
          <p className="text-xs text-neutral-secondary">
            Groundwater Overview for <span className="font-semibold text-neutral-primary">{district.name}, {district.state}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Telemetry
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Main Region Status Hero Card */}
      <Card variant="elevated" className="p-6 bg-gradient-to-r from-white via-background-card to-primary-light/10 border-neutral-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-secondary uppercase tracking-wider">
                Region Aquifer Status
              </span>
              <StatusBadge status={district.status} />
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-primary">
                {formatNumber(district.groundwaterLevel)}
              </span>
              <span className="text-sm font-medium text-neutral-secondary">meters below ground level (m bgl)</span>
              <div className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-white border border-neutral-border shadow-subtle">
                {renderTrendIcon(district.trend)}
                <span className="capitalize">{district.trend === "down" ? "Depleting" : district.trend === "up" ? "Recharging" : "Stable"}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-muted">
              Last updated: {district.lastUpdated} | Source: Central Ground Water Board Telemetry Grid
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Link href="/analysis">
              <Button variant="primary" className="w-full md:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Detailed Analysis
              </Button>
            </Link>
            <Link href="/compare">
              <Button variant="outline" className="w-full md:w-auto">
                Compare with Nearby Districts
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Quick Stats Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Groundwater Level */}
        <Card variant="status" interactive className="p-4 space-y-2">
          <CardHeader className="mb-1">
            <CardTitle>Groundwater Level</CardTitle>
            <Droplet className="w-4 h-4 text-primary" />
          </CardHeader>
          <div className="text-2xl font-bold text-neutral-primary">
            {formatNumber(district.groundwaterLevel)} <span className="text-xs font-normal text-neutral-secondary">m bgl</span>
          </div>
          <p className="text-[11px] text-neutral-secondary">Depth to water table</p>
        </Card>

        {/* Card 2: Extraction Rate */}
        <Card variant="status" interactive className="p-4 space-y-2">
          <CardHeader className="mb-1">
            <CardTitle>Extraction Rate</CardTitle>
            <Gauge className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <div className="text-2xl font-bold text-neutral-primary">
            {formatNumber(district.extractionRate)}%
          </div>
          <p className="text-[11px] text-neutral-secondary">
            {district.extractionRate > 100 ? "⚠️ Exceeds annual recharge" : "Within safe limits"}
          </p>
        </Card>

        {/* Card 3: Recharge Capacity */}
        <Card variant="status" interactive className="p-4 space-y-2">
          <CardHeader className="mb-1">
            <CardTitle>Recharge Capacity</CardTitle>
            <CloudRain className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <div className="text-2xl font-bold text-neutral-primary">
            {district.rechargeCapacity} <span className="text-xs font-normal text-neutral-secondary">mm/yr</span>
          </div>
          <p className="text-[11px] text-neutral-secondary">Natural & artificial recharge</p>
        </Card>

        {/* Card 4: Forecast */}
        <Card variant="status" interactive className="p-4 space-y-2">
          <CardHeader className="mb-1">
            <CardTitle>Monsoon Forecast</CardTitle>
            <Calendar className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <div className="text-2xl font-bold text-neutral-primary">
            {district.rainfallForecast} <span className="text-xs font-normal text-neutral-secondary">mm</span>
          </div>
          <p className="text-[11px] text-neutral-secondary">Expected seasonal rainfall</p>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-divider">
          <div>
            <h2 className="text-base font-bold text-neutral-primary">12-Month Telemetry Trend</h2>
            <p className="text-xs text-neutral-secondary">Historical groundwater metrics over the past year</p>
          </div>

          <div className="flex items-center gap-1 bg-background-hover p-1 rounded-md border border-neutral-border text-xs">
            <button
              onClick={() => setActiveMetric("level")}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeMetric === "level" ? "bg-white text-primary shadow-subtle" : "text-neutral-secondary"
              }`}
            >
              Water Level (m)
            </button>
            <button
              onClick={() => setActiveMetric("extraction")}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeMetric === "extraction" ? "bg-white text-primary shadow-subtle" : "text-neutral-secondary"
              }`}
            >
              Extraction (%)
            </button>
            <button
              onClick={() => setActiveMetric("recharge")}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeMetric === "recharge" ? "bg-white text-primary shadow-subtle" : "text-neutral-secondary"
              }`}
            >
              Recharge (mm)
            </button>
          </div>
        </div>

        {/* Recharts Component */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={district.historical} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              {activeMetric === "level" && (
                <Line
                  type="monotone"
                  dataKey="level"
                  name="Water Level (m bgl)"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#3B82F6" }}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeMetric === "extraction" && (
                <Line
                  type="monotone"
                  dataKey="extraction"
                  name="Extraction Rate (%)"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#F59E0B" }}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeMetric === "recharge" && (
                <Line
                  type="monotone"
                  dataKey="recharge"
                  name="Recharge (mm)"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#10B981" }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Alert Summary Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-neutral-primary flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-status-warning" />
            Recent Telemetry Alerts
          </h2>
          <Link href="/alerts" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            View all alerts ({alerts.length}) <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentAlerts.map((alert) => (
            <Card
              key={alert.id}
              variant="alert"
              className={`p-4 space-y-2 ${
                alert.severity === "Critical"
                  ? "border-l-status-critical"
                  : alert.severity === "Warning"
                  ? "border-l-status-warning"
                  : "border-l-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-neutral-secondary">{alert.district}</span>
                <span className="text-[10px] text-neutral-muted">{alert.date}</span>
              </div>
              <p className="text-xs font-medium text-neutral-primary leading-snug line-clamp-2">
                {alert.message}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
