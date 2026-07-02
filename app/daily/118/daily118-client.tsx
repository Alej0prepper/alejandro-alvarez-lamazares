"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "gateway", label: "2) Que es" },
  { id: "without", label: "3) Sin Gateway" },
  { id: "with", label: "4) Con Gateway" },
  { id: "routing", label: "5) Routing" },
  { id: "auth", label: "6) Auth" },
  { id: "rate", label: "7) Rate Limit" },
  { id: "logging", label: "8) Logging" },
  { id: "aggregation", label: "9) Aggregation" },
  { id: "hide", label: "10) Abstraccion" },
  { id: "mistake", label: "11) Error" },
  { id: "orderflow", label: "12) OrderFlow" },
  { id: "tech", label: "13) Tecnologias" },
  { id: "need", label: "14) Cuándo" },
  { id: "thinking", label: "15) Mentalidad" },
  { id: "exercise", label: "16) Ejercicio" },
  { id: "closing", label: "17) Cierre" },
] as const;

const ideaSnippet = `Identity Service
Product Service
Order Service
Payment Service
Notification Service`;

const gatewaySnippet = `API Gateway

Unico punto de entrada
Hacia todos los microservicios`;

const withoutSnippet = `Frontend

→ Product Service
→ Order Service
→ Payment Service
→ Identity Service`;

const withSnippet = `Frontend

→ API Gateway
→ Product Service
→ Order Service
→ Payment Service
→ Identity Service`;

const routingSnippet = `GET /products
→ Product Service

POST /orders
→ Order Service`;

const authSnippet = `Cliente

↓

Gateway valida JWT

↓

Microservicios reciben usuario autenticado`;

const rateSnippet = `100 requests por minuto

¿En cada servicio?

No.

En API Gateway`;

const loggingSnippet = `Gateway

IP
Usuario
Endpoint
Tiempo
Status`;

const aggregationSnippet = `Producto
Stock
Precio

3 llamadas internas

1 respuesta al cliente`;

const hideSnippet = `Hoy:
products:5001

Mañana:
catalog:8080

El frontend no se entera`;

const mistakeSnippet = `routing
reglas de negocio
consultas SQL
calculo de precios
confirmar ordenes

Resultado:
otro monolito`;

const orderflowSnippet = `Gateway

Identity
Products
Orders
Payments`;

const techSnippet = `YARP
Ocelot
Kong
NGINX
Traefik
Envoy`;

const needSnippet = `No en un monolito.
No siempre con pocos microservicios.

Si aporta valor cuando la arquitectura crece.`;

const thinkingSnippet = `Backend junior
El frontend llama directo a todo.

Backend senior
Un solo punto de entrada para toda la plataforma.`;

const exerciseSnippet = `Validar JWT
Crear orden
Rate Limiting
Calcular total
Registrar logs
Cobrar una orden`;

const closingSnippet = `El Gateway no existe para hacer negocio.

Existe para proteger, simplificar y organizar el acceso a los microservicios.`;

