"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "scenario", label: "2) Escenario" },
  { id: "delivery", label: "3) Delivery" },
  { id: "problem", label: "4) Problema" },
  { id: "meaning", label: "5) Idempotencia" },
  { id: "non-idempotent", label: "6) No idempotente" },
  { id: "protection", label: "7) Proteccion" },
  { id: "table", label: "8) Tabla" },
  { id: "flow", label: "9) Flujo" },
  { id: "queues", label: "10) Colas" },
  { id: "outbox", label: "11) Outbox" },
  { id: "mistake", label: "12) Error" },
  { id: "ack", label: "13) ACK" },
  { id: "orderflow", label: "14) OrderFlow" },
  { id: "storage", label: "15) Persistencia" },
  { id: "thinking", label: "16) Mentalidad" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `Outbox
↓
No perder eventos

Consumidor idempotente
↓
No romper el negocio si llegan duplicados`;

const questionSnippet = `¿Que ocurre si RabbitMQ entrega
el mismo mensaje dos veces?

Puede ocurrir.

No es un bug.`;

const scenarioSnippet = `Order Service
↓
OrderCreated
↓
Inventory descuenta stock
↓
Inventory cae antes del ACK
↓
RabbitMQ reenvia el mensaje`;

const deliverySnippet = `At Least Once Delivery

El mensaje llegara:
una vez
o varias veces

pero no se perdera.`;

const problemSnippet = `Stock

100
↓
99
↓
98

El inventario quedo incorrecto.`;

const meaningSnippet = `Ejecutar la misma operacion varias veces
produce el mismo resultado
que ejecutarla una sola vez.`;

const lightSnippet = `ON
↓
ON
↓
ON

La luz sigue encendida.`;

const nonIdempotentSnippet = `Cuenta

100
↓
+10
↓
110
↓
+10
↓
120`;

const protectionSnippet = `MessageId
↓
¿Ya procese este MessageId?
↓
Si existe: ignorar
↓
Si no existe: procesar`;

const tableSnippet = `ProcessedMessages

MessageId | ProcessedAt
abc123    | 10:35
xyz456    | 10:41`;

const flowSnippet = `Llega mensaje
↓
Buscar MessageId
↓
¿Existe?

No
↓
Procesar
↓
Guardar MessageId
↓
ACK RabbitMQ

Si
↓
ACK RabbitMQ
↓
No hacer nada`;

const queuesSnippet = `Colas distintas
↓
cada consumidor hace su trabajo

Mismo consumidor
↓
MessageId se procesa una sola vez`;

const outboxSnippet = `Outbox
↓
puede publicar dos veces

Consumidor
↓
debe soportarlo`;

const mistakeSnippet = `RabbitMQ nunca duplica mensajes.

Falso.

Nunca me pasara.

Tambien falso.`;

const ackSnippet = `Procesar
↓
Guardar resultado
↓
Guardar MessageId
↓
ACK`;

const orderflowSnippet = `OrderCreated
↓
Inventory pregunta:
¿Ya procese este MessageId?

No
↓
Descontar stock
Guardar MessageId
ACK

Si
↓
Solo ACK`;

const storageSnippet = `La decision
y
el procesamiento

deben formar parte
de la misma transaccion`;

const thinkingSnippet = `Backend junior:
El mensaje llego.
Lo proceso.

Backend senior:
¿Y si este mensaje
ya lo procese ayer?`;

const exerciseSnippet = `Inventory consume:
OrderCreated

RabbitMQ lo entrega dos veces.

1. Que identificador tendria el mensaje?
2. Donde comprobarias si ya fue procesado?
3. Cuando registrarias ese MessageId?
4. En que momento enviarias el ACK?
5. Que ocurre si el consumidor cae justo antes del ACK?`;

const closingSnippet = `La fiabilidad no consiste
en evitar duplicados.

Consiste en que los duplicados
no puedan romper el negocio.`;

export default function Daily124Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/123";
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
              <div className={styles.brandSub}>Idempotencia en consumidores</div>
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
            <Link className={styles.btn} href="/daily/123">
              <span className={styles.kbd}>←</span> Dia 123
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/125">
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
                <div className={styles.createdAt}>08/07/2026</div>
                <div className={styles.badge}>Daily #124 • Mensajeria confiable</div>
                <h2 className={styles.title}>Idempotencia en consumidores: como evitar procesar el mismo mensaje dos veces</h2>
                <p className={styles.lead}>
                  En sistemas distribuidos debes asumir que un mensaje puede llegar mas de una vez. La solucion no es
                  confiar en el broker, sino disenar consumidores que soporten duplicados.
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
                    <p className={styles.sub}>Outbox protege al productor; idempotencia protege al consumidor.</p>
                  </div>
                  <span className={styles.chip}>Idempotencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{questionSnippet}</pre>
                  <div className={styles.callout}>En sistemas distribuidos debes asumir que un mensaje puede llegar mas de una vez.</div>
                </div>
              </section>

              <section className={styles.section} id="scenario">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El escenario</h3>
                    <p className={styles.sub}>El consumidor puede caer despues de procesar y antes de confirmar.</p>
                  </div>
                  <span className={styles.chip}>RabbitMQ</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{scenarioSnippet}</pre>
                  <div className={styles.quote}>RabbitMQ reenvia porque no recibio confirmacion.</div>
                </div>
              </section>

              <section className={styles.section} id="delivery">
                <div className={styles.shd}>
                  <div>
                    <h3>3. At least once delivery</h3>
                    <p className={styles.sub}>La garantia comun prioriza no perder mensajes.</p>
                  </div>
                  <span className={styles.chip}>Delivery</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deliverySnippet}</pre>
                  <div className={styles.callout}>Exactamente una vez seria una garantia mucho mas cara y compleja.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El problema</h3>
                    <p className={styles.sub}>Procesar dos veces puede alterar datos de negocio.</p>
                  </div>
                  <span className={styles.chip}>Stock</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{problemSnippet}</pre>
                  <div className={styles.quote}>El problema no fue RabbitMQ. Fue el consumidor.</div>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que significa idempotencia</h3>
                    <p className={styles.sub}>Repetir la operacion no debe cambiar el resultado final.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{meaningSnippet}</pre>
                  <pre>{lightSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="non-idempotent">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Ejemplo no idempotente</h3>
                    <p className={styles.sub}>Sumar dinero o descontar stock cambia cada vez.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{nonIdempotentSnippet}</pre>
                  <div className={styles.callout}>Muchos procesos de negocio no son naturalmente idempotentes.</div>
                </div>
              </section>

              <section className={styles.section} id="protection">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como proteger un consumidor</h3>
                    <p className={styles.sub}>Cada mensaje necesita un identificador estable.</p>
                  </div>
                  <span className={styles.chip}>MessageId</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{protectionSnippet}</pre>
                  <div className={styles.quote}>El mensaje puede llegar diez veces y solo se procesa una.</div>
                </div>
              </section>

              <section className={styles.section} id="table">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Tabla de mensajes procesados</h3>
                    <p className={styles.sub}>Cada consumidor mantiene su propio registro.</p>
                  </div>
                  <span className={styles.chip}>Persistencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{tableSnippet}</pre>
                  <div className={styles.callout}>Es una tecnica muy comun en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Flujo completo</h3>
                    <p className={styles.sub}>Primero decides si procesar; luego confirmas al broker.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{flowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="queues">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Colas y consumidores</h3>
                    <p className={styles.sub}>Duplicado no significa lo mismo en todos los contextos.</p>
                  </div>
                  <span className={styles.chip}>Consumer</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{queuesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="outbox">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Relacion con Outbox</h3>
                    <p className={styles.sub}>Ambos patrones trabajan juntos.</p>
                  </div>
                  <span className={styles.chip}>Outbox</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{outboxSnippet}</pre>
                  <div className={styles.quote}>Outbox protege al productor. Idempotencia protege al consumidor.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Error tipico</h3>
                    <p className={styles.sub}>Confiar en que el broker nunca duplicara mensajes.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakeSnippet}</pre>
                  <div className={styles.callout}>Disena pensando que sucedera.</div>
                </div>
              </section>

              <section className={styles.section} id="ack">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Y el ACK</h3>
                    <p className={styles.sub}>El ACK confirma recepcion, no unicidad del procesamiento.</p>
                  </div>
                  <span className={styles.chip}>ACK</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ackSnippet}</pre>
                  <div className={styles.quote}>Si el consumidor cae antes del ACK, RabbitMQ reenvia. Eso es lo que queremos.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Ejemplo en OrderFlow</h3>
                    <p className={styles.sub}>Inventory no debe descontar stock dos veces.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="storage">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Donde guardar el MessageId</h3>
                    <p className={styles.sub}>Normalmente, en la base de datos del consumidor.</p>
                  </div>
                  <span className={styles.chip}>Transaccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{storageSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Mentalidad senior</h3>
                    <p className={styles.sub}>La pregunta correcta aparece antes de procesar.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{thinkingSnippet}</pre>
                  <div className={styles.callout}>Esa pregunta evita muchos errores en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Disena el flujo de un consumidor seguro.</p>
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
                    <p className={styles.sub}>Los duplicados no deben poder romper el negocio.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/123">
                      <span className={styles.kbd}>←</span> Dia 123
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/125">
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
