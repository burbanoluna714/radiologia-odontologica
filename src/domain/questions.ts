import type { Question } from "./types";
import { SECTIONS, type SectionKey, type SectionPrefix } from "./sections";

// ---------------------------------------------------------------------------
// Helper: define preguntas sin ID manual — el ID se genera con el prefijo
// ---------------------------------------------------------------------------

type RawQuestion = Omit<Question, "id">;

/**
 * Genera un arreglo de preguntas con IDs automáticos basados en el prefijo
 * de la sección (e.g. "INF-001", "INF-002", …).
 *
 * Uso:
 *   defineQuestions("INF", [
 *     { criterion: "...", text: "...", ... },  // sin id
 *   ])
 */
export function defineQuestions(key: SectionKey, rawList: RawQuestion[]): Question[] {
  const section = SECTIONS.find((s) => s.key === key);
  if (!section) {
    throw new Error(`Sección con key "${key}" no encontrada.`);
  }

  const prefix = section.prefix;

  return rawList.map((q, i) => ({
    ...q,
    id: `${prefix}-${String(i + 1).padStart(3, "0")}`,
  }));
}

// ---------------------------------------------------------------------------
// Sección 1: Talento Humano (TH)
// ---------------------------------------------------------------------------

const talentoHumanoQuestions = defineQuestions("talento_humano", [
  {
    criterion: "Formación del operador",
    text: "El servicio cuenta con talento humano en salud con formación acorde a los servicios ofertados.",
    reference: "Res. 3100/2019",
    findingText: "El operador no posee formación académica acreditada en salud.",
    recommendation: "Verificar y archivar título o diploma del operador del equipo radiográfico.",
  },
  {
    criterion: "Inducción en protección radiológica",
    text: "¿El operador tiene certificado de inducción o capacitación en protección radiológica y uso seguro de radiación ionizante?",
    reference: "Res. 181434/2002 - ICONTEC NTC 4495",
    findingText: "No se encontró evidencia de capacitación en protección radiológica del operador.",
    recommendation: "Gestionar capacitación en protección radiológica ante entidad avalada (física médica, IAEA, etc.).",
  },
  {
    criterion: "Registro de talento humano en RETHUS",
    text: "¿El personal asistencial del servicio está registrado en el RETHUS (Registro del Talento Humano en Salud)?",
    reference: "Ley 1164/2007 - RETHUS",
    findingText: "Personal no registrado o sin tarjeta profesional verificable en RETHUS.",
    recommendation: "Tramitar registro vigente ante la entidad departamental de salud correspondiente.",
  },
  {
    criterion: "Perfil del cargo documentado",
    text: "¿Existe un manual de funciones o perfil del cargo para el operador del servicio de radiología?",
    reference: "Res. 3100/2019 - Talento Humano",
    findingText: "Ausencia de manual de funciones o perfil del cargo para el personal de radiología.",
    recommendation: "Elaborar y socializar el perfil del cargo indicando requisitos mínimos de formación y experiencia.",
  },
  {
    criterion: "Exámenes médicos ocupacionales",
    text: "¿El personal POE (Personal Ocupacionalmente Expuesto) tiene exámenes médicos pre-ocupacionales y periódicos vigentes?",
    reference: "Res. 2346/2007 - Ministerio de la Protección Social",
    findingText: "Exámenes médicos ocupacionales del POE vencidos o inexistentes.",
    recommendation: "Realizar exámenes médicos periódicos anuales a todo el personal expuesto a radiación ionizante.",
  },
  {
    criterion: "Programa de capacitaciones",
    text: "¿Existe un programa de capacitaciones periódico documentado en temas de protección radiológica y bioseguridad?",
    reference: "Res. 3100/2019 - Gestión del Talento Humano",
    findingText: "No hay programa de capacitaciones estructurado ni evidencia de ejecución.",
    recommendation: "Elaborar plan anual de capacitaciones con actas de asistencia y evaluaciones.",
  },
]);

// ---------------------------------------------------------------------------
// Sección 2: Infraestructura (INF)
// ---------------------------------------------------------------------------

