import type { Question } from "./types";
import {
  SECTIONS,
  type SectionKey,
  type SectionPrefix,
  SUB_SECTIONS,
  type SubSectionKey,
} from "./sections";

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
export function defineQuestions(
  key: SectionKey,
  groups: Partial<Record<SubSectionKey, RawQuestion[]>>,
): Question[] {
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
      criterion: "Títulos y certificados",
      text: "El talento humano en salud cuenta con título de educación superior o de formación para el trabajo y el desarrollo humano, según aplique, expedido por una institución educativa competente.",
      reference: "Res. 3100/2019",
      findingText:
        "No se evidencia el soporte físico o digital de los títulos académicos del personal que labora en el servicio.",
      recommendation:
        "Solicitar y archivar copias de los títulos y certificados de formación del talento humano en sus carpetas de hoja de vida.",
    },
    {
      criterion: "Vinculación del personal",
      text: "El prestador de servicios de salud garantiza que el talento humano cuenta con vinculación que permita la prestación del servicio",
      reference: "Res. 3100/2019",
      findingText:
        "No existen contratos o documentos que formalicen la vinculación del personal para garantizar la disponibilidad del servicio.",
      recommendation:
        "Formalizar la vinculación laboral o contractual de todo el personal de salud y mantener los soportes vigentes.",
    },
    {
      criterion: "Inscripción en RETHUS",
      text: "¿El personal asistencial del servicio está registrado en el RETHUS (Registro del Talento Humano en Salud)?",
      reference: "Ley 3100/2019",
      findingText:
        "Se identificó personal asistencial que no aparece registrado en la plataforma RETHUS del Ministerio de Salud.",
      recommendation:
        "Verificar y asegurar que todo el personal asistencial cuente con el registro vigente en RETHUS antes de su contratación.",
    },
    {
      criterion: "Suficiencia de personal",
      text: "El prestador de servicios de salud determina el personal especializado necesario para operar el servicio, considerando la capacidad instalada, la relación oferta-demanda  y el riesgo asociado en los procedimientos. Este criterio no aplica a profesionales independientes que no trabajen bajo estas condiciones.",
      reference: "Res. 3100/2019 - Talento Humano",
      findingText:
        "No se dispone de un estudio de suficiencia que justifique la cantidad de personal especializado frente a la demanda del servicio.",
      recommendation:
        "Realizar un análisis de carga laboral y riesgo para determinar y contratar el personal especializado necesario.",
    },
    {
      criterion: "Convenios de docencia",
      text: "El prestador de servicios de salud cuenta con un convenio vigente con la institución educativa autorizada po la entidad competente",
      reference: "Res. 3100/2019",
      findingText:
        "Se realizan prácticas formativas sin contar con un convenio docencia-servicio vigente y formalizado.",
      recommendation:
        "Gestionar y suscribir convenios con instituciones educativas autorizadas para el desarrollo de prácticas formativas.",
    },
    {
      criterion: "Capacidad de práctica",
      text: "El prestador de servicios de salud cuenta con un estudio de capacidad instalada en el cual se determine el número máximo de estudiantes que simultáneamente puedan acceder por programa de formación y por jornada, para los servicios utilizados como escenarios de práctica formativa en el área de la salud.",
      reference: "Res. 3100/2019",
      findingText:
        "No se ha definido técnicamente el número máximo de estudiantes permitidos por jornada en las áreas de práctica.",
      recommendation:
        "Elaborar el estudio de capacidad instalada para prácticas formativas, garantizando la seguridad del paciente y la calidad del servicio.",
    },
    {
      criterion: "Formación cuidado paliativo",
      text: "En servicios de salud diferentes a consulta externa especializada de dolor y cuidado paliativo, donde se atienden pacientes con enfermedades terminales, crónicas, degenerativas e irreversibles, el profesional de la medicina tratante cuenta con constancia de asistencia en formación continua en manejo del dolor y cuidado paliativo, cuando no sea especialista.",
      reference: "Res. 3100/2019",
      findingText:
        "El médico tratante no acredita formación continua vigente en manejo del dolor y cuidado paliativo.",
      recommendation:
        "Capacitar al personal médico no especialista en manejo del dolor y cuidado paliativo mediante cursos certificados.",
    },
    {
      criterion: "Certificación ultrasonido",
      text: "En servicios donde se realicen imágenes diagnósticas por ultrasonido, cuenta con médico especialista en radiología e imágenes diagnósticas o médicos especialistas con conocimientos en manejo e interpretación del ultrasonido y radiaciones ionizantes, con certificado.",
      reference: "Res. 3100/2019",
      findingText:
        "El personal que opera el ultrasonido no cuenta con la especialidad o certificación específica requerida para su interpretación.",
      recommendation:
        "Garantizar que el servicio sea operado por radiólogos o especialistas certificados en manejo de ultrasonido.",
    },
    {
      criterion: "Formación violencia sexual",
      text: "El talento humano en salud de los servicios de salud de los grupos de consulta externa, internación y el servicio de urgencias, cuentan con constancia de asistencia en las acciones de formación continua en la atención integral en salud de las personas víctimas de violencia sexual.",
      reference: "Res. 3100/2019",
      findingText:
        "El personal de atención directa no presenta certificado de formación en el protocolo de atención a víctimas de violencia sexual.",
      recommendation:
        "Programar y certificar al talento humano en los cursos obligatorios de atención integral a víctimas de violencia sexual.",
    },
    {
      criterion: "Formación en pruebas POCT",
      text: "Cuando en un servicio de salud se realicen pruebas en el punto de atención del paciente (Point of Care Testing –POCT), el talento humano en salud que las realice, con excepción del profesional de bacteriología cuenta con constancia de asistencia en las acciones de formación continua en el manejo de estas pruebas.",
      reference: "Res. 3100/2019",
      findingText:
        "Personal diferente a bacteriología realiza pruebas POCT sin contar con la constancia de formación específica.",
      recommendation:
        "Capacitar al personal asistencial en el uso técnico y clínico de pruebas POCT y documentar la certificación.",
    },
    {
      criterion: "Monitoreo en sedación",
      text: "Cuando fuera de salas de cirugía se realicen procedimientos bajo sedación Grado I y II, adicional al profesional que realiza el procedimiento, se debe contar con un profesional de medicina (especialista en anestesiología o general) o de odontología, según aplique, quien será el encargado de administrar el medicamento y realizar el monitoreo continuo del paciente, incluyendo el registro de signos vitales y su respuesta a la sedación.",
      reference: "Res. 3100/2019",
      findingText:
        "El procedimiento de sedación es realizado por una sola persona, sin el apoyo del profesional adicional para monitoreo.",
      recommendation:
        "Asignar un segundo profesional calificado exclusivamente para el monitoreo y administración de medicamentos durante la sedación.",
    },
    {
      criterion: "Curso de soporte vital",
      text: "Cuando fuera de salas de cirugía se realicen procedimientos bajo sedación Grado I y II, adicional al profesional de salud que realiza el procedimiento, todos los profesionales participantes (a excepción del médico especialista en anestesiología) deben demostrar constancia de asistencia a un curso de formación continua en soporte vital básico y sedación.",
      reference: "Res. 3100/2019",
      findingText:
        "Los profesionales participantes en sedación no cuentan con el curso vigente de soporte vital básico y sedación.",
      recommendation:
        "Verificar y actualizar las certificaciones en soporte vital básico y sedación de todo el equipo participante.",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "Perfil de radiología",
      text: "Cuenta con: Profesional de odontología o tecnólogo en radiología e imágenes diagnósticas, o técnico profesional o auxiliar de odontología o auxiliar en salud oral o auxiliar de higiene oral.",
      reference: "Res. 3100/2019",
      findingText:
        "El personal a cargo de la toma de imágenes no cumple con los perfiles autorizados por la norma técnica.",
      recommendation:
        "Garantizar que la toma de radiografías sea realizada exclusivamente por el personal técnico o profesional autorizado.",
    },
    {
      criterion: "Disponibilidad odontólogo",
      text: "Disponibilidad de profesional de la odontología, si la toma de radiografías la realiza un auxiliar de odontología o auxiliar en salud oral o auxiliar de higiene oral.",
      reference: "Res. 3100/2019",
      findingText:
        "Se realizan tomas radiográficas por auxiliares sin la disponibilidad ni supervisión del profesional de odontología.",
      recommendation:
        "Asegurar que un odontólogo esté disponible y supervise los procedimientos realizados por el personal auxiliar.",
    },
    {
      criterion: "Interpretación imágenes",
      text: "Cuenta con: la interpretación de las radiografías odontológicas es realizada por el profesional de la odontología.",
      reference: "Res. 3100/2019",
      findingText:
        "No se evidencia que la interpretación de las imágenes sea realizada y firmada por un profesional de la odontología.",
      recommendation:
        "Establecer un flujo de trabajo donde el odontólogo realice y consigne formalmente la interpretación de cada imagen.",
    },
  ],
});

