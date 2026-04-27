"use client";

import { Population, SubPopulation, Variant } from "../../types/genomics";
import { ChevronDown, Loader2 } from "lucide-react";

interface FiltersSectionProps {
  populations: Population[];
  subPopulations: SubPopulation[];
  variants: Variant[];
  selectedPopulationId: string | null;
  selectedSubPopulationId: string | null;
  selectedVariantId: string | null;
  onPopulationChange: (id: string) => void;
  onSubPopulationChange: (id: string) => void;
  onVariantChange: (id: string) => void;
  isLoadingSubPops: boolean;
  isLoadingVariants: boolean;
  errorSubPops: string | null;
  errorVariants: string | null;
}

export function FiltersSection({
  populations,
  subPopulations,
  variants,
  selectedPopulationId,
  selectedSubPopulationId,
  selectedVariantId,
  onPopulationChange,
  onSubPopulationChange,
  onVariantChange,
  isLoadingSubPops,
  isLoadingVariants,
  errorSubPops,
  errorVariants,
}: FiltersSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Population Select */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">
          Population
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-border-default rounded-md px-3 py-2 text-[13px] text-text-primary focus:outline-none focus:ring-1 focus:ring-text-link disabled:opacity-50 transition-all cursor-pointer"
            value={selectedPopulationId || ""}
            onChange={(e) => onPopulationChange(e.target.value)}
          >
            <option value="" disabled>Select Population...</option>
            {populations.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
        </div>
      </div>

      {/* Sub-population Select */}
      <div className="flex flex-col gap-2">
        <label className={`text-[11px] font-semibold uppercase tracking-wider transition-colors ${!selectedPopulationId ? 'text-text-tertiary opacity-30' : 'text-text-tertiary'}`}>
          Sub-Population
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-border-default rounded-md px-3 py-2 text-[13px] text-text-primary focus:outline-none focus:ring-1 focus:ring-text-link disabled:bg-bg-surface-alt disabled:cursor-not-allowed transition-all"
            disabled={!selectedPopulationId || isLoadingSubPops}
            value={selectedSubPopulationId || ""}
            onChange={(e) => onSubPopulationChange(e.target.value)}
          >
            <option value="">All Sub-Populations</option>
            {subPopulations.map((sp) => (
              <option key={sp.id} value={sp.id}>{sp.name}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            {isLoadingSubPops && <Loader2 size={12} className="animate-spin text-text-link" />}
            <ChevronDown size={14} className="text-text-tertiary" />
          </div>
        </div>
        {errorSubPops && <p className="text-[10px] text-status-danger-text">{errorSubPops}</p>}
      </div>

      {/* Variant Select */}
      <div className="flex flex-col gap-2">
        <label className={`text-[11px] font-semibold uppercase tracking-wider transition-colors ${!selectedPopulationId ? 'text-text-tertiary opacity-30' : 'text-text-tertiary'}`}>
          Variant / Haplotype
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-border-default rounded-md px-3 py-2 text-[13px] text-text-primary focus:outline-none focus:ring-1 focus:ring-text-link disabled:bg-bg-surface-alt disabled:cursor-not-allowed transition-all font-mono"
            disabled={!selectedPopulationId || isLoadingVariants}
            value={selectedVariantId || ""}
            onChange={(e) => onVariantChange(e.target.value)}
          >
            <option value="" disabled>Select Variant...</option>
            {variants.map((v) => (
              <option key={v.id} value={v.id}>{v.rsid} ({v.ref_allele}/{v.alt_allele})</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            {isLoadingVariants && <Loader2 size={12} className="animate-spin text-text-link" />}
            <ChevronDown size={14} className="text-text-tertiary" />
          </div>
        </div>
        {errorVariants && <p className="text-[10px] text-status-danger-text">{errorVariants}</p>}
      </div>
    </div>
  );
}
