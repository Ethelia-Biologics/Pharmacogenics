import { 
  Gene, 
  Variant, 
  Population, 
  SubPopulation, 
  PopulationVariantFreq, 
  Drug, 
  DrugGeneInteraction, 
  PopulationDrugResponse,
  Study
} from "../types/genomics";

// =============================================================================
// REAL DATA MAPPINGS (Extracted from PharmGKB and XLSX)
// =============================================================================

const GENES: Gene[] = [
  {
    id: "PA128",
    symbol: "CYP2D6",
    name: "cytochrome P450 family 2 subfamily D member 6",
    chromosome: "22",
    start_position: 42125531,
    end_position: 42130881,
    strand: "+",
    ncbi_gene_id: "1565",
    ensembl_id: "ENSG00000100197",
    function_summary: "Responsible for the metabolism of approximately 25% of clinical drugs, including antidepressants, antipsychotics, and opioids."
  },
  {
    id: "PA124",
    symbol: "CYP2C19",
    name: "cytochrome P450 family 2 subfamily C member 19",
    chromosome: "10",
    start_position: 94762681,
    end_position: 94853205,
    strand: "+",
    ncbi_gene_id: "1557",
    ensembl_id: "ENSG00000165841",
    function_summary: "A liver enzyme that acts on at least 10% of drugs in current clinical use, most notably the antiplatelet drug clopidogrel."
  },
  {
    id: "PA165819917",
    symbol: "KRAS",
    name: "KRAS proto-oncogene, GTPase",
    chromosome: "12",
    start_position: 25204789,
    end_position: 25250936,
    strand: "-",
    ncbi_gene_id: "3845",
    ensembl_id: "ENSG00000133703",
    function_summary: "A member of the RAS family of oncogenes. Mutations in KRAS are found in many cancers, particularly lung, colon, and pancreatic cancers."
  }
];

const VARIANTS: Variant[] = [
  // CYP2D6 Variants
  {
    id: "var-2d6-1",
    gene_id: "PA128",
    rsid: "rs3892097",
    chromosome: "22",
    position: 42128945,
    ref_allele: "C",
    alt_allele: "T",
    variant_type: "SNP",
    clinical_significance: "pathogenic",
    hgvs_notation: "NC_000022.11:g.42128945C>T"
  },
  {
    id: "var-2d6-2",
    gene_id: "PA128",
    rsid: "rs3918227",
    chromosome: "22",
    position: 42127941,
    ref_allele: "G",
    alt_allele: "A",
    variant_type: "SNP",
    clinical_significance: "pathogenic",
    hgvs_notation: "NC_000022.11:g.42127941G>A"
  },
  // CYP2C19 Variants
  {
    id: "var-2c19-1",
    gene_id: "PA124",
    rsid: "rs12248560",
    chromosome: "10",
    position: 94762681,
    ref_allele: "C",
    alt_allele: "T",
    variant_type: "SNP",
    clinical_significance: "benign",
    hgvs_notation: "NC_000010.11:g.94762681C>T"
  },
  {
    id: "var-2c19-2",
    gene_id: "PA124",
    rsid: "rs4244285",
    chromosome: "10",
    position: 94842866,
    ref_allele: "G",
    alt_allele: "A",
    variant_type: "SNP",
    clinical_significance: "pathogenic",
    hgvs_notation: "NC_000010.11:g.94842866G>A"
  },
  // KRAS Variants
  {
    id: "var-kras-1",
    gene_id: "PA165819917",
    rsid: "rs121913529",
    chromosome: "12",
    position: 25245350,
    ref_allele: "C",
    alt_allele: "A",
    variant_type: "SNP",
    clinical_significance: "pathogenic",
    hgvs_notation: "NC_000012.12:g.25245350C>A"
  }
];

const POPULATIONS: Population[] = [
  {
    id: "gnomad-global",
    name: "Global (gnomAD)",
    continent: "Global",
    region: "Global",
    ethnicity_group: "Mixed",
    haplotype_group: null as any,
    description: "Aggregated population data from gnomAD v2.1.1.",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-sas",
    name: "South Asian",
    continent: "Asia",
    region: "South Asia",
    ethnicity_group: "South Asian",
    haplotype_group: null as any,
    description: "South Asian population data from gnomAD.",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-eas",
    name: "East Asian",
    continent: "Asia",
    region: "East Asia",
    ethnicity_group: "Asian",
    haplotype_group: null as any,
    description: "East Asian population data from gnomAD.",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-afr",
    name: "African / African American",
    continent: "Africa",
    region: "Sub-Saharan Africa / Americas",
    ethnicity_group: "African",
    haplotype_group: null as any,
    description: "African and African American population data from gnomAD.",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-fin",
    name: "European (Finnish)",
    continent: "Europe",
    region: "Finland",
    ethnicity_group: "Finnish",
    haplotype_group: null as any,
    description: "Finnish European population data from gnomAD.",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-nfe",
    name: "European (non-Finnish)",
    continent: "Europe",
    region: "Europe",
    ethnicity_group: "European",
    haplotype_group: null as any,
    description: "Non-Finnish European population data from gnomAD.",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-amr",
    name: "Admixed American",
    continent: "Americas",
    region: "Americas",
    ethnicity_group: "Latino",
    haplotype_group: null as any,
    description: "Admixed American (Latino/Admixed) population data from gnomAD.",
    created_at: "2024-01-01T00:00:00Z"
  }
];