// ---------------------------------------------------------------------------
// Sección 2: Infraestructura (INF)
// ---------------------------------------------------------------------------

const infraestructuraQuestions = defineQuestions("infraestructura", {
  todos_servicios: [
    {
      criterion: "Delimitación física",
      text: "El servicio de salud se encuentra dentro de una edificación donde funcionan más servicios de salud y cuenta con infraestructura separada y  delimitada fisicamente. Se pueden compartir los siguientes ambientes y áreas: Aseo, salas de espera y unidades sanitarias ",
      reference: "Res. 3100/2019",
      findingText:
        "El servicio carece de límites físicos claros, permitiendo el cruce inapropiado con otros servicios o áreas no asistenciales.",
      recommendation:
        "Instalar barreras arquitectónicas o delimitaciones físicas que aseguren la independencia del servicio de salud.",
    },
    {
      criterion: "Reserva de agua (24h)",
      text: "Edificaciones de urgencias e internación cuentan con tanque de agua para reserva mínima de 24 horas, calculado sobre 600 lt por cama/camilla día.",
      reference: "Res. 3100/2019",
      findingText:
        "La capacidad del tanque de reserva es inferior a los 600 litros requeridos por cama/camilla para cubrir 24 horas de servicio.",
      recommendation:
        "Ampliar la capacidad de almacenamiento de agua potable según el cálculo de ocupación y normativa vigente.",
    },
    {
      criterion: "Ancho de circulaciones",
      text: "Cumple con un ancho que permita la movilización de camas, camillas, sillas de ruedas, equipos biomédicos y personal para el traslado de los pacientes en condiciones seguras.",
      reference: "Res. 3100/2019",
      findingText:
        "Los pasillos o áreas de circulación son demasiado estrechos para el paso seguro de camillas y equipos biomédicos.",
      recommendation:
        "Adecuar los anchos de pasillos y puertas para cumplir con las dimensiones que faciliten el traslado seguro de pacientes.",
    },
    {
      criterion: "Acceso a niveles superiores",
      text: "El prestador ubicado en edificaciones de hasta tres (3) pisos que preste servicios en el segundo o tercer nivel debe contar con ascensor, rampa o sistema alternativo de elevación para garantizar el acceso de pacientes y personal",
      reference: "Res. 3100/2019",
      findingText:
        "No se dispone de medios de elevación (ascensor o rampa) para el traslado de pacientes a los niveles superiores.",
      recommendation:
        "Instalar un ascensor, rampa o sistema elevador certificado que garantice la accesibilidad universal.",
    },
    {
      criterion: "Seguridad de elevadores",
      text: "Los sistemas alternativos de elevación deben cumplir con que su ubicación no interfiera con el acceso y evacuación por escaleras, estén disponibles para el acceso y evacuación de usuarios, su manejo sea autónomo y garanticen seguridad durante su uso.",
      reference: "Res. 3100/2019",
      findingText:
        "El sistema elevador interfiere con la ruta de evacuación o no permite el manejo autónomo del usuario.",
      recommendation:
        "Reubicar o ajustar el sistema de elevación para que sea seguro y no obstaculice las rutas de emergencia.",
    },
    {
      criterion: "Servicios públicos básicos",
      text: "Las edificación donde se presta el servicio de salud cuenta con suministro de agua, energía eléctrica, conexión a la red de alcantarillado y sistemas de comunicaciones.",
      reference: "Res. 3100/2019",
      findingText:
        "Se presentan fallos constantes o ausencia de conexión formal a redes de servicios públicos básicos.",
      recommendation:
        "Garantizar la conexión permanente y legal a todas las redes de servicios públicos necesarias para la operación.",
    },
    {
      criterion: "Seguridad en rampas",
      text: "Si se tienen escaleras o rampas, el piso debe ser uniforme y de material antideslizante o con elementos que garanticen esta propiedad en todo su recorrido, con pasamanos a uno o ambos lados y con protecciones laterales hacia espacios libres.",
      reference: "Res. 3100/2019",
      findingText:
        "Las rampas o escaleras tienen superficies resbaladizas o carecen de pasamanos y protecciones laterales.",
      recommendation:
        "Instalar material antideslizante, pasamanos reglamentarios y guardas de seguridad en todas las rampas y escaleras.",
    },
    {
      criterion: "Planta eléctrica",
      text: "En edificaciones donde se presten servicios de cirugía, atención del parto, laboratorio clínico, urgencias, gestión pre transfusional, diálisis, hospitalarios, imágenes diagnósticas, vacunación, servicio farmacéutico y los que requieran cadena de frío, cuentan con planta eléctrica.",
      reference: "Res. 3100/2019",
      findingText:
        "El servicio requiere suministro ininterrumpido pero no cuenta con planta eléctrica de emergencia operativa.",
      recommendation:
        "Adquirir y mantener una planta eléctrica con capacidad suficiente para cubrir las áreas críticas del servicio.",
    },
    {
      criterion: "Licencia de radiación",
      text: "El prestador de servicios de salud que utilice equipos generadores de radiaciones ionizantes, cuenta con licencia de práctica médica vigente expedida por la entidad competente.",
      reference: "Res. 3100/2019",
      findingText:
        "Se operan equipos emisores de radiación sin contar con la licencia de práctica médica vigente.",
      recommendation:
        "Tramitar y renovar oportunamente la licencia de práctica médica ante la autoridad de salud competente.",
    },
    {
      criterion: "Red sanitaria residual",
      text: "La red sanitaria de aguas residuales del establecimiento debe estar conectada a la red de alcantarillado de la zona o contar con soluciones alternativas para la recolección y disposición de estos residuos líquidos.",
      reference: "Res. 1633/2025",
      findingText:
        "La disposición de aguas residuales no cumple con la conexión a alcantarillado ni con sistemas alternos aprobados.",
      recommendation:
        "Adecuar la red sanitaria según las especificaciones de la Res. 1633/2025 para vertimientos seguros.",
    },
    {
      criterion: "Ventilación e iluminación",
      text: "Las áreas y ambientes de todos los servicios de salud cuentan con ventilación e iluminación natural o artificial.",
      reference: "Res. 3100/2019",
      findingText:
        "Existen áreas asistenciales con iluminación deficiente o falta de renovación de aire (ventilación).",
      recommendation:
        "Instalar sistemas de iluminación y ventilación que garanticen condiciones de confort y bioseguridad.",
    },
    {
      criterion: "Circulaciones libres",
      text: "Las áreas de circulación de los servicios están libres de obstáculos de manera que permitan la movilización de pacientes, talento humano, usuarios y equipos biomédicos.",
      reference: "Res. 3100/2019",
      findingText:
        "Se observan equipos o mobiliario obstruyendo los pasillos y rutas de tránsito del servicio.",
      recommendation:
        "Liberar las áreas de circulación de cualquier obstáculo, asegurando el flujo libre y seguro de personas y camillas.",
    },
    {
      criterion: "Planos de evacuación",
      text: "Cada uno de los pisos o niveles de la edificación cuenta con señalización y planos indicativos de las rutas de evacuación, salidas de emergencia y puntos de encuentro, visible al público en general.",
      reference: "Res. 3100/2019",
      findingText:
        "La edificación carece de planos de evacuación visibles o señalización de rutas de emergencia.",
      recommendation:
        "Instalar planos 'Usted está aquí' y señalética fotoluminiscente en todos los niveles del establecimiento.",
    },
    {
      criterion: "Sostenibilidad ambiental",
      text: "Las edificaciones destinadas a la prestación de servicios de salud deben incorporar el concepto de establecimientos de salud sostenibles y resilientes al clima desde su diseño, durante su construcción y operación, frente al consumo de los recursos de energía, agua, uso de combustibles y frente al impacto medioambiental.",
      reference: "Res. 1633/2025",
      findingText:
        "No se evidencian acciones o diseños orientados a la sostenibilidad o eficiencia de recursos energéticos e hídricos.",
      recommendation:
        "Implementar un plan de gestión de recursos y realizar mejoras para la eficiencia energética y resiliencia climática.",
    },
    {
      criterion: "Acceso de ambulancias",
      text: "En las instituciones que presten servicios de hospitalización y, en las ambulatorias con servicio de urgencias, las ambulancias deberán tener fácil acceso y parqueo señalizado exclusivo, contiguo a la entrada del servicio de urgencias.",
      reference: "Res. 1633/2025",
      findingText:
        "El acceso de ambulancias está obstruido o no cuenta con señalización de parqueo exclusivo contiguo a urgencias.",
      recommendation:
        "Demarcar y garantizar la exclusividad del acceso y parqueo de ambulancias cerca de la entrada de urgencias.",
    },
    {
      criterion: "Área de consultorio",
      text: "El consultorio donde se realiza examen físico debe ser un ambiente con un área mínima de 10 m<sup>2</sup> (sin incluir la unidad sanitaria), el cual cuenta con áreas para entrevista y de examen separadas entre sí por una barrera física fija o móvil —exceptuando los servicios de urgencias, optometría y oftalmología—, además de un lavamanos cuya exigencia adicional se exonera si el consultorio ya dispone de una unidad sanitaria interna.",
      reference: "Res. 1633/2025",
      findingText:
        "El consultorio de examen físico tiene un área inferior a 10m2 o carece de la barrera física de privacidad.",
      recommendation:
        "Remodelar el consultorio para cumplir con los 10m2 mínimos y asegurar la separación entre entrevista y examen.",
    },
    {
      criterion: "Condiciones de pisos",
      text: "Las edificaciones destinadas a la prestación de servicios de salud deben contar con pisos que cumplan integralmente con condiciones de durabilidad, solidez y continuidad, siendo superficies impermeables, lavables, antideslizantes, de fácil limpieza y resistentes tanto a los procesos de desinfección como a los factores ambientales.",
      reference: "Res. 1633/2025",
      findingText:
        "Los pisos presentan fisuras, no son antideslizantes o el material no resiste procesos de desinfección profunda.",
      recommendation:
        "Instalar pisos de alto tráfico, impermeables y continuos (sin juntas) que faciliten la limpieza y desinfección.",
    },
    {
      criterion: "Muros externos",
      text: "Las paredes o muros externos de las edificaciones destinadas a la prestación de servicios de salud deben ser compactos, asegurando que sus aberturas y superficies expuestas se orienten de modo que minimicen el impacto de los vientos predominantes",
      reference: "Res. 1633/2025",
      findingText:
        "Los muros externos presentan filtraciones o un diseño que no protege el interior del impacto climático excesivo.",
      recommendation:
        "Reforzar la estructura de muros externos y asegurar el sellado de aberturas según criterios de resiliencia climática.",
    },
    {
      criterion: "Mediacañas y sellado",
      text: "Las edificaciones de salud deben contar con mediacañas en la unión entre piso y pared que eviten la formación de aristas o esquinas y aseguren el sellado de las uniones en todos los ambientes donde se realicen procedimientos, así como en los ambientes estériles de los procesos de esterilización y preparación de medicamentos, la sala de autopsias, los ambientes de trabajo sucio y de aseo, las unidades de almacenamiento intermedio y central, y en cualquier otro espacio requerido por el marco normativo específico.",
      reference: "Res. 1633/2025",
      findingText:
        "Se observan uniones en ángulo recto (esquinas) entre piso y pared en áreas donde se realizan procedimientos.",
      recommendation:
        "Instalar perfiles de mediacaña en todas las áreas asistenciales para evitar la acumulación de suciedad y microorganismos.",
    },
    {
      criterion: "Tanques de agua separados",
      text: "Contar con tanques de almacenamiento independientes para el agua destinada al consumo humano y para la red contraincendios.",
      reference: "Res. 1633/2025",
      findingText:
        "Se utiliza el mismo tanque para el consumo humano y para la red de protección contra incendios.",
      recommendation:
        "Instalar sistemas de almacenamiento independientes para garantizar la potabilidad del agua de consumo.",
    },
    {
      criterion: "Red de aguas lluvias",
      text: "Las edificaciones destinadas a la prestación de servicios de salud, en lo referente a la red de agua de lluvia, deberán cumplir con: conexión del agua de lluvia proveniente de techos, patios, azoteas y áreas pavimentadas, a la red independiente de lared de desagüe y con descarga de la red pública de drenaje pluvial.",
      reference: "Res. 1633/2025",
      findingText:
        "Las aguas lluvias están mezcladas con la red de alcantarillado sanitario (desagüe) de la edificación.",
      recommendation:
        "Separar técnicamente las redes de aguas lluvias de las sanitarias con descargas independientes.",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "Ambiente de radiología",
      text: "Cuenta con ambiente de radiología odontológica, si la tecnología lo requiere. Las dimensiones estarán determinadas según la ficha técnica del equipo.",
      reference: "Res. 3100/2019",
      findingText:
        "El ambiente destinado a radiología no cumple con las dimensiones mínimas especificadas por el fabricante del equipo.",
      recommendation:
        "Adecuar el espacio físico siguiendo estrictamente las especificaciones técnicas de la ficha del equipo radiológico.",
    },
    {
      criterion: "Área de revelado",
      text: "Cuenta con área de revelado o ambiente oscuro con extracción de gases e iluminación adecuada, con mesón de trabajo con poceta, si la tecnología lo requiere.",
      reference: "Res. 3100/2019",
      findingText:
        "El cuarto oscuro carece de sistema de extracción de gases o poceta para el manejo de químicos de revelado.",
      recommendation:
        "Instalar un sistema de extracción y un mesón con poceta en el área de revelado químico.",
    },
    {
      criterion: "Salas de espera y baños",
      text: "Disponibilidad de sala de espera y unidades sanitarias discriminadas por sexo.",
      reference: "Res. 3100/2019",
      findingText:
        "No se cuenta con una sala de espera exclusiva o los baños no están discriminados por sexo.",
      recommendation:
        "Habilitar una sala de espera cómoda y unidades sanitarias independientes para hombres y mujeres.",
    },
    {
      criterion: "Blindaje radiológico",
      text: "El ambiente cuenta con blindaje en plomo o equivalentes según el cálculo para protección contra radiaciones ionizantes.",
      reference: "Res. 1633/2025",
      findingText:
        "Las paredes del área de radiología no cuentan con el blindaje plomado necesario según el estudio de cálculo.",
      recommendation:
        "Instalar láminas de plomo o barita en muros y puertas para garantizar la protección radiológica.",
    },
    {
      criterion: "Ambiente de descanso",
      text: "El servicio deberá contar con un Ambiente de descanso para el personal Profesional y un ambiente de descanso para el personal de enfermería",
      reference: "Res. 1633/2025",
      findingText:
        "No se dispone de áreas físicas destinadas al descanso del personal asistencial durante sus jornadas.",
      recommendation:
        "Adecuar ambientes específicos y confortables para el descanso del personal profesional y de enfermería.",
    },
    {
      criterion: "Área de estudio",
      text: "El servicio cuenta con un área para estudio con: mesón de trabajo, salida de voz y datos",
      reference: "Res. 1633/2025",
      findingText:
        "El servicio no cuenta con un área dotada para actividades de estudio y gestión de datos.",
      recommendation:
        "Habilitar un área con mesón y puntos de red para facilitar las labores de estudio y reporte de información.",
    },
  ],
});

