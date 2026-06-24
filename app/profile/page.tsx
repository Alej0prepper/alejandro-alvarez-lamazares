import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getLatestPublishedLessons } from "../daily/lessons-data";
import styles from "./page.module.css";

type Lesson = Awaited<ReturnType<typeof getLatestPublishedLessons>>[number];

type LessonTone = {
  label: string;
  accent: string;
  accentSoft: string;
  glow: string;
};

const lessonTones: Record<string, LessonTone> = {
  Arquitectura: {
    label: "ARQUITECTURA",
    accent: "#60A5FA",
    accentSoft: "rgba(59, 130, 246, 0.15)",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  DDD: {
    label: "DDD",
    accent: "#4ADE80",
    accentSoft: "rgba(34, 197, 94, 0.15)",
    glow: "rgba(34, 197, 94, 0.4)",
  },
  "API Design": {
    label: "API DESIGN",
    accent: "#C084FC",
    accentSoft: "rgba(168, 85, 247, 0.15)",
    glow: "rgba(168, 85, 247, 0.4)",
  },
  Persistencia: {
    label: "PERSISTENCIA",
    accent: "#FBBF24",
    accentSoft: "rgba(245, 158, 11, 0.15)",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  Seguridad: {
    label: "SEGURIDAD",
    accent: "#6ce0d2",
    accentSoft: "rgba(108, 224, 210, 0.16)",
    glow: "rgba(108, 224, 210, 0.42)",
  },
  Plataforma: {
    label: "PLATAFORMA",
    accent: "#ff7b7b",
    accentSoft: "rgba(255, 123, 123, 0.16)",
    glow: "rgba(255, 123, 123, 0.42)",
  },
  General: {
    label: "GENERAL",
    accent: "#9aa8bf",
    accentSoft: "rgba(154, 168, 191, 0.16)",
    glow: "rgba(154, 168, 191, 0.42)",
  },
};

function getLessonTone(title: string, dayNumber: number | null): LessonTone {
  const normalized = title.toLowerCase();

  if (dayNumber === 109 || normalized.includes("auditor")) {
    return lessonTones.Arquitectura;
  }

  if (dayNumber === 108 || normalized.includes("payment")) {
    return lessonTones.DDD;
  }

  if (dayNumber === 107 || normalized.includes("controller") || normalized.includes("dto")) {
    return lessonTones["API Design"];
  }

  if (dayNumber === 106 || normalized.includes("application service")) {
    return lessonTones.Persistencia;
  }

  if (dayNumber === 105 || normalized.includes("repository") || normalized.includes("repositorio")) {
    return lessonTones.DDD;
  }

  if (normalized.includes("docker") || normalized.includes("kubernetes") || normalized.includes("deploy")) {
    return lessonTones.Plataforma;
  }

  if (normalized.includes("seguridad") || normalized.includes("hardening") || normalized.includes("threat")) {
    return lessonTones.Seguridad;
  }

  if (normalized.includes("persist") || normalized.includes("repo") || normalized.includes("migracion")) {
    return lessonTones.Persistencia;
  }

  if (normalized.includes("api") || normalized.includes("controller") || normalized.includes("dto") || normalized.includes("endpoint")) {
    return lessonTones["API Design"];
  }

  if (normalized.includes("ddd") || normalized.includes("dominio") || normalized.includes("order") || normalized.includes("servicio")) {
    return lessonTones.DDD;
  }

  if (normalized.includes("arquitect")) {
    return lessonTones.Arquitectura;
  }

  return lessonTones.General;
}

function getDisplayDate(rawDate?: string) {
  if (!rawDate) return "";

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${rawDate}T12:00:00`));
}

function getDisplayDayLabel(lesson: Lesson) {
  return `DAY ${lesson.dayNumber}`;
}

function getDisplayCategory(lesson: Lesson) {
  return getLessonTone(lesson.title, lesson.dayNumber);
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const tone = getDisplayCategory(lesson);

  return (
    <Link
      href={lesson.href}
      className={styles.lessonCard}
      style={
        {
          "--card-accent": tone.accent,
          "--card-accent-soft": tone.accentSoft,
          "--card-glow": tone.glow,
        } as CSSProperties
      }
    >
      <span className={styles.cardCategory}>
        <span className={styles.cardIcon} aria-hidden="true" />
        {tone.label}
      </span>

      <span className={styles.day}>{getDisplayDayLabel(lesson)}</span>

      <div className={styles.lessonBody}>
        <h3>{lesson.title}</h3>
      </div>

      <div className={styles.cardFooter}>
        <time className={styles.lessonDate} dateTime={lesson.date ?? ""}>
          {getDisplayDate(lesson.date)}
        </time>
        <span className={styles.cardArrow} aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}

export default async function ProfilePage() {
  const featuredLessons = await getLatestPublishedLessons(5);

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
            <div className={styles.brand}>
              <div className={styles.logo} aria-hidden="true" />
              <div className={styles.brandCopy}>
                <h1>Alejandro Alvarez</h1>
              </div>
            </div>

          <nav className={styles.nav} aria-label="Secciones">
            <a href="#inicio" className={styles.navLink}>
              Inicio
            </a>
            <a href="#lecciones" className={styles.navLink}>
              Lecciones
            </a>
            <Link href="/atlas" className={styles.navLink}>
              Proyecto
            </Link>
            <a href="#contacto" className={styles.navLink}>
              Contacto
            </a>
          </nav>

          <button className={styles.iconButton} type="button" aria-label="Cambiar tema">
            ◐
          </button>
        </div>
      </header>

      <section className={styles.hero} id="inicio">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Backend Developer. Educator. Constructor.</p>
            <h2 className={styles.heroTitle}>
              Backend Developer.
              <br />
              Educator.
              <span>Constructor.</span>
            </h2>
            <p className={styles.heroLead}>
              Comparto una lectura clara sobre backend y desarrollo práctico para construir piezas reales, entender
              arquitectura y avanzar con criterio.
            </p>
            <div className={styles.heroActions}>
              <Link href="/daily" className={styles.buttonPrimary}>
                Ver Lecciones Diarias
              </Link>
              <Link href="/atlas" className={styles.button}>
                Ver Proyecto
              </Link>
            </div>
            <div className={styles.socialRow} aria-label="Canales">
              <a className={styles.socialButton} href="https://github.com/Alej0prepper" target="_blank" rel="noreferrer">
                GH
              </a>
              <a className={styles.socialButton} href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                IN
              </a>
              <a className={styles.socialButton} href="mailto:alejo@example.com">
                @
              </a>
              <a className={styles.socialButton} href="/daily">
                DL
              </a>
            </div>
          </div>

          <aside className={styles.heroVisual} aria-label="Imagen de perfil">
            <div className={styles.heroFrame}>
              <Image src="/images/hero.png" alt="Perfil de Alejandro Alvarez" fill priority className={styles.heroPhoto} />
              <div className={styles.heroOverlay}>
                <span className={styles.overlayTag}>Backend</span>
                <span className={styles.overlayTag}>C#</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.dailySection} id="lecciones">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleWrap}>
            <span className={styles.sectionIcon} aria-hidden="true" />
            <h2>Lecciones Diarias</h2>
          </div>
          <Link href="/daily" className={styles.sectionLink}>
            Ver todas
          </Link>
        </div>

        <div className={styles.dailyTrack} aria-label="Lecciones recientes">
          {featuredLessons.map((lesson) => (
            <LessonCard key={lesson.href} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className={styles.contactSection} id="contacto">
        <div className={styles.contactCard}>
          <p className={styles.infoLabel}>Contacto</p>
          <h3>Repositorio oficial y punto de entrada a mi trabajo publico.</h3>
          <p className={styles.footer}>
            Repositorio oficial del proyecto:{" "}
            <a
              href="https://github.com/Alej0prepper/alejandro-alvarez-lamazares"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alej0prepper/alejandro-alvarez-lamazares
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
