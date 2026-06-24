"use client";

import Link from "next/link";
import styles from "./daily-list.module.css";

export type DailyLessonItem = {
  date: string;
  title: string;
  href: string;
};

type Props = {
  lessons: DailyLessonItem[];
};

export default function DailyListClient({ lessons }: Props) {
  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Daily Backend</p>
            <h1>Listado de Lecciones</h1>
            <p>Acceso rapido a cada dia sin calendario visual.</p>
          </div>
          <Link href="/calendar" className={styles.homeButton}>
            Ver Calendario
          </Link>
        </header>

        <div className={styles.list}>
          {lessons.map((lesson) => (
            <Link key={`${lesson.date}-${lesson.href}`} href={lesson.href} className={styles.row}>
              <div className={styles.date}>{lesson.date}</div>
              <div className={styles.content}>
                <h2>{lesson.title}</h2>
                <p>Leer leccion</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
