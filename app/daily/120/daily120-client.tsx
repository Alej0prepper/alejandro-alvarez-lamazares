"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "broker", label: "3) Broker" },
  { id: "actors", label: "4) Actores" },
  { id: "queue", label: "5) Queue" },
  { id: "consumer-off", label: "6) Consumer OFF" },
  { id: "exchange", label: "7) Exchange" },
  { id: "why-exchange", label: "8) Por que exchange" },
  { id: "direct", label: "9) Direct" },
  { id: "fanout", label: "10) Fanout" },
  { id: "topic", label: "11) Topic" },
  { id: "routing", label: "12) Routing Key" },
  { id: "orderflow", label: "13) OrderFlow" },
  { id: "mistake", label: "14) Error" },
  { id: "thinking", label: "15) Mentalidad" },
  { id: "exercise", label: "16) Ejercicio" },
  { id: "closing", label: "17) Cierre" },
] as const;

const contextSnippet = `Comunicacion sincronica
Comunicacion asincronica
API Gateway
Service Discovery

Ahora:
RabbitMQ`;

const problemSnippet = `Order Service
↓
POST /notifications
↓
Notification Service caido
↓
Order falla`;

const rabbitIdeaSnippet = `No:
Haz esto ahora

Si:
Aqui tienes un mensaje.
Procesalo cuando puedas.`;

const brokerSnippet = `Comprador
↓
Broker
↓
Vendedor

Productores y consumidores
nunca hablan directamente.`;

const actorsSnippet = `Productor
Order Service

Broker
RabbitMQ

Consumidor
Notification Service`;

const flowSnippet = `Productor
↓
RabbitMQ
↓
Consumidor`;

const queueSnippet = `Mensajes
↓
Queue
↓
Consumer`;

const consumerOffSnippet = `Notification Service OFF

Order sigue enviando mensajes

RabbitMQ guarda mensajes

Notification vuelve

Empieza a consumir`;

const exchangeSnippet = `Producer
↓
Exchange
↓
Queue
↓
Consumer`;

const wrongExchangeSnippet = `Nunca:

Producer
↓
Queue`;

const whyExchangeSnippet = `El Exchange decide si el mensaje va a:

una cola
dos colas
cinco colas
ninguna cola`;

const directSnippet = `Routing Key:
payment

Binding:
payment

Resultado:
Payment Queue`;

const fanoutSnippet = `Order Created
↓
Email
Inventory
Analytics
Audit`;

const topicSnippet = `order.created
order.cancelled
payment.approved

order.*
payment.*`;

const routingSnippet = `Routing Key:
order.created

El Exchange compara esa clave
con sus reglas
y decide que cola recibe el mensaje.`;

const orderflowSnippet = `Order Service publica:
order.created

RabbitMQ
↓
Fanout Exchange
↓
Inventory Queue
Notification Queue
Analytics Queue
Audit Queue`;

const mistakeSnippet = `RabbitMQ no es una base de datos.

No almacena informacion para siempre.

Transporta mensajes
lo mas rapido posible.`;

const thinkingSnippet = `Backend junior:
Order debe llamar a Email.

Backend senior:
Order publica un evento.
Quien este interesado,
lo consumira.`;

const exerciseSnippet = `Evento:
order.created

1. Quien produce el mensaje?
2. Quien recibe primero el mensaje?
3. Que hace el Exchange?
4. Que es una Queue?
5. Que consumidores podrian estar interesados?
6. Que pasa si Notification esta apagado cinco minutos?`;

const closingSnippet = `RabbitMQ no conecta aplicaciones.

Desacopla aplicaciones mediante mensajes,
permitiendo que productores y consumidores
evolucionen independientemente.`;