// ---------------------------------------------------------------------------
// Sección 3: Dotación (DOT)
// ---------------------------------------------------------------------------

const dotacionQuestions = defineQuestions("dotacion", {
  todos_servicios: [
    {
      criterion: "Inventario de equipos",
      text: "El prestador de servicios de salud cuenta con el registro de la relación de los equipos biomédicos requeridos para la prestación de servicios de salud, este registro cuenta como mínimo con la siguiente información: nombre del equipo biomédico, marca, modelo, serie, registro sanitario para dispositivos médicos o permiso de comercialización para equipos biomédicos de tecnología controlada, cuando lo requiera y clasificación por riesgo, cuando el equipo lo requiera.",
      reference: "Res. 3100/2019",
      findingText:
        "El inventario de equipos biomédicos está incompleto o carece de datos críticos como series o registros sanitarios.",
      recommendation:
        "Actualizar el inventario detallado de todos los equipos biomédicos con la información técnica completa requerida.",
    },
    {
      criterion: "Mantenimiento y hojas vida",
      text: "El prestador de servicios de salud garantiza las condiciones técnicas de calidad de los equipos biomédicos, para lo cual cuenta con: programa de mantenimiento preventivo, hoja(s) de vida del(los) equipo(s) biomédicos(s)",
      reference: "Res. 3100/2019",
      findingText:
        "No se cuenta con hojas de vida actualizadas ni se evidencia el cumplimiento del cronograma de mantenimiento preventivo.",
      recommendation:
        "Implementar un programa de mantenimiento preventivo y actualizar las hojas de vida con cada intervención técnica.",
    },
    {
      criterion: "Capacitación en uso",
      text: "El prestador de servicios de salud cuenta con un programa de capacitación en el uso de dispositivos médicos cuando éstos lo requieran, el cual puede ser desarrollado por el fabricante, importador o por el mismo prestador.",
      reference: "Res. 3100/2019",
      findingText:
        "El personal asistencial opera equipos biomédicos sin evidencia de haber recibido capacitación técnica en su uso.",
      recommendation:
        "Capacitar formalmente al personal en el manejo de los equipos y documentar las actas de capacitación.",
    },
    {
      criterion: "Suficiencia de equipos",
      text: "La suficiencia de equipos biomédicos está relacionada con la frecuencia de uso de los mismos, incluyendo los tiempos del proceso de esterilización, cuando aplique.",
      reference: "Res. 3100/2019",
      findingText:
        "La cantidad de equipos disponibles es insuficiente para cubrir la demanda y los tiempos de rotación por esterilización.",
      recommendation:
        "Adquirir equipos adicionales para garantizar la disponibilidad continua según la demanda de pacientes.",
    },
    {
      criterion: "Ejecución de mantenimiento",
      text: "El mantenimiento de los equipos biomédicos es ejecutado por talento humano profesional, tecnólogo o técnico en áreas relacionadas. Este mantenimiento puede ser realizado directamente por el prestador de servicios de salud o mediante contrato o convenio con un tercero.",
      reference: "Res. 3100/2019",
      findingText:
        "El personal que realiza los mantenimientos no acredita formación técnica o profesional en ingeniería biomédica o áreas afines.",
      recommendation:
        "Contratar personal o empresas de mantenimiento con perfiles idóneos y soportes académicos verificables.",
    },
    {
      criterion: "Dotación carro de paro",
      text: "Los servicios de salud que requieran carro de paro, cuenta con la siguiente dotación:  Desfibrilador bifásico con sistema de visualización integrado, capacidad de cardioversión, marcapasos transcutáneo y paletas para adultos y pediátricas según aplique. Resucitador pulmonar manual. Aspirador o sistema de vacío. Monitor de signos vitales con accesorios que cuenta como mínimo con: trazado electrocardiográfico si no está incorporado en el desfibrilador, presión no invasiva, saturación de oxígeno que puede estar integrado en el monitor o externo, batería, laringoscopio con hojas rectas y curvas para adultos y pediátricas, según aplique.",
      reference: "Res. 3100/2019",
      findingText:
        "El carro de paro está incompleto; faltan elementos críticos como el laringoscopio o el monitor de signos vitales.",
      recommendation:
        "Completar la dotación del carro de paro según el listado taxativo de la Resolución 3100.",
    },
    {
      criterion: "Uso de carro de paro",
      text: "Los servicios de salud donde se realicen procedimientos bajo sedación fuera de salas de cirugía y monitorización electroencefalográfica con video y radio cuentan con carro de paro.",
      reference: "Res. 3100/2019",
      findingText:
        "Se realizan procedimientos bajo sedación sin tener un carro de paro disponible en el área.",
      recommendation:
        "Dotar el área de procedimientos con un carro de paro funcional y de fácil acceso.",
    },
    {
      criterion: "Dotación nueva",
      text: "Para la dotación de nuevos servicios o el incremento de la capacidad instalada, se deben aplicar los parámetros de dotación nueva.",
      reference: "Res. 1633/2025",
      findingText:
        "Los equipos incorporados en el nuevo servicio no cumplen con las especificaciones técnicas para dotación nueva.",
      recommendation:
        "Asegurar que toda dotación para servicios nuevos cumpla con los estándares actualizados de la Res. 1633.",
    },
    {
      criterion: "Dotación de reposición",
      text: "En los casos de dotación de reposición por obsolescencia, rigen los parámetros de dotación existente.",
      reference: "Res. 1633/2025",
      findingText:
        "La reposición de equipos obsoletos no se está realizando bajo los parámetros técnicos definidos.",
      recommendation:
        "Aplicar los criterios de reposición por obsolescencia para garantizar la seguridad tecnológica en el servicio.",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "Equipo radiológico",
      text: "Cuenta con equipo generador de radiación ionizante según los exámenes diagnósticos realizados.",
      reference: "Res. 3100/2019",
      findingText:
        "El equipo radiológico no es apto o no corresponde a los tipos de exámenes ofertados por el servicio.",
      recommendation:
        "Adquirir el equipo generador de radiación específico que soporte la oferta diagnóstica del prestador.",
    },
    {
      criterion: "Protección radiológica",
      text: "El servicio cuenta con elementos de protección radiológica para adultos o niños, tales como delantal plomado y protector de tiroides, de acuerdo con la oferta, los protocolos y las especificaciones técnicas del equipo.",
      reference: "Res. 3100/2019",
      findingText:
        "Faltan elementos de protección para el paciente, como delantales plomados o protectores de tiroides.",
      recommendation:
        "Dotar el servicio con elementos de protección radiológica suficientes y en buen estado para pacientes y personal.",
    },
  ],
});

