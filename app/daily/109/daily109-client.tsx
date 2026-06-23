"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "logging", label: "3) Logging" },
  { id: "events", label: "4) Eventos" },
  { id: "data", label: "5) Datos" },
  { id: "mistake", label: "6) Error" },
  { id: "when", label: "7) Cuando" },
  { id: "transactions", label: "8) Transacciones" },
  { id: "where", label: "9) Dónde" },
  { id: "example", label: "10) Ejemplo" },
  { id: "queries", label: "11) Consultas" },
  { id: "soft-delete", label: "12) Soft Delete" },
  { id: "what-not", label: "13) Qué no" },
  { id: "mindset", label: "14) Mentalidad" },
  { id: "production", label: "15) Produccion" },
  { id: "result", label: "16) Resultado" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "final", label: "18) Cierre" },
] as const;

const ideaSnippet = `Un pedido desaparecio

Quien lo elimino?

Una orden paso a Paid

Cuando ocurrio?

El cliente asegura que nunca confirmo la orden

Tenemos evidencia?`;

const auditDefinitionSnippet = `Registro historico de eventos importantes ocurridos dentro del sistema.`;

const notLoggingSnippet = `No es logging.
No es monitoreo.
No es tracing.`;

const businessHistorySnippet = `historial de negocio`;

const whatItAnswersSnippet = `que ocurrio
cuando ocurrio
sobre que ocurrio`;

const loggingSnippet = `Error conectando a PostgreSQL`;

const auditSnippet = `Order 123 Confirmed`;

const eventTypesSnippet = `ProductCreated
ProductUpdated
ProductDeleted
OrderCreated
OrderConfirmed
OrderCancelled
OrderPaid`;

const auditDataSnippet = `Id
EventType
EntityId
Timestamp
Description`;

const exampleSnippet = `OrderConfirmed
OrderId: 123
2026-06-23 14:22`;

const badSnippet = `Se hizo algo`;

const betterSnippet = `Order 123 Confirmed`;

const storySnippet = `La auditoria debe contar una historia.`;

const whenSnippet = `despues de completar una operacion exitosa`;

const goodFlowSnippet = `Create Order
Guardar Order
Crear AuditLog`;

const badFlowSnippet = `AuditLog creado
Order no creada`;

const consistencySnippet = `ambos existen

O:

ninguno existe`;

const transactionSnippet = `La auditoria tambien forma parte de la consistencia.`;

const whereSnippet = `Application Service`;

const whereWhySnippet = `Porque ahi se coordinan los casos de uso.`;

const confirmFlowSnippet = `OrderService
Order.Confirm()
Guardar cambios
Crear AuditLog`;

const querySnippet = `GET /audit-logs

GET /audit-logs/{id}`;

const alternateSnippet = `GET /orders/{id}/history`;

const softDeleteSnippet = `Product

IsDeleted = true`;

const softDeleteAuditSnippet = `ProductDeleted`;

const softDeleteMeaningSnippet = `quien
cuando
que`;

const whatNotSnippet = `stack traces
errores tecnicos
consultas SQL`;

const logsSnippet = `logs`;

const businessLanguageSnippet = `AuditLog no es un archivo de logs.`;

const juniorSnippet = `¿Funciona?`;

const seniorSnippet = `¿Podre explicar mañana
que ocurrio?`;

const productionSnippet = `¿Quien cancelo la orden?
¿Cuando se pago?`;

const productionAnswerSnippet = `Auditoria.`;

const resultSnippet = `AuditLog
AuditLogRepository
AuditLogService
GET /audit-logs
GET /audit-logs/{id}`;

const finalReflectionSnippet = `La auditoria responde al negocio, no al equipo tecnico.`;

const nextStepSnippet = `Dia 110: Hardening de API`;

const nextTopicsSnippet = `WeatherForecast
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
Errores esperados
Respuestas limpias`;