export default function Daily120Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/119";
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
              <div className={styles.brandSub}>RabbitMQ, colas y routing</div>
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
            <Link className={styles.btn} href="/daily/119">
              <span className={styles.kbd}>←</span> Dia 119
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/121">
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
                <div className={styles.createdAt}>04/07/2026</div>
                <div className={styles.badge}>Daily #120 • RabbitMQ</div>
                <h2 className={styles.title}>RabbitMQ desde cero: entender colas, exchanges y routing</h2>
                <p className={styles.lead}>
                  RabbitMQ no aparece para sumar una tecnologia mas. Aparece para desacoplar servicios, absorber fallos
                  temporales y permitir trabajo asincronico.
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
                    <p className={styles.sub}>RabbitMQ existe para desacoplar sistemas.</p>
                  </div>
                  <span className={styles.chip}>Mensajeria</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{contextSnippet}</pre>
                  <div className={styles.callout}>Si no entiendes el problema, RabbitMQ parece solo otra tecnologia mas.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema</h3>
                    <p className={styles.sub}>Un fallo no critico puede tumbar una operacion que si era posible.</p>
                  </div>
                  <span className={styles.chip}>Acoplamiento</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{problemSnippet}</pre>
                  <pre>{rabbitIdeaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="broker">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que es un broker</h3>
                    <p className={styles.sub}>Un intermediario entre quien produce y quien consume.</p>
                  </div>
                  <span className={styles.chip}>Broker</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{brokerSnippet}</pre>
                  <div className={styles.quote}>RabbitMQ es un Message Broker.</div>
                </div>
              </section>

              <section className={styles.section} id="actors">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Los tres actores</h3>
                    <p className={styles.sub}>Productor, broker y consumidor.</p>
                  </div>
                  <span className={styles.chip}>Actores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{actorsSnippet}</pre>
                  <pre>{flowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="queue">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que es una cola</h3>
                    <p className={styles.sub}>La cola absorbe diferencias de velocidad entre productor y consumidor.</p>
                  </div>
                  <span className={styles.chip}>Queue</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{queueSnippet}</pre>
                  <div className={styles.callout}>Los mensajes esperan hasta que un consumidor pueda procesarlos.</div>
                </div>
              </section>

              <section className={styles.section} id="consumer-off">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Si el consumidor esta apagado</h3>
                    <p className={styles.sub}>La orden no tiene por que fallar solo porque Notification este caido.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{consumerOffSnippet}</pre>
                  <div className={styles.quote}>Esto es desacoplamiento temporal.</div>
                </div>
              </section>

              <section className={styles.section} id="exchange">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Exchange</h3>
                    <p className={styles.sub}>El productor no envia directamente a una cola.</p>
                  </div>
                  <span className={styles.chip}>Exchange</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exchangeSnippet}</pre>
                  <pre>{wrongExchangeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="why-exchange">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Por que existe el Exchange</h3>
                    <p className={styles.sub}>Porque un mensaje puede terminar en una o muchas colas.</p>
                  </div>
                  <span className={styles.chip}>Routing</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whyExchangeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="direct">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Direct Exchange</h3>
                    <p className={styles.sub}>El caso simple: una clave lleva a una cola concreta.</p>
                  </div>
                  <span className={styles.chip}>Direct</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{directSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="fanout">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Fanout Exchange</h3>
                    <p className={styles.sub}>Un mensaje se replica hacia todas las colas vinculadas.</p>
                  </div>
                  <span className={styles.chip}>Fanout</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fanoutSnippet}</pre>
                  <div className={styles.quote}>Fanout es broadcast.</div>
                </div>
              </section>

              <section className={styles.section} id="topic">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Topic Exchange</h3>
                    <p className={styles.sub}>Permite suscribirse por patrones de routing.</p>
                  </div>
                  <span className={styles.chip}>Topic</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{topicSnippet}</pre>
                  <div className={styles.callout}>Muy usado en arquitecturas grandes.</div>
                </div>
              </section>

              <section className={styles.section} id="routing">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Routing Key</h3>
                    <p className={styles.sub}>La clave que el Exchange usa para decidir destino.</p>
                  </div>
                  <span className={styles.chip}>Key</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{routingSnippet}</pre>
                  <div className={styles.quote}>Routing Key no es lo mismo que nombre de cola.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>13. OrderFlow</h3>
                    <p className={styles.sub}>Crear una orden puede publicar un evento que varios servicios consumen.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Error tipico</h3>
                    <p className={styles.sub}>Confundir RabbitMQ con almacenamiento permanente.</p>
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
                    <p className={styles.sub}>Publicar eventos reduce acoplamiento entre servicios.</p>
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
                    <p className={styles.sub}>Razonar el flujo basico de un evento en RabbitMQ.</p>
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
                    <h3>17. Cierre</h3>
                    <p className={styles.sub}>La mejor comunicacion distribuida muchas veces evita llamadas directas.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/119">
                      <span className={styles.kbd}>←</span> Dia 119
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/121">
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
