import { getDailyLessons } from "../daily/lessons-data";
import DailyCalendarClient, { type CalendarLesson } from "../daily/daily-calendar-client";

const plannedCalendarLessons: CalendarLesson[] = [
  {
    date: "2026-07-24",
    title: "Implementar lo pendiente de OrderFlow",
    href: null,
  },
];

export default async function CalendarPage() {
  const lessons = await getDailyLessons();
  return <DailyCalendarClient lessons={[...lessons, ...plannedCalendarLessons]} />;
}
