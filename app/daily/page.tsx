import fs from "node:fs/promises";
import path from "node:path";
import DailyCalendarClient, { type CalendarLesson } from "./daily-calendar-client";

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

  return content
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
}

export default async function DailyIndexPage() {
  const lessons = await getLessonsFromCommitFile();
  return <DailyCalendarClient lessons={lessons} />;
}
