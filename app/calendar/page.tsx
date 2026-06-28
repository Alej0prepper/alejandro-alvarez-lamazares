import { getDailyLessons } from "../daily/lessons-data";
import DailyCalendarClient, { type CalendarLesson } from "../daily/daily-calendar-client";

export default async function CalendarPage() {
  const lessons = await getDailyLessons();
  const calendarOnlyLessons: CalendarLesson[] = [
    { date: "2026-06-27", title: "PAUSA", href: null },
    { date: "2026-06-28", title: "planificacion", href: null },
  ];

  return <DailyCalendarClient lessons={[...lessons, ...calendarOnlyLessons]} />;
}
