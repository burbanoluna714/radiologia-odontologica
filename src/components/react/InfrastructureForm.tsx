import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  infrastructureSchema,
  type InfrastructureFormValues,
} from "@/domain/schemas";
import { infrastructureQuestions } from "@/domain/questions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  defaultValues?: Partial<InfrastructureFormValues>;
  onNext: (values: InfrastructureFormValues) => void;
  onSaveConfig: (values: Partial<InfrastructureFormValues>) => void;
  onAbandon: () => void;
}

function scrollToFirstError(errors: Record<string, any>) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;
  const el = document.querySelector(`[data-question-id="${firstKey}"]`);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

const ANSWER_OPTIONS = [
  {
    value: "cumple",
    label: "Cumple",
    Icon: CheckCircle2,
    activeClass:
      "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
    iconActiveClass: "text-green-500",
  },
  {
    value: "no_cumple",
    label: "No Cumple",
    Icon: XCircle,
    activeClass: "border-destructive bg-destructive/10 text-destructive",
    iconActiveClass: "text-destructive",
  },
  {
    value: "no_aplica",
    label: "No Aplica",
    Icon: HelpCircle,
    activeClass: "border-muted-foreground bg-muted text-foreground",
    iconActiveClass: "text-foreground",
  },
] as const;

export function InfrastructureForm({
  defaultValues,
  onNext,
  onSaveConfig,
  onAbandon,
}: Props) {
  const form = useForm<InfrastructureFormValues>({
    resolver: zodResolver(infrastructureSchema),
    defaultValues: defaultValues || {},
    mode: "onBlur",
  });

  const onSubmit = (data: InfrastructureFormValues) => onNext(data);
  const onInvalid = (errors: any) => scrollToFirstError(errors);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      className="space-y-4"
    >
      {infrastructureQuestions.map((q, index) => {
        const error =
          form.formState.errors[q.id as keyof InfrastructureFormValues];
        const currentValue = form.watch(q.id as keyof InfrastructureFormValues);

        const borderColor = error
          ? "border-t-destructive"
          : currentValue === "cumple"
            ? "border-t-green-500"
            : currentValue === "no_cumple"
              ? "border-t-destructive"
              : currentValue === "no_aplica"
                ? "border-t-muted-foreground"
                : "border-t-border";

        return (
          <Card
            key={q.id}
            data-question-id={q.id}
            className={`border-t-4 transition-all duration-200 hover:shadow-md ${borderColor}`}
          >
            <CardContent className="p-4 sm:p-6 lg:p-8">
              {/* Question header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0 bg-primary/10 text-primary font-heading font-bold text-sm w-8 h-8 rounded-lg items-center justify-center hidden sm:flex">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs font-semibold tracking-wider uppercase text-primary/70 mb-1">
                    <span className="sm:hidden">{index + 1}. </span>
                    {q.criterion}
                  </p>
                  <p className="font-heading text-base sm:text-lg lg:text-xl font-medium text-foreground leading-snug">
                    {q.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-60 leading-relaxed">
                    Ref: {q.reference}
                  </p>
                </div>
              </div>

              {/* Radio options */}
              <RadioGroup
                onValueChange={(val) => {
                  form.setValue(
                    q.id as keyof InfrastructureFormValues,
                    val as any,
                    { shouldValidate: true },
                  );
                  onSaveConfig({ ...form.getValues(), [q.id]: val } as any);
                }}
                defaultValue={
                  defaultValues?.[
                    q.id as keyof InfrastructureFormValues
                  ] as string
                }
                className="flex flex-col sm:flex-row gap-2 sm:gap-3"
              >
                {ANSWER_OPTIONS.map(
                  ({ value, label, Icon, activeClass, iconActiveClass }) => {
                    const isActive = currentValue === value;
                    return (
                      <Label
                        key={value}
                        htmlFor={`${q.id}-${value}`}
                        className={`
                        w-full sm:flex-1 flex items-center justify-center gap-1.5 sm:gap-2
                        py-2.5 sm:py-3 px-4
                        rounded-xl cursor-pointer
                        transition-all duration-200 border-2 select-none
                        text-xs sm:text-sm font-medium
                        ${isActive ? activeClass : "border-border bg-background hover:bg-accent"}
                      `}
                      >
                        <RadioGroupItem
                          value={value}
                          id={`${q.id}-${value}`}
                          className="sr-only size-0"
                        />
                        <div className="flex items-center justify-center gap-2 w-full">
                          <Icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${isActive ? iconActiveClass : "text-muted-foreground"}`}
                          />
                          <span className="truncate text-center">{label}</span>
                        </div>
                      </Label>
                    );
                  },
                )}
              </RadioGroup>

              {error && (
                <p className="text-xs text-destructive mt-2 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 shrink-0" /> {error.message}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Sticky action bar */}
      <div className="sticky bottom-4 z-50 w-full mt-8 pointer-events-none">
        <div className="bg-background/85 backdrop-blur-md px-4 py-3 rounded-2xl border shadow-xl flex justify-between items-center gap-3 pointer-events-auto">
          <div className="flex gap-2 items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onAbandon}
              className="cursor-pointer font-body text-muted-foreground hover:bg-destructive/10 hover:text-destructive gap-2 px-3 sm:px-5"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Abandonar</span>
            </Button>
            <ThemeToggle />
          </div>

          <Button
            type="submit"
            size="lg"
            className="cursor-pointer font-heading font-semibold tracking-wide shadow-lg shadow-primary/20 px-6 sm:px-10 gap-2"
          >
            Siguiente Sección <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
