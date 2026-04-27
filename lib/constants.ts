// =============================================================================
// PharmacoGenomics — Centralized Constants
// All hardcoded values live here. Components import, never hardcode.
// =============================================================================

/**
 * Gene suggestion chips displayed below the search input.
 * Order is intentional: pharmacogenes first, then oncogenes, then tumor suppressors.
 */
export const GENE_SUGGESTIONS = [
  "CYP2D6",
  "CYP2C19",
  "KRAS",
  "BRAF",
  "EGFR",
  "TP53",
  "BRCA1",
] as const;

/**
 * CPIC evidence level labels and display styling.
 * Mapped to CSS custom properties defined in globals.css.
 */
export const EVIDENCE_LEVELS: Record<
  string,
  { label: string; color: string; bg: string; borderColor: string }
> = {
  "1A": {
    label: "1A — Strong",
    color: "var(--status-danger-text)",
    bg: "var(--status-danger-bg)",
    borderColor: "var(--status-danger-border)",
  },
  "1B": {
    label: "1B — Strong",
    color: "var(--status-danger-text)",
    bg: "var(--status-danger-bg)",
    borderColor: "var(--status-danger-border)",
  },
  "2A": {
    label: "2A — Moderate",
    color: "var(--status-warn-text)",
    bg: "var(--status-warn-bg)",
    borderColor: "var(--status-warn-border)",
  },
  "2B": {
    label: "2B — Moderate",
    color: "var(--status-warn-text)",
    bg: "var(--status-warn-bg)",
    borderColor: "var(--status-warn-border)",
  },
  "3": {
    label: "3 — Optional",
    color: "var(--text-secondary)",
    bg: "var(--bg-surface-alt)",
    borderColor: "var(--border-default)",
  },
  "4": {
    label: "4 — Informational",
    color: "var(--text-tertiary)",
    bg: "var(--bg-surface-alt)",
    borderColor: "var(--border-default)",
  },
};

/**
 * Pharmacogenomic category labels and display styling.
 */
export const PGX_CATEGORIES: Record<
  string,
  { label: string; color: string; bg: string; borderColor: string }
> = {
  dosing: {
    label: "Dosing",
    color: "var(--status-pgx-text)",
    bg: "var(--status-pgx-bg)",
    borderColor: "var(--status-pgx-border)",
  },
  efficacy: {
    label: "Efficacy",
    color: "var(--status-pgx-text)",
    bg: "var(--status-pgx-bg)",
    borderColor: "var(--status-pgx-border)",
  },
  "toxicity/ADR": {
    label: "Toxicity / ADR",
    color: "var(--status-danger-text)",
    bg: "var(--status-danger-bg)",
    borderColor: "var(--status-danger-border)",
  },
  metabolism: {
    label: "Metabolism",
    color: "var(--status-warn-text)",
    bg: "var(--status-warn-bg)",
    borderColor: "var(--status-warn-border)",
  },
};

/**
 * Population drug response categories with semantic colors.
 */
export const RESPONSE_CATEGORIES: Record<
  string,
  { label: string; color: string; bg: string; borderColor: string }
> = {
  increased_response: {
    label: "Increased Response",
    color: "var(--status-safe-text)",
    bg: "var(--status-safe-bg)",
    borderColor: "var(--status-safe-border)",
  },
  decreased_response: {
    label: "Decreased Response",
    color: "var(--status-warn-text)",
    bg: "var(--status-warn-bg)",
    borderColor: "var(--status-warn-border)",
  },
  adverse_reaction: {
    label: "Adverse Reaction",
    color: "var(--status-danger-text)",
    bg: "var(--status-danger-bg)",
    borderColor: "var(--status-danger-border)",
  },
  normal: {
    label: "Normal",
    color: "var(--text-secondary)",
    bg: "var(--bg-surface-alt)",
    borderColor: "var(--border-default)",
  },
  poor_metabolizer: {
    label: "Poor Metabolizer",
    color: "var(--status-danger-text)",
    bg: "var(--status-danger-bg)",
    borderColor: "var(--status-danger-border)",
  },
  ultra_rapid_metabolizer: {
    label: "Ultra-Rapid Metabolizer",
    color: "var(--status-warn-text)",
    bg: "var(--status-warn-bg)",
    borderColor: "var(--status-warn-border)",
  },
};

/**
 * Clinical significance classifications (ClinVar-aligned).
 */
export const CLINICAL_SIGNIFICANCE: Record<
  string,
  { label: string; color: string; bg: string; borderColor: string }
> = {
  pathogenic: {
    label: "Pathogenic",
    color: "var(--status-danger-text)",
    bg: "var(--status-danger-bg)",
    borderColor: "var(--status-danger-border)",
  },
  likely_pathogenic: {
    label: "Likely Pathogenic",
    color: "var(--status-danger-text)",
    bg: "var(--status-danger-bg)",
    borderColor: "var(--status-danger-border)",
  },
  uncertain: {
    label: "Uncertain Significance",
    color: "var(--status-warn-text)",
    bg: "var(--status-warn-bg)",
    borderColor: "var(--status-warn-border)",
  },
  likely_benign: {
    label: "Likely Benign",
    color: "var(--status-safe-text)",
    bg: "var(--status-safe-bg)",
    borderColor: "var(--status-safe-border)",
  },
  benign: {
    label: "Benign",
    color: "var(--status-safe-text)",
    bg: "var(--status-safe-bg)",
    borderColor: "var(--status-safe-border)",
  },
};

/**
 * Tab identifiers for the main content zone.
 */
export const MAIN_TABS = [
  { id: "overview", label: "Overview" },
  { id: "drug-interactions", label: "Drug Interactions" },
  { id: "population-response", label: "Population Response" },
  { id: "genomic-context", label: "Genomic Context" },
] as const;

export type MainTabId = (typeof MAIN_TABS)[number]["id"];
