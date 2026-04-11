import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { clearDraft } from "@/lib/storage";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AbandonDialog({ open, onOpenChange }: Props) {
  const handleConfirm = () => {
    clearDraft();
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">¿Abandonar evaluación?</DialogTitle>
          <DialogDescription className="font-body">
            Se perderá todo el progreso de esta evaluación. Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer font-heading">
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="cursor-pointer font-heading">
            Sí, abandonar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
