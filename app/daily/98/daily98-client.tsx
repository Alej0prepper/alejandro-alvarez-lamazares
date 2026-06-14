"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "monitoring-vs-observability", label: "3) Monitoreo" },
  { id: "pillars", label: "4) Pilares" },
  { id: "logs", label: "5) Logs" },
  { id: "metrics", label: "6) Metricas" },
  { id: "traces", label: "7) Traces" },
  { id: "key-metrics", label: "8) Metricas clave" },
  { id: "error-rate", label: "9) Error rate" },
  { id: "latency", label: "10) Latencia" },
  { id: "throughput", label: "11) Throughput" },
  { id: "tools", label: "12) Herramientas" },
  { id: "dashboard", label: "13) Dashboard" },
  { id: "alerts", label: "14) Alertas" },
  { id: "degradation", label: "15) Degradacion" },
  { id: "incident", label: "16) Incidente" },
  { id: "mindset", label: "17) Mentalidad" },
  { id: "project", label: "Practica" },
] as const;

const lateWarningSnippet = `"la aplicacion esta lenta"
"no podemos vender"`;

const observabilitySnippet = `Observabilidad`;

const whyQuestionsSnippet = `Por que esta lento?
Por que falla?
Donde esta el cuello de botella?
Que cambio?`;

const monitoringQuestionSnippet = `Que esta pasando?`;

const cpuSnippet = `CPU = 95%`;

const observabilityQuestionSnippet = `Por que esta pasando?`;

const nPlusOneSnippet = `CPU alta porque un endpoint esta generando consultas N+1`;

const pillarsSnippet = `Logs
Metricas
Traces`;

const logQuestionSnippet = `Que ocurrio?`;

const orderCreatedSnippet = `Order 123 created`;

const paymentTimeoutSnippet = `Payment timeout`;

const metricQuestionSnippet = `Cuanto?`;

const metricsListSnippet = `CPU
Memoria
Requests por segundo
Latencia
Error Rate`;

const cpu87Snippet = `CPU = 87%`;

const traceSystemSnippet = `API
↓
Redis
↓
DB
↓
Payment Service`;

const threeSecondsQuestionSnippet = `donde se gastaron los 3 segundos?`;

const traceExampleSnippet = `Request
├── API: 50ms
├── Redis: 20ms
├── DB: 120ms
└── Payment API: 2800ms`;

const fiveMetricsSnippet = `Latencia
Throughput
Error Rate
CPU
Memoria`;

const errorRateQuestionSnippet = `Que porcentaje de requests falla?`;

const errorRateGoodSnippet = `0.1%`;

const errorRateBadSnippet = `12%`;

const latencyQuestionSnippet = `Cuanto tarda una request?`;

const latencyGoodSnippet = `50 ms`;

const latencyBadSnippet = `2 segundos`;

const throughputQuestionSnippet = `Cuanto trabajo procesa el sistema?`;

const throughputSnippet = `200 requests/segundo`;

const toolsSnippet = `Prometheus
Grafana
Alertmanager
OpenTelemetry
Jaeger / Tempo`;

const dashboardQuestionSnippet = `Como esta el sistema ahora mismo?`;

const dashboardSnippet = `CPU
Memoria
Pods
Latencia
Errores`;

const alertQuestionSnippet = `Cuando deberia despertarme?`;

const badAlertSnippet = `CPU 30%`;

const goodAlertSnippet = `Error Rate > 5%
Latencia > 1 segundo`;

const degradationSnippet = `50ms
100ms
250ms
500ms`;

const cpuGrowthSnippet = `40%
55%
70%
85%`;

const growingSignalsSnippet = `Memoria acercandose al limite
Colas creciendo
Retries aumentando
Timeouts aumentando`;

const incidentViewSnippet = `metricas
logs
traces`;

const juniorSnippet = `funciona?`;

const seniorSnippet = `como sabre cuando deje de funcionar?`;

const systemSnippet = `API
Redis
PostgreSQL`;

const observabilityFocusSnippet = `que esta ocurriendo`;

const reflectionSnippet = `La observabilidad no sirve para mirar graficos bonitos.
Sirve para entender sistemas complejos cuando empiezan a degradarse.`;

