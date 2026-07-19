"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "use-cases", label: "2) Casos de uso" },
  { id: "actors", label: "3) Actores" },
  { id: "purchase-flow", label: "4) Flujo principal" },
  { id: "catalog", label: "5) UC-001" },
  { id: "order-create", label: "6) UC-002" },
  { id: "add-item", label: "7) UC-003" },
  { id: "confirm-order", label: "8) UC-004" },
  { id: "inventory", label: "9) UC-005" },
  { id: "payment", label: "10) UC-006" },
  { id: "complete-order", label: "11) UC-007" },
  { id: "failures", label: "12) Fallos y compensacion" },
  { id: "status", label: "13) Estados" },
  { id: "messages", label: "14) Comandos y eventos" },
  { id: "demo", label: "15) Demostracion" },
  { id: "acceptance", label: "16) Aceptacion" },
  { id: "deliverable", label: "17) Entregable" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `Ayer definimos:
por que OrderFlow
evolucionaria a microservicios

Hoy definimos:
que debe hacer el sistema
como demuestra valor
como sabremos que funciona

Primero:
casos de uso

Despues:
servicios`;

const centralIdeaSnippet = `Antes de disenar servicios
debemos definir
los comportamientos
que el negocio necesita.

Los microservicios
no son el objetivo.

El objetivo es implementar
correctamente
los casos de uso.`;

const useCaseDefinitionSnippet = `Un caso de uso describe:
una accion
que un actor quiere realizar
mediante el sistema

Ejemplos:
Consultar productos
Crear una orden
Confirmar una orden
Procesar un pago
Cancelar una compra

No es:
Insertar una fila
Llamar SaveChangesAsync`;

const structureSnippet = `Estructura minima:
Nombre
Actor
Objetivo
Precondiciones
Entrada
Flujo principal
Flujos alternativos
Errores posibles
Resultado esperado
Eventos producidos
Criterios de aceptacion`;

const actorsSnippet = `Cliente
- consultar productos
- crear orden
- agregar productos
- confirmar compra
- consultar estado
- cancelar si aplica

Administrador
- crear productos
- actualizar precios
- registrar inventario
- revisar ordenes

Proveedor de pagos
- aprobar
- rechazar
- tardar
- fallar

Operador
- revisar logs
- revisar metricas
- revisar DLQ
- reintentar operaciones`;

const purchaseFlowSnippet = `Consultar producto
↓
Crear orden
↓
Agregar productos
↓
Confirmar orden
↓
Reservar inventario
↓
Procesar pago
↓
Completar orden
↓
Enviar notificacion

Cada paso puede:
completarse
fallar
tardar
repetirse
necesitar compensacion`;

const catalogSnippet = `UC-001 Consultar catalogo

GET /api/catalog/products?page=1&pageSize=20

Flujo:
1. Cliente solicita productos
2. Gateway enruta a Catalog
3. Catalog consulta su DB
4. Devuelve una pagina

Criterios:
- solo productos activos
- respuesta paginada
- precio lo resuelve Catalog
- la peticion lleva TraceId`;

const createOrderSnippet = `UC-002 Crear una orden

Entrada:
{ customerId }

Flujo:
1. Orders valida datos
2. Crea orden Draft
3. Guarda en OrdersDb
4. Devuelve orderId

Reglas:
- id unico
- estado Draft
- total inicial 0
- no reserva inventario
- no llama Payments`;

const addItemSnippet = `UC-003 Agregar producto

Orders consulta Catalog
para traer:
nombre actual
precio actual

Orders guarda historico:
ProductId
ProductNameAtPurchase
UnitPriceAtPurchase
Quantity

Regla clave:
la orden no depende
del precio futuro del catalogo`;

const confirmOrderSnippet = `UC-004 Confirmar orden

Precondiciones:
- orden existe
- estado Draft
- tiene productos
- total > 0

Flujo:
1. Orders valida
2. Estado -> PendingProcessing
3. Guarda orden
4. Registra OrderConfirmed en Outbox
5. Confirma transaccion

Respuesta sugerida:
202 Accepted`;

const inventorySnippet = `UC-005 Reservar inventario

Entrada:
OrderConfirmed

Flujo:
1. Inventory recibe evento
2. Verifica MessageId
3. Revisa stock disponible
4. Crea reserva
5. Reduce disponible
6. Aumenta reservado
7. Publica InventoryReserved

Si falla:
InventoryReservationFailed`;

const paymentSnippet = `UC-006 Procesar pago

Entrada:
PaymentRequested

Flujo:
1. Payments comprueba idempotencia
2. Crea PaymentAttempt
3. Llama proveedor externo
4. Guarda resultado
5. Publica PaymentApproved o PaymentRejected

Errores tecnicos:
timeout
conexion rechazada
HTTP 503

Errores de negocio:
tarjeta rechazada
fondos insuficientes`;

const completeOrderSnippet = `UC-007 Completar orden

Precondiciones:
- inventario reservado
- pago aprobado
- orden no completada

Flujo:
1. Orders recibe PaymentApproved
2. Valida estado actual
3. Cambia a Completed
4. Publica OrderCompleted

Consumidores posibles:
Notifications
Audit
Analytics
Inventory`;

const failuresSnippet = `UC-008 Inventario insuficiente
OrderConfirmed
↓
InventoryReservationFailed
↓
Orders -> Cancelled

UC-009 Pago rechazado
PaymentRejected
↓
ReleaseInventory
↓
InventoryReleased
↓
Orders -> PaymentFailed

Compensar
no es deshacer una transaccion.
Es ejecutar una accion correctiva.`;

const statusSnippet = `Estados iniciales:
Draft
PendingProcessing
InventoryReservationFailed
PaymentProcessing
PaymentFailed
Completed
Cancelled

Transiciones validas:
Draft -> PendingProcessing
PendingProcessing -> PaymentProcessing
PaymentProcessing -> Completed
PendingProcessing -> InventoryReservationFailed
PaymentProcessing -> PaymentFailed
Draft -> Cancelled

Nunca:
Completed -> Draft
Cancelled -> PaymentProcessing`;

const messagesSnippet = `Comando:
expresa intencion

ReserveInventory
ProcessPayment
ReleaseInventory
CompleteOrder

Evento:
expresa algo ocurrido

InventoryReserved
PaymentApproved
InventoryReleased
OrderCompleted

Mapa inicial:
OrderConfirmed
↓
ReserveInventory
↓
InventoryReserved
↓
PaymentRequested
↓
PaymentApproved
↓
OrderCompleted`;

const demoSnippet = `Demostraciones esperadas:

1. Compra exitosa
- Completed
- pago approved
- notificacion enviada

2. Inventario insuficiente
- no se publica PaymentRequested

3. Pago rechazado
- se libera inventario
- orden PaymentFailed

4. RabbitMQ caido
- Outbox conserva el evento

5. Mensaje duplicado
- un solo efecto de negocio

6. Mensaje invalido
- reintentos
- DLQ

7. Payment lento
- timeout
- retry limitado
- circuit breaker

8. Notification caido
- la orden sigue Completed

9. Trazabilidad distribuida
- seguir TraceId extremo a extremo

10. Reinicio del consumidor
- no repetir efecto tras redelivery`;

const acceptanceSnippet = `Aceptacion global:

Funcionalidad
- casos de uso funcionan
- reglas se respetan
- estados coherentes

Confiabilidad
- eventos no se pierden
- duplicados no duplican efectos
- errores permanentes -> DLQ
- compensaciones restauran coherencia

Resiliencia
- proveedor lento no colapsa todo
- Notification puede caer
- RabbitMQ puede volver

Observabilidad
- logs estructurados
- CorrelationId
- metricas
- trazas distribuidas`;

const deliverableSnippet = `Entregable principal:
docs/orderflow/USE_CASES.md

Incluir:
- descripcion de cada caso de uso
- actor
- precondiciones
- entrada
- flujo principal
- flujos alternativos
- resultado esperado
- eventos
- criterios de aceptacion

Y una matriz resumen:
Codigo
Caso de uso
Servicio principal
Tipo`;

const closingSnippet = `Backend junior:
primero crea microservicios
y despues ve que hacen

Backend senior:
primero define comportamientos
errores
resultados esperados

Despues disena
los servicios que deben ejecutarlos.`;

export default function Daily134Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/133";
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
              <div className={styles.brandSub}>Casos de uso y demostracion esperada para OrderFlow</div>
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
            <Link className={styles.btn} href="/daily/133">
              <span className={styles.kbd}>←</span> Dia 133
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/calendar">
              Ver calendario <span className={styles.kbd}>→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>18/07/2026</div>
                <div className={styles.badge}>Daily #134 • OrderFlow Use Cases</div>
                <h2 className={styles.title}>Definir los casos de uso y la demostracion esperada de OrderFlow</h2>
                <p className={styles.lead}>
                  Antes de separar servicios, esta clase fija el comportamiento real del sistema: actores,
                  precondiciones, comandos, eventos, estados, compensaciones y la demostracion final que debera pasar
                  OrderFlow.
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
                    <p className={styles.sub}>Antes de disenar microservicios, debemos definir exactamente que debe hacer el sistema.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{centralIdeaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="use-cases">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es un caso de uso</h3>
                    <p className={styles.sub}>El caso de uso representa una capacidad del negocio, no un detalle de infraestructura.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{useCaseDefinitionSnippet}</pre>
                  <pre>{structureSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="actors">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Actores de OrderFlow</h3>
                    <p className={styles.sub}>Los casos de uso se definen desde quienes interactuan con el sistema y que esperan de el.</p>
                  </div>
                  <span className={styles.chip}>Actores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{actorsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="purchase-flow">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Flujo general de compra</h3>
                    <p className={styles.sub}>El flujo parece lineal, pero en distribuido cada paso puede fallar, repetirse o compensarse.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{purchaseFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="catalog">
                <div className={styles.shd}>
                  <div>
                    <h3>5. UC-001 Consultar productos</h3>
                    <p className={styles.sub}>Catalog entrega el primer paso del flujo sin exponer detalles internos de su persistencia.</p>
                  </div>
                  <span className={styles.chip}>UC-001</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{catalogSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="order-create">
                <div className={styles.shd}>
                  <div>
                    <h3>6. UC-002 Crear una orden</h3>
                    <p className={styles.sub}>La orden nace vacia, en Draft y sin disparar todavia inventario ni pagos.</p>
                  </div>
                  <span className={styles.chip}>UC-002</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{createOrderSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="add-item">
                <div className={styles.shd}>
                  <div>
                    <h3>7. UC-003 Agregar producto a la orden</h3>
                    <p className={styles.sub}>Orders consulta Catalog, pero conserva un snapshot historico para no depender del precio futuro.</p>
                  </div>
                  <span className={styles.chip}>UC-003</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{addItemSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="confirm-order">
                <div className={styles.shd}>
                  <div>
                    <h3>8. UC-004 Confirmar orden</h3>
                    <p className={styles.sub}>La API acepta el procesamiento y delega el resto del flujo a eventos y componentes posteriores.</p>
                  </div>
                  <span className={styles.chip}>UC-004</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{confirmOrderSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="inventory">
                <div className={styles.shd}>
                  <div>
                    <h3>9. UC-005 Reservar inventario</h3>
                    <p className={styles.sub}>Inventory debe ser idempotente, transaccional y capaz de fallar sin corromper stock.</p>
                  </div>
                  <span className={styles.chip}>UC-005</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{inventorySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="payment">
                <div className={styles.shd}>
                  <div>
                    <h3>10. UC-006 Procesar pago</h3>
                    <p className={styles.sub}>Payments debe diferenciar errores temporales de negocio y evitar cobros duplicados.</p>
                  </div>
                  <span className={styles.chip}>UC-006</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="complete-order">
                <div className={styles.shd}>
                  <div>
                    <h3>11. UC-007 Completar orden</h3>
                    <p className={styles.sub}>Solo se completa la orden cuando las condiciones previas ya sucedieron y quedaron confirmadas.</p>
                  </div>
                  <span className={styles.chip}>UC-007</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{completeOrderSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="failures">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Fallos de negocio y compensacion</h3>
                    <p className={styles.sub}>La arquitectura distribuida exige resultados coherentes incluso cuando una parte del flujo falla.</p>
                  </div>
                  <span className={styles.chip}>Compensacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{failuresSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="status">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Estados y transiciones</h3>
                    <p className={styles.sub}>Los estados deben ser pocos, coherentes y con transiciones permitidas claramente definidas.</p>
                  </div>
                  <span className={styles.chip}>Estados</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{statusSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="messages">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Comandos, eventos y mapa de mensajes</h3>
                    <p className={styles.sub}>Separar intenciones de hechos evita contratos confusos y ayuda a modelar el flujo distribuido.</p>
                  </div>
                  <span className={styles.chip}>Mensajes</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{messagesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="demo">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Demostracion final esperada</h3>
                    <p className={styles.sub}>No basta con compilar. Hay que poder repetir escenarios reales y observar el resultado correcto.</p>
                  </div>
                  <span className={styles.chip}>Demo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{demoSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="acceptance">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Criterios globales de aceptacion</h3>
                    <p className={styles.sub}>La validacion final mezcla funcionalidad, confiabilidad, resiliencia y observabilidad.</p>
                  </div>
                  <span className={styles.chip}>Aceptacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{acceptanceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="deliverable">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Entregable del dia</h3>
                    <p className={styles.sub}>El documento de casos de uso fija el alcance real antes de abrir nuevos proyectos o extraer servicios.</p>
                  </div>
                  <span className={styles.chip}>Entregable</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deliverableSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>Primero definimos valor y comportamiento. Despues decidimos que servicios lo implementan.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/133">
                      <span className={styles.kbd}>←</span> Dia 133
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
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
