"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "meaning", label: "2) Consistencia eventual" },
  { id: "example", label: "3) Ejemplo" },
  { id: "strong-vs-eventual", label: "4) Fuerte vs eventual" },
  { id: "why", label: "5) Por que" },
  { id: "window", label: "6) Ventana" },
  { id: "tolerance", label: "7) Tolerancia" },
  { id: "control", label: "8) Control" },
  { id: "process-state", label: "9) Estados" },
  { id: "ux", label: "10) UX" },
  { id: "read-your-own-writes", label: "11) RYOW" },
  { id: "inventory", label: "12) Inventario" },
  { id: "truth", label: "13) Source of Truth" },
  { id: "ordering", label: "14) Orden y reconciliacion" },
  { id: "patterns", label: "15) Patrones" },
  { id: "observability", label: "16) Observabilidad" },
  { id: "when", label: "17) Cuando" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `Crear orden
↓
Descontar inventario
↓
Procesar pago
↓
Generar factura
↓
Enviar correo
↓
Responder`;

const distributedSnippet = `Order Service
Payment Service
Inventory Service
Invoice Service
Notification Service

No actualizan sus datos al mismo tiempo.`;

const meaningSnippet = `Consistencia eventual

Diferentes partes del sistema
pueden mostrar temporalmente
informacion distinta,
pero terminan convergiendo.`;

const exampleSnippet = `Order = Confirmed
Inventory = sin reservar
Payment = pendiente
Email = sin enviar

Despues:
Order = Paid
Inventory = Reserved
Payment = Approved
Email = Sent`;

const strongSnippet = `Consistencia fuerte
↓
todos ven el cambio inmediatamente

Consistencia eventual
↓
todos terminan viendolo`;

const whySnippet = `Orders DB
Payments DB
Inventory DB

No existe una transaccion local
que modifique las tres a la vez.

Se usan:
transacciones locales
eventos
compensaciones`;

const windowSnippet = `10:00:00 OrderCreated
10:00:01 evento publicado
10:00:03 Inventory reservado
10:00:04 Payment iniciado
10:00:06 Payment aprobado

La diferencia temporal
es la ventana de inconsistencia.`;

const toleranceSnippet = `Analytics
↓
puede tolerar minutos

Email
↓
puede tardar segundos

Inventario critico
↓
tolera mucho menos`;

const controlSnippet = `No basta decir:
Es eventual. Ya se arreglara.

Debe existir:
entrega confiable
reintentos
idempotencia
monitoreo
reconciliacion
errores permanentes
SLO de convergencia`;

const processStateSnippet = `Pending
Processing
Completed
Failed
Compensating
Cancelled

En proceso es un estado legitimo.`;

const acceptedSnippet = `POST /orders/123/pay
↓
202 Accepted

{
  "orderId": "123",
  "status": "PaymentProcessing"
}`;

const uxSnippet = `Mala UX
↓
La orden no esta pagada
sin explicacion

Mejor UX
↓
Estamos confirmando tu pago.
No vuelvas a realizar la operacion.`;

const ryowSnippet = `Read-your-own-writes

1. devolver el resultado en POST
2. leer temporalmente desde write model
3. mostrar estado local "Sincronizando"`;

const inventorySnippet = `Stock = 1

Dos usuarios leen Stock = 1

La lectura previa no debe ser la autoridad final.

Operacion segura:
ReserveInventory`;

const truthSnippet = `Product Service
=
precio oficial actual

Order Service
=
UnitPriceAtPurchase

Copiar datos puede ser correcto
si esta claro quien manda.`;

const orderingSnippet = `Eventos fuera de orden
↓
PaymentApproved
OrderConfirmed
OrderCancelled

Estrategias
ignorar antiguos
esperar faltantes
operaciones conmutativas
reconstruir desde la fuente oficial`;

const reconcileSnippet = `Reconciliacion

Orders pagadas
vs
Payments aprobados

Si hay diferencias:
republicar
corregir
alertar
compensar`;

const reconcileWorkerSnippet = `Worker cada 10 minutos
↓
Buscar pagos aprobados sin orden pagada
↓
Corregir o alertar

No sustituye la mensajeria correcta.
Protege frente a errores excepcionales.`;

const patternsSnippet = `Outbox
↓
evita evento perdido

Idempotencia
↓
soporta duplicados

DLQ
↓
marca inconsistencia potencial

Saga
↓
lleva el flujo a Completed o Compensated`;

const rabbitSnippet = `RabbitMQ entrega mensajes.

No decide:
que estado es correcto
como compensar
como reconciliar
que hacer con duplicados
cuanto retraso acepta el negocio`;

const replicationSnippet = `Notification Service
puede necesitar:
OrderId
CustomerEmail
Total

No necesita copiar
todo el modelo de Order.`;

const observabilitySnippet = `Medir:
edad del mensaje mas antiguo
cantidad de eventos pendientes
tamanio de colas
mensajes en DLQ
tiempo medio de convergencia
ordenes en Processing > 5 min

Objetivo:
95% convergen en menos de 5 segundos`;

const convergenceSnippet = `OrderCreated: 10:00:00
InventoryUpdated: 10:00:02
AnalyticsUpdated: 10:00:07
EmailSent: 10:00:10

Tiempo maximo de convergencia:
10 segundos`;

const whenSnippet = `Usar consistencia fuerte
saldo critico
inventario atomico
identificadores unicos
restricciones del aggregate

Aceptar consistencia eventual
emails
analitica
buscadores
reportes
notificaciones
sincronizacion entre servicios`;

const acceptedResponseSnippet = `Malo
↓
200 OK - Pago completado
cuando solo enviamos el mensaje

Mejor
↓
202 Accepted - Pago en procesamiento`;

const exerciseSnippet = `Flujo:
OrderCreated
PaymentApproved
InventoryReserved
InvoiceGenerated
EmailSent

1. Fuente de verdad de cada dato?
2. Estados intermedios?
3. Retraso tolerable por paso?
4. Que devuelve la API mientras procesa?
5. Que pasa si Inventory tarda 30 s?
6. Como detectas que nunca convergio?
7. Que reconciliacion crearias?
8. Que metricas pondrias en dashboard?
9. Que podria terminar en DLQ?
10. Que parte necesita consistencia fuerte?`;

const closingSnippet = `La consistencia eventual
no consiste en permitir datos incorrectos.

Consiste en aceptar estados
temporalmente distintos
mientras existen mecanismos
confiables para converger.`;

export default function Daily128Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/127";
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
              <div className={styles.brandSub}>Consistencia eventual y convergencia confiable</div>
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
            <Link className={styles.btn} href="/daily/127">
              <span className={styles.kbd}>←</span> Dia 127
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/129">
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
                <div className={styles.createdAt}>12/07/2026</div>
                <div className={styles.badge}>Daily #128 • Eventual Consistency</div>
                <h2 className={styles.title}>Consistencia eventual en profundidad: como disenar sistemas donde los datos no cambian al mismo tiempo</h2>
                <p className={styles.lead}>
                  En sistemas distribuidos no todo cambia a la vez. La clave no es fingir sincronizacion instantanea,
                  sino disenar estados intermedios, convergencia confiable y observabilidad suficiente para detectar cuando no ocurre.
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
                    <p className={styles.sub}>Un sistema distribuido puede estar correcto aunque no todo refleje el cambio al mismo tiempo.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{distributedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es consistencia eventual</h3>
                    <p className={styles.sub}>No es sincronizacion instantanea; es convergencia confiable.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{meaningSnippet}</pre>
                  <div className={styles.callout}>Si no hay nuevos cambios y el sistema sigue sano, todas las partes deben terminar reflejando el mismo resultado.</div>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo sencillo</h3>
                    <p className={styles.sub}>Durante unos segundos puede haber estados distintos sin que el sistema este roto.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exampleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="strong-vs-eventual">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Fuerte vs eventual</h3>
                    <p className={styles.sub}>La diferencia principal es el momento en que todos ven el cambio.</p>
                  </div>
                  <span className={styles.chip}>Comparacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{strongSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="why">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Por que aparece en microservicios</h3>
                    <p className={styles.sub}>Cada servicio tiene su propia base y sus propias transacciones.</p>
                  </div>
                  <span className={styles.chip}>Microservicios</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="window">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Ventana de inconsistencia</h3>
                    <p className={styles.sub}>La pregunta correcta no es si existe, sino cuanto dura y si el negocio la tolera.</p>
                  </div>
                  <span className={styles.chip}>Ventana</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{windowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="tolerance">
                <div className={styles.shd}>
                  <div>
                    <h3>7. No todos los datos toleran lo mismo</h3>
                    <p className={styles.sub}>El dominio define cuanto retraso es aceptable.</p>
                  </div>
                  <span className={styles.chip}>Negocio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{toleranceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="control">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Eventual no significa falta de control</h3>
                    <p className={styles.sub}>Debe existir una ruta clara hacia la convergencia.</p>
                  </div>
                  <span className={styles.chip}>Control</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{controlSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="process-state">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Estado de proceso vs estado final</h3>
                    <p className={styles.sub}>En proceso tambien es un estado valido del dominio.</p>
                  </div>
                  <span className={styles.chip}>Estados</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{processStateSnippet}</pre>
                  <pre>{acceptedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ux">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como disenar una buena UX</h3>
                    <p className={styles.sub}>La interfaz debe explicar los estados intermedios para evitar acciones duplicadas.</p>
                  </div>
                  <span className={styles.chip}>UX</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{uxSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="read-your-own-writes">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Read-your-own-writes</h3>
                    <p className={styles.sub}>El usuario que escribe deberia poder ver su cambio aunque la proyeccion siga actualizandose.</p>
                  </div>
                  <span className={styles.chip}>RYOW</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ryowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="inventory">
                <div className={styles.shd}>
                  <div>
                    <h3>12. El problema del inventario</h3>
                    <p className={styles.sub}>Una lectura desactualizada nunca debe ser la autoridad final en datos criticos.</p>
                  </div>
                  <span className={styles.chip}>Inventario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{inventorySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="truth">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Source of Truth</h3>
                    <p className={styles.sub}>Puede haber copias de un dato, pero debe estar claro quien manda.</p>
                  </div>
                  <span className={styles.chip}>Truth</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{truthSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ordering">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Eventos fuera de orden y reconciliacion</h3>
                    <p className={styles.sub}>Cuando la convergencia automatica falla, la reconciliacion es la red de seguridad.</p>
                  </div>
                  <span className={styles.chip}>Ordering</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderingSnippet}</pre>
                  <pre>{reconcileSnippet}</pre>
                  <pre>{reconcileWorkerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="patterns">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Relacion con otros patrones</h3>
                    <p className={styles.sub}>Outbox, idempotencia, DLQ y Sagas sostienen la convergencia.</p>
                  </div>
                  <span className={styles.chip}>Patrones</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{patternsSnippet}</pre>
                  <pre>{rabbitSnippet}</pre>
                  <pre>{replicationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="observability">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Observabilidad y tiempo de convergencia</h3>
                    <p className={styles.sub}>No solo importa si converge, tambien cuanto tarda y cuando deja de converger.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{observabilitySnippet}</pre>
                  <pre>{convergenceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="when">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Cuando usar fuerte y cuando aceptar eventual</h3>
                    <p className={styles.sub}>La consistencia fuerte sigue existiendo dentro de cada servicio; la eventual se acepta donde el negocio lo tolera.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whenSnippet}</pre>
                  <pre>{acceptedResponseSnippet}</pre>
                  <pre>{exerciseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>La consistencia eventual cambia el momento y el mecanismo, no la necesidad de consistencia.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/127">
                      <span className={styles.kbd}>←</span> Dia 127
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/129">
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
