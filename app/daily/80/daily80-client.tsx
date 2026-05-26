"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "example", label: "4) Ejemplo" },
  { id: "mindset", label: "5) Mentalidad" },
  { id: "where", label: "6) Donde aparece" },
  { id: "queue", label: "7) Queue" },
  { id: "rate-limit", label: "8) Rate limiting" },
  { id: "signals", label: "9) Senales" },
  { id: "strategies", label: "10) Estrategias" },
  { id: "real-systems", label: "11) Sistemas reales" },
  { id: "early", label: "12) Deteccion temprana" },
  { id: "professional", label: "13) Observabilidad" },
  { id: "senior", label: "14) Senior" },
  { id: "checkout", label: "15) Checkout" },
  { id: "question", label: "16) Pregunta" },
  { id: "mini-project", label: "Practica" },
] as const;

const backpressureSnippet = `Backpressure`;

const cannotProcessSnippet = `"no puedo procesar mas ahora"`;

const acceptEverythingSnippet = `"aceptemos todas las requests"`;

const capacitySnippet = `100 requests/segundo`;

const incomingSnippet = `10,000 requests/segundo`;

const juniorSnippet = `"si entra trafico, procesarlo"`;

const seniorSnippet = `como evitamos que el sistema se autodestruya?`;

const workersCapacitySnippet = `100 jobs/minuto`;

const jobsIncomingSnippet = `10,000 jobs/minuto`;

const infiniteQueueSnippet = `queue infinita
RAM creciendo
latencia enorme`;

const rateLimitSnippet = `100 req/min por usuario`;

const pressureReasonsSnippet = `DB pool lleno
queue saturada
threads agotados`;

const rejectCodesSnippet = `429
503`;

const healthySnippet = `"todo bien"`;

const deadSnippet = `"todo muerto"`;

const latencyNormalSnippet = `120ms`;

const latencyGrowingSnippet = `250ms
400ms
900ms`;

const queueGrowingSnippet = `120
300
1000
5000 jobs pendientes`;

const maxConnectionsSnippet = `100 conexiones maximas`;

const connectionUsageSnippet = `90 usadas
95 usadas
99 usadas`;

const connectionErrorsSnippet = `Timeout expired
Could not obtain connection`;

const throughputLimitSnippet = `misma capacidad
mas latencia
mas errores`;

const cpuHighSnippet = `90%-100% constante`;

const memoryExamplesSnippet = `ToList() gigantes
payloads enormes
serializacion masiva`;

const timeoutErrorsSnippet = `TaskCanceledException
TimeoutException`;

const retriesSnippet = `retry retry retry retry`;

const retryStormSnippet = `retry storm`;

const alertExamplesSnippet = `latencia > 500ms
queue > 5000
CPU > 85%`;

const juniorCollapseSnippet = `"el sistema cayo"`;

const seniorSignalsSnippet = `que senales aparecieron antes?`;

const checkoutSnippet = `POST /checkout`;

const infiniteTrafficSnippet = `"como soportamos trafico infinito"`;

const controlledFailureSnippet = `como fallamos de forma controlada
como detectamos presion antes del desastre`;

const systemCapacitySnippet = `Sistema soporta:
500 req/s`;

const systemIncomingSnippet = `20,000 req/s`;

const monitoredMetricsSnippet = `latencia
queue size
CPU
DB connections
timeouts
retries`;

const survivalSnippet = `sobrevivir > intentar procesarlo todo`;

