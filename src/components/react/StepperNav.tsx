export function StepperNav({ currentStep }: { currentStep: number }) {
  const steps = ["Infraestructura", "Dotación", "Resultados"];

  return (
    <div className="sticky top-4 z-40 mb-10 w-full animate-fade-in-up">
      <div className="bg-background/70 backdrop-blur-xl border border-border/50 shadow-sm rounded-2xl px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between relative overflow-hidden">
        {/* Subtle glow effect behind stepper */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step} className="flex relative items-center flex-1 last:flex-none">
              <div className="flex items-center gap-3 relative z-10 w-full">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full flex justify-center items-center font-heading font-semibold text-sm transition-all duration-500 ease-out ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--color-primary),0.4)] scale-110"
                      : isCompleted
                      ? "bg-primary/20 text-primary border border-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                <span
                  className={`font-body text-xs sm:text-sm tracking-wide hidden md:block transition-colors duration-300 ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4 h-[2px] rounded-full overflow-hidden bg-muted/50 relative">
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
  );
}
