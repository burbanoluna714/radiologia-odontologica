import { useState, useEffect } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { StepperNav } from "./StepperNav";
import { SectionForm } from "./SectionForm";
import { ResultsDashboard } from "./ResultsDashboard";
import { AbandonDialog } from "./AbandonDialog";
import { getDraft, saveDraft, clearDraft, saveResult } from "@/lib/storage";
import { evaluateDiagnosis } from "@/domain/evaluation";
import { SECTIONS, type SectionKey } from "@/domain/sections";
import type { EvaluationDraft, EvaluationResult } from "@/domain/types";
import type { SectionFormValues } from "@/domain/schemas";
import { DevTools } from "./DevTools";

// ---------------------------------------------------------------------------
// Helper: build empty answers for all sections
// ---------------------------------------------------------------------------

function buildEmptyAnswers(): Record<SectionKey, Record<string, never>> {
  return Object.fromEntries(SECTIONS.map((s) => [s.key, {}])) as any;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EvaluationWizard() {
  const [draft, setDraft] = useState<EvaluationDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);

  useEffect(() => {
    try {
      const existing = getDraft();
      if (
        existing &&
        existing.answers &&
        SECTIONS.every((s) => s.key in existing.answers)
      ) {
        // Draft compatible con el nuevo formato — reutilizar
        setDraft(existing);
      } else {
        // Draft inexistente o formato anterior (infrastructure/equipment)
        if (existing) clearDraft(); // limpiar formato viejo de localStorage
        setDraft({
          currentStep: 0,
          startedAt: new Date().toISOString(),
          lastUpdatedAt: new Date().toISOString(),
          answers: buildEmptyAnswers(),
        });
      }
    } catch (err) {
      console.error("[EvaluationWizard] Error al inicializar:", err);
      clearDraft();
      setDraft({
        currentStep: 0,
        startedAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        answers: buildEmptyAnswers(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Save answers for current section mid-form (auto-save)
  const handleSaveConfig = (sectionKey: SectionKey, values: Partial<SectionFormValues>) => {
    if (!draft) return;
    const newDraft: EvaluationDraft = {
      ...draft,
      lastUpdatedAt: new Date().toISOString(),
      answers: {
        ...draft.answers,
        [sectionKey]: { ...draft.answers[sectionKey], ...values },
      },
    };
    setDraft(newDraft);
    saveDraft(newDraft);
  };

  // Advance to the next step
  const handleNext = (sectionKey: SectionKey, values: SectionFormValues) => {
    if (!draft) return;
    const nextStep = draft.currentStep + 1;
    const isLastSection = draft.currentStep === SECTIONS.length - 1;

    const newDraft: EvaluationDraft = {
      ...draft,
      currentStep: isLastSection ? SECTIONS.length : nextStep,
      lastUpdatedAt: new Date().toISOString(),
      answers: {
        ...draft.answers,
        [sectionKey]: values,
      },
    };

    if (isLastSection) {
      // Complete evaluation
      const diagnosis = evaluateDiagnosis(newDraft);
      const evalResult: EvaluationResult = {
        id: crypto.randomUUID(),
        completedAt: new Date().toISOString(),
        answers: newDraft.answers,
        diagnosis,
      };
      saveResult(evalResult);
      clearDraft();
      setResult(evalResult);
    } else {
      setDraft(newDraft);
      saveDraft(newDraft);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Go back one step
  const handlePrev = () => {
    if (!draft) return;
    const newDraft: EvaluationDraft = {
      ...draft,
      currentStep: Math.max(0, draft.currentStep - 1),
      lastUpdatedAt: new Date().toISOString(),
    };
    setDraft(newDraft);
    saveDraft(newDraft);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    clearDraft();
    window.location.reload();
  };

  if (loading || !draft) {
    return (
      <div className="p-8 text-center font-body text-muted-foreground animate-pulse">
        Cargando evaluación...
      </div>
    );
  }

  const currentSection = SECTIONS[draft.currentStep];

  return (
    <ErrorBoundary>
      <div className="bg-background rounded-3xl shadow-xl border border-border/50 p-4 sm:p-6 lg:p-10 transition-all duration-300">
        {import.meta.env.DEV && <DevTools setDraft={setDraft} setResult={setResult} />}

        {result ? (
          <ResultsDashboard result={result} onRestart={handleRestart} />
        ) : (
          <>
            <StepperNav currentStep={draft.currentStep} />

            <div className="mt-8">
              {currentSection && (
                <SectionForm
                  key={currentSection.key}
                  sectionKey={currentSection.key as SectionKey}
                  stepIndex={draft.currentStep}
                  isFirst={draft.currentStep === 0}
                  isLast={draft.currentStep === SECTIONS.length - 1}
                  defaultValues={draft.answers[currentSection.key as SectionKey]}
                  onNext={(values) => handleNext(currentSection.key as SectionKey, values)}
                  onPrev={handlePrev}
                  onSaveConfig={(values) =>
                    handleSaveConfig(currentSection.key as SectionKey, values)
                  }
                  onAbandon={() => setShowAbandonDialog(true)}
                />
              )}
            </div>

            <AbandonDialog
              open={showAbandonDialog}
              onOpenChange={setShowAbandonDialog}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