const infraestructuraQuestions = defineQuestions("infraestructura", [
  {
    criterion: "Área de toma radiográfica",
    text: "¿Cuenta con un área exclusiva y delimitada para la toma de radiografías dentales?",
    reference: "Res. 3100/2019 - Estándar de infraestructura",
    findingText: "No se cuenta con un área exclusiva para la toma radiográfica.",
    recommendation: "Delimitar o construir un espacio físico exclusivo para el equipo de rayos X.",
  },
  {
    criterion: "Dimensiones del área",
    text: "¿El área de rayos X cumple con las dimensiones mínimas establecidas para el equipo instalado?",
    reference: "Anexo Técnico - Radiología Odontológica",
    findingText: "Las dimensiones del área no cumplen los mínimos requeridos.",
    recommendation: "Ajustar las dimensiones del área según el manual del fabricante y el cálculo de blindaje.",
  },
  {
    criterion: "Blindaje radiológico - paredes",
    text: "¿Las paredes del área de rayos X cuentan con blindaje plomado o equivalente certificado por un experto en protección radiológica?",
    reference: "Res. 3100/2019 + Res. 181434/2002",
    findingText: "Las paredes no cuentan con blindaje certificado.",
    recommendation: "Contratar experto para calcular e instalar el blindaje necesario (plomo, barita, etc.).",
  },
  {
    criterion: "Blindaje radiológico - puerta",
    text: "¿La puerta del área de rayos X cuenta con blindaje plomado o equivalente?",
    reference: "Res. 3100/2019 + Protección radiológica",
    findingText: "La puerta no tiene blindaje adecuado.",
    recommendation: "Instalar lámina de plomo en la puerta o cambiar por una puerta plomada certificada.",
  },
  {
    criterion: "Blindaje radiológico - visor",
    text: "¿Existe un visor plomado que permita observar al paciente durante la toma radiográfica?",
    reference: "Estándar de protección radiológica",
    findingText: "Ausencia de visor plomado para observación del paciente.",
    recommendation: "Instalar vidrio plomado en pared o puerta con el equivalente en plomo calculado.",
  },
  {
    criterion: "Señalización radiológica",
    text: "¿El área cuenta con señalización de advertencia de radiación ionizante (símbolo trébol) visible en el acceso?",
    reference: "Res. 3100/2019 - Señalización",
    findingText: "Falta señalización internacional de advertencia de radiación.",
    recommendation: "Instalar el símbolo de trébol magenta/negro sobre fondo amarillo en la puerta de acceso.",
  },
  {
    criterion: "Señalización luminosa",
    text: "¿Existe señalización luminosa (luz roja) que indique cuando el equipo está en operación?",
    reference: "Protección radiológica",
    findingText: "No hay advertencia luminosa durante la emisión de rayos X.",
    recommendation: "Instalar luz roja conectada al disparo del equipo en la parte externa del ambiente.",
  },
  {
    criterion: "Acabados - pisos",
    text: "¿Los pisos son de material lavable, liso, de fácil limpieza y desinfección?",
    reference: "Res. 3100/2019 - Infraestructura",
    findingText: "Los pisos no cumplen con las características de higiene (lavable, liso, sin porosidades).",
    recommendation: "Adecuar los pisos instalando material tipo vinilo, porcelanato u otro de fácil limpieza (uso de medias cañas recomendado).",
  },
  {
    criterion: "Acabados - paredes",
    text: "¿Las paredes son de material lavable, liso e impermeable hasta el techo?",
    reference: "Res. 3100/2019 - Infraestructura",
    findingText: "Las paredes presentan superficies porosas o materiales no lavables.",
    recommendation: "Pintar con pintura epóxica o instalar revestimiento lavable liso.",
  },
  {
    criterion: "Acabados - techos",
    text: "¿Los techos son de material resistente, lavable y con acabado de cielo raso?",
    reference: "Res. 3100/2019 - Infraestructura",
    findingText: "Acabado de techos inadecuado (poroso, difícil limpieza).",
    recommendation: "Instalar cielo raso liso y lavable.",
  },
  {
    criterion: "Ventilación",
    text: "¿El área cuenta con ventilación natural o mecánica adecuada?",
    reference: "Res. 3100/2019 - Condiciones ambientales",
    findingText: "Sistema de ventilación deficiente.",
    recommendation: "Instalar ventilación mecánica que garantice las renovaciones de aire por hora requeridas.",
  },
  {
    criterion: "Iluminación",
    text: "¿El área cuenta con iluminación natural y/o artificial suficiente para las actividades que se realizan?",
    reference: "Res. 3100/2019 - Condiciones ambientales",
    findingText: "Iluminación insuficiente en el área radiográfica.",
    recommendation: "Mejorar la capacidad de luxes instalando nuevas luminarias certificadas.",
  },
  {
    criterion: "Suministro de agua",
    text: "¿El servicio cuenta con suministro de agua potable permanente?",
    reference: "Res. 3100/2019 - Infraestructura",
    findingText: "Intermitencia o ausencia de suministro de agua potable.",
    recommendation: "Garantizar tanque de reserva que asegure agua potable o revisión de plomería.",
  },
  {
    criterion: "Suministro eléctrico",
    text: "¿El área tiene instalaciones eléctricas adecuadas y protegidas (tomas reguladas, puesta a tierra)?",
    reference: "Res. 3100/2019 - Instalaciones",
    findingText: "Instalación eléctrica insegura o sin puesta a tierra verificable.",
    recommendation: "Adecuar cableado según Reglamento RETIE e instalar UPS o tomas reguladas si es equipo digital.",
  },
  {
    criterion: "Área de procesamiento/lectura",
    text: "¿Cuenta con un espacio adecuado para la lectura/interpretación o procesamiento de imágenes?",
    reference: "Anexo Técnico - Radiología",
    findingText: "No se cuenta con un puesto de digitación o lectura de la imagen radiográfica.",
    recommendation: "Asignar área anexa con pantalla o negatoscopio para lectura e interpretación.",
  },
  {
    criterion: "Accesibilidad",
    text: "¿El acceso al área permite la movilidad de personas con discapacidad?",
    reference: "Res. 3100/2019 - Accesibilidad",
    findingText: "Barreras arquitectónicas (escalones sin rampa, puertas estrechas) impiden el acceso a PxD.",
    recommendation: "Ajustar ancho de marcos y eliminar desniveles; instalar rampas según estándares.",
  },
]);

