"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Droplet,
  Search,
  LineChart,
  ShieldCheck,
  Zap,
  Smartphone,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
  GraduationCap,
  Activity,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="space-y-16 max-w-6xl mx-auto py-6">
      {/* Hero Section with Fog-Mesh Radial Glow */}
      <section className="relative rounded-4xl p-8 sm:p-12 text-center space-y-8 fog-mesh-bg border border-neutral-border/80 shadow-glow overflow-hidden">
        {/* Ethereal Glow Orb Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-neutral-border rounded-full text-xs font-bold text-black shadow-subtle backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary-accent" />
            <span>INGRES AI 2.0 • India Groundwater Intelligence Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight max-w-4xl mx-auto leading-none">
            Intelligent, Light & Accessible <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-primary-accent to-emerald-600">
              Groundwater Virtual Assistant
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-body max-w-2xl mx-auto leading-relaxed font-normal">
            Real-time hydro-geology telemetry, AI forecasting, and actionable groundwater advisories built for farmers, government officials, and researchers across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/dashboard">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Open Telemetry Dashboard
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" leftIcon={<Search className="w-5 h-5 text-black" />}>
                Ask INGRES AI
              </Button>
            </Link>
          </div>

          {/* 2G/3G Light Badge */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-neutral-secondary pt-4 border-t border-neutral-border/60 max-w-xl mx-auto">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Ultra-fast 2G/3G Ready (&lt;100KB)
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-primary-accent" /> Mobile First Touch Target
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> CGWB Real-Time Telemetry
            </span>
          </div>
        </div>
      </section>

      {/* Target User Roles Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-black tracking-tight">Tailored for Every Stakeholder</h2>
          <p className="text-sm text-neutral-secondary">High-contrast, intuitive views designed for specific agricultural & research workflows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="mesh" className="p-8 space-y-4 hover:border-black transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-subtle">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-black">Farmers & Agriculture</h3>
            <p className="text-xs text-neutral-body leading-relaxed font-normal">
              Plain-language crop advisories, borewell depth alerts, irrigation scheduling, and regional monsoon recharge warnings.
            </p>
            <StatusBadge status="Safe" size="sm" />
          </Card>

          <Card variant="mesh" className="p-8 space-y-4 hover:border-black transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-accent flex items-center justify-center font-bold shadow-subtle">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-black">Government & Jal Shakti</h3>
            <p className="text-xs text-neutral-body leading-relaxed font-normal">
              Monitor critical extraction blocks, receive automated hazard alerts, and compile district compliance reports.
            </p>
            <StatusBadge status="Warning" size="sm" />
          </Card>

          <Card variant="mesh" className="p-8 space-y-4 hover:border-black transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shadow-subtle">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-black">Researchers & Scientists</h3>
            <p className="text-xs text-neutral-body leading-relaxed font-normal">
              Access multi-year telemetry datasets, comparative aquifer matrices, and GIS geospatial rainfall contour maps.
            </p>
            <StatusBadge status="Info" size="sm" />
          </Card>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-black tracking-tight">Core System Capabilities</h2>
          <p className="text-sm text-neutral-secondary">Everything needed for sustainable water management across India</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-6 space-y-3 bg-white border-neutral-border hover:shadow-glow transition-all">
            <Droplet className="w-7 h-7 text-primary-accent" />
            <h4 className="text-sm font-extrabold text-black">Real-time Sensors</h4>
            <p className="text-xs text-neutral-secondary">Automated telemetry wells updated hourly across 700+ Indian districts.</p>
          </Card>

          <Card className="p-6 space-y-3 bg-white border-neutral-border hover:shadow-glow transition-all">
            <LineChart className="w-7 h-7 text-primary-accent" />
            <h4 className="text-sm font-extrabold text-black">12-Month Trends</h4>
            <p className="text-xs text-neutral-secondary">Track recharge capacity versus agricultural extraction drawdown rates.</p>
          </Card>

          <Card className="p-6 space-y-3 bg-white border-neutral-border hover:shadow-glow transition-all">
            <Search className="w-7 h-7 text-primary-accent" />
            <h4 className="text-sm font-extrabold text-black">Natural AI Search</h4>
            <p className="text-xs text-neutral-secondary">Ask questions in English or regional Indian languages effortlessly.</p>
          </Card>

          <Card className="p-6 space-y-3 bg-white border-neutral-border hover:shadow-glow transition-all">
            <ShieldCheck className="w-7 h-7 text-primary-accent" />
            <h4 className="text-sm font-extrabold text-black">Early Warning Grid</h4>
            <p className="text-xs text-neutral-secondary">Instant SMS and email alerts for critical borewell depletion thresholds.</p>
          </Card>
        </div>
      </section>

      {/* Live Teaser Card */}
      <section className="fog-mesh-bg border border-neutral-border rounded-4xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-bold text-black uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start">
            <Activity className="w-4 h-4 text-emerald-600 animate-pulse" /> Live Telemetry Feed
          </span>
          <h3 className="text-2xl font-black text-black">Jaipur District, Rajasthan</h3>
          <p className="text-xs text-neutral-body">
            Current Water Table Depth: <span className="font-extrabold text-black">24.8 m bgl</span> | Extraction Rate: <span className="font-extrabold text-red-600">142.5% (Critical)</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard">
            <Button variant="primary" size="lg">View Live Dashboard</Button>
          </Link>
          <Link href="/compare">
            <Button variant="outline" size="lg">Compare Districts</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
