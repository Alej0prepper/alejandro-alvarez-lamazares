import fs from "node:fs/promises";
import path from "node:path";
import DailyCalendarClient, { type CalendarLesson } from "./daily-calendar-client";

const publishedLessons: CalendarLesson[] = [
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

const plannedLessons: CalendarLesson[] = [
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
    title: "Leccion 77: Connection Pooling",
    href: null,
  },
  {
    date: "2026-05-23",
    title: "Leccion 78: Thread Pool y operaciones bloqueantes",
    href: null,
  },
  {
    date: "2026-05-24",
    title: "Leccion 79: Observabilidad avanzada",
    href: null,
  },
  {
    date: "2026-05-25",
    title: "Leccion 80: Health Checks",
    href: null,
  },
  {
    date: "2026-05-26",
    title: "Leccion 81: Graceful Shutdown",
    href: null,
  },
  {
    date: "2026-05-27",
    title: "Leccion 82: Circuit Breaker",
    href: null,
  },
  {
    date: "2026-05-28",
    title: "Leccion 83: Backpressure",
    href: null,
  },
  {
    date: "2026-05-29",
    title: "Leccion 84: Feature Flags",
    href: null,
  },
  {
    date: "2026-05-30",
    title: "Leccion 85: Configuracion por ambiente",
    href: null,
  },
  {
    date: "2026-05-31",
    title: "Leccion 86: Deployments seguros",
    href: null,
  },
  {
    date: "2026-06-01",
    title: "Leccion 87: Migraciones de base de datos en produccion",
    href: null,
  },
  {
    date: "2026-06-02",
    title: "Leccion 88: Blue/Green y Canary Deployments",
    href: null,
  },
  {
    date: "2026-06-03",
    title: "Leccion 89: Diseno para fallos",
    href: null,
  },
  {
    date: "2026-06-04",
    title: "Leccion 90: Simulacion completa: backend listo para produccion",
    href: null,
  },
];

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

async function getLessonsFromCommitFile(): Promise<CalendarLesson[]> {
  const filePath = path.join(process.cwd(), "commits_con_fechas.txt");
  const lessonTitlesByDay = await getLessonTitlesByDay();

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
    .map((line): CalendarLesson | null => {
      const parts = line.split("|");
      if (parts.length < 2) return null;

      const date = parts[0].trim();
      const commitMessage = parts.slice(1).join("|").trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !commitMessage) return null;

      const { lessonNumber } = normalizeLessonTitle(commitMessage);
      if (lessonNumber === null) return null;

      return {
        date,
        title: lessonTitlesByDay.get(lessonNumber) ?? `Leccion ${lessonNumber}`,
        href: `/daily/${lessonNumber}`,
      };
    })
    .filter((item): item is CalendarLesson => item !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  const committedHrefs = new Set(committedLessons.map((lesson) => lesson.href).filter(Boolean));
  const missingPublishedLessons = publishedLessons.filter((lesson) => !committedHrefs.has(lesson.href));
  const availableLessons = [...committedLessons, ...missingPublishedLessons];
  const availableTitles = new Set(availableLessons.map((lesson) => lesson.title));
  const futureLessons = plannedLessons.filter((lesson) => !availableTitles.has(lesson.title));

  return [...availableLessons, ...futureLessons].sort((a, b) => a.date.localeCompare(b.date));
}

export default async function DailyIndexPage() {
  const lessons = await getLessonsFromCommitFile();
  return <DailyCalendarClient lessons={lessons} />;
}
