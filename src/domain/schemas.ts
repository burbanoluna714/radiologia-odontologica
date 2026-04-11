import { z } from "zod";
import { infrastructureQuestions, equipmentQuestions } from "./questions";

const answerEnum = z.enum(["cumple", "no_cumple", "no_aplica"], {
  message: "Debes seleccionar una opción.",
});

const generateSchemaForQuestions = (questions: { id: string }[]) => {
  const shape: Record<string, typeof answerEnum> = {};
  questions.forEach((q) => {
    shape[q.id] = answerEnum;
  });
  return z.object(shape);
};

export const infrastructureSchema = generateSchemaForQuestions(infrastructureQuestions);
export const equipmentSchema = generateSchemaForQuestions(equipmentQuestions);

export type InfrastructureFormValues = z.infer<typeof infrastructureSchema>;
export type EquipmentFormValues = z.infer<typeof equipmentSchema>;
