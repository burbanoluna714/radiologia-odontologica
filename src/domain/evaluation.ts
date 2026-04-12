import type { Diagnosis, EvaluationDraft, Finding } from "./types";
import { SECTIONS, type SectionKey } from "./sections";
import { ALL_SECTIONS_QUESTIONS } from "./questions";

/**
 * Evalúa un draft de evaluación y devuelve el diagnóstico.
 * Itera dinámicamente sobre SECTIONS — agregar/quitar secciones en sections.ts
 * actualiza automáticamente este cálculo sin modificar nada aquí.
 */
export function evaluateDiagnosis(draft: EvaluationDraft): Diagnosis {
  const sectionScores: Record<string, number> = {};
  const findings: Finding[] = [];
  const recommendations = new Set<string>();
  let hasCriticalFailure = false;

  for (const section of SECTIONS) {
    const key = section.key as SectionKey;
    const sectionAnswers = draft.answers[key] ?? {};
    const questions = ALL_SECTIONS_QUESTIONS[key] ?? [];

    let applicable = 0;
    let compliant = 0;

    for (const q of questions) {
      const answer = sectionAnswers[q.id];

      if (!answer || answer === "no_aplica") continue;

      applicable++;
      if (answer === "cumple") {
        compliant++;
      } else {
        findings.push({
          questionId: q.id,
          criterion: q.criterion,
          section: key,
          status: "no_cumple",
          detail: q.findingText,
        });

        if (q.recommendation) {
          recommendations.add(q.recommendation);
        }
      }
    }

    sectionScores[key] = applicable > 0
      ? Math.round((compliant / applicable) * 100)
      : 100;
  }

  const scoreValues = Object.values(sectionScores);
  const totalScore = scoreValues.length > 0
    ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
    : 100;

  const anyBelowMinimum = scoreValues.some((s) => s < 60);
  const anyBelowGood = scoreValues.some((s) => s < 80);

  let overall: Diagnosis["overall"] = "cumple";

  if (hasCriticalFailure || totalScore < 100 || anyBelowMinimum || anyBelowGood || findings.length > 0) {
    overall = "no_cumple";
  }

  return {
    overall,
    sectionScores: sectionScores as Record<SectionKey, number>,
    totalScore,
    findings,
    recommendations: Array.from(recommendations),
  };
}
