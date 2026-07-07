"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "no-2pc", label: "2) Sin 2PC" },
  { id: "consistency", label: "3) Consistencia" },
  { id: "saga", label: "4) Saga" },
  { id: "happy-path", label: "5) Flujo ideal" },
  { id: "failure", label: "6) Falla" },
  { id: "compensation", label: "7) Compensacion" },
  { id: "types", label: "8) Tipos" },
  { id: "tradeoffs", label: "9) Tradeoffs" },
  { id: "orderflow", label: "10) OrderFlow" },
  { id: "mistakes", label: "11) Errores" },
  { id: "events", label: "12) Eventos" },
  { id: "thinking", label: "13) Mentalidad" },
  { id: "exercise", label: "14) Ejercicio" },
  { id: "closing", label: "15) Cierre" },
] as const;

const flowSnippet = `Crear Orden
↓
Cobrar
↓
Descontar Inventario
↓
Enviar Email`;

const failureQuestionSnippet = `¿Que pasa si el pago funciona,
pero el inventario falla?`;

const distributedSnippet = `Cada servicio tiene:
su propia base de datos
su propia transaccion
su propio despliegue`;

const twoPhaseSnippet = `Two-Phase Commit

Todos confirman
↓
o
↓
Nadie confirma`;

const twoPhaseProblemsSnippet = `lento
complejo
dificil de escalar
bloquea recursos`;

const consistencySnippet = `No hacemos una transaccion enorme.

Hacemos varias transacciones pequeñas.

Si algo falla:
compensamos`;

const sagaSnippet = `Saga

Secuencia de transacciones locales
coordinadas mediante eventos o comandos,
donde cada paso puede tener
una accion compensatoria.`;

const happyPathSnippet = `Crear Orden
↓
Cobrar tarjeta
↓
Reservar inventario
↓
Enviar confirmacion`;

const failureSnippet = `Orden creada
↓
Pago aprobado
↓
Inventario falla`;

const refundSnippet = `No podemos hacer rollback del pago.

El banco ya aprobo.

Debemos:
Reembolsar`;

const compensationSnippet = `Accion -> Compensacion

Crear Orden -> Cancelar Orden
Aprobar Pago -> Reembolsar Pago
Reservar Stock -> Liberar Stock
Crear Reserva -> Cancelar Reserva`;

const choreographySnippet = `OrderCreated
↓
Payment escucha
↓
PaymentApproved
↓
Inventory escucha
↓
InventoryReserved
↓
Notification escucha`;

const orchestrationSnippet = `Saga Orchestrator
↓
Crear Orden
↓
Cobrar
↓
Reservar Stock
↓
Enviar Email`;

const tradeoffsSnippet = `Coreografia
muy desacoplada
simple para procesos pequeños
dificil seguir el flujo
dependencias ocultas

Orquestacion
flujo claro
facil de monitorizar
nuevo componente
responsabilidad central`;

const orderflowSnippet = `OrderCreated
↓
PaymentApproved
↓
InventoryReservationFailed
↓
RefundPayment
↓
CancelOrder`;

const mistakesSnippet = `Una Saga no garantiza exito.

Garantiza consistencia.

Puede terminar en:
exito
o
compensacion`;

const missingCompensationSnippet = `Pago aprobado

Pero no existe:
RefundPayment

La Saga queda atrapada.`;

const eventsSnippet = `OrderCreated
↓
PaymentApproved
↓
InventoryReserved
↓
OrderCompleted

InventoryFailed
↓
RefundPayment
↓
OrderCancelled`;

const thinkingSnippet = `Backend junior:
Si algo falla, hago rollback.

Backend senior:
Cada servicio confirma su trabajo.
Si algo falla,
ejecuto acciones compensatorias.`;

const exerciseSnippet = `Crear Orden
↓
Cobrar
↓
Reservar Inventario
↓
Generar Factura
↓
Enviar Email`;

const closingSnippet = `En microservicios, el objetivo no es evitar todos los errores.

El objetivo es garantizar que,
cuando aparecen,
el negocio termine en un estado correcto y recuperable.`;

