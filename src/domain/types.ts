import type { SectionKey } from "./sections";

export type AnswerValue = "cumple" | "no_cumple" | "no_aplica";

export interface Question {
  id: string;
  criterion: string;
  text: string;
  reference: string;
  findingText: string;
  recommendation?: string;
}

export interface EvaluationDraft {
  currentStep: number;
  startedAt: string;
  lastUpdatedAt: string;
  answers: Record<SectionKey, Record<string, AnswerValue>>;
}

export interface Finding {
  questionId: string;
  criterion: string;
  section: SectionKey;
  status: "cumple" | "no_cumple" | "no_aplica";
  detail: string;
}

export interface Diagnosis {
  overall: "cumple" | "cumple_parcialmente" | "no_cumple";
  /** Score (0-100) por cada sección */
  sectionScores: Record<SectionKey, number>;
  /** Promedio ponderado de todos los sectionScores */
  totalScore: number;
  findings: Finding[];
  recommendations: string[];
}

export interface EvaluationResult {
  id: string;
  completedAt: string;
  answers: Record<SectionKey, Record<string, AnswerValue>>;
  diagnosis: Diagnosis;
}
