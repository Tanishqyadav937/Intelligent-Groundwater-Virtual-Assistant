"use client";

import React, { useState } from "react";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { useUIStore } from "@/store/useUIStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Search, X, CheckCircle2, AlertTriangle, AlertCircle, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { formatNumber } from "@/lib/utils";

export default function ComparePage() {
  const { districts, comparedDistrictIds, toggleCompareDistrict } = useGroundwaterStore();
  const { addToast } = useUIStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDistricts = districts.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDistrictsData = districts.filter((d) => comparedDistrictIds.includes(d.id));

  // Chart data format
  const chartData = selectedDistrictsData.map((d) => ({
    name: d.name,
    waterLevel: d.groundwaterLevel,
    extractionRate: d.extractionRate,
    recharge: d.rechargeCapacity,
  }));

  const handleQuickAdd = (id: string) => {
    if (comparedDistrictIds.length >= 4 && !comparedDistrictIds.includes(id)) {
      addToast({ title: "Maximum 4 Districts", description: "You can compare up to 4 districts simultaneously.", type: "warning" });
      return;
    }
    toggleCompareDistrict(id);
  };

  return (
    <div className="space-y-6">
      {/* Header & District Search/Select */}
      <div className="space-y-4 pb-4 border-b border-neutral-divider">
        <div>
          <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">Compare District Telemetry</h1>
          <p className="text-xs text-neutral-secondary">Side-by-side hydro-geological comparison across Indian agricultural blocks</p>
        </div>

        {/* Selection Bar */}
        <Card className="p-4 space-y-4 bg-background-card border-neutral-border">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search district or state to add..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-neutral-muted" />}
              />
            </div>
          </div>

          {/* Quick select chips */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-neutral-secondary">Quick Select Districts:</p>
            <div className="flex flex-wrap gap-2">
              {filteredDistricts.map((d) => {
                const isSelected = comparedDistrictIds.includes(d.id);
                return (
                  <button
                    key={d.id}
                    onClick={() => handleQuickAdd(d.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      isSelected
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-neutral-primary border-neutral-border hover:bg-background-hover"
                    }`}
                  >
                    <span>{d.name} ({d.state})</span>
                    {isSelected && <X className="w-3.5 h-3.5 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Comparison Table */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-neutral-primary">Comparative Telemetry Matrix</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Telemetry Metric</TableHead>
              {selectedDistrictsData.map((d) => (
                <TableHead key={d.id} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span>{d.name}</span>
                    <button
                      onClick={() => toggleCompareDistrict(d.id)}
                      className="p-0.5 text-neutral-muted hover:text-red-500 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Row 1: State */}
            <TableRow>
              <TableCell className="font-semibold text-neutral-secondary">State</TableCell>
              {selectedDistrictsData.map((d) => (
                <TableCell key={d.id} className="text-center font-medium">{d.state}</TableCell>
              ))}
            </TableRow>

            {/* Row 2: Status */}
            <TableRow>
              <TableCell className="font-semibold text-neutral-secondary">Aquifer Category</TableCell>
              {selectedDistrictsData.map((d) => (
                <TableCell key={d.id} className="text-center">
                  <StatusBadge status={d.status} size="sm" />
                </TableCell>
              ))}
            </TableRow>

            {/* Row 3: Groundwater Level */}
            <TableRow>
              <TableCell className="font-semibold text-neutral-secondary">Water Level (m bgl)</TableCell>
              {selectedDistrictsData.map((d) => (
                <TableCell key={d.id} className="text-center font-bold text-primary">
                  {formatNumber(d.groundwaterLevel)} m
                </TableCell>
              ))}
            </TableRow>

            {/* Row 4: Extraction Rate */}
            <TableRow>
              <TableCell className="font-semibold text-neutral-secondary">Extraction Rate (%)</TableCell>
              {selectedDistrictsData.map((d) => {
                const isOver = d.extractionRate > 100;
                return (
                  <TableCell
                    key={d.id}
                    className={`text-center font-bold ${isOver ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}
                  >
                    {formatNumber(d.extractionRate)}%
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Row 5: Recharge Capacity */}
            <TableRow>
              <TableCell className="font-semibold text-neutral-secondary">Recharge (mm/yr)</TableCell>
              {selectedDistrictsData.map((d) => (
                <TableCell key={d.id} className="text-center font-medium">{d.rechargeCapacity} mm</TableCell>
              ))}
            </TableRow>

            {/* Row 6: Rainfall Forecast */}
            <TableRow>
              <TableCell className="font-semibold text-neutral-secondary">Rainfall Forecast</TableCell>
              {selectedDistrictsData.map((d) => (
                <TableCell key={d.id} className="text-center font-medium">{d.rainfallForecast} mm</TableCell>
              ))}
            </TableRow>

            {/* Row 7: Overall Assessment */}
            <TableRow className="bg-background-hover font-semibold">
              <TableCell className="text-neutral-primary">Overall Assessment</TableCell>
              {selectedDistrictsData.map((d) => (
                <TableCell key={d.id} className="text-center">
                  {d.status === "Safe" ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 text-xs">
                      <CheckCircle2 className="w-4 h-4" /> Sustainable
                    </span>
                  ) : d.status === "Semi-Critical" ? (
                    <span className="inline-flex items-center gap-1 text-amber-700 text-xs">
                      <AlertTriangle className="w-4 h-4" /> Watchlist
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-700 text-xs">
                      <AlertCircle className="w-4 h-4" /> Over-Exploited
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Comparison Visual Chart */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-primary flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Groundwater Level & Extraction Comparison
          </h3>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="waterLevel" name="Water Level Depth (m bgl)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="extractionRate" name="Extraction Rate (%)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
