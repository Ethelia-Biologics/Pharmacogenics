"use client";

import { Study } from "../../types/genomics";
import { ExternalLink } from "lucide-react";

interface StudyBadgeProps {
  study: Study;
  variant: "compact" | "expanded";
}

export function StudyBadge({ study, variant }: StudyBadgeProps) {
  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-bg-surface-alt border border-border-default rounded text-[11px] text-text-secondary font-sans transition-colors hover:border-text-link hover:text-text-link cursor-pointer">
        <span>PMID: {study.pubmed_id}</span>
        <span className="opacity-40">•</span>
        <span className="uppercase tracking-wider font-semibold">{study.study_type}</span>
      </div>
    );
  }

  return (
    <div className="p-3 bg-bg-surface-alt border border-border-default rounded-lg font-sans">
      <div className="flex justify-between items-start gap-4 mb-2">
        <h4 className="text-[13px] font-semibold text-text-primary leading-snug">
          {study.title}
        </h4>
        <a 
          href={`https://pubmed.ncbi.nlm.nih.gov/${study.pubmed_id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-link hover:opacity-80 shrink-0"
        >
          <ExternalLink size={14} />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-[11px]">
        <div className="flex justify-between border-b border-border-default pb-0.5">
          <span className="text-text-tertiary">Type</span>
          <span className="text-text-secondary font-medium">{study.study_type}</span>
        </div>
        <div className="flex justify-between border-b border-border-default pb-0.5">
          <span className="text-text-tertiary">PubMed ID</span>
          <span className="text-text-secondary font-medium">{study.pubmed_id}</span>
        </div>
        <div className="flex justify-between border-b border-border-default pb-0.5">
          <span className="text-text-tertiary">Sample Size</span>
          <span className="text-text-secondary font-medium">{study.sample_size || "N/A"}</span>
        </div>
        <div className="flex justify-between border-b border-border-default pb-0.5">
          <span className="text-text-tertiary">Ancestry</span>
          <span className="text-text-secondary font-medium">{study.population_ancestry}</span>
        </div>
      </div>
      <div className="mt-2 text-[10px] text-text-tertiary italic">
        Published: {study.publication_date}
      </div>
    </div>
  );
}