// ---------------------------------------------------------------------------
// Sección 3: Dotación (DOT)
// ---------------------------------------------------------------------------

const dotacionQuestions = defineQuestions("dotacion", [
  {
    criterion: "Equipo de rayos X",
    text: "¿Cuenta con equipo de rayos X dental (periapical/panorámico) en funcionamiento?",
    reference: "Res. 3100/2019 - Dotación",
    findingText: "No cuenta con equipo de radiología en funcionamiento.",
    recommendation: "Adquirir y realizar instalación funcional del equipo emisor de rayos X.",
  },
  {
    criterion: "Registro INVIMA",
    text: "¿El equipo de rayos X cuenta con registro sanitario INVIMA vigente?",
    reference: "Res. 3100/2019 - Dotación",
    findingText: "Equipo carece de Registro o Permiso INVIMA vigente.",
    recommendation: "Gestionar permiso de importación o registro ante entidad reguladora para el equipo.",
  },
  {
    criterion: "Licencia de práctica",
    text: "¿Se cuenta con licencia de práctica expedida por la Secretaría de Salud departamental/distrital?",
    reference: "Res. 181434/2002",
    findingText: "Sin Licencia de práctica y manejo de fuentes de radiación ionizante.",
    recommendation: "Tramitar solicitud de Licencia aportando memorias de cálculo, manual de bioseguridad y QA.",
  },
  {
    criterion: "Calibración y Control de Calidad",
    text: "¿El equipo de rayos X tiene calibración y control de calidad vigente realizado por entidad avalada?",
    reference: "Res. 3100/2019 - Dotación",
    findingText: "Control de calidad (pruebas de fuga, kVp, tiempo, etc.) vencido o inexistente.",
    recommendation: "Contratar servicio técnico certificado para realizar las pruebas de control de calidad (anual o bienal).",
  },
  {
    criterion: "Mantenimiento preventivo",
    text: "¿Existe un programa documentado de mantenimiento preventivo para el equipo radiográfico?",
    reference: "Res. 3100/2019 - Dotación",
    findingText: "Programa de mantenimiento no estructurado o no documentado.",
    recommendation: "Elaborar manual y programa detallado estableciendo la periodicidad de su mantenimiento.",
  },
  {
    criterion: "Cronograma de mantenimiento",
    text: "¿Se cuenta con cronograma de mantenimiento preventivo y correctivo con evidencia de cumplimiento?",
    reference: "Res. 3100/2019 - Dotación",
    findingText: "No hay reportes ni planillas que soporten el cumplimiento del cronograma.",
    recommendation: "Archivar las constancias emitidas por el ingeniero de soporte según el programa estipulado.",
  },
  {
    criterion: "Hoja de vida del equipo",
    text: "¿El equipo de rayos X cuenta con hoja de vida actualizada con su serial, modelo e historial?",
    reference: "Res. 3100/2019 - Dotación",
    findingText: "Hoja de vida inexistente o desactualizada.",
    recommendation: "Crear formato u hoja de Excel de hoja de vida adjuntando todos los manuales y registros de mantenimientos.",
  },
  {
    criterion: "Delantal plomado (paciente)",
    text: "¿Se dispone de delantal plomado para protección del paciente?",
    reference: "Protección radiológica",
    findingText: "Falta delantal plomado para paciente.",
    recommendation: "Adquirir chaleco con equivalencia mínima de plomo de 0.25mm o 0.5mm Eq Pb acorde a normativa.",
  },
  {
    criterion: "Collar tiroideo (paciente)",
    text: "¿Se dispone de collar tiroideo plomado para protección del paciente?",
    reference: "Protección radiológica",
    findingText: "Falta protector tiroideo para paciente.",
    recommendation: "Adquirir collarín con banda de ajuste, equivalente de Pb según norma.",
  },
  {
    criterion: "Elementos de protección (operador)",
    text: "¿El operador cuenta con elementos de protección radiológica personal (delantal/biombo)?",
    reference: "Res. 181434/2002",
    findingText: "El personal de salud no tiene protección blindada dispuesta.",
    recommendation: "Asegurar un delantal exclusivo para el trabajador o construir barrera protectora estructural de disparo.",
  },
  {
    criterion: "Dosimetría personal",
    text: "¿Se cuenta con servicio de dosimetría personal activo para el personal ocupacionalmente expuesto (POE)?",
    reference: "Res. 181434/2002",
    findingText: "Ausencia de monitoreo dosimétrico personal.",
    recommendation: "Contratar mensualmente el servicio de recambio e informe de dosímetros de solapa.",
  },
  {
    criterion: "Receptores de imagen",
    text: "¿Se cuenta con sensor digital (RVG) o equipos para revelado con sus debidos posicionadores XCP?",
    reference: "Dotación mínima",
    findingText: "No hay receptores de imagen adecuados para realizar capturas funcionales.",
    recommendation: "Adquirir sensor intraoral con software y equipo de cómputo, o usar paquete de películas con cuarto oscuro/caja reveladora.",
  },
  {
    criterion: "Sistema de visualización",
    text: "¿Se cuenta con sistema de visualización de imágenes (negatoscopio o monitor calibrado)?",
    reference: "Res. 3100/2019 - Dotación",
    findingText: "Falta de visualizador adecuado para emitir diagnóstico (monitor médico o negatoscopio).",
    recommendation: "Disponer monitor de resolución radiológica o negatoscopio bien iluminado para películas analógicas.",
  },
  {
    criterion: "Cálculo de blindaje",
    text: "¿Se cuenta con el documento de cálculo de blindaje realizado por un físico médico o experto certificado?",
    reference: "Protección radiológica",
    findingText: "No hay soporte técnico-físico matemático sobre la atenuación de radiación del área.",
    recommendation: "Elaborar el cálculo de cargas de trabajo, factores de uso y ocupación mediante físico certificado y presentar memorias.",
  },
]);

