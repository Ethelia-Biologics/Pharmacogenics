"use client";

import { PopulationDrugResponse } from "../../types/genomics";
import { EVIDENCE_LEVELS, RESPONSE_CATEGORIES } from "../../lib/constants";
import { Loader2, Beaker, FileText, CheckCircle2 } from "lucide-react";

interface DrugResponsePanelProps {
  responses: PopulationDrugResponse[];
  isLoading: boolean;
  error: string | null;
}

export function DrugResponsePanel({ responses, isLoading, error }: DrugResponsePanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-tertiary">
        <Loader2 size={32} className="animate-spin mb-4" />
        <span className="text-[14px]">Loading clinical responses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-status-danger-bg border border-status-danger-border rounded-lg text-status-danger-text">
        {error}
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-tertiary border-2 border-dashed border-border-default rounded-2xl">
        <Beaker size={32} className="mb-4 opacity-20" />
        <p className="text-[14px] italic">No population-specific responses available for these filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {responses.map((response) => (
        <div key={response.id} className="bg-white border border-border-default rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-bg-surface-alt px-6 py-4 border-b border-border-default flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-text-link" />
              <span className="text-[13px] font-bold text-text-primary uppercase tracking-tight">Clinical Guideline Match</span>
            </div>
            <Badge config={EVIDENCE_LEVELS[response.evidence_level]} fallback={response.evidence_level} />
          </div>

          <div className="p-6 space-y-6">
            {/* Labeled Field Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <ResponseRow label="Phenotype" value={response.phenotype} />
              <ResponseRow 
                label="Response Category" 
                value={RESPONSE_CATEGORIES[response.response_category]?.label || response.response_category} 
                statusConfig={RESPONSE_CATEGORIES[response.response_category]}
              />
              <ResponseRow label="Effect Size" value={response.effect_size.toString()} mono />
              <ResponseRow label="CPIC Guideline" value={response.cpic_guideline} />
            </div>

            <div className="space-y-4 pt-4 border-t border-border-default">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-tertiary uppercase flex items-center gap-2">
                  <FileText size={14} /> Therapeutic Recommendation
                </label>
                <div className="p-4 bg-status-pgx-bg/30 border border-status-pgx-border/30 rounded-xl">
                  <p className="text-[14px] font-sans font-medium text-text-primary leading-relaxed">
                    {response.recommendation}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-tertiary uppercase flex items-center gap-2">
                  <Info size={14} /> Clinical Notes
                </label>
                <p className="text-[13px] text-text-secondary leading-relaxed pl-1 border-l-2 border-border-default">
                  {response.clinical_notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResponseRow({ label, value, mono, statusConfig }: { label: string; value: string; mono?: boolean; statusConfig?: any }) {
  return (
    <div className="flex justify-between items-baseline group">
      <span className="text-[12px] text-text-tertiary font-medium">{label}</span>
      <div className="flex-1 border-b border-dotted border-border-default mx-3 h-0.5" />
      <span className={`text-[13px] ${mono ? 'font-mono' : 'font-sans'} font-bold ${
        statusConfig ? 'px-2 py-0.5 rounded text-[11px]' : 'text-text-primary'
      }`}
      style={statusConfig ? { 
        backgroundColor: statusConfig.bg, 
        color: statusConfig.color, 
        border: `1px solid ${statusConfig.borderColor}` 
      } : {}}
      >
        {value}
      </span>
    </div>
  );
}

function Badge({ config, fallback }: { config?: any; fallback: string }) {
  return (
    <span 
      className="px-2 py-1 rounded text-[11px] font-bold border uppercase"
      style={config ? { 
        backgroundColor: config.bg, 
        color: config.color, 
        borderColor: config.borderColor 
      } : {}}
    >
      {config?.label || fallback}
    </span>
  );
}

function Info({ size, className }: { size?: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  );
}
