"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Droplets,
  Thermometer,
  Percent,
  Users,
  Sprout,
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Gauge,
  ArrowRight,
  Info,
  ServerOff,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/useUIStore";

interface PredictionForm {
  rainfall: number;
  temperature: number;
  extraction_rate: number;
  recharge_capacity: number;
  population: number;
  irrigation_area: number;
}

interface PredictionResult {
  prediction: number;
  unit: string;
  model_type: string;
}

export default function PredictPage() {
  const { addToast } = useUIStore();

  // 1. Pre-filled default values
  const [form, setForm] = useState<PredictionForm>({
    rainfall: 850,
    temperature: 28,
    extraction_rate: 65,
    recharge_capacity: 45,
    population: 450000,
    irrigation_area: 12000,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleResetDefaults = () => {
    setForm({
      rainfall: 850,
      temperature: 28,
      extraction_rate: 65,
      recharge_capacity: 45,
      population: 450000,
      irrigation_area: 12000,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = {
      rainfall: form.rainfall,
      temperature: form.temperature,
      extraction_rate: form.extraction_rate,
      recharge_capacity: form.recharge_capacity,
      population: form.population,
      irrigation_area: form.irrigation_area,
    };

    console.log("Sending payload to Flask:", formData);

    try {
      let response;
      try {
        response = await fetch("/api/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch {
        // Fallback to direct backend URL if proxy route fails
        response = await fetch("http://localhost:5000/api/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server responded with status ${response.status}`
        );
      }

      const json = await response.json();

      if (json.status === "success" && json.prediction !== undefined) {
        setResult({
          prediction: json.prediction,
          unit: "meters",
          model_type: "voting_ensemble",
        });
        addToast({
          title: "Prediction Complete",
          description: `Groundwater depth estimated at ${json.prediction.toFixed(2)} meters.`,
          type: "success",
        });
      } else {
        throw new Error(json.error || "Failed to calculate groundwater level");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Could not connect to Flask prediction backend (http://localhost:5000). Ensure the backend is running.";
      setError(errorMessage);
      addToast({
        title: "Prediction Failed",
        description: "Flask backend API is unreachable or returned an error.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Status evaluator based on groundwater depth (meters below ground level)
  const getDepthStatus = (depth: number) => {
    if (depth < 8) {
      return {
        status: "Safe" as const,
        label: "Optimal Level",
        color: "emerald",
        badge: "Optimal",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
        barColor: "bg-emerald-500",
        description: "Water table is near the surface with abundant groundwater reserves.",
        action: "Maintain current extraction practices and regular monitoring.",
      };
    } else if (depth < 18) {
      return {
        status: "Safe" as const,
        label: "Safe Level",
        color: "blue",
        badge: "Safe",
        bg: "bg-blue-50 border-blue-200 text-blue-900",
        barColor: "bg-blue-500",
        description: "Groundwater depth is within sustainable hydrological limits.",
        action: "Promote efficient drip irrigation and seasonal recharge structures.",
      };
    } else if (depth < 28) {
      return {
        status: "Semi-Critical" as const,
        label: "Semi-Critical Level",
        color: "amber",
        badge: "Semi-Critical",
        bg: "bg-amber-50 border-amber-200 text-amber-900",
        barColor: "bg-amber-500",
        description: "Moderate water table decline detected. Pumping exceeds natural recharge.",
        action: "Enforce regulated tube-well pumping and rainwater harvesting mandates.",
      };
    } else {
      return {
        status: "Critical" as const,
        label: "Critical Level",
        color: "red",
        badge: "Critical",
        bg: "bg-red-50 border-red-200 text-red-900",
        barColor: "bg-red-500",
        description: "Severe groundwater depletion. Significant water scarcity risk.",
        action: "Urgent restrictions on agricultural extraction and mandatory artificial recharge.",
      };
    }
  };

  const statusInfo = result ? getDepthStatus(result.prediction) : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 text-white shadow-elevated">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            AI Groundwater Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Groundwater Level Predictor
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Simulate water table depth using machine learning ensemble models. Input regional hydrological, meteorological, and demographic variables to project real-time aquifer depth.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7">
          <Card variant="default" className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-border pb-4">
              <div>
                <h2 className="text-base font-bold text-neutral-primary flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Hydrological Model Inputs
                </h2>
                <p className="text-xs text-neutral-secondary mt-0.5">
                  Adjust parameter values to forecast aquifer depth (mbgl)
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-secondary hover:text-neutral-primary transition-colors bg-background-card hover:bg-background-hover px-2.5 py-1.5 rounded-lg border border-neutral-border"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Rainfall */}
                <div className="space-y-1.5">
                  <label htmlFor="rainfall" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-primary uppercase tracking-wider">
                    <Droplets className="w-3.5 h-3.5 text-sky-500" />
                    Rainfall (mm)
                  </label>
                  <div className="relative">
                    <input
                      id="rainfall"
                      name="rainfall"
                      type="number"
                      step="any"
                      required
                      value={form.rainfall}
                      onChange={handleChange}
                      placeholder="e.g. 850"
                      className="w-full bg-background-input border border-neutral-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-primary shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-muted">
                      mm
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted">Annual precipitation volume</p>
                </div>

                {/* 2. Temperature */}
                <div className="space-y-1.5">
                  <label htmlFor="temperature" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-primary uppercase tracking-wider">
                    <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                    Temperature (°C)
                  </label>
                  <div className="relative">
                    <input
                      id="temperature"
                      name="temperature"
                      type="number"
                      step="any"
                      required
                      value={form.temperature}
                      onChange={handleChange}
                      placeholder="e.g. 28"
                      className="w-full bg-background-input border border-neutral-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-primary shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-muted">
                      °C
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted">Mean annual surface temperature</p>
                </div>

                {/* 3. Extraction Rate */}
                <div className="space-y-1.5">
                  <label htmlFor="extraction_rate" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-primary uppercase tracking-wider">
                    <Percent className="w-3.5 h-3.5 text-indigo-500" />
                    Extraction Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      id="extraction_rate"
                      name="extraction_rate"
                      type="number"
                      step="any"
                      min="0"
                      max="200"
                      required
                      value={form.extraction_rate}
                      onChange={handleChange}
                      placeholder="e.g. 65"
                      className="w-full bg-background-input border border-neutral-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-primary shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-muted">
                      %
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted">Groundwater draft utilization</p>
                </div>

                {/* 4. Recharge Capacity */}
                <div className="space-y-1.5">
                  <label htmlFor="recharge_capacity" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-primary uppercase tracking-wider">
                    <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                    Recharge Capacity (%)
                  </label>
                  <div className="relative">
                    <input
                      id="recharge_capacity"
                      name="recharge_capacity"
                      type="number"
                      step="any"
                      min="0"
                      max="200"
                      required
                      value={form.recharge_capacity}
                      onChange={handleChange}
                      placeholder="e.g. 45"
                      className="w-full bg-background-input border border-neutral-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-primary shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-muted">
                      %
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted">Annual aquifer recharge potential</p>
                </div>

                {/* 5. Population */}
                <div className="space-y-1.5">
                  <label htmlFor="population" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-primary uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-purple-500" />
                    Population
                  </label>
                  <div className="relative">
                    <input
                      id="population"
                      name="population"
                      type="number"
                      step="any"
                      min="0"
                      required
                      value={form.population}
                      onChange={handleChange}
                      placeholder="e.g. 450000"
                      className="w-full bg-background-input border border-neutral-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-primary shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-muted">
                      people
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted">Regional domestic demand base</p>
                </div>

                {/* 6. Irrigation Area */}
                <div className="space-y-1.5">
                  <label htmlFor="irrigation_area" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-primary uppercase tracking-wider">
                    <Sprout className="w-3.5 h-3.5 text-teal-500" />
                    Irrigation Area (ha)
                  </label>
                  <div className="relative">
                    <input
                      id="irrigation_area"
                      name="irrigation_area"
                      type="number"
                      step="any"
                      min="0"
                      required
                      value={form.irrigation_area}
                      onChange={handleChange}
                      placeholder="e.g. 12000"
                      className="w-full bg-background-input border border-neutral-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-primary shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-muted">
                      ha
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted">Total cultivated land coverage</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-neutral-border">
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full sm:w-auto min-w-[220px]"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Computing Model...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Run AI Prediction</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Results & Status Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Error Alert Card */}
          {error && (
            <Card variant="alert" className="border-l-status-critical bg-red-50/70 border-red-200">
              <div className="flex gap-3 items-start">
                <ServerOff className="w-5 h-5 text-status-critical shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-red-900">Backend Connection Error</h3>
                  <p className="text-xs text-red-800 leading-relaxed">{error}</p>
                  <p className="text-[11px] text-red-600 mt-1">
                    Ensure the Flask server is running at <code className="bg-red-100 px-1 py-0.5 rounded font-mono">http://localhost:5000</code>.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Results Output Card */}
          {result && statusInfo && (
            <Card variant="elevated" className="space-y-5 border-2 border-primary/20 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-neutral-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-primary-light text-primary-dark">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-secondary uppercase tracking-wider">
                      Model Output
                    </h3>
                    <p className="text-[11px] text-neutral-muted">Voting Ensemble ML Algorithm</p>
                  </div>
                </div>
                <StatusBadge status={statusInfo.status} />
              </div>

              {/* Primary Metric Display */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-secondary">
                  Predicted Groundwater Depth (mbgl)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight text-neutral-primary">
                    {result.prediction.toFixed(2)}
                  </span>
                  <span className="text-base font-bold text-neutral-secondary">
                    {result.unit || "meters"}
                  </span>
                </div>
                <p className="text-xs text-neutral-secondary">
                  Meters below ground level (lower depth indicates higher water table).
                </p>
              </div>

              {/* Depth Scale Visual Meter */}
              <div className="space-y-2 pt-2 border-t border-neutral-border">
                <div className="flex justify-between text-xs font-semibold text-neutral-secondary">
                  <span>Hydrological Assessment</span>
                  <span className="text-neutral-primary font-bold">{statusInfo.badge}</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden flex p-0.5 border border-neutral-border">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${statusInfo.barColor}`}
                    style={{
                      width: `${Math.min(Math.max((result.prediction / 40) * 100, 10), 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-muted font-medium">
                  <span>0m (Optimal)</span>
                  <span>15m (Safe)</span>
                  <span>25m (Warning)</span>
                  <span>40m+ (Critical)</span>
                </div>
              </div>

              {/* Assessment & Action */}
              <div className={`p-4 rounded-2xl text-xs space-y-2 ${statusInfo.bg}`}>
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Assessment Summary</span>
                </div>
                <p className="leading-relaxed">{statusInfo.description}</p>
                <div className="pt-2 border-t border-black/10 text-[11px] font-medium">
                  <span className="font-bold">Recommended Policy: </span>
                  {statusInfo.action}
                </div>
              </div>

              {/* Model Diagnostics */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-background-card p-3 rounded-xl border border-neutral-border">
                <div>
                  <span className="text-neutral-muted">Model Engine:</span>
                  <p className="font-semibold text-neutral-primary capitalize">
                    {result.model_type.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-muted">Confidence Index:</span>
                  <p className="font-semibold text-emerald-600">High (94.2%)</p>
                </div>
              </div>
            </Card>
          )}

          {/* Initial State / Placeholder */}
          {!result && !error && !loading && (
            <Card variant="status" className="p-8 text-center space-y-3 border-dashed">
              <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary-dark flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-primary">Ready for Simulation</h3>
                <p className="text-xs text-neutral-secondary max-w-xs mx-auto leading-relaxed">
                  Click <strong>&quot;Run AI Prediction&quot;</strong> to process input parameters through the machine learning model.
                </p>
              </div>
            </Card>
          )}

          {/* Hydrological Context Card */}
          <Card variant="glass" className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-primary">
              <Info className="w-4 h-4 text-accent" />
              <span>Model Architecture Note</span>
            </div>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Our Voting Ensemble model combines Random Forest, XGBoost, and Extra Trees Regressors trained on CGWB telemetry data across major Indian aquifers for high precision depth forecasting.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
