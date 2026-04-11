import { useEffect, useState } from "react";
import { getDraft, clearDraft } from "@/lib/storage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DraftResumeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      setOpen(true);
    }
  }, []);

  const handleContinue = () => {
    window.location.href = "/evaluacion";
  };

  const handleNew = () => {
    clearDraft();
    setOpen(false);
    window.location.href = "/evaluacion";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">Evaluación en progreso</DialogTitle>
          <DialogDescription className="font-body">
            Tienes una evaluación guardada sin terminar. ¿Deseas continuar donde lo dejaste o iniciar una nueva?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleNew} className="cursor-pointer font-heading">
            Iniciar nueva
          </Button>
          <Button onClick={handleContinue} className="cursor-pointer font-heading shadow-lg shadow-primary/20">
            Continuar evaluación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
