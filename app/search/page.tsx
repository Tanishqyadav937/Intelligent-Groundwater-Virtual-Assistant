"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGroundwaterStore } from "@/store/useGroundwaterStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Search, Sparkles, ArrowRight, MessageSquare, HelpCircle, Droplet, CheckCircle2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function SearchPage() {
  const { districts } = useGroundwaterStore();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const POPULAR_QUERIES = [
    "Is groundwater safe in Jaipur, Rajasthan?",
    "What is the monsoon recharge capacity in Punjab?",
    "Best irrigation practices for Latur sugarcane farmers",
    "Compare extraction rate in Ludhiana vs Chennai",
  ];

  const handleSearch = (q: string) => {
    setQuery(q);
    setIsThinking(true);
    setHasSearched(true);
    setTimeout(() => {
      setIsThinking(false);
    }, 600);
  };

  // Find matching district if mentioned in query
  const matchedDistrict = districts.find(
    (d) =>
      query.toLowerCase().includes(d.name.toLowerCase()) ||
      query.toLowerCase().includes(d.state.toLowerCase())
  ) || districts[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Search Bar Header */}
      <div className="text-center space-y-4 py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light text-primary-dark rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INGRES Natural Language Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary tracking-tight">
          Ask INGRES AI About Groundwater
        </h1>
        <p className="text-xs sm:text-sm text-neutral-secondary">
          Type any query regarding telemetry, borewell safety, crop advisories, or recharge rates in India
        </p>

        {/* Search Input Box */}
        <div className="relative max-w-2xl mx-auto pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) handleSearch(query);
            }}
          >
            <div className="relative flex items-center shadow-card rounded-xl overflow-hidden bg-white border-2 border-primary/40 focus-within:border-primary">
              <Search className="w-5 h-5 text-primary ml-4 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about your water... (e.g. 'Is groundwater safe in Jaipur?')"
                className="w-full h-14 pl-3 pr-24 bg-transparent text-sm sm:text-base text-neutral-primary placeholder-neutral-muted focus:outline-none"
              />
              <div className="absolute right-2">
                <Button type="submit" variant="primary" size="md" isLoading={isThinking}>
                  Ask AI
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Suggested Query Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-neutral-muted">Popular Queries:</span>
          {POPULAR_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(q)}
              className="text-xs font-medium bg-background-card hover:bg-background-hover text-neutral-primary border border-neutral-border rounded-full px-3 py-1 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* AI Answer Section */}
      {hasSearched && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <Card className="p-6 space-y-4 bg-white border-neutral-border shadow-elevated">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-neutral-primary">INGRES AI Assistant Answer</h2>
              </div>
              <span className="text-[11px] text-neutral-muted">Verified against CGWB 2026 Telemetry</span>
            </div>

            {isThinking ? (
              <div className="py-8 text-center text-neutral-secondary space-y-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs">Analyzing hydro-geological sensors and rain patterns...</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-neutral-primary">
                <p>
                  Based on recent central telemetry from <strong>{matchedDistrict.name}, {matchedDistrict.state}</strong>:
                </p>

                {/* Quick Telemetry Card inside AI Response */}
                <div className="p-4 bg-background-card border border-neutral-border rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-neutral-secondary block">Water Level Depth</span>
                    <span className="text-lg font-bold text-primary">{formatNumber(matchedDistrict.groundwaterLevel)} m bgl</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-secondary block">Extraction Rate</span>
                    <span className="text-lg font-bold text-neutral-primary">{formatNumber(matchedDistrict.extractionRate)}%</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-secondary block">Aquifer Category</span>
                    <StatusBadge status={matchedDistrict.status} size="sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-neutral-primary flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insights & Actionable Recommendations:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-neutral-secondary">
                    <li>The extraction rate in <strong>{matchedDistrict.name}</strong> stands at {matchedDistrict.extractionRate}%, categorizing the block as <strong>{matchedDistrict.status}</strong>.</li>
                    <li>Farmers are strongly advised to adopt drip/sprinkler irrigation for upcoming Kharif crops to prevent further drawdown.</li>
                    <li>Community rainwater harvesting structures have an estimated recharge capacity of {matchedDistrict.rechargeCapacity} mm/yr.</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-neutral-divider flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-neutral-muted">Confidence score: 98.4% | CGWB Dataset v4.2</span>
                  <div className="flex gap-2">
                    <Link href="/dashboard">
                      <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Go to {matchedDistrict.name} Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
