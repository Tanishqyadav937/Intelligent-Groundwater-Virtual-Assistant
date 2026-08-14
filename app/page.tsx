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
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 pb-8 border-b border-neutral-divider">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light text-primary-dark rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation India Groundwater Intelligence</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-primary tracking-tight max-w-4xl mx-auto leading-tight">
          Intelligent, Light & Accessible <br className="hidden sm:inline" />
          <span className="text-primary">Groundwater Virtual Assistant</span> for India
        </h1>

        <p className="text-base sm:text-lg text-neutral-secondary max-w-2xl mx-auto leading-relaxed">
          Real-time telemetry, AI forecasting, and actionable groundwater advisories tailored for farmers, government officials, and hydro-geology researchers across all 700+ districts of India.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/dashboard">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Groundwater Dashboard
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" leftIcon={<Search className="w-4 h-4 text-primary" />}>
              Ask INGRES AI
            </Button>
          </Link>
        </div>

        {/* 2G/3G Light Badge */}
        <div className="flex items-center justify-center gap-6 text-xs text-neutral-muted pt-2">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" /> Fast 2G/3G Loading (&lt;150KB)
          </span>
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-blue-500" /> 100% Mobile Touch Friendly
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> CGWB Verified Telemetry
          </span>
        </div>
      </section>

      {/* Target User Roles Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-neutral-primary">Tailored for Every Stakeholder</h2>
          <p className="text-sm text-neutral-secondary">Simplified views designed for your specific workflows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-primary">Farmers & Agriculture</h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Get plain-language crop advisories, irrigation scheduling, borewell depth status, and local monsoon recharge alerts.
            </p>
            <StatusBadge status="Safe" size="sm" />
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-primary">Government & Jal Shakti</h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Monitor critical extraction blocks, receive automated hazard alerts, and generate district compliance reports.
            </p>
            <StatusBadge status="Warning" size="sm" />
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-primary">Researchers & Scientists</h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Access multi-year telemetry datasets, comparative aquifer matrices, and GIS geospatial rainfall layers.
            </p>
            <StatusBadge status="Info" size="sm" />
          </Card>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-neutral-primary">Core Capabilities</h2>
          <p className="text-sm text-neutral-secondary">Everything you need for sustainable water resource management</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 space-y-3">
            <Droplet className="w-6 h-6 text-primary" />
            <h4 className="text-sm font-semibold text-neutral-primary">Real-time Telemetry</h4>
            <p className="text-xs text-neutral-secondary">Automated water table sensors updated hourly across 700+ districts.</p>
          </Card>

          <Card className="p-4 space-y-3">
            <LineChart className="w-6 h-6 text-primary" />
            <h4 className="text-sm font-semibold text-neutral-primary">12-Month Trends</h4>
            <p className="text-xs text-neutral-secondary">Track recharge capacity versus agricultural extraction rates.</p>
          </Card>

          <Card className="p-4 space-y-3">
            <Search className="w-6 h-6 text-primary" />
            <h4 className="text-sm font-semibold text-neutral-primary">Natural Language AI</h4>
            <p className="text-xs text-neutral-secondary">Ask questions in English or regional Indian languages effortlessly.</p>
          </Card>

          <Card className="p-4 space-y-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <h4 className="text-sm font-semibold text-neutral-primary">Early Warning System</h4>
            <p className="text-xs text-neutral-secondary">Instant SMS and email alerts for critical borewell depletion.</p>
          </Card>
        </div>
      </section>

      {/* Live Teaser Card */}
      <section className="bg-primary-light/40 border border-blue-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Telemetry Preview</span>
          <h3 className="text-xl font-bold text-neutral-primary">Jaipur District, Rajasthan</h3>
          <p className="text-xs text-neutral-secondary">Current Groundwater Level: <span className="font-semibold text-neutral-primary">24.8 m bgl</span> | Extraction Rate: <span className="font-semibold text-red-600">142.5% (Critical)</span></p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard">
            <Button variant="primary">View Live Dashboard</Button>
          </Link>
          <Link href="/compare">
            <Button variant="secondary">Compare Districts</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
