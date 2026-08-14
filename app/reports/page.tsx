"use client";

import React, { useState } from "react";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { useUIStore } from "@/store/useUIStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Toggle";
import { Modal } from "@/components/ui/Modal";
import { FileText, Download, Eye, Sparkles, CheckCircle2, Calendar, Filter } from "lucide-react";

export default function ReportsPage() {
  const { reports, districts } = useGroundwaterStore();
  const { addToast } = useUIStore();

  const [selectedTemplate, setSelectedTemplate] = useState<string>("Executive Summary");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("jaipur");
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-08-14");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [metrics, setMetrics] = useState({
    level: true,
    extraction: true,
    recharge: true,
    rainfall: false,
  });

  const handleMetricToggle = (key: keyof typeof metrics) => {
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsPreviewOpen(true);
      addToast({
        title: "Report Generated",
        description: `Compiled ${selectedTemplate} for ${districts.find((d) => d.id === selectedDistrict)?.name}.`,
        type: "success",
      });
    }, 1000);
  };

  const handleDownloadReport = (title: string) => {
    addToast({
      title: "Downloading Report",
      description: `Downloading ${title} PDF document.`,
      type: "info",
    });
  };

  const targetDistrict = districts.find((d) => d.id === selectedDistrict) || districts[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-divider">
        <h1 className="text-2xl font-bold text-neutral-primary tracking-tight">Groundwater Report Builder</h1>
        <p className="text-xs text-neutral-secondary">Generate customizable hydro-geological assessments, farmer advisories, and technical datasets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Report Builder Form */}
        <Card className="lg:col-span-2 p-6 space-y-6 bg-white border-neutral-border">
          <h2 className="text-base font-bold text-neutral-primary flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            Configure Report Parameters
          </h2>

          {/* 1. Template Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-primary">1. Select Report Template</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Executive Summary", desc: "1-page high-level summary for officials", tag: "1 Page" },
                { name: "Detailed Analysis", desc: "5-page comprehensive aquifer audit", tag: "5 Pages" },
                { name: "Farmer-Friendly", desc: "Plain language crop & irrigation guide", tag: "Simple" },
                { name: "Technical Dataset", desc: "Raw telemetry & recharge models", tag: "Data" },
              ].map((tpl) => (
                <div
                  key={tpl.name}
                  onClick={() => setSelectedTemplate(tpl.name)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    selectedTemplate === tpl.name
                      ? "bg-primary-light/50 border-primary shadow-subtle"
                      : "bg-background-card border-neutral-border hover:bg-background-hover"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-primary">{tpl.name}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-white border border-neutral-border rounded text-neutral-secondary">
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-secondary mt-1">{tpl.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Target District & Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-divider">
            <Select
              label="2. Target District"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              options={districts.map((d) => ({ value: d.id, label: `${d.name}, ${d.state}` }))}
            />

            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <Input
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* 3. Included Metrics */}
          <div className="space-y-2 pt-2 border-t border-neutral-divider">
            <label className="block text-xs font-semibold text-neutral-primary">3. Include Metrics</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Checkbox
                label="Groundwater Level"
                checked={metrics.level}
                onChange={() => handleMetricToggle("level")}
              />
              <Checkbox
                label="Extraction Rate"
                checked={metrics.extraction}
                onChange={() => handleMetricToggle("extraction")}
              />
              <Checkbox
                label="Recharge Capacity"
                checked={metrics.recharge}
                onChange={() => handleMetricToggle("recharge")}
              />
              <Checkbox
                label="Rainfall Forecast"
                checked={metrics.rainfall}
                onChange={() => handleMetricToggle("rainfall")}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-divider">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              isLoading={isGenerating}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Generate & Preview
            </Button>
          </div>
        </Card>

        {/* Right Column: Pre-built Report Archives */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-neutral-primary flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Recent Telemetry Reports
          </h2>

          <div className="space-y-3">
            {reports.map((rep) => (
              <Card key={rep.id} className="p-4 space-y-2 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-primary px-2 py-0.5 bg-primary-light rounded">
                    {rep.type}
                  </span>
                  <span className="text-[11px] text-neutral-muted">{rep.fileSize}</span>
                </div>
                <h3 className="text-xs font-bold text-neutral-primary">{rep.title}</h3>
                <div className="flex items-center justify-between text-[11px] text-neutral-secondary pt-1">
                  <span>{rep.district} • {rep.date}</span>
                  <span>{rep.pages} pages</span>
                </div>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDownloadReport(rep.title)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`Report Preview: ${selectedTemplate}`}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsPreviewOpen(false);
                handleDownloadReport(`${selectedTemplate} - ${targetDistrict.name}`);
              }}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download PDF Report
            </Button>
          </>
        }
      >
        <div className="space-y-4 p-2 bg-white text-neutral-primary border border-neutral-border rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-lg font-bold text-neutral-primary">
                INGRES AI Groundwater Assessment - {targetDistrict.name}
              </h2>
              <p className="text-xs text-neutral-secondary">
                Period: {startDate} to {endDate} | State: {targetDistrict.state}
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-primary-light text-primary-dark rounded">
              OFFICIAL DRAFT
            </span>
          </div>

          {/* Key Findings */}
          <div className="p-3 bg-background-card rounded space-y-2 text-xs">
            <h3 className="font-bold text-neutral-primary uppercase tracking-wider">Executive Findings:</h3>
            <ul className="list-disc pl-4 space-y-1 text-neutral-secondary">
              <li>Current Groundwater Level: <strong>{targetDistrict.groundwaterLevel} m bgl</strong> ({targetDistrict.status} status).</li>
              <li>Extraction Rate: <strong>{targetDistrict.extractionRate}%</strong> of annual replenishable resource.</li>
              <li>Estimated Recharge Capacity: <strong>{targetDistrict.rechargeCapacity} mm/yr</strong>.</li>
            </ul>
          </div>

          <p className="text-xs text-neutral-secondary leading-relaxed">
            This automated report is compiled via the INGRES AI Advanced platform using telemetry feeds from Central Ground Water Board (CGWB) monitoring wells. Recommended actions include artificial recharge structures and micro-irrigation.
          </p>
        </div>
      </Modal>
    </div>
  );
}