// ---------------------------------------------------------------------------
// Sección 4: Medicamentos, Dispositivos Médicos e Insumos (MDI)
// ---------------------------------------------------------------------------

const medicamentosDispositivosQuestions = defineQuestions(
  "medicamentos_dispositivos",
  {
    todos_servicios: [
      {
        criterion: "Registro de medicamentos",
        text: "El prestador de servicios de salud lleva registros con la información de todos los medicamentos para uso humano requeridos en la prestación de los servicios que oferte; dichos registros cuentan con la siguiente información: Principio activo, Forma farmacéutica, Concentración, Lote, Presentación comercial, Unidad de medida, Registro sanitario vigente o permiso cuando se autorice, expedido por el Invima.",
        reference: "Res. 3100/2019 ",
        findingText:
          "Los registros de medicamentos no incluyen datos esenciales como el lote o el registro sanitario vigente.",
        recommendation:
          "Implementar un sistema de registro detallado que incluya todos los campos exigidos por la norma.",
      },
      {
        criterion: "Gestión de dispositivos",
        text: "Los dispositivos médicos de uso humano requeridos para la prestación de los servicios de salud cuentan con información documentada que dé cuenta de la verificación y seguimiento de la siguiente información: descripción, marca del dispositivo,  serie (cuando aplique), presentación comercial, registro sanitario vigente o permiso de comercialización expedido por el Invima, clasificación por riesgo (información consignada en el registro sanitario o permiso de comercialización), vida útil, cuando aplique, Lote y fecha de vencimiento",
        reference: "Res. 3100/2019",
        findingText:
          "No existe seguimiento documentado a la vida útil o clasificación de riesgo de los dispositivos médicos.",
        recommendation:
          "Documentar el seguimiento técnico de los dispositivos médicos, asegurando su trazabilidad y seguridad.",
      },
      {
        criterion: "Procesos de selección",
        text: "El prestador de servicios de salud de salud cuenta con información documentada de los procesos generales según aplique, para: Selección, adquisición, transporte, recepción, almacenamiento,  conservación, control de fechas de vencimiento, control de cadena de frío, manejo de contingencias con la cadena de frío, distribución, dispensació, devolución y disposición final.",
        reference: "Res. 3100/2019",
        findingText:
          "No se cuenta con manuales o procesos documentados para el almacenamiento y conservación de insumos.",
        recommendation:
          "Elaborar y socializar el manual de procesos de gestión de medicamentos e insumos médicos.",
      },
      {
        criterion: "Programas de vigilancia",
        text: "El prestador de servicios de salud cuenta con información documentada de la planeación y ejecución de los programas de farmacovigilancia, tecnovigilancia y reactivovigilancia, que garanticen el seguimiento al uso de medicamentos, dispositivos médicos (incluidos los sobre medida) y reactivos de diagnóstico in vitro, cuando aplique.",
        reference: "Res. 3100/2019",
        findingText:
          "No se evidencia la ejecución de los programas de tecno y farmacovigilancia ni reportes ante el Invima.",
        recommendation:
          "Activar y documentar los programas de vigilancia, realizando los reportes de eventos adversos correspondientes.",
      },
      {
        criterion: "Insumos lavado manos",
        text: "Para la aplicación del protocolo de lavado de manos o higienización, los servicios de salud cuentan con los insumos de aseo, limpieza y secado que garanticen su cumplimiento.",
        reference: "Res. 3100/2019",
        findingText:
          "Faltan insumos básicos para la higiene de manos, como jabón quirúrgico, toallas desechables o alcohol glicerinado.",
        recommendation:
          "Garantizar el suministro permanente de insumos para el cumplimiento del protocolo de lavado de manos.",
      },
      {
        criterion: "Suficiencia de insumos",
        text: "La suficiencia de dispositivos médicos está relacionada con la frecuencia de uso de los mismos, incluyendo los tiempos del proceso de esterilización, cuando aplique.",
        reference: "Res. 3100/2019",
        findingText:
          "La cantidad de insumos y dispositivos disponibles no es suficiente para la demanda diaria de pacientes.",
        recommendation:
          "Ajustar los niveles de stock de insumos basándose en el promedio de consumo y frecuencia de uso.",
      },
      {
        criterion: "Gestión en carro de paro",
        text: "El prestador debe mantener condiciones de almacenamiento, conservación, control fechas de vencimiento, uso y custodia de los medicamentos, dispositivos médicos e insumos contenidos en los carros de paro.",
        reference: "Res. 3100/2019",
        findingText:
          "Se hallaron medicamentos vencidos o sin control de custodia dentro del carro de paro.",
        recommendation:
          "Realizar auditorías periódicas al carro de paro para verificar fechas de vencimiento y sellos de seguridad.",
      },
      {
        criterion: "Certificación BPM gases",
        text: "Cuando el prestador de servicios de salud fabrique en su institución gases medicinales, cuenta con la certificación vigente de Buenas Prácticas de Manufactura expedida por el Invima o la entidad que haga sus veces.",
        reference: "Res. 3100/2019",
        findingText:
          "La institución fabrica gases medicinales pero no cuenta con la certificación BPM otorgada por el Invima.",
        recommendation:
          "Obtener y mantener vigente la certificación de Buenas Prácticas de Manufactura para la producción de gases.",
      },
      {
        criterion: "Kit ataques químicos",
        text: "En los servicios de transporte asistencial, atención prehospitalaria y urgencias cuenta con kit de emergencias para la atención a víctimas de ataques con agentes químicos.",
        reference: "Res. 3100/2019",
        findingText:
          "El servicio de urgencias no dispone del kit completo para la atención inicial a víctimas de agentes químicos.",
        recommendation:
          "Adquirir y estandarizar el kit de emergencia para ataques químicos según los protocolos nacionales.",
      },
    ],
  },
);