export default function Daily80Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/79";
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
            <Link className={styles.btn} href="/daily/79">
              <span className={styles.kbd}>←</span> Dia 79
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
                <div className={styles.createdAt}>26/05/2026</div>
                <div className={styles.badge}>Daily #80 • Backend Performance</div>
                <h2 className={styles.title}>Backpressure</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Backpressure</span>
                  <span className={styles.chip}>Tag: Saturacion</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Observabilidad</span>
                </div>

                <p className={styles.lead}>
                  Backpressure es como un backend se protege cuando recibe mas trabajo del que puede soportar. Un
                  sistema sano prefiere rechazar parte del trafico antes que morir entero.
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
                    <p className={styles.sub}>Todo sistema tiene limites.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>La pregunta importante es: que pasa cuando llega mas trabajo del que el sistema puede procesar?</p>
                  <pre>{backpressureSnippet}</pre>
                  <div className={styles.callout}>
                    Un sistema sano prefiere rechazar parte del trafico antes que morir entero.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Backpressure controla entrada cuando el sistema esta saturado.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Backpressure es un mecanismo para controlar o limitar entrada de trabajo cuando el sistema esta
                    saturado.
                  </p>
                  <p>Traduccion simple:</p>
                  <pre>{cannotProcessSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Aceptar todo puede destruir el sistema completo.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{acceptEverythingSnippet}</pre>
                  <p>Hasta que:</p>
                  <ul className={styles.bullets}>
                    <li>memoria explota</li>
                    <li>threads se agotan</li>
                    <li>DB colapsa</li>
                    <li>queues crecen infinito</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo simple</h3>
                    <p className={styles.sub}>La diferencia esta entre aceptar todo o proteger capacidad.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Tu sistema procesa:</p>
                  <pre>{capacitySnippet}</pre>
                  <p>Pero recibe:</p>
                  <pre>{incomingSnippet}</pre>

                  <h4>Sin backpressure</h4>
                  <ul className={styles.bullets}>
                    <li>colas infinitas</li>
                    <li>timeouts</li>
                    <li>CPU 100%</li>
                    <li>OOM</li>
                    <li>cascada de fallos</li>
                  </ul>

                  <h4>Con backpressure</h4>
                  <ul className={styles.bullets}>
                    <li>limita trafico</li>
                    <li>rechaza requests</li>
                    <li>ralentiza consumidores</li>
                    <li>protege recursos criticos</li>
                  </ul>
                  <div className={styles.callout}>Resultado: el sistema sigue vivo.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>No todo trafico debe procesarse si eso destruye estabilidad.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>

                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="where">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Donde aparece backpressure</h3>
                    <p className={styles.sub}>En sistemas distribuidos aparece constantemente.</p>
                  </div>
                  <span className={styles.chip}>Distribuido</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>APIs HTTP</li>
                    <li>queues</li>
                    <li>streams</li>
                    <li>event processing</li>
                    <li>DB connections</li>
                    <li>thread pools</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="queue">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Ejemplo real: queue creciendo</h3>
                    <p className={styles.sub}>Si entra mas trabajo del que sale, la cola revela saturacion.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Queues</span>
                </div>
                <div className={styles.sbd}>
                  <p>Workers procesan:</p>
                  <pre>{workersCapacitySnippet}</pre>
                  <p>Pero llegan:</p>
                  <pre>{jobsIncomingSnippet}</pre>

                  <h4>Sin control</h4>
                  <pre>{infiniteQueueSnippet}</pre>

                  <h4>Con backpressure</h4>
                  <ul className={styles.bullets}>
                    <li>limita publishers</li>
                    <li>pausa productores</li>
                    <li>rechaza jobs</li>
                    <li>degrada funcionalidades</li>
                  </ul>

                  <div className={styles.callout}>
                    Backpressure protege estabilidad sacrificando capacidad momentanea.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="rate-limit">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Relacion con rate limiting</h3>
                    <p className={styles.sub}>Se parecen, pero no son lo mismo.</p>
                  </div>
                  <span className={styles.chip}>Proteccion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Rate limiting</h4>
                  <p>Protege contra abuso o trafico excesivo.</p>
                  <pre>{rateLimitSnippet}</pre>

                  <h4>Backpressure</h4>
                  <p>Protege recursos internos saturados.</p>
                  <pre>{pressureReasonsSnippet}</pre>

                  <div className={styles.quote}>Incluso trafico legitimo puede activar backpressure.</div>
                </div>
              </section>

              <section className={styles.section} id="signals">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Senales de saturacion</h3>
                    <p className={styles.sub}>El sistema suele avisar antes de colapsar.</p>
                  </div>
                  <span className={styles.chip}>Senales</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>queue creciendo sin parar</li>
                    <li>latencia aumentando</li>
                    <li>CPU alta constante</li>
                    <li>pool de conexiones agotado</li>
                    <li>memory pressure</li>
                    <li>timeouts creciendo</li>
                  </ul>
                  <div className={styles.callout}>La degradacion gradual es mejor que el colapso total.</div>
                </div>
              </section>

              <section className={styles.section} id="strategies">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Estrategias comunes</h3>
                    <p className={styles.sub}>Backpressure se implementa con limites y degradacion controlada.</p>
                  </div>
                  <span className={styles.chip}>Estrategias</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Rechazar requests</h4>
                  <pre>{rejectCodesSnippet}</pre>

                  <ul className={styles.bullets}>
                    <li>queue limits</li>
                    <li>throttling interno</li>
                    <li>shed load: descartar trabajo menos importante</li>
                    <li>prioridades: requests criticas primero</li>
                    <li>circuit breakers para no presionar servicios degradados</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="real-systems">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como se ve en sistemas reales</h3>
                    <p className={styles.sub}>Sistemas grandes siempre gestionan presion.</p>
                  </div>
                  <span className={styles.chip}>Realidad</span>
                </div>
                <div className={styles.sbd}>
                  <p>Streaming/video como Netflix, YouTube o Twitch aplican backpressure constantemente:</p>
                  <ul className={styles.bullets}>
                    <li>bajan calidad</li>
                    <li>limitan bitrate</li>
                    <li>degradan servicio</li>
                  </ul>
                  <p>Lo hacen para evitar colapso.</p>
                </div>
              </section>

              <section className={styles.section} id="early">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como detectar saturacion antes del colapso</h3>
                    <p className={styles.sub}>El colapso suele ser el final de una degradacion progresiva.</p>
                  </div>
                  <span className={styles.chip}>Diagnostico</span>
                </div>
                <div className={styles.sbd}>
                  <p>Los sistemas rara vez pasan de:</p>
                  <pre>{healthySnippet}</pre>
                  <p>a:</p>
                  <pre>{deadSnippet}</pre>
                  <p>instantaneamente.</p>

                  <h4>Latencia creciente</h4>
                  <p>Normal:</p>
                  <pre>{latencyNormalSnippet}</pre>
                  <p>Empieza a verse:</p>
                  <pre>{latencyGrowingSnippet}</pre>

                  <h4>Queue creciendo constantemente</h4>
                  <pre>{queueGrowingSnippet}</pre>

                  <h4>Pool de conexiones agotandose</h4>
                  <pre>{maxConnectionsSnippet}</pre>
                  <pre>{connectionUsageSnippet}</pre>
                  <p>Resultado tipico despues:</p>
                  <pre>{connectionErrorsSnippet}</pre>

                  <h4>Throughput deja de crecer</h4>
                  <pre>{throughputLimitSnippet}</pre>

                  <h4>CPU constantemente alta</h4>
                  <pre>{cpuHighSnippet}</pre>
                  <p>Pero muchos backends colapsan antes por DB, red, I/O o locks.</p>

                  <h4>Memory pressure / GC pressure</h4>
                  <pre>{memoryExamplesSnippet}</pre>

                  <h4>Timeouts aumentando</h4>
                  <pre>{timeoutErrorsSnippet}</pre>
                  <div className={styles.callout}>Los timeouts suelen ser consecuencia, no causa.</div>

                  <h4>Retries explotando</h4>
                  <pre>{retriesSnippet}</pre>
                  <pre>{retryStormSnippet}</pre>
                  <div className={styles.quote}>Sistemas saturados pueden autodestruirse.</div>
                </div>
              </section>

              <section className={styles.section} id="professional">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como se detecta profesionalmente</h3>
                    <p className={styles.sub}>No puedes esperar al colapso para reaccionar.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Metricas</h4>
                  <ul className={styles.bullets}>
                    <li>latency</li>
                    <li>throughput</li>
                    <li>queue size</li>
                    <li>DB connections</li>
                    <li>CPU</li>
                    <li>memory</li>
                  </ul>

                  <h4>Alertas</h4>
                  <pre>{alertExamplesSnippet}</pre>

                  <h4>Dashboards</h4>
                  <p>Grafana, Datadog, Prometheus.</p>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No mira solo el fallo. Mira las senales previas.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorCollapseSnippet}</pre>

                  <h4>Backend senior</h4>
                  <pre>{seniorSignalsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="checkout">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Ejemplo mental</h3>
                    <p className={styles.sub}>El colapso casi nunca llega sin senales.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <p>Antes del colapso ves:</p>
                  <ul className={styles.bullets}>
                    <li>latencia subiendo</li>
                    <li>queue subiendo</li>
                    <li>retries subiendo</li>
                    <li>DB pool subiendo</li>
                    <li>timeouts subiendo</li>
                  </ul>
                  <p>Eso ya era la advertencia.</p>
                </div>
              </section>

              <section className={styles.section} id="question">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Pregunta muy senior</h3>
                    <p className={styles.sub}>No se trata de soportar trafico infinito.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{infiniteTrafficSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{controlledFailureSnippet}</pre>
                  <div className={styles.quote}>
                    Sistemas escalables no aceptan trabajo infinito. Aprenden a protegerse bajo presion.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Pensar como protegerias un sistema saturado.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{systemCapacitySnippet}</pre>
                  <p>Pero recibe:</p>
                  <pre>{systemIncomingSnippet}</pre>

                  <h4>Paso 1 - Sin proteccion</h4>
                  <p>Que se rompe primero?</p>
                  <ul className={styles.bullets}>
                    <li>DB</li>
                    <li>threads</li>
                    <li>RAM</li>
                    <li>queue</li>
                  </ul>

                  <h4>Paso 2 - Estrategias</h4>
                  <ul className={styles.bullets}>
                    <li>rate limiting</li>
                    <li>rechazar trafico</li>
                    <li>queue limit</li>
                    <li>prioridades</li>
                    <li>throttling</li>
                  </ul>

                  <h4>Paso 3 - Deteccion temprana</h4>
                  <pre>{monitoredMetricsSnippet}</pre>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{survivalSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>sistemas tienen limites</li>
                    <li>aceptar todo puede destruir backend</li>
                    <li>degradacion controlada es importante</li>
                    <li>backpressure protege estabilidad</li>
                    <li>el colapso normalmente deja senales antes</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que recurso de tu sistema se agotaria primero?</li>
                    <li>Que requests podrian descartarse temporalmente?</li>
                    <li>Como detectarias presion antes del colapso?</li>
                    <li>Que metrica seria tu senal mas temprana?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior intenta procesar todo. Backend senior disena limites, monitorea presion y protege el
                    sistema antes del colapso.
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
