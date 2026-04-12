import { SECTIONS } from "@/domain/sections";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function StepperNav({ currentStep }: { currentStep: number }) {
  const steps = [...SECTIONS.map((s) => s.label), "Resultados"];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="top-4 z-40 mb-10 w-full animate-fade-in-up">
        <div className="bg-background/70 backdrop-blur-xl border border-border/50 shadow-sm rounded-2xl px-3 sm:px-6 py-3 sm:py-5 relative overflow-hidden">
          
          {/* Glow */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

          {/* 🔥 SCROLL CONTAINER */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4 -my-4 px-4 -mx-4">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step} className="flex items-center gap-3 sm:gap-4 shrink-0 first:ml-2 last:mr-2">
                  
                  {/* Step */}
                  <div className="flex items-center gap-2">
                    
                    {/* Circle */}
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex justify-center items-center font-heading font-semibold text-xs sm:text-sm transition-all duration-500 ease-out ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--color-primary),0.4)] scale-110"
                          : isCompleted
                          ? "bg-primary/20 text-primary border border-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>

                    {/* 🔥 LABEL CON TOOLTIP */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`font-body text-xs sm:text-sm tracking-wide transition-colors duration-300 leading-tight whitespace-nowrap max-w-[80px] sm:max-w-[120px] lg:max-w-[160px] truncate cursor-default ${
                            isActive
                              ? "text-foreground font-semibold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step}
                        </span>
                      </TooltipTrigger>

                      <TooltipContent side="bottom" sideOffset={8}>
                        <p className="font-body text-xs sm:text-sm">{step}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="w-6 sm:w-10 lg:w-12 h-[2px] rounded-full bg-muted/50 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-primary/60 transition-all duration-700 ease-out"
                        style={{ width: isCompleted ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