// ---------------------------------------------------------------------------
// Sección 4: Medicamentos, Dispositivos Médicos e Insumos (MDI)
// ---------------------------------------------------------------------------

const medicamentosDispositivosQuestions = defineQuestions("medicamentos_dispositivos", [
  {
    criterion: "Insumos radiológicos vigentes",
    text: "¿Los insumos radiológicos utilizados (películas, fijador, revelador, placas de fósforo) están dentro de su fecha de vencimiento?",
    reference: "Res. 3100/2019 - Insumos",
    findingText: "Insumos radiológicos vencidos o sin etiqueta de vencimiento identificable.",
    recommendation: "Verificar y rotar insumos por fecha de caducidad; desechar los vencidos según protocolo de residuos.",
  },
  {
    criterion: "Almacenamiento de insumos",
    text: "¿Los insumos están almacenados en condiciones adecuadas de temperatura, humedad y protección contra la luz y la radiación?",
    reference: "Res. 3100/2019 - Gestión de insumos",
    findingText: "Almacenamiento inadecuado de insumos (exposición a luz, calor o humedad excesiva).",
    recommendation: "Disponer de área de almacenamiento con control de temperatura (15-25°C), protección de la luz y baja humedad relativa.",
  },
  {
    criterion: "Mantenimiento de sensores digitales",
    text: "¿Los sensores digitales (RVG) o placas de fósforo tienen protocolo de limpieza, desinfección y mantenimiento documentado?",
    reference: "Recomendaciones del fabricante + Res. 3100/2019",
    findingText: "No existe protocolo de mantenimiento y limpieza para los receptores de imagen digital.",
    recommendation: "Elaborar protocolo de desinfección de nivel intermedio para sensores siguiendo instrucciones del fabricante.",
  },
  {
    criterion: "Registro y control de inventario",
    text: "¿Se lleva un registro actualizado de inventario de insumos y dispositivos médicos del servicio?",
    reference: "Res. 3100/2019 - Dispositivos Médicos",
    findingText: "Inventario de insumos y dispositivos no documentado o desactualizado.",
    recommendation: "Implementar hoja de control de inventario con entradas, salidas y existencias mínimas de reposición.",
  },
  {
    criterion: "Hoja de vida de dispositivos médicos",
    text: "¿Los dispositivos médicos del servicio (sensores, accesorios del equipo) tienen hoja de vida actualizada?",
    reference: "Res. 3100/2019 - Dispositivos Médicos",
    findingText: "Hojas de vida de dispositivos médicos inexistentes o incompletas.",
    recommendation: "Crear hoja de vida para cada dispositivo médico registrando datos técnicos, mantenimientos y calibraciones.",
  },
  {
    criterion: "Registro INVIMA de insumos",
    text: "¿Los insumos y materiales utilizados cuentan con Registro INVIMA vigente?",
    reference: "Decreto 4725/2005",
    findingText: "Insumos sin Registro INVIMA o con registros vencidos.",
    recommendation: "Verificar vigencia del registro INVIMA de cada insumo y proveedor ante la base de datos del INVIMA.",
  },
  {
    criterion: "Botiquín de primeros auxilios",
    text: "¿El servicio cuenta con botiquín de primeros auxilios completo y vigente?",
    reference: "Res. 3100/2019 - Condiciones de habilitación",
    findingText: "Botiquín de primeros auxilios ausente, incompleto o con medicamentos vencidos.",
    recommendation: "Dotar y mantener botiquín con medicamentos e insumos vigentes, realizando revisión mensual.",
  },
]);

