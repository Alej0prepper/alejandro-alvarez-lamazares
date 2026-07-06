"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "event", label: "2) Evento" },
  { id: "command", label: "3) Evento vs comando" },
  { id: "architecture", label: "4) EDA" },
  { id: "owner", label: "5) Quien publica" },
  { id: "payload", label: "6) Contenido" },
  { id: "traditional", label: "7) Tradicional" },
  { id: "event-flow", label: "8) Eventos" },
  { id: "evolution", label: "9) Evolucion" },
  { id: "orderflow", label: "10) OrderFlow" },
  { id: "failure", label: "11) Fallos" },
  { id: "mistakes", label: "12) Errores" },
  { id: "rest", label: "13) REST" },
  { id: "events", label: "14) Eventos" },
  { id: "thinking", label: "15) Mentalidad" },
  { id: "exercise", label: "16) Ejercicio" },
  { id: "closing", label: "17) Cierre" },
] as const;

const ideaSnippet = `Productores
Exchanges
Colas
Consumidores

Pregunta:
¿Que mensajes deberia enviar un sistema?`;

const commandSnippet = `Comandos:
SendEmail
UpdateInventory
CreateInvoice

Eventos:
OrderCreated
PaymentApproved
UserRegistered`;

const eventSnippet = `Un evento representa
algo que ya ocurrio
dentro del negocio.`;

const commandVsEventSnippet = `Comando:
Haz esto.

CreateOrder
SendEmail
ApprovePayment

Evento:
Esto ya ocurrio.

OrderCreated
EmailSent
PaymentApproved`;

const architectureSnippet = `OrderCreated
↓
RabbitMQ
↓
Notification
Inventory
Analytics
Audit`;

const ownerSnippet = `Order Service crea una orden
↓
Order Service publica:
OrderCreated`;

const badOwnerSnippet = `Notification no publica OrderCreated
porque Notification no creo la orden.`;

const payloadSnippet = `OrderId
CustomerId
CreatedAt
Total`;

const badPayloadSnippet = `No debe contener:
logica
reglas
comportamiento`;

const traditionalSnippet = `Order
↓
Payment
↓
Inventory
↓
Notification
↓
Analytics`;

const eventFlowSnippet = `OrderCreated
↓
RabbitMQ
↓
¿Me interesa este evento?
↓
consume o ignora`;

const evolutionSnippet = `Mañana agregamos:
Fraud Service

No modificamos Order Service.

Fraud escucha:
OrderCreated`;

const orderflowSnippet = `OrderCreated

Inventory descuenta stock
Notification envia email
Analytics actualiza metricas
Audit registra evento`;

const failureSnippet = `Analytics falla

Inventory sigue funcionando
Email sigue funcionando
Audit sigue funcionando

Analytics procesa mas tarde`;

const technicalEventSnippet = `Mal:
RowInserted

Mejor:
OrderCreated`;

const tooManyEventsSnippet = `UserNameUpdated
AddressUpdated
PhoneUpdated
ThemeChanged

Pregunta:
¿Hay otro servicio interesado?`;

const restSnippet = `REST:
consultas
operaciones inmediatas

Eventos:
notificaciones
procesos largos
integraciones`;

const orderflowEventsSnippet = `OrderCreated
OrderConfirmed
OrderCancelled
PaymentApproved
ProductCreated
ProductDeleted
InventoryUpdated`;

const thinkingSnippet = `Backend junior:
Order debe llamar a Inventory.

Backend senior:
Order publica OrderCreated
y quien quiera reaccionar,
lo hara.`;

const exerciseSnippet = `OrderCreated
OrderConfirmed
OrderCancelled
PaymentApproved
PaymentRejected
InventoryReserved
InvoiceGenerated
EmailSent`;

const closingSnippet = `Los servicios no colaboran enviandose ordenes.

Colaboran publicando hechos del negocio
para que otros reaccionen cuando sea necesario.`;

