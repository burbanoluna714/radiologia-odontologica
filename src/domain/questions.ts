import type { Question } from "./types";
import { SECTIONS, type SectionKey, type SectionPrefix, SUB_SECTIONS, type SubSectionKey } from "./sections";

// ---------------------------------------------------------------------------
// Helper: define preguntas sin ID manual — el ID se genera con el prefijo
// ---------------------------------------------------------------------------

type RawQuestion = Omit<Question, "id" | "subSection">;

/**
 * Genera un arreglo de preguntas con IDs automáticos basados en el prefijo
 * de la sección (e.g. "INF-001", "INF-002", …).
 *
 * Uso:
 *   defineQuestions("INF", {
 *     todos_servicios:  ]
 *   })
 */
export function defineQuestions(key: SectionKey, groups: Partial<Record<SubSectionKey, RawQuestion[]>>): Question[] {
  const section = SECTIONS.find((s) => s.key === key);
  if (!section) {
    throw new Error(`Sección con key "${key}" no encontrada.`);
  }

  const prefix = section.prefix;
  const result: Question[] = [];
  let i = 0;

  for (const [subKey, rawList] of Object.entries(groups)) {
    const subSectionLabel = SUB_SECTIONS[subKey as SubSectionKey];
    for (const q of rawList as RawQuestion[]) {
      result.push({
        ...q,
        id: `${prefix}-${String(i + 1).padStart(3, "0")}`,
        subSection: subSectionLabel,
      });
      i++;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Sección 1: Talento Humano (TH)
// ---------------------------------------------------------------------------

const talentoHumanoQuestions = defineQuestions("talento_humano", {
  todos_servicios: [
    {
      criterion: "",
      text: "El talento humano en salud cuenta con título de educación superior o de formación para el trabajo y el desarrollo humano, según aplique, expedido por una institución educativa competente.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud garantiza que el talento humano cuenta con vinculación que permita la prestación del servicio",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿El personal asistencial del servicio está registrado en el RETHUS (Registro del Talento Humano en Salud)?",
      reference: "Ley 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud determina el personal especializado necesario para operar el servicio, considerando la capacidad instalada, la relación oferta-demanda  y el riesgo asociado en los procedimientos. Este criterio no aplica a profesionales independientes que no trabajen bajo estas condiciones.",
      reference: "Res. 3100/2019 - Talento Humano",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con un convenio vigente con la institución educativa autorizada po la entidad competente",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con un estudio de capacidad instalada en el cual se determine el número máximo de estudiantes que simultáneamente puedan acceder por programa de formación y por jornada, para los servicios utilizados como escenarios de práctica formativa en el área de la salud.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "En servicios de salud diferentes a consulta externa especializada de dolor y cuidado paliativo, donde se atienden pacientes con enfermedades terminales, crónicas, degenerativas e irreversibles, el profesional de la medicina tratante cuenta con constancia de asistencia en formación continua en manejo del dolor y cuidado paliativo, cuando no sea especialista.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "En servicios donde se realicen imágenes diagnósticas por ultrasonido, cuenta con médico especialista en radiología e imágenes diagnósticas o médicos especialistas con conocimientos en manejo e interpretación del ultrasonido y radiaciones ionizantes, con certificado.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El talento humano en salud de los servicios de salud de los grupos de consulta externa, internación y el servicio de urgencias, cuentan con constancia de asistencia en las acciones de formación continua en la atención integral en salud de las personas víctimas de violencia sexual.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuando en un servicio de salud se realicen pruebas en el punto de atención del paciente (Point of Care Testing –POCT), el talento humano en salud que las realice, con excepción del profesional de bacteriología cuenta con constancia de asistencia en las acciones de formación continua en el manejo de estas pruebas.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuando fuera de salas de cirugía se realicen procedimientos bajo sedación Grado I y II, adicional al profesional que realiza el procedimiento, se debe contar con un profesional de medicina (especialista en anestesiología o general) o de odontología, según aplique, quien será el encargado de administrar el medicamento y realizar el monitoreo continuo del paciente, incluyendo el registro de signos vitales y su respuesta a la sedación.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuando fuera de salas de cirugía se realicen procedimientos bajo sedación Grado I y II, adicional al profesional de salud que realiza el procedimiento, todos los profesionales participantes (a excepción del médico especialista en anestesiología) deben demostrar constancia de asistencia a un curso de formación continua en soporte vital básico y sedación.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "",
      text: "Cuenta con: Profesional de odontología o tecnólogo en radiología e imágenes diagnósticas, o técnico profesional o auxiliar de odontología o auxiliar en salud oral o auxiliar de higiene oral.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Disponibilidad de profesional de la odontología, si la toma de radiografías la realiza un auxiliar de odontología o auxiliar en salud oral o auxiliar de higiene oral.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuenta con: la interpretación de las radiografías odontológicas es realizada por el profesional de la odontología.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
  ]
});

// ---------------------------------------------------------------------------
// Sección 2: Infraestructura (INF)
// ---------------------------------------------------------------------------

const infraestructuraQuestions = defineQuestions("infraestructura", {
  todos_servicios: [
    {
      criterion: "",
      text: "El servicio de salud se encuentra dentro de una edificación donde funcionan más servicios de salud y cuenta con infraestructura separada y  delimitada fisicamente. Se pueden compartir los siguientes ambientes y áreas: Aseo, salas de espera y unidades sanitarias ",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Edificaciones de urgencias e internación cuentan con tanque de agua para reserva mínima de 24 horas, calculado sobre 600 lt por cama/camilla día.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cumple con un ancho que permita la movilización de camas, camillas, sillas de ruedas, equipos biomédicos y personal para el traslado de los pacientes en condiciones seguras.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador ubicado en edificaciones de hasta tres (3) pisos que preste servicios en el segundo o tercer nivel debe contar con ascensor, rampa o sistema alternativo de elevación para garantizar el acceso de pacientes y personal",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las edificacieones con mas de 3 pisos contados a partir del nivel más bajo construido, cuentan con ascensor",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Los sistemas alternativos de elevación deben cumplir con que su ubicación no interfiera con el acceso y evacuación por escaleras, estén disponibles para el acceso y evacuación de usuarios, su manejo sea autónomo y garanticen seguridad durante su uso.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las edificación donde se presta el servicio de salud cuenta con suministro de agua, energía eléctrica, conexión a la red de alcantarillado y sistemas de comunicaciones.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Si se tienen escaleras o rampas, el piso debe ser uniforme y de material antideslizante o con elementos que garanticen esta propiedad en todo su recorrido, con pasamanos a uno o ambos lados y con protecciones laterales hacia espacios libres.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "En edificaciones donde se presten servicios de cirugía, atención del parto, laboratorio clínico, urgencias, gestión pre transfusional, diálisis, hospitalarios, imágenes diagnósticas, vacunación, servicio farmacéutico y los que requieran cadena de frío, cuentan con planta eléctrica.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud que utilice equipos generadores de radiaciones ionizantes, cuenta con licencia de práctica médica vigente expedida por la entidad competente.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "La red sanitaria de aguas residuales del establecimiento debe estar conectada a la red de alcantarillado de la zona o contar con soluciones alternativas para la recolección y disposición de estos residuos líquidos.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las áreas y ambientes de todos los servicios de salud cuentan con ventilación e iluminación natural o artificial.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las áreas de circulación de los servicios están libres de obstáculos de manera que permitan la movilización de pacientes, talento humano, usuarios y equipos biomédicos.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cada uno de los pisos o niveles de la edificación cuenta con señalización y planos indicativos de las rutas de evacuación, salidas de emergencia y puntos de encuentro, visible al público en general.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las edificaciones destinadas a la prestación de servicios de salud deben incorporar el concepto de establecimientos de salud sostenibles y resilientes al clima desde su diseño, durante su construcción y operación, frente al consumo de los recursos de energía, agua, uso de combustibles y frente al impacto medioambiental.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "En las instituciones que presten servicios de hospitalización y, en las ambulatorias con servicio de urgencias, las ambulancias deberán tener fácil acceso y parqueo señalizado exclusivo, contiguo a la entrada del servicio de urgencias.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El consultorio donde se realiza examen físico debe ser un ambiente con un área mínima de 10 m<sup>2</sup> (sin incluir la unidad sanitaria), el cual cuenta con áreas para entrevista y de examen separadas entre sí por una barrera física fija o móvil —exceptuando los servicios de urgencias, optometría y oftalmología—, además de un lavamanos cuya exigencia adicional se exonera si el consultorio ya dispone de una unidad sanitaria interna.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las edificaciones destinadas a la prestación de servicios de salud deben contar con pisos que cumplan integralmente con condiciones de durabilidad, solidez y continuidad, siendo superficies impermeables, lavables, antideslizantes, de fácil limpieza y resistentes tanto a los procesos de desinfección como a los factores ambientales.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las paredes o muros externos de las edificaciones destinadas a la prestación de servicios de salud deben ser compactos, asegurando que sus aberturas y superficies expuestas se orienten de modo que minimicen el impacto de los vientos predominantes",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las edificaciones de salud deben contar con mediacañas en la unión entre piso y pared que eviten la formación de aristas o esquinas y aseguren el sellado de las uniones en todos los ambientes donde se realicen procedimientos, así como en los ambientes estériles de los procesos de esterilización y preparación de medicamentos, la sala de autopsias, los ambientes de trabajo sucio y de aseo, las unidades de almacenamiento intermedio y central, y en cualquier otro espacio requerido por el marco normativo específico.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Contar con tanques de almacenamiento independientes para el agua destinada al consumo humano y para la red contraincendios.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Las edificaciones destinadas a la prestación de servicios de salud, en lo referente a la red de agua de lluvia, deberán cumplir con: conexión del agua de lluvia proveniente de techos, patios, azoteas y áreas pavimentadas, a la red independiente de lared de desagüe y con descarga de la red pública de drenaje pluvial.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
  ],
  radiologia_odontologica:[
    {
      criterion: "",
      text: "Cuenta con ambiente de radiología odontológica, si la tecnología lo requiere. Las dimensiones estarán determinadas según la ficha técnica del equipo.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuenta con área de revelado o ambiente oscuro con extracción de gases e iluminación adecuada, con mesón de trabajo con poceta, si la tecnología lo requiere.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Disponibilidad de sala de espera y unidades sanitarias discriminadas por sexo.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El ambiente cuenta con blindaje en plomo o equivalentes según el cálculo para protección contra radiaciones ionizantes.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El servicio deberá contar con un Ambiente de descanso para el personal Profesional y un ambiente de descanso para el personal de enfermería",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
     {
      criterion: "",
      text: "El servicio cuenta con un área para estudio con: mesón de trabajo, salida de voz y datos",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
  ]
});

// ---------------------------------------------------------------------------
// Sección 3: Dotación (DOT)
// ---------------------------------------------------------------------------

const dotacionQuestions = defineQuestions("dotacion", {
  todos_servicios: [
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con el registro de la relación de los equipos biomédicos requeridos para la prestación de servicios de salud, este registro cuenta como mínimo con la siguiente información: nombre del equipo biomédico, marca, modelo, serie, registro sanitario para dispositivos médicos o permiso de comercialización para equipos biomédicos de tecnología controlada, cuando lo requiera y clasificación por riesgo, cuando el equipo lo requiera.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud garantiza las condiciones técnicas de calidad de los equipos biomédicos, para lo cual cuenta con: programa de mantenimiento preventivo, hoja(s) de vida del(los) equipo(s) biomédicos(s)",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con un programa de capacitación en el uso de dispositivos médicos cuando éstos lo requieran, el cual puede ser desarrollado por el fabricante, importador o por el mismo prestador.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "La suficiencia de equipos biomédicos está relacionada con la frecuencia de uso de los mismos, incluyendo los tiempos del proceso de esterilización, cuando aplique.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El mantenimiento de los equipos biomédicos es ejecutado por talento humano profesional, tecnólogo o técnico en áreas relacionadas. Este mantenimiento puede ser realizado directamente por el prestador de servicios de salud o mediante contrato o convenio con un tercero.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Los servicios de salud que requieran carro de paro, cuenta con la siguiente dotación:  Desfibrilador bifásico con sistema de visualización integrado, capacidad de cardioversión, marcapasos transcutáneo y paletas para adultos y pediátricas según aplique. Resucitador pulmonar manual. Aspirador o sistema de vacío. Monitor de signos vitales con accesorios que cuenta como mínimo con: trazado electrocardiográfico si no está incorporado en el desfibrilador, presión no invasiva, saturación de oxígeno que puede estar integrado en el monitor o externo, batería, laringoscopio con hojas rectas y curvas para adultos y pediátricas, según aplique.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Los servicios de salud donde se realicen procedimientos bajo sedación fuera de salas de cirugía y monitorización electroencefalográfica con video y radio cuentan con carro de paro.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Para la dotación de nuevos servicios o el incremento de la capacidad instalada, se deben aplicar los parámetros de dotación nueva.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "En los casos de dotación de reposición por obsolescencia, rigen los parámetros de dotación existente.",
      reference: "Res. 1633/2025",
      findingText: "",
      recommendation: "",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "",
      text: "Cuenta con equipo generador de radiación ionizante según los exámenes diagnósticos realizados.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El servicio cuenta con elementos de protección radiológica para adultos o niños, tales como delantal plomado y protector de tiroides, de acuerdo con la oferta, los protocolos y las especificaciones técnicas del equipo.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
  ]
});

// ---------------------------------------------------------------------------
// Sección 4: Medicamentos, Dispositivos Médicos e Insumos (MDI)
// ---------------------------------------------------------------------------

const medicamentosDispositivosQuestions = defineQuestions("medicamentos_dispositivos", {
  todos_servicios: [
    {
      criterion: "",
      text: "El prestador de servicios de salud lleva registros con la información de todos los medicamentos para uso humano requeridos en la prestación de los servicios que oferte; dichos registros cuentan con la siguiente información: Principio activo, Forma farmacéutica, Concentración, Lote, Presentación comercial, Unidad de medida, Registro sanitario vigente o permiso cuando se autorice, expedido por el Invima.",
      reference: "Res. 3100/2019 ",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Los dispositivos médicos de uso humano requeridos para la prestación de los servicios de salud cuentan con información documentada que dé cuenta de la verificación y seguimiento de la siguiente información: descripción, marca del dispositivo,  serie (cuando aplique), presentación comercial, registro sanitario vigente o permiso de comercialización expedido por el Invima, clasificación por riesgo (información consignada en el registro sanitario o permiso de comercialización), vida útil, cuando aplique, Lote y fecha de vencimiento",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud de salud cuenta con información documentada de los procesos generales según aplique, para: Selección, adquisición, transporte, recepción, almacenamiento,  conservación, control de fechas de vencimiento, control de cadena de frío, manejo de contingencias con la cadena de frío, distribución, dispensació, devolución y disposición final.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con información documentada de la planeación y ejecución de los programas de farmacovigilancia, tecnovigilancia y reactivovigilancia, que garanticen el seguimiento al uso de medicamentos, dispositivos médicos (incluidos los sobre medida) y reactivos de diagnóstico in vitro, cuando aplique.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Para la aplicación del protocolo de lavado de manos o higienización, los servicios de salud cuentan con los insumos de aseo, limpieza y secado que garanticen su cumplimiento.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "La suficiencia de dispositivos médicos está relacionada con la frecuencia de uso de los mismos, incluyendo los tiempos del proceso de esterilización, cuando aplique.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador debe mantener condiciones de almacenamiento, conservación, control fechas de vencimiento, uso y custodia de los medicamentos, dispositivos médicos e insumos contenidos en los carros de paro.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuando el prestador de servicios de salud fabrique en su institución gases medicinales, cuenta con la certificación vigente de Buenas Prácticas de Manufactura expedida por el Invima o la entidad que haga sus veces.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "En los servicios de transporte asistencial, atención prehospitalaria y urgencias cuenta con kit de emergencias para la atención a víctimas de ataques con agentes químicos.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
  ],
});

// ---------------------------------------------------------------------------
// Sección 5: Procesos Prioritarios (PRO)
// ---------------------------------------------------------------------------

const procesosPrioritariosQuestions = defineQuestions("procesos_prioritarios", {
  todos_servicios: [
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con una política de seguridad del paciente acorde con los lineamientos expedidos por el Ministerio de Salud y Protección Social.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud realiza actividades encaminadas a gestionar la seguridad del paciente.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con un comité o instancia que orienta y promueve la política de seguridad del paciente, el control de infecciones y la optimización del uso de antibióticos, cuando los prescriba o administre. En el caso de profesionales independientes de salud podrá ser el mismo prestador.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud adopta y realiza prácticas seguras, contando con información documentada para asegurar la correcta identificación del paciente en los procesos asistenciales (mínimo dos identificadores: nombre completo y número de identificación), gestionar una adecuada comunicación entre el personal asistencial con enfoques diferenciales, detectar y gestionar eventos adversos, y garantizar la funcionalidad de los procedimientos de consentimiento informado.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con información documentada para detectar, prevenir y reducir infecciones asociadas con la atención en salud (incluyendo protocolo de higiene de manos), mejorar la seguridad en la utilización de medicamentos y procedimientos quirúrgicos, prevenir úlceras por presión, reducir la frecuencia de caídas y garantizar la atención segura de la gestante, el recién nacido y los procesos de transfusión sanguínea, según aplique al servicio.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud promueve la cultura de seguridad del paciente que involucra a todo el personal de manera sistemática con un enfoque educativo no punitivo mediante: Capacitación del personal en el tema de seguridad del paciente y en los principales riesgos de la atención, actividades donde se ilustra al paciente y sus allegados en el autocuidado de su seguridad.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con información documentada de las actividades y procedimientos que se realizan en el servicio acordes con su objeto, alcance y enfoque diferencial, mediante guías de práctica clínica- GPC, procedimientos de atención, protocolos de atención y otros documentos que el prestador de servicios de salud determine, dicha información incluye talento humano, equipos biomédicos, medicamentos y dispositivos médicos e insumos requeridos.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "La información documentada es conocida mediante acciones de formación continua por el talento humano encargado y responsable de su aplicación, incluyendo el talento humano en entrenamiento, y existe evidencia de su socialización.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud de acuerdo con las patologías más frecuentes en el servicio define la guía o guías de práctica clínica a adoptar, o adaptar o desarrollar",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud que realice el proceso de esterilización debe contar con información documentada sobre las buenas prácticas de esterilización que detalle, como mínimo, el recibo de productos contaminados y entrega de material estéril, transporte, lavado, secado, lubricación, empaque, etiquetado, esterilización, almacenamiento, verificación de la integridad del material y el control de calidad basado en el análisis de reportes para la toma de medidas preventivas y correctivas.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Los prestadores de servicios de salud tienen definidos procedimientos que garanticen el cumplimiento del no reúso de dispositivos médicos cuando el fabricante así lo haya establecido.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con información documentada que defina: Los procedimientos, siguiendo las recomendaciones del fabricante, para el reprocesamiento y control de calidad que demuestren la eficacia, desempeño y esterilidad del producto.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "El prestador de servicios de salud cuenta con información documentada que defina: acciones de seguimiento a través de los comités de infecciones, de seguridad del paciente y del programa de tecnovigilancia, que garanticen que el dispositivo no ha perdido la eficacia y desempeño para el cual fue diseñado, ni exponga al riesgo de infecciones o complicaciones al usuario.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
  ],
  radiologia_odontologica:[
    {
      criterion: "",
      text: "Cuenta con la siguiente información documentada: Toma de exámenes que impliquen el manejo de cualquier tipo de radiación ionizante, que incluya las acciones para evitar el efecto nocivo de las radiaciones para los pacientes, el personal, los visitantes y el público en general.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuenta con la información documentada de la verificación de la calidad de la imagen y del equipo generador de radiación ionizante, que incluye la toma de medidas preventivas y correctivas cuando apliquen.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuenta con la información documentada de la verificación de la adherencia a los procedimientos realizados en la instalación y cualquier otra consideración sobre la protección radiológica de la instalación.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuenta con la información documentada de la realización y supervisión de toma de radiografías odontológicas cuando no sea realizada por el odontólogo, que incluya como mínimo la calidad de la imagen y radioprotección.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "Cuenta con la información documentada de la interpretación y lectura de las radiografías odontológicas por parte del odontólogo.",
      reference: "Res. 3100/2019",
      findingText: "",
      recommendation: "",
    },
  
  ]
});

// ---------------------------------------------------------------------------
// Sección 6: Historia Clínica y Registros (HCR)
// ---------------------------------------------------------------------------

const historiaClinicaQuestions = defineQuestions("historia_clinica", {
  todos_servicios: [
    {
      criterion: "",
      text: "¿Los resultados e imágenes radiográficas quedan registrados e integrados en la historia clínica del paciente?",
      reference: "Res. 1995/1999 - Historia clínica",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿Se lleva libro o sistema de registro de pacientes que incluya número de exposición, parámetros técnicos y tipo de proyección?",
      reference: "Res. 181434/2002 - Registros del servicio",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿Los reportes radiológicos son firmados por un odontólogo o especialista en radiología oral y maxilofacial?",
      reference: "Res. 3100/2019 - Talento Humano",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿Se garantiza la custodia, confidencialidad y respaldo (backup) de las imágenes digitales del servicio?",
      reference: "Ley 1581/2012 - Habeas Data + Res. 1995/1999",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿Los registros del servicio de radiología se conservan por el tiempo mínimo establecido en la normativa (mínimo 20 años para HCL)?",
      reference: "Res. 1995/1999 - Historia clínica",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿Se verifica y registra correctamente la identificación del paciente antes de cada procedimiento radiológico?",
      reference: "Protocolo de seguridad del paciente - OMS",
      findingText: "",
      recommendation: "",
    },
  ]
});

// ---------------------------------------------------------------------------
// Sección 7: Interdependencia (INT)
// ---------------------------------------------------------------------------

const interdependenciaQuestions = defineQuestions("interdependencia", {
  todos_servicios: [
    {
      criterion: "",
      text: "¿El servicio de radiología está integrado formal y funcionalmente al sistema de información de la IPS?",
      reference: "Res. 3100/2019 - Interdependencias",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿El servicio cuenta con criterios definidos y documentados para derivar pacientes cuyo estudio supera su capacidad resolutiva?",
      reference: "Res. 3100/2019 - Redes integradas de servicios",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿Se cuenta con un plan de contingencia que garantice la continuidad del servicio ante falla del equipo radiográfico?",
      reference: "Res. 3100/2019 - Continuidad",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿El servicio de radiología participa en el comité institucional de seguridad del paciente y reporte de eventos adversos?",
      reference: "Res. 2003/2014 - Condiciones de habilitación",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿Existe coordinación formal entre el servicio de radiología y el área de mantenimiento para el reporte y seguimiento de fallas del equipo?",
      reference: "Res. 3100/2019 - Dotación y mantenimiento",
      findingText: "",
      recommendation: "",
    },
    {
      criterion: "",
      text: "¿El servicio tiene canales de comunicación establecidos con las áreas clínicas remitentes para la entrega de resultados?",
      reference: "Res. 3100/2019 - Procesos de atención",
      findingText: "",
      recommendation: "",
    },
  ]
});

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
