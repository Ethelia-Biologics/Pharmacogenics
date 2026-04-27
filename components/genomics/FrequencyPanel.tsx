"use client";

import { PopulationVariantFreq, Study } from "../../types/genomics";
import { StudyBadge } from "./StudyBadge";
import { Loader2, Info } from "lucide-react";

interface FrequencyPanelProps {
  frequency: PopulationVariantFreq | null;
  study: Study | null;
  isLoading: boolean;
  error: string | null;
}

export function FrequencyPanel({ frequency, study, isLoading, error }: FrequencyPanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-text-tertiary">
        <Loader2 size={24} className="animate-spin mb-2" />
        <span className="text-[12px]">Loading frequencies...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-status-danger-bg border border-status-danger-border rounded-lg text-status-danger-text text-[12px] flex gap-2">
        <Info size={14} className="shrink-0" />
        {error}
      </div>
    );
  }

  if (!frequency) {
    return (
      <div className="p-6 text-center border-2 border-dashed border-border-default rounded-lg">
        <p className="text-[12px] text-text-tertiary italic">
          No frequency data available for selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid gap-3">
        <div className="flex justify-between items-baseline border-b border-border-default pb-1.5">
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Allele Freq (AF)</span>
          <span className="text-[15px] font-mono font-bold text-text-primary">{frequency.allele_frequency.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-baseline border-b border-border-default pb-1.5">
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Minor Allele Freq (MAF)</span>
          <span className="text-[15px] font-mono font-bold text-text-primary">{frequency.minor_allele_freq.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-baseline border-b border-border-default pb-1.5">
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Sample Count (N)</span>
          <span className="text-[15px] font-mono font-bold text-text-primary">{frequency.sample_count?.toLocaleString() ?? "N/A"}</span>
        </div>
        <div className="flex justify-between items-baseline border-b border-border-default pb-1.5">
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Source</span>
          <span className="text-[13px] font-sans text-text-secondary">{frequency.data_source}</span>
        </div>
      </div>

      {study && (
        <div className="mt-2">
          <label className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-2 block">Source Study</label>
          <StudyBadge study={study} variant="compact" />
        </div>
      )}
    </div>
  );
}
