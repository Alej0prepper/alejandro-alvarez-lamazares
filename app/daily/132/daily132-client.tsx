"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "requirements", label: "2) Requisitos" },
  { id: "high-level", label: "3) Alto nivel" },
  { id: "gateway", label: "4) Gateway" },
  { id: "core-services", label: "5) Servicios" },
  { id: "communication", label: "6) Comunicacion" },
  { id: "data", label: "7) Datos" },
  { id: "patterns", label: "8) Patrones" },
  { id: "flow", label: "9) Flujo de compra" },
  { id: "resilience", label: "10) Resiliencia" },
  { id: "observability", label: "11) Observabilidad" },
  { id: "security", label: "12) Seguridad" },
  { id: "runtime", label: "13) Docker y K8s" },
  { id: "cicd", label: "14) CI/CD" },
  { id: "failure-cases", label: "15) Fallos" },
  { id: "integration", label: "16) Integracion" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `DDD
Clean Architecture
CQRS
Event Sourcing
Sagas
Outbox
RabbitMQ
Circuit Breaker
Docker
Kubernetes
Observabilidad
Seguridad

Pregunta final:
como encaja todo
en una aplicacion real?`;

const requirementsSnippet = `La empresa necesita:
catalogo
usuarios
carrito
ordenes
pagos
inventario
envios
notificaciones
estadisticas
panel administrativo

Todo debe escalar
de forma independiente.`;

const highLevelSnippet = `Cliente Web
Aplicacion Movil
↓
API Gateway / BFF
↓
Identity
Catalog
Cart
Orders
Inventory
Payments
Shipping
Notifications
Analytics`;

const gatewaySnippet = `Gateway:
autenticacion
autorizacion
rate limiting
logging
TraceId
routing
agregacion

El frontend no habla
directamente con microservicios.`;

const servicesSnippet = `Identity
↓
usuarios, JWT, roles

Catalog
↓
productos, categorias, precios

Cart
↓
carrito rapido, ideal para Redis

Orders
↓
corazon del negocio, aggregates, commands, events

Payments
↓
cobros y reembolsos

Inventory
↓
stock y reservas

Shipping
↓
envios y tracking

Notifications
↓
email, SMS, push

Analytics
↓
dashboards, reportes, KPIs`;

const communicationSnippet = `Sincrona
↓
REST / gRPC

Gateway -> Identity
Gateway -> Catalog

Asincrona
↓
RabbitMQ

OrderCreated
↓
Inventory
Notification
Analytics`;

const dataSnippet = `Cada servicio posee su base:

Identity DB
Catalog DB
Orders DB
Inventory DB
Payments DB

Nunca compartimos tablas.
Compartir base = compartir dominio.`;

const patternsSnippet = `CQRS
↓
Commands y Queries separados

Event Driven
↓
otros servicios reaccionan sin acoplarse

Outbox
↓
guardar dato + evento antes de publicar

Idempotencia
↓
soportar mensajes duplicados

DLQ
↓
aislar mensajes imposibles

Saga
↓
coordinar cambios distribuidos`;

const purchaseFlowSnippet = `Cliente
↓
Gateway
↓
Order Service
↓
Guardar orden
↓
Outbox
↓
RabbitMQ
↓
Inventory
Payment
Notification
Analytics`;

const resilienceSnippet = `Cada llamada externa usa:
Timeout
Retry
Circuit Breaker
Bulkhead
Fallback

Porque las dependencias
siempre fallaran
tarde o temprano.`;

const observabilitySnippet = `Cada peticion genera:
TraceId
Spans
Logs estructurados
Metricas

Grafana:
CPU
RAM
RabbitMQ
PostgreSQL
Redis
DLQ
Circuit Breakers
Latencia
Convergencia de Saga`;

const securitySnippet = `JWT
HTTPS
validacion de entrada
rate limiting
autorizacion
minimo privilegio`;

const runtimeSnippet = `Docker:
catalog-api
orders-api
payment-api
rabbitmq
redis
postgres

Kubernetes:
escalar
reiniciar pods
balancear trafico
health checks
updates`;

const cicdSnippet = `Commit
↓
Tests
↓
Build
↓
Docker Image
↓
Registry
↓
Deploy
↓
Health Checks
↓
Produccion`;

const failuresSnippet = `Si Payment cae
↓
Timeout
Retry
Circuit Breaker
PendingPayment

Si RabbitMQ cae
↓
Outbox guarda pendientes
Worker publica despues

Si Notification falla
↓
la compra sigue
el correo va mas tarde

Si Inventory va lento
↓
Circuit Breaker + Bulkhead protegen Orders`;

const fullArchitectureSnippet = `Cliente
↓
API Gateway
↓
Identity | Catalog | Cart | Orders
Payments | Inventory | Shipping
Notification | Analytics
↓
RabbitMQ
↓
PostgreSQL / Redis
↓
Docker
↓
Kubernetes
↓
Grafana + Prometheus + Jaeger`;

const integrationSnippet = `DDD define el dominio
Clean Architecture organiza el codigo
CQRS separa lectura y escritura
Event Sourcing conserva historia
RabbitMQ desacopla
Saga coordina
Outbox evita perder eventos
Idempotencia protege consumidores
Docker empaqueta
Kubernetes ejecuta
Observabilidad explica
Resiliencia hace sobrevivir
Seguridad protege todo`;

const exerciseSnippet = `Disena tu e-commerce:
1. Que microservicios crearias?
2. Que base tendria cada uno?
3. Que llamadas serian REST y cuales RabbitMQ?
4. Donde aplicarias CQRS?
5. Donde usarias Event Sourcing?
6. Que Sagas necesitaria?
7. Que eventos publicarias?
8. Que metricas mostrarias en Grafana?
9. Que pasa si Payment, RabbitMQ o Inventory fallan?
10. Como garantizas que el negocio siga funcionando?`;

const closingSnippet = `Ningun patron
resuelve todo.

La fortaleza real aparece
cuando cada patron
resuelve una responsabilidad concreta
dentro de una arquitectura coherente.`;

export default function Daily132Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/131";
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
              <div className={styles.brandSub}>Arquitectura integrada de e-commerce moderno</div>
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
            <Link className={styles.btn} href="/daily/131">
              <span className={styles.kbd}>←</span> Dia 131
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>16/07/2026</div>
                <div className={styles.badge}>Daily #132 • Full Architecture</div>
                <h2 className={styles.title}>Arquitectura completa de un e-commerce moderno: integrando todo lo aprendido</h2>
                <p className={styles.lead}>
                  Esta clase cierra el bloque uniendo dominio, microservicios, mensajeria, resiliencia, observabilidad,
                  seguridad y despliegue en una plataforma de e-commerce pensada para crecer y sobrevivir en produccion.
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
                    <p className={styles.sub}>La pregunta final ya no es que hace cada patron, sino como encajan todos juntos.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="requirements">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Los requisitos del negocio</h3>
                    <p className={styles.sub}>La arquitectura nace del problema real que la empresa necesita resolver.</p>
                  </div>
                  <span className={styles.chip}>Negocio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{requirementsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="high-level">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Arquitectura de alto nivel</h3>
                    <p className={styles.sub}>Cada microservicio es dueno de una responsabilidad y de su dominio.</p>
                  </div>
                  <span className={styles.chip}>High level</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{highLevelSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="gateway">
                <div className={styles.shd}>
                  <div>
                    <h3>4. API Gateway</h3>
                    <p className={styles.sub}>La puerta de entrada centraliza preocupaciones transversales.</p>
                  </div>
                  <span className={styles.chip}>Gateway</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{gatewaySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="core-services">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Servicios principales</h3>
                    <p className={styles.sub}>Cada servicio hace una cosa concreta y evita conocer dominios ajenos.</p>
                  </div>
                  <span className={styles.chip}>Servicios</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{servicesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="communication">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Comunicacion sincrona y asincrona</h3>
                    <p className={styles.sub}>No toda interaccion necesita la misma inmediatez ni el mismo acoplamiento.</p>
                  </div>
                  <span className={styles.chip}>Comunicacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{communicationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="data">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Base de datos por servicio</h3>
                    <p className={styles.sub}>Compartir base de datos suele significar compartir dominio y acoplamiento.</p>
                  </div>
                  <span className={styles.chip}>Datos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dataSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="patterns">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Patrones de arquitectura</h3>
                    <p className={styles.sub}>Cada patron resuelve una responsabilidad concreta dentro del sistema.</p>
                  </div>
                  <span className={styles.chip}>Patrones</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{patternsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Flujo completo de compra</h3>
                    <p className={styles.sub}>La orden coordina, pero cada servicio ejecuta solo su parte del trabajo.</p>
                  </div>
                  <span className={styles.chip}>Compra</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{purchaseFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="resilience">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Resiliencia</h3>
                    <p className={styles.sub}>Las dependencias fallaran; el sistema debe estar pensado para eso.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resilienceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="observability">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Observabilidad</h3>
                    <p className={styles.sub}>Si no puedes reconstruir el recorrido ni medir la degradacion, no controlas la plataforma.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{observabilitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="security">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Seguridad</h3>
                    <p className={styles.sub}>La arquitectura completa debe estar protegida, no solo un servicio aislado.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{securitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="runtime">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Docker y Kubernetes</h3>
                    <p className={styles.sub}>Empaquetado y ejecucion forman parte de la arquitectura real, no del apendice.</p>
                  </div>
                  <span className={styles.chip}>Runtime</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{runtimeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cicd">
                <div className={styles.shd}>
                  <div>
                    <h3>14. CI/CD</h3>
                    <p className={styles.sub}>La calidad de la arquitectura tambien depende de como se valida y despliega.</p>
                  </div>
                  <span className={styles.chip}>CI/CD</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cicdSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="failure-cases">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Que ocurre cuando fallan piezas clave</h3>
                    <p className={styles.sub}>La plataforma no debe colapsar por la caida de una sola dependencia.</p>
                  </div>
                  <span className={styles.chip}>Fallos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{failuresSnippet}</pre>
                  <pre>{fullArchitectureSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="integration">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Lo que realmente hemos construido</h3>
                    <p className={styles.sub}>El valor aparece cuando los patrones trabajan juntos dentro de una arquitectura coherente.</p>
                  </div>
                  <span className={styles.chip}>Integracion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{integrationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Diseña tu propia plataforma completa como si fueras el arquitecto principal.</p>
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
                    <p className={styles.sub}>La arquitectura fuerte no usa muchos patrones por moda; usa el patron correcto para el problema correcto.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/131">
                      <span className={styles.kbd}>←</span> Dia 131
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
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
