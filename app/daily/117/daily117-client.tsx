"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "sync", label: "2) Sincronica" },
  { id: "async", label: "3) Asincronica" },
  { id: "compare", label: "4) Comparacion" },
  { id: "pros", label: "5) Ventajas" },
  { id: "cons", label: "6) Desventajas" },
  { id: "eventual", label: "7) Consistencia eventual" },
  { id: "orderflow", label: "8) OrderFlow" },
  { id: "thinking", label: "9) Mentalidad" },
  { id: "exercise", label: "10) Ejercicio" },
  { id: "closing", label: "11) Cierre" },
] as const;

const ideaSnippet = `¿REST o RabbitMQ?

La pregunta real es:
¿Necesito una respuesta ahora mismo?`;

const syncSnippet = `Order Service

↓

Payment Service

↓

Esperar respuesta

↓

Continuar`;

const dailyLifeSyncSnippet = `Llamas a un restaurante

Preguntas:
¿Tienen mesa?

Esperas

Sí o No`;

const asyncSnippet = `Order Service

↓

RabbitMQ

↓

Continua`;

const dailyLifeAsyncSnippet = `Envias un correo

No te quedas esperando delante del ordenador

Continuas trabajando`;

const compareSnippet = `Sincronica
Enviar
Esperar
Recibir
Continuar

Asincronica
Enviar
Continuar
Alguien procesa despues`;

const prosSnippet = `Ventajas sincronica
Sencilla
Lineal
Respuesta inmediata

Ventajas asincronica
Desacoplamiento
Paralelismo
Escala mejor`;

const consSnippet = `Sincronica
alto acoplamiento temporal
timeouts
efecto dominó

Asincronica
mas complejidad
eventual consistency
duplicados
orden de mensajes`;

const eventualSnippet = `Order Created

Inventory aun no actualizo

Durante unos segundos:
Order existe
Stock antiguo`;

const orderflowSnippet = `REST
Consultar productos
Consultar ordenes

gRPC
Comunicacion interna de alta velocidad

Eventos
Order Created -> Email / Analytics / Audit / Inventory`;

const thinkingSnippet = `Backend junior
¿Qué tecnologia uso?

Backend senior
¿El negocio necesita esperar?

Si sí -> sincronico
Si no -> asincronico`;

const exerciseSnippet = `Consultar producto
Crear orden
Procesar pago
Enviar email
Actualizar inventario
Generar factura PDF
Actualizar analiticas
Enviar SMS`;

const closingSnippet = `La pregunta mas importante no es como enviar un mensaje.

Es si realmente hay que esperar la respuesta para seguir generando valor.`;

export default function Daily117Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/116";
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
              <div className={styles.brandSub}>Sincronico vs asincronico</div>
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
            <Link className={styles.btn} href="/daily/116">
              <span className={styles.kbd}>←</span> Dia 116
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/118">
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
                <div className={styles.createdAt}>01/07/2026</div>
                <div className={styles.badge}>Daily #117 • Comunicación distribuida</div>
                <h2 className={styles.title}>
                  Comunicación síncrona vs asíncrona: cuándo esperar una respuesta y cuándo continuar sin ella
                </h2>
                <p className={styles.lead}>
                  Antes de elegir una tecnologia, primero hay que elegir el modelo de comunicacion que el negocio
                  necesita.
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
                    <p className={styles.sub}>La pregunta real no es la tecnologia, sino si hay que esperar respuesta.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <div className={styles.callout}>Antes de elegir REST, gRPC o RabbitMQ, elige el modelo de comunicacion.</div>
                </div>
              </section>

              <section className={styles.section} id="sync">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Comunicacion sincronica</h3>
                    <p className={styles.sub}>El emisor espera hasta recibir una respuesta.</p>
                  </div>
                  <span className={styles.chip}>Sync</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{syncSnippet}</pre>
                  <pre>{dailyLifeSyncSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="async">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Comunicacion asincronica</h3>
                    <p className={styles.sub}>El emisor envia un mensaje y continua sin esperar respuesta inmediata.</p>
                  </div>
                  <span className={styles.chip}>Async</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{asyncSnippet}</pre>
                  <pre>{dailyLifeAsyncSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="compare">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Comparacion</h3>
                    <p className={styles.sub}>La diferencia cambia la forma completa de diseñar el flujo.</p>
                  </div>
                  <span className={styles.chip}>Comparar</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{compareSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="pros">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Ventajas de cada modelo</h3>
                    <p className={styles.sub}>Simplicidad para sincrono, desacoplamiento para asincrono.</p>
                  </div>
                  <span className={styles.chip}>Pros</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{prosSnippet}</pre>
                  <div className={styles.quote}>La elección buena es la que encaja con el flujo, no la que más impresiona.</div>
                </div>
              </section>

              <section className={styles.section} id="cons">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Desventajas</h3>
                    <p className={styles.sub}>Cada modelo trae su propia deuda.</p>
                  </div>
                  <span className={styles.chip}>Coste</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{consSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="eventual">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Consistencia eventual</h3>
                    <p className={styles.sub}>En asincrono no todo ocurre al mismo tiempo.</p>
                  </div>
                  <span className={styles.chip}>Eventual</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventualSnippet}</pre>
                  <div className={styles.callout}>Es normal que el sistema tarde unos segundos en converger.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>8. OrderFlow</h3>
                    <p className={styles.sub}>Para este proyecto la mezcla de modelos tiene sentido.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <div className={styles.quote}>REST para consulta, gRPC para trafico interno y eventos para trabajo desacoplado.</div>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Mentalidad senior</h3>
                    <p className={styles.sub}>Primero negocio, despues tecnologia.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{thinkingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Mini ejercicio</h3>
                    <p className={styles.sub}>Clasifica las operaciones segun el modelo que mejor encaje.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Consultar producto.</li>
                    <li>Crear orden.</li>
                    <li>Procesar pago.</li>
                    <li>Enviar email.</li>
                    <li>Actualizar inventario.</li>
                    <li>Generar factura PDF.</li>
                    <li>Actualizar analiticas.</li>
                    <li>Enviar SMS.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Cierre</h3>
                    <p className={styles.sub}>El modelo de comunicacion se decide por el negocio, no por la moda.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/116">
                      <span className={styles.kbd}>←</span> Dia 116
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/118">
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