// ---------------------------------------------------------------------------
// Sección 5: Procesos Prioritarios (PRO)
// ---------------------------------------------------------------------------

const procesosPrioritariosQuestions = defineQuestions("procesos_prioritarios", {
  todos_servicios: [
    {
      criterion: "Política de Seguridad",
      text: "El prestador de servicios de salud cuenta con una política de seguridad del paciente acorde con los lineamientos expedidos por el Ministerio de Salud y Protección Social.",
      reference: "Res. 3100/2019",
      findingText:
        "No se evidencia un documento formal de la política de seguridad del paciente firmado por la gerencia.",
      recommendation:
        "Documentar, aprobar y publicar la política de seguridad del paciente alineada con el Ministerio de Salud.",
    },
    {
      criterion: "Gestión de Seguridad",
      text: "El prestador de servicios de salud realiza actividades encaminadas a gestionar la seguridad del paciente.",
      reference: "Res. 3100/2019",
      findingText:
        "No hay registros de la ejecución de actividades sistemáticas para la gestión de riesgos asistenciales.",
      recommendation:
        "Implementar y documentar el plan de gestión de seguridad del paciente con cronograma de actividades.",
    },
    {
      criterion: "Comité de Seguridad",
      text: "El prestador de servicios de salud cuenta con un comité o instancia que orienta y promueve la política de seguridad del paciente, el control de infecciones y la optimización del uso de antibióticos, cuando los prescriba o administre. En el caso de profesionales independientes de salud podrá ser el mismo prestador.",
      reference: "Res. 3100/2019",
      findingText:
        "No existe acta de constitución o evidencia de reuniones periódicas del comité de seguridad e infecciones.",
      recommendation:
        "Conformar formalmente el comité o instancia técnica y dejar soporte en actas de sus decisiones y seguimiento.",
    },
    {
      criterion: "Prácticas Seguras",
      text: "El prestador de servicios de salud adopta y realiza prácticas seguras, contando con información documentada para asegurar la correcta identificación del paciente en los procesos asistenciales (mínimo dos identificadores: nombre completo y número de identificación), gestionar una adecuada comunicación entre el personal asistencial con enfoques diferenciales, detectar y gestionar eventos adversos, y garantizar la funcionalidad de los procedimientos de consentimiento informado.",
      reference: "Res. 3100/2019",
      findingText:
        "Se omiten los dos identificadores mínimos en registros o no se cuenta con un sistema de reporte de eventos adversos.",
      recommendation:
        "Estandarizar el uso de doble identificación y formalizar el protocolo de reporte y gestión de eventos adversos.",
    },
    {
      criterion: "Protocolos de Riesgo e IAAS",
      text: "El prestador de servicios de salud cuenta con información documentada para detectar, prevenir y reducir infecciones asociadas con la atención en salud (incluyendo protocolo de higiene de manos), mejorar la seguridad en la utilización de medicamentos y procedimientos quirúrgicos, prevenir úlceras por presión, reducir la frecuencia de caídas y garantizar la atención segura de la gestante, el recién nacido y los procesos de transfusión sanguínea, según aplique al servicio.",
      reference: "Res. 3100/2019",
      findingText:
        "Ausencia de protocolos documentados para la prevención de IAAS, caídas o seguridad en medicamentos.",
      recommendation:
        "Desarrollar y adoptar manuales de bioseguridad y protocolos específicos para la mitigación de riesgos asistenciales.",
    },
    {
      criterion: "Cultura de Seguridad",
      text: "El prestador de servicios de salud promueve la cultura de seguridad del paciente que involucra a todo el personal de manera sistemática con un enfoque educativo no punitivo mediante: Capacitación del personal en el tema de seguridad del paciente y en los principales riesgos de la atención, actividades donde se ilustra al paciente y sus allegados en el autocuidado de su seguridad.",
      reference: "Res. 3100/2019",
      findingText:
        "No se presentan soportes de capacitación al talento humano ni material educativo entregado a los pacientes.",
      recommendation:
        "Ejecutar capacitaciones periódicas al personal y diseñar estrategias de educación al paciente sobre su propia seguridad.",
    },
    {
      criterion: "Documentación y Guías",
      text: "El prestador de servicios de salud cuenta con información documentada de las actividades y procedimientos que se realizan en el servicio acordes con su objeto, alcance y enfoque diferencial, mediante guías de práctica clínica- GPC, procedimientos de atención, protocolos de atención y otros documentos que el prestador de servicios de salud determine, dicha información incluye talento humano, equipos biomédicos, medicamentos y dispositivos médicos e insumos requeridos.",
      reference: "Res. 3100/2019",
      findingText:
        "Las Guías de Práctica Clínica y protocolos operativos no están documentados o no corresponden al alcance del servicio.",
      recommendation:
        "Documentar todos los procedimientos asistenciales y adoptar guías clínicas oficiales según los servicios habilitados.",
    },
    {
      criterion: "Socialización Documental",
      text: "La información documentada es conocida mediante acciones de formación continua por el talento humano encargado y responsable de su aplicación, incluyendo el talento humano en entrenamiento, y existe evidencia de su socialización.",
      reference: "Res. 3100/2019",
      findingText:
        "El personal asistencial desconoce los protocolos vigentes y no hay actas de socialización firmadas.",
      recommendation:
        "Realizar jornadas de socialización de guías y protocolos, asegurando la firma de asistencia y evaluación de conocimiento.",
    },
    {
      criterion: "Definición de GPC",
      text: "El prestador de servicios de salud de acuerdo con las patologías más frecuentes en el servicio define la guía o guías de práctica clínica a adoptar, o adaptar o desarrollar",
      reference: "Res. 3100/2019",
      findingText:
        "No se ha realizado el diagnóstico de patologías frecuentes para la selección de las guías de práctica clínica.",
      recommendation:
        "Identificar las patologías de mayor prevalencia y formalizar la adopción de guías específicas para estas.",
    },
    {
      criterion: "Buenas Prácticas Esterilidad",
      text: "El prestador de servicios de salud que realice el proceso de esterilización debe contar con información documentada sobre las buenas prácticas de esterilización que detalle, como mínimo, el recibo de productos contaminados y entrega de material estéril, transporte, lavado, secado, lubricación, empaque, etiquetado, esterilización, almacenamiento, verificación de la integridad del material y el control de calidad basado en el análisis de reportes para la toma de medidas preventivas y correctivas.",
      reference: "Res. 3100/2019",
      findingText:
        "El manual de esterilización está incompleto o no se registran los controles de calidad químicos y biológicos.",
      recommendation:
        "Documentar el ciclo completo de esterilización y llevar registros diarios de los controles de calidad realizados.",
    },
    {
      criterion: "Gestión de No Reúso",
      text: "Los prestadores de servicios de salud tienen definidos procedimientos que garanticen el cumplimiento del no reúso de dispositivos médicos cuando el fabricante así lo haya establecido.",
      reference: "Res. 3100/2019",
      findingText:
        "Se identificó el reúso de dispositivos médicos etiquetados por el fabricante como de 'un solo uso'.",
      recommendation:
        "Implementar una política estricta de no reúso y vigilar su cumplimiento mediante auditorías de campo.",
    },
    {
      criterion: "Reprocesamiento de Equipos",
      text: "El prestador de servicios de salud cuenta con información documentada que defina: Los procedimientos, siguiendo las recomendaciones del fabricante, para el reprocesamiento y control de calidad que demuestren la eficacia, desempeño y esterilidad del producto.",
      reference: "Res. 3100/2019",
      findingText:
        "No existen protocolos de limpieza y desinfección de alto nivel que sigan las fichas técnicas del fabricante.",
      recommendation:
        "Elaborar protocolos de reprocesamiento basados estrictamente en las recomendaciones técnicas del fabricante.",
    },
    {
      criterion: "Seguimiento a Dispositivos",
      text: "El prestador de servicios de salud cuenta con información documentada que defina: acciones de seguimiento a través de los comités de infecciones, de seguridad del paciente y del programa de tecnovigilancia, que garanticen que el dispositivo no ha perdido la eficacia y desempeño para el cual fue diseñado, ni exponga al riesgo de infecciones o complicaciones al usuario.",
      reference: "Res. 3100/2019",
      findingText:
        "No se realiza seguimiento al desempeño de los dispositivos médicos reprocesados en los comités técnicos.",
      recommendation:
        "Incluir el análisis de seguridad de dispositivos médicos en las reuniones del comité de seguridad y tecnovigilancia.",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "Radioprotección Institucional",
      text: "Cuenta con la siguiente información documentada: Toma de exámenes que impliquen el manejo de cualquier tipo de radiación ionizante, que incluya las acciones para evitar el efecto nocivo de las radiaciones para los pacientes, el personal, los visitantes y el público en general.",
      reference: "Res. 3100/2019",
      findingText:
        "Ausencia de un protocolo de protección radiológica que detalle medidas de seguridad para usuarios y personal.",
      recommendation:
        "Desarrollar y difundir el manual de protección radiológica con normas específicas de bioseguridad.",
    },
    {
      criterion: "Calidad Imagen y Equipo",
      text: "Cuenta con la información documentada de la verificación de la calidad de la imagen y del equipo generador de radiación ionizante, que incluye la toma de medidas preventivas y correctivas cuando apliquen.",
      reference: "Res. 3100/2019",
      findingText:
        "No se presentan reportes de control de calidad de la imagen ni actas de mantenimiento preventivo del equipo.",
      recommendation:
        "Realizar y documentar pruebas periódicas de calidad de imagen y mantenimientos técnicos del equipo radiológico.",
    },
    {
      criterion: "Adherencia a Seguridad",
      text: "Cuenta con la información documentada de la verificación de la adherencia a los procedimientos realizados en la instalación y cualquier otra consideración sobre la protección radiológica de la instalación.",
      reference: "Res. 3100/2019",
      findingText:
        "No hay evidencia de supervisiones que confirmen que el personal aplica las normas de protección radiológica.",
      recommendation:
        "Implementar listas de chequeo para verificar la adherencia del personal a los protocolos de radioprotección.",
    },
    {
      criterion: "Supervisión Toma Radiográfica",
      text: "Cuenta con la información documentada de la realización y supervisión de toma de radiografías odontológicas cuando no sea realizada por el odontólogo, que incluya como mínimo la calidad de la imagen y radioprotección.",
      reference: "Res. 3100/2019",
      findingText:
        "Falta el registro de supervisión técnica del odontólogo sobre las tomas realizadas por el personal auxiliar.",
      recommendation:
        "Crear y diligenciar el registro de supervisión de tomas radiográficas para asegurar la calidad técnica.",
    },
    {
      criterion: "Interpretación Profesional",
      text: "Cuenta con la información documentada de la interpretación y lectura de las radiografías odontológicas por parte del odontólogo.",
      reference: "Res. 3100/2019",
      findingText:
        "Las radiografías no cuentan con un reporte escrito o nota de interpretación firmada por el odontólogo.",
      recommendation:
        "Garantizar que toda imagen diagnóstica cuente con su respectiva interpretación clínica documentada por el profesional.",
    },
  ],
});

