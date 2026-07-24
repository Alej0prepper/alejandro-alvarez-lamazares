import { getDailyLessons } from "../daily/lessons-data";
import DailyCalendarClient, { type CalendarLesson } from "../daily/daily-calendar-client";

const plannedCalendarLessons: CalendarLesson[] = [];

export default async function CalendarPage() {
  const lessons = await getDailyLessons();
  return <DailyCalendarClient lessons={[...lessons, ...plannedCalendarLessons]} />;
}
