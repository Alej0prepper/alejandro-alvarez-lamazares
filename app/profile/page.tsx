import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

type LessonCard = {
  day: string;
  title: string;
  href: string;
};

function getLessonTitleFromMetadata(rawTitle: string, day: number): string {
  const fromParentheses = rawTitle.match(/\(([^)]+)\)\s*$/)?.[1]?.trim();
  if (fromParentheses) return fromParentheses;

  const withoutPrefix = rawTitle.replace(/^Daily Backend\s*-\s*Dia\s*\d+\s*/i, "").replace(/^[-:]\s*/, "").trim();
  if (withoutPrefix) return withoutPrefix;

  return `Leccion dia ${day}`;
}

async function getDailyLessons(): Promise<LessonCard[]> {
  const dailyDir = path.join(process.cwd(), "app", "daily");
  const entries = await fs.readdir(dailyDir, { withFileTypes: true });

  const dailyFolders = entries.filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name));

  const validated = await Promise.all(
    dailyFolders.map(async (entry) => {
      const routePagePath = path.join(dailyDir, entry.name, "page.tsx");
      try {
        await fs.access(routePagePath);
        const day = Number(entry.name);
        const routePageContent = await fs.readFile(routePagePath, "utf8");
        const metadataTitleMatch = routePageContent.match(/title:\s*["']([^"']+)["']/);
        const title = metadataTitleMatch ? getLessonTitleFromMetadata(metadataTitleMatch[1], day) : `Leccion dia ${day}`;

        return {
          day: `Day ${day}`,
          title,
          href: `/daily/${day}`,
          dayNumber: day,
        };
      } catch {
        return null;
      }
    })
  );

  return validated
    .filter((item): item is LessonCard & { dayNumber: number } => item !== null)
    .sort((a, b) => b.dayNumber - a.dayNumber)
    .map((item) => ({
      day: item.day,
      title: item.title,
      href: item.href,
    }));
}

export default async function ProfilePage() {
  const lessons = await getDailyLessons();

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div className={styles.brandCopy}>
              <h1>Alejandro Alvarez</h1>
              <p className={styles.brandSub}>Backend • C# • Daily Lessons</p>
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
            <div>
              <h2>Daily Lessons</h2>
              <p>Lecciones cortas diarias. Haz click en una card para abrirla.</p>
            </div>
          <Link href="/daily" className={styles.sectionLink}>
            Abrir archivo
          </Link>
        </div>

        <div className={styles.dailyGrid}>
          {lessons.slice(0, 6).map((lesson) => (
            <Link key={lesson.href} href={lesson.href} className={styles.lessonCard}>
              <span className={styles.day}>{lesson.day}</span>
              <h3>{lesson.title}</h3>
            </Link>
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
