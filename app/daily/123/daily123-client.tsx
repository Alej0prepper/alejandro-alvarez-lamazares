"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "scenario", label: "2) Escenario" },
  { id: "cause", label: "3) Causa" },
  { id: "bad-solution", label: "4) Mala solucion" },
  { id: "outbox", label: "5) Outbox" },
  { id: "table", label: "6) Tabla" },
  { id: "publisher", label: "7) Publisher" },
  { id: "flow", label: "8) Flujo" },
  { id: "rabbit-down", label: "9) Rabbit caido" },
  { id: "worker-down", label: "10) Worker caido" },
  { id: "states", label: "11) Estados" },
  { id: "orderflow", label: "12) OrderFlow" },
  { id: "mistake", label: "13) Error" },
  { id: "sagas", label: "14) Sagas" },
  { id: "delivery", label: "15) Entrega" },
  { id: "thinking", label: "16) Mentalidad" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `¿Que pasa si la base de datos guarda la orden...

pero RabbitMQ nunca recibe el evento?`;

const scenarioSnippet = `Guardar Order
↓
Publicar OrderCreated`;

const failureSnippet = `Guardar Order
↓
OK

RabbitMQ
↓
Caido

La orden existe.
Pero nadie sabe que fue creada.`;

const causeSnippet = `Base de Datos
↓
OK

RabbitMQ
↓
ERROR`;

const badSolutionSnippet = `Guardar
↓
Publicar
↓
Si falla
↓
Rollback`;

const outboxSnippet = `Guardar Order

+

Guardar Evento

↓

MISMA transaccion`;

const tableSnippet = `Outbox

Id | Event        | Status
1  | OrderCreated | Pending`;

const transactionSnippet = `Orders
↓
Outbox

Si la transaccion falla:
no se guarda nada.

Si funciona:
se guarda todo.`;

const publisherSnippet = `Outbox Publisher
Worker
Background Service`;

const publisherFlowSnippet = `Lee Outbox
↓
Pending
↓
Publica a RabbitMQ
↓
Marca Published`;

const fullFlowSnippet = `Crear Order
↓
Guardar Order
↓
Guardar Outbox
↓
Commit

Worker
↓
Lee Outbox
↓
Publica RabbitMQ
↓
Marca Published`;

const rabbitDownSnippet = `RabbitMQ sigue caido
↓
Worker intenta
↓
Falla
↓
Registro sigue Pending
↓
Rabbit vuelve
↓
Worker publica`;

const workerDownSnippet = `Worker cae
↓
Outbox sigue Pending
↓
Worker vuelve
↓
continua donde estaba`;

const statesSnippet = `Pending
Publishing
Published
Failed`;

const orderflowSnippet = `Orders
↓
Insert

Outbox
↓
OrderCreated

Commit

Worker
↓
RabbitMQ
↓
Inventory
Notification
Analytics`;

const mistakeSnippet = `No elimines inmediatamente el registro Outbox.

Marca:
Published

Asi puedes:
auditar
reintentar
diagnosticar`;

const sagasSnippet = `Saga
↓
Outbox
↓
RabbitMQ`;

const deliverySnippet = `Outbox garantiza que el evento:
no se pierda

Pero puede publicarse:
mas de una vez`;

const thinkingSnippet = `Backend junior:
Guardar
↓
Enviar Rabbit

Backend senior:
Guardar
↓
Guardar Outbox
↓
Commit
↓
Worker
↓
Rabbit`;

const exerciseSnippet = `OrderCreated

1. Que ocurre si la orden se guarda pero RabbitMQ esta caido?
2. Como evita ese problema el Outbox Pattern?
3. Que informacion guardarias en la tabla Outbox?
4. Quien publica realmente los eventos?
5. Que harias con un evento Pending durante una hora?`;

const closingSnippet = `La consistencia no depende de que nada falle.

Depende de estar preparado
para cuando inevitablemente falle.`;

export default function Daily123Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/122";
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
              <div className={styles.brandSub}>Outbox Pattern y eventos confiables</div>
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
            <Link className={styles.btn} href="/daily/122">
              <span className={styles.kbd}>←</span> Dia 122
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/124">
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
                <div className={styles.createdAt}>07/07/2026</div>
                <div className={styles.badge}>Daily #123 • Outbox Pattern</div>
                <h2 className={styles.title}>Outbox Pattern: como publicar eventos sin perder consistencia</h2>
                <p className={styles.lead}>
                  El Outbox Pattern evita el punto ciego entre guardar datos y publicar eventos. Primero asegura el
                  evento en la misma base de datos; despues un worker lo publica.
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
                    <p className={styles.sub}>El evento no puede perderse despues de confirmar la operacion de negocio.</p>
                  </div>
                  <span className={styles.chip}>Outbox</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <div className={styles.callout}>El Outbox Pattern existe para resolver exactamente ese problema.</div>
                </div>
              </section>

              <section className={styles.section} id="scenario">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El escenario</h3>
                    <p className={styles.sub}>Guardar y luego publicar parece correcto, hasta que algo falla.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{scenarioSnippet}</pre>
                  <pre>{failureSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cause">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Por que ocurre</h3>
                    <p className={styles.sub}>Base de datos y broker son sistemas distintos.</p>
                  </div>
                  <span className={styles.chip}>Consistencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{causeSnippet}</pre>
                  <div className={styles.quote}>No existe una transaccion compartida entre ambos.</div>
                </div>
              </section>

              <section className={styles.section} id="bad-solution">
                <div className={styles.shd}>
                  <div>
                    <h3>4. La mala solucion</h3>
                    <p className={styles.sub}>Intentar publicar y hacer rollback despues llega tarde.</p>
                  </div>
                  <span className={styles.chip}>Anti-pattern</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badSolutionSnippet}</pre>
                  <div className={styles.callout}>Si la base de datos ya confirmo, no puedes fingir que no paso.</div>
                </div>
              </section>

              <section className={styles.section} id="outbox">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que hace Outbox</h3>
                    <p className={styles.sub}>Guarda el dato y el evento juntos en la misma transaccion.</p>
                  </div>
                  <span className={styles.chip}>Patron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{outboxSnippet}</pre>
                  <div className={styles.quote}>RabbitMQ todavia no participa en esa transaccion.</div>
                </div>
              </section>

              <section className={styles.section} id="table">
                <div className={styles.shd}>
                  <div>
                    <h3>6. La tabla Outbox</h3>
                    <p className={styles.sub}>El evento queda registrado como dato pendiente.</p>
                  </div>
                  <span className={styles.chip}>Tabla</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{tableSnippet}</pre>
                  <pre>{transactionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="publisher">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Quien publica el mensaje</h3>
                    <p className={styles.sub}>Un proceso independiente lee y publica eventos pendientes.</p>
                  </div>
                  <span className={styles.chip}>Worker</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{publisherSnippet}</pre>
                  <pre>{publisherFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Flujo completo</h3>
                    <p className={styles.sub}>La transaccion y el envio quedan desacoplados.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fullFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="rabbit-down">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Si RabbitMQ sigue caido</h3>
                    <p className={styles.sub}>El evento permanece pendiente y se reintenta despues.</p>
                  </div>
                  <span className={styles.chip}>Retry</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rabbitDownSnippet}</pre>
                  <div className={styles.callout}>Nunca perdimos el evento.</div>
                </div>
              </section>

              <section className={styles.section} id="worker-down">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Si el Worker cae</h3>
                    <p className={styles.sub}>La tabla Outbox conserva el trabajo pendiente.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{workerDownSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="states">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Estados tipicos</h3>
                    <p className={styles.sub}>Los estados facilitan monitoreo y diagnostico.</p>
                  </div>
                  <span className={styles.chip}>Estados</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{statesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>12. OrderFlow</h3>
                    <p className={styles.sub}>Crear una orden guarda Order y Outbox antes de publicar nada.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Error tipico</h3>
                    <p className={styles.sub}>Borrar el registro inmediatamente elimina visibilidad operativa.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="sagas">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Relacion con Sagas</h3>
                    <p className={styles.sub}>Una Saga necesita eventos confiables para comenzar y continuar.</p>
                  </div>
                  <span className={styles.chip}>Saga</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{sagasSnippet}</pre>
                  <div className={styles.quote}>Outbox garantiza que la Saga pueda comenzar.</div>
                </div>
              </section>

              <section className={styles.section} id="delivery">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Garantia real</h3>
                    <p className={styles.sub}>Outbox evita perder eventos, pero no garantiza exactly once.</p>
                  </div>
                  <span className={styles.chip}>At least once</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deliverySnippet}</pre>
                  <div className={styles.callout}>Eso conecta directamente con idempotencia en consumidores.</div>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Mentalidad senior</h3>
                    <p className={styles.sub}>Primero persistir el evento; despues publicarlo de forma recuperable.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{thinkingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Piensa el evento OrderCreated desde persistencia hasta publicacion.</p>
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
                    <p className={styles.sub}>La consistencia se diseña para cuando algo falla.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/122">
                      <span className={styles.kbd}>←</span> Dia 122
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/124">
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
