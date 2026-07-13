"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "meaning", label: "2) Event Sourcing" },
  { id: "history", label: "3) Historial" },
  { id: "events", label: "4) Eventos" },
  { id: "write-flow", label: "5) Flujo" },
  { id: "store", label: "6) Event Store" },
  { id: "append-only", label: "7) Append-only" },
  { id: "raise", label: "8) Raise" },
  { id: "apply", label: "9) Apply" },
  { id: "save-load", label: "10) Repositorio" },
  { id: "history-vs-new", label: "11) Historicos" },
  { id: "version", label: "12) Version" },
  { id: "projections", label: "13) Projections" },
  { id: "snapshots", label: "14) Snapshots" },
  { id: "not-audit", label: "15) No es" },
  { id: "tradeoffs", label: "16) Tradeoffs" },
  { id: "when", label: "17) Cuando" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `UPDATE Orders
SET Status = 'Paid'
WHERE Id = 'order-123';

Despues de eso solo queda:
Status = Paid`;

const lossSnippet = `Ya no sabemos con exactitud:
como se creo la orden
cuando fue confirmada
cuando se aprobo el pago
que ocurrio antes
como llego al estado actual`;

const meaningSnippet = `OrderCreated
OrderItemAdded
OrderConfirmed
PaymentApproved

Los eventos son la fuente de verdad.
El estado actual resulta de aplicarlos.`;

const historySnippet = `Base tradicional
↓
OrderId | Status | Total
order-123 | Paid | 150

Con Event Sourcing
↓
v1 OrderCreated
v2 OrderItemAdded
v3 OrderConfirmed
v4 PaymentApproved`;

const eventNamesSnippet = `Comando:
CreateOrder
ApprovePayment

Evento:
OrderCreated
PaymentApproved`;

const writeFlowSnippet = `Cargar eventos anteriores
↓
Reconstruir aggregate en memoria
↓
Ejecutar operacion de dominio
↓
Generar evento nuevo
↓
Append al Event Store`;

const storeSnippet = `EventId | AggregateId | EventType       | Version | OccurredAt
e1      | order-123   | OrderCreated    | 1       | 10:00
e2      | order-123   | OrderItemAdded  | 2       | 10:02
e3      | order-123   | OrderConfirmed  | 3       | 10:05
e4      | order-123   | PaymentApproved | 4       | 10:07`;

const storeFieldsSnippet = `EventId
AggregateId
EventType
Data
Version
OccurredAt`;

const appendOnlySnippet = `1 OrderCreated
2 OrderItemAdded
3 OrderConfirmed
4 PaymentApproved
5 InvoiceGenerated

La historia no se reescribe.
Se amplia.`;

const raiseSnippet = `public void Confirm()
{
    // valida reglas
    Raise(new OrderConfirmed(Id, DateTimeOffset.UtcNow));
}

Raise()
1. aplica al estado en memoria
2. guarda el evento pendiente`;

const applySnippet = `Apply(OrderCreated)
↓
Id = OrderId
Status = Draft
Total = 0

Apply(OrderConfirmed)
↓
Status = PendingPayment

Apply(PaymentApproved)
↓
Status = Paid`;

const saveSnippet = `GetById
↓
SELECT * FROM Events
WHERE AggregateId = order-123
ORDER BY Version

Save
↓
GetUncommittedEvents()
↓
AppendAsync(order.Id, order.Version, events)`;

const historyVsNewSnippet = `Historico
↓
ApplyHistoricalEvent(@event)
solo cambia estado

Nuevo
↓
Raise(@event)
cambia estado y lo deja pendiente`;

const versionSnippet = `Request A carga version 4
Request B carga version 4

A guarda version 5 -> OrderCancelled
B intenta guardar version 5 -> PaymentApproved

El Event Store rechaza B.

Optimistic Concurrency Control`;

const projectionsSnippet = `Eventos
↓
Projection Handler
↓
OrderReadModel
↓
GET /orders

La proyeccion no es la fuente de verdad.
Es una vista optimizada.`;

const rebuildSnippet = `Vaciar Read Model
↓
Reproducir eventos
↓
Reconstruir proyeccion`;

const snapshotsSnippet = `Snapshot de version 10 000
↓
Cargar snapshot
↓
Aplicar solo eventos 10 001 en adelante`;

const notAuditSnippet = `Auditoria
↓
User 45 confirmed Order 123

Event Sourcing
↓
OrderConfirmed

Logs tecnicos tampoco son Event Sourcing.`;

const tradeoffsSnippet = `Ventajas
historial completo
trazabilidad
reconstruccion
reprocesamiento
analisis temporal

Costes
versionado de eventos
serializacion
compatibilidad historica
snapshots
proyecciones
consistencia eventual`;

const versioningSnippet = `Evento antiguo:
{ orderId: 123, total: 150 }

Evento nuevo:
{ orderId: 123, subtotal: 130, tax: 20, total: 150 }

La aplicacion debe saber leer ambos.`;

const whenSnippet = `Usarlo
banca
trading
seguros
logistica
contabilidad
sistemas financieros

No usarlo
CRUD sencillo
catalogo basico
sistema administrativo simple`;

const analogySnippet = `Base tradicional
↓
Equipo A 3 - 2 Equipo B

Event Sourcing
↓
Min 10 gol A
Min 24 gol B
Min 42 gol A
Min 70 gol B
Min 89 gol A`;

const exerciseSnippet = `Historia:
OrderCreated
OrderItemAdded
OrderItemAdded
OrderConfirmed
PaymentApproved
InventoryReserved
OrderShipped

1. Que guardaria el Event Store?
2. Que cambiaria cada Apply()?
3. Como reconstruyes la orden?
4. Que queda en UncommittedEvents?
5. Como detectas concurrencia?
6. Que Read Model crearias para GET /orders?
7. Cuando usarias snapshot?
8. Lo aplicarias a un CRUD basico?`;

const closingSnippet = `Una base tradicional guarda
como esta una entidad ahora.

Event Sourcing guarda
todo lo que le ocurrio
y permite reconstruir
como esta ahora.`;

export default function Daily127Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/126";
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
              <div className={styles.brandSub}>Event Sourcing y la historia del dominio</div>
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
            <Link className={styles.btn} href="/daily/126">
              <span className={styles.kbd}>←</span> Dia 126
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/128">
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
                <div className={styles.createdAt}>11/07/2026</div>
                <div className={styles.badge}>Daily #127 • Event Sourcing</div>
                <h2 className={styles.title}>Event Sourcing: guardar la historia completa en lugar de sobrescribir el estado</h2>
                <p className={styles.lead}>
                  Event Sourcing cambia la pregunta principal del almacenamiento. En vez de guardar solo el estado final,
                  guarda los hechos del negocio y reconstruye el aggregate a partir de ellos.
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
                    <p className={styles.sub}>Sobrescribir una fila borra la historia del negocio.</p>
                  </div>
                  <span className={styles.chip}>Estado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{lossSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es Event Sourcing</h3>
                    <p className={styles.sub}>Los eventos pasan a ser la fuente oficial de verdad.</p>
                  </div>
                  <span className={styles.chip}>Patron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{meaningSnippet}</pre>
                  <div className={styles.callout}>El estado actual es el resultado de aplicar la historia.</div>
                </div>
              </section>

              <section className={styles.section} id="history">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Estado actual vs historial</h3>
                    <p className={styles.sub}>La tabla tradicional guarda una fotografia; Event Sourcing guarda la secuencia.</p>
                  </div>
                  <span className={styles.chip}>Historial</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{historySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="events">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Un evento representa algo que ya ocurrio</h3>
                    <p className={styles.sub}>No es una orden para hacer algo; es un hecho ya sucedido.</p>
                  </div>
                  <span className={styles.chip}>Evento</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventNamesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="write-flow">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como guarda datos realmente</h3>
                    <p className={styles.sub}>No hace update de estado; hace append de hechos nuevos.</p>
                  </div>
                  <span className={styles.chip}>Write flow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{writeFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="store">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Event Store</h3>
                    <p className={styles.sub}>Puede ser una base especializada o una tabla propia.</p>
                  </div>
                  <span className={styles.chip}>Store</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{storeSnippet}</pre>
                  <pre>{storeFieldsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="append-only">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Los eventos son append-only</h3>
                    <p className={styles.sub}>La historia no se modifica: solo se agrega un hecho nuevo.</p>
                  </div>
                  <span className={styles.chip}>Append-only</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{appendOnlySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="raise">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como genera eventos el aggregate</h3>
                    <p className={styles.sub}>El aggregate valida reglas y luego hace `Raise()` del evento.</p>
                  </div>
                  <span className={styles.chip}>Raise</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{raiseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="apply">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Que hace `Apply()`</h3>
                    <p className={styles.sub}>Modifica solo el estado en memoria; no persiste nada por si mismo.</p>
                  </div>
                  <span className={styles.chip}>Apply</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{applySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="save-load">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Carga y guardado en repositorio</h3>
                    <p className={styles.sub}>`GetById` reconstruye; `Save` hace append de los eventos pendientes.</p>
                  </div>
                  <span className={styles.chip}>Repository</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{saveSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="history-vs-new">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Eventos historicos vs eventos nuevos</h3>
                    <p className={styles.sub}>Reproducir historia no debe volver a dejar esos eventos pendientes.</p>
                  </div>
                  <span className={styles.chip}>History</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{historyVsNewSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="version">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Para que sirve la version</h3>
                    <p className={styles.sub}>Protege el orden de la historia y evita escrituras contradictorias.</p>
                  </div>
                  <span className={styles.chip}>Version</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{versionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="projections">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Projections y modelos de lectura</h3>
                    <p className={styles.sub}>Las consultas no tienen por que reconstruir aggregates completos.</p>
                  </div>
                  <span className={styles.chip}>CQRS</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{projectionsSnippet}</pre>
                  <pre>{rebuildSnippet}</pre>
                  <div className={styles.callout}>Por eso Event Sourcing suele ir junto a CQRS.</div>
                </div>
              </section>

              <section className={styles.section} id="snapshots">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Snapshots</h3>
                    <p className={styles.sub}>Reducen el coste de reconstruccion cuando la historia es muy larga.</p>
                  </div>
                  <span className={styles.chip}>Snapshot</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{snapshotsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="not-audit">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Event Sourcing no es auditoria ni logging</h3>
                    <p className={styles.sub}>Los eventos deben representar hechos del negocio, no actividad tecnica.</p>
                  </div>
                  <span className={styles.chip}>No es</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notAuditSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="tradeoffs">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Ventajas y costes</h3>
                    <p className={styles.sub}>Aporta trazabilidad y reconstruccion, pero sube mucho la complejidad.</p>
                  </div>
                  <span className={styles.chip}>Tradeoffs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{tradeoffsSnippet}</pre>
                  <pre>{versioningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="when">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Cuando usarlo y cuando no</h3>
                    <p className={styles.sub}>Tiene sentido en dominios con historia estricta, no en CRUDs simples.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whenSnippet}</pre>
                  <pre>{analogySnippet}</pre>
                  <pre>{exerciseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>En ciertos dominios, la historia es mas valiosa que la fotografia actual.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/126">
                      <span className={styles.kbd}>←</span> Dia 126
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/128">
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