// ---------------------------------------------------------------------------
// Sección 5: Procesos Prioritarios (PRO)
// ---------------------------------------------------------------------------

const procesosPrioritariosQuestions = defineQuestions("procesos_prioritarios", [
  {
    criterion: "Protocolo de toma radiográfica",
    text: "¿Existe un protocolo escrito y socializado de técnica radiográfica para los diferentes tipos de proyecciones realizadas en el servicio?",
    reference: "Res. 3100/2019 - Procesos Prioritarios",
    findingText: "Ausencia de protocolo documentado de técnica radiográfica.",
    recommendation: "Elaborar y socializar protocolo de toma radiográfica por tipo de proyección (periapical, panorámica, etc.).",
  },
  {
    criterion: "Manual de Bioseguridad y Protección Radiológica",
    text: "¿Se cuenta con el Manual de Bioseguridad y Protección Radiológica del servicio, aprobado y vigente?",
    reference: "Res. 181434/2002 + Res. 3100/2019",
    findingText: "Manual de Bioseguridad y Protección Radiológica inexistente o desactualizado.",
    recommendation: "Elaborar o actualizar el Manual de Bioseguridad y someterlo a aprobación, incluyendo protocolos de protección radiológica.",
  },
  {
    criterion: "Gestión de residuos radiológicos",
    text: "¿Existe protocolo de gestión de residuos del servicio (líquidos de revelado, películas usadas, EPP contaminado) conforme a normativa ambiental?",
    reference: "Decreto 351/2014 - Gestión de residuos hospitalarios",
    findingText: "No hay protocolo de disposición de residuos específico para el servicio de radiología.",
    recommendation: "Elaborar plan de gestión de residuos diferenciado para el servicio, incluyendo residuos de plata de reveladores.",
  },
  {
    criterion: "Control de calidad de imagen",
    text: "¿Se realiza control de calidad de imagen de forma periódica y está documentado (nitidez, contraste, densidad)?",
    reference: "Res. 3100/2019 - Procesos prioritarios",
    findingText: "No hay registros de control de calidad de imagen radiográfica.",
    recommendation: "Implementar programa de control de calidad de imagen con frecuencia definida y registro de resultados.",
  },
  {
    criterion: "Manejo de incidentes con radiación",
    text: "¿Existe procedimiento documentado para el reporte y manejo de incidentes o accidentes con radiación ionizante?",
    reference: "Res. 181434/2002 + Res. 2003/2014",
    findingText: "Sin protocolo de respuesta ante incidentes radiológicos.",
    recommendation: "Elaborar procedimiento de reporte de incidentes, cadena de mando y medidas correctivas a seguir.",
  },
  {
    criterion: "Programa de auditoría interna",
    text: "¿Se tiene un programa de auditoría interna del servicio con frecuencia y resultados documentados?",
    reference: "Res. 3100/2019 - Mejoramiento continuo",
    findingText: "Ausencia de programa de auditoría y autoevaluación del servicio radiológico.",
    recommendation: "Estructurar programa de auditoría interna semestral con listas de verificación y planes de mejora.",
  },
  {
    criterion: "Consentimiento informado del procedimiento",
    text: "¿Se aplica y archiva el consentimiento informado al paciente antes de realizarle procedimientos radiológicos?",
    reference: "Ley 1751/2015 - Resolución 13437/1991",
    findingText: "No se aplica o no se archiva el consentimiento informado para el procedimiento radiológico.",
    recommendation: "Implementar formato de consentimiento informado adaptado al procedimiento radiológico y archivarlo en historia clínica.",
  },
]);

