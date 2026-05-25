"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "scenario", label: "2) Escenario" },
  { id: "naive", label: "3) Naive" },
  { id: "senior", label: "4) Senior" },
  { id: "scalable", label: "5) Escalable" },
  { id: "cache", label: "6) Cache" },
  { id: "bottleneck", label: "7) Bottleneck" },
  { id: "protection", label: "8) Proteccion" },
  { id: "observability", label: "9) Observabilidad" },
  { id: "failures", label: "10) Fallos" },
  { id: "tradeoffs", label: "11) Tradeoffs" },
  { id: "questions", label: "12) Preguntas" },
  { id: "map", label: "13) Mapa mental" },
  { id: "mistake", label: "14) Error" },
  { id: "mindset", label: "Mentalidad" },
  { id: "mini-project", label: "Practica final" },
] as const;

const makeApiSnippet = `"hacer una API"`;

const surviveApiSnippet = `"hacer una API que sobreviva bajo carga real"`;

const ecommerceSnippet = `Backend de e-commerce grande`;

const programmingProblemSnippet = `"como programo esto"`;

const collapseProblemSnippet = `"como evito que colapse"`;

const checkoutSnippet = `POST /checkout`;

const naiveResultSnippet = `latencia enorme
timeouts
fallos en cascada
requests colgadas`;

const immediateQuestionSnippet = `que necesita ocurrir inmediatamente?`;

const eventSnippet = `OrderCreated`;

const redisSnippet = `Redis`;

const twentyApisSnippet = `20 APIs`;

const saturatedDbSnippet = `1 DB saturada`;

const protectionSnippet = `rate limiting
throttling
backpressure`;

const impossibleSnippet = `imposible de diagnosticar`;

const observabilitySignalsSnippet = `checkout latency up
payment timeout up
queue backlog up`;

const technologyQuestionSnippet = `"que tecnologia usamos"`;

const seniorQuestionsSnippet = `que componente se rompera primero
que dependencia es mas peligrosa
que operacion necesita desacoplarse
que parte limita el sistema`;

const architectureMapSnippet = `Load Balancer
  |
APIs stateless
  |
Cache
  |
DB optimizada
  |
Queues/Eventos
  |
Workers
  |
Observabilidad
  |
Proteccion y resiliencia`;

const scalingMistakeSnippet = `"escalar = agregar servidores"`;

const oldMindsetSnippet = `"como implementar endpoints"`;

const newMindsetSnippet = `como se comporta el sistema completo bajo presion`;

const massiveOrdersSnippet = `Sistema de pedidos masivo`;

const criticalEndpointsSnippet = `checkout
payments
inventory
login`;

const finalReflectionSnippet = `backend grande != backend pequeno con mas CPU`;

