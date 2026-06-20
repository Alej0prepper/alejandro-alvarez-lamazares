"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "bridge", label: "3) Puente" },
  { id: "definition", label: "4) Definicion" },
  { id: "mental-model", label: "5) Mentalidad" },
  { id: "repositories", label: "6) Repositorios" },
  { id: "methods", label: "7) Metodos minimos" },
  { id: "items", label: "8) Items" },
  { id: "logic", label: "9) No negocio" },
  { id: "payment", label: "10) Payment" },
  { id: "audit", label: "11) AuditLog" },
  { id: "ddd", label: "12) DDD" },
  { id: "today", label: "13) Hoy" },
  { id: "exercise", label: "14) Ejercicio" },
  { id: "final", label: "15) Cierre" },
] as const;

const introSnippet = `Ayer dejamos claro:

Order
OrderItem
Payment
OrderStatus

y sus reglas.`;

const questionSnippet = `Donde guardamos todo eso?`;

const persistenceSnippet = `persistencia`;

const repositoryBridgeSnippet = `El repositorio es el puente entre dominio y base de datos.`;

const notRepositorySnippet = `Repository = DbContext
Repository = SQL
Repository = EF Core`;

const definitionSnippet = `Un Repository representa una coleccion de entidades del dominio.`;

const mentalModelSnippet = `coleccion de ordenes`;

const repositoryNamesSnippet = `IProductRepository
IOrderRepository
IPaymentRepository
IAuditLogRepository`;

const orderRepositoryMethodsSnippet = `Task<Order?> GetById(Guid id);

Task<List<Order>> GetAll();

Task Create(Order order);

Task Update(Order order);`;

const businessSnippet = `No diseñes repositorios pensando en EF.
Disenalos pensando en el negocio.`;

const badRepositorySnippet = `Task<List<Order>>
GetOrdersByStatusAndDateAndCustomerAnd...`;

const tooManyMethodsSnippet = `50 metodos`;

const simplicitySnippet = `Repositorios simples.`;

const itemsQuestionSnippet = `cargas los Items?`;

const itemsReasonSnippet = `Porque una orden sin items cargados es inutil.`;

const includeSnippet = `Include(o => o.Items)`;

const importantDetailSnippet = `Este detalle rompe muchisimas implementaciones.`;

const wrongResponsibilitySnippet = `public async Task ConfirmOrder(...)
{
    ...
}`;

const correctResponsibilitySnippet = `Eso NO pertenece al repositorio.

Debe vivir en:

OrderService`;

const repositoryResponsibilitiesSnippet = `guarda
carga
actualiza`;

const paymentMethodsSnippet = `GetById()

Create()

Update()`;

const paymentFlowSnippet = `El flujo de pago vive en:

PaymentService`;

const auditMethodsSnippet = `Create()

GetAll()`;

const auditReasonSnippet = `se escribe mucho
se consulta poco`;

const dddSnippet = `Entidad
Repository
Persistencia`;

const domainIsolationSnippet = `El dominio no deberia saber:
EF Core
PostgreSQL
SQL`;

const seniorQuestionSnippet = `Como mantengo el dominio aislado de la infraestructura?`;

const juniorQuestionSnippet = `Como guardo esto?`;

const implementationSnippet = `IOrderRepository
OrderRepository`;

const paymentImplementationSnippet = `IPaymentRepository
PaymentRepository`;

const auditImplementationSnippet = `IAuditLogRepository
AuditLogRepository`;

const resultSnippet = `Dominio
Repositorio
PostgreSQL`;

const stillMissingSnippet = `Todavia NO habra:

OrderController
PaymentController`;

const exerciseSnippet = `OrderRepository

Estoy modelando una coleccion de ordenes
o estoy modelando una tabla SQL?`;

const ifLooksLikeSqlSnippet = `Si parece una tabla SQL, probablemente el diseño puede mejorar.`;

const finalReflectionSnippet = `Un Repository no existe para facilitar EF Core.
Existe para proteger el dominio de los detalles de persistencia.`;

const nextStepSnippet = `Dia 106: OrderService`;

const nextTopicsSnippet = `CreateOrder
GetOrders
GetOrderById
AddItem
ConfirmOrder
CancelOrder
Llamar metodos del dominio
Guardar cambios`;

