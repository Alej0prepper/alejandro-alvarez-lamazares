"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "meaning", label: "2) Resiliencia" },
  { id: "availability", label: "3) Disponibilidad" },
  { id: "inevitable", label: "4) Fallos" },
  { id: "timeout", label: "5) Timeout" },
  { id: "retry", label: "6) Retry" },
  { id: "circuit-breaker", label: "7) Circuit Breaker" },
  { id: "bulkhead", label: "8) Bulkhead" },
  { id: "fallback", label: "9) Fallback" },
  { id: "queue-cache", label: "10) Queue y cache" },
  { id: "outbox-idempotency", label: "11) Outbox" },
  { id: "combination", label: "12) Combinacion" },
  { id: "degradation", label: "13) Degradacion" },
  { id: "cascading", label: "14) Cascada" },
  { id: "criticality", label: "15) Criticidad" },
  { id: "observability", label: "16) Observabilidad" },
  { id: "mistakes", label: "17) Errores" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `Retry
Timeout
Circuit Breaker
Saga
Outbox
Idempotencia
DLQ
Consistencia eventual

Todos responden
al mismo problema:
¿que ocurre cuando una dependencia falla?`;

const meaningSnippet = `Resiliencia

Falla
↓
Se adapta
↓
Se recupera
↓
Sigue funcionando`;

const availabilitySnippet = `Alta disponibilidad
↓
el sistema esta disponible?

Resiliencia
↓
sigue funcionando correctamente
cuando aparecen fallos?`;

const inevitableSnippet = `Gateway
↓
Order
↓
Payment
↓
Inventory
↓
Notification

Cada servicio depende de:
PostgreSQL
Redis
RabbitMQ
APIs externas
DNS
Red
Kubernetes`;

const timeoutSnippet = `Order
↓
Payment no responde

Sin timeout:
esperar indefinidamente

Con timeout:
esperar 3 segundos
↓
cancelar`;

const retrySnippet = `Payment responde 503
↓
Retry
↓
Retry
↓
Retry

Siempre con:
limite
backoff exponencial
jitter`;

const circuitSnippet = `Payment caido 10 minutos
↓
Abrir circuito
↓
dejar de llamar
↓
esperar
↓
probar nuevamente`;

const bulkheadSnippet = `Order Service
100 hilos

30 Payment
30 Inventory
20 Notification
20 Otros

Si Payment colapsa
Inventory sigue funcionando.`;

const fallbackSnippet = `Si recomendaciones fallan
↓
mostrar productos mas vendidos

Si Redis falla
↓
consultar PostgreSQL

Servicio degradado
no caido.`;

const queueCacheSnippet = `Cache
↓
ultima informacion conocida

Queue
↓
desacopla productor y consumidor

Si Notification cae
RabbitMQ conserva el mensaje.`;

const outboxSnippet = `Outbox
↓
orden guardada
evento no perdido

Idempotencia
↓
mensaje duplicado
=
mismo resultado

DLQ
↓
mensaje imposible
no bloquea la cola`;

const combinationSnippet = `Timeout
↓
Retry
↓
Circuit Breaker
↓
Fallback

La resiliencia aparece
por combinacion de patrones.`;

const paymentFlowSnippet = `Order cobra
↓
Timeout 3 s
↓
Retry x3
↓
Circuit Breaker
↓
Fallback: Pago pendiente`;

const degradationSnippet = `No hay recomendaciones
↓
mostrar catalogo

No hay Analytics
↓
seguir vendiendo

No hay Email
↓
guardar en RabbitMQ

El negocio continua.`;

const cascadingSnippet = `Payment falla
↓
Order espera
↓
Gateway espera
↓
Clientes esperan
↓
Hilos ocupados
↓
CPU sube
↓
todo el sistema cae`;

const criticalitySnippet = `Critico
↓
cobrar correctamente

Importante
↓
actualizar dashboard

Secundario
↓
enviar email

No todos merecen
la misma proteccion.`;

const orderflowSnippet = `RabbitMQ cae
↓
Outbox guarda evento Pending
↓
Rabbit vuelve
↓
Worker publica

Payment cae
↓
responder:
{
  "status":"PendingPayment"
}`;

const observabilitySnippet = `Medir:
Circuit Breakers abiertos
Retries por minuto
Tiempo medio de respuesta
Mensajes en DLQ
Eventos pendientes
Tiempo de convergencia

Si no lo medimos
no sabemos si somos resilientes.`;

const mistakesSnippet = `Error 1:
10 retries * 5000 usuarios
=
50 000 peticiones
a un servicio ya saturado

Error 2:
Tengo Circuit Breaker
ya soy resiliente

No.
La resiliencia necesita equilibrio
y combinacion de patrones.`;

const summarySnippet = `Timeout         -> esperas infinitas
Retry           -> fallos temporales
Circuit Breaker -> dependencias caidas
Bulkhead        -> aislamiento de recursos
Fallback        -> respuesta alternativa
Cache           -> reducir dependencias
Queue           -> desacoplar procesos
Outbox          -> no perder eventos
Idempotencia    -> mensajes duplicados
DLQ             -> mensajes imposibles`;

const exerciseSnippet = `Flujo:
Gateway
↓
Order
↓
Payment
↓
RabbitMQ

1. Donde aplicarias timeout?
2. Donde pondrias retry y con que limite?
3. Cuando abririas Circuit Breaker?
4. Que recurso aislarias con Bulkhead?
5. Que fallback ofrecerias al usuario?
6. Que pasa si RabbitMQ cae?
7. Que metricas vigilaras para saber si el sistema resiste?
8. Que fallo aceptarias degradado y cual no?`;

const closingSnippet = `La resiliencia
no es un patron unico.

Es el resultado
de combinar estrategias
para que un fallo local
no termine siendo
un fallo global.`;

export default function Daily129Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/128";
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
              <div className={styles.brandSub}>Patrones de resiliencia y degradacion controlada</div>
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
            <Link className={styles.btn} href="/daily/128">
              <span className={styles.kbd}>←</span> Dia 128
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/130">
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
                <div className={styles.createdAt}>13/07/2026</div>
                <div className={styles.badge}>Daily #129 • Resiliencia</div>
                <h2 className={styles.title}>Patrones de resiliencia en microservicios: como disenar sistemas que sigan funcionando cuando todo empieza a fallar</h2>
                <p className={styles.lead}>
                  La resiliencia no consiste en evitar fallos. Consiste en decidir como se comporta el sistema cuando
                  una dependencia cae, se degrada o responde demasiado lento, y evitar que un fallo local tumbe toda la plataforma.
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
                    <p className={styles.sub}>Todos los patrones vistos convergen en la misma pregunta: que pasa cuando una dependencia falla.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es resiliencia</h3>
                    <p className={styles.sub}>No es no fallar; es seguir funcionando y recuperarse.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{meaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="availability">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Alta disponibilidad no es resiliencia</h3>
                    <p className={styles.sub}>Un sistema puede estar arriba y aun asi responder mal a todos.</p>
                  </div>
                  <span className={styles.chip}>Disponibilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{availabilitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="inevitable">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Los fallos son inevitables</h3>
                    <p className={styles.sub}>Un sistema distribuido siempre esta parcialmente averiado, aunque todavia no lo veas.</p>
                  </div>
                  <span className={styles.chip}>Fallos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{inevitableSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="timeout">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Patron 1: Timeout</h3>
                    <p className={styles.sub}>Nunca esperes indefinidamente a una dependencia.</p>
                  </div>
                  <span className={styles.chip}>Timeout</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{timeoutSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="retry">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Patron 2: Retry</h3>
                    <p className={styles.sub}>Solo sirve para fallos temporales y necesita limites claros.</p>
                  </div>
                  <span className={styles.chip}>Retry</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{retrySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="circuit-breaker">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Patron 3: Circuit Breaker</h3>
                    <p className={styles.sub}>Corta llamadas inutiles a una dependencia que ya esta caida.</p>
                  </div>
                  <span className={styles.chip}>Circuit Breaker</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{circuitSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="bulkhead">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Patron 4: Bulkhead</h3>
                    <p className={styles.sub}>Aislar recursos evita fallos en cascada entre dependencias.</p>
                  </div>
                  <span className={styles.chip}>Bulkhead</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{bulkheadSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="fallback">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Patron 5: Fallback</h3>
                    <p className={styles.sub}>Mantiene un servicio degradado en vez de completamente caido.</p>
                  </div>
                  <span className={styles.chip}>Fallback</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fallbackSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="queue-cache">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Cache y Queue</h3>
                    <p className={styles.sub}>Datos algo antiguos o procesos desacoplados suelen ser mejores que bloquear todo.</p>
                  </div>
                  <span className={styles.chip}>Cache y Queue</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{queueCacheSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="outbox-idempotency">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Outbox, Idempotencia y DLQ</h3>
                    <p className={styles.sub}>La resiliencia tambien depende de no perder eventos ni romperse con duplicados.</p>
                  </div>
                  <span className={styles.chip}>Mensajeria</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{outboxSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="combination">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como se combinan</h3>
                    <p className={styles.sub}>La resiliencia real no sale de un patron aislado, sino de una cadena coherente.</p>
                  </div>
                  <span className={styles.chip}>Combinacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{combinationSnippet}</pre>
                  <pre>{paymentFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="degradation">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Degradacion elegante</h3>
                    <p className={styles.sub}>No siempre puedes ofrecer el 100%, pero si conservar el nucleo del negocio.</p>
                  </div>
                  <span className={styles.chip}>Degradacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{degradationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cascading">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Cascading Failure</h3>
                    <p className={styles.sub}>Un fallo pequeno puede tumbar toda la plataforma si no se corta la cascada.</p>
                  </div>
                  <span className={styles.chip}>Cascada</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cascadingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="criticality">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Que debe ser critico</h3>
                    <p className={styles.sub}>No todos los servicios merecen el mismo nivel de proteccion.</p>
                  </div>
                  <span className={styles.chip}>Criticidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{criticalitySnippet}</pre>
                  <pre>{orderflowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="observability">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Observabilidad</h3>
                    <p className={styles.sub}>Si no lo mides, no sabes si realmente tu sistema resiste.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{observabilitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Errores tipicos</h3>
                    <p className={styles.sub}>Mas proteccion mal aplicada puede empeorar el sistema en vez de salvarlo.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakesSnippet}</pre>
                  <pre>{summarySnippet}</pre>
                  <pre>{exerciseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>La meta no es que nada falle, sino que un fallo local no se convierta en un desastre global.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/128">
                      <span className={styles.kbd}>←</span> Dia 128
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/130">
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
