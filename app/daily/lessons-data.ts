import fs from "node:fs/promises";
import path from "node:path";

export type LessonCard = {
  day: string;
  title: string;
  href: string;
  dayNumber: number;
  date: string;
};

function normalizeLessonTitle(commitMessage: string): { lessonNumber: number | null } {
  const numberMatch = commitMessage.match(/^add\s+lesson\s+no\s+([0-9]+)\b/i);
  const lessonNumber = numberMatch ? Number(numberMatch[1]) : null;

  if (lessonNumber !== null && Number.isFinite(lessonNumber)) {
    return { lessonNumber };
  }

  return { lessonNumber: null };
}

function extractLessonTopic(metadataTitle: string): string | null {
  const inParentheses = metadataTitle.match(/\(([^)]+)\)\s*$/)?.[1]?.trim();
  if (inParentheses) return inParentheses;

  const withoutPrefix = metadataTitle
    .replace(/^Daily Backend\s*-\s*Dia\s*\d+\s*/i, "")
    .replace(/^[-:]\s*/, "")
    .trim();

  return withoutPrefix || null;
}

async function getLessonTitlesByDay(): Promise<Map<number, string>> {
  const dailyDir = path.join(process.cwd(), "app", "daily");
  const entries = await fs.readdir(dailyDir, { withFileTypes: true });
  const dayFolders = entries.filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name));
  const titles = new Map<number, string>();

  await Promise.all(
    dayFolders.map(async (folder) => {
      const day = Number(folder.name);
      const pagePath = path.join(dailyDir, folder.name, "page.tsx");

      try {
        const content = await fs.readFile(pagePath, "utf8");
        const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
        const topic = titleMatch ? extractLessonTopic(titleMatch[1]) : null;
        titles.set(day, topic ? `Leccion ${day}: ${topic}` : `Leccion ${day}`);
      } catch {
        titles.set(day, `Leccion ${day}`);
      }
    })
  );

  return titles;
}

const publishedLessons = [
  {
    date: "2026-05-06",
    title: "Leccion 61: Validacion de input: la primera linea de defensa",
    href: "/daily/61",
  },
  {
    date: "2026-05-07",
    title: "Leccion 62: Endpoints criticos: que proteger primero",
    href: "/daily/62",
  },
  {
    date: "2026-05-08",
    title: "Leccion 63: Logging y monitoreo: como detectar ataques y abuso",
    href: "/daily/63",
  },
  {
    date: "2026-05-09",
    title: "Leccion 64: Seguridad en integraciones externas y APIs de terceros",
    href: "/daily/64",
  },
  {
    date: "2026-05-10",
    title: "Leccion 65: SQL Injection: como romper una base de datos desde input",
    href: "/daily/65",
  },
  {
    date: "2026-05-11",
    title: "Leccion 66: Seguridad en uploads y manejo de archivos",
    href: "/daily/66",
  },
  {
    date: "2026-05-12",
    title: "Leccion 67: Principio de minimo privilegio: menos acceso = mas seguridad",
    href: "/daily/67",
  },
  {
    date: "2026-05-13",
    title: "Leccion 68: Threat Modeling: aprender a pensar como un atacante",
    href: "/daily/68",
  },
  {
    date: "2026-05-14",
    title: "Leccion 69: Como reportar hallazgos de seguridad profesionalmente",
    href: "/daily/69",
  },
  {
    date: "2026-05-15",
    title: "Leccion 70: Auditoria completa simulada: aplicar todo junto",
    href: "/daily/70",
  },
  {
    date: "2026-05-16",
    title: "Leccion 71: Que significa realmente performance",
    href: "/daily/71",
  },
  {
    date: "2026-05-17",
    title: "Leccion 72: Bottlenecks: donde se vuelven lentos los sistemas",
    href: "/daily/72",
  },
  {
    date: "2026-05-18",
    title: "Leccion 73: Caching: evitar trabajo innecesario",
    href: "/daily/73",
  },
];

