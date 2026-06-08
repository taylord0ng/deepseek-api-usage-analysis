"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { ParseResult, ParseError, ParseWarning } from "./types";
import { parseDeepSeekData } from "./parser";

interface DataState {
  result: ParseResult | null;
  error: ParseError | null;
  warnings: ParseWarning[];
  loading: boolean;
  fileName: string;
}

interface DataContextValue extends DataState {
  loadFiles: (amountCSV: string, costCSV: string, fileName: string) => void;
  clear: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>({
    result: null,
    error: null,
    warnings: [],
    loading: false,
    fileName: "",
  });

  const loadFiles = useCallback(
    (amountCSV: string, costCSV: string, fileName: string) => {
      setState((s) => ({ ...s, loading: true, error: null }));
      // Use setTimeout to avoid blocking the UI during parsing
      setTimeout(() => {
        const parsed = parseDeepSeekData(amountCSV, costCSV);
        if ("error" in parsed) {
          setState({
            result: null,
            error: parsed.error,
            warnings: [],
            loading: false,
            fileName,
          });
        } else {
          setState({
            result: parsed,
            error: null,
            warnings: parsed.warnings,
            loading: false,
            fileName,
          });
        }
      }, 0);
    },
    []
  );

  const clear = useCallback(() => {
    setState({
      result: null,
      error: null,
      warnings: [],
      loading: false,
      fileName: "",
    });
  }, []);

  return (
    <DataContext.Provider value={{ ...state, loadFiles, clear }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
