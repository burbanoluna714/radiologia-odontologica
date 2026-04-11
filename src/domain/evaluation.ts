import type { Diagnosis, EvaluationDraft, Finding, Question } from "./types";
import { infrastructureQuestions, equipmentQuestions } from "./questions";

function getQuestionsBySection(section: "infrastructure" | "equipment"): Question[] {
  return section === "infrastructure" ? infrastructureQuestions : equipmentQuestions;
}

export function evaluateDiagnosis(draft: EvaluationDraft): Diagnosis {
  const sections = ["infrastructure", "equipment"] as const;
  const scores: Record<string, number> = {
    infrastructure: 0,
    equipment: 0,
  };
  
  const findings: Finding[] = [];
  const recommendations: Set<string> = new Set();
  let hasCriticalFailure = false;

  for (const section of sections) {
    const sectionAnswers = draft.answers[section];
    const questions = getQuestionsBySection(section);
    
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
          section,
          status: "no_cumple",
          detail: q.findingText,
        });
        
        if (q.recommendation) {
          recommendations.add(q.recommendation);
        }
        
        if (q.isCritical) {
          hasCriticalFailure = true;
        }
      }
    }

    scores[section] = applicable > 0 
      ? Math.round((compliant / applicable) * 100) 
      : 100;
  }

  const totalScore = Math.round(
    (scores.infrastructure + scores.equipment) / 2
  );

  let overall: Diagnosis["overall"] = "cumple";

  if (hasCriticalFailure || totalScore < 60 || scores.infrastructure < 60 || scores.equipment < 60) {
    overall = "no_cumple";
  } else if (totalScore < 90 || scores.infrastructure < 80 || scores.equipment < 80) {
    overall = "cumple_parcialmente";
  }

  return {
    overall,
    infrastructureScore: scores.infrastructure,
    equipmentScore: scores.equipment,
    totalScore,
    findings,
    recommendations: Array.from(recommendations),
  };
}