const SUB_POPULATIONS: SubPopulation[] = [
  {
    id: "gnomad-sas-csa",
    population_id: "gnomad-sas",
    name: "Central/South Asian",
    geographic_area: "Central and South Asia",
    linguistic_group: null as any,
    sample_size: 15308,
    data_source: "gnomAD",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-eas-jpn",
    population_id: "gnomad-eas",
    name: "Japanese",
    geographic_area: "Japan",
    linguistic_group: null as any,
    sample_size: 76,
    data_source: "gnomAD",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-eas-kor",
    population_id: "gnomad-eas",
    name: "Korean",
    geographic_area: "Korea",
    linguistic_group: null as any,
    sample_size: 190,
    data_source: "gnomAD",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-eur-nfe-nwe",
    population_id: "gnomad-nfe",
    name: "Northwestern European",
    geographic_area: "Northwest Europe",
    linguistic_group: null as any,
    sample_size: 32297,
    data_source: "gnomAD",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "gnomad-eur-nfe-seu",
    population_id: "gnomad-nfe",
    name: "Southern European",
    geographic_area: "South Europe",
    linguistic_group: null as any,
    sample_size: 5556,
    data_source: "gnomAD",
    created_at: "2024-01-01T00:00:00Z"
  }
];

const DRUGS: Drug[] = [
  {
    id: "D001",
    name: "venlafaxine",
    generic_name: "Venlafaxine",
    drug_class: "SNRI",
    mechanism: "Serotonin-norepinephrine reuptake inhibitor",
    atc_code: "N06AX16",
    fda_approval_status: "Approved",
    metabolic_pathway: "CYP2D6"
  },
  {
    id: "D002",
    name: "clopidogrel",
    generic_name: "Clopidogrel",
    drug_class: "Antiplatelet",
    mechanism: "P2Y12 receptor antagonist",
    atc_code: "B01AC04",
    fda_approval_status: "Approved",
    metabolic_pathway: "CYP2C19"
  },
  {
    id: "D003",
    name: "cetuximab",
    generic_name: "Cetuximab",
    drug_class: "Monoclonal Antibody",
    mechanism: "EGFR inhibitor",
    atc_code: "L01FE01",
    fda_approval_status: "Approved",
    metabolic_pathway: null as any
  }
];

const INTERACTIONS: DrugGeneInteraction[] = [
  {
    id: "INT-001",
    drug_id: "D001",
    gene_id: "PA128",
    interaction_type: "Metabolism",
    evidence_level: "1A",
    pgx_category: "metabolism",
    clinical_annotation: "CYP2D6 is the primary enzyme responsible for the metabolism of venlafaxine to its active metabolite."
  },
  {
    id: "INT-002",
    drug_id: "D002",
    gene_id: "PA124",
    interaction_type: "Activation",
    evidence_level: "1A",
    pgx_category: "metabolism",
    clinical_annotation: "Clopidogrel requires activation by CYP2C19 to form its active thiol metabolite."
  },
  {
    id: "INT-003",
    drug_id: "D003",
    gene_id: "PA165819917",
    interaction_type: "Response",
    evidence_level: "1A",
    pgx_category: "efficacy",
    clinical_annotation: "KRAS mutations are associated with poor response to EGFR inhibitors like cetuximab in colorectal cancer."
  }
];

const DRUG_RESPONSES: PopulationDrugResponse[] = [
  {
    id: "RESP-001",
    population_id: "gnomad-global",
    sub_population_id: null as any,
    drug_id: "D001",
    variant_id: "var-2d6-1",
    phenotype: "Poor Metabolizer",
    response_category: "poor_metabolizer",
    effect_size: 0.0,
    evidence_level: "1A",
    recommendation: "Consider alternative drug or dose adjustment.",
    cpic_guideline: "CPIC Guideline for CYP2D6 and venlafaxine",
    clinical_notes: "Increased risk of side effects due to high parent drug concentrations."
  }
];

