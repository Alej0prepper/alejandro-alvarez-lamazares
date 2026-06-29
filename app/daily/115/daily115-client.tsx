"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "monolith", label: "2) Monolito" },
  { id: "monolith-modular", label: "3) Monolito modular" },
  { id: "microservices", label: "4) Microservicios" },
  { id: "compare", label: "5) Comparacion" },
  { id: "mistakes", label: "6) Errores" },
  { id: "orderflow", label: "7) OrderFlow" },
  { id: "exercise", label: "8) Ejercicio" },
  { id: "closing", label: "9) Cierre" },
] as const;

const ideaSnippet = `¿Monolito o Microservicios?

La pregunta correcta no es cual es mejor.
La pregunta correcta es cual resuelve mejor el contexto.`;

const monolithSnippet = `OrderFlow.API

Products
Orders
Payments
Audit
Users

Una sola aplicacion
Un solo despliegue`;

const monolithProsSnippet = `Simplicidad
Desarrollo rapido
Debug sencillo
Transacciones faciles`;

const monolithModularSnippet = `OrderFlow.API

Products
Orders
Payments
Audit
Users

Mismo proceso
Mejor separacion interna`;

const modularProsSnippet = `Sigue siendo simple
Mejor mantenibilidad
Mejor orden
Camino natural hacia crecer`;

const microservicesSnippet = `Product Service
Order Service
Payment Service
Identity Service
Notification Service`;

const microservicesProsSnippet = `Despliegue independiente
Escalado independiente
Equipos distintos
Tecnologias distintas`;

const microservicesConsSnippet = `API Gateway
Observabilidad
Trazas distribuidas
Mensajeria
Service Discovery
Latency
Timeouts
Fallas de red
Consistencia eventual`;

const compareSnippet = `Monolito
Un despliegue
Simple
Escala completo
Debug sencillo

Monolito modular
Un despliegue
Simple
Escala completo
Mejor orden

Microservicios
Muchos despliegues
Complejo
Escala individual
Mas coste operativo`;

const orderflowSnippet = `Hoy para OrderFlow:

Monolito modular

Products
Orders
Payments
Audit
Identity`;

const exerciseSnippet = `Proyecto personal

Sistema empresarial con 15 devs

Marketplace mundial

Que eliges y por que?`;

const closingSnippet = `La arquitectura correcta no es la mas moderna.
Es la que permite entregar valor con el menor coste posible
y con capacidad real de evolucion.`;

export default function Daily115Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/114";
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
              <div className={styles.brandSub}>Arquitectura correcta, no popular</div>
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
            <Link className={styles.btn} href="/daily/114">
              <span className={styles.kbd}>←</span> Dia 114
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/116">
              Siguiente clase <span className={styles.kbd}>→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>29/06/2026</div>
                <div className={styles.badge}>
                  Daily #115 • Arquitectura de sistemas
                </div>
                <h2 className={styles.title}>
                  Monolito vs Monolito Modular vs Microservicios: elegir la arquitectura correcta, no la más popular
                </h2>
                <p className={styles.lead}>
                  La arquitectura no se elige por moda. Se elige por el tamaño del equipo, la complejidad del dominio,
                  el ritmo de cambio y el coste operativo que el negocio puede asumir.
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
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No existe una arquitectura universalmente mejor.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <div className={styles.callout}>La mejor arquitectura es la adecuada para el problema que tienes enfrente.</div>
                </div>
              </section>

              <section className={styles.section} id="monolith">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es un monolito</h3>
                    <p className={styles.sub}>Una sola aplicacion desplegable que contiene toda la logica de negocio.</p>
                  </div>
                  <span className={styles.chip}>Monolito</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{monolithSnippet}</pre>
                  <pre>{monolithProsSnippet}</pre>
                  <div className={styles.quote}>El problema no es ser monolito. El problema es ser un monolito mal diseñado.</div>
                </div>
              </section>

              <section className={styles.section} id="monolith-modular">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Monolito modular</h3>
                    <p className={styles.sub}>Una sola aplicacion, pero internamente separada por modulos claros.</p>
                  </div>
                  <span className={styles.chip}>Modular</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{monolithModularSnippet}</pre>
                  <pre>{modularProsSnippet}</pre>
                  <div className={styles.callout}>Parece un microservicio por dentro, pero sigue siendo un solo proceso.</div>
                </div>
              </section>

              <section className={styles.section} id="microservices">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Microservicios</h3>
                    <p className={styles.sub}>Servicios pequenos, independientes y desplegables por separado.</p>
                  </div>
                  <span className={styles.chip}>Servicios</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{microservicesSnippet}</pre>
                  <pre>{microservicesProsSnippet}</pre>
                  <pre>{microservicesConsSnippet}</pre>
                  <div className={styles.quote}>Resuelven sobre todo problemas de escala organizacional, no solo tecnica.</div>
                </div>
              </section>

              <section className={styles.section} id="compare">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Comparacion rapida</h3>
                    <p className={styles.sub}>Antes de decidir, mira coste, complejidad y capacidad de evolucion.</p>
                  </div>
                  <span className={styles.chip}>Comparar</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{compareSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Errores tipicos</h3>
                    <p className={styles.sub}>Los extremos suelen romperse por razones muy simples.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Equipo pequeno creando demasiados microservicios.</li>
                    <li>Empresa grande manteniendo un monolito gigantesco sin orden interno.</li>
                    <li>Elegir por moda en lugar de contexto.</li>
                  </ul>
                  <div className={styles.callout}>
                    El coste real aparece cuando la arquitectura no se corresponde con el problema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que elegir para OrderFlow</h3>
                    <p className={styles.sub}>Con el tamaño actual, la mejor opcion es monolito modular.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <div className={styles.quote}>Diseña pensando en evolucion futura, no en complejidad innecesaria desde el dia uno.</div>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Mini ejercicio</h3>
                    <p className={styles.sub}>La mejor forma de fijar criterio es justificar una decision con contexto.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Proyecto personal.</li>
                    <li>Sistema empresarial con varios desarrolladores.</li>
                    <li>Marketplace mundial.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Cierre</h3>
                    <p className={styles.sub}>La pregunta correcta no es cual es la mas moderna, sino cual encaja mejor.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/114">
                      <span className={styles.kbd}>←</span> Dia 114
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/116">
                      Siguiente <span className={styles.kbd}>→</span>
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
