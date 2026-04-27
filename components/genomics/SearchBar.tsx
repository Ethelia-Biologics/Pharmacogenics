"use client";

import { useState } from "react";
import { Gene } from "../../types/genomics";
import { GENE_SUGGESTIONS } from "../../lib/constants";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  onGeneSelect: (symbol: string) => void;
  gene: Gene | null;
  isLoading: boolean;
  error: string | null;
}

export function SearchBar({ onGeneSelect, gene, isLoading, error }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onGeneSelect(inputValue.trim());
    }
  };

  return (
    <div className="w-full bg-bg-surface border-b border-border-default px-6 py-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSearch} className="relative mb-3">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-tertiary">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          </div>
          <input
            type="text"
            className="w-full bg-bg-surface-alt border border-border-default rounded-lg pl-10 pr-4 py-2.5 text-[15px] font-sans placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-text-link transition-all"
            placeholder="Search Gene (e.g. CYP2D6, KRAS)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {error && (
            <div className="absolute top-full left-0 mt-1 text-[12px] text-status-danger-text">
              {error}
            </div>
          )}
        </form>

        <div className="flex flex-wrap gap-2 mb-4">
          {GENE_SUGGESTIONS.map((symbol) => (
            <button
              key={symbol}
              onClick={() => {
                setInputValue(symbol);
                onGeneSelect(symbol);
              }}
              className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${
                gene?.symbol === symbol
                  ? "bg-text-link text-white border-text-link"
                  : "bg-white text-text-secondary border-border-default hover:border-text-link hover:text-text-link"
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>

        {gene && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <h1 className="text-2xl font-sans font-bold text-text-primary flex items-baseline gap-3 mb-1">
              {gene.symbol}
              <span className="text-[15px] font-normal text-text-secondary">
                {gene.name}
              </span>
            </h1>
            <p className="text-[13px] text-text-secondary max-w-3xl leading-relaxed">
              {gene.function_summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