const plannedLessons = [
  {
    date: "2026-05-19",
    title: "Leccion 74: Trabajo sincronico vs asincronico en backend",
    href: "/daily/74",
  },
  {
    date: "2026-05-20",
    title: "Leccion 75: Escalabilidad vertical vs horizontal",
    href: "/daily/75",
  },
  {
    date: "2026-05-21",
    title: "Leccion 76: Observabilidad y profiling: como descubrir que esta rompiendo tu sistema",
    href: "/daily/76",
  },
  {
    date: "2026-05-22",
    title: "Leccion 77: Diseno para alta carga: como cambia un backend cuando escala de verdad",
    href: "/daily/77",
  },
  {
    date: "2026-05-23",
    title: "Leccion 78: Consistencia vs performance: los tradeoffs reales de sistemas grandes",
    href: "/daily/78",
  },
  {
    date: "2026-05-24",
    title: "Leccion 79: Simulacion completa: disenando un backend preparado para escalar",
    href: "/daily/79",
  },
  {
    date: "2026-05-25",
    title: "Leccion 80: Backpressure",
    href: "/daily/80",
  },
  {
    date: "2026-05-26",
    title: "Leccion 81: Circuit Breaker",
    href: "/daily/81",
  },
  {
    date: "2026-05-27",
    title: "Leccion 82: Health Checks",
    href: "/daily/82",
  },
  {
    date: "2026-05-28",
    title: "Leccion 83: Graceful Shutdown",
    href: "/daily/83",
  },
  {
    date: "2026-05-29",
    title: "Leccion 84: Feature Flags",
    href: "/daily/84",
  },
  {
    date: "2026-05-30",
    title: "Leccion 85: Configuracion por ambiente",
    href: "/daily/85",
  },
  {
    date: "2026-05-31",
    title: "Leccion 86: Deployments seguros",
    href: "/daily/86",
  },
  {
    date: "2026-06-01",
    title: "Leccion 87: Migraciones en produccion",
    href: "/daily/87",
  },
  {
    date: "2026-06-02",
    title: "Leccion 88: Blue/Green y Canary Deployments",
    href: "/daily/88",
  },
  {
    date: "2026-06-03",
    title: "Leccion 89: Diseno para fallos",
    href: "/daily/89",
  },
  {
    date: "2026-06-04",
    title: "Leccion 90: Simulacion completa de backend en produccion",
    href: "/daily/90",
  },
  {
    date: "2026-06-05",
    title: "Leccion 91: Docker desde cero para backend",
    href: "/daily/91",
  },
  {
    date: "2026-06-06",
    title: "Leccion 92: Dockerfile reales en produccion",
    href: "/daily/92",
  },
  {
    date: "2026-06-07",
    title: "Leccion 93: Contenedores reales: redes, volumenes, env y secretos",
    href: "/daily/93",
  },
  {
    date: "2026-06-08",
    title: "Leccion 94: Kubernetes fundamental",
    href: "/daily/94",
  },
  {
    date: "2026-06-09",
    title: "Leccion 95: Deploys en Kubernetes: estrategia y practica",
    href: "/daily/95",
  },
  {
    date: "2026-06-10",
    title: "Leccion 96: Health checks y arranque/graceful shutdown",
    href: "/daily/96",
  },
  {
    date: "2026-06-11",
    title: "Leccion 97: Escalado, recursos y comportamiento bajo fallos",
    href: "/daily/97",
  },
  {
    date: "2026-06-12",
    title: "Leccion 98: Observabilidad y monitoreo de cluster",
    href: "/daily/98",
  },
  {
    date: "2026-06-13",
    title: "Leccion 99: Seguridad de contenedores y cluster",
    href: "/daily/99",
  },
  {
    date: "2026-06-14",
    title: "Leccion 100: CI/CD y despliegue automatizado",
    href: "/daily/100",
  },
  {
    date: "2026-06-15",
    title: "Leccion 101: Operacion diaria y resiliencia en produccion",
    href: "/daily/101",
  },
  {
    date: "2026-06-16",
    title: "Leccion 102: Cultura de plataforma, deploys y rollback",
    href: "/daily/102",
  },
  {
    date: "2026-06-17",
    title: "Leccion 103: Pausa estrategica: antes de seguir construyendo, toca ordenar el proyecto",
    href: "/daily/103",
  },
  {
    date: "2026-06-18",
    title: "Leccion 104: Dominio primero: si el modelo esta mal, todo lo demas estara mal",
    href: "/daily/104",
  },
  {
    date: "2026-06-19",
    title: "Leccion 105: Repositorios: conectar el dominio con la persistencia sin contaminar las reglas de negocio",
    href: "/daily/105",
  },
  {
    date: "2026-06-20",
    title: "Leccion 106: Application Services: convertir reglas del dominio en casos de uso",
    href: "/daily/106",
  },
  {
    date: "2026-06-21",
    title: "Leccion 107: Controllers y DTOs: exponer los casos de uso sin ensuciar la API",
    href: "/daily/107",
  },
  {
    date: "2026-06-22",
    title: "Leccion 108: Payments: cuando una operacion afecta varias entidades al mismo tiempo",
    href: "/daily/108",
  },
  {
    date: "2026-06-23",
    title: "Leccion 109: Auditoria: como saber quien hizo que, cuando y sobre que",
    href: "/daily/109",
  },
  {
    date: "2026-06-24",
    title: "Leccion 110: Hardening de API: convertir una API que funciona en una API preparada para errores reales",
    href: "/daily/110",
  },
  {
    date: "2026-06-25",
    title:
      "Leccion 111: Dockerización de la API: convertir un proyecto de desarrollo en una aplicación portable",
    href: "/daily/111",
  },
  {
    date: "2026-06-26",
    title: "Leccion 112: Kubernetes: desplegar una aplicacion para que sobreviva, escale y se recupere sola",
    href: "/daily/112",
  },
  {
    date: "2026-06-27",
    title: "Leccion 113: Pausa para respirar",
    href: "/daily/113",
  },
  {
    date: "2026-06-28",
    title: "Leccion 114: Como seguimos",
    href: "/daily/114",
  },
  {
    date: "2026-06-29",
    title: "Leccion 115: Monolito vs Monolito Modular vs Microservicios: elegir la arquitectura correcta, no la más popular",
    href: "/daily/115",
  },
  {
    date: "2026-06-30",
    title: "Leccion 116: Comunicacion entre microservicios: REST, gRPC y Mensajeria",
    href: "/daily/116",
  },
  {
    date: "2026-07-01",
    title: "Leccion 117: Comunicacion sincronica vs asincronica: cuando esperar una respuesta y cuando continuar sin ella",
    href: "/daily/117",
  },
  {
    date: "2026-07-02",
    title: "Leccion 118: API Gateway: el punto de entrada de una arquitectura de microservicios",
    href: "/daily/118",
  },
  {
    date: "2026-07-03",
    title: "Leccion 119: Service Discovery: como encuentran los microservicios a otros microservicios",
    href: "/daily/119",
  },
  {
    date: "2026-07-04",
    title: "Leccion 120: RabbitMQ desde cero: entender colas, exchanges y routing",
    href: "/daily/120",
  },
  {
    date: "2026-07-05",
    title: "Leccion 121: Event-Driven Architecture: construir sistemas basados en eventos",
    href: "/daily/121",
  },
  {
    date: "2026-07-06",
    title: "Leccion 122: Saga Pattern: coordinar procesos distribuidos sin usar una transaccion gigante",
    href: "/daily/122",
  },
  {
    date: "2026-07-07",
    title: "Leccion 123: Outbox Pattern: como publicar eventos sin perder consistencia",
    href: "/daily/123",
  },
  {
    date: "2026-07-08",
    title: "Leccion 124: Idempotencia en consumidores: como evitar procesar el mismo mensaje dos veces",
    href: "/daily/124",
  },
  {
    date: "2026-07-09",
    title: "Leccion 125: Dead Letter Queues: que hacer cuando un mensaje nunca puede procesarse",
    href: "/daily/125",
  },
  {
    date: "2026-07-10",
    title: "Leccion 126: CQRS avanzado: separar lectura y escritura cuando el negocio lo necesita",
    href: "/daily/126",
  },
];

