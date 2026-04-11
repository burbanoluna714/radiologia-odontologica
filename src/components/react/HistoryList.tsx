import { useEffect, useState } from "react";
import { getResults, clearResults } from "@/lib/storage";
import type { EvaluationResult } from "@/domain/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ClipboardList, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const badgeConfig = {
  cumple: { label: "Cumple", className: "bg-green-500 hover:bg-green-600 text-white" },
  cumple_parcialmente: { label: "Parcial", className: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  no_cumple: { label: "No Cumple", className: "bg-destructive hover:bg-destructive/90 text-white" },
} as const;

export function HistoryList() {
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshResults();
  }, []);

  const refreshResults = () => {
    setResults(
      getResults().sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      )
    );
    setLoading(false);
  };

  const handleDeleteAll = () => {
    clearResults();
    refreshResults();
  };

  if (loading) return null;

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
        <ClipboardList className="w-10 h-10 opacity-30" />
        <p className="font-body text-sm">No hay evaluaciones previas.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-0.5">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Diagnósticos Anteriores
          <span className="ml-2 text-xs font-body font-normal text-muted-foreground">({results.length})</span>
        </h3>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2 h-8 px-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="text-xs font-body">Eliminar Todos</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-3xl border-border/50 max-w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading text-lg">¿Estás completamente seguro?</AlertDialogTitle>
              <AlertDialogDescription className="font-body text-sm">
                Esta acción eliminará permanentemente todo tu historial de diagnósticos de este navegador. Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 gap-2">
              <AlertDialogCancel className="rounded-xl font-heading text-xs">Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteAll}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-heading text-xs"
              >
                Sí, eliminar todo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Desktop: horizontal scroll. Mobile: vertical stack */}
      <div className="
        flex flex-col gap-4
        sm:flex-row sm:overflow-x-auto sm:pt-2 sm:pb-4 sm:px-2
        sm:[scrollbar-width:thin] sm:[scrollbar-color:hsl(var(--border))_transparent]
      ">
        {results.map((r) => {
          const cfg = badgeConfig[r.diagnosis.overall] ?? badgeConfig.no_cumple;
          return (
            <a
              key={r.id}
              href={`/resultado?id=${r.id}`}
              className="block group cursor-pointer shrink-0 w-full sm:w-[220px]"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/40 hover:-translate-y-0.5">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm font-heading leading-tight">
                      {new Date(r.completedAt).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </CardTitle>
                    <Badge className={`text-xs font-body shrink-0 ${cfg.className}`}>
                      {cfg.label}
                    </Badge>
                  </div>
                  <CardDescription className="font-body text-xs mt-1">
                    ID: {r.id.split("-")[0]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-body text-muted-foreground">
                      Score: <strong className="text-foreground">{r.diagnosis.totalScore}%</strong>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
