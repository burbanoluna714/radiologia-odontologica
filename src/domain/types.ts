export type AnswerValue = "cumple" | "no_cumple" | "no_aplica";

export interface EvaluationDraft {
  currentStep: number;
  startedAt: string;
  lastUpdatedAt: string;
  answers: {
    infrastructure: Record<string, AnswerValue>;
    equipment: Record<string, AnswerValue>;
  };
}

export interface Finding {
  questionId: string;
  criterion: string;
  section: "infrastructure" | "equipment";
  status: "cumple" | "no_cumple" | "no_aplica";
  detail: string;
}

export interface Diagnosis {
  overall: "cumple" | "cumple_parcialmente" | "no_cumple";
  infrastructureScore: number;
  equipmentScore: number;
  totalScore: number;
  findings: Finding[];
  recommendations: string[];
}

export interface EvaluationResult {
  id: string;
  completedAt: string;
  answers: {
    infrastructure: Record<string, AnswerValue>;
    equipment: Record<string, AnswerValue>;
  };
  diagnosis: Diagnosis;
}

export interface Question {
  id: string;
  criterion: string;
  text: string;
  reference: string;
  findingText: string;
  recommendation?: string;
  isCritical?: boolean;
}
