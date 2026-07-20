"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./daily-calendar.module.css";

export type CalendarLesson = {
  date: string;
  title: string;
  href: string | null;
};

type Props = {
  lessons: CalendarLesson[];
};

type MonthRef = {
  year: number;
  month: number;
};

const WEEK_DAYS = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

function formatMonthLabel({ year, month }: MonthRef): string {
  return new Date(year, month, 1).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });
}

function toMonthRef(date: string): MonthRef {
  const [y, m] = date.split("-").map(Number);
  return { year: y, month: m - 1 };
}

function monthKey(ref: MonthRef): string {
  return `${ref.year}-${String(ref.month + 1).padStart(2, "0")}`;
}

function buildMonthDays(ref: MonthRef): Date[] {
  const first = new Date(ref.year, ref.month, 1);
  const daysInMonth = new Date(ref.year, ref.month + 1, 0).getDate();

  const jsDay = first.getDay();
  const mondayOffset = jsDay === 0 ? 6 : jsDay - 1;

  const days: Date[] = [];

  for (let i = 0; i < mondayOffset; i += 1) {
    days.push(new Date(ref.year, ref.month, -(mondayOffset - 1 - i)));
  }

  for (let d = 1; d <= daysInMonth; d += 1) {
    days.push(new Date(ref.year, ref.month, d));
  }

  while (days.length % 7 !== 0) {
    days.push(new Date(ref.year, ref.month, daysInMonth + (days.length % 7) + 1));
  }

  return days;
}

function toIso(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function DailyCalendarClient({ lessons }: Props) {
  const lessonsByDate = useMemo(() => {
    return lessons.reduce<Record<string, CalendarLesson[]>>((acc, lesson) => {
      if (!acc[lesson.date]) acc[lesson.date] = [];
      acc[lesson.date].push(lesson);
      return acc;
    }, {});
  }, [lessons]);

  const monthRefs = useMemo(() => {
    const uniq = new Set(lessons.map((l) => monthKey(toMonthRef(l.date))));
    return Array.from(uniq)
      .map((key) => {
        const [year, month] = key.split("-").map(Number);
        return { year, month: month - 1 };
      })
      .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month));
  }, [lessons]);

  const [monthIndex, setMonthIndex] = useState(() => Math.max(monthRefs.length - 1, 0));

  if (monthRefs.length === 0) {
    return (
      <main className={styles.page}>
        <section className={styles.shell}>
          <h1>Calendario de Lecciones</h1>
          <p>No hay datos en commits_con_fechas.txt</p>
        </section>
      </main>
    );
  }

  const activeMonth = monthRefs[monthIndex];
  const days = buildMonthDays(activeMonth);
  const activeMonthStart = new Date(activeMonth.year, activeMonth.month, 1);

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <div>
            <h1>Calendario de Lecciones</h1>
          </div>
          <Link href="/daily" className={styles.homeButton}>
            Volver al Listado
          </Link>
        </header>

        <div className={styles.navRow}>
          <button
            type="button"
            onClick={() => setMonthIndex((v) => Math.max(0, v - 1))}
            disabled={monthIndex === 0}
            className={styles.navButton}
          >
            Mes anterior
          </button>
          <h2>{formatMonthLabel(activeMonth)}</h2>
          <button
            type="button"
            onClick={() => setMonthIndex((v) => Math.min(monthRefs.length - 1, v + 1))}
            disabled={monthIndex === monthRefs.length - 1}
            className={styles.navButton}
          >
            Mes siguiente
          </button>
        </div>

        <div className={styles.weekHeader}>
          {WEEK_DAYS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className={styles.grid}>
          {days.map((day) => {
            const iso = toIso(day);
            const dayLessons = lessonsByDate[iso] ?? [];
            const inActiveMonth = day.getMonth() === activeMonth.month;
            const isPreviousMonth = day < activeMonthStart;

            return (
              <article
                key={iso}
                className={`${styles.dayCell} ${inActiveMonth ? "" : styles.outMonth} ${isPreviousMonth ? styles.previousMonth : ""}`}
              >
                <div className={styles.dayNumber}>{day.getDate()}</div>
                <div className={styles.cards}>
                  {dayLessons.map((lesson, idx) =>
                    lesson.href ? (
                      <Link key={`${iso}-${idx}-${lesson.title}`} href={lesson.href} className={styles.cardLink}>
                        {lesson.title}
                      </Link>
                    ) : (
                      <span key={`${iso}-${idx}-${lesson.title}`} className={styles.cardPlain}>
                        {lesson.title}
                      </span>
                    )
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