export default function Daily79Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/78";
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
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/78">
              <span className={styles.kbd}>←</span> Dia 78
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
                <div className={styles.createdAt}>25/05/2026</div>
                <div className={styles.badge}>Daily #79 • Backend Performance</div>
                <h2 className={styles.title}>Simulacion completa: backend escalable</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Escalabilidad</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Observabilidad</span>
                </div>

                <p className={styles.lead}>
                  Hoy juntas bottlenecks, cache, colas, background jobs, escalabilidad, observabilidad y tradeoffs para
                  pensar como alguien que diseña sistemas reales.
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
                    <p className={styles.sub}>El objetivo ya no es solo implementar una API.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ya viste bottlenecks, cache, colas, background jobs, escalabilidad, observabilidad y tradeoffs.</p>
                  <p>El objetivo de hoy no es:</p>
                  <pre>{makeApiSnippet}</pre>
                  <p>Es:</p>
                  <pre>{surviveApiSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="scenario">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Escenario</h3>
                    <p className={styles.sub}>Un e-commerce grande con presion real.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ecommerceSnippet}</pre>
                  <p>Con:</p>
                  <ul className={styles.bullets}>
                    <li>millones de usuarios</li>
                    <li>miles de ordenes por minuto</li>
                    <li>pagos</li>
                    <li>emails</li>
                    <li>analytics</li>
                    <li>inventario</li>
                    <li>promociones</li>
                  </ul>
                  <p>El problema ya no es:</p>
                  <pre>{programmingProblemSnippet}</pre>
                  <p>Ahora el problema es:</p>
                  <pre>{collapseProblemSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="naive">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Diseno naive</h3>
                    <p className={styles.sub}>El checkout hace demasiado trabajo sincronico.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <p>Hace todo dentro del request:</p>
                  <ul className={styles.bullets}>
                    <li>validar carrito</li>
                    <li>calcular promociones</li>
                    <li>descontar inventario</li>
                    <li>cobrar pago</li>
                    <li>generar factura PDF</li>
                    <li>mandar email</li>
                    <li>actualizar analytics</li>
                    <li>sincronizar ERP</li>
                  </ul>
                  <p>Resultado bajo carga:</p>
                  <pre>{naiveResultSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa un backend senior</h3>
                    <p className={styles.sub}>Primero separa lo critico de lo secundario.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>Pregunta:</p>
                  <pre>{immediateQuestionSnippet}</pre>
                  <div className={styles.callout}>Solo lo critico debe bloquear la respuesta HTTP.</div>
                </div>
              </section>

              <section className={styles.section} id="scalable">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Diseno escalable</h3>
                    <p className={styles.sub}>El request hace lo minimo y delega el resto.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Escalable</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Request HTTP</h4>
                  <ul className={styles.bullets}>
                    <li>validar</li>
                    <li>guardar orden</li>
                    <li>cobrar pago</li>
                    <li>persistir estado minimo</li>
                  </ul>

                  <h4>Luego publica eventos</h4>
                  <pre>{eventSnippet}</pre>

                  <h4>Workers separados procesan</h4>
                  <ul className={styles.bullets}>
                    <li>emails</li>
                    <li>facturas</li>
                    <li>analytics</li>
                    <li>notificaciones</li>
                    <li>ERP</li>
                  </ul>

                  <div className={styles.callout}>
                    Requests rapidas, menos acoplamiento, mejor resiliencia y mejor throughput.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="cache">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Cache</h3>
                    <p className={styles.sub}>Productos populares no deberian golpear DB constantemente.</p>
                  </div>
                  <span className={styles.chip}>Cache</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{redisSnippet}</pre>
                  <p>Para:</p>
                  <ul className={styles.bullets}>
                    <li>catalogo</li>
                    <li>promociones</li>
                    <li>configuracion</li>
                    <li>busquedas frecuentes</li>
                  </ul>
                  <div className={styles.callout}>Resultado: menos carga en DB.</div>
                </div>
              </section>

              <section className={styles.section} id="bottleneck">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Bottleneck principal</h3>
                    <p className={styles.sub}>Escalar APIs es mas facil que escalar datos.</p>
                  </div>
                  <span className={styles.chip}>Bottleneck</span>
                </div>
                <div className={styles.sbd}>
                  <p>Aunque tengas:</p>
                  <pre>{twentyApisSnippet}</pre>
                  <p>si tienes:</p>
                  <pre>{saturatedDbSnippet}</pre>
                  <p>todo sigue lento.</p>
                  <p>Entonces aparecen:</p>
                  <ul className={styles.bullets}>
                    <li>read replicas</li>
                    <li>cache</li>
                    <li>particion</li>
                    <li>optimizacion de queries</li>
                  </ul>
                  <div className={styles.quote}>Escalar APIs es facil. Escalar datos es dificil.</div>
                </div>
              </section>

              <section className={styles.section} id="protection">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Rate limiting y proteccion</h3>
                    <p className={styles.sub}>Alta carga no siempre es trafico legitimo.</p>
                  </div>
                  <span className={styles.chip}>Proteccion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Sistema grande necesita protegerse de:</p>
                  <ul className={styles.bullets}>
                    <li>abuso</li>
                    <li>bots</li>
                    <li>scraping</li>
                    <li>DoS</li>
                    <li>spikes</li>
                  </ul>
                  <p>Entonces agregas:</p>
                  <pre>{protectionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="observability">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Observabilidad</h3>
                    <p className={styles.sub}>Sin observabilidad, un sistema distribuido es dificil de operar.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <p>Sistema distribuido sin observabilidad:</p>
                  <pre>{impossibleSnippet}</pre>
                  <p>Necesitas:</p>
                  <ul className={styles.bullets}>
                    <li>logs</li>
                    <li>metricas</li>
                    <li>tracing</li>
                    <li>alertas</li>
                  </ul>
                  <p>Ejemplo:</p>
                  <pre>{observabilitySignalsSnippet}</pre>
                  <p>Con eso ya puedes investigar.</p>
                </div>
              </section>

              <section className={styles.section} id="failures">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Diseno para fallos</h3>
                    <p className={styles.sub}>Sistemas grandes no evitan fallos: sobreviven a ellos.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <p>Backend senior asume:</p>
                  <ul className={styles.bullets}>
                    <li>DB puede fallar</li>
                    <li>Redis puede caer</li>
                    <li>APIs externas pueden degradarse</li>
                    <li>queues pueden crecer</li>
                  </ul>
                  <p>Entonces disena:</p>
                  <ul className={styles.bullets}>
                    <li>retries</li>
                    <li>circuit breakers</li>
                    <li>timeouts</li>
                    <li>degradacion controlada</li>
                  </ul>
                  <div className={styles.callout}>
                    Sistemas grandes no evitan fallos. Aprenden a sobrevivirlos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="tradeoffs">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Tradeoffs reales</h3>
                    <p className={styles.sub}>Arquitectura real es gestionar costos y beneficios.</p>
                  </div>
                  <span className={styles.chip}>Tradeoffs</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mas cache</h4>
                  <ul className={styles.bullets}>
                    <li>mas rapido</li>
                    <li>menos consistencia</li>
                  </ul>

                  <h4>Mas sincronico</h4>
                  <ul className={styles.bullets}>
                    <li>mas consistente</li>
                    <li>menos resiliente</li>
                  </ul>

                  <h4>Mas desacoplamiento</h4>
                  <ul className={styles.bullets}>
                    <li>mas escalable</li>
                    <li>mas complejidad</li>
                  </ul>

                  <div className={styles.quote}>Arquitectura real = gestionar tradeoffs.</div>
                </div>
              </section>

              <section className={styles.section} id="questions">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como piensa alguien senior realmente</h3>
                    <p className={styles.sub}>No empieza por tecnologia. Empieza por riesgo y restriccion.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{technologyQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{seniorQuestionsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="map">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Mapa mental final</h3>
                    <p className={styles.sub}>Una vista completa de un backend escalable.</p>
                  </div>
                  <span className={styles.chip}>Mapa</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{architectureMapSnippet}</pre>
                  <div className={styles.callout}>Eso ya es pensamiento de arquitectura real.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Error tipico</h3>
                    <p className={styles.sub}>Escalar no es solo agregar servidores.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{scalingMistakeSnippet}</pre>
                  <p>Escalar implica:</p>
                  <ul className={styles.bullets}>
                    <li>redisenar</li>
                    <li>desacoplar</li>
                    <li>medir</li>
                    <li>priorizar</li>
                    <li>proteger</li>
                    <li>observar</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>Que cambio en tu mentalidad</h3>
                    <p className={styles.sub}>El foco pasa de endpoints a comportamiento del sistema completo.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <p>Antes probablemente pensabas:</p>
                  <pre>{oldMindsetSnippet}</pre>
                  <p>Ahora deberias empezar a pensar:</p>
                  <pre>{newMindsetSnippet}</pre>
                  <div className={styles.quote}>
                    Backend escalable no consiste en hacer codigo rapido. Consiste en disenar sistemas que sobrevivan
                    crecimiento, presion y fallos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto final (15 min)</h3>
                    <p className={styles.sub}>Disenar mentalmente un backend preparado para crecer.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{massiveOrdersSnippet}</pre>

                  <h4>Paso 1 - Define endpoints criticos</h4>
                  <pre>{criticalEndpointsSnippet}</pre>

                  <h4>Paso 2 - Decide que desacoplas</h4>
                  <p>Que moverias a queues, background jobs o eventos?</p>

                  <h4>Paso 3 - Detecta bottlenecks</h4>
                  <ul className={styles.bullets}>
                    <li>DB</li>
                    <li>Redis</li>
                    <li>pagos</li>
                    <li>red</li>
                  </ul>

                  <h4>Paso 4 - Piensa resiliencia</h4>
                  <p>Que pasa si payment service falla, Redis cae o trafico explota?</p>

                  <h4>Paso 5 - Piensa observabilidad</h4>
                  <p>Que metricas necesitarias?</p>

                  <h4>Paso 6 - Reflexion final</h4>
                  <pre>{finalReflectionSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>desacoplamiento cambia escalabilidad</li>
                    <li>observabilidad es obligatoria</li>
                    <li>tradeoffs son inevitables</li>
                    <li>resiliencia es diseno</li>
                    <li>sistemas distribuidos cambian completamente el backend</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que parte de tu sistema seria el primer bottleneck?</li>
                    <li>Que request hace demasiado trabajo?</li>
                    <li>Que dependencia externa te preocupa mas?</li>
                    <li>Que operacion deberia desacoplarse hoy?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior construye APIs. Backend senior disena sistemas capaces de sobrevivir escala, fallos
                    y presion real.
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