export default function Daily105Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/104";
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
            <Link className={styles.btn} href="/daily/104">
              <span className={styles.kbd}>←</span> Dia 104
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
                <div className={styles.createdAt}>19/06/2026</div>
                <div className={styles.badge}>Daily #105 • Repositorios</div>
                <h2 className={styles.title}>
                  Repositorios: conectar el dominio con la persistencia sin contaminar las reglas de negocio
                </h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Repositorios</span>
                  <span className={styles.chip}>Tag: Persistencia</span>
                  <span className={styles.chip}>Tag: DDD</span>
                  <span className={styles.chip}>Tag: OrderFlow</span>
                </div>

                <p className={styles.lead}>
                  La persistencia existe para guardar y recuperar el dominio, no para mezclarle logica de negocio.
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
                    <p className={styles.sub}>Hoy aparece la pregunta de persistencia.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{introSnippet}</pre>
                  <pre>{questionSnippet}</pre>
                  <pre>{persistenceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que problema resuelven</h3>
                    <p className={styles.sub}>La entidad en memoria desaparece al terminar la request.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{repositoryBridgeSnippet}</pre>
                  <div className={styles.callout}>Necesitamos guardar, consultar y actualizar.</div>
                </div>
              </section>

              <section className={styles.section} id="bridge">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que no es un Repository</h3>
                    <p className={styles.sub}>No es DbContext, no es SQL, no es EF Core.</p>
                  </div>
                  <span className={styles.chip}>Frontera</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notRepositorySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Definicion correcta</h3>
                    <p className={styles.sub}>Un repository representa una coleccion de entidades del dominio.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{definitionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mental-model">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como pensarlo mentalmente</h3>
                    <p className={styles.sub}>No pienses en tablas; piensa en colecciones del negocio.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mentalModelSnippet}</pre>
                  <div className={styles.quote}>La diferencia de enfoque importa.</div>
                </div>
              </section>

              <section className={styles.section} id="repositories">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que repositorios necesita OrderFlow</h3>
                    <p className={styles.sub}>Los agregados principales ya tienen frontera clara.</p>
                  </div>
                  <span className={styles.chip}>Repos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{repositoryNamesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="methods">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Metodos minimos de OrderRepository</h3>
                    <p className={styles.sub}>El repositorio debe ser simple y estable.</p>
                  </div>
                  <span className={styles.chip}>Order</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderRepositoryMethodsSnippet}</pre>
                  <pre>{businessSnippet}</pre>
                  <pre>{badRepositorySnippet}</pre>
                  <pre>{tooManyMethodsSnippet}</pre>
                  <pre>{simplicitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="items">
                <div className={styles.shd}>
                  <div>
                    <h3>8. El detalle importante con Items</h3>
                    <p className={styles.sub}>Sin items cargados la orden no sirve.</p>
                  </div>
                  <span className={styles.chip}>Items</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{itemsQuestionSnippet}</pre>
                  <pre>{itemsReasonSnippet}</pre>
                  <pre>{includeSnippet}</pre>
                  <div className={styles.callout}>{importantDetailSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="logic">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Repository no es logica de negocio</h3>
                    <p className={styles.sub}>Confirmar una orden pertenece al servicio, no al repositorio.</p>
                  </div>
                  <span className={styles.chip}>Responsabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{wrongResponsibilitySnippet}</pre>
                  <pre>{correctResponsibilitySnippet}</pre>
                  <pre>{repositoryResponsibilitiesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="payment">
                <div className={styles.shd}>
                  <div>
                    <h3>10. PaymentRepository</h3>
                    <p className={styles.sub}>El flujo de pago vive en el servicio de pagos.</p>
                  </div>
                  <span className={styles.chip}>Payment</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentMethodsSnippet}</pre>
                  <pre>{paymentFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="audit">
                <div className={styles.shd}>
                  <div>
                    <h3>11. AuditLogRepository</h3>
                    <p className={styles.sub}>Se escribe mucho y se consulta poco.</p>
                  </div>
                  <span className={styles.chip}>Audit</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{auditMethodsSnippet}</pre>
                  <pre>{auditReasonSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ddd">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Relacion con DDD</h3>
                    <p className={styles.sub}>El dominio debe permanecer limpio de detalles de infraestructura.</p>
                  </div>
                  <span className={styles.chip}>DDD</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dddSnippet}</pre>
                  <pre>{domainIsolationSnippet}</pre>
                  <div className={styles.quote}>La frontera protege al sistema cuando crece.</div>
                </div>
              </section>

              <section className={styles.section} id="today">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como piensa un backend junior vs senior</h3>
                    <p className={styles.sub}>La diferencia real esta en la frontera con la infraestructura.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Junior</h4>
                  <pre>{juniorQuestionSnippet}</pre>
                  <h4>Senior</h4>
                  <pre>{seniorQuestionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Que debes implementar hoy</h3>
                    <p className={styles.sub}>Revisar los repositorios y confirmar que Order carga sus items.</p>
                  </div>
                  <span className={styles.chip}>Tarea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{implementationSnippet}</pre>
                  <pre>{paymentImplementationSnippet}</pre>
                  <pre>{auditImplementationSnippet}</pre>
                  <div className={styles.callout}>Dominio &rarr; Repositorio &rarr; PostgreSQL debe funcionar.</div>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Cierre</h3>
                    <p className={styles.sub}>La frontera entre dominio e infraestructura debe seguir siendo clara.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resultSnippet}</pre>
                  <pre>{stillMissingSnippet}</pre>
                  <p>Mini ejercicio:</p>
                  <pre>{exerciseSnippet}</pre>
                  <pre>{ifLooksLikeSqlSnippet}</pre>
                  <div className={styles.quote}>{finalReflectionSnippet}</div>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/104">
                      <span className={styles.kbd}>←</span> Dia 104
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
                  <p>Dia 105 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Foco:</strong> el repository protege al dominio de los detalles de persistencia.
                </div>
                <div className={styles.li}>
                  <strong>Orden:</strong> guardar, consultar y actualizar sin meter logica de negocio.
                </div>
                <div className={styles.li}>
                  <strong>Detalle clave:</strong> cargar `Items` con `Include(o =&gt; o.Items)`.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> tener la frontera dominio - infraestructura clara y mantenible.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
