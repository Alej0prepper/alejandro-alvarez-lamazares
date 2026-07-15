"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "meaning", label: "2) API y contrato" },
  { id: "public-vs-internal", label: "3) Publica vs interna" },
  { id: "consumer", label: "4) Consumidor" },
  { id: "resources", label: "5) Recursos" },
  { id: "breaking", label: "6) Breaking change" },
  { id: "compatible", label: "7) Compatible" },
  { id: "versioning", label: "8) Versionado" },
  { id: "contracts", label: "9) Consumer contracts" },
  { id: "dto", label: "10) DTOs" },
  { id: "idempotency", label: "11) Idempotencia" },
  { id: "pagination", label: "12) Paginacion" },
  { id: "errors", label: "13) Errores" },
  { id: "security", label: "14) Seguridad" },
  { id: "evolution", label: "15) Evolucion" },
  { id: "docs", label: "16) Documentacion" },
  { id: "mistakes", label: "17) Errores tipicos" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `GET /products
POST /orders
PUT /users/{id}

Una API no es solo endpoints.

Es un contrato.`;

const contractSnippet = `Si manana cambiamos un endpoint
que usan otros 15 microservicios
↓
podemos romper todo el sistema.

La API debe poder evolucionar durante anos.`;

const meaningSnippet = `Una API define:
rutas
metodos HTTP
parametros
formato de respuesta
codigos HTTP
autenticacion
reglas de uso

El contrato es mas importante
que la implementacion.`;

const publicVsInternalSnippet = `API publica
↓
clientes
frontend
movil
terceros

API interna
↓
solo microservicios

Nunca expongas al mundo
lo mismo que usas internamente.`;

const consumerSnippet = `Error tipico:
disenar pensando en mi base de datos

Pregunta correcta:
que necesita realmente el consumidor?

La API representa capacidades del negocio,
no tablas.`;

const resourcesSnippet = `Malo
GET /OrderTable
POST /InsertOrder

Bueno
GET /orders
POST /orders

Disena recursos, no tablas.`;

const breakingSnippet = `Hoy:
{
  "id": 10,
  "name": "Laptop"
}

Manana:
{
  "productId": 10,
  "productName": "Laptop"
}

Compila.
Pero rompe consumidores.`;

const breakingKindsSnippet = `Breaking change:
eliminar campo
cambiar nombre
cambiar tipo
eliminar endpoint
modificar comportamiento esperado`;

const compatibleSnippet = `Antes:
{
  "id":10,
  "name":"Laptop"
}

Despues:
{
  "id":10,
  "name":"Laptop",
  "brand":"Dell"
}

Agregar un campo nuevo
normalmente es compatible.`;

const versioningSnippet = `v1
/api/v1/orders

v2
/api/v2/orders

Versionar es preferible
a romper consumidores.`;

const contractsSnippet = `Consumer Driven Contracts

No basta con que el proveedor funcione.
Debe seguir funcionando
para quienes lo consumen.

Contract Test
↓
verifica exactamente
el contrato esperado.`;

const orderflowSnippet = `Order Service publica:
GET /orders/{id}

Inventory depende
Notification depende
Analytics depende

Un cambio pequeno
puede romper 3 consumidores
sin que Order Service lo note.`;

const dtoSnippet = `No devuelvas entidades directamente.

Order puede contener:
reglas
navegacion
propiedades internas

El cliente necesita:
{
  "orderId":"123",
  "status":"Paid",
  "total":150
}`;

const idempotencySnippet = `POST /payments

No queremos:
dos cobros

Solucion:
Idempotency-Key

Las APIs tambien deben disenar
para reintentos.`;

const paginationSnippet = `No devuelvas
500 000 registros
de una vez.

Mejor:
GET /orders?page=1&pageSize=20`;

const errorsSnippet = `Error consistente:
{
  "code":"ORDER_NOT_FOUND",
  "message":"Order not found."
}

No unas veces 404 vacio
y otras { "error":"x" }.`;

const securitySnippet = `No expongas:
passwordHash
internalNotes

La API devuelve
solo lo necesario.`;

const evolutionSnippet = `Buenas practicas:
agregar campos opcionales
deprecar antes de eliminar
documentar cambios
mantener versiones un tiempo

Disena pensando en el futuro.`;

const docsSnippet = `Toda API deberia tener:
OpenAPI
Swagger
ejemplos
codigos HTTP
ejemplos de errores

La documentacion
forma parte del contrato.`;

const observabilitySnippet = `Toda API deberia registrar:
TraceId
CorrelationId
duracion
usuario
endpoint
codigo HTTP`;

const mistakesSnippet = `Error 1:
disenar la API alrededor de la base de datos
GET /CustomerTable

Error 2:
hoy { "price":120 }
manana { "amount":120 }

La compatibilidad hacia atras
es responsabilidad del proveedor.`;

const summarySnippet = `Buenas practicas:
disenar recursos, no tablas
mantener contratos estables
versionar cuando haga falta
usar DTOs
documentar
crear Contract Tests
pensar siempre en el consumidor`;

const exerciseSnippet = `GET /orders/{id}
↓
{
  "orderId":"123",
  "status":"Paid",
  "total":150
}

1. Que cambios serian compatibles?
2. Cuales romperian el contrato?
3. Cuando crearias una version nueva?
4. Que pruebas pondrias para no romper consumidores?
5. Que campos no expondrías nunca?`;

const closingSnippet = `Una API
no es solo codigo que responde peticiones.

Es un contrato entre sistemas,
y romper ese contrato
puede afectar a decenas
de aplicaciones.`;

export default function Daily131Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/130";
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
              <div className={styles.brandSub}>Diseno de contratos estables entre servicios</div>
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
            <Link className={styles.btn} href="/daily/130">
              <span className={styles.kbd}>←</span> Dia 130
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/132">
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
                <div className={styles.createdAt}>15/07/2026</div>
                <div className={styles.badge}>Daily #131 • API Contracts</div>
                <h2 className={styles.title}>Diseno de APIs para microservicios: como crear contratos que puedan evolucionar sin romper el sistema</h2>
                <p className={styles.lead}>
                  En una arquitectura distribuida, una API no es solo un endpoint que funciona hoy. Es un contrato que
                  otros sistemas van a depender durante anos, y cualquier cambio mal gestionado puede romper produccion.
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
                    <p className={styles.sub}>Una API debe disearse para poder evolucionar, no solo para funcionar hoy.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{contractSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es realmente una API</h3>
                    <p className={styles.sub}>El contrato es mas importante que la implementacion.</p>
                  </div>
                  <span className={styles.chip}>Contrato</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{meaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="public-vs-internal">
                <div className={styles.shd}>
                  <div>
                    <h3>3. API publica vs API interna</h3>
                    <p className={styles.sub}>No todas las APIs tienen el mismo nivel de rigidez ni la misma audiencia.</p>
                  </div>
                  <span className={styles.chip}>Tipos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{publicVsInternalSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="consumer">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Disenar pensando en el consumidor</h3>
                    <p className={styles.sub}>La API no representa tablas; representa capacidades del negocio.</p>
                  </div>
                  <span className={styles.chip}>Consumidor</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{consumerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="resources">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Disenar recursos, no tablas</h3>
                    <p className={styles.sub}>El lenguaje del dominio debe dominar la API.</p>
                  </div>
                  <span className={styles.chip}>Recursos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resourcesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="breaking">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Evitar romper contratos</h3>
                    <p className={styles.sub}>Cambiar una respuesta tambien es un breaking change.</p>
                  </div>
                  <span className={styles.chip}>Breaking</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{breakingSnippet}</pre>
                  <pre>{breakingKindsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="compatible">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Cambios compatibles</h3>
                    <p className={styles.sub}>No toda evolucion rompe a los consumidores.</p>
                  </div>
                  <span className={styles.chip}>Compatibilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{compatibleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="versioning">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Versionado</h3>
                    <p className={styles.sub}>Cuando hace falta romper, se hace de forma explicita y controlada.</p>
                  </div>
                  <span className={styles.chip}>Versionado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{versioningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="contracts">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Consumer Driven Contracts</h3>
                    <p className={styles.sub}>Los contratos tambien se prueban.</p>
                  </div>
                  <span className={styles.chip}>Contract Tests</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{contractsSnippet}</pre>
                  <pre>{orderflowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dto">
                <div className={styles.shd}>
                  <div>
                    <h3>10. DTOs</h3>
                    <p className={styles.sub}>Nunca devuelvas entidades directamente.</p>
                  </div>
                  <span className={styles.chip}>DTO</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dtoSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="idempotency">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Idempotencia en APIs</h3>
                    <p className={styles.sub}>Las APIs deben disearse pensando en reintentos, no solo en la primera llamada.</p>
                  </div>
                  <span className={styles.chip}>Idempotencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{idempotencySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="pagination">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Paginacion</h3>
                    <p className={styles.sub}>Tambien forma parte del diseno del contrato.</p>
                  </div>
                  <span className={styles.chip}>Paginacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paginationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="errors">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Errores consistentes</h3>
                    <p className={styles.sub}>La homogeneidad en errores facilita el consumo y el diagnostico.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="security">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Seguridad</h3>
                    <p className={styles.sub}>Exponer solo lo necesario tambien es parte del contrato.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{securitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="evolution">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Evolucion</h3>
                    <p className={styles.sub}>Una API nunca termina; debe poder crecer sin romper a quienes dependen de ella.</p>
                  </div>
                  <span className={styles.chip}>Evolucion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{evolutionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="docs">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Documentacion y observabilidad</h3>
                    <p className={styles.sub}>La documentacion forma parte del contrato, y la observabilidad ayuda a operarlo.</p>
                  </div>
                  <span className={styles.chip}>Docs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{docsSnippet}</pre>
                  <pre>{observabilitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Errores tipicos</h3>
                    <p className={styles.sub}>Romper contratos sin avisar suele ser facil; evitarlo requiere disciplina del proveedor.</p>
                  </div>
                  <span className={styles.chip}>Errores tipicos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakesSnippet}</pre>
                  <pre>{summarySnippet}</pre>
                  <pre>{exerciseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>La estabilidad de los contratos es tan importante como la calidad del codigo que los implementa.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/130">
                      <span className={styles.kbd}>←</span> Dia 130
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/132">
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
