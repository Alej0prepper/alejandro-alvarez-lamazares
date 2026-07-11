"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "meaning", label: "2) CQRS" },
  { id: "command", label: "3) Command" },
  { id: "query", label: "4) Query" },
  { id: "without", label: "5) Sin CQRS" },
  { id: "with", label: "6) Con CQRS" },
  { id: "why", label: "7) Por que" },
  { id: "example", label: "8) Ejemplo" },
  { id: "read-models", label: "9) Read Models" },
  { id: "orderflow", label: "10) OrderFlow" },
  { id: "databases", label: "11) Bases" },
  { id: "events", label: "12) Eventos" },
  { id: "mistake", label: "13) Error" },
  { id: "when", label: "14) Cuando" },
  { id: "ddd", label: "15) DDD" },
  { id: "thinking", label: "16) Mentalidad" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `POST /orders
GET /orders
PUT /orders/{id}
DELETE /orders/{id}

Mismas entidades
mismos repositorios
mismo modelo de datos`;

const readWriteSnippet = `Leemos muchisimo
↓
Escribimos muy poco

O al reves.

Aqui aparece CQRS.`;

const meaningSnippet = `Command Query Responsibility Segregation

Separacion de responsabilidades
entre operaciones de escritura
y operaciones de lectura.`;

const commandSnippet = `CreateOrder
CancelOrder
ApprovePayment
CreateProduct

Un Command modifica el sistema.`;

const querySnippet = `GetOrder
SearchProducts
ListOrders
GetDashboard

Una Query consulta informacion.
No debe producir efectos secundarios.`;

const withoutSnippet = `OrderRepository
↓
Crear
Editar
Buscar
Listar
Dashboard
Reportes

Un unico modelo intenta resolver todo.`;

const writePathSnippet = `Escritura

Controller
↓
Command
↓
Domain
↓
Repository
↓
Base de Datos`;

const readPathSnippet = `Lectura

Controller
↓
Query
↓
Read Model
↓
Base de Datos`;

const whySnippet = `Escribir necesita:
reglas de negocio
validaciones
invariantes
transacciones

Leer necesita:
velocidad
filtros
joins
agregaciones`;

const exampleSnippet = `Crear orden
↓
Cliente
Productos
Stock
Reglas
Pago

Listar ordenes
↓
Numero
Fecha
Cliente
Estado
Total`;

const readModelsSnippet = `OrderSummary
OrderDashboard
ProductListItem

No representan el dominio.
Representan exactamente
lo que necesita la pantalla.`;

const orderflowSnippet = `Pantalla:
Mis ordenes

No necesita:
lineas completas
reglas
entidades
aggregates

Solo:
OrderNumber
Date
Status
Total`;

const oneDbSnippet = `Una BD
↓
Modelo escritura
↓
Modelo lectura`;

const twoDbSnippet = `BD Escritura
↓
Eventos
↓
BD Lectura`;

const eventsSnippet = `OrderCreated
↓
OrderDashboard
OrderHistory
Statistics

CQRS y Event-Driven
trabajan perfectamente juntos.`;

const mistakeSnippet = `CRUD
↓
4 pantallas
↓
2 desarrolladores

Commands
Queries
Bus
Eventos
Read Models
Projection Workers

Complejidad innecesaria.`;

const whenSnippet = `CQRS aporta valor cuando hay:

muchisimas consultas
dashboards complejos
reportes
analitica
lectura mayor que escritura
modelos de lectura distintos del dominio`;

const dddSnippet = `Aggregate:
Order

Se usa para:
Commands

Queries:
Read Models

El dominio protege la escritura.
La lectura puede ser mas flexible.`;

const thinkingSnippet = `Backend junior:
Uso la misma entidad para todo.

Backend senior:
La lectura
y
la escritura
tienen necesidades distintas.`;

const exerciseSnippet = `OrderFlow tiene:

Crear Orden
Mis Ordenes
Dashboard de Ventas
Reporte Mensual
Detalle de Orden

Clasifica:
Commands
Queries
Read Models

1. Que pantallas necesitan reglas de negocio?
2. Que pantallas solo muestran informacion?
3. Que consultas podrian optimizarse con Read Models?
4. Aplicarias CQRS completo desde el primer dia? Por que?`;

const closingSnippet = `Una buena arquitectura
no busca que todo sea igual.

Busca que cada parte del sistema
este optimizada para el trabajo
que realmente realiza.`;

export default function Daily126Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/125";
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
              <div className={styles.brandSub}>CQRS avanzado y modelos de lectura</div>
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
            <Link className={styles.btn} href="/daily/125">
              <span className={styles.kbd}>←</span> Dia 125
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/127">
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
                <div className={styles.createdAt}>10/07/2026</div>
                <div className={styles.badge}>Daily #126 • CQRS</div>
                <h2 className={styles.title}>CQRS avanzado: separar lectura y escritura cuando el negocio lo necesita</h2>
                <p className={styles.lead}>
                  CQRS no empieza como una obsesion por rendimiento. Empieza aceptando que modificar datos y leer datos
                  son responsabilidades distintas, y que no siempre deben compartir el mismo modelo.
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
                    <p className={styles.sub}>Un mismo modelo no siempre sirve igual para leer y escribir.</p>
                  </div>
                  <span className={styles.chip}>Separacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{readWriteSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que significa CQRS</h3>
                    <p className={styles.sub}>La palabra importante es separacion.</p>
                  </div>
                  <span className={styles.chip}>CQRS</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{meaningSnippet}</pre>
                  <div className={styles.callout}>Primero separacion. Despues, si aplica, optimizacion.</div>
                </div>
              </section>

              <section className={styles.section} id="command">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que es un Command</h3>
                    <p className={styles.sub}>Un Command modifica el estado del sistema.</p>
                  </div>
                  <span className={styles.chip}>Write</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{commandSnippet}</pre>
                  <div className={styles.quote}>Un Command produce efectos.</div>
                </div>
              </section>

              <section className={styles.section} id="query">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que es una Query</h3>
                    <p className={styles.sub}>Una Query solo consulta informacion.</p>
                  </div>
                  <span className={styles.chip}>Read</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{querySnippet}</pre>
                  <div className={styles.callout}>Una Query no debe cambiar nada.</div>
                </div>
              </section>

              <section className={styles.section} id="without">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Sin CQRS</h3>
                    <p className={styles.sub}>El mismo repositorio termina cargando demasiadas responsabilidades.</p>
                  </div>
                  <span className={styles.chip}>Acoplamiento</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{withoutSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="with">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Con CQRS</h3>
                    <p className={styles.sub}>Aparecen dos caminos claros: escritura y lectura.</p>
                  </div>
                  <span className={styles.chip}>Caminos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{writePathSnippet}</pre>
                  <pre>{readPathSnippet}</pre>
                  <div className={styles.quote}>Ya no obligamos a un unico modelo a hacer todo.</div>
                </div>
              </section>

              <section className={styles.section} id="why">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Por que hacerlo</h3>
                    <p className={styles.sub}>Leer y escribir tienen necesidades distintas.</p>
                  </div>
                  <span className={styles.chip}>Responsabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo sencillo</h3>
                    <p className={styles.sub}>Crear una orden exige mucho mas dominio que listarla.</p>
                  </div>
                  <span className={styles.chip}>Ordenes</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exampleSnippet}</pre>
                  <div className={styles.callout}>Leer suele ser mucho mas simple.</div>
                </div>
              </section>

              <section className={styles.section} id="read-models">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Read Models</h3>
                    <p className={styles.sub}>Representan lo que necesita una pantalla o consulta concreta.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{readModelsSnippet}</pre>
                  <div className={styles.quote}>No todo DTO es un Read Model, pero muchos Read Models terminan siendo DTOs.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Ejemplo en OrderFlow</h3>
                    <p className={styles.sub}>La pantalla Mis ordenes no necesita cargar todo el aggregate.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="databases">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Y las bases de datos</h3>
                    <p className={styles.sub}>CQRS no obliga a usar dos bases.</p>
                  </div>
                  <span className={styles.chip}>Persistencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{oneDbSnippet}</pre>
                  <pre>{twoDbSnippet}</pre>
                  <div className={styles.callout}>Las dos opciones son validas segun el problema.</div>
                </div>
              </section>

              <section className={styles.section} id="events">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Integracion con Event-Driven</h3>
                    <p className={styles.sub}>Un evento puede alimentar varios modelos de lectura.</p>
                  </div>
                  <span className={styles.chip}>Eventos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Error tipico</h3>
                    <p className={styles.sub}>Aplicar CQRS por moda desde el primer dia.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakeSnippet}</pre>
                  <div className={styles.callout}>CQRS resuelve problemas reales. No debe introducirse por moda.</div>
                </div>
              </section>

              <section className={styles.section} id="when">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Cuando merece la pena</h3>
                    <p className={styles.sub}>Cuando la lectura y la escritura empiezan a pedir soluciones distintas.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whenSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ddd">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Relacion con DDD</h3>
                    <p className={styles.sub}>El aggregate protege la escritura; las queries pueden ser mas flexibles.</p>
                  </div>
                  <span className={styles.chip}>DDD</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dddSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Mentalidad senior</h3>
                    <p className={styles.sub}>Separar puede hacer el sistema mas simple y mas eficiente.</p>
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
                    <p className={styles.sub}>Clasifica pantallas segun command, query y read model.</p>
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
                    <p className={styles.sub}>Cada parte debe estar optimizada para el trabajo que realiza.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/125">
                      <span className={styles.kbd}>←</span> Dia 125
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/127">
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
