"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Pausa" },
  { id: "why", label: "2) Por que ahora" },
  { id: "review", label: "3) Que repasar" },
  { id: "closing", label: "4) Cierre" },
] as const;

const pauseSnippet = `No es perder tiempo.
Es ordenar la ruta.`;

const whySnippet = `Seguimos con:
dominio
persistencia
servicios
controllers
docker
kubernetes`;

const reviewSnippet = `Que ya esta listo:
API profesional
produccion
contenedores
despliegue`;

const closingSnippet = `Mañana no seguimos aprendiendo piezas sueltas.
Seguimos construyendo el siguiente bloque.`;

export default function Daily113Client() {
  const [activeSection, setActiveSection] = useState<string>("idea");

  useEffect(() => {
    const sections = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/112";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(
    () => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`,
    [activeSection]
  );

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Daily Backend</h1>
              <div className={styles.brandSub}>Pausa para respirar</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/calendar">
              Calendario
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/112">
              <span className={styles.kbd}>←</span> Dia 112
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/114">
              Siguiente bloque <span className={styles.kbd}>→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>27/06/2026</div>
                <div className={styles.badge}>Daily #113 • Pausa</div>
                <h2 className={styles.title}>Pausa para respirar</h2>
                <p className={styles.lead}>
                  No es un dia perdido. Es el punto donde ordenamos lo construido y dejamos listo el salto al siguiente
                  bloque.
                </p>
              </div>

              <nav className={styles.toc} aria-label="Indice">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={tocLinkClass(item.id)}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. Pausa</h3>
                    <p className={styles.sub}>Antes de ampliar el mapa, conviene respirar y ordenar la ruta.</p>
                  </div>
                  <span className={styles.chip}>Reset</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{pauseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="why">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Por que ahora</h3>
                    <p className={styles.sub}>Ya no estamos en piezas sueltas; estamos en un proyecto con recorrido.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="review">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que repasar</h3>
                    <p className={styles.sub}>Lo ya construido debe quedar claro antes de abrir el siguiente bloque.</p>
                  </div>
                  <span className={styles.chip}>Repaso</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{reviewSnippet}</pre>
                  <div className={styles.callout}>La pausa sirve para consolidar, no para desengancharse del proyecto.</div>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Cierre</h3>
                    <p className={styles.sub}>Mañana seguimos con planificación, no con ruido.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/112">
                      <span className={styles.kbd}>←</span> Dia 112
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/114">
                      Continuar <span className={styles.kbd}>→</span>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
