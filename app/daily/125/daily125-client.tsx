"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "poison", label: "3) Poison" },
  { id: "dlq", label: "4) DLQ" },
  { id: "keep", label: "5) No eliminar" },
  { id: "flow", label: "6) Flujo" },
  { id: "retries", label: "7) Reintentos" },
  { id: "smart-retries", label: "8) Retries" },
  { id: "backoff", label: "9) Backoff" },
  { id: "monitoring", label: "10) Revision" },
  { id: "actions", label: "11) Acciones" },
  { id: "orderflow", label: "12) OrderFlow" },
  { id: "patterns", label: "13) Patrones" },
  { id: "mistake", label: "14) Error" },
  { id: "thinking", label: "15) Mentalidad" },
  { id: "takeaway", label: "16) Idea" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `Outbox
↓
publicar eventos

Idempotencia
↓
soportar duplicados

Retries
↓
recuperar fallos temporales

DLQ
↓
aislar mensajes imposibles`;

const questionSnippet = `¿Y si un mensaje nunca podra procesarse?

No dentro de 5 segundos.
No dentro de 5 minutos.

Nunca.`;

const problemSnippet = `OrderCreated
↓
Quantity = -50
↓
Consumer falla
↓
Retry
↓
Falla
↓
Retry
↓
Falla
↓
...`;

const poisonSnippet = `Poison Message

Un mensaje que nunca podra procesarse
correctamente debido a un problema permanente.`;

const poisonExamplesSnippet = `JSON corrupto
Campo obligatorio inexistente
Datos invalidos
Version incompatible
Referencias inexistentes`;

const dlqSnippet = `Retry
↓
Retry
↓
Retry
↓
Dead Letter Queue`;

const keepSnippet = `Si lo eliminas:
no existe forma de recuperarlo.

Si lo envias a DLQ:
puedes investigar,
corregir
y reprocesar.`;

const fullFlowSnippet = `OrderCreated
↓
Consumer
↓
Error
↓
Retry
↓
Error
↓
Retry
↓
Error
↓
Dead Letter Queue`;

const retryCountSnippet = `3

5

10

Depende del negocio.
Lo importante:
no reintentar infinitamente.`;

const smartRetriesSnippet = `Timeout
↓
puede resolverse solo
↓
reintentar tiene sentido

JSON invalido
↓
nunca mejorara
↓
no merece retries`;

const backoffSnippet = `1 segundo
↓
5 segundos
↓
30 segundos
↓
2 minutos`;

const monitoringSnippet = `Una DLQ debe ser revisada por:

Operaciones
Backend
Observabilidad
Soporte`;

const actionsSnippet = `Mensaje en DLQ
↓
Corregir datos y reprocesar

Corregir codigo y reprocesar

Error de negocio y descartar conscientemente`;

const orderflowSnippet = `PaymentApproved
↓
Inventory reserva stock
↓
ProductId ya no existe
↓
5 intentos
↓
Dead Letter Queue`;

const patternsSnippet = `Outbox
↓
garantiza que el evento salga

RabbitMQ
↓
lo entrega

Idempotencia
↓
evita duplicados

DLQ
↓
gestiona mensajes imposibles`;

const mistakeSnippet = `Tengo RabbitMQ.
Ya soy resiliente.

No.

Sin retries,
DLQ
y monitorizacion,
apareceran mensajes bloqueados.`;

const thinkingSnippet = `Backend junior:
Si falla,
lo vuelvo a intentar.

Backend senior:
¿Cuantas veces?
¿Por que falla?
¿Es temporal?
¿Es permanente?
¿Donde termina ese mensaje?`;

const takeawaySnippet = `No todos los errores
pueden solucionarse
con un reintento.

Algunos mensajes deben apartarse
para proteger el resto del sistema.`;

const exerciseSnippet = `Inventory Service consume:
OrderCreated

Mensaje recibido:
{
  "orderId": "123",
  "productId": null,
  "quantity": 5
}

1. Intentarias procesarlo?
2. Cuantos reintentos permitirias?
3. Usarias Backoff exponencial?
4. En que momento lo enviarias a la DLQ?
5. Quien deberia revisar posteriormente ese mensaje?`;

const closingSnippet = `La estabilidad del conjunto
siempre es mas importante
que intentar procesar
un unico mensaje
a cualquier precio.`;

export default function Daily125Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/124";
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
              <div className={styles.brandSub}>Dead Letter Queues y mensajes irrecuperables</div>
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
            <Link className={styles.btn} href="/daily/124">
              <span className={styles.kbd}>←</span> Dia 124
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/126">
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
                <div className={styles.createdAt}>09/07/2026</div>
                <div className={styles.badge}>Daily #125 • DLQ</div>
                <h2 className={styles.title}>Dead Letter Queues: que hacer cuando un mensaje nunca puede procesarse</h2>
                <p className={styles.lead}>
                  No todos los errores son temporales. Una Dead Letter Queue aparta los mensajes irrecuperables para
                  que el resto del sistema siga funcionando y alguien pueda investigarlos despues.
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
                    <p className={styles.sub}>La robustez no termina con Outbox e idempotencia.</p>
                  </div>
                  <span className={styles.chip}>DLQ</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{questionSnippet}</pre>
                  <div className={styles.callout}>Aqui aparecen las Dead Letter Queues.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema</h3>
                    <p className={styles.sub}>Un mensaje invalido puede entrar en un ciclo infinito.</p>
                  </div>
                  <span className={styles.chip}>Poison</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{problemSnippet}</pre>
                  <div className={styles.quote}>Ese mensaje esta envenenado.</div>
                </div>
              </section>

              <section className={styles.section} id="poison">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que es un Poison Message</h3>
                    <p className={styles.sub}>No todos los errores se arreglan esperando.</p>
                  </div>
                  <span className={styles.chip}>Mensaje</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{poisonSnippet}</pre>
                  <pre>{poisonExamplesSnippet}</pre>
                  <div className={styles.callout}>No importa cuantas veces lo intentes. Siempre fallara.</div>
                </div>
              </section>

              <section className={styles.section} id="dlq">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que es una Dead Letter Queue</h3>
                    <p className={styles.sub}>Una cola especial para mensajes que ya no pueden procesarse.</p>
                  </div>
                  <span className={styles.chip}>Queue</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dlqSnippet}</pre>
                  <div className={styles.quote}>Una DLQ protege al resto del sistema.</div>
                </div>
              </section>

              <section className={styles.section} id="keep">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Por que no eliminar el mensaje</h3>
                    <p className={styles.sub}>Eliminarlo borra evidencia util para diagnosticar.</p>
                  </div>
                  <span className={styles.chip}>Auditoria</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{keepSnippet}</pre>
                  <div className={styles.callout}>Nunca tires informacion importante.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Flujo completo</h3>
                    <p className={styles.sub}>El mensaje problematico queda apartado y el consumidor continua.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fullFlowSnippet}</pre>
                  <div className={styles.quote}>Un unico mensaje ya no bloquea toda la cola.</div>
                </div>
              </section>

              <section className={styles.section} id="retries">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Cuantos reintentos hacer</h3>
                    <p className={styles.sub}>No existe un numero magico.</p>
                  </div>
                  <span className={styles.chip}>Retries</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{retryCountSnippet}</pre>
                  <div className={styles.callout}>Los recursos tambien son limitados.</div>
                </div>
              </section>

              <section className={styles.section} id="smart-retries">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Retries inteligentes</h3>
                    <p className={styles.sub}>Distingue errores temporales y permanentes.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{smartRetriesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="backoff">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Backoff exponencial</h3>
                    <p className={styles.sub}>No ataques un servicio que ya esta fallando.</p>
                  </div>
                  <span className={styles.chip}>Backoff</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{backoffSnippet}</pre>
                  <div className={styles.callout}>Muy utilizado en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="monitoring">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Quien revisa la DLQ</h3>
                    <p className={styles.sub}>Una DLQ llena es una alarma operativa.</p>
                  </div>
                  <span className={styles.chip}>Ops</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{monitoringSnippet}</pre>
                  <div className={styles.quote}>Un mensaje alli significa que alguien debe investigar.</div>
                </div>
              </section>

              <section className={styles.section} id="actions">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Que hacer con un mensaje en DLQ</h3>
                    <p className={styles.sub}>Debe haber una decision explicita.</p>
                  </div>
                  <span className={styles.chip}>Operacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{actionsSnippet}</pre>
                  <div className={styles.callout}>Nunca ignorarlo.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Ejemplo en OrderFlow</h3>
                    <p className={styles.sub}>Un pedido problematico no debe detener todos los pedidos.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <div className={styles.quote}>Mientras tanto, los demas pedidos siguen funcionando.</div>
                </div>
              </section>

              <section className={styles.section} id="patterns">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Relacion con Outbox e Idempotencia</h3>
                    <p className={styles.sub}>Cada patron protege una parte distinta del sistema.</p>
                  </div>
                  <span className={styles.chip}>Patrones</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{patternsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Error tipico</h3>
                    <p className={styles.sub}>RabbitMQ es la herramienta; la resiliencia depende del diseno.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Mentalidad senior</h3>
                    <p className={styles.sub}>La pregunta no es solo si falla, sino como termina.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{thinkingSnippet}</pre>
                  <div className={styles.callout}>Esa diferencia evita sistemas bloqueados durante dias.</div>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Idea que me llevo hoy</h3>
                    <p className={styles.sub}>No todo se arregla insistiendo.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{takeawaySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Clasifica el fallo y decide la estrategia.</p>
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
                    <p className={styles.sub}>La estabilidad del sistema completo tiene prioridad.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/124">
                      <span className={styles.kbd}>←</span> Dia 124
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/126">
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