export async function getDailyLessons(): Promise<LessonCard[]> {
  const lessonTitlesByDay = await getLessonTitlesByDay();

  const enrichLesson = (lesson: { date: string; title: string; href: string }): LessonCard => {
    const dayNumberMatch = lesson.href.match(/\/daily\/(\d+)/);
    const dayNumber = dayNumberMatch ? Number(dayNumberMatch[1]) : 0;

    return {
      ...lesson,
      day: `Day ${dayNumber}`,
      dayNumber,
    };
  };

  const filePath = path.join(process.cwd(), "commits_con_fechas.txt");
  let content = "";
  try {
    content = await fs.readFile(filePath, "utf8");
  } catch {
    return [];
  }

  const committedLessons = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line): LessonCard | null => {
      const parts = line.split("|");
      if (parts.length < 2) return null;

      const date = parts[0].trim();
      const commitMessage = parts.slice(1).join("|").trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !commitMessage) return null;

      const { lessonNumber } = normalizeLessonTitle(commitMessage);
      if (lessonNumber === null) return null;

      return {
        date,
        day: `Day ${lessonNumber}`,
        title: lessonTitlesByDay.get(lessonNumber) ?? `Leccion ${lessonNumber}`,
        href: `/daily/${lessonNumber}`,
        dayNumber: lessonNumber,
      };
    })
    .filter((item): item is LessonCard => item !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  const committedHrefs = new Set(committedLessons.map((lesson) => lesson.href).filter(Boolean));
  const missingPublishedLessons = publishedLessons.filter((lesson) => !committedHrefs.has(lesson.href));
  const availableLessons = [...committedLessons, ...missingPublishedLessons].map(enrichLesson);
  const availableTitles = new Set(availableLessons.map((lesson) => lesson.title));
  const futureLessons = plannedLessons.filter((lesson) => !availableTitles.has(lesson.title)).map(enrichLesson);

  return [...availableLessons, ...futureLessons].sort((a, b) => a.date.localeCompare(b.date));
}

export async function getLatestPublishedLessons(limit = 5): Promise<LessonCard[]> {
  const today = new Date().toISOString().slice(0, 10);
  const lessons = await getDailyLessons();

  return lessons
    .filter((lesson) => lesson.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
