"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "domain", label: "2) Dominio" },
  { id: "mistake", label: "3) Error" },
  { id: "behavior", label: "4) Comportamiento" },
  { id: "question", label: "5) Pregunta" },
  { id: "status", label: "6) Estados" },
  { id: "invariants", label: "7) Invariantes" },
  { id: "add-item", label: "8) AddItem" },
  { id: "confirm", label: "9) Confirmar" },
  { id: "pay", label: "10) Pagar" },
  { id: "cancel", label: "11) Cancelar" },
  { id: "review", label: "12) Revision" },
  { id: "project", label: "13) Cierre" },
] as const;

const introSnippet = `Ayer hicimos una pausa para planificar.
Hoy empezamos el trabajo real.

Pero todavia NO vamos a crear endpoints.
NO vamos a tocar Docker.
NO vamos a tocar Kubernetes.`;

const orderOfWorkSnippet = `Controller
Service
Repository
Entidad`;

const outcomeSnippet = `el modelo esta mal disenado`;

const damageSnippet = `Controller
Service
Repository
DTOs
Tests`;

const domainDefinitionSnippet = `El conjunto de reglas que describen como funciona el negocio.`;

const domainEntitiesSnippet = `Products
Orders
Payments
AuditLogs`;

const behaviorQuestionSnippet = `Que puede hacer cada entidad?`;

const badModelSnippet = `public class Order
{
    public Guid Id { get; set; }

    public decimal Total { get; set; }

    public string Status { get; set; }
}`;

const badModelMeaningSnippet = `una estructura de datos`;

const goodModelSnippet = `Un dominio describe comportamiento.`;

const orderQuestionsSnippet = `Crearse
Agregar productos
Confirmarse
Pagarse
Cancelarse`;

const statusSnippet = `OrderStatus`;

const statusValuesSnippet = `Draft
PendingPayment
Paid
Cancelled`;

const statusQuestionSnippet = `Puede una orden pasar de Cancelled a Paid?`;

const ruleSnippet = `Los estados son reglas de negocio.`;

const invariantsDefinitionSnippet = `Regla que siempre debe cumplirse.`;

const invariantsSnippet = `Una orden pagada no puede cancelarse
Una orden vacia no puede confirmarse
Una orden cancelada no puede pagarse`;

const addItemQuestionSnippet = `Que ocurre si agrego dos veces el mismo producto?`;

const addItemOptionsSnippet = `Crear dos OrderItems

O

Incrementar Quantity`;

const decisionSnippet = `Debes decidirlo.
Pero la decision debe estar documentada.`;

const confirmQuestionSnippet = `Que valida Order.Confirm()?`;

const confirmRulesSnippet = `No permitir confirmar una orden vacia
No permitir confirmar una orden ya cancelada
No permitir confirmar una orden ya pagada`;

const payQuestionSnippet = `Que valida Order.Pay()?`;

const payRulesSnippet = `No pagar una orden cancelada
No pagar una orden ya pagada
No pagar una orden que no esta pendiente de pago`;

const cancelQuestionSnippet = `Puede Cancelled volver a Paid?`;

const cancelRulesSnippet = `Una orden cancelada no debe volver a pagarse`;

const reviewQuestionSnippet = `Que deberiamos revisar antes de tocar controllers?`;

const reviewAnswerSnippet = `Order
OrderItem
Payment
AuditLog
OrderStatus

Y sobre todo:
las reglas que viven en esas entidades.`;

const projectReminderSnippet = `Si el dominio esta mal, todo lo demas estara mal.`;

const finalReflectionSnippet = `Primero dominio.
Despues el resto.`;

const nextStepSnippet = `Dia 105: Repositorios`;

const nextTopicsSnippet = `OrderRepository
PaymentRepository
AuditLogRepository
Include(o => o.Items)
Create
GetById
GetAll
Update`;

