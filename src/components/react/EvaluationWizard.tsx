import { useState, useEffect } from "react";
import { StepperNav } from "./StepperNav";
import { InfrastructureForm } from "./InfrastructureForm";
import { EquipmentForm } from "./EquipmentForm";
import { ResultsDashboard } from "./ResultsDashboard";
import { AbandonDialog } from "./AbandonDialog";
import { getDraft, saveDraft, clearDraft, saveResult } from "@/lib/storage";
import { evaluateDiagnosis } from "@/domain/evaluation";
import type { EvaluationDraft, EvaluationResult } from "@/domain/types";
import type { InfrastructureFormValues, EquipmentFormValues } from "@/domain/schemas";
import { DevTools } from "./DevTools";


export function EvaluationWizard() {
  const [draft, setDraft] = useState<EvaluationDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);

  useEffect(() => {
    const existingDraft = getDraft();
    if (existingDraft) {
      setDraft(existingDraft);
    } else {
      setDraft({
        currentStep: 0,
        startedAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        answers: { infrastructure: {}, equipment: {} },
      });
    }
    setLoading(false);
  }, []);

  const handleSaveConfig = (section: "infrastructure" | "equipment", values: any) => {
    if (!draft) return;
    const newDraft = {
      ...draft,
      lastUpdatedAt: new Date().toISOString(),
      answers: {
        ...draft.answers,
        [section]: values,
      },
    };
    setDraft(newDraft);
    saveDraft(newDraft);
  };

  const handleNextStep = (newAnswers: InfrastructureFormValues | EquipmentFormValues) => {
    if (!draft) return;
    const isInfrastructure = draft.currentStep === 0;
    
    const newDraft: EvaluationDraft = {
      ...draft,
      currentStep: 1,
      lastUpdatedAt: new Date().toISOString(),
      answers: {
        ...draft.answers,
        [isInfrastructure ? "infrastructure" : "equipment"]: newAnswers as any,
      },
    };
    
    setDraft(newDraft);
    saveDraft(newDraft);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    if (!draft) return;
    const newDraft: EvaluationDraft = {
      ...draft,
      currentStep: 0,
      lastUpdatedAt: new Date().toISOString(),
    };
    setDraft(newDraft);
    saveDraft(newDraft);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = (equipmentAnswers: EquipmentFormValues) => {
    if (!draft) return;
    
    const finalDraft: EvaluationDraft = {
      ...draft,
      currentStep: 2,
      lastUpdatedAt: new Date().toISOString(),
      answers: {
        ...draft.answers,
        equipment: equipmentAnswers as any,
      },
    };

    const diagnosis = evaluateDiagnosis(finalDraft);
    
    const evalResult: EvaluationResult = {
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
      answers: finalDraft.answers,
      diagnosis,
    };

    saveResult(evalResult);
    clearDraft();
    setResult(evalResult);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    clearDraft();
    window.location.reload();
  };

  if (loading || !draft) {
    return <div className="p-8 text-center font-body text-muted-foreground animate-pulse">Cargando evaluación...</div>;
  }

  return (
    <div className="bg-background rounded-3xl shadow-xl border border-border/50 p-4 sm:p-6 lg:p-10 transition-all duration-300">
      {import.meta.env.DEV && <DevTools setDraft={setDraft} setResult={setResult} />}
      {result ? (
        <ResultsDashboard result={result} onRestart={handleRestart} />
      ) : (
        <>
          <StepperNav currentStep={draft.currentStep} />
          
          <div className="mt-8">
            {draft.currentStep === 0 && (
              <InfrastructureForm 
                defaultValues={draft.answers.infrastructure}
                onNext={handleNextStep}
                onSaveConfig={(val) => handleSaveConfig("infrastructure", val)}
                onAbandon={() => setShowAbandonDialog(true)}
              />
            )}
            
            {draft.currentStep === 1 && (
              <EquipmentForm 
                defaultValues={draft.answers.equipment}
                onNext={handleComplete}
                onPrev={handlePrevStep}
                onSaveConfig={(val) => handleSaveConfig("equipment", val)}
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
  );
}
