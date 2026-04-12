/**
 * Registro central de secciones de evaluación.
 *
 * Para AGREGAR una sección: añadir un objeto a este array.
 * Para ELIMINAR una sección: remover el objeto correspondiente.
 * Los IDs de preguntas se generan automáticamente con el prefijo definido aquí.
 */

export interface SectionConfig {
  /** Clave única de la sección (usada como key en objetos de respuestas y scores) */
  key: string;
  /** Prefijo de 2-3 letras para auto-generar IDs de preguntas (e.g. "INF-001") */
  prefix: string;
  /** Nombre legible para mostrar en la interfaz */
  label: string;
}

export const SECTIONS = [
  { key: "talento_humano",             prefix: "TH",  label: "Talento Humano" },
  { key: "infraestructura",            prefix: "INF", label: "Infraestructura" },
  { key: "dotacion",                   prefix: "DOT", label: "Dotación" },
  { key: "medicamentos_dispositivos",  prefix: "MDI", label: "Medicamentos, Dispositivos Médicos e Insumos" },
  { key: "procesos_prioritarios",      prefix: "PRO", label: "Procesos Prioritarios" },
  { key: "historia_clinica",           prefix: "HCR", label: "Historia Clínica y Registros" },
  { key: "interdependencia",           prefix: "INT", label: "Interdependencia" },
] as const satisfies readonly SectionConfig[];

export type SectionKey = (typeof SECTIONS)[number]["key"];
export type SectionPrefix = (typeof SECTIONS)[number]["prefix"];

/** Mapa rápido key → config */
export const SECTION_MAP: Record<SectionKey, SectionConfig> = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s])
) as Record<SectionKey, SectionConfig>;
