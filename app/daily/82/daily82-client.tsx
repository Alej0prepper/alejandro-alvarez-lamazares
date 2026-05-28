"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "example", label: "3) Ejemplo" },
  { id: "states", label: "4) Estados" },
  { id: "usage", label: "5) Uso real" },
  { id: "dotnet", label: "6) .NET" },
  { id: "depth", label: "7) Profundidad" },
  { id: "probes", label: "8) Liveness vs Readiness" },
  { id: "mistakes", label: "9) Errores comunes" },
  { id: "senior", label: "10) Mentalidad senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const aliveSnippet = "\"este levantada\"";
const healthyQuestionSnippet = "\"realmente esta saludable?\"";
const statusSnippet = "estoy sano\nestoy degradado\nestoy roto";
const apiOnlineSnippet = "API Online";
const dbDownSnippet = "DB caida";
const unhealthySnippet = "Unhealthy";
const analyticsDownSnippet = "analytics caido";
const healthEndpointSnippet = "/health";
const addHealthChecksSnippet = `builder.Services.AddHealthChecks()\n    .AddSqlServer(connectionString)\n    .AddRedis(redisConnectionString);`;
const mapHealthChecksSnippet = 'app.MapHealthChecks("/health");';
const healthyJsonSnippet = `{
  "status": "Healthy"
}`;
const unhealthyJsonSnippet = `{
  "status": "Unhealthy"
}`;
const superficialSnippet = '"la app arranco"';
const deepSnippet = "DB responde\nRedis responde\nqueues sanas";
const livenessSnippet = "\"el proceso sigue vivo?\"";
const readinessSnippet = "\"esta listo para recibir trafico?\"";
const expensiveSnippet = "queries enormes\nllamadas lentas";
const loadByHealthSnippet = "health check causando carga";
const degradedSnippet = "Degraded";
const ecommerceSnippet = "API de e-commerce";
const degradedExampleSnippet = "Degraded";
const unhealthyExampleSnippet = "Unhealthy";
const seniorQuestionSnippet = "como sabremos automaticamente que el sistema empezo a degradarse?";
const ordersApiSnippet = "API de pedidos";
const keyIdeaSnippet = "un sistema vivo no siempre es un sistema sano";

export default function Daily82Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/81";
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
            <Link className={styles.btn} href="/daily/81">
              <span className={styles.kbd}>←</span> Dia 81
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
                <div className={styles.createdAt}>27/05/2026</div>
                <div className={styles.badge}>Daily #82 • Backend Resilience</div>
                <h2 className={styles.title}>Health Checks</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Observabilidad</span>
                  <span className={styles.chip}>Tag: Kubernetes</span>
                  <span className={styles.chip}>Tag: Health Checks</span>
                </div>

                <p className={styles.lead}>
                  Un backend moderno no solo debe vivir: debe poder reportar automaticamente si esta sano, degradado o
                  roto para que la plataforma tome decisiones.
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
                    <p className={styles.sub}>Disponibilidad no es lo mismo que salud real.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>En produccion no basta con que la API este arriba:</p>
                  <pre>{aliveSnippet}</pre>
                  <p>La pregunta correcta es:</p>
                  <pre>{healthyQuestionSnippet}</pre>
                  <p>Puede responder HTTP pero tener DB caida, Redis roto o queues saturadas.</p>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Health Check informa salud del sistema y dependencias.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Health Check es un endpoint o mecanismo que informa el estado de salud del sistema y de sus
                    dependencias criticas.
                  </p>
                  <p>Traduccion simple:</p>
                  <pre>{statusSnippet}</pre>
                  <div className={styles.callout}>
                    Sirve para detectar problemas automaticamente antes del colapso total.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>API online con DB caida no esta sana.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{apiOnlineSnippet}</pre>
                  <pre>{dbDownSnippet}</pre>
                  <p>Resultado esperado del health check:</p>
                  <pre>{unhealthySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="states">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Estados comunes</h3>
                    <p className={styles.sub}>Healthy, Degraded y Unhealthy deben estar definidos por arquitectura.</p>
                  </div>
                  <span className={styles.chip}>Estados</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Healthy: sistema sano.</li>
                    <li>Degraded: funciona parcialmente.</li>
                    <li>Unhealthy: no deberia recibir trafico.</li>
                  </ul>
                  <p>Ejemplo degradado:</p>
                  <pre>{analyticsDownSnippet}</pre>
                  <p>Checkout sigue operando, pero reportas degradacion.</p>
                </div>
              </section>

              <section className={styles.section} id="usage">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se usa realmente</h3>
                    <p className={styles.sub}>No es solo para humanos: lo consume la plataforma.</p>
                  </div>
                  <span className={styles.chip}>Operacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Los health checks los usan Kubernetes, Docker, load balancers y monitoreo.</p>
                  <p>Endpoint tipico:</p>
                  <pre>{healthEndpointSnippet}</pre>
                  <p>Si responde unhealthy, el balanceador deja de enrutar trafico a esa instancia.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como se ve en .NET</h3>
                    <p className={styles.sub}>Registro de checks y endpoint dedicado.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Configuracion</h4>
                  <pre>{addHealthChecksSnippet}</pre>
                  <h4>Endpoint</h4>
                  <pre>{mapHealthChecksSnippet}</pre>
                  <h4>Respuestas posibles</h4>
                  <pre>{healthyJsonSnippet}</pre>
                  <pre>{unhealthyJsonSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="depth">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Checks profundos vs superficiales</h3>
                    <p className={styles.sub}>Un check inutil da falsa seguridad.</p>
                  </div>
                  <span className={styles.chip}>Calidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Superficial</h4>
                  <pre>{superficialSnippet}</pre>
                  <h4>Profundo</h4>
                  <pre>{deepSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="probes">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Liveness vs Readiness</h3>
                    <p className={styles.sub}>Una app puede estar viva pero no lista.</p>
                  </div>
                  <span className={styles.chip}>Kubernetes</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Liveness Probe</h4>
                  <pre>{livenessSnippet}</pre>
                  <h4>Readiness Probe</h4>
                  <pre>{readinessSnippet}</pre>
                  <p>Durante startup puede vivir, pero aun no deberia recibir requests.</p>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Errores tipicos</h3>
                    <p className={styles.sub}>Checks costosos o mal clasificados rompen operacion.</p>
                  </div>
                  <span className={styles.chip}>Antipatrones</span>
                </div>
                <div className={styles.sbd}>
                  <p>No hagas checks muy costosos:</p>
                  <pre>{expensiveSnippet}</pre>
                  <p>Resultado comun:</p>
                  <pre>{loadByHealthSnippet}</pre>
                  <p>Tambien evita que analytics caido tumbe checkout: usa estado:</p>
                  <pre>{degradedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como piensa alguien senior</h3>
                    <p className={styles.sub}>Define criticidad por capacidad de negocio, no por capricho tecnico.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ecommerceSnippet}</pre>
                  <p>Dependencias: DB, Redis, payment-service, analytics.</p>
                  <p>Si cae analytics:</p>
                  <pre>{degradedExampleSnippet}</pre>
                  <p>Si cae DB:</p>
                  <pre>{unhealthyExampleSnippet}</pre>
                  <p>Pregunta clave:</p>
                  <pre>{seniorQuestionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Modela estados de salud para una API de pedidos.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Imagina:</p>
                  <pre>{ordersApiSnippet}</pre>
                  <p>Con DB, Redis, payment-service y analytics.</p>
                  <ul className={styles.bullets}>
                    <li>Clasifica cuales dependencias son criticas.</li>
                    <li>Define condiciones de Healthy, Degraded y Unhealthy.</li>
                    <li>Decide que falla debe sacar la instancia del balanceador.</li>
                  </ul>
                  <div className={styles.callout}>{keyIdeaSnippet}</div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