export default function Daily109Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/108";
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
            <Link className={styles.pill} href="/profile">
              Perfil
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/108">
              <span className={styles.kbd}>←</span> Dia 108
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
                <div className={styles.createdAt}>23/06/2026</div>
                <div className={styles.badge}>Daily #109 • AuditLog</div>
                <h2 className={styles.title}>Auditoria: como saber quien hizo que, cuando y sobre que</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Auditoria</span>
                  <span className={styles.chip}>Tag: Negocio</span>
                  <span className={styles.chip}>Tag: Historial</span>
                  <span className={styles.chip}>Tag: OrderFlow</span>
                </div>

                <p className={styles.lead}>
                  La auditoria registra historia de negocio. No reemplaza logs ni monitoreo.
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
                    <p className={styles.sub}>Cuando algo desaparece o cambia, necesitas evidencia.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <div className={styles.callout}>Ahí aparece la auditoria.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es una auditoria</h3>
                    <p className={styles.sub}>Es un registro historico de eventos de negocio importantes.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{auditDefinitionSnippet}</pre>
                  <pre>{businessHistorySnippet}</pre>
                  <pre>{whatItAnswersSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="logging">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Logging no es auditoria</h3>
                    <p className={styles.sub}>Son cosas distintas, con audiencias y propositos distintos.</p>
                  </div>
                  <span className={styles.chip}>Logging</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notLoggingSnippet}</pre>
                  <pre>{loggingSnippet}</pre>
                  <pre>{auditSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="events">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Eventos auditables</h3>
                    <p className={styles.sub}>No todo merece auditoria. Solo lo que cambia el negocio.</p>
                  </div>
                  <span className={styles.chip}>Eventos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventTypesSnippet}</pre>
                  <div className={styles.callout}>Audita eventos de negocio.</div>
                </div>
              </section>

              <section className={styles.section} id="data">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que informacion guardar</h3>
                    <p className={styles.sub}>La auditoria tiene que contar una historia util.</p>
                  </div>
                  <span className={styles.chip}>Datos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{auditDataSnippet}</pre>
                  <pre>{exampleSnippet}</pre>
                  <pre>{betterSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>6. El error tipico</h3>
                    <p className={styles.sub}>Un mensaje vacio no sirve para explicar nada.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badSnippet}</pre>
                  <div className={styles.quote}>{storySnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="when">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Cuándo registrar auditoria</h3>
                    <p className={styles.sub}>Despues de completar la operacion exitosamente.</p>
                  </div>
                  <span className={styles.chip}>Momento</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whenSnippet}</pre>
                  <pre>{goodFlowSnippet}</pre>
                  <pre>{badFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="transactions">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Relacion con transacciones</h3>
                    <p className={styles.sub}>Si una operacion afecta varias cosas, queremos todo o nada.</p>
                  </div>
                  <span className={styles.chip}>Transaccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{consistencySnippet}</pre>
                  <pre>{consistencySnippet}</pre>
                  <pre>{transactionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="where">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Donde crear la auditoria</h3>
                    <p className={styles.sub}>El Application Service sabe cuando el caso de uso termino bien.</p>
                  </div>
                  <span className={styles.chip}>Lugar</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whereSnippet}</pre>
                  <pre>{whereWhySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Ejemplo mental</h3>
                    <p className={styles.sub}>Confirmar orden deja una huella de negocio clara.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{confirmFlowSnippet}</pre>
                  <div className={styles.callout}>Mucho mas limpio.</div>
                </div>
              </section>

              <section className={styles.section} id="queries">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Consultar auditoria</h3>
                    <p className={styles.sub}>El historial debe poder leerse facilmente cuando hace falta.</p>
                  </div>
                  <span className={styles.chip}>Queries</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{querySnippet}</pre>
                  <pre>{alternateSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="soft-delete">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Soft Delete y auditoria</h3>
                    <p className={styles.sub}>Si borras lógicamente, la auditoria debe registrar el evento de negocio.</p>
                  </div>
                  <span className={styles.chip}>Soft Delete</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{softDeleteSnippet}</pre>
                  <pre>{softDeleteAuditSnippet}</pre>
                  <pre>{softDeleteMeaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="what-not">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Qué no debe contener la auditoria</h3>
                    <p className={styles.sub}>La auditoria habla negocio; el log habla tecnica.</p>
                  </div>
                  <span className={styles.chip}>No</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whatNotSnippet}</pre>
                  <pre>{logsSnippet}</pre>
                  <div className={styles.callout}>{businessLanguageSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Como piensa un backend senior</h3>
                    <p className={styles.sub}>La pregunta no es solo si funciona, sino si se puede explicar mañana.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Senior</h4>
                  <pre>{seniorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="production">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Preparandonos para produccion</h3>
                    <p className={styles.sub}>Las preguntas reales de produccion necesitan auditoria.</p>
                  </div>
                  <span className={styles.chip}>Produccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{productionSnippet}</pre>
                  <pre>{productionAnswerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="result">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Resultado esperado</h3>
                    <p className={styles.sub}>Tener entidad, repositorio, service y consultas de auditoria definidas.</p>
                  </div>
                  <span className={styles.chip}>Resultado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resultSnippet}</pre>
                  <div className={styles.callout}>{finalReflectionSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Escribe qué ocurrió, cuándo y sobre qué para un evento real.</p>
                  </div>
                  <span className={styles.chip}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.li}>
                    <strong>OrderConfirmed</strong>
                  </div>
                  <pre>OrderId: 123</pre>
                  <pre>2026-06-23 14:22</pre>
                  <div className={styles.callout}>Si puedes explicarlo mañana, la auditoria esta sirviendo.</div>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>La auditoria responde al negocio y deja evidencia util.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/108">
                      <span className={styles.kbd}>←</span> Dia 108
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
                  <p>Dia 109 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Foco:</strong> la auditoria es historial de negocio, no logging tecnico.
                </div>
                <div className={styles.li}>
                  <strong>Momento:</strong> registrar despues de que la operacion termine bien.
                </div>
                <div className={styles.li}>
                  <strong>Consistencia:</strong> auditoria y cambio de negocio deben quedar sincronizados.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> poder explicar mañana que ocurrio, cuando y sobre que.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
