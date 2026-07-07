import { getDailyLessons } from "../daily/lessons-data";
import DailyCalendarClient, { type CalendarLesson } from "../daily/daily-calendar-client";

const plannedCalendarLessons: CalendarLesson[] = [
  {
    date: "2026-07-07",
    title: "Leccion 123: Outbox Pattern: publicar eventos sin perder consistencia",
    href: null,
  },
  {
    date: "2026-07-08",
    title: "Leccion 124: Idempotencia en consumidores",
    href: null,
  },
  {
    date: "2026-07-09",
    title: "Leccion 125: Dead Letter Queues (DLQ) y estrategias de reintento",
    href: null,
  },
  {
    date: "2026-07-10",
    title: "Leccion 126: CQRS avanzado",
    href: null,
  },
  {
    date: "2026-07-11",
    title: "Leccion 127: Event Sourcing",
    href: null,
  },
  {
    date: "2026-07-12",
    title: "Leccion 128: Consistencia eventual en profundidad",
    href: null,
  },
  {
    date: "2026-07-13",
    title: "Leccion 129: Resiliencia en microservicios",
    href: null,
  },
  {
    date: "2026-07-14",
    title: "Leccion 130: Observabilidad distribuida",
    href: null,
  },
  {
    date: "2026-07-15",
    title: "Leccion 131: Diseno de APIs para microservicios",
    href: null,
  },
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