// ---------------------------------------------------------------------------
// Sección 6: Historia Clínica y Registros (HCR)
// ---------------------------------------------------------------------------

const historiaClinicaQuestions = defineQuestions("historia_clinica", [
  {
    criterion: "Registro en historia clínica",
    text: "¿Los resultados e imágenes radiográficas quedan registrados e integrados en la historia clínica del paciente?",
    reference: "Res. 1995/1999 - Historia clínica",
    findingText: "Los reportes radiológicos no están incorporados a la historia clínica del paciente.",
    recommendation: "Establecer mecanismo de integración del reporte e imagen radiográfica a la historia clínica, digital o física.",
  },
  {
    criterion: "Registro de exposiciones",
    text: "¿Se lleva libro o sistema de registro de pacientes que incluya número de exposición, parámetros técnicos y tipo de proyección?",
    reference: "Res. 181434/2002 - Registros del servicio",
    findingText: "No se lleva registro de las exposiciones radiográficas realizadas.",
    recommendation: "Implementar libro o planilla digital de registros por paciente con fecha, proyección y parámetros técnicos.",
  },
  {
    criterion: "Firma del reporte radiológico",
    text: "¿Los reportes radiológicos son firmados por un odontólogo o especialista en radiología oral y maxilofacial?",
    reference: "Res. 3100/2019 - Talento Humano",
    findingText: "Reportes radiológicos sin firma profesional responsable identificada.",
    recommendation: "Todo reporte debe contar con nombre, firma y número de registro profesional del responsable de la interpretación.",
  },
  {
    criterion: "Custodia y respaldo de imágenes digitales",
    text: "¿Se garantiza la custodia, confidencialidad y respaldo (backup) de las imágenes digitales del servicio?",
    reference: "Ley 1581/2012 - Habeas Data + Res. 1995/1999",
    findingText: "No existe sistema de backup o política de custodia de imágenes digitales.",
    recommendation: "Implementar sistema de backup automático (nube o servidor externo) con política de acceso controlado.",
  },
  {
    criterion: "Conservación de registros",
    text: "¿Los registros del servicio de radiología se conservan por el tiempo mínimo establecido en la normativa (mínimo 20 años para HCL)?",
    reference: "Res. 1995/1999 - Historia clínica",
    findingText: "No hay política documentada de conservación de registros y tiempos de custodia.",
    recommendation: "Establecer política de archivo con tiempos de conservación conforme a Res. 1995/1999 y Ley de Archivos.",
  },
  {
    criterion: "Identificación del paciente",
    text: "¿Se verifica y registra correctamente la identificación del paciente antes de cada procedimiento radiológico?",
    reference: "Protocolo de seguridad del paciente - OMS",
    findingText: "No se documenta protocolo de verificación de identidad del paciente antes de la toma radiográfica.",
    recommendation: "Implementar protocolo de verificación de identidad del paciente (nombre, documento, lateralidad del estudio).",
  },
]);

