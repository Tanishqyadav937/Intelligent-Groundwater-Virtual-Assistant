"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Gauge,
  MapPin,
  TrendingUp,
  Radio,
  Layers,
  Globe,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardHoverMotion = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { type: "spring", stiffness: 350, damping: 22 },
  },
};

const buttonHoverMotion = {
  hover: { scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { scale: 0.97 },
};

// Metric Data
const METRICS = [
  {
    badge: "National Coverage",
    badgeColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
    value: "700+",
    unit: "Districts",
    label: "Telemetry Monitored",
    icon: Globe,
  },
  {
    badge: "Live Telemetry",
    badgeColor: "bg-amber-100/80 text-amber-900 border-amber-200",
    value: "15,420",
    unit: "Sensors",
    label: "CGWB Network Grid",
    icon: Radio,
  },
  {
    badge: "Model Accuracy",
    badgeColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
    value: "98.4%",
    unit: "Precision",
    label: "12-Month AI Forecasts",
    icon: Gauge,
  },
  {
    badge: "Impact Scale",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    value: "4.2M",
    unit: "Farmers",
    label: "Advisories Delivered",
    icon: Users,
  },
];

// Stakeholders Data
const STAKEHOLDERS = [
  {
    role: "Farmers & Agriculture",
    badge: "SAFE RECHARGE ZONES",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    icon: Users,
    iconBg: "bg-emerald-500 text-white shadow-emerald-500/20",
    description:
      "Plain-language crop advisories, optimal borewell extraction depths, irrigation scheduling, and localized monsoon recharge notifications.",
    action: "Explore Farmer Views",
    status: "Active Telemetry",
    statusColor: "text-emerald-600 bg-emerald-50",
  },
  {
    role: "Government & Jal Shakti",
    badge: "CRITICAL BLOCK ALERTS",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    icon: Building2,
    iconBg: "bg-slate-900 text-amber-400 shadow-slate-900/20",
    description:
      "Monitor critical groundwater extraction blocks, generate compliance documentation, and receive automated hazard warnings across state boundaries.",
    action: "View State Dashboard",
    status: "High Extraction Alert",
    statusColor: "text-amber-700 bg-amber-50",
  },
  {
    role: "Researchers & Hydrologists",
    badge: "MULTI-YEAR GIS MATRICES",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    icon: GraduationCap,
    iconBg: "bg-emerald-600 text-white shadow-emerald-600/20",
    description:
      "Access granular multi-decade aquifer telemetry, hydro-geological layer maps, comparative rainfall matrices, and raw data downloads.",
    action: "Access Open Datasets",
    status: "Real-time Telemetry Feed",
    statusColor: "text-emerald-700 bg-emerald-50",
  },
];

// Core Capabilities Data
const CAPABILITIES = [
  {
    icon: Droplet,
    title: "Real-time Aquifer Sensors",
    description:
      "Automated telemetry telemetry wells updated hourly across all major Indian river basins and critical aquifers.",
  },
  {
    icon: LineChart,
    title: "12-Month AI Trends",
    description:
      "Predictive machine learning models forecasting recharge rates versus seasonal agricultural extraction drawdown.",
  },
  {
    icon: Search,
    title: "Natural Language Search",
    description:
      "Query complex hydro-geological metrics in English or regional Indian languages with instant AI synthesis.",
  },
  {
    icon: ShieldCheck,
    title: "Early Warning Grid",
    description:
      "Instant SMS and app notifications when borewell depletion levels breach critical sustainability thresholds.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-[#f4f2ec] text-slate-900 min-h-screen font-sans antialiased pb-20 space-y-16 sm:space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION ARCHITECTURE */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden rounded-3xl lg:rounded-4xl shadow-2xl border border-slate-800">
        {/* Dark Environmental Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2400&q=85')",
          }}
        />

        {/* Dark Gradient Overlay for Maximum High Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/85 to-slate-950/90 backdrop-brightness-75" />

        {/* Decorative Grid Lines Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Hero Content Container */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-24 sm:pb-32 text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Glassmorphism Badge */}
          <motion.div variants={itemFadeUp} className="inline-block">
            <div className="backdrop-blur-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-full px-5 py-2 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/50">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>INGRES AI 2.0 • National Groundwater Intelligence</span>
            </div>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white max-w-5xl mx-auto leading-[1.05]"
          >
            Intelligent, Light & Accessible <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Groundwater Virtual Assistant
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Real-time hydro-geology telemetry, AI forecasting, and actionable groundwater advisories built for farmers, government officials, and researchers across India.
          </motion.p>

          {/* Action Buttons Side-by-Side */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* Primary High-Priority CTA (Amber / Gold) */}
            <motion.div variants={buttonHoverMotion} whileHover="hover" whileTap="tap">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-xl shadow-amber-500/25 border border-amber-300 uppercase tracking-wider text-sm transition-all"
              >
                <span>Open Telemetry Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Secondary Hydro-Tech Accent Button (Emerald Green / Glass) */}
            <motion.div variants={buttonHoverMotion} whileHover="hover" whileTap="tap">
              <Link
                href="/search"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600/90 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-xl shadow-emerald-950/40 border border-emerald-400/40 backdrop-blur-md uppercase tracking-wider text-sm transition-all"
              >
                <Search className="w-5 h-5 text-emerald-200" />
                <span>Ask INGRES AI</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hydro-Tech Specs Bar */}
          <motion.div
            variants={itemFadeUp}
            className="pt-8 border-t border-slate-800/80 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Ultra-Fast 2G/3G Ready (&lt;100KB)
            </span>
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" /> Mobile First Target
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> CGWB Live Telemetry
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OVERLAPPING METRIC & STAT CARDS */}
      {/* ========================================================================= */}
      <section className="-mt-10 sm:-mt-16 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {METRICS.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                variants={itemFadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xl flex flex-col justify-between space-y-4 h-full relative overflow-hidden">
                  {/* Subtle Accent Glow Corner */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

                  {/* Header: Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${metric.badgeColor}`}
                    >
                      {metric.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-stone-100 text-slate-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>

                  {/* Body: Number & Label */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                        {metric.value}
                      </span>
                      <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                        {metric.unit}
                      </span>
                    </div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest pt-1">
                      {metric.label}
                    </p>
                  </div>

                  {/* Footer Indicator */}
                  <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified Real-Time Signal</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STAKEHOLDER & WORKFLOW ROLES */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/60 border border-emerald-300 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Tailored User Interfaces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight">
            Architected for Every Stakeholder
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            High-impact workflows designed specifically for agricultural decisions, government regulation, and hydrological scientific research.
          </p>
        </div>

        {/* Stakeholder Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAKEHOLDERS.map((stakeholder, idx) => {
            const Icon = stakeholder.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-lg flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-5">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${stakeholder.iconBg}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${stakeholder.badgeColor}`}
                    >
                      {stakeholder.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                      {stakeholder.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {stakeholder.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action & Status */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${stakeholder.statusColor}`}>
                    {stakeholder.status}
                  </span>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 text-xs font-black text-slate-900 hover:text-emerald-600 uppercase tracking-wider transition-colors"
                  >
                    <span>{stakeholder.action}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE SYSTEM CAPABILITIES GRID */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 border border-amber-300 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Industrial Tech Core</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight">
            Groundwater Intelligence Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Real-time telemetry, predictive AI models, and accessible multi-lingual query interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-md flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {cap.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  <span>Engine Active</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LIVE TELEMETRY TEASER BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Hydro Glow Backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content */}
          <div className="space-y-4 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Live Regional Risk Telemetry</span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Jaipur District, Rajasthan • Zone 4</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Aquifer Extraction Crisis Monitor
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Current Water Table Depth:{" "}
              <span className="font-black text-amber-400 text-base">24.8 m bgl</span>{" "}
              | Extraction Rate:{" "}
              <span className="font-black text-red-400 text-base">142.5% (Critical Over-exploited)</span>
            </p>
          </div>

          {/* Right CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
            <motion.div variants={buttonHoverMotion} whileHover="hover" whileTap="tap">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 uppercase tracking-wider text-xs transition-all"
              >
                <span>View Telemetry Map</span>
                <TrendingUp className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={buttonHoverMotion} whileHover="hover" whileTap="tap">
              <Link
                href="/compare"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-xl border border-slate-700 uppercase tracking-wider text-xs transition-all"
              >
                <span>Compare District Aquifers</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
