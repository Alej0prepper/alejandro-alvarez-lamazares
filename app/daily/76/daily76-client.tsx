"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "pillars", label: "4) Pilares" },
  { id: "metrics", label: "5) Metricas" },
  { id: "example", label: "6) Ejemplo" },
  { id: "tracing", label: "7) Tracing" },
  { id: "dotnet", label: "8) .NET" },
  { id: "profiling", label: "9) Profiling" },
  { id: "classic", label: "10) Caso clasico" },
  { id: "rule", label: "11) Regla senior" },
  { id: "tools", label: "12) Herramientas" },
  { id: "mini-project", label: "Practica" },
] as const;

const behaviorSnippet = `entender el comportamiento completo del sistema`;

const vagueProblemSnippet = `"la API esta lenta"`;

const juniorSnippet = `"algo va lento"`;

const seniorSnippet = `que endpoint
que query
que dependencia
que metrica
que patron`;

const logExampleSnippet = `usuario creo orden`;

const metricsExampleSnippet = `latencia promedio
CPU
requests/segundo`;

const tracingExampleSnippet = `API -> Service -> DB -> External API`;

const latencySnippet = `cuanto tarda una request`;

const throughputSnippet = `requests por segundo`;

const errorRateSnippet = `cuantos errores ocurren`;

const slowEndpointSnippet = `GET /orders`;

const eightSecondsSnippet = `8 segundos`;

const dbTimeSnippet = `DB query = 7.5 segundos`;

const distributedFlowSnippet = `API -> Payments -> Notifications -> Analytics`;

const paymentsSlowSnippet = `payments tardo 4 segundos`;

const loggingSnippet = `_logger.LogInformation("Order created");`;

const metricsToolsSnippet = `OpenTelemetry
Prometheus
Application Insights`;

const tracingToolsSnippet = `OpenTelemetry tracing
Jaeger
Zipkin`;

const profilingSnippet = `que consume recursos realmente`;

const dbAssumptionSnippet = `"la DB esta lenta"`;

const serializationFindingSnippet = `JSON serialization enorme`;

const intuitionSnippet = `"creo que esto es lento"`;

const measuredSnippet = `"las metricas muestran esto"`;

const healthQuestionSnippet = `como sabremos cuando deje de funcionar bien?`;

const reportsEndpointSnippet = `GET /reports`;

const userComplaintSnippet = `"la API esta lenta"`;

const whatToMeasureSnippet = `latencia
DB time
CPU
RAM
timeouts`;

const dependencySnippet = `API
DB
Redis
External API`;

const guessingSnippet = `sin observabilidad, solo estas adivinando`;