export default function Daily104Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/103";
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
            <Link className={styles.btn} href="/daily/103">
              <span className={styles.kbd}>←</span> Dia 103
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
                <div className={styles.createdAt}>18/06/2026</div>
                <div className={styles.badge}>Daily #104 • Dominio</div>
                <h2 className={styles.title}>Dominio primero: si el modelo esta mal, todo lo demas estara mal</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: Invariantes</span>
                  <span className={styles.chip}>Tag: Order</span>
                  <span className={styles.chip}>Tag: Reglas</span>
                </div>

                <p className={styles.lead}>
                  Antes de endpoints, servicios o infraestructura, hay que validar el modelo del negocio.
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
                    <p className={styles.sub}>Primero se corrige el modelo. Despues se construye alrededor de el.</p>
                  </div>
                  <span className={styles.chip}>Prioridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{introSnippet}</pre>
                  <div className={styles.callout}>Hoy no se agregan endpoints ni infraestructura.</div>
                </div>
              </section>

              <section className={styles.section} id="domain">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es el dominio</h3>
                    <p className={styles.sub}>El dominio describe como funciona el negocio, no solo como se guarda data.</p>
                  </div>
                  <span className={styles.chip}>Dominio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{domainDefinitionSnippet}</pre>
                  <pre>{domainEntitiesSnippet}</pre>
                  <pre>{behaviorQuestionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error tipico</h3>
                    <p className={styles.sub}>Construir capas alrededor de un modelo debil hace perder trabajo.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderOfWorkSnippet}</pre>
                  <pre>{outcomeSnippet}</pre>
                  <pre>{damageSnippet}</pre>
                  <div className={styles.quote}>Mucho trabajo perdido.</div>
                </div>
              </section>

              <section className={styles.section} id="behavior">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Un dominio describe comportamiento</h3>
                    <p className={styles.sub}>Las entidades deben poder hacer cosas, no solo contener propiedades.</p>
                  </div>
                  <span className={styles.chip}>Comportamiento</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{goodModelSnippet}</pre>
                  <pre>{badModelSnippet}</pre>
                  <pre>{badModelMeaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="question">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Pregunta fundamental</h3>
                    <p className={styles.sub}>Antes de implementar nada, hay que entender que puede pasarle a una orden.</p>
                  </div>
                  <span className={styles.chip}>Negocio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderQuestionsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="status">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Estados de una orden</h3>
                    <p className={styles.sub}>El estado es parte de la regla de negocio.</p>
                  </div>
                  <span className={styles.chip}>Estado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{statusSnippet}</pre>
                  <pre>{statusValuesSnippet}</pre>
                  <pre>{statusQuestionSnippet}</pre>
                  <pre>{ruleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="invariants">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Invariantes</h3>
                    <p className={styles.sub}>Reglas que siempre deben cumplirse.</p>
                  </div>
                  <span className={styles.chip}>Reglas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{invariantsDefinitionSnippet}</pre>
                  <pre>{invariantsSnippet}</pre>
                  <div className={styles.callout}>Estas reglas pertenecen al dominio.</div>
                </div>
              </section>

              <section className={styles.section} id="add-item">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Revisar Order.AddItem()</h3>
                    <p className={styles.sub}>Hay que definir si se duplican items o se incrementa cantidad.</p>
                  </div>
                  <span className={styles.chip}>OrderItem</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{addItemQuestionSnippet}</pre>
                  <pre>{addItemOptionsSnippet}</pre>
                  <pre>{decisionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="confirm">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Revisar Order.Confirm()</h3>
                    <p className={styles.sub}>Confirmar solo debe ser posible cuando la orden cumple las reglas.</p>
                  </div>
                  <span className={styles.chip}>Confirmar</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{confirmQuestionSnippet}</pre>
                  <pre>{confirmRulesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="pay">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Revisar Order.Pay()</h3>
                    <p className={styles.sub}>Pagar tambien es dominio, no solo orquestacion.</p>
                  </div>
                  <span className={styles.chip}>Payment</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{payQuestionSnippet}</pre>
                  <pre>{payRulesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cancel">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Revisar Order.Cancel()</h3>
                    <p className={styles.sub}>El cancelado no deberia romper el flujo de estados.</p>
                  </div>
                  <span className={styles.chip}>Cancelacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cancelQuestionSnippet}</pre>
                  <pre>{cancelRulesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="review">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Que revisar antes de tocar controllers</h3>
                    <p className={styles.sub}>Primero hay que dejar claro el dominio y sus reglas.</p>
                  </div>
                  <span className={styles.chip}>Revision</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{reviewQuestionSnippet}</pre>
                  <pre>{reviewAnswerSnippet}</pre>
                  <div className={styles.callout}>Las decisiones de dominio deben quedar documentadas.</div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Cierre</h3>
                    <p className={styles.sub}>Si el dominio esta mal, todo lo demas estara mal.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{projectReminderSnippet}</pre>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/103">
                      <span className={styles.kbd}>←</span> Dia 103
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
                  <p>Dia 104 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Prioridad:</strong> corregir el modelo antes de abrir la API.
                </div>
                <div className={styles.li}>
                  <strong>Foco:</strong> estados, invariantes y comportamiento de Order.
                </div>
                <div className={styles.li}>
                  <strong>Regla:</strong> primero dominio, despues repositorios y controllers.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> evitar rehacer trabajo por un modelo debil.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
