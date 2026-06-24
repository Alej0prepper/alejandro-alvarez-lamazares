import { getDailyLessons } from "./lessons-data";
import DailyListClient from "./daily-list-client";

export default async function DailyIndexPage() {
  const lessons = await getDailyLessons();
  return <DailyListClient lessons={[...lessons].reverse()} />;
}
