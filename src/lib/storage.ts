import type { EvaluationDraft, EvaluationResult } from "../domain/types";

const DRAFT_KEY = "servicio-luna:draft";
const RESULTS_KEY = "servicio-luna:results";

export function getDraft(): EvaluationDraft | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(DRAFT_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as EvaluationDraft;
  } catch {
    return null;
  }
}

export function saveDraft(draft: EvaluationDraft): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DRAFT_KEY);
}

export function getResults(): EvaluationResult[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(RESULTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as EvaluationResult[];
  } catch {
    return [];
  }
}

export function saveResult(result: EvaluationResult): void {
  if (typeof window === "undefined") return;
  const results = getResults();
  results.push(result);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function getResultById(id: string): EvaluationResult | null {
  const results = getResults();
  return results.find((r) => r.id === id) ?? null;
}

export function clearResults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RESULTS_KEY);
}
