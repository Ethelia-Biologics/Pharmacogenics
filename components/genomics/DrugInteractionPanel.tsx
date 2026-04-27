"use client";

import { DrugGeneInteraction, Drug } from "../../types/genomics";
import { EVIDENCE_LEVELS, PGX_CATEGORIES } from "../../lib/constants";
import { Loader2, Pill, Activity } from "lucide-react";

interface DrugInteractionPanelProps {
  interactions: (DrugGeneInteraction & { drug: Drug })[];
  isLoading: boolean;
  error: string | null;
}

export function DrugInteractionPanel({ interactions, isLoading, error }: DrugInteractionPanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-tertiary">
        <Loader2 size={32} className="animate-spin mb-4" />
        <span className="text-[14px]">Fetching interactions...</span>
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

  if (interactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-tertiary border-2 border-dashed border-border-default rounded-2xl">
        <Pill size={32} className="mb-4 opacity-20" />
        <p className="text-[14px] italic">No major drug interactions found for this gene.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {interactions.map((interaction) => (
        <div 
          key={interaction.id} 
          className="group relative bg-white border border-border-default rounded-xl p-5 transition-all hover:shadow-sm hover:border-text-link/30"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-surface-alt rounded-lg text-text-link">
                <Pill size={18} />
              </div>
              <div>
                <h3 className="text-[16px] font-sans font-bold text-text-primary capitalize tracking-tight">
                  {interaction.drug.name}
                </h3>
                <span className="text-[11px] text-text-tertiary uppercase font-medium tracking-wide">
                  {interaction.drug.drug_class || "Pharmacological Agent"}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Badge 
                config={EVIDENCE_LEVELS[interaction.evidence_level]} 
                fallback={interaction.evidence_level} 
              />
              <Badge 
                config={PGX_CATEGORIES[interaction.pgx_category]} 
                fallback={interaction.pgx_category} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-bg-surface-alt rounded-lg border border-border-default/50">
              <div className="flex items-center gap-2 mb-1.5">
                <Activity size={14} className="text-text-secondary" />
                <span className="text-[11px] font-bold text-text-secondary uppercase">Clinical Annotation</span>
              </div>
              <p className="text-[13px] text-text-primary leading-relaxed">
                {interaction.clinical_annotation}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div className="flex flex-col">
                <span className="text-text-tertiary font-medium uppercase tracking-tighter">Mechanism</span>
                <span className="text-text-secondary">{interaction.drug.mechanism || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-tertiary font-medium uppercase tracking-tighter">Type</span>
                <span className="text-text-secondary">{interaction.interaction_type}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Badge({ config, fallback }: { config?: { bg: string; color: string; borderColor: string; label?: string }; fallback: string }) {
  if (!config) {
    return (
      <span className="px-2 py-0.5 bg-bg-surface-alt border border-border-default rounded text-[10px] font-bold text-text-tertiary uppercase">
        {fallback}
      </span>
    );
  }

  return (
    <span 
      className="px-2 py-0.5 rounded text-[10px] font-bold border uppercase transition-colors"
      style={{ 
        backgroundColor: config.bg, 
        color: config.color, 
        borderColor: config.borderColor 
      }}
    >
      {config.label || fallback}
    </span>
  );
}