// ---------------------------------------------------------------------------
// Sección 6: Historia Clínica y Registros (HCR)
// ---------------------------------------------------------------------------

const historiaClinicaQuestions = defineQuestions("historia_clinica", {
  todos_servicios: [
    {
      criterion: "Apertura de Historia Clínica",
      text: "Toda atención de primera vez a un usuario debe incluir el proceso de apertura de historia clínica. Todos los pacientes atendidos cuentan con historia clínica.",
      reference: "Res. 3100/2019",
      findingText:
        "Se identificaron pacientes atendidos por primera vez sin el registro formal de apertura de historia clínica.",
      recommendation:
        "Garantizar que todo ingreso de usuario nuevo cuente con la apertura inmediata de su historia clínica electrónica o física.",
    },
    {
      criterion: "Unicidad y Manejo de Archivo",
      text: "El prestador de servicios de salud cuenta con procedimientos para utilizar una historia única y para el registro de entrada y salida de historias del archivo físico. Ello implica que el prestador de servicios de salud cuenta con un mecanismo para unificar la información de cada paciente y su disponibilidad para el equipo de salud.",
      reference: "Res. 3100/2019",
      findingText:
        "La información del paciente se encuentra fragmentada o no existe un control de entrada y salida del archivo físico.",
      recommendation:
        "Implementar un sistema de historia clínica única y un libro de control para el movimiento de expedientes físicos.",
    },
    {
      criterion: "Seguridad y Permanencia Digital",
      text: "Los medios electrónicos para la gestión de la historia clínica garantizan la confidencialidad y seguridad, así como el carácter permanente de registrar en esta y en otros registros asistenciales, sin que se puedan modificar los datos una vez se guarden los registros.",
      reference: "Res. 3100/2019",
      findingText:
        "El software utilizado permite la edición de notas después de haber sido guardadas o no cuenta con pistas de auditoría.",
      recommendation:
        "Ajustar los permisos del software para bloquear la edición de registros cerrados y asegurar la inalterabilidad de los datos.",
    },
    {
      criterion: "Calidad del Diligenciamiento",
      text: "La historia clínica y los registros asistenciales se diligencian en forma clara, legible, sin tachones, enmendaduras, intercalaciones, sin dejar espacios en blanco y sin utilizar siglas.",
      reference: "Res. 3100/2019",
      findingText:
        "Se observan registros con uso excesivo de siglas no institucionales o espacios en blanco en las evoluciones.",
      recommendation:
        "Capacitar al personal en el correcto diligenciamiento y definir un manual de siglas institucionales permitidas.",
    },
    {
      criterion: "Oportunidad del Registro",
      text: "El diligenciamiento de los registros de atención de la historia clínica se realiza simultánea o inmediatamente después de la atención en salud.",
      reference: "Res. 3100/2019",
      findingText:
        "Existen desfases significativos de tiempo entre la atención brindada y el registro en la historia clínica.",
      recommendation:
        "Asegurar que el registro sea concomitante a la atención para garantizar la veracidad y oportunidad de la información.",
    },
    {
      criterion: "Custodia y Confidencialidad",
      text: "La historia clínica y demás registros son conservados en archivo único garantizando la custodia y confidencialidad de los documentos o registros protegidos legalmente por reserva.",
      reference: "Res. 3100/2019",
      findingText:
        "El área de archivo no cuenta con restricciones de acceso, exponiendo la confidencialidad de los datos.",
      recommendation:
        "Adecuar el espacio de archivo con acceso restringido solo al personal autorizado y bajo llave o clave.",
    },
    {
      criterion: "Consentimiento Informado",
      text: "El prestador de servicios de salud cuenta con un procedimiento de consentimiento informado que incluye mecanismos para verificar su aplicación, para que el paciente o usuario o su responsable aprueben o no documentalmente el procedimiento e intervención en salud a que va a ser sometido, previa información de los beneficios, riesgos, alternativas e implicaciones del acto asistencial.",
      reference: "Res. 3100/2019",
      findingText:
        "Los formatos de consentimiento informado están incompletos o no describen específicamente riesgos y alternativas.",
      recommendation:
        "Actualizar los formatos de consentimiento informado y socializar el proceso de explicación al paciente antes de la firma.",
    },
    {
      criterion: "Certificación de Sistemas",
      text: "Cuando el prestador de servicios de salud use mecanismos electrónicos u ópticos para manejar la historia clínica, debe garantizar autenticidad, fiabilidad, integridad y disponibilidad de los datos, conforme a la normatividad vigente, presentando un documento firmado por un ingeniero de sistemas con tarjeta profesional que certifique dicho cumplimiento",
      reference: "Res. 3100/2019",
      findingText:
        "No se presenta la certificación técnica del software de historia clínica firmada por un ingeniero de sistemas con tarjeta profesional.",
      recommendation:
        "Solicitar y archivar la certificación de cumplimiento normativo del software, debidamente firmada por el profesional competente.",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "Registro de Medicina Nuclear",
      text: "Cuenta con: Registro de resultados diagnósticos, cuando realice medicina nuclear diagnóstica.",
      reference: "Res. 3100/2019",
      findingText:
        "No se evidencia el libro o base de datos de resultados para el servicio de medicina nuclear.",
      recommendation:
        "Implementar un registro sistemático de todos los resultados diagnósticos obtenidos en el área.",
    },
    {
      criterion: "Gestión de Resultados Rechazados",
      text: "Cuenta con registro de resultados rechazados por el profesional de la medicina especialista en medicina nuclear y sus causas, cuando se realice medicina nuclear diagnóstica.",
      reference: "Res. 3100/2019",
      findingText:
        "Ausencia de registro de imágenes o resultados rechazados y sus respectivas justificaciones técnicas.",
      recommendation:
        "Crear una bitácora de rechazos que permita analizar causas raíz y mejorar la calidad de las tomas.",
    },
    {
      criterion: "Registro de Tratamientos",
      text: "Cuenta con registro de tratamientos realizados.",
      reference: "Res. 3100/2019",
      findingText:
        "Inconsistencia en el registro cronológico de los tratamientos realizados a los pacientes.",
      recommendation:
        "Llevar un control estricto y detallado de cada intervención terapéutica realizada en el servicio.",
    },
    {
      criterion: "Control de Dosis al Alta",
      text: "Cuenta con registro de mediciones de tasa de exposición o tasa de dosis equivalente, al momento del alta de pacientes sometidos a terapia.",
      reference: "Res. 3100/2019",
      findingText:
        "No se registran las mediciones de radiación finales antes del egreso del paciente sometido a terapia.",
      recommendation:
        "Protocolizar y registrar la medición de la tasa de exposición al alta para garantizar la seguridad del entorno del paciente.",
    },
  ],
});

