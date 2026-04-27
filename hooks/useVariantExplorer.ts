"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Gene, 
  Population, 
  SubPopulation, 
  Variant, 
  PopulationVariantFreq, 
  Drug, 
  DrugGeneInteraction, 
  PopulationDrugResponse,
  Study
} from "../types/genomics";
import { 
  getGenes, 
  getGeneBySymbol, 
  getPopulations, 
  getSubPopulations, 
  getVariantsByGeneId, 
  getFrequency, 
  getDrugInteractions, 
  getDrugResponses 
} from "../lib/mock-data";

export function useVariantExplorer() {
  // Active Tab
  const [activeTab, setActiveTab] = useState("overview");

  // Gene State
  const [gene, setGene] = useState<Gene | null>(null);
  const [geneLoading, setGeneLoading] = useState(false);
  const [geneError, setGeneError] = useState<string | null>(null);

  // Filter Selections
  const [selectedPopulationId, setSelectedPopulationId] = useState<string | null>(null);
  const [selectedSubPopulationId, setSelectedSubPopulationId] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  // Data Lists
  const [populations, setPopulations] = useState<Population[]>([]);
  const [subPopulations, setSubPopulations] = useState<SubPopulation[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [drugInteractions, setDrugInteractions] = useState<(DrugGeneInteraction & { drug: Drug })[]>([]);
  const [drugResponses, setDrugResponses] = useState<PopulationDrugResponse[]>([]);

  // Specific Data
  const [frequency, setFrequency] = useState<PopulationVariantFreq | null>(null);
  const [frequencyStudy, setFrequencyStudy] = useState<Study | null>(null);

  // Loading States
  const [populationsLoading, setPopulationsLoading] = useState(false);
  const [subPopulationsLoading, setSubPopulationsLoading] = useState(false);
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [frequencyLoading, setFrequencyLoading] = useState(false);
  const [drugInteractionsLoading, setDrugInteractionsLoading] = useState(false);
  const [drugResponsesLoading, setDrugResponsesLoading] = useState(false);

  // Error States
  const [populationsError, setPopulationsError] = useState<string | null>(null);
  const [subPopulationsError, setSubPopulationsError] = useState<string | null>(null);
  const [variantsError, setVariantsError] = useState<string | null>(null);
  const [frequencyError, setFrequencyError] = useState<string | null>(null);
  const [drugInteractionsError, setDrugInteractionsError] = useState<string | null>(null);
  const [drugResponsesError, setDrugResponsesError] = useState<string | null>(null);

  // Search Gene
  const searchGene = useCallback(async (symbol: string) => {
    if (!symbol) return;
    setGeneLoading(true);
    setGeneError(null);
    try {
      const data = await getGeneBySymbol(symbol);
      setGene(data);
      if (!data) setGeneError("Gene not found in database.");
    } catch (err) {
      setGeneError("Failed to fetch gene data.");
    } finally {
      setGeneLoading(false);
    }
  }, []);

  // Load Initial Gene Data (Populations, Variants, Interactions)
  useEffect(() => {
    if (!gene) {
      setPopulations([]);
      setVariants([]);
      setDrugInteractions([]);
      return;
    }

    const loadGeneData = async () => {
      // Load Populations
      setPopulationsLoading(true);
      try {
        const data = await getPopulations();
        setPopulations(data);
      } catch (err) {
        setPopulationsError("Failed to load populations.");
      } finally {
        setPopulationsLoading(false);
      }

      // Load Variants
      setVariantsLoading(true);
      try {
        const data = await getVariantsByGeneId(gene.id);
        setVariants(data);
      } catch (err) {
        setVariantsError("Failed to load variants.");
      } finally {
        setVariantsLoading(false);
      }

      // Load Interactions
      setDrugInteractionsLoading(true);
      try {
        const data = await getDrugInteractions(gene.id);
        setDrugInteractions(data);
      } catch (err) {
        setDrugInteractionsError("Failed to load drug interactions.");
      } finally {
        setDrugInteractionsLoading(false);
      }
    };

    loadGeneData();
    // Reset selections
    setSelectedPopulationId(null);
    setSelectedSubPopulationId(null);
    setSelectedVariantId(null);
  }, [gene]);

  // Load Sub-populations when Population changes
  useEffect(() => {
    if (!selectedPopulationId) {
      setSubPopulations([]);
      return;
    }

    const loadSubPops = async () => {
      setSubPopulationsLoading(true);
      try {
        const data = await getSubPopulations(selectedPopulationId);
        setSubPopulations(data);
      } catch (err) {
        setSubPopulationsError("Failed to load sub-populations.");
      } finally {
        setSubPopulationsLoading(false);
      }
    };

    loadSubPops();
    setSelectedSubPopulationId(null);
  }, [selectedPopulationId]);

  // Load Frequency when all filters are set
  useEffect(() => {
    if (!selectedPopulationId || !selectedVariantId) {
      setFrequency(null);
      setFrequencyStudy(null);
      return;
    }

    const loadFreq = async () => {
      setFrequencyLoading(true);
      try {
        const { frequency, study } = await getFrequency(
          selectedPopulationId, 
          selectedVariantId, 
          selectedSubPopulationId
        );
        setFrequency(frequency);
        setFrequencyStudy(study);
      } catch (err) {
        setFrequencyError("Failed to load frequency data.");
      } finally {
        setFrequencyLoading(false);
      }
    };

    loadFreq();
  }, [selectedPopulationId, selectedSubPopulationId, selectedVariantId]);

  // Load Drug Responses when variant/population changes
  useEffect(() => {
    if (!selectedVariantId || !selectedPopulationId) {
      setDrugResponses([]);
      return;
    }

    const loadResponses = async () => {
      setDrugResponsesLoading(true);
      try {
        const data = await getDrugResponses(
          selectedVariantId, 
          selectedPopulationId, 
          selectedSubPopulationId
        );
        setDrugResponses(data);
      } catch (err) {
        setDrugResponsesError("Failed to load drug responses.");
      } finally {
        setDrugResponsesLoading(false);
      }
    };

    loadResponses();
  }, [selectedVariantId, selectedPopulationId, selectedSubPopulationId]);

  return {
    // Gene
    gene,
    geneLoading,
    geneError,
    searchGene,
    retryGene: () => gene && searchGene(gene.symbol),

    // Selections
    selectedPopulationId,
    selectedSubPopulationId,
    selectedVariantId,
    setSelectedPopulationId,
    setSelectedSubPopulationId,
    setSelectedVariantId,

    // Data
    populations,
    populationsLoading,
    populationsError,
    subPopulations,
    subPopulationsLoading,
    subPopulationsError,
    variants,
    variantsLoading,
    variantsError,
    selectedVariant: variants.find(v => v.id === selectedVariantId) || null,
    frequency,
    frequencyLoading,
    frequencyError,
    frequencyStudy,
    drugInteractions,
    drugInteractionsLoading,
    drugInteractionsError,
    drugResponses,
    drugResponsesLoading,
    drugResponsesError,

    // Tabs
    activeTab,
    setActiveTab,

    // Retries
    retryPopulations: () => {}, // Simplified for now
    retrySubPopulations: () => {},
    retryVariants: () => {},
    retryFrequency: () => {},
    retryDrugInteractions: () => {},
    retryDrugResponses: () => {},
  };
}
