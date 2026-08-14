"use client";

import React, { useState } from "react";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { useUIStore } from "@/store/useUIStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  TrendingDown,
  TrendingUp,
  Info,
  RotateCcw,
  Database,
  Layers,
  HelpCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { formatNumber } from "@/lib/utils";

export default function AnalysisPage() {
  const { districts, selectedDistrictId, setSelectedDistrict, timeRange, setTimeRange } =
    useGroundwaterStore();
  const { addToast } = useUIStore();

  const [selectedMetric, setSelectedMetric] = useState<"level" | "extraction" | "recharge">("level");

  const district = districts.find((d) => d.id === selectedDistrictId) || districts[0];

  const handleResetFilters = () => {
    setSelectedDistrict("jaipur");
    setTimeRange("1Y");
    setSelectedMetric("level");
    addToast({ title: "Filters Reset", description: "Restored default telemetry view parameters." });
  };

  // Determine current metric details
  const metricMap = {
    level: {
      name: "Groundwater Level",
      value: `${formatNumber(district.groundwaterLevel)} m bgl`,
      unit: "meters below ground level",
      change: "+0.4 m from last month",
      trend: "negative",
      explanation:
        "Measures the vertical depth from the ground surface down to the water table. Higher values indicate deeper water levels and greater depletion.",
      source: "CGWB Acoustic Water Level Sensors (DWLR Grid)",
      color: "#3B82F6",
    },
    extraction: {
      name: "Groundwater Extraction Rate",
      value: `${formatNumber(district.extractionRate)}%`,
      unit: "percent of net annual availability",
      change: "+2.1% from last month",
      trend: "negative",
      explanation:
        "The ratio of annual groundwater draft (for agriculture, domestic, and industrial uses) to total annual natural recharge. Values above 100% represent over-exploitation.",
      source: "INGRES AI Dynamic Groundwater Assessment Model 2026",
      color: "#F59E0B",
    },
    recharge: {
      name: "Recharge Capacity",
      value: `${district.rechargeCapacity} mm/yr`,
      unit: "millimeters per year",
      change: "+15 mm post-monsoon",
      trend: "positive",
      explanation:
        "The estimated amount of surface water infiltration into the underlying aquifer through precipitation, canal seepage, and artificial recharge structures.",
      source: "National Remote Sensing Centre (NRSC) Precipitation Infiltration Estimates",
      color: "#10B981",
    },
  };

  const currentMetric = metricMap[selectedMetric];

  return (
    <div className="space-y-6">
      {/* Page Header & Filter Bar */}
      <div className="space-y-4 pb-4 border-b border-neutral-divider">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">Detailed Telemetry Analysis</h1>
            <p className="text-xs text-neutral-secondary">Drill down into individual aquifer parameters and historical trends</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleResetFilters} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset Filters
          </Button>
        </div>

        {/* Filter Controls Card */}
        <Card className="p-4 bg-background-card border-neutral-border space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* District Selector */}
            <Select
              label="Select District"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              options={districts.map((d) => ({ value: d.id, label: `${d.name}, ${d.state}` }))}
            />

            {/* Metric Selector Tabs */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-primary">Select Telemetry Metric</label>
              <div className="flex bg-white border border-neutral-border rounded-md p-1 h-10">
                <button
                  onClick={() => setSelectedMetric("level")}
                  className={`flex-1 text-xs font-medium rounded transition-colors ${
                    selectedMetric === "level" ? "bg-primary text-white shadow-subtle" : "text-neutral-secondary"
                  }`}
                >
                  Water Level
                </button>
                <button
                  onClick={() => setSelectedMetric("extraction")}
                  className={`flex-1 text-xs font-medium rounded transition-colors ${
                    selectedMetric === "extraction" ? "bg-primary text-white shadow-subtle" : "text-neutral-secondary"
                  }`}
                >
                  Extraction
                </button>
                <button
                  onClick={() => setSelectedMetric("recharge")}
                  className={`flex-1 text-xs font-medium rounded transition-colors ${
                    selectedMetric === "recharge" ? "bg-primary text-white shadow-subtle" : "text-neutral-secondary"
                  }`}
                >
                  Recharge
                </button>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-primary">Time Horizon</label>
              <div className="flex bg-white border border-neutral-border rounded-md p-1 h-10">
                {(["1M", "3M", "6M", "1Y", "All"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`flex-1 text-xs font-medium rounded transition-colors ${
                      timeRange === range ? "bg-primary text-white shadow-subtle" : "text-neutral-secondary"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Metric Drilldown View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Metric Summary Card */}
        <Card className="p-6 space-y-5 bg-white border-neutral-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-secondary uppercase tracking-wider">Target Parameter</span>
              <StatusBadge status={district.status} size="sm" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-primary">{currentMetric.name}</h2>
            <p className="text-xs text-neutral-muted">Location: {district.name}, {district.state}</p>
          </div>

          <div className="p-4 bg-background-card border border-neutral-border rounded-lg space-y-1">
            <div className="text-3xl font-extrabold text-primary">{currentMetric.value}</div>
            <p className="text-xs text-neutral-secondary">{currentMetric.unit}</p>
            <div className="flex items-center gap-1.5 pt-2 text-xs font-medium">
              {currentMetric.trend === "negative" ? (
                <span className="text-red-600 flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" /> {currentMetric.change}
                </span>
              ) : (
                <span className="text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {currentMetric.change}
                </span>
              )}
            </div>
          </div>

          {/* Explanation Box */}
          <div className="space-y-2 pt-2 border-t border-neutral-divider">
            <h4 className="text-xs font-semibold text-neutral-primary flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-primary" />
              Why is this important?
            </h4>
            <p className="text-xs text-neutral-secondary leading-relaxed">{currentMetric.explanation}</p>
          </div>

          {/* Data Source */}
          <div className="space-y-1 pt-2 border-t border-neutral-divider">
            <h4 className="text-[11px] font-semibold text-neutral-muted uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              Data Source Citation
            </h4>
            <p className="text-xs font-medium text-neutral-primary">{currentMetric.source}</p>
          </div>
        </Card>

        {/* Right Column: Large Interactive Area Chart */}
        <Card className="lg:col-span-2 p-6 space-y-4 bg-white border-neutral-border">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-primary flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              Historical Area Trajectory ({timeRange})
            </h3>
            <span className="text-xs text-neutral-secondary">Values sampled monthly</span>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={district.historical} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="metricColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric === "level" ? "level" : selectedMetric === "extraction" ? "extraction" : "recharge"}
                  name={currentMetric.name}
                  stroke={currentMetric.color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#metricColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