// ---------------------------------------------------------------------------
// Sección 7: Interdependencia (INT)
// ---------------------------------------------------------------------------

const interdependenciaQuestions = defineQuestions("interdependencia", {
  todos_servicios: [
    {
      criterion: "Contratos de Apoyo",
      text: "Cuando se contrate un servicio interdependiente, debe existir un contrato o acuerdo escrito que establezca su apoyo al servicio principal, garantizando como mínimo la calidad y los tiempos de entrega de los productos, la existencia de procedimientos documentados de atención y una supervisión al contratista que asegure la seguridad del resultado final.",
      reference: "Res. 3100/2019",
      findingText:
        "Los contratos con servicios externos no especifican tiempos de entrega ni mecanismos de supervisión de calidad.",
      recommendation:
        "Actualizar los contratos o convenios incluyendo cláusulas de calidad, tiempos de respuesta y supervisión periódica.",
    },
    {
      criterion: "Disponibilidad de Transporte",
      text: "Cuando fuera de salas de cirugía, se realicen procedimientos bajo sedación y monitorización electroencefalográfica con video y radio; el prestador de servicios de salud tiene disponibilidad del servicio de transporte asistencial.",
      reference: "Res. 3100/2019",
      findingText:
        "No se cuenta con convenio vigente o disponibilidad inmediata de ambulancia para procedimientos bajo sedación.",
      recommendation:
        "Formalizar y documentar el contrato de transporte asistencial que garantice la atención de emergencias durante la sedación.",
    },
  ],
  radiologia_odontologica: [
    {
      criterion: "Transporte en Baja Complejidad",
      text: "En la modalidad intramural de baja complejidad, el prestador debe cumplir con los criterios aplicables a todos los servicios y contar adicionalmente con la disponibilidad de servicio de transporte asistencial cuando se realicen procedimientos bajo sedación fuera de salas de cirugía.",
      reference: "Res. 3100/2019",
      findingText:
        "El servicio de baja complejidad realiza sedación sin garantizar la interdependencia con transporte asistencial.",
      recommendation:
        "Asegurar la disponibilidad de ambulancia mediante contrato vigente antes de programar sedaciones.",
    },
    {
      criterion: "Urgencias y Transporte en Alta Complejidad",
      text: "En la modalidad intramural de mediana y alta complejidad, además de cumplir con los criterios aplicables a todos los servicios, se debe garantizar la disponibilidad de los servicios de urgencias y de transporte asistencial siempre que se realicen procedimientos que involucren intervencionismo o la administración de medios de contraste.",
      reference: "Res. 3100/2019",
      findingText:
        "No se garantiza la interdependencia con el servicio de urgencias para procedimientos que requieren medios de contraste.",
      recommendation:
        "Garantizar y documentar la ruta de atención inmediata con el servicio de urgencias y transporte asistencial para pacientes de intervencionismo.",
    },
  ],
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
