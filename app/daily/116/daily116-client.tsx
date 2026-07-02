"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "rest", label: "3) REST" },
  { id: "grpc", label: "4) gRPC" },
  { id: "messaging", label: "5) Mensajeria" },
  { id: "compare", label: "6) Comparacion" },
  { id: "when-rest", label: "7) Cuando REST" },
  { id: "when-grpc", label: "8) Cuando gRPC" },
  { id: "when-msg", label: "9) Cuando mensajeria" },
  { id: "mistakes", label: "10) Errores" },
  { id: "orderflow", label: "11) OrderFlow" },
  { id: "exercise", label: "12) Ejercicio" },
  { id: "closing", label: "13) Cierre" },
] as const;

const ideaSnippet = `Product Service
Order Service
Payment Service
Notification Service`;

const questionSnippet = `¿Como hablan entre ellos?

Lo importante no es solo dividir servicios.
Lo importante es como colaboran.`;

const flowSnippet = `Cliente

Order Service

Payment Service

Notification Service`;

const restSnippet = `Order Service
↓ HTTP
Payment Service

POST /payments`;

const restProsSnippet = `Muy conocido
Muy facil de depurar
Compatible con casi cualquier lenguaje`;

const restConsSnippet = `El cliente espera
Si el otro servicio falla, yo tambien fallo`;

const grpcSnippet = `HTTP/2
Protocol Buffers

Binario
Mas rapido
Mas pequeno
Menor consumo de red`;

const grpcUsesSnippet = `100 llamadas por segundo
servicios que intercambian muchos datos
comunicacion interna`;

const messagingSnippet = `Order Created
↓
RabbitMQ
↓
Payment Service
Notification Service
Inventory Service`;

const messagingProsSnippet = `Muy desacoplado
Asincrono
Los consumidores trabajan en paralelo
Escala mejor`;

const compareSnippet = `REST
hablar directamente

gRPC
hablar directamente pero mas rapido

Mensajeria
dejar un mensaje`;

const whenRestSnippet = `Consultar precio
Consultar stock
Login

Cuando necesitas respuesta inmediata`;

const whenGrpcSnippet = `Catalogo
Pricing
Inventory

Muchisimas llamadas entre servicios`;

const whenMsgSnippet = `Enviar email
Actualizar inventario
Generar factura
Enviar SMS
Actualizar analytics

Cuando el proceso puede esperar`;

const mistakesSnippet = `Intentar resolver TODO con REST

muchisimas llamadas
timeouts
acoplamiento
efecto dominó

Resolver TODO con eventos

nadie sabe quien hace que
debug complicado`;

const orderflowSnippet = `REST
Consultar productos
Consultar ordenes

gRPC
Products -> Inventory

Mensajeria
Order Created -> RabbitMQ -> Email / Inventory / Analytics / Audit`;

const exerciseSnippet = `Consultar producto
Crear orden
Enviar correo
Actualizar inventario
Procesar pago
Generar factura PDF
Enviar SMS`;

const closingSnippet = `Los microservicios no solo deben dividir el sistema.

Tambien deben comunicarse de la forma mas adecuada para cada caso de uso.`;

