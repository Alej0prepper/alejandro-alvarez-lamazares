"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "meaning", label: "2) Significado" },
  { id: "why-not-order", label: "3) Por que no solo Order" },
  { id: "flow", label: "4) Flujo" },
  { id: "questions", label: "5) Preguntas" },
  { id: "service", label: "6) PaymentService" },
  { id: "consistency", label: "7) Consistencia" },
  { id: "uow", label: "8) Unit of Work" },
  { id: "entity", label: "9) Payment Entity" },
  { id: "states", label: "10) Estados" },
  { id: "endpoint", label: "11) Endpoint" },
  { id: "errors", label: "12) Errores" },
  { id: "audit", label: "13) Auditoria" },
  { id: "mindset", label: "14) Mentalidad" },
  { id: "result", label: "15) Resultado" },
  { id: "exercise", label: "16) Ejercicio" },
  { id: "final", label: "17) Cierre" },
] as const;

const introSnippet = `Hasta ahora tenemos:

Products
Orders

Pero todavia falta una parte critica:

Payments`;

const consistencySnippet = `Entramos en el mundo de la consistencia.`;

const orderPaymentAuditSnippet = `Order
Payment
AuditLog`;

const paymentMeaningSnippet = `monto
fecha
referencia
metodo
estado`;

const paymentOwnLifeSnippet = `Un pago tiene vida propia.`;

const paymentStatesSnippet = `Pending
Approved
Rejected`;

const flowSnippet = `Create Order
Add Items
Confirm Order
PendingPayment
Pay Order
Paid`;

const noDirectPaidSnippet = `Create Order
Paid`;

const questionsSnippet = `Puede pagarse una orden vacia?
Puede pagarse una orden cancelada?
Puede pagarse una orden ya pagada?`;

const domainSnippet = `El dominio debe impedirlo.`;

const serviceSnippet = `Buscar Order
Validar existencia
Crear Payment
Aprobar Payment
Marcar Order como Paid
Guardar cambios`;

const orchestrateSnippet = `Orquestacion.`;

const consistencyMeaningSnippet = `Payment y Order actualizados juntos.

O:

los dos cambian

O:

ninguno cambia`;

const uowSnippet = `DbContext`;

const uowMeaningSnippet = `crear Payment
actualizar Order
SaveChanges()

una sola vez`;

const paymentEntitySnippet = `Id
OrderId
Amount
CreatedAt
Status`;

const optionalFieldsSnippet = `Reference
PaymentMethod
Provider`;

const paymentSimpleSnippet = `No hace falta complicarlo mucho.`;

const stateRecommendationSnippet = `Pending
Approved
Rejected`;

const laterStatesSnippet = `Refunded
Cancelled`;

const approvedFlowSnippet = `Payment
Approved`;

const paidFlowSnippet = `Order
Paid`;

const syncSnippet = `Las dos entidades deben mantenerse sincronizadas.`;

const endpointDecisionSnippet = `No crearia:

POST /payments

todavia.`;

const endpointRecommendationSnippet = `POST /orders/{id}/pay`;

const businessAlignedSnippet = `Diseñar pensando en casos de uso.`;

const errorCasesSnippet = `Orden no existe
Orden cancelada
Orden ya pagada
Monto invalido
Error inesperado`;

const errorCodesSnippet = `404
409
409
400
500`;

const noAllErrorsSnippet = `No todos los errores son iguales.`;

const auditSnippet = `OrderPaid`;

const auditPhraseSnippet = `Porque el pago es uno de los eventos mas importantes del sistema.`;

const juniorSnippet = `cambiar estado a Paid`;

const seniorSnippet = `crear Payment
mantener consistencia
registrar auditoria
proteger estados`;

const resultSnippet = `Payment
PaymentRepository
PaymentService
PayOrder()

PendingPayment
Paid`;

const finalReflectionSnippet = `Un pago no es simplemente cambiar un estado.
Es una operacion de negocio que debe mantener consistencia entre multiples entidades.`;

const nextStepSnippet = `Dia 109: AuditLog`;

const nextTopicsSnippet = `Payment
AuditLog
OrderPaid
Registros importantes
Eventos
Create
GetAll`;

