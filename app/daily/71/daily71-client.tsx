"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "metrics", label: "4) Metricas" },
  { id: "mindset", label: "5) Mentalidad" },
  { id: "scale-example", label: "6) Escala" },
  { id: "concurrency", label: "7) Concurrencia" },
  { id: "killers", label: "8) Que la destruye" },
  { id: "measurement", label: "9) Medicion" },
  { id: "cpu-io", label: "10) CPU vs I/O" },
  { id: "senior", label: "11) Senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const fastApiSnippet = `"mi API es rapida"`;

const localFastSnippet = `"en mi maquina funciona rapido"`;

const requestTimeSnippet = `50ms`;

const concurrentUsersSnippet = `10,000 usuarios simultaneos`;

const latencySnippet = `GET /orders -> 120ms`;

const throughputSnippet = `500 requests/segundo`;

const juniorMindsetSnippet = `"el endpoint responde"`;

const seniorMindsetSnippet = `cuanto tarda?
cuantas requests soporta?
que consume?
que pasa bajo carga?`;

const usersQuerySnippet = `var users = await _context.Users.ToListAsync();`;

const smallUsersSnippet = `100 usuarios`;

const hugeUsersSnippet = `10 millones de usuarios`;

const oneRequestSnippet = `1 request`;

const thousandRequestsSnippet = `1000 requests simultaneos`;

const endpointLatencySnippet = `100ms`;

const microOptimizationsSnippet = `micro-optimizaciones`;

const slowQuerySnippet = `una query que tarda 5 segundos`;

const ioBoundSnippet = `I/O bound`;

const prettyCodeSnippet = `"el codigo es bonito?"`;

const pressureSnippet = `como se comporta bajo presion?`;

const usersEndpointSnippet = `GET /users`;

const usersEndpointCodeSnippet = `return await _context.Users.ToListAsync();`;

const smallCaseSnippet = `100 usuarios`;

const hugeCaseSnippet = `10 millones de usuarios`;

const concurrentCaseSnippet = `500 requests simultaneos`;

const behaviorChangeSnippet = `el comportamiento cambia completamente con escala`;

export default function Daily71Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/70";
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
            <Link className={styles.btn} href="/daily/70">
              <span className={styles.kbd}>←</span> Dia 70
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
                <div className={styles.createdAt}>16/05/2026</div>
                <div className={styles.badge}>Daily #71 • Backend Performance</div>
                <h2 className={styles.title}>Que significa realmente performance</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: Latencia</span>
                  <span className={styles.chip}>Tag: Throughput</span>
                  <span className={styles.chip}>Tag: Escala</span>
                </div>

                <p className={styles.lead}>
                  Performance no es decir que algo es rapido: es entender como responde un sistema usando recursos bajo
                  carga real.
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
                    <p className={styles.sub}>Rapido no significa nada si no defines contexto y metricas.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fastApiSnippet}</pre>
                  <p>Eso realmente no significa nada sin saber bajo que condiciones se midio.</p>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Performance backend es eficiencia, no solo velocidad.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Performance backend: que tan eficientemente un sistema usa recursos para responder trabajo.
                  </div>
                  <p>Tambien incluye:</p>
                  <ul className={styles.bullets}>
                    <li>estabilidad</li>
                    <li>capacidad</li>
                    <li>consumo</li>
                    <li>escalabilidad</li>
                    <li>comportamiento bajo carga</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Confundir una prueba local con comportamiento real.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{localFastSnippet}</pre>
                  <p>Eso no prueba nada.</p>
                  <h4>Ejemplo simple</h4>
                  <pre>{requestTimeSnippet}</pre>
                  <p>Parece excelente, pero falta preguntar que pasa con:</p>
                  <pre>{concurrentUsersSnippet}</pre>
                  <p>Ahi empieza el verdadero backend engineering.</p>
                </div>
              </section>

              <section className={styles.section} id="metrics">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Metricas fundamentales</h3>
                    <p className={styles.sub}>Sin metricas no hay diagnostico tecnico.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Metricas</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Latencia</h4>
                  <p>Tiempo que tarda una request.</p>
                  <pre>{latencySnippet}</pre>

                  <h4>Throughput</h4>
                  <p>Cuantas requests puedes manejar.</p>
                  <pre>{throughputSnippet}</pre>

                  <h4>CPU</h4>
                  <p>Procesamiento usado. Alto CPU suele indicar operaciones costosas.</p>

                  <h4>RAM</h4>
                  <p>Memoria consumida. Fugas o cargas gigantes destruyen performance.</p>

                  <h4>I/O</h4>
                  <p>Operaciones externas como DB, disco, red y APIs externas.</p>

                  <div className={styles.callout}>
                    Muchos sistemas backend son I/O bound, no CPU bound.
                  </div>
                  <p>La mayoria de backends lentos estan limitados por DB, red, disco o APIs externas.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>Responder no es lo mismo que soportar carga.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorMindsetSnippet}</pre>

                  <h4>Backend senior</h4>
                  <pre>{seniorMindsetSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="scale-example">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Ejemplo mental importante</h3>
                    <p className={styles.sub}>El tamano cambia completamente el comportamiento del sistema.</p>
                  </div>
                  <span className={styles.chip}>Escala</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{usersQuerySnippet}</pre>
                  <p>Con:</p>
                  <pre>{smallUsersSnippet}</pre>
                  <p>puede estar bien.</p>
                  <p>Pero con:</p>
                  <pre>{hugeUsersSnippet}</pre>
                  <p>es un desastre.</p>
                  <div className={styles.callout}>El tamano cambia completamente el comportamiento del sistema.</div>
                </div>
              </section>

              <section className={styles.section} id="concurrency">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Concurrencia</h3>
                    <p className={styles.sub}>No importa solo una request: importa que pasa con muchas al mismo tiempo.</p>
                  </div>
                  <span className={styles.chip}>Carga</span>
                </div>
                <div className={styles.sbd}>
                  <p>No importa solo:</p>
                  <pre>{oneRequestSnippet}</pre>
                  <p>Importa:</p>
                  <pre>{thousandRequestsSnippet}</pre>

                  <h4>Ejemplo</h4>
                  <pre>{endpointLatencySnippet}</pre>
                  <p>Perfecto hasta que:</p>
                  <ul className={styles.bullets}>
                    <li>DB se satura</li>
                    <li>pool de conexiones se llena</li>
                    <li>threads se bloquean</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="killers">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Que suele destruir performance</h3>
                    <p className={styles.sub}>La degradacion suele venir de trabajo innecesario o recursos saturados.</p>
                  </div>
                  <span className={styles.chip}>Bottlenecks</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>queries ineficientes</li>
                    <li>N+1 queries</li>
                    <li>operaciones bloqueantes</li>
                    <li>serializacion gigante</li>
                    <li>APIs externas lentas</li>
                    <li>falta de caching</li>
                    <li>cargar demasiados datos</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="measurement">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como se mide realmente</h3>
                    <p className={styles.sub}>Performance engineering es observar sistemas, no adivinar.</p>
                  </div>
                  <span className={styles.chip}>Medicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>No se mide con sensaciones. Se mide con:</p>
                  <ul className={styles.bullets}>
                    <li>metricas</li>
                    <li>profiling</li>
                    <li>tracing</li>
                    <li>benchmarks</li>
                    <li>load testing</li>
                  </ul>

                  <h4>Error tipico</h4>
                  <pre>{microOptimizationsSnippet}</pre>
                  <p>cuando el verdadero problema es:</p>
                  <pre>{slowQuerySnippet}</pre>

                  <div className={styles.callout}>Primero mide. Luego optimiza.</div>
                </div>
              </section>

              <section className={styles.section} id="cpu-io">
                <div className={styles.shd}>
                  <div>
                    <h3>10. CPU Bound vs I/O Bound</h3>
                    <p className={styles.sub}>Entender el tipo de cuello de botella cambia la solucion.</p>
                  </div>
                  <span className={styles.chip}>Diagnostico</span>
                </div>
                <div className={styles.sbd}>
                  <h4>CPU Bound</h4>
                  <p>Mucho procesamiento: compresion, criptografia, procesamiento de imagenes.</p>

                  <h4>I/O Bound</h4>
                  <p>Esperar recursos externos: DB, HTTP, disco.</p>

                  <p>En backend moderno, la mayoria es:</p>
                  <pre>{ioBoundSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como piensa alguien senior realmente</h3>
                    <p className={styles.sub}>El codigo no se evalua solo por estilo, sino por comportamiento bajo presion.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{prettyCodeSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{pressureSnippet}</pre>

                  <div className={styles.quote}>
                    Performance no es velocidad. Es comportamiento eficiente bajo carga.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Aprender a pensar sistemas bajo carga.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Endpoint</h4>
                  <pre>{usersEndpointSnippet}</pre>
                  <p>Dentro:</p>
                  <pre>{usersEndpointCodeSnippet}</pre>

                  <h4>Paso 1 - Caso pequeno</h4>
                  <pre>{smallCaseSnippet}</pre>
                  <p>Probablemente funciona bien.</p>

                  <h4>Paso 2 - Escala mentalmente</h4>
                  <pre>{hugeCaseSnippet}</pre>
                  <p>Pregunta por RAM, tiempo, DB y red.</p>

                  <h4>Paso 3 - Concurrencia</h4>
                  <pre>{concurrentCaseSnippet}</pre>
                  <p>Que pasa ahora?</p>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{behaviorChangeSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>performance depende del contexto</li>
                    <li>escala cambia todo</li>
                    <li>concurrencia cambia todo</li>
                    <li>funciona no significa escala</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoint de tu sistema seria mas caro bajo carga?</li>
                    <li>Que endpoint cargaria demasiada RAM?</li>
                    <li>Que endpoint dependeria demasiado de DB?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior piensa en requests individuales. Backend senior piensa en sistemas bajo presion.
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