export default function Daily122Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/121";
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
              <div className={styles.brandSub}>Saga Pattern y compensaciones</div>
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
            <Link className={styles.btn} href="/daily/121">
              <span className={styles.kbd}>←</span> Dia 121
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/123">
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
                <div className={styles.createdAt}>06/07/2026</div>
                <div className={styles.badge}>Daily #122 • Saga Pattern</div>
                <h2 className={styles.title}>
                  Saga Pattern: coordinar procesos distribuidos sin usar una transaccion gigante
                </h2>
                <p className={styles.lead}>
                  En microservicios ya no existe un rollback global sencillo. La consistencia se diseña con
                  transacciones locales y acciones compensatorias.
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
                    <p className={styles.sub}>El problema aparece cuando un proceso cruza varios servicios.</p>
                  </div>
                  <span className={styles.chip}>Saga</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{flowSnippet}</pre>
                  <pre>{failureQuestionSnippet}</pre>
                  <pre>{distributedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="no-2pc">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Por que no usar una transaccion distribuida</h3>
                    <p className={styles.sub}>Two-Phase Commit suena perfecto, pero no escala bien.</p>
                  </div>
                  <span className={styles.chip}>2PC</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{twoPhaseSnippet}</pre>
                  <pre>{twoPhaseProblemsSnippet}</pre>
                  <div className={styles.callout}>En microservicios normalmente evitamos transacciones distribuidas.</div>
                </div>
              </section>

              <section className={styles.section} id="consistency">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como mantenemos consistencia</h3>
                    <p className={styles.sub}>Varias transacciones pequeñas y compensaciones cuando algo falla.</p>
                  </div>
                  <span className={styles.chip}>Consistencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{consistencySnippet}</pre>
                  <div className={styles.quote}>No hacemos rollback. Hacemos una accion inversa.</div>
                </div>
              </section>

              <section className={styles.section} id="saga">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que es una Saga</h3>
                    <p className={styles.sub}>Una secuencia coordinada de transacciones locales.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{sagaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="happy-path">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Flujo ideal</h3>
                    <p className={styles.sub}>Todo confirma y el proceso termina bien.</p>
                  </div>
                  <span className={styles.chip}>Happy path</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{happyPathSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="failure">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Cuando aparece un fallo</h3>
                    <p className={styles.sub}>No siempre puedes deshacer tecnicamente lo que ya ocurrio.</p>
                  </div>
                  <span className={styles.chip}>Fallo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{failureSnippet}</pre>
                  <pre>{refundSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="compensation">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Acciones compensatorias</h3>
                    <p className={styles.sub}>Cada paso importante necesita una estrategia inversa.</p>
                  </div>
                  <span className={styles.chip}>Compensar</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{compensationSnippet}</pre>
                  <div className={styles.callout}>La compensacion tambien es una operacion de negocio.</div>
                </div>
              </section>

              <section className={styles.section} id="types">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Dos tipos de Saga</h3>
                    <p className={styles.sub}>Coreografia y orquestacion resuelven el mismo problema con tradeoffs distintos.</p>
                  </div>
                  <span className={styles.chip}>Tipos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Coreografia</h4>
                  <pre>{choreographySnippet}</pre>
                  <h4>Orquestacion</h4>
                  <pre>{orchestrationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="tradeoffs">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Cual es mejor</h3>
                    <p className={styles.sub}>Ninguna gana siempre. Depende del proceso.</p>
                  </div>
                  <span className={styles.chip}>Tradeoffs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{tradeoffsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>10. OrderFlow</h3>
                    <p className={styles.sub}>Si inventario falla despues del pago, el sistema compensa.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <div className={styles.quote}>El sistema termina consistente aunque no termine en exito.</div>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Errores tipicos</h3>
                    <p className={styles.sub}>Una Saga no promete exito; promete una salida consistente.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakesSnippet}</pre>
                  <pre>{missingCompensationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="events">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Relacion con Event-Driven</h3>
                    <p className={styles.sub}>Las Sagas suelen coordinarse con eventos.</p>
                  </div>
                  <span className={styles.chip}>Eventos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Mentalidad senior</h3>
                    <p className={styles.sub}>En distribuido no piensas solo en rollback; piensas en recuperacion.</p>
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
                    <h3>14. Mini ejercicio</h3>
                    <p className={styles.sub}>Disena las compensaciones del flujo completo de compra.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Que ocurre si falla el inventario?</li>
                    <li>Que acciones compensatorias hacen falta?</li>
                    <li>Quien iniciaria esas compensaciones?</li>
                    <li>Preferirias coreografia u orquestacion? Por que?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Cierre</h3>
                    <p className={styles.sub}>Asumir fallos y diseñar recuperacion es parte del oficio.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/121">
                      <span className={styles.kbd}>←</span> Dia 121
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/123">
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
