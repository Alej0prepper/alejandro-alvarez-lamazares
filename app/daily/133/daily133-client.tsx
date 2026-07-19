"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "current-state", label: "2) Estado actual" },
  { id: "monolith", label: "3) Monolito" },
  { id: "business-scenario", label: "4) Escenario" },
  { id: "payments", label: "5) Payments" },
  { id: "scaling", label: "6) Escalado" },
  { id: "deploys", label: "7) Despliegues" },
  { id: "teams", label: "8) Equipos" },
  { id: "notifications", label: "9) Desacople" },
  { id: "inventory", label: "10) Inventory" },
  { id: "tracing", label: "11) Trazabilidad" },
  { id: "goals", label: "12) Objetivos" },
  { id: "costs", label: "13) Costes" },
  { id: "decision", label: "14) Decision" },
  { id: "migration", label: "15) Migracion" },
  { id: "success", label: "16) Exito" },
  { id: "deliverable", label: "17) Entregable" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `Microservicios
RabbitMQ
Event-Driven
Saga
Outbox
Idempotencia
DLQ
Consistencia eventual
Resiliencia
Observabilidad

Pregunta real:
por que OrderFlow
necesita microservicios?`;

const centralIdeaSnippet = `Los microservicios
no son el punto de partida.

Son una respuesta
a problemas
que una arquitectura mas sencilla
ya no resuelve comodamente.`;

const currentStateSnippet = `Cliente
↓
OrderFlow API
↓
PostgreSQL

Dentro del mismo proceso:
Products
Orders
Payments
Audit`;

const monolithSnippet = `El monolito permitio:
desarrollar rapido
comprender el dominio
evitar infraestructura innecesaria
usar transacciones locales
depurar facil
modificar varios modulos en un flujo

OrderFlow debia comenzar
como una aplicacion unica.`;

const businessScenarioSnippet = `Antes:
100 ordenes diarias

Nuevo cliente:
10 000 ordenes diarias

Campanas:
50 000 ordenes diarias

Ademas exige:
catalogo grande
inventario real
pasarela externa
correos
auditoria
trazabilidad
tolerancia a fallos`;

const paymentsSnippet = `OrderFlow
↓
Proveedor de pagos

Puede:
responder lento
rechazar
timeout
caerse
confirmar mas tarde
duplicar notificaciones

Payments necesita
aislamiento de fallos
y ciclo de evolucion distinto.`;

const scalingSnippet = `Catalog
5000 consultas/min

Orders
500 creaciones/min

Payments
300 operaciones/min

Notifications
1000 mensajes pendientes

Escalar todo el monolito
para un solo cuello de botella
es desperdicio.`;

const deploysSnippet = `Cambiar una plantilla de email
↓
en monolito implica desplegar:
Products
Orders
Payments
Audit
Notifications

Con servicio propio:
desplegar Notification
sin tocar Orders ni Payments.`;

const teamsSnippet = `Equipo Catalog
Equipo Orders
Equipo Payments
Equipo Platform

Problemas con un solo proyecto:
conflictos Git
despliegues coordinados
cambios cruzados
propiedad difusa

Cada servicio debe poder tener:
codigo
datos
despliegue
operacion`;

const notificationsSnippet = `No queremos:
Crear orden
↓
Esperar pago
↓
Esperar inventario
↓
Esperar email
↓
Esperar analitica
↓
Responder

Mejor:
OrderCompleted
↓
RabbitMQ
↓
Notification Service`;

const inventorySnippet = `Inventory ya no es
una columna simple.

Necesita:
stock disponible
stock reservado
stock comprometido
stock en transito

Orders solicita:
ReserveInventory

Inventory responde:
InventoryReserved
o
InventoryReservationFailed`;

const tracingSnippet = `Gateway
↓
Orders
↓
Inventory
↓
Payments
↓
Notifications

Necesitamos:
TraceId
CorrelationId
Logs estructurados
Metricas
Trazas distribuidas`;

const goalsSnippet = `La migracion busca:
escalado independiente
despliegues independientes
aislamiento de fallos
propiedad clara de datos
autonomia de equipos
procesamiento asincrono
resiliencia externa
observabilidad completa`;

const costsSnippet = `Tambien introduce:
llamadas de red
latencia
fallos parciales
consistencia eventual
mensajes duplicados
contratos entre servicios
varias bases
despliegues independientes
observabilidad distribuida
mas complejidad operativa

Los microservicios
no eliminan complejidad.
La redistribuyen.`;

const decisionSnippet = `Contextos iniciales:
Catalog
Orders
Inventory
Payments
Notifications

No se extraen todos a la vez.

Monolito actual
↓
Definir limites
↓
Extraer un servicio
↓
Validar
↓
Extraer el siguiente`;

const migrationSnippet = `No microservicio por entidad.

Mal:
Product Service
Category Service
OrderItem Service

Bien:
Catalog
Orders
Payments

Alternativa valida:
monolito modular

Pero el escenario exige
independencia operativa.`;

const successSnippet = `Exito significa demostrar:
Catalog escala solo
Notification caido no bloquea ordenes
Payments despliega solo
cada servicio controla su DB
Outbox evita perder eventos
idempotencia soporta duplicados
compensacion libera reservas
TraceId sigue la operacion completa`;

const deliverableSnippet = `docs/orderflow/ARCHITECTURE_EVOLUTION.md

1. Contexto actual
2. Estado del monolito
3. Nuevo escenario de negocio
4. Limitaciones detectadas
5. Alternativas consideradas
6. Decision arquitectonica
7. Riesgos
8. Estrategia de migracion
9. Criterios de exito
10. Condiciones para detener o revertir`;

const stopSnippet = `Detener la migracion si:
no aporta autonomia real
el equipo no puede operar varios servicios
la infraestructura consume mas que el negocio
los limites siguen confusos
la observabilidad es insuficiente
el coste operativo supera el beneficio`;

const exerciseSnippet = `Antes de escribir codigo:
1. Que problema concreto tiene el monolito?
2. Que modulo necesita escalar solo?
3. Que fallo deberia quedar aislado?
4. Que modulo desplegarias con mas frecuencia?
5. Que equipo seria dueno de cada servicio?
6. Que datos controlaria cada uno?
7. Que procesos deben ser asincronos?
8. Que indicadores demostraran exito?
9. Que complejidad nueva operaras?
10. Que pasa si mantienes un monolito modular?`;

const closingSnippet = `No vamos a crear microservicios
para tener mas proyectos.

Vamos a usarlos
solo si el escenario de negocio
exige independencia operativa,
aislamiento de fallos
y capacidad real de evolucion.`;

export default function Daily133Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/132";
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
              <div className={styles.brandSub}>La razon de negocio para evolucionar OrderFlow</div>
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
            <Link className={styles.btn} href="/daily/132">
              <span className={styles.kbd}>←</span> Dia 132
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
                <div className={styles.createdAt}>17/07/2026</div>
                <div className={styles.badge}>Daily #133 • OrderFlow Evolution</div>
                <h2 className={styles.title}>La razon de negocio: por que vamos a convertir OrderFlow en microservicios</h2>
                <p className={styles.lead}>
                  Esta clase abre el bloque practico de implementacion sobre OrderFlow. Antes de extraer servicios o
                  introducir RabbitMQ, deja claro por que una separacion fisica estaria justificada y que costes traerá.
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
                    <p className={styles.sub}>Los microservicios solo son validos cuando responden a un problema real del negocio.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{centralIdeaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="current-state">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Situacion actual de OrderFlow</h3>
                    <p className={styles.sub}>Para el tamano inicial del proyecto, un solo proceso y una sola base eran una decision correcta.</p>
                  </div>
                  <span className={styles.chip}>Actual</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{currentStateSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="monolith">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El monolito no es el problema</h3>
                    <p className={styles.sub}>No migramos porque el monolito este mal, sino porque imaginamos un contexto nuevo.</p>
                  </div>
                  <span className={styles.chip}>Monolito</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{monolithSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="business-scenario">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Nuevo escenario de negocio</h3>
                    <p className={styles.sub}>La necesidad de independencia nace de volumen, integraciones y exigencias operativas nuevas.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{businessScenarioSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="payments">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Payments como primera fuente de tension</h3>
                    <p className={styles.sub}>Una integracion externa lenta o caida no deberia degradar toda la aplicacion.</p>
                  </div>
                  <span className={styles.chip}>Payments</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="scaling">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Diferencias de carga</h3>
                    <p className={styles.sub}>Cada modulo sigue un patron de trafico distinto y no deberia escalarse en bloque.</p>
                  </div>
                  <span className={styles.chip}>Escalado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{scalingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="deploys">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Los despliegues estan acoplados</h3>
                    <p className={styles.sub}>Un cambio menor en Notification no deberia requerir tocar Payments u Orders.</p>
                  </div>
                  <span className={styles.chip}>Deploys</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deploysSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="teams">
                <div className={styles.shd}>
                  <div>
                    <h3>8. El equipo esta creciendo</h3>
                    <p className={styles.sub}>La arquitectura tambien debe permitir autonomia organizacional, no solo tecnica.</p>
                  </div>
                  <span className={styles.chip}>Equipos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{teamsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="notifications">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Las notificaciones no deben bloquear ventas</h3>
                    <p className={styles.sub}>Las funciones secundarias deben desacoplarse del flujo critico de compra.</p>
                  </div>
                  <span className={styles.chip}>Desacople</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notificationsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="inventory">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Inventory debe ser una autoridad propia</h3>
                    <p className={styles.sub}>El stock ya no es una columna simple; se convierte en un dominio con reglas propias.</p>
                  </div>
                  <span className={styles.chip}>Inventory</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{inventorySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="tracing">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Necesitamos trazabilidad distribuida</h3>
                    <p className={styles.sub}>Separar componentes obliga a poder seguir el flujo completo entre ellos.</p>
                  </div>
                  <span className={styles.chip}>Trazabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{tracingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="goals">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Problemas que queremos resolver</h3>
                    <p className={styles.sub}>La separacion solo se justifica si produce mejoras operativas verificables.</p>
                  </div>
                  <span className={styles.chip}>Objetivos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{goalsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="costs">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Problemas que vamos a introducir</h3>
                    <p className={styles.sub}>Los microservicios no eliminan complejidad; la redistribuyen.</p>
                  </div>
                  <span className={styles.chip}>Costes</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{costsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="decision">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Decision arquitectonica</h3>
                    <p className={styles.sub}>La evolucion sera gradual, por capacidades del negocio y no por tablas.</p>
                  </div>
                  <span className={styles.chip}>Decision</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{decisionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="migration">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Estrategia de migracion</h3>
                    <p className={styles.sub}>La alternativa del monolito modular sigue siendo valida; la razon aqui es la independencia operativa.</p>
                  </div>
                  <span className={styles.chip}>Migracion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{migrationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="success">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Criterios de exito</h3>
                    <p className={styles.sub}>No bastara con tener mas proyectos; la migracion debe demostrar mejoras concretas.</p>
                  </div>
                  <span className={styles.chip}>Exito</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{successSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="deliverable">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Entregable del dia</h3>
                    <p className={styles.sub}>Antes de extraer servicios, primero se documenta la decision y sus condiciones de reversa.</p>
                  </div>
                  <span className={styles.chip}>Entregable</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deliverableSnippet}</pre>
                  <pre>{stopSnippet}</pre>
                  <pre>{exerciseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>La separacion fisica solo se justifica cuando aporta mas valor que la complejidad operativa que introduce.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/132">
                      <span className={styles.kbd}>←</span> Dia 132
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