export default function Daily118Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/117";
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
              <div className={styles.brandSub}>API Gateway y microservicios</div>
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
            <Link className={styles.btn} href="/daily/117">
              <span className={styles.kbd}>←</span> Dia 117
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/119">
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
                <div className={styles.createdAt}>02/07/2026</div>
                <div className={styles.badge}>Daily #118 • Gateway</div>
                <h2 className={styles.title}>
                  API Gateway: el punto de entrada de una arquitectura de microservicios
                </h2>
                <p className={styles.lead}>
                  Cuando una plataforma crece, el cliente necesita una sola entrada estable. El Gateway simplifica,
                  protege y ordena el acceso a los servicios internos.
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
                    <p className={styles.sub}>En un monolito el cliente habla con una sola aplicación.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <div className={styles.callout}>Cuando pasas a microservicios, esa simplicidad se rompe.</div>
                </div>
              </section>

              <section className={styles.section} id="gateway">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Qué es un API Gateway</h3>
                    <p className={styles.sub}>El punto unico de entrada hacia todos los servicios.</p>
                  </div>
                  <span className={styles.chip}>Gateway</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{gatewaySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="without">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Sin Gateway</h3>
                    <p className={styles.sub}>El frontend termina conociendo demasiados detalles internos.</p>
                  </div>
                  <span className={styles.chip}>Sin gateway</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{withoutSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>URLs.</li>
                    <li>Puertos.</li>
                    <li>Versiones.</li>
                    <li>Autenticacion.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="with">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Con Gateway</h3>
                    <p className={styles.sub}>El cliente solo conoce una direccion estable.</p>
                  </div>
                  <span className={styles.chip}>Simple</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{withSnippet}</pre>
                  <div className={styles.quote}>El Gateway oculta la complejidad interna.</div>
                </div>
              </section>

              <section className={styles.section} id="routing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Primera responsabilidad: routing</h3>
                    <p className={styles.sub}>Decidir a que servicio enviar cada peticion.</p>
                  </div>
                  <span className={styles.chip}>Routing</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{routingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="auth">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Autenticacion</h3>
                    <p className={styles.sub}>Centralizar la validacion de JWT simplifica toda la plataforma.</p>
                  </div>
                  <span className={styles.chip}>Auth</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{authSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="rate">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Rate limiting</h3>
                    <p className={styles.sub}>Limitar una vez en el borde es mejor que repetirlo en cada servicio.</p>
                  </div>
                  <span className={styles.chip}>Limit</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rateSnippet}</pre>
                  <div className={styles.callout}>El Gateway es el lugar natural para esta regla.</div>
                </div>
              </section>

              <section className={styles.section} id="logging">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Logging</h3>
                    <p className={styles.sub}>Registrar el acceso en un punto unico mejora observabilidad.</p>
                  </div>
                  <span className={styles.chip}>Logs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{loggingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="aggregation">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Aggregation</h3>
                    <p className={styles.sub}>El Gateway puede juntar varias respuestas en una sola.</p>
                  </div>
                  <span className={styles.chip}>Aggregation</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{aggregationSnippet}</pre>
                  <div className={styles.quote}>Esto se usa mucho cuando el frontend necesita datos de varias fuentes.</div>
                </div>
              </section>

              <section className={styles.section} id="hide">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Ocultar la arquitectura interna</h3>
                    <p className={styles.sub}>Puedes cambiar la infraestructura sin cambiar la interfaz publica.</p>
                  </div>
                  <span className={styles.chip}>Abstraccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{hideSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Error tipico</h3>
                    <p className={styles.sub}>Convertir el Gateway en un segundo monolito.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakeSnippet}</pre>
                  <div className={styles.callout}>El Gateway coordina. No implementa negocio.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>12. OrderFlow</h3>
                    <p className={styles.sub}>Un ejemplo concreto para aterrizar la idea.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <div className={styles.quote}>Cada servicio sigue siendo responsable de su propia logica.</div>
                </div>
              </section>

              <section className={styles.section} id="tech">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Tecnologias comunes</h3>
                    <p className={styles.sub}>Hay varias opciones para resolver el mismo problema.</p>
                  </div>
                  <span className={styles.chip}>Tech</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{techSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="need">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Cuándo hace falta</h3>
                    <p className={styles.sub}>No metes infraestructura antes de necesitarla.</p>
                  </div>
                  <span className={styles.chip}>Cuándo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{needSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Mentalidad senior</h3>
                    <p className={styles.sub}>Un punto de entrada unico simplifica el sistema completo.</p>
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
                    <p className={styles.sub}>Separa las responsabilidades del Gateway y las de cada servicio.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Validar JWT.</li>
                    <li>Crear una orden.</li>
                    <li>Rate limiting.</li>
                    <li>Calcular total de una orden.</li>
                    <li>Registrar logs de acceso.</li>
                    <li>Cobrar una orden.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Cierre</h3>
                    <p className={styles.sub}>El Gateway protege, simplifica y organiza el acceso a la plataforma.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/117">
                      <span className={styles.kbd}>←</span> Dia 117
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/119">
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
