import { getDailyLessons } from "../daily/lessons-data";
import DailyCalendarClient from "../daily/daily-calendar-client";

export default async function CalendarPage() {
  const lessons = await getDailyLessons();
  return <DailyCalendarClient lessons={lessons} />;
}
