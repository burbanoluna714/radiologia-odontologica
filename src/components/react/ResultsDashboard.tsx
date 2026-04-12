import type { EvaluationResult } from "@/domain/types";
import { SECTIONS, type SectionKey } from "@/domain/sections";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, ChevronLeft } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  result: EvaluationResult;
  onRestart: () => void;
}

export function ResultsDashboard({ result, onRestart }: Props) {
  const { diagnosis } = result;

  const overallLabel =
    diagnosis.overall === "cumple"
      ? "CUMPLE NORMATIVA"
      : diagnosis.overall === "cumple_parcialmente"
        ? "CUMPLE PARCIALMENTE"
        : "NO CUMPLE NORMATIVA";

  const overallBadgeClass =
    diagnosis.overall === "cumple"
      ? "bg-green-500 hover:bg-green-600 text-white"
      : diagnosis.overall === "cumple_parcialmente"
        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
        : "bg-destructive hover:bg-destructive/90 text-white";

  const overallMessage =
    diagnosis.overall === "cumple"
      ? "Estás preparado para el proceso de inscripción en el REPS para Radiología Odontológica."
      : diagnosis.overall === "cumple_parcialmente"
        ? "Existen algunos detalles menores por ajustar pero la base es sólida."
        : "Es indispensable resolver los hallazgos críticos antes de proceder con el registro.";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overall verdict */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-heading font-bold">Resumen de Evaluación</h2>
        <p className="text-muted-foreground font-body">ID: {result.id}</p>

        <div className="inline-block p-6 rounded-2xl bg-card border shadow-sm mt-4">
          <Badge className={`text-xl px-4 py-2 font-heading shadow-sm ${overallBadgeClass}`}>
            {overallLabel}
          </Badge>
          <div className="mt-4 text-sm font-body text-muted-foreground max-w-sm mx-auto">
            {overallMessage}
          </div>
        </div>
      </div>

      {/* Score per section */}
      <div>
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
          Puntaje por Sección
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTIONS.map((section) => {
            const score = diagnosis.sectionScores[section.key as SectionKey] ?? 0;
            const scoreClass =
              score >= 90
                ? "text-green-600 dark:text-green-400"
                : score >= 60
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-destructive";

            return (
              <Card key={section.key}>
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-xs font-heading text-muted-foreground uppercase tracking-wider leading-tight">
                    {section.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex items-center gap-3">
                    <Progress value={score} className="h-2.5 flex-1" />
                    <span className={`font-heading font-bold text-base tabular-nums w-12 text-right ${scoreClass}`}>
                      {score}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Total */}
          <Card className="border-primary/30 bg-primary/5 sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-heading text-primary uppercase tracking-wider">
                Puntaje Total
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-center gap-3">
                <Progress value={diagnosis.totalScore} className="h-2.5 flex-1" />
                <span className="font-heading font-bold text-base tabular-nums w-12 text-right text-primary">
                  {diagnosis.totalScore}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Findings */}
      {diagnosis.findings.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle className="font-heading text-destructive text-lg">
                Hallazgos Encontrados
              </CardTitle>
            </div>
            <CardDescription className="font-body">
              Se requiere atención en los siguientes criterios:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {diagnosis.findings.map((finding) => (
              <Alert key={finding.questionId} variant="destructive" className="bg-background">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-body font-semibold">
                  {finding.questionId} — {finding.criterion}
                </AlertTitle>
                <AlertDescription className="font-body mt-1">
                  {finding.detail}
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {diagnosis.recommendations.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <CardTitle className="font-heading text-primary text-lg">
                Plan de Acción Sugerido
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 font-body text-sm">
              {diagnosis.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-2 text-foreground/80">
                  <span className="mt-0.5 text-primary font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Footer actions */}
      <div className="flex flex-row justify-between items-center gap-3 pt-6 border-t">
        <div className="flex gap-2 items-center">
          <a href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="cursor-pointer w-full sm:w-auto font-heading gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al Inicio</span>
            </Button>
          </a>
          <ThemeToggle />
        </div>
        <Button
          onClick={onRestart}
          className="cursor-pointer font-heading w-auto gap-2 shadow-lg shadow-primary/20"
        >
          Evaluar Otra Sede
        </Button>
      </div>
    </div>
  );
}
