import { useEffect, useState } from "react";
import { getResultById } from "@/lib/storage";
import { infrastructureQuestions, equipmentQuestions } from "@/domain/questions";
import type { EvaluationResult, Question, AnswerValue } from "@/domain/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./ThemeToggle";
import { AlertCircle, CheckCircle2, ChevronLeft } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

function AnswerBadge({ value }: { value: AnswerValue | undefined }) {
  if (!value) return <Badge variant="secondary" className="font-body text-xs">Sin respuesta</Badge>;
  
  const map: Record<AnswerValue, { label: string; className: string }> = {
    cumple: { label: "Cumple", className: "bg-green-500 hover:bg-green-600 text-white" },
    no_cumple: { label: "No Cumple", className: "bg-destructive hover:bg-destructive/90 text-white" },
    no_aplica: { label: "No Aplica", className: "bg-muted text-muted-foreground" },
  };

  const config = map[value];
  return <Badge className={`font-body text-xs ${config.className}`}>{config.label}</Badge>;
}

function QuestionList({ title, questions, answers }: {
  title: string;
  questions: Question[];
  answers: Record<string, AnswerValue>;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-heading font-bold">{title}</h3>
      <div className="space-y-2">
        {questions.map((q, index) => {
          const answer = answers[q.id];
          return (
            <Card key={q.id} className={`border-l-4 ${
              answer === "cumple" ? "border-l-green-500" :
              answer === "no_cumple" ? "border-l-destructive" :
              "border-l-muted"
            }`}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-foreground/80">
                    <span className="text-sky-600 font-semibold">{index + 1}.</span> {q.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{q.criterion} — {q.reference}</p>
                </div>
                <AnswerBadge value={answer} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function ResultDetailView() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const found = getResultById(id);
    if (found) {
      setResult(found);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-8 text-center font-body text-muted-foreground animate-pulse">Cargando resultado...</div>;
  }

  if (notFound || !result) {
    return (
      <div className="bg-background rounded-2xl shadow-sm border p-8 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-heading font-bold">Evaluación no encontrada</h2>
        <p className="font-body text-muted-foreground">El registro solicitado no existe o fue eliminado del historial local.</p>
        <a href="/">
          <Button variant="outline" className="font-body mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver al Inicio
          </Button>
        </a>
      </div>
    );
  }

  const { diagnosis } = result;

  return (
    <div className="bg-background rounded-2xl shadow-sm border p-4 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <a href="/">
          <Button variant="ghost" size="sm" className="font-body text-muted-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" /> Inicio
          </Button>
        </a>
        <ThemeToggle />
      </div>

      {/* Title + Overall */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold">Detalle de Evaluación</h2>
        <p className="text-sm text-muted-foreground font-body">
          {new Date(result.completedAt).toLocaleDateString("es-CO", {
            year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
          })}
        </p>
        <p className="text-xs text-muted-foreground font-body">ID: {result.id}</p>
        <div className="inline-block p-4 rounded-2xl bg-card border shadow-sm mt-2">
          <Badge 
            className={`text-lg px-4 py-1.5 font-heading shadow-sm ${
              diagnosis.overall === "cumple" 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : diagnosis.overall === "cumple_parcialmente"
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-destructive hover:bg-destructive/90 text-white"
            }`}
          >
            {diagnosis.overall === "cumple" 
              ? "CUMPLE NORMATIVA" 
              : diagnosis.overall === "cumple_parcialmente"
              ? "CUMPLE PARCIALMENTE"
              : "NO CUMPLE NORMATIVA"}
          </Badge>
        </div>
      </div>

      {/* Scores */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Infraestructura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Progress value={diagnosis.infrastructureScore} className="h-2" />
              <span className="font-heading font-bold">{diagnosis.infrastructureScore}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Dotación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Progress value={diagnosis.equipmentScore} className="h-2" />
              <span className="font-heading font-bold">{diagnosis.equipmentScore}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Progress value={diagnosis.totalScore} className="h-2" />
              <span className="font-heading font-bold">{diagnosis.totalScore}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Questions preview */}
      <QuestionList
        title="Infraestructura"
        questions={infrastructureQuestions}
        answers={result.answers.infrastructure}
      />

      <Separator />

      <QuestionList
        title="Dotación"
        questions={equipmentQuestions}
        answers={result.answers.equipment}
      />

      {/* Findings */}
      {diagnosis.findings.length > 0 && (
        <>
          <Separator />
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <CardTitle className="font-heading text-destructive text-lg">Hallazgos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {diagnosis.findings.map((f) => (
                <Alert key={f.questionId} variant="destructive" className="bg-background">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="font-body font-semibold">{f.questionId} — {f.criterion}</AlertTitle>
                  <AlertDescription className="font-body mt-1">{f.detail}</AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {/* Recommendations */}
      {diagnosis.recommendations.length > 0 && (
        <Card className="border-sky-500/30 bg-sky-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-sky-500" />
              <CardTitle className="font-heading text-sky-700 dark:text-sky-400 text-lg">Plan de Acción</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 font-body text-sm">
              {diagnosis.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-2 text-foreground/80">
                  <span className="mt-0.5 text-sky-500 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="flex justify-center pt-4 border-t">
        <a href="/">
          <Button variant="outline" className="font-body">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver al Inicio
          </Button>
        </a>
      </div>
    </div>
  );
}