// ---------------------------------------------------------------------------
// Sección 7: Interdependencia (INT)
// ---------------------------------------------------------------------------

const interdependenciaQuestions = defineQuestions("interdependencia", [
  {
    criterion: "Integración al sistema institucional",
    text: "¿El servicio de radiología está integrado formal y funcionalmente al sistema de información de la IPS?",
    reference: "Res. 3100/2019 - Interdependencias",
    findingText: "El servicio de radiología opera de forma aislada sin integración al sistema institucional.",
    recommendation: "Conectar el servicio al sistema de información institucional para el envío y recepción de solicitudes y resultados.",
  },
  {
    criterion: "Referencia y contrarreferencia",
    text: "¿El servicio cuenta con criterios definidos y documentados para derivar pacientes cuyo estudio supera su capacidad resolutiva?",
    reference: "Res. 3100/2019 - Redes integradas de servicios",
    findingText: "No hay criterios de derivación ni acuerdos de referencia y contrarreferencia establecidos.",
    recommendation: "Documentar los criterios de derivación y establecer acuerdos con centros de referencia de mayor complejidad.",
  },
  {
    criterion: "Continuidad del servicio",
    text: "¿Se cuenta con un plan de contingencia que garantice la continuidad del servicio ante falla del equipo radiográfico?",
    reference: "Res. 3100/2019 - Continuidad",
    findingText: "No existe plan de contingencia ante fallas del equipo de rayos X.",
    recommendation: "Establecer convenio o acuerdo con otra IPS que preste el servicio como alternativa en caso de falla del equipo.",
  },
  {
    criterion: "Comité de seguridad del paciente",
    text: "¿El servicio de radiología participa en el comité institucional de seguridad del paciente y reporte de eventos adversos?",
    reference: "Res. 2003/2014 - Condiciones de habilitación",
    findingText: "El servicio no participa en el comité de seguridad del paciente ni reporta eventos adversos.",
    recommendation: "Incluir al responsable del servicio en el comité institucional y establecer mecanismo de reporte de incidentes.",
  },
  {
    criterion: "Coordinación con mantenimiento",
    text: "¿Existe coordinación formal entre el servicio de radiología y el área de mantenimiento para el reporte y seguimiento de fallas del equipo?",
    reference: "Res. 3100/2019 - Dotación y mantenimiento",
    findingText: "No hay mecanismo formal de comunicación entre el servicio de radiología y el área biomédica/mantenimiento.",
    recommendation: "Implementar sistema de órdenes de trabajo para el reporte de fallas y seguimiento de mantenimientos correctivos.",
  },
  {
    criterion: "Comunicación con áreas clínicas",
    text: "¿El servicio tiene canales de comunicación establecidos con las áreas clínicas remitentes para la entrega de resultados?",
    reference: "Res. 3100/2019 - Procesos de atención",
    findingText: "No hay protocolo formal de comunicación de resultados entre radiología y las áreas clínicas remitentes.",
    recommendation: "Definir tiempos de respuesta, mecanismos de entrega y alertas de hallazgos críticos hacia las áreas remitentes.",
  },
]);

// ---------------------------------------------------------------------------
// Exportaciones
// ---------------------------------------------------------------------------

/** Todas las preguntas agrupadas por clave de sección */
export const ALL_SECTIONS_QUESTIONS: Record<SectionKey, Question[]> = {
  talento_humano: talentoHumanoQuestions,
  infraestructura: infraestructuraQuestions,
  dotacion: dotacionQuestions,
  medicamentos_dispositivos: medicamentosDispositivosQuestions,
  procesos_prioritarios: procesosPrioritariosQuestions,
  historia_clinica: historiaClinicaQuestions,
  interdependencia: interdependenciaQuestions,
};

// Exports de compatibilidad para componentes que aún lean por sección individual
export const talentoHumanoQ = talentoHumanoQuestions;
export const infraestructuraQ = infraestructuraQuestions;
export const dotacionQ = dotacionQuestions;
export const medicamentosQ = medicamentosDispositivosQuestions;
export const procesosPrioritariosQ = procesosPrioritariosQuestions;
export const historiaClinicaQ = historiaClinicaQuestions;
export const interdependenciaQ = interdependenciaQuestions;
