"use client";

import { useVariantExplorer } from "../hooks/useVariantExplorer";
import { SearchBar } from "../components/genomics/SearchBar";
import { FiltersSection } from "../components/genomics/FiltersSection";
import { FrequencyPanel } from "../components/genomics/FrequencyPanel";
import { OverviewPanel } from "../components/genomics/OverviewPanel";
import { DrugInteractionPanel } from "../components/genomics/DrugInteractionPanel";
import { DrugResponsePanel } from "../components/genomics/DrugResponsePanel";
import { InsightCards } from "../components/genomics/InsightCards";
import { MAIN_TABS } from "../lib/constants";
import { Dna } from "lucide-react";

export default function Home() {
  const {
    gene,
    geneLoading,
    geneError,
    searchGene,
    populations,
    subPopulations,
    variants,
    selectedPopulationId,
    selectedSubPopulationId,
    selectedVariantId,
    setSelectedPopulationId,
    setSelectedSubPopulationId,
    setSelectedVariantId,
    subPopulationsLoading,
    variantsLoading,
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
    activeTab,
    setActiveTab,
    selectedVariant,
  } = useVariantExplorer();

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-text-link/10 selection:text-text-link">
      {/* ZONE 1: TOP BAR */}
      <SearchBar 
        onGeneSelect={searchGene} 
        gene={gene} 
        isLoading={geneLoading} 
        error={geneError} 
      />

      <div className="flex flex-1 pt-[180px]"> {/* Offset for fixed top bar */}
        
        {/* ZONE 2: LEFT PANEL */}
        <aside className="w-[320px] fixed left-0 bottom-0 top-[180px] bg-bg-surface-alt border-r border-border-default overflow-y-auto px-6 py-8">
          {gene ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <FiltersSection 
                populations={populations}
                subPopulations={subPopulations}
                variants={variants}
                selectedPopulationId={selectedPopulationId}
                selectedSubPopulationId={selectedSubPopulationId}
                selectedVariantId={selectedVariantId}
                onPopulationChange={setSelectedPopulationId}
                onSubPopulationChange={setSelectedSubPopulationId}
                onVariantChange={setSelectedVariantId}
                isLoadingSubPops={subPopulationsLoading}
                isLoadingVariants={variantsLoading}
                errorSubPops={null}
                errorVariants={null}
              />

              <div className="pt-8 border-t border-border-default">
                <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-4 block">
                  Population Frequency
                </label>
                <FrequencyPanel 
                  frequency={frequency}
                  study={frequencyStudy}
                  isLoading={frequencyLoading}
                  error={frequencyError}
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-40">
              <Dna size={48} className="mb-4 text-text-tertiary" />
              <p className="text-[14px] font-medium text-text-secondary leading-relaxed">
                Enter a gene symbol above to begin explorer genomic associations
              </p>
            </div>
          )}
        </aside>

        {/* ZONE 3: MAIN CONTENT */}
        <main className="flex-1 ml-[320px] bg-bg-canvas overflow-y-auto">
          <div className="max-w-5xl mx-auto px-10 py-8">
            {gene ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Tabs Navigation */}
                <div className="flex gap-8 border-b border-border-default mb-8 sticky top-0 bg-bg-canvas/80 backdrop-blur-md z-10">
                  {MAIN_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 text-[14px] font-bold transition-all relative ${
                        activeTab === tab.id 
                          ? "text-text-link" 
                          : "text-text-tertiary hover:text-text-secondary"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-text-link rounded-t-full shadow-[0_-2px_8px_rgba(29,95,168,0.3)]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="pb-20">
                  {activeTab === "overview" && (
                    <OverviewPanel 
                      gene={gene} 
                      variant={selectedVariant} 
                      isLoading={false} 
                      error={null} 
                    />
                  )}
                  {activeTab === "drug-interactions" && (
                    <DrugInteractionPanel 
                      interactions={drugInteractions} 
                      isLoading={drugInteractionsLoading} 
                      error={drugInteractionsError} 
                    />
                  )}
                  {activeTab === "population-response" && (
                    <DrugResponsePanel 
                      responses={drugResponses} 
                      isLoading={drugResponsesLoading} 
                      error={drugResponsesError} 
                    />
                  )}
                  {activeTab === "genomic-context" && (
                    <InsightCards 
                      gene={gene} 
                      variant={selectedVariant} 
                      isLoading={false} 
                      error={null} 
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center">
                <div className="bg-bg-surface border border-border-default rounded-3xl p-12 shadow-sm text-center max-w-md">
                  <div className="w-16 h-16 bg-bg-surface-alt rounded-2xl flex items-center justify-center mx-auto mb-6 text-text-tertiary">
                    <SearchIcon size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary mb-2">Genome Explorer Idle</h2>
                  <p className="text-[14px] text-text-secondary leading-relaxed">
                    Select a gene chip or use the search bar above to load pharmacogenomics data models.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}

function SearchIcon({ size }: { size?: number }) {
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
    >
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}
