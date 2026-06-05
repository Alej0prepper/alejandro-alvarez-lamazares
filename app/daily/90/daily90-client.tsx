"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "system", label: "2) Sistema" },
  { id: "critical", label: "3) Critico" },
  { id: "redis", label: "4) Redis" },
  { id: "payment", label: "5) Payment" },
  { id: "deploy", label: "6) Deploy" },
  { id: "db", label: "7) DB" },
  { id: "migrations", label: "8) Migraciones" },
  { id: "business", label: "9) Negocio" },
  { id: "spof", label: "10) SPOF" },
  { id: "health", label: "11) Salud" },
  { id: "shutdown", label: "12) Shutdown" },
  { id: "protection", label: "13) Proteccion" },
  { id: "mental", label: "14) Mentalidad" },
  { id: "map", label: "15) Mapa" },
  { id: "next", label: "16) Siguiente" },
  { id: "final-project", label: "Proyecto final" },
] as const;

const ecommerceSnippet = `un e-commerce`;

const juniorFocusSnippet = `controllers
services
repositorios`;

const seniorFocusSnippet = `negocio
usuarios
riesgo
fallos
operacion`;

const systemSnippet = `API
Redis
PostgreSQL
RabbitMQ
Payment Service
Email Service`;

const usersSnippet = `100.000 usuarios`;

const trafficSnippet = `miles de requests/minuto`;

const checkoutSnippet = `POST /checkout`;

const revenueSnippet = `ingresos`;

const criticalPathSnippet = `critical paths`;

const yesSnippet = `si`;

const degradedModeSnippet = `modo degradado`;

const waitSnippet = `esperar`;

const willHappenSnippet = `algun dia ocurrira`;

const fridayDeploySnippet = `deploy viernes`;

const detectBeforeCollapseSnippet = `como detectaremos esto antes del colapso?`;

const rollbackQuestionSnippet = `podemos volver atras?`;

const noSnippet = `no`;

const newCheckoutSnippet = `nuevo checkout`;

const salesDropSnippet = `ventas bajan 30%`;

const spofQuestionSnippet = `Que componente puede tumbar todo?`;

const okSnippet = `200 OK`;

const deepHealthSnippet = `DB OK
Redis OK
Queues OK`;

const deploySnippet = `deploy`;

const restartsSnippet = `reinicios`;

const activeRequestsSnippet = `que pasa con las requests activas?`;

const juniorQuestionSnippet = `funciona?`;

const seniorQuestionsSnippet = `funciona bajo carga?
funciona durante un deploy?
funciona cuando Redis cae?
funciona cuando Payment falla?
funciona con 100.000 usuarios?`;

