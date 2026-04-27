"use client";

import { Gene, Variant } from "../../types/genomics";
import { Loader2, Info } from "lucide-react";

interface OverviewPanelProps {
  gene: Gene | null;
  variant: Variant | null;
  isLoading: boolean;
  error: string | null;
}

export function OverviewPanel({ gene, variant, isLoading, error }: OverviewPanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-tertiary">
        <Loader2 size={32} className="animate-spin mb-4" />
        <span className="text-[14px]">Generating overview...</span>
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

  if (!gene) return null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Gene Metadata */}
      <section>
        <h3 className="text-[15px] font-sans font-bold text-text-primary mb-4 pb-2 border-b-2 border-text-link inline-block">
          Gene Genomic Metadata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <DataRow label="Chromosome" value={gene.chromosome} mono />
          <DataRow label="Start Position" value={gene.start_position.toLocaleString()} mono />
          <DataRow label="End Position" value={gene.end_position.toLocaleString()} mono />
          <DataRow label="Strand" value={gene.strand} mono />
          <DataRow label="Ensembl ID" value={gene.ensembl_id} mono link={`https://www.ensembl.org/id/${gene.ensembl_id}`} />
          <DataRow label="NCBI Gene ID" value={gene.ncbi_gene_id} mono link={`https://www.ncbi.nlm.nih.gov/gene/${gene.ncbi_gene_id}`} />
        </div>
      </section>

      {/* Variant Summary */}
      {variant ? (
        <section className="animate-in slide-in-from-top-4 duration-500 fill-mode-both">
          <h3 className="text-[15px] font-sans font-bold text-text-primary mb-4 pb-2 border-b-2 border-status-pgx-border inline-block">
            Variant Summary: {variant.rsid}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            <DataRow label="Variant Type" value={variant.variant_type} />
            <DataRow label="ClinVar Significance" value={variant.clinical_significance} status={variant.clinical_significance} />
            <DataRow label="HGVS Notation" value={variant.hgvs_notation} mono wrap />
            <DataRow label="PharmGKB ID" value={variant.id} mono />
          </div>
        </section>
      ) : (
        <div className="p-6 bg-bg-surface-alt border border-dashed border-border-default rounded-xl flex items-center gap-3 text-text-secondary italic text-[13px]">
          <Info size={16} className="text-text-tertiary" />
          Select a variant in the left panel to see specific genomic details.
        </div>
      )}
    </div>
  );
}

function DataRow({ 
  label, 
  value, 
  mono, 
  link, 
  status, 
  wrap 
}: { 
  label: string; 
  value: string | number; 
  mono?: boolean; 
  link?: string; 
  status?: string;
  wrap?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">{label}</span>
      <div className={`text-[13px] ${mono ? 'font-mono' : 'font-sans'} ${wrap ? 'break-all' : ''} text-text-primary`}>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-text-link hover:underline">
            {value}
          </a>
        ) : status ? (
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
            status.toLowerCase().includes('pathogenic') ? 'bg-status-danger-bg text-status-danger-text' : 
            status.toLowerCase().includes('benign') ? 'bg-status-safe-bg text-status-safe-text' : 
            'bg-status-warn-bg text-status-warn-text'
          }`}>
            {value}
          </span>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