const FREQUENCIES: PopulationVariantFreq[] = [
  // CYP2D6 Frequencies (for var-2d6-1)
  { id: "F-2D6-SAS", population_id: "gnomad-sas", sub_population_id: null as any, variant_id: "var-2d6-1", allele_frequency: 0.1008, minor_allele_freq: 0.1008, sample_count: 87366, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2D6-EAS", population_id: "gnomad-eas", sub_population_id: null as any, variant_id: "var-2d6-1", allele_frequency: 0.00305, minor_allele_freq: 0.00305, sample_count: 43626, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2D6-AFR", population_id: "gnomad-afr", sub_population_id: null as any, variant_id: "var-2d6-1", allele_frequency: 0.07386, minor_allele_freq: 0.07386, sample_count: 73310, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2D6-FIN", population_id: "gnomad-fin", sub_population_id: null as any, variant_id: "var-2d6-1", allele_frequency: 0.1014, minor_allele_freq: 0.1014, sample_count: 62010, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2D6-NFE", population_id: "gnomad-nfe", sub_population_id: null as any, variant_id: "var-2d6-1", allele_frequency: 0.1855, minor_allele_freq: 0.1855, sample_count: null as any, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2D6-AMR", population_id: "gnomad-amr", sub_population_id: null as any, variant_id: "var-2d6-1", allele_frequency: 0.1169, minor_allele_freq: 0.1169, sample_count: 54812, data_source: "gnomAD", study_id: "ST-001" },

  // CYP2C19 Frequencies (for var-2c19-1)
  { id: "F-2C19-SAS", population_id: "gnomad-sas", sub_population_id: null as any, variant_id: "var-2c19-1", allele_frequency: 0.3203, minor_allele_freq: 0.3203, sample_count: 65396, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2C19-EAS", population_id: "gnomad-eas", sub_population_id: null as any, variant_id: "var-2c19-1", allele_frequency: 0.3036, minor_allele_freq: 0.3036, sample_count: 36782, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2C19-AFR", population_id: "gnomad-afr", sub_population_id: null as any, variant_id: "var-2c19-1", allele_frequency: 0.1784, minor_allele_freq: 0.1784, sample_count: 67188, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2C19-FIN", population_id: "gnomad-fin", sub_population_id: null as any, variant_id: "var-2c19-1", allele_frequency: 0.1749, minor_allele_freq: 0.1749, sample_count: 61354, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2C19-NFE", population_id: "gnomad-nfe", sub_population_id: null as any, variant_id: "var-2c19-1", allele_frequency: 0.1462, minor_allele_freq: 0.1462, sample_count: null as any, data_source: "gnomAD", study_id: "ST-001" },
  { id: "F-2C19-AMR", population_id: "gnomad-amr", sub_population_id: null as any, variant_id: "var-2c19-1", allele_frequency: 0.1153, minor_allele_freq: 0.1153, sample_count: 34880, data_source: "gnomAD", study_id: "ST-001" }
];

const STUDIES: Study[] = [
  {
    id: "ST-001",
    title: "The gnomAD dataset: A resource for human genetic variation",
    pubmed_id: "32461654",
    study_type: "Population",
    sample_size: 141456,
    population_ancestry: "Mixed",
    publication_date: "2020-05-27"
  }
];

// =============================================================================
// ASYNC FUNCTIONS WITH 300ms LATENCY
// =============================================================================

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getGenes(): Promise<Gene[]> {
  await sleep(300);
  return GENES;
}

export async function getGeneBySymbol(symbol: string): Promise<Gene | null> {
  await sleep(300);
  return GENES.find((g) => g.symbol.toUpperCase() === symbol.toUpperCase()) || null;
}

export async function getPopulations(): Promise<Population[]> {
  await sleep(300);
  return POPULATIONS;
}

export async function getSubPopulations(populationId: string): Promise<SubPopulation[]> {
  await sleep(300);
  return SUB_POPULATIONS.filter((sp) => sp.population_id === populationId);
}

export async function getVariantsByGeneId(geneId: string): Promise<Variant[]> {
  await sleep(300);
  return VARIANTS.filter((v) => v.gene_id === geneId);
}

export async function getFrequency(
  populationId: string, 
  variantId: string, 
  subPopulationId: string | null = null
): Promise<{ frequency: PopulationVariantFreq | null; study: Study | null }> {
  await sleep(300);
  const freq = FREQUENCIES.find(
    (f) => f.population_id === populationId && 
           f.variant_id === variantId && 
           (subPopulationId ? f.sub_population_id === subPopulationId : true)
  ) || null;
  const study = freq ? STUDIES.find((s) => s.id === freq.study_id) || null : null;
  return { frequency: freq, study };
}

export async function getDrugInteractions(geneId: string): Promise<(DrugGeneInteraction & { drug: Drug })[]> {
  await sleep(300);
  return INTERACTIONS
    .filter((i) => i.gene_id === geneId)
    .map((interaction) => ({
      ...interaction,
      drug: DRUGS.find((d) => d.id === interaction.drug_id)!
    }));
}

export async function getDrugResponses(
  variantId: string, 
  populationId: string, 
  subPopulationId: string | null = null
): Promise<PopulationDrugResponse[]> {
  await sleep(300);
  return DRUG_RESPONSES.filter(
    (r) => r.variant_id === variantId && 
           r.population_id === populationId && 
           (subPopulationId ? r.sub_population_id === subPopulationId : true)
  );
}
