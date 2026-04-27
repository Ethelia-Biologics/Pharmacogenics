// =============================================================================
// PharmacoGenomics — TypeScript Type Definitions
// Derived from the database ER schema (pharmacogenomics_db_schema.html)
// All IDs are UUIDs represented as strings.
// =============================================================================

export interface Population {
  id: string;
  name: string;
  continent: string;
  region: string;
  ethnicity_group: string;
  haplotype_group: string;
  description: string;
  created_at: string;
}

export interface SubPopulation {
  id: string;
  population_id: string;
  name: string;
  geographic_area: string;
  linguistic_group: string;
  sample_size: number;
  data_source: string;
  created_at: string;
}

export interface Gene {
  id: string;
  symbol: string;
  name: string;
  chromosome: string;
  start_position: number;
  end_position: number;
  strand: string;
  ncbi_gene_id: string;
  ensembl_id: string;
  function_summary: string;
}

export interface Variant {
  id: string;
  gene_id: string;
  rsid: string;
  chromosome: string;
  position: number;
  ref_allele: string;
  alt_allele: string;
  variant_type: string;
  clinical_significance: string;
  hgvs_notation: string;
}

export interface PopulationVariantFreq {
  id: string;
  population_id: string;
  sub_population_id: string;
  variant_id: string;
  allele_frequency: number;
  minor_allele_freq: number;
  sample_count: number;
  data_source: string;
  study_id: string;
}

export interface Drug {
  id: string;
  name: string;
  generic_name: string;
  drug_class: string;
  mechanism: string;
  atc_code: string;
  fda_approval_status: string;
  metabolic_pathway: string;
}

export interface DrugGeneInteraction {
  id: string;
  drug_id: string;
  gene_id: string;
  interaction_type: string;
  evidence_level: string;
  pgx_category: string;
  clinical_annotation: string;
}

export interface PopulationDrugResponse {
  id: string;
  population_id: string;
  sub_population_id: string;
  drug_id: string;
  variant_id: string;
  phenotype: string;
  response_category: string;
  effect_size: number;
  evidence_level: string;
  recommendation: string;
  cpic_guideline: string;
  clinical_notes: string;
}

export interface Study {
  id: string;
  title: string;
  pubmed_id: string;
  study_type: string;
  sample_size: number;
  population_ancestry: string;
  publication_date: string;
}