export default function Daily98Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/97";
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
            <Link className={styles.btn} href="/daily/97">
              <span className={styles.kbd}>←</span> Dia 97
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
                <div className={styles.createdAt}>14/06/2026</div>
                <div className={styles.badge}>Daily #98 • Observability</div>
                <h2 className={styles.title}>Observabilidad y monitoreo de cluster</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Observabilidad</span>
                  <span className={styles.chip}>Tag: Monitoreo</span>
                  <span className={styles.chip}>Tag: Traces</span>
                  <span className={styles.chip}>Tag: Alertas</span>
                </div>

                <p className={styles.lead}>
                  La observabilidad te dice por que algo esta fallando antes de que los usuarios te llamen.
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
                    <p className={styles.sub}>Un sistema puede fallar durante horas sin que nadie lo sepa.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <p>El primer aviso suele llegar como:</p>
                  <pre>{lateWarningSnippet}</pre>
                  <div className={styles.callout}>Si los usuarios descubren los problemas antes que tu, ya vas tarde.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es observabilidad</h3>
                    <p className={styles.sub}>Entender que ocurre dentro de un sistema usando la informacion que genera.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{observabilitySnippet}</pre>
                  <p>Debes poder responder:</p>
                  <pre>{whyQuestionsSnippet}</pre>
                  <div className={styles.quote}>No puedes operar correctamente algo que no puedes observar.</div>
                </div>
              </section>

              <section className={styles.section} id="monitoring-vs-observability">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Monitoreo vs observabilidad</h3>
                    <p className={styles.sub}>Monitoreo detecta; observabilidad explica.</p>
                  </div>
                  <span className={styles.chip}>Comparacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Monitoreo</h4>
                  <pre>{monitoringQuestionSnippet}</pre>
                  <pre>{cpuSnippet}</pre>
                  <h4>Observabilidad</h4>
                  <pre>{observabilityQuestionSnippet}</pre>
                  <pre>{nPlusOneSnippet}</pre>
                  <div className={styles.callout}>Observabilidad es un nivel superior.</div>
                </div>
              </section>

              <section className={styles.section} id="pillars">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Los tres pilares</h3>
                    <p className={styles.sub}>Todo gira alrededor de logs, metricas y traces.</p>
                  </div>
                  <span className={styles.chip}>Pilares</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{pillarsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="logs">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Logs</h3>
                    <p className={styles.sub}>Responden que ocurrio.</p>
                  </div>
                  <span className={styles.chip}>Logs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{logQuestionSnippet}</pre>
                  <pre>{orderCreatedSnippet}</pre>
                  <pre>{paymentTimeoutSnippet}</pre>
                  <div className={styles.callout}>Los logs son necesarios pero no suficientes.</div>
                </div>
              </section>

              <section className={styles.section} id="metrics">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Metricas</h3>
                    <p className={styles.sub}>Responden cuanto.</p>
                  </div>
                  <span className={styles.chip}>Metricas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{metricQuestionSnippet}</pre>
                  <pre>{metricsListSnippet}</pre>
                  <pre>{cpu87Snippet}</pre>
                  <div className={styles.callout}>Permiten detectar tendencias.</div>
                </div>
              </section>

              <section className={styles.section} id="traces">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Traces</h3>
                    <p className={styles.sub}>Muestran el recorrido completo de una request.</p>
                  </div>
                  <span className={styles.chip}>Traces</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{traceSystemSnippet}</pre>
                  <p>Pregunta:</p>
                  <pre>{threeSecondsQuestionSnippet}</pre>
                  <pre>{traceExampleSnippet}</pre>
                  <div className={styles.quote}>Ahora sabes donde esta el problema.</div>
                </div>
              </section>

              <section className={styles.section} id="key-metrics">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Metricas fundamentales</h3>
                    <p className={styles.sub}>Si solo miras cinco cosas, empieza por estas.</p>
                  </div>
                  <span className={styles.chip}>Basicas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fiveMetricsSnippet}</pre>
                  <div className={styles.callout}>Estas cinco metricas detectan muchisimos problemas.</div>
                </div>
              </section>

              <section className={styles.section} id="error-rate">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Error rate</h3>
                    <p className={styles.sub}>Cuanto porcentaje de requests falla.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorRateQuestionSnippet}</pre>
                  <pre>{errorRateGoodSnippet}</pre>
                  <pre>{errorRateBadSnippet}</pre>
                  <div className={styles.callout}>Muy observada en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="latency">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Latencia</h3>
                    <p className={styles.sub}>Cuanto tarda una request.</p>
                  </div>
                  <span className={styles.chip}>Latencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{latencyQuestionSnippet}</pre>
                  <pre>{latencyGoodSnippet}</pre>
                  <pre>{latencyBadSnippet}</pre>
                  <div className={styles.callout}>Muchas incidencias empiezan aqui.</div>
                </div>
              </section>

              <section className={styles.section} id="throughput">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Throughput</h3>
                    <p className={styles.sub}>Cuanto trabajo procesa el sistema.</p>
                  </div>
                  <span className={styles.chip}>Capacidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{throughputQuestionSnippet}</pre>
                  <pre>{throughputSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>capacidad</li>
                    <li>crecimiento</li>
                    <li>carga</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="tools">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Herramientas tipicas</h3>
                    <p className={styles.sub}>Stack comun en Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>Stack</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{toolsSnippet}</pre>
                  <div className={styles.callout}>Este stack aparece constantemente en Kubernetes.</div>
                </div>
              </section>

              <section className={styles.section} id="dashboard">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Dashboard</h3>
                    <p className={styles.sub}>Una sola pantalla para responder como esta el sistema ahora mismo.</p>
                  </div>
                  <span className={styles.chip}>Dashboard</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dashboardQuestionSnippet}</pre>
                  <pre>{dashboardSnippet}</pre>
                  <div className={styles.quote}>Un dashboard bien disenado vale oro durante una incidencia.</div>
                </div>
              </section>

              <section className={styles.section} id="alerts">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Alertas</h3>
                    <p className={styles.sub}>No todas las alertas merecen despertarte.</p>
                  </div>
                  <span className={styles.chip}>Alertas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{alertQuestionSnippet}</pre>
                  <pre>{badAlertSnippet}</pre>
                  <pre>{goodAlertSnippet}</pre>
                  <div className={styles.callout}>Las alertas deben indicar riesgo real.</div>
                </div>
              </section>

              <section className={styles.section} id="degradation">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Detectar degradacion</h3>
                    <p className={styles.sub}>Muchos sistemas avisan antes de romperse.</p>
                  </div>
                  <span className={styles.chip}>Señales</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>latencia creciente</li>
                    <li>CPU creciendo constantemente</li>
                    <li>memoria acercandose al limite</li>
                    <li>colas creciendo</li>
                    <li>retries aumentando</li>
                    <li>timeouts aumentando</li>
                  </ul>
                  <pre>{degradationSnippet}</pre>
                  <pre>{cpuGrowthSnippet}</pre>
                  <pre>{growingSignalsSnippet}</pre>
                  <div className={styles.quote}>Los sistemas suelen avisar antes de romperse.</div>
                </div>
              </section>

              <section className={styles.section} id="incident">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Que mira un ingeniero durante una incidencia</h3>
                    <p className={styles.sub}>Primero entiende el sistema, luego mira codigo.</p>
                  </div>
                  <span className={styles.chip}>Incidente</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{incidentViewSnippet}</pre>
                  <pre>{observabilityFocusSnippet}</pre>
                  <div className={styles.callout}>Empieza mirando metricas, logs y traces.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No solo pregunta si funciona.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Esa pregunta cambia todo.</div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Diseñar un dashboard minimo para una API.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{systemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Paso 1: que 5 metricas mostrarias?</li>
                    <li>Paso 2: que alertas configurarias?</li>
                    <li>Paso 3: como sabrias si algo va mal antes de que llamen?</li>
                  </ul>
                  <h4>Reflexion clave</h4>
                  <pre>{reflectionSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>los logs cuentan historias</li>
                    <li>las metricas detectan tendencias</li>
                    <li>los traces explican recorridos</li>
                    <li>las alertas deben indicar riesgo real</li>
                    <li>un dashboard bien hecho vale oro</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que metricas faltan en tu sistema hoy?</li>
                    <li>Que alerta te despertaria de verdad?</li>
                    <li>Podrias reconstruir un incidente con tus logs actuales?</li>
                    <li>Podrias seguir una request de punta a punta?</li>
                  </ul>
                  <div className={styles.quote}>
                    La observabilidad no sirve para mirar graficos bonitos. Sirve para entender sistemas complejos cuando
                    empiezan a degradarse.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/97">
                      ← Dia 97
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily">
                      Ver calendario
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 98 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Observabilidad:</strong> entender por que algo pasa usando lo que el sistema emite.
                </div>
                <div className={styles.li}>
                  <strong>Pilares:</strong> logs, metricas y traces.
                </div>
                <div className={styles.li}>
                  <strong>Metrica clave:</strong> latencia, throughput, error rate, CPU y memoria.
                </div>
                <div className={styles.li}>
                  <strong>Operacion:</strong> dashboards y alertas deben ayudar a detectar degradacion temprano.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
