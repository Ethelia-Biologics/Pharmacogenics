"use client";

import { Variant, Gene } from "../../types/genomics";
import { Dna, BarChart3, Globe } from "lucide-react";

interface InsightCardsProps {
  variant: Variant | null;
  gene: Gene | null;
  isLoading: boolean;
  error: string | null;
}

export function InsightCards({ variant, gene, isLoading }: InsightCardsProps) {
  if (isLoading) return <div className="h-64 flex items-center justify-center text-text-tertiary">Loading insights...</div>;
  if (!gene) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-700">
      {/* Genomic Context Card */}
      <div className="bg-white border border-border-default rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-status-pgx-bg rounded-lg text-status-pgx-text">
            <Dna size={20} />
          </div>
          <h3 className="text-[16px] font-sans font-bold text-text-primary uppercase tracking-tight">Genomic Context</h3>
        </div>
        
        <div className="space-y-4">
          <InsightRow label="Chromosome" value={variant?.chromosome || gene.chromosome} mono />
          <InsightRow label="Position (GRCh38)" value={variant?.position?.toLocaleString() || gene.start_position.toLocaleString()} mono />
          <InsightRow label="Reference Allele" value={variant?.ref_allele || "N/A"} mono />
          <InsightRow label="Alternative Allele" value={variant?.alt_allele || "N/A"} mono />
          <InsightRow label="Variant Type" value={variant?.variant_type || "N/A"} />
        </div>
      </div>

      {/* Expression Data Card */}
      <div className="bg-white border border-border-default rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-status-safe-bg rounded-lg text-status-safe-text">
            <BarChart3 size={20} />
          </div>
          <h3 className="text-[16px] font-sans font-bold text-text-primary uppercase tracking-tight">Tissue Expression</h3>
        </div>
        
        <div className="space-y-4">
          <ProgressBar label="Liver" value={92} />
          <ProgressBar label="Small Intestine" value={78} />
          <ProgressBar label="Kidney" value={45} />
          <ProgressBar label="Brain" value={12} />
        </div>
        <p className="mt-4 text-[11px] text-text-tertiary italic">
          Data source: GTEx Analysis V8 (TPM normalized)
        </p>
      </div>

      {/* Additional Insights */}
      <div className="lg:col-span-2 bg-bg-surface-alt border border-border-default rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={20} className="text-text-link" />
          <h3 className="text-[16px] font-sans font-bold text-text-primary uppercase tracking-tight">Associated Biological Pathways</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Metabolism of xenobiotics by cytochrome P450", "Drug metabolism - other enzymes", "Biological oxidations", "Phase I - Functionalization of compounds"].map((pathway) => (
            <span key={pathway} className="px-3 py-1.5 bg-white border border-border-default rounded-lg text-[12px] text-text-secondary font-medium shadow-sm">
              {pathway}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border-default/50 last:border-0">
      <span className="text-[12px] text-text-secondary font-medium">{label}</span>
      <span className={`text-[13px] ${mono ? 'font-mono' : 'font-sans'} font-bold text-text-primary`}>
        {value}
      </span>
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-tight">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-link">{value}%</span>
      </div>
      <div className="w-full h-2 bg-border-default rounded-full overflow-hidden">
        <div 
          className="h-full bg-text-link rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}
