"use client";

import React from "react";
import { useUserStore, UserRole } from "@/store/useUserStore";
import { useUIStore } from "@/store/useUIStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Avatar } from "@/components/ui/Spinner";
import { User, Globe, Sliders, Shield, Download, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const { name, email, role, region, language, units, updateProfile } = useUserStore();
  const { addToast } = useUIStore();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: "Settings Saved", description: "Your user preferences have been updated successfully.", type: "success" });
  };

  const handleDownloadData = () => {
    addToast({ title: "Export Initiated", description: "Downloading your account preferences and saved telemetry data (JSON).", type: "info" });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-divider">
        <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">User Profile & App Settings</h1>
        <p className="text-xs text-neutral-secondary">Manage your user profile, role, regional languages, units, and data privacy</p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Card */}
        <Card className="p-6 space-y-5 bg-white border-neutral-border">
          <div className="flex items-center gap-4 pb-4 border-b border-neutral-divider">
            <Avatar name={name} role={role} />
            <div>
              <h2 className="text-base font-bold text-neutral-primary">{name}</h2>
              <p className="text-xs text-neutral-secondary">{email} • {region}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-neutral-primary uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Profile Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => updateProfile({ name: e.target.value })}
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => updateProfile({ email: e.target.value })}
              />
              <Input
                label="Home District & State"
                value={region}
                onChange={(e) => updateProfile({ region: e.target.value })}
              />
              <Select
                label="User Persona / Role"
                value={role}
                onChange={(e) => updateProfile({ role: e.target.value as UserRole })}
                options={[
                  { value: "Farmer", label: "Farmer / Agriculture Practitioner" },
                  { value: "Official", label: "Government / Jal Shakti Official" },
                  { value: "Researcher", label: "Hydro-geology Researcher" },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Preferences Card */}
        <Card className="p-6 space-y-5 bg-white border-neutral-border">
          <h3 className="text-xs font-semibold text-neutral-primary uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Regional Preferences & Units
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Interface Language"
              value={language}
              onChange={(e) => {
                updateProfile({ language: e.target.value });
                addToast({ title: "Language Changed", description: `Active language set to ${e.target.value}.` });
              }}
              options={[
                { value: "English", label: "English (Default)" },
                { value: "Hindi", label: "हिन्दी (Hindi)" },
                { value: "Telugu", label: "తెలుగు (Telugu)" },
                { value: "Tamil", label: "தமிழ் (Tamil)" },
                { value: "Marathi", label: "मराठी (Marathi)" },
                { value: "Bengali", label: "বাংলা (Bengali)" },
              ]}
            />

            <Select
              label="Measurement Units"
              value={units}
              onChange={(e: any) => updateProfile({ units: e.target.value })}
              options={[
                { value: "SI", label: "SI Metric (Meters, mm/yr, %)" },
                { value: "Imperial", label: "Imperial (Feet, inches/yr, %)" },
              ]}
            />
          </div>
        </Card>

        {/* Data & Privacy Card */}
        <Card className="p-6 space-y-5 bg-white border-neutral-border">
          <h3 className="text-xs font-semibold text-neutral-primary uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Data & Privacy Controls
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <div>
              <h4 className="text-xs font-bold text-neutral-primary">Download Account & Telemetry Data</h4>
              <p className="text-[11px] text-neutral-secondary">Export all your saved settings, queries, and district bookmarks in JSON format.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadData}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export JSON Data
            </Button>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />}>
            Save All Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