export default function Daily116Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/115";
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
              <div className={styles.brandSub}>REST, gRPC y Mensajeria</div>
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
            <Link className={styles.btn} href="/daily/115">
              <span className={styles.kbd}>←</span> Dia 115
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/117">
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
                <div className={styles.createdAt}>30/06/2026</div>
                <div className={styles.badge}>Daily #116 • Microservicios</div>
                <h2 className={styles.title}>Comunicacion entre microservicios: REST, gRPC y Mensajeria</h2>
                <p className={styles.lead}>
                  Una arquitectura distribuida no se define solo por dividir el sistema. Se define por la forma en que
                  sus servicios colaboran.
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
                    <p className={styles.sub}>Lo importante ya no es solo dividir servicios, sino hacerlos colaborar.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{questionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema</h3>
                    <p className={styles.sub}>Cuando una orden avanza, varios servicios tienen que reaccionar.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{flowSnippet}</pre>
                  <div className={styles.callout}>
                    El punto no es si hablan. El punto es como hablan sin romper el sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="rest">
                <div className={styles.shd}>
                  <div>
                    <h3>3. REST</h3>
                    <p className={styles.sub}>La opcion mas conocida para comunicacion sincrona.</p>
                  </div>
                  <span className={styles.chip}>HTTP</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{restSnippet}</pre>
                  <pre>{restProsSnippet}</pre>
                  <pre>{restConsSnippet}</pre>
                  <div className={styles.quote}>REST es comunicacion sincrona: envio, espero y continúo.</div>
                </div>
              </section>

              <section className={styles.section} id="grpc">
                <div className={styles.shd}>
                  <div>
                    <h3>4. gRPC</h3>
                    <p className={styles.sub}>Ideal para comunicacion interna cuando importa rendimiento y volumen.</p>
                  </div>
                  <span className={styles.chip}>Rapido</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{grpcSnippet}</pre>
                  <pre>{grpcUsesSnippet}</pre>
                  <div className={styles.callout}>gRPC reduce latencia y tamaño de payload frente a JSON.</div>
                </div>
              </section>

              <section className={styles.section} id="messaging">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Mensajeria</h3>
                    <p className={styles.sub}>La tercera opcion cambia la forma de pensar: publicas un evento y sigues.</p>
                  </div>
                  <span className={styles.chip}>Async</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{messagingSnippet}</pre>
                  <pre>{messagingProsSnippet}</pre>
                  <div className={styles.quote}>Mensajeria es desacoplo real entre productor y consumidores.</div>
                </div>
              </section>

              <section className={styles.section} id="compare">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Comparacion</h3>
                    <p className={styles.sub}>Cada tecnologia resuelve problemas distintos.</p>
                  </div>
                  <span className={styles.chip}>Comparar</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{compareSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="when-rest">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Cuándo elegir REST</h3>
                    <p className={styles.sub}>Cuando el usuario o el flujo necesitan respuesta inmediata.</p>
                  </div>
                  <span className={styles.chip}>REST</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whenRestSnippet}</pre>
                  <div className={styles.callout}>Para consultas simples y caminos que deben responder en el momento.</div>
                </div>
              </section>

              <section className={styles.section} id="when-grpc">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Cuándo elegir gRPC</h3>
                    <p className={styles.sub}>Cuando existe mucha comunicacion interna y muchas llamadas por segundo.</p>
                  </div>
                  <span className={styles.chip}>gRPC</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whenGrpcSnippet}</pre>
                  <div className={styles.quote}>Perfecto para servicios que intercambian muchos datos entre si.</div>
                </div>
              </section>

              <section className={styles.section} id="when-msg">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Cuándo elegir mensajeria</h3>
                    <p className={styles.sub}>Cuando el proceso puede esperar y conviene desacoplar.</p>
                  </div>
                  <span className={styles.chip}>Eventos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whenMsgSnippet}</pre>
                  <div className={styles.callout}>Enviar email o actualizar analytics no necesita bloquear la peticion original.</div>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Errores tipicos</h3>
                    <p className={styles.sub}>Ni todo con REST ni todo con eventos.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakesSnippet}</pre>
                  <div className={styles.quote}>REST, gRPC y mensajeria conviven; la clave es poner cada uno donde aporta valor.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>11. OrderFlow</h3>
                    <p className={styles.sub}>Si el sistema creciera, yo repartiria responsabilidades asi.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <div className={styles.callout}>Cada tecnologia en el lugar donde realmente aporta mas valor.</div>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Mini ejercicio</h3>
                    <p className={styles.sub}>Clasifica las operaciones segun el tipo de comunicacion que pedirian.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Consultar producto.</li>
                    <li>Crear orden.</li>
                    <li>Enviar correo.</li>
                    <li>Actualizar inventario.</li>
                    <li>Procesar pago.</li>
                    <li>Generar factura PDF.</li>
                    <li>Enviar SMS.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Cierre</h3>
                    <p className={styles.sub}>La comunicacion tambien forma parte del diseño de arquitectura.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/115">
                      <span className={styles.kbd}>←</span> Dia 115
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/117">
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