export default function Daily76Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/75";
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
            <Link className={styles.btn} href="/daily/75">
              <span className={styles.kbd}>←</span> Dia 75
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
                <div className={styles.createdAt}>22/05/2026</div>
                <div className={styles.badge}>Daily #76 • Backend Performance</div>
                <h2 className={styles.title}>Observabilidad y profiling</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Observabilidad</span>
                  <span className={styles.chip}>Tag: Profiling</span>
                  <span className={styles.chip}>Tag: Tracing</span>
                  <span className={styles.chip}>Tag: Performance</span>
                </div>

                <p className={styles.lead}>
                  Cuando un sistema se vuelve lento o falla, la pregunta importante no es si hay logs. La pregunta es
                  si puedes entender donde esta el problema realmente.
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
                    <p className={styles.sub}>Tener logs no significa entender el sistema.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Cuando algo se vuelve lento o falla, aparece la pregunta mas importante:</p>
                  <div className={styles.quote}>Donde esta el problema realmente?</div>
                  <p>Una cosa es tener logs. Otra muy distinta es:</p>
                  <pre>{behaviorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Observabilidad explica comportamiento; profiling explica consumo.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Observabilidad</h4>
                  <p>Capacidad de entender que ocurre dentro del sistema usando logs, metricas y trazas.</p>

                  <h4>Profiling</h4>
                  <p>Analizar que consume CPU, RAM, tiempo, queries o threads.</p>

                  <div className={styles.callout}>No puedes optimizar lo que no puedes observar.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Decir que la API esta lenta sin saber que parte falla.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{vagueProblemSnippet}</pre>
                  <p>Eso no responde:</p>
                  <ul className={styles.bullets}>
                    <li>que endpoint</li>
                    <li>que query</li>
                    <li>que dependencia</li>
                    <li>que recurso</li>
                  </ul>

                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>

                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="pillars">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Los 3 pilares de observabilidad</h3>
                    <p className={styles.sub}>Logs, metricas y trazas explican partes diferentes del sistema.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Logs</h4>
                  <p>Eventos discretos.</p>
                  <pre>{logExampleSnippet}</pre>

                  <h4>Metricas</h4>
                  <p>Numeros agregados.</p>
                  <pre>{metricsExampleSnippet}</pre>

                  <h4>Trazas</h4>
                  <p>Camino completo de una request.</p>
                  <pre>{tracingExampleSnippet}</pre>

                  <div className={styles.callout}>
                    Logs dicen que paso. Metricas dicen cuanto pasa. Tracing dice donde pasa.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="metrics">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Metricas importantes</h3>
                    <p className={styles.sub}>Las metricas convierten sintomas en datos concretos.</p>
                  </div>
                  <span className={styles.chip}>Metricas</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Latencia</h4>
                  <pre>{latencySnippet}</pre>

                  <h4>Throughput</h4>
                  <pre>{throughputSnippet}</pre>

                  <h4>Error rate</h4>
                  <pre>{errorRateSnippet}</pre>

                  <h4>Tambien debes mirar</h4>
                  <ul className={styles.bullets}>
                    <li>CPU</li>
                    <li>RAM</li>
                    <li>DB query time</li>
                    <li>queue length</li>
                    <li>timeouts</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Ejemplo real</h3>
                    <p className={styles.sub}>Observabilidad reduce incertidumbre.</p>
                  </div>
                  <span className={styles.chip}>Diagnostico</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supón:</p>
                  <pre>{slowEndpointSnippet}</pre>
                  <p>Empieza a tardar:</p>
                  <pre>{eightSecondsSnippet}</pre>

                  <h4>Sin observabilidad</h4>
                  <p>Adivinas.</p>

                  <h4>Con observabilidad</h4>
                  <pre>{dbTimeSnippet}</pre>
                  <p>Problema localizado.</p>

                  <div className={styles.callout}>Observabilidad reduce incertidumbre.</div>
                </div>
              </section>

              <section className={styles.section} id="tracing">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Tracing distribuido</h3>
                    <p className={styles.sub}>En sistemas modernos, una request cruza multiples dependencias.</p>
                  </div>
                  <span className={styles.chip}>Tracing</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{distributedFlowSnippet}</pre>
                  <p>La pregunta es: donde se rompe?</p>
                  <p>Distributed tracing responde:</p>
                  <pre>{paymentsSlowSnippet}</pre>

                  <div className={styles.callout}>
                    Sistemas distribuidos sin tracing son casi imposibles de diagnosticar.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como se ve en .NET</h3>
                    <p className={styles.sub}>Logging, metricas y tracing tienen herramientas concretas.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Logging</h4>
                  <pre>{loggingSnippet}</pre>

                  <h4>Metricas</h4>
                  <pre>{metricsToolsSnippet}</pre>

                  <h4>Tracing</h4>
                  <pre>{tracingToolsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="profiling">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Profiling</h3>
                    <p className={styles.sub}>Profiling muestra que consume recursos realmente.</p>
                  </div>
                  <span className={styles.chip}>Profiling</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{profilingSnippet}</pre>
                  <p>Ejemplos:</p>
                  <ul className={styles.bullets}>
                    <li>metodo lento</li>
                    <li>query lenta</li>
                    <li>fuga de memoria</li>
                    <li>serializacion enorme</li>
                    <li>bloqueo de threads</li>
                  </ul>
                  <div className={styles.callout}>Muchas veces el problema no esta donde creias.</div>
                </div>
              </section>

              <section className={styles.section} id="classic">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Ejemplo clasico</h3>
                    <p className={styles.sub}>Profiling puede contradecir la intuicion del equipo.</p>
                  </div>
                  <span className={styles.chip}>Caso</span>
                </div>
                <div className={styles.sbd}>
                  <p>Equipo piensa:</p>
                  <pre>{dbAssumptionSnippet}</pre>
                  <p>Profiling revela:</p>
                  <pre>{serializationFindingSnippet}</pre>
                  <p>El problema era completamente distinto.</p>
                </div>
              </section>

              <section className={styles.section} id="rule">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Regla senior</h3>
                    <p className={styles.sub}>Optimizar sin medir es peligroso.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{intuitionSnippet}</pre>

                  <h4>Backend senior</h4>
                  <pre>{measuredSnippet}</pre>

                  <div className={styles.callout}>Nunca optimices basandote en intuicion solamente.</div>

                  <h4>Pregunta senior real</h4>
                  <pre>{healthQuestionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="tools">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Herramientas comunes</h3>
                    <p className={styles.sub}>No necesitas dominarlas ahora, pero debes conocerlas.</p>
                  </div>
                  <span className={styles.chip}>Stack</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Logs</h4>
                  <ul className={styles.bullets}>
                    <li>Serilog</li>
                    <li>Seq</li>
                    <li>ELK</li>
                  </ul>

                  <h4>Metricas</h4>
                  <ul className={styles.bullets}>
                    <li>Prometheus</li>
                    <li>Grafana</li>
                    <li>Datadog</li>
                  </ul>

                  <h4>Tracing</h4>
                  <ul className={styles.bullets}>
                    <li>OpenTelemetry</li>
                    <li>Jaeger</li>
                    <li>Zipkin</li>
                  </ul>

                  <h4>Profiling</h4>
                  <ul className={styles.bullets}>
                    <li>dotTrace</li>
                    <li>PerfView</li>
                    <li>Visual Studio Profiler</li>
                  </ul>

                  <div className={styles.quote}>
                    Observabilidad no es tener logs. Es entender el comportamiento real del sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Pensar como alguien que diagnostica sistemas reales.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{reportsEndpointSnippet}</pre>
                  <p>Usuarios reportan:</p>
                  <pre>{userComplaintSnippet}</pre>

                  <h4>Paso 1 - Que quieres medir?</h4>
                  <pre>{whatToMeasureSnippet}</pre>

                  <h4>Paso 2 - Piensa logs</h4>
                  <p>Que eventos registrarias para entender el comportamiento?</p>

                  <h4>Paso 3 - Piensa tracing</h4>
                  <p>Que dependencias participan en la request?</p>
                  <pre>{dependencySnippet}</pre>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{guessingSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>medir cambia completamente el diagnostico</li>
                    <li>tracing es critico en sistemas distribuidos</li>
                    <li>profiling encuentra problemas reales</li>
                    <li>optimizar sin metricas es peligroso</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Tu sistema tiene metricas reales?</li>
                    <li>Podrias detectar un endpoint lento rapidamente?</li>
                    <li>Podrias seguir una request entre servicios?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior intenta arreglar problemas. Backend senior primero observa, mide y entiende el
                    sistema.
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
