"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "problem", label: "3) Problema" },
  { id: "better", label: "4) Mejor enfoque" },
  { id: "services", label: "5) Servicios" },
  { id: "order-service", label: "6) OrderService" },
  { id: "create-order", label: "7) CreateOrder" },
  { id: "add-item", label: "8) AddItem" },
  { id: "confirm-order", label: "9) ConfirmOrder" },
  { id: "cancel-order", label: "10) CancelOrder" },
  { id: "payment-service", label: "11) PaymentService" },
  { id: "audit", label: "12) Auditoria" },
  { id: "errors", label: "13) Errores" },
  { id: "result", label: "14) Resultado" },
  { id: "exercise", label: "15) Ejercicio" },
  { id: "final", label: "16) Cierre" },
] as const;

const introSnippet = `Ayer hablamos de repositorios.

Ya tenemos esta frontera:

Dominio
Repository
Base de datos`;

const missingPieceSnippet = `Quien coordina el flujo completo?`;

const useCaseSnippet = `Crear orden
Agregar producto
Confirmar orden
Cancelar orden`;

const notControllerSnippet = `Eso no deberia vivir en el controller.`;

const notRepositorySnippet = `Tampoco deberia vivir directamente en el repository.`;

const applicationServiceDefinitionSnippet = `Clase que coordina un caso de uso de la aplicacion usando entidades, repositorios y reglas del dominio.`;

const serviceQuestionSnippet = `Que pasos hay que ejecutar para completar esta operacion?`;

const controllerSnippet = `recibe request
devuelve response`;

const serviceSnippet = `coordina caso de uso`;

const domainSnippet = `protege reglas`;

const repositorySnippet = `persiste`;

const neededServicesSnippet = `OrderService
PaymentService`;

const laterServicesSnippet = `AuditLogService
o auditoria integrada desde los services`;

const orderServiceMethodsSnippet = `CreateOrder
GetOrders
GetOrderById
AddItem
ConfirmOrder
CancelOrder`;

const createOrderFlowSnippet = `crear Order
guardar Order
registrar auditoria opcional
devolver resultado`;

const createOrderRuleSnippet = `No deberia tener logica compleja.

La entidad Order debe encargarse de sus reglas.`;

const addItemFlowSnippet = `buscar Order
buscar Product
validar que ambos existan
llamar order.AddItem()
guardar cambios`;

const domainOwnershipSnippet = `OrderService no deberia calcular internamente todo si Order.AddItem() ya lo hace.`;

const confirmFlowSnippet = `buscar Order
llamar order.Confirm()
guardar cambios`;

const confirmRuleSnippet = `Si la orden esta vacia, eso deberia fallar dentro del dominio:

Order.Confirm()`;

const cancelFlowSnippet = `buscar Order
llamar order.Cancel()
guardar cambios`;

const cancelRuleSnippet = `Si una orden pagada no puede cancelarse, eso debe vivir en:

Order.Cancel()`;

const badServiceSnippet = `No debe convertirse en una clase gigante llena de reglas.`;

const flowLayerSnippet = `controller recibe
service coordina
dominio decide
repository guarda`;

const paymentFlowSnippet = `buscar Order
validar que este PendingPayment
crear Payment
marcar Payment como Approved
marcar Order como Paid
guardar cambios`;

const uowSnippet = `DbContext = Unit of Work`;

const saveSnippet = `modificar Order
crear Payment
SaveChanges una sola vez`;

const auditSimpleSnippet = `despues de confirmar orden
crear AuditLog`;

const auditAdvancedSnippet = `OrderConfirmed
AuditLogHandler`;

const auditChoiceSnippet = `Para este proyecto, usaría opcion A por ahora.
Mas adelante se puede evolucionar.`;

const errorsSnippet = `orden no existe
producto no existe
orden vacia
orden ya pagada
orden cancelada
pago invalido`;

