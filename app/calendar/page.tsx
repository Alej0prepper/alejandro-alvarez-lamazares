import { getDailyLessons } from "../daily/lessons-data";
import DailyCalendarClient, { type CalendarLesson } from "../daily/daily-calendar-client";

const plannedCalendarLessons: CalendarLesson[] = [
  {
    date: "2026-07-16",
    title: "Leccion 132: Arquitectura completa de un e-commerce moderno",
    href: null,
  },
];

export default async function CalendarPage() {
  const lessons = await getDailyLessons();
  return <DailyCalendarClient lessons={[...lessons, ...plannedCalendarLessons]} />;
}
