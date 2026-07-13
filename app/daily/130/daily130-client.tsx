"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "meaning", label: "2) Observabilidad" },
  { id: "pillars", label: "3) Pilares" },
  { id: "microservices", label: "4) Problema" },
  { id: "trace", label: "5) Trace" },
  { id: "trace-id", label: "6) TraceId" },
  { id: "span", label: "7) Span" },
  { id: "correlation", label: "8) CorrelationId" },
  { id: "propagation", label: "9) Propagacion" },
  { id: "otel", label: "10) OpenTelemetry" },
  { id: "jaeger", label: "11) Jaeger" },
  { id: "metrics", label: "12) Metricas" },
  { id: "logs", label: "13) Logs" },
  { id: "orderflow", label: "14) OrderFlow" },
  { id: "alerts", label: "15) Alertas" },
  { id: "mistakes", label: "16) Errores" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `POST /orders
↓
12 segundos

Pregunta real:
¿Donde se perdio el tiempo?

Gateway?
Order?
RabbitMQ?
Payment?
PostgreSQL?
Redis?
Servicio externo?`;

const meaningSnippet = `Observabilidad

Capacidad de comprender
el estado interno del sistema
analizando la informacion
que produce.`;

const pillarsSnippet = `Logs
↓
Que ocurrio?

Metricas
↓
Como se esta comportando?

Trazas
↓
Por donde paso esta peticion?`;

const microservicesSnippet = `Cliente
↓
Gateway
↓
Order
↓
Payment
↓
Inventory
↓
Notification

Una sola peticion cruza
varios servicios y dependencias.`;

const traceSnippet = `Una traza representa
el recorrido completo
de una peticion
desde que entra
hasta que termina.`;

const traceIdSnippet = `TraceId
6fd82a17ab934c1e

Gateway
↓
Order
↓
Payment
↓
Inventory

Todos comparten el mismo TraceId.`;

const spanSnippet = `Trace
↓
Gateway
↓
Order
↓
PostgreSQL
↓
RabbitMQ
↓
Payment
↓
Redis
↓
Inventory

Cada paso es un Span.`;

const correlationSnippet = `TraceId
↓
una ejecucion distribuida

CorrelationId
↓
un mismo proceso de negocio
que puede durar horas o dias`;

const propagationSnippet = `HTTP
↓
traceparent: 00-4bf92f...

RabbitMQ
↓
Message headers:
TraceId
CorrelationId

La observabilidad no termina en HTTP.`;

const otelSnippet = `OpenTelemetry

estandar abierto para generar:
trazas
metricas
logs

Instrumenta la aplicacion.
No es la herramienta de visualizacion.`;

const collectorSnippet = `Aplicacion
↓
OTel Collector
↓
Jaeger
Grafana Tempo
Zipkin`;

const jaegerSnippet = `Gateway     120 ms
Order        95 ms
Payment      80 ms
Banco        78 ms
Inventory    10 ms

Ya no adivinamos.
Vemos donde se pierde el tiempo.`;

const practicalSnippet = `Usuario:
Crear pedido tarda 8 segundos

Jaeger:
Gateway 15 ms
Order   40 ms
Rabbit  5 ms
Payment 7900 ms

Problema encontrado.`;

const metricsSnippet = `CPU
RAM
Requests por segundo
Tiempo medio de respuesta
Errores 500
Mensajes pendientes`;

const prometheusSnippet = `Prometheus
↓
GET /metrics
↓
consulta periodicamente

Grafana
↓
dashboards y tendencias`;

const logsSnippet = `Malo:
Algo fallo.

Mejor:
{
  "traceId":"6fd82...",
  "orderId":"123",
  "customerId":"45",
  "service":"Payment",
  "operation":"ApprovePayment",
  "elapsedMs":820,
  "level":"Error"
}`;

const orderflowSnippet = `POST /orders
↓
cada servicio genera
TraceId
Logs
Metricas
Spans

Luego reconstruimos
exactamente que ocurrio.`;

const orderflowMetricsSnippet = `Tiempo medio de creacion de ordenes
Pagos aprobados por minuto
Pagos rechazados
Eventos pendientes en RabbitMQ
Tamano de la DLQ
Latencia de PostgreSQL
Tiempo de convergencia de Saga
Ordenes Processing > 5 min`;

const alertsSnippet = `DLQ > 50 mensajes
↓
alerta

Payment latency > 2 s
↓
alerta

Errores HTTP 500 > 5%
↓
alerta`;

const mistakesSnippet = `Console.WriteLine()
no es observabilidad.

Sin propagacion de TraceId:
Gateway -> Trace A
Order   -> Trace B
Payment -> Trace C

Ya no puedes reconstruir la peticion.`;

const exerciseSnippet = `Flujo:
Gateway
↓
Order
↓
RabbitMQ
↓
Payment
↓
Inventory
↓
Notification

1. Que es un Trace?
2. Que representa un Span?
3. Que pondrias en un log estructurado?
4. Diferencia entre TraceId y CorrelationId?
5. Que herramienta genera trazas?
6. Cual las visualiza?
7. Que metricas pondrias en Grafana?
8. Que alertas configurarias antes de que llame soporte?`;

const closingSnippet = `En un sistema distribuido
no basta con saber que algo fallo.

Hay que entender
como,
donde
y por que ocurrio
para corregirlo rapido.`;

export default function Daily130Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/128";
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
              <div className={styles.brandSub}>Observabilidad distribuida y seguimiento de peticiones</div>
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
            <Link className={styles.btn} href="/daily/128">
              <span className={styles.kbd}>←</span> Dia 128
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/131">
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
                <div className={styles.createdAt}>14/07/2026</div>
                <div className={styles.badge}>Daily #130 • Observabilidad</div>
                <h2 className={styles.title}>Observabilidad distribuida: como seguir una peticion a traves de todos los microservicios</h2>
                <p className={styles.lead}>
                  En una arquitectura distribuida, una peticion deja de pertenecer a un unico servicio. La observabilidad
                  permite reconstruir su recorrido completo, medir su comportamiento y detectar exactamente donde se degrada.
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
                    <p className={styles.sub}>La pregunta real no es solo que esta lento, sino donde se perdio el tiempo.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es observabilidad</h3>
                    <p className={styles.sub}>Comprender el estado interno del sistema a partir de la informacion que produce.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{meaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="pillars">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Los tres pilares</h3>
                    <p className={styles.sub}>Logs, metricas y trazas trabajan juntos; ninguno sustituye a los demas.</p>
                  </div>
                  <span className={styles.chip}>Pilares</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{pillarsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="microservices">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El problema de los microservicios</h3>
                    <p className={styles.sub}>Mirar un solo log ya no basta cuando una peticion cruza muchos servicios.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{microservicesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="trace">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que es una traza</h3>
                    <p className={styles.sub}>Una traza cuenta la historia completa de una peticion.</p>
                  </div>
                  <span className={styles.chip}>Trace</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{traceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="trace-id">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Trace ID</h3>
                    <p className={styles.sub}>Une logs y spans de distintos servicios bajo una misma ejecucion.</p>
                  </div>
                  <span className={styles.chip}>TraceId</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{traceIdSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="span">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Span</h3>
                    <p className={styles.sub}>Cada trabajo concreto de la cadena se representa como un span.</p>
                  </div>
                  <span className={styles.chip}>Span</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{spanSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="correlation">
                <div className={styles.shd}>
                  <div>
                    <h3>8. TraceId vs CorrelationId</h3>
                    <p className={styles.sub}>Pueden coincidir, pero conceptualmente no son lo mismo.</p>
                  </div>
                  <span className={styles.chip}>Correlation</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{correlationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="propagation">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como viaja el TraceId</h3>
                    <p className={styles.sub}>La propagacion es tan importante como la generacion.</p>
                  </div>
                  <span className={styles.chip}>Propagacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{propagationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="otel">
                <div className={styles.shd}>
                  <div>
                    <h3>10. OpenTelemetry</h3>
                    <p className={styles.sub}>Produce la informacion de observabilidad; no es el visor.</p>
                  </div>
                  <span className={styles.chip}>OTel</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{otelSnippet}</pre>
                  <pre>{collectorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="jaeger">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Jaeger</h3>
                    <p className={styles.sub}>Visualiza la traza y deja de convertir el rendimiento en una adivinanza.</p>
                  </div>
                  <span className={styles.chip}>Jaeger</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{jaegerSnippet}</pre>
                  <pre>{practicalSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="metrics">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Metricas</h3>
                    <p className={styles.sub}>Las trazas explican una peticion; las metricas muestran tendencias.</p>
                  </div>
                  <span className={styles.chip}>Metricas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{metricsSnippet}</pre>
                  <pre>{prometheusSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="logs">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Logs estructurados</h3>
                    <p className={styles.sub}>Deben poder buscarse, correlacionarse y medirse.</p>
                  </div>
                  <span className={styles.chip}>Logs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{logsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Observabilidad en OrderFlow</h3>
                    <p className={styles.sub}>La combinacion de trazas, logs y metricas permite reconstruir exactamente que paso.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <pre>{orderflowMetricsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="alerts">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Alertas</h3>
                    <p className={styles.sub}>No basta con observar; hay que reaccionar antes de que llamen al soporte.</p>
                  </div>
                  <span className={styles.chip}>Alertas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{alertsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Errores tipicos</h3>
                    <p className={styles.sub}>Imprimir texto no es observabilidad, y no propagar el TraceId rompe toda la historia.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Piensa la observabilidad como una capacidad de diagnostico completa, no como logs aislados.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>En distribuido, entender el recorrido completo es tan importante como corregir el error.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/128">
                      <span className={styles.kbd}>←</span> Dia 128
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/131">
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
