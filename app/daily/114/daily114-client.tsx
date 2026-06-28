"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "block", label: "2) Bloque 113-130" },
  { id: "seasons", label: "3) Temporadas" },
  { id: "fit", label: "4) Encaje" },
  { id: "closing", label: "5) Cierre" },
] as const;

const introSnippet = `Ya no eres un estudiante de conceptos aislados.
A partir de aqui empezamos a estudiar
como se construyen sistemas reales.`;

const blockSnippet = `Arquitectura de Sistemas Distribuidos (113-130)

113 Monolito vs Monolito Modular vs Microservicios
114 Bounded Context
115 Comunicacion sincrona entre servicios
116 Comunicacion asincrona
117 API Gateway
118 Service Discovery
119 Configuracion distribuida
120 Observabilidad distribuida
121 Transacciones distribuidas
122 Saga Pattern
123 Outbox Pattern
124 Inbox Pattern
125 Idempotencia
126 Consistencia eventual
127 Versionado entre microservicios
128 Fallos en cascada
129 Arquitectura completa de un eCommerce
130 Simulacion completa de una plataforma distribuida`;

const seasonsSnippet = `Temporada 1 (4-50)
Fundamentos del Backend Profesional

Temporada 2 (51-70)
Seguridad

Temporada 3 (71-90)
Performance y Produccion

Temporada 4 (91-112)
Contenedores y despliegue de una API real

Temporada 5 (113-130)
Sistemas Distribuidos y Microservicios`;

const afterSnippet = `131-150 Persistencia avanzada
151-170 Cloud
171-190 Arquitectura empresarial
191-210 Proyecto gigante`;

const fitSnippet = `Encaja con:
OrderFlow
eStore CSA
Gateway
RabbitMQ
Redis
PostgreSQL
MongoDB
Docker Compose`;

const closingSnippet = `La siguiente fase ya no trata de clases sueltas.
Trata de aprender como evolucionan los sistemas cuando dejan de ser una sola API.`;

export default function Daily114Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/113";
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
              <div className={styles.brandSub}>Como seguimos</div>
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
            <Link className={styles.btn} href="/daily/113">
              <span className={styles.kbd}>←</span> Dia 113
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/115">
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
                <div className={styles.createdAt}>28/06/2026</div>
                <div className={styles.badge}>Daily #114 • Planificacion</div>
                <h2 className={styles.title}>Como seguimos con los sistemas distribuidos</h2>
                <p className={styles.lead}>
                  Ya completaste la etapa de una API profesional. Ahora toca planear el bloque donde esa API empieza a
                  convivir con otras piezas de sistema.
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
                    <h3>1. La idea</h3>
                    <p className={styles.sub}>Dejar conceptos aislados y empezar a estudiar sistemas reales.</p>
                  </div>
                  <span className={styles.chip}>Transicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{introSnippet}</pre>
                  <div className={styles.callout}>
                    El siguiente paso natural es entender como se comportan las arquitecturas cuando ya no son una sola
                    API.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="block">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Bloque 113-130</h3>
                    <p className={styles.sub}>La secuencia propuesta para entrar a sistemas distribuidos.</p>
                  </div>
                  <span className={styles.chip}>Roadmap</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{blockSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="seasons">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Temporadas</h3>
                    <p className={styles.sub}>La mejor forma de ordenar el recorrido es por etapas, no por clases sueltas.</p>
                  </div>
                  <span className={styles.chip}>Estructura</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{seasonsSnippet}</pre>
                  <pre>{afterSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="fit">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Encaje con el proyecto</h3>
                    <p className={styles.sub}>Esto no es teoria aislada: encaja con el proyecto que ya tienes en marcha.</p>
                  </div>
                  <span className={styles.chip}>Proyecto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fitSnippet}</pre>
                  <div className={styles.quote}>
                    Todo este bloque se puede explicar con ejemplos que ya conoces y con piezas que ya conviven en tu
                    stack.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Cierre</h3>
                    <p className={styles.sub}>La meta ya no es sumar temas sueltos. Es aprender a construir sistemas.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/113">
                      <span className={styles.kbd}>←</span> Dia 113
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/115">
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