export default function Daily121Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/120";
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
              <div className={styles.brandSub}>Event-Driven Architecture</div>
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
            <Link className={styles.btn} href="/daily/120">
              <span className={styles.kbd}>←</span> Dia 120
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/122">
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
                <div className={styles.badge}>Daily #121 • Event-Driven</div>
                <h2 className={styles.title}>Event-Driven Architecture: construir sistemas basados en eventos</h2>
                <p className={styles.lead}>
                  Despues de entender RabbitMQ, el siguiente paso es decidir que mensajes vale la pena publicar. En
                  sistemas modernos, esos mensajes suelen ser eventos del negocio.
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
                    <p className={styles.sub}>No se trata solo de mandar mensajes, sino de publicar hechos del negocio.</p>
                  </div>
                  <span className={styles.chip}>Eventos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{commandSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="event">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es un evento</h3>
                    <p className={styles.sub}>Un evento siempre habla del pasado.</p>
                  </div>
                  <span className={styles.chip}>Hecho</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventSnippet}</pre>
                  <div className={styles.callout}>OrderCreated no pide crear una orden; informa que la orden ya fue creada.</div>
                </div>
              </section>

              <section className={styles.section} id="command">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Evento vs comando</h3>
                    <p className={styles.sub}>Un comando solicita accion. Un evento informa un hecho.</p>
                  </div>
                  <span className={styles.chip}>Diferencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{commandVsEventSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="architecture">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que es Event-Driven Architecture</h3>
                    <p className={styles.sub}>Los sistemas reaccionan a eventos en lugar de llamarse directamente.</p>
                  </div>
                  <span className={styles.chip}>EDA</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{architectureSnippet}</pre>
                  <div className={styles.quote}>El evento es el centro de la comunicacion.</div>
                </div>
              </section>

              <section className={styles.section} id="owner">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Quien genera un evento</h3>
                    <p className={styles.sub}>Lo publica el servicio que posee el negocio que acaba de ocurrir.</p>
                  </div>
                  <span className={styles.chip}>Ownership</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ownerSnippet}</pre>
                  <pre>{badOwnerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="payload">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que contiene un evento</h3>
                    <p className={styles.sub}>Datos suficientes para que otros servicios reaccionen.</p>
                  </div>
                  <span className={styles.chip}>Payload</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{payloadSnippet}</pre>
                  <pre>{badPayloadSnippet}</pre>
                  <div className={styles.callout}>Un evento es informacion, no comportamiento.</div>
                </div>
              </section>

              <section className={styles.section} id="traditional">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Flujo tradicional</h3>
                    <p className={styles.sub}>Cada servicio conoce al siguiente y aumenta el acoplamiento.</p>
                  </div>
                  <span className={styles.chip}>Acoplado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{traditionalSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="event-flow">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Flujo basado en eventos</h3>
                    <p className={styles.sub}>Cada consumidor decide si le interesa reaccionar.</p>
                  </div>
                  <span className={styles.chip}>Desacoplado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="evolution">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Ventaja enorme</h3>
                    <p className={styles.sub}>Agregar consumidores no obliga a modificar el productor.</p>
                  </div>
                  <span className={styles.chip}>Evolucion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{evolutionSnippet}</pre>
                  <div className={styles.quote}>El productor no cambia. Los consumidores evolucionan.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>10. OrderFlow</h3>
                    <p className={styles.sub}>OrderCreated puede alimentar varios procesos sin llamadas directas.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <div className={styles.callout}>Nadie llama a nadie. Todos reaccionan al hecho publicado.</div>
                </div>
              </section>

              <section className={styles.section} id="failure">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Si un consumidor falla</h3>
                    <p className={styles.sub}>Un consumidor caido no deberia tumbar al resto del flujo.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{failureSnippet}</pre>
                  <div className={styles.quote}>Muchisima resiliencia.</div>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Errores tipicos</h3>
                    <p className={styles.sub}>Eventos tecnicos o demasiados eventos suelen romper la claridad.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{technicalEventSnippet}</pre>
                  <pre>{tooManyEventsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="rest">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Event-Driven no elimina REST</h3>
                    <p className={styles.sub}>REST y eventos se complementan.</p>
                  </div>
                  <span className={styles.chip}>Complemento</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{restSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="events">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Eventos posibles en OrderFlow</h3>
                    <p className={styles.sub}>Cada evento debe representar un hecho relevante del negocio.</p>
                  </div>
                  <span className={styles.chip}>Eventos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowEventsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Mentalidad senior</h3>
                    <p className={styles.sub}>El desacoplamiento nace cuando el productor deja de conocer consumidores.</p>
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
                    <h3>16. Mini ejercicio</h3>
                    <p className={styles.sub}>Pensar cada evento por productor, consumidores y tolerancia a fallos.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Que servicio publica este evento?</li>
                    <li>Que servicios podrian consumirlo?</li>
                    <li>Que pasa si un consumidor esta apagado unos minutos?</li>
                    <li>El productor deberia enterarse de ese fallo?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Cierre</h3>
                    <p className={styles.sub}>Los eventos permiten evolucionar, fallar y escalar de forma independiente.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/120">
                      <span className={styles.kbd}>←</span> Dia 120
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/122">
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
