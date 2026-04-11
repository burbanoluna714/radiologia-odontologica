import { infrastructureQuestions, equipmentQuestions } from "@/domain/questions";
import type { EvaluationDraft, EvaluationResult, AnswerValue } from "@/domain/types";
import { evaluateDiagnosis } from "@/domain/evaluation";
import { saveResult, clearDraft } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Bug, CheckCircle, AlertTriangle, RefreshCcw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  setDraft: (draft: EvaluationDraft) => void;
  setResult: (result: EvaluationResult | null) => void;
}

export function DevTools({ setDraft, setResult }: Props) {
  const fillAndComplete = (mode: "all-pass" | "some-fail") => {
    const infrastructureAnswers: Record<string, AnswerValue> = {};
    const equipmentAnswers: Record<string, AnswerValue> = {};

    infrastructureQuestions.forEach((q) => {
      infrastructureAnswers[q.id] = "cumple";
    });

    equipmentQuestions.forEach((q, index) => {
      if (mode === "some-fail" && index % 4 === 0) {
        equipmentAnswers[q.id] = "no_cumple";
      } else {
        equipmentAnswers[q.id] = "cumple";
      }
    });

    const finalDraft: EvaluationDraft = {
      currentStep: 2,
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      answers: {
        infrastructure: infrastructureAnswers,
        equipment: equipmentAnswers,
      },
    };

    const diagnosis = evaluateDiagnosis(finalDraft);
    
    const evalResult: EvaluationResult = {
      id: "DEV-" + crypto.randomUUID().slice(0, 8),
      completedAt: new Date().toISOString(),
      answers: finalDraft.answers,
      diagnosis,
    };

    saveResult(evalResult);
    clearDraft();
    setResult(evalResult);
    setDraft(finalDraft);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setStep = (step: number) => {
    setDraft({
      currentStep: step,
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      answers: { infrastructure: {}, equipment: {} },
    });
    setResult(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-999">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-3 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
            title="Dev Tools"
          >
            <Bug size={30} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 shadow-2xl border-border rounded-2xl mb-2" align="end" side="top">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-heading font-bold text-sm">
              <Bug size={16} className="text-primary" />
              <span>Dev Tools</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start gap-2 text-xs"
              onClick={() => fillAndComplete("all-pass")}
            >
              <CheckCircle size={14} className="text-green-500" />
              Completar (Todo Cumple)
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start gap-2 text-xs"
              onClick={() => fillAndComplete("some-fail")}
            >
              <AlertTriangle size={14} className="text-yellow-500" />
              Completar (Fallos)
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="text-[10px] px-1"
                onClick={() => setStep(0)}
              >
                Paso: Infra
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="text-[10px] px-1"
                onClick={() => setStep(1)}
              >
                Paso: Dotación
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                clearDraft();
                window.location.reload();
              }}
            >
              <RefreshCcw size={14} />
              Reiniciar Todo
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

