import { z } from "zod";
import { SECTIONS, type SectionKey } from "./sections";
import { ALL_SECTIONS_QUESTIONS } from "./questions";

// ---------------------------------------------------------------------------
// Enum compartido para todas las respuestas
// ---------------------------------------------------------------------------

export const answerEnum = z.enum(["cumple", "no_cumple", "no_aplica"], {
  message: "Debes seleccionar una opción.",
});

export type AnswerEnum = z.infer<typeof answerEnum>;

// ---------------------------------------------------------------------------
// Generador de schema por sección
// ---------------------------------------------------------------------------

/**
 * Dado un array de preguntas (que sólo necesitan tener `id`),
 * genera un z.object con un campo por pregunta.
 */
function buildSchemaFromQuestions(questions: { id: string }[]) {
  const shape: Record<string, typeof answerEnum> = {};
  for (const q of questions) {
    shape[q.id] = answerEnum;
  }
  return z.object(shape);
}

/**
 * Retorna el schema Zod para una sección específica.
 * Útil para generar el schema de forma perezosa.
 */
export function getSectionSchema(sectionKey: SectionKey) {
  return buildSchemaFromQuestions(ALL_SECTIONS_QUESTIONS[sectionKey]);
}

// ---------------------------------------------------------------------------
// Todos los schemas indexados por sección
// ---------------------------------------------------------------------------

export const ALL_SCHEMAS = Object.fromEntries(
  SECTIONS.map((s) => [s.key, getSectionSchema(s.key as SectionKey)])
) as Record<SectionKey, ReturnType<typeof getSectionSchema>>;

// ---------------------------------------------------------------------------
// Tipo de valores de formulario genérico (Record<questionId, AnswerValue>)
// ---------------------------------------------------------------------------

export type SectionFormValues = Record<string, AnswerEnum>;