export default function Daily90Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/89";
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
              <div className={styles.brandSub}>1 leccion al dia • aprendizaje visible • criterio real</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/rest-lite">
              REST Lite
            </Link>
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/89">
              <span className={styles.kbd}>←</span> Dia 89
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="#idea">
              Empezar
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>05/06/2026</div>
                <div className={styles.badge}>Daily #90 • Backend Production</div>
                <h2 className={styles.title}>Simulacion completa: backend en produccion</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>30 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Produccion</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Cierre</span>
                </div>

                <p className={styles.lead}>
                  Cierre del bloque: unir performance, seguridad, resiliencia, deploys y observabilidad para pensar
                  como alguien responsable de un sistema real.
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
                    <p className={styles.sub}>Hoy no aprendes un concepto nuevo. Aprendes a unirlos.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <p>Durante los ultimos 40 dias viste performance, escalabilidad, seguridad, resiliencia, produccion, deployments y observabilidad.</p>
                  <p>Supón que eres responsable de:</p>
                  <pre>{ecommerceSnippet}</pre>
                  <h4>Junior normalmente piensa</h4>
                  <pre>{juniorFocusSnippet}</pre>
                  <h4>Senior piensa</h4>
                  <pre>{seniorFocusSnippet}</pre>
                  <div className={styles.callout}>Ese cambio mental es enorme.</div>
                </div>
              </section>

              <section className={styles.section} id="system">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El sistema</h3>
                    <p className={styles.sub}>Un e-commerce real con dependencias reales.</p>
                  </div>
                  <span className={styles.chip}>Sistema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{systemSnippet}</pre>
                  <p>Usuarios reales:</p>
                  <pre>{usersSnippet}</pre>
                  <p>Trafico:</p>
                  <pre>{trafficSnippet}</pre>
                  <p>Ahora empiezan las preguntas importantes.</p>
                </div>
              </section>

              <section className={styles.section} id="critical">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Endpoint mas critico</h3>
                    <p className={styles.sub}>No todo tiene la misma importancia.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Critical path</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <p>Porque impacta:</p>
                  <pre>{revenueSnippet}</pre>
                  <p>Backend senior siempre identifica:</p>
                  <pre>{criticalPathSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="redis">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Si Redis desaparece</h3>
                    <p className={styles.sub}>Diseñar para fallos empieza con preguntas incomodas.</p>
                  </div>
                  <span className={styles.chip}>Redis</span>
                </div>
                <div className={styles.sbd}>
                  <p>Se cae todo?</p>
                  <p>Si la respuesta es:</p>
                  <pre>{yesSnippet}</pre>
                  <p>tienes un problema arquitectonico.</p>
                  <h4>Mejor escenario</h4>
                  <pre>{degradedModeSnippet}</pre>
                  <p>Sistema mas lento, pero sigue funcionando.</p>
                </div>
              </section>

              <section className={styles.section} id="payment">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Si Payment Service tarda 30 segundos</h3>
                    <p className={styles.sub}>No esperas eternamente. Proteges el sistema.</p>
                  </div>
                  <span className={styles.chip}>Payment</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{waitSnippet}</pre>
                  <h4>Backend senior piensa</h4>
                  <ul className={styles.bullets}>
                    <li>timeout</li>
                    <li>retry</li>
                    <li>circuit breaker</li>
                    <li>alertas</li>
                  </ul>
                  <p>Porque ya sabe que:</p>
                  <pre>{willHappenSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="deploy">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que pasa durante un deploy</h3>
                    <p className={styles.sub}>Desplegar es introducir riesgo.</p>
                  </div>
                  <span className={styles.chip}>Deploy</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fridayDeploySnippet}</pre>
                  <p>Preguntas importantes:</p>
                  <ul className={styles.bullets}>
                    <li>hay rollback?</li>
                    <li>hay feature flags?</li>
                    <li>hay health checks?</li>
                    <li>hay smoke tests?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="db">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Si la DB se satura</h3>
                    <p className={styles.sub}>La pregunta senior es como detectarlo antes del colapso.</p>
                  </div>
                  <span className={styles.chip}>DB</span>
                </div>
                <div className={styles.sbd}>
                  <p>Senales tempranas:</p>
                  <ul className={styles.bullets}>
                    <li>latencia sube</li>
                    <li>pool de conexiones sube</li>
                    <li>timeouts suben</li>
                    <li>CPU sube</li>
                  </ul>
                  <pre>{detectBeforeCollapseSnippet}</pre>
                  <p>Ahi aparecen dashboards, metricas y alertas.</p>
                </div>
              </section>

              <section className={styles.section} id="migrations">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Migraciones</h3>
                    <p className={styles.sub}>Los datos son el activo mas valioso.</p>
                  </div>
                  <span className={styles.chip}>Datos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rollbackQuestionSnippet}</pre>
                  <p>Si la respuesta es:</p>
                  <pre>{noSnippet}</pre>
                  <p>la migracion es peligrosa.</p>
                </div>
              </section>

              <section className={styles.section} id="business">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Si una funcionalidad rompe ventas</h3>
                    <p className={styles.sub}>El negocio importa mas que el codigo.</p>
                  </div>
                  <span className={styles.chip}>Negocio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{newCheckoutSnippet}</pre>
                  <p>Todo funciona tecnicamente, pero:</p>
                  <pre>{salesDropSnippet}</pre>
                  <p>Backend senior observa metricas tecnicas y metricas de negocio.</p>
                </div>
              </section>

              <section className={styles.section} id="spof">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Single Point of Failure</h3>
                    <p className={styles.sub}>Si existe, debes conocerlo.</p>
                  </div>
                  <span className={styles.chip}>SPOF</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{spofQuestionSnippet}</pre>
                  <p>Puede ser DB, Redis, API externa o DNS. Algun dia fallara.</p>
                </div>
              </section>

              <section className={styles.section} id="health">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como sabemos que estamos sanos</h3>
                    <p className={styles.sub}>Sistema vivo no equivale a sistema sano.</p>
                  </div>
                  <span className={styles.chip}>Health</span>
                </div>
                <div className={styles.sbd}>
                  <p>No basta:</p>
                  <pre>{okSnippet}</pre>
                  <p>Hay que saber:</p>
                  <pre>{deepHealthSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="shutdown">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como apagamos el sistema</h3>
                    <p className={styles.sub}>Deploys y reinicios ocurren constantemente.</p>
                  </div>
                  <span className={styles.chip}>Shutdown</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deploySnippet}</pre>
                  <pre>{restartsSnippet}</pre>
                  <p>Backend senior piensa:</p>
                  <pre>{activeRequestsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="protection">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como protegemos produccion</h3>
                    <p className={styles.sub}>Todas estas herramientas trabajan juntas.</p>
                  </div>
                  <span className={styles.chip}>Proteccion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Feature Flags</li>
                    <li>Canary</li>
                    <li>Blue/Green</li>
                    <li>Rollback</li>
                    <li>Health Checks</li>
                    <li>Observabilidad</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mental">
                <div className={styles.shd}>
                  <div>
                    <h3>14. La gran diferencia mental</h3>
                    <p className={styles.sub}>La pregunta deja de ser simplemente si funciona.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorQuestionSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorQuestionsSnippet}</pre>
                  <div className={styles.callout}>Esa es la verdadera evolucion.</div>
                </div>
              </section>

              <section className={styles.section} id="map">
                <div className={styles.shd}>
                  <div>
                    <h3>15. El mapa completo que construiste</h3>
                    <p className={styles.sub}>Una vision bastante completa del backend moderno.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Mapa</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Fundamentos</h4>
                  <ul className={styles.bullets}>
                    <li>DTOs, contratos, controllers y servicios</li>
                  </ul>
                  <h4>Datos</h4>
                  <ul className={styles.bullets}>
                    <li>repositorios, Unit of Work, CQRS y consistencia eventual</li>
                  </ul>
                  <h4>Dominio</h4>
                  <ul className={styles.bullets}>
                    <li>entidades, Value Objects, Aggregates y Domain Services</li>
                  </ul>
                  <h4>Escalabilidad</h4>
                  <ul className={styles.bullets}>
                    <li>cache, colas, eventos y backpressure</li>
                  </ul>
                  <h4>Seguridad</h4>
                  <ul className={styles.bullets}>
                    <li>Auth, AuthZ, IDOR, SQL Injection, secretos y rate limiting</li>
                  </ul>
                  <h4>Produccion</h4>
                  <ul className={styles.bullets}>
                    <li>Circuit Breakers, Health Checks, Graceful Shutdown, Feature Flags, Deployments, Migraciones, Canary y Blue/Green</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="next">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Que falta despues de aqui</h3>
                    <p className={styles.sub}>Ahora conviene profundizar por areas.</p>
                  </div>
                  <span className={styles.chip}>Siguiente</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Arquitectura</h4>
                  <ul className={styles.bullets}>
                    <li>Microservicios</li>
                    <li>Modular Monolith</li>
                    <li>Event Driven Architecture</li>
                  </ul>
                  <h4>Infraestructura</h4>
                  <ul className={styles.bullets}>
                    <li>Docker</li>
                    <li>Kubernetes</li>
                    <li>Networking</li>
                  </ul>
                  <h4>Observabilidad avanzada</h4>
                  <ul className={styles.bullets}>
                    <li>OpenTelemetry</li>
                    <li>Distributed Tracing</li>
                    <li>SLOs y SLIs</li>
                  </ul>
                  <h4>Bases de datos avanzadas</h4>
                  <ul className={styles.bullets}>
                    <li>particionamiento</li>
                    <li>replicacion</li>
                    <li>sharding</li>
                  </ul>
                  <h4>Cloud</h4>
                  <ul className={styles.bullets}>
                    <li>AWS</li>
                    <li>Azure</li>
                    <li>GCP</li>
                  </ul>
                  <div className={styles.quote}>
                    Un backend profesional no se mide por la cantidad de endpoints que tiene. Se mide por como se
                    comporta cuando las cosas salen mal.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="final-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Proyecto final (30 min)</h3>
                    <p className={styles.sub}>Responder como responsable de un sistema real.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Final</span>
                </div>
                <div className={styles.sbd}>
                  <ol className={styles.bullets}>
                    <li>Cual es el endpoint mas critico?</li>
                    <li>Cual es el Single Point of Failure?</li>
                    <li>Que ocurre si Redis desaparece?</li>
                    <li>Que ocurre si la DB se degrada?</li>
                    <li>Que ocurre si falla una API externa?</li>
                    <li>Como harias rollback de un deploy?</li>
                    <li>Tienes health checks?</li>
                    <li>Tienes observabilidad?</li>
                    <li>Puedes desplegar sin downtime?</li>
                    <li>Como detectarias saturacion antes del colapso?</li>
                  </ol>

                  <div className={styles.quote}>
                    Backend junior construye funcionalidades. Backend senior construye sistemas que siguen funcionando
                    cuando el trafico aumenta, las dependencias fallan, los despliegues salen mal y los usuarios siguen
                    esperando resultados.
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