export default function Daily108Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/107";
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
            <Link className={styles.btn} href="/daily/107">
              <span className={styles.kbd}>←</span> Dia 107
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
                <div className={styles.createdAt}>22/06/2026</div>
                <div className={styles.badge}>Daily #108 • Payments</div>
                <h2 className={styles.title}>Payments: cuando una operacion afecta varias entidades al mismo tiempo</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Payments</span>
                  <span className={styles.chip}>Tag: Consistencia</span>
                  <span className={styles.chip}>Tag: UnitOfWork</span>
                  <span className={styles.chip}>Tag: OrderFlow</span>
                </div>

                <p className={styles.lead}>
                  Pagar una orden no es cambiar un estado: es una operacion de negocio que debe mantener consistencia.
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
                    <p className={styles.sub}>Aparece la parte critica que todavia faltaba en el sistema.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{introSnippet}</pre>
                  <div className={styles.callout}>{consistencySnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que significa pagar una orden</h3>
                    <p className={styles.sub}>Un pago crea informacion propia y no cabe dentro de Order sin mas.</p>
                  </div>
                  <span className={styles.chip}>Significado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentMeaningSnippet}</pre>
                  <pre>{paymentOwnLifeSnippet}</pre>
                  <pre>{orderPaymentAuditSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="why-not-order">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Por que no guardarlo todo dentro de Order</h3>
                    <p className={styles.sub}>Porque Payment tiene estado y ciclo de vida propios.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentStatesSnippet}</pre>
                  <div className={styles.callout}>Order y Payment representan conceptos distintos.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Flujo esperado</h3>
                    <p className={styles.sub}>El estado final correcto debe aparecer solo despues del flujo completo.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{flowSnippet}</pre>
                  <pre>{noDirectPaidSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="questions">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Preguntas importantes</h3>
                    <p className={styles.sub}>El dominio debe bloquear escenarios invalidos antes de persistir.</p>
                  </div>
                  <span className={styles.chip}>Reglas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{questionsSnippet}</pre>
                  <pre>{domainSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="service">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Qué debe hacer PaymentService</h3>
                    <p className={styles.sub}>Coordina el caso de uso de pago sin mezclar demasiada logica.</p>
                  </div>
                  <span className={styles.chip}>Service</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{serviceSnippet}</pre>
                  <pre>{orchestrateSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="consistency">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Consistencia</h3>
                    <p className={styles.sub}>Queremos que Payment y Order cambien juntos o no cambien.</p>
                  </div>
                  <span className={styles.chip}>Consistency</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{consistencyMeaningSnippet}</pre>
                  <div className={styles.quote}>Principio de transaccion.</div>
                </div>
              </section>

              <section className={styles.section} id="uow">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Unit of Work</h3>
                    <p className={styles.sub}>En EF Core, el DbContext actua como una unidad de trabajo.</p>
                  </div>
                  <span className={styles.chip}>UoW</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{uowSnippet}</pre>
                  <pre>{uowMeaningSnippet}</pre>
                  <div className={styles.callout}>Una sola unidad de trabajo.</div>
                </div>
              </section>

              <section className={styles.section} id="entity">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Payment Entity</h3>
                    <p className={styles.sub}>Lo minimo necesario para representar el pago sin sobrecargarlo.</p>
                  </div>
                  <span className={styles.chip}>Entity</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentEntitySnippet}</pre>
                  <pre>{optionalFieldsSnippet}</pre>
                  <pre>{paymentSimpleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="states">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Estados del pago</h3>
                    <p className={styles.sub}>Pendiente, aprobado o rechazado es suficiente por ahora.</p>
                  </div>
                  <span className={styles.chip}>States</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{stateRecommendationSnippet}</pre>
                  <pre>{laterStatesSnippet}</pre>
                  <pre>{approvedFlowSnippet}</pre>
                  <pre>{paidFlowSnippet}</pre>
                  <div className={styles.callout}>{syncSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="endpoint">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Endpoint recomendado</h3>
                    <p className={styles.sub}>El pago pertenece al flujo de la orden, no a un PaymentsController separado.</p>
                  </div>
                  <span className={styles.chip}>Endpoint</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{endpointDecisionSnippet}</pre>
                  <pre>{endpointRecommendationSnippet}</pre>
                  <pre>{businessAlignedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="errors">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Casos de error</h3>
                    <p className={styles.sub}>No todos los errores son iguales ni deben devolverse igual.</p>
                  </div>
                  <span className={styles.chip}>Errors</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorCasesSnippet}</pre>
                  <pre>{errorCodesSnippet}</pre>
                  <div className={styles.callout}>{noAllErrorsSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="audit">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Relacion con auditoria</h3>
                    <p className={styles.sub}>Cuando se aprueba un pago, el evento debe quedar registrado.</p>
                  </div>
                  <span className={styles.chip}>Audit</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{auditSnippet}</pre>
                  <pre>{auditPhraseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No cambia un estado a mano; diseña el proceso para mantener coherencia.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Senior</h4>
                  <pre>{seniorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="result">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Resultado esperado</h3>
                    <p className={styles.sub}>La unidad de pago debe quedar clara a nivel de entidad, repo, service y caso de uso.</p>
                  </div>
                  <span className={styles.chip}>Resultado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resultSnippet}</pre>
                  <div className={styles.callout}>{finalReflectionSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Mini ejercicio</h3>
                    <p className={styles.sub}>Escribe el flujo de PayOrder antes de implementar.</p>
                  </div>
                  <span className={styles.chip}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>PayOrder(orderId)</pre>
                  <pre>1 Buscar Order
2 Validar estado
3 Crear Payment
4 Aprobar Payment
5 Marcar Order como Paid
6 Guardar cambios
7 Registrar auditoria</pre>
                  <div className={styles.callout}>
                    Si puedes describir el flujo sin pensar en HTTP ni EF Core, el caso de uso esta bien diseñado.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Cierre</h3>
                    <p className={styles.sub}>El pago debe ser consistente, auditable y alineado con las reglas del negocio.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/107">
                      <span className={styles.kbd}>←</span> Dia 107
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
                  <p>Dia 108 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Foco:</strong> Payment es una entidad propia con estado y ciclo de vida.
                </div>
                <div className={styles.li}>
                  <strong>Consistencia:</strong> Payment y Order deben cambiar juntos dentro de una unidad de trabajo.
                </div>
                <div className={styles.li}>
                  <strong>Endpoint:</strong> el pago vive en el flujo de la orden.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> procesos de pago consistentes, auditables y alineados al negocio.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
