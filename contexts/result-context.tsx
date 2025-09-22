"use client";

import type { Analysis } from "@/lib/types/analysis-type";
import type { Report } from "@/lib/types/survey-type";
import { createContext, use } from "react";

type ContextProps = {
  id: string;
  getAnalyses: Promise<{ analyses: Analysis[] } | { error: unknown }> | null;
  report: Report | null;
};

const ctx = createContext<ContextProps>({
  id: "",
  getAnalyses: null,
  report: null,
});

export function ResultContextProvider({
  children,
  ...value
}: ContextProps & { children: React.ReactNode }) {
  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}

export function useReport() {
  const data = use(ctx);
  return data;
}