const errorsRuleSnippet = `existencia -> service
reglas de estado -> dominio`;

const juniorSnippet = `meto toda la logica en el controller`;

const seniorSnippet = `controller recibe
service coordina
dominio decide
repository guarda`;

const resultSnippet = `OrderService
PaymentService`;

const currentGoalSnippet = `construir casos de uso claros que coordinan dominio, persistencia y reglas sin mezclar responsabilidades`;

const exerciseSnippet = `ConfirmOrder(orderId)

1. Buscar Order por id
2. Si no existe, error
3. order.Confirm()
4. Guardar cambios
5. Registrar auditoria`;

const exerciseNoteSnippet = `Si el flujo se entiende sin HTTP, sin JSON y sin SQL, estas disenando bien el caso de uso.`;

const finalReflectionSnippet = `Un Application Service no es donde vive el negocio profundo.
Es donde se orquesta el caso de uso usando correctamente el dominio.`;

const nextStepSnippet = `Dia 107: OrdersController`;

const nextTopicsSnippet = `POST /orders
GET /orders
GET /orders/{id}
POST /orders/{id}/items
POST /orders/{id}/confirm
POST /orders/{id}/cancel
DTOs
HTTP`;

export default function Daily106Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/105";
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
            <Link className={styles.btn} href="/daily/105">
              <span className={styles.kbd}>←</span> Dia 105
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
                <div className={styles.createdAt}>20/06/2026</div>
                <div className={styles.badge}>Daily #106 • Application Services</div>
                <h2 className={styles.title}>Application Services: convertir reglas del dominio en casos de uso</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Services</span>
                  <span className={styles.chip}>Tag: Casos de uso</span>
                  <span className={styles.chip}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: OrderFlow</span>
                </div>

                <p className={styles.lead}>
                  El Application Service coordina el caso de uso. El dominio decide las reglas. El repository persiste.
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
                    <p className={styles.sub}>Ya no basta con el dominio y los repositorios. Falta quien coordina el flujo.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{introSnippet}</pre>
                  <pre>{missingPieceSnippet}</pre>
                  <pre>{useCaseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>El service orquesta un caso de uso usando dominio y persistencia.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{applicationServiceDefinitionSnippet}</pre>
                  <pre>{serviceQuestionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que problema resuelve</h3>
                    <p className={styles.sub}>Evita controllers cargados con HTTP, DB y reglas mezcladas.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notControllerSnippet}</pre>
                  <pre>{notRepositorySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="better">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Mejor enfoque</h3>
                    <p className={styles.sub}>Cada capa tiene una responsabilidad especifica.</p>
                  </div>
                  <span className={styles.chip}>Separacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{controllerSnippet}</pre>
                  <pre>{serviceSnippet}</pre>
                  <pre>{domainSnippet}</pre>
                  <pre>{repositorySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="services">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que servicios necesita OrderFlow</h3>
                    <p className={styles.sub}>Por ahora, la base es clara: ordenes y pagos.</p>
                  </div>
                  <span className={styles.chip}>Servicios</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{neededServicesSnippet}</pre>
                  <pre>{laterServicesSnippet}</pre>
                  <div className={styles.callout}>{badServiceSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="order-service">
                <div className={styles.shd}>
                  <div>
                    <h3>6. OrderService</h3>
                    <p className={styles.sub}>Coordina los casos de uso de ordenes sin meter reglas profundas.</p>
                  </div>
                  <span className={styles.chip}>OrderService</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderServiceMethodsSnippet}</pre>
                  <div className={styles.callout}>El service coordina. El dominio decide.</div>
                </div>
              </section>

              <section className={styles.section} id="create-order">
                <div className={styles.shd}>
                  <div>
                    <h3>7. CreateOrder</h3>
                    <p className={styles.sub}>Crear y guardar, con auditoria opcional.</p>
                  </div>
                  <span className={styles.chip}>Create</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{createOrderFlowSnippet}</pre>
                  <pre>{createOrderRuleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="add-item">
                <div className={styles.shd}>
                  <div>
                    <h3>8. AddItem</h3>
                    <p className={styles.sub}>El service busca datos y luego deja que el dominio aplique la regla.</p>
                  </div>
                  <span className={styles.chip}>AddItem</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{addItemFlowSnippet}</pre>
                  <pre>{domainOwnershipSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="confirm-order">
                <div className={styles.shd}>
                  <div>
                    <h3>9. ConfirmOrder</h3>
                    <p className={styles.sub}>Confirmar es coordinar, no replicar reglas de estado en el controller.</p>
                  </div>
                  <span className={styles.chip}>Confirm</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{confirmFlowSnippet}</pre>
                  <pre>{confirmRuleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cancel-order">
                <div className={styles.shd}>
                  <div>
                    <h3>10. CancelOrder</h3>
                    <p className={styles.sub}>Cancelar tambien vive como comportamiento del dominio.</p>
                  </div>
                  <span className={styles.chip}>Cancel</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cancelFlowSnippet}</pre>
                  <pre>{cancelRuleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="payment-service">
                <div className={styles.shd}>
                  <div>
                    <h3>11. PaymentService</h3>
                    <p className={styles.sub}>El pago actualiza Order y Payment dentro de una sola unidad de trabajo.</p>
                  </div>
                  <span className={styles.chip}>PaymentService</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentFlowSnippet}</pre>
                  <pre>{uowSnippet}</pre>
                  <pre>{saveSnippet}</pre>
                  <div className={styles.quote}>DbContext actua como Unit of Work.</div>
                </div>
              </section>

              <section className={styles.section} id="audit">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Auditoria</h3>
                    <p className={styles.sub}>Primero simple. Luego se puede evolucionar a eventos de dominio.</p>
                  </div>
                  <span className={styles.chip}>Audit</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{auditSimpleSnippet}</pre>
                  <pre>{auditAdvancedSnippet}</pre>
                  <pre>{auditChoiceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="errors">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Errores esperados</h3>
                    <p className={styles.sub}>Los servicios manejan existencia; el dominio maneja estados y reglas.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorsSnippet}</pre>
                  <pre>{errorsRuleSnippet}</pre>
                  <div className={styles.callout}>No mezcles validacion de existencia con reglas de negocio profundas.</div>
                </div>
              </section>

              <section className={styles.section} id="result">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Resultado esperado</h3>
                    <p className={styles.sub}>Los casos de uso deben existir a nivel de aplicacion, aunque todavia no esten expuestos en HTTP.</p>
                  </div>
                  <span className={styles.chip}>Resultado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resultSnippet}</pre>
                  <pre>{currentGoalSnippet}</pre>
                  <pre>{flowLayerSnippet}</pre>
                  <h4>Como piensa un backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Como piensa un backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Mini ejercicio</h3>
                    <p className={styles.sub}>Escribe el flujo de ConfirmOrder antes de implementar.</p>
                  </div>
                  <span className={styles.chip}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <pre>{exerciseNoteSnippet}</pre>
                  <div className={styles.callout}>Si el flujo se entiende sin HTTP ni SQL, el caso de uso esta bien pensado.</div>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Cierre</h3>
                    <p className={styles.sub}>Un Application Service orquesta el caso de uso usando correctamente el dominio.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/105">
                      <span className={styles.kbd}>←</span> Dia 105
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
                  <p>Dia 106 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Foco:</strong> coordinar casos de uso sin mezclar HTTP, DB y reglas.
                </div>
                <div className={styles.li}>
                  <strong>Orden:</strong> controller recibe, service coordina, dominio decide, repository guarda.
                </div>
                <div className={styles.li}>
                  <strong>Pago:</strong> Order y Payment cambian juntos dentro de una sola unidad de trabajo.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> tener casos de uso claros antes de exponerlos por HTTP.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
